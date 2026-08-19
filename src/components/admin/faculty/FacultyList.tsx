"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { Faculty } from "@/lib/supabase/types";
import { getFacultyPhotoUrl } from "@/lib/supabase/storage";
import { deleteFacultyAction } from "@/app/admin/dashboard/faculty/actions";
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
      <span
        style={{
          width: 5,
          height: 5,
          borderRadius: "50%",
          backgroundColor: published ? "#8FCB90" : "rgba(248,243,232,0.35)",
        }}
      />
      {published ? "Published" : "Hidden"}
    </span>
  );
}

function Thumb({ path, name }: { path: string | null; name: string }) {
  const url = getFacultyPhotoUrl(path);
  return (
    <div
      style={{
        width: 44,
        height: 44,
        borderRadius: 4,
        overflow: "hidden",
        flexShrink: 0,
        border: "1px solid rgba(200,185,155,0.15)",
        backgroundColor: "rgba(255,255,255,0.03)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {url ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={url} alt={`Photograph of ${name}`} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      ) : (
        <ImageIcon className="h-4 w-4" style={{ color: "rgba(248,243,232,0.25)" }} />
      )}
    </div>
  );
}

export default function FacultyList({ faculty }: { faculty: Faculty[] }) {
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
    const target = faculty.find((f) => f.id === pendingDeleteId);
    startTransition(async () => {
      const result = await deleteFacultyAction(pendingDeleteId, target?.photo_path ?? null);
      if (!result.success) {
        setDeleteError(result.message ?? "Could not delete faculty member.");
        return;
      }
      setPendingDeleteId(null);
      router.refresh();
    });
  }

  if (faculty.length === 0) {
    return (
      <div
        style={{
          border: "1px solid rgba(200,185,155,0.10)",
          padding: "56px 24px",
          textAlign: "center",
        }}
      >
        <p style={{ margin: "0 0 6px", fontFamily: SANS, fontSize: 14, color: IVORY_100 }}>No faculty members yet.</p>
        <p style={{ margin: "0 0 20px", fontFamily: SANS, fontSize: 13, color: "rgba(248,243,232,0.45)" }}>
          Add your first faculty profile to get started.
        </p>
        <Link
          href="/admin/dashboard/faculty/new"
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
          + Add Faculty
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="faculty-table-head" style={{ display: "grid", gridTemplateColumns: "56px 1.6fr 1fr 1fr 0.9fr 0.7fr 90px auto", gap: 12, padding: "0 4px 10px", borderBottom: "1px solid rgba(200,185,155,0.12)" }}>
        {[
          { key: "photo", label: "" },
          { key: "name", label: "Name" },
          { key: "designation", label: "Designation / Subject" },
          { key: "qualification", label: "Qualification" },
          { key: "campus", label: "Campus" },
          { key: "status", label: "Status" },
          { key: "order", label: "Order" },
          { key: "actions", label: "" },
        ].map((column) => (
          <span
            key={column.key}
            style={{ fontFamily: SANS, fontSize: 10, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(200,185,155,0.4)" }}
          >
            {column.label}
          </span>
        ))}
      </div>

      {faculty.map((member) => (
        <div key={member.id} className="faculty-row" style={{ borderBottom: "1px solid rgba(200,185,155,0.08)", padding: "16px 4px" }}>
          <div className="faculty-row-desktop" style={{ display: "grid", gridTemplateColumns: "56px 1.6fr 1fr 1fr 0.9fr 0.7fr 90px auto", gap: 12, alignItems: "center" }}>
            <Thumb path={member.photo_path} name={member.name} />
            <span style={{ fontFamily: SANS, fontSize: 13.5, color: IVORY_100, fontWeight: 500 }}>{member.name}</span>
            <span style={{ fontFamily: SANS, fontSize: 12.5, color: "rgba(248,243,232,0.6)" }}>
              {member.designation}
              {member.subject ? ` · ${member.subject}` : ""}
            </span>
            <span style={{ fontFamily: SANS, fontSize: 12.5, color: "rgba(248,243,232,0.5)" }}>{member.qualification || "—"}</span>
            <span style={{ fontFamily: SANS, fontSize: 12.5, color: "rgba(248,243,232,0.5)" }}>{member.campus ?? "—"}</span>
            <StatusBadge published={member.is_published} />
            <span style={{ fontFamily: SANS, fontSize: 12.5, color: "rgba(248,243,232,0.5)" }}>{member.display_order}</span>
            <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
              <Link
                href={`/admin/dashboard/faculty/${member.id}/edit`}
                style={{ fontFamily: SANS, fontSize: 11.5, color: GOLD_500, textDecoration: "none", fontWeight: 500, letterSpacing: "0.03em" }}
              >
                Edit
              </Link>
              <button
                type="button"
                onClick={() => confirmDelete(member.id)}
                style={{ fontFamily: SANS, fontSize: 11.5, color: "#E57373", background: "none", border: "none", cursor: "pointer", padding: 0, letterSpacing: "0.03em" }}
              >
                Delete
              </button>
            </div>
          </div>

          <div className="faculty-row-mobile" style={{ display: "none", flexDirection: "column", gap: 10 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <Thumb path={member.photo_path} name={member.name} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontFamily: SANS, fontSize: 14, color: IVORY_100, fontWeight: 500 }}>{member.name}</div>
                <div style={{ fontFamily: SANS, fontSize: 12, color: "rgba(248,243,232,0.55)" }}>
                  {member.designation}
                  {member.subject ? ` · ${member.subject}` : ""}
                </div>
              </div>
              <StatusBadge published={member.is_published} />
            </div>
            <div style={{ fontFamily: SANS, fontSize: 12, color: "rgba(248,243,232,0.45)" }}>
              {member.qualification || "—"} &middot; {member.campus ?? "—"} &middot; Order {member.display_order}
            </div>
            <div style={{ display: "flex", gap: 16 }}>
              <Link href={`/admin/dashboard/faculty/${member.id}/edit`} style={{ fontFamily: SANS, fontSize: 12.5, color: GOLD_500, textDecoration: "none", fontWeight: 500 }}>
                Edit
              </Link>
              <button
                type="button"
                onClick={() => confirmDelete(member.id)}
                style={{ fontFamily: SANS, fontSize: 12.5, color: "#E57373", background: "none", border: "none", cursor: "pointer", padding: 0 }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}

      {pendingDeleteId && (
        <div
          role="dialog"
          aria-modal="true"
          style={{ position: "fixed", inset: 0, zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: 20, backgroundColor: "rgba(7,14,26,0.75)" }}
        >
          <div style={{ width: "100%", maxWidth: 380, background: "#0F1F3A", border: "1px solid rgba(200,185,155,0.18)", borderRadius: 5, padding: 26 }}>
            <h2 style={{ margin: "0 0 10px", fontFamily: SANS, fontSize: 15, fontWeight: 600, color: IVORY_100 }}>Delete this faculty member?</h2>
            <p style={{ margin: "0 0 20px", fontFamily: SANS, fontSize: 13, lineHeight: 1.6, color: "rgba(248,243,232,0.55)" }}>
              This will permanently remove the profile and its photograph. This cannot be undone.
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
          .faculty-table-head { display: none !important; }
          .faculty-row-desktop { display: none !important; }
          .faculty-row-mobile { display: flex !important; }
        }
      `}</style>
    </div>
  );
}
