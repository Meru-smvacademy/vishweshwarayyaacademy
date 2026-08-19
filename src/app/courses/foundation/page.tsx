import type { Metadata } from "next";
import FoundationProgramHero from "@/components/courses/FoundationProgramHero";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Foundation Program — Vishweshwarayya NEET | JEE Academy",
  description:
    "Build strong academic foundations for NEET and JEE preparation with Sir M Vishweshwarayya NEET | JEE Academy's Foundation Program.",
  path: "/courses/foundation",
});

export default function FoundationProgramPage() {
  return <FoundationProgramHero />;
}
