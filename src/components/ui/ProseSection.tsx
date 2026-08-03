import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import ContentBlocks from "@/components/ui/ContentBlocks";
import SectionHeading from "@/components/ui/SectionHeading";
import type { ContentBlock } from "@/content/shared";

type ProseSectionProps = {
  eyebrow?: string;
  title: string;
  blocks: ContentBlock[];
  tinted?: boolean;
  ctaLabel?: string;
  ctaHref?: string;
};

export default function ProseSection({
  eyebrow,
  title,
  blocks,
  tinted = false,
  ctaLabel,
  ctaHref,
}: ProseSectionProps) {
  return (
    <section className={`py-14 sm:py-20 ${tinted ? "bg-surface-muted" : ""}`}>
      <Container>
        <div className="mx-auto max-w-3xl">
          <SectionHeading eyebrow={eyebrow} title={title} align="left" />

          <div className="mt-6">
            <ContentBlocks blocks={blocks} />
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
