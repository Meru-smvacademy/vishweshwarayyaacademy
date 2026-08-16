"use client";

import { useState, type CSSProperties } from "react";

const DISPLAY = "var(--font-dm-serif-display), Georgia, serif";
const SANS = "var(--font-inter), sans-serif";

const GROUND = "#0c0b09";
const INK = "#f0ebe2";
const ACCENT = "#c4a46b";

type PhotoTileProps = {
  label: string;
  src?: string;
  alt?: string;
  style?: CSSProperties;
  priority?: boolean;
};

function PhotoTile({ label, src, alt, style = {}, priority = false }: PhotoTileProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div style={{ position: "relative", overflow: "hidden", background: "#1c1a16", ...style }}>
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.07'/%3E%3C/svg%3E\")",
          backgroundSize: "200px 200px",
          zIndex: 1,
          pointerEvents: "none",
        }}
      />

      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt ?? label}
          loading={priority ? "eager" : "lazy"}
          onLoad={() => setLoaded(true)}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: loaded ? 1 : 0,
            transition: "opacity 0.6s ease",
            zIndex: 2,
          }}
        />
      ) : (
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", zIndex: 2 }}>
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage:
                "repeating-linear-gradient(-45deg, transparent, transparent 18px, rgba(240,235,226,0.03) 18px, rgba(240,235,226,0.03) 19px)",
            }}
          />
          <span
            style={{
              fontFamily: SANS,
              fontSize: "9px",
              fontWeight: 500,
              letterSpacing: "0.18em",
              color: "rgba(240,235,226,0.22)",
              textTransform: "uppercase",
              userSelect: "none",
              position: "relative",
              zIndex: 1,
              textAlign: "center",
              padding: "0 1rem",
              lineHeight: 1.6,
            }}
          >
            Academy
            <br />
            Photograph
          </span>
        </div>
      )}

      <span
        style={{
          position: "absolute",
          top: "12px",
          left: "14px",
          fontFamily: SANS,
          fontSize: "8px",
          fontWeight: 600,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "rgba(196,164,107,0.55)",
          zIndex: 10,
          pointerEvents: "none",
        }}
      >
        {label}
      </span>

      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse at center, transparent 55%, rgba(12,11,9,0.55) 100%)",
          zIndex: 3,
          pointerEvents: "none",
        }}
      />
    </div>
  );
}

export default function GalleryHero() {
  return (
    <section
      className="gallery-hero"
      style={{
        fontFamily: SANS,
        background: GROUND,
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        overflowX: "clip",
        overflowY: "visible",
      }}
    >
      <div
        className="gallery-hero-grid"
        style={{
          flex: 1,
          display: "grid",
          gridTemplateColumns: "clamp(260px, 30%, 420px) 1fr",
          gridTemplateRows: "auto 1fr",
          gap: 0,
        }}
      >
        {/* Left column: headline + meta */}
        <div
          style={{
            gridColumn: "1",
            gridRow: "1 / 3",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "clamp(2.5rem, 5vw, 4.5rem) clamp(1.5rem, 4vw, 3.5rem)",
            borderRight: "1px solid rgba(240,235,226,0.07)",
            overflow: "visible",
            minWidth: 0,
          }}
        >
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "clamp(2rem, 4vw, 3.5rem)" }}>
              <span style={{ width: "2rem", height: "1px", background: ACCENT, display: "inline-block" }} />
              <span
                style={{
                  fontFamily: SANS,
                  fontSize: "0.65rem",
                  fontWeight: 600,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: ACCENT,
                }}
              >
                Gallery
              </span>
            </div>

            <h1
              style={{
                fontFamily: DISPLAY,
                fontSize: "clamp(1.4rem, 2.6vw, 2.8rem)",
                fontWeight: 400,
                lineHeight: 1.08,
                color: INK,
                margin: 0,
                letterSpacing: "-0.01em",
                whiteSpace: "nowrap",
              }}
            >
              Life at
              <br />
              <em style={{ fontStyle: "italic", color: ACCENT, display: "inline-block" }}>Vishweshwarayya</em>
            </h1>

            <div style={{ width: "100%", height: "1px", background: "rgba(240,235,226,0.1)", margin: "clamp(1.5rem, 3vw, 2.5rem) 0" }} />

            <p
              style={{
                fontFamily: SANS,
                fontSize: "clamp(0.8rem, 1.1vw, 0.92rem)",
                fontWeight: 300,
                lineHeight: 1.75,
                color: "rgba(240,235,226,0.55)",
                margin: 0,
                maxWidth: "30ch",
              }}
            >
              A glimpse into our classrooms, campus, students and the moments that make the
              Academy more than a place to study.
            </p>
          </div>

          <div style={{ marginTop: "auto", paddingTop: "3rem" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {["Real Students", "Real Campus", "Real Moments"].map((item, i) => (
                <div key={item} style={{ display: "flex", alignItems: "center", gap: "0.65rem" }}>
                  <span style={{ fontFamily: SANS, fontSize: "8px", color: ACCENT, opacity: 1 - i * 0.2 }}>●</span>
                  <span
                    style={{
                      fontFamily: SANS,
                      fontSize: "0.65rem",
                      fontWeight: 500,
                      letterSpacing: "0.16em",
                      textTransform: "uppercase",
                      color: `rgba(240,235,226,${0.55 - i * 0.1})`,
                    }}
                  >
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right column: mosaic grid */}
        <div
          className="mosaic-grid"
          style={{
            gridColumn: "2",
            gridRow: "1 / 3",
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gridTemplateRows: "clamp(180px, 28vh, 280px) clamp(200px, 30vh, 320px) clamp(160px, 20vh, 220px)",
            gap: "2px",
            padding: "2px",
            alignItems: "stretch",
          }}
        >
          <PhotoTile label="01 — Classrooms" priority style={{ gridColumn: "1 / 3", gridRow: "1" }} />
          <PhotoTile label="02 — Students" style={{ gridColumn: "3", gridRow: "1 / 3" }} />
          <PhotoTile label="03 — Campus" style={{ gridColumn: "1", gridRow: "2" }} />
          <PhotoTile label="04 — Lab" style={{ gridColumn: "2", gridRow: "2" }} />
          <PhotoTile label="05 — Library" style={{ gridColumn: "1 / 3", gridRow: "3" }} />
          <PhotoTile label="06 — Events" style={{ gridColumn: "3", gridRow: "3" }} />
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .gallery-hero-grid {
            grid-template-columns: 1fr !important;
            grid-template-rows: auto auto !important;
          }
          .gallery-hero-grid > :first-child {
            grid-column: 1 !important;
            grid-row: 1 !important;
            border-right: none !important;
            border-bottom: 1px solid rgba(240,235,226,0.07);
            padding: 2.5rem 1.75rem !important;
            min-height: unset;
          }
          .gallery-hero-grid > :last-child {
            grid-column: 1 !important;
            grid-row: 2 !important;
          }
          .mosaic-grid {
            grid-template-columns: 1fr 1fr !important;
            grid-template-rows: 200px 200px 160px !important;
          }
          .mosaic-grid > :nth-child(1) { grid-column: 1 / 3 !important; grid-row: 1 !important; }
          .mosaic-grid > :nth-child(2) { grid-column: 1 !important;     grid-row: 2 !important; }
          .mosaic-grid > :nth-child(3) { grid-column: 2 !important;     grid-row: 2 !important; }
          .mosaic-grid > :nth-child(4) { grid-column: 1 !important;     grid-row: 3 !important; }
          .mosaic-grid > :nth-child(5) { grid-column: 2 !important;     grid-row: 3 !important; }
          .mosaic-grid > :nth-child(6) { display: none !important; }
        }

        @media (max-width: 560px) {
          .mosaic-grid {
            grid-template-columns: 1fr 1fr !important;
            grid-template-rows: 160px 160px 130px !important;
          }
        }
      `}</style>
    </section>
  );
}
