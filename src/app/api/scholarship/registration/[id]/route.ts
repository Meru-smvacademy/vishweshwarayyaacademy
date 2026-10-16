import { NextResponse } from "next/server";
import { getSntRegistration } from "@/lib/snt/registrations";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Polled by the browser after checkout. Returns only what the status screen
// needs; the browser never decides the payment outcome itself.
export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const registration = await getSntRegistration(id);

  if (!registration) {
    return NextResponse.json({ error: "Registration not found." }, { status: 404 });
  }

  return NextResponse.json(
    { status: registration.status, hall_ticket_no: registration.hall_ticket_no },
    { headers: { "Cache-Control": "no-store" } },
  );
}
