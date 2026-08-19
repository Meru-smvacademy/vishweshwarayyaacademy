import type { Metadata } from "next";
import Hero from "@/components/home/Hero";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import CoursesOverview from "@/components/home/CoursesOverview";
import AdmissionCta from "@/components/home/AdmissionCta";
import ScholarshipBanner from "@/components/home/ScholarshipBanner";
import Branches from "@/components/home/Branches";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Sir M Vishweshwarayya NEET | JEE Academy",
  description:
    "NEET, JEE and KCET coaching in Lingasuguru and Sindhanur with structured pathways, experienced faculty and personalised mentoring — understand how each student learns, then teach, test and adapt.",
  path: "/",
});

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
