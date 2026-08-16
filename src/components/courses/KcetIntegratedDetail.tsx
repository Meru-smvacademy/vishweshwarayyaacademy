import type { ReactNode } from "react";
import Link from "next/link";
import { PRIMARY_CTA_HREF, PRIMARY_CTA_LABEL } from "@/config/nav";

const NAVY = "#060C18";
const NAVY_MID = "#0D1627";
const KCET = "#2DD4A0";
const CREAM = "#F4F1EB";
const MUTED = "#6B7E9E";
const SOFT = "#A8B8CC";

const FRAUNCES = "var(--font-fraunces), Georgia, serif";
const DM_SANS = "var(--font-dm-sans), sans-serif";

function Tag({ children }: { children: ReactNode }) {
  return (
    <span
      className="inline-block rounded-[2px] border uppercase"
      style={{
        fontFamily: DM_SANS,
        fontSize: "10px",
        fontWeight: 600,
        letterSpacing: "0.14em",
        color: KCET,
        borderColor: "rgba(45,212,160,0.3)",
        padding: "3px 8px",
      }}
    >
      {children}
    </span>
  );
}

function Rule() {
  return <div className="h-px w-full" style={{ background: "rgba(255,255,255,0.07)" }} />;
}

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <p
      className="mb-6 uppercase"
      style={{ fontFamily: DM_SANS, fontSize: "10px", fontWeight: 600, letterSpacing: "0.16em", color: MUTED, margin: "0 0 24px 0" }}
    >
      {children}
    </p>
  );
}

// ─── Hero ───

function Hero() {
  return (
    <section
      className="relative flex min-h-screen flex-col justify-end overflow-hidden"
      style={{ padding: "clamp(32px, 5vw, 64px)", paddingBottom: "clamp(48px, 7vw, 88px)", background: NAVY }}
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />
      <div
        className="pointer-events-none absolute -bottom-[120px] -left-20 h-[500px] w-[500px]"
        style={{ background: "radial-gradient(circle, rgba(45,212,160,0.1) 0%, transparent 70%)" }}
      />

      <div className="relative z-[1] max-w-[1200px]">
        <div className="mb-10 flex items-stretch gap-0 sm:mb-16" style={{ maxWidth: "640px" }}>
          <div className="flex-1 border border-r-0 p-5" style={{ background: "rgba(255,255,255,0.04)", borderColor: "rgba(255,255,255,0.08)" }}>
            <div className="mb-2 uppercase" style={{ fontFamily: DM_SANS, fontSize: "9px", fontWeight: 600, letterSpacing: "0.14em", color: MUTED }}>
              Academic
            </div>
            <div style={{ fontFamily: FRAUNCES, fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 400, color: CREAM, lineHeight: 1 }}>PUC</div>
            <div className="mt-2.5 flex flex-col gap-[3px]">
              {["Physics", "Chemistry", "Mathematics"].map((s) => (
                <span key={s} style={{ fontFamily: DM_SANS, fontSize: "11px", color: MUTED }}>
                  {s}
                </span>
              ))}
            </div>
          </div>

          <div className="flex w-10 flex-shrink-0 items-center justify-center" style={{ background: KCET }}>
            <span
              className="rotate-180"
              style={{ fontFamily: FRAUNCES, fontSize: "18px", color: NAVY, fontWeight: 700, writingMode: "vertical-rl", textOrientation: "mixed", letterSpacing: "0.04em" }}
            >
              ∫
            </span>
          </div>

          <div className="flex-1 border border-l-0 p-5" style={{ background: "rgba(45,212,160,0.06)", borderColor: "rgba(45,212,160,0.2)" }}>
            <div className="mb-2 uppercase" style={{ fontFamily: DM_SANS, fontSize: "9px", fontWeight: 600, letterSpacing: "0.14em", color: KCET }}>
              Examination
            </div>
            <div style={{ fontFamily: FRAUNCES, fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 400, color: KCET, lineHeight: 1 }}>KCET</div>
            <div className="mt-2.5 flex flex-col gap-[3px]">
              {["Conceptual depth", "Problem solving", "Exam strategy"].map((s) => (
                <span key={s} style={{ fontFamily: DM_SANS, fontSize: "11px", color: "rgba(45,212,160,0.7)" }}>
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>

        <h1
          className="mb-6"
          style={{ fontFamily: FRAUNCES, fontSize: "clamp(42px, 7vw, 96px)", fontWeight: 300, color: CREAM, lineHeight: 0.95, letterSpacing: "-0.02em" }}
        >
          One Academic
          <br />
          <em style={{ fontStyle: "italic", color: KCET }}>System.</em>
        </h1>

        <div className="flex flex-wrap items-end justify-between gap-6">
          <p style={{ fontFamily: DM_SANS, fontSize: "clamp(14px, 1.5vw, 18px)", fontWeight: 300, color: SOFT, margin: 0, maxWidth: "420px", lineHeight: 1.5 }}>
            Board preparation and KCET readiness — built into one integrated academic programme.
          </p>

          <div className="flex gap-8">
            {[
              { label: "Programme", value: "Integrated" },
              { label: "Board", value: "PUC" },
              { label: "Target", value: "KCET" },
            ].map((item) => (
              <div key={item.label}>
                <div className="mb-1 uppercase" style={{ fontFamily: DM_SANS, fontSize: "9px", fontWeight: 600, letterSpacing: "0.14em", color: MUTED }}>
                  {item.label}
                </div>
                <div style={{ fontFamily: FRAUNCES, fontSize: "18px", fontWeight: 400, color: CREAM }}>{item.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Suitable for ───

function SuitableFor() {
  return (
    <section
      className="grid items-center gap-12"
      style={{ padding: "clamp(48px, 6vw, 80px) clamp(32px, 5vw, 64px)", background: NAVY_MID, gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))" }}
    >
      <div>
        <SectionLabel>Suitable For</SectionLabel>
        <p style={{ fontFamily: FRAUNCES, fontSize: "clamp(22px, 3vw, 34px)", fontWeight: 400, color: CREAM, lineHeight: 1.25, margin: 0 }}>
          PUC students preparing for KCET alongside their academic curriculum.
        </p>
      </div>

      <div className="border-l pl-12" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
        <div className="mb-3 uppercase" style={{ fontFamily: DM_SANS, fontSize: "10px", fontWeight: 600, letterSpacing: "0.14em", color: MUTED }}>
          Examination Target
        </div>
        <div style={{ fontFamily: FRAUNCES, fontSize: "clamp(36px, 5vw, 64px)", fontWeight: 400, color: KCET, lineHeight: 1 }}>KCET</div>
        <div className="mt-1.5" style={{ fontFamily: DM_SANS, fontSize: "12px", color: MUTED }}>
          Karnataka Common Entrance Test
        </div>
      </div>
    </section>
  );
}

// ─── What students build ───

const OUTCOMES = [
  {
    index: "01",
    title: "Conceptual Clarity",
    subjects: "Physics · Chemistry · Mathematics",
    desc: "Foundations built for both board examinations and KCET requirements.",
  },
  {
    index: "02",
    title: "Exam Preparation",
    subjects: "KCET-focused practice · Question solving",
    desc: "Structured exposure to KCET patterns, paper types, and problem formats.",
  },
  {
    index: "03",
    title: "Speed & Accuracy",
    subjects: "Timed practice · Examination strategy",
    desc: "Deliberate drills to build the pace and precision KCET demands.",
  },
  {
    index: "04",
    title: "Academic Confidence",
    subjects: "Regular assessment · Mentoring",
    desc: "Continuous feedback and faculty guidance through the programme.",
  },
];

function OutcomeRow({ item }: { item: (typeof OUTCOMES)[number] }) {
  return (
    <div
      className="group grid items-center gap-6 border-b transition-colors hover:bg-[rgba(45,212,160,0.03)]"
      style={{ gridTemplateColumns: "64px 1fr 1fr", padding: "28px 0", borderColor: "rgba(255,255,255,0.06)" }}
    >
      <span
        className="text-[#6B7E9E] transition-colors group-hover:text-[#2DD4A0]"
        style={{ fontFamily: DM_SANS, fontSize: "11px", fontWeight: 500, letterSpacing: "0.06em" }}
      >
        {item.index}
      </span>
      <div>
        <div className="mb-1" style={{ fontFamily: FRAUNCES, fontSize: "clamp(16px, 2vw, 22px)", fontWeight: 400, color: CREAM }}>
          {item.title}
        </div>
        <div style={{ fontFamily: DM_SANS, fontSize: "12px", color: KCET }}>{item.subjects}</div>
      </div>
      <div style={{ fontFamily: DM_SANS, fontSize: "13px", color: MUTED, lineHeight: 1.5 }}>{item.desc}</div>
    </div>
  );
}

function WhatStudentsBuild() {
  return (
    <section style={{ padding: "clamp(64px, 8vw, 104px) clamp(32px, 5vw, 64px)", background: NAVY }}>
      <Rule />
      <div className="mb-14 mt-10 flex flex-wrap items-baseline justify-between gap-4">
        <SectionLabel>What Students Build</SectionLabel>
        <h2 style={{ fontFamily: FRAUNCES, fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 300, color: CREAM, margin: 0, letterSpacing: "-0.02em", lineHeight: 1.1 }}>
          Programme Outcomes
        </h2>
      </div>

      <div className="flex flex-col">
        {OUTCOMES.map((item) => (
          <OutcomeRow key={item.index} item={item} />
        ))}
      </div>
    </section>
  );
}

// ─── Preparation system ───

const PREP_STEPS = ["Learn", "Practice", "Test", "Analyse", "Improve"];
const PREP_SUPPORT = ["Daily Practice", "Topic-wise Assignments", "Regular Tests", "KCET Mock Tests", "Revision", "Doubt Solving", "Faculty Guidance"];

function PreparationSystem() {
  return (
    <section style={{ padding: "clamp(64px, 8vw, 104px) clamp(32px, 5vw, 64px)", background: NAVY_MID }}>
      <SectionLabel>The Preparation System</SectionLabel>

      <div className="mb-12 flex items-stretch overflow-x-auto pb-1">
        {PREP_STEPS.map((step, i) => (
          <div key={step} className="flex flex-1 items-stretch" style={{ minWidth: "100px" }}>
            <div
              className="flex flex-1 flex-col justify-between gap-6 border"
              style={{
                padding: "clamp(20px, 3vw, 32px) clamp(16px, 2vw, 24px)",
                background: i === 0 ? KCET : i === 4 ? "rgba(45,212,160,0.12)" : "rgba(255,255,255,0.03)",
                borderColor: i === 0 ? KCET : i === 4 ? "rgba(45,212,160,0.3)" : "rgba(255,255,255,0.07)",
              }}
            >
              <span className="uppercase" style={{ fontFamily: DM_SANS, fontSize: "10px", fontWeight: 600, letterSpacing: "0.12em", color: i === 0 ? NAVY : MUTED }}>
                0{i + 1}
              </span>
              <span
                style={{
                  fontFamily: FRAUNCES,
                  fontSize: "clamp(18px, 2.5vw, 28px)",
                  fontWeight: i === 0 ? 600 : 400,
                  color: i === 0 ? NAVY : i === 4 ? KCET : CREAM,
                  lineHeight: 1,
                }}
              >
                {step}
              </span>
            </div>
            {i < PREP_STEPS.length - 1 && (
              <div className="flex w-6 flex-shrink-0 items-center justify-center text-xs" style={{ color: MUTED }}>
                →
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-2">
        {PREP_SUPPORT.map((item) => (
          <span
            key={item}
            className="rounded-[2px] border"
            style={{ fontFamily: DM_SANS, fontSize: "12px", color: SOFT, background: "rgba(255,255,255,0.04)", borderColor: "rgba(255,255,255,0.07)", padding: "5px 12px" }}
          >
            {item}
          </span>
        ))}
      </div>
    </section>
  );
}

// ─── KRIT ───

const KRIT_FEATURES = [
  { label: "Learn", detail: "Digital resources · Study material" },
  { label: "Practice", detail: "Assignments · Practice resources" },
  { label: "Test", detail: "CBT · Mock examinations" },
  { label: "Analyse", detail: "Subject + chapter performance" },
  { label: "Track", detail: "Progress · Reports · Improvement" },
];

function Krit() {
  return (
    <section style={{ padding: "clamp(64px, 8vw, 104px) clamp(32px, 5vw, 64px)", background: NAVY }}>
      <Rule />
      <div className="mt-14 grid gap-16" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}>
        <div>
          <div
            className="mb-5"
            style={{ fontFamily: FRAUNCES, fontSize: "clamp(52px, 8vw, 96px)", fontWeight: 300, color: KCET, lineHeight: 0.9, letterSpacing: "-0.02em" }}
          >
            KRIT
          </div>
          <p style={{ fontFamily: DM_SANS, fontSize: "14px", color: MUTED, lineHeight: 1.6, margin: 0, maxWidth: "320px" }}>
            KRIT keeps learning, assessment and progress connected — one integrated platform supporting the full
            programme.
          </p>
        </div>

        <div className="flex flex-col">
          {KRIT_FEATURES.map((f, i) => (
            <div
              key={f.label}
              className="grid items-center gap-4"
              style={{ gridTemplateColumns: "80px 1fr", padding: "16px 0", borderBottom: i < KRIT_FEATURES.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none" }}
            >
              <span className="uppercase" style={{ fontFamily: DM_SANS, fontSize: "10px", fontWeight: 600, letterSpacing: "0.12em", color: KCET }}>
                {f.label}
              </span>
              <span style={{ fontFamily: DM_SANS, fontSize: "13px", color: SOFT }}>{f.detail}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Assessment ───

const ASSESS_LOOP = ["Assess", "Identify", "Review", "Improve"];
const ASSESS_TOOLS = ["Chapter Tests", "Unit Tests", "CBT", "KCET Mock Tests", "Performance Analytics", "Faculty Review", "Progress Updates"];

function Assessment() {
  return (
    <section style={{ padding: "clamp(64px, 8vw, 104px) clamp(32px, 5vw, 64px)", background: NAVY_MID }}>
      <SectionLabel>Assessment</SectionLabel>

      <div className="mb-12 flex flex-wrap items-center">
        {ASSESS_LOOP.map((step, i) => (
          <div key={step} className="flex items-center">
            <div
              className="border"
              style={{
                padding: "clamp(12px, 2vw, 20px) clamp(20px, 3vw, 36px)",
                background: i === 0 ? "rgba(45,212,160,0.15)" : i === 3 ? KCET : "rgba(255,255,255,0.03)",
                borderColor: i === 3 ? KCET : i === 0 ? "rgba(45,212,160,0.3)" : "rgba(255,255,255,0.07)",
              }}
            >
              <span style={{ fontFamily: FRAUNCES, fontSize: "clamp(16px, 2vw, 24px)", fontWeight: i === 3 ? 600 : 400, color: i === 3 ? NAVY : i === 0 ? KCET : CREAM }}>
                {step}
              </span>
            </div>
            {i < ASSESS_LOOP.length - 1 && (
              <div className="px-2 text-sm" style={{ color: MUTED }}>
                →
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-2">
        {ASSESS_TOOLS.map((t) => (
          <span
            key={t}
            className="rounded-[2px] border"
            style={{ fontFamily: DM_SANS, fontSize: "12px", color: SOFT, background: "rgba(255,255,255,0.04)", borderColor: "rgba(255,255,255,0.07)", padding: "5px 12px" }}
          >
            {t}
          </span>
        ))}
      </div>
    </section>
  );
}

// ─── Admission CTA ───
// The approved design's inline form has no backend — the site already has a
// validated Admission Enquiry flow, so the CTA routes there instead of
// reproducing a non-functional local-only form.

function AdmissionCTA() {
  return (
    <section className="relative overflow-hidden" style={{ padding: "clamp(64px, 8vw, 104px) clamp(32px, 5vw, 64px)", background: NAVY }}>
      <div
        className="pointer-events-none absolute -right-[100px] -top-[100px] h-[400px] w-[400px]"
        style={{ background: "radial-gradient(circle, rgba(45,212,160,0.08) 0%, transparent 70%)" }}
      />

      <Rule />

      <div className="mt-14 grid items-start gap-16" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}>
        <div>
          <Tag>KCET Integrated Program</Tag>
          <h2 className="my-5" style={{ fontFamily: FRAUNCES, fontSize: "clamp(32px, 5vw, 56px)", fontWeight: 300, color: CREAM, lineHeight: 1.05, letterSpacing: "-0.02em" }}>
            Admission
            <br />
            <em style={{ fontStyle: "italic", color: KCET }}>Enquiry</em>
          </h2>
          <p style={{ fontFamily: DM_SANS, fontSize: "13px", color: MUTED, lineHeight: 1.6, margin: 0 }}>
            Speak with the academic team about the KCET Integrated Program — eligibility, schedule, and next steps.
          </p>
        </div>

        <div>
          <Link
            href={PRIMARY_CTA_HREF}
            className="block w-full bg-[#2DD4A0] text-center uppercase transition-colors hover:bg-[#25C090]"
            style={{
              color: NAVY,
              padding: "16px 32px",
              fontFamily: DM_SANS,
              fontSize: "13px",
              fontWeight: 600,
              letterSpacing: "0.1em",
            }}
          >
            {PRIMARY_CTA_LABEL}
          </Link>
        </div>
      </div>

      <div className="mt-20">
        <Rule />
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
          <span style={{ fontFamily: DM_SANS, fontSize: "11px", color: MUTED }}>Vishweshwarayya NEET | JEE Academy</span>
          <span style={{ fontFamily: DM_SANS, fontSize: "11px", color: KCET }}>KCET Integrated Program</span>
        </div>
      </div>
    </section>
  );
}

export default function KcetIntegratedDetail() {
  return (
    <div style={{ background: NAVY, minHeight: "100vh" }}>
      <Hero />
      <SuitableFor />
      <WhatStudentsBuild />
      <PreparationSystem />
      <Krit />
      <Assessment />
      <AdmissionCTA />
    </div>
  );
}
