import { SNT_EXAM } from "@/content/scholarship";

export const SNT_PRODUCT = "SNT";
// Informational tag on Razorpay orders; payments are matched on product + registration id.
export const SNT_BATCH = `SNT${SNT_EXAM.examYear}`;
// Fixed server-side; the browser never supplies the amount.
export const SNT_AMOUNT_PAISE = 50000;

export const SNT_PHOTO_BUCKET = "snt-photos";
export const SNT_PHOTO_MAX_BYTES = 4 * 1024 * 1024;
export const SNT_PHOTO_MAX_WIDTH = 600;
export const SNT_PHOTO_MAX_HEIGHT = 800;
export const SNT_PHOTO_MIN_SIDE = 100;
export const SNT_PHOTO_TYPES = ["image/jpeg", "image/png"];

// The SNT form offers only these; older rows may still hold other values
// (see SCHOLARSHIP_PATHWAYS / EDUCATION_COMPLETED_OPTIONS for the admin filters).
export const SNT_APPLYING_FOR_OPTIONS = ["NEET Achievement"];
// The stored value stays "Class 10" (the database allows only 'Class 10' and
// 'Class 12'); students see the label below. The column name
// education_completed is historical: it holds the class the student is
// currently studying in.
export const SNT_EDUCATION_OPTIONS = ["Class 10"];
const SNT_CLASS_LABELS: Record<string, string> = { "Class 10": "10th Standard (SSLC)" };

export function sntClassLabel(value: string): string {
  return SNT_CLASS_LABELS[value] ?? value;
}

// Medium of studying — the office uses medium-wise counts to set question papers.
export const SNT_MEDIUMS = ["Kannada", "English", "Urdu", "Other"] as const;
export type SntMedium = (typeof SNT_MEDIUMS)[number];

export const SNT_STATUSES = ["pending", "paid", "failed"] as const;
export type SntStatus = (typeof SNT_STATUSES)[number];

export const SNT_CONSENT_TEXT =
  "I am the parent/guardian, or I have my parent's/guardian's permission. I agree to the student's photo and details being used for this scholarship exam, the hall ticket, and announcing results.";

export const SNT_RULES_PDF_PATH = "/api/scholarship/rules";

// Public address of the registration form (posters, QR codes, canonical URL).
// /scholarship/apply serves the same page for older links.
export const SNT_REGISTRATION_PATH = "/snt";

export function sntRegistrationPath(id: string): string {
  return `/scholarship/registration/${id}`;
}

export function sntTicketPath(id: string): string {
  return `/api/scholarship/ticket/${id}`;
}
