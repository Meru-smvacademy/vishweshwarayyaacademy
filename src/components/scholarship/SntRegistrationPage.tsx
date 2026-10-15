import type { Metadata } from "next";
import ScholarshipApplicationForm from "@/components/scholarship/ScholarshipApplicationForm";
import SntRegistrationClosed from "@/components/scholarship/SntRegistrationClosed";
import { SNT_EXAM } from "@/content/scholarship";
import { SNT_REGISTRATION_PATH } from "@/lib/snt/constants";
import { isSntRegistrationOpen } from "@/lib/snt/examSchedule";
import { pageMetadata } from "@/lib/seo";

// Served at both /snt (canonical, printed on posters and QR codes) and
// /scholarship/apply (older links). Both point their canonical tag at /snt.
export const sntRegistrationMetadata: Metadata = pageMetadata({
  title: "Apply for SNT Scholarship — Vishweshwarayya NEET | JEE Academy",
  description:
    "Apply for the SNT Scholarship at Sir M Vishweshwarayya NEET | JEE Academy — submit your details for the NEET or JEE scholarship examination.",
  path: SNT_REGISTRATION_PATH,
});

export default function SntRegistrationPage() {
  return isSntRegistrationOpen(SNT_EXAM) ? <ScholarshipApplicationForm /> : <SntRegistrationClosed />;
}
