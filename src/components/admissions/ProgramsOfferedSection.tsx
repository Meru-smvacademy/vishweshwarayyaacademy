import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import IconCardGrid from "@/components/ui/IconCardGrid";
import SectionHeading from "@/components/ui/SectionHeading";
import { BookIcon } from "@/components/ui/icons";
import { PROGRAMS_OFFERED } from "@/content/admissions";

export default function ProgramsOfferedSection() {
  return (
    <section className="py-14 sm:py-20">
      <Container>
        <div className="mx-auto max-w-3xl">
          <SectionHeading eyebrow="Programs Offered" title="Programs Offered" align="left" />
        </div>

        <div className="mx-auto mt-8 max-w-5xl">
          <IconCardGrid icon={BookIcon} items={PROGRAMS_OFFERED} />
        </div>

        <div className="mt-8 flex justify-center">
          <Button href="/courses" variant="outline">
            Explore Courses
          </Button>
        </div>
      </Container>
    </section>
  );
}
