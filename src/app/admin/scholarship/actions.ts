"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { isUuid } from "@/lib/snt/registrations";
import { settleSntTransfer } from "@/lib/snt/settlement";

export type RetryTransferState = { success: boolean; message: string };

export async function retrySntTransferAction(registrationId: string): Promise<RetryTransferState> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { success: false, message: "You must be signed in to do that." };
  if (!isUuid(registrationId)) return { success: false, message: "Unknown registration." };

  const result = await settleSntTransfer(registrationId);
  revalidatePath("/admin/scholarship");

  if (result.outcome === "done") {
    return { success: true, message: `Transferred ₹${(result.transferAmountPaise / 100).toFixed(2)} (${result.transferId}).` };
  }
  if (result.outcome === "not-claimed") {
    return { success: false, message: "Nothing to retry — already transferred, or another attempt is in progress." };
  }
  return { success: false, message: `Transfer failed again: ${result.error}` };
}
