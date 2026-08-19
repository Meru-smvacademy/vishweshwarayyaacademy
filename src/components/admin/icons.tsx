import type { SVGProps } from "react";

type IconProps = { size?: number; color?: string };

function Base({ size = 16, children }: { size?: number; children: React.ReactNode }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
      {children}
    </svg>
  );
}

export function DashboardIcon({ size, color }: IconProps) {
  return (
    <Base size={size}>
      <rect x="1.5" y="1.5" width="5.5" height="5.5" stroke={color} strokeWidth="1" />
      <rect x="9" y="1.5" width="5.5" height="5.5" stroke={color} strokeWidth="1" />
      <rect x="1.5" y="9" width="5.5" height="5.5" stroke={color} strokeWidth="1" />
      <rect x="9" y="9" width="5.5" height="5.5" stroke={color} strokeWidth="1" />
    </Base>
  );
}

export function FacultyIcon({ size, color }: IconProps) {
  return (
    <Base size={size}>
      <circle cx="8" cy="5.5" r="2.5" stroke={color} strokeWidth="1" />
      <path d="M2.5 14.5 C2.5 11.5 5 9.5 8 9.5 C11 9.5 13.5 11.5 13.5 14.5" stroke={color} strokeWidth="1" strokeLinecap="round" />
    </Base>
  );
}

export function GalleryIcon({ size, color }: IconProps) {
  return (
    <Base size={size}>
      <rect x="1.5" y="3" width="13" height="10" rx="0.5" stroke={color} strokeWidth="1" />
      <circle cx="5.5" cy="6.5" r="1.2" fill={color} />
      <path d="M1.5 10.5 L5 8 L8 10 L11 7 L14.5 10.5" stroke={color} strokeWidth="1" strokeLinejoin="round" />
    </Base>
  );
}

export function InfraIcon({ size, color }: IconProps) {
  return (
    <Base size={size}>
      <path d="M8 1.5 L14.5 5.5 L14.5 14.5 L1.5 14.5 L1.5 5.5 Z" stroke={color} strokeWidth="1" />
      <rect x="6" y="10" width="4" height="4.5" stroke={color} strokeWidth="0.8" />
      <rect x="3.5" y="8" width="2.5" height="2" stroke={color} strokeWidth="0.7" />
      <rect x="10" y="8" width="2.5" height="2" stroke={color} strokeWidth="0.7" />
    </Base>
  );
}

export function ResultsIcon({ size, color }: IconProps) {
  return (
    <Base size={size}>
      <path d="M3 13 L3 9 M6.5 13 L6.5 7 M10 13 L10 5 M13.5 13 L13.5 2.5" stroke={color} strokeWidth="1.1" strokeLinecap="round" />
    </Base>
  );
}

export function MediaIcon({ size, color }: IconProps) {
  return (
    <Base size={size}>
      <rect x="1.5" y="2.5" width="13" height="11" rx="0.5" stroke={color} strokeWidth="1" />
      <path d="M6.5 5.5 L11 8 L6.5 10.5 Z" stroke={color} strokeWidth="0.9" fill={color} fillOpacity={0.35} />
    </Base>
  );
}

export function EnquiryIcon({ size, color }: IconProps) {
  return (
    <Base size={size}>
      <path d="M1.5 3 H14.5 V10.5 H8.5 L5 13.5 V10.5 H1.5 Z" stroke={color} strokeWidth="1" />
      <line x1="4.5" y1="6" x2="11.5" y2="6" stroke={color} strokeWidth="0.8" />
      <line x1="4.5" y1="8" x2="9" y2="8" stroke={color} strokeWidth="0.8" />
    </Base>
  );
}

export function ScholarIcon({ size, color }: IconProps) {
  return (
    <Base size={size}>
      <path d="M8 1.5 L14.5 4.5 L8 7.5 L1.5 4.5 Z" stroke={color} strokeWidth="1" />
      <path d="M4.5 6 L4.5 11 C4.5 12 6 13.5 8 13.5 C10 13.5 11.5 12 11.5 11 L11.5 6" stroke={color} strokeWidth="1" strokeLinecap="round" />
      <line x1="14.5" y1="4.5" x2="14.5" y2="9" stroke={color} strokeWidth="1" strokeLinecap="round" />
    </Base>
  );
}

export function StaffIcon({ size, color }: IconProps) {
  return (
    <Base size={size}>
      <circle cx="5.5" cy="5.5" r="2" stroke={color} strokeWidth="1" />
      <circle cx="11" cy="5.5" r="2" stroke={color} strokeWidth="1" />
      <path d="M1 13.5 C1 11 3 9.5 5.5 9.5 C7 9.5 8.2 10.1 9 11" stroke={color} strokeWidth="1" strokeLinecap="round" />
      <path d="M8.5 13.5 C8.5 11 10.2 9.5 11 9.5 C13 9.5 15 11 15 13.5" stroke={color} strokeWidth="1" strokeLinecap="round" />
    </Base>
  );
}

export function SettingsIcon({ size, color }: IconProps) {
  return (
    <Base size={size}>
      <circle cx="8" cy="8" r="2.2" stroke={color} strokeWidth="1" />
      <path
        d="M8 1.5 V3 M8 13 V14.5 M1.5 8 H3 M13 8 H14.5 M3.4 3.4 L4.5 4.5 M11.5 11.5 L12.6 12.6 M12.6 3.4 L11.5 4.5 M4.5 11.5 L3.4 12.6"
        stroke={color}
        strokeWidth="1"
        strokeLinecap="round"
      />
    </Base>
  );
}

export function WebsiteIcon({ size, color }: IconProps) {
  return (
    <Base size={size}>
      <circle cx="8" cy="8" r="6.5" stroke={color} strokeWidth="1" />
      <path d="M8 1.5 C6 4 5 6 5 8 C5 10 6 12 8 14.5" stroke={color} strokeWidth="0.9" />
      <path d="M8 1.5 C10 4 11 6 11 8 C11 10 10 12 8 14.5" stroke={color} strokeWidth="0.9" />
      <line x1="1.5" y1="8" x2="14.5" y2="8" stroke={color} strokeWidth="0.9" />
    </Base>
  );
}

export function LogoutIcon({ size, color }: IconProps) {
  return (
    <Base size={size}>
      <path d="M6.5 2 H3 C2 2 1.5 2.5 1.5 3.5 V12.5 C1.5 13.5 2 14 3 14 H6.5" stroke={color} strokeWidth="1" strokeLinecap="round" />
      <path d="M10.5 5.5 L14 8 L10.5 10.5" stroke={color} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="14" y1="8" x2="6" y2="8" stroke={color} strokeWidth="1" strokeLinecap="round" />
    </Base>
  );
}

export function MenuIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" style={{ flexShrink: 0 }} {...props}>
      <line x1="3" y1="5.5" x2="17" y2="5.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      <line x1="3" y1="10" x2="17" y2="10" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      <line x1="3" y1="14.5" x2="17" y2="14.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

export function CloseIcon({ size, color }: IconProps) {
  return (
    <Base size={size}>
      <line x1="2" y1="2" x2="14" y2="14" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
      <line x1="14" y1="2" x2="2" y2="14" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
    </Base>
  );
}
