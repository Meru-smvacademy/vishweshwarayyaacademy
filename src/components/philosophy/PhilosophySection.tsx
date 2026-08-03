import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";

type PhilosophySectionProps = {
  eyebrow?: string;
  title: string;
  quote?: string;
  paragraphs: string[];
  tinted?: boolean;
  ctaLabel?: string;
  ctaHref?: string;
};

export default function PhilosophySection({
  eyebrow,
  title,
  quote,
  paragraphs,
  tinted = false,
  ctaLabel,
  ctaHref,
}: PhilosophySectionProps) {
  return (
    <section className={`py-14 sm:py-20 ${tinted ? "bg-surface-muted" : ""}`}>
      <Container>
        <div className="mx-auto max-w-3xl">
          <SectionHeading eyebrow={eyebrow} title={title} align="left" />

          {quote && (
            <p className="mt-6 text-xl font-semibold italic leading-snug text-primary sm:text-2xl">
              {quote}
            </p>
          )}

          <div className="mt-6 space-y-4 text-base leading-relaxed text-ink sm:text-lg">
            {paragraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          {ctaLabel && ctaHref && (
            <div className="mt-8">
              <Button href={ctaHref} variant="outline">
                {ctaLabel}
              </Button>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
