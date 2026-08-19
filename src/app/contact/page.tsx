import type { Metadata } from "next";
import ContactHero from "@/components/contact/ContactHero";
import HowCanWeHelpSection from "@/components/contact/HowCanWeHelpSection";
import TalkToAcademySection from "@/components/contact/TalkToAcademySection";
import CallUsSection from "@/components/contact/CallUsSection";
import CampusInformationSection from "@/components/contact/CampusInformationSection";
import ContactFinalCta from "@/components/contact/ContactFinalCta";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Contact Us — Vishweshwarayya NEET | JEE Academy",
  description:
    "Get in touch with Sir M Vishweshwarayya NEET | JEE Academy — phone, campus locations and enquiry details for our Lingasuguru and Sindhanur campuses.",
  path: "/contact",
});

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
