import "server-only";
import { SNT_AMOUNT_PAISE, SNT_BATCH, SNT_PRODUCT } from "@/lib/snt/constants";

export type KalbanttOrder = { orderId: string; amountPaise: number; currency: string };

export class KalbanttPayError extends Error {}

const REQUEST_TIMEOUT_MS = 15000;

/**
 * Asks the Kalbantt payment service (the only holder of Razorpay credentials)
 * to create a Razorpay order for one SNT registration. The service applies the
 * Razorpay Route transfer to the academy's linked account.
 */
export async function createKalbanttOrder(registrationId: string): Promise<KalbanttOrder> {
  const url = process.env.KALBANTT_PAY_API_URL;
  const token = process.env.KALBANTT_PAY_SERVICE_TOKEN;
  if (!url || !token) {
    throw new KalbanttPayError("KALBANTT_PAY_API_URL and KALBANTT_PAY_SERVICE_TOKEN must be set.");
  }

  let response: Response;
  try {
    response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "Idempotency-Key": `snt-order-${registrationId}-${Date.now()}`,
      },
      body: JSON.stringify({
        product: SNT_PRODUCT,
        batch: SNT_BATCH,
        registration_id: registrationId,
        amount_paise: SNT_AMOUNT_PAISE,
      }),
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
      cache: "no-store",
    });
  } catch (error) {
    throw new KalbanttPayError(`Payment service unreachable: ${(error as Error).message}`);
  }

  if (!response.ok) {
    throw new KalbanttPayError(`Payment service returned ${response.status}`);
  }

  const data = (await response.json().catch(() => null)) as {
    order_id?: unknown;
    amount_paise?: unknown;
    currency?: unknown;
  } | null;

  if (!data || typeof data.order_id !== "string" || !data.order_id.startsWith("order_")) {
    throw new KalbanttPayError("Payment service returned no order id");
  }
  // Defends against a misconfigured service creating an order for a different amount.
  if (data.amount_paise !== undefined && data.amount_paise !== SNT_AMOUNT_PAISE) {
    throw new KalbanttPayError(`Payment service created an order for ${String(data.amount_paise)} paise`);
  }

  return {
    orderId: data.order_id,
    amountPaise: SNT_AMOUNT_PAISE,
    currency: typeof data.currency === "string" ? data.currency : "INR",
  };
}
