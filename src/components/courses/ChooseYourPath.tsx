"use client";

import { useState, useRef, useCallback } from "react";
import type { MouseEvent, CSSProperties } from "react";
import Link from "next/link";

const DM_SANS = "var(--font-dm-sans), sans-serif";
const FRAUNCES = "var(--font-fraunces), serif";

const programs = [
  {
    id: "foundation",
    name: "Foundation",
    tagline: "Build the base",
    num: "01",
    weight: 300,
    hoverWeight: 400,
    opsz: 88,
    href: "/courses/foundation",
  },
  {
    id: "neet",
    name: "NEET",
    num: "02",
    weight: 700,
    hoverWeight: 800,
    opsz: 36,
    children: [
      { label: "Achievement", href: "/courses/neet-achievement" },
      { label: "Long-Term", href: "/courses/neet-long-term" },
    ],
  },
  {
    id: "jee",
    name: "JEE",
    num: "03",
    weight: 700,
    hoverWeight: 800,
    opsz: 36,
    children: [
      { label: "Achievement", href: "/courses/jee-achievement" },
      { label: "Long-Term", href: "/courses/jee-long-term" },
    ],
  },
  {
    id: "kcet",
    name: "KCET",
    tagline: "Integrated",
    num: "04",
    weight: 500,
    hoverWeight: 600,
    opsz: 22,
    href: "/courses/kcet-integrated",
  },
] as const;

type LeafProgram = Extract<(typeof programs)[number], { href: string }>;
type GroupProgram = Extract<(typeof programs)[number], { children: readonly unknown[] }>;

function getRowStyle(hovered: boolean, cursorX: number): CSSProperties {
  return {
    display: "grid",
    gridTemplateColumns: "4.5rem 1fr auto",
    alignItems: "center",
    gap: "0 2rem",
    padding: "1.4rem 3.5rem 1.4rem 2.5rem",
    borderTop: "1px solid rgba(255,255,255,0.055)",
    background: hovered
      ? `radial-gradient(ellipse 900px 180% at ${cursorX}px 50%, rgba(90,160,255,0.09) 0%, transparent 65%)`
      : "transparent",
    cursor: "pointer",
    textDecoration: "none",
    position: "relative",
  };
}

function AccentBar({ hovered }: { hovered: boolean }) {
  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        top: "18%",
        bottom: "18%",
        width: "2px",
        borderRadius: "1px",
        background: hovered ? "rgba(130,195,255,0.75)" : "transparent",
        transition: "background 0.3s ease",
      }}
    />
  );
}

function NumberLabel({ hovered, num }: { hovered: boolean; num: string }) {
  return (
    <span
      className="cyp-num"
      style={{
        fontFamily: DM_SANS,
        fontSize: "0.58rem",
        letterSpacing: "0.18em",
        color: hovered ? "rgba(255,255,255,0.62)" : "rgba(255,255,255,0.32)",
        transition: "color 0.3s ease",
        paddingLeft: "1.1rem",
        userSelect: "none",
        fontWeight: 400,
      }}
    >
      {num}
    </span>
  );
}

function NameLabel({
  hovered,
  name,
  opsz,
  weight,
  hoverWeight,
}: {
  hovered: boolean;
  name: string;
  opsz: number;
  weight: number;
  hoverWeight: number;
}) {
  return (
    <span
      style={{
        fontFamily: FRAUNCES,
        fontSize: "clamp(2.6rem, 7.5vw, 7rem)",
        lineHeight: 1.05,
        fontVariationSettings: `'opsz' ${opsz}, 'wght' ${hovered ? hoverWeight : weight}`,
        color: hovered ? "#ffffff" : "#dce8f5",
        transition: "color 0.28s ease, font-variation-settings 0.38s ease",
        letterSpacing: "-0.025em",
        userSelect: "none",
        display: "block",
        paddingTop: "0.1em",
        paddingBottom: "0.1em",
      }}
    >
      {name}
    </span>
  );
}

// A leaf program (Foundation, KCET) opens directly — the whole row is one link.
function ProgramRow({ program }: { program: LeafProgram }) {
  const [hovered, setHovered] = useState(false);
  const [cursorX, setCursorX] = useState(0);
  const rowRef = useRef<HTMLAnchorElement>(null);

  const handleMouseMove = useCallback((e: MouseEvent<HTMLAnchorElement>) => {
    if (!rowRef.current) return;
    const rect = rowRef.current.getBoundingClientRect();
    setCursorX(e.clientX - rect.left);
  }, []);

  return (
    <Link
      ref={rowRef}
      href={program.href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={handleMouseMove}
      style={getRowStyle(hovered, cursorX)}
      className="cyp-row"
    >
      <AccentBar hovered={hovered} />
      <NumberLabel hovered={hovered} num={program.num} />
      <NameLabel
        hovered={hovered}
        name={program.name}
        opsz={program.opsz}
        weight={program.weight}
        hoverWeight={program.hoverWeight}
      />
      <span
        className="cyp-tagline"
        style={{
          fontFamily: DM_SANS,
          fontSize: "0.6rem",
          letterSpacing: "0.16em",
          textTransform: "uppercase",
          color: hovered ? "rgba(255,255,255,0.62)" : "rgba(255,255,255,0.30)",
          transition: "color 0.3s ease",
          textAlign: "right",
          userSelect: "none",
          whiteSpace: "nowrap",
          fontWeight: 400,
        }}
      >
        {program.tagline}
      </span>
    </Link>
  );
}

// A grouped program (NEET, JEE) has no single destination — Achievement and
// Long-Term are the actual clickable choices, in place of the row's tagline.
function ProgramRowGroup({ program }: { program: GroupProgram }) {
  const [hovered, setHovered] = useState(false);
  const [cursorX, setCursorX] = useState(0);
  const rowRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: MouseEvent<HTMLDivElement>) => {
    if (!rowRef.current) return;
    const rect = rowRef.current.getBoundingClientRect();
    setCursorX(e.clientX - rect.left);
  }, []);

  return (
    <div
      ref={rowRef}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={handleMouseMove}
      style={getRowStyle(hovered, cursorX)}
      className="cyp-row"
    >
      <AccentBar hovered={hovered} />
      <NumberLabel hovered={hovered} num={program.num} />
      <NameLabel
        hovered={hovered}
        name={program.name}
        opsz={program.opsz}
        weight={program.weight}
        hoverWeight={program.hoverWeight}
      />
      <span
        className="cyp-children"
        style={{
          fontFamily: DM_SANS,
          fontSize: "0.6rem",
          letterSpacing: "0.16em",
          textTransform: "uppercase",
          color: hovered ? "rgba(255,255,255,0.62)" : "rgba(255,255,255,0.30)",
          transition: "color 0.3s ease",
          textAlign: "right",
          whiteSpace: "nowrap",
          fontWeight: 400,
        }}
      >
        {program.children.map((child, index) => (
          <span key={child.href}>
            {index > 0 && <span aria-hidden="true"> · </span>}
            <Link href={child.href} className="cyp-child-link">
              {child.label}
            </Link>
          </span>
        ))}
      </span>
    </div>
  );
}

export default function ChooseYourPath() {
  return (
    <section id="choose-your-path" style={{ background: "#060d1a", paddingBottom: "6rem" }}>
      <style>{`
        .cyp-child-link {
          color: inherit;
          text-decoration: none;
        }
        .cyp-child-link:hover,
        .cyp-child-link:focus-visible {
          color: #ffffff !important;
          text-decoration: underline;
          text-underline-offset: 3px;
        }
        @media (max-width: 640px) {
          .cyp-header {
            padding: 3rem 1.5rem 2rem !important;
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 0.6rem !important;
          }
          .cyp-pill {
            display: none !important;
          }
          .cyp-row {
            grid-template-columns: 2.8rem 1fr !important;
            padding: 1.2rem 1.5rem 1.2rem 1.5rem !important;
          }
          .cyp-tagline {
            display: none !important;
          }
          .cyp-children {
            grid-column: 2 !important;
            text-align: left !important;
            white-space: normal !important;
            margin-top: 0.35rem !important;
          }
          .cyp-num {
            padding-left: 0.4rem !important;
          }
        }
        @media (min-width: 641px) and (max-width: 900px) {
          .cyp-header {
            padding: 4rem 2rem 2.5rem !important;
          }
          .cyp-row {
            padding: 1.3rem 2rem 1.3rem 2rem !important;
          }
          .cyp-tagline,
          .cyp-children {
            font-size: 0.55rem !important;
            letter-spacing: 0.1em !important;
          }
        }
      `}</style>

      {/* Section label row */}
      <div
        className="cyp-header"
        style={{
          padding: "5rem 3.5rem 3.5rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          borderBottom: "1px solid rgba(255,255,255,0.055)",
        }}
      >
        <h2
          style={{
            fontFamily: DM_SANS,
            fontSize: "0.62rem",
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.40)",
            margin: 0,
            fontWeight: 400,
          }}
        >
          Choose Your Path
        </h2>
        <span
          className="cyp-pill"
          style={{
            fontFamily: DM_SANS,
            fontSize: "0.57rem",
            letterSpacing: "0.16em",
            color: "rgba(255,255,255,0.22)",
            textTransform: "uppercase",
            fontWeight: 400,
          }}
        >
          Foundation · NEET · JEE · KCET
        </span>
      </div>

      {/* Program rows */}
      <div style={{ borderBottom: "1px solid rgba(255,255,255,0.055)" }}>
        {programs.map((p) =>
          "children" in p ? (
            <ProgramRowGroup key={p.id} program={p} />
          ) : (
            <ProgramRow key={p.id} program={p} />
          ),
        )}
      </div>
    </section>
  );
}
