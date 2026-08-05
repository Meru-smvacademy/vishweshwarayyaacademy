import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";

const MESSAGE_PARAGRAPHS = [
  "Education is not merely a pathway to a profession it is a responsibility to society.",
  "Every student who joins Visveshwarayya Academy comes with a dream. Our responsibility is to transform that dream into knowledge, confidence, character, and purpose. Success is not measured only by ranks or admissions, but by the positive impact our students create in the lives of others.",
  "Our academy was established with the belief that quality education should never be limited by financial circumstances or geographical location. Through research-driven learning, instructional technology, innovative teaching methods, and a culture of discipline, we strive to prepare students who are not only successful in competitive examinations but also responsible citizens of our nation.",
];

const CLOSING_PARAGRAPHS = [
  "These words are not just our motto they are our way of life.",
  "When our students leave this institution, we hope they carry not only knowledge, but also compassion, integrity, and a commitment to serve society.",
];

export default function FounderMessage() {
  return (
    <section className="bg-surface-muted py-14 sm:py-20">
      <Container>
        <div className="mx-auto max-w-3xl">
          <SectionHeading
            eyebrow="In Their Words"
            title="Founder & Administrator's Message"
            align="left"
          />

          <div className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-start">
            <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-primary text-lg font-semibold text-white">
              RT
            </span>
            <div className="space-y-4 text-base leading-relaxed text-ink sm:text-lg">
              {MESSAGE_PARAGRAPHS.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}

              <p className="text-lg font-semibold italic text-primary">
                Come to Learn. Go to Serve.
              </p>

              {CLOSING_PARAGRAPHS.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}

              <div className="pt-2">
                <p className="text-sm font-semibold text-primary">Ramesh Tegginamani</p>
                <p className="text-xs text-muted">Founder &amp; Administrator</p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
