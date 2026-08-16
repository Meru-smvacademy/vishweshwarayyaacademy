import Link from "next/link";
import Container from "@/components/ui/Container";
import { ArrowUpRightIcon } from "@/components/ui/icons";
import { FOOTER_LINK_GROUPS, KRITPREP_URL } from "@/config/nav";

const linkClasses =
  "inline-block font-outfit text-[15px] text-white/70 transition-all duration-300 ease-out hover:translate-x-0.5 hover:text-white";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-scholarship-navy">
      <Container className="flex flex-col items-center gap-10 pb-8 pt-14 !px-6 sm:gap-12 sm:pb-10 sm:pt-16 sm:!px-10 lg:!max-w-7xl lg:gap-14 lg:pb-12 lg:pt-[72px] lg:!px-20">
        {/* Brand */}
        <div className="flex w-full flex-col items-center gap-4">
          <div className="flex flex-col items-center gap-3">
            <span aria-hidden="true" className="h-px w-24 bg-white/15" />
            <p className="font-outfit text-[10px] font-semibold uppercase tracking-[3px] text-white/40">
              Sir M
            </p>
            <p className="font-playfair-display text-[36px] font-medium tracking-[-1px] text-white sm:text-[52px] lg:text-[72px]">
              Vishweshwarayya
            </p>
          </div>
          <div className="flex flex-col items-center gap-2 text-center uppercase">
            <p className="font-outfit text-[13px] font-medium tracking-[3px] text-white/70 sm:text-[15px] sm:tracking-[4.5px]">
              NEET | JEE Academy
            </p>
            <p className="font-outfit text-[12px] font-light tracking-[1.5px] text-white/35 sm:text-[13px] sm:tracking-[2px]">
              Lingasuguru • Sindhanur
            </p>
          </div>
        </div>

        {/* Navigation */}
        <div className="grid w-full grid-cols-2 gap-x-6 gap-y-10 sm:gap-x-10 lg:flex lg:flex-row lg:items-start lg:justify-between lg:gap-0">
          {FOOTER_LINK_GROUPS.map((group) => (
            <nav key={group.heading} aria-label={group.heading} className="w-full lg:w-[220px]">
              <p className="font-outfit text-[12px] font-semibold uppercase tracking-[4px] text-footer-gold/85">
                {group.heading}
              </p>
              <ul className="mt-5 flex flex-col gap-3.5">
                {group.links.map((link) => (
                  <li key={link.label}>
                    {link.isExternal ? (
                      <a href={link.href} target="_blank" rel="noopener noreferrer" className={linkClasses}>
                        {link.label}
                        <span className="sr-only"> (opens in a new tab)</span>
                      </a>
                    ) : (
                      <Link href={link.href} className={linkClasses}>
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <nav aria-label="Learning" className="w-full lg:w-[220px]">
            <p className="font-outfit text-[12px] font-semibold uppercase tracking-[4px] text-footer-gold/85">
              Learning
            </p>
            <div className="mt-5 flex flex-col gap-1">
              <a
                href={KRITPREP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex w-fit items-center gap-1 font-outfit text-[15px] text-white/70 transition-colors duration-300 ease-out hover:text-white"
              >
                KRITPrep
                <ArrowUpRightIcon className="h-3 w-3 transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
              <p className="font-outfit text-[12px] font-light text-white/35">
                Official Learning Platform
              </p>
            </div>
          </nav>
        </div>

        {/* Bottom bar */}
        <div className="flex w-full flex-col gap-6">
          <span aria-hidden="true" className="h-px w-full bg-white/10" />
          <div className="flex flex-col items-center gap-2 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
            <p className="font-outfit text-[13px] font-light text-white/80">
              &copy; {year} Vishweshwarayya NEET | JEE Academy. All Rights Reserved.{" "}
              <Link href="/legal/privacy" className="text-white/50 underline-offset-2 transition-colors duration-300 ease-out hover:text-white hover:underline">
                Privacy Policy
              </Link>{" "}
              &bull;{" "}
              <Link href="/legal/terms" className="text-white/50 underline-offset-2 transition-colors duration-300 ease-out hover:text-white hover:underline">
                Terms of Use
              </Link>
            </p>
            <p className="font-outfit text-[13px] font-light text-white/50">
              Technology Partner &bull; Kalbantt Tech OPC Private Limited &bull;{" "}
              <a
                href="https://kalbantt.in"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-0.5 font-normal text-footer-gold/95 transition-colors duration-300 ease-out hover:text-footer-gold"
              >
                kalbantt.in
                <ArrowUpRightIcon className="h-2.5 w-2.5 transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
