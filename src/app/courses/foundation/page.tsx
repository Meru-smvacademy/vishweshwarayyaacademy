import type { Metadata } from "next";
import FoundationProgramHero from "@/components/courses/FoundationProgramHero";

export const metadata: Metadata = {
  title: "Foundation Program — Vishweshwarayya NEET | JEE Academy",
  description: "",
};

export default function FoundationProgramPage() {
  return <FoundationProgramHero />;
}
