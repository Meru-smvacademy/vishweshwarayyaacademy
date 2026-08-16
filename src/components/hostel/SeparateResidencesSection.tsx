const DISPLAY = "var(--font-dm-serif-display), Georgia, serif";
const SANS = "var(--font-dm-sans), system-ui, sans-serif";

function BoysPattern() {
  return (
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" style={{ position: "absolute", inset: 0 }} aria-hidden="true">
      <defs>
        <pattern id="boys-grid" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
          <rect x="0" y="0" width="32" height="32" fill="none" />
          <rect x="1" y="1" width="12" height="12" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="0.8" />
          <rect x="19" y="1" width="12" height="12" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="0.8" />
          <rect x="1" y="19" width="12" height="12" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="0.8" />
          <rect x="19" y="19" width="12" height="12" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="0.8" />
        </pattern>
        <pattern id="boys-windows" x="0" y="0" width="96" height="80" patternUnits="userSpaceOnUse">
          <rect x="8" y="12" width="16" height="22" rx="1" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="1" />
          <line x1="16" y1="12" x2="16" y2="34" stroke="rgba(255,255,255,0.1)" strokeWidth="0.6" />
          <line x1="8" y1="23" x2="24" y2="23" stroke="rgba(255,255,255,0.1)" strokeWidth="0.6" />
          <rect x="40" y="12" width="16" height="22" rx="1" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="1" />
          <line x1="48" y1="12" x2="48" y2="34" stroke="rgba(255,255,255,0.1)" strokeWidth="0.6" />
          <line x1="40" y1="23" x2="56" y2="23" stroke="rgba(255,255,255,0.1)" strokeWidth="0.6" />
          <rect x="72" y="12" width="16" height="22" rx="1" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="1" />
          <line x1="80" y1="12" x2="80" y2="34" stroke="rgba(255,255,255,0.1)" strokeWidth="0.6" />
          <line x1="72" y1="23" x2="88" y2="23" stroke="rgba(255,255,255,0.1)" strokeWidth="0.6" />
          <rect x="8" y="50" width="16" height="22" rx="1" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="1" />
          <line x1="16" y1="50" x2="16" y2="72" stroke="rgba(255,255,255,0.1)" strokeWidth="0.6" />
          <line x1="8" y1="61" x2="24" y2="61" stroke="rgba(255,255,255,0.1)" strokeWidth="0.6" />
          <rect x="40" y="50" width="16" height="22" rx="1" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="1" />
          <line x1="48" y1="50" x2="48" y2="72" stroke="rgba(255,255,255,0.1)" strokeWidth="0.6" />
          <line x1="40" y1="61" x2="56" y2="61" stroke="rgba(255,255,255,0.1)" strokeWidth="0.6" />
          <rect x="72" y="50" width="16" height="22" rx="1" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="1" />
          <line x1="80" y1="50" x2="80" y2="72" stroke="rgba(255,255,255,0.1)" strokeWidth="0.6" />
          <line x1="72" y1="61" x2="88" y2="61" stroke="rgba(255,255,255,0.1)" strokeWidth="0.6" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#boys-grid)" />
      <rect width="100%" height="100%" fill="url(#boys-windows)" />
    </svg>
  );
}

function GirlsPattern() {
  return (
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" style={{ position: "absolute", inset: 0 }} aria-hidden="true">
      <defs>
        <pattern id="girls-arch" x="0" y="0" width="64" height="80" patternUnits="userSpaceOnUse">
          <rect x="8" y="28" width="20" height="44" rx="10" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
          <rect x="36" y="28" width="20" height="44" rx="10" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
          <line x1="8" y1="60" x2="28" y2="60" stroke="rgba(255,255,255,0.08)" strokeWidth="0.6" />
          <line x1="36" y1="60" x2="56" y2="60" stroke="rgba(255,255,255,0.08)" strokeWidth="0.6" />
        </pattern>
        <pattern id="girls-dots" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
          <circle cx="12" cy="12" r="1" fill="rgba(255,255,255,0.1)" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#girls-dots)" />
      <rect width="100%" height="100%" fill="url(#girls-arch)" />
    </svg>
  );
}

function BuildingIcon({ color }: { color: string }) {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect x="4" y="8" width="20" height="16" rx="1" stroke={color} strokeWidth="1.4" fill="none" />
      <path d="M4 8L14 3L24 8" stroke={color} strokeWidth="1.4" strokeLinejoin="round" fill="none" />
      <rect x="8" y="12" width="4" height="5" rx="0.5" stroke={color} strokeWidth="1.1" fill="none" />
      <rect x="16" y="12" width="4" height="5" rx="0.5" stroke={color} strokeWidth="1.1" fill="none" />
      <rect x="11" y="18" width="6" height="6" rx="0.5" stroke={color} strokeWidth="1.1" fill="none" />
    </svg>
  );
}

export default function SeparateResidencesSection() {
  return (
    <section style={{ fontFamily: SANS, padding: "96px 24px", maxWidth: "1120px", margin: "0 auto" }}>
      <div style={{ marginBottom: "64px", maxWidth: "580px" }}>
        <p
          style={{
            fontFamily: SANS,
            fontSize: "11px",
            fontWeight: 600,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#9a8f7a",
            marginBottom: "20px",
          }}
        >
          Student Residences
        </p>
        <h2
          style={{
            fontFamily: DISPLAY,
            fontSize: "clamp(2rem, 4vw, 3rem)",
            lineHeight: 1.1,
            fontWeight: 400,
            color: "#1c1a16",
            margin: 0,
          }}
        >
          Separate Residences.
          <br />
          <em>One</em> Focused Environment.
        </h2>
        <div style={{ width: "40px", height: "2px", backgroundColor: "#c8b89a", marginTop: "28px" }} />
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "2px",
          borderRadius: "4px",
          overflow: "hidden",
          boxShadow: "0 2px 32px rgba(28,26,22,0.1)",
        }}
      >
        {/* Boys Hostel */}
        <div
          style={{
            position: "relative",
            backgroundColor: "#1e2d40",
            overflow: "hidden",
            minHeight: "420px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <BoysPattern />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(to bottom, transparent 40%, rgba(20,28,40,0.92) 100%)",
              pointerEvents: "none",
            }}
          />
          <div style={{ position: "relative", zIndex: 1, padding: "40px 40px 44px", marginTop: "auto" }}>
            <div style={{ marginBottom: "16px", opacity: 0.8 }}>
              <BuildingIcon color="#a3c4e8" />
            </div>
            <p
              style={{
                fontFamily: SANS,
                fontSize: "10px",
                fontWeight: 600,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "#a3c4e8",
                marginBottom: "10px",
              }}
            >
              Boys Hostel
            </p>
            <h3
              style={{
                fontFamily: DISPLAY,
                fontSize: "1.75rem",
                fontWeight: 400,
                color: "#f0ebe2",
                margin: "0 0 14px",
                lineHeight: 1.15,
              }}
            >
              A dedicated residential building for boys.
            </h3>
            <div style={{ width: "32px", height: "1px", backgroundColor: "#a3c4e8", opacity: 0.5 }} />
          </div>
        </div>

        {/* Girls Hostel */}
        <div
          style={{
            position: "relative",
            backgroundColor: "#2a3828",
            overflow: "hidden",
            minHeight: "420px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <GirlsPattern />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(to bottom, transparent 40%, rgba(22,32,20,0.92) 100%)",
              pointerEvents: "none",
            }}
          />
          <div style={{ position: "relative", zIndex: 1, padding: "40px 40px 44px", marginTop: "auto" }}>
            <div style={{ marginBottom: "16px", opacity: 0.8 }}>
              <BuildingIcon color="#a8c8a0" />
            </div>
            <p
              style={{
                fontFamily: SANS,
                fontSize: "10px",
                fontWeight: 600,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "#a8c8a0",
                marginBottom: "10px",
              }}
            >
              Girls Hostel
            </p>
            <h3
              style={{
                fontFamily: DISPLAY,
                fontSize: "1.75rem",
                fontWeight: 400,
                color: "#f0ebe2",
                margin: "0 0 14px",
                lineHeight: 1.15,
              }}
            >
              A dedicated residential building for girls.
            </h3>
            <div style={{ width: "32px", height: "1px", backgroundColor: "#a8c8a0", opacity: 0.5 }} />
          </div>
        </div>
      </div>

      <p style={{ fontFamily: SANS, fontSize: "13px", fontWeight: 400, color: "#9a8f7a", marginTop: "28px", letterSpacing: "0.01em" }}>
        Boys and girls reside in entirely separate buildings on campus.
      </p>
    </section>
  );
}
