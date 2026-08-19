"use client";

import { useState, type CSSProperties } from "react";

const SANS = "var(--font-inter), sans-serif";

export type GalleryHeroTileProps = {
  label: string;
  src?: string;
  alt?: string;
  style?: CSSProperties;
  priority?: boolean;
};

export default function GalleryHeroTile({ label, src, alt, style = {}, priority = false }: GalleryHeroTileProps) {
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
