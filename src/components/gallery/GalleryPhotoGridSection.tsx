import { createClient } from "@/lib/supabase/server";
import { getGalleryPhotoUrl } from "@/lib/supabase/storage";
import PhotoCell, { CATEGORY_COLOR, type PhotoSlot, type PhotoSpan } from "@/components/gallery/PhotoCell";

const SANS = "var(--font-dm-sans), system-ui, sans-serif";
const DISPLAY = "var(--font-playfair-display), Georgia, serif";

// No DB column drives visual "span" (featured/tall/square/wide) — it's a
// purely presentational property. A repeating pattern preserves the
// original curated composition's masonry-style variety without inventing a
// new field.
const SPAN_PATTERN: PhotoSpan[] = ["featured", "tall", "square", "wide", "square", "square"];

async function getPublishedGalleryPhotos(): Promise<PhotoSlot[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("gallery_photos")
    .select("id, title, category, photo_path")
    .eq("is_published", true)
    .order("display_order", { ascending: true })
    .order("created_at", { ascending: true });

  if (error || !data) {
    return [];
  }

  const slots: PhotoSlot[] = [];
  for (const row of data) {
    const src = getGalleryPhotoUrl(row.photo_path);
    if (!src) continue;

    slots.push({
      id: row.id,
      category: row.category,
      span: SPAN_PATTERN[slots.length % SPAN_PATTERN.length],
      alt: row.title,
      src,
    });
  }

  return slots;
}

export default async function GalleryPhotoGridSection() {
  const photos = await getPublishedGalleryPhotos();

  return (
    <section className="w-full" style={{ backgroundColor: "#0a0a0a", fontFamily: SANS }}>
      <div className="mx-auto flex max-w-screen-xl flex-col gap-4 px-8 pb-12 pt-20 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="mb-4 text-[10px] uppercase tracking-[0.3em]" style={{ color: "#c8a96e", fontFamily: SANS, fontWeight: 400 }}>
            Vishweshwarayya Academy
          </p>
          <h2
            className="text-4xl leading-none sm:text-5xl lg:text-6xl"
            style={{ fontFamily: DISPLAY, color: "#f5f0e8", fontWeight: 700, letterSpacing: "-0.01em" }}
          >
            Moments That
            <br />
            <span style={{ fontStyle: "italic", fontWeight: 400 }}>Matter.</span>
          </h2>
        </div>

        <div className="flex flex-wrap gap-x-5 gap-y-2 sm:text-right">
          {Object.entries(CATEGORY_COLOR).map(([cat, color]) => (
            <span key={cat} className="flex items-center gap-1.5 text-[11px] uppercase tracking-[0.15em]" style={{ color: "#6b6b6b", fontFamily: SANS }}>
              <span className="inline-block h-1.5 w-1.5 rounded-full" style={{ backgroundColor: color }} />
              {cat}
            </span>
          ))}
        </div>
      </div>

      <div className="mx-auto mb-8 max-w-screen-xl px-8" style={{ height: "1px", backgroundColor: "#1f1f1f" }} />

      {photos.length > 0 ? (
        <div
          className="mx-auto max-w-screen-xl px-4 pb-20 sm:px-8"
          style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "6px" }}
        >
          {photos.map((slot) => (
            <PhotoCell key={slot.id} slot={slot} />
          ))}
        </div>
      ) : (
        <div className="mx-auto max-w-screen-xl px-8 pb-20 text-center">
          <p className="text-sm" style={{ color: "#6b6b6b", fontFamily: SANS }}>
            Photographs will appear here soon.
          </p>
        </div>
      )}

      <div className="flex items-center justify-center pb-16">
        <div style={{ height: "1px", width: "48px", backgroundColor: "#c8a96e", opacity: 0.4 }} />
        <p className="mx-4 text-[10px] uppercase tracking-[0.28em]" style={{ color: "#3a3a3a", fontFamily: SANS }}>
          Gallery
        </p>
        <div style={{ height: "1px", width: "48px", backgroundColor: "#c8a96e", opacity: 0.4 }} />
      </div>
    </section>
  );
}
