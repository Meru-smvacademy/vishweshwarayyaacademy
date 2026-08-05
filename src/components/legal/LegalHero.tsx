import Container from "@/components/ui/Container";

type LegalHeroProps = {
  title: string;
  lastUpdated: string;
};

export default function LegalHero({ title, lastUpdated }: LegalHeroProps) {
  return (
    <section className="border-b border-line bg-surface-muted py-16 sm:py-24">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">Legal</p>
          <h1 className="mt-4 text-3xl font-bold leading-tight text-primary sm:text-4xl lg:text-5xl">
            {title}
          </h1>
          <p className="mt-4 text-sm text-muted">Last updated: {lastUpdated}</p>
        </div>
      </Container>
    </section>
  );
}
