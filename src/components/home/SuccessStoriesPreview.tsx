import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import StoryCard from "@/components/results/StoryCard";

const STORIES = [
  {
    initials: "A",
    name: "Student A",
    meta: "NEET · 20XX",
    quote: "Placeholder testimonial content — to be replaced with a verified student story.",
  },
  {
    initials: "B",
    name: "Student B",
    meta: "JEE · 20XX",
    quote: "Placeholder testimonial content — to be replaced with a verified student story.",
  },
  {
    initials: "C",
    name: "Student C",
    meta: "KCET · 20XX",
    quote: "Placeholder testimonial content — to be replaced with a verified student story.",
  },
];

export default function SuccessStoriesPreview() {
  return (
    <section className="bg-surface-muted py-14 sm:py-20">
      <Container>
        <SectionHeading
          eyebrow="Success Stories"
          title="Success Stories"
          description="All profiles below are placeholders — to be replaced with verified, consented student stories."
        />

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {STORIES.map((story) => (
            <StoryCard key={story.meta} {...story} />
          ))}
        </div>
      </Container>
    </section>
  );
}
