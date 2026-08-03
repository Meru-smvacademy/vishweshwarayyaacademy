import Container from "@/components/ui/Container";
import ContactCard from "@/components/ui/ContactCard";
import SectionHeading from "@/components/ui/SectionHeading";
import { CONTACT } from "@/content/scholarship";

export default function ScholarshipContact() {
  return (
    <section className="bg-surface-muted py-14 sm:py-20">
      <Container>
        <div className="mx-auto max-w-3xl">
          <SectionHeading eyebrow="Contact for Scholarship" title="Contact" align="left" />
        </div>
        <div className="mt-8">
          <ContactCard intro={CONTACT.intro} closing={CONTACT.closing} website={CONTACT.website} />
        </div>
      </Container>
    </section>
  );
}
