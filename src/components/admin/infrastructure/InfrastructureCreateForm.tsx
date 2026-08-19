"use client";

import { useActionState, useMemo, useRef, useState, type ChangeEvent } from "react";
import { useFormStatus } from "react-dom";
import Link from "next/link";
import type { InfrastructureActionState } from "@/app/admin/dashboard/infrastructure/actions";
import { createInfrastructureItemAction } from "@/app/admin/dashboard/infrastructure/actions";
import { INFRASTRUCTURE_CATEGORIES, INFRASTRUCTURE_CAMPUSES } from "@/lib/validation/infrastructure";
import { GOLD_500, IVORY_100, SANS } from "@/components/admin/tokens";
import { CloseIcon } from "@/components/admin/icons";
import { ImageIcon } from "@/components/ui/icons";
import CategoryPhotoGuidance from "@/components/admin/infrastructure/CategoryPhotoGuidance";

const INITIAL_STATE: InfrastructureActionState = { success: false };

// The "Not campus-specific" option must submit the same empty campus value as
// leaving the field untouched (the server action/validation are unchanged and
// still expect "" for "no campus"). It can't share the literal value="" with
// the placeholder option though: when a <select> has two options with an
// identical value, the browser's native option-selection algorithm keeps
// whichever one was parsed last as selected, overriding defaultValue="" and
// showing "Not campus-specific" instead of the "Select campus" placeholder on
// first paint. Giving it a distinct sentinel value keeps every option value
// unique (so defaultValue="" unambiguously selects the placeholder) and the
// sentinel is normalized back to "" client-side, before the unchanged server
// action ever sees the submitted FormData.
const CAMPUS_NOT_SPECIFIED = "__not_specified__";

async function createInfrastructureItemWithNormalizedCampus(
  prevState: InfrastructureActionState,
  formData: FormData,
): Promise<InfrastructureActionState> {
  if (formData.get("campus") === CAMPUS_NOT_SPECIFIED) {
    formData.set("campus", "");
  }
  return createInfrastructureItemAction(prevState, formData);
}

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

const selectStyle: React.CSSProperties = {
  ...inputStyle,
  background: "#0F1F3A",
  paddingRight: 36,
  cursor: "pointer",
  appearance: "none",
  WebkitAppearance: "none",
  MozAppearance: "none",
};

const optionStyle: React.CSSProperties = { backgroundColor: "#0F1F3A", color: IVORY_100 };

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: 12,
  fontWeight: 500,
  color: "rgba(248,243,232,0.62)",
  marginBottom: 6,
  letterSpacing: "0.02em",
  fontFamily: SANS,
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

function SubmitButton() {
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
      {pending ? "Saving…" : "Add Infrastructure Item"}
    </button>
  );
}

export default function InfrastructureCreateForm() {
  const [state, formAction] = useActionState(createInfrastructureItemWithNormalizedCampus, INITIAL_STATE);
  const [files, setFiles] = useState<File[]>([]);
  const [category, setCategory] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const previews = useMemo(() => files.map((file) => ({ file, url: URL.createObjectURL(file) })), [files]);

  function syncInputFiles(nextFiles: File[]) {
    if (!fileInputRef.current) return;
    const dataTransfer = new DataTransfer();
    nextFiles.forEach((file) => dataTransfer.items.add(file));
    fileInputRef.current.files = dataTransfer.files;
  }

  function handleFilesSelected(event: ChangeEvent<HTMLInputElement>) {
    const picked = Array.from(event.target.files ?? []);
    if (picked.length === 0) return;
    const next = [...files, ...picked];
    setFiles(next);
    syncInputFiles(next);
  }

  function handleRemoveFile(index: number) {
    const next = files.filter((_, i) => i !== index);
    setFiles(next);
    syncInputFiles(next);
  }

  return (
    <form action={formAction} style={{ display: "flex", flexDirection: "column", gap: 22, maxWidth: 680 }}>
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
        <label htmlFor="title" style={labelStyle}>
          Title <span style={{ color: GOLD_500 }}>*</span>
        </label>
        <input id="title" name="title" type="text" required style={inputStyle} />
        {state.errors?.title && (
          <p role="alert" style={{ margin: "6px 0 0", fontSize: 12, color: "#E57373", fontFamily: SANS }}>
            {state.errors.title}
          </p>
        )}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }} className="infra-form-grid">
        <div>
          <label htmlFor="category" style={labelStyle}>
            Category <span style={{ color: GOLD_500 }}>*</span>
          </label>
          <div style={{ position: "relative" }}>
            <select
              id="category"
              name="category"
              required
              defaultValue=""
              onChange={(event) => setCategory(event.target.value)}
              style={selectStyle}
            >
              <option value="" disabled style={optionStyle}>
                Select category
              </option>
              {INFRASTRUCTURE_CATEGORIES.map((categoryOption) => (
                <option key={categoryOption} value={categoryOption} style={optionStyle}>
                  {categoryOption}
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
          <CategoryPhotoGuidance category={category} />
        </div>
        <div>
          <label htmlFor="campus" style={labelStyle}>
            Campus
          </label>
          <div style={{ position: "relative" }}>
            <select id="campus" name="campus" defaultValue="" style={selectStyle}>
              <option value="" disabled style={optionStyle}>
                Select campus
              </option>
              {INFRASTRUCTURE_CAMPUSES.map((campus) => (
                <option key={campus} value={campus} style={optionStyle}>
                  {campus}
                </option>
              ))}
              <option value={CAMPUS_NOT_SPECIFIED} style={optionStyle}>
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
        <label htmlFor="description" style={labelStyle}>
          Description
        </label>
        <textarea id="description" name="description" rows={4} style={{ ...inputStyle, resize: "vertical" }} />
      </div>

      <div>
        <label htmlFor="displayOrder" style={labelStyle}>
          Display order
        </label>
        <input id="displayOrder" name="displayOrder" type="number" inputMode="numeric" defaultValue={0} style={{ ...inputStyle, maxWidth: 140 }} />
        {state.errors?.displayOrder && (
          <p role="alert" style={{ margin: "6px 0 0", fontSize: 12, color: "#E57373", fontFamily: SANS }}>
            {state.errors.displayOrder}
          </p>
        )}
      </div>

      <label style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer", fontFamily: SANS }}>
        <input type="checkbox" name="isPublished" style={{ width: 16, height: 16 }} />
        <span style={{ fontSize: 13, color: "rgba(248,243,232,0.75)" }}>Published (visible once public integration is enabled)</span>
      </label>

      <div style={{ borderTop: "1px solid rgba(200,185,155,0.1)", paddingTop: 20 }}>
        <span style={labelStyle}>Photographs</span>
        <p style={{ margin: "0 0 14px", fontFamily: SANS, fontSize: 12, color: "rgba(248,243,232,0.45)" }}>
          You can add one or more photographs now, or add them later after saving.
        </p>

        {previews.length > 0 && (
          <div
            className="infra-photo-picker-grid"
            style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(110px, 1fr))", gap: 10, marginBottom: 14 }}
          >
            {previews.map(({ file, url }, index) => (
              <div key={`${file.name}-${index}`} style={{ position: "relative", aspectRatio: "1 / 1", borderRadius: 4, overflow: "hidden", border: "1px solid rgba(200,185,155,0.2)" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={url} alt={`Selected photo ${index + 1}`} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                <button
                  type="button"
                  onClick={() => handleRemoveFile(index)}
                  aria-label={`Remove ${file.name}`}
                  style={{
                    position: "absolute",
                    top: 4,
                    right: 4,
                    width: 22,
                    height: 22,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "50%",
                    border: "none",
                    background: "rgba(7,14,26,0.75)",
                    cursor: "pointer",
                  }}
                >
                  <CloseIcon size={11} color="#F8F3E8" />
                </button>
              </div>
            ))}
          </div>
        )}

        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "10px 16px",
            fontSize: 12,
            fontFamily: SANS,
            fontWeight: 500,
            letterSpacing: "0.04em",
            border: "1px dashed rgba(200,185,155,0.3)",
            borderRadius: 3,
            background: "transparent",
            color: "rgba(248,243,232,0.75)",
            cursor: "pointer",
          }}
        >
          <ImageIcon className="h-4 w-4" />
          {previews.length > 0 ? "Add more photos" : "Upload photos"}
        </button>
        <p style={{ margin: "8px 0 0", fontSize: 11.5, fontFamily: SANS, color: "rgba(248,243,232,0.4)" }}>
          JPG, PNG or WebP. Max 4 MB each. You can select multiple files at once.
        </p>

        <input
          ref={fileInputRef}
          type="file"
          name="photos"
          multiple
          accept="image/jpeg,image/png,image/webp"
          onChange={handleFilesSelected}
          style={{ display: "none" }}
        />

        {state.errors?.photos && (
          <p role="alert" style={{ margin: "10px 0 0", fontSize: 12, color: "#E57373", fontFamily: SANS }}>
            {state.errors.photos}
          </p>
        )}
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 14, paddingTop: 8 }}>
        <SubmitButton />
        <Link
          href="/admin/dashboard/infrastructure"
          style={{ fontFamily: SANS, fontSize: 12.5, color: "rgba(248,243,232,0.5)", textDecoration: "none" }}
        >
          Cancel
        </Link>
      </div>

      <style>{`
        @media (max-width: 480px) {
          .infra-form-grid { grid-template-columns: 1fr !important; }
          .infra-photo-picker-grid { grid-template-columns: repeat(3, 1fr) !important; }
        }
      `}</style>
    </form>
  );
}
