const BG = "#0C1A2E";
const CREAM = "#F5ECD7";
const MUTED = "#8B9EB7";
const GOLD = "#C9A84C";

const EB_GARAMOND = "var(--font-eb-garamond), Georgia, serif";
const DM_SANS = "var(--font-dm-sans), system-ui, sans-serif";

const GRAIN_TEXTURE =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E\")";

export default function FounderHero() {
  return (
    <section className="relative flex min-h-screen flex-col overflow-hidden" style={{ backgroundColor: BG, fontFamily: DM_SANS }}>
      <div className="pointer-events-none absolute inset-0" style={{ backgroundImage: GRAIN_TEXTURE, opacity: 0.6 }} />
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(ellipse at center, transparent 40%, rgba(5, 10, 20, 0.55) 100%)" }}
      />

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 py-20 text-center">
        <p
          className="mb-8 text-xs uppercase tracking-[0.22em] md:text-[0.7rem]"
          style={{ color: MUTED, fontWeight: 300 }}
        >
          Vishweshwarayya NEET &nbsp;|&nbsp; JEE Academy
        </p>

        <div className="mb-10 flex items-center gap-4">
          <div style={{ height: "1px", width: "3rem", backgroundColor: GOLD, opacity: 0.6 }} />
          <div style={{ width: "5px", height: "5px", borderRadius: "50%", backgroundColor: GOLD, opacity: 0.8 }} />
          <div style={{ height: "1px", width: "3rem", backgroundColor: GOLD, opacity: 0.6 }} />
        </div>

        <p
          className="mb-10 uppercase tracking-[0.35em] md:mb-14"
          style={{ color: GOLD, fontSize: "0.65rem", fontWeight: 500, letterSpacing: "0.35em" }}
        >
          The Founder
        </p>

        <div className="mb-6 md:mb-8" style={{ fontFamily: EB_GARAMOND }}>
          <h1 className="block leading-none" style={{ fontSize: "clamp(3rem, 9vw, 7.5rem)", color: CREAM, fontWeight: 400, letterSpacing: "-0.01em", lineHeight: 1.05 }}>
            Come to Learn.
          </h1>
          <h1
            className="block italic leading-none"
            style={{ fontSize: "clamp(3rem, 9vw, 7.5rem)", color: CREAM, fontWeight: 400, letterSpacing: "-0.01em", lineHeight: 1.05 }}
          >
            Go to Serve.
          </h1>
        </div>

        <div className="flex items-center gap-4">
          <div style={{ height: "1px", width: "5rem", backgroundColor: "rgba(245,236,215,0.15)" }} />
          <div style={{ width: "4px", height: "4px", borderRadius: "50%", backgroundColor: "rgba(201,168,76,0.5)" }} />
          <div style={{ height: "1px", width: "5rem", backgroundColor: "rgba(245,236,215,0.15)" }} />
        </div>
      </div>

      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-24"
        style={{ background: "linear-gradient(to bottom, transparent, rgba(12,26,46,0.7))" }}
      />
    </section>
  );
}
