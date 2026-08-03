import type { Metadata } from "next";
import FaqHero from "@/components/faq/FaqHero";
import FaqSection from "@/components/faq/FaqSection";
import FinalCta from "@/components/home/FinalCta";

export const metadata: Metadata = {
  title: "FAQ — Sir M V NEET | JEE | KCET Academy",
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
