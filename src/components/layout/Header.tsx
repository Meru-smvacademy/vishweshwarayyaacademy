import Image from "next/image";
import Link from "next/link";
import { ACADEMY_PHONE, NAV_LINKS, PRIMARY_CTA_HREF, PRIMARY_CTA_LABEL } from "@/config/nav";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import MobileNav from "@/components/layout/MobileNav";
import { ChevronDownIcon, ExternalLinkIcon, PhoneIcon } from "@/components/ui/icons";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-surface/95 backdrop-blur supports-[backdrop-filter]:bg-surface/80">
      <Container className="flex min-h-20 !max-w-none items-center justify-between !px-6 xl:min-h-24">
        <Link href="/" className="flex shrink-0 items-center gap-3 xl:gap-4">
          <Image
            src="/branding/logo.svg"
            alt=""
            width={979}
            height={1091}
            priority
            unoptimized
            className="h-12 w-auto xl:h-[72px]"
          />
          <span className="flex flex-col justify-center leading-tight">
            <span className="font-manrope text-[14px] font-extrabold uppercase tracking-[0.012em] text-brand-heading xl:text-[19px]">
              Visveshwarayya
            </span>
            <span className="mt-0.5 font-manrope text-[9px] font-semibold uppercase tracking-[0.22em] text-brand-tagline xl:text-[11px]">
              NEET | JEE Academy
            </span>
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-4 xl:flex">
          {NAV_LINKS.map((item) => {
            if (item.isExternal && item.prominent) {
              return (
                <a
                  key={item.href}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-sm font-semibold text-primary transition-colors hover:bg-accent/20"
                >
                  {item.label}
                  <ExternalLinkIcon className="h-3.5 w-3.5" />
                  <span className="sr-only"> – opens {item.label}, an external platform, in a new tab</span>
                </a>
              );
            }

            if (item.isExternal) {
              return (
                <a
                  key={item.href}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-ink transition-colors hover:text-primary"
                >
                  {item.label}
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              );
            }

            if (item.children?.length) {
              return (
                <div key={item.href} className="group relative">
                  <Link
                    href={item.href}
                    className="inline-flex items-center gap-1 text-sm font-medium text-ink transition-colors hover:text-primary"
                  >
                    {item.label}
                    <ChevronDownIcon className="h-3.5 w-3.5 transition-transform group-hover:rotate-180 group-focus-within:rotate-180" />
                  </Link>
                  <div className="invisible absolute left-0 top-full z-10 mt-2 min-w-44 rounded-md border border-line bg-surface py-2 opacity-0 shadow-lg transition-opacity group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block px-4 py-2 text-sm text-ink hover:bg-surface-muted"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              );
            }

            return (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-ink transition-colors hover:text-primary"
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-4 xl:flex">
          {ACADEMY_PHONE && (
            <a
              href={`tel:${ACADEMY_PHONE}`}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-ink transition-colors hover:text-primary"
            >
              <PhoneIcon className="h-4 w-4" />
              {ACADEMY_PHONE}
            </a>
          )}
          <Button href={PRIMARY_CTA_HREF} variant="primary">
            {PRIMARY_CTA_LABEL}
          </Button>
        </div>

        <MobileNav />
      </Container>
    </header>
  );
}
