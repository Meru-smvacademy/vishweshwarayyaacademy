import Link from "next/link";
import Container from "@/components/ui/Container";
import { ExternalLinkIcon } from "@/components/ui/icons";
import { FOOTER_LINK_GROUPS, KRITPREP_URL } from "@/config/nav";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-primary text-white">
      <Container className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
        <div>
          <p className="text-lg font-semibold">Sir M V NEET | JEE | KCET Academy</p>
          <p className="mt-2 text-sm text-white/80">Lingasuguru &amp; Sindhanuru</p>
          <a
            href={KRITPREP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-sm font-semibold text-primary transition-colors hover:bg-accent/20"
          >
            KRITPrep
            <ExternalLinkIcon className="h-3.5 w-3.5" />
            <span className="sr-only"> – opens KRITPrep, an external platform, in a new tab</span>
          </a>
        </div>

        {FOOTER_LINK_GROUPS.map((group) => (
          <nav key={group.heading} aria-label={group.heading}>
            <p className="text-sm font-semibold uppercase tracking-wide text-white/60">
              {group.heading}
            </p>
            <ul className="mt-3 flex flex-col gap-2">
              {group.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-white/80 hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </Container>

      <div className="border-t border-white/10">
        <Container className="flex flex-col gap-2 py-4 text-xs text-white/70 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {year} Sir M V NEET | JEE | KCET Academy. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/legal/privacy" className="hover:text-white">
              Privacy Policy
            </Link>
            <Link href="/legal/terms" className="hover:text-white">
              Terms
            </Link>
          </div>
        </Container>
      </div>
    </footer>
  );
}
