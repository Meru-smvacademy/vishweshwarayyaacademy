import "server-only";
import { createHmac, timingSafeEqual } from "node:crypto";
import Razorpay from "razorpay";
import { SNT_AMOUNT_PAISE, SNT_BATCH, SNT_PRODUCT } from "@/lib/snt/constants";

export const RAZORPAY_SIGNATURE_HEADER = "x-razorpay-signature";
export const RAZORPAY_EVENT_ID_HEADER = "x-razorpay-event-id";

export class RazorpayConfigError extends Error {}

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) throw new RazorpayConfigError(`${name} must be set.`);
  return value;
}

let client: Razorpay | null = null;

export function razorpayClient(): Razorpay {
  if (client) return client;
  client = new Razorpay({ key_id: requireEnv("RAZORPAY_KEY_ID"), key_secret: requireEnv("RAZORPAY_KEY_SECRET") });

  // Test-only: lets the integration suite point the SDK at a local mock of the
  // Razorpay API. Ignored in production builds. The SDK has no public option
  // for its host, so this sets the base URL on its internal axios instance.
  const testBaseUrl = process.env.RAZORPAY_API_BASE_URL;
  if (testBaseUrl && process.env.NODE_ENV !== "production") {
    (client as unknown as { api: { rq: { defaults: { baseURL: string } } } }).api.rq.defaults.baseURL = testBaseUrl;
  }
  return client;
}

export function razorpayKeyId(): string {
  return requireEnv("RAZORPAY_KEY_ID");
}

/** Verifies X-Razorpay-Signature: hex HMAC-SHA256 of the raw body with the webhook secret. */
export function verifyRazorpayWebhook(rawBody: string, signature: string | null): boolean {
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
  if (!secret || !signature || !/^[0-9a-f]{64}$/i.test(signature)) return false;
  const expected = createHmac("sha256", secret).update(rawBody).digest();
  const received = Buffer.from(signature, "hex");
  return expected.length === received.length && timingSafeEqual(expected, received);
}

export type SntOrder = { id: string; amount: number; currency: string };

export async function createSntRazorpayOrder(registrationId: string): Promise<SntOrder> {
  const order = await razorpayClient().orders.create({
    amount: SNT_AMOUNT_PAISE,
    currency: "INR",
    receipt: registrationId,
    notes: { product: SNT_PRODUCT, batch: SNT_BATCH, registration_id: registrationId },
  });
  return { id: order.id, amount: Number(order.amount), currency: order.currency };
}

export type SntPaymentRecord = {
  id: string;
  orderId: string;
  status: string;
  amount: number;
  currency: string;
  fee: number | null;
  tax: number | null;
};

export async function fetchRazorpayPayment(paymentId: string): Promise<SntPaymentRecord> {
  const payment = await razorpayClient().payments.fetch(paymentId);
  return {
    id: payment.id,
    orderId: String(payment.order_id ?? ""),
    status: payment.status,
    amount: Number(payment.amount),
    currency: payment.currency,
    fee: typeof payment.fee === "number" ? payment.fee : null,
    tax: typeof payment.tax === "number" ? payment.tax : null,
  };
}

export type SntOrderRecord = { id: string; amount: number; currency: string; receipt: string | null; notes: Record<string, unknown> };

export async function fetchRazorpayOrder(orderId: string): Promise<SntOrderRecord> {
  const order = await razorpayClient().orders.fetch(orderId);
  return {
    id: order.id,
    amount: Number(order.amount),
    currency: order.currency,
    receipt: order.receipt ?? null,
    notes: (order.notes ?? {}) as Record<string, unknown>,
  };
}

/**
 * Returns the id of an existing transfer from this payment to the account, if
 * one was already created (e.g. a previous attempt succeeded at Razorpay but
 * could not be recorded). This is what keeps the transfer exactly-once.
 */
export async function findExistingTransfer(paymentId: string, accountId: string): Promise<{ id: string; amount: number } | null> {
  const result = (await razorpayClient().payments.fetchTransfer(paymentId)) as unknown as {
    items?: { id: string; recipient?: string; amount?: number; status?: string }[];
  };
  const transfer = (result.items ?? []).find((t) => t.recipient === accountId && t.status !== "reversed");
  return transfer ? { id: transfer.id, amount: Number(transfer.amount) } : null;
}

export async function createRouteTransfer(paymentId: string, accountId: string, amountPaise: number): Promise<string> {
  const result = (await razorpayClient().payments.transfer(paymentId, {
    transfers: [{ account: accountId, amount: amountPaise, currency: "INR", on_hold: false }],
  })) as unknown as { items?: { id: string }[] };
  const id = result.items?.[0]?.id;
  if (!id) throw new Error("Razorpay returned no transfer id");
  return id;
}

/** Turns an SDK error into a short message that never includes credentials. */
export function describeRazorpayError(error: unknown): string {
  const e = error as { statusCode?: number; error?: { code?: string; description?: string }; message?: string };
  if (e?.error?.description) return `${e.statusCode ?? ""} ${e.error.code ?? ""} ${e.error.description}`.trim();
  return (e?.message ?? "Unknown Razorpay error").slice(0, 300);
}
