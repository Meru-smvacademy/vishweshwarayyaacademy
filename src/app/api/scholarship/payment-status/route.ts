import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { SNT_TIMESTAMP_HEADER, SNT_SIGNATURE_HEADER, verifySntCallback } from "@/lib/snt/callbackSignature";
import { SNT_AMOUNT_PAISE, SNT_BATCH } from "@/lib/snt/constants";
import { isUuid } from "@/lib/snt/registrations";

export const runtime = "nodejs";

type CallbackBody = {
  registration_id?: unknown;
  status?: unknown;
  order_id?: unknown;
  payment_id?: unknown;
  transfer_id?: unknown;
  amount_paise?: unknown;
};

const NOT_FOUND_ERROR_CODE = "P0002";

function optionalString(value: unknown): string | null {
  return typeof value === "string" && value.trim() ? value.trim() : null;
}

/**
 * Called server-to-server by the Kalbantt payment service once Razorpay has
 * captured (or failed) a payment. This is the only place a registration
 * becomes paid and a hall ticket number is issued.
 */
export async function POST(request: Request) {
  const rawBody = await request.text();
  const secret = process.env.SNT_CALLBACK_SECRET ?? "";

  if (
    !verifySntCallback(
      secret,
      request.headers.get(SNT_TIMESTAMP_HEADER),
      request.headers.get(SNT_SIGNATURE_HEADER),
      rawBody,
    )
  ) {
    return NextResponse.json({ error: "Invalid signature." }, { status: 401 });
  }

  let body: CallbackBody;
  try {
    body = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: "Invalid JSON." }, { status: 400 });
  }

  const registrationId = body.registration_id;
  const orderId = optionalString(body.order_id);
  if (!isUuid(registrationId) || !orderId) {
    return NextResponse.json({ error: "registration_id and order_id are required." }, { status: 422 });
  }

  const supabase = createAdminClient();

  if (body.status === "captured") {
    const paymentId = optionalString(body.payment_id);
    if (!paymentId) {
      return NextResponse.json({ error: "payment_id is required for a captured payment." }, { status: 422 });
    }
    if (body.amount_paise !== SNT_AMOUNT_PAISE) {
      console.error("SNT callback amount mismatch:", { registrationId, amount: body.amount_paise });
      return NextResponse.json({ error: "amount_paise does not match the registration fee." }, { status: 422 });
    }

    const { data: hallTicketNo, error } = await supabase.rpc("snt_mark_paid", {
      p_registration_id: registrationId,
      p_batch: SNT_BATCH,
      p_order_id: orderId,
      p_payment_id: paymentId,
      p_transfer_id: optionalString(body.transfer_id),
    });

    if (error) {
      if (error.code === NOT_FOUND_ERROR_CODE) {
        return NextResponse.json({ error: "Registration not found." }, { status: 404 });
      }
      console.error("snt_mark_paid failed:", error);
      return NextResponse.json({ error: "Could not record the payment." }, { status: 500 });
    }

    return NextResponse.json({ status: "paid", hall_ticket_no: hallTicketNo });
  }

  if (body.status === "failed") {
    const { data: status, error } = await supabase.rpc("snt_mark_failed", {
      p_registration_id: registrationId,
      p_order_id: orderId,
    });

    if (error) {
      if (error.code === NOT_FOUND_ERROR_CODE) {
        return NextResponse.json({ error: "Registration not found." }, { status: 404 });
      }
      console.error("snt_mark_failed failed:", error);
      return NextResponse.json({ error: "Could not record the payment failure." }, { status: 500 });
    }

    return NextResponse.json({ status });
  }

  return NextResponse.json({ error: "status must be 'captured' or 'failed'." }, { status: 422 });
}
