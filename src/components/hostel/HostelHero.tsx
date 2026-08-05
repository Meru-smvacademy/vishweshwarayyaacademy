import Container from "@/components/ui/Container";

export default function HostelHero() {
  return (
    <section className="border-b border-line bg-surface-muted py-16 sm:py-24">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-3xl font-bold leading-tight text-primary sm:text-4xl lg:text-5xl">
            Hostel Facilities
          </h1>
          <p className="mt-6 text-base leading-relaxed text-ink sm:text-lg">
            A safe, comfortable, and student-friendly environment that supports academic success.
          </p>
        </div>
      </Container>
    </section>
  );
}
