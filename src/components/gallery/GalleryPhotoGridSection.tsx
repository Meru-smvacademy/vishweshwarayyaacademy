"use client";

import { useState } from "react";

const SANS = "var(--font-dm-sans), system-ui, sans-serif";
const DISPLAY = "var(--font-playfair-display), Georgia, serif";

type PhotoSpan = "wide" | "tall" | "square" | "featured";

type PhotoSlot = {
  id: string;
  category: string;
  span: PhotoSpan;
  alt: string;
  src?: string;
};

const PHOTOS: PhotoSlot[] = [
  { id: "campus-01", category: "Campus", span: "featured", alt: "Vishweshwarayya Academy main campus entrance" },
  { id: "classrooms-01", category: "Classrooms", span: "tall", alt: "Modern classroom interior" },

  { id: "labs-01", category: "Labs", span: "square", alt: "Science laboratory with equipment" },
  { id: "students-01", category: "Students", span: "wide", alt: "Students engaged in group study" },
  { id: "students-02", category: "Students", span: "square", alt: "Student presentation in hall" },

  { id: "events-01", category: "Events", span: "featured", alt: "Annual day celebration on stage" },
  { id: "hostel-01", category: "Hostel", span: "tall", alt: "Hostel building exterior" },

  { id: "campus-02", category: "Campus", span: "square", alt: "Academy grounds and landscaping" },
  { id: "labs-02", category: "Labs", span: "square", alt: "Computer lab session" },
  { id: "classrooms-02", category: "Classrooms", span: "wide", alt: "Teacher instructing class" },

  { id: "hostel-02", category: "Hostel", span: "wide", alt: "Hostel common area" },
  { id: "events-02", category: "Events", span: "square", alt: "Sports day event" },
  { id: "students-03", category: "Students", span: "square", alt: "Students in uniform assembly" },
  { id: "campus-03", category: "Campus", span: "square", alt: "Academy chapel or prayer hall" },
];

const CATEGORY_COLOR: Record<string, string> = {
  Campus: "#c8a96e",
  Classrooms: "#7eb8c4",
  Labs: "#9e8fd4",
  Students: "#c47e7e",
  Events: "#7ec49a",
  Hostel: "#c4a77e",
};

const CORNER_CLASSES = [
  "top-4 left-4 border-t border-l",
  "top-4 right-4 border-t border-r",
  "bottom-4 left-4 border-b border-l",
  "bottom-4 right-4 border-b border-r",
];

function PhotoCell({ slot }: { slot: PhotoSlot }) {
  const [hovered, setHovered] = useState(false);
  const accent = CATEGORY_COLOR[slot.category] ?? "#c8a96e";

  return (
    <div
      className="group relative overflow-hidden"
      style={{
        gridColumn: slot.span === "featured" || slot.span === "wide" ? "span 2" : "span 1",
        aspectRatio:
          slot.span === "featured" ? "16/9" : slot.span === "tall" ? "3/4" : slot.span === "wide" ? "16/7" : "1/1",
        backgroundColor: "#0d0d0d",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {slot.src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={slot.src}
          alt={slot.alt}
          className="h-full w-full object-cover"
          style={{
            transform: hovered ? "scale(1.04)" : "scale(1)",
            transition: "transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          }}
        />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center" style={{ backgroundColor: "#101010" }}>
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `linear-gradient(${accent}08 1px, transparent 1px), linear-gradient(90deg, ${accent}08 1px, transparent 1px)`,
              backgroundSize: "32px 32px",
              opacity: hovered ? 1 : 0.5,
              transition: "opacity 0.4s ease",
            }}
          />
          {CORNER_CLASSES.map((cls, i) => (
            <div
              key={i}
              className={`absolute h-5 w-5 ${cls}`}
              style={{ borderColor: accent, opacity: hovered ? 0.9 : 0.35, transition: "opacity 0.4s ease" }}
            />
          ))}
          <div className="relative z-10 px-4 text-center" style={{ opacity: hovered ? 0.6 : 0.25, transition: "opacity 0.4s ease" }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="1.2" className="mx-auto mb-2">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <path d="M21 15l-5-5L5 21" />
            </svg>
            <p className="text-xs uppercase tracking-[0.2em]" style={{ color: accent, fontFamily: SANS }}>
              Photograph
            </p>
          </div>
        </div>
      )}

      <div
        className="absolute inset-x-0 bottom-0 flex items-end px-4 pb-4 pt-10"
        style={{
          background: "linear-gradient(to top, rgba(0,0,0,0.72) 0%, transparent 100%)",
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.35s ease",
        }}
      >
        <span className="text-[10px] uppercase tracking-[0.22em]" style={{ color: accent, fontFamily: SANS, fontWeight: 400 }}>
          {slot.category}
        </span>
      </div>
    </div>
  );
}

export default function GalleryPhotoGridSection() {
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

      <div
        className="mx-auto max-w-screen-xl px-4 pb-20 sm:px-8"
        style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "6px" }}
      >
        {PHOTOS.map((slot) => (
          <PhotoCell key={slot.id} slot={slot} />
        ))}
      </div>

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
