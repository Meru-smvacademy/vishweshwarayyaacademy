import type { Metadata } from "next";
import FaqHero from "@/components/faq/FaqHero";
import FaqSection from "@/components/faq/FaqSection";
import FinalCta from "@/components/home/FinalCta";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "FAQ — Vishweshwarayya NEET | JEE Academy",
  description:
    "Answers to common questions about admissions, programs and campus life at Sir M Vishweshwarayya NEET | JEE Academy.",
  path: "/faq",
});

export default function FaqPage() {
  return (
    <>
      <FaqHero />
      <FaqSection />
      <FinalCta />
    </>
  );
}
