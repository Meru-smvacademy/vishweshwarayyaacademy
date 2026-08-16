import Link from "next/link";
import { PRIMARY_CTA_HREF } from "@/config/nav";

const CREAM = "#f0e9dc";
const INK = "#0b0e1a";

const DISPLAY = "var(--font-playfair-display), serif";
const BODY = "var(--font-inter), sans-serif";

export default function HostelFinalCtaSection() {
  return (
    <section
      style={{
        background: INK,
        fontFamily: BODY,
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E\")",
          backgroundRepeat: "repeat",
          backgroundSize: "200px 200px",
          opacity: 0.035,
          pointerEvents: "none",
        }}
      />

      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 80% 70% at 50% 50%, transparent 40%, rgba(6,8,18,0.55) 100%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          maxWidth: "860px",
          margin: "0 auto",
          padding: "clamp(4rem, 8vw, 7rem) clamp(1.5rem, 5vw, 3rem)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <div style={{ width: "40px", height: "1px", background: "rgba(210,195,170,0.35)", marginBottom: "2.75rem" }} />

        <p
          style={{
            fontFamily: BODY,
            fontWeight: 500,
            fontSize: "clamp(0.6rem, 1.2vw, 0.68rem)",
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            color: "rgba(210,195,170,0.5)",
            marginBottom: "2.25rem",
          }}
        >
          Academy Hostel
        </p>

        <h2
          style={{
            fontFamily: DISPLAY,
            fontWeight: 500,
            fontSize: "clamp(2.5rem, 6vw, 4.25rem)",
            lineHeight: 1.08,
            letterSpacing: "-0.01em",
            color: CREAM,
            margin: "0 0 2rem 0",
          }}
        >
          A Comfortable Stay.
          <br />
          <span style={{ fontStyle: "italic", color: "#e8dece" }}>A Focused Journey.</span>
        </h2>

        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "2.25rem" }}>
          <div style={{ width: "32px", height: "1px", background: "rgba(210,195,170,0.2)" }} />
          <div style={{ width: "4px", height: "4px", borderRadius: "50%", background: "rgba(210,195,170,0.3)" }} />
          <div style={{ width: "32px", height: "1px", background: "rgba(210,195,170,0.2)" }} />
        </div>

        <p
          style={{
            fontFamily: BODY,
            fontWeight: 300,
            fontSize: "clamp(0.95rem, 1.8vw, 1.05rem)",
            lineHeight: 1.75,
            color: "rgba(230,220,205,0.55)",
            maxWidth: "480px",
            margin: "0 auto 3.75rem auto",
          }}
        >
          Give students a safe and supportive place to live while they focus on their academic
          journey.
        </p>

        <Link
          href={PRIMARY_CTA_HREF}
          className="hostel-final-cta"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.6em",
            fontFamily: BODY,
            fontWeight: 500,
            fontSize: "clamp(0.7rem, 1.3vw, 0.75rem)",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: CREAM,
            background: "transparent",
            border: "1px solid rgba(240,233,220,0.4)",
            padding: "1em 2.4em",
            transition: "color 0.32s ease, background 0.32s ease, border-color 0.32s ease",
          }}
        >
          Hostel Enquiry
          <span className="hostel-final-cta-arrow" style={{ display: "inline-block", transition: "transform 0.28s ease" }}>
            →
          </span>
        </Link>

        <div style={{ marginTop: "4.5rem" }}>
          <div style={{ width: "40px", height: "1px", background: "rgba(210,195,170,0.15)", margin: "0 auto" }} />
        </div>
      </div>

      <style>{`
        .hostel-final-cta:hover {
          color: ${INK} !important;
          background: ${CREAM} !important;
          border-color: ${CREAM} !important;
        }
        .hostel-final-cta:hover .hostel-final-cta-arrow {
          transform: translateX(3px);
        }
      `}</style>
    </section>
  );
}
