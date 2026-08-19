import { createClient } from "@/lib/supabase/server";
import { getGalleryPhotoUrl } from "@/lib/supabase/storage";
import GalleryHeroTile from "@/components/gallery/GalleryHeroTile";

const DISPLAY = "var(--font-dm-serif-display), Georgia, serif";
const SANS = "var(--font-inter), sans-serif";

const GROUND = "#0c0b09";
const INK = "#f0ebe2";
const ACCENT = "#c4a46b";

// Fixed 6-tile mosaic composition — each position keeps its original label
// even when no real photo is available yet, so the layout never depends on
// exactly 6 published photos existing. Positions beyond the number of real,
// published gallery photos fall back to the existing honest placeholder
// (GalleryHeroTile already renders one whenever no src is passed) — no
// photos are invented or duplicated to fill gaps.
const TILE_LABELS = [
  "01 — Classrooms",
  "02 — Students",
  "03 — Campus",
  "04 — Lab",
  "05 — Library",
  "06 — Events",
];

type HeroPhoto = { src: string; alt: string };

async function getHeroPhotos(): Promise<HeroPhoto[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("gallery_photos")
    .select("id, title, photo_path")
    .eq("is_published", true)
    .order("display_order", { ascending: true })
    .order("created_at", { ascending: true })
    .limit(TILE_LABELS.length);

  if (error || !data) {
    return [];
  }

  const photos: HeroPhoto[] = [];
  for (const row of data) {
    const src = getGalleryPhotoUrl(row.photo_path);
    if (!src) continue;
    photos.push({ src, alt: row.title });
  }
  return photos;
}

export default async function GalleryHero() {
  const photos = await getHeroPhotos();
  const tiles = TILE_LABELS.map((label, i) => ({ label, photo: photos[i] }));

  return (
    <section
      className="gallery-hero"
      style={{
        fontFamily: SANS,
        background: GROUND,
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        overflowX: "clip",
        overflowY: "visible",
      }}
    >
      <div
        className="gallery-hero-grid"
        style={{
          flex: 1,
          display: "grid",
          gridTemplateColumns: "clamp(260px, 30%, 420px) 1fr",
          gridTemplateRows: "auto 1fr",
          gap: 0,
        }}
      >
        {/* Left column: headline + meta */}
        <div
          style={{
            gridColumn: "1",
            gridRow: "1 / 3",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "clamp(2.5rem, 5vw, 4.5rem) clamp(1.5rem, 4vw, 3.5rem)",
            borderRight: "1px solid rgba(240,235,226,0.07)",
            overflow: "visible",
            minWidth: 0,
          }}
        >
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "clamp(2rem, 4vw, 3.5rem)" }}>
              <span style={{ width: "2rem", height: "1px", background: ACCENT, display: "inline-block" }} />
              <span
                style={{
                  fontFamily: SANS,
                  fontSize: "0.65rem",
                  fontWeight: 600,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: ACCENT,
                }}
              >
                Gallery
              </span>
            </div>

            <h1
              style={{
                fontFamily: DISPLAY,
                fontSize: "clamp(1.4rem, 2.6vw, 2.8rem)",
                fontWeight: 400,
                lineHeight: 1.08,
                color: INK,
                margin: 0,
                letterSpacing: "-0.01em",
                whiteSpace: "nowrap",
              }}
            >
              Life at
              <br />
              <em style={{ fontStyle: "italic", color: ACCENT, display: "inline-block" }}>Vishweshwarayya</em>
            </h1>

            <div style={{ width: "100%", height: "1px", background: "rgba(240,235,226,0.1)", margin: "clamp(1.5rem, 3vw, 2.5rem) 0" }} />

            <p
              style={{
                fontFamily: SANS,
                fontSize: "clamp(0.8rem, 1.1vw, 0.92rem)",
                fontWeight: 300,
                lineHeight: 1.75,
                color: "rgba(240,235,226,0.55)",
                margin: 0,
                maxWidth: "30ch",
              }}
            >
              A glimpse into our classrooms, campus, students and the moments that make the
              Academy more than a place to study.
            </p>
          </div>

          <div style={{ marginTop: "auto", paddingTop: "3rem" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {["Real Students", "Real Campus", "Real Moments"].map((item, i) => (
                <div key={item} style={{ display: "flex", alignItems: "center", gap: "0.65rem" }}>
                  <span style={{ fontFamily: SANS, fontSize: "8px", color: ACCENT, opacity: 1 - i * 0.2 }}>●</span>
                  <span
                    style={{
                      fontFamily: SANS,
                      fontSize: "0.65rem",
                      fontWeight: 500,
                      letterSpacing: "0.16em",
                      textTransform: "uppercase",
                      color: `rgba(240,235,226,${0.55 - i * 0.1})`,
                    }}
                  >
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right column: mosaic grid */}
        <div
          className="mosaic-grid"
          style={{
            gridColumn: "2",
            gridRow: "1 / 3",
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gridTemplateRows: "clamp(180px, 28vh, 280px) clamp(200px, 30vh, 320px) clamp(160px, 20vh, 220px)",
            gap: "2px",
            padding: "2px",
            alignItems: "stretch",
          }}
        >
          <GalleryHeroTile label={tiles[0].label} src={tiles[0].photo?.src} alt={tiles[0].photo?.alt} priority style={{ gridColumn: "1 / 3", gridRow: "1" }} />
          <GalleryHeroTile label={tiles[1].label} src={tiles[1].photo?.src} alt={tiles[1].photo?.alt} style={{ gridColumn: "3", gridRow: "1 / 3" }} />
          <GalleryHeroTile label={tiles[2].label} src={tiles[2].photo?.src} alt={tiles[2].photo?.alt} style={{ gridColumn: "1", gridRow: "2" }} />
          <GalleryHeroTile label={tiles[3].label} src={tiles[3].photo?.src} alt={tiles[3].photo?.alt} style={{ gridColumn: "2", gridRow: "2" }} />
          <GalleryHeroTile label={tiles[4].label} src={tiles[4].photo?.src} alt={tiles[4].photo?.alt} style={{ gridColumn: "1 / 3", gridRow: "3" }} />
          <GalleryHeroTile label={tiles[5].label} src={tiles[5].photo?.src} alt={tiles[5].photo?.alt} style={{ gridColumn: "3", gridRow: "3" }} />
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .gallery-hero-grid {
            grid-template-columns: 1fr !important;
            grid-template-rows: auto auto !important;
          }
          .gallery-hero-grid > :first-child {
            grid-column: 1 !important;
            grid-row: 1 !important;
            border-right: none !important;
            border-bottom: 1px solid rgba(240,235,226,0.07);
            padding: 2.5rem 1.75rem !important;
            min-height: unset;
          }
          .gallery-hero-grid > :last-child {
            grid-column: 1 !important;
            grid-row: 2 !important;
          }
          .mosaic-grid {
            grid-template-columns: 1fr 1fr !important;
            grid-template-rows: 200px 200px 160px !important;
          }
          .mosaic-grid > :nth-child(1) { grid-column: 1 / 3 !important; grid-row: 1 !important; }
          .mosaic-grid > :nth-child(2) { grid-column: 1 !important;     grid-row: 2 !important; }
          .mosaic-grid > :nth-child(3) { grid-column: 2 !important;     grid-row: 2 !important; }
          .mosaic-grid > :nth-child(4) { grid-column: 1 !important;     grid-row: 3 !important; }
          .mosaic-grid > :nth-child(5) { grid-column: 2 !important;     grid-row: 3 !important; }
          .mosaic-grid > :nth-child(6) { display: none !important; }
        }

        @media (max-width: 560px) {
          .mosaic-grid {
            grid-template-columns: 1fr 1fr !important;
            grid-template-rows: 160px 160px 130px !important;
          }
        }
      `}</style>
    </section>
  );
}
