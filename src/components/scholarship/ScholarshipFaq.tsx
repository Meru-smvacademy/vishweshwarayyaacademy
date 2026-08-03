import Container from "@/components/ui/Container";
import ContentBlocks from "@/components/ui/ContentBlocks";
import PlaceholderTag from "@/components/ui/PlaceholderTag";
import SectionHeading from "@/components/ui/SectionHeading";
import { ChevronDownIcon } from "@/components/ui/icons";
import { FAQS } from "@/content/scholarship";

export default function ScholarshipFaq() {
  return (
    <section className="py-14 sm:py-20">
      <Container>
        <div className="mx-auto max-w-3xl">
          <SectionHeading
            eyebrow="Frequently Asked Questions"
            title="Frequently Asked Questions"
            align="left"
          />

          <div className="mt-8 space-y-3">
            {FAQS.map((faq) => (
              <details
                key={faq.question}
                className="group rounded-lg border border-line bg-surface open:shadow-sm"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-base font-semibold text-primary">
                  {faq.question}
                  <ChevronDownIcon className="h-5 w-5 shrink-0 transition-transform group-open:rotate-180" />
                </summary>
                <div className="border-t border-line px-5 py-4">
                  {faq.answer ? (
                    <ContentBlocks blocks={faq.answer} />
                  ) : (
                    <PlaceholderTag label="Answer pending confirmation in SCHOLARSHIP_FOUNDATION.md" />
                  )}
                </div>
              </details>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
