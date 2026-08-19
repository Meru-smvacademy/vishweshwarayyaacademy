import Link from "next/link";
import { PRIMARY_CTA_HREF } from "@/config/nav";

const GROUND = "#0D1117";
const CREAM = "#F5F0E8";
const AMBER = "#C8963E";
const MUTED = "#8A8A6F";

const DISPLAY = "var(--font-fraunces), Georgia, serif";
const BODY = "var(--font-dm-sans), system-ui, sans-serif";

const TAGS = ["Safety", "Discipline", "Focus"] as const;

export default function HostelHero() {
  return (
    <section
      className="hostel-hero grid grid-cols-1 min-[901px]:grid-cols-2"
      style={{
        minHeight: "100vh",
        position: "relative",
        backgroundColor: GROUND,
        overflow: "hidden",
      }}
    >
      {/* Left panel */}
      <div
        className="hostel-hero-left flex flex-col justify-between"
        style={{
          padding: "clamp(2.5rem, 5vw, 5rem) clamp(2rem, 5vw, 5rem)",
          position: "relative",
          zIndex: 2,
        }}
      >
        <header style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
          <span
            style={{
              fontFamily: BODY,
              fontSize: "0.5rem",
              fontWeight: 500,
              letterSpacing: "0.24em",
              textTransform: "uppercase",
              color: MUTED,
            }}
          >
            Sir M
          </span>
          <span
            style={{
              fontFamily: BODY,
              fontSize: "0.6875rem",
              fontWeight: 500,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: AMBER,
            }}
          >
            Vishweshwarayya
          </span>
          <span
            style={{
              fontFamily: BODY,
              fontSize: "0.6875rem",
              fontWeight: 500,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: MUTED,
            }}
          >
            NEET | JEE Academy
          </span>
        </header>

        <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
          <div style={{ width: "2.5rem", height: "1px", backgroundColor: AMBER, opacity: 0.7 }} />

          <div>
            <h1
              style={{
                fontFamily: DISPLAY,
                fontSize: "clamp(2.75rem, 5.5vw, 5rem)",
                fontWeight: 300,
                lineHeight: 1.08,
                color: CREAM,
                letterSpacing: "-0.01em",
                margin: 0,
                textTransform: "uppercase",
              }}
            >
              A Place to Live.
              <br />
              <em style={{ fontStyle: "italic", color: AMBER, fontWeight: 300 }}>A Space to Grow.</em>
            </h1>
          </div>

          <p
            style={{
              fontFamily: BODY,
              fontSize: "clamp(0.875rem, 1.25vw, 1.0625rem)",
              fontWeight: 300,
              lineHeight: 1.75,
              color: MUTED,
              margin: 0,
              maxWidth: "38ch",
            }}
          >
            A safe, disciplined and supportive residential environment designed to help students
            stay focused on their academic journey.
          </p>

          <div>
            <Link
              href={PRIMARY_CTA_HREF}
              className="hostel-hero-cta"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.75rem",
                fontFamily: BODY,
                fontSize: "0.75rem",
                fontWeight: 500,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: CREAM,
                textDecoration: "none",
                borderBottom: "1px solid rgba(200,150,62,0.5)",
                paddingBottom: "0.5rem",
                transition: "color 0.25s ease, border-color 0.25s ease",
              }}
            >
              Hostel Enquiry
              <span style={{ fontSize: "1rem", lineHeight: 1, display: "inline-block" }}>→</span>
            </Link>
          </div>
        </div>

        <footer style={{ display: "flex", gap: "0.75rem", alignItems: "center", flexWrap: "wrap" }}>
          {TAGS.map((tag) => (
            <span
              key={tag}
              style={{
                fontFamily: BODY,
                fontSize: "0.625rem",
                fontWeight: 500,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: AMBER,
                border: "1px solid rgba(200,150,62,0.35)",
                borderRadius: "2px",
                padding: "0.35rem 0.75rem",
                background: "rgba(200,150,62,0.07)",
                boxShadow: "0 0 12px rgba(200,150,62,0.08)",
              }}
            >
              {tag}
            </span>
          ))}
        </footer>
      </div>

      {/* Right panel — Hostel view. No real hostel photograph is available yet; this is a
          deliberate, honest placeholder (matching the pattern used for infrastructure and
          gallery items awaiting photos) rather than stock imagery presented as if it were
          the real hostel. */}
      <div
        className="hostel-hero-image relative"
        style={{ overflow: "hidden", backgroundColor: GROUND, display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <svg
          aria-hidden="true"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          preserveAspectRatio="none"
        >
          <defs>
            <pattern id="hostel-placeholder-grid" width="56" height="56" patternUnits="userSpaceOnUse">
              <path d="M 56 0 L 0 0 0 56" fill="none" stroke="rgba(200,150,62,0.08)" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hostel-placeholder-grid)" />
        </svg>

        <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem", padding: "0 2rem", textAlign: "center" }}>
          <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke={AMBER} strokeWidth="1.1" opacity={0.6}>
            <path d="M3 21V9.5L12 3l9 6.5V21" strokeLinejoin="round" />
            <path d="M8 21v-7h8v7" strokeLinejoin="round" />
          </svg>
          <span
            style={{
              fontFamily: BODY,
              fontSize: "0.6875rem",
              fontWeight: 500,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: AMBER,
              opacity: 0.75,
            }}
          >
            Hostel Photography
          </span>
          <span
            style={{
              fontFamily: BODY,
              fontSize: "0.6875rem",
              fontWeight: 400,
              letterSpacing: "0.04em",
              color: MUTED,
            }}
          >
            Real photographs coming soon.
          </span>
        </div>

        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to right, #0D1117 0%, rgba(13,17,23,0.35) 25%, rgba(13,17,23,0.1) 55%, transparent 100%)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to top, rgba(13,17,23,0.65) 0%, transparent 40%)",
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            position: "absolute",
            bottom: "clamp(1.5rem, 3vw, 2.5rem)",
            left: "clamp(1.5rem, 3vw, 2.5rem)",
            display: "flex",
            flexDirection: "column",
            gap: "0.35rem",
          }}
        >
          <span
            style={{
              fontFamily: BODY,
              fontSize: "0.5625rem",
              fontWeight: 500,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: AMBER,
            }}
          >
            Hostel View
          </span>
          <span
            style={{
              fontFamily: BODY,
              fontSize: "0.6875rem",
              fontWeight: 300,
              color: "rgba(245,240,232,0.5)",
              letterSpacing: "0.02em",
            }}
          >
            Your home away from home
          </span>
        </div>

        <div
          className="hidden min-[901px]:block"
          style={{
            position: "absolute",
            right: "clamp(1rem, 2vw, 2rem)",
            top: "50%",
            transform: "translateY(-50%) rotate(90deg)",
            transformOrigin: "center center",
            fontFamily: BODY,
            fontSize: "0.5625rem",
            fontWeight: 500,
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: "rgba(245,240,232,0.2)",
            whiteSpace: "nowrap",
          }}
        >
          Residential Life · Academic Excellence
        </div>
      </div>

      {/* Vertical hairline divider */}
      <div
        className="hidden min-[901px]:block"
        style={{
          position: "absolute",
          left: "50%",
          top: "10%",
          bottom: "10%",
          width: "1px",
          backgroundColor: "rgba(200,150,62,0.12)",
          pointerEvents: "none",
          zIndex: 3,
        }}
      />

      <style>{`
        .hostel-hero-cta:hover {
          color: ${AMBER} !important;
          border-color: ${AMBER} !important;
        }
        @media (max-width: 900px) {
          .hostel-hero {
            min-height: auto !important;
          }
          .hostel-hero-left {
            min-height: 65vh !important;
          }
          .hostel-hero-image {
            height: 40vw !important;
            min-height: 240px !important;
          }
        }
      `}</style>
    </section>
  );
}
