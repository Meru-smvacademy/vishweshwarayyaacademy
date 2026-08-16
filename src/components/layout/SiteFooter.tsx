"use client";

import { usePathname } from "next/navigation";
import Footer from "@/components/layout/Footer";
import SignatureFooter from "@/components/layout/SignatureFooter";

export default function SiteFooter() {
  const pathname = usePathname();
  return pathname === "/contact" ? <SignatureFooter /> : <Footer />;
}
