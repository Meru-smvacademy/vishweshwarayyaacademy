import "server-only";
import { razorpayClient, type SntOrder } from "@/lib/snt/razorpay";
import { SPORTS_AMOUNT_PAISE, SPORTS_BATCH, SPORTS_PRODUCT } from "@/lib/sports/constants";

/** Same Razorpay account and client as the exam; only the product tag differs. */
export async function createSportsRazorpayOrder(registrationId: string): Promise<SntOrder> {
  const order = await razorpayClient().orders.create({
    amount: SPORTS_AMOUNT_PAISE,
    currency: "INR",
    receipt: registrationId,
    notes: { product: SPORTS_PRODUCT, batch: SPORTS_BATCH, registration_id: registrationId },
  });
  return { id: order.id, amount: Number(order.amount), currency: order.currency };
}
