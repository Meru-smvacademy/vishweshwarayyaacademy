import type { Metadata } from "next";
import FounderHero from "@/components/founder/FounderHero";
import OurStorySection from "@/components/founder/OurStorySection";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "The Founder — Vishweshwarayya NEET | JEE Academy",
  description:
    "Meet the founder of Sir M Vishweshwarayya NEET | JEE Academy and the story behind the institution's mission to guide students toward NEET and JEE success.",
  path: "/founder",
});

export default function FounderPage() {
  return (
    <>
      <FounderHero />
      <OurStorySection />
    </>
  );
}
