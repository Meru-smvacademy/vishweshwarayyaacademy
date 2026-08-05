import Container from "@/components/ui/Container";

export default function AboutHero() {
  return (
    <section className="border-b border-line bg-surface-muted py-16 text-center sm:py-24">
      <Container>
        <p className="text-sm font-semibold uppercase tracking-wide text-primary">About Us</p>
        <h1 className="mx-auto mt-4 max-w-3xl text-3xl font-bold leading-tight text-primary sm:text-4xl lg:text-5xl">
          About Visveshwarayya Academy
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-base text-muted sm:text-lg">
          Visveshwarayya NEET | JEE Academy is a dedicated coaching institution with campuses in
          Lingasuguru and Sindhanur, helping students from North Karnataka pursue NEET, JEE, and
          KCET success close to home.
        </p>
      </Container>
    </section>
  );
}
