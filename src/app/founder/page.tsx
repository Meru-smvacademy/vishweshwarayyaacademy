import type { Metadata } from "next";
import FounderHero from "@/components/founder/FounderHero";
import OurStorySection from "@/components/founder/OurStorySection";

export const metadata: Metadata = {
  title: "The Founder — Vishweshwarayya NEET | JEE Academy",
  description: "",
};

export default function FounderPage() {
  return (
    <>
      <FounderHero />
      <OurStorySection />
    </>
  );
}
