import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { ExternalLinkIcon } from "@/components/ui/icons";

type AboutGatewaySectionProps = {
  eyebrow: string;
  title: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
  external?: boolean;
  tinted?: boolean;
};

export default function AboutGatewaySection({
  eyebrow,
  title,
  description,
  ctaLabel,
  ctaHref,
  external = false,
  tinted = false,
}: AboutGatewaySectionProps) {
  return (
    <section className={`py-14 sm:py-20 ${tinted ? "bg-surface-muted" : ""}`}>
      <Container className="grid items-center gap-8 lg:grid-cols-[2fr_1fr]">
        <SectionHeading eyebrow={eyebrow} title={title} description={description} align="left" />
        <div className="flex lg:justify-end">
          <Button
            href={ctaHref}
            variant="outline"
            {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          >
            {ctaLabel}
            {external && (
              <>
                <ExternalLinkIcon className="h-4 w-4" />
                <span className="sr-only"> (opens in a new tab)</span>
              </>
            )}
          </Button>
        </div>
      </Container>
    </section>
  );
}
