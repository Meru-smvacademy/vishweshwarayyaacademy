"use client";

import { useState } from "react";
import InfrastructureImagePlaceholder from "@/components/infrastructure/InfrastructureImagePlaceholder";
import type { InfrastructureArea } from "@/content/infrastructure";

const NAVY = "#0c1a2e";
const GOLD = "#b8933c";

const DISPLAY = "var(--font-playfair-display), Georgia, serif";
const SANS = "var(--font-inter), sans-serif";
const MONO = "var(--font-dm-mono), 'Courier New', monospace";

const ASPECT_MAP: Record<InfrastructureArea["size"], string> = {
  large: "3 / 4",
  medium: "4 / 3",
  wide: "16 / 7",
};

export default function InfraItem({
  area,
  description,
  imageUrl,
}: {
  area: InfrastructureArea;
  description: string | null;
  imageUrl: string | null;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <article
      style={{ display: "flex", flexDirection: "column" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{ width: "100%", height: "1px", backgroundColor: NAVY, opacity: 0.2, marginBottom: "1rem" }} />

      <div style={{ display: "flex", alignItems: "baseline", gap: "1rem", marginBottom: "0.75rem" }}>
        <span style={{ fontFamily: MONO, fontSize: "10px", letterSpacing: "0.25em", color: GOLD, lineHeight: 1, flexShrink: 0 }}>
          {area.num}
        </span>
        <h3
          style={{
            fontFamily: DISPLAY,
            fontSize: "1.125rem",
            fontWeight: 500,
            letterSpacing: "0.04em",
            color: NAVY,
            textTransform: "uppercase",
            lineHeight: 1,
            margin: 0,
          }}
        >
          {area.title}
        </h3>
      </div>

      {imageUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={imageUrl}
          alt={area.title}
          className="mb-4"
          style={{ width: "100%", aspectRatio: ASPECT_MAP[area.size], objectFit: "cover" }}
        />
      ) : (
        <InfrastructureImagePlaceholder label={area.title} aspectRatio={ASPECT_MAP[area.size]} className="mb-4" />
      )}

      <p style={{ fontFamily: SANS, fontSize: "0.875rem", color: "#4a4a4a", lineHeight: 1.6, margin: "1rem 0 0.75rem" }}>
        {description ?? area.description}
      </p>

      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", opacity: hovered ? 1 : 0, transition: "opacity 0.3s" }}>
        <span style={{ fontFamily: MONO, fontSize: "10px", letterSpacing: "0.2em", color: GOLD, textTransform: "uppercase" }}>
          Explore
        </span>
        <span style={{ color: GOLD, fontSize: "12px" }} aria-hidden="true">
          →
        </span>
      </div>
    </article>
  );
}
