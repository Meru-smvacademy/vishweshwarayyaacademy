import type { Metadata } from "next";
import ScholarshipApplicationForm from "@/components/scholarship/ScholarshipApplicationForm";

export const metadata: Metadata = {
  title: "Apply for SNT Scholarship — Vishweshwarayya NEET | JEE Academy",
  description: "",
};

export default function ScholarshipApplicationPage() {
  return <ScholarshipApplicationForm />;
}
