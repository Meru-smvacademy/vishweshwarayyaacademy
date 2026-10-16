import { NextResponse } from "next/server";
import { renderEntryCardPdf } from "@/lib/sports/entryCardPdf";
import { downloadSportsPhoto, getSportsRegistration } from "@/lib/sports/registrations";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const registration = await getSportsRegistration(id);

  if (!registration) {
    return NextResponse.json({ error: "Registration not found." }, { status: 404 });
  }
  // Without a captured payment the registration is incomplete: no entry card.
  if (registration.status !== "paid" || !registration.entry_card_no) {
    return NextResponse.json(
      { error: "Payment not completed — registration incomplete. No entry card is available." },
      { status: 402 },
    );
  }

  const pdf = await renderEntryCardPdf(registration, await downloadSportsPhoto(registration.photo_path));

  return new NextResponse(Buffer.from(pdf), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${registration.entry_card_no}.pdf"`,
      "Cache-Control": "private, no-store",
      "X-Robots-Tag": "noindex",
    },
  });
}
