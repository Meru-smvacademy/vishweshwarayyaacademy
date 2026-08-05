import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { STUDENT_LIFE_TEXT } from "@/content/hostel";

export default function StudentLifeSection() {
  return (
    <section className="bg-surface-muted py-14 sm:py-20">
      <Container>
        <div className="mx-auto max-w-3xl">
          <SectionHeading title="Student Life" align="left" />
          <p className="mt-6 text-base leading-relaxed text-ink sm:text-lg">{STUDENT_LIFE_TEXT}</p>
        </div>
      </Container>
    </section>
  );
}
