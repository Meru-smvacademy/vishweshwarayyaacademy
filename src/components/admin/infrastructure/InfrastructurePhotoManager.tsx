"use client";

import { useRef, useState, useTransition, type ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import {
  addInfrastructurePhotosAction,
  deleteInfrastructurePhotoAction,
  reorderInfrastructurePhotosAction,
  replaceInfrastructurePhotoAction,
} from "@/app/admin/dashboard/infrastructure/actions";
import { IVORY_100, SANS } from "@/components/admin/tokens";
import { ImageIcon } from "@/components/ui/icons";

type PhotoWithUrl = {
  id: string;
  photo_path: string;
  display_order: number;
  url: string | null;
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

function ArrowUpIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M7 11V3M7 3L3.5 6.5M7 3l3.5 3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ArrowDownIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M7 3v8M7 11l3.5-3.5M7 11l-3.5-3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function InfrastructurePhotoManager({
  infrastructureId,
  initialPhotos,
}: {
  infrastructureId: string;
  initialPhotos: PhotoWithUrl[];
}) {
  const router = useRouter();
  const [photos, setPhotos] = useState<PhotoWithUrl[]>(initialPhotos);
  const [error, setError] = useState<string | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const addInputRef = useRef<HTMLInputElement>(null);
  const replaceInputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  function handleAddPhotos(event: ChangeEvent<HTMLInputElement>) {
    const files = Array.from(event.target.files ?? []);
    if (files.length === 0) return;
    event.target.value = "";
    setError(null);
    const formData = new FormData();
    files.forEach((file) => formData.append("photos", file));
    const nextOrder = photos.length ? Math.max(...photos.map((p) => p.display_order)) + 1 : 0;

    startTransition(async () => {
      const result = await addInfrastructurePhotosAction(infrastructureId, nextOrder, formData);
      if (!result.success) {
        setError(result.message ?? "Could not add photos.");
        return;
      }
      router.refresh();
    });
  }

  function handleReplace(photoId: string, existingPath: string, event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    event.target.value = "";
    setError(null);
    setBusyId(photoId);

    startTransition(async () => {
      const result = await replaceInfrastructurePhotoAction(photoId, infrastructureId, existingPath, file);
      setBusyId(null);
      if (!result.success) {
        setError(result.message ?? "Could not replace photo.");
        return;
      }
      router.refresh();
    });
  }

  function handleDelete(photoId: string, photoPath: string) {
    setError(null);
    setBusyId(photoId);
    setConfirmDeleteId(null);

    startTransition(async () => {
      const result = await deleteInfrastructurePhotoAction(photoId, infrastructureId, photoPath);
      setBusyId(null);
      if (!result.success) {
        setError(result.message ?? "Could not delete photo.");
        return;
      }
      setPhotos((prev) => prev.filter((p) => p.id !== photoId));
      router.refresh();
    });
  }

  function handleMove(index: number, direction: -1 | 1) {
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= photos.length) return;

    const reordered = [...photos];
    const [moved] = reordered.splice(index, 1);
    reordered.splice(targetIndex, 0, moved);
    setPhotos(reordered);
    setError(null);

    startTransition(async () => {
      const result = await reorderInfrastructurePhotosAction(
        infrastructureId,
        reordered.map((p) => p.id),
      );
      if (!result.success) {
        setError(result.message ?? "Could not save the new order.");
        setPhotos(photos);
        return;
      }
      router.refresh();
    });
  }

  return (
    <div style={{ maxWidth: 680 }}>
      <span style={labelStyle}>Photographs ({photos.length})</span>
      <p style={{ margin: "0 0 14px", fontFamily: SANS, fontSize: 12, color: "rgba(248,243,232,0.45)" }}>
        Use the arrows to reorder, or replace/delete individual photos. Changes save immediately.
      </p>

      {error && (
        <p
          role="alert"
          style={{
            margin: "0 0 14px",
            padding: "10px 14px",
            fontFamily: SANS,
            fontSize: 13,
            color: "#E57373",
            border: "1px solid rgba(229,115,115,0.3)",
            borderRadius: 3,
            background: "rgba(229,115,115,0.06)",
          }}
        >
          {error}
        </p>
      )}

      {photos.length > 0 ? (
        <div
          className="infra-photo-manager-grid"
          style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: 14, marginBottom: 20 }}
        >
          {photos.map((photo, index) => {
            const isBusy = busyId === photo.id || (isPending && busyId === photo.id);
            return (
              <div
                key={photo.id}
                style={{
                  border: "1px solid rgba(200,185,155,0.18)",
                  borderRadius: 4,
                  overflow: "hidden",
                  background: "rgba(255,255,255,0.02)",
                }}
              >
                <div style={{ position: "relative", aspectRatio: "4 / 3", background: "rgba(0,0,0,0.2)" }}>
                  {photo.url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={photo.url}
                      alt={`Infrastructure photo ${index + 1}`}
                      style={{ width: "100%", height: "100%", objectFit: "cover", opacity: isBusy ? 0.4 : 1 }}
                    />
                  ) : (
                    <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <ImageIcon className="h-6 w-6" style={{ color: "rgba(248,243,232,0.3)" }} />
                    </div>
                  )}
                  <span
                    style={{
                      position: "absolute",
                      top: 6,
                      left: 6,
                      padding: "2px 7px",
                      borderRadius: 2,
                      background: "rgba(7,14,26,0.75)",
                      color: IVORY_100,
                      fontFamily: SANS,
                      fontSize: 10.5,
                      fontWeight: 600,
                    }}
                  >
                    #{index + 1}
                  </span>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 6, padding: 8 }}>
                  <div style={{ display: "flex", gap: 6 }}>
                    <button
                      type="button"
                      disabled={index === 0 || isPending}
                      onClick={() => handleMove(index, -1)}
                      aria-label="Move up"
                      style={iconButtonStyle(index === 0)}
                    >
                      <ArrowUpIcon />
                    </button>
                    <button
                      type="button"
                      disabled={index === photos.length - 1 || isPending}
                      onClick={() => handleMove(index, 1)}
                      aria-label="Move down"
                      style={iconButtonStyle(index === photos.length - 1)}
                    >
                      <ArrowDownIcon />
                    </button>
                  </div>

                  <button
                    type="button"
                    disabled={isPending}
                    onClick={() => replaceInputRefs.current[photo.id]?.click()}
                    style={textButtonStyle}
                  >
                    Replace
                  </button>
                  <input
                    ref={(el) => {
                      replaceInputRefs.current[photo.id] = el;
                    }}
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    onChange={(event) => handleReplace(photo.id, photo.photo_path, event)}
                    style={{ display: "none" }}
                  />

                  {confirmDeleteId === photo.id ? (
                    <div style={{ display: "flex", gap: 6 }}>
                      <button
                        type="button"
                        disabled={isPending}
                        onClick={() => handleDelete(photo.id, photo.photo_path)}
                        style={{ ...textButtonStyle, color: "#E57373", flex: 1 }}
                      >
                        Confirm
                      </button>
                      <button type="button" onClick={() => setConfirmDeleteId(null)} style={{ ...textButtonStyle, flex: 1 }}>
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      disabled={isPending}
                      onClick={() => setConfirmDeleteId(photo.id)}
                      style={{ ...textButtonStyle, color: "#E57373" }}
                    >
                      Delete
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p style={{ margin: "0 0 20px", fontFamily: SANS, fontSize: 13, color: "rgba(248,243,232,0.4)" }}>
          No photos yet. Add one or more below.
        </p>
      )}

      <button
        type="button"
        disabled={isPending}
        onClick={() => addInputRef.current?.click()}
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
          cursor: isPending ? "not-allowed" : "pointer",
          opacity: isPending ? 0.6 : 1,
        }}
      >
        <ImageIcon className="h-4 w-4" />
        {isPending ? "Working…" : "Add more photos"}
      </button>
      <p style={{ margin: "8px 0 0", fontSize: 11.5, fontFamily: SANS, color: "rgba(248,243,232,0.4)" }}>
        JPG, PNG or WebP. Max 4 MB each. You can select multiple files at once.
      </p>
      <input
        ref={addInputRef}
        type="file"
        multiple
        accept="image/jpeg,image/png,image/webp"
        onChange={handleAddPhotos}
        style={{ display: "none" }}
      />

      <style>{`
        @media (max-width: 480px) {
          .infra-photo-manager-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </div>
  );
}

function iconButtonStyle(disabled: boolean): React.CSSProperties {
  return {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "6px 0",
    borderRadius: 3,
    border: "1px solid rgba(200,185,155,0.2)",
    background: "transparent",
    color: disabled ? "rgba(248,243,232,0.25)" : "rgba(248,243,232,0.75)",
    cursor: disabled ? "not-allowed" : "pointer",
  };
}

const textButtonStyle: React.CSSProperties = {
  padding: "6px 0",
  borderRadius: 3,
  border: "1px solid rgba(200,185,155,0.2)",
  background: "transparent",
  color: "rgba(248,243,232,0.75)",
  fontFamily: SANS,
  fontSize: 11.5,
  fontWeight: 500,
  cursor: "pointer",
};
