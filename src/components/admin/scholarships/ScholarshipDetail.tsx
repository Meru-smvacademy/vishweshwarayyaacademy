"use client";

import { useActionState, useState, useTransition } from "react";
import { useFormStatus } from "react-dom";
import { useRouter } from "next/navigation";
import type { ScholarshipApplication } from "@/lib/supabase/types";
import {
  deleteScholarshipApplicationAction,
  updateScholarshipApplicationAction,
  type ScholarshipActionState,
} from "@/app/admin/dashboard/scholarships/actions";
import { SCHOLARSHIP_STATUSES } from "@/lib/validation/scholarshipAdmin";
import { GOLD_500, IVORY_100, SANS } from "@/components/admin/tokens";

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: 11.5,
  fontWeight: 600,
  letterSpacing: "0.05em",
  textTransform: "uppercase",
  color: "rgba(248,243,232,0.4)",
  marginBottom: 5,
  fontFamily: SANS,
};

const valueStyle: React.CSSProperties = {
  fontFamily: SANS,
  fontSize: 14.5,
  color: IVORY_100,
  margin: 0,
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "10px 12px",
  fontSize: 14,
  border: "1px solid rgba(200,185,155,0.22)",
  borderRadius: 3,
  background: "#0F1F3A",
  color: IVORY_100,
  outline: "none",
  fontFamily: SANS,
  lineHeight: 1.5,
  cursor: "pointer",
  appearance: "none",
  WebkitAppearance: "none",
  MozAppearance: "none",
};

const optionStyle: React.CSSProperties = { backgroundColor: "#0F1F3A", color: IVORY_100 };

function ReadOnlyField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <span style={labelStyle}>{label}</span>
      <div style={valueStyle}>{children}</div>
    </div>
  );
}

function formatDateTime(iso: string): string {
  return new Date(iso).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function SaveButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      style={{
        padding: "11px 26px",
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
      {pending ? "Saving…" : "Save Changes"}
    </button>
  );
}

export default function ScholarshipDetail({ application }: { application: ScholarshipApplication }) {
  const router = useRouter();
  const updateAction = updateScholarshipApplicationAction.bind(null, application.id);
  const [state, formAction] = useActionState(updateAction, { success: false } as ScholarshipActionState);

  const [confirmingDelete, setConfirmingDelete] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [isDeleting, startTransition] = useTransition();

  function runDelete() {
    startTransition(async () => {
      const result = await deleteScholarshipApplicationAction(application.id);
      if (!result.success) {
        setDeleteError(result.message ?? "Could not delete application.");
        return;
      }
      router.push("/admin/dashboard/scholarships");
      router.refresh();
    });
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 32, maxWidth: 720 }}>
      <div
        className="scholarship-detail-grid"
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, padding: 20, border: "1px solid rgba(200,185,155,0.12)", borderRadius: 4 }}
      >
        <ReadOnlyField label="Reference Number">{application.reference_no}</ReadOnlyField>
        <ReadOnlyField label="Student Name">{application.student_name}</ReadOnlyField>
        <ReadOnlyField label="Phone">
          <a href={`tel:+91${application.phone}`} style={{ color: GOLD_500, textDecoration: "none" }}>
            {application.phone} — Call
          </a>
        </ReadOnlyField>
        <ReadOnlyField label="Applying For">{application.applying_for}</ReadOnlyField>
        <ReadOnlyField label="Education Completed">{application.education_completed}</ReadOnlyField>
        <ReadOnlyField label="School / College">{application.school_college_name}</ReadOnlyField>
        <ReadOnlyField label="Native Place">{application.native_place}</ReadOnlyField>
        <ReadOnlyField label="Academic Year">{application.academic_year}</ReadOnlyField>
        <ReadOnlyField label="Created">{formatDateTime(application.created_at)}</ReadOnlyField>
        <ReadOnlyField label="Last Updated">{formatDateTime(application.updated_at)}</ReadOnlyField>
      </div>

      <form action={formAction} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
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

        <div style={{ maxWidth: 260 }}>
          <label htmlFor="status" style={labelStyle}>
            Status
          </label>
          <select id="status" name="status" defaultValue={application.status} style={inputStyle}>
            {SCHOLARSHIP_STATUSES.map((status) => (
              <option key={status} value={status} style={optionStyle}>
                {status}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="adminNotes" style={labelStyle}>
            Admin Notes
          </label>
          <textarea
            id="adminNotes"
            name="adminNotes"
            rows={5}
            defaultValue={application.admin_notes ?? ""}
            placeholder="Private notes for staff — never shown to the public."
            style={{ ...inputStyle, background: "rgba(255,255,255,0.03)", cursor: "text", resize: "vertical" }}
          />
        </div>

        <div>
          <SaveButton />
        </div>
      </form>

      <div style={{ borderTop: "1px solid rgba(200,185,155,0.1)", paddingTop: 20 }}>
        {!confirmingDelete ? (
          <button
            type="button"
            onClick={() => {
              setDeleteError(null);
              setConfirmingDelete(true);
            }}
            style={{
              padding: "10px 18px",
              borderRadius: 3,
              border: "1px solid rgba(229,115,115,0.35)",
              background: "transparent",
              color: "#E57373",
              fontFamily: SANS,
              fontSize: 12.5,
              fontWeight: 500,
              cursor: "pointer",
            }}
          >
            Delete Application
          </button>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 420 }}>
            <p style={{ margin: 0, fontFamily: SANS, fontSize: 13, color: "rgba(248,243,232,0.6)" }}>
              This will permanently remove this scholarship application record. This cannot be undone.
            </p>
            {deleteError && (
              <p role="alert" style={{ margin: 0, fontSize: 12.5, color: "#E57373", fontFamily: SANS }}>
                {deleteError}
              </p>
            )}
            <div style={{ display: "flex", gap: 10 }}>
              <button
                type="button"
                onClick={() => setConfirmingDelete(false)}
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
                {isDeleting ? "Deleting…" : "Confirm Delete"}
              </button>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 560px) {
          .scholarship-detail-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
