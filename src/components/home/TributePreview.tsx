import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";

export default function TributePreview() {
  return (
    <section className="bg-surface-muted py-14 sm:py-20">
      <Container className="grid items-center gap-8 lg:grid-cols-[2fr_1fr]">
        <SectionHeading
          eyebrow="Our Namesake"
          title="The Tribute — Sir M. Visvesvaraya"
          align="left"
          description="Placeholder text — final tribute content honouring the life and legacy of Sir M. Visvesvaraya is pending."
          placeholder
        />
        <div className="flex lg:justify-end">
          <Button href="/tribute" variant="outline">
            Read the Story
          </Button>
        </div>
      </Container>
    </section>
  );
}
