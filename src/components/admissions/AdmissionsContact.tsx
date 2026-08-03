import Container from "@/components/ui/Container";
import ContactCard from "@/components/ui/ContactCard";
import SectionHeading from "@/components/ui/SectionHeading";
import { CONTACT_INTRO } from "@/content/admissions";

export default function AdmissionsContact() {
  return (
    <section className="bg-surface-muted py-14 sm:py-20">
      <Container>
        <div className="mx-auto max-w-3xl">
          <SectionHeading eyebrow="Contact" title="Contact" align="left" />
        </div>
        <div className="mt-8">
          <ContactCard intro={CONTACT_INTRO} prominentCalls />
        </div>
      </Container>
    </section>
  );
}
