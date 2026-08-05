import type { Metadata } from "next";
import ContactHero from "@/components/contact/ContactHero";
import ContactInfoSection from "@/components/contact/ContactInfoSection";
import MapsSection from "@/components/contact/MapsSection";
import OfficeHoursSection from "@/components/contact/OfficeHoursSection";
import AdmissionCta from "@/components/home/AdmissionCta";

export const metadata: Metadata = {
  title: "Contact Us — Visveshwarayya NEET | JEE Academy",
  description: "",
};

export default function ContactPage() {
  return (
    <>
      <ContactHero />
      <ContactInfoSection />
      <MapsSection />
      <OfficeHoursSection />
      <AdmissionCta />
    </>
  );
}
