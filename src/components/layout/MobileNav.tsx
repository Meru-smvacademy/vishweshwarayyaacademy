"use client";

import Link from "next/link";
import { useState } from "react";
import { NAV_LINKS, PRIMARY_CTA_HREF, PRIMARY_CTA_LABEL } from "@/config/nav";
import Button from "@/components/ui/Button";
import { ChevronDownIcon, CloseIcon, ExternalLinkIcon, MenuIcon } from "@/components/ui/icons";

export default function MobileNav() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <div className="xl:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-nav-drawer"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((prev) => !prev)}
        className="inline-flex h-11 w-11 items-center justify-center rounded-md text-ink hover:bg-surface-muted"
      >
        {open ? <CloseIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
      </button>

      {open && (
        <div
          id="mobile-nav-drawer"
          className="fixed inset-x-0 bottom-0 top-16 z-40 overflow-y-auto bg-surface"
        >
          <nav aria-label="Mobile" className="flex flex-col gap-1 px-4 py-6">
            {NAV_LINKS.map((item) => {
              if (item.isExternal) {
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={close}
                    className="inline-flex items-center gap-1.5 rounded-full border border-accent/40 bg-accent/10 px-3 py-2 text-base font-semibold text-primary hover:bg-accent/20"
                  >
                    {item.label}
                    <ExternalLinkIcon className="h-4 w-4" />
                    <span className="sr-only"> – opens {item.label}, an external platform, in a new tab</span>
                  </a>
                );
              }

              if (item.children?.length) {
                return (
                  <details key={item.href} className="group rounded-md">
                    <summary className="flex cursor-pointer list-none items-center justify-between rounded-md px-3 py-3 text-base font-medium text-ink hover:bg-surface-muted">
                      {item.label}
                      <ChevronDownIcon className="h-4 w-4 transition-transform group-open:rotate-180" />
                    </summary>
                    <div className="flex flex-col gap-1 py-1 pl-6">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={close}
                          className="rounded-md px-3 py-2 text-sm text-muted hover:bg-surface-muted hover:text-ink"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </details>
                );
              }

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={close}
                  className="rounded-md px-3 py-3 text-base font-medium text-ink hover:bg-surface-muted"
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="border-t border-line px-4 py-6">
            <Button href={PRIMARY_CTA_HREF} variant="primary" className="w-full" onClick={close}>
              {PRIMARY_CTA_LABEL}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
