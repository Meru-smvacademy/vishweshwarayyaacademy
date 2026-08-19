import type { Metadata } from "next";
import HostelHero from "@/components/hostel/HostelHero";
import HostelFacilitiesGridSection from "@/components/hostel/HostelFacilitiesGridSection";
import SeparateResidencesSection from "@/components/hostel/SeparateResidencesSection";
import HostelFinalCtaSection from "@/components/hostel/HostelFinalCtaSection";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Hostel Facilities — Vishweshwarayya NEET | JEE Academy",
  description:
    "A safe, disciplined and supportive residential environment for students at Sir M Vishweshwarayya NEET | JEE Academy, designed to support focused academic preparation.",
  path: "/hostel",
});

export default function HostelPage() {
  return (
    <>
      <HostelHero />

      <HostelFacilitiesGridSection />

      <SeparateResidencesSection />

      <HostelFinalCtaSection />
    </>
  );
}
