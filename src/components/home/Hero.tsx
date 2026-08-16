import Image from "next/image";
import { PRIMARY_CTA_HREF } from "@/config/nav";

const NAVY = "#0d2249";
const ORANGE = "#e8640c";
const ORANGE_LIGHT = "#f97d2a";
const BG = "#f8fbff";

const DISPLAY = "var(--font-playfair-display), Georgia, serif";
const BODY = "var(--font-poppins), system-ui, sans-serif";

const LOCATIONS = ["Lingasuguru", "Sindhanur"];

function PinIcon() {
  return (
    <svg width="7" height="9" viewBox="0 0 7 9" fill="none" aria-hidden="true">
      <path
        d="M3.5 0C1.567 0 0 1.567 0 3.5c0 2.5 3.5 5.5 3.5 5.5S7 6 7 3.5C7 1.567 5.433 0 3.5 0Zm0 4.75a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5Z"
        fill={ORANGE}
      />
    </svg>
  );
}

export default function Hero() {
  return (
    <section style={{ position: "relative", overflow: "hidden", backgroundColor: BG, fontFamily: BODY }}>
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "radial-gradient(circle at center, rgba(13,34,73,0.13) 1.2px, transparent 1.4px)",
          backgroundSize: "22px 22px",
          zIndex: 0,
          pointerEvents: "none",
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: -180,
          left: -180,
          width: 520,
          height: 520,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(13,34,73,0.06) 0%, transparent 70%)",
          zIndex: 0,
          pointerEvents: "none",
        }}
      />

      <div
        className="hero-grid"
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: 1280,
          margin: "0 auto",
          padding: "0 2rem",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          alignItems: "center",
          gap: "3rem",
        }}
      >
        {/* Left: text content */}
        <div style={{ padding: "4rem 0" }}>
          <div style={{ display: "flex", gap: "0.6rem", marginBottom: "2rem", flexWrap: "wrap" }}>
            {LOCATIONS.map((loc) => (
              <span
                key={loc}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.4rem",
                  backgroundColor: "rgba(13,34,73,0.06)",
                  border: "1px solid rgba(13,34,73,0.14)",
                  color: NAVY,
                  fontSize: "0.68rem",
                  fontWeight: 600,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  padding: "0.32rem 0.8rem",
                  borderRadius: 3,
                }}
              >
                <PinIcon />
                {loc}
              </span>
            ))}
          </div>

          <h1
            style={{
              fontFamily: DISPLAY,
              fontSize: "clamp(2.4rem, 4vw, 3.5rem)",
              fontWeight: 800,
              color: NAVY,
              lineHeight: 1.12,
              margin: "0 0 1.4rem",
              letterSpacing: "-0.01em",
            }}
          >
            Where Discipline
            <br />
            <span style={{ color: ORANGE }}>Becomes Rank.</span>
          </h1>

          <div style={{ display: "flex", gap: 5, marginBottom: "1.6rem", alignItems: "center" }}>
            <div style={{ width: 44, height: 3, backgroundColor: ORANGE, borderRadius: 2 }} />
            <div style={{ width: 8, height: 3, backgroundColor: "rgba(232,100,12,0.28)", borderRadius: 2 }} />
          </div>

          <p
            style={{
              fontSize: "clamp(0.875rem, 1.2vw, 1rem)",
              color: "#3a4f72",
              lineHeight: 1.78,
              margin: "0 0 2.6rem",
              maxWidth: 510,
              fontWeight: 400,
            }}
          >
            Structured coaching, experienced faculty, personalised mentoring, and consistent
            practice designed to help every student excel in{" "}
            <strong style={{ color: NAVY, fontWeight: 600 }}>NEET, JEE, and KCET.</strong>
          </p>

          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <a
              href={PRIMARY_CTA_HREF}
              className="hero-cta-primary"
              style={{
                display: "inline-block",
                backgroundColor: ORANGE,
                color: "#ffffff",
                fontSize: "0.84rem",
                fontWeight: 600,
                padding: "0.85rem 2rem",
                borderRadius: 4,
                textDecoration: "none",
                letterSpacing: "0.04em",
                boxShadow: "0 4px 16px rgba(232,100,12,0.26)",
                transition: "background-color 0.18s, transform 0.15s, box-shadow 0.18s",
              }}
            >
              Admission Enquiry
            </a>
            <a
              href="/courses"
              className="hero-cta-secondary"
              style={{
                display: "inline-block",
                backgroundColor: "transparent",
                color: NAVY,
                fontSize: "0.84rem",
                fontWeight: 600,
                padding: "0.85rem 2rem",
                borderRadius: 4,
                textDecoration: "none",
                letterSpacing: "0.04em",
                border: `1.5px solid ${NAVY}`,
                transition: "background-color 0.18s, color 0.18s, transform 0.15s",
              }}
            >
              Explore Academic Pathways
            </a>
          </div>
        </div>

        {/* Right: campus image */}
        <div className="hero-image-col" style={{ position: "relative", minHeight: 560, display: "flex", alignItems: "center" }}>
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              bottom: 0,
              width: "38%",
              background: `linear-gradient(to right, ${BG} 0%, rgba(248,251,255,0) 100%)`,
              zIndex: 2,
              pointerEvents: "none",
            }}
          />
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "28%",
              background: `linear-gradient(to top, ${BG} 0%, rgba(248,251,255,0) 100%)`,
              zIndex: 2,
              pointerEvents: "none",
            }}
          />

          <div
            className="hero-image-frame"
            style={{
              width: "100%",
              height: 560,
              borderRadius: 12,
              overflow: "hidden",
              backgroundColor: "#c5d0e0",
              boxShadow: "0 24px 64px rgba(13,34,73,0.16), 0 4px 16px rgba(13,34,73,0.09)",
              position: "relative",
            }}
          >
            <Image
              src="https://images.unsplash.com/photo-1770967004881-5e8795cb5fde?w=1200&h=900&fit=crop&auto=format"
              alt="Sir M Vishweshwarayya NEET JEE Academy campus building"
              fill
              priority
              sizes="(max-width: 900px) 100vw, 50vw"
              style={{ objectFit: "cover", objectPosition: "center top" }}
            />

            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(180deg, rgba(13,34,73,0.04) 0%, rgba(13,34,73,0.24) 100%)",
              }}
            />

            <div
              style={{
                position: "absolute",
                bottom: 28,
                left: 28,
                zIndex: 3,
                backgroundColor: "rgba(9,22,48,0.87)",
                backdropFilter: "blur(10px)",
                WebkitBackdropFilter: "blur(10px)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderLeft: `3px solid ${ORANGE}`,
                padding: "0.75rem 1.1rem",
                borderRadius: 5,
              }}
            >
              <div style={{ fontSize: "0.46rem", fontWeight: 700, color: ORANGE_LIGHT, letterSpacing: "0.22em", textTransform: "uppercase", lineHeight: 1, marginBottom: 2 }}>
                Sir M
              </div>
              <div style={{ fontFamily: DISPLAY, fontSize: "0.95rem", fontWeight: 700, color: "#ffffff", letterSpacing: "0.06em", lineHeight: 1.1 }}>
                VISHWESHWARAYYA
              </div>
              <div style={{ fontSize: "0.48rem", fontWeight: 600, color: ORANGE_LIGHT, letterSpacing: "0.2em", textTransform: "uppercase", marginTop: 4, opacity: 0.9 }}>
                NEET | JEE ACADEMY
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 1,
          background: "linear-gradient(to right, transparent, rgba(13,34,73,0.1) 30%, rgba(13,34,73,0.1) 70%, transparent)",
        }}
      />

      <style>{`
        .hero-cta-primary:hover {
          background-color: #c4530a !important;
          transform: translateY(-1px);
          box-shadow: 0 6px 22px rgba(232,100,12,0.38) !important;
        }
        .hero-cta-secondary:hover {
          background-color: ${NAVY} !important;
          color: #ffffff !important;
          transform: translateY(-1px);
        }
        @media (max-width: 900px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            padding-top: 2rem !important;
          }
          .hero-image-col {
            min-height: 300px !important;
          }
          .hero-image-frame {
            height: 300px !important;
          }
        }
      `}</style>
    </section>
  );
}
