"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { GalleryPhoto } from "@/lib/supabase/types";
import { getGalleryPhotoUrl } from "@/lib/supabase/storage";
import { deleteGalleryPhotoAction } from "@/app/admin/dashboard/gallery/actions";
import { GOLD_500, IVORY_100, SANS } from "@/components/admin/tokens";
import { ImageIcon } from "@/components/ui/icons";

function StatusBadge({ published }: { published: boolean }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 5,
        padding: "3px 9px",
        borderRadius: 2,
        fontSize: 10.5,
        fontWeight: 600,
        letterSpacing: "0.06em",
        textTransform: "uppercase",
        fontFamily: SANS,
        border: published ? "1px solid rgba(107,178,110,0.35)" : "1px solid rgba(248,243,232,0.15)",
        color: published ? "#8FCB90" : "rgba(248,243,232,0.45)",
        background: published ? "rgba(107,178,110,0.08)" : "transparent",
      }}
    >
      <span style={{ width: 5, height: 5, borderRadius: "50%", backgroundColor: published ? "#8FCB90" : "rgba(248,243,232,0.35)" }} />
      {published ? "Published" : "Hidden"}
    </span>
  );
}

export default function GalleryGrid({ photos }: { photos: GalleryPhoto[] }) {
  const router = useRouter();
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [isDeleting, startTransition] = useTransition();

  function confirmDelete(id: string) {
    setDeleteError(null);
    setPendingDeleteId(id);
  }

  function runDelete() {
    if (!pendingDeleteId) return;
    const target = photos.find((p) => p.id === pendingDeleteId);
    startTransition(async () => {
      const result = await deleteGalleryPhotoAction(pendingDeleteId, target?.photo_path ?? "");
      if (!result.success) {
        setDeleteError(result.message ?? "Could not delete gallery photo.");
        return;
      }
      setPendingDeleteId(null);
      router.refresh();
    });
  }

  if (photos.length === 0) {
    return (
      <div style={{ border: "1px solid rgba(200,185,155,0.10)", padding: "56px 24px", textAlign: "center" }}>
        <p style={{ margin: "0 0 6px", fontFamily: SANS, fontSize: 14, color: IVORY_100 }}>No gallery photos yet.</p>
        <p style={{ margin: "0 0 20px", fontFamily: SANS, fontSize: 13, color: "rgba(248,243,232,0.45)" }}>
          Add your first photograph to get started.
        </p>
        <Link
          href="/admin/dashboard/gallery/new"
          style={{
            display: "inline-flex",
            padding: "9px 20px",
            borderRadius: 3,
            background: GOLD_500,
            color: "#0B1628",
            fontFamily: SANS,
            fontSize: 12,
            fontWeight: 600,
            letterSpacing: "0.05em",
            textTransform: "uppercase",
            textDecoration: "none",
          }}
        >
          + Add Gallery Photo
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="gallery-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 18 }}>
        {photos.map((photo) => {
          const url = getGalleryPhotoUrl(photo.photo_path);
          return (
            <div key={photo.id} style={{ border: "1px solid rgba(200,185,155,0.12)", borderRadius: 4, overflow: "hidden", display: "flex", flexDirection: "column" }}>
              <div style={{ position: "relative", aspectRatio: "4 / 3", backgroundColor: "rgba(255,255,255,0.03)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                {url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={url} alt={photo.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                ) : (
                  <ImageIcon className="h-8 w-8" style={{ color: "rgba(248,243,232,0.25)" }} />
                )}
                <div style={{ position: "absolute", top: 8, left: 8 }}>
                  <StatusBadge published={photo.is_published} />
                </div>
              </div>

              <div style={{ padding: "12px 14px", display: "flex", flexDirection: "column", gap: 6, flex: 1 }}>
                <span style={{ fontFamily: SANS, fontSize: 13, fontWeight: 500, color: IVORY_100, lineHeight: 1.3 }}>{photo.title}</span>
                <span style={{ fontFamily: SANS, fontSize: 11.5, color: "rgba(248,243,232,0.5)" }}>
                  {photo.category}
                  {photo.campus ? ` · ${photo.campus}` : ""}
                  {photo.academic_year ? ` · ${photo.academic_year}` : ""}
                </span>
                <span style={{ fontFamily: SANS, fontSize: 11, color: "rgba(248,243,232,0.35)" }}>Order {photo.display_order}</span>

                <div style={{ display: "flex", gap: 12, marginTop: "auto", paddingTop: 10 }}>
                  <Link
                    href={`/admin/dashboard/gallery/${photo.id}/edit`}
                    style={{ fontFamily: SANS, fontSize: 11.5, color: GOLD_500, textDecoration: "none", fontWeight: 500, letterSpacing: "0.03em" }}
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    onClick={() => confirmDelete(photo.id)}
                    style={{ fontFamily: SANS, fontSize: 11.5, color: "#E57373", background: "none", border: "none", cursor: "pointer", padding: 0, letterSpacing: "0.03em" }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {pendingDeleteId && (
        <div
          role="dialog"
          aria-modal="true"
          style={{ position: "fixed", inset: 0, zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: 20, backgroundColor: "rgba(7,14,26,0.75)" }}
        >
          <div style={{ width: "100%", maxWidth: 380, background: "#0F1F3A", border: "1px solid rgba(200,185,155,0.18)", borderRadius: 5, padding: 26 }}>
            <h2 style={{ margin: "0 0 10px", fontFamily: SANS, fontSize: 15, fontWeight: 600, color: IVORY_100 }}>Delete this gallery photo?</h2>
            <p style={{ margin: "0 0 20px", fontFamily: SANS, fontSize: 13, lineHeight: 1.6, color: "rgba(248,243,232,0.55)" }}>
              This will permanently remove the photo and its image file. This cannot be undone.
            </p>
            {deleteError && (
              <p role="alert" style={{ margin: "0 0 16px", fontSize: 12.5, color: "#E57373", fontFamily: SANS }}>
                {deleteError}
              </p>
            )}
            <div style={{ display: "flex", justifyContent: "flex-end", gap: 10 }}>
              <button
                type="button"
                onClick={() => setPendingDeleteId(null)}
                disabled={isDeleting}
                style={{ padding: "9px 16px", borderRadius: 3, border: "1px solid rgba(200,185,155,0.2)", background: "transparent", color: "rgba(248,243,232,0.7)", fontFamily: SANS, fontSize: 12.5, cursor: "pointer" }}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={runDelete}
                disabled={isDeleting}
                style={{ padding: "9px 16px", borderRadius: 3, border: "none", background: "#C0433A", color: "#FFF", fontFamily: SANS, fontSize: 12.5, fontWeight: 600, cursor: isDeleting ? "not-allowed" : "pointer", opacity: isDeleting ? 0.6 : 1 }}
              >
                {isDeleting ? "Deleting…" : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 480px) {
          .gallery-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 12px !important; }
        }
      `}</style>
    </div>
  );
}
