import type { Metadata } from "next";
import InfrastructureHero from "@/components/infrastructure/InfrastructureHero";
import InfrastructureGrid from "@/components/infrastructure/InfrastructureGrid";
import FinalCta from "@/components/home/FinalCta";

export const metadata: Metadata = {
  title: "Infrastructure — Visveshwarayya NEET | JEE Academy",
  description: "",
};

export default function InfrastructurePage() {
  return (
    <>
      <InfrastructureHero />
      <InfrastructureGrid />
      <FinalCta />
    </>
  );
}
