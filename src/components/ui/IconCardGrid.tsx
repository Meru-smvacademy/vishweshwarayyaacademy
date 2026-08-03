import type { ComponentType, SVGProps } from "react";

type IconCardGridProps = {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  items: string[];
  columns?: 2 | 3;
};

export default function IconCardGrid({ icon: Icon, items, columns = 3 }: IconCardGridProps) {
  const gridCols = columns === 2 ? "sm:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-3";

  return (
    <div className={`grid gap-4 ${gridCols}`}>
      {items.map((item) => (
        <div
          key={item}
          className="flex items-start gap-3 rounded-lg border border-line bg-surface p-5"
        >
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
            <Icon className="h-5 w-5" />
          </span>
          <p className="text-sm leading-relaxed text-ink">{item}</p>
        </div>
      ))}
    </div>
  );
}
