import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import StatCard from "@/components/results/StatCard";

const STATS = [
  { value: "XX+", label: "Selections" },
  { value: "XX+", label: "Top Rankers" },
  { value: "XX%", label: "Qualifying Rate" },
  { value: "XX+", label: "Years of Coaching" },
];

export default function ResultsHighlights() {
  return (
    <section className="py-14 sm:py-20">
      <Container>
        <SectionHeading eyebrow="Results" title="Results Highlights" placeholder />

        <div className="mt-10 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {STATS.map((stat) => (
            <StatCard key={stat.label} {...stat} />
          ))}
        </div>
      </Container>
    </section>
  );
}
