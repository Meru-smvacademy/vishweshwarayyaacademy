"use client";

import { useState } from "react";

const INK = "#0C1B2E";
const INK_DEEP = "#081320";
const CREAM = "#EBE6DA";
const CREAM_MUTED = "#A8A099";
const GOLD = "#B8924A";
const GOLD_LIGHT = "#D4A85E";
const BORDER = "rgba(235, 230, 218, 0.10)";
const BORDER_STRONG = "rgba(235, 230, 218, 0.18)";

const DISPLAY = "var(--font-playfair-display), serif";
const BODY = "var(--font-inter), sans-serif";

const PATHWAYS = [
  { stream: "NEET", variant: "Achievement" },
  { stream: "NEET", variant: "Long-Term" },
  { stream: "JEE", variant: "Achievement" },
  { stream: "JEE", variant: "Long-Term" },
] as const;

const STEPS = [
  {
    n: "01",
    title: "Register",
    body: "Register for the SNT Scholarship Examination.",
  },
  {
    n: "02",
    title: "Appear",
    body: "Write the scholarship examination.",
  },
  {
    n: "03",
    title: "Merit Selection",
    body: "Meritorious students are selected based on examination performance.",
  },
  {
    n: "04",
    title: "Scholarship & Admission",
    body: "Selected students receive scholarship support and proceed with admission to the applicable program.",
  },
] as const;

export default function SntScholarshipExaminationSection() {
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);
  const [hoveredPathway, setHoveredPathway] = useState<number | null>(null);

  return (
    <section style={{ background: INK, color: CREAM, fontFamily: BODY }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 48px" }}>
        {/* Header */}
        <div
          className="snt-exam-header"
          style={{
            paddingTop: "96px",
            paddingBottom: "72px",
            borderBottom: `1px solid ${BORDER}`,
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "48px",
            alignItems: "end",
          }}
        >
          <div>
            <p
              style={{
                fontSize: "11px",
                letterSpacing: "0.16em",
                color: GOLD,
                fontWeight: 500,
                textTransform: "uppercase",
                marginBottom: "28px",
              }}
            >
              Vishweshwarayya Academy
            </p>
            <h1
              style={{
                fontFamily: DISPLAY,
                fontSize: "clamp(38px, 5vw, 60px)",
                fontWeight: 400,
                lineHeight: 1.08,
                letterSpacing: "-0.01em",
                color: CREAM,
                margin: 0,
              }}
            >
              SNT Scholarship
              <br />
              <em style={{ fontStyle: "italic", color: GOLD_LIGHT }}>Examination</em>
            </h1>
          </div>

          <div style={{ paddingBottom: "6px" }}>
            <p
              style={{
                fontSize: "13px",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: CREAM_MUTED,
                fontWeight: 500,
                marginBottom: "20px",
              }}
            >
              Class 10 &amp; Class 12 Passed Students
            </p>
            <p
              style={{
                fontSize: "17px",
                lineHeight: 1.65,
                color: CREAM,
                opacity: 0.72,
                fontWeight: 300,
                margin: 0,
                maxWidth: "400px",
              }}
            >
              A merit-based opportunity for students preparing for competitive
              examinations through Vishweshwarayya Academy.
            </p>
          </div>
        </div>

        {/* Pathways */}
        <div style={{ paddingTop: "64px", paddingBottom: "64px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              justifyContent: "space-between",
              marginBottom: "36px",
            }}
          >
            <p
              style={{
                fontSize: "11px",
                letterSpacing: "0.16em",
                color: CREAM_MUTED,
                fontWeight: 500,
                textTransform: "uppercase",
                margin: 0,
              }}
            >
              Scholarship Pathways
            </p>
            <div style={{ height: "1px", flex: 1, margin: "0 24px", background: BORDER }} />
            <p
              style={{
                fontSize: "11px",
                letterSpacing: "0.16em",
                color: BORDER_STRONG,
                fontWeight: 400,
                margin: 0,
              }}
            >
              Four streams
            </p>
          </div>

          <div
            className="snt-exam-pathways-grid"
            style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", border: `1px solid ${BORDER_STRONG}` }}
          >
            {PATHWAYS.map((p, i) => (
              <button
                key={i}
                type="button"
                onMouseEnter={() => setHoveredPathway(i)}
                onMouseLeave={() => setHoveredPathway(null)}
                style={{
                  background: hoveredPathway === i ? "rgba(184, 146, 74, 0.07)" : "transparent",
                  border: "none",
                  borderLeft: i === 0 ? "none" : `1px solid ${BORDER_STRONG}`,
                  padding: "36px 32px",
                  textAlign: "left",
                  cursor: "default",
                  transition: "background 0.25s ease",
                  display: "block",
                  width: "100%",
                }}
              >
                <span
                  style={{
                    display: "inline-block",
                    fontSize: "10px",
                    letterSpacing: "0.18em",
                    fontWeight: 600,
                    textTransform: "uppercase",
                    color: p.stream === "NEET" ? "#6EB5A0" : "#7BA3CC",
                    background: p.stream === "NEET" ? "rgba(110, 181, 160, 0.12)" : "rgba(123, 163, 204, 0.12)",
                    padding: "4px 10px",
                    marginBottom: "20px",
                  }}
                >
                  {p.stream}
                </span>
                <p
                  style={{
                    fontFamily: DISPLAY,
                    fontSize: "22px",
                    fontWeight: 500,
                    color: hoveredPathway === i ? GOLD_LIGHT : CREAM,
                    margin: 0,
                    lineHeight: 1.25,
                    transition: "color 0.25s ease",
                  }}
                >
                  {p.variant}
                </p>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div style={{ background: INK_DEEP, borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}` }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 48px" }}>
          <div
            style={{
              padding: "52px 0 48px",
              borderBottom: `1px solid ${BORDER}`,
              display: "flex",
              alignItems: "center",
              gap: "20px",
            }}
          >
            <p
              style={{
                fontSize: "11px",
                letterSpacing: "0.16em",
                color: CREAM_MUTED,
                fontWeight: 500,
                textTransform: "uppercase",
                margin: 0,
              }}
            >
              How It Works
            </p>
            <div style={{ height: "1px", flex: 1, background: BORDER }} />
            <p
              style={{
                fontFamily: DISPLAY,
                fontSize: "13px",
                fontStyle: "italic",
                color: GOLD,
                margin: 0,
                opacity: 0.8,
              }}
            >
              Examination → Merit → Opportunity
            </p>
          </div>

          <div
            className="snt-exam-steps-grid"
            style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", borderBottom: `1px solid ${BORDER}` }}
          >
            {STEPS.map((step, i) => (
              <div
                key={i}
                onMouseEnter={() => setHoveredStep(i)}
                onMouseLeave={() => setHoveredStep(null)}
                style={{
                  borderLeft: i === 0 ? "none" : `1px solid ${BORDER}`,
                  padding: "44px 36px 44px",
                  position: "relative",
                  overflow: "hidden",
                  transition: "background 0.3s ease",
                  background: hoveredStep === i ? "rgba(184, 146, 74, 0.04)" : "transparent",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: "-10px",
                    right: "20px",
                    fontFamily: DISPLAY,
                    fontSize: "120px",
                    fontWeight: 700,
                    lineHeight: 1,
                    color: hoveredStep === i ? "rgba(184, 146, 74, 0.12)" : "rgba(235, 230, 218, 0.04)",
                    userSelect: "none",
                    pointerEvents: "none",
                    transition: "color 0.3s ease",
                  }}
                >
                  {step.n}
                </div>

                <p
                  style={{
                    fontSize: "11px",
                    letterSpacing: "0.18em",
                    fontWeight: 600,
                    color: hoveredStep === i ? GOLD : CREAM_MUTED,
                    textTransform: "uppercase",
                    margin: "0 0 18px",
                    transition: "color 0.3s ease",
                  }}
                >
                  {step.n}
                </p>

                <h3
                  style={{
                    fontFamily: DISPLAY,
                    fontSize: "20px",
                    fontWeight: 500,
                    color: CREAM,
                    margin: "0 0 14px",
                    lineHeight: 1.2,
                  }}
                >
                  {step.title}
                </h3>

                {i < 3 && (
                  <div
                    style={{
                      position: "absolute",
                      right: "-1px",
                      top: "44px",
                      width: "7px",
                      height: "7px",
                      borderRadius: "50%",
                      background: GOLD,
                      opacity: 0.5,
                      zIndex: 2,
                    }}
                  />
                )}

                <p
                  style={{
                    fontSize: "14px",
                    lineHeight: 1.65,
                    color: CREAM,
                    opacity: 0.55,
                    margin: 0,
                    fontWeight: 300,
                  }}
                >
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer bar */}
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 48px" }}>
        <div style={{ padding: "32px 0", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <p style={{ fontSize: "12px", color: CREAM_MUTED, opacity: 0.6, margin: 0, letterSpacing: "0.04em" }}>
            Vishweshwarayya Academy — SNT Scholarship Programme
          </p>
          <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                style={{
                  width: i === 0 ? "20px" : "4px",
                  height: "4px",
                  borderRadius: "2px",
                  background: i === 0 ? GOLD : BORDER_STRONG,
                }}
              />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .snt-exam-header {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }
          .snt-exam-pathways-grid {
            grid-template-columns: 1fr 1fr !important;
          }
          .snt-exam-pathways-grid > button:nth-child(1),
          .snt-exam-pathways-grid > button:nth-child(2) {
            border-bottom: 1px solid ${BORDER_STRONG};
          }
          .snt-exam-pathways-grid > button:nth-child(odd) {
            border-left: none !important;
          }
          .snt-exam-steps-grid {
            grid-template-columns: 1fr 1fr !important;
          }
          .snt-exam-steps-grid > div:nth-child(1),
          .snt-exam-steps-grid > div:nth-child(2) {
            border-bottom: 1px solid ${BORDER};
          }
          .snt-exam-steps-grid > div:nth-child(odd) {
            border-left: none !important;
          }
        }
        @media (max-width: 560px) {
          .snt-exam-pathways-grid {
            grid-template-columns: 1fr !important;
          }
          .snt-exam-pathways-grid > button {
            border-left: none !important;
            border-top: 1px solid ${BORDER_STRONG};
          }
          .snt-exam-pathways-grid > button:first-child {
            border-top: none !important;
          }
          .snt-exam-steps-grid {
            grid-template-columns: 1fr !important;
          }
          .snt-exam-steps-grid > div {
            border-left: none !important;
            border-top: 1px solid ${BORDER};
          }
          .snt-exam-steps-grid > div:first-child {
            border-top: none !important;
          }
        }
      `}</style>
    </section>
  );
}
