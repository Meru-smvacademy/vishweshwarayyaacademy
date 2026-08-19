import type { Metadata } from "next";
import KcetIntegratedDetail from "@/components/courses/KcetIntegratedDetail";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "KCET Integrated Program — Vishweshwarayya NEET | JEE Academy",
  description:
    "An integrated KCET preparation track at Sir M Vishweshwarayya NEET | JEE Academy, combining board studies with focused KCET readiness.",
  path: "/courses/kcet-integrated",
});

export default function KcetIntegratedPage() {
  return <KcetIntegratedDetail />;
}
