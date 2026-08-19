import type { Metadata } from "next";
import LegalHero from "@/components/legal/LegalHero";
import ProseSection from "@/components/ui/ProseSection";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import ContactCard from "@/components/ui/ContactCard";
import FinalCta from "@/components/home/FinalCta";
import { CONTACT_INTRO, LAST_UPDATED, PRIVACY_SECTIONS } from "@/content/privacyPolicy";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Privacy Policy — Vishweshwarayya NEET | JEE Academy",
  description: "The Privacy Policy for Sir M Vishweshwarayya NEET | JEE Academy's website and admissions process.",
  path: "/legal/privacy",
});

export default function PrivacyPolicyPage() {
  return (
    <>
      <LegalHero title="Privacy Policy" lastUpdated={LAST_UPDATED} />

      {PRIVACY_SECTIONS.map((section, index) => (
        <ProseSection
          key={section.title}
          title={section.title}
          blocks={section.blocks}
          tinted={index % 2 === 1}
        />
      ))}

      <section className={`py-14 sm:py-20 ${PRIVACY_SECTIONS.length % 2 === 1 ? "bg-surface-muted" : ""}`}>
        <Container>
          <div className="mx-auto max-w-3xl">
            <SectionHeading title="10. Contact Information" align="left" />
          </div>
          <div className="mt-8">
            <ContactCard intro={CONTACT_INTRO} />
          </div>
        </Container>
      </section>

      <FinalCta />
    </>
  );
}
