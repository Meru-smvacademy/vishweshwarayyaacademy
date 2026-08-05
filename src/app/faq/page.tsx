import type { Metadata } from "next";
import FaqHero from "@/components/faq/FaqHero";
import FaqSection from "@/components/faq/FaqSection";
import FinalCta from "@/components/home/FinalCta";

export const metadata: Metadata = {
  title: "FAQ — Visveshwarayya NEET | JEE Academy",
  description: "",
};

export default function FaqPage() {
  return (
    <>
      <FaqHero />
      <FaqSection />
      <FinalCta />
    </>
  );
}
