import type { Metadata } from "next";
import TeachingApproach from "@/components/about/TeachingApproach";
import InstitutionEngine from "@/components/about/InstitutionEngine";
import PhilosophyStatement from "@/components/about/PhilosophyStatement";
import TheFaculty from "@/components/about/TheFaculty";
import AdmissionCta from "@/components/home/AdmissionCta";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "About Us — Vishweshwarayya NEET | JEE Academy",
  description:
    "Learn how Sir M Vishweshwarayya NEET | JEE Academy teaches — understanding each student, adapting the approach, and building faculty-led mentoring across the Lingasuguru and Sindhanur campuses.",
  path: "/about",
});

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
