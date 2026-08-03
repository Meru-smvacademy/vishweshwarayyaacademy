import Container from "@/components/ui/Container";
import PlaceholderTag from "@/components/ui/PlaceholderTag";
import SectionHeading from "@/components/ui/SectionHeading";

export default function RequiredDocumentsSection() {
  return (
    <section className="py-14 sm:py-20">
      <Container>
        <div className="mx-auto max-w-3xl">
          <SectionHeading eyebrow="Required Documents" title="Required Documents" align="left" />
          <div className="mt-6">
            <PlaceholderTag label="Document checklist pending — not yet supplied in ADMISSIONS_FOUNDATION.md" />
          </div>
        </div>
      </Container>
    </section>
  );
}
