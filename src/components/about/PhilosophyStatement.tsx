const PILLARS = [
  {
    word: "LEARN",
    sub: "Think beyond the answer.",
    body: "Education begins when we stop accepting the first answer and start asking the next question. Learning is not the accumulation of facts — it is the deepening of thought.",
  },
  {
    word: "LIVE",
    sub: "Understand our responsibility to others.",
    body: "What we know shapes how we live. A life informed by learning carries an obligation — to see the world clearly and to act with integrity within it.",
  },
  {
    word: "SERVE",
    sub: "Put knowledge to work for humanity.",
    body: "Knowledge finds its highest purpose when turned outward. To serve is to transform what we have learned into something that matters for others.",
  },
];

const FONT_DISPLAY = "var(--font-fraunces), Georgia, serif";
const FONT_BODY = "var(--font-dm-sans), system-ui, sans-serif";

// Static editorial reproduction of the approved "Come to Learn. Go to Serve."
// mission statement — no scroll/parallax/hover/pointer interactivity, per
// the explicit static-design requirement. Visual composition, typography,
// spacing and art direction are otherwise reproduced as designed.
export default function PhilosophyStatement() {
  return (
    <div
      className="relative overflow-hidden"
      style={{ backgroundColor: "#0e0d0b", color: "#f0ebe0", fontFamily: FONT_BODY }}
    >
      {/* Ambient dot grid — static texture, scoped to this section */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle at center, rgba(240,235,224,0.07) 1px, transparent 1.2px)",
          backgroundSize: "22px 22px",
        }}
      />

      {/* Mission statement */}
      <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-8 py-24 text-center">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-8">
          <div className="flex w-full max-w-xs items-center gap-4">
            <div className="h-px flex-1" style={{ backgroundColor: "rgba(200,165,100,0.35)" }} />
            <span
              className="text-xs uppercase tracking-[0.25em]"
              style={{ color: "rgba(200,165,100,0.7)", fontFamily: FONT_BODY, fontWeight: 300 }}
            >
              Mission
            </span>
            <div className="h-px flex-1" style={{ backgroundColor: "rgba(200,165,100,0.35)" }} />
          </div>

          <h1
            className="leading-none tracking-tight"
            style={{
              fontFamily: FONT_DISPLAY,
              fontWeight: 300,
              fontSize: "clamp(3.2rem, 9vw, 8rem)",
              color: "#f0ebe0",
              letterSpacing: "-0.01em",
            }}
          >
            Come to Learn.
            <br />
            <span style={{ fontStyle: "italic", color: "rgba(240,235,224,0.55)" }}>Go to Serve.</span>
          </h1>

          <p
            className="max-w-lg leading-relaxed"
            style={{ color: "rgba(240,235,224,0.72)", fontSize: "1.2rem", fontWeight: 300 }}
          >
            Education should raise the way we think, shape the way we live, and give knowledge a
            purpose beyond ourselves.
          </p>

          <div className="mt-8 flex flex-col items-center gap-2">
            <span
              className="text-xs uppercase tracking-[0.2em]"
              style={{ color: "rgba(200,165,100,0.45)", fontWeight: 300 }}
            >
              Scroll
            </span>
            <div className="h-12 w-px" style={{ backgroundColor: "rgba(200,165,100,0.6)" }} />
          </div>
        </div>
      </section>

      {/* Three commitments */}
      <section className="relative mx-auto max-w-7xl px-8 py-32">
        <p
          className="mb-20 text-xs uppercase tracking-[0.3em]"
          style={{ color: "rgba(200,165,100,0.55)", fontWeight: 300 }}
        >
          Three Commitments
        </p>

        <div className="grid grid-cols-1 gap-0 md:grid-cols-3">
          {PILLARS.map((pillar, i) => (
            <div
              key={pillar.word}
              className="relative flex flex-col gap-6 px-10 py-10"
              style={{
                borderLeft: i === 0 ? "1px solid rgba(240,235,224,0.08)" : undefined,
                borderRight: "1px solid rgba(240,235,224,0.08)",
              }}
            >
              <span
                className="text-xs tracking-[0.2em]"
                style={{ color: "rgba(200,165,100,0.4)", fontFamily: FONT_BODY, fontWeight: 300 }}
              >
                0{i + 1}
              </span>

              <h2
                className="leading-none"
                style={{
                  fontFamily: FONT_DISPLAY,
                  fontWeight: 400,
                  fontSize: "clamp(2.5rem, 5vw, 4rem)",
                  letterSpacing: "-0.02em",
                  color: "rgba(240,235,224,0.75)",
                }}
              >
                {pillar.word}
              </h2>

              <p
                className="leading-snug"
                style={{
                  fontStyle: "italic",
                  fontFamily: FONT_DISPLAY,
                  fontWeight: 300,
                  fontSize: "1.125rem",
                  color: "rgba(200,165,100,0.92)",
                }}
              >
                {pillar.sub}
              </p>

              <p
                className="leading-relaxed"
                style={{ color: "rgba(240,235,224,0.68)", fontWeight: 300, fontSize: "1rem", maxWidth: "28ch" }}
              >
                {pillar.body}
              </p>

              <div
                aria-hidden="true"
                className="h-px"
                style={{ backgroundColor: "rgba(200,165,100,0.6)", width: "64px" }}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Closing statement */}
      <section className="relative overflow-hidden px-8 py-40">
        <div className="mx-auto mb-24 h-px max-w-7xl" style={{ backgroundColor: "rgba(240,235,224,0.07)" }} />

        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-8 md:grid-cols-[1fr_1.6fr] md:gap-24">
          <div>
            <span
              className="text-xs uppercase tracking-[0.3em]"
              style={{ color: "rgba(200,165,100,0.55)", fontWeight: 300 }}
            >
              Our Belief
            </span>
          </div>

          <div className="flex flex-col gap-8">
            <blockquote
              className="leading-tight"
              style={{
                fontFamily: FONT_DISPLAY,
                fontWeight: 300,
                fontStyle: "italic",
                fontSize: "clamp(2rem, 4vw, 3.5rem)",
                color: "#f0ebe0",
                letterSpacing: "-0.01em",
              }}
            >
              Every life is unique.
              <br />
              <span style={{ color: "rgba(240,235,224,0.72)" }}>
                Every person deserves the opportunity to learn.
              </span>
            </blockquote>
          </div>
        </div>

        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 right-0 select-none leading-none"
          style={{
            fontFamily: FONT_DISPLAY,
            fontWeight: 300,
            fontSize: "clamp(8rem, 20vw, 22rem)",
            color: "rgba(240,235,224,0.02)",
            letterSpacing: "-0.04em",
            lineHeight: 0.85,
            transform: "translateY(18%)",
          }}
        >
          Serve
        </div>
      </section>
    </div>
  );
}
