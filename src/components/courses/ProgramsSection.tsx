import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import ProgramAccordion from "@/components/courses/ProgramAccordion";
import { ACADEMIC_PROGRAMS } from "@/content/academicPathways";

export default function ProgramsSection() {
  return (
    <section className="py-14 sm:py-20">
      <Container>
        <SectionHeading eyebrow="Our Programs" title="Choose Your Academic Pathway" />

        <div className="mx-auto mt-10 flex max-w-3xl flex-col gap-4">
          {ACADEMIC_PROGRAMS.map((program) => (
            <ProgramAccordion key={program.slug} program={program} />
          ))}
        </div>
      </Container>
    </section>
  );
}
