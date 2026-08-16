"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import Link from "next/link";
import { PRIMARY_CTA_HREF } from "@/config/nav";
import { ArrowRightIcon } from "@/components/ui/icons";

const BG = "#080c14";
const FG = "#e2eaf8";
const AMBER = "#f0b429";

const FONT_DISPLAY = "var(--font-barlow-condensed), sans-serif";
const FONT_BODY = "var(--font-inter), sans-serif";
const FONT_MONO = "var(--font-jetbrains-mono), monospace";

function MonoLabel({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <span className={`text-[10px] uppercase tracking-[0.2em] ${className}`} style={{ fontFamily: FONT_MONO }}>
      {children}
    </span>
  );
}

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <div className="mb-10 flex items-center gap-3">
      <div className="h-px w-5 bg-amber-400 opacity-60" />
      <MonoLabel className="text-amber-400/60">{children}</MonoLabel>
    </div>
  );
}

// ─── Hero coordinate visual — animated trajectory canvas, ported as designed ───

function CoordinateHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const tRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    function resize() {
      if (!canvas || !ctx) return;
      const dpr = window.devicePixelRatio || 1;
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.scale(dpr, dpr);
    }
    resize();
    window.addEventListener("resize", resize);

    function draw() {
      if (!canvas || !ctx) return;
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      tRef.current += 0.008;
      const t = tRef.current;

      ctx.clearRect(0, 0, w, h);

      ctx.strokeStyle = "rgba(255,255,255,0.04)";
      ctx.lineWidth = 1;
      const step = 40;
      for (let x = 0; x < w; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = 0; y < h; y += step) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      const cx = w * 0.5;
      const cy = h * 0.52;

      ctx.strokeStyle = "rgba(255,255,255,0.12)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(cx, 30);
      ctx.lineTo(cx, h - 30);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(30, cy);
      ctx.lineTo(w - 30, cy);
      ctx.stroke();

      ctx.fillStyle = "rgba(255,255,255,0.18)";
      ctx.beginPath();
      ctx.moveTo(cx, 24);
      ctx.lineTo(cx - 5, 36);
      ctx.lineTo(cx + 5, 36);
      ctx.closePath();
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(w - 24, cy);
      ctx.lineTo(w - 36, cy - 5);
      ctx.lineTo(w - 36, cy + 5);
      ctx.closePath();
      ctx.fill();

      ctx.font = "500 10px JetBrains Mono, monospace";
      ctx.fillStyle = "rgba(168, 190, 216, 0.5)";
      ctx.textAlign = "center";
      ctx.fillText("JEE READINESS", cx, 18);
      ctx.fillText("BOARD MASTERY →", w - 20, cy - 10);
      ctx.textAlign = "left";

      const pts = 80;
      ctx.beginPath();
      for (let i = 0; i <= pts; i++) {
        const frac = i / pts;
        const px = 60 + (w - 90) * frac;
        const py = cy + (cy - 60) * (frac * frac - 1);
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      const grad = ctx.createLinearGradient(60, cy, w - 30, 60);
      grad.addColorStop(0, "rgba(59,130,246,0.15)");
      grad.addColorStop(0.5, "rgba(59,130,246,0.5)");
      grad.addColorStop(1, "rgba(240,180,41,0.9)");
      ctx.strokeStyle = grad;
      ctx.lineWidth = 1.5;
      ctx.stroke();

      const progress = Math.sin(t) * 0.5 + 0.5;
      const dp = 0.2 + progress * 0.65;
      const dotX = 60 + (w - 90) * dp;
      const dotY = cy + (cy - 60) * (dp * dp - 1);

      const glow = ctx.createRadialGradient(dotX, dotY, 0, dotX, dotY, 28);
      glow.addColorStop(0, "rgba(240,180,41,0.25)");
      glow.addColorStop(1, "rgba(240,180,41,0)");
      ctx.beginPath();
      ctx.arc(dotX, dotY, 28, 0, Math.PI * 2);
      ctx.fillStyle = glow;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(dotX, dotY, 4, 0, Math.PI * 2);
      ctx.fillStyle = "#f0b429";
      ctx.fill();
      ctx.beginPath();
      ctx.arc(dotX, dotY, 7, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(240,180,41,0.4)";
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.setLineDash([3, 5]);
      ctx.strokeStyle = "rgba(240,180,41,0.2)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(dotX, dotY);
      ctx.lineTo(dotX, cy);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(dotX, dotY);
      ctx.lineTo(cx, dotY);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.fillStyle = "rgba(240,180,41,0.5)";
      ctx.fillRect(dotX - 1, cy - 4, 2, 8);
      ctx.fillRect(cx - 4, dotY - 1, 8, 2);

      rafRef.current = requestAnimationFrame(draw);
    }

    draw();
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden="true" />;
}

// ─── Preparation loop ───

const LOOP_STEPS = ["CONCEPT", "PRACTICE", "TEST", "ANALYSE", "IMPROVE"];

const LOOP_SUPPORT: [string, string][] = [
  ["Daily Practice Questions", "DAILY"],
  ["Topic-wise Assignments", "WEEKLY"],
  ["Regular Tests", "PERIODIC"],
  ["JEE Mock Tests", "FULL-LENGTH"],
  ["Doubt Solving", "ONGOING"],
  ["Revision", "STRUCTURED"],
  ["Faculty Mentoring", "PERSONALISED"],
];

function PrepLoop() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setActive((a) => (a + 1) % LOOP_STEPS.length), 1800);
    return () => clearInterval(id);
  }, []);

  const r = 88;
  const cx = 120;
  const cy = 120;
  const totalSteps = LOOP_STEPS.length;

  return (
    <div className="flex flex-col items-center gap-16 lg:flex-row">
      <div className="relative flex-shrink-0" style={{ width: 240, height: 240 }}>
        <svg width={240} height={240} viewBox="0 0 240 240" aria-hidden="true">
          <circle cx={cx} cy={cy} r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={1} />

          {LOOP_STEPS.map((_, i) => {
            const slice = (2 * Math.PI) / totalSteps;
            const startAngle = -Math.PI / 2 + i * slice + 0.04;
            const endAngle = startAngle + slice - 0.08;
            const x1 = cx + r * Math.cos(startAngle);
            const y1 = cy + r * Math.sin(startAngle);
            const x2 = cx + r * Math.cos(endAngle);
            const y2 = cy + r * Math.sin(endAngle);
            const isActive = i === active;
            return (
              <path
                key={i}
                d={`M ${x1} ${y1} A ${r} ${r} 0 0 1 ${x2} ${y2}`}
                fill="none"
                stroke={isActive ? AMBER : "rgba(255,255,255,0.12)"}
                strokeWidth={isActive ? 2.5 : 1}
                style={{ transition: "stroke 0.4s, stroke-width 0.4s" }}
              />
            );
          })}

          {LOOP_STEPS.map((label, i) => {
            const angle = -Math.PI / 2 + (i / totalSteps) * 2 * Math.PI;
            const dotX = cx + r * Math.cos(angle);
            const dotY = cy + r * Math.sin(angle);
            const labelR = r + 28;
            const labelX = cx + labelR * Math.cos(angle);
            const labelY = cy + labelR * Math.sin(angle);
            const isActive = i === active;
            return (
              <g key={i} onClick={() => setActive(i)} style={{ cursor: "pointer" }}>
                <circle
                  cx={dotX}
                  cy={dotY}
                  r={isActive ? 5 : 3}
                  fill={isActive ? AMBER : "rgba(255,255,255,0.2)"}
                  style={{ transition: "r 0.3s, fill 0.3s" }}
                />
                {isActive && <circle cx={dotX} cy={dotY} r={10} fill="rgba(240,180,41,0.12)" />}
                <text
                  x={labelX}
                  y={labelY + 4}
                  textAnchor="middle"
                  fontSize={isActive ? 8.5 : 7.5}
                  fontFamily="JetBrains Mono, monospace"
                  fontWeight={isActive ? 600 : 400}
                  fill={isActive ? AMBER : "rgba(168,190,216,0.5)"}
                  style={{ transition: "fill 0.3s, font-size 0.3s", letterSpacing: "0.1em" }}
                >
                  {label}
                </text>
              </g>
            );
          })}

          <circle cx={cx} cy={cy} r={18} fill="rgba(240,180,41,0.06)" stroke="rgba(240,180,41,0.2)" strokeWidth={1} />
          <text x={cx} y={cy + 4} textAnchor="middle" fontSize={7} fontFamily="JetBrains Mono, monospace" fill="rgba(240,180,41,0.7)" letterSpacing="0.15em">
            LOOP
          </text>
        </svg>
      </div>

      <div className="grid w-full flex-1 grid-cols-1 gap-px" style={{ background: "rgba(255,255,255,0.06)" }}>
        {LOOP_SUPPORT.map(([label, tag]) => (
          <div key={label} className="flex items-center justify-between px-5 py-3" style={{ background: "#080c14" }}>
            <span className="text-[13px] text-slate-300">{label}</span>
            <MonoLabel className="text-slate-600">{tag}</MonoLabel>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── KRIT pillars ───

const KRIT_PILLARS = [
  { letter: "L", word: "LEARN", desc: "Digital resources · Study materials" },
  { letter: "P", word: "PRACTICE", desc: "Assignments · Practice resources" },
  { letter: "T", word: "TEST", desc: "CBT · JEE mock examinations" },
  { letter: "A", word: "ANALYSE", desc: "Subject + chapter performance" },
  { letter: "R", word: "TRACK", desc: "Progress · Reports · Improvement" },
];

function KritPillar({ letter, word, desc, index }: { letter: string; word: string; desc: string; index: number }) {
  return (
    <div className="group flex cursor-default flex-col gap-3 border-l-2 border-white/[0.07] px-6 py-7 transition-colors duration-300 hover:border-amber-400">
      <MonoLabel className="text-slate-600">{String(index + 1).padStart(2, "0")}</MonoLabel>
      <div className="flex items-baseline gap-3">
        <span
          className="text-5xl font-black leading-none text-white/[0.08] transition-colors duration-300 group-hover:text-amber-400"
          style={{ fontFamily: FONT_DISPLAY }}
        >
          {letter}
        </span>
        <MonoLabel className="text-slate-400 transition-colors duration-300 group-hover:text-amber-400">{word}</MonoLabel>
      </div>
      <p className="text-[12px] leading-relaxed text-slate-500">{desc}</p>
    </div>
  );
}

// ─── Assessment loop ───

const ASSESS_STEPS = [
  { label: "ASSESS", sublabel: "Chapter · Unit · CBT · Mock" },
  { label: "IDENTIFY", sublabel: "Performance Analytics" },
  { label: "REVIEW", sublabel: "Faculty Review" },
  { label: "IMPROVE", sublabel: "Parent Progress Updates" },
];

function AssessmentLoop() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setActive((a) => (a + 1) % ASSESS_STEPS.length), 2200);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex items-stretch gap-px" style={{ background: "rgba(255,255,255,0.06)" }}>
      {ASSESS_STEPS.map((step, i) => (
        <button
          type="button"
          key={step.label}
          onClick={() => setActive(i)}
          className="flex min-w-0 flex-1 flex-col gap-2 px-6 py-8 text-left"
          style={{
            background: i === active ? "rgba(240,180,41,0.06)" : "#080c14",
            transition: "background 0.4s",
          }}
        >
          <div className="mb-1 flex items-center gap-2">
            <div
              className="h-1.5 w-1.5 flex-shrink-0 rounded-full"
              style={{ background: i === active ? AMBER : "rgba(255,255,255,0.15)", transition: "background 0.4s" }}
            />
            {i < ASSESS_STEPS.length - 1 && (
              <div
                className="h-px flex-1"
                style={{ background: i === active ? "rgba(240,180,41,0.3)" : "rgba(255,255,255,0.06)" }}
              />
            )}
          </div>
          <MonoLabel className={i === active ? "text-amber-400" : "text-slate-600"}>{step.label}</MonoLabel>
          <p className="mt-1 text-[12px] leading-relaxed text-slate-500">{step.sublabel}</p>
        </button>
      ))}
    </div>
  );
}

// ─── Main page ───

export default function JeeAchievementDetail() {
  return (
    <div className="min-h-screen" style={{ background: BG, color: FG, fontFamily: FONT_BODY }}>
      {/* Hero */}
      <section className="relative flex min-h-screen flex-col items-start justify-end overflow-hidden px-8 pb-20 pt-24 lg:px-20">
        <CoordinateHero />

        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(ellipse at 50% 50%, transparent 30%, #080c14 90%)" }}
        />
        <div
          className="pointer-events-none absolute bottom-0 left-0 right-0 h-48"
          style={{ background: "linear-gradient(to top, #080c14, transparent)" }}
        />

        <div className="relative z-10 max-w-4xl">
          <MonoLabel className="mb-8 block text-amber-400/60">1ST PUC · 2ND PUC</MonoLabel>

          <h1
            className="mb-6 font-black leading-none"
            style={{
              fontFamily: FONT_DISPLAY,
              fontSize: "clamp(56px, 10vw, 112px)",
              letterSpacing: "-0.01em",
              lineHeight: 0.92,
            }}
          >
            JEE
            <br />
            <span style={{ color: AMBER }}>ACHIEVEMENT</span>
            <br />
            PROGRAM
          </h1>

          <div className="mt-10 flex items-center gap-6">
            <div className="flex items-center gap-4">
              <span className="text-xl font-bold tracking-widest text-slate-300" style={{ fontFamily: FONT_DISPLAY }}>
                BOARD
              </span>
              <div className="flex flex-col items-center gap-0.5">
                <div className="h-px w-8" style={{ background: "rgba(255,255,255,0.2)" }} />
                <div className="h-2 w-2 rounded-full" style={{ background: AMBER }} />
                <div className="h-px w-8" style={{ background: "rgba(255,255,255,0.2)" }} />
              </div>
              <span className="text-xl font-bold tracking-widest" style={{ fontFamily: FONT_DISPLAY, color: AMBER }}>
                JEE
              </span>
            </div>
            <div className="h-10 w-px bg-white/10" />
            <div>
              <MonoLabel className="block text-slate-400">ONE INTEGRATED SYSTEM</MonoLabel>
              <p className="mt-1 text-[12px] text-slate-600">Two goals. One preparation architecture.</p>
            </div>
          </div>
        </div>

        <div className="absolute bottom-24 right-10 hidden flex-col items-end gap-1 md:flex lg:right-20">
          <MonoLabel className="text-slate-600">BOARD MASTERY ↔ JEE READINESS</MonoLabel>
          <p className="text-[11px] text-slate-700">Trajectory optimised for both.</p>
        </div>
      </section>

      {/* Who it's for */}
      <section className="border-t px-8 py-24 lg:px-20" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
        <SectionLabel>Who it&rsquo;s for</SectionLabel>
        <div className="flex flex-col items-start gap-8 lg:flex-row lg:items-end lg:gap-20">
          <h2
            className="flex-1 font-black leading-none"
            style={{ fontFamily: FONT_DISPLAY, fontSize: "clamp(40px, 7vw, 80px)", lineHeight: 0.95 }}
          >
            STUDENTS WHO REFUSE
            <br />
            <span style={{ color: AMBER }}>TO CHOOSE</span>
            <br />
            BETWEEN BOARD
            <br />
            AND JEE.
          </h2>
          <div className="flex flex-col gap-6 lg:w-80">
            <p className="text-[14px] leading-relaxed text-slate-400">
              1st and 2nd PUC students who want both — strong board marks and a competitive JEE score — achieved
              through one unified preparation system.
            </p>
            <div className="flex gap-8">
              <div>
                <MonoLabel className="mb-1 block text-amber-400/60">STAGE</MonoLabel>
                <p className="text-[13px] text-slate-300">1st PUC · 2nd PUC</p>
              </div>
              <div>
                <MonoLabel className="mb-1 block text-amber-400/60">STREAM</MonoLabel>
                <p className="text-[13px] text-slate-300">PCM</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What students build */}
      <section className="border-t px-8 py-24 lg:px-20" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
        <SectionLabel>What students build</SectionLabel>

        <div className="grid grid-cols-1 gap-px lg:grid-cols-2" style={{ background: "rgba(255,255,255,0.06)" }}>
          {[
            {
              num: "01",
              title: "CONCEPTUAL CLARITY",
              subjects: "Physics · Chemistry · Mathematics",
              desc: "Deep understanding over surface familiarity. Every topic built from first principles.",
              accent: false,
            },
            {
              num: "02",
              title: "PROBLEM SOLVING",
              subjects: "Logic · Application · Analytical Thinking",
              desc: "The skill that separates JEE ranks — trained systematically, not left to chance.",
              accent: true,
            },
            {
              num: "03",
              title: "EXAM READINESS",
              subjects: "Speed · Accuracy · Strategy",
              desc: "Precision under pressure. Students learn to perform, not just study.",
              accent: false,
            },
            {
              num: "04",
              title: "CONFIDENCE",
              subjects: "Practice · Assessment · Mentoring",
              desc: "Built through repetition, feedback, and the steady guidance of experienced faculty.",
              accent: false,
            },
          ].map((item) => (
            <div
              key={item.num}
              className="relative flex flex-col gap-4 p-8 lg:p-10"
              style={{ background: item.accent ? "rgba(240,180,41,0.05)" : "#080c14" }}
            >
              {item.accent && <div className="absolute left-0 right-0 top-0 h-px" style={{ background: AMBER }} />}
              <MonoLabel className="text-slate-700">{item.num}</MonoLabel>
              <h3
                className="text-3xl font-black leading-none lg:text-4xl"
                style={{ fontFamily: FONT_DISPLAY, color: item.accent ? AMBER : FG }}
              >
                {item.title}
              </h3>
              <MonoLabel className="text-slate-600">{item.subjects}</MonoLabel>
              <p className="max-w-xs text-[13px] leading-relaxed text-slate-400">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Preparation system */}
      <section className="border-t px-8 py-24 lg:px-20" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
        <SectionLabel>The preparation system</SectionLabel>
        <h2 className="mb-16 font-black leading-none" style={{ fontFamily: FONT_DISPLAY, fontSize: "clamp(36px, 5vw, 60px)" }}>
          A LOOP THAT
          <br />
          <span style={{ color: AMBER }}>NEVER STOPS</span>
          <br />
          REFINING YOU.
        </h2>
        <PrepLoop />
      </section>

      {/* KRIT */}
      <section
        className="border-t px-8 py-24 lg:px-20"
        style={{ borderColor: "rgba(255,255,255,0.06)", background: "rgba(16,24,40,0.4)" }}
      >
        <SectionLabel>KRIT — Digital Learning Ecosystem</SectionLabel>
        <div className="mb-12 flex flex-col items-start gap-12 lg:flex-row">
          <h2
            className="flex-shrink-0 font-black leading-none"
            style={{ fontFamily: FONT_DISPLAY, fontSize: "clamp(40px, 6vw, 72px)", lineHeight: 0.9 }}
          >
            KRIT
          </h2>
          <p className="max-w-sm pt-2 text-[14px] leading-relaxed text-slate-400">
            Every phase of preparation — from learning to tracking — in a single integrated platform built for
            serious students.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-px md:grid-cols-3 lg:grid-cols-5" style={{ background: "rgba(255,255,255,0.06)" }}>
          {KRIT_PILLARS.map((p, i) => (
            <KritPillar key={p.word} {...p} index={i} />
          ))}
        </div>
      </section>

      {/* Assessment */}
      <section className="border-t px-8 py-24 lg:px-20" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
        <SectionLabel>Assessment &amp; Improvement</SectionLabel>
        <h2 className="mb-12 font-black leading-none" style={{ fontFamily: FONT_DISPLAY, fontSize: "clamp(32px, 4.5vw, 56px)" }}>
          CONTINUOUS
          <br />
          <span style={{ color: AMBER }}>IMPROVEMENT</span>
          <br />
          BY DESIGN.
        </h2>
        <AssessmentLoop />
      </section>

      {/* CTA */}
      <section
        className="flex flex-col items-center border-t px-8 py-32 text-center lg:px-20"
        style={{ borderColor: "rgba(255,255,255,0.06)", background: "rgba(8,12,20,0.8)" }}
      >
        <MonoLabel className="mb-8 block text-amber-400/60">Vishweshwarayya NEET · JEE Academy</MonoLabel>
        <h2
          className="mb-4 font-black leading-none"
          style={{ fontFamily: FONT_DISPLAY, fontSize: "clamp(44px, 8vw, 96px)", lineHeight: 0.9 }}
        >
          YOUR JEE JOURNEY
          <br />
          <span style={{ color: AMBER }}>STARTS HERE.</span>
        </h2>
        <p className="mb-12 mt-6 max-w-sm text-[13px] leading-relaxed text-slate-500">
          Board preparation and JEE preparation — structured as one coherent system.
        </p>
        <Link
          href={PRIMARY_CTA_HREF}
          className="group inline-flex items-center gap-4 px-10 py-5 text-sm font-bold tracking-widest transition-all hover:gap-6"
          style={{ background: AMBER, color: BG, fontFamily: FONT_MONO }}
        >
          ADMISSION ENQUIRY
          <ArrowRightIcon className="h-4 w-4" />
        </Link>
        <p className="mt-8 text-[11px] tracking-widest text-slate-700" style={{ fontFamily: FONT_MONO }}>
          JEE ACHIEVEMENT PROGRAM · 1ST PUC + 2ND PUC
        </p>
      </section>

      {/* Footer rule */}
      <div className="flex items-center justify-between border-t px-8 py-8 lg:px-20" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
        <div>
          <div className="text-[8px] font-semibold tracking-widest text-slate-700" style={{ fontFamily: FONT_MONO }}>
            SIR M
          </div>
          <div className="text-xs font-black tracking-widest text-slate-600" style={{ fontFamily: FONT_DISPLAY }}>
            VISHWESHWARAYYA
          </div>
          <MonoLabel className="text-slate-700">NEET · JEE ACADEMY</MonoLabel>
        </div>
        <MonoLabel className="hidden text-slate-700 md:block">JEE ACHIEVEMENT PROGRAM</MonoLabel>
      </div>
    </div>
  );
}
