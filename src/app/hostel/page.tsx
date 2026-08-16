import type { Metadata } from "next";
import HostelHero from "@/components/hostel/HostelHero";
import HostelFacilitiesGridSection from "@/components/hostel/HostelFacilitiesGridSection";
import SeparateResidencesSection from "@/components/hostel/SeparateResidencesSection";
import HostelFinalCtaSection from "@/components/hostel/HostelFinalCtaSection";

export const metadata: Metadata = {
  title: "Hostel Facilities — Vishweshwarayya NEET | JEE Academy",
  description: "",
};

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
