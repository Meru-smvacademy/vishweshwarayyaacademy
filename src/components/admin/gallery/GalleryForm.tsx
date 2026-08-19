"use client";

import { useActionState, useRef, useState, type ChangeEvent } from "react";
import { useFormStatus } from "react-dom";
import Link from "next/link";
import type { GalleryPhoto } from "@/lib/supabase/types";
import type { GalleryActionState } from "@/app/admin/dashboard/gallery/actions";
import { getGalleryPhotoUrl } from "@/lib/supabase/storage";
import { GALLERY_CATEGORIES, GALLERY_CAMPUSES } from "@/lib/validation/gallery";
import { GOLD_500, IVORY_100, SANS } from "@/components/admin/tokens";
import { CloseIcon } from "@/components/admin/icons";
import { ImageIcon } from "@/components/ui/icons";

const INITIAL_STATE: GalleryActionState = { success: false };

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "10px 12px",
  fontSize: 14,
  border: "1px solid rgba(200,185,155,0.22)",
  borderRadius: 3,
  background: "rgba(255,255,255,0.03)",
  color: IVORY_100,
  outline: "none",
  fontFamily: SANS,
  lineHeight: 1.5,
};

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: 12,
  fontWeight: 500,
  color: "rgba(248,243,232,0.62)",
  marginBottom: 6,
  letterSpacing: "0.02em",
  fontFamily: SANS,
};

// Solid (non-transparent) background so both the closed field and the
// native dropdown popup stay clearly readable — a transparent background
// on <select> can make browsers fall back to a default white popup, which
// then makes the light IVORY_100 text unreadable against it.
const selectStyle: React.CSSProperties = {
  ...inputStyle,
  background: "#0F1F3A",
  paddingRight: 36,
  cursor: "pointer",
  appearance: "none",
  WebkitAppearance: "none",
  MozAppearance: "none",
};

// Applied to every <option> directly, since browsers don't reliably inherit
// background/color from the parent <select> into the native popup list.
const optionStyle: React.CSSProperties = {
  backgroundColor: "#0F1F3A",
  color: IVORY_100,
};

function SelectChevron() {
  return (
    <svg
      aria-hidden="true"
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}
    >
      <path d="M2.5 4.5L6 8L9.5 4.5" stroke="rgba(248,243,232,0.55)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SubmitButton({ mode }: { mode: "create" | "edit" }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      style={{
        padding: "11px 28px",
        borderRadius: 3,
        border: "none",
        background: GOLD_500,
        color: "#0B1628",
        fontFamily: SANS,
        fontSize: 12.5,
        fontWeight: 600,
        letterSpacing: "0.06em",
        textTransform: "uppercase",
        cursor: pending ? "not-allowed" : "pointer",
        opacity: pending ? 0.65 : 1,
      }}
    >
      {pending ? "Saving…" : mode === "create" ? "Add Photo" : "Save Changes"}
    </button>
  );
}

export default function GalleryForm({
  mode,
  photo,
  action,
}: {
  mode: "create" | "edit";
  photo?: GalleryPhoto;
  action: (prevState: GalleryActionState, formData: FormData) => Promise<GalleryActionState>;
}) {
  const [state, formAction] = useActionState(action, INITIAL_STATE);
  const [preview, setPreview] = useState<string | null>(getGalleryPhotoUrl(photo?.photo_path ?? null));
  const [fileName, setFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    setFileName(file.name);
    setPreview(URL.createObjectURL(file));
  }

  function handleRemovePhoto() {
    setFileName(null);
    setPreview(getGalleryPhotoUrl(photo?.photo_path ?? null));
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  return (
    <form action={formAction} style={{ display: "flex", flexDirection: "column", gap: 22, maxWidth: 640 }}>
      {state.message && (
        <p
          role="alert"
          style={{
            margin: 0,
            padding: "10px 14px",
            fontFamily: SANS,
            fontSize: 13,
            color: "#E57373",
            border: "1px solid rgba(229,115,115,0.3)",
            borderRadius: 3,
            background: "rgba(229,115,115,0.06)",
          }}
        >
          {state.message}
        </p>
      )}

      <div>
        <span style={labelStyle}>
          Photograph <span style={{ color: GOLD_500 }}>*</span>
        </span>
        <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
          <div
            style={{
              width: 128,
              height: 96,
              borderRadius: 4,
              border: "1px solid rgba(200,185,155,0.2)",
              backgroundColor: "rgba(255,255,255,0.03)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
              flexShrink: 0,
            }}
          >
            {preview ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={preview} alt="Selected gallery photo preview" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            ) : (
              <ImageIcon className="h-6 w-6" style={{ color: "rgba(248,243,232,0.3)" }} />
            )}
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                style={{
                  padding: "8px 16px",
                  fontSize: 12,
                  fontFamily: SANS,
                  fontWeight: 500,
                  letterSpacing: "0.04em",
                  border: "1px solid rgba(200,185,155,0.25)",
                  borderRadius: 3,
                  background: "transparent",
                  color: "rgba(248,243,232,0.75)",
                  cursor: "pointer",
                }}
              >
                {preview ? "Change photo" : "Upload photo"}
              </button>
              {fileName && (
                <button
                  type="button"
                  onClick={handleRemovePhoto}
                  aria-label="Remove selected photo"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 4,
                    padding: "8px 10px",
                    fontSize: 12,
                    fontFamily: SANS,
                    border: "1px solid rgba(200,185,155,0.15)",
                    borderRadius: 3,
                    background: "transparent",
                    color: "rgba(248,243,232,0.5)",
                    cursor: "pointer",
                  }}
                >
                  <CloseIcon size={11} color="rgba(248,243,232,0.5)" />
                </button>
              )}
            </div>
            <span style={{ fontSize: 11.5, fontFamily: SANS, color: "rgba(248,243,232,0.4)" }}>
              {fileName ?? "JPG, PNG or WebP. Max 4 MB."}
            </span>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            name="photo"
            accept="image/jpeg,image/png,image/webp"
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
        </div>
        {state.errors?.photo && (
          <p role="alert" style={{ margin: "6px 0 0", fontSize: 12, color: "#E57373", fontFamily: SANS }}>
            {state.errors.photo}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="title" style={labelStyle}>
          Title <span style={{ color: GOLD_500 }}>*</span>
        </label>
        <input id="title" name="title" type="text" required defaultValue={photo?.title} style={inputStyle} />
        {state.errors?.title && (
          <p role="alert" style={{ margin: "6px 0 0", fontSize: 12, color: "#E57373", fontFamily: SANS }}>
            {state.errors.title}
          </p>
        )}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }} className="gallery-form-grid">
        <div>
          <label htmlFor="category" style={labelStyle}>
            Category <span style={{ color: GOLD_500 }}>*</span>
          </label>
          <div style={{ position: "relative" }}>
            <select id="category" name="category" required defaultValue={photo?.category ?? ""} style={selectStyle}>
              <option value="" disabled style={optionStyle}>
                Select category
              </option>
              {GALLERY_CATEGORIES.map((category) => (
                <option key={category} value={category} style={optionStyle}>
                  {category}
                </option>
              ))}
            </select>
            <SelectChevron />
          </div>
          {state.errors?.category && (
            <p role="alert" style={{ margin: "6px 0 0", fontSize: 12, color: "#E57373", fontFamily: SANS }}>
              {state.errors.category}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="campus" style={labelStyle}>
            Campus
          </label>
          <div style={{ position: "relative" }}>
            {/* No value/defaultValue on the <select> itself: "Not campus-specific"
                and the placeholder both submit an empty string (required by the
                existing, unchanged server action/validation), so which one is
                initially shown is controlled per-option via `selected` instead. */}
            <select id="campus" name="campus" style={selectStyle}>
              <option value="" disabled selected={!photo} style={optionStyle}>
                Select campus
              </option>
              {GALLERY_CAMPUSES.map((campus) => (
                <option key={campus} value={campus} selected={photo?.campus === campus} style={optionStyle}>
                  {campus}
                </option>
              ))}
              <option value="" selected={Boolean(photo) && !photo?.campus} style={optionStyle}>
                Not campus-specific
              </option>
            </select>
            <SelectChevron />
          </div>
          {state.errors?.campus && (
            <p role="alert" style={{ margin: "6px 0 0", fontSize: 12, color: "#E57373", fontFamily: SANS }}>
              {state.errors.campus}
            </p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="academicYear" style={labelStyle}>
          Academic year
        </label>
        <input
          id="academicYear"
          name="academicYear"
          type="text"
          placeholder="e.g. 2025-26"
          defaultValue={photo?.academic_year ?? ""}
          style={{ ...inputStyle, maxWidth: 200 }}
        />
      </div>

      <div>
        <label htmlFor="description" style={labelStyle}>
          Description
        </label>
        <textarea id="description" name="description" rows={4} defaultValue={photo?.description ?? ""} style={{ ...inputStyle, resize: "vertical" }} />
      </div>

      <div>
        <label htmlFor="displayOrder" style={labelStyle}>
          Display order
        </label>
        <input
          id="displayOrder"
          name="displayOrder"
          type="number"
          inputMode="numeric"
          defaultValue={photo?.display_order ?? 0}
          style={{ ...inputStyle, maxWidth: 140 }}
        />
        {state.errors?.displayOrder && (
          <p role="alert" style={{ margin: "6px 0 0", fontSize: 12, color: "#E57373", fontFamily: SANS }}>
            {state.errors.displayOrder}
          </p>
        )}
      </div>

      <label style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer", fontFamily: SANS }}>
        <input type="checkbox" name="isPublished" defaultChecked={photo?.is_published ?? false} style={{ width: 16, height: 16 }} />
        <span style={{ fontSize: 13, color: "rgba(248,243,232,0.75)" }}>Published (visible once public integration is enabled)</span>
      </label>

      <div style={{ display: "flex", alignItems: "center", gap: 14, paddingTop: 8 }}>
        <SubmitButton mode={mode} />
        <Link
          href="/admin/dashboard/gallery"
          style={{ fontFamily: SANS, fontSize: 12.5, color: "rgba(248,243,232,0.5)", textDecoration: "none" }}
        >
          Cancel
        </Link>
      </div>

      <style>{`
        @media (max-width: 480px) {
          .gallery-form-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </form>
  );
}
