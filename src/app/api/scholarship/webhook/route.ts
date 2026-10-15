import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { SNT_AMOUNT_PAISE, SNT_PRODUCT } from "@/lib/snt/constants";
import { SNT_EXAM } from "@/content/scholarship";
import {
  RAZORPAY_EVENT_ID_HEADER,
  RAZORPAY_SIGNATURE_HEADER,
  describeRazorpayError,
  fetchRazorpayOrder,
  fetchRazorpayPayment,
  verifyRazorpayWebhook,
} from "@/lib/snt/razorpay";
import { getSntRegistration, isUuid } from "@/lib/snt/registrations";
import { settleSntTransfer } from "@/lib/snt/settlement";

export const runtime = "nodejs";

type WebhookPayment = { id?: unknown; order_id?: unknown; notes?: unknown };
type WebhookEvent = { event?: unknown; payload?: { payment?: { entity?: WebhookPayment } } };

const HANDLED_EVENTS = new Set(["payment.captured", "payment.failed"]);

function ok(body: Record<string, unknown> = { received: true }) {
  return NextResponse.json(body, { status: 200 });
}

/**
 * This site's own Razorpay webhook. It is the ONLY place a registration
 * becomes paid or failed; the browser never decides the outcome. Events for
 * other products on the same Razorpay account (e.g. Conecta) are acknowledged
 * and ignored without side effects.
 */
export async function POST(request: Request) {
  const rawBody = await request.text();

  if (!verifyRazorpayWebhook(rawBody, request.headers.get(RAZORPAY_SIGNATURE_HEADER))) {
    return NextResponse.json({ error: "Invalid signature." }, { status: 400 });
  }

  let event: WebhookEvent;
  try {
    event = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: "Invalid JSON." }, { status: 400 });
  }

  const eventType = typeof event.event === "string" ? event.event : "";
  const entity = event.payload?.payment?.entity;
  const notes = (entity?.notes ?? {}) as Record<string, unknown>;
  const paymentId = typeof entity?.id === "string" ? entity.id : "";
  const orderId = typeof entity?.order_id === "string" ? entity.order_id : "";

  if (!HANDLED_EVENTS.has(eventType) || notes.product !== SNT_PRODUCT || !isUuid(notes.registration_id) || !paymentId) {
    return ok();
  }

  const registration = await getSntRegistration(notes.registration_id);
  if (!registration) {
    return ok();
  }

  const supabase = createAdminClient();
  const eventId = request.headers.get(RAZORPAY_EVENT_ID_HEADER);

  if (eventId) {
    const { data: seen } = await supabase.from("snt_webhook_events").select("event_id").eq("event_id", eventId).maybeSingle();
    if (seen) return ok({ received: true, duplicate: true });
  }

  const markProcessed = async () => {
    if (!eventId) return;
    await supabase
      .from("snt_webhook_events")
      .upsert({ event_id: eventId, event_type: eventType, registration_id: registration.id }, { onConflict: "event_id", ignoreDuplicates: true });
  };

  if (eventType === "payment.failed") {
    const { error } = await supabase.rpc("snt_mark_failed", { p_registration_id: registration.id, p_order_id: orderId });
    if (error) {
      console.error("snt_mark_failed failed:", { registrationId: registration.id, error: error.message });
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
    console.error("SNT webhook could not read payment from Razorpay:", {
      registrationId: registration.id,
      error: describeRazorpayError(error),
    });
    return NextResponse.json({ error: "Could not verify the payment." }, { status: 502 });
  }

  const genuine =
    payment.status === "captured" &&
    payment.currency === "INR" &&
    payment.amount === SNT_AMOUNT_PAISE &&
    order.amount === SNT_AMOUNT_PAISE &&
    order.receipt === registration.id &&
    order.notes.product === SNT_PRODUCT &&
    order.notes.registration_id === registration.id;

  if (!genuine) {
    console.error("SNT webhook rejected a payment that does not match its registration:", {
      registrationId: registration.id,
      paymentStatus: payment.status,
      amount: payment.amount,
      orderAmount: order.amount,
    });
    await markProcessed();
    return ok({ status: "rejected" });
  }

  const { data: hallTicketNo, error: paidError } = await supabase.rpc("snt_mark_paid", {
    p_registration_id: registration.id,
    p_exam_year: SNT_EXAM.examYear,
    p_order_id: payment.orderId,
    p_payment_id: payment.id,
  });
  if (paidError) {
    console.error("snt_mark_paid failed:", { registrationId: registration.id, error: paidError.message });
    return NextResponse.json({ error: "Could not record the payment." }, { status: 500 });
  }

  const settlement = await settleSntTransfer(registration.id);

  const { data: row } = await supabase
    .from("scholarship_registrations")
    .select("transfer_status")
    .eq("id", registration.id)
    .single();

  if (row?.transfer_status === "done") {
    await markProcessed();
    return ok({ status: "paid", hall_ticket_no: hallTicketNo, transfer: "done" });
  }

  // The hall ticket is issued, but the academy has not been paid out yet. A
  // non-2xx response makes Razorpay redeliver this event with its own backoff;
  // the admin page also lists it until it is resolved.
  if (settlement.outcome === "failed") {
    return NextResponse.json({ status: "paid", hall_ticket_no: hallTicketNo, transfer: "failed" }, { status: 500 });
  }
  return ok({ status: "paid", hall_ticket_no: hallTicketNo, transfer: "in-progress" });
}
