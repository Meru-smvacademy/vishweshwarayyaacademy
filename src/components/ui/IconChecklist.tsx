import type { ComponentType, SVGProps } from "react";

type IconChecklistProps = {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  items: string[];
};

export default function IconChecklist({ icon: Icon, items }: IconChecklistProps) {
  return (
    <div className="rounded-lg border border-line bg-surface p-6">
      <ul className="space-y-3">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-3">
            <Icon className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
            <span className="text-sm text-ink">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
