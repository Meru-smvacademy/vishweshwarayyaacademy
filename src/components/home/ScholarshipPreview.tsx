import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";

export default function ScholarshipPreview() {
  return (
    <section className="py-14 sm:py-20">
      <Container className="grid items-center gap-8 lg:grid-cols-[2fr_1fr]">
        <SectionHeading
          eyebrow="SNT Scholarship"
          title="Scholarship-cum-Nurture Test"
          align="left"
          description="A scholarship test that opens the door to academic guidance and support — take the test, and let your performance speak for itself."
        />
        <div className="flex lg:justify-end">
          <Button href="/scholarship" variant="secondary">
            Learn More
          </Button>
        </div>
      </Container>
    </section>
  );
}
