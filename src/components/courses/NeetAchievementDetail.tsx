import Link from "next/link";
import { PRIMARY_CTA_HREF } from "@/config/nav";

const NAVY = "#070C1A";
const NAVY_MID = "#0D1528";
const NAVY_LIGHT = "#141E38";
const CREAM = "#F2EBE0";
const CREAM_MUTED = "#C4BAB0";
const AMBER = "#D4A853";
const AMBER_LIGHT = "#E8C078";
const RULE = "rgba(212,168,83,0.18)";

const FRAUNCES = "var(--font-fraunces), Georgia, serif";
const DM_SANS = "var(--font-dm-sans), system-ui, sans-serif";
const DM_MONO = "var(--font-dm-mono), monospace";

export default function NeetAchievementDetail() {
  return (
    <div style={{ backgroundColor: NAVY, color: CREAM, fontFamily: DM_SANS, overflowX: "hidden" }}>
      {/* Hero */}
      <section className="relative overflow-hidden px-6 pb-[72px] pt-20 sm:px-12">
        <div className="pointer-events-none absolute inset-0">
          <svg width="100%" height="100%" className="absolute inset-0 opacity-[0.04]">
            <line x1="0" y1="50%" x2="100%" y2="50%" stroke={CREAM} strokeWidth="1" />
            <line x1="50%" y1="0" x2="50%" y2="100%" stroke={CREAM} strokeWidth="1" />
            <circle cx="50%" cy="50%" r="280" fill="none" stroke={CREAM} strokeWidth="1" />
            <circle cx="50%" cy="50%" r="480" fill="none" stroke={CREAM} strokeWidth="1" />
          </svg>
          <div
            className="absolute -right-[10%] -top-[40%] h-[520px] w-[520px] rounded-full"
            style={{ background: "radial-gradient(circle, rgba(212,168,83,0.07) 0%, transparent 70%)" }}
          />
        </div>

        <div className="relative mx-auto max-w-[1100px]">
          <div
            className="mb-8 uppercase"
            style={{ fontFamily: DM_MONO, fontSize: "11px", letterSpacing: "0.16em", color: AMBER }}
          >
            1st PUC &amp; 2nd PUC · Medical Entrance Preparation
          </div>

          <h1
            className="mb-12"
            style={{
              fontFamily: FRAUNCES,
              fontWeight: 300,
              fontSize: "clamp(52px, 8vw, 112px)",
              lineHeight: "0.9",
              letterSpacing: "-0.02em",
              color: CREAM,
            }}
          >
            NEET
            <br />
            <span style={{ fontStyle: "italic", color: AMBER }}>Achievement</span>
            <br />
            Program
          </h1>

          {/* The equation */}
          <div className="mb-14 flex flex-wrap items-center gap-0">
            {[
              { label: "BOARD", sub: "Examinations" },
              { sym: "+" },
              { label: "NEET", sub: "Preparation" },
              { sym: "=" },
              { label: "ONE", sub: "Integrated System", accent: true },
            ].map((item, i) =>
              "sym" in item ? (
                <div key={i} style={{ fontFamily: FRAUNCES, fontSize: "clamp(28px, 4vw, 48px)", color: AMBER, padding: "0 24px", fontWeight: 300 }}>
                  {item.sym}
                </div>
              ) : (
                <div
                  key={i}
                  style={{
                    borderLeft: item.accent ? `2px solid ${AMBER}` : `1px solid ${RULE}`,
                    paddingLeft: "20px",
                    paddingRight: "32px",
                  }}
                >
                  <div
                    style={{
                      fontFamily: FRAUNCES,
                      fontWeight: item.accent ? 500 : 400,
                      fontSize: "clamp(18px, 2.5vw, 28px)",
                      letterSpacing: "0.04em",
                      color: item.accent ? AMBER_LIGHT : CREAM,
                    }}
                  >
                    {item.label}
                  </div>
                  <div
                    className="mt-1 uppercase"
                    style={{ fontFamily: DM_MONO, fontSize: "10px", letterSpacing: "0.10em", color: CREAM_MUTED }}
                  >
                    {item.sub}
                  </div>
                </div>
              ),
            )}
          </div>

          <p className="max-w-[520px]" style={{ fontSize: "17px", lineHeight: "1.6", color: CREAM_MUTED, fontWeight: 300 }}>
            Board + NEET preparation, together. No compromise on conceptual depth.
          </p>
        </div>
      </section>

      {/* Who it's for */}
      <section className="px-6 py-[72px] sm:px-12" style={{ borderTop: `1px solid ${RULE}` }}>
        <div className="mx-auto grid max-w-[1100px] grid-cols-1 items-start gap-10 min-[821px]:grid-cols-[1fr_2fr] min-[821px]:gap-16">
          <div>
            <div
              className="mb-5 uppercase"
              style={{ fontFamily: DM_MONO, fontSize: "10px", letterSpacing: "0.16em", color: AMBER }}
            >
              Who it&rsquo;s for
            </div>
            <div style={{ fontFamily: FRAUNCES, fontSize: "42px", fontWeight: 300, lineHeight: "1.1", color: CREAM }}>
              Built for
              <br />
              <span style={{ fontStyle: "italic", color: AMBER }}>aspiring</span>
              <br />
              doctors.
            </div>
          </div>

          <div className="grid grid-cols-1 gap-px sm:grid-cols-2" style={{ backgroundColor: RULE }}>
            {[
              { label: "1st PUC", desc: "Early foundation. Start NEET aligned from day one." },
              { label: "2nd PUC", desc: "Deep preparation. Board + NEET in parallel." },
              { label: "Objective", desc: "Integrated preparation that preserves conceptual understanding." },
              { label: "Outcome", desc: "Strong board results and NEET readiness — from one consistent system." },
            ].map((c) => (
              <div key={c.label} style={{ backgroundColor: NAVY, padding: "32px 28px" }}>
                <div className="mb-3 uppercase" style={{ fontFamily: DM_MONO, fontSize: "10px", letterSpacing: "0.12em", color: AMBER }}>
                  {c.label}
                </div>
                <div style={{ fontSize: "15px", lineHeight: "1.6", color: CREAM_MUTED, fontWeight: 300 }}>{c.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What students build */}
      <section className="px-6 py-[72px] sm:px-12" style={{ borderTop: `1px solid ${RULE}`, backgroundColor: NAVY_MID }}>
        <div className="mx-auto max-w-[1100px]">
          <div className="mb-12 uppercase" style={{ fontFamily: DM_MONO, fontSize: "10px", letterSpacing: "0.16em", color: AMBER }}>
            What students build
          </div>

          <div className="grid grid-cols-2 gap-0 min-[821px]:grid-cols-4" style={{ borderLeft: `1px solid ${RULE}` }}>
            {[
              { title: "Concepts", items: ["Physics", "Chemistry", "Biology"], num: "01" },
              { title: "Problem Solving", items: ["Accuracy", "Speed", "Reasoning"], num: "02" },
              { title: "Exam Readiness", items: ["Confidence", "Strategy", "Temperament"], num: "03" },
              { title: "Progress", items: ["Continuous tracking", "Via KRIT", "Personalised insight"], num: "04" },
            ].map((col) => (
              <div key={col.num} className="relative" style={{ borderRight: `1px solid ${RULE}`, padding: "40px 32px" }}>
                <div className="absolute right-5 top-10" style={{ fontFamily: DM_MONO, fontSize: "10px", color: RULE, letterSpacing: "0.08em" }}>
                  {col.num}
                </div>
                <div style={{ fontFamily: FRAUNCES, fontSize: "22px", fontWeight: 400, color: CREAM, marginBottom: "24px", lineHeight: "1.2" }}>
                  {col.title}
                </div>
                <div className="flex flex-col gap-2">
                  {col.items.map((item) => (
                    <div key={item} style={{ fontFamily: DM_MONO, fontSize: "11px", letterSpacing: "0.06em", color: CREAM_MUTED }}>
                      — {item}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The preparation system */}
      <section className="px-6 py-20 sm:px-12" style={{ borderTop: `1px solid ${RULE}` }}>
        <div className="mx-auto max-w-[1100px]">
          <div className="mb-12 uppercase" style={{ fontFamily: DM_MONO, fontSize: "10px", letterSpacing: "0.16em", color: AMBER }}>
            The preparation system
          </div>

          <div className="grid grid-cols-1 items-start gap-12 min-[821px]:grid-cols-2 min-[821px]:gap-20">
            {/* Pipeline visual */}
            <div>
              {[
                { step: "CONCEPT", desc: "Classroom teaching · Digital resources" },
                { step: "PRACTICE", desc: "Daily questions · Topic assignments" },
                { step: "TEST", desc: "Weekly · Monthly · Grand · CBT Mocks" },
                { step: "ANALYSE", desc: "KRIT performance analytics · Faculty review" },
                { step: "IMPROVE", desc: "Doubt solving · Revision · Mentoring" },
              ].map((s, i, arr) => (
                <div key={s.step} className="flex items-stretch gap-0">
                  <div className="flex w-10 shrink-0 flex-col items-center">
                    <div
                      className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full"
                      style={{ backgroundColor: i === 0 ? AMBER : "transparent", border: `2px solid ${i === 0 ? AMBER : CREAM_MUTED}` }}
                    />
                    {i < arr.length - 1 && <div className="my-1 w-px flex-grow" style={{ backgroundColor: RULE }} />}
                  </div>
                  <div className="pl-5" style={{ paddingBottom: i < arr.length - 1 ? "32px" : 0 }}>
                    <div style={{ fontFamily: FRAUNCES, fontSize: "28px", fontWeight: 400, letterSpacing: "0.02em", color: i === 0 ? AMBER_LIGHT : CREAM, lineHeight: "1" }}>
                      {s.step}
                    </div>
                    <div className="mt-1.5" style={{ fontFamily: DM_MONO, fontSize: "11px", letterSpacing: "0.06em", color: CREAM_MUTED, lineHeight: "1.5" }}>
                      {s.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Supporting elements */}
            <div className="flex flex-col gap-6">
              <div>
                <div className="mb-6" style={{ fontFamily: FRAUNCES, fontSize: "36px", fontWeight: 300, lineHeight: "1.15", color: CREAM }}>
                  Every day
                  <br />
                  <span style={{ fontStyle: "italic", color: AMBER }}>moves forward.</span>
                </div>
                <p style={{ fontSize: "15px", lineHeight: "1.7", color: CREAM_MUTED, fontWeight: 300 }}>
                  The preparation system is a closed loop — each cycle of learning, practice, testing, and analysis feeds into the next. No gaps, no drift.
                </p>
              </div>

              <div className="mt-2 grid grid-cols-1 gap-px sm:grid-cols-2" style={{ backgroundColor: RULE }}>
                {["Crash Test Series", "Personalised Mentoring", "CBT NEET Mocks", "Doubt Solving Sessions"].map((item) => (
                  <div key={item} style={{ backgroundColor: NAVY, padding: "16px 20px" }}>
                    <div style={{ fontFamily: DM_MONO, fontSize: "11px", letterSpacing: "0.06em", color: CREAM_MUTED }}>{item}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* KRIT */}
      <section className="px-6 py-20 sm:px-12" style={{ borderTop: `1px solid ${RULE}`, backgroundColor: NAVY_LIGHT }}>
        <div className="mx-auto max-w-[1100px]">
          <div className="grid grid-cols-1 items-start gap-10 min-[821px]:grid-cols-[280px_1fr] min-[821px]:gap-20">
            <div>
              <div className="mb-4 uppercase" style={{ fontFamily: DM_MONO, fontSize: "10px", letterSpacing: "0.16em", color: AMBER }}>
                Platform
              </div>
              <div className="mb-5" style={{ fontFamily: FRAUNCES, fontWeight: 300, fontSize: "72px", letterSpacing: "-0.02em", lineHeight: "1", color: AMBER }}>
                KRIT
              </div>
              {/* Content correction: description now matches the Learn/Test/Analyse/Track
                  columns shown, rather than referencing counselling (a different program stage). */}
              <p style={{ fontSize: "14px", lineHeight: "1.7", color: CREAM_MUTED, fontWeight: 300 }}>
                KRIT keeps learning, testing, analysis and progress connected throughout preparation.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-px sm:grid-cols-2" style={{ backgroundColor: RULE }}>
              {[
                { label: "LEARN", items: ["Digital resources", "Study materials"] },
                { label: "TEST", items: ["CBT · NEET mocks", "Instant results"] },
                { label: "ANALYSE", items: ["Subject performance", "Chapter performance"] },
                { label: "TRACK", items: ["Progress reports", "Parent updates"] },
              ].map((cell) => (
                <div key={cell.label} style={{ backgroundColor: NAVY_LIGHT, padding: "32px 28px" }}>
                  <div
                    className="mb-3 flex items-center gap-2.5 uppercase"
                    style={{ fontFamily: DM_MONO, fontSize: "10px", letterSpacing: "0.14em", color: AMBER }}
                  >
                    <span className="inline-block h-px w-5" style={{ backgroundColor: AMBER }} />
                    {cell.label}
                  </div>
                  {cell.items.map((item) => (
                    <div key={item} style={{ fontSize: "14px", lineHeight: "1.7", color: CREAM, fontWeight: 300 }}>
                      {item}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Assessment & improvement */}
      <section className="px-6 py-20 sm:px-12" style={{ borderTop: `1px solid ${RULE}` }}>
        <div className="mx-auto max-w-[1100px]">
          <div className="mb-12 uppercase" style={{ fontFamily: DM_MONO, fontSize: "10px", letterSpacing: "0.16em", color: AMBER }}>
            Assessment &amp; improvement
          </div>

          <div className="grid grid-cols-1 items-center gap-12 min-[821px]:grid-cols-2 min-[821px]:gap-20">
            {/* Flow */}
            <div>
              <div className="flex flex-wrap items-center gap-0">
                {["ASSESS", "IDENTIFY", "REVIEW", "IMPROVE"].map((step, i, arr) => (
                  <div key={step} className="flex items-center">
                    <div style={{ padding: "14px 20px", border: `1px solid ${i === 0 ? AMBER : RULE}`, backgroundColor: i === 0 ? "rgba(212,168,83,0.08)" : "transparent" }}>
                      <div style={{ fontFamily: DM_MONO, fontSize: "11px", letterSpacing: "0.12em", color: i === 0 ? AMBER : CREAM_MUTED }}>
                        {step}
                      </div>
                    </div>
                    {i < arr.length - 1 && <div style={{ padding: "0 8px", color: RULE, fontSize: "18px", fontWeight: 300 }}>→</div>}
                  </div>
                ))}
              </div>

              {/* Minor readability adjustment: 11px -> 12px for this supporting list only */}
              <div className="mt-10 flex flex-col gap-2.5" style={{ borderLeft: `2px solid ${RULE}`, paddingLeft: "24px" }}>
                {["Classroom Assessments", "Chapter / Unit Tests", "Computer Based Tests (CBT)", "Full-Length NEET Mocks"].map((item) => (
                  <div key={item} style={{ fontFamily: DM_MONO, fontSize: "12px", letterSpacing: "0.06em", color: CREAM_MUTED }}>
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* Right */}
            <div>
              <div className="mb-5" style={{ fontFamily: FRAUNCES, fontWeight: 300, fontSize: "38px", lineHeight: "1.2", color: CREAM }}>
                Performance analytics
                <br />
                <span style={{ fontStyle: "italic", color: AMBER }}>close every gap.</span>
              </div>
              <p className="mb-6" style={{ fontSize: "15px", lineHeight: "1.7", color: CREAM_MUTED, fontWeight: 300 }}>
                Faculty review each result. Parents receive progress updates. Gaps identified in testing become the next learning targets.
              </p>
              <div className="flex items-center gap-2">
                <div className="h-px w-8" style={{ backgroundColor: AMBER }} />
                {/* Minor readability adjustment: 11px -> 12px */}
                <div style={{ fontFamily: DM_MONO, fontSize: "12px", letterSpacing: "0.10em", color: AMBER }}>
                  Parent progress updates included
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Admission CTA */}
      <section className="px-6 py-[100px] sm:px-12" style={{ borderTop: `1px solid ${RULE}` }}>
        <div className="mx-auto grid max-w-[1100px] grid-cols-1 items-center gap-12 min-[821px]:grid-cols-2 min-[821px]:gap-20">
          <div>
            <div className="mb-5 uppercase" style={{ fontFamily: DM_MONO, fontSize: "10px", letterSpacing: "0.16em", color: AMBER }}>
              Admissions
            </div>
            <div style={{ fontFamily: FRAUNCES, fontWeight: 300, fontSize: "clamp(40px, 5vw, 64px)", lineHeight: "1.05", color: CREAM, letterSpacing: "-0.01em" }}>
              Begin the
              <br />
              <span style={{ fontStyle: "italic", color: AMBER }}>right preparation</span>
              <br />
              today.
            </div>
          </div>
          <div className="flex flex-col items-start gap-5">
            <p style={{ fontSize: "16px", lineHeight: "1.7", color: CREAM_MUTED, fontWeight: 300 }}>
              Enquire about the NEET Achievement Program. We will share program details, schedules, and admission requirements.
            </p>
            <Link
              href={PRIMARY_CTA_HREF}
              className="bg-[#D4A853] uppercase transition-colors duration-200 ease-out hover:bg-[#E8C078]"
              style={{
                padding: "18px 40px",
                color: NAVY,
                fontFamily: DM_MONO,
                fontSize: "12px",
                letterSpacing: "0.14em",
                fontWeight: 500,
              }}
            >
              Admission Enquiry
            </Link>
            <div style={{ fontFamily: DM_MONO, fontSize: "11px", letterSpacing: "0.08em", color: CREAM_MUTED }}>
              Vishweshwarayya NEET | JEE Academy
            </div>
          </div>
        </div>
      </section>

      {/* Footer rule */}
      <div className="flex items-center justify-between px-6 py-7 sm:px-12" style={{ borderTop: `1px solid ${RULE}` }}>
        <div style={{ fontFamily: DM_MONO, fontSize: "10px", letterSpacing: "0.10em", color: RULE }}>
          NEET Achievement Program · 1st PUC &amp; 2nd PUC
        </div>
        <div style={{ fontFamily: DM_MONO, fontSize: "10px", letterSpacing: "0.10em", color: RULE }}>
          Board · NEET · One System
        </div>
      </div>
    </div>
  );
}
