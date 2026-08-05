import Hero from "@/components/home/Hero";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import CoursesOverview from "@/components/home/CoursesOverview";
import ResultsHighlights from "@/components/home/ResultsHighlights";
import AdmissionCta from "@/components/home/AdmissionCta";
import SuccessStoriesPreview from "@/components/home/SuccessStoriesPreview";
import ScholarshipPreview from "@/components/home/ScholarshipPreview";
import Branches from "@/components/home/Branches";
import FinalCta from "@/components/home/FinalCta";

export default function Home() {
  return (
    <>
      <Hero />
      <WhyChooseUs />
      <CoursesOverview />
      <ResultsHighlights />
      <AdmissionCta />
      <SuccessStoriesPreview />
      <ScholarshipPreview />
      <Branches />
      <FinalCta />
    </>
  );
}
