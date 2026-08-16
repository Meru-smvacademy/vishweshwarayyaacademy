"use client";

import { useState } from "react";

const VW = 900;
const VH = 300;
const CENTER_Y = VH / 2;
const N_LINES = 90;

interface Stage {
  label: string;
  desc: string;
  x: number;
  color: string;
}

// Locked content — the six-stage institutional engine, from institution
// origin (UNDERSTAND) to the learner taking full ownership (OWNERSHIP).
const stages: Stage[] = [
  { label: "UNDERSTAND", desc: "Know the learner", x: 75, color: "#F4EDE3" },
  { label: "GUIDE", desc: "Direct the path", x: 225, color: "#EDE3C8" },
  { label: "PRACTISE", desc: "Build through doing", x: 375, color: "#DEAD82" },
  { label: "ASSESS", desc: "Measure progress", x: 525, color: "#D2AE58" },
  { label: "ADAPT", desc: "Adjust the approach", x: 675, color: "#C9A245" },
  { label: "OWNERSHIP", desc: "The learner leads", x: 825, color: "#C49A3C" },
];

// Fan lines from the institution focal point, spreading right
const lineData = Array.from({ length: N_LINES }, (_, i) => {
  const t = i / (N_LINES - 1);
  const rightY = t * VH;
  const dt = t - 0.5;
  const opacity = 0.05 + Math.exp(-dt * dt * 13) * 0.58;
  return { x1: 0, y1: CENTER_Y, x2: VW, y2: rightY, opacity };
});

// Exact beam spread at a given x position (derived from fan geometry)
function beamAt(x: number) {
  const spread = CENTER_Y * (x / VW);
  return { top: CENTER_Y - spread, bottom: CENTER_Y + spread, height: spread * 2 };
}

const FRAUNCES = "var(--font-fraunces), serif";
const WORK_SANS = "var(--font-work-sans), sans-serif";

export default function InstitutionEngine() {
  const [activeStage, setActiveStage] = useState<number | null>(null);

  return (
    <section className="w-full" style={{ backgroundColor: "#08111E" }}>
      <div className="mx-auto px-6 py-24" style={{ maxWidth: "1200px" }}>
        {/* Academy label */}
        <p
          style={{
            fontFamily: WORK_SANS,
            fontSize: "0.68rem",
            letterSpacing: "0.26em",
            fontWeight: 500,
            color: "#C49A3C",
            marginBottom: "2.75rem",
          }}
          className="uppercase"
        >
          Vishweshwarayya NEET | JEE Academy
        </p>

        {/* Heading */}
        <div style={{ marginBottom: "4.5rem" }}>
          <h2
            style={{
              fontFamily: FRAUNCES,
              fontSize: "clamp(2.8rem, 5.8vw, 5.4rem)",
              fontWeight: 300,
              lineHeight: 1.04,
              letterSpacing: "-0.03em",
              color: "#F4EDE3",
              margin: 0,
            }}
          >
            The Institution
            <br />
            <em style={{ fontStyle: "italic", color: "#C49A3C", fontWeight: 300 }}>Engine.</em>
          </h2>
          <p
            style={{
              fontFamily: WORK_SANS,
              fontSize: "1rem",
              fontWeight: 300,
              color: "rgba(244, 237, 227, 0.42)",
              letterSpacing: "0.025em",
              marginTop: "1.5rem",
              maxWidth: "26rem",
            }}
          >
            Guidance that builds ownership.
          </p>
        </div>

        {/* SVG — The Emanating Beam */}
        <div style={{ position: "relative", width: "100%", aspectRatio: `${VW} / ${VH}` }}>
          <svg
            viewBox={`0 0 ${VW} ${VH}`}
            style={{ width: "100%", height: "100%", display: "block" }}
            preserveAspectRatio="none"
            role="img"
            aria-label="A beam of light spreading from a single origin point through six stages — Understand, Guide, Practise, Assess, Adapt, Ownership — widening as it goes, representing guidance that gradually builds learner ownership"
          >
            <defs>
              {/* Beam colour: warm cream at institution origin → amber-gold at ownership */}
              <linearGradient id="ie-fieldGrad" x1="0" y1="0" x2={VW} y2="0" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#F4EDE3" stopOpacity="0" />
                <stop offset="4%" stopColor="#F4EDE3" stopOpacity="0.95" />
                <stop offset="40%" stopColor="#E8D090" stopOpacity="0.70" />
                <stop offset="74%" stopColor="#C49A3C" stopOpacity="0.58" />
                <stop offset="100%" stopColor="#C49A3C" stopOpacity="0.25" />
              </linearGradient>

              {/* Mask shapes the beam from individual fan lines */}
              <mask id="ie-fanMask">
                {lineData.map((ln, i) => (
                  <line
                    key={i}
                    x1={ln.x1}
                    y1={ln.y1}
                    x2={ln.x2}
                    y2={ln.y2}
                    stroke="white"
                    strokeWidth="1.2"
                    opacity={ln.opacity}
                  />
                ))}
              </mask>

              {/* Institution focal glow */}
              <radialGradient id="ie-focalGlow" cx="0" cy={CENTER_Y} r="110" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#C49A3C" stopOpacity="0.38" />
                <stop offset="100%" stopColor="#C49A3C" stopOpacity="0" />
              </radialGradient>

              {/* Ownership arrival glow */}
              <radialGradient id="ie-ownerGlow" cx={VW} cy={CENTER_Y} r="155" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#C49A3C" stopOpacity="0.22" />
                <stop offset="100%" stopColor="#C49A3C" stopOpacity="0" />
              </radialGradient>

              {/* Active stage column highlight */}
              {activeStage !== null && (
                <radialGradient
                  id="ie-activeGlow"
                  cx={stages[activeStage].x}
                  cy={CENTER_Y}
                  r="95"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0%" stopColor="#C49A3C" stopOpacity="0.22" />
                  <stop offset="100%" stopColor="#C49A3C" stopOpacity="0" />
                </radialGradient>
              )}
            </defs>

            {/* Halos */}
            <circle cx="0" cy={CENTER_Y} r="110" fill="url(#ie-focalGlow)" />
            <circle cx={VW} cy={CENTER_Y} r="155" fill="url(#ie-ownerGlow)" />

            {/* Fan beam revealed through gradient */}
            <rect x="0" y="0" width={VW} height={VH} fill="url(#ie-fieldGrad)" mask="url(#ie-fanMask)" />

            {/* Spine — continuous institution thread running through every stage */}
            <line x1="0" y1={CENTER_Y} x2={VW} y2={CENTER_Y} stroke="#F4EDE3" strokeWidth="0.6" opacity="0.18" />

            {/* Institution origin point */}
            <circle cx="3" cy={CENTER_Y} r="3.5" fill="#C49A3C" opacity="0.9" />

            {/* Active stage column */}
            {activeStage !== null && (
              <rect x={stages[activeStage].x - 68} y="0" width="136" height={VH} fill="url(#ie-activeGlow)" />
            )}

            {/* Cross-section markers — one per stage, each showing the beam's exact width at that point.
                The progression from narrow (UNDERSTAND) to full-height (OWNERSHIP) makes the
                gradual release of ownership visible in the geometry itself. */}
            {stages.map((stage, i) => {
              const isActive = activeStage === i;
              const { top, bottom } = beamAt(stage.x);
              const col = stage.color;

              return (
                <g key={stage.label}>
                  {/* Faint stem from beam bottom to SVG bottom — visual thread to label row */}
                  <line
                    x1={stage.x}
                    y1={bottom}
                    x2={stage.x}
                    y2={VH}
                    stroke={col}
                    strokeWidth="0.7"
                    opacity={isActive ? 0.3 : 0.1}
                    style={{ transition: "opacity 0.3s ease" }}
                  />

                  {/* The cross-section bar: shows beam spread at this stage */}
                  <line
                    x1={stage.x}
                    y1={top}
                    x2={stage.x}
                    y2={bottom}
                    stroke={col}
                    strokeWidth={isActive ? 2.5 : 1.6}
                    opacity={isActive ? 0.95 : 0.52}
                    style={{ transition: "all 0.3s ease" }}
                  />

                  {/* Bracket caps — top */}
                  <line
                    x1={stage.x - 5}
                    y1={top}
                    x2={stage.x + 5}
                    y2={top}
                    stroke={col}
                    strokeWidth="1.2"
                    opacity={isActive ? 0.9 : 0.45}
                    style={{ transition: "opacity 0.3s ease" }}
                  />
                  {/* Bracket caps — bottom */}
                  <line
                    x1={stage.x - 5}
                    y1={bottom}
                    x2={stage.x + 5}
                    y2={bottom}
                    stroke={col}
                    strokeWidth="1.2"
                    opacity={isActive ? 0.9 : 0.45}
                    style={{ transition: "opacity 0.3s ease" }}
                  />

                  {/* Midline node */}
                  <circle
                    cx={stage.x}
                    cy={CENTER_Y}
                    r={isActive ? 4.5 : 2.8}
                    fill={isActive ? col : "none"}
                    stroke={col}
                    strokeWidth="1"
                    opacity={isActive ? 1 : 0.42}
                    style={{ transition: "all 0.3s ease" }}
                  />
                </g>
              );
            })}
          </svg>
        </div>

        {/* Stage labels — grid-aligned to SVG marker positions */}
        <div className="grid grid-cols-3 sm:grid-cols-6" style={{ borderTop: "1px solid rgba(196, 154, 60, 0.1)" }}>
          {stages.map((stage, i) => {
            const isActive = activeStage === i;
            return (
              <div
                key={stage.label}
                style={{
                  textAlign: "center",
                  padding: "1.4rem 0.5rem 0.5rem",
                  cursor: "default",
                  position: "relative",
                }}
                onMouseEnter={() => setActiveStage(i)}
                onMouseLeave={() => setActiveStage(null)}
              >
                {/* Top accent line — attaches label to the beam stem above */}
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: isActive ? "36px" : "20px",
                    height: "2px",
                    backgroundColor: isActive ? stage.color : "rgba(196, 154, 60, 0.2)",
                    transition: "all 0.3s ease",
                  }}
                />

                {/* Stage index — quiet ordinal */}
                <p
                  style={{
                    fontFamily: WORK_SANS,
                    fontSize: "0.6rem",
                    letterSpacing: "0.18em",
                    fontWeight: 400,
                    color: isActive ? stage.color : "rgba(196, 154, 60, 0.3)",
                    transition: "color 0.3s ease",
                    marginBottom: "0.55rem",
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </p>

                {/* Stage name */}
                <p
                  style={{
                    fontFamily: WORK_SANS,
                    fontSize: "0.82rem",
                    letterSpacing: "0.12em",
                    fontWeight: 600,
                    color: isActive ? stage.color : "rgba(244, 237, 227, 0.5)",
                    transition: "color 0.3s ease",
                    marginBottom: "0.45rem",
                    lineHeight: 1.2,
                  }}
                  className="uppercase"
                >
                  {stage.label}
                </p>

                {/* Stage descriptor */}
                <p
                  style={{
                    fontFamily: WORK_SANS,
                    fontSize: "0.76rem",
                    fontWeight: 300,
                    color: isActive ? "rgba(244, 237, 227, 0.62)" : "rgba(244, 237, 227, 0.2)",
                    transition: "color 0.3s ease",
                    lineHeight: 1.5,
                  }}
                >
                  {stage.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Closing rule */}
        <div
          style={{
            marginTop: "5rem",
            height: "1px",
            background:
              "linear-gradient(to right, rgba(196,154,60,0.4) 0%, rgba(196,154,60,0.1) 60%, transparent 100%)",
          }}
        />
      </div>
    </section>
  );
}
