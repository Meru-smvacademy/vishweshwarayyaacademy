import type { Metadata } from "next";
import NeetAchievementDetail from "@/components/courses/NeetAchievementDetail";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "NEET Achievement Program — Vishweshwarayya NEET | JEE Academy",
  description:
    "A focused, results-driven NEET preparation track at Sir M Vishweshwarayya NEET | JEE Academy for students aiming for a strong NEET performance.",
  path: "/courses/neet-achievement",
});

export default function NeetAchievementPage() {
  return <NeetAchievementDetail />;
}
