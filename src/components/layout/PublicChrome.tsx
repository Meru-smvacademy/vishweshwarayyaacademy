"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/layout/Header";
import SiteFooter from "@/components/layout/SiteFooter";
import StickyMobileCta from "@/components/layout/StickyMobileCta";

export default function PublicChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  if (isAdmin) {
    return <main id="main-content">{children}</main>;
  }

  return (
    <>
      <Header />
      <main id="main-content" className="pb-24 xl:pb-0">
        {children}
      </main>
      <SiteFooter />
      <StickyMobileCta />
    </>
  );
}
