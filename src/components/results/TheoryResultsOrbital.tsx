"use client";

import { useState } from "react";

export type TheoryOrbitalYear = {
  year: string;
  pass: string;
  passed: number;
  dist: number;
};

const NAVY = "#0D1B3E";
const IVORY = "#F5F0E8";
const GOLD = "#C9A84C";
const GOLD_MED = "rgba(201,168,76,0.45)";
const GOLD_DIM = "rgba(201,168,76,0.22)";
const GOLD_FAINT = "rgba(201,168,76,0.08)";
const IVORY_MID = "rgba(245,240,232,0.6)";
const IVORY_LOW = "rgba(245,240,232,0.38)";
const IVORY_SUB = "rgba(245,240,232,0.14)";

const DISPLAY = "var(--font-playfair-display), Georgia, serif";
const SANS = "var(--font-inter), sans-serif";

const SIZE = 640;
const CX = SIZE / 2;
const CY = SIZE / 2;
const ORBIT_R = 232;
const INNER_R = 96;
const CARD_W = 96;

function polar(angleDeg: number, r: number) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return { x: CX + r * Math.cos(rad), y: CY + r * Math.sin(rad) };
}

export default function TheoryResultsOrbital({ data }: { data: TheoryOrbitalYear[] }) {
  const [hovered, setHovered] = useState<number | null>(null);
  const n = data.length;
  const nodeAngle = (i: number) => (i * 360) / n;

  return (
    <section
      style={{
        background: NAVY,
        color: IVORY,
        fontFamily: SANS,
        padding: "84px 24px 76px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <header style={{ textAlign: "center", marginBottom: 64, maxWidth: 520 }}>
        <p style={{ letterSpacing: "0.32em", fontSize: 9.5, color: GOLD, marginBottom: 16, fontWeight: 500 }}>
          II PUC · THEORY RESULTS
        </p>
        <h2
          style={{
            fontFamily: DISPLAY,
            fontSize: "clamp(24px, 4vw, 44px)",
            fontWeight: 700,
            letterSpacing: "0.06em",
            color: IVORY,
            lineHeight: 1.1,
            margin: "0 0 20px",
          }}
        >
          {n} YEARS OF ACADEMIC RESULTS
        </h2>
        <div style={{ width: 36, height: 1, background: GOLD_DIM, margin: "0 auto 20px" }} />
        <p style={{ fontSize: 13.5, color: IVORY_MID, letterSpacing: "0.07em", fontWeight: 300 }}>
          A glimpse of our II PUC Theory Results, year after year.
        </p>
      </header>

      {/* Desktop / Tablet Orbital */}
      <div className="hidden md:flex" style={{ justifyContent: "center", width: "100%" }}>
        <div style={{ position: "relative", width: SIZE, height: SIZE, flexShrink: 0 }}>
          <svg width={SIZE} height={SIZE} style={{ position: "absolute", inset: 0 }} aria-hidden="true">
            <defs>
              <radialGradient id="theory-cglow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="rgba(201,168,76,0.13)" />
                <stop offset="55%" stopColor="rgba(201,168,76,0.04)" />
                <stop offset="100%" stopColor="rgba(201,168,76,0)" />
              </radialGradient>
              <radialGradient id="theory-vign" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="rgba(13,27,62,0)" />
                <stop offset="100%" stopColor="rgba(5,12,30,0.28)" />
              </radialGradient>
            </defs>

            <circle cx={CX} cy={CY} r={INNER_R * 2.6} fill="url(#theory-cglow)" />
            <circle cx={CX} cy={CY} r={ORBIT_R + 40} fill="url(#theory-vign)" />
            <circle cx={CX} cy={CY} r={ORBIT_R} fill="none" stroke={GOLD_DIM} strokeWidth={0.75} />
            <circle cx={CX} cy={CY} r={INNER_R} fill="none" stroke={GOLD_MED} strokeWidth={0.75} />
            <circle cx={CX} cy={CY} r={INNER_R - 4} fill={GOLD_FAINT} />

            {data.map((_, i) => {
              const angle = nodeAngle(i);
              const spoke1 = polar(angle, INNER_R + 6);
              const spoke2 = polar(angle, ORBIT_R - 14);
              const tick = polar(angle, ORBIT_R);
              const active = hovered === i;

              return (
                <g key={i}>
                  <line
                    x1={spoke1.x}
                    y1={spoke1.y}
                    x2={spoke2.x}
                    y2={spoke2.y}
                    stroke={active ? "rgba(201,168,76,0.5)" : "rgba(201,168,76,0.12)"}
                    strokeWidth={active ? 1 : 0.7}
                    style={{ transition: "stroke 0.35s ease, stroke-width 0.35s ease" }}
                  />
                  <circle
                    cx={tick.x}
                    cy={tick.y}
                    r={active ? 3.5 : 2}
                    fill={active ? GOLD : "rgba(201,168,76,0.4)"}
                    style={{ transition: "r 0.35s ease, fill 0.35s ease" }}
                  />
                </g>
              );
            })}
          </svg>

          <div
            style={{
              position: "absolute",
              left: CX,
              top: CY,
              transform: "translate(-50%, -50%)",
              textAlign: "center",
              width: (INNER_R - 12) * 2,
              pointerEvents: "none",
              userSelect: "none",
            }}
          >
            <p style={{ fontSize: 7.5, letterSpacing: "0.32em", color: GOLD, fontWeight: 600, margin: 0 }}>THEORY</p>
            <p style={{ fontFamily: DISPLAY, fontSize: 13, fontWeight: 700, color: IVORY, letterSpacing: "0.14em", margin: "4px 0 10px" }}>
              RESULTS
            </p>
            <div style={{ width: 22, height: 1, background: GOLD_DIM, margin: "0 auto 10px" }} />
            <p style={{ fontSize: 8, letterSpacing: "0.1em", color: IVORY_MID, lineHeight: 1.8, margin: 0 }}>
              {data[n - 1]?.year}
              <br />
              <span style={{ fontSize: 6.5, color: IVORY_LOW }}>TO</span>
              <br />
              {data[0]?.year}
            </p>
            <div style={{ width: 22, height: 1, background: GOLD_DIM, margin: "10px auto 8px" }} />
            <p style={{ fontFamily: DISPLAY, fontSize: 26, fontWeight: 700, color: GOLD, lineHeight: 1, margin: 0 }}>{n}</p>
            <p style={{ fontSize: 7, letterSpacing: "0.28em", color: IVORY_LOW, margin: "3px 0 0" }}>YEARS</p>
          </div>

          {data.map((d, i) => {
            const angle = nodeAngle(i);
            const pos = polar(angle, ORBIT_R);
            const active = hovered === i;

            return (
              <div
                key={d.year}
                style={{
                  position: "absolute",
                  left: pos.x,
                  top: pos.y,
                  transform: "translate(-50%, -50%)",
                  zIndex: active ? 20 : 1,
                  cursor: "default",
                  width: CARD_W,
                }}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
              >
                <div
                  style={{
                    background: active ? "rgba(8,17,45,0.97)" : "rgba(13,27,62,0.85)",
                    border: `1px solid ${active ? "rgba(201,168,76,0.72)" : GOLD_DIM}`,
                    borderRadius: 5,
                    padding: "9px 10px 8px",
                    textAlign: "center",
                    backdropFilter: "blur(12px)",
                    WebkitBackdropFilter: "blur(12px)",
                    boxShadow: active ? "0 0 28px rgba(201,168,76,0.14), 0 4px 20px rgba(0,0,0,0.5)" : "0 2px 8px rgba(0,0,0,0.3)",
                    transition: "border-color 0.32s ease, box-shadow 0.32s ease, background 0.32s ease",
                  }}
                >
                  <p
                    style={{
                      fontSize: 7.5,
                      letterSpacing: "0.17em",
                      color: active ? GOLD : "rgba(201,168,76,0.75)",
                      fontWeight: 600,
                      margin: "0 0 6px",
                      transition: "color 0.32s ease",
                    }}
                  >
                    {d.year}
                  </p>

                  <p
                    style={{
                      fontFamily: DISPLAY,
                      fontSize: 18,
                      fontWeight: 700,
                      color: active ? IVORY : "rgba(245,240,232,0.88)",
                      lineHeight: 1,
                      letterSpacing: "-0.01em",
                      margin: 0,
                      transition: "color 0.32s ease",
                    }}
                  >
                    {d.pass}%
                  </p>
                  <p style={{ fontSize: 6.5, color: IVORY_LOW, letterSpacing: "0.18em", margin: "2px 0 7px" }}>PASS</p>

                  <div
                    style={{
                      height: 1,
                      background: active ? "rgba(201,168,76,0.2)" : "rgba(201,168,76,0.1)",
                      marginBottom: 7,
                      transition: "background 0.32s ease",
                    }}
                  />

                  <div style={{ display: "flex", justifyContent: "center", gap: 7 }}>
                    <div style={{ textAlign: "center" }}>
                      <p
                        style={{
                          fontSize: 11,
                          fontWeight: 600,
                          color: active ? IVORY : IVORY_MID,
                          lineHeight: 1,
                          margin: 0,
                          transition: "color 0.32s ease",
                        }}
                      >
                        {d.passed}
                      </p>
                      <p style={{ fontSize: 6, color: IVORY_LOW, letterSpacing: "0.1em", margin: "2px 0 0" }}>PASSED</p>
                    </div>
                    <div style={{ width: 1, background: IVORY_SUB, flexShrink: 0 }} />
                    <div style={{ textAlign: "center" }}>
                      <p
                        style={{
                          fontSize: 11,
                          fontWeight: 600,
                          color: active ? GOLD : "rgba(201,168,76,0.7)",
                          lineHeight: 1,
                          margin: 0,
                          transition: "color 0.32s ease",
                        }}
                      >
                        {d.dist}
                      </p>
                      <p style={{ fontSize: 6, color: IVORY_LOW, letterSpacing: "0.1em", margin: "2px 0 0" }}>DIST.</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile: responsive grid */}
      <div className="flex md:hidden" style={{ flexDirection: "column", width: "100%", maxWidth: 400 }}>
        <p style={{ textAlign: "center", fontSize: 8.5, letterSpacing: "0.24em", color: GOLD, marginBottom: 28, fontWeight: 500 }}>
          YEAR · BY · YEAR
        </p>

        {data.map((d) => (
          <div
            key={d.year}
            style={{
              display: "grid",
              gridTemplateColumns: "72px 1fr auto",
              alignItems: "center",
              gap: 16,
              padding: "15px 4px",
              borderBottom: "1px solid rgba(201,168,76,0.1)",
            }}
          >
            <p style={{ fontSize: 9, letterSpacing: "0.12em", color: GOLD, fontWeight: 600, margin: 0, lineHeight: 1.4 }}>{d.year}</p>

            <div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
                <span style={{ fontFamily: DISPLAY, fontSize: 22, fontWeight: 700, color: IVORY, lineHeight: 1 }}>{d.pass}%</span>
                <span style={{ fontSize: 8.5, letterSpacing: "0.14em", color: IVORY_LOW }}>PASS</span>
              </div>
            </div>

            <div style={{ textAlign: "right" }}>
              <p style={{ fontSize: 12, fontWeight: 600, color: IVORY_MID, margin: 0, lineHeight: 1.3 }}>
                {d.passed}
                <span style={{ fontSize: 7.5, color: IVORY_LOW, letterSpacing: "0.1em", marginLeft: 3 }}>PSS</span>
              </p>
              <p style={{ fontSize: 12, fontWeight: 600, color: GOLD, margin: "3px 0 0", lineHeight: 1.3 }}>
                {d.dist}
                <span style={{ fontSize: 7.5, color: "rgba(201,168,76,0.55)", letterSpacing: "0.1em", marginLeft: 3 }}>DST</span>
              </p>
            </div>
          </div>
        ))}
      </div>

      <div style={{ textAlign: "center", marginTop: 68, maxWidth: 460 }}>
        <OrnamentRule />
        <p
          style={{
            fontFamily: DISPLAY,
            fontStyle: "italic",
            fontSize: 14,
            letterSpacing: "0.05em",
            color: IVORY_MID,
            lineHeight: 1.75,
            margin: "22px 0",
          }}
        >
          &ldquo;{n} academic years. One continuous pursuit of excellence.&rdquo;
        </p>
        <OrnamentRule />
      </div>
    </section>
  );
}

function OrnamentRule() {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}>
      <div style={{ flex: 1, height: 1, background: GOLD_FAINT }} />
      <div style={{ width: 4, height: 4, borderRadius: "50%", background: GOLD_DIM }} />
      <div style={{ flex: 1, height: 1, background: GOLD_FAINT }} />
    </div>
  );
}
