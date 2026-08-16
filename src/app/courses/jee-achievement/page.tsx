import type { Metadata } from "next";
import JeeAchievementDetail from "@/components/courses/JeeAchievementDetail";

export const metadata: Metadata = {
  title: "JEE Achievement Program — Vishweshwarayya NEET | JEE Academy",
  description: "",
};

export default function JeeAchievementPage() {
  return <JeeAchievementDetail />;
}
