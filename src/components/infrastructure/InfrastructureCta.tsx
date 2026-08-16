import Link from "next/link";
import { PRIMARY_CTA_HREF, PRIMARY_CTA_LABEL } from "@/config/nav";

const NAVY = "#0c1a2e";
const IVORY = "#f4efe5";
const IVORY_MUTED = "#d8d0c3";
const GOLD = "#b8933c";

const DISPLAY = "var(--font-playfair-display), Georgia, serif";
const SANS = "var(--font-inter), sans-serif";
const MONO = "var(--font-dm-mono), 'Courier New', monospace";

export default function InfrastructureCta() {
  return (
    <section style={{ position: "relative", backgroundColor: NAVY, overflow: "hidden" }}>
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.035,
          backgroundImage:
            `linear-gradient(to right, ${IVORY} 1px, transparent 1px), linear-gradient(to bottom, ${IVORY} 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
        }}
      />

      <div className="infra-cta-inner" style={{ position: "relative", maxWidth: "1152px", margin: "0 auto", padding: "5rem 1.5rem" }}>
        <div className="infra-cta-grid" style={{ display: "grid", gridTemplateColumns: "1fr", gap: "3rem", alignItems: "center" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "2rem" }}>
              <div style={{ width: "20px", height: "1px", backgroundColor: GOLD }} />
              <span style={{ fontFamily: MONO, fontSize: "10px", letterSpacing: "0.3em", color: GOLD, textTransform: "uppercase" }}>
                Admissions
              </span>
            </div>
            <h2
              style={{
                fontFamily: DISPLAY,
                lineHeight: 1.05,
                color: IVORY,
                fontSize: "clamp(1.75rem, 3.5vw, 3rem)",
                fontWeight: 500,
                margin: "0 0 1.5rem",
              }}
            >
              Ready to Experience
              <br />
              <span style={{ fontStyle: "italic", fontWeight: 400, color: IVORY_MUTED }}>the Environment?</span>
            </h2>
            <p style={{ fontFamily: SANS, fontSize: "0.9375rem", lineHeight: 1.7, color: IVORY_MUTED, maxWidth: "32rem", margin: 0 }}>
              Speak with our admissions team to learn more about our academic
              programs, campus and student facilities.
            </p>
          </div>

          <div className="infra-cta-action" style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "1rem" }}>
            <Link
              href={PRIMARY_CTA_HREF}
              className="infra-cta-button"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.75rem",
                border: "1px solid rgba(180,165,140,0.4)",
                padding: "1rem 1.75rem",
                color: IVORY,
                textDecoration: "none",
                transition: "background-color 0.3s, border-color 0.3s",
              }}
            >
              <span style={{ fontFamily: MONO, fontSize: "11px", letterSpacing: "0.25em", textTransform: "uppercase" }}>
                {PRIMARY_CTA_LABEL}
              </span>
              <span aria-hidden="true">→</span>
            </Link>
            <span style={{ fontFamily: MONO, fontSize: "9px", letterSpacing: "0.15em", color: "rgba(180,165,140,0.4)", textTransform: "uppercase" }}>
              Sir M Vishweshwarayya
            </span>
          </div>
        </div>
      </div>

      <style>{`
        .infra-cta-button:hover {
          background-color: ${GOLD} !important;
          border-color: ${GOLD} !important;
        }
        @media (min-width: 768px) {
          .infra-cta-inner { padding-left: 3rem !important; padding-right: 3rem !important; }
        }
        @media (min-width: 1024px) {
          .infra-cta-inner { padding-left: 4rem !important; padding-right: 4rem !important; }
          .infra-cta-grid { grid-template-columns: 1fr auto !important; gap: 3rem !important; }
          .infra-cta-action { align-items: flex-end !important; }
        }
      `}</style>
    </section>
  );
}
