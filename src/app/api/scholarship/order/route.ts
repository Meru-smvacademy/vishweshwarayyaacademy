import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { createKalbanttOrder } from "@/lib/snt/kalbanttPay";
import { getSntRegistration, isUuid } from "@/lib/snt/registrations";

export const runtime = "nodejs";

export async function POST(request: Request) {
  let registrationId: unknown;
  try {
    ({ registration_id: registrationId } = await request.json());
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (!isUuid(registrationId)) {
    return NextResponse.json({ error: "Registration not found." }, { status: 404 });
  }

  const registration = await getSntRegistration(registrationId);
  if (!registration) {
    return NextResponse.json({ error: "Registration not found." }, { status: 404 });
  }
  if (registration.status === "paid") {
    return NextResponse.json({ status: "paid", error: "This registration is already paid." }, { status: 409 });
  }

  let order;
  try {
    order = await createKalbanttOrder(registration.id);
  } catch (error) {
    console.error("Could not create SNT order:", error);
    return NextResponse.json(
      { error: "The payment service is not reachable right now. Please try again in a minute." },
      { status: 502 },
    );
  }

  // Only the latest order is kept. Moving a failed registration back to
  // pending lets the browser poll for the outcome of this new attempt.
  const { error } = await createAdminClient()
    .from("scholarship_registrations")
    .update({ order_id: order.orderId, status: "pending" })
    .eq("id", registration.id)
    .neq("status", "paid");

  if (error) {
    console.error("Could not store SNT order id:", error);
    return NextResponse.json({ error: "Could not start the payment. Please try again." }, { status: 500 });
  }

  return NextResponse.json({
    order_id: order.orderId,
    amount_paise: order.amountPaise,
    currency: order.currency,
    student_name: registration.student_name,
    phone: registration.phone,
  });
}
