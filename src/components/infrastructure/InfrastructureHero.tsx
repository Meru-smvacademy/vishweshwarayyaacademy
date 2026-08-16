const NAVY = "#0c1a2e";
const IVORY = "#f4efe5";
const IVORY_MUTED = "#d8d0c3";
const GOLD = "#b8933c";

const DISPLAY = "var(--font-playfair-display), Georgia, serif";
const SANS = "var(--font-inter), sans-serif";
const MONO = "var(--font-dm-mono), 'Courier New', monospace";

export default function InfrastructureHero() {
  return (
    <section style={{ position: "relative", backgroundColor: NAVY, overflow: "hidden" }}>
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.04,
          backgroundImage:
            `linear-gradient(to right, ${IVORY} 1px, transparent 1px), linear-gradient(to bottom, ${IVORY} 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
        }}
      />
      <svg
        aria-hidden="true"
        style={{ position: "absolute", right: 0, top: 0, height: "100%", width: "50%", pointerEvents: "none" }}
        preserveAspectRatio="none"
        viewBox="0 0 400 600"
      >
        <line x1="400" y1="0" x2="0" y2="600" stroke="rgba(180,165,140,0.07)" strokeWidth="1" />
        <line x1="400" y1="80" x2="80" y2="600" stroke="rgba(180,165,140,0.05)" strokeWidth="0.5" />
      </svg>

      <div
        className="infra-hero-inner"
        style={{ position: "relative", maxWidth: "1152px", margin: "0 auto", padding: "5rem 1.5rem 0" }}
      >
        {/* Eyebrow */}
        <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "2.5rem" }}>
          <div style={{ width: "32px", height: "1px", backgroundColor: GOLD }} />
          <span style={{ fontFamily: MONO, fontSize: "10px", letterSpacing: "0.35em", color: GOLD, textTransform: "uppercase" }}>
            Our Infrastructure
          </span>
        </div>

        {/* Headline */}
        <div style={{ marginBottom: "2rem", maxWidth: "48rem" }}>
          <h1
            style={{
              fontFamily: DISPLAY,
              lineHeight: 1.05,
              color: IVORY,
              fontSize: "clamp(2.8rem, 6vw, 5.5rem)",
              fontWeight: 500,
              margin: 0,
            }}
          >
            Built for Focus.
            <br />
            <span style={{ fontStyle: "italic", fontWeight: 400 }}>Designed for Learning.</span>
          </h1>
        </div>

        {/* Supporting text + hero image row */}
        <div className="infra-hero-grid" style={{ display: "grid", gridTemplateColumns: "1fr", gap: "3rem", alignItems: "end" }}>
          <div style={{ paddingBottom: "3rem" }}>
            <p style={{ fontFamily: SANS, fontSize: "0.9375rem", lineHeight: 1.7, color: IVORY_MUTED, maxWidth: "24rem", margin: "0 0 2rem" }}>
              A purposeful academic environment that supports classroom
              learning, practical work, digital preparation and focused study.
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <div style={{ width: "20px", height: "1px", backgroundColor: GOLD, opacity: 0.6 }} />
              <span style={{ fontFamily: MONO, fontSize: "9px", letterSpacing: "0.2em", color: "rgba(180,165,140,0.5)", textTransform: "uppercase" }}>
                Sir M Vishweshwarayya
              </span>
            </div>
          </div>

          {/* Hero image area */}
          <div style={{ position: "relative" }}>
            <div style={{ position: "relative", backgroundColor: "#081120", overflow: "hidden", aspectRatio: "16 / 10" }}>
              <svg aria-hidden="true" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} preserveAspectRatio="none">
                <defs>
                  <pattern id="heroGrid" width="60" height="60" patternUnits="userSpaceOnUse">
                    <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(180,165,140,0.06)" strokeWidth="0.5" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#heroGrid)" />
                <rect x="10%" y="15%" width="80%" height="70%" fill="none" stroke="rgba(180,165,140,0.1)" strokeWidth="0.5" />
                <rect x="20%" y="25%" width="60%" height="50%" fill="none" stroke="rgba(180,165,140,0.07)" strokeWidth="0.5" />
                <line x1="50%" y1="10%" x2="50%" y2="90%" stroke="rgba(180,165,140,0.05)" strokeWidth="0.5" />
                <line x1="10%" y1="50%" x2="90%" y2="50%" stroke="rgba(180,165,140,0.05)" strokeWidth="0.5" />
              </svg>

              <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "0.75rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <div style={{ width: "32px", height: "1px", backgroundColor: "rgba(180,165,140,0.25)" }} />
                  <div style={{ width: "8px", height: "8px", border: "1px solid rgba(180,165,140,0.3)" }} />
                  <div style={{ width: "32px", height: "1px", backgroundColor: "rgba(180,165,140,0.25)" }} />
                </div>
                <span style={{ fontFamily: MONO, fontSize: "9px", letterSpacing: "0.3em", color: "rgba(180,165,140,0.3)", textTransform: "uppercase", marginTop: "0.25rem" }}>
                  Campus Photograph
                </span>
                <span style={{ fontFamily: MONO, fontSize: "9px", letterSpacing: "0.2em", color: "rgba(180,165,140,0.2)", textTransform: "uppercase" }}>
                  Image to be updated
                </span>
              </div>

              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: "0.75rem 1.25rem",
                  borderTop: "1px solid rgba(180,165,140,0.08)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <span style={{ fontFamily: MONO, fontSize: "9px", letterSpacing: "0.2em", color: "rgba(180,165,140,0.3)", textTransform: "uppercase" }}>
                  Sir M Vishweshwarayya — Campus
                </span>
                <div style={{ display: "flex", gap: "0.25rem" }}>
                  <div style={{ width: "4px", height: "4px", borderRadius: "9999px", backgroundColor: "rgba(180,165,140,0.2)" }} />
                  <div style={{ width: "4px", height: "4px", borderRadius: "9999px", backgroundColor: "rgba(184,147,60,0.4)" }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 1024px) {
          .infra-hero-grid {
            grid-template-columns: 1fr 1.8fr !important;
            gap: 4rem !important;
          }
        }
        @media (min-width: 768px) {
          .infra-hero-inner {
            padding-left: 3rem !important;
            padding-right: 3rem !important;
          }
        }
        @media (min-width: 1024px) {
          .infra-hero-inner {
            padding-left: 4rem !important;
            padding-right: 4rem !important;
          }
        }
      `}</style>
    </section>
  );
}
