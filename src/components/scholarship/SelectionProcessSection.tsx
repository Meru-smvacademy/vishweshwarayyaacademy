import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { ChevronDownIcon } from "@/components/ui/icons";
import { SELECTION_PROCESS_INTRO, SELECTION_STEPS } from "@/content/scholarship";

export default function SelectionProcessSection() {
  return (
    <section className="bg-surface-muted py-14 sm:py-20">
      <Container>
        <div className="mx-auto max-w-3xl">
          <SectionHeading eyebrow="Selection Process" title="Selection Process" align="left" />
          <p className="mt-6 text-base leading-relaxed text-ink sm:text-lg">
            {SELECTION_PROCESS_INTRO}
          </p>
        </div>

        <ol className="mx-auto mt-10 flex max-w-md flex-col items-center">
          {SELECTION_STEPS.map((step, index) => (
            <li key={step.title} className="flex w-full flex-col items-center">
              <span className="flex w-full flex-col items-center gap-1 rounded-lg border border-line bg-surface px-5 py-4 text-center">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-semibold text-white">
                  {index + 1}
                </span>
                <span className="mt-2 text-base font-semibold text-primary">{step.title}</span>
                <span className="text-sm text-muted">{step.description}</span>
              </span>
              {index < SELECTION_STEPS.length - 1 && (
                <ChevronDownIcon className="my-2 h-5 w-5 text-muted" aria-hidden="true" />
              )}
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
