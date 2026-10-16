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

// The database functions that claim, record and fail a transfer for one
// registrations table. The exam and the sports meet each have their own set;
// the transfer logic itself is shared.
type TransferRpcs = { claim: string; record: string; failure: string; label: string };

const SNT_TRANSFER_RPCS: TransferRpcs = {
  claim: "snt_claim_transfer",
  record: "snt_record_transfer",
  failure: "snt_record_transfer_failure",
  label: "SNT",
};

const SPORTS_TRANSFER_RPCS: TransferRpcs = {
  claim: "sports_claim_transfer",
  record: "sports_record_transfer",
  failure: "sports_record_transfer_failure",
  label: "SNT Sports",
};

/**
 * Transfers the net amount of one captured SNT exam payment to the academy's
 * Route account, exactly once. Retries with backoff inside the call; if it
 * still fails, the failure is recorded so the admin page lists it and the
 * webhook can report an error (Razorpay then redelivers the event with its own backoff).
 */
export function settleSntTransfer(registrationId: string): Promise<SettlementResult> {
  return settleRouteTransfer(registrationId, SNT_TRANSFER_RPCS);
}

/** The same, for one captured SNT Sports Meet payment (sports_registrations). */
export function settleSportsTransfer(registrationId: string): Promise<SettlementResult> {
  return settleRouteTransfer(registrationId, SPORTS_TRANSFER_RPCS);
}

async function settleRouteTransfer(registrationId: string, rpcs: TransferRpcs): Promise<SettlementResult> {
  const supabase = createAdminClient();
  const accountId = process.env.SNT_ROUTE_ACCOUNT_ID;

  const { data: claimed, error: claimError } = await supabase.rpc(rpcs.claim, {
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
        const { error } = await supabase.rpc(rpcs.record, {
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

  await supabase.rpc(rpcs.failure, { p_registration_id: registrationId, p_error: lastError });
  console.error(`${rpcs.label} Route transfer failed:`, { registrationId, error: lastError });
  return { outcome: "failed", error: lastError };
}
