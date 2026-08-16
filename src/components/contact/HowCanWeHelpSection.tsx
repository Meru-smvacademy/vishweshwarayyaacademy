"use client";

import { useState, type CSSProperties, type PointerEvent } from "react";
import Link from "next/link";

const INK = "#0f173e";
const DM_SERIF = "var(--font-dm-serif-display), serif";
const INSTRUMENT_SANS = "var(--font-instrument-sans), sans-serif";

const DESTINATIONS = [
  { index: "01", label: "Admissions", descriptor: "Questions about joining the Academy.", href: "/admissions" },
  { index: "02", label: "Programs", descriptor: "Need help choosing Foundation, NEET, JEE or KCET?", href: "/courses" },
  { index: "03", label: "Campus", descriptor: "Want to know about our Lingasuguru or Sindhanur campus?", href: "/about/infrastructure" },
  { index: "04", label: "General Enquiry", descriptor: "Something else? We're happy to help.", href: "/admission-enquiry" },
];

function DestinationRow({ item }: { item: (typeof DESTINATIONS)[number] }) {
  return (
    <Link
      href={item.href}
      className="group block border-b transition-colors duration-[220ms] ease-out hover:bg-[rgba(15,23,62,0.032)]"
      style={{ borderColor: "rgba(15, 23, 62, 0.10)" }}
    >
      <div
        className="grid items-center gap-x-8 py-7 transition-transform duration-[220ms] ease-out group-hover:translate-x-1.5"
        style={{ gridTemplateColumns: "3rem 1fr auto" }}
      >
        <span
          className="self-start"
          style={{ fontFamily: INSTRUMENT_SANS, fontSize: "0.72rem", fontWeight: 500, letterSpacing: "0.06em", color: "rgba(15, 23, 62, 0.32)", paddingTop: "0.15rem" }}
        >
          {item.index}
        </span>

        <div>
          <div
            className="mb-[0.35rem]"
            style={{ fontFamily: DM_SERIF, fontSize: "clamp(1.6rem, 3.5vw, 2.2rem)", fontWeight: 400, lineHeight: 1.1, color: INK, letterSpacing: "-0.01em" }}
          >
            {item.label}
          </div>
          <div style={{ fontFamily: INSTRUMENT_SANS, fontSize: "0.82rem", fontWeight: 400, color: "rgba(15, 23, 62, 0.62)", letterSpacing: "0.01em", lineHeight: 1.5 }}>
            {item.descriptor}
          </div>
        </div>

        <div
          className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border transition-all duration-[220ms] ease-out group-hover:-rotate-45 group-hover:border-[#0f173e] group-hover:bg-[#0f173e]"
          style={{ borderColor: "rgba(15, 23, 62, 0.16)" }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="block" aria-hidden="true">
            <path
              d="M2.5 7H11.5M11.5 7L7.5 3M11.5 7L7.5 11"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-colors duration-150 [stroke:rgba(15,23,62,0.5)] group-hover:[stroke:#ffffff]"
            />
          </svg>
        </div>
      </div>
    </Link>
  );
}

export default function HowCanWeHelpSection() {
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
      className="relative w-full overflow-hidden"
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

      <section className="relative z-[1] mx-auto max-w-[72rem]" style={{ padding: "clamp(4rem, 8vw, 6.5rem) clamp(1.5rem, 8vw, 7rem)" }}>
        <div className="mb-14 flex items-baseline gap-6">
          <span
            className="whitespace-nowrap uppercase"
            style={{ fontFamily: INSTRUMENT_SANS, fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.18em", color: "rgba(15, 23, 62, 0.62)" }}
          >
            How can we help?
          </span>
          <div className="h-px flex-1" style={{ background: "rgba(15, 23, 62, 0.10)" }} />
        </div>

        <div className="mb-11">
          <h2 style={{ fontFamily: DM_SERIF, fontSize: "clamp(2rem, 5vw, 3.25rem)", fontWeight: 400, lineHeight: 1.08, color: INK, letterSpacing: "-0.02em", margin: 0 }}>
            Tell us what you&apos;re
            <br />
            looking for.
          </h2>
        </div>

        <div className="border-t" style={{ borderColor: "rgba(15, 23, 62, 0.10)" }}>
          {DESTINATIONS.map((item) => (
            <DestinationRow key={item.index} item={item} />
          ))}
        </div>
      </section>
    </div>
  );
}
