"use client";

import { useState, type MouseEvent } from "react";
import Link from "next/link";

const INK = "#0a1526";
const CREAM = "#f0ece4";

const DISPLAY = "var(--font-fraunces), serif";
const BODY = "var(--font-inter), sans-serif";

export default function SntFinalCtaSection() {
  const [hovered, setHovered] = useState(false);
  const [ripple, setRipple] = useState<{ x: number; y: number; id: number } | null>(null);

  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const id = Date.now();
    setRipple({ x: event.clientX - rect.left, y: event.clientY - rect.top, id });
    setTimeout(() => setRipple(null), 700);
  }

  return (
    <section style={{ fontFamily: BODY, backgroundColor: INK, position: "relative", overflow: "hidden" }}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(ellipse 80% 60% at 50% 100%, rgba(255,255,255,0.04) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          right: "-2rem",
          bottom: "-4rem",
          fontFamily: DISPLAY,
          fontSize: "clamp(18rem, 28vw, 32rem)",
          fontWeight: 400,
          fontStyle: "italic",
          color: "rgba(255,255,255,0.028)",
          lineHeight: 1,
          userSelect: "none",
          pointerEvents: "none",
          letterSpacing: "-0.04em",
        }}
      >
        S
      </div>

      <div
        style={{
          position: "absolute",
          top: 0,
          left: "8%",
          right: "8%",
          height: "1px",
          background:
            "linear-gradient(to right, transparent, rgba(255,255,255,0.12) 30%, rgba(255,255,255,0.12) 70%, transparent)",
        }}
      />

      <div
        style={{
          maxWidth: "680px",
          margin: "0 auto",
          padding: "clamp(5rem, 10vw, 8rem) 2rem clamp(5rem, 10vw, 8rem)",
          textAlign: "center",
          position: "relative",
          zIndex: 1,
        }}
      >
        <p
          style={{
            fontFamily: BODY,
            fontSize: "0.625rem",
            fontWeight: 600,
            letterSpacing: "0.28em",
            color: "rgba(255,255,255,0.38)",
            textTransform: "uppercase",
            marginBottom: "2.5rem",
          }}
        >
          SNT Scholarship Examination
        </p>

        <h2
          style={{
            fontFamily: DISPLAY,
            fontSize: "clamp(2.6rem, 6vw, 4.5rem)",
            fontWeight: 300,
            lineHeight: 1.22,
            letterSpacing: "-0.025em",
            color: CREAM,
            marginBottom: "2rem",
            fontStyle: "italic",
            overflow: "visible",
          }}
        >
          Your Journey
          <br />
          Can Start Here.
        </h2>

        <div
          style={{
            width: "2.5rem",
            height: "1px",
            background: "rgba(255,255,255,0.2)",
            margin: "0 auto 2.25rem",
          }}
        />

        <p
          style={{
            fontFamily: BODY,
            fontSize: "0.9375rem",
            fontWeight: 300,
            lineHeight: 1.75,
            color: "rgba(255,255,255,0.5)",
            maxWidth: "420px",
            margin: "0 auto 3.5rem",
            letterSpacing: "0.01em",
          }}
        >
          Apply for the SNT Scholarship Examination and take the first step towards your academic
          future.
        </p>

        <Link
          href="/scholarship/apply"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onClick={handleClick}
          style={{
            position: "relative",
            overflow: "hidden",
            display: "inline-flex",
            alignItems: "center",
            gap: "0.875rem",
            padding: "0.9rem 2.25rem",
            fontFamily: BODY,
            fontSize: "0.6875rem",
            fontWeight: 600,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: hovered ? INK : CREAM,
            backgroundColor: hovered ? CREAM : "transparent",
            border: `1px solid ${hovered ? CREAM : "rgba(240,236,228,0.35)"}`,
            cursor: "pointer",
            transition: "color 0.32s ease, background-color 0.32s ease, border-color 0.32s ease",
            outline: "none",
          }}
        >
          {ripple && (
            <span
              key={ripple.id}
              style={{
                position: "absolute",
                left: ripple.x,
                top: ripple.y,
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                backgroundColor: hovered ? "rgba(10,21,38,0.15)" : "rgba(255,255,255,0.2)",
                transform: "translate(-50%,-50%) scale(0)",
                animation: "snt-cta-ripple 0.7s ease-out forwards",
                pointerEvents: "none",
              }}
            />
          )}
          <span>Apply for Scholarship</span>
          <span
            style={{
              display: "inline-block",
              transform: hovered ? "translateX(3px)" : "translateX(0)",
              transition: "transform 0.32s ease",
              fontStyle: "normal",
            }}
          >
            →
          </span>
        </Link>
      </div>

      <style>{`
        @keyframes snt-cta-ripple {
          to { transform: translate(-50%,-50%) scale(60); opacity: 0; }
        }
      `}</style>
    </section>
  );
}
