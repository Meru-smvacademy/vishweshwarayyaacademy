"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import Link from "next/link";
import { PRIMARY_CTA_HREF } from "@/config/nav";
import { ArrowRightIcon } from "@/components/ui/icons";

const BACKGROUND = "#090c14";
const SURFACE = "#0d1120";
const FOREGROUND = "#eef0f6";
const MUTED = "#8892a4";
const ACCENT = "#e8a03c";
const ACCENT_DIM = "rgba(232, 160, 60, 0.12)";
const ACCENT_BLUE = "#4b7cf3";
const BORDER = "rgba(255,255,255,0.07)";
const BORDER_ACCENT = "rgba(232, 160, 60, 0.3)";

const FONT_SERIF = "var(--font-dm-serif-display), Georgia, serif";
const FONT_SANS = "var(--font-work-sans), system-ui, sans-serif";
const FONT_MONO = "var(--font-jetbrains-mono), monospace";

function MonoLabel({ children, accent = false, className = "" }: { children: ReactNode; accent?: boolean; className?: string }) {
  return (
    <span
      className={className}
      style={{
        fontFamily: FONT_MONO,
        fontSize: "0.68rem",
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        color: accent ? ACCENT : MUTED,
      }}
    >
      {children}
    </span>
  );
}

// ─── Hero — animated cycle canvas, ported as designed ───

function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animFrame: number;
    let t = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      const W = canvas.offsetWidth;
      const H = canvas.offsetHeight;
      ctx.clearRect(0, 0, W, H);

      ctx.strokeStyle = "rgba(75,124,243,0.06)";
      ctx.lineWidth = 0.5;
      const step = 44;
      for (let x = 0; x < W; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, H);
        ctx.stroke();
      }
      for (let y = 0; y < H; y += step) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(W, y);
        ctx.stroke();
      }

      const cx = W * 0.72;
      const cy = H * 0.5;
      const r = Math.min(W, H) * 0.28;

      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(255,255,255,0.04)";
      ctx.lineWidth = 1;
      ctx.stroke();

      const segments = [
        { label: "CONCEPT", color: "rgba(232,160,60,0.9)" },
        { label: "PRACTICE", color: "rgba(75,124,243,0.85)" },
        { label: "PROBLEM\nSOLVING", color: "rgba(232,160,60,0.6)" },
        { label: "TEST", color: "rgba(75,124,243,0.7)" },
        { label: "ANALYSE", color: "rgba(232,160,60,0.8)" },
        { label: "IMPROVE", color: "rgba(75,124,243,0.9)" },
      ];
      const gap = 0.05;
      const segAngle = (Math.PI * 2 - gap * segments.length) / segments.length;
      const rotation = -Math.PI / 2;

      segments.forEach((seg, i) => {
        const startAngle = rotation + i * (segAngle + gap) + t * 0.003;
        const endAngle = startAngle + segAngle;

        ctx.beginPath();
        ctx.arc(cx, cy, r, startAngle, endAngle);
        ctx.strokeStyle = seg.color;
        ctx.lineWidth = 2.5;
        ctx.lineCap = "round";
        ctx.stroke();

        const dotX = cx + r * Math.cos(endAngle);
        const dotY = cy + r * Math.sin(endAngle);
        ctx.beginPath();
        ctx.arc(dotX, dotY, 3, 0, Math.PI * 2);
        ctx.fillStyle = seg.color;
        ctx.fill();

        const labelR = r + 28;
        const midAngle = startAngle + segAngle / 2;
        const lx = cx + labelR * Math.cos(midAngle);
        const ly = cy + labelR * Math.sin(midAngle);
        ctx.font = `500 9px 'JetBrains Mono', monospace`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = seg.color;
        const lines = seg.label.split("\n");
        lines.forEach((line, li) => {
          ctx.fillText(line.toUpperCase(), lx, ly + (li - (lines.length - 1) / 2) * 12);
        });
      });

      ctx.strokeStyle = "rgba(255,255,255,0.12)";
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      ctx.moveTo(cx - 16, cy);
      ctx.lineTo(cx + 16, cy);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(cx, cy - 16);
      ctx.lineTo(cx, cy + 16);
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(cx, cy, 8, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(232,160,60,0.4)";
      ctx.lineWidth = 1;
      ctx.stroke();

      t++;
      animFrame = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animFrame);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className="relative hidden md:block" style={{ background: SURFACE }}>
      <canvas ref={canvasRef} style={{ width: "100%", height: "100%", display: "block" }} />
      <div className="pointer-events-none absolute left-[72%] top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
        <MonoLabel>The Cycle</MonoLabel>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section className="relative grid min-h-screen grid-cols-1 overflow-hidden md:grid-cols-2">
      <div
        className="relative z-[1] flex flex-col justify-center border-r"
        style={{
          padding: "clamp(48px, 8vw, 96px) clamp(32px, 5vw, 72px)",
          paddingRight: "clamp(32px, 4vw, 56px)",
          borderColor: BORDER,
        }}
      >
        <div className="mb-12 flex items-center gap-2.5">
          <div className="h-px w-6" style={{ background: ACCENT }} />
          <MonoLabel accent>Vishweshwarayya Academy</MonoLabel>
        </div>

        <div
          className="mb-8 inline-flex w-fit items-center gap-2 border px-3.5 py-1.5"
          style={{ background: ACCENT_DIM, borderColor: BORDER_ACCENT }}
        >
          <div className="h-[5px] w-[5px] rounded-full" style={{ background: ACCENT }} />
          <MonoLabel accent>JEE Long-Term Program</MonoLabel>
        </div>

        <h1
          className="mb-2"
          style={{ fontFamily: FONT_SERIF, fontSize: "clamp(2.8rem, 5.5vw, 5rem)", lineHeight: 1.06, letterSpacing: "-0.01em", color: FOREGROUND }}
        >
          Focused
        </h1>
        <h1
          className="mb-2"
          style={{ fontFamily: FONT_SERIF, fontStyle: "italic", fontSize: "clamp(2.8rem, 5.5vw, 5rem)", lineHeight: 1.06, letterSpacing: "-0.01em", color: ACCENT }}
        >
          Preparation.
        </h1>
        <h1
          className="mb-10"
          style={{ fontFamily: FONT_SERIF, fontSize: "clamp(2.8rem, 5.5vw, 5rem)", lineHeight: 1.06, letterSpacing: "-0.01em", color: FOREGROUND }}
        >
          One Goal: JEE.
        </h1>

        <p className="mb-12 max-w-[400px] font-light" style={{ fontSize: "1.05rem", lineHeight: 1.7, color: MUTED }}>
          A structured, intensive program built exclusively for 12th passed students and repeaters who are fully
          committed to clearing JEE.
        </p>

        <div className="flex items-center gap-4">
          <div className="h-10 w-px" style={{ background: BORDER_ACCENT }} />
          <div>
            <MonoLabel>Suitable for</MonoLabel>
            <div className="mt-1 text-[0.88rem] font-medium tracking-[0.02em]" style={{ color: FOREGROUND }}>
              12th Passed Students &amp; Repeaters
            </div>
          </div>
        </div>
      </div>

      <HeroCanvas />
    </section>
  );
}

// ─── Program builds ───

const PILLARS = [
  {
    num: "01",
    title: "Conceptual Clarity",
    subjects: "Physics · Chemistry · Mathematics",
    desc: "Foundation-level understanding built for depth, not memorisation.",
    color: ACCENT,
  },
  {
    num: "02",
    title: "Advanced Problem Solving",
    subjects: "Logic · Application · Analytical Thinking",
    desc: "Tackling JEE-level problems through systematic reasoning and pattern recognition.",
    color: ACCENT_BLUE,
  },
  {
    num: "03",
    title: "Exam Readiness",
    subjects: "Speed · Accuracy · Strategy",
    desc: "Calibrated for JEE conditions — timing, pressure, and decision-making.",
    color: ACCENT,
  },
  {
    num: "04",
    title: "Personal Guidance",
    subjects: "Mentoring · Doubt Solving · Academic Support",
    desc: "Continuous faculty access to keep every student on track.",
    color: ACCENT_BLUE,
  },
];

function ProgramBuilds() {
  return (
    <section style={{ padding: "clamp(64px, 10vw, 120px) clamp(32px, 5vw, 72px)" }}>
      <div className="mb-16 flex items-center gap-4">
        <MonoLabel>What the program builds</MonoLabel>
        <div className="h-px flex-1" style={{ background: BORDER }} />
      </div>

      <div className="grid grid-cols-1 gap-px md:grid-cols-2" style={{ background: BORDER }}>
        {PILLARS.map((p) => (
          <div
            key={p.num}
            className="flex flex-col gap-4 bg-[#0d1120] transition-colors hover:bg-[#131827]"
            style={{ padding: "clamp(28px, 3vw, 44px)" }}
          >
            <div className="flex items-start justify-between">
              <span style={{ fontFamily: FONT_MONO, fontSize: "0.65rem", letterSpacing: "0.15em", color: p.color }}>{p.num}</span>
              <div className="mt-2 h-px w-5" style={{ background: p.color }} />
            </div>
            <h3 style={{ fontFamily: FONT_SERIF, fontSize: "clamp(1.4rem, 2.2vw, 1.9rem)", lineHeight: 1.15, color: FOREGROUND, margin: 0 }}>
              {p.title}
            </h3>
            <div className="uppercase" style={{ fontFamily: FONT_MONO, fontSize: "0.65rem", letterSpacing: "0.1em", color: p.color }}>
              {p.subjects}
            </div>
            <p style={{ fontSize: "0.875rem", color: MUTED, lineHeight: 1.65, margin: 0 }}>{p.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── Preparation system — active phase is genuinely cross-element, kept as state ───

const LOOP_STEPS = [
  { label: "Learn", sub: "Concepts · Theory · Foundation" },
  { label: "Practice", sub: "Assignments · Chapter-wise Problems" },
  { label: "Revise", sub: "Intensive Revision · Consolidation" },
  { label: "Test", sub: "CBT · Full-Length JEE Mock Tests" },
  { label: "Analyse", sub: "Performance Review · Faculty Feedback" },
  { label: "Improve", sub: "Targeted Remediation · Doubt Solving" },
];

const LOOP_TAGS = [
  "Daily Practice",
  "Chapter-wise Practice",
  "Intensive Revision",
  "CBT",
  "Full-Length JEE Mocks",
  "Doubt Solving",
  "Faculty Review",
];

function PrepSystem() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setActive((a) => (a + 1) % LOOP_STEPS.length), 1800);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      className="border-y"
      style={{ padding: "clamp(64px, 10vw, 120px) clamp(32px, 5vw, 72px)", background: SURFACE, borderColor: BORDER }}
    >
      <div className="mb-16 flex items-center gap-4">
        <MonoLabel>The preparation system</MonoLabel>
        <div className="h-px flex-1" style={{ background: BORDER }} />
      </div>

      <div className="grid grid-cols-1 items-start gap-10 md:grid-cols-2 md:gap-20">
        <div className="flex flex-col">
          {LOOP_STEPS.map((step, i) => (
            <button
              type="button"
              key={step.label}
              onClick={() => setActive(i)}
              className="flex items-stretch text-left"
            >
              <div className="relative mr-6 w-0.5" style={{ background: i === active ? ACCENT : BORDER, transition: "background 0.3s" }}>
                <div
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
                  style={{
                    width: i === active ? "10px" : "6px",
                    height: i === active ? "10px" : "6px",
                    background: i === active ? ACCENT : BORDER,
                    transition: "all 0.3s",
                  }}
                />
              </div>

              <div
                className="flex-1 py-5"
                style={{ borderBottom: i < LOOP_STEPS.length - 1 ? `1px solid ${BORDER}` : "none" }}
              >
                <div
                  className="mb-1"
                  style={{
                    fontFamily: FONT_SERIF,
                    fontSize: "clamp(1.2rem, 1.8vw, 1.6rem)",
                    color: i === active ? FOREGROUND : "rgba(238,240,246,0.35)",
                    lineHeight: 1.2,
                    transition: "color 0.3s",
                  }}
                >
                  {step.label}
                </div>
                <div
                  className="uppercase"
                  style={{
                    fontFamily: FONT_MONO,
                    fontSize: "0.63rem",
                    letterSpacing: "0.1em",
                    color: i === active ? ACCENT : "transparent",
                    transition: "color 0.3s",
                  }}
                >
                  {step.sub}
                </div>
              </div>

              <div
                className="py-5"
                style={{ fontFamily: FONT_MONO, fontSize: "0.6rem", letterSpacing: "0.1em", color: i === active ? ACCENT : BORDER, transition: "color 0.3s" }}
              >
                {String(i + 1).padStart(2, "0")}
              </div>
            </button>
          ))}
        </div>

        <div>
          <div className="mb-6 border" style={{ background: BACKGROUND, borderColor: BORDER, padding: "clamp(28px, 3vw, 44px)" }}>
            <div className="mb-4 uppercase" style={{ fontFamily: FONT_MONO, fontSize: "0.6rem", letterSpacing: "0.15em", color: ACCENT }}>
              Current Phase
            </div>
            <div className="mb-3" style={{ fontFamily: FONT_SERIF, fontSize: "clamp(2rem, 3.5vw, 3rem)", lineHeight: 1.1, color: FOREGROUND }}>
              {LOOP_STEPS[active].label}
            </div>
            <div className="uppercase" style={{ fontFamily: FONT_MONO, fontSize: "0.65rem", letterSpacing: "0.1em", color: MUTED }}>
              {LOOP_STEPS[active].sub}
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {LOOP_TAGS.map((tag) => (
              <span
                key={tag}
                className="border uppercase"
                style={{ padding: "5px 12px", background: BACKGROUND, borderColor: BORDER, fontFamily: FONT_MONO, fontSize: "0.6rem", letterSpacing: "0.08em", color: MUTED }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── KRIT ───

const KRIT_DIMENSIONS = [
  { letter: "L", word: "Learn", desc: "Digital resources · Study material", color: ACCENT },
  { letter: "P", word: "Practice", desc: "Assignments · Practice resources", color: ACCENT_BLUE },
  { letter: "T", word: "Test", desc: "CBT · JEE mock examinations", color: ACCENT },
  { letter: "A", word: "Analyse", desc: "Subject + chapter performance", color: ACCENT_BLUE },
  { letter: "T", word: "Track", desc: "Progress · Reports · Improvement", color: ACCENT },
];

function Krit() {
  return (
    <section style={{ padding: "clamp(64px, 10vw, 120px) clamp(32px, 5vw, 72px)" }}>
      <div className="grid grid-cols-1 items-start gap-12 md:grid-cols-[1fr_1.4fr] md:gap-20">
        <div>
          <div className="mb-12 flex items-center gap-4">
            <MonoLabel>Platform</MonoLabel>
            <div className="h-px w-10" style={{ background: BORDER }} />
          </div>

          <h2 className="mb-6" style={{ fontFamily: FONT_SERIF, fontSize: "clamp(3rem, 5vw, 5.5rem)", lineHeight: 1, letterSpacing: "-0.02em", color: FOREGROUND }}>
            KRIT
          </h2>

          <p className="max-w-[320px] font-light" style={{ fontSize: "0.9rem", lineHeight: 1.7, color: MUTED }}>
            KRIT keeps preparation, assessment and progress connected — one integrated platform across the entire
            program.
          </p>
        </div>

        <div className="flex flex-col gap-px" style={{ background: BORDER }}>
          {KRIT_DIMENSIONS.map((d, i) => (
            <div
              key={i}
              className="grid grid-cols-[52px_1fr] items-center gap-6 bg-[#0d1120] transition-colors hover:bg-[#131827]"
              style={{ padding: "20px 28px" }}
            >
              <div style={{ fontFamily: FONT_SERIF, fontStyle: "italic", fontSize: "2rem", color: d.color, lineHeight: 1 }}>{d.letter}</div>
              <div>
                <div className="mb-1 uppercase" style={{ fontSize: "0.88rem", fontWeight: 600, color: FOREGROUND, letterSpacing: "0.04em" }}>
                  {d.word}
                </div>
                <div style={{ fontFamily: FONT_MONO, fontSize: "0.63rem", color: MUTED, letterSpacing: "0.06em" }}>{d.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Assessment ───

const ASSESS_STEPS = [
  { label: "Assess", desc: "Chapter Tests · Revision Tests · CBT" },
  { label: "Identify", desc: "Weak areas · Concept gaps · Time patterns" },
  { label: "Review", desc: "Full-Length JEE Mocks · Faculty Review" },
  { label: "Improve", desc: "Performance Analytics · Targeted Practice" },
];

const ASSESS_TAGS = ["Chapter Tests", "Revision Tests", "CBT", "Full-Length JEE Mocks", "Performance Analytics", "Faculty Review"];

function Assessment() {
  return (
    <section
      className="border-y"
      style={{ padding: "clamp(64px, 10vw, 120px) clamp(32px, 5vw, 72px)", background: SURFACE, borderColor: BORDER }}
    >
      <div className="mb-16 flex items-center gap-4">
        <MonoLabel>Continuous improvement</MonoLabel>
        <div className="h-px flex-1" style={{ background: BORDER }} />
      </div>

      <div className="grid grid-cols-2 gap-px md:grid-cols-4" style={{ background: BORDER }}>
        {ASSESS_STEPS.map((step, i) => (
          <div
            key={step.label}
            className="relative bg-[#0d1120] transition-colors hover:bg-[#131827]"
            style={{ padding: "clamp(24px, 2.5vw, 36px)" }}
          >
            <div className="mb-5" style={{ fontFamily: FONT_MONO, fontSize: "0.6rem", letterSpacing: "0.15em", color: i % 2 === 0 ? ACCENT : ACCENT_BLUE }}>
              {String(i + 1).padStart(2, "0")}
            </div>
            <h3 className="mb-3" style={{ fontFamily: FONT_SERIF, fontSize: "clamp(1.3rem, 1.8vw, 1.7rem)", color: FOREGROUND, lineHeight: 1.2 }}>
              {step.label}
            </h3>
            <p style={{ fontFamily: FONT_MONO, fontSize: "0.62rem", color: MUTED, letterSpacing: "0.06em", lineHeight: 1.7, whiteSpace: "pre-line" }}>
              {step.desc.split(" · ").join("\n")}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-12 flex flex-wrap gap-8 border-t pt-8" style={{ borderColor: BORDER }}>
        {ASSESS_TAGS.map((tag) => (
          <span key={tag} className="uppercase" style={{ fontFamily: FONT_MONO, fontSize: "0.62rem", color: MUTED, letterSpacing: "0.08em" }}>
            {tag}
          </span>
        ))}
      </div>
    </section>
  );
}

// ─── CTA ───

function CTA() {
  return (
    <section
      className="grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-20"
      style={{ padding: "clamp(64px, 10vw, 120px) clamp(32px, 5vw, 72px)" }}
    >
      <div>
        <div className="mb-8 flex items-center gap-4">
          <div className="h-px w-6" style={{ background: ACCENT }} />
          <MonoLabel accent>Admissions Open</MonoLabel>
        </div>
        <h2 className="mb-4" style={{ fontFamily: FONT_SERIF, fontSize: "clamp(2.2rem, 4vw, 3.8rem)", lineHeight: 1.1, color: FOREGROUND }}>
          Start your
          <br />
          <span style={{ color: ACCENT, fontStyle: "italic" }}>JEE preparation</span>
          <br />
          today.
        </h2>
        <p className="max-w-[360px] font-light" style={{ fontSize: "0.875rem", color: MUTED, lineHeight: 1.7 }}>
          Speak with our academic team about the JEE Long-Term Program and find the right preparation path for you.
        </p>
      </div>

      <div>
        <Link
          href={PRIMARY_CTA_HREF}
          className="group mb-4 flex w-full items-center gap-4 border border-[#e8a03c]/30 bg-transparent text-sm font-semibold uppercase tracking-[0.08em] text-[#eef0f6] transition-all duration-200 hover:border-[#e8a03c] hover:bg-[#e8a03c] hover:text-black"
          style={{ padding: "20px 32px", fontFamily: FONT_SANS }}
        >
          <div className="h-2 w-2 flex-shrink-0 rounded-full bg-[#e8a03c] transition-colors duration-200 group-hover:bg-black" />
          <span>Admission Enquiry</span>
          <div className="flex-1" />
          <ArrowRightIcon className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
        </Link>

        <div className="flex gap-px" style={{ background: BORDER }}>
          {[
            { label: "Program", value: "JEE Long-Term" },
            { label: "Target", value: "JEE Mains & Advanced" },
            { label: "For", value: "12th Passed & Repeaters" },
          ].map((item) => (
            <div key={item.label} className="flex-1 bg-[#0d1120] p-4">
              <div className="mb-1 uppercase" style={{ fontFamily: FONT_MONO, fontSize: "0.58rem", color: MUTED, letterSpacing: "0.1em" }}>
                {item.label}
              </div>
              <div style={{ fontSize: "0.78rem", fontWeight: 500, color: FOREGROUND, letterSpacing: "0.02em" }}>{item.value}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Footer strip ───

function FooterStrip() {
  return (
    <div
      className="flex flex-wrap items-center justify-between gap-4 border-t"
      style={{ padding: "20px clamp(32px, 5vw, 72px)", borderColor: BORDER }}
    >
      <MonoLabel>Vishweshwarayya NEET | JEE Academy</MonoLabel>
      <div className="flex gap-6">
        <MonoLabel>JEE Long-Term Program</MonoLabel>
        <MonoLabel>Dedicated · Intensive · Structured</MonoLabel>
      </div>
    </div>
  );
}

export default function JeeLongTermDetail() {
  return (
    <div style={{ minHeight: "100vh", background: BACKGROUND, color: FOREGROUND, fontFamily: FONT_SANS }}>
      <Hero />
      <div className="h-px w-full" style={{ background: BORDER }} />
      <ProgramBuilds />
      <PrepSystem />
      <Krit />
      <Assessment />
      <CTA />
      <FooterStrip />
    </div>
  );
}
