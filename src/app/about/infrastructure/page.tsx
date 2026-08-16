import type { Metadata } from "next";
import InfrastructureHero from "@/components/infrastructure/InfrastructureHero";
import InfrastructureOverview from "@/components/infrastructure/InfrastructureOverview";
import InfrastructureGrid from "@/components/infrastructure/InfrastructureGrid";
import InfrastructureCta from "@/components/infrastructure/InfrastructureCta";

export const metadata: Metadata = {
  title: "Infrastructure — Vishweshwarayya NEET | JEE Academy",
  description: "",
};

export default function InfrastructurePage() {
  return (
    <>
      <InfrastructureHero />
      <InfrastructureOverview />
      <InfrastructureGrid />
      <InfrastructureCta />
    </>
  );
}
