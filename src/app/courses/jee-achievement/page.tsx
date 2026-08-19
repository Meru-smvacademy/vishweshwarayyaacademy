import type { Metadata } from "next";
import JeeAchievementDetail from "@/components/courses/JeeAchievementDetail";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "JEE Achievement Program — Vishweshwarayya NEET | JEE Academy",
  description:
    "A focused, results-driven JEE preparation track at Sir M Vishweshwarayya NEET | JEE Academy for students aiming for a strong JEE performance.",
  path: "/courses/jee-achievement",
});

export default function JeeAchievementPage() {
  return <JeeAchievementDetail />;
}
