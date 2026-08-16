const GOLD_LINE = "rgba(180,165,140,0.22)";

export default function InfrastructureImagePlaceholder({
  label,
  aspectRatio,
  className,
}: {
  label: string;
  aspectRatio: string;
  className?: string;
}) {
  const patternId = `grid-${label.replace(/\s/g, "")}`;

  return (
    <div
      className={className}
      style={{ position: "relative", overflow: "hidden", backgroundColor: "#0c1a2e", aspectRatio }}
    >
      <svg
        aria-hidden="true"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
        preserveAspectRatio="none"
      >
        <defs>
          <pattern id={patternId} width="48" height="48" patternUnits="userSpaceOnUse">
            <path d="M 48 0 L 0 0 0 48" fill="none" stroke="rgba(180,165,140,0.08)" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${patternId})`} />
        <line x1="0" y1="0" x2="24" y2="0" stroke={GOLD_LINE} strokeWidth="0.75" />
        <line x1="0" y1="0" x2="0" y2="24" stroke={GOLD_LINE} strokeWidth="0.75" />
        <line x1="100%" y1="0" x2="calc(100% - 24px)" y2="0" stroke={GOLD_LINE} strokeWidth="0.75" />
        <line x1="100%" y1="0" x2="100%" y2="24" stroke={GOLD_LINE} strokeWidth="0.75" />
        <line x1="0" y1="100%" x2="24" y2="100%" stroke={GOLD_LINE} strokeWidth="0.75" />
        <line x1="0" y1="100%" x2="0" y2="calc(100% - 24px)" stroke={GOLD_LINE} strokeWidth="0.75" />
        <line x1="100%" y1="100%" x2="calc(100% - 24px)" y2="100%" stroke={GOLD_LINE} strokeWidth="0.75" />
        <line x1="100%" y1="100%" x2="100%" y2="calc(100% - 24px)" stroke={GOLD_LINE} strokeWidth="0.75" />
      </svg>

      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center", width: "2.5rem", height: "2.5rem" }}>
          <div style={{ position: "absolute", width: "1px", height: "1.5rem", backgroundColor: "rgba(180,165,140,0.3)" }} />
          <div style={{ position: "absolute", width: "1.5rem", height: "1px", backgroundColor: "rgba(180,165,140,0.3)" }} />
          <div style={{ width: "0.375rem", height: "0.375rem", borderRadius: "9999px", border: "1px solid rgba(180,165,140,0.35)" }} />
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0.75rem 1rem",
          borderTop: "1px solid rgba(180,165,140,0.1)",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-dm-mono), 'Courier New', monospace",
            fontSize: "9px",
            letterSpacing: "0.2em",
            color: "rgba(180,165,140,0.45)",
            textTransform: "uppercase",
          }}
        >
          {label}
        </span>
        <span
          style={{
            fontFamily: "var(--font-dm-mono), 'Courier New', monospace",
            fontSize: "9px",
            letterSpacing: "0.15em",
            color: "rgba(180,165,140,0.3)",
            textTransform: "uppercase",
          }}
        >
          Image to be updated
        </span>
      </div>
    </div>
  );
}
