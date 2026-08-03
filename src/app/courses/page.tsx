import type { Metadata } from "next";
import AcademicPathwaysIntro from "@/components/courses/AcademicPathwaysIntro";
import ProgramsSection from "@/components/courses/ProgramsSection";
import LearningAdvantage from "@/components/courses/LearningAdvantage";
import KritEcosystem from "@/components/courses/KritEcosystem";
import KritCounselling from "@/components/courses/KritCounselling";
import AdmissionJourney from "@/components/courses/AdmissionJourney";
import FinalCta from "@/components/home/FinalCta";

export const metadata: Metadata = {
  title: "Academic Pathways — Sir M V NEET | JEE | KCET Academy",
  description: "",
};

export default function CoursesPage() {
  return (
    <>
      <AcademicPathwaysIntro />
      <ProgramsSection />
      <LearningAdvantage />
      <KritEcosystem />
      <KritCounselling />
      <AdmissionJourney />
      <FinalCta />
    </>
  );
}
