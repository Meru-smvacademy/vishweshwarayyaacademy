import type { Metadata } from "next";
import NeetLongTermDetail from "@/components/courses/NeetLongTermDetail";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "NEET Long-Term Program — Vishweshwarayya NEET | JEE Academy",
  description:
    "A multi-year NEET preparation track at Sir M Vishweshwarayya NEET | JEE Academy, building depth over time for students starting their NEET journey early.",
  path: "/courses/neet-long-term",
});

export default function NeetLongTermPage() {
  return <NeetLongTermDetail />;
}
