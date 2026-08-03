"use client";

import { useState } from "react";
import { ChevronDownIcon } from "@/components/ui/icons";
import type { FaqCategory } from "@/content/faq";

export default function FaqAccordion({ categories }: { categories: FaqCategory[] }) {
  const [openKey, setOpenKey] = useState<string | null>(null);

  return (
    <div className="space-y-12">
      {categories.map((category) => (
        <div key={category.title}>
          <h2 className="text-xl font-bold text-primary sm:text-2xl">{category.title}</h2>

          <div className="mt-5 space-y-3">
            {category.items.map((item) => {
              const key = `${category.title}__${item.question}`;
              const isOpen = openKey === key;

              return (
                <div key={key} className="rounded-lg border border-line bg-surface">
                  <button
                    type="button"
                    onClick={() => setOpenKey(isOpen ? null : key)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-base font-semibold text-primary"
                  >
                    <span>{item.question}</span>
                    <ChevronDownIcon
                      className={`h-5 w-5 shrink-0 transition-transform duration-200 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  <div
                    className="grid transition-[grid-template-rows] duration-200 ease-out"
                    style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                  >
                    <div className="overflow-hidden">
                      <div className="space-y-1 border-t border-line px-5 py-4 text-sm leading-relaxed text-ink">
                        {item.answer.map((line, index) => (
                          <p key={index}>{line}</p>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
