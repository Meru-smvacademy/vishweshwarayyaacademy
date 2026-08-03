import type { ComponentType, SVGProps } from "react";
import Image from "next/image";
import GalleryPlaceholderTile from "@/components/ui/GalleryPlaceholderTile";
import PlaceholderTag from "@/components/ui/PlaceholderTag";

type GalleryImage = { src: string; alt: string };

type GalleryCategoryCardProps = {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  title: string;
  images?: GalleryImage[];
};

export default function GalleryCategoryCard({ icon: Icon, title, images }: GalleryCategoryCardProps) {
  const hasPhotos = Boolean(images && images.length > 0);

  return (
    <div className="rounded-lg border border-line bg-surface p-5">
      <div className="flex items-center gap-3">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
          <Icon className="h-5 w-5" />
        </span>
        <h3 className="text-base font-semibold text-primary">{title}</h3>
      </div>

      <div className="mt-4">
        {hasPhotos ? (
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg">
            <Image src={images![0].src} alt={images![0].alt} fill className="object-cover" />
          </div>
        ) : (
          <GalleryPlaceholderTile />
        )}
      </div>

      {!hasPhotos && (
        <div className="mt-3">
          <PlaceholderTag label="Photos pending" />
        </div>
      )}
    </div>
  );
}
