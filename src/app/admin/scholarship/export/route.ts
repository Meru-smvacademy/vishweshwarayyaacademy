import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import type { SntRegistration } from "@/lib/supabase/types";
import { parseSntAdminFilters, sntAdminFilterOps } from "@/lib/snt/adminFilters";

export const dynamic = "force-dynamic";

const COLUMNS: { header: string; value: (r: SntRegistration) => string | number | null }[] = [
  { header: "Hall Ticket No", value: (r) => r.hall_ticket_no },
  { header: "Status", value: (r) => r.status },
  { header: "Student Name", value: (r) => r.student_name },
  { header: "Parent / Guardian", value: (r) => r.parent_name },
  { header: "Date of Birth", value: (r) => r.dob },
  { header: "Applying For", value: (r) => r.applying_for },
  { header: "Education Completed", value: (r) => r.education_completed },
  { header: "Medium", value: (r) => r.medium },
  { header: "School / College", value: (r) => r.school_name },
  { header: "Native Place", value: (r) => r.native_place },
  { header: "Phone", value: (r) => r.phone },
  { header: "WhatsApp", value: (r) => r.whatsapp },
  { header: "Academic Year", value: (r) => r.academic_year },
  { header: "Exam Centre", value: (r) => r.centre },
  { header: "Consent Given", value: (r) => (r.consent_given ? "Yes" : "No") },
  { header: "Consent At (IST)", value: (r) => toIst(r.consent_at) },
  { header: "Amount (Rs)", value: (r) => r.amount_paise / 100 },
  { header: "Payment ID", value: (r) => r.payment_id },
  { header: "Order ID", value: (r) => r.order_id },
  { header: "Transfer ID", value: (r) => r.transfer_id },
  { header: "Registered At (IST)", value: (r) => toIst(r.created_at) },
  { header: "Paid At (IST)", value: (r) => (r.paid_at ? toIst(r.paid_at) : null) },
];

function toIst(iso: string): string {
  return new Date(iso).toLocaleString("en-IN", { timeZone: "Asia/Kolkata", hour12: false });
}

function csvCell(value: string | number | null): string {
  if (value === null || value === undefined) return "";
  let text = String(value);
  // Neutralises spreadsheet formula injection from user-entered fields.
  if (/^[=+\-@\t\r]/.test(text)) text = `'${text}`;
  return /[",\r\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
}

export async function GET(request: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
  }

  const filters = parseSntAdminFilters(Object.fromEntries(request.nextUrl.searchParams));
  let query = supabase
    .from("scholarship_registrations")
    .select("*")
    .order("hall_ticket_no", { ascending: true, nullsFirst: false })
    .order("created_at", { ascending: true });
  const ops = sntAdminFilterOps(filters);
  for (const [column, value] of ops.eq) query = query.eq(column, value);
  if (ops.or) query = query.or(ops.or);

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const lines = [
    COLUMNS.map((c) => csvCell(c.header)).join(","),
    ...((data ?? []) as SntRegistration[]).map((r) => COLUMNS.map((c) => csvCell(c.value(r))).join(",")),
  ];
  const date = new Date().toISOString().slice(0, 10);

  // The BOM makes Excel open the file as UTF-8 (names in Kannada/Urdu stay intact).
  return new NextResponse(`﻿${lines.join("\r\n")}\r\n`, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="snt-registrations-${date}.csv"`,
      "Cache-Control": "no-store",
    },
  });
}
