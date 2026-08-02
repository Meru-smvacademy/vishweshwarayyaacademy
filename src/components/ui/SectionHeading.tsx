import PlaceholderTag from "@/components/ui/PlaceholderTag";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  placeholder?: boolean;
  className?: string;
};

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  placeholder = false,
  className = "",
}: SectionHeadingProps) {
  const isCentered = align === "center";

  return (
    <div className={`max-w-2xl ${isCentered ? "mx-auto text-center" : "text-left"} ${className}`}>
      {eyebrow && (
        <p className="text-sm font-semibold uppercase tracking-wide text-primary">{eyebrow}</p>
      )}
      <h2 className="mt-2 text-2xl font-bold text-primary sm:text-3xl">{title}</h2>
      {description && <p className="mt-3 text-base text-muted">{description}</p>}
      {placeholder && (
        <div className={`mt-3 flex ${isCentered ? "justify-center" : "justify-start"}`}>
          <PlaceholderTag label="Placeholder content — pending real data" />
        </div>
      )}
    </div>
  );
}
