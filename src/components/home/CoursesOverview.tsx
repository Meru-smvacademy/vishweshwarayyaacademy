import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import ProgramCard from "@/components/courses/ProgramCard";

const PROGRAMS = [
  {
    title: "NEET",
    description: "Comprehensive preparation for NEET-UG covering Physics, Chemistry, and Biology.",
    href: "/courses/neet",
  },
  {
    title: "JEE",
    description:
      "Structured coaching for JEE Main & Advanced covering Physics, Chemistry, and Mathematics.",
    href: "/courses/jee",
  },
  {
    title: "KCET",
    description: "Focused preparation for the Karnataka Common Entrance Test (KCET).",
    href: "/courses/kcet",
  },
  {
    title: "Foundation",
    description: "An early foundation program building core concepts for Class 8–10 students.",
    href: "/courses/foundation",
  },
];

export default function CoursesOverview() {
  return (
    <section className="bg-surface-muted py-14 sm:py-20">
      <Container>
        <SectionHeading eyebrow="Courses" title="Comprehensive Coaching Programs" />

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PROGRAMS.map((program) => (
            <ProgramCard key={program.href} {...program} />
          ))}
        </div>
      </Container>
    </section>
  );
}
