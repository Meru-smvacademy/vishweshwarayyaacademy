import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import FeatureCard from "@/components/home/FeatureCard";
import {
  AwardIcon,
  BookIcon,
  ChartIcon,
  ChatQuestionIcon,
  ClipboardCheckIcon,
  TargetIcon,
  UserCheckIcon,
  UsersIcon,
} from "@/components/ui/icons";

const FEATURES = [
  {
    icon: UsersIcon,
    title: "Experienced Faculty",
    description:
      "Subject-expert teachers with years of coaching experience guide every student through concepts, problem-solving techniques, and exam strategy.",
  },
  {
    icon: BookIcon,
    title: "Structured Curriculum",
    description:
      "A carefully sequenced syllabus builds fundamentals first and layers on advanced problem-solving, keeping every batch on a clear, steady track.",
  },
  {
    icon: ClipboardCheckIcon,
    title: "Regular Assessments",
    description:
      "Frequent tests and topic-wise evaluations track each student's grasp of the syllabus and highlight exactly where to focus next.",
  },
  {
    icon: UserCheckIcon,
    title: "Personal Mentorship",
    description:
      "Dedicated mentors work closely with students to identify strengths, address weak areas, and keep preparation on a focused, individual path.",
  },
  {
    icon: TargetIcon,
    title: "NEET, JEE & KCET Focused Preparation",
    description:
      "Coaching designed specifically around NEET, JEE, and KCET syllabi and exam patterns, so every class contributes directly to entrance success.",
  },
  {
    icon: ChatQuestionIcon,
    title: "Doubt Solving Sessions",
    description:
      "Dedicated sessions give students direct access to faculty for clearing doubts, ensuring no concept is left unclear before moving ahead.",
  },
  {
    icon: AwardIcon,
    title: "Scholarship Opportunities",
    description:
      "Merit-based scholarships reward strong performers and make quality NEET and JEE coaching more accessible to deserving students.",
  },
  {
    icon: ChartIcon,
    title: "Parent Progress Updates",
    description:
      "Parents receive regular updates on attendance, test performance, and progress, keeping them closely involved in their child's preparation.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-16 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="Why Choose Us"
          title="Why Choose Visveshwarayya NEET | JEE Academy"
          description="A disciplined, student-first approach built around expert faculty, structured teaching, and consistent support at every step."
        />

        <div className="mt-12 grid gap-7 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {FEATURES.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>
      </Container>
    </section>
  );
}
