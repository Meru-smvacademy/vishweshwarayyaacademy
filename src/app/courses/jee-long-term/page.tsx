import type { Metadata } from "next";
import JeeLongTermDetail from "@/components/courses/JeeLongTermDetail";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "JEE Long-Term Program — Vishweshwarayya NEET | JEE Academy",
  description:
    "A multi-year JEE preparation track at Sir M Vishweshwarayya NEET | JEE Academy, building depth over time for students starting their JEE journey early.",
  path: "/courses/jee-long-term",
});

export default function JeeLongTermPage() {
  return <JeeLongTermDetail />;
}
