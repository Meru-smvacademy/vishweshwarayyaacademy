const GOLD = "#c9a84c";
const CREAM = "#f0ede8";
const INTER = "var(--font-inter), system-ui, sans-serif";
const PLAYFAIR = "var(--font-playfair-display), Georgia, serif";

const CONTACT_PHONE_TEL = "tel:+918951633963";

const GRAIN_TEXTURE =
  "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E\")";

export default function ContactFinalCta() {
  return (
    <section
      className="relative overflow-hidden text-center"
      style={{
        fontFamily: INTER,
        background: "linear-gradient(160deg, #0d1b2a 0%, #162033 60%, #1a2744 100%)",
        padding: "72px 24px 80px",
      }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{ backgroundImage: GRAIN_TEXTURE, backgroundSize: "180px 180px", opacity: 0.35 }}
      />

      <div
        aria-hidden="true"
        className="mx-auto mb-10"
        style={{ width: 48, height: 1, background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)` }}
      />

      <div className="relative z-[1] mx-auto" style={{ maxWidth: 560 }}>
        <p
          className="uppercase"
          style={{ fontFamily: INTER, fontSize: 10, fontWeight: 600, letterSpacing: "0.22em", color: GOLD, margin: "0 0 20px" }}
        >
          Still have a question?
        </p>

        <h2
          style={{
            fontFamily: PLAYFAIR,
            fontSize: "clamp(38px, 7vw, 58px)",
            fontWeight: 400,
            lineHeight: 1.05,
            letterSpacing: "-0.01em",
            color: CREAM,
            margin: "0 0 18px",
          }}
        >
          We&rsquo;re just a
          <br />
          <em style={{ fontStyle: "italic", color: "#e2d4b7" }}>call away.</em>
        </h2>

        <p style={{ fontFamily: INTER, fontSize: 14, fontWeight: 300, letterSpacing: "0.02em", color: "rgba(240, 237, 232, 0.5)", margin: "0 0 44px" }}>
          Our admissions team is ready to answer you personally.
        </p>

        <a
          href={CONTACT_PHONE_TEL}
          className="inline-flex items-center gap-2.5 rounded-[2px] uppercase transition-transform duration-150 ease-out active:scale-[0.975]"
          style={{
            padding: "15px 34px",
            background: "linear-gradient(135deg, #c9a84c, #e0bf6e)",
            color: "#0d1b2a",
            fontFamily: INTER,
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: "0.2em",
            boxShadow: "0 6px 32px rgba(201, 168, 76, 0.32)",
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.5 2 2 0 0 1 3.59 1.3h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.96a16 16 0 0 0 6.07 6.07l1.02-.93a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
          </svg>
          Call the Academy
        </a>
      </div>

      <div
        aria-hidden="true"
        className="relative z-[1] mx-auto mt-12"
        style={{ width: 48, height: 1, background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)` }}
      />
    </section>
  );
}
