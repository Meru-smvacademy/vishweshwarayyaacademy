import type { Metadata } from "next";
import InfrastructureHero from "@/components/infrastructure/InfrastructureHero";
import InfrastructureOverview from "@/components/infrastructure/InfrastructureOverview";
import InfrastructureGrid from "@/components/infrastructure/InfrastructureGrid";
import InfrastructureCta from "@/components/infrastructure/InfrastructureCta";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Infrastructure — Vishweshwarayya NEET | JEE Academy",
  description:
    "Explore the campus, smart classrooms, science laboratories, digital learning spaces, library and study environment at Sir M Vishweshwarayya NEET | JEE Academy.",
  path: "/about/infrastructure",
});

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
