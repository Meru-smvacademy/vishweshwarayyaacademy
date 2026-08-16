import { INFRASTRUCTURE_AREAS } from "@/content/infrastructure";

const NAVY = "#0c1a2e";
const IVORY = "#f4efe5";
const GOLD = "#b8933c";

const DISPLAY = "var(--font-playfair-display), Georgia, serif";
const MONO = "var(--font-dm-mono), 'Courier New', monospace";

export default function InfrastructureOverview() {
  return (
    <section style={{ backgroundColor: IVORY, borderBottom: "1px solid rgba(12,26,46,0.12)" }}>
      <div className="infra-overview-inner" style={{ maxWidth: "1152px", margin: "0 auto", padding: "5rem 1.5rem" }}>
        <div className="infra-overview-heading" style={{ display: "grid", gridTemplateColumns: "1fr", gap: "2rem", marginBottom: "4rem" }}>
          <div>
            <h2
              style={{
                fontFamily: DISPLAY,
                lineHeight: 0.95,
                color: NAVY,
                fontSize: "clamp(2rem, 4.5vw, 3.75rem)",
                fontWeight: 500,
                letterSpacing: "-0.01em",
                margin: 0,
              }}
            >
              Six Spaces.
              <br />
              <span style={{ fontStyle: "italic", fontWeight: 400 }}>One Learning Environment.</span>
            </h2>
          </div>
          <div>
            <span style={{ fontFamily: MONO, fontSize: "9px", letterSpacing: "0.3em", color: "rgba(12,26,46,0.35)", textTransform: "uppercase" }}>
              Infrastructure Overview
            </span>
          </div>
        </div>

        <div className="infra-areas-grid" style={{ display: "grid", gridTemplateColumns: "1fr", gap: 0 }}>
          {INFRASTRUCTURE_AREAS.map((area, i) => (
            <div
              key={area.num}
              className="infra-area-row"
              style={{
                display: "flex",
                alignItems: "baseline",
                gap: "1.25rem",
                padding: "1.25rem 0",
                borderBottom: "1px solid rgba(12,26,46,0.1)",
                borderRight: i % 3 !== 2 ? "1px solid rgba(12,26,46,0.08)" : undefined,
                paddingRight: "2rem",
                paddingLeft: i % 3 !== 0 ? "2rem" : undefined,
              }}
            >
              <span style={{ fontFamily: MONO, fontSize: "12px", letterSpacing: "0.2em", color: GOLD, flexShrink: 0, lineHeight: 1 }}>
                {area.num}
              </span>
              <span
                style={{
                  fontFamily: DISPLAY,
                  fontSize: "1rem",
                  fontWeight: 500,
                  letterSpacing: "0.06em",
                  color: NAVY,
                  textTransform: "uppercase",
                }}
              >
                {area.title}
              </span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .infra-overview-inner { padding-left: 3rem !important; padding-right: 3rem !important; }
          .infra-areas-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (min-width: 1024px) {
          .infra-overview-inner { padding-left: 4rem !important; padding-right: 4rem !important; }
          .infra-overview-heading { grid-template-columns: 1fr auto !important; align-items: start !important; }
          .infra-areas-grid { grid-template-columns: 1fr 1fr 1fr !important; }
        }
      `}</style>
    </section>
  );
}
