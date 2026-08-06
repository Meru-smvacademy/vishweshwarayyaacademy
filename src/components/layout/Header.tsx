import Image from "next/image";
import Link from "next/link";
import { ACADEMY_PHONE, NAV_LINKS, PRIMARY_CTA_HREF, PRIMARY_CTA_LABEL } from "@/config/nav";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import MobileNav from "@/components/layout/MobileNav";
import { ChevronDownIcon, ExternalLinkIcon, PhoneIcon } from "@/components/ui/icons";

const PRIMARY_NAV_LINKS = NAV_LINKS.filter((item) => item.desktopPrimary);
const MORE_NAV_LINKS = NAV_LINKS.filter((item) => !item.desktopPrimary);

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-surface/95 backdrop-blur supports-[backdrop-filter]:bg-surface/80">
      <Container className="flex min-h-24 !max-w-none items-center justify-between gap-x-6 !px-8 xl:min-h-28 xl:!px-10 xl:gap-x-10">
        <Link href="/" className="flex shrink-0 items-center gap-[18px] pl-5 xl:gap-[22px]">
          <Image
            src="/branding/logo.svg"
            alt=""
            width={979}
            height={1091}
            priority
            unoptimized
            className="h-[61px] w-auto shrink-0 self-center xl:h-[91px]"
          />
          <span className="flex flex-col justify-center leading-tight">
            <span className="font-manrope text-[16.8px] font-extrabold uppercase tracking-[0.012em] text-brand-heading xl:text-[22.8px]">
              Visveshwarayya
            </span>
            <span className="mt-0.5 font-manrope text-[9.8px] font-extrabold uppercase tracking-[0.205em] text-brand-tagline xl:text-[12px]">
              NEET | JEE Academy
            </span>
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-6 xl:flex">
          {PRIMARY_NAV_LINKS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="inline-flex items-center text-sm font-medium text-ink transition-colors duration-200 hover:text-primary"
            >
              {item.label}
            </Link>
          ))}

          <div className="group relative">
            <button
              type="button"
              aria-haspopup="true"
              className="inline-flex items-center gap-1 text-sm font-medium text-ink transition-colors duration-200 hover:text-primary"
            >
              More
              <ChevronDownIcon className="h-3.5 w-3.5 transition-transform duration-200 group-hover:rotate-180 group-focus-within:rotate-180" />
            </button>
            <div className="invisible absolute left-0 top-full z-10 mt-2 min-w-48 -translate-y-1 rounded-lg border border-line bg-surface py-2.5 opacity-0 shadow-xl transition-all duration-200 ease-out group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
              {MORE_NAV_LINKS.map((item) =>
                item.isExternal ? (
                  <a
                    key={item.href}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-4 py-2.5 text-sm text-ink transition-colors hover:bg-surface-muted"
                  >
                    {item.label}
                    <ExternalLinkIcon className="h-3.5 w-3.5" />
                    <span className="sr-only"> – opens {item.label}, an external platform, in a new tab</span>
                  </a>
                ) : (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block px-4 py-2.5 text-sm text-ink transition-colors hover:bg-surface-muted"
                  >
                    {item.label}
                  </Link>
                )
              )}
            </div>
          </div>
        </nav>

        <div className="hidden items-center gap-6 xl:flex">
          {ACADEMY_PHONE && (
            <a
              href={`tel:${ACADEMY_PHONE}`}
              className="inline-flex items-center gap-2 text-sm font-semibold text-ink transition-colors duration-200 hover:text-primary"
            >
              <PhoneIcon className="h-4 w-4 shrink-0" />
              <span>{ACADEMY_PHONE}</span>
            </a>
          )}
          <Button
            href={PRIMARY_CTA_HREF}
            variant="primary"
            className="!rounded-lg !px-7 !py-3.5 !transition-all !duration-200 hover:-translate-y-0.5 hover:shadow-md"
          >
            {PRIMARY_CTA_LABEL}
          </Button>
        </div>

        <MobileNav />
      </Container>
    </header>
  );
}
