import type { ComponentType, SVGProps } from "react";
import Container from "@/components/ui/Container";
import ContentBlocks from "@/components/ui/ContentBlocks";
import IconCardGrid from "@/components/ui/IconCardGrid";
import IconChecklist from "@/components/ui/IconChecklist";
import SectionHeading from "@/components/ui/SectionHeading";
import type { ContentBlock } from "@/content/shared";

type IconListSectionProps = {
  eyebrow?: string;
  title: string;
  intro?: ContentBlock[];
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  items: string[];
  variant?: "grid" | "checklist";
  columns?: 2 | 3;
  note?: string;
  tinted?: boolean;
};

export default function IconListSection({
  eyebrow,
  title,
  intro,
  icon,
  items,
  variant = "grid",
  columns = 3,
  note,
  tinted = false,
}: IconListSectionProps) {
  return (
    <section className={`py-14 sm:py-20 ${tinted ? "bg-surface-muted" : ""}`}>
      <Container>
        <div className="mx-auto max-w-3xl">
          <SectionHeading eyebrow={eyebrow} title={title} align="left" />
          {intro && (
            <div className="mt-6">
              <ContentBlocks blocks={intro} />
            </div>
          )}
        </div>

        <div className="mx-auto mt-8 max-w-5xl">
          {variant === "grid" ? (
            <IconCardGrid icon={icon} items={items} columns={columns} />
          ) : (
            <IconChecklist icon={icon} items={items} />
          )}
        </div>

        {note && <p className="mx-auto mt-4 max-w-3xl text-sm italic text-muted">{note}</p>}
      </Container>
    </section>
  );
}
