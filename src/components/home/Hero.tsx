import Image from "next/image";
import { PRIMARY_CTA_HREF } from "@/config/nav";

const NAVY = "#0d2249";
const ORANGE = "#e8640c";
const BG = "#f8fbff";

const DISPLAY = "var(--font-playfair-display), Georgia, serif";
const BODY = "var(--font-poppins), system-ui, sans-serif";

const LOCATIONS = ["Lingasuguru", "Sindhanur"];

const STUDENT_ALT = "Student at Sir M Vishweshwarayya Academy";

// Two strongest portraits become the overlapping corner cards.
const FEATURED_STUDENTS = [
  { src: "/images/hero/student-1.webp", objectPosition: "50% 34%" },
  { src: "/images/hero/student-5.webp", objectPosition: "50% 32%" },
];

// Remaining portraits run as overlapping circles along the bottom edge.
const CIRCLE_STUDENTS = [
  { src: "/images/hero/student-2.webp", objectPosition: "50% 36%" },
  { src: "/images/hero/student-4.webp", objectPosition: "50% 38%" },
  { src: "/images/hero/student-3.webp", objectPosition: "50% 40%" },
  { src: "/images/hero/student-6.webp", objectPosition: "50% 42%" },
];

const ALL_STUDENTS = [FEATURED_STUDENTS[0], ...CIRCLE_STUDENTS, FEATURED_STUDENTS[1]];

function PinIcon() {
  return (
    <svg width="7" height="9" viewBox="0 0 7 9" fill="none" aria-hidden="true">
      <path
        d="M3.5 0C1.567 0 0 1.567 0 3.5c0 2.5 3.5 5.5 3.5 5.5S7 6 7 3.5C7 1.567 5.433 0 3.5 0Zm0 4.75a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5Z"
        fill={ORANGE}
      />
    </svg>
  );
}

export default function Hero() {
  return (
    <section style={{ position: "relative", overflow: "hidden", backgroundColor: BG, fontFamily: BODY }}>
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "radial-gradient(circle at center, rgba(13,34,73,0.13) 1.2px, transparent 1.4px)",
          backgroundSize: "22px 22px",
          zIndex: 0,
          pointerEvents: "none",
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: -180,
          left: -180,
          width: 520,
          height: 520,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(13,34,73,0.06) 0%, transparent 70%)",
          zIndex: 0,
          pointerEvents: "none",
        }}
      />

      <div
        className="hero-grid"
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: 1280,
          margin: "0 auto",
          padding: "0 2rem",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          alignItems: "center",
          gap: "3rem",
        }}
      >
        {/* Left: text content */}
        <div style={{ padding: "4rem 0" }}>
          <div style={{ display: "flex", gap: "0.6rem", marginBottom: "2rem", flexWrap: "wrap" }}>
            {LOCATIONS.map((loc) => (
              <span
                key={loc}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.4rem",
                  backgroundColor: "rgba(13,34,73,0.06)",
                  border: "1px solid rgba(13,34,73,0.14)",
                  color: NAVY,
                  fontSize: "0.68rem",
                  fontWeight: 600,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  padding: "0.32rem 0.8rem",
                  borderRadius: 3,
                }}
              >
                <PinIcon />
                {loc}
              </span>
            ))}
          </div>

          <h1
            style={{
              fontFamily: DISPLAY,
              fontSize: "clamp(2.4rem, 4vw, 3.5rem)",
              fontWeight: 800,
              color: NAVY,
              lineHeight: 1.12,
              margin: "0 0 1.4rem",
              letterSpacing: "-0.01em",
            }}
          >
            Where Discipline
            <br />
            <span style={{ color: ORANGE }}>Becomes Rank.</span>
          </h1>

          <div style={{ display: "flex", gap: 5, marginBottom: "1.6rem", alignItems: "center" }}>
            <div style={{ width: 44, height: 3, backgroundColor: ORANGE, borderRadius: 2 }} />
            <div style={{ width: 8, height: 3, backgroundColor: "rgba(232,100,12,0.28)", borderRadius: 2 }} />
          </div>

          <p
            style={{
              fontSize: "clamp(0.875rem, 1.2vw, 1rem)",
              color: "#3a4f72",
              lineHeight: 1.78,
              margin: "0 0 2.6rem",
              maxWidth: 510,
              fontWeight: 400,
            }}
          >
            Structured coaching, experienced faculty, personalised mentoring, and consistent
            practice designed to help every student excel in{" "}
            <strong style={{ color: NAVY, fontWeight: 600 }}>NEET, JEE, and KCET.</strong>
          </p>

          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <a
              href={PRIMARY_CTA_HREF}
              className="hero-cta-primary"
              style={{
                display: "inline-block",
                backgroundColor: ORANGE,
                color: "#ffffff",
                fontSize: "0.84rem",
                fontWeight: 600,
                padding: "0.85rem 2rem",
                borderRadius: 4,
                textDecoration: "none",
                letterSpacing: "0.04em",
                boxShadow: "0 4px 16px rgba(232,100,12,0.26)",
                transition: "background-color 0.18s, transform 0.15s, box-shadow 0.18s",
              }}
            >
              Admission Enquiry
            </a>
            <a
              href="/courses"
              className="hero-cta-secondary"
              style={{
                display: "inline-block",
                backgroundColor: "transparent",
                color: NAVY,
                fontSize: "0.84rem",
                fontWeight: 600,
                padding: "0.85rem 2rem",
                borderRadius: 4,
                textDecoration: "none",
                letterSpacing: "0.04em",
                border: `1.5px solid ${NAVY}`,
                transition: "background-color 0.18s, color 0.18s, transform 0.15s",
              }}
            >
              Explore Academic Pathways
            </a>
          </div>
        </div>

        {/* Right: campus photography */}
        <div className="hero-image-col" style={{ position: "relative", minHeight: 616, display: "flex", alignItems: "center" }}>
          <div className="hero-image-stack" style={{ position: "relative", width: "100%", height: 560 }}>
            <div
              className="hero-image-frame"
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: 12,
                overflow: "hidden",
                backgroundColor: "#c5d0e0",
                boxShadow: "0 24px 64px rgba(13,34,73,0.16), 0 4px 16px rgba(13,34,73,0.09)",
              }}
            >
              <Image
                src="/images/hero/campus-building.webp"
                alt="Sir M Vishweshwarayya Academy campus building"
                width={1600}
                height={535}
                priority
                sizes="(max-width: 900px) 100vw, 50vw"
                style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "50% 50%" }}
              />

              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(180deg, rgba(13,34,73,0.04) 0%, rgba(13,34,73,0.24) 100%)",
                }}
              />

            </div>

            {/* Overlapping portrait cards (>=768px) */}
            <div className="hero-card hero-card-bl" style={{ position: "absolute", left: -20, bottom: 78, zIndex: 4 }}>
              <Image
                src={FEATURED_STUDENTS[0].src}
                alt={STUDENT_ALT}
                width={600}
                height={750}
                loading="lazy"
                sizes="(max-width: 900px) 104px, 136px"
                style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: FEATURED_STUDENTS[0].objectPosition }}
              />
            </div>
            <div className="hero-card hero-card-tr" style={{ position: "absolute", right: -18, top: 44, zIndex: 4 }}>
              <Image
                src={FEATURED_STUDENTS[1].src}
                alt={STUDENT_ALT}
                width={600}
                height={750}
                loading="lazy"
                sizes="(max-width: 900px) 104px, 136px"
                style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: FEATURED_STUDENTS[1].objectPosition }}
              />
            </div>

            {/* Overlapping circles along the bottom edge (>=768px) */}
            <div className="hero-circle-row" style={{ position: "absolute", right: 26, bottom: -26, zIndex: 4, display: "flex" }}>
              {CIRCLE_STUDENTS.map((student, i) => (
                <div key={student.src} className="hero-circle" style={{ marginLeft: i === 0 ? 0 : -18 }}>
                  <Image
                    src={student.src}
                    alt={STUDENT_ALT}
                    width={600}
                    height={750}
                    loading="lazy"
                    sizes="(max-width: 900px) 58px, 76px"
                    style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: student.objectPosition }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Mobile (<768px): 3 x 2 grid below the building */}
          <div className="hero-student-grid">
            {ALL_STUDENTS.map((student) => (
              <div key={student.src} className="hero-student-tile">
                <Image
                  src={student.src}
                  alt={STUDENT_ALT}
                  width={600}
                  height={750}
                  loading="lazy"
                  sizes="30vw"
                  style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: student.objectPosition }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 1,
          background: "linear-gradient(to right, transparent, rgba(13,34,73,0.1) 30%, rgba(13,34,73,0.1) 70%, transparent)",
        }}
      />

      <style>{`
        .hero-cta-primary:hover {
          background-color: #c4530a !important;
          transform: translateY(-1px);
          box-shadow: 0 6px 22px rgba(232,100,12,0.38) !important;
        }
        .hero-cta-secondary:hover {
          background-color: ${NAVY} !important;
          color: #ffffff !important;
          transform: translateY(-1px);
        }
        .hero-card {
          width: 136px;
          height: 180px;
          border-radius: 14px;
          overflow: hidden;
          border: 4px solid #ffffff;
          background-color: #ffffff;
          box-shadow: 0 14px 34px rgba(13,34,73,0.22), 0 2px 8px rgba(13,34,73,0.12);
        }
        .hero-circle {
          width: 76px;
          height: 76px;
          border-radius: 50%;
          overflow: hidden;
          border: 3px solid #ffffff;
          background-color: #ffffff;
          box-shadow: 0 8px 20px rgba(13,34,73,0.22);
        }
        .hero-student-grid {
          display: none;
          grid-template-columns: repeat(3, 1fr);
          gap: 10px;
          width: 100%;
          margin-top: 14px;
        }
        .hero-student-tile {
          aspect-ratio: 1 / 1;
          border-radius: 12px;
          overflow: hidden;
          background-color: #e6ecf5;
          box-shadow: 0 6px 18px rgba(13,34,73,0.14);
        }
        @media (max-width: 900px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            padding-top: 2rem !important;
          }
          .hero-image-col {
            min-height: 400px !important;
          }
          .hero-image-stack {
            height: 340px !important;
          }
          .hero-card {
            width: 104px;
            height: 138px;
            border-width: 3px;
          }
          .hero-card-bl {
            bottom: 58px !important;
            left: -14px !important;
          }
          .hero-card-tr {
            top: 30px !important;
            right: -12px !important;
          }
          .hero-circle {
            width: 58px;
            height: 58px;
            border-width: 3px;
          }
          .hero-circle-row {
            right: 18px !important;
            bottom: -18px !important;
          }
        }
        @media (max-width: 767px) {
          .hero-image-col {
            display: block !important;
            min-height: 0 !important;
          }
          .hero-image-stack {
            height: 220px !important;
          }
          .hero-card,
          .hero-circle-row {
            display: none !important;
          }
          .hero-student-grid {
            display: grid;
          }
        }
      `}</style>
    </section>
  );
}
