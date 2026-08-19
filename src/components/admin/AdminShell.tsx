"use client";

import { useState, type ReactNode } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminTopBar from "@/components/admin/AdminTopBar";
import { NAVY_950, NAVY_900 } from "@/components/admin/tokens";

const sidebarStyle = {
  width: 260,
  minWidth: 260,
  height: "100vh",
  position: "sticky" as const,
  top: 0,
  backgroundColor: NAVY_950,
  borderRight: "1px solid rgba(200,185,155,0.10)",
  overflowY: "auto" as const,
  flexShrink: 0,
};

export default function AdminShell({ children }: { children: ReactNode }) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div style={{ minHeight: "100vh", display: "flex", backgroundColor: NAVY_950 }}>
      <aside className="admin-sidebar-desktop" style={sidebarStyle}>
        <AdminSidebar />
      </aside>

      <div
        className="admin-drawer-overlay"
        onClick={() => setDrawerOpen(false)}
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 40,
          backgroundColor: "rgba(7,14,26,0.80)",
          backdropFilter: "blur(3px)",
          opacity: drawerOpen ? 1 : 0,
          pointerEvents: drawerOpen ? "all" : "none",
          transition: "opacity 0.25s ease",
        }}
      />

      <aside
        className="admin-sidebar-mobile"
        style={{
          ...sidebarStyle,
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 50,
          height: "100%",
          transform: drawerOpen ? "translateX(0)" : "translateX(-100%)",
          transition: "transform 0.28s cubic-bezier(.4,0,.2,1)",
          boxShadow: drawerOpen ? "4px 0 32px rgba(0,0,0,0.5)" : "none",
        }}
      >
        <AdminSidebar onNavigate={() => setDrawerOpen(false)} onClose={() => setDrawerOpen(false)} />
      </aside>

      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0, overflow: "hidden" }}>
        <AdminTopBar onMenuClick={() => setDrawerOpen(true)} />
        <main style={{ flex: 1, backgroundColor: NAVY_900, overflowY: "auto", overflowX: "hidden" }}>{children}</main>
      </div>

      <style>{`
        .admin-sidebar-desktop { display: flex; flex-direction: column; }
        .admin-sidebar-mobile { display: none !important; }
        .admin-drawer-overlay { display: none !important; }
        .admin-menu-btn { display: none !important; }
        .admin-drawer-close { display: none !important; }
        .admin-breadcrumb { display: flex; }
        .admin-topbar-divider { display: block; }

        @media (max-width: 768px) {
          .admin-sidebar-desktop { display: none !important; }
          .admin-sidebar-mobile { display: flex !important; flex-direction: column; }
          .admin-drawer-overlay { display: block !important; }
          .admin-menu-btn { display: flex !important; align-items: center; justify-content: center; }
          .admin-drawer-close { display: flex !important; }
          .admin-breadcrumb { display: none !important; }
          .admin-topbar-divider { display: none !important; }
        }
      `}</style>
    </div>
  );
}
