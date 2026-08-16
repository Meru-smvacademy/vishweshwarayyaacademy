"use client";

import { useState } from "react";

type Pathway = "FOUNDATION" | "NEET" | "JEE" | "KCET" | null;

const PLAYFAIR = "var(--font-playfair-display), Georgia, serif";
const OUTFIT = "var(--font-outfit), system-ui, sans-serif";

const PATHWAYS = {
  NEET: { color: "#B5541E", bg: "rgba(181,84,30,0.06)", label: "NEET", sub: "Medical" },
  JEE: { color: "#1E4B8A", bg: "rgba(30,75,138,0.06)", label: "JEE", sub: "Engineering" },
  KCET: { color: "#1E6B45", bg: "rgba(30,107,69,0.06)", label: "KCET", sub: "State Entrance" },
} as const;

const GRAIN_TEXTURE =
  "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E\")";

export default function AcademicPathwaysIntro() {
  const [active, setActive] = useState<Pathway>(null);

  const dim = (p: Pathway) => active !== null && active !== p && active !== "FOUNDATION";
  const foundationActive = active === "FOUNDATION";

  return (
    <section
      className="relative flex flex-col items-center overflow-hidden px-10 pb-[120px] pt-20"
      style={{ backgroundColor: "#F7F4EF", fontFamily: OUTFIT }}
    >
      {/* Subtle grain texture overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{ backgroundImage: GRAIN_TEXTURE, backgroundSize: "256px" }}
      />

      {/* Thin horizontal rule top */}
      <div className="absolute inset-x-12 top-12 h-px" style={{ backgroundColor: "rgba(26,23,20,0.12)" }} />

      {/* Section label */}
      <p
        className="mb-14 mt-0"
        style={{
          fontFamily: OUTFIT,
          fontSize: "11px",
          fontWeight: 500,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "rgba(26,23,20,0.4)",
        }}
      >
        Vishweshwarayya Academy
      </p>

      {/* Main heading */}
      <h1
        className="m-0 text-center leading-[1.0]"
        style={{
          fontFamily: PLAYFAIR,
          fontSize: "clamp(42px, 7vw, 88px)",
          fontWeight: 400,
          letterSpacing: "-0.02em",
          color: "#1A1714",
        }}
      >
        Academic
        <br />
        <em style={{ fontStyle: "italic", fontWeight: 400 }}>Pathways</em>
      </h1>

      {/* Subtitle */}
      <p
        className="mb-0 mt-6"
        style={{ fontFamily: OUTFIT, fontSize: "16px", fontWeight: 300, color: "rgba(26,23,20,0.5)", letterSpacing: "0.01em" }}
      >
        Find the path that fits your goal.
      </p>

      {/* Pathway diagram */}
      <div className="relative mt-20 flex w-full max-w-[760px] flex-col items-center">
        {/* FOUNDATION node */}
        <div
          onMouseEnter={() => setActive("FOUNDATION")}
          onMouseLeave={() => setActive(null)}
          onFocus={() => setActive("FOUNDATION")}
          onBlur={() => setActive(null)}
          tabIndex={0}
          role="button"
          aria-label="Foundation pathway"
          className="relative z-[2] flex cursor-default flex-col items-center gap-1.5 outline-none"
        >
          <span
            style={{
              fontFamily: OUTFIT,
              fontSize: "11px",
              fontWeight: 500,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: foundationActive ? "rgba(26,23,20,0.65)" : "rgba(26,23,20,0.38)",
              transition: "color 0.25s ease",
            }}
          >
            Start here
          </span>
          <div
            className="inline-flex items-center gap-3.5 rounded-[2px] px-9 py-3.5"
            style={{
              border: `1.5px solid ${foundationActive ? "rgba(26,23,20,0.45)" : "rgba(26,23,20,0.28)"}`,
              background: foundationActive ? "rgba(26,23,20,0.04)" : "#F7F4EF",
              transition: "border-color 0.25s ease, background 0.25s ease",
            }}
          >
            <div
              className="h-1.5 w-1.5 rounded-full"
              style={{
                backgroundColor: "#1A1714",
                transition: "transform 0.25s ease",
                transform: foundationActive ? "scale(1.3)" : "scale(1)",
              }}
            />
            <span
              style={{
                fontFamily: PLAYFAIR,
                fontSize: "22px",
                fontWeight: 500,
                letterSpacing: "0.08em",
                color: "#1A1714",
                textTransform: "uppercase",
              }}
            >
              Foundation
            </span>
          </div>
        </div>

        {/* SVG branching lines */}
        <svg viewBox="0 0 760 168" className="-mt-0.5 block w-full max-w-[760px]" style={{ overflow: "visible" }} aria-hidden="true">
          <line
            x1="380"
            y1="0"
            x2="380"
            y2="50"
            stroke={foundationActive ? "rgba(26,23,20,0.55)" : "rgba(26,23,20,0.30)"}
            strokeWidth="1.5"
            style={{ transition: "stroke 0.25s ease" }}
          />
          <line
            x1="100"
            y1="50"
            x2="660"
            y2="50"
            stroke={foundationActive ? "rgba(26,23,20,0.55)" : "rgba(26,23,20,0.30)"}
            strokeWidth="1.5"
            style={{ transition: "stroke 0.25s ease" }}
          />

          <BranchLine x1={100} y1={50} x2={100} y2={152} active={active} pathway="NEET" color={PATHWAYS.NEET.color} />
          <BranchLine x1={380} y1={50} x2={380} y2={152} active={active} pathway="JEE" color={PATHWAYS.JEE.color} />
          <BranchLine x1={660} y1={50} x2={660} y2={152} active={active} pathway="KCET" color={PATHWAYS.KCET.color} />

          {(["NEET", "JEE", "KCET"] as const).map((p, i) => {
            const cx = i === 0 ? 100 : i === 1 ? 380 : 660;
            const c = PATHWAYS[p];
            const isActive = active === p;
            return (
              <circle
                key={`junction-${p}`}
                cx={cx}
                cy={50}
                r={isActive ? 4.5 : 3}
                fill={isActive ? c.color : foundationActive ? "rgba(26,23,20,0.55)" : "rgba(26,23,20,0.40)"}
                style={{ transition: "all 0.25s ease" }}
              />
            );
          })}

          {(["NEET", "JEE", "KCET"] as const).map((p, i) => {
            const cx = i === 0 ? 100 : i === 1 ? 380 : 660;
            const c = PATHWAYS[p];
            const isActive = active === p;
            const isDimmed = active !== null && active !== p && active !== "FOUNDATION";
            return (
              <circle
                key={`dest-${p}`}
                cx={cx}
                cy={160}
                r={isActive ? 6 : 5}
                fill={isActive ? c.color : "#1A1714"}
                opacity={isDimmed ? 0.12 : 1}
                style={{ transition: "all 0.3s ease" }}
              />
            );
          })}
        </svg>

        {/* Three pathway destinations */}
        <div className="-mt-0.5 grid w-full max-w-[760px] grid-cols-3 gap-0">
          {(["NEET", "JEE", "KCET"] as const).map((key) => {
            const p = PATHWAYS[key];
            return (
              <PathwayNode
                key={key}
                label={p.label}
                sub={p.sub}
                color={p.color}
                bg={p.bg}
                isActive={active === key}
                isDimmed={dim(key)}
                onEnter={() => setActive(key)}
                onLeave={() => setActive(null)}
              />
            );
          })}
        </div>
      </div>

      {/* Bottom rule */}
      <div className="absolute inset-x-12 bottom-12 h-px" style={{ backgroundColor: "rgba(26,23,20,0.08)" }} />
    </section>
  );
}

function BranchLine({
  x1,
  y1,
  x2,
  y2,
  active,
  pathway,
  color,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  active: Pathway;
  pathway: Pathway;
  color: string;
}) {
  const isActive = active === pathway;
  const isDimmed = active !== null && active !== pathway && active !== "FOUNDATION";
  const isFoundationActive = active === "FOUNDATION";
  return (
    <line
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      stroke={isActive ? color : isDimmed ? "rgba(26,23,20,0.10)" : isFoundationActive ? "rgba(26,23,20,0.42)" : "rgba(26,23,20,0.30)"}
      strokeWidth={isActive ? 2.5 : 1.5}
      style={{ transition: "stroke 0.3s ease, stroke-width 0.3s ease" }}
    />
  );
}

function PathwayNode({
  label,
  sub,
  color,
  bg,
  isActive,
  isDimmed,
  onEnter,
  onLeave,
}: {
  label: string;
  sub: string;
  color: string;
  bg: string;
  isActive: boolean;
  isDimmed: boolean;
  onEnter: () => void;
  onLeave: () => void;
}) {
  return (
    <div
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onFocus={onEnter}
      onBlur={onLeave}
      tabIndex={0}
      role="button"
      aria-label={`${label} pathway`}
      className="relative flex cursor-default flex-col items-center rounded px-4 pb-8 pt-[18px] outline-none"
      style={{
        transition: "opacity 0.3s ease",
        opacity: isDimmed ? 0.3 : 1,
        background: isActive ? bg : "transparent",
      }}
    >
      <span
        style={{
          fontFamily: PLAYFAIR,
          fontSize: "clamp(32px, 5.5vw, 50px)",
          fontWeight: isActive ? 600 : 500,
          letterSpacing: "-0.01em",
          color: isActive ? color : "#1A1714",
          transition: "color 0.3s ease",
          lineHeight: 1,
        }}
      >
        {label}
      </span>

      <span
        className="mt-3"
        style={{
          fontFamily: OUTFIT,
          fontSize: "11px",
          fontWeight: 500,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: isActive ? color : "rgba(26,23,20,0.48)",
          transition: "color 0.3s ease",
        }}
      >
        {sub}
      </span>
    </div>
  );
}
