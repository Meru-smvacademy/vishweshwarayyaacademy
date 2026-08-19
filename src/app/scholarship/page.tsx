import type { Metadata } from "next";
import SntScholarshipHero from "@/components/scholarship/SntScholarshipHero";
import TheManBehindSntSection from "@/components/scholarship/TheManBehindSntSection";
import SntScholarshipExaminationSection from "@/components/scholarship/SntScholarshipExaminationSection";
import SntFinalCtaSection from "@/components/scholarship/SntFinalCtaSection";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "SNT Scholarship — Vishweshwarayya NEET | JEE Academy",
  description:
    "Learn about the SNT Scholarship at Sir M Vishweshwarayya NEET | JEE Academy — eligibility, the examination process and how meritorious students are selected.",
  path: "/scholarship",
});

export default function ScholarshipPage() {
  return (
    <>
      <SntScholarshipHero />

      <TheManBehindSntSection />

      <SntScholarshipExaminationSection />

      <SntFinalCtaSection />
    </>
  );
}
