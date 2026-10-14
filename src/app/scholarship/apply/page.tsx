import type { Metadata } from "next";
import ScholarshipApplicationForm from "@/components/scholarship/ScholarshipApplicationForm";
import SntRegistrationClosed from "@/components/scholarship/SntRegistrationClosed";
import { SNT_EXAM } from "@/content/scholarship";
import { isSntRegistrationOpen } from "@/lib/snt/examSchedule";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Apply for SNT Scholarship — Vishweshwarayya NEET | JEE Academy",
  description:
    "Apply for the SNT Scholarship at Sir M Vishweshwarayya NEET | JEE Academy — submit your details for the NEET or JEE scholarship examination.",
  path: "/scholarship/apply",
});

// Re-checked every minute so the form disappears soon after the exam begins;
// the register route enforces the same cut-off on every submission.
export const revalidate = 60;

export default function ScholarshipApplicationPage() {
  return isSntRegistrationOpen(SNT_EXAM) ? <ScholarshipApplicationForm /> : <SntRegistrationClosed />;
}
