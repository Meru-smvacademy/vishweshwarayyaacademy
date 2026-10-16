import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { SportsRegistration } from "@/lib/supabase/types";
import { ELIGIBLE_LEVELS, SPORTS } from "@/content/sports";
import { SPORTS_DOCUMENT_BUCKET, SPORTS_PHOTO_BUCKET, SPORTS_STATUSES, sportsCardPath } from "@/lib/sports/constants";
import { parseSportsAdminFilters, sportsAdminFilterOps, sportsAdminFilterQueryString } from "@/lib/sports/adminFilters";
import { GOLD_500, IVORY_100, DISPLAY, SANS } from "@/components/admin/tokens";

export const dynamic = "force-dynamic";

const URL_TTL_SECONDS = 60 * 60;

const STATUS_COLORS: Record<SportsRegistration["status"], string> = { paid: "#8FCB90", pending: GOLD_500, failed: "#E57373" };

const cell: React.CSSProperties = { padding: "10px 12px", fontFamily: SANS, fontSize: 13, color: "rgba(248,243,232,0.7)", verticalAlign: "top" };
const head: React.CSSProperties = { ...cell, fontSize: 10.5, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "rgba(248,243,232,0.45)", textAlign: "left" };
const card: React.CSSProperties = { border: "1px solid rgba(200,185,155,0.14)", borderRadius: 4, padding: "14px 16px", background: "rgba(255,255,255,0.02)" };
const control: React.CSSProperties = { padding: "8px 10px", borderRadius: 3, border: "1px solid rgba(200,185,155,0.25)", background: "rgba(255,255,255,0.03)", color: IVORY_100, fontFamily: SANS, fontSize: 13 };

function rupees(paise: number | null): string {
  return paise === null ? "—" : `₹${(paise / 100).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function formatIst(iso: string | null): string {
  return iso ? new Date(iso).toLocaleString("en-IN", { timeZone: "Asia/Kolkata", day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" }) : "—";
}

async function signedUrls(
  supabase: Awaited<ReturnType<typeof createClient>>,
  bucket: string,
  paths: string[],
): Promise<Record<string, string>> {
  const urls: Record<string, string> = {};
  if (paths.length === 0) return urls;
  const { data } = await supabase.storage.from(bucket).createSignedUrls(paths, URL_TTL_SECONDS);
  for (const item of data ?? []) if (item.path && item.signedUrl) urls[item.path] = item.signedUrl;
  return urls;
}

export default async function AdminSportsPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const filters = parseSportsAdminFilters(await searchParams);
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");

  let listQuery = supabase.from("sports_registrations").select("*").order("created_at", { ascending: false });
  const ops = sportsAdminFilterOps(filters);
  for (const [column, value] of ops.eq) listQuery = listQuery.eq(column, value);
  if (ops.or) listQuery = listQuery.or(ops.or);

  // Totals ignore the status filter so paid/pending/failed stay comparable.
  let totalsQuery = supabase.from("sports_registrations").select("status, sport, amount_paise, razorpay_fee_paise, transfer_amount_paise");
  const totalsOps = sportsAdminFilterOps({ ...filters, status: "" });
  for (const [column, value] of totalsOps.eq) totalsQuery = totalsQuery.eq(column, value);
  if (totalsOps.or) totalsQuery = totalsQuery.or(totalsOps.or);

  // Captured payments whose net amount has not reached the academy yet; never filtered.
  const unresolvedQuery = supabase
    .from("sports_registrations")
    .select("*")
    .eq("status", "paid")
    .is("transfer_id", null)
    .order("paid_at", { ascending: true });

  const [listResult, totalsResult, unresolvedResult] = await Promise.all([listQuery, totalsQuery, unresolvedQuery]);
  const error = listResult.error ?? totalsResult.error;
  const rows = (listResult.data ?? []) as SportsRegistration[];
  const totalsRows = (totalsResult.data ?? []) as Pick<SportsRegistration, "status" | "sport" | "amount_paise" | "razorpay_fee_paise" | "transfer_amount_paise">[];
  const unresolved = (unresolvedResult.data ?? []) as SportsRegistration[];

  const paid = totalsRows.filter((r) => r.status === "paid");
  const sum = (pick: (r: (typeof paid)[number]) => number | null) => paid.reduce((total, r) => total + (pick(r) ?? 0), 0);

  const photoUrls = await signedUrls(supabase, SPORTS_PHOTO_BUCKET, rows.map((r) => r.photo_path));
  const documentUrls = await signedUrls(
    supabase,
    SPORTS_DOCUMENT_BUCKET,
    rows.flatMap((r) => [r.sports_certificate_path, r.fitness_certificate_path].filter((p): p is string => Boolean(p))),
  );

  return (
    <div className="admin-content-wrap">
      <div style={{ marginBottom: 28, display: "flex", flexWrap: "wrap", gap: 16, alignItems: "flex-end", justifyContent: "space-between" }}>
        <div>
          <h1 style={{ margin: "0 0 8px", fontFamily: DISPLAY, fontSize: 28, fontWeight: 500, color: IVORY_100 }}>SNT Sports Meet Registrations</h1>
          <p style={{ margin: 0, fontFamily: SANS, fontSize: 14, color: "rgba(248,243,232,0.5)" }}>
            Paid registrations, entry cards, declarations and payment references for the SNT Sports Meet 2027.
          </p>
        </div>
        <a
          href={`/admin/sports/export${sportsAdminFilterQueryString(filters)}`}
          style={{ padding: "9px 16px", borderRadius: 3, border: "1px solid rgba(192,154,58,0.5)", color: "#C09A3A", fontFamily: SANS, fontSize: 12.5, fontWeight: 600, textDecoration: "none", whiteSpace: "nowrap" }}
        >
          Export to Excel (CSV)
        </a>
      </div>

      {error ? (
        <div style={{ border: "1px solid rgba(229,115,115,0.3)", background: "rgba(229,115,115,0.06)", padding: 24, borderRadius: 3 }}>
          <p style={{ margin: "0 0 6px", fontFamily: SANS, fontSize: 13.5, color: "#E57373", fontWeight: 600 }}>Could not load sports registrations.</p>
          <p style={{ margin: 0, fontFamily: SANS, fontSize: 12.5, color: "rgba(248,243,232,0.55)" }}>
            {error.message}. If this is the first time using this module, make sure <code>supabase/migrations/0011_snt_sports_meet.sql</code> has been run in your
            Supabase project.
          </p>
        </div>
      ) : (
        <>
          {unresolved.length > 0 && (
            <div style={{ ...card, borderColor: "rgba(229,115,115,0.4)", marginBottom: 20 }}>
              <p style={{ margin: "0 0 8px", fontFamily: SANS, fontSize: 13.5, fontWeight: 600, color: "#E57373" }}>
                {unresolved.length} paid registration{unresolved.length === 1 ? "" : "s"} not yet transferred to the academy
              </p>
              {unresolved.map((r) => (
                <p key={r.id} style={{ margin: "2px 0", fontFamily: SANS, fontSize: 12.5, color: "rgba(248,243,232,0.7)" }}>
                  {r.entry_card_no} · {r.student_name} · {r.payment_id} · {r.transfer_status ?? "pending"}
                  {r.transfer_last_error ? ` — ${r.transfer_last_error}` : ""}
                </p>
              ))}
              <p style={{ margin: "8px 0 0", fontFamily: SANS, fontSize: 12, color: "rgba(248,243,232,0.5)" }}>
                Razorpay redelivers the payment webhook, which retries the transfer automatically.
              </p>
            </div>
          )}

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 12, marginBottom: 20 }}>
            {[
              ["Registrations", String(totalsRows.length)],
              ["Paid", String(paid.length)],
              ["Pending", String(totalsRows.filter((r) => r.status === "pending").length)],
              ["Failed", String(totalsRows.filter((r) => r.status === "failed").length)],
              ["Collected", rupees(sum((r) => r.amount_paise))],
              ["Razorpay fees", rupees(sum((r) => r.razorpay_fee_paise))],
              ["Transferred", rupees(sum((r) => r.transfer_amount_paise))],
              ...SPORTS.map((sport) => [`Paid · ${sport}`, String(paid.filter((r) => r.sport === sport).length)]),
            ].map(([label, value]) => (
              <div key={label} style={card}>
                <p style={{ margin: 0, fontFamily: SANS, fontSize: 10.5, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "rgba(248,243,232,0.45)" }}>{label}</p>
                <p style={{ margin: "6px 0 0", fontFamily: SANS, fontSize: 20, fontWeight: 600, color: IVORY_100 }}>{value}</p>
              </div>
            ))}
          </div>

          <form method="get" style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 20 }}>
            <input name="q" defaultValue={filters.q} placeholder="Name, phone or entry card no." aria-label="Search" style={{ ...control, minWidth: 220 }} />
            <select name="status" defaultValue={filters.status} aria-label="Filter by status" style={control}>
              <option value="">All statuses</option>
              {SPORTS_STATUSES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
            <select name="sport" defaultValue={filters.sport} aria-label="Filter by sport" style={control}>
              <option value="">All sports</option>
              {SPORTS.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
            <select name="level" defaultValue={filters.level} aria-label="Filter by level" style={control}>
              <option value="">All levels</option>
              {ELIGIBLE_LEVELS.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
            <button type="submit" style={{ ...control, cursor: "pointer", borderColor: "rgba(192,154,58,0.5)", color: "#C09A3A", fontWeight: 600 }}>
              Apply
            </button>
            <a href="/admin/sports" style={{ ...control, textDecoration: "none" }}>
              Clear
            </a>
          </form>

          {rows.length === 0 ? (
            <p style={{ fontFamily: SANS, fontSize: 13.5, color: "rgba(248,243,232,0.55)" }}>No sports registrations match.</p>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 1100 }}>
                <thead>
                  <tr style={{ borderBottom: "1px solid rgba(200,185,155,0.14)" }}>
                    {["Photo", "Entry card", "Status", "Student", "Sport", "Level", "Declarations", "Certificates", "Contact", "Payment", "Registered"].map((h) => (
                      <th key={h} style={head}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r) => (
                    <tr key={r.id} style={{ borderBottom: "1px solid rgba(200,185,155,0.08)" }}>
                      <td style={cell}>
                        {photoUrls[r.photo_path] ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={photoUrls[r.photo_path]} alt={`Photo of ${r.student_name}`} width={36} height={48} style={{ objectFit: "cover", borderRadius: 2 }} />
                        ) : null}
                      </td>
                      <td style={{ ...cell, fontFamily: "var(--font-geist-mono), monospace", color: IVORY_100 }}>
                        {r.entry_card_no ? (
                          <a href={sportsCardPath(r.id)} style={{ color: IVORY_100 }}>
                            {r.entry_card_no}
                          </a>
                        ) : (
                          "—"
                        )}
                      </td>
                      <td style={{ ...cell, color: STATUS_COLORS[r.status], fontWeight: 600, textTransform: "uppercase", fontSize: 11 }}>{r.status}</td>
                      <td style={cell}>
                        <span style={{ color: IVORY_100 }}>{r.student_name}</span>
                        <br />
                        DOB {r.dob} · {r.school_name}
                        <br />
                        Parent: {r.parent_name} · {r.native_place}
                      </td>
                      <td style={cell}>
                        {r.sport}
                        {r.athletics_event ? ` — ${r.athletics_event}` : ""}
                      </td>
                      <td style={cell}>{r.level_represented}</td>
                      <td style={cell}>
                        Certificate: {r.certificate_declared ? "declared" : "no"}
                        <br />
                        Govt fitness: {r.fitness_declared ? "declared" : "no"}
                      </td>
                      <td style={cell}>
                        {r.sports_certificate_path && documentUrls[r.sports_certificate_path] ? (
                          <a href={documentUrls[r.sports_certificate_path]} target="_blank" rel="noopener" style={{ color: "#C09A3A" }}>
                            Sports
                          </a>
                        ) : (
                          "Sports —"
                        )}
                        <br />
                        {r.fitness_certificate_path && documentUrls[r.fitness_certificate_path] ? (
                          <a href={documentUrls[r.fitness_certificate_path]} target="_blank" rel="noopener" style={{ color: "#C09A3A" }}>
                            Fitness
                          </a>
                        ) : (
                          "Fitness —"
                        )}
                      </td>
                      <td style={cell}>
                        {r.phone}
                        {r.whatsapp !== r.phone ? (
                          <>
                            <br />
                            WA {r.whatsapp}
                          </>
                        ) : null}
                      </td>
                      <td style={cell}>
                        {r.status === "paid" ? rupees(r.amount_paise) : "—"}
                        <br />
                        <span style={{ fontSize: 11.5 }}>{r.payment_id ?? ""}</span>
                        {r.status === "paid" && (
                          <>
                            <br />
                            <span style={{ fontSize: 11.5 }}>Transfer: {r.transfer_id ? rupees(r.transfer_amount_paise) : r.transfer_status ?? "pending"}</span>
                          </>
                        )}
                      </td>
                      <td style={cell}>{formatIst(r.created_at)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}

      <style>{`
        .admin-content-wrap { max-width: 1280px; margin: 0 auto; padding: 48px 40px 72px; width: 100%; box-sizing: border-box; }
        @media (max-width: 768px) { .admin-content-wrap { padding: 28px 20px 60px; } }
      `}</style>
    </div>
  );
}
