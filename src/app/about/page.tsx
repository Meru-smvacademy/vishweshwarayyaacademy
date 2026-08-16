import type { Metadata } from "next";
import TeachingApproach from "@/components/about/TeachingApproach";
import InstitutionEngine from "@/components/about/InstitutionEngine";
import PhilosophyStatement from "@/components/about/PhilosophyStatement";
import TheFaculty from "@/components/about/TheFaculty";
import AdmissionCta from "@/components/home/AdmissionCta";

export const metadata: Metadata = {
  title: "About Us — Vishweshwarayya NEET | JEE Academy",
  description: "",
};

export default function AboutPage() {
  return (
    <>
      <TeachingApproach />

      <InstitutionEngine />

      <PhilosophyStatement />

      <TheFaculty />

      <AdmissionCta />
    </>
  );
}
