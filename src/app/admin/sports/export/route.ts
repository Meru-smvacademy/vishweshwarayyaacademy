import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import type { SportsRegistration } from "@/lib/supabase/types";
import { parseSportsAdminFilters, sportsAdminFilterOps } from "@/lib/sports/adminFilters";

export const dynamic = "force-dynamic";

const COLUMNS: { header: string; value: (r: SportsRegistration) => string | number | null }[] = [
  { header: "Entry Card No", value: (r) => r.entry_card_no },
  { header: "Status", value: (r) => r.status },
  { header: "Student Name", value: (r) => r.student_name },
  { header: "Parent / Guardian", value: (r) => r.parent_name },
  { header: "Date of Birth", value: (r) => r.dob },
  { header: "School / College", value: (r) => r.school_name },
  { header: "Native Place", value: (r) => r.native_place },
  { header: "Phone", value: (r) => r.phone },
  { header: "WhatsApp", value: (r) => r.whatsapp },
  { header: "Sport", value: (r) => r.sport },
  { header: "Athletics Event", value: (r) => r.athletics_event },
  { header: "Level Represented", value: (r) => r.level_represented },
  { header: "Certificate Declared", value: (r) => (r.certificate_declared ? "Yes" : "No") },
  { header: "Govt Doctor Fitness Certificate Declared", value: (r) => (r.fitness_declared ? "Yes" : "No") },
  { header: "Sports Certificate Uploaded", value: (r) => (r.sports_certificate_path ? "Yes" : "No") },
  { header: "Fitness Certificate Uploaded", value: (r) => (r.fitness_certificate_path ? "Yes" : "No") },
  { header: "Consent Given", value: (r) => (r.consent_given ? "Yes" : "No") },
  { header: "Consent At (IST)", value: (r) => toIst(r.consent_at) },
  { header: "Amount Paid (Rs)", value: (r) => (r.status === "paid" ? rupees(r.amount_paise) : null) },
  { header: "Razorpay Fee incl. GST (Rs)", value: (r) => rupees(r.razorpay_fee_paise) },
  { header: "of which GST (Rs)", value: (r) => rupees(r.razorpay_tax_paise) },
  { header: "Transferred to Academy (Rs)", value: (r) => rupees(r.transfer_amount_paise) },
  { header: "Transfer Status", value: (r) => (r.status === "paid" ? (r.transfer_status ?? "pending") : null) },
  { header: "Payment ID", value: (r) => r.payment_id },
  { header: "Order ID", value: (r) => r.order_id },
  { header: "Transfer ID", value: (r) => r.transfer_id },
  { header: "Registered At (IST)", value: (r) => toIst(r.created_at) },
  { header: "Paid At (IST)", value: (r) => (r.paid_at ? toIst(r.paid_at) : null) },
];

function rupees(paise: number | null): string | null {
  return paise === null ? null : (paise / 100).toFixed(2);
}

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

  const filters = parseSportsAdminFilters(Object.fromEntries(request.nextUrl.searchParams));
  let query = supabase
    .from("sports_registrations")
    .select("*")
    .order("entry_card_no", { ascending: true, nullsFirst: false })
    .order("created_at", { ascending: true });
  const ops = sportsAdminFilterOps(filters);
  for (const [column, value] of ops.eq) query = query.eq(column, value);
  if (ops.or) query = query.or(ops.or);

  const { data, error } = await query;
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const rows = (data ?? []) as SportsRegistration[];
  const paid = rows.filter((r) => r.status === "paid");
  const sum = (pick: (r: SportsRegistration) => number | null) => paid.reduce((total, r) => total + (pick(r) ?? 0), 0);
  const totalsRow = COLUMNS.map((c) => {
    if (c.header === "Entry Card No") return "TOTAL (paid)";
    if (c.header === "Amount Paid (Rs)") return rupees(sum((r) => r.amount_paise));
    if (c.header === "Razorpay Fee incl. GST (Rs)") return rupees(sum((r) => r.razorpay_fee_paise));
    if (c.header === "of which GST (Rs)") return rupees(sum((r) => r.razorpay_tax_paise));
    if (c.header === "Transferred to Academy (Rs)") return rupees(sum((r) => r.transfer_amount_paise));
    return null;
  });

  const lines = [
    COLUMNS.map((c) => csvCell(c.header)).join(","),
    ...rows.map((r) => COLUMNS.map((c) => csvCell(c.value(r))).join(",")),
    totalsRow.map(csvCell).join(","),
  ];
  const date = new Date().toISOString().slice(0, 10);

  // The BOM makes Excel open the file as UTF-8 (names in Kannada stay intact).
  return new NextResponse(`﻿${lines.join("\r\n")}\r\n`, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="sports-registrations-${date}.csv"`,
      "Cache-Control": "no-store",
    },
  });
}
