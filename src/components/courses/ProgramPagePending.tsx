import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";

export default function ProgramPagePending({ programName }: { programName: string }) {
  return (
    <section className="py-20 sm:py-28">
      <Container className="flex flex-col items-center gap-8">
        <SectionHeading
          eyebrow="Academic Pathways"
          title={programName}
          description="This program page is being designed and will be published separately."
          placeholder
        />
        <Button href="/courses" variant="outline">
          Back to Academic Pathways
        </Button>
      </Container>
    </section>
  );
}
