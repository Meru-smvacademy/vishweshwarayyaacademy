import Image from "next/image";
import { KRITPREP_URL } from "@/config/nav";
import { createClient } from "@/lib/supabase/server";
import { getFacultyPhotoUrl } from "@/lib/supabase/storage";

const NAVY = "#0C1B2E";
const AMBER = "#A8762A";
const AMBER2 = "#C4902F";
const CREAM = "#EAE0CC";

const FRAUNCES = "var(--font-fraunces), Georgia, serif";
const SOURCE_SANS = "var(--font-source-sans-3), sans-serif";

const LABEL_SIZES = {
  sm: { name: "9px", sub: "8.5px", pad: "16px 14px", ghost: "28px" },
  md: { name: "10px", sub: "9px", pad: "20px 18px", ghost: "36px" },
  lg: { name: "12px", sub: "10.5px", pad: "26px 22px", ghost: "56px" },
} as const;

type LabelSize = keyof typeof LABEL_SIZES;

type FacultyTile = {
  id: string;
  name: string;
  label: string;
  photoUrl: string;
};

// Fetches published faculty with a photo, split into the two campus walls
// this composition is built around. Faculty with no campus assigned, no
// photo, or is_published = false are intentionally excluded — never shown
// publicly. Ordered display_order ASC then created_at ASC, per-campus.
async function getPublishedFaculty(): Promise<{ lingasuguru: FacultyTile[]; sindhanur: FacultyTile[] }> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("faculty")
    .select("id, name, subject, designation, photo_path, campus")
    .eq("is_published", true)
    .in("campus", ["Lingasuguru", "Sindhanur"])
    .order("display_order", { ascending: true })
    .order("created_at", { ascending: true });

  if (error || !data) {
    return { lingasuguru: [], sindhanur: [] };
  }

  const lingasuguru: FacultyTile[] = [];
  const sindhanur: FacultyTile[] = [];

  for (const row of data) {
    const photoUrl = getFacultyPhotoUrl(row.photo_path);
    if (!photoUrl) continue; // this is a photo wall — skip faculty with no photo yet

    const tile: FacultyTile = {
      id: row.id,
      name: row.name,
      label: row.subject ? `${row.subject} · ${row.designation}` : row.designation,
      photoUrl,
    };

    if (row.campus === "Lingasuguru") {
      lingasuguru.push(tile);
    } else if (row.campus === "Sindhanur") {
      sindhanur.push(tile);
    }
  }

  return { lingasuguru, sindhanur };
}

// Hover treatment (amber rule, image scale/filter) is driven by CSS
// group-hover — visually identical to the approved design's per-slot hover
// state, without needing client-side JS for what is purely a `:hover` effect.
function PortraitSlot({
  faculty,
  index,
  labelSize = "sm",
  gradientHeight = 100,
}: {
  faculty: FacultyTile;
  index: number;
  labelSize?: LabelSize;
  gradientHeight?: number;
}) {
  const fs = LABEL_SIZES[labelSize];

  return (
    <div className="group relative h-full w-full overflow-hidden" style={{ backgroundColor: "#1a2535" }}>
      {/* Amber top rule */}
      <div
        className="absolute inset-x-0 top-0 z-[4] h-[2px] opacity-[0.35] transition-opacity duration-[450ms] ease-in-out group-hover:opacity-100"
        style={{ backgroundColor: AMBER }}
      />

      {/* Ghost index */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-3 top-[10px] z-[3] select-none leading-none"
        style={{ fontFamily: FRAUNCES, fontStyle: "italic", fontWeight: 300, fontSize: fs.ghost, color: "rgba(255,255,255,0.06)" }}
      >
        {String(index + 1).padStart(2, "0")}
      </div>

      {/* Photo */}
      <Image
        src={faculty.photoUrl}
        alt={faculty.name}
        fill
        sizes="(min-width: 880px) 25vw, 50vw"
        className="scale-100 object-cover object-[center_top] [filter:saturate(0.82)_brightness(0.88)] group-hover:scale-[1.038] group-hover:[filter:saturate(1)_brightness(1.04)]"
        style={{ transition: "transform 0.75s cubic-bezier(0.25,0.46,0.45,0.94), filter 0.6s ease" }}
      />

      {/* Gradient overlay */}
      <div
        className="absolute inset-x-0 bottom-0 z-[2]"
        style={{
          height: `${gradientHeight}px`,
          background: "linear-gradient(to top, rgba(8,18,34,0.95) 0%, rgba(8,18,34,0.6) 50%, transparent 100%)",
        }}
      />

      {/* Label */}
      <div className="absolute inset-x-0 bottom-0 z-[3]" style={{ padding: fs.pad }}>
        <p
          className="m-0 mb-[3px] uppercase"
          style={{ fontFamily: SOURCE_SANS, fontSize: fs.name, fontWeight: 600, letterSpacing: "0.15em", color: AMBER2 }}
        >
          {faculty.name}
        </p>
        <p
          className="m-0 uppercase"
          style={{
            fontFamily: SOURCE_SANS,
            fontSize: fs.sub,
            fontWeight: 300,
            letterSpacing: "0.09em",
            color: "rgba(234,224,204,0.62)",
          }}
        >
          {faculty.label}
        </p>
      </div>
    </div>
  );
}

function CampusDivider({ number, name }: { number: string; name: string }) {
  return (
    <div className="mb-[clamp(20px,3vw,36px)] flex items-center gap-0">
      <div className="inline-flex shrink-0 items-center gap-[10px]">
        <span
          style={{
            fontFamily: FRAUNCES,
            fontStyle: "italic",
            fontWeight: 300,
            fontSize: "clamp(13px,1.5vw,17px)",
            color: AMBER,
            opacity: 0.7,
            letterSpacing: "0.04em",
          }}
        >
          {number}
        </span>
        <span className="h-[18px] w-px shrink-0" style={{ backgroundColor: AMBER, opacity: 0.3 }} />
        <span
          style={{
            fontFamily: SOURCE_SANS,
            fontWeight: 600,
            fontSize: "clamp(11px,1.3vw,14px)",
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            color: CREAM,
            opacity: 0.9,
          }}
        >
          {name}
        </span>
        <span
          className="ml-1"
          style={{
            fontFamily: SOURCE_SANS,
            fontWeight: 300,
            fontSize: "10px",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: `${CREAM}55`,
          }}
        >
          — Faculty
        </span>
      </div>
      <div className="ml-5 h-px flex-1" style={{ backgroundColor: AMBER, opacity: 0.15 }} />
    </div>
  );
}

// Lingasuguru — up to 10-portrait composition (3 · 4 · 3 tiers). Renders
// only the tiles that have real, published faculty — a slot with no
// corresponding faculty member simply doesn't render, rather than inventing
// or duplicating data to fill the original 10-slot design.
function LingasugurWall({ faculty }: { faculty: FacultyTile[] }) {
  return (
    <div className="flex flex-col gap-[10px]">
      <div className="grid grid-cols-2 gap-[10px] min-[880px]:grid-cols-[1fr_1.32fr_1fr]">
        {[0, 1, 2].map((i) =>
          faculty[i] ? (
            <div key={faculty[i].id} className="relative" style={{ aspectRatio: "3/4" }}>
              <PortraitSlot faculty={faculty[i]} index={i} labelSize={i === 1 ? "lg" : "md"} gradientHeight={i === 1 ? 130 : 100} />
            </div>
          ) : null,
        )}
      </div>

      <div className="grid grid-cols-2 gap-[10px] min-[880px]:grid-cols-4">
        {[3, 4, 5, 6].map((i) =>
          faculty[i] ? (
            <div key={faculty[i].id} className="relative" style={{ aspectRatio: "4/5" }}>
              <PortraitSlot faculty={faculty[i]} index={i} labelSize="sm" gradientHeight={85} />
            </div>
          ) : null,
        )}
      </div>

      <div className="grid grid-cols-2 gap-[10px] min-[880px]:grid-cols-3">
        {[7, 8, 9].map((i) =>
          faculty[i] ? (
            <div key={faculty[i].id} className="relative" style={{ aspectRatio: "3/4" }}>
              <PortraitSlot faculty={faculty[i]} index={i} labelSize="md" gradientHeight={100} />
            </div>
          ) : null,
        )}
      </div>
    </div>
  );
}

// Sindhanur — up to 5-portrait composition (2 · 3). Same partial-fill
// behavior as LingasugurWall above.
function SindhanurWall({ faculty }: { faculty: FacultyTile[] }) {
  return (
    <div className="flex flex-col gap-[10px]">
      <div className="grid grid-cols-2 gap-[10px] min-[880px]:grid-cols-[1.1fr_1fr]">
        {[0, 1].map((i) =>
          faculty[i] ? (
            <div key={faculty[i].id} className="relative" style={{ aspectRatio: "3/4" }}>
              <PortraitSlot faculty={faculty[i]} index={i} labelSize={i === 0 ? "lg" : "md"} gradientHeight={i === 0 ? 130 : 110} />
            </div>
          ) : null,
        )}
      </div>

      <div className="grid grid-cols-2 gap-[10px] min-[880px]:grid-cols-3">
        {[2, 3, 4].map((i) =>
          faculty[i] ? (
            <div key={faculty[i].id} className="relative" style={{ aspectRatio: "4/5" }}>
              <PortraitSlot faculty={faculty[i]} index={i} labelSize="sm" gradientHeight={90} />
            </div>
          ) : null,
        )}
      </div>
    </div>
  );
}

export default async function TheFaculty() {
  const { lingasuguru, sindhanur } = await getPublishedFaculty();

  return (
    <section className="relative w-full overflow-hidden" style={{ backgroundColor: NAVY, fontFamily: SOURCE_SANS }}>
      {/* Subtle noise texture */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          backgroundImage:
            "repeating-linear-gradient(-55deg, transparent, transparent 60px, rgba(168,118,42,0.025) 60px, rgba(168,118,42,0.025) 61px)",
        }}
      />

      {/* Ghost watermark — bleed left edge */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[-2%] top-1/2 z-0 -translate-y-1/2 select-none whitespace-nowrap leading-none"
        style={{
          fontFamily: FRAUNCES,
          fontStyle: "italic",
          fontWeight: 300,
          fontSize: "clamp(120px,18vw,280px)",
          color: "rgba(234,224,204,0.025)",
          letterSpacing: "-0.02em",
        }}
      >
        Faculty
      </div>

      <div className="relative z-[1] mx-auto" style={{ maxWidth: "1380px", padding: "clamp(56px,7vw,100px) clamp(20px,5vw,72px)" }}>
        {/* Section header */}
        <div style={{ marginBottom: "clamp(44px,5.5vw,80px)" }}>
          <div className="mb-5 flex items-center gap-4">
            <div className="h-px w-8" style={{ backgroundColor: AMBER, opacity: 0.5 }} />
            <span
              style={{
                fontFamily: SOURCE_SANS,
                fontSize: "9px",
                fontWeight: 600,
                letterSpacing: "0.32em",
                textTransform: "uppercase",
                color: `${CREAM}66`,
              }}
            >
              Vishweshwarayya NEET · JEE Academy
            </span>
          </div>

          <h2
            className="m-0 leading-[0.9]"
            style={{
              fontFamily: FRAUNCES,
              fontWeight: 400,
              fontStyle: "normal",
              fontSize: "clamp(48px,7.5vw,108px)",
              letterSpacing: "-0.03em",
              color: CREAM,
            }}
          >
            The{" "}
            <em style={{ fontStyle: "italic", fontWeight: 300, color: AMBER }}>Faculty</em>
          </h2>
        </div>

        {/* Lingasuguru */}
        {lingasuguru.length > 0 && (
          <div style={{ marginBottom: "clamp(48px,6vw,84px)" }}>
            <CampusDivider number="01" name="Lingasuguru" />
            <LingasugurWall faculty={lingasuguru} />
          </div>
        )}

        {/* Inter-campus bridge — only meaningful when both walls have content */}
        {lingasuguru.length > 0 && sindhanur.length > 0 && (
          <div className="mb-[clamp(40px,5vw,68px)] flex items-center gap-5">
            <div className="h-px flex-1" style={{ backgroundColor: `${CREAM}10` }} />
            <span
              style={{
                fontFamily: FRAUNCES,
                fontStyle: "italic",
                fontWeight: 300,
                fontSize: "clamp(10px,1.1vw,13px)",
                color: `${CREAM}28`,
                letterSpacing: "0.1em",
              }}
            >
              ✦
            </span>
            <div className="h-px flex-1" style={{ backgroundColor: `${CREAM}10` }} />
          </div>
        )}

        {/* Sindhanur */}
        {sindhanur.length > 0 && (
          <div style={{ marginBottom: "clamp(48px,6vw,84px)" }}>
            <CampusDivider number="02" name="Sindhanur" />
            <SindhanurWall faculty={sindhanur} />
          </div>
        )}

        {/* Footer CTA */}
        <div
          className="flex flex-wrap items-center justify-between gap-5"
          style={{ borderTop: `1px solid ${CREAM}14`, paddingTop: "clamp(24px,3vw,40px)" }}
        >
          <span
            style={{
              fontFamily: SOURCE_SANS,
              fontSize: "9px",
              fontWeight: 300,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: `${CREAM}30`,
            }}
          >
            Complete profiles at KRITPrep
          </span>

          <a
            href={`${KRITPREP_URL}/our-team`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 opacity-[0.55] transition-[opacity,gap] hover:gap-5 hover:opacity-100"
            style={{
              fontFamily: SOURCE_SANS,
              fontSize: "10.5px",
              fontWeight: 600,
              letterSpacing: "0.26em",
              textTransform: "uppercase",
              color: CREAM,
              textDecoration: "none",
              transitionDuration: "300ms, 350ms",
              transitionTimingFunction: "ease, ease",
            }}
          >
            <span>Meet the Faculty</span>
            <span style={{ color: AMBER, fontSize: "16px", lineHeight: 1, fontWeight: 300 }} aria-hidden="true">
              →
            </span>
            <span className="sr-only"> (opens KRITPrep, an external platform, in a new tab)</span>
          </a>
        </div>
      </div>
    </section>
  );
}
