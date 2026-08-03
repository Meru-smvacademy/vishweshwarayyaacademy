import Container from "@/components/ui/Container";
import ContentBlocks from "@/components/ui/ContentBlocks";
import { INTRODUCTION } from "@/content/scholarship";

export default function ScholarshipIntro() {
  return (
    <section className="border-b border-line bg-surface-muted py-16 sm:py-24">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-3xl font-bold leading-tight text-primary sm:text-4xl lg:text-5xl">
            SNT Scholarship
          </h1>
        </div>
        <div className="mx-auto mt-8 max-w-3xl text-left">
          <ContentBlocks blocks={INTRODUCTION} />
        </div>
      </Container>
    </section>
  );
}
