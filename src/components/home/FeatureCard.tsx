import type { ComponentType, SVGProps } from "react";

type FeatureCardProps = {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  title: string;
  description: string;
};

export default function FeatureCard({ icon: Icon, title, description }: FeatureCardProps) {
  return (
    <div className="rounded-lg border border-line bg-surface p-7 transition-shadow hover:shadow-md">
      <div className="flex h-11 w-11 items-center justify-center rounded-md bg-primary/10 text-primary">
        <Icon className="h-5 w-5" />
      </div>
      <h3 className="mt-5 text-lg font-semibold tracking-tight text-primary">{title}</h3>
      <p className="mt-2.5 text-sm leading-relaxed text-muted">{description}</p>
    </div>
  );
}
