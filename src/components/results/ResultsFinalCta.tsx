import Link from "next/link";
import { PRIMARY_CTA_HREF } from "@/config/nav";

const NAVY = "#0d1528";
const NAVY_DEEP = "#080d1a";
const CREAM = "#f0ede6";
const GOLD = "#c9a84c";
const GOLD_LIGHT = "#e0bf6e";

const DISPLAY = "var(--font-playfair-display), Georgia, serif";
const SANS = "var(--font-inter), sans-serif";

export default function ResultsFinalCta() {
  return (
    <section
      className="relative overflow-hidden text-center"
      style={{
        fontFamily: SANS,
        background: `linear-gradient(160deg, ${NAVY_DEEP} 0%, ${NAVY} 60%, #13223f 100%)`,
        padding: "104px 24px 112px",
      }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(240,237,230,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(240,237,230,0.025) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2"
        style={{
          width: "900px",
          height: "600px",
          background: "radial-gradient(ellipse at center, rgba(201,168,76,0.08) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-[1] mx-auto" style={{ maxWidth: "620px" }}>
        <p
          style={{
            fontFamily: SANS,
            fontSize: "7.5px",
            fontWeight: 600,
            letterSpacing: "0.3em",
            color: "rgba(201,168,76,0.65)",
            textTransform: "uppercase",
            margin: "0 0 6px",
          }}
        >
          Sir M
        </p>
        <div className="mx-auto mb-8 flex items-center justify-center gap-4">
          <span style={{ width: "28px", height: "1px", background: GOLD }} />
          <span
            style={{
              fontFamily: SANS,
              fontSize: "10px",
              fontWeight: 600,
              letterSpacing: "0.28em",
              color: GOLD,
              textTransform: "uppercase",
            }}
          >
            Vishweshwarayya Academy
          </span>
          <span style={{ width: "28px", height: "1px", background: GOLD }} />
        </div>

        <h2
          style={{
            fontFamily: DISPLAY,
            fontSize: "clamp(34px, 5.5vw, 56px)",
            fontWeight: 700,
            lineHeight: 1.12,
            letterSpacing: "-0.015em",
            color: CREAM,
            margin: "0 0 20px",
          }}
        >
          Ready to Begin Your Journey?
        </h2>

        <p
          style={{
            fontFamily: SANS,
            fontSize: "16px",
            fontWeight: 300,
            lineHeight: 1.7,
            letterSpacing: "0.01em",
            color: "rgba(240,237,230,0.55)",
            margin: "0 0 48px",
            maxWidth: "460px",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          Explore our programs and take the next step towards your NEET, JEE or KCET goal.
        </p>

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/courses"
            className="inline-flex w-full items-center justify-center gap-2.5 rounded-[2px] uppercase transition-transform duration-150 ease-out active:scale-[0.975] sm:w-auto"
            style={{
              padding: "17px 34px",
              background: `linear-gradient(135deg, ${GOLD}, ${GOLD_LIGHT})`,
              color: NAVY_DEEP,
              fontFamily: SANS,
              fontSize: "12px",
              fontWeight: 600,
              letterSpacing: "0.18em",
              boxShadow: "0 6px 32px rgba(201, 168, 76, 0.3)",
            }}
          >
            Explore Our Courses
            <span aria-hidden="true">→</span>
          </Link>

          <Link
            href={PRIMARY_CTA_HREF}
            className="inline-flex w-full items-center justify-center rounded-[2px] uppercase transition-colors duration-200 ease-out results-cta-secondary-btn sm:w-auto"
            style={{
              padding: "17px 34px",
              background: "transparent",
              border: "1px solid rgba(240,237,230,0.3)",
              color: CREAM,
              fontFamily: SANS,
              fontSize: "12px",
              fontWeight: 600,
              letterSpacing: "0.18em",
            }}
          >
            Enquire Now
          </Link>
        </div>
      </div>

      <style>{`
        .results-cta-secondary-btn:hover {
          background: rgba(240,237,230,0.06) !important;
          border-color: rgba(240,237,230,0.5) !important;
        }
      `}</style>
    </section>
  );
}
