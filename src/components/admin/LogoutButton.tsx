"use client";

import { useState, type CSSProperties, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

type LogoutButtonProps = {
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
};

export default function LogoutButton({ className, style, children }: LogoutButtonProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleLogout() {
    setLoading(true);
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      disabled={loading}
      className={className}
      style={{ ...style, opacity: loading ? 0.6 : (style?.opacity ?? 1), cursor: loading ? "not-allowed" : (style?.cursor ?? "pointer") }}
    >
      {children ?? (loading ? "Logging out…" : "Logout")}
    </button>
  );
}
