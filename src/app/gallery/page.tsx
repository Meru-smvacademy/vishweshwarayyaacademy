import type { Metadata } from "next";
import GalleryHero from "@/components/gallery/GalleryHero";
import GalleryGrid from "@/components/gallery/GalleryGrid";
import FinalCta from "@/components/home/FinalCta";

export const metadata: Metadata = {
  title: "Gallery — Sir M V NEET | JEE | KCET Academy",
  description: "",
};

export default function GalleryPage() {
  return (
    <>
      <GalleryHero />
      <GalleryGrid />
      <FinalCta />
    </>
  );
}
