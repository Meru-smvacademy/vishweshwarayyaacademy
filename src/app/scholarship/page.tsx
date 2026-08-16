import type { Metadata } from "next";
import SntScholarshipHero from "@/components/scholarship/SntScholarshipHero";
import TheManBehindSntSection from "@/components/scholarship/TheManBehindSntSection";
import SntScholarshipExaminationSection from "@/components/scholarship/SntScholarshipExaminationSection";
import SntFinalCtaSection from "@/components/scholarship/SntFinalCtaSection";

export const metadata: Metadata = {
  title: "SNT Scholarship — Vishweshwarayya NEET | JEE Academy",
  description: "",
};

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
