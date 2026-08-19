"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { Enquiry } from "@/lib/supabase/types";
import { deleteEnquiryAction } from "@/app/admin/dashboard/enquiries/actions";
import { GOLD_500, IVORY_100, SANS } from "@/components/admin/tokens";

const STATUS_STYLES: Record<string, { color: string; dot: string }> = {
  New: { color: GOLD_500, dot: GOLD_500 },
  Contacted: { color: "#8CAAD2", dot: "#8CAAD2" },
  "Follow-up": { color: "#E0A85A", dot: "#E0A85A" },
  Converted: { color: "#8FCB90", dot: "#8FCB90" },
  Closed: { color: "rgba(248,243,232,0.45)", dot: "rgba(248,243,232,0.35)" },
};

function StatusBadge({ status }: { status: string }) {
  const style = STATUS_STYLES[status] ?? STATUS_STYLES.Closed;
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
        letterSpacing: "0.05em",
        textTransform: "uppercase",
        fontFamily: SANS,
        border: `1px solid ${style.color}55`,
        color: style.color,
        background: `${style.color}14`,
        whiteSpace: "nowrap",
      }}
    >
      <span style={{ width: 5, height: 5, borderRadius: "50%", backgroundColor: style.dot }} />
      {status}
    </span>
  );
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
}

export default function EnquiryList({ enquiries }: { enquiries: Enquiry[] }) {
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
      const result = await deleteEnquiryAction(pendingDeleteId);
      if (!result.success) {
        setDeleteError(result.message ?? "Could not delete enquiry.");
        return;
      }
      setPendingDeleteId(null);
      router.refresh();
    });
  }

  if (enquiries.length === 0) {
    return (
      <div style={{ border: "1px solid rgba(200,185,155,0.10)", padding: "56px 24px", textAlign: "center" }}>
        <p style={{ margin: "0 0 6px", fontFamily: SANS, fontSize: 14, color: IVORY_100 }}>No enquiries found.</p>
        <p style={{ margin: 0, fontFamily: SANS, fontSize: 13, color: "rgba(248,243,232,0.45)" }}>
          Try adjusting your search or filters, or check back once a visitor submits the admission enquiry form.
        </p>
      </div>
    );
  }

  const columns = [
    { key: "reference", label: "Reference" },
    { key: "student", label: "Student" },
    { key: "parent", label: "Parent" },
    { key: "phone", label: "Phone" },
    { key: "qualification", label: "Class" },
    { key: "program", label: "Program" },
    { key: "status", label: "Status" },
    { key: "submitted", label: "Submitted" },
    { key: "actions", label: "" },
  ];

  return (
    <div>
      <table className="enquiry-row-desktop" style={{ width: "100%", borderCollapse: "collapse" }}>
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
                  whiteSpace: "nowrap",
                }}
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {enquiries.map((enquiry) => (
            <tr key={enquiry.id} style={{ borderBottom: "1px solid rgba(200,185,155,0.08)" }}>
              <td style={{ padding: "10px 12px", fontFamily: SANS, fontSize: 12.5, color: "rgba(248,243,232,0.55)", whiteSpace: "nowrap" }}>
                {enquiry.reference_no}
              </td>
              <td style={{ padding: "10px 12px", fontFamily: SANS, fontSize: 13.5, color: IVORY_100 }}>{enquiry.student_name}</td>
              <td style={{ padding: "10px 12px", fontFamily: SANS, fontSize: 13, color: "rgba(248,243,232,0.65)" }}>{enquiry.parent_name}</td>
              <td style={{ padding: "10px 12px", fontFamily: SANS, fontSize: 13, whiteSpace: "nowrap" }}>
                <a href={`tel:+91${enquiry.phone}`} style={{ color: GOLD_500, textDecoration: "none" }}>
                  {enquiry.phone}
                </a>
              </td>
              <td style={{ padding: "10px 12px", fontFamily: SANS, fontSize: 13, color: "rgba(248,243,232,0.65)", whiteSpace: "nowrap" }}>
                {enquiry.qualification}
              </td>
              <td style={{ padding: "10px 12px", fontFamily: SANS, fontSize: 13, color: "rgba(248,243,232,0.65)" }}>{enquiry.program}</td>
              <td style={{ padding: "10px 12px" }}>
                <StatusBadge status={enquiry.status} />
              </td>
              <td style={{ padding: "10px 12px", fontFamily: SANS, fontSize: 12.5, color: "rgba(248,243,232,0.5)", whiteSpace: "nowrap" }}>
                {formatDate(enquiry.created_at)}
              </td>
              <td style={{ padding: "10px 12px" }}>
                <div style={{ display: "flex", gap: 12 }}>
                  <Link
                    href={`/admin/dashboard/enquiries/${enquiry.id}`}
                    style={{ fontFamily: SANS, fontSize: 12, color: GOLD_500, textDecoration: "none", fontWeight: 500 }}
                  >
                    View
                  </Link>
                  <button
                    type="button"
                    onClick={() => confirmDelete(enquiry.id)}
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

      <div className="enquiry-row-mobile" style={{ display: "none", flexDirection: "column", gap: 12 }}>
        {enquiries.map((enquiry) => (
          <div key={enquiry.id} style={{ border: "1px solid rgba(200,185,155,0.14)", borderRadius: 5, padding: 14, display: "flex", flexDirection: "column", gap: 6 }}>
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 10 }}>
              <span style={{ fontFamily: SANS, fontSize: 14, fontWeight: 500, color: IVORY_100 }}>{enquiry.student_name}</span>
              <StatusBadge status={enquiry.status} />
            </div>
            <span style={{ fontFamily: SANS, fontSize: 12, color: "rgba(248,243,232,0.5)" }}>{enquiry.reference_no}</span>
            <span style={{ fontFamily: SANS, fontSize: 12.5, color: "rgba(248,243,232,0.55)" }}>
              Parent: {enquiry.parent_name}
            </span>
            <span style={{ fontFamily: SANS, fontSize: 12.5, color: "rgba(248,243,232,0.55)" }}>
              {enquiry.qualification} · {enquiry.program}
            </span>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 4 }}>
              <a href={`tel:+91${enquiry.phone}`} style={{ fontFamily: SANS, fontSize: 13, color: GOLD_500, textDecoration: "none", fontWeight: 500 }}>
                Call {enquiry.phone}
              </a>
              <span style={{ fontFamily: SANS, fontSize: 11.5, color: "rgba(248,243,232,0.4)" }}>{formatDate(enquiry.created_at)}</span>
            </div>
            <div style={{ display: "flex", gap: 14, marginTop: 8 }}>
              <Link
                href={`/admin/dashboard/enquiries/${enquiry.id}`}
                style={{ fontFamily: SANS, fontSize: 12.5, color: GOLD_500, textDecoration: "none", fontWeight: 500 }}
              >
                View details
              </Link>
              <button
                type="button"
                onClick={() => confirmDelete(enquiry.id)}
                style={{ fontFamily: SANS, fontSize: 12.5, color: "#E57373", background: "none", border: "none", cursor: "pointer", padding: 0 }}
              >
                Delete
              </button>
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
            <h2 style={{ margin: "0 0 10px", fontFamily: SANS, fontSize: 15, fontWeight: 600, color: IVORY_100 }}>Delete this enquiry?</h2>
            <p style={{ margin: "0 0 20px", fontFamily: SANS, fontSize: 13, lineHeight: 1.6, color: "rgba(248,243,232,0.55)" }}>
              This will permanently remove the enquiry record. This cannot be undone.
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
          .enquiry-row-desktop { display: none !important; }
          .enquiry-row-mobile { display: flex !important; }
        }
      `}</style>
    </div>
  );
}
