"use client";

import { useActionState, useState, useTransition } from "react";
import { useFormStatus } from "react-dom";
import { useRouter } from "next/navigation";
import type { Enquiry } from "@/lib/supabase/types";
import { deleteEnquiryAction, updateEnquiryAction, type EnquiryActionState } from "@/app/admin/dashboard/enquiries/actions";
import { ENQUIRY_STATUSES } from "@/lib/validation/enquiryAdmin";
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

export default function EnquiryDetail({ enquiry }: { enquiry: Enquiry }) {
  const router = useRouter();
  const updateAction = updateEnquiryAction.bind(null, enquiry.id);
  const [state, formAction] = useActionState(updateAction, { success: false } as EnquiryActionState);

  const [confirmingDelete, setConfirmingDelete] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [isDeleting, startTransition] = useTransition();

  function runDelete() {
    startTransition(async () => {
      const result = await deleteEnquiryAction(enquiry.id);
      if (!result.success) {
        setDeleteError(result.message ?? "Could not delete enquiry.");
        return;
      }
      router.push("/admin/dashboard/enquiries");
      router.refresh();
    });
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 32, maxWidth: 720 }}>
      <div
        className="enquiry-detail-grid"
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, padding: 20, border: "1px solid rgba(200,185,155,0.12)", borderRadius: 4 }}
      >
        <ReadOnlyField label="Reference Number">{enquiry.reference_no}</ReadOnlyField>
        <ReadOnlyField label="Student Name">{enquiry.student_name}</ReadOnlyField>
        <ReadOnlyField label="Parent / Guardian">{enquiry.parent_name}</ReadOnlyField>
        <ReadOnlyField label="Phone">
          <a href={`tel:+91${enquiry.phone}`} style={{ color: GOLD_500, textDecoration: "none" }}>
            {enquiry.phone} — Call
          </a>
        </ReadOnlyField>
        <ReadOnlyField label="Current Class">{enquiry.qualification}</ReadOnlyField>
        <ReadOnlyField label="Program">{enquiry.program}</ReadOnlyField>
        <ReadOnlyField label="Submitted">{formatDateTime(enquiry.created_at)}</ReadOnlyField>
        <ReadOnlyField label="Last Updated">{formatDateTime(enquiry.updated_at)}</ReadOnlyField>
        <div style={{ gridColumn: "1 / -1" }}>
          <ReadOnlyField label="Message">
            {enquiry.message ? enquiry.message : <span style={{ color: "rgba(248,243,232,0.35)" }}>No message provided.</span>}
          </ReadOnlyField>
        </div>
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
          <select id="status" name="status" defaultValue={enquiry.status} style={inputStyle}>
            {ENQUIRY_STATUSES.map((status) => (
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
            defaultValue={enquiry.admin_notes ?? ""}
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
            Delete Enquiry
          </button>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 420 }}>
            <p style={{ margin: 0, fontFamily: SANS, fontSize: 13, color: "rgba(248,243,232,0.6)" }}>
              This will permanently remove this enquiry record. This cannot be undone.
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
          .enquiry-detail-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
