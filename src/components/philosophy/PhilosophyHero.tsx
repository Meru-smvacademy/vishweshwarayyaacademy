import Container from "@/components/ui/Container";

export default function PhilosophyHero() {
  return (
    <section className="border-b border-line bg-surface-muted py-16 text-center sm:py-24">
      <Container>
        <p className="text-sm font-semibold uppercase tracking-wide text-primary">
          Our Philosophy
        </p>
        <h1 className="mx-auto mt-4 max-w-3xl text-3xl font-bold leading-tight text-primary sm:text-4xl lg:text-5xl">
          Come to Learn. Go to Serve.
        </h1>
      </Container>
    </section>
  );
}
