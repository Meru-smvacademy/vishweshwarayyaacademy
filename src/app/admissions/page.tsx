import type { Metadata } from "next";
import AdmissionsHero from "@/components/admissions/AdmissionsHero";
import ProgramsOfferedSection from "@/components/admissions/ProgramsOfferedSection";
import AdmissionProcessSection from "@/components/admissions/AdmissionProcessSection";
import RequiredDocumentsSection from "@/components/admissions/RequiredDocumentsSection";
import AdmissionsContact from "@/components/admissions/AdmissionsContact";
import FinalCta from "@/components/home/FinalCta";

export const metadata: Metadata = {
  title: "Admissions — Visveshwarayya NEET | JEE Academy",
  description: "",
};

export default function AdmissionsPage() {
  return (
    <>
      <AdmissionsHero />
      <ProgramsOfferedSection />
      <AdmissionProcessSection />
      <RequiredDocumentsSection />
      <AdmissionsContact />
      <FinalCta />
    </>
  );
}
