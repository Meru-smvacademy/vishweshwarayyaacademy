import type { Metadata } from "next";
import GalleryHero from "@/components/gallery/GalleryHero";
import GalleryPhotoGridSection from "@/components/gallery/GalleryPhotoGridSection";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Gallery — Vishweshwarayya NEET | JEE Academy",
  description:
    "A glimpse into classrooms, campus life and student moments at Sir M Vishweshwarayya NEET | JEE Academy's Lingasuguru and Sindhanur campuses.",
  path: "/gallery",
});

export default function GalleryPage() {
  return (
    <>
      <GalleryHero />
      <GalleryPhotoGridSection />
    </>
  );
}
