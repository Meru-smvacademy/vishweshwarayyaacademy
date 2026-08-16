import type { Metadata } from "next";
import KcetIntegratedDetail from "@/components/courses/KcetIntegratedDetail";

export const metadata: Metadata = {
  title: "KCET Integrated Program — Vishweshwarayya NEET | JEE Academy",
  description: "",
};

export default function KcetIntegratedPage() {
  return <KcetIntegratedDetail />;
}
