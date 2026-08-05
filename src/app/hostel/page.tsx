import type { Metadata } from "next";
import HostelHero from "@/components/hostel/HostelHero";
import AccommodationSection from "@/components/hostel/AccommodationSection";
import HostelFacilitiesSection from "@/components/hostel/HostelFacilitiesSection";
import StudentLifeSection from "@/components/hostel/StudentLifeSection";
import HostelContactSection from "@/components/hostel/HostelContactSection";
import ProseSection from "@/components/ui/ProseSection";
import AdmissionCta from "@/components/home/AdmissionCta";
import { ABOUT_TEXT } from "@/content/hostel";

export const metadata: Metadata = {
  title: "Hostel Facilities — Visveshwarayya NEET | JEE Academy",
  description: "",
};

export default function HostelPage() {
  return (
    <>
      <HostelHero />

      <ProseSection
        eyebrow="About Our Hostels"
        title="About Our Hostels"
        blocks={[{ type: "p", text: ABOUT_TEXT }]}
      />

      <AccommodationSection />
      <HostelFacilitiesSection />
      <StudentLifeSection />
      <HostelContactSection />

      <AdmissionCta />
    </>
  );
}
