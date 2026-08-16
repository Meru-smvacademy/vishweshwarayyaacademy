"use client";

import { useState } from "react";

const BG = "#0C1524";
const CREAM = "#F4EFE6";
const GOLD = "#C4A46B";
const LABEL = "#8B7355";

const FONT_SERIF = "var(--font-dm-serif-display), serif";
const FONT_SANS = "var(--font-instrument-sans), sans-serif";

type Advantage = {
  index: string;
  title: string;
  body: string;
  align: "top" | "bottom";
};

const ADVANTAGES: Advantage[] = [
  { index: "01", title: "Research-Driven", body: "Research-informed curriculum\n+ 3D interactive learning", align: "top" },
  { index: "02", title: "Faculty Mentorship", body: "Guidance from experienced\neducators", align: "bottom" },
  { index: "03", title: "Continuous Assessment", body: "CBT + performance\nanalysis", align: "top" },
  { index: "04", title: "Academic Ecosystem", body: "Learning + support\n+ counselling", align: "bottom" },
];

function ItemContent({ adv, isHovered }: { adv: Advantage; isHovered: boolean }) {
  return (
    <>
      <span
        className="mb-2 block transition-colors duration-[250ms]"
        style={{ fontFamily: FONT_SANS, fontSize: "10px", fontWeight: 600, letterSpacing: "0.16em", color: isHovered ? "rgba(196,164,107,0.9)" : "rgba(196,164,107,0.45)" }}
      >
        {adv.index}
      </span>
      <span
        className="mb-2.5 block leading-[1.2] transition-colors duration-[250ms]"
        style={{ fontFamily: FONT_SERIF, fontSize: "17px", fontWeight: 400, letterSpacing: "-0.01em", color: isHovered ? CREAM : "rgba(244,239,230,0.85)" }}
      >
        {adv.title}
      </span>
      <span
        className="block whitespace-pre-line leading-[1.6] transition-colors duration-[250ms]"
        style={{ fontFamily: FONT_SANS, fontSize: "12px", color: "rgba(244,239,230,0.38)" }}
      >
        {adv.body}
      </span>
    </>
  );
}

function AxisItem({
  adv,
  index,
  hovered,
  setHovered,
}: {
  adv: Advantage;
  index: number;
  hovered: number | null;
  setHovered: (i: number | null) => void;
}) {
  const isAbove = adv.align === "top";
  const isHovered = hovered === index;
  const isDimmed = hovered !== null && !isHovered;

  return (
    <div
      onMouseEnter={() => setHovered(index)}
      onMouseLeave={() => setHovered(null)}
      className="relative flex flex-col items-center transition-opacity duration-300"
      style={{ opacity: isDimmed ? 0.35 : 1, cursor: "default" }}
    >
      <div className="flex h-[110px] w-full flex-col justify-end px-4 pb-6 text-center">
        {isAbove && <ItemContent adv={adv} isHovered={isHovered} />}
      </div>

      <div className="relative flex h-0 w-full items-center justify-center">
        <div
          className="absolute w-px transition-all duration-[250ms]"
          style={{
            height: isHovered ? "18px" : "12px",
            background: isHovered ? "rgba(196,164,107,0.9)" : "rgba(196,164,107,0.4)",
            top: isAbove ? "-12px" : "0",
          }}
        />
        <div
          className="absolute rounded-full transition-all duration-[250ms]"
          style={{
            width: isHovered ? "8px" : "5px",
            height: isHovered ? "8px" : "5px",
            background: isHovered ? GOLD : "rgba(196,164,107,0.55)",
            boxShadow: isHovered ? "0 0 12px rgba(196,164,107,0.5)" : "none",
          }}
        />
      </div>

      <div className="flex h-[110px] w-full flex-col justify-start px-4 pt-6 text-center">
        {!isAbove && <ItemContent adv={adv} isHovered={isHovered} />}
      </div>
    </div>
  );
}

export default function LearningAdvantage() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section style={{ background: BG, fontFamily: FONT_SANS }}>
      <div className="h-px w-full" style={{ background: "rgba(255,255,255,0.08)" }} />

      <div className="mx-auto w-full max-w-[1200px] px-6 py-20 sm:px-12 sm:py-[88px]">
        <div className="mb-[72px] grid grid-cols-1 items-end gap-10 md:grid-cols-[1fr_auto]">
          <div>
            <p className="mb-5 uppercase" style={{ fontFamily: FONT_SANS, fontSize: "11px", fontWeight: 600, letterSpacing: "0.18em", color: LABEL }}>
              The Learning Advantage
            </p>
            <h2
              style={{ fontFamily: FONT_SERIF, fontSize: "clamp(36px, 5vw, 58px)", fontWeight: 400, lineHeight: 1.08, color: CREAM, letterSpacing: "-0.01em", margin: 0 }}
            >
              One foundation.
              <br />
              <em style={{ color: GOLD, fontStyle: "italic" }}>Every pathway.</em>
            </h2>
          </div>
          <div className="max-w-[280px] pb-1 md:text-right">
            <p style={{ fontSize: "14px", lineHeight: 1.65, color: "rgba(244,239,230,0.5)", margin: 0 }}>
              Every student at Vishweshwarayya Academy learns through the same commitment to research-driven teaching,
              strong mentorship, continuous assessment, and technology-enabled learning.
            </p>
          </div>
        </div>

        <div className="relative py-[120px]">
          <div
            className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2"
            style={{ background: "linear-gradient(to right, transparent 0%, rgba(196,164,107,0.35) 8%, rgba(196,164,107,0.35) 92%, transparent 100%)" }}
          />

          <div className="relative grid grid-cols-4">
            {ADVANTAGES.map((adv, i) => (
              <AxisItem key={adv.index} adv={adv} index={i} hovered={hovered} setHovered={setHovered} />
            ))}
          </div>
        </div>

        <div className="mb-10 h-px w-full" style={{ background: "rgba(255,255,255,0.08)" }} />

        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2">
          <p style={{ fontFamily: FONT_SERIF, fontSize: "clamp(18px, 2.2vw, 26px)", fontWeight: 400, lineHeight: 1.4, color: CREAM, margin: 0, letterSpacing: "-0.01em" }}>
            Building confident, disciplined and responsible learners —
            <em style={{ color: GOLD, fontStyle: "italic" }}> not just examination performers.</em>
          </p>
          <div className="flex items-center justify-start gap-3 md:justify-end">
            <span className="uppercase" style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.18em", color: "rgba(244,239,230,0.28)" }}>
              Vishweshwarayya Academy
            </span>
            <div className="h-px w-8" style={{ background: "rgba(196,164,107,0.4)" }} />
          </div>
        </div>
      </div>

      <div className="h-px w-full" style={{ background: "rgba(255,255,255,0.08)" }} />
    </section>
  );
}
