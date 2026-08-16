import type { Metadata } from "next";
import GalleryHero from "@/components/gallery/GalleryHero";
import GalleryPhotoGridSection from "@/components/gallery/GalleryPhotoGridSection";

export const metadata: Metadata = {
  title: "Gallery — Vishweshwarayya NEET | JEE Academy",
  description: "",
};

export default function GalleryPage() {
  return (
    <>
      <GalleryHero />
      <GalleryPhotoGridSection />
    </>
  );
}
