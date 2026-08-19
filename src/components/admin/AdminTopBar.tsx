"use client";

import { usePathname } from "next/navigation";
import { ADMIN_NAV_ITEMS } from "@/config/adminNav";
import { GOLD_500, DISPLAY, SANS } from "@/components/admin/tokens";
import { MenuIcon } from "@/components/admin/icons";

export default function AdminTopBar({ onMenuClick }: { onMenuClick: () => void }) {
  const pathname = usePathname();
  const current =
    [...ADMIN_NAV_ITEMS].sort((a, b) => b.href.length - a.href.length).find((item) => pathname?.startsWith(item.href)) ??
    ADMIN_NAV_ITEMS[0];
  const label = current.label;

  return (
    <header
      style={{
        height: 60,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 28px",
        borderBottom: "1px solid rgba(200,185,155,0.10)",
        backgroundColor: "#0B1628",
        flexShrink: 0,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 14, minWidth: 0 }}>
        <button
          type="button"
          onClick={onMenuClick}
          aria-label="Open menu"
          className="admin-menu-btn"
          style={{
            display: "none",
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 6,
            margin: "-6px",
            color: "rgba(248,243,232,0.55)",
            flexShrink: 0,
          }}
        >
          <MenuIcon width={18} height={18} color="rgba(248,243,232,0.65)" />
        </button>

        <div className="admin-breadcrumb" style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontFamily: SANS, fontSize: 12, color: "rgba(248,243,232,0.35)", letterSpacing: "0.04em" }}>Admin</span>
          <span style={{ color: "rgba(200,185,155,0.3)", fontSize: 12 }}>/</span>
          <span style={{ fontFamily: SANS, fontSize: 12, color: GOLD_500, letterSpacing: "0.04em", fontWeight: 500 }}>{label}</span>
        </div>

        <div className="admin-topbar-divider" style={{ width: 1, height: 16, backgroundColor: "rgba(200,185,155,0.14)" }} />

        <h1
          style={{
            margin: 0,
            fontFamily: DISPLAY,
            fontSize: 17,
            fontWeight: 500,
            color: "#F8F3E8",
            letterSpacing: "0.01em",
            whiteSpace: "nowrap",
          }}
        >
          {label}
        </h1>
      </div>
    </header>
  );
}
