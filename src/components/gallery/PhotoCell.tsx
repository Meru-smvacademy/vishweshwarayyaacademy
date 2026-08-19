"use client";

import { useState } from "react";

const SANS = "var(--font-dm-sans), system-ui, sans-serif";

export type PhotoSpan = "wide" | "tall" | "square" | "featured";

export type PhotoSlot = {
  id: string;
  category: string;
  span: PhotoSpan;
  alt: string;
  src?: string;
};

export const CATEGORY_COLOR: Record<string, string> = {
  Campus: "#c8a96e",
  Classrooms: "#7eb8c4",
  Labs: "#9e8fd4",
  Students: "#c47e7e",
  Events: "#7ec49a",
  Hostel: "#c4a77e",
};

const CORNER_CLASSES = [
  "top-4 left-4 border-t border-l",
  "top-4 right-4 border-t border-r",
  "bottom-4 left-4 border-b border-l",
  "bottom-4 right-4 border-b border-r",
];

export default function PhotoCell({ slot }: { slot: PhotoSlot }) {
  const [hovered, setHovered] = useState(false);
  const accent = CATEGORY_COLOR[slot.category] ?? "#c8a96e";

  return (
    <div
      className="group relative overflow-hidden"
      style={{
        gridColumn: slot.span === "featured" || slot.span === "wide" ? "span 2" : "span 1",
        aspectRatio:
          slot.span === "featured" ? "16/9" : slot.span === "tall" ? "3/4" : slot.span === "wide" ? "16/7" : "1/1",
        backgroundColor: "#0d0d0d",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {slot.src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={slot.src}
          alt={slot.alt}
          className="h-full w-full object-cover"
          style={{
            transform: hovered ? "scale(1.04)" : "scale(1)",
            transition: "transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          }}
        />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center" style={{ backgroundColor: "#101010" }}>
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `linear-gradient(${accent}08 1px, transparent 1px), linear-gradient(90deg, ${accent}08 1px, transparent 1px)`,
              backgroundSize: "32px 32px",
              opacity: hovered ? 1 : 0.5,
              transition: "opacity 0.4s ease",
            }}
          />
          {CORNER_CLASSES.map((cls, i) => (
            <div
              key={i}
              className={`absolute h-5 w-5 ${cls}`}
              style={{ borderColor: accent, opacity: hovered ? 0.9 : 0.35, transition: "opacity 0.4s ease" }}
            />
          ))}
          <div className="relative z-10 px-4 text-center" style={{ opacity: hovered ? 0.6 : 0.25, transition: "opacity 0.4s ease" }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="1.2" className="mx-auto mb-2">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <path d="M21 15l-5-5L5 21" />
            </svg>
            <p className="text-xs uppercase tracking-[0.2em]" style={{ color: accent, fontFamily: SANS }}>
              Photograph
            </p>
          </div>
        </div>
      )}

      <div
        className="absolute inset-x-0 bottom-0 flex items-end px-4 pb-4 pt-10"
        style={{
          background: "linear-gradient(to top, rgba(0,0,0,0.72) 0%, transparent 100%)",
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.35s ease",
        }}
      >
        <span className="text-[10px] uppercase tracking-[0.22em]" style={{ color: accent, fontFamily: SANS, fontWeight: 400 }}>
          {slot.category}
        </span>
      </div>
    </div>
  );
}
