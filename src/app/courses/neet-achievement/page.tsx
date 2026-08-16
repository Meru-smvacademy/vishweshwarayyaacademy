import type { Metadata } from "next";
import NeetAchievementDetail from "@/components/courses/NeetAchievementDetail";

export const metadata: Metadata = {
  title: "NEET Achievement Program — Vishweshwarayya NEET | JEE Academy",
  description: "",
};

export default function NeetAchievementPage() {
  return <NeetAchievementDetail />;
}
