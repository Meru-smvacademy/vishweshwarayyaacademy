import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import ContentBlocks from "@/components/ui/ContentBlocks";
import { KRIT_COUNSELLING } from "@/content/academicPathways";

export default function KritCounselling() {
  return (
    <section className="bg-surface-muted py-14 sm:py-20">
      <Container>
        <div className="mx-auto max-w-3xl">
          <SectionHeading eyebrow="Beyond Examinations" title="KRIT Counselling" align="left" />
          <div className="mt-6">
            <ContentBlocks blocks={KRIT_COUNSELLING} />
          </div>
        </div>
      </Container>
    </section>
  );
}
