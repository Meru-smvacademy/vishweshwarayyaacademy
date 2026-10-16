import { NextResponse } from "next/server";
import { SNT_EXAM } from "@/content/scholarship";
import { isSntRegistrationOpen } from "@/lib/snt/examSchedule";
import { createAdminClient } from "@/lib/supabase/admin";
import { createSntRazorpayOrder, describeRazorpayError, razorpayKeyId } from "@/lib/snt/razorpay";
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
  // Webhooks for payments already in flight are still honoured; only new
  // payment attempts stop when the exam begins.
  if (!isSntRegistrationOpen(SNT_EXAM)) {
    return NextResponse.json({ closed: true, error: SNT_EXAM.registrationClosedMessage }, { status: 403 });
  }

  let order;
  try {
    // The amount is fixed in config (SNT_AMOUNT_PAISE); nothing from the request body is used.
    order = await createSntRazorpayOrder(registration.id);
  } catch (error) {
    console.error("Could not create SNT Razorpay order:", { registrationId: registration.id, error: describeRazorpayError(error) });
    return NextResponse.json(
      { error: "The payment service is not reachable right now. Please try again in a minute." },
      { status: 502 },
    );
  }

  // Only the latest order is kept on the row. The webhook validates a payment
  // against Razorpay's own order record, so a payment on an earlier order of
  // the same registration is still recognised.
  const { error } = await createAdminClient()
    .from("scholarship_registrations")
    .update({ order_id: order.id, status: "pending" })
    .eq("id", registration.id)
    .neq("status", "paid");

  if (error) {
    console.error("Could not store SNT order id:", { registrationId: registration.id, error: error.message });
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
