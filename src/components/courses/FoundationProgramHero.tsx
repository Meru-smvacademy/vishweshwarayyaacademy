"use client";

import { useState, type CSSProperties, type PointerEvent } from "react";

const DM_SANS = "var(--font-dm-sans), sans-serif";
const FRAUNCES = "var(--font-fraunces), serif";

function PillarsVisual() {
  return (
    <div className="relative mx-auto w-full max-w-[540px]">
      <svg viewBox="0 0 540 260" width="100%" aria-hidden="true" style={{ display: "block", overflow: "visible" }}>
        <defs>
          <linearGradient id="fp-g1" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#8cb8f0" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#d6eaff" stopOpacity="0.5" />
          </linearGradient>
          <linearGradient id="fp-g2" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#4880d8" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#a8c8f8" stopOpacity="0.6" />
          </linearGradient>
          <linearGradient id="fp-g3" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1a4fa8" />
            <stop offset="100%" stopColor="#5b8ed4" stopOpacity="0.7" />
          </linearGradient>
          <linearGradient id="fp-shine1" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.18" />
            <stop offset="50%" stopColor="#ffffff" stopOpacity="0.06" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="fp-shine2" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.18" />
            <stop offset="50%" stopColor="#ffffff" stopOpacity="0.06" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="fp-shine3" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.22" />
            <stop offset="50%" stopColor="#ffffff" stopOpacity="0.06" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Baseline rule */}
        <line x1="40" y1="242" x2="500" y2="242" stroke="#9DC8FF" strokeOpacity="0.35" strokeWidth="1" />

        {/* Pillar 1 — Early Foundation, shortest */}
        <rect x="58" y="162" width="112" height="80" fill="url(#fp-g1)" />
        <rect x="58" y="162" width="112" height="80" fill="url(#fp-shine1)" />

        {/* Pillar 2 — Strong Fundamentals, medium */}
        <rect x="214" y="96" width="112" height="146" fill="url(#fp-g2)" />
        <rect x="214" y="96" width="112" height="146" fill="url(#fp-shine2)" />

        {/* Pillar 3 — Future Readiness, tallest */}
        <rect x="370" y="18" width="112" height="224" fill="url(#fp-g3)" />
        <rect x="370" y="18" width="112" height="224" fill="url(#fp-shine3)" />

        {/* Connecting bridges — diagonal fills linking each pillar's top to the next */}
        <polygon points="170,162 214,96 214,162 170,162" fill="url(#fp-g2)" fillOpacity="0.38" />
        <polygon points="326,96 370,18 370,96 326,96" fill="url(#fp-g3)" fillOpacity="0.35" />

        {/* Top accent marks */}
        <line x1="58" y1="162" x2="170" y2="162" stroke="#8cb8f0" strokeWidth="1.5" strokeOpacity="0.7" />
        <line x1="214" y1="96" x2="326" y2="96" stroke="#4880d8" strokeWidth="1.5" strokeOpacity="0.75" />
        <line x1="370" y1="18" x2="482" y2="18" stroke="#1a4fa8" strokeWidth="2" />

        {/* Step edge lines on bridges */}
        <line x1="170" y1="162" x2="214" y2="96" stroke="#6aa0e8" strokeWidth="1" strokeOpacity="0.45" />
        <line x1="326" y1="96" x2="370" y2="18" stroke="#3565c0" strokeWidth="1" strokeOpacity="0.45" />

        {/* Ordinal labels inside pillars */}
        <text x="114" y="225" textAnchor="middle" fontSize="13" fontFamily={DM_SANS} fontWeight="600" fill="#0d1f3c" fillOpacity="0.72" letterSpacing="0.04em">
          6–7
        </text>
        <text x="270" y="225" textAnchor="middle" fontSize="13" fontFamily={DM_SANS} fontWeight="600" fill="#ffffff" fillOpacity="0.88" letterSpacing="0.04em">
          8–9
        </text>
        <text x="426" y="225" textAnchor="middle" fontSize="13" fontFamily={DM_SANS} fontWeight="600" fill="#ffffff" fillOpacity="0.92" letterSpacing="0.04em">
          10
        </text>
      </svg>

      {/* Phase labels below pillars */}
      <div className="mt-4 grid grid-cols-3 gap-0">
        {[
          { label: "Early Foundation", color: "#5878a0" },
          { label: "Strong Fundamentals", color: "#2358c0" },
          { label: "Future Readiness", color: "#0d1f3c" },
        ].map(({ label, color }) => (
          <div
            key={label}
            className="text-center uppercase leading-[1.4]"
            style={{ fontFamily: DM_SANS, fontSize: "11px", fontWeight: 600, letterSpacing: "0.09em", color }}
          >
            {label}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function FoundationProgramHero() {
  const [hovering, setHovering] = useState(false);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setCursor({ x: event.clientX - rect.left, y: event.clientY - rect.top });
  };

  const mask = `radial-gradient(circle at ${cursor.x}px ${cursor.y}px, #000 72px, transparent 120px)`;

  const dotsHover: CSSProperties = {
    position: "absolute",
    inset: 0,
    backgroundImage: "radial-gradient(circle at center, rgba(157, 200, 255, 0.52) 2.16px, transparent 2.36px)",
    backgroundPosition: "center",
    backgroundSize: "18px 18px",
    opacity: hovering ? 1 : 0,
    maskImage: mask,
    WebkitMaskImage: mask,
    transition: "opacity 0.15s ease",
    pointerEvents: "none",
  };

  return (
    <div
      className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden"
      style={{ backgroundColor: "#f8fbff" }}
      onPointerEnter={() => setHovering(true)}
      onPointerMove={handlePointerMove}
      onPointerLeave={() => setHovering(false)}
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: "radial-gradient(circle at center, rgba(157, 200, 255, 0.52) 1.2px, transparent 1.4px)",
          backgroundPosition: "center",
          backgroundSize: "18px 18px",
        }}
      />
      <div className="pointer-events-none absolute inset-0" style={dotsHover} />

      {/* Hero content */}
      <div className="relative z-[1] flex w-full max-w-[720px] flex-col items-center gap-0 px-10 py-20">
        {/* Academy name — breadcrumb */}
        <p
          className="mb-10 uppercase"
          style={{ fontFamily: DM_SANS, fontSize: "11px", fontWeight: 600, letterSpacing: "0.14em", color: "#8fa3bb" }}
        >
          Vishweshwarayya NEET · JEE Academy
        </p>

        {/* Program category label */}
        <div
          className="mb-8 inline-block rounded-sm uppercase"
          style={{
            fontFamily: DM_SANS,
            fontSize: "11px",
            fontWeight: 600,
            letterSpacing: "0.18em",
            color: "#1d4fa8",
            background: "rgba(157, 200, 255, 0.2)",
            border: "1px solid rgba(157, 200, 255, 0.5)",
            padding: "5px 12px",
          }}
        >
          Foundation Program
        </div>

        {/* Classes label */}
        <p
          className="mb-5 uppercase"
          style={{ fontFamily: DM_SANS, fontSize: "13px", fontWeight: 500, letterSpacing: "0.12em", color: "#4a5f7a" }}
        >
          Classes 6 – 10
        </p>

        {/* Main heading */}
        <h1
          className="mb-14 max-w-[560px] text-center"
          style={{
            fontFamily: FRAUNCES,
            fontOpticalSizing: "auto",
            fontSize: "clamp(36px, 6vw, 64px)",
            fontWeight: 300,
            fontStyle: "italic",
            lineHeight: 1.12,
            letterSpacing: "-0.01em",
            color: "#0d1f3c",
          }}
        >
          Build strong foundations
          <br />
          <span style={{ fontStyle: "normal", fontWeight: 400 }}>for the future.</span>
        </h1>

        {/* The pillars visual */}
        <div className="mb-4 w-full">
          <PillarsVisual />
        </div>

        {/* Thin rule */}
        <div className="mx-auto mt-12 h-px w-10" style={{ background: "rgba(157, 200, 255, 0.5)" }} />
      </div>
    </div>
  );
}
