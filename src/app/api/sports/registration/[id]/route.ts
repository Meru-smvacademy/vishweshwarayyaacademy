import { NextResponse } from "next/server";
import { getSportsRegistration } from "@/lib/sports/registrations";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Polled by the browser after checkout. Returns only what the status screen
// needs; the browser never decides the payment outcome itself.
export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const registration = await getSportsRegistration(id);

  if (!registration) {
    return NextResponse.json({ error: "Registration not found." }, { status: 404 });
  }

  return NextResponse.json(
    { status: registration.status, entry_card_no: registration.entry_card_no },
    { headers: { "Cache-Control": "no-store" } },
  );
}
