import type { Metadata } from "next";
import PhilosophyHero from "@/components/philosophy/PhilosophyHero";
import PhilosophySection from "@/components/philosophy/PhilosophySection";
import LearningEcosystem from "@/components/philosophy/LearningEcosystem";
import FounderMessage from "@/components/philosophy/FounderMessage";
import FinalCta from "@/components/home/FinalCta";

export const metadata: Metadata = {
  title: "Our Philosophy — Sir M V NEET | JEE | KCET Academy",
  description: "",
};

export default function PhilosophyPage() {
  return (
    <>
      <PhilosophyHero />

      <PhilosophySection
        eyebrow="Our Purpose"
        title="Why We Exist"
        paragraphs={[
          "Every talented student deserves an equal opportunity to pursue excellence, regardless of financial circumstances or geographical location.",
          "Sir M V NEET | JEE | KCET Academy was established to ensure that students from North Karnataka receive the same quality of education, academic guidance, and opportunities available in larger cities without having to leave their hometowns.",
          "We believe that talent exists everywhere. Opportunity should too.",
        ]}
      />

      <PhilosophySection
        eyebrow="Our Story"
        title="Our Beginning"
        tinted
        paragraphs={[
          "Our journey did not begin with buildings or classrooms.",
          "It began with a question.",
          "Why should poverty decide a student's future?",
          "For many students in our region, the dream of becoming a doctor or an engineer ended immediately after Class 10—not because they lacked ability, but because affordable science education and competitive coaching were simply unavailable.",
          "Instead of accepting this reality, we chose to change it.",
          "For more than nine years, we researched how students from our educational environment learn, where they struggle, and how teaching can be redesigned to help them succeed.",
          "That research became the foundation of Sir M V Academy.",
        ]}
      />

      <PhilosophySection
        eyebrow="Our Approach"
        title="We Don't Deliver Lectures. We Design Learning."
        paragraphs={[
          "Learning is not about completing chapters.",
          "Learning is about creating understanding.",
          "At Sir M V Academy, every lesson is designed using Instructional Technology so that students actively understand, participate, apply, and remember concepts.",
          "We believe students should never be passive listeners.",
          "They should become active learners.",
          "Instead of simply delivering lectures, we create learning experiences using instructional technology, interactive teaching methods, and continuous reinforcement so that every student develops deep conceptual understanding rather than memorizing information.",
        ]}
      />

      <LearningEcosystem />

      <PhilosophySection
        eyebrow="Our Namesake"
        title="The Legacy That Inspires Us"
        quote="Empowering Students. Empowering the Nation."
        paragraphs={[
          "Sir M V Academy was built upon a legacy of educational service.",
          "Our founder, Ramesh Tegginamani, carried forward the lifelong belief of his father, Sayabanna N. Tegginamani, that education belongs to every child regardless of income or circumstance.",
          "Sayabanna N. Tegginamani donated his own land to establish a school so that children in his village would have access to education. That selfless act became the foundation of a lifelong commitment to educational service.",
          "Today, every classroom, every student, every scholarship, and every success achieved at Sir M V Academy continues that legacy of service through education.",
        ]}
      />

      <PhilosophySection
        eyebrow="Our Commitment"
        title="SNT Scholarship"
        tinted
        paragraphs={[
          "The SNT Scholarship Examination is conducted every year in loving memory of Sayabanna N. Tegginamani.",
          "It is not a marketing initiative. It is a commitment to ensuring that talented students are never denied quality education because of financial hardship.",
          "The scholarship identifies deserving students through a transparent, merit-based examination and provides meaningful educational support so they can pursue their dreams with confidence.",
          "Every scholarship awarded is more than financial assistance—it is the continuation of a legacy built on the belief that education has the power to transform families, communities, and the nation.",
          "The SNT Scholarship is our way of carrying that belief forward, one student at a time.",
        ]}
        ctaLabel="Learn More"
        ctaHref="/scholarship"
      />

      <FounderMessage />

      <FinalCta />
    </>
  );
}
