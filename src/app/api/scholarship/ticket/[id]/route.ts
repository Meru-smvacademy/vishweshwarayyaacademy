import { NextResponse } from "next/server";
import { renderHallTicketPdf } from "@/lib/snt/hallTicketPdf";
import { downloadSntPhoto, getSntRegistration } from "@/lib/snt/registrations";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const registration = await getSntRegistration(id);

  if (!registration) {
    return NextResponse.json({ error: "Registration not found." }, { status: 404 });
  }
  if (registration.status !== "paid" || !registration.hall_ticket_no) {
    return NextResponse.json(
      { error: "Payment not completed — registration incomplete. No hall ticket is available." },
      { status: 402 },
    );
  }

  const pdf = await renderHallTicketPdf(registration, await downloadSntPhoto(registration.photo_path));

  return new NextResponse(Buffer.from(pdf), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${registration.hall_ticket_no}.pdf"`,
      "Cache-Control": "private, no-store",
      "X-Robots-Tag": "noindex",
    },
  });
}
