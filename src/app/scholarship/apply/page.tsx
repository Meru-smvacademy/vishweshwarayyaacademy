import type { Metadata } from "next";
import ScholarshipApplicationForm from "@/components/scholarship/ScholarshipApplicationForm";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Apply for SNT Scholarship — Vishweshwarayya NEET | JEE Academy",
  description:
    "Apply for the SNT Scholarship at Sir M Vishweshwarayya NEET | JEE Academy — submit your details for the NEET or JEE scholarship examination.",
  path: "/scholarship/apply",
});

export default function ScholarshipApplicationPage() {
  return <ScholarshipApplicationForm />;
}
