import { SPORTS_MEET } from "@/content/sports";

// Razorpay order/payment notes tag. The exam uses "SNT"; the shared webhook
// routes "SNT_SPORTS" to sports_registrations and ignores anything else.
export const SPORTS_PRODUCT = "SNT_SPORTS";
// Informational tag on Razorpay orders; payments are matched on product + registration id.
export const SPORTS_BATCH = `SPORTS${SPORTS_MEET.eventYear}`;
// Fixed server-side; the browser never supplies the amount.
export const SPORTS_AMOUNT_PAISE = 50000;

export const SPORTS_PHOTO_BUCKET = "sports-photos";
export const SPORTS_DOCUMENT_BUCKET = "sports-documents";
export const SPORTS_DOCUMENT_MAX_BYTES = 2 * 1024 * 1024;
export const SPORTS_DOCUMENT_TYPES = ["image/jpeg", "image/png", "application/pdf"];
// Vercel refuses request bodies over 4.5 MB, so the photo and both
// certificates must fit in one request below that.
export const SPORTS_REQUEST_MAX_BYTES = Math.floor(4.4 * 1024 * 1024);

export const SPORTS_STATUSES = ["pending", "paid", "failed"] as const;
export type SportsStatus = (typeof SPORTS_STATUSES)[number];

export const SPORTS_CONSENT_TEXT =
  "I am the parent/guardian, or I have my parent's/guardian's permission. I agree to the student's photo, certificates and details being used for the SNT Sports Meet, the entry card, and announcing results.";

// Public address of the form (posters, QR codes, canonical URL).
export const SPORTS_REGISTRATION_PATH = "/sports";

export function sportsRegistrationPath(id: string): string {
  return `/sports/registration/${id}`;
}

export function sportsCardPath(id: string): string {
  return `/api/sports/card/${id}`;
}
