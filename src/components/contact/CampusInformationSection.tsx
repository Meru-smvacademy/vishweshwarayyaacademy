import { ACADEMY_CONTACT } from "@/content/contactInfo";

const CREAM = "#f5f1eb";
const GOLD = "#c8a96e";
const FRAUNCES = "var(--font-fraunces), serif";
const OUTFIT = "var(--font-outfit), sans-serif";

const CAMPUSES = [
  {
    id: "01",
    name: "Lingasuguru",
    lines: [
      "Sir M Visveshwarayya PU Science Arts Commerce College,",
      "Opposite to Annadanegowda Hospital,",
      "Raichuru Bypass Road, Lingasuguru,",
      "Karnataka, India",
    ],
    href: ACADEMY_CONTACT.campuses[0].mapsUrl,
  },
  {
    id: "02",
    name: "Sindhanur",
    lines: ["Sri Kanakadasa Degree College Campus,", "Kustagi Road, Sindhanur – 584128,", "Raichur District, Karnataka"],
    href: ACADEMY_CONTACT.campuses[1].mapsUrl,
  },
];

function CampusPanel({ campus, index }: { campus: (typeof CAMPUSES)[number]; index: number }) {
  return (
    <article className="group relative flex flex-col" style={{ background: "#111110" }}>
      <div className="relative" style={{ height: "88px", background: "#1a1a18" }}>
        <span
          className="absolute left-6 top-6 text-xs font-medium"
          style={{ fontFamily: OUTFIT, color: GOLD, letterSpacing: "0.22em" }}
        >
          {campus.id}
        </span>
        {index === 0 && <div className="absolute left-0 top-0" style={{ width: "64px", height: "2px", background: GOLD }} />}
      </div>

      <div className="flex flex-1 flex-col justify-between px-8 py-8" style={{ borderTop: "1px solid rgba(200,169,110,0.18)" }}>
        <div>
          <h2 className="mb-4 leading-[0.92]" style={{ fontFamily: FRAUNCES, fontWeight: 600, fontSize: "clamp(2.25rem, 4vw, 3rem)", color: CREAM }}>
            {campus.name}
          </h2>
          <address className="not-italic" style={{ fontFamily: OUTFIT }}>
            {campus.lines.map((line) => (
              <span key={line} className="block" style={{ color: "#9a9390", fontSize: "0.875rem", lineHeight: "1.7", fontWeight: 300 }}>
                {line}
              </span>
            ))}
          </address>
        </div>

        <a
          href={campus.href}
          target="_blank"
          rel="noopener noreferrer"
          className="group/link mt-8 inline-flex items-center gap-2"
          style={{ fontFamily: OUTFIT }}
        >
          <span
            className="border-b pb-0.5 text-xs font-medium uppercase tracking-[0.18em] text-[#f5f1eb] transition-colors duration-200 group-hover/link:border-[#c8a96e] group-hover/link:text-[#c8a96e]"
            style={{ borderColor: "rgba(245,241,235,0.3)" }}
          >
            Get Directions
          </span>
          <span className="text-sm text-[#f5f1eb] transition-all duration-200 group-hover/link:translate-x-1 group-hover/link:text-[#c8a96e]">
            →
          </span>
        </a>
      </div>
    </article>
  );
}

export default function CampusInformationSection() {
  return (
    <main className="flex w-full items-center justify-center px-4 py-20" style={{ background: "#0c0c0b", fontFamily: OUTFIT }}>
      <section className="w-full" style={{ maxWidth: "1120px" }}>
        <header className="mb-14">
          <div className="mb-6 flex items-center gap-4">
            <div style={{ width: "32px", height: "1px", background: GOLD }} />
            <span className="text-xs font-medium uppercase tracking-[0.28em]" style={{ color: GOLD }}>
              Campus Information
            </span>
          </div>

          <h1
            className="leading-[0.9]"
            style={{ fontFamily: FRAUNCES, fontWeight: 300, fontSize: "clamp(2.75rem, 6vw, 5.5rem)", color: CREAM, letterSpacing: "-0.01em" }}
          >
            Two campuses.
            <br />
            <em style={{ fontStyle: "italic", fontWeight: 400, color: GOLD }}>One Academy.</em>
          </h1>
        </header>

        <div
          className="grid"
          style={{
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "1px",
            background: "rgba(200,169,110,0.14)",
            border: "1px solid rgba(200,169,110,0.14)",
          }}
        >
          {CAMPUSES.map((campus, i) => (
            <CampusPanel key={campus.id} campus={campus} index={i} />
          ))}
        </div>

        <div className="mt-10 flex items-center justify-between" style={{ borderTop: "1px solid rgba(200,169,110,0.18)", paddingTop: "1.25rem" }}>
          <span style={{ color: "#4a4845", fontSize: "0.75rem", letterSpacing: "0.12em" }}>Karnataka, India</span>
        </div>
      </section>
    </main>
  );
}
