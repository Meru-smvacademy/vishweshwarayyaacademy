import PlaceholderTag from "@/components/ui/PlaceholderTag";

type StoryCardProps = {
  initials: string;
  name: string;
  meta: string;
  quote: string;
};

export default function StoryCard({ initials, name, meta, quote }: StoryCardProps) {
  return (
    <div className="rounded-lg border border-line bg-surface p-6">
      <div className="flex items-center gap-3">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-white">
          {initials}
        </span>
        <div>
          <p className="text-sm font-semibold text-primary">{name}</p>
          <p className="text-xs text-muted">{meta}</p>
        </div>
      </div>
      <p className="mt-4 text-sm italic text-ink">&ldquo;{quote}&rdquo;</p>
      <div className="mt-4">
        <PlaceholderTag />
      </div>
    </div>
  );
}
