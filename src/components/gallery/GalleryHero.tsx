import Container from "@/components/ui/Container";
import { INTRODUCTION_TEXT } from "@/content/gallery";

export default function GalleryHero() {
  return (
    <section className="border-b border-line bg-surface-muted py-16 sm:py-24">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-3xl font-bold leading-tight text-primary sm:text-4xl lg:text-5xl">
            Gallery
          </h1>
          <p className="mt-6 text-base leading-relaxed text-ink sm:text-lg">{INTRODUCTION_TEXT}</p>
        </div>
      </Container>
    </section>
  );
}
