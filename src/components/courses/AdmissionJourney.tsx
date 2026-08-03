import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { ChevronDownIcon } from "@/components/ui/icons";
import { ADMISSION_JOURNEY } from "@/content/academicPathways";

export default function AdmissionJourney() {
  return (
    <section className="py-14 sm:py-20">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <SectionHeading eyebrow="The Journey" title="Admission Journey" />
          <p className="mt-4 text-base leading-relaxed text-ink sm:text-lg">{ADMISSION_JOURNEY.intro}</p>
        </div>

        <ol className="mx-auto mt-10 flex max-w-md flex-col items-center">
          {ADMISSION_JOURNEY.steps.map((step, index) => (
            <li key={step} className="flex w-full flex-col items-center">
              <span className="w-full rounded-lg border border-line bg-surface px-5 py-3 text-center text-sm font-semibold text-primary sm:text-base">
                {step}
              </span>
              {index < ADMISSION_JOURNEY.steps.length - 1 && (
                <ChevronDownIcon className="my-2 h-5 w-5 text-muted" aria-hidden="true" />
              )}
            </li>
          ))}
        </ol>

        <p className="mx-auto mt-8 max-w-md text-center text-lg font-semibold italic text-primary">
          {ADMISSION_JOURNEY.closing}
        </p>
      </Container>
    </section>
  );
}
