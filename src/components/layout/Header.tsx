import Image from "next/image";
import Link from "next/link";
import { NAV_LINKS, PRIMARY_CTA_HREF, PRIMARY_CTA_LABEL } from "@/config/nav";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import MobileNav from "@/components/layout/MobileNav";
import { ArrowRightIcon, ChevronDownIcon, ExternalLinkIcon } from "@/components/ui/icons";

const PRIMARY_NAV_LINKS = NAV_LINKS.filter((item) => item.desktopPrimary);
const KRITPREP_LINK = NAV_LINKS.find((item) => item.prominent);
const MORE_NAV_LINKS = NAV_LINKS.filter((item) => !item.desktopPrimary && !item.prominent);

export default function Header() {
  return (
    <header className="sticky top-0 z-50 h-16 border-b border-header-border bg-header-bg shadow-[0px_1px_1.5px_0px_rgba(0,0,0,0.04)] sm:h-[72px] xl:h-[84px]">
      <Container className="flex h-full !max-w-none items-center justify-between !px-5 sm:!px-6 xl:!px-12">
        <Link href="/" className="flex shrink-0 items-center gap-[10px] sm:gap-[14px] xl:gap-[18px]">
          <Image
            src="/branding/logo.svg"
            alt=""
            width={979}
            height={1091}
            priority
            unoptimized
            className="h-[43px] w-auto shrink-0 sm:h-[58px] xl:h-[69px]"
          />
          <span className="flex flex-col justify-center leading-none">
            <span className="mb-[2px] font-outfit text-[7px] font-semibold uppercase tracking-[0.22em] text-header-muted sm:text-[8px] xl:text-[9px]">
              Sir M
            </span>
            <span className="font-outfit text-[18px] font-black tracking-[0.3px] text-header-navy sm:text-[25px] sm:tracking-[0.6px] xl:text-[37px] xl:tracking-[0.8px]">
              Vishweshwarayya
            </span>
            <span className="mt-1 font-outfit text-[11px] font-bold uppercase leading-[1.2] tracking-[0.08em] sm:text-[12px]">
              <span className="text-header-descriptor-navy">NEET</span>{" "}
              <span className="text-header-descriptor-navy/35">|</span>{" "}
              <span className="text-header-descriptor-navy">JEE</span>{" "}
              <span className="text-header-gold">Academy</span>
            </span>
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-[44px] xl:flex">
          {PRIMARY_NAV_LINKS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="font-sans text-[14px] font-medium text-header-muted transition-colors duration-200 hover:text-header-navy"
            >
              {item.label}
            </Link>
          ))}

          <div className="group relative">
            <button
              type="button"
              aria-haspopup="true"
              className="inline-flex items-center gap-1 font-sans text-[14px] font-medium text-header-muted transition-colors duration-200 hover:text-header-navy"
            >
              More
              <ChevronDownIcon className="h-3 w-3 transition-transform duration-200 group-hover:rotate-180 group-focus-within:rotate-180" />
            </button>
            <div className="invisible absolute left-0 top-full z-10 mt-2 min-w-48 -translate-y-1 rounded-lg border border-header-border bg-header-bg py-2.5 opacity-0 shadow-xl transition-all duration-200 ease-out group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
              {MORE_NAV_LINKS.map((item) =>
                item.isExternal ? (
                  <a
                    key={item.href}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-4 py-2.5 text-sm text-header-navy transition-colors hover:bg-surface-muted"
                  >
                    {item.label}
                    <ExternalLinkIcon className="h-3.5 w-3.5" />
                    <span className="sr-only"> – opens {item.label}, an external platform, in a new tab</span>
                  </a>
                ) : (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block px-4 py-2.5 text-sm text-header-navy transition-colors hover:bg-surface-muted"
                  >
                    {item.label}
                  </Link>
                )
              )}
            </div>
          </div>
        </nav>

        <div className="hidden items-center gap-[28px] xl:flex">
          {KRITPREP_LINK && (
            <a
              href={KRITPREP_LINK.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-sans text-[15px] font-semibold text-header-muted/85 transition-colors duration-200 hover:text-header-navy"
            >
              {KRITPREP_LINK.label}
              <ExternalLinkIcon className="h-3.5 w-3.5" />
              <span className="sr-only"> – opens KRITPrep, an external platform, in a new tab</span>
            </a>
          )}
          <Button href={PRIMARY_CTA_HREF} variant="headerPrimary">
            {PRIMARY_CTA_LABEL}
            <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-1" />
          </Button>
        </div>

        <MobileNav />
      </Container>
    </header>
  );
}
