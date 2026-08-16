import Link from "next/link";
import Container from "@/components/ui/Container";

const FRAUNCES = "var(--font-fraunces), serif";
const DM_SANS = "var(--font-dm-sans), sans-serif";

type SingleProgram = {
  id: string;
  num: string;
  name: string;
  type: "single";
  sub: string;
  href: string;
};

type OptionProgram = {
  id: string;
  num: string;
  name: string;
  type: "options";
  options: { id: string; label: string; href: string }[];
};

type Program = SingleProgram | OptionProgram;

const PROGRAMS: Program[] = [
  { id: "foundation", num: "01", name: "Foundation", type: "single", sub: "Classes 6–10", href: "/courses/foundation" },
  {
    id: "neet",
    num: "02",
    name: "NEET",
    type: "options",
    options: [
      { id: "neet-achievement", label: "Achievement", href: "/courses/neet-achievement" },
      { id: "neet-long-term", label: "Long-Term", href: "/courses/neet-long-term" },
    ],
  },
  {
    id: "jee",
    num: "03",
    name: "JEE",
    type: "options",
    options: [
      { id: "jee-achievement", label: "Achievement", href: "/courses/jee-achievement" },
      { id: "jee-long-term", label: "Long-Term", href: "/courses/jee-long-term" },
    ],
  },
  { id: "kcet", num: "04", name: "KCET", type: "single", sub: "Integrated", href: "/courses/kcet-integrated" },
];

function SubOptionBtn({ opt }: { opt: { id: string; label: string; href: string } }) {
  return (
    <Link
      href={opt.href}
      className="whitespace-nowrap border uppercase transition-colors duration-150 ease-out hover:border-[#d97706] hover:bg-[rgba(217,119,6,0.08)] hover:text-[#92400e]"
      style={{
        fontFamily: DM_SANS,
        fontSize: "0.62rem",
        letterSpacing: "0.1em",
        fontWeight: 500,
        padding: "0.42rem 0.85rem",
        borderColor: "rgba(10,25,70,0.18)",
        color: "rgba(10,25,70,0.55)",
      }}
    >
      {opt.label}
    </Link>
  );
}

function SingleTile({ program }: { program: SingleProgram }) {
  return (
    <Link
      href={program.href}
      className="group relative flex min-h-[172px] flex-col justify-between border bg-white transition-colors duration-200 ease-out hover:border-[#0c1e4a] hover:bg-[#0c1e4a]"
      style={{ padding: "1.5rem 1.6rem", borderColor: "rgba(10,25,70,0.11)" }}
    >
      <div
        className="absolute right-[1.6rem] top-[1.5rem] h-[6px] w-[6px] rounded-full border transition-colors duration-200 group-hover:border-white/45"
        style={{ borderColor: "rgba(10,25,70,0.14)" }}
      />
      <span
        className="select-none transition-colors duration-200 group-hover:text-white/30"
        style={{ fontFamily: DM_SANS, fontSize: "0.54rem", letterSpacing: "0.2em", fontWeight: 400, color: "rgba(10,25,70,0.22)" }}
      >
        {program.num}
      </span>
      <div>
        <p
          className="m-0 mb-[0.3rem] select-none text-[#0a1940] transition-colors duration-200 group-hover:text-white"
          style={{
            fontFamily: FRAUNCES,
            fontSize: "clamp(1.65rem, 2.8vw, 2.1rem)",
            fontVariationSettings: "'opsz' 36, 'wght' 400",
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
          }}
        >
          {program.name}
        </p>
        <p
          className="m-0 select-none uppercase transition-colors duration-200 group-hover:text-white/48"
          style={{ fontFamily: DM_SANS, fontSize: "0.58rem", letterSpacing: "0.13em", fontWeight: 400, color: "rgba(10,25,70,0.38)" }}
        >
          {program.sub}
        </p>
      </div>
    </Link>
  );
}

function OptionTile({ program }: { program: OptionProgram }) {
  return (
    <div
      className="flex min-h-[172px] flex-col justify-between border bg-white transition-colors duration-200 ease-out hover:border-[rgba(10,25,70,0.2)] hover:bg-[rgba(10,25,70,0.025)]"
      style={{ padding: "1.5rem 1.6rem", borderColor: "rgba(10,25,70,0.11)" }}
    >
      <span
        className="select-none"
        style={{ fontFamily: DM_SANS, fontSize: "0.54rem", letterSpacing: "0.2em", fontWeight: 400, color: "rgba(10,25,70,0.22)" }}
      >
        {program.num}
      </span>
      <div>
        <p
          className="m-0 mb-[0.9rem] select-none"
          style={{
            fontFamily: FRAUNCES,
            fontSize: "clamp(1.65rem, 2.8vw, 2.1rem)",
            fontVariationSettings: "'opsz' 36, 'wght' 400",
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
            color: "#0a1940",
          }}
        >
          {program.name}
        </p>
        <div className="flex flex-wrap gap-2">
          {program.options.map((opt) => (
            <SubOptionBtn key={opt.id} opt={opt} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function AdmissionsProgramSelector() {
  return (
    <section className="py-14" style={{ background: "#f3f6fb" }}>
      <style>{`
        .adm-selector-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.7rem;
        }
        @media (max-width: 480px) {
          .adm-selector-grid { gap: 0.5rem; }
          .adm-selector-grid > * { min-height: 148px !important; }
        }
      `}</style>

      <Container className="!max-w-[640px]">
        <div className="mb-6 flex items-center border-t pt-4" style={{ borderColor: "rgba(10,25,70,0.1)" }}>
          <span
            className="uppercase"
            style={{ fontFamily: DM_SANS, fontSize: "0.58rem", letterSpacing: "0.22em", fontWeight: 400, color: "#0a1940" }}
          >
            Choose Your Program
          </span>
        </div>

        <div className="adm-selector-grid">
          {PROGRAMS.map((p) => (p.type === "single" ? <SingleTile key={p.id} program={p} /> : <OptionTile key={p.id} program={p} />))}
        </div>
      </Container>
    </section>
  );
}
