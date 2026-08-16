import Link from "next/link";
import { KRITPREP_URL } from "@/config/nav";

const BG = "#0e0e0b";
const CREAM = "#f0e9d6";
const GOLD = "#c9a25c";
const INSTRUMENT_SANS = "var(--font-instrument-sans), system-ui, sans-serif";
const FRAUNCES = "var(--font-fraunces), Georgia, serif";

const NAV_LINKS = [
  { label: "About", href: "/about" },
  { label: "Programs", href: "/courses" },
  { label: "Admissions", href: "/admissions" },
  { label: "Contact", href: "/contact" },
];

const ARC_RADII = [60, 110, 160, 210, 260, 310, 360, 410, 460, 510];

export default function SignatureFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden" style={{ backgroundColor: BG, color: CREAM, fontFamily: INSTRUMENT_SANS }}>
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 right-0 h-[520px] w-[520px] opacity-[0.035]"
        viewBox="0 0 520 520"
        fill="none"
      >
        {ARC_RADII.map((r) => (
          <circle key={r} cx="520" cy="520" r={r} stroke={CREAM} strokeWidth="1" />
        ))}
      </svg>

      <div className="h-px opacity-50" style={{ background: "linear-gradient(to right, transparent, #c9a25c 30%, #c9a25c 70%, transparent)" }} />

      <div className="relative z-[1] mx-auto" style={{ maxWidth: "1400px", padding: "0 clamp(24px, 5vw, 80px)" }}>
        <div style={{ paddingTop: "clamp(56px, 8vw, 112px)", paddingBottom: "clamp(40px, 5vw, 72px)", borderBottom: "1px solid rgba(240, 233, 214, 0.1)" }}>
          <p style={{ fontFamily: FRAUNCES, fontSize: "clamp(44px, 8.5vw, 128px)", fontWeight: 300, lineHeight: 1.0, letterSpacing: "-0.02em", color: CREAM, margin: 0 }}>
            <span className="block">Come to Learn.</span>
            <span className="block italic" style={{ color: GOLD }}>
              Go to Serve.
            </span>
          </p>
        </div>

        <div
          className="grid items-start"
          style={{
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "clamp(40px, 5vw, 80px)",
            paddingTop: "clamp(36px, 4vw, 56px)",
            paddingBottom: "clamp(36px, 4vw, 56px)",
            borderBottom: "1px solid rgba(240, 233, 214, 0.1)",
          }}
        >
          <div>
            <p className="uppercase" style={{ fontSize: "10px", fontWeight: 600, letterSpacing: "0.2em", color: "rgba(240, 233, 214, 0.4)", margin: "0 0 6px" }}>
              Sir M
            </p>
            <p style={{ fontFamily: FRAUNCES, fontSize: "clamp(22px, 2.6vw, 34px)", fontWeight: 400, lineHeight: 1.1, letterSpacing: "0.01em", margin: "0 0 10px", color: CREAM }}>
              Vishweshwarayya
            </p>
            <p className="uppercase" style={{ fontSize: "clamp(11px, 1.1vw, 13px)", fontWeight: 600, letterSpacing: "0.18em", color: GOLD, margin: "0 0 14px" }}>
              NEET&nbsp;|&nbsp;JEE Academy
            </p>
            <div style={{ width: "28px", height: "1px", backgroundColor: GOLD, marginBottom: "14px", opacity: 0.7 }} />
            <p className="uppercase" style={{ fontSize: "clamp(11px, 1vw, 12px)", letterSpacing: "0.12em", color: "rgba(240, 233, 214, 0.4)", margin: 0 }}>
              Lingasuguru&nbsp;·&nbsp;Sindhanur
            </p>
          </div>

          <nav aria-label="Footer navigation">
            <p className="uppercase" style={{ fontSize: "10px", fontWeight: 600, letterSpacing: "0.2em", color: "rgba(240, 233, 214, 0.35)", margin: "0 0 20px" }}>
              Navigate
            </p>
            <ul className="m-0 flex list-none flex-col gap-2.5 p-0">
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="inline-block uppercase no-underline transition-colors duration-200 ease-out hover:!text-[#c9a25c]"
                    style={{
                      fontSize: "clamp(12px, 1.1vw, 14px)",
                      fontWeight: 500,
                      letterSpacing: "0.14em",
                      color: "rgba(240, 233, 214, 0.65)",
                    }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="uppercase" style={{ fontSize: "10px", fontWeight: 600, letterSpacing: "0.2em", color: "rgba(240, 233, 214, 0.35)", margin: "0 0 20px" }}>
              Learning Platform
            </p>
            <a
              href={KRITPREP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-fit flex-col gap-1.5 rounded-[2px] border transition-colors duration-200 ease-out hover:border-[rgba(201,162,92,0.5)]"
              style={{ padding: "16px 20px", borderColor: "rgba(201, 162, 92, 0.25)" }}
            >
              <span style={{ fontFamily: FRAUNCES, fontSize: "clamp(18px, 1.8vw, 24px)", fontWeight: 400, letterSpacing: "0.04em", color: CREAM }}>
                KRITPREP
              </span>
              <span className="uppercase" style={{ fontSize: "10px", fontWeight: 500, letterSpacing: "0.14em", color: "rgba(240, 233, 214, 0.4)" }}>
                Official Learning Platform
                <span className="sr-only"> (opens in a new tab)</span>
              </span>
            </a>
          </div>
        </div>

        <div
          className="flex flex-wrap items-center justify-between gap-x-8 gap-y-2"
          style={{ paddingTop: "clamp(20px, 2.5vw, 28px)", paddingBottom: "clamp(20px, 2.5vw, 28px)" }}
        >
          <p style={{ fontSize: "11px", letterSpacing: "0.06em", color: "rgba(240, 233, 214, 0.3)", margin: 0 }}>
            &copy; {year} Vishweshwarayya NEET | JEE Academy. All Rights Reserved.
          </p>
          <p style={{ fontSize: "11px", letterSpacing: "0.06em", color: "rgba(240, 233, 214, 0.3)", margin: 0 }}>
            <Link href="/legal/privacy" className="transition-colors duration-200 ease-out hover:!text-[#c9a25c]" style={{ color: "inherit" }}>
              Privacy Policy
            </Link>
            &nbsp;&middot;&nbsp;
            <Link href="/legal/terms" className="transition-colors duration-200 ease-out hover:!text-[#c9a25c]" style={{ color: "inherit" }}>
              Terms of Use
            </Link>
          </p>
          <p style={{ fontSize: "11px", letterSpacing: "0.06em", color: "rgba(240, 233, 214, 0.22)", margin: 0 }}>
            Technology Partner&nbsp;·&nbsp;{" "}
            <a
              href="https://kalbantt.in"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors duration-200 ease-out hover:!text-[#c9a25c]"
              style={{ color: "inherit" }}
            >
              Kalbantt Tech OPC Private Limited
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
