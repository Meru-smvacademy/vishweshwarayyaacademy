"use client";

import { useState, type CSSProperties, type PointerEvent } from "react";

const OUTFIT = "var(--font-outfit), sans-serif";
const INSTRUMENT_SERIF = "var(--font-instrument-serif), serif";

const STEPS = [
  { num: "01", verb: "ENQUIRE", desc: "Fill the admission enquiry form." },
  { num: "02", verb: "COUNSEL", desc: "Discuss the student's academic needs." },
  { num: "03", verb: "CHOOSE", desc: "Select the right program." },
  { num: "04", verb: "JOIN", desc: "Complete admission formalities and begin." },
];

function Connector({ visible }: { visible: boolean }) {
  return (
    <div
      className="flex flex-shrink-0 items-center self-start transition-opacity duration-300 ease-out"
      style={{ marginTop: "56px", opacity: visible ? 0.5 : 0.2 }}
    >
      <div className="h-px w-7" style={{ background: "#1a3a6b" }} />
      <svg width="8" height="11" viewBox="0 0 8 11" fill="none" aria-hidden="true">
        <path d="M1.5 1L6.5 5.5L1.5 10" stroke="#1a3a6b" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

export default function AdmissionProcessSection() {
  const [active, setActive] = useState<number | null>(null);
  const [hovering, setHovering] = useState(false);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setCursor({ x: event.clientX - rect.left, y: event.clientY - rect.top });
  };

  const mask = `radial-gradient(circle at ${cursor.x}px ${cursor.y}px, #000 72px, transparent 120px)`;

  const dotsHover: CSSProperties = {
    position: "absolute",
    inset: 0,
    backgroundImage: "radial-gradient(circle at center, rgba(157, 200, 255, 0.52) 2.16px, transparent 2.36px)",
    backgroundPosition: "center",
    backgroundSize: "18px 18px",
    opacity: hovering ? 1 : 0,
    maskImage: mask,
    WebkitMaskImage: mask,
    transition: "opacity 0.15s ease",
    pointerEvents: "none",
  };

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{ backgroundColor: "#f8fbff" }}
      onPointerEnter={() => setHovering(true)}
      onPointerMove={handlePointerMove}
      onPointerLeave={() => setHovering(false)}
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: "radial-gradient(circle at center, rgba(157, 200, 255, 0.52) 1.2px, transparent 1.4px)",
          backgroundPosition: "center",
          backgroundSize: "18px 18px",
        }}
      />
      <div className="pointer-events-none absolute inset-0" style={dotsHover} />

      <section className="relative z-[1] px-6 py-20 sm:px-12 sm:py-24">
        <div className="mb-12 flex items-center gap-3">
          <div className="h-px w-7" style={{ background: "rgba(26, 58, 107, 0.35)" }} />
          <span
            className="uppercase"
            style={{ fontFamily: OUTFIT, fontSize: "12px", fontWeight: 600, letterSpacing: "0.2em", color: "#2a4fa0" }}
          >
            Admissions
          </span>
        </div>

        <h2
          className="mb-[72px]"
          style={{
            fontFamily: INSTRUMENT_SERIF,
            fontSize: "clamp(36px, 5.5vw, 60px)",
            fontWeight: 400,
            fontStyle: "italic",
            color: "#0d1428",
            lineHeight: 1.1,
            letterSpacing: "-0.015em",
          }}
        >
          How Admission Works
        </h2>

        <div className="admission-steps-row flex items-start">
          {STEPS.map((step, i) => (
            <div key={step.num} className="flex items-start" style={{ flex: 1 }}>
              <div
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => setActive(null)}
                className="cursor-default"
                style={{
                  flex: 1,
                  transform: active === i ? "translateY(-5px)" : "translateY(0)",
                  transition: "transform 0.35s cubic-bezier(0.22, 1, 0.36, 1)",
                }}
              >
                <div
                  className="select-none"
                  style={{
                    fontFamily: OUTFIT,
                    fontSize: "clamp(76px, 9vw, 108px)",
                    fontWeight: 700,
                    lineHeight: 1,
                    color: active === i ? "rgba(26, 58, 107, 0.16)" : "rgba(26, 58, 107, 0.09)",
                    marginBottom: "-10px",
                    letterSpacing: "-0.04em",
                    transition: "color 0.35s ease",
                  }}
                >
                  {step.num}
                </div>

                <div
                  className="rounded-[1px]"
                  style={{
                    width: active === i ? "36px" : "20px",
                    height: "2px",
                    background: active === i ? "#1a3a6b" : "rgba(26, 58, 107, 0.25)",
                    marginBottom: "18px",
                    transition: "width 0.35s ease, background 0.35s ease",
                  }}
                />

                <div
                  className="uppercase"
                  style={{
                    fontFamily: OUTFIT,
                    fontSize: "14px",
                    fontWeight: 700,
                    letterSpacing: "0.18em",
                    color: active === i ? "#0d1428" : "#1e4bad",
                    marginBottom: "12px",
                    transition: "color 0.35s ease",
                  }}
                >
                  {step.verb}
                </div>

                <div
                  style={{
                    fontFamily: OUTFIT,
                    fontSize: "15px",
                    fontWeight: 400,
                    lineHeight: 1.65,
                    color: active === i ? "#3a4a6a" : "#5f6e90",
                    maxWidth: "160px",
                    transition: "color 0.35s ease",
                  }}
                >
                  {step.desc}
                </div>
              </div>

              {i < STEPS.length - 1 && <Connector visible={active === i || active === i + 1} />}
            </div>
          ))}
        </div>
      </section>

      <style>{`
        @media (max-width: 700px) {
          .admission-steps-row {
            flex-direction: column !important;
            gap: 0 !important;
            border-left: 1px solid rgba(26, 58, 107, 0.14) !important;
            padding-left: 28px !important;
          }
          .admission-steps-row > div {
            flex-direction: column !important;
            padding-bottom: 40px !important;
            position: relative !important;
          }
          .admission-steps-row > div::before {
            content: '';
            position: absolute;
            left: -33px;
            top: 20px;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            border: 1.5px solid rgba(26, 58, 107, 0.4);
            background: #f8fbff;
          }
        }
      `}</style>
    </div>
  );
}
