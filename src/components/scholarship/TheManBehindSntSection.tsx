const GOLD = "#b8975a";
const HEADING = "#1a2540";
const BODY = "#2c3a52";
const RULE = "#d4ba8a55";
const BG = "#f7f3eb";

const CINZEL = "var(--font-cinzel), serif";
const EB_GARAMOND = "var(--font-eb-garamond), serif";

function Ornament() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
      <div
        style={{
          flex: 1,
          height: "1px",
          background: `linear-gradient(to right, transparent, ${GOLD})`,
        }}
      />
      <div
        style={{
          width: "6px",
          height: "6px",
          borderRadius: "50%",
          backgroundColor: GOLD,
        }}
      />
      <div
        style={{
          flex: 1,
          height: "1px",
          background: `linear-gradient(to left, transparent, ${GOLD})`,
        }}
      />
    </div>
  );
}

export default function TheManBehindSntSection() {
  return (
    <section
      style={{
        backgroundColor: BG,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "6rem 2rem",
      }}
    >
      <div style={{ maxWidth: "680px", width: "100%" }}>
        <div style={{ marginBottom: "3.5rem" }}>
          <Ornament />
        </div>

        <h2
          style={{
            fontFamily: CINZEL,
            fontWeight: 500,
            fontSize: "clamp(1.1rem, 3vw, 1.45rem)",
            letterSpacing: "0.25em",
            color: HEADING,
            textAlign: "center",
            marginBottom: "3.5rem",
            textTransform: "uppercase",
          }}
        >
          The Man Behind SNT
        </h2>

        <p
          style={{
            fontFamily: EB_GARAMOND,
            fontStyle: "italic",
            fontSize: "clamp(1.2rem, 2.5vw, 1.45rem)",
            color: HEADING,
            textAlign: "center",
            lineHeight: 1.6,
            marginBottom: "3rem",
            paddingBottom: "2.5rem",
            borderBottom: `1px solid ${RULE}`,
          }}
        >
          Sayabanna N. Tegginamani lived by one simple principle:
          <br />
          <span style={{ color: GOLD }}>&ldquo;Live with principles.&rdquo;</span>
        </p>

        <div
          style={{
            fontFamily: EB_GARAMOND,
            fontSize: "clamp(1.05rem, 2vw, 1.2rem)",
            lineHeight: 1.85,
            color: BODY,
            display: "flex",
            flexDirection: "column",
            gap: "1.6rem",
          }}
        >
          <p>
            He lost his father early and never completed his own education.
            Yet he spent his life ensuring his children — and many others —
            received the education he could not.
          </p>

          <p>
            He donated land for a high school in his native village and
            quietly supported countless students along the way.
          </p>

          <p>
            Today his son continues that mission through the SNT Scholarship.
            Many of its recipients are now studying medicine and other
            professional courses.
          </p>
        </div>

        <div
          style={{
            marginTop: "4rem",
            paddingTop: "3rem",
            borderTop: `1px solid ${RULE}`,
            textAlign: "center",
          }}
        >
          <p
            style={{
              fontFamily: EB_GARAMOND,
              fontStyle: "italic",
              fontSize: "clamp(1.25rem, 3vw, 1.65rem)",
              lineHeight: 1.55,
              color: HEADING,
              letterSpacing: "0.01em",
            }}
          >
            His education was interrupted.
            <br />
            <span style={{ color: GOLD, fontWeight: 500 }}>
              His belief in education never was.
            </span>
          </p>
        </div>

        <div style={{ marginTop: "3.5rem" }}>
          <Ornament />
        </div>
      </div>
    </section>
  );
}
