"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { ScholarshipApplication } from "@/lib/supabase/types";
import { deleteScholarshipApplicationAction } from "@/app/admin/dashboard/scholarships/actions";
import { GOLD_500, IVORY_100, SANS } from "@/components/admin/tokens";

const STATUS_STYLES: Record<string, string> = {
  New: GOLD_500,
  Contacted: "#8CAAD2",
  Registered: "#A98CD8",
  "Exam Attended": "#E0A85A",
  Selected: "#8FCB90",
  "Not Selected": "rgba(248,243,232,0.45)",
};

function StatusBadge({ status }: { status: string }) {
  const color = STATUS_STYLES[status] ?? "rgba(248,243,232,0.45)";
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
        border: `1px solid ${color}55`,
        color,
        background: `${color}14`,
        whiteSpace: "nowrap",
      }}
    >
      <span style={{ width: 5, height: 5, borderRadius: "50%", backgroundColor: color }} />
      {status}
    </span>
  );
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
}

export default function ScholarshipList({ applications }: { applications: ScholarshipApplication[] }) {
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
      const result = await deleteScholarshipApplicationAction(pendingDeleteId);
      if (!result.success) {
        setDeleteError(result.message ?? "Could not delete application.");
        return;
      }
      setPendingDeleteId(null);
      router.refresh();
    });
  }

  if (applications.length === 0) {
    return (
      <div style={{ border: "1px solid rgba(200,185,155,0.10)", padding: "56px 24px", textAlign: "center" }}>
        <p style={{ margin: "0 0 6px", fontFamily: SANS, fontSize: 14, color: IVORY_100 }}>No scholarship applications found.</p>
        <p style={{ margin: 0, fontFamily: SANS, fontSize: 13, color: "rgba(248,243,232,0.45)" }}>
          Try adjusting your search or filters, or check back once a visitor submits the SNT scholarship application form.
        </p>
      </div>
    );
  }

  const columns = [
    { key: "student", label: "Student" },
    { key: "phone", label: "Phone" },
    { key: "applyingFor", label: "Applying For" },
    { key: "educationCompleted", label: "Class" },
    { key: "academicYear", label: "Academic Year" },
    { key: "status", label: "Status" },
    { key: "date", label: "Date" },
    { key: "actions", label: "" },
  ];

  return (
    <div>
      <table className="scholarship-row-desktop" style={{ width: "100%", borderCollapse: "collapse" }}>
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
          {applications.map((application) => (
            <tr key={application.id} style={{ borderBottom: "1px solid rgba(200,185,155,0.08)" }}>
              <td style={{ padding: "10px 12px", fontFamily: SANS, fontSize: 13.5, color: IVORY_100 }}>{application.student_name}</td>
              <td style={{ padding: "10px 12px", fontFamily: SANS, fontSize: 13, whiteSpace: "nowrap" }}>
                <a href={`tel:+91${application.phone}`} style={{ color: GOLD_500, textDecoration: "none" }}>
                  {application.phone}
                </a>
              </td>
              <td style={{ padding: "10px 12px", fontFamily: SANS, fontSize: 13, color: "rgba(248,243,232,0.65)" }}>{application.applying_for}</td>
              <td style={{ padding: "10px 12px", fontFamily: SANS, fontSize: 13, color: "rgba(248,243,232,0.65)", whiteSpace: "nowrap" }}>
                {application.education_completed}
              </td>
              <td style={{ padding: "10px 12px", fontFamily: SANS, fontSize: 13, color: "rgba(248,243,232,0.65)", whiteSpace: "nowrap" }}>
                {application.academic_year}
              </td>
              <td style={{ padding: "10px 12px" }}>
                <StatusBadge status={application.status} />
              </td>
              <td style={{ padding: "10px 12px", fontFamily: SANS, fontSize: 12.5, color: "rgba(248,243,232,0.5)", whiteSpace: "nowrap" }}>
                {formatDate(application.created_at)}
              </td>
              <td style={{ padding: "10px 12px" }}>
                <div style={{ display: "flex", gap: 12 }}>
                  <Link
                    href={`/admin/dashboard/scholarships/${application.id}`}
                    style={{ fontFamily: SANS, fontSize: 12, color: GOLD_500, textDecoration: "none", fontWeight: 500 }}
                  >
                    View
                  </Link>
                  <button
                    type="button"
                    onClick={() => confirmDelete(application.id)}
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

      <div className="scholarship-row-mobile" style={{ display: "none", flexDirection: "column", gap: 12 }}>
        {applications.map((application) => (
          <div key={application.id} style={{ border: "1px solid rgba(200,185,155,0.14)", borderRadius: 5, padding: 14, display: "flex", flexDirection: "column", gap: 6 }}>
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 10 }}>
              <span style={{ fontFamily: SANS, fontSize: 14, fontWeight: 500, color: IVORY_100 }}>{application.student_name}</span>
              <StatusBadge status={application.status} />
            </div>
            <span style={{ fontFamily: SANS, fontSize: 12.5, color: "rgba(248,243,232,0.55)" }}>
              {application.applying_for} &middot; {application.education_completed}
            </span>
            <span style={{ fontFamily: SANS, fontSize: 11.5, color: "rgba(248,243,232,0.4)" }}>
              {application.academic_year} &middot; {formatDate(application.created_at)}
            </span>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 4 }}>
              <a href={`tel:+91${application.phone}`} style={{ fontFamily: SANS, fontSize: 13, color: GOLD_500, textDecoration: "none", fontWeight: 500 }}>
                Call {application.phone}
              </a>
            </div>
            <div style={{ display: "flex", gap: 14, marginTop: 8 }}>
              <Link
                href={`/admin/dashboard/scholarships/${application.id}`}
                style={{ fontFamily: SANS, fontSize: 12.5, color: GOLD_500, textDecoration: "none", fontWeight: 500 }}
              >
                View details
              </Link>
              <button
                type="button"
                onClick={() => confirmDelete(application.id)}
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
            <h2 style={{ margin: "0 0 10px", fontFamily: SANS, fontSize: 15, fontWeight: 600, color: IVORY_100 }}>Delete this application?</h2>
            <p style={{ margin: "0 0 20px", fontFamily: SANS, fontSize: 13, lineHeight: 1.6, color: "rgba(248,243,232,0.55)" }}>
              This will permanently remove the scholarship application record. This cannot be undone.
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
        @media (max-width: 900px) {
          .scholarship-row-desktop { display: none !important; }
          .scholarship-row-mobile { display: flex !important; }
        }
      `}</style>
    </div>
  );
}
