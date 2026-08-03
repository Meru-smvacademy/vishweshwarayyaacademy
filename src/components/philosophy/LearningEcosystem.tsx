import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import PillarCard from "@/components/ui/PillarCard";
import {
  ChartIcon,
  ClipboardCheckIcon,
  CubeIcon,
  LaptopIcon,
  MonitorIcon,
  UsersIcon,
} from "@/components/ui/icons";

const PILLARS = [
  {
    icon: ClipboardCheckIcon,
    title: "Research-Driven Curriculum",
    description:
      "Every academic plan is continuously improved using educational research, student performance analysis, faculty experience, and changing examination patterns.",
  },
  {
    icon: MonitorIcon,
    title: "Instructional Technology",
    description:
      "We do not simply deliver lectures. Every lesson is designed to improve understanding, participation, application, and long-term retention.",
  },
  {
    icon: UsersIcon,
    title: "Multiple Learning Pathways",
    description:
      "Every student learns differently. Our teaching methodology adapts to different learning styles and academic backgrounds so that every student has the opportunity to succeed.",
  },
  {
    icon: CubeIcon,
    title: "3D Interactive Learning",
    description:
      "To simplify difficult scientific concepts, we develop our own 3D instructional models, working prototypes, and interactive learning panels. Students understand concepts by seeing, observing, and interacting with real models instead of relying only on imagination.",
  },
  {
    icon: LaptopIcon,
    title: "KRIT Digital Learning Platform",
    description:
      "Learning continues beyond the classroom through KRIT, our digital learning platform, providing:",
    items: [
      "Online learning resources",
      "Computer-Based Tests (CBT)",
      "Instant result generation",
      "Performance analytics",
      "Attendance monitoring",
      "Continuous academic progress tracking",
    ],
  },
  {
    icon: ChartIcon,
    title: "Data-Driven Academic Monitoring",
    description:
      "Every assessment is analysed to identify strengths, learning gaps, and opportunities for improvement, enabling timely academic support and continuous progress.",
  },
];

export default function LearningEcosystem() {
  return (
    <section className="bg-surface-muted py-14 sm:py-20">
      <Container>
        <div className="mx-auto max-w-3xl">
          <SectionHeading eyebrow="Our Ecosystem" title="The Sir M V Learning Ecosystem" align="left" />
          <p className="mt-6 text-base leading-relaxed text-ink sm:text-lg">
            Education is a complete ecosystem not a classroom alone.
          </p>
          <p className="mt-4 text-base leading-relaxed text-ink sm:text-lg">
            Sir M V Academy has developed an integrated learning ecosystem where every stage of a
            student&rsquo;s journey is connected.
          </p>
        </div>

        <div className="mx-auto mt-10 grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PILLARS.map((pillar) => (
            <PillarCard key={pillar.title} {...pillar} />
          ))}
        </div>
      </Container>
    </section>
  );
}
