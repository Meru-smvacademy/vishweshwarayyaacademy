import type { ComponentType, SVGProps } from "react";

type PillarCardProps = {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  title: string;
  description?: string;
  items?: string[];
};

export default function PillarCard({ icon: Icon, title, description, items }: PillarCardProps) {
  return (
    <div className="rounded-lg border border-line bg-surface p-6">
      <div className="flex h-11 w-11 items-center justify-center rounded-md bg-primary/10 text-primary">
        <Icon className="h-5 w-5" />
      </div>
      <h3 className="mt-4 text-base font-semibold text-primary">{title}</h3>
      {description && <p className="mt-2 text-sm leading-relaxed text-muted">{description}</p>}
      {items && items.length > 0 && (
        <ul className="mt-3 space-y-1.5 text-sm text-muted">
          {items.map((item) => (
            <li key={item} className="flex items-start gap-2">
              <span
                className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary"
                aria-hidden="true"
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
