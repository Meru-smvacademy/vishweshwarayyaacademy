import Container from "@/components/ui/Container";

export default function FaqHero() {
  return (
    <section className="border-b border-line bg-surface-muted py-16 sm:py-24">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-3xl font-bold leading-tight text-primary sm:text-4xl lg:text-5xl">
            Frequently Asked Questions
          </h1>
        </div>
      </Container>
    </section>
  );
}
