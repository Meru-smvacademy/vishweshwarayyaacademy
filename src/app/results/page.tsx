import type { Metadata } from "next";
import ResultsArchiveHero from "@/components/results/ResultsArchiveHero";
import ResultsArchiveSection from "@/components/results/ResultsArchiveSection";
import ResultsFinalCta from "@/components/results/ResultsFinalCta";

export const metadata: Metadata = {
  title: "Results — Vishweshwarayya NEET | JEE Academy",
  description: "",
};

export default function ResultsPage() {
  return (
    <>
      <ResultsArchiveHero />
      <ResultsArchiveSection />
      <ResultsFinalCta />
    </>
  );
}
