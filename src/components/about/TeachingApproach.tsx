import type { CSSProperties } from "react";
import Container from "@/components/ui/Container";

const R = 228;
const CX = 350;
const CY = 350;
const toRad = (d: number) => (d * Math.PI) / 180;

function polar(deg: number) {
  return {
    x: parseFloat((CX + R * Math.cos(toRad(deg))).toFixed(2)),
    y: parseFloat((CY + R * Math.sin(toRad(deg))).toFixed(2)),
  };
}

type Dir = "up" | "down" | "left" | "right";

type Stage = {
  id: string;
  num: string;
  desc: string;
  angle: number;
  dir: Dir;
  key: boolean;
};

// Locked content — the six-stage adaptive teaching loop. ADAPT (key: true)
// connects back to UNDERSTAND (key: true) via the amber feedback arc below,
// communicating continuous improvement.
const STAGES: Stage[] = [
  { id: "UNDERSTAND", num: "01", desc: "How they learn", angle: -90, dir: "up", key: true },
  { id: "DESIGN", num: "02", desc: "Right approach", angle: -30, dir: "right", key: false },
  { id: "TEACH", num: "03", desc: "Teach with purpose", angle: 30, dir: "right", key: false },
  { id: "TEST", num: "04", desc: "Check understanding", angle: 90, dir: "down", key: false },
  { id: "ANALYSE", num: "05", desc: "Read the progress", angle: 150, dir: "left", key: false },
  { id: "ADAPT", num: "06", desc: "Change what comes next", angle: 210, dir: "left", key: true },
];

const H_PAD = 42; // horizontal label offset from node (left/right)
const V_PAD = 40; // vertical label offset from node (up/down)
const LINE = 18; // line height between label rows

function getLabel(x: number, y: number, dir: Dir) {
  switch (dir) {
    case "up":
      return {
        anchor: "middle" as const,
        num: { x, y: y - V_PAD - LINE * 2 },
        name: { x, y: y - V_PAD - LINE },
        desc: { x, y: y - V_PAD },
      };
    case "down":
      return {
        anchor: "middle" as const,
        num: { x, y: y + V_PAD },
        name: { x, y: y + V_PAD + LINE },
        desc: { x, y: y + V_PAD + LINE * 2 },
      };
    case "right":
      return {
        anchor: "start" as const,
        num: { x: x + H_PAD, y: y - 10 },
        name: { x: x + H_PAD, y: y + 8 },
        desc: { x: x + H_PAD, y: y + 26 },
      };
    case "left":
      return {
        anchor: "end" as const,
        num: { x: x - H_PAD, y: y - 10 },
        name: { x: x - H_PAD, y: y + 8 },
        desc: { x: x - H_PAD, y: y + 26 },
      };
  }
}

const AMBER = "#D4882A";
const CREAM = "rgba(242,237,228,";
const ARROW_ID = "teaching-loop-arrow";
const GLOW_ID = "teaching-loop-glow";

const nodes = STAGES.map((s) => ({ ...s, ...polar(s.angle) }));
const pU = polar(-90); // UNDERSTAND (top)
const pA = polar(210); // ADAPT (upper-left)

// Main arc: UNDERSTAND → clockwise 300° → ADAPT
const mainArc = `M ${pU.x} ${pU.y} A ${R} ${R} 0 1 1 ${pA.x} ${pA.y}`;
// Feedback arc: ADAPT → clockwise 60° short arc → UNDERSTAND (the amber "loop closes" path)
const feedArc = `M ${pA.x} ${pA.y} A ${R} ${R} 0 0 1 ${pU.x} ${pU.y}`;
// Full loop for the traveling dot's animateMotion (two semicircles)
const fullLoop = `M ${pU.x} ${pU.y} A ${R} ${R} 0 1 1 ${CX} ${CY + R} A ${R} ${R} 0 1 1 ${pU.x} ${pU.y}`;

const vignetteStyle: CSSProperties = {
  background:
    "radial-gradient(ellipse 80% 80% at 50% 50%, transparent 40%, rgba(4,10,20,0.6) 100%)",
};

export default function TeachingApproach() {
  return (
    <section className="relative overflow-hidden bg-teaching-navy py-16 sm:py-20 lg:py-24">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0" style={vignetteStyle} />

      <Container className="relative max-w-4xl">
        <h2 className="mx-auto mb-3 max-w-[680px] text-center font-fraunces text-[42px] font-light italic leading-[1.06] tracking-[-0.025em] text-teaching-cream sm:text-[56px] lg:text-[68px]">
          Teaching that adapts
          <br />
          <span className="font-bold not-italic">to the learner.</span>
        </h2>

        <p className="mx-auto mb-7 max-w-[380px] text-center text-[14px] leading-[1.9] text-teaching-cream/40">
          Understand how they learn. Design the right approach.
          <br />
          Teach. Test. Analyse. Adapt.
          <br />
          Then do it again.
        </p>

        {/* Desktop circular diagram */}
        <div className="mb-8 hidden justify-center md:flex">
          <svg
            viewBox="0 0 700 700"
            style={{ width: "min(560px, 86vw)", overflow: "visible" }}
            className="block"
            aria-label="The teaching feedback loop: Understand, Design, Teach, Test, Analyse, Adapt — cycling back to Understand"
          >
            <defs>
              <marker
                id={ARROW_ID}
                markerWidth="8"
                markerHeight="8"
                refX="7"
                refY="4"
                orient="auto"
                markerUnits="strokeWidth"
              >
                <path d="M 0 0 L 8 4 L 0 8 z" fill={AMBER} />
              </marker>
              <filter id={GLOW_ID} x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Concentric background rings */}
            <circle cx={CX} cy={CY} r={R} fill="none" stroke={`${CREAM}0.08)`} strokeWidth="1.5" />
            <circle cx={CX} cy={CY} r={R * 0.65} fill="none" stroke={`${CREAM}0.04)`} strokeWidth="1" />
            <circle cx={CX} cy={CY} r={R * 0.33} fill="none" stroke={`${CREAM}0.03)`} strokeWidth="1" />

            {/* Radial tick marks at each stage */}
            {nodes.map((n) => {
              const cos = Math.cos(toRad(n.angle));
              const sin = Math.sin(toRad(n.angle));
              return (
                <line
                  key={`tick-${n.id}`}
                  x1={(CX + (R + 6) * cos).toFixed(2)}
                  y1={(CY + (R + 6) * sin).toFixed(2)}
                  x2={(CX + (R + 22) * cos).toFixed(2)}
                  y2={(CY + (R + 22) * sin).toFixed(2)}
                  stroke={n.key ? AMBER : `${CREAM}0.25)`}
                  strokeWidth={n.key ? "2.5" : "1.5"}
                />
              );
            })}

            {/* Main arc */}
            <path d={mainArc} fill="none" stroke={`${CREAM}0.3)`} strokeWidth="2" strokeLinecap="round" />

            {/* Feedback arc — amber, glowing: ADAPT closing the loop back to UNDERSTAND */}
            <path
              d={feedArc}
              fill="none"
              stroke={AMBER}
              strokeWidth="3.5"
              strokeLinecap="round"
              filter={`url(#${GLOW_ID})`}
              markerEnd={`url(#${ARROW_ID})`}
            />
            {/* Traveling dot — subtle, restrained motion communicating the continuous cycle */}
            <circle className="teaching-loop-dot" r="4.5" fill={`${CREAM}0.85)`}>
              <animateMotion path={fullLoop} dur="11s" repeatCount="indefinite" />
            </circle>

            {/* Center: THE LEARNER — the system's fixed point */}
            <circle
              cx={CX}
              cy={CY}
              r="66"
              fill="none"
              stroke={`${CREAM}0.09)`}
              strokeWidth="1"
              strokeDasharray="3 6"
            />
            <text
              x={CX}
              y={CY - 11}
              textAnchor="middle"
              fill={`${CREAM}0.5)`}
              fontSize="10"
              letterSpacing="4.5"
              fontFamily="var(--font-sans)"
              fontWeight="600"
            >
              THE
            </text>
            <text
              x={CX}
              y={CY + 16}
              textAnchor="middle"
              fill={`${CREAM}0.88)`}
              fontSize="22"
              letterSpacing="2"
              fontFamily="var(--font-fraunces)"
              fontWeight="300"
              fontStyle="italic"
            >
              Learner
            </text>

            {/* Node labels */}
            {nodes.map((n) => {
              const lp = getLabel(n.x, n.y, n.dir);
              const nameColor = n.key ? AMBER : `${CREAM}0.9)`;
              const numColor = n.key ? "rgba(212,136,42,0.65)" : `${CREAM}0.38)`;
              const dotColor = n.key ? AMBER : `${CREAM}0.72)`;
              const dotR = n.key ? 9 : 6.5;

              return (
                <g key={n.id}>
                  <circle cx={n.x} cy={n.y} r={dotR} fill={dotColor} />

                  <text
                    x={lp.num.x}
                    y={lp.num.y}
                    textAnchor={lp.anchor}
                    fill={numColor}
                    fontSize="11"
                    fontFamily="'Courier New', monospace"
                    letterSpacing="1.5"
                    fontWeight="400"
                  >
                    {n.num}
                  </text>

                  <text
                    x={lp.name.x}
                    y={lp.name.y}
                    textAnchor={lp.anchor}
                    fill={nameColor}
                    fontSize="14"
                    fontFamily="var(--font-sans)"
                    fontWeight="700"
                    letterSpacing="2"
                  >
                    {n.id}
                  </text>

                  <text
                    x={lp.desc.x}
                    y={lp.desc.y}
                    textAnchor={lp.anchor}
                    fill={`${CREAM}0.35)`}
                    fontSize="11.5"
                    fontFamily="var(--font-sans)"
                    fontWeight="400"
                  >
                    {n.desc}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Mobile vertical layout — the circle recomposed as a stepped timeline */}
        <div className="relative mx-auto mb-10 max-w-[340px] md:hidden">
          <div
            aria-hidden="true"
            className="absolute left-[10px] top-[14px] w-px"
            style={{
              height: "calc(100% - 74px)",
              background:
                "linear-gradient(to bottom, rgba(212,136,42,0.56) 0%, rgba(242,237,228,0.1) 55%, rgba(242,237,228,0.04) 100%)",
            }}
          />

          <ol className="list-none">
            {STAGES.map((s) => (
              <li key={s.id} className="relative mb-7 flex gap-5">
                <span
                  className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
                  style={{
                    background: s.key ? AMBER : "rgba(242,237,228,0.1)",
                    border: s.key ? "none" : "1px solid rgba(242,237,228,0.18)",
                  }}
                >
                  <span
                    className="font-mono text-[8px] font-bold"
                    style={{ color: s.key ? "#0d1b2e" : "rgba(242,237,228,0.55)" }}
                  >
                    {s.num}
                  </span>
                </span>
                <span className="pt-px">
                  <span
                    className="mb-1 block text-[10px] font-bold uppercase tracking-[0.2em]"
                    style={{ color: s.key ? AMBER : `${CREAM}0.85)` }}
                  >
                    {s.id}
                  </span>
                  <span className="block text-[12px] leading-[1.55] text-teaching-cream/40">{s.desc}</span>
                </span>
              </li>
            ))}
          </ol>

          <div
            className="mt-1 flex items-start gap-3 pt-[18px]"
            style={{ borderTop: `1px solid ${AMBER}35` }}
          >
            <span aria-hidden="true" className="shrink-0 text-[22px] leading-none text-teaching-amber">
              ↩
            </span>
            <p className="text-[11px] leading-[1.65] tracking-[0.04em] text-teaching-cream/40">
              Then do it again.
            </p>
          </div>
        </div>

        <p className="text-center font-fraunces text-[17px] font-light italic tracking-[0.01em] text-teaching-cream/40 sm:text-[19px]">
          Teaching that responds. Not repeats.
        </p>
      </Container>
    </section>
  );
}
