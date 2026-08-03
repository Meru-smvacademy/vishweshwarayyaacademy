import Container from "@/components/ui/Container";
import FaqAccordion from "@/components/faq/FaqAccordion";
import { FAQ_CATEGORIES } from "@/content/faq";

export default function FaqSection() {
  return (
    <section className="py-14 sm:py-20">
      <Container>
        <div className="mx-auto max-w-3xl">
          <FaqAccordion categories={FAQ_CATEGORIES} />
        </div>
      </Container>
    </section>
  );
}
