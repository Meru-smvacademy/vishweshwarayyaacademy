import "server-only";
import { createHmac, timingSafeEqual } from "node:crypto";

export const SNT_SIGNATURE_HEADER = "x-snt-signature";
export const SNT_TIMESTAMP_HEADER = "x-snt-timestamp";
const MAX_CLOCK_SKEW_SECONDS = 300;

export function signSntCallback(secret: string, timestamp: string, rawBody: string): string {
  return createHmac("sha256", secret).update(`${timestamp}.${rawBody}`).digest("hex");
}

/**
 * Verifies a payment-status callback from the Kalbantt payment service.
 * Signature = hex(HMAC-SHA256(SNT_CALLBACK_SECRET, `${timestamp}.${rawBody}`)).
 * The timestamp (unix seconds) bounds replay of a captured request.
 */
export function verifySntCallback(
  secret: string,
  timestamp: string | null,
  signature: string | null,
  rawBody: string,
  nowSeconds: number = Math.floor(Date.now() / 1000),
): boolean {
  if (!secret || !timestamp || !signature || !/^\d{1,12}$/.test(timestamp) || !/^[0-9a-f]{64}$/i.test(signature)) {
    return false;
  }
  if (Math.abs(nowSeconds - Number(timestamp)) > MAX_CLOCK_SKEW_SECONDS) {
    return false;
  }

  const expected = Buffer.from(signSntCallback(secret, timestamp, rawBody), "hex");
  const received = Buffer.from(signature, "hex");
  return expected.length === received.length && timingSafeEqual(expected, received);
}
