"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ADMIN_NAV_GROUPS } from "@/config/adminNav";
import LogoutButton from "@/components/admin/LogoutButton";
import { IVORY_100, GOLD_500, RULE, DISPLAY, SANS } from "@/components/admin/tokens";
import {
  DashboardIcon,
  FacultyIcon,
  GalleryIcon,
  InfraIcon,
  ResultsIcon,
  MediaIcon,
  EnquiryIcon,
  ScholarIcon,
  StaffIcon,
  SettingsIcon,
  WebsiteIcon,
  LogoutIcon,
  CloseIcon,
} from "@/components/admin/icons";

const ICON_MAP: Record<string, typeof DashboardIcon> = {
  dashboard: DashboardIcon,
  faculty: FacultyIcon,
  gallery: GalleryIcon,
  infrastructure: InfraIcon,
  results: ResultsIcon,
  media: MediaIcon,
  enquiries: EnquiryIcon,
  scholarships: ScholarIcon,
  staff: StaffIcon,
  settings: SettingsIcon,
};

export default function AdminSidebar({ onNavigate, onClose }: { onNavigate?: () => void; onClose?: () => void }) {
  const pathname = usePathname();

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <div
        style={{
          padding: "28px 20px 22px",
          borderBottom: `1px solid ${RULE}`,
          flexShrink: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          position: "relative",
        }}
      >
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="admin-drawer-close"
            style={{
              display: "none",
              position: "absolute",
              top: 14,
              right: 14,
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 6,
            }}
          >
            <CloseIcon size={15} color="rgba(248,243,232,0.4)" />
          </button>
        )}

        <div
          style={{
            width: 76,
            height: 76,
            backgroundColor: "#FFFFFF",
            borderRadius: 4,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 6,
            marginBottom: 12,
            flexShrink: 0,
          }}
        >
          <Image
            src="/branding/logo.svg"
            alt="Sir M Vishweshwarayya NEET JEE Academy"
            width={979}
            height={1091}
            unoptimized
            style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }}
          />
        </div>

        <div style={{ fontFamily: DISPLAY, fontSize: 13, fontWeight: 600, letterSpacing: "0.05em", color: GOLD_500, lineHeight: 1.45, marginBottom: 2 }}>
          Sir M Vishweshwarayya
        </div>
        <div
          style={{
            fontFamily: DISPLAY,
            fontSize: 11,
            letterSpacing: "0.10em",
            color: "rgba(248,243,232,0.5)",
            textTransform: "uppercase",
            marginBottom: 14,
          }}
        >
          NEET &amp; JEE Academy
        </div>

        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            padding: "4px 12px",
            border: "1px solid rgba(192,154,58,0.28)",
            borderRadius: 2,
          }}
        >
          <div style={{ width: 5, height: 5, borderRadius: "50%", backgroundColor: GOLD_500 }} />
          <span style={{ fontSize: 9.5, letterSpacing: "0.11em", color: "rgba(248,243,232,0.58)", textTransform: "uppercase", fontWeight: 500 }}>
            Academy Admin
          </span>
        </div>
      </div>

      <nav style={{ flex: 1, overflowY: "auto", padding: "12px 0" }}>
        {ADMIN_NAV_GROUPS.map((section) => (
          <div key={section.group} style={{ marginBottom: 4 }}>
            <div
              style={{
                padding: "10px 24px 5px",
                fontSize: 9,
                letterSpacing: "0.15em",
                fontWeight: 600,
                color: "rgba(200,185,155,0.38)",
                textTransform: "uppercase",
              }}
            >
              {section.group}
            </div>
            {section.items.map((item) => {
              const isActive = item.id === "dashboard" ? pathname === item.href : pathname?.startsWith(item.href);
              const Icon = ICON_MAP[item.id];
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  onClick={onNavigate}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 11,
                    width: "100%",
                    padding: "10px 24px",
                    textDecoration: "none",
                    backgroundColor: isActive ? "rgba(192,154,58,0.09)" : "transparent",
                    borderLeft: isActive ? `2px solid ${GOLD_500}` : "2px solid transparent",
                  }}
                >
                  <Icon size={15} color={isActive ? GOLD_500 : "rgba(248,243,232,0.38)"} />
                  <span
                    style={{
                      fontFamily: SANS,
                      fontSize: 13,
                      fontWeight: isActive ? 500 : 400,
                      color: isActive ? IVORY_100 : "rgba(248,243,232,0.52)",
                      letterSpacing: "0.01em",
                      textAlign: "left",
                    }}
                  >
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      <div style={{ padding: "12px 0", borderTop: "1px solid rgba(200,185,155,0.09)", flexShrink: 0 }}>
        <Link
          href="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 11,
            width: "100%",
            padding: "10px 24px",
            textDecoration: "none",
          }}
        >
          <WebsiteIcon size={15} color="rgba(248,243,232,0.38)" />
          <span style={{ fontFamily: SANS, fontSize: 13, color: "rgba(248,243,232,0.52)", letterSpacing: "0.01em" }}>View Website</span>
        </Link>
        <LogoutButton
          style={{
            display: "flex",
            alignItems: "center",
            gap: 11,
            width: "100%",
            padding: "10px 24px",
            border: "none",
            background: "transparent",
            cursor: "pointer",
            textAlign: "left",
          }}
        >
          <LogoutIcon size={15} color="rgba(248,243,232,0.28)" />
          <span style={{ fontFamily: SANS, fontSize: 13, color: "rgba(248,243,232,0.35)", letterSpacing: "0.01em" }}>Logout</span>
        </LogoutButton>
      </div>
    </div>
  );
}
