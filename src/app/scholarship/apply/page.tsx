import type { Metadata } from "next";
import SntRegistrationPage, { sntRegistrationMetadata } from "@/components/scholarship/SntRegistrationPage";

// Same page as /snt, kept for links and posters already in circulation;
// its canonical tag points at /snt.
export const metadata: Metadata = sntRegistrationMetadata;

// Re-checked every minute so the form disappears soon after the exam begins;
// the register route enforces the same cut-off on every submission.
export const revalidate = 60;

export default function ScholarshipApplicationPage() {
  return <SntRegistrationPage />;
}
