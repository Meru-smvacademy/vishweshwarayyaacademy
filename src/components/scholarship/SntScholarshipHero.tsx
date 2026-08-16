import Image from "next/image";

const NAVY_900 = "#0D1B2E";
const GOLD_500 = "#C9A84C";
const GOLD_400 = "#E8D5A3";
const IVORY = "#F5F0E8";
const IVORY_DIM = "#D9D2C4";

const DISPLAY = "var(--font-playfair-display), Georgia, serif";
const BODY = "var(--font-inter), system-ui, sans-serif";

export default function SntScholarshipHero() {
  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ minHeight: "100svh", background: NAVY_900 }}
    >
      <div className="flex min-h-screen flex-col lg:min-h-0 lg:flex-row" style={{ minHeight: "100svh" }}>
        {/* Left — Text Panel */}
        <div
          className="relative z-10 flex flex-col justify-between lg:w-[45%] xl:w-[42%]"
          style={{ background: NAVY_900, padding: "clamp(2rem, 5vw, 4rem)" }}
        >
          <div>
            <div className="mb-1 flex items-center gap-3">
              <div style={{ width: 28, height: 1, background: GOLD_500 }} />
              <span
                style={{
                  fontFamily: BODY,
                  fontSize: "0.62rem",
                  fontWeight: 600,
                  letterSpacing: "0.32em",
                  textTransform: "uppercase",
                  color: GOLD_500,
                }}
              >
                Vishweshwarayya NEET &amp; JEE Academy
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-0 py-12 lg:py-0">
            <p
              style={{
                fontFamily: DISPLAY,
                fontSize: "0.78rem",
                fontStyle: "italic",
                color: GOLD_500,
                letterSpacing: "0.06em",
                marginBottom: "1.5rem",
              }}
            >
              — In Memoriam
            </p>

            <h1
              style={{
                fontFamily: DISPLAY,
                fontWeight: 700,
                lineHeight: 1.05,
                color: IVORY,
                fontSize: "clamp(3rem, 7vw, 5.5rem)",
                marginBottom: "0.25rem",
                letterSpacing: "-0.01em",
              }}
            >
              SNT
            </h1>
            <h2
              style={{
                fontFamily: DISPLAY,
                fontWeight: 400,
                fontStyle: "italic",
                lineHeight: 1.1,
                color: GOLD_400,
                fontSize: "clamp(2rem, 4.5vw, 3.6rem)",
                marginBottom: "2.5rem",
                letterSpacing: "0.01em",
              }}
            >
              Scholarship
            </h2>

            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: "2.5rem" }}>
              <div style={{ height: 1, width: 48, background: GOLD_500 }} />
              <div style={{ width: 5, height: 5, borderRadius: "50%", background: GOLD_500 }} />
              <div style={{ height: 1, flex: 1, maxWidth: 120, background: "rgba(201,168,76,0.25)" }} />
            </div>

            <p
              style={{
                fontFamily: DISPLAY,
                fontSize: "clamp(1.1rem, 2.2vw, 1.45rem)",
                lineHeight: 1.55,
                marginBottom: "2.75rem",
              }}
            >
              <span style={{ color: IVORY_DIM, fontStyle: "italic" }}>In his memory.</span>
              <br />
              <span style={{ color: IVORY, fontWeight: 600, fontStyle: "normal" }}>For their future.</span>
            </p>

            <div style={{ marginBottom: "2rem" }}>
              <p
                style={{
                  fontFamily: BODY,
                  fontSize: "clamp(0.65rem, 1.1vw, 0.78rem)",
                  fontWeight: 600,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: GOLD_500,
                  marginBottom: "0.5rem",
                }}
              >
                Sayabanna N. Tegginamani
              </p>
              <div
                style={{
                  height: 1,
                  background: "linear-gradient(to right, rgba(201,168,76,0.5), transparent)",
                  width: "100%",
                  maxWidth: 280,
                }}
              />
            </div>

            <p
              style={{
                fontFamily: BODY,
                fontSize: "clamp(0.8rem, 1.2vw, 0.875rem)",
                fontWeight: 300,
                lineHeight: 1.85,
                color: "rgba(217,210,196,0.7)",
                maxWidth: 360,
              }}
            >
              A scholarship created in his memory to help deserving students move closer to quality
              education.
            </p>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ height: 1, width: 32, background: "rgba(201,168,76,0.3)" }} />
            <div style={{ height: 1, width: 12, background: "rgba(201,168,76,0.15)" }} />
          </div>
        </div>

        {/* Right — Photograph */}
        <div className="relative lg:flex-1" style={{ minHeight: "55vw", maxHeight: "100svh" }}>
          <Image
            src="/images/scholarship/sayabanna-n-tegginamani.jpg"
            alt="Sayabanna N. Tegginamani — remembered through the SNT Scholarship"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 58vw"
            style={{
              objectFit: "cover",
              objectPosition: "center top",
              filter: "brightness(0.88) contrast(1.05) sepia(5%)",
            }}
          />

          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "22%",
              bottom: 0,
              background: `linear-gradient(to right, ${NAVY_900} 0%, rgba(13,27,46,0.4) 60%, transparent 100%)`,
              pointerEvents: "none",
            }}
          />

          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "28%",
              background: "linear-gradient(to top, rgba(13,27,46,0.7) 0%, transparent 100%)",
              pointerEvents: "none",
            }}
          />

          <div style={{ position: "absolute", top: 24, right: 24, pointerEvents: "none" }}>
            <div
              style={{
                width: 28,
                height: 28,
                borderTop: "1.5px solid rgba(201,168,76,0.5)",
                borderRight: "1.5px solid rgba(201,168,76,0.5)",
              }}
            />
          </div>

          <div style={{ position: "absolute", bottom: 32, left: 32, right: 32 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
              <div style={{ height: 1, width: 24, background: "rgba(201,168,76,0.6)" }} />
              <div style={{ width: 4, height: 4, borderRadius: "50%", background: "rgba(201,168,76,0.7)" }} />
              <div style={{ height: 1, flex: 1, background: "rgba(201,168,76,0.2)" }} />
            </div>
            <p
              style={{
                fontFamily: BODY,
                fontSize: "0.62rem",
                fontWeight: 500,
                letterSpacing: "0.28em",
                textTransform: "uppercase",
                color: "rgba(201,168,76,0.8)",
              }}
            >
              Sayabanna N. Tegginamani
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
