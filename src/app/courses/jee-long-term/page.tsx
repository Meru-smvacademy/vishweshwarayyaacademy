import type { Metadata } from "next";
import JeeLongTermDetail from "@/components/courses/JeeLongTermDetail";

export const metadata: Metadata = {
  title: "JEE Long-Term Program — Vishweshwarayya NEET | JEE Academy",
  description: "",
};

export default function JeeLongTermPage() {
  return <JeeLongTermDetail />;
}
