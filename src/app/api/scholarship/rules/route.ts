import { NextResponse } from "next/server";
import { renderRulesPdf } from "@/lib/snt/hallTicketPdf";

export const runtime = "nodejs";

export async function GET() {
  const pdf = await renderRulesPdf();
  return new NextResponse(Buffer.from(pdf), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": 'inline; filename="SNT-Scholarship-Rules.pdf"',
      "Cache-Control": "public, max-age=300",
    },
  });
}
