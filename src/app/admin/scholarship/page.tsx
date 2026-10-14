import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { SntRegistration } from "@/lib/supabase/types";
import { SNT_MEDIUMS, SNT_PHOTO_BUCKET } from "@/lib/snt/constants";
import { parseSntAdminFilters, sntAdminFilterOps, sntAdminFilterQueryString } from "@/lib/snt/adminFilters";
import SntRegistrationFilters from "@/components/admin/snt/SntRegistrationFilters";
import SntRegistrationList from "@/components/admin/snt/SntRegistrationList";
import SntRegistrationTotals, { type SntTotals } from "@/components/admin/snt/SntRegistrationTotals";
import SntUnresolvedTransfers from "@/components/admin/snt/SntUnresolvedTransfers";
import { IVORY_100, DISPLAY, SANS } from "@/components/admin/tokens";

export const dynamic = "force-dynamic";

const PHOTO_URL_TTL_SECONDS = 60 * 60;

type CountRow = Pick<
  SntRegistration,
  "status" | "medium" | "education_completed" | "amount_paise" | "razorpay_fee_paise" | "transfer_amount_paise"
>;

function computeTotals(rows: CountRow[]): SntTotals {
  const paid = rows.filter((row) => row.status === "paid");
  const countBy = (key: "medium" | "education_completed", values: readonly string[]) =>
    values.map((value) => ({ label: value, count: paid.filter((row) => row[key] === value).length }));

  return {
    total: rows.length,
    paid: paid.length,
    pending: rows.filter((row) => row.status === "pending").length,
    failed: rows.filter((row) => row.status === "failed").length,
    collectedPaise: paid.reduce((sum, row) => sum + row.amount_paise, 0),
    feesPaise: paid.reduce((sum, row) => sum + (row.razorpay_fee_paise ?? 0), 0),
    transferredPaise: paid.reduce((sum, row) => sum + (row.transfer_amount_paise ?? 0), 0),
    paidByMedium: countBy("medium", SNT_MEDIUMS),
    paidByClass: countBy("education_completed", ["Class 10", "Class 12"]),
  };
}

export default async function AdminSntScholarshipPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const filters = parseSntAdminFilters(await searchParams);
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");

  let listQuery = supabase.from("scholarship_registrations").select("*").order("created_at", { ascending: false });
  const listOps = sntAdminFilterOps(filters);
  for (const [column, value] of listOps.eq) listQuery = listQuery.eq(column, value);
  if (listOps.or) listQuery = listQuery.or(listOps.or);

  // Totals ignore the status filter so paid/pending/failed stay comparable,
  // but respect class/medium/search so the office can slice counts.
  let totalsQuery = supabase
    .from("scholarship_registrations")
    .select("status, medium, education_completed, amount_paise, razorpay_fee_paise, transfer_amount_paise");
  const totalsOps = sntAdminFilterOps({ ...filters, status: "" });
  for (const [column, value] of totalsOps.eq) totalsQuery = totalsQuery.eq(column, value);
  if (totalsOps.or) totalsQuery = totalsQuery.or(totalsOps.or);

  // Captured payments whose net amount has not reached the academy yet. Never
  // filtered, so nothing unresolved can be hidden by the current filters.
  const unresolvedQuery = supabase
    .from("scholarship_registrations")
    .select("*")
    .eq("status", "paid")
    .is("transfer_id", null)
    .order("paid_at", { ascending: true });

  const [listResult, totalsResult, unresolvedResult] = await Promise.all([listQuery, totalsQuery, unresolvedQuery]);

  const registrations = (listResult.data ?? []) as SntRegistration[];
  const error = listResult.error ?? totalsResult.error;

  const photoUrls: Record<string, string> = {};
  if (registrations.length > 0) {
    const { data: signed } = await supabase.storage
      .from(SNT_PHOTO_BUCKET)
      .createSignedUrls(
        registrations.map((r) => r.photo_path),
        PHOTO_URL_TTL_SECONDS,
      );
    for (const item of signed ?? []) {
      if (item.path && item.signedUrl) photoUrls[item.path] = item.signedUrl;
    }
  }

  return (
    <div className="admin-content-wrap">
      <div style={{ marginBottom: 28, display: "flex", flexWrap: "wrap", gap: 16, alignItems: "flex-end", justifyContent: "space-between" }}>
        <div>
          <h1 style={{ margin: "0 0 8px", fontFamily: DISPLAY, fontSize: 28, fontWeight: 500, color: IVORY_100 }}>
            SNT Exam Registrations
          </h1>
          <p style={{ margin: 0, fontFamily: SANS, fontSize: 14, color: "rgba(248,243,232,0.5)" }}>
            Paid registrations, hall tickets and payment references for the SNT Scholarship Exam.
          </p>
        </div>
        <a
          href={`/admin/scholarship/export${sntAdminFilterQueryString(filters)}`}
          style={{
            padding: "9px 16px",
            borderRadius: 3,
            border: "1px solid rgba(192,154,58,0.5)",
            color: "#C09A3A",
            fontFamily: SANS,
            fontSize: 12.5,
            fontWeight: 600,
            textDecoration: "none",
            whiteSpace: "nowrap",
          }}
        >
          Export to Excel (CSV)
        </a>
      </div>

      {!error && <SntUnresolvedTransfers registrations={(unresolvedResult.data ?? []) as SntRegistration[]} />}

      {!error && <SntRegistrationTotals totals={computeTotals((totalsResult.data ?? []) as CountRow[])} />}

      <SntRegistrationFilters initial={filters} />

      {error ? (
        <div style={{ border: "1px solid rgba(229,115,115,0.3)", background: "rgba(229,115,115,0.06)", padding: "24px", borderRadius: 3 }}>
          <p style={{ margin: "0 0 6px", fontFamily: SANS, fontSize: 13.5, color: "#E57373", fontWeight: 600 }}>
            Could not load SNT registrations.
          </p>
          <p style={{ margin: 0, fontFamily: SANS, fontSize: 12.5, color: "rgba(248,243,232,0.55)" }}>
            {error.message}. If this is the first time using this module, make sure the database migration in{" "}
            <code>supabase/migrations/0007_snt_scholarship_registrations.sql</code> has been run in your Supabase project.
          </p>
        </div>
      ) : (
        <SntRegistrationList registrations={registrations} photoUrls={photoUrls} />
      )}

      <style>{`
        .admin-content-wrap {
          max-width: 1280px;
          margin: 0 auto;
          padding: 48px 40px 72px;
          width: 100%;
          box-sizing: border-box;
        }
        @media (max-width: 768px) {
          .admin-content-wrap { padding: 28px 20px 60px; }
        }
      `}</style>
    </div>
  );
}
