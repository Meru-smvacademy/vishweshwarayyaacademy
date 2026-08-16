"use client";

import { useState } from "react";
import Link from "next/link";
import { PRIMARY_CTA_HREF } from "@/config/nav";

const PAPER = "#F4F1EB";
const INK = "#111009";
const NAVY = "#0E1B2E";
const EMBER = "#B8521E";
const EMBER_LIGHT = "#D4693A";
const MUTED = "#7A7268";
const RULE = "#D8D3C8";
const CREAM = "#FAF8F3";
const ASSESSMENT_BG = "#1A1410";

const FRAUNCES = "var(--font-fraunces), Georgia, serif";
const INTER = "var(--font-inter), system-ui, sans-serif";
const DM_MONO = "var(--font-dm-mono), monospace";

const CYCLE = ["LEARN", "PRACTICE", "REVISE", "TEST", "ANALYSE", "IMPROVE"];

const BUILDS = [
  {
    label: "01",
    title: "Conceptual Clarity",
    subjects: "Physics · Chemistry · Biology",
    detail: "Deep understanding built from first principles across all three core subjects.",
  },
  {
    label: "02",
    title: "Intensive Practice",
    subjects: "Problem Solving · Revision",
    detail: "High-volume, structured practice that turns concepts into examination fluency.",
  },
  {
    label: "03",
    title: "Exam Readiness",
    subjects: "Speed · Accuracy · Temperament",
    detail: "Timed drills and full-length simulations build composure under pressure.",
  },
  {
    label: "04",
    title: "Personal Guidance",
    subjects: "Mentoring · Doubt Solving",
    detail: "One-on-one faculty access and academic support through the preparation year.",
  },
];

const KRIT_ROWS = [
  { mode: "LEARN", items: "Digital resources · Recorded lectures · Study material" },
  { mode: "TEST", items: "CBT · NEET simulations · Instant results" },
  { mode: "ANALYSE", items: "Subject + chapter performance breakdown" },
  { mode: "TRACK", items: "Progress reports · Improvement mapping" },
];

const TESTS = ["Daily Practice", "Chapter Tests", "Revision Tests", "CBT", "NEET Mock Tests", "Faculty Review"];

export default function NeetLongTermDetail() {
  const [activeCycle, setActiveCycle] = useState(0);

  return (
    <div style={{ fontFamily: INTER }} className="bg-[#F4F1EB] text-[#111009]">
      {/* Hero */}
      <section
        style={{ background: NAVY, minHeight: "100vh" }}
        className="relative flex flex-col justify-end overflow-hidden px-8 pb-16 pt-32 md:px-20 md:pb-24"
      >
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage: "linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px)",
            backgroundSize: "80px 100%",
          }}
        />

        <div className="mb-8 md:mb-12">
          <div style={{ fontFamily: DM_MONO, fontSize: "0.7rem", letterSpacing: "0.22em", color: EMBER_LIGHT }}>
            VISHWESHWARAYYA ACADEMY / NEET LONG-TERM PROGRAM
          </div>
        </div>

        <div className="max-w-5xl">
          <h1
            style={{
              fontFamily: FRAUNCES,
              fontSize: "clamp(3rem, 8vw, 7.5rem)",
              fontWeight: 300,
              lineHeight: 0.9,
              color: PAPER,
              letterSpacing: "-0.02em",
            }}
          >
            NEET
            <br />
            <span style={{ fontStyle: "italic", fontWeight: 400 }}>Long-Term</span>
            <br />
            Program
          </h1>

          <div className="mt-8 flex flex-col gap-6 md:flex-row md:items-end md:gap-16">
            <div>
              <div
                style={{
                  fontFamily: DM_MONO,
                  fontSize: "0.72rem",
                  letterSpacing: "0.18em",
                  color: "rgba(244,241,235,0.45)",
                  marginBottom: "0.4rem",
                }}
              >
                FOR
              </div>
              <div style={{ fontFamily: INTER, fontSize: "0.95rem", fontWeight: 500, color: PAPER, letterSpacing: "0.01em" }}>
                12th Passed Students &amp; Repeaters
              </div>
            </div>
            <div>
              <div
                style={{
                  fontFamily: DM_MONO,
                  fontSize: "0.72rem",
                  letterSpacing: "0.18em",
                  color: "rgba(244,241,235,0.45)",
                  marginBottom: "0.4rem",
                }}
              >
                TARGET
              </div>
              <div style={{ fontFamily: INTER, fontSize: "0.95rem", fontWeight: 500, color: EMBER_LIGHT, letterSpacing: "0.01em" }}>
                NEET UG
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-10 md:mt-20 md:flex-row md:items-start md:gap-0">
          <div className="md:flex-1">
            <p
              style={{
                fontFamily: FRAUNCES,
                fontSize: "clamp(1.5rem, 3vw, 2.4rem)",
                fontWeight: 300,
                fontStyle: "italic",
                color: PAPER,
                lineHeight: 1.15,
                maxWidth: "32ch",
                opacity: 0.85,
              }}
            >
              Focused preparation.
              <br />
              One goal: NEET UG.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-0 md:flex-nowrap md:flex-col md:items-start">
            {CYCLE.map((step, i) => (
              <div key={step} className="flex items-center gap-3 md:items-start">
                <button
                  type="button"
                  onMouseEnter={() => setActiveCycle(i)}
                  style={{
                    fontFamily: DM_MONO,
                    fontSize: "0.78rem",
                    letterSpacing: "0.18em",
                    color: activeCycle === i ? EMBER_LIGHT : "rgba(244,241,235,0.35)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: "0.2rem 0",
                    transition: "color 0.2s",
                    fontWeight: activeCycle === i ? 500 : 400,
                  }}
                >
                  {step}
                </button>
                {i < CYCLE.length - 1 && (
                  <>
                    <span
                      className="hidden md:block"
                      style={{
                        width: "1px",
                        height: "16px",
                        background: "rgba(244,241,235,0.12)",
                        margin: "2px 0 2px 2.5rem",
                      }}
                    />
                    <span
                      className="md:hidden"
                      style={{ fontFamily: DM_MONO, fontSize: "0.65rem", color: "rgba(244,241,235,0.18)", padding: "0 0.25rem" }}
                    >
                      →
                    </span>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 md:mt-16" style={{ height: "1px", background: "rgba(244,241,235,0.1)" }} />
        <div className="mt-4 flex items-center justify-between">
          <span style={{ fontFamily: DM_MONO, fontSize: "0.65rem", letterSpacing: "0.15em", color: "rgba(244,241,235,0.3)" }}>
            DEDICATED · INTENSIVE · STRUCTURED
          </span>
          <span style={{ fontFamily: DM_MONO, fontSize: "0.65rem", letterSpacing: "0.12em", color: "rgba(244,241,235,0.25)" }}>
            2026–27
          </span>
        </div>
      </section>

      {/* Who it's for */}
      <section style={{ background: EMBER, padding: "3rem 0" }}>
        <div className="flex flex-col gap-8 px-8 md:flex-row md:items-center md:gap-24 md:px-20">
          <div>
            <div style={{ fontFamily: DM_MONO, fontSize: "0.65rem", letterSpacing: "0.22em", color: "rgba(244,241,235,0.6)", marginBottom: "0.5rem" }}>
              SUITABLE FOR
            </div>
            <div style={{ fontFamily: FRAUNCES, fontSize: "clamp(1.4rem, 3vw, 2rem)", fontWeight: 400, color: PAPER, lineHeight: 1.1 }}>
              12th Passed Students
              <br />
              &amp; Repeaters
            </div>
          </div>
          <div
            className="hidden md:block"
            style={{ width: "1px", background: "rgba(244,241,235,0.25)", height: "60px", flexShrink: 0 }}
          />
          <div>
            <div style={{ fontFamily: DM_MONO, fontSize: "0.65rem", letterSpacing: "0.22em", color: "rgba(244,241,235,0.6)", marginBottom: "0.5rem" }}>
              EXAMINATION TARGET
            </div>
            <div style={{ fontFamily: FRAUNCES, fontSize: "clamp(1.8rem, 4vw, 3rem)", fontWeight: 600, color: PAPER, letterSpacing: "-0.01em" }}>
              NEET UG
            </div>
          </div>
          <div style={{ marginLeft: "auto", maxWidth: "28ch" }}>
            <p style={{ fontFamily: INTER, fontSize: "0.88rem", lineHeight: 1.6, color: "rgba(244,241,235,0.8)", fontWeight: 300 }}>
              Designed for students who have completed Class 12 and are committing a full year to NEET preparation.
            </p>
          </div>
        </div>
      </section>

      {/* What the program builds */}
      <section className="px-8 py-24 md:px-20 md:py-32" style={{ background: CREAM }}>
        <div className="mb-14">
          <div style={{ fontFamily: DM_MONO, fontSize: "0.65rem", letterSpacing: "0.22em", color: MUTED, marginBottom: "0.75rem" }}>
            WHAT THE PROGRAM BUILDS
          </div>
          <h2
            style={{
              fontFamily: FRAUNCES,
              fontSize: "clamp(2rem, 4vw, 3.5rem)",
              fontWeight: 300,
              lineHeight: 1.05,
              maxWidth: "18ch",
              letterSpacing: "-0.02em",
            }}
          >
            Four pillars.
            <br />
            <span style={{ fontStyle: "italic" }}>One outcome.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-0 md:grid-cols-2" style={{ borderTop: `1px solid ${RULE}` }}>
          {BUILDS.map((b, i) => (
            <div
              key={b.label}
              className="py-10 pr-0 md:pr-12"
              style={{
                borderBottom: `1px solid ${RULE}`,
                borderRight: i % 2 === 0 ? `1px solid ${RULE}` : "none",
                paddingLeft: i % 2 === 1 ? "3rem" : 0,
              }}
            >
              <div className="flex items-start gap-6">
                <span style={{ fontFamily: DM_MONO, fontSize: "0.7rem", color: EMBER, letterSpacing: "0.12em", marginTop: "0.35rem", flexShrink: 0 }}>
                  {b.label}
                </span>
                <div>
                  <div style={{ fontFamily: FRAUNCES, fontSize: "1.35rem", fontWeight: 500, letterSpacing: "-0.01em", marginBottom: "0.25rem" }}>
                    {b.title}
                  </div>
                  <div style={{ fontFamily: DM_MONO, fontSize: "0.68rem", letterSpacing: "0.1em", color: EMBER, marginBottom: "0.75rem" }}>
                    {b.subjects}
                  </div>
                  <p style={{ fontFamily: INTER, fontSize: "0.875rem", lineHeight: 1.65, color: MUTED, fontWeight: 300, maxWidth: "36ch" }}>
                    {b.detail}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* The preparation system */}
      <section style={{ background: NAVY }} className="px-8 py-24 md:px-20 md:py-32">
        <div className="mb-14">
          <div style={{ fontFamily: DM_MONO, fontSize: "0.65rem", letterSpacing: "0.22em", color: "rgba(244,241,235,0.4)", marginBottom: "0.75rem" }}>
            THE PREPARATION SYSTEM
          </div>
          <h2
            style={{
              fontFamily: FRAUNCES,
              fontSize: "clamp(2rem, 4vw, 3.5rem)",
              fontWeight: 300,
              color: PAPER,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
            }}
          >
            A continuous loop
            <br />
            <span style={{ fontStyle: "italic", color: EMBER_LIGHT }}>built for improvement.</span>
          </h2>
        </div>

        <div className="flex flex-col gap-16 md:flex-row md:gap-24">
          <div className="flex flex-col" style={{ minWidth: "200px" }}>
            {CYCLE.map((step, i) => (
              <div key={step} className="flex flex-col items-start">
                <div
                  style={{
                    fontFamily: FRAUNCES,
                    fontSize: "1.5rem",
                    fontWeight: i === 5 ? 600 : 300,
                    color: i === 5 ? EMBER_LIGHT : PAPER,
                    fontStyle: i === 5 ? "italic" : "normal",
                    letterSpacing: "-0.01em",
                    padding: "0.6rem 0",
                  }}
                >
                  {step}
                </div>
                {i < CYCLE.length - 1 && (
                  <div style={{ width: "1px", height: "24px", background: "rgba(244,241,235,0.15)", marginLeft: "0.75rem" }} />
                )}
              </div>
            ))}
          </div>

          <div className="flex max-w-md flex-1 flex-col justify-between gap-4">
            <p
              style={{
                fontFamily: INTER,
                fontSize: "0.9rem",
                lineHeight: 1.7,
                color: "rgba(244,241,235,0.6)",
                fontWeight: 300,
                borderLeft: `2px solid ${EMBER}`,
                paddingLeft: "1.25rem",
              }}
            >
              Every session feeds into the next. Learning without testing creates gaps; testing without analysis creates
              anxiety. This system closes both loops.
            </p>

            <div className="mt-4">
              <div style={{ fontFamily: DM_MONO, fontSize: "0.62rem", letterSpacing: "0.2em", color: "rgba(244,241,235,0.3)", marginBottom: "1rem" }}>
                ASSESSMENT TYPES
              </div>
              <div className="flex flex-wrap gap-2">
                {TESTS.map((t) => (
                  <span
                    key={t}
                    style={{
                      fontFamily: DM_MONO,
                      fontSize: "0.65rem",
                      letterSpacing: "0.1em",
                      color: "rgba(244,241,235,0.65)",
                      border: "1px solid rgba(244,241,235,0.12)",
                      padding: "0.3rem 0.75rem",
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* KRIT */}
      <section className="px-8 py-24 md:px-20 md:py-32" style={{ background: PAPER }}>
        <div className="flex flex-col gap-12 md:flex-row md:gap-24">
          <div className="flex-shrink-0 md:w-80">
            <div style={{ fontFamily: DM_MONO, fontSize: "0.65rem", letterSpacing: "0.22em", color: MUTED, marginBottom: "0.75rem" }}>
              INTEGRATED PLATFORM
            </div>
            <h2
              style={{
                fontFamily: FRAUNCES,
                fontSize: "clamp(2.5rem, 5vw, 4rem)",
                fontWeight: 300,
                letterSpacing: "-0.02em",
                lineHeight: 0.95,
                marginBottom: "1.5rem",
              }}
            >
              KRIT
            </h2>
            <p style={{ fontFamily: INTER, fontSize: "0.875rem", lineHeight: 1.7, color: MUTED, fontWeight: 300, maxWidth: "28ch" }}>
              KRIT keeps preparation, assessment and progress connected — one platform through the entire preparation
              year.
            </p>
          </div>

          <div className="flex-1" style={{ borderTop: `1px solid ${RULE}` }}>
            {KRIT_ROWS.map((row) => (
              <div key={row.mode} className="flex items-start gap-8 py-6" style={{ borderBottom: `1px solid ${RULE}` }}>
                <div
                  style={{
                    fontFamily: DM_MONO,
                    fontSize: "0.72rem",
                    letterSpacing: "0.18em",
                    color: EMBER,
                    minWidth: "70px",
                    fontWeight: 500,
                    marginTop: "0.1rem",
                  }}
                >
                  {row.mode}
                </div>
                <div style={{ fontFamily: INTER, fontSize: "0.9rem", color: INK, lineHeight: 1.5, fontWeight: 300 }}>
                  {row.items}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Assessment */}
      <section style={{ background: ASSESSMENT_BG }} className="px-8 py-24 md:px-20 md:py-32">
        <div className="mb-14">
          <div style={{ fontFamily: DM_MONO, fontSize: "0.65rem", letterSpacing: "0.22em", color: "rgba(244,241,235,0.35)", marginBottom: "0.75rem" }}>
            ASSESSMENT DESIGN
          </div>
          <h2
            style={{
              fontFamily: FRAUNCES,
              fontSize: "clamp(2rem, 4vw, 3.5rem)",
              fontWeight: 300,
              color: PAPER,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
            }}
          >
            Not just tests.
            <br />
            <span style={{ fontStyle: "italic", color: EMBER_LIGHT }}>Continuous improvement.</span>
          </h2>
        </div>

        <div className="mb-16 flex flex-wrap items-center gap-0">
          {["ASSESS", "IDENTIFY", "REVIEW", "IMPROVE"].map((step, i, arr) => (
            <div key={step} className="flex items-center gap-0">
              <div
                style={{
                  fontFamily: FRAUNCES,
                  fontSize: "clamp(1.2rem, 2.5vw, 2rem)",
                  fontWeight: i === 3 ? 500 : 300,
                  color: i === 3 ? EMBER_LIGHT : PAPER,
                  fontStyle: i === 3 ? "italic" : "normal",
                  padding: "0.75rem 0",
                }}
              >
                {step}
              </div>
              {i < arr.length - 1 && (
                <div style={{ margin: "0 1.5rem", color: "rgba(244,241,235,0.2)", fontFamily: DM_MONO, fontSize: "1rem" }}>
                  →
                </div>
              )}
            </div>
          ))}
          <div style={{ marginLeft: "1.5rem", fontFamily: DM_MONO, fontSize: "0.8rem", color: EMBER, letterSpacing: "0.1em" }}>
            ↺
          </div>
        </div>

        <div style={{ borderTop: "1px solid rgba(244,241,235,0.08)" }}>
          <div className="grid grid-cols-2 md:grid-cols-3" style={{ borderBottom: "1px solid rgba(244,241,235,0.08)" }}>
            {TESTS.map((t, i) => (
              <div
                key={t}
                style={{
                  fontFamily: INTER,
                  fontSize: "0.85rem",
                  color: "rgba(244,241,235,0.55)",
                  fontWeight: 300,
                  padding: "1rem 0",
                  borderRight: (i + 1) % 3 !== 0 ? "1px solid rgba(244,241,235,0.08)" : "none",
                  paddingLeft: i % 3 !== 0 ? "1.5rem" : 0,
                }}
              >
                {t}
              </div>
            ))}
          </div>
          <div className="mt-6">
            <div style={{ fontFamily: DM_MONO, fontSize: "0.72rem", letterSpacing: "0.14em", color: "rgba(244,241,235,0.35)" }}>
              + Performance Analytics
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: EMBER }} className="px-8 py-20 md:px-20 md:py-28">
        <div className="max-w-4xl">
          <div style={{ fontFamily: DM_MONO, fontSize: "0.65rem", letterSpacing: "0.22em", color: "rgba(244,241,235,0.55)", marginBottom: "1.5rem" }}>
            2026 ADMISSIONS
          </div>
          <h2
            style={{
              fontFamily: FRAUNCES,
              fontSize: "clamp(2.5rem, 6vw, 5.5rem)",
              fontWeight: 300,
              color: PAPER,
              lineHeight: 0.95,
              letterSpacing: "-0.02em",
              marginBottom: "2.5rem",
            }}
          >
            Ready to prepare
            <br />
            <span style={{ fontStyle: "italic" }}>with focus?</span>
          </h2>
          <Link
            href={PRIMARY_CTA_HREF}
            className="inline-block transition-opacity duration-200 ease-out hover:opacity-85"
            style={{
              fontFamily: DM_MONO,
              fontSize: "0.78rem",
              letterSpacing: "0.2em",
              color: EMBER,
              background: PAPER,
              padding: "1rem 2.5rem",
            }}
          >
            ADMISSION ENQUIRY
          </Link>
        </div>
      </section>

      {/* Footer rule */}
      <div style={{ background: NAVY, padding: "2rem 0" }}>
        <div className="flex flex-col justify-between gap-4 px-8 md:flex-row md:px-20">
          <span style={{ fontFamily: FRAUNCES, fontSize: "0.9rem", color: "rgba(244,241,235,0.5)", fontWeight: 300 }}>
            Vishweshwarayya NEET | JEE Academy
          </span>
          <span style={{ fontFamily: DM_MONO, fontSize: "0.65rem", letterSpacing: "0.14em", color: "rgba(244,241,235,0.25)" }}>
            NEET LONG-TERM PROGRAM · 12TH PASSED &amp; REPEATERS
          </span>
        </div>
      </div>
    </div>
  );
}
