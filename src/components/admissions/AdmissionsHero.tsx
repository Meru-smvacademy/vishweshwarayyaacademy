import Link from "next/link";
import { PRIMARY_CTA_HREF, PRIMARY_CTA_LABEL } from "@/config/nav";

const BG = "#0c1826";
const GOLD = "#c9a558";
const CREAM = "#f2ede4";

const FRAUNCES = "var(--font-fraunces), serif";
const INSTRUMENT_SANS = "var(--font-instrument-sans), sans-serif";

function ThresholdVisual() {
  return (
    <svg
      viewBox="0 0 480 560"
      style={{ width: "100%", maxWidth: "400px", height: "auto", display: "block" }}
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="adm-center-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#C9A558" stopOpacity="0.28" />
          <stop offset="55%" stopColor="#C9A558" stopOpacity="0.07" />
          <stop offset="100%" stopColor="#C9A558" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="adm-field-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#1b3a5c" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#0c1826" stopOpacity="0" />
        </radialGradient>
      </defs>

      <ellipse cx="240" cy="280" rx="230" ry="270" fill="url(#adm-field-glow)" />

      <rect x="20" y="20" width="440" height="520" fill="none" stroke="rgba(201,165,88,0.07)" strokeWidth="0.7" />
      <rect x="60" y="60" width="360" height="440" fill="none" stroke="rgba(201,165,88,0.11)" strokeWidth="0.7" />
      <rect x="100" y="100" width="280" height="360" fill="none" stroke="rgba(201,165,88,0.17)" strokeWidth="0.7" />
      <rect x="140" y="140" width="200" height="280" fill="none" stroke="rgba(201,165,88,0.26)" strokeWidth="0.7" />
      <rect x="180" y="182" width="120" height="196" fill="none" stroke="rgba(201,165,88,0.40)" strokeWidth="0.7" />
      <rect x="212" y="218" width="56" height="124" fill="none" stroke="rgba(201,165,88,0.58)" strokeWidth="0.7" />

      <line x1="20" y1="20" x2="240" y2="280" stroke="rgba(201,165,88,0.055)" strokeWidth="0.5" />
      <line x1="460" y1="20" x2="240" y2="280" stroke="rgba(201,165,88,0.055)" strokeWidth="0.5" />
      <line x1="20" y1="540" x2="240" y2="280" stroke="rgba(201,165,88,0.055)" strokeWidth="0.5" />
      <line x1="460" y1="540" x2="240" y2="280" stroke="rgba(201,165,88,0.055)" strokeWidth="0.5" />

      <line x1="20" y1="280" x2="460" y2="280" stroke="rgba(201,165,88,0.05)" strokeWidth="0.5" />
      <line x1="240" y1="20" x2="240" y2="540" stroke="rgba(201,165,88,0.05)" strokeWidth="0.5" />

      <ellipse cx="240" cy="280" rx="108" ry="112" fill="url(#adm-center-glow)" />

      <circle cx="240" cy="280" r="22" fill="none" stroke="rgba(201,165,88,0.18)" strokeWidth="0.6" />
      <circle cx="240" cy="280" r="10" fill="none" stroke="rgba(201,165,88,0.35)" strokeWidth="0.6" />
      <circle cx="240" cy="280" r="3" fill="#C9A558" opacity="0.92" />

      <circle cx="140" cy="140" r="2" fill="rgba(201,165,88,0.28)" />
      <circle cx="340" cy="140" r="2" fill="rgba(201,165,88,0.28)" />
      <circle cx="140" cy="420" r="2" fill="rgba(201,165,88,0.28)" />
      <circle cx="340" cy="420" r="2" fill="rgba(201,165,88,0.28)" />

      <line x1="18" y1="30" x2="18" y2="18" stroke="rgba(201,165,88,0.48)" strokeWidth="0.8" />
      <line x1="18" y1="18" x2="30" y2="18" stroke="rgba(201,165,88,0.48)" strokeWidth="0.8" />
      <line x1="462" y1="30" x2="462" y2="18" stroke="rgba(201,165,88,0.48)" strokeWidth="0.8" />
      <line x1="462" y1="18" x2="450" y2="18" stroke="rgba(201,165,88,0.48)" strokeWidth="0.8" />
      <line x1="18" y1="530" x2="18" y2="542" stroke="rgba(201,165,88,0.48)" strokeWidth="0.8" />
      <line x1="18" y1="542" x2="30" y2="542" stroke="rgba(201,165,88,0.48)" strokeWidth="0.8" />
      <line x1="462" y1="530" x2="462" y2="542" stroke="rgba(201,165,88,0.48)" strokeWidth="0.8" />
      <line x1="462" y1="542" x2="450" y2="542" stroke="rgba(201,165,88,0.48)" strokeWidth="0.8" />
    </svg>
  );
}

function ArrowRight() {
  return (
    <svg width="20" height="8" viewBox="0 0 20 8" fill="none" aria-hidden="true">
      <line x1="0" y1="4" x2="16" y2="4" stroke="currentColor" strokeWidth="1" />
      <polyline points="13,1.5 16,4 13,6.5" stroke="currentColor" strokeWidth="1" fill="none" />
    </svg>
  );
}

export default function AdmissionsHero() {
  return (
    <div style={{ background: BG, position: "relative", overflow: "hidden" }}>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(201,165,88,0.045) 1px, transparent 1px)",
          backgroundSize: "26px 26px",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[10%] right-[10%] top-0"
        style={{
          height: "1px",
          background: "linear-gradient(90deg, transparent, rgba(201,165,88,0.25) 30%, rgba(201,165,88,0.25) 70%, transparent)",
        }}
      />

      <section className="relative z-[1] grid min-h-screen grid-cols-[55fr_45fr] items-center max-[800px]:min-h-[100svh] max-[800px]:grid-cols-1">
        <div className="order-1 flex flex-col justify-center pb-[88px] pl-20 pr-14 pt-[88px] max-[800px]:px-7 max-[800px]:pb-10 max-[800px]:pt-[72px]">
          <p
            className="mb-[22px] uppercase"
            style={{ fontFamily: INSTRUMENT_SANS, fontSize: "10px", letterSpacing: "0.38em", color: GOLD, fontWeight: 500, opacity: 0.85 }}
          >
            Admissions
          </p>

          <div aria-hidden="true" className="mb-9" style={{ width: "28px", height: "1px", background: `linear-gradient(90deg, ${GOLD} 60%, transparent)` }} />

          <h1
            className="mb-[26px]"
            style={{ fontFamily: FRAUNCES, fontWeight: 300, fontSize: "clamp(2.75rem, 5vw, 4.5rem)", lineHeight: 1.06, color: CREAM, letterSpacing: "-0.02em" }}
          >
            Your Next Step
            <br />
            Starts Here.
          </h1>

          <p className="mb-[54px] max-w-[340px]" style={{ fontFamily: INSTRUMENT_SANS, fontSize: "1rem", lineHeight: 1.72, color: "rgba(242,237,228,0.45)" }}>
            Admissions are open for Foundation, NEET,&nbsp;JEE and KCET programmes.
          </p>

          <div>
            <Link
              href={PRIMARY_CTA_HREF}
              className="inline-flex items-center gap-[18px] border uppercase transition-colors duration-[220ms] hover:bg-[#c9a558] hover:text-[#0c1826]"
              style={{
                padding: "17px 38px",
                borderColor: "rgba(201, 165, 88, 0.45)",
                color: GOLD,
                fontFamily: INSTRUMENT_SANS,
                fontSize: "10.5px",
                letterSpacing: "0.28em",
                fontWeight: 500,
              }}
            >
              {PRIMARY_CTA_LABEL}
              <ArrowRight />
            </Link>
          </div>
        </div>

        <div className="order-2 flex items-center justify-center pb-20 pl-8 pr-20 pt-20 max-[800px]:px-7 max-[800px]:pb-16 max-[800px]:pt-0">
          <ThresholdVisual />
        </div>
      </section>
    </div>
  );
}
