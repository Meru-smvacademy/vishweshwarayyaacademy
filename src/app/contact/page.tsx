import type { Metadata } from "next";
import ContactHero from "@/components/contact/ContactHero";
import HowCanWeHelpSection from "@/components/contact/HowCanWeHelpSection";
import TalkToAcademySection from "@/components/contact/TalkToAcademySection";
import CallUsSection from "@/components/contact/CallUsSection";
import CampusInformationSection from "@/components/contact/CampusInformationSection";
import ContactFinalCta from "@/components/contact/ContactFinalCta";

export const metadata: Metadata = {
  title: "Contact Us — Vishweshwarayya NEET | JEE Academy",
  description: "",
};

export default function ContactPage() {
  return (
    <>
      <ContactHero />
      <HowCanWeHelpSection />
      <TalkToAcademySection />
      <CallUsSection />
      <CampusInformationSection />
      <ContactFinalCta />
    </>
  );
}
