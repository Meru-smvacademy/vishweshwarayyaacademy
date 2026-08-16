import Hero from "@/components/home/Hero";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import CoursesOverview from "@/components/home/CoursesOverview";
import AdmissionCta from "@/components/home/AdmissionCta";
import ScholarshipBanner from "@/components/home/ScholarshipBanner";
import Branches from "@/components/home/Branches";

export default function Home() {
  return (
    <>
      <Hero />
      <WhyChooseUs />
      <CoursesOverview />
      <AdmissionCta />
      <ScholarshipBanner />
      <Branches />
    </>
  );
}
