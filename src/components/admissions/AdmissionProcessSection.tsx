import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import StepTimeline from "@/components/ui/StepTimeline";
import { ADMISSION_PROCESS_STEPS } from "@/content/admissions";

export default function AdmissionProcessSection() {
  return (
    <section className="bg-surface-muted py-14 sm:py-20">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <SectionHeading eyebrow="Admission Process" title="Admission Process" />
        </div>

        <div className="mt-10">
          <StepTimeline steps={ADMISSION_PROCESS_STEPS} />
        </div>
      </Container>
    </section>
  );
}
