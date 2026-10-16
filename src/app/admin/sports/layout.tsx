import type { ReactNode } from "react";
import type { Metadata } from "next";
import AdminShell from "@/components/admin/AdminShell";

export const metadata: Metadata = { robots: { index: false, follow: false } };

export default function AdminSportsLayout({ children }: { children: ReactNode }) {
  return <AdminShell>{children}</AdminShell>;
}
