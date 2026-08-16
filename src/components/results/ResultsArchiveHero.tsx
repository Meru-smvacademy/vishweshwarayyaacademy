"use client";

const ARCHIVE_YEARS = ["2026", "2025", "2024", "2023", "2022", "2021", "2020", "2019", "2018", "2017", "2016", "2015"];

const NAVY = "#0C1B2E";
const IVORY = "#F2EDE3";
const GOLD = "#B8912A";

const DISPLAY = "var(--font-playfair-display), Georgia, serif";
const CONDENSED = "var(--font-barlow-condensed), sans-serif";
const MONO = "var(--font-jetbrains-mono), monospace";

function handleExplore() {
  const target = document.getElementById("results-archive");
  if (target) {
    target.scrollIntoView({ behavior: "smooth" });
  } else {
    window.scrollBy({ top: window.innerHeight, behavior: "smooth" });
  }
}

export default function ResultsArchiveHero() {
  return (
    <div
      style={{ backgroundColor: IVORY, color: NAVY, minHeight: "100vh" }}
      className="relative flex flex-col overflow-hidden"
    >
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 47px, rgba(12,27,46,0.04) 47px, rgba(12,27,46,0.04) 48px)",
          pointerEvents: "none",
        }}
      />

      {/* Hero body */}
      <main className="relative z-10 mx-auto w-full max-w-screen-xl flex-1 px-8 lg:px-16">
        <div
          className="grid gap-0"
          style={{ gridTemplateColumns: "1fr auto", minHeight: "calc(100vh - 60px)", alignItems: "stretch" }}
        >
          {/* Left: primary content */}
          <div className="flex flex-col justify-center py-20 lg:py-28" style={{ paddingRight: "4rem" }}>
            <div className="mb-10 flex items-center gap-4">
              <div style={{ width: "2.5rem", height: "1px", backgroundColor: GOLD }} />
              <span
                style={{
                  fontFamily: CONDENSED,
                  fontWeight: 500,
                  fontSize: "0.65rem",
                  letterSpacing: "0.38em",
                  textTransform: "uppercase",
                  color: GOLD,
                }}
              >
                Results Archive
              </span>
            </div>

            <h1
              style={{
                fontFamily: DISPLAY,
                fontWeight: 500,
                fontSize: "clamp(2.8rem, 5.5vw, 5.2rem)",
                lineHeight: 1.04,
                letterSpacing: "-0.02em",
                color: NAVY,
                maxWidth: "15ch",
                marginBottom: "2rem",
              }}
            >
              Results Speak
              <br />
              <em style={{ fontStyle: "italic", fontWeight: 400 }}>Louder</em> Than
              <br />
              Words.
            </h1>

            <div style={{ height: "1px", backgroundColor: "rgba(12,27,46,0.14)", maxWidth: "28rem", marginBottom: "2rem" }} />

            <p
              style={{
                fontFamily: CONDENSED,
                fontWeight: 300,
                fontSize: "0.85rem",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "rgba(12,27,46,0.5)",
                marginBottom: "3.5rem",
              }}
            >
              Years of preparation, recorded in results.
            </p>

            <div>
              <button
                type="button"
                onClick={handleExplore}
                className="results-archive-cta"
                style={{
                  fontFamily: CONDENSED,
                  fontWeight: 500,
                  fontSize: "0.7rem",
                  letterSpacing: "0.3em",
                  textTransform: "uppercase",
                  color: NAVY,
                  border: `1px solid ${NAVY}`,
                  padding: "1rem 2rem",
                  background: "transparent",
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  transition: "background 0.25s, color 0.25s",
                }}
              >
                Explore Results
                <span aria-hidden="true">↓</span>
              </button>
            </div>
          </div>

          {/* Right: Archive Year Index */}
          <div
            aria-hidden="true"
            style={{
              borderLeft: "1px solid rgba(12,27,46,0.1)",
              display: "flex",
              flexDirection: "column",
              minWidth: "7rem",
              width: "7rem",
            }}
            className="hidden lg:flex"
          >
            {ARCHIVE_YEARS.map((year, i) => (
              <div
                key={year}
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  padding: "0 1.5rem",
                  borderBottom: i < ARCHIVE_YEARS.length - 1 ? "1px solid rgba(12,27,46,0.08)" : "none",
                  position: "relative",
                }}
              >
                {i === 0 && (
                  <div
                    style={{
                      position: "absolute",
                      top: "0.75rem",
                      left: "1.5rem",
                      right: "1.5rem",
                      height: "1px",
                      backgroundColor: GOLD,
                    }}
                  />
                )}
                <span
                  style={{
                    fontFamily: MONO,
                    fontWeight: 300,
                    fontSize: "0.9rem",
                    letterSpacing: "0.1em",
                    color: i === 0 ? NAVY : `rgba(12,27,46,${0.55 - i * 0.04})`,
                    writingMode: "vertical-rl",
                    transform: "rotate(180deg)",
                    lineHeight: 1,
                    userSelect: "none",
                  }}
                >
                  {year}
                </span>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer strip */}
      <footer style={{ borderTop: "1px solid rgba(12,27,46,0.1)", position: "relative", zIndex: 10 }}>
        <div className="mx-auto flex max-w-screen-xl items-center justify-between px-8 py-5 lg:px-16">
          <div className="flex items-center gap-6">
            {[...ARCHIVE_YEARS].reverse().map((year) => (
              <span
                key={year}
                style={{ fontFamily: MONO, fontWeight: 300, fontSize: "0.65rem", letterSpacing: "0.15em", color: "rgba(12,27,46,0.28)" }}
              >
                {year}
              </span>
            ))}
          </div>
          <div
            style={{
              fontFamily: CONDENSED,
              fontWeight: 400,
              fontSize: "0.65rem",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "rgba(12,27,46,0.28)",
            }}
          >
            Academic Achievement Record
          </div>
        </div>
      </footer>

      {/* Large background year watermarks */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-end",
          pointerEvents: "none",
          zIndex: 1,
          paddingRight: "8rem",
          gap: 0,
          overflow: "hidden",
        }}
        className="hidden xl:flex"
      >
        {ARCHIVE_YEARS.map((year, i) => (
          <div
            key={year}
            style={{
              fontFamily: DISPLAY,
              fontWeight: 700,
              fontSize: "clamp(5rem, 9vw, 11rem)",
              lineHeight: 0.9,
              letterSpacing: "-0.04em",
              color: NAVY,
              opacity: 0.028 + i * 0.006,
              userSelect: "none",
              whiteSpace: "nowrap",
            }}
          >
            {year}
          </div>
        ))}
      </div>

      <style>{`
        .results-archive-cta:hover {
          background: ${NAVY} !important;
          color: ${IVORY} !important;
        }
      `}</style>
    </div>
  );
}
