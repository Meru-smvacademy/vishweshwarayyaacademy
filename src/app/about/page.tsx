import type { Metadata } from "next";
import AboutHero from "@/components/about/AboutHero";
import AboutGatewaySection from "@/components/about/AboutGatewaySection";
import PhilosophySection from "@/components/philosophy/PhilosophySection";
import AdmissionCta from "@/components/home/AdmissionCta";
import { KRITPREP_URL } from "@/config/nav";

export const metadata: Metadata = {
  title: "About Us — Visveshwarayya NEET | JEE Academy",
  description: "",
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />

      <PhilosophySection
        eyebrow="Our Story"
        title="A Home-Grown Academy for North Karnataka"
        paragraphs={[
          "Visveshwarayya Academy was founded to give students in North Karnataka access to the same quality NEET, JEE, and KCET coaching available in larger cities — without leaving home.",
          "What began as years of research into how our students learn has grown into a dedicated academy built around structured teaching, regular assessment, and a disciplined learning environment.",
        ]}
      />

      <AboutGatewaySection
        eyebrow="Our Philosophy"
        title="Come to Learn. Go to Serve."
        description="Explore the research-driven teaching philosophy, instructional technology, and learning ecosystem behind every classroom at Visveshwarayya Academy."
        ctaLabel="View Philosophy"
        ctaHref="/philosophy"
        tinted
      />

      <AboutGatewaySection
        eyebrow="Infrastructure"
        title="A Campus Built for Focused Study"
        description="From smart classrooms and science laboratories to a dedicated library and digital learning spaces, see the facilities that support our students."
        ctaLabel="View Infrastructure"
        ctaHref="/about/infrastructure"
      />

      <AboutGatewaySection
        eyebrow="Our Team"
        title="Faculty & Mentors"
        description="Meet the faculty and mentors guiding our students, with full profiles available on KRITPrep, our academic partner platform."
        ctaLabel="Meet Our Team"
        ctaHref={`${KRITPREP_URL}/our-team`}
        external
        tinted
      />

      <AboutGatewaySection
        eyebrow="SNT Scholarship"
        title="Scholarship-cum-Nurture Test"
        description="A scholarship examination conducted in memory of Late Shri Sayabanna N. Tegginamani, recognising merit and supporting deserving students with quality education."
        ctaLabel="View Scholarship"
        ctaHref="/scholarship"
      />

      <AdmissionCta />
    </>
  );
}
