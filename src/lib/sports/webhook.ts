import "server-only";
import { NextResponse } from "next/server";
import { SPORTS_MEET } from "@/content/sports";
import { createAdminClient } from "@/lib/supabase/admin";
import { describeRazorpayError, fetchRazorpayOrder, fetchRazorpayPayment } from "@/lib/snt/razorpay";
import { isUuid } from "@/lib/snt/registrations";
import { settleSportsTransfer } from "@/lib/snt/settlement";
import { SPORTS_AMOUNT_PAISE, SPORTS_PRODUCT } from "@/lib/sports/constants";
import { getSportsRegistration } from "@/lib/sports/registrations";

export type SportsWebhookInput = {
  eventType: string;
  eventId: string | null;
  notes: Record<string, unknown>;
  paymentId: string;
  orderId: string;
};

const HANDLED_EVENTS = new Set(["payment.captured", "payment.failed"]);

function ok(body: Record<string, unknown> = { received: true }) {
  return NextResponse.json(body, { status: 200 });
}

/**
 * The SNT Sports Meet half of the shared Razorpay webhook (called only for
 * notes.product === "SNT_SPORTS", after the signature has been verified).
 * Same rules as the exam: this is the ONLY place a sports registration becomes
 * paid or failed, every decision uses Razorpay's own payment and order records,
 * and the entry card number is issued atomically by sports_mark_paid.
 */
export async function handleSportsWebhook({ eventType, eventId, notes, paymentId, orderId }: SportsWebhookInput) {
  if (!HANDLED_EVENTS.has(eventType) || notes.product !== SPORTS_PRODUCT || !isUuid(notes.registration_id) || !paymentId) {
    return ok();
  }

  const registration = await getSportsRegistration(notes.registration_id);
  if (!registration) {
    return ok();
  }

  const supabase = createAdminClient();

  if (eventId) {
    const { data: seen } = await supabase.from("sports_webhook_events").select("event_id").eq("event_id", eventId).maybeSingle();
    if (seen) return ok({ received: true, duplicate: true });
  }

  const markProcessed = async () => {
    if (!eventId) return;
    await supabase
      .from("sports_webhook_events")
      .upsert({ event_id: eventId, event_type: eventType, registration_id: registration.id }, { onConflict: "event_id", ignoreDuplicates: true });
  };

  if (eventType === "payment.failed") {
    const { error } = await supabase.rpc("sports_mark_failed", { p_registration_id: registration.id, p_order_id: orderId });
    if (error) {
      console.error("sports_mark_failed failed:", { registrationId: registration.id, error: error.message });
      return NextResponse.json({ error: "Could not record the failure." }, { status: 500 });
    }
    await markProcessed();
    return ok({ status: "failed-recorded" });
  }

  // payment.captured — re-read the payment and order from Razorpay so every
  // decision uses Razorpay's records, not the webhook body.
  let payment;
  let order;
  try {
    payment = await fetchRazorpayPayment(paymentId);
    order = await fetchRazorpayOrder(payment.orderId);
  } catch (error) {
    console.error("Sports webhook could not read payment from Razorpay:", {
      registrationId: registration.id,
      error: describeRazorpayError(error),
    });
    return NextResponse.json({ error: "Could not verify the payment." }, { status: 502 });
  }

  const genuine =
    payment.status === "captured" &&
    payment.currency === "INR" &&
    payment.amount === SPORTS_AMOUNT_PAISE &&
    order.amount === SPORTS_AMOUNT_PAISE &&
    order.receipt === registration.id &&
    order.notes.product === SPORTS_PRODUCT &&
    order.notes.registration_id === registration.id;

  if (!genuine) {
    console.error("Sports webhook rejected a payment that does not match its registration:", {
      registrationId: registration.id,
      paymentStatus: payment.status,
      amount: payment.amount,
      orderAmount: order.amount,
      orderProduct: order.notes.product,
    });
    await markProcessed();
    return ok({ status: "rejected" });
  }

  const { data: entryCardNo, error: paidError } = await supabase.rpc("sports_mark_paid", {
    p_registration_id: registration.id,
    p_event_year: SPORTS_MEET.eventYear,
    p_order_id: payment.orderId,
    p_payment_id: payment.id,
  });
  if (paidError) {
    console.error("sports_mark_paid failed:", { registrationId: registration.id, error: paidError.message });
    return NextResponse.json({ error: "Could not record the payment." }, { status: 500 });
  }

  const settlement = await settleSportsTransfer(registration.id);

  const { data: row } = await supabase.from("sports_registrations").select("transfer_status").eq("id", registration.id).single();

  if (row?.transfer_status === "done") {
    await markProcessed();
    return ok({ status: "paid", entry_card_no: entryCardNo, transfer: "done" });
  }

  // The entry card is issued, but the academy has not been paid out yet. A
  // non-2xx response makes Razorpay redeliver this event with its own backoff;
  // the admin page also lists it until it is resolved.
  if (settlement.outcome === "failed") {
    return NextResponse.json({ status: "paid", entry_card_no: entryCardNo, transfer: "failed" }, { status: 500 });
  }
  return ok({ status: "paid", entry_card_no: entryCardNo, transfer: "in-progress" });
}
