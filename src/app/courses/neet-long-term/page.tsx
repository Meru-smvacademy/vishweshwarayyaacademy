import type { Metadata } from "next";
import NeetLongTermDetail from "@/components/courses/NeetLongTermDetail";

export const metadata: Metadata = {
  title: "NEET Long-Term Program — Vishweshwarayya NEET | JEE Academy",
  description: "",
};

export default function NeetLongTermPage() {
  return <NeetLongTermDetail />;
}
