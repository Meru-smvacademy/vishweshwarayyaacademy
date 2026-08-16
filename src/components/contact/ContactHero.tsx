"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { PRIMARY_CTA_HREF } from "@/config/nav";

const CREAM = "#F5EDE0";
const INK = "#1A0E05";
const RUST = "#B8622A";

const FRAUNCES = "var(--font-fraunces), Georgia, serif";
const DM_SANS = "var(--font-dm-sans), system-ui, sans-serif";

const RADII = [56, 88, 120, 152, 184, 216];
const BASE_OPACITY = 0.18;

const GRAIN_TEXTURE =
  "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E\")";

function ArrowRight() {
  return (
    <svg
      width="18"
      height="12"
      viewBox="0 0 18 12"
      fill="none"
      aria-hidden="true"
      className="transition-transform duration-[350ms] ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-x-1"
    >
      <path d="M0 6H16M11 1L16 6L11 11" stroke={INK} strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// Breathing arc animation, driven imperatively via requestAnimationFrame
// rather than a React re-render loop, to match the approved motion without
// re-rendering the page ~20x/sec.
function ResonanceVisual() {
  const leftRefs = useRef<(SVGCircleElement | null)[]>([]);
  const rightRefs = useRef<(SVGCircleElement | null)[]>([]);
  const overlapRef = useRef<SVGEllipseElement>(null);
  const centerDotRef = useRef<SVGCircleElement>(null);

  useEffect(() => {
    let raf: number;
    let start: number | null = null;

    function frame(now: number) {
      if (start === null) start = now;
      const t = (now - start) / 1000;
      const breathe = Math.sin(t) * 0.5 + 0.5;

      leftRefs.current.forEach((el, i) => {
        if (!el) return;
        const progress = i / (RADII.length - 1);
        el.setAttribute("opacity", String(BASE_OPACITY * (1 - progress * 0.5) + breathe * 0.06 * (1 - progress)));
      });
      rightRefs.current.forEach((el, i) => {
        if (!el) return;
        const progress = i / (RADII.length - 1);
        el.setAttribute("opacity", String(BASE_OPACITY * (1 - progress * 0.5) + (1 - breathe) * 0.06 * (1 - progress)));
      });
      overlapRef.current?.setAttribute("opacity", String(0.04 + breathe * 0.04));
      centerDotRef.current?.setAttribute("opacity", String(0.5 + breathe * 0.3));

      raf = requestAnimationFrame(frame);
    }

    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, []);

  const size = 480;
  const cx1 = size * 0.38;
  const cx2 = size * 0.62;
  const cy = size * 0.5;
  const maxR = RADII[RADII.length - 1];

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      fill="none"
      style={{ overflow: "visible", maxWidth: "100%", height: "auto" }}
      aria-hidden="true"
    >
      {RADII.map((r, i) => (
        <circle
          key={`l-${i}`}
          ref={(el) => {
            leftRefs.current[i] = el;
          }}
          cx={cx1}
          cy={cy}
          r={r}
          stroke={RUST}
          strokeWidth={1.5 - i * 0.1}
          opacity={BASE_OPACITY}
        />
      ))}
      {RADII.map((r, i) => (
        <circle
          key={`r-${i}`}
          ref={(el) => {
            rightRefs.current[i] = el;
          }}
          cx={cx2}
          cy={cy}
          r={r}
          stroke={INK}
          strokeWidth={1.5 - i * 0.1}
          opacity={BASE_OPACITY}
        />
      ))}

      <ellipse ref={overlapRef} cx={(cx1 + cx2) / 2} cy={cy} rx={(cx2 - cx1) * 0.45} ry={(cx2 - cx1) * 0.38} fill={RUST} opacity={0.04} />
      <circle ref={centerDotRef} cx={(cx1 + cx2) / 2} cy={cy} r={3.5} fill={RUST} opacity={0.5} />
      <circle cx={cx1} cy={cy} r={2.5} fill={RUST} opacity={0.4} />
      <circle cx={cx2} cy={cy} r={2.5} fill={INK} opacity={0.3} />

      <line x1={cx1 - maxR - 16} y1={cy} x2={cx2 + maxR + 16} y2={cy} stroke={INK} strokeWidth={0.5} opacity={0.1} strokeDasharray="3 6" />

      <text x={(cx1 + cx2) / 2} y={cy + maxR + 32} textAnchor="middle" fontFamily={DM_SANS} fontSize={9} letterSpacing="0.18em" fill={INK} opacity={0.25}>
        RESONANCE
      </text>
    </svg>
  );
}

export default function ContactHero() {
  return (
    <div className="relative overflow-hidden" style={{ backgroundColor: CREAM, fontFamily: DM_SANS }}>
      <div
        className="pointer-events-none absolute inset-0"
        style={{ backgroundImage: GRAIN_TEXTURE, backgroundSize: "256px 256px" }}
      />

      <div className="relative z-10 grid min-h-screen grid-cols-2 items-center gap-16 px-16 py-8 max-[901px]:grid-cols-1 max-[901px]:p-8">
        {/* Left: text */}
        <div style={{ paddingBottom: "6rem" }}>
          <div className="mb-10 flex items-center gap-3">
            <div className="h-px w-8" style={{ backgroundColor: RUST }} />
            <span
              className="uppercase"
              style={{ fontSize: "0.6875rem", fontWeight: 500, letterSpacing: "0.22em", color: RUST }}
            >
              Contact
            </span>
          </div>

          <h1
            className="mb-8"
            style={{
              fontFamily: FRAUNCES,
              fontWeight: 300,
              fontSize: "clamp(4rem, 8vw, 7rem)",
              lineHeight: 0.92,
              color: INK,
              letterSpacing: "-0.03em",
              margin: "0 0 2rem",
            }}
          >
            Let&apos;s
            <br />
            <em style={{ fontStyle: "italic", fontWeight: 400, color: RUST }}>Talk.</em>
          </h1>

          <p
            className="mb-14"
            style={{ fontSize: "1.0625rem", fontWeight: 300, color: INK, opacity: 0.55, lineHeight: 1.7, maxWidth: "22ch", letterSpacing: "0.01em" }}
          >
            Have a question?
            <br />
            We&apos;re here to help.
          </p>

          <Link href={PRIMARY_CTA_HREF} className="group inline-flex items-center gap-3" style={{ fontFamily: DM_SANS }}>
            <span
              className="relative"
              style={{ fontSize: "0.875rem", fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", color: INK }}
            >
              Talk to Us
              <span
                className="absolute -bottom-[3px] left-0 h-px w-0 transition-[width] duration-[350ms] ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:w-full"
                style={{ backgroundColor: RUST }}
              />
            </span>
            <ArrowRight />
          </Link>
        </div>

        {/* Right: abstract resonance visual */}
        <div className="flex min-h-[420px] items-center justify-center">
          <ResonanceVisual />
        </div>
      </div>

      {/* Bottom label — scoped to this section, not the full viewport */}
      <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2">
        <div className="h-1 w-1 rounded-full" style={{ backgroundColor: RUST, opacity: 0.5 }} />
        <span className="whitespace-nowrap uppercase" style={{ fontSize: "0.625rem", letterSpacing: "0.18em", color: INK, opacity: 0.15 }}>
          Vishweshwarayya NEET · JEE Academy
        </span>
        <div className="h-1 w-1 rounded-full" style={{ backgroundColor: RUST, opacity: 0.5 }} />
      </div>
    </div>
  );
}
