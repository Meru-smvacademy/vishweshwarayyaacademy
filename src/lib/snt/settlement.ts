import "server-only";
import { createAdminClient } from "@/lib/supabase/admin";
import {
  createRouteTransfer,
  describeRazorpayError,
  fetchRazorpayPayment,
  findExistingTransfer,
} from "@/lib/snt/razorpay";

export type SettlementResult =
  | { outcome: "done"; transferId: string; transferAmountPaise: number }
  | { outcome: "failed"; error: string }
  | { outcome: "not-claimed" };

const RETRY_DELAYS_MS = [0, 500, 1500, 3500];

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Net amount for the academy: everything the student paid minus Razorpay's
 * fee. Razorpay's `fee` already INCLUDES GST (`tax` is the GST part of it), so
 * tax is not subtracted a second time. Nothing else is deducted.
 */
export function netTransferAmount(amountPaise: number, feePaise: number): number {
  return amountPaise - feePaise;
}

async function attemptTransfer(paymentId: string, accountId: string) {
  const payment = await fetchRazorpayPayment(paymentId);
  if (payment.status !== "captured") throw new Error(`payment is ${payment.status}, not captured`);
  if (payment.fee === null) throw new Error("Razorpay fee not available on the payment yet");

  const amount = netTransferAmount(payment.amount, payment.fee);
  if (!(amount > 0 && amount <= payment.amount)) throw new Error(`computed transfer amount ${amount} is invalid`);

  const existing = await findExistingTransfer(paymentId, accountId);
  const transferId = existing?.id ?? (await createRouteTransfer(paymentId, accountId, amount));
  return { transferId, amount, fee: payment.fee, tax: payment.tax ?? 0 };
}

/**
 * Transfers the net amount of one captured SNT payment to the academy's Route
 * account, exactly once. Retries with backoff inside the call; if it still
 * fails, the failure is recorded so the admin page lists it and the webhook
 * can report an error (Razorpay then redelivers the event with its own backoff).
 */
export async function settleSntTransfer(registrationId: string): Promise<SettlementResult> {
  const supabase = createAdminClient();
  const accountId = process.env.SNT_ROUTE_ACCOUNT_ID;

  const { data: claimed, error: claimError } = await supabase.rpc("snt_claim_transfer", {
    p_registration_id: registrationId,
  });
  if (claimError) throw new Error(`could not claim transfer: ${claimError.message}`);
  const claim = (claimed as { payment_id: string; amount_paise: number }[] | null)?.[0];
  if (!claim) return { outcome: "not-claimed" };

  let lastError = "SNT_ROUTE_ACCOUNT_ID must be set.";
  if (accountId) {
    for (const delay of RETRY_DELAYS_MS) {
      if (delay) await sleep(delay);
      try {
        const result = await attemptTransfer(claim.payment_id, accountId);
        const { error } = await supabase.rpc("snt_record_transfer", {
          p_registration_id: registrationId,
          p_transfer_id: result.transferId,
          p_fee_paise: result.fee,
          p_tax_paise: result.tax,
          p_transfer_amount_paise: result.amount,
        });
        if (error) throw new Error(`transfer ${result.transferId} created but not recorded: ${error.message}`);
        return { outcome: "done", transferId: result.transferId, transferAmountPaise: result.amount };
      } catch (error) {
        lastError = describeRazorpayError(error);
      }
    }
  }

  await supabase.rpc("snt_record_transfer_failure", { p_registration_id: registrationId, p_error: lastError });
  console.error("SNT Route transfer failed:", { registrationId, error: lastError });
  return { outcome: "failed", error: lastError };
}
