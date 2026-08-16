"use client";

import { useState } from "react";
import InfrastructureImagePlaceholder from "@/components/infrastructure/InfrastructureImagePlaceholder";
import { INFRASTRUCTURE_AREAS, type InfrastructureArea } from "@/content/infrastructure";

const NAVY = "#0c1a2e";
const IVORY = "#f4efe5";
const GOLD = "#b8933c";

const DISPLAY = "var(--font-playfair-display), Georgia, serif";
const SANS = "var(--font-inter), sans-serif";
const MONO = "var(--font-dm-mono), 'Courier New', monospace";

const ASPECT_MAP: Record<InfrastructureArea["size"], string> = {
  large: "3 / 4",
  medium: "4 / 3",
  wide: "16 / 7",
};

function InfraItem({ area }: { area: InfrastructureArea }) {
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

      <InfrastructureImagePlaceholder label={area.title} aspectRatio={ASPECT_MAP[area.size]} className="mb-4" />

      <p style={{ fontFamily: SANS, fontSize: "0.875rem", color: "#4a4a4a", lineHeight: 1.6, margin: "1rem 0 0.75rem" }}>
        {area.description}
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

export default function InfrastructureGrid() {
  const [campus, smartClassrooms, scienceLabs, digitalLearning, library, studyEnvironment] = INFRASTRUCTURE_AREAS;

  return (
    <section style={{ backgroundColor: IVORY }}>
      <div className="infra-grid-inner" style={{ maxWidth: "1152px", margin: "0 auto", padding: "5rem 1.5rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "3.5rem" }}>
          <div style={{ width: "20px", height: "1px", backgroundColor: GOLD }} />
          <span style={{ fontFamily: MONO, fontSize: "10px", letterSpacing: "0.3em", color: GOLD, textTransform: "uppercase" }}>
            The Spaces
          </span>
        </div>

        <div className="infra-row-1" style={{ display: "grid", gridTemplateColumns: "1fr", gap: "2rem", marginBottom: "3rem" }}>
          <InfraItem area={campus} />
          <InfraItem area={smartClassrooms} />
          <InfraItem area={scienceLabs} />
        </div>

        <div style={{ marginBottom: "3rem" }}>
          <InfraItem area={digitalLearning} />
        </div>

        <div className="infra-row-3" style={{ display: "grid", gridTemplateColumns: "1fr", gap: "2rem" }}>
          <InfraItem area={library} />
          <InfraItem area={studyEnvironment} />
        </div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .infra-grid-inner { padding-left: 3rem !important; padding-right: 3rem !important; }
          .infra-row-1 { grid-template-columns: 1.4fr 1fr 1fr !important; gap: 3rem !important; }
          .infra-row-3 { grid-template-columns: 1fr 1.4fr !important; gap: 3rem !important; }
        }
        @media (min-width: 1024px) {
          .infra-grid-inner { padding-left: 4rem !important; padding-right: 4rem !important; }
        }
      `}</style>
    </section>
  );
}
