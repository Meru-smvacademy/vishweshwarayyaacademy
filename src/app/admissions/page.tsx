import type { Metadata } from "next";
import AdmissionsHero from "@/components/admissions/AdmissionsHero";
import AdmissionsProgramSelector from "@/components/admissions/AdmissionsProgramSelector";
import AdmissionProcessSection from "@/components/admissions/AdmissionProcessSection";
import AdmissionCta from "@/components/home/AdmissionCta";

export const metadata: Metadata = {
  title: "Admissions — Vishweshwarayya NEET | JEE Academy",
  description: "",
};

export default function AdmissionsPage() {
  return (
    <>
      <AdmissionsHero />
      <AdmissionsProgramSelector />
      <AdmissionProcessSection />
      <AdmissionCta />
    </>
  );
}
