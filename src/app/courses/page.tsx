import type { Metadata } from "next";
import AcademicPathwaysIntro from "@/components/courses/AcademicPathwaysIntro";
import ChooseYourPath from "@/components/courses/ChooseYourPath";
import LearningAdvantage from "@/components/courses/LearningAdvantage";
import CoursesAdmissionCta from "@/components/courses/CoursesAdmissionCta";

export const metadata: Metadata = {
  title: "Academic Pathways — Vishweshwarayya NEET | JEE Academy",
  description: "",
};

export default function CoursesPage() {
  return (
    <>
      <AcademicPathwaysIntro />
      <ChooseYourPath />
      <LearningAdvantage />
      <CoursesAdmissionCta />
    </>
  );
}
