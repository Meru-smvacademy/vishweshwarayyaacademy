import type { Metadata } from "next";
import ResultsArchiveHero from "@/components/results/ResultsArchiveHero";
import ResultsArchiveSection from "@/components/results/ResultsArchiveSection";
import ResultsFinalCta from "@/components/results/ResultsFinalCta";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Results — Vishweshwarayya NEET | JEE Academy",
  description:
    "NEET and JEE results achieved by students of Sir M Vishweshwarayya NEET | JEE Academy across the Lingasuguru and Sindhanur campuses.",
  path: "/results",
});

export default function ResultsPage() {
  return (
    <>
      <ResultsArchiveHero />
      <ResultsArchiveSection />
      <ResultsFinalCta />
    </>
  );
}
