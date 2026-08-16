"use client";

import { useState } from "react";

const DISPLAY = "var(--font-playfair-display), Georgia, serif";
const SANS = "var(--font-dm-sans), system-ui, sans-serif";
const MONO = "var(--font-dm-mono), monospace";

const NAVY_950 = "#060e1a";
const IVORY = "#f4eed8";
const GOLD = "#c6882a";

const PRINCIPLES = [
  {
    num: "01",
    title: "DISCIPLINE",
    desc: "Daily routines and structured academic planning instilled as foundational habits.",
  },
  {
    num: "02",
    title: "EXPERT FACULTY",
    desc: "Experienced mentors who build lasting concept clarity, not just exam technique.",
  },
  {
    num: "03",
    title: "SMART LEARNING",
    desc: "KRITPrep Platform with adaptive CBT practice tailored to every student's level.",
  },
  {
    num: "04",
    title: "PROVEN RESULTS",
    desc: "A consistent record of NEET, JEE & KCET selections tracked year upon year.",
  },
];

function PrincipleRow({
  num,
  title,
  desc,
  isLast,
}: {
  num: string;
  title: string;
  desc: string;
  isLast: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div>
      <div
        style={{ position: "relative", padding: "1.5rem 0", cursor: "default", transition: "opacity 0.2s" }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            left: "-1.5rem",
            top: "50%",
            transform: "translateY(-50%)",
            width: "6px",
            height: "1px",
            background: GOLD,
            opacity: hovered ? 1 : 0,
            transition: "opacity 0.2s",
          }}
        />

        <div style={{ display: "flex", gap: "1.25rem", alignItems: "flex-start" }}>
          <span
            style={{
              fontFamily: MONO,
              fontSize: "0.58rem",
              letterSpacing: "0.1em",
              color: hovered ? GOLD : "rgba(198,136,42,0.5)",
              fontWeight: 400,
              marginTop: "0.15rem",
              flexShrink: 0,
              transition: "color 0.2s",
              userSelect: "none",
            }}
          >
            {num}
          </span>

          <div>
            <p
              style={{
                fontFamily: SANS,
                fontSize: "0.7rem",
                letterSpacing: "0.24em",
                fontWeight: 600,
                color: hovered ? IVORY : "rgba(244,238,216,0.8)",
                margin: "0 0 0.4rem 0",
                transition: "color 0.2s",
              }}
            >
              {title}
            </p>
            <p style={{ fontFamily: SANS, fontSize: "0.8rem", lineHeight: 1.72, color: "rgba(176,194,215,0.65)", margin: 0, fontWeight: 300 }}>
              {desc}
            </p>
          </div>
        </div>
      </div>

      {!isLast && <div style={{ height: "1px", background: "rgba(255,255,255,0.07)" }} />}
    </div>
  );
}

function BlueprintGrid() {
  return (
    <div aria-hidden="true" style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0 }}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(100,140,200,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(100,140,200,0.03) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(100,140,200,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(100,140,200,0.015) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      />
      <svg width="64" height="64" viewBox="0 0 64 64" style={{ position: "absolute", top: "2rem", right: "2rem", opacity: 0.12 }}>
        <path d="M64 8 L64 0 L56 0" stroke={GOLD} strokeWidth="0.8" fill="none" />
        <path d="M0 56 L0 64 L8 64" stroke={GOLD} strokeWidth="0.8" fill="none" />
        <line x1="16" y1="0" x2="16" y2="4" stroke="rgba(100,160,255,0.6)" strokeWidth="0.6" />
        <line x1="32" y1="0" x2="32" y2="6" stroke="rgba(100,160,255,0.6)" strokeWidth="0.6" />
        <line x1="48" y1="0" x2="48" y2="4" stroke="rgba(100,160,255,0.6)" strokeWidth="0.6" />
      </svg>
    </div>
  );
}

export default function WhyChooseUs() {
  return (
    <div style={{ backgroundColor: NAVY_950, position: "relative", overflow: "hidden" }}>
      <BlueprintGrid />

      <section
        className="mx-auto"
        style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: "1160px", padding: "6rem 2rem" }}
      >
        {/* Eyebrow */}
        <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "3.5rem" }}>
          <div style={{ width: "22px", height: "1px", background: GOLD }} />
          <span
            style={{
              fontFamily: MONO,
              fontSize: "0.58rem",
              letterSpacing: "0.3em",
              color: "rgba(198,136,42,0.85)",
              fontWeight: 400,
              textTransform: "uppercase",
            }}
          >
            Why Vishweshwarayya
          </span>
          <div
            style={{
              flex: 1,
              height: "1px",
              background: "linear-gradient(to right, rgba(255,255,255,0.1), transparent)",
              maxWidth: "300px",
            }}
          />
        </div>

        {/* Two-column editorial grid */}
        <div className="why-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "start" }}>
          {/* LEFT — headline + body */}
          <div>
            <h1
              style={{
                fontFamily: DISPLAY,
                fontSize: "clamp(2.8rem, 5.5vw, 4.6rem)",
                fontWeight: 800,
                lineHeight: 1.05,
                color: IVORY,
                margin: 0,
                letterSpacing: "-0.02em",
              }}
            >
              Building
              <br />
              Discipline.
            </h1>

            <h2
              style={{
                fontFamily: DISPLAY,
                fontSize: "clamp(1.9rem, 3.5vw, 2.9rem)",
                fontWeight: 400,
                fontStyle: "italic",
                lineHeight: 1.15,
                color: "rgba(240,233,214,0.65)",
                margin: "0.3em 0 0 0",
                letterSpacing: "-0.015em",
              }}
            >
              Creating <span style={{ color: GOLD }}>Achievers.</span>
            </h2>

            <div style={{ width: "36px", height: "1px", background: "rgba(198,136,42,0.55)", margin: "2rem 0" }} />

            <p
              style={{
                fontFamily: SANS,
                fontSize: "0.88rem",
                lineHeight: 1.85,
                color: "rgba(180,197,218,0.75)",
                fontWeight: 300,
                margin: "0 0 2.75rem 0",
                maxWidth: "400px",
              }}
            >
              At Sir M Vishweshwarayya NEET | JEE Academy, we combine experienced faculty,
              structured learning, modern technology, and personalised mentoring to help every
              student achieve academic excellence.
            </p>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1.25rem",
                paddingTop: "1.5rem",
                borderTop: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              {["NEET", "JEE", "KCET"].map((label, i) => (
                <div key={label} style={{ display: "flex", alignItems: "center", gap: "1.25rem" }}>
                  <span style={{ fontFamily: MONO, fontSize: "0.6rem", letterSpacing: "0.22em", color: "rgba(240,233,214,0.55)", fontWeight: 400 }}>
                    {label}
                  </span>
                  {i < 2 && <div style={{ width: "1px", height: "10px", background: "rgba(255,255,255,0.15)" }} />}
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — academic framework editorial panel */}
          <div style={{ paddingLeft: "0.5rem" }}>
            <div
              style={{
                paddingBottom: "1rem",
                borderBottom: "1px solid rgba(255,255,255,0.12)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "baseline",
              }}
            >
              <span style={{ fontFamily: MONO, fontSize: "0.55rem", letterSpacing: "0.26em", color: "rgba(255,255,255,0.35)", fontWeight: 400 }}>
                ACADEMIC FRAMEWORK
              </span>
              <span style={{ fontFamily: MONO, fontSize: "0.55rem", letterSpacing: "0.16em", color: "rgba(198,136,42,0.6)" }}>
                04 PRINCIPLES
              </span>
            </div>

            <div style={{ height: "2px", width: "28px", background: GOLD, marginBottom: "0.1rem", marginTop: "-1px" }} />

            <div style={{ paddingLeft: "1.5rem" }}>
              {PRINCIPLES.map((p, i) => (
                <PrincipleRow key={p.num} num={p.num} title={p.title} desc={p.desc} isLast={i === PRINCIPLES.length - 1} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 860px) {
          .why-grid {
            grid-template-columns: 1fr !important;
            gap: 3rem !important;
          }
        }
      `}</style>
    </div>
  );
}
