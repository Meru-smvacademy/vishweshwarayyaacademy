"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { deleteInfrastructureItemAction } from "@/app/admin/dashboard/infrastructure/actions";
import { GOLD_500, IVORY_100, SANS } from "@/components/admin/tokens";
import { ImageIcon } from "@/components/ui/icons";

export type InfrastructureListRow = {
  id: string;
  title: string;
  category: string;
  campus: string | null;
  display_order: number;
  is_published: boolean;
  photo_count: number;
  cover_url: string | null;
};

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

function Thumb({ url, title, count }: { url: string | null; title: string; count: number }) {
  return (
    <div
      style={{
        position: "relative",
        width: 56,
        height: 56,
        flexShrink: 0,
        borderRadius: 4,
        overflow: "hidden",
        background: "rgba(255,255,255,0.03)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {url ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={url} alt={title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      ) : (
        <ImageIcon className="h-5 w-5" style={{ color: "rgba(248,243,232,0.25)" }} />
      )}
      {count > 1 && (
        <span
          style={{
            position: "absolute",
            bottom: 2,
            right: 2,
            padding: "1px 5px",
            borderRadius: 2,
            background: "rgba(7,14,26,0.8)",
            color: IVORY_100,
            fontFamily: SANS,
            fontSize: 9.5,
            fontWeight: 600,
          }}
        >
          {count}
        </span>
      )}
    </div>
  );
}

export default function InfrastructureList({ items }: { items: InfrastructureListRow[] }) {
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
    startTransition(async () => {
      const result = await deleteInfrastructureItemAction(pendingDeleteId);
      if (!result.success) {
        setDeleteError(result.message ?? "Could not delete infrastructure item.");
        return;
      }
      setPendingDeleteId(null);
      router.refresh();
    });
  }

  if (items.length === 0) {
    return (
      <div style={{ border: "1px solid rgba(200,185,155,0.10)", padding: "56px 24px", textAlign: "center" }}>
        <p style={{ margin: "0 0 6px", fontFamily: SANS, fontSize: 14, color: IVORY_100 }}>No infrastructure items yet.</p>
        <p style={{ margin: "0 0 20px", fontFamily: SANS, fontSize: 13, color: "rgba(248,243,232,0.45)" }}>
          Add your first infrastructure item to get started.
        </p>
        <Link
          href="/admin/dashboard/infrastructure/new"
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
          + Add Infrastructure Item
        </Link>
      </div>
    );
  }

  const columns = [
    { key: "photo", label: "" },
    { key: "title", label: "Title" },
    { key: "category", label: "Category" },
    { key: "campus", label: "Campus" },
    { key: "photos", label: "Photos" },
    { key: "status", label: "Status" },
    { key: "order", label: "Order" },
    { key: "actions", label: "" },
  ];

  return (
    <div>
      <table className="infra-row-desktop" style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ borderBottom: "1px solid rgba(200,185,155,0.14)" }}>
            {columns.map((col) => (
              <th
                key={col.key}
                style={{
                  textAlign: "left",
                  padding: "10px 12px",
                  fontFamily: SANS,
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                  color: "rgba(248,243,232,0.45)",
                }}
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id} style={{ borderBottom: "1px solid rgba(200,185,155,0.08)" }}>
              <td style={{ padding: "10px 12px" }}>
                <Thumb url={item.cover_url} title={item.title} count={item.photo_count} />
              </td>
              <td style={{ padding: "10px 12px", fontFamily: SANS, fontSize: 13.5, color: IVORY_100 }}>{item.title}</td>
              <td style={{ padding: "10px 12px", fontFamily: SANS, fontSize: 13, color: "rgba(248,243,232,0.65)" }}>{item.category}</td>
              <td style={{ padding: "10px 12px", fontFamily: SANS, fontSize: 13, color: "rgba(248,243,232,0.65)" }}>
                {item.campus ?? "—"}
              </td>
              <td style={{ padding: "10px 12px", fontFamily: SANS, fontSize: 13, color: "rgba(248,243,232,0.65)" }}>
                {item.photo_count}
              </td>
              <td style={{ padding: "10px 12px" }}>
                <StatusBadge published={item.is_published} />
              </td>
              <td style={{ padding: "10px 12px", fontFamily: SANS, fontSize: 13, color: "rgba(248,243,232,0.5)" }}>
                {item.display_order}
              </td>
              <td style={{ padding: "10px 12px" }}>
                <div style={{ display: "flex", gap: 12 }}>
                  <Link
                    href={`/admin/dashboard/infrastructure/${item.id}/edit`}
                    style={{ fontFamily: SANS, fontSize: 12, color: GOLD_500, textDecoration: "none", fontWeight: 500 }}
                  >
                    Manage
                  </Link>
                  <button
                    type="button"
                    onClick={() => confirmDelete(item.id)}
                    style={{ fontFamily: SANS, fontSize: 12, color: "#E57373", background: "none", border: "none", cursor: "pointer", padding: 0 }}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="infra-row-mobile" style={{ display: "none", flexDirection: "column", gap: 12 }}>
        {items.map((item) => (
          <div key={item.id} style={{ border: "1px solid rgba(200,185,155,0.14)", borderRadius: 5, padding: 14, display: "flex", gap: 12 }}>
            <Thumb url={item.cover_url} title={item.title} count={item.photo_count} />
            <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: 4 }}>
              <span style={{ fontFamily: SANS, fontSize: 14, fontWeight: 500, color: IVORY_100 }}>{item.title}</span>
              <span style={{ fontFamily: SANS, fontSize: 12, color: "rgba(248,243,232,0.55)" }}>
                {item.category}
                {item.campus ? ` · ${item.campus}` : ""}
              </span>
              <span style={{ fontFamily: SANS, fontSize: 11.5, color: "rgba(248,243,232,0.4)" }}>
                {item.photo_count} photo{item.photo_count === 1 ? "" : "s"} · Order {item.display_order}
              </span>
              <div style={{ marginTop: 4 }}>
                <StatusBadge published={item.is_published} />
              </div>
              <div style={{ display: "flex", gap: 14, marginTop: 8 }}>
                <Link
                  href={`/admin/dashboard/infrastructure/${item.id}/edit`}
                  style={{ fontFamily: SANS, fontSize: 12.5, color: GOLD_500, textDecoration: "none", fontWeight: 500 }}
                >
                  Manage
                </Link>
                <button
                  type="button"
                  onClick={() => confirmDelete(item.id)}
                  style={{ fontFamily: SANS, fontSize: 12.5, color: "#E57373", background: "none", border: "none", cursor: "pointer", padding: 0 }}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {pendingDeleteId && (
        <div
          role="dialog"
          aria-modal="true"
          style={{ position: "fixed", inset: 0, zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: 20, backgroundColor: "rgba(7,14,26,0.75)" }}
        >
          <div style={{ width: "100%", maxWidth: 380, background: "#0F1F3A", border: "1px solid rgba(200,185,155,0.18)", borderRadius: 5, padding: 26 }}>
            <h2 style={{ margin: "0 0 10px", fontFamily: SANS, fontSize: 15, fontWeight: 600, color: IVORY_100 }}>Delete this infrastructure item?</h2>
            <p style={{ margin: "0 0 20px", fontFamily: SANS, fontSize: 13, lineHeight: 1.6, color: "rgba(248,243,232,0.55)" }}>
              This will permanently remove the item and all of its photos. This cannot be undone.
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
        @media (max-width: 860px) {
          .infra-row-desktop { display: none !important; }
          .infra-row-mobile { display: flex !important; }
        }
      `}</style>
    </div>
  );
}
