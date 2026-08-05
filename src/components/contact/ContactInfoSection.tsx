import Container from "@/components/ui/Container";
import ContactCard from "@/components/ui/ContactCard";
import SectionHeading from "@/components/ui/SectionHeading";

export default function ContactInfoSection() {
  return (
    <section className="py-14 sm:py-20">
      <Container>
        <div className="mx-auto max-w-3xl">
          <SectionHeading eyebrow="Contact Information" title="Contact Information" align="left" />
        </div>
        <div className="mt-8">
          <ContactCard prominentCalls />
        </div>
      </Container>
    </section>
  );
}
