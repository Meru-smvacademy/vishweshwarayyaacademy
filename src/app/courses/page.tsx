import type { Metadata } from "next";
import AcademicPathwaysIntro from "@/components/courses/AcademicPathwaysIntro";
import ChooseYourPath from "@/components/courses/ChooseYourPath";
import LearningAdvantage from "@/components/courses/LearningAdvantage";
import CoursesAdmissionCta from "@/components/courses/CoursesAdmissionCta";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Academic Pathways — Vishweshwarayya NEET | JEE Academy",
  description:
    "Compare the Foundation, NEET and JEE academic pathways at Sir M Vishweshwarayya NEET | JEE Academy, each built around structured, achievement- and long-term-focused programs.",
  path: "/courses",
});

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
