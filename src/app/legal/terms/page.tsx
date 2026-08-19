import type { Metadata } from "next";
import LegalHero from "@/components/legal/LegalHero";
import ProseSection from "@/components/ui/ProseSection";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import ContactCard from "@/components/ui/ContactCard";
import FinalCta from "@/components/home/FinalCta";
import { CONTACT_INTRO, LAST_UPDATED, TERMS_SECTIONS } from "@/content/termsConditions";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Terms & Conditions — Vishweshwarayya NEET | JEE Academy",
  description: "The Terms & Conditions for Sir M Vishweshwarayya NEET | JEE Academy's website and admissions process.",
  path: "/legal/terms",
});

export default function TermsPage() {
  return (
    <>
      <LegalHero title="Terms & Conditions" lastUpdated={LAST_UPDATED} />

      {TERMS_SECTIONS.map((section, index) => (
        <ProseSection
          key={section.title}
          title={section.title}
          blocks={section.blocks}
          tinted={index % 2 === 1}
        />
      ))}

      <section className={`py-14 sm:py-20 ${TERMS_SECTIONS.length % 2 === 1 ? "bg-surface-muted" : ""}`}>
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
