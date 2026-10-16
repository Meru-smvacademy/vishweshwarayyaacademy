import { NextResponse } from "next/server";
import { SPORTS_MEET } from "@/content/sports";
import { createAdminClient } from "@/lib/supabase/admin";
import { describeRazorpayError, razorpayKeyId } from "@/lib/snt/razorpay";
import { isUuid } from "@/lib/snt/registrations";
import { createSportsRazorpayOrder } from "@/lib/sports/razorpay";
import { getSportsRegistration } from "@/lib/sports/registrations";
import { isSportsRegistrationOpen } from "@/lib/sports/rules";

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

  const registration = await getSportsRegistration(registrationId);
  if (!registration) {
    return NextResponse.json({ error: "Registration not found." }, { status: 404 });
  }
  if (registration.status === "paid") {
    return NextResponse.json({ status: "paid", error: "This registration is already paid." }, { status: 409 });
  }
  // Webhooks for payments already in flight are still honoured; only new
  // payment attempts stop when registration closes.
  if (!isSportsRegistrationOpen(SPORTS_MEET.registrationCloses)) {
    return NextResponse.json({ closed: true, error: SPORTS_MEET.registrationClosedMessage }, { status: 403 });
  }

  let order;
  try {
    // The amount is fixed in config (SPORTS_AMOUNT_PAISE); nothing from the request body is used.
    order = await createSportsRazorpayOrder(registration.id);
  } catch (error) {
    console.error("Could not create sports Razorpay order:", { registrationId: registration.id, error: describeRazorpayError(error) });
    return NextResponse.json(
      { error: "The payment service is not reachable right now. Please try again in a minute." },
      { status: 502 },
    );
  }

  // Only the latest order is kept on the row. The webhook validates a payment
  // against Razorpay's own order record, so a payment on an earlier order of
  // the same registration is still recognised.
  const { error } = await createAdminClient()
    .from("sports_registrations")
    .update({ order_id: order.id, status: "pending" })
    .eq("id", registration.id)
    .neq("status", "paid");

  if (error) {
    console.error("Could not store sports order id:", { registrationId: registration.id, error: error.message });
    return NextResponse.json({ error: "Could not start the payment. Please try again." }, { status: 500 });
  }

  return NextResponse.json({
    razorpay_order_id: order.id,
    key_id: razorpayKeyId(),
    amount_paise: order.amount,
    currency: order.currency,
    student_name: registration.student_name,
    phone: registration.phone,
  });
}
