import type { Metadata } from "next";
import AdmissionsHero from "@/components/admissions/AdmissionsHero";
import AdmissionsProgramSelector from "@/components/admissions/AdmissionsProgramSelector";
import AdmissionProcessSection from "@/components/admissions/AdmissionProcessSection";
import AdmissionCta from "@/components/home/AdmissionCta";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Admissions — Vishweshwarayya NEET | JEE Academy",
  description:
    "See the admission process at Sir M Vishweshwarayya NEET | JEE Academy — choose a program, understand the steps, and start your NEET, JEE or KCET preparation journey.",
  path: "/admissions",
});

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
