import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { LEARNING_ADVANTAGE } from "@/content/academicPathways";

export default function LearningAdvantage() {
  return (
    <section className="bg-surface-muted py-14 sm:py-20">
      <Container>
        <div className="mx-auto max-w-3xl">
          <SectionHeading eyebrow="Our Advantage" title="The Visveshwarayya Learning Advantage" align="left" />

          <p className="mt-6 text-base leading-relaxed text-ink sm:text-lg">
            {LEARNING_ADVANTAGE.intro}
          </p>
          <p className="mt-4 text-base leading-relaxed text-ink sm:text-lg">
            {LEARNING_ADVANTAGE.leadIn}
          </p>

          <ul className="mt-4 grid gap-x-6 gap-y-2 text-base text-ink sm:grid-cols-2 sm:text-lg">
            {LEARNING_ADVANTAGE.items.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span
                  className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-primary"
                  aria-hidden="true"
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <p className="mt-6 text-base leading-relaxed text-ink sm:text-lg">
            {LEARNING_ADVANTAGE.closing}
          </p>
        </div>
      </Container>
    </section>
  );
}
