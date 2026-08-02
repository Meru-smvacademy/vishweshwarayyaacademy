import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import FeatureCard from "@/components/home/FeatureCard";
import {
  BookIcon,
  BuildingIcon,
  ChartIcon,
  ClipboardCheckIcon,
  ShieldCheckIcon,
  UsersIcon,
} from "@/components/ui/icons";

const FEATURES = [
  {
    icon: UsersIcon,
    title: "Experienced Faculty",
    description: "Placeholder description — final faculty profiles and credentials to be added.",
  },
  {
    icon: BookIcon,
    title: "Structured Curriculum",
    description: "Placeholder description — outline of the teaching methodology to be added.",
  },
  {
    icon: ClipboardCheckIcon,
    title: "Regular Assessments",
    description: "Placeholder description — testing and progress-tracking details to be added.",
  },
  {
    icon: ChartIcon,
    title: "Performance Tracking",
    description: "Placeholder description — how student progress is monitored, to be added.",
  },
  {
    icon: ShieldCheckIcon,
    title: "Disciplined Environment",
    description: "Placeholder description — campus discipline and study culture, to be added.",
  },
  {
    icon: BuildingIcon,
    title: "Modern Infrastructure",
    description: "Placeholder description — campus and facility details to be added.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-14 sm:py-20">
      <Container>
        <SectionHeading
          eyebrow="Why Choose Us"
          title="Why Choose Sir M V NEET | JEE | KCET Academy"
          placeholder
        />

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>
      </Container>
    </section>
  );
}
