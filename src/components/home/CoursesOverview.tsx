"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const NAVY = "#0C1B3A";
const IVORY = "#F5F1EA";
const ORANGE = "#C4702A";
const CHARCOAL = "#1E1E1E";
const BORDER = "#C9BDA8";
const MUTED = "#6B6459";

const DISPLAY = "var(--font-playfair-display), Georgia, serif";
const SANS = "var(--font-inter), sans-serif";

const PROGRAMS = [
  {
    number: "01",
    program: "Foundation",
    title: "Build Strong Foundations",
    image:
      "https://images.unsplash.com/photo-1483546416237-76fd26bbcdd1?w=900&h=640&fit=crop&auto=format",
    alt: "Pencil resting on an open book, academic study",
  },
  {
    number: "02",
    program: "NEET",
    title: "Medical Excellence",
    image:
      "https://images.unsplash.com/photo-1676313496812-f8fc7c4304cf?w=900&h=640&fit=crop&auto=format",
    alt: "Stethoscope resting on medical study books",
  },
  {
    number: "03",
    program: "JEE",
    title: "Engineering Excellence",
    image:
      "https://images.unsplash.com/photo-1764740109279-c7a8abd78821?w=900&h=640&fit=crop&auto=format",
    alt: "Engineering desk with laptop, blueprints and technical tools",
  },
];

function PathwayPanel({
  program,
  isLast,
}: {
  program: (typeof PROGRAMS)[number];
  isLast: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href="/courses"
      className="pathway-panel"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderRight: isLast ? "none" : `1px solid ${BORDER}`,
        backgroundColor: hovered ? "#FDFAF6" : "#FEFCF8",
        transition: "background-color 0.35s ease",
        display: "flex",
        flexDirection: "column",
        textDecoration: "none",
      }}
    >
      {/* Orange accent bar — slides in from left on hover */}
      <div
        aria-hidden="true"
        style={{
          height: "2px",
          backgroundColor: ORANGE,
          transform: hovered ? "scaleX(1)" : "scaleX(0)",
          transformOrigin: "left",
          transition: "transform 0.45s cubic-bezier(0.16,1,0.3,1)",
        }}
      />

      {/* Image */}
      <div
        style={{
          position: "relative",
          overflow: "hidden",
          backgroundColor: "#2C2820",
          aspectRatio: "4 / 3",
        }}
      >
        <Image
          src={program.image}
          alt={program.alt}
          fill
          sizes="(max-width: 860px) 100vw, 33vw"
          style={{
            objectFit: "cover",
            filter: "grayscale(18%) saturate(0.72) brightness(0.9)",
            transform: hovered ? "scale(1.055)" : "scale(1)",
            transition: "transform 0.65s cubic-bezier(0.16,1,0.3,1)",
          }}
        />
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to top, rgba(12,27,58,0.3) 0%, transparent 50%)",
          }}
        />
      </div>

      {/* Thin rule */}
      <div style={{ height: "1px", backgroundColor: BORDER }} />

      {/* Content */}
      <div
        style={{
          padding: "1.875rem 2rem 2rem",
          display: "flex",
          flexDirection: "column",
          flex: 1,
          position: "relative",
        }}
      >
        {/* Ghost number — atmospheric, behind title */}
        <span
          aria-hidden="true"
          style={{
            position: "absolute",
            top: "0.5rem",
            right: "1.25rem",
            fontFamily: DISPLAY,
            fontSize: "6.5rem",
            fontWeight: 400,
            lineHeight: 1,
            color: NAVY,
            opacity: hovered ? 0.038 : 0.02,
            transition: "opacity 0.4s ease",
            userSelect: "none",
            pointerEvents: "none",
            letterSpacing: "-0.02em",
          }}
        >
          {program.number}
        </span>

        {/* Number + program label */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.75rem" }}>
          <span
            style={{
              fontFamily: SANS,
              fontSize: "10px",
              fontWeight: 500,
              letterSpacing: "0.16em",
              color: ORANGE,
            }}
          >
            {program.number}
          </span>
          <div style={{ width: "18px", height: "1px", backgroundColor: BORDER }} />
          <span
            style={{
              fontFamily: SANS,
              fontSize: "10px",
              fontWeight: 600,
              letterSpacing: "0.2em",
              color: NAVY,
              textTransform: "uppercase",
            }}
          >
            {program.program}
          </span>
        </div>

        {/* Title */}
        <h3
          style={{
            fontFamily: DISPLAY,
            fontSize: "1.3125rem",
            fontWeight: 500,
            lineHeight: 1.38,
            color: hovered ? CHARCOAL : "#26211C",
            transition: "color 0.3s ease",
            margin: 0,
            letterSpacing: "-0.01em",
          }}
        >
          {program.title}
        </h3>

        {/* Spacer */}
        <div style={{ flex: 1, minHeight: "1.5rem" }} />

        {/* CTA */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            paddingTop: "1.125rem",
            borderTop: `1px solid ${BORDER}`,
          }}
        >
          <span
            style={{
              fontFamily: SANS,
              fontSize: "10.5px",
              fontWeight: 600,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: hovered ? ORANGE : MUTED,
              transition: "color 0.3s ease",
            }}
          >
            Explore Program
          </span>
          <span
            aria-hidden="true"
            style={{
              color: ORANGE,
              fontSize: "13px",
              transform: hovered ? "translateX(6px)" : "translateX(0)",
              transition: "transform 0.4s cubic-bezier(0.16,1,0.3,1)",
              display: "inline-block",
              lineHeight: 1,
            }}
          >
            →
          </span>
        </div>
      </div>
    </Link>
  );
}

export default function CoursesOverview() {
  return (
    <div style={{ backgroundColor: IVORY, fontFamily: SANS }}>
      <section className="pathways-section" style={{ maxWidth: "1240px", margin: "0 auto", padding: "6.5rem 2.5rem 7rem" }}>
        {/* Section introduction — centered */}
        <div style={{ textAlign: "center", marginBottom: "5rem" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1rem", marginBottom: "2rem" }}>
            <div style={{ width: "40px", height: "1px", backgroundColor: ORANGE }} />
            <span
              style={{
                fontFamily: SANS,
                fontSize: "10px",
                fontWeight: 600,
                letterSpacing: "0.22em",
                color: ORANGE,
                textTransform: "uppercase",
              }}
            >
              Academic Pathways
            </span>
            <div style={{ width: "40px", height: "1px", backgroundColor: ORANGE }} />
          </div>

          <h2
            style={{
              fontFamily: DISPLAY,
              fontSize: "clamp(2.25rem, 4vw, 3.25rem)",
              fontWeight: 400,
              lineHeight: 1.15,
              color: NAVY,
              letterSpacing: "-0.015em",
              margin: "0 0 1.5rem",
              maxWidth: "640px",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            Choose Your Path to Success
          </h2>

          <p
            style={{
              fontFamily: SANS,
              fontSize: "15px",
              fontWeight: 300,
              lineHeight: 1.85,
              color: MUTED,
              maxWidth: "500px",
              marginLeft: "auto",
              marginRight: "auto",
              margin: 0,
            }}
          >
            Discover structured academic programs designed to build strong foundations and
            prepare students for excellence in NEET, JEE and future careers.
          </p>
        </div>

        {/* Top border of panel grid */}
        <div style={{ height: "1px", backgroundColor: BORDER }} />

        {/* Three pathway panels */}
        <div
          className="pathway-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            border: `1px solid ${BORDER}`,
            borderTop: "none",
          }}
        >
          {PROGRAMS.map((prog, i) => (
            <PathwayPanel key={prog.number} program={prog} isLast={i === PROGRAMS.length - 1} />
          ))}
        </div>

        {/* Institutional signature */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingTop: "1.75rem",
            borderTop: `1px solid ${BORDER}`,
          }}
        >
          <span
            style={{
              fontFamily: SANS,
              fontSize: "9.5px",
              fontWeight: 500,
              letterSpacing: "0.18em",
              color: MUTED,
              textTransform: "uppercase",
            }}
          >
            Sir M Vishweshwarayya NEET | JEE Academy
          </span>
          <span
            style={{
              fontFamily: SANS,
              fontSize: "9.5px",
              fontWeight: 400,
              letterSpacing: "0.14em",
              color: MUTED,
            }}
          >
            Three Pathways · One Institution
          </span>
        </div>
      </section>

      <style>{`
        @media (max-width: 860px) {
          .pathway-grid {
            grid-template-columns: 1fr !important;
          }
          .pathway-panel {
            border-right: none !important;
            border-bottom: 1px solid ${BORDER};
          }
          .pathway-panel:last-child {
            border-bottom: none;
          }
        }
        @media (max-width: 600px) {
          .pathways-section {
            padding: 4rem 1.25rem 5rem !important;
          }
        }
      `}</style>
    </div>
  );
}
