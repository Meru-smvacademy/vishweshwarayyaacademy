type PlaceholderTagProps = {
  label?: string;
  className?: string;
};

export default function PlaceholderTag({
  label = "Placeholder content",
  className = "",
}: PlaceholderTagProps) {
  return (
    <span
      className={`inline-flex items-center gap-1 whitespace-nowrap rounded-full bg-warning/10 px-2.5 py-0.5 text-xs font-semibold text-warning ${className}`}
    >
      {label}
    </span>
  );
}
