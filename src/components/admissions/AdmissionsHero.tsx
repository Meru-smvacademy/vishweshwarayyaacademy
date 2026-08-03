import Container from "@/components/ui/Container";
import { ADMISSIONS_OPEN_TEXT } from "@/content/admissions";

export default function AdmissionsHero() {
  return (
    <section className="border-b border-line bg-surface-muted py-16 sm:py-24">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-3xl font-bold leading-tight text-primary sm:text-4xl lg:text-5xl">
            Admissions
          </h1>
          <p className="mt-6 text-base leading-relaxed text-ink sm:text-lg">
            {ADMISSIONS_OPEN_TEXT}
          </p>
        </div>
      </Container>
    </section>
  );
}
