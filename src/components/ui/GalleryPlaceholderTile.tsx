import { ImageIcon } from "@/components/ui/icons";

export default function GalleryPlaceholderTile() {
  return (
    <div className="flex aspect-[4/3] w-full flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-line bg-surface-muted">
      <ImageIcon className="h-8 w-8 text-muted" />
      <span className="text-xs font-medium text-muted">Photos coming soon</span>
    </div>
  );
}
