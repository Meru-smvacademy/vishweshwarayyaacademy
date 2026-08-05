import type { ComponentType, SVGProps } from "react";

type HostelFeatureCardProps = {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  title: string;
  tint: "navy" | "orange";
};

export default function HostelFeatureCard({ icon: Icon, title, tint }: HostelFeatureCardProps) {
  const isNavy = tint === "navy";

  return (
    <div
      className={`rounded-2xl p-6 shadow-sm ${
        isNavy ? "bg-brand-heading/4" : "bg-brand-tagline/4"
      }`}
    >
      <div
        className={`flex h-12 w-12 items-center justify-center rounded-xl ${
          isNavy ? "bg-brand-heading/10 text-brand-heading" : "bg-brand-tagline/10 text-brand-tagline"
        }`}
      >
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="mt-4 text-base font-semibold text-primary">{title}</h3>
    </div>
  );
}
