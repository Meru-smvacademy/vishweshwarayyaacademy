"use client";

import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";
import Link from "next/link";
import type { InfrastructureActionState } from "@/app/admin/dashboard/infrastructure/actions";
import type { InfrastructureItem } from "@/lib/supabase/types";
import { INFRASTRUCTURE_CATEGORIES, INFRASTRUCTURE_CAMPUSES } from "@/lib/validation/infrastructure";
import { GOLD_500, IVORY_100, SANS } from "@/components/admin/tokens";
import CategoryPhotoGuidance from "@/components/admin/infrastructure/CategoryPhotoGuidance";

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
      {pending ? "Saving…" : "Save Changes"}
    </button>
  );
}

export default function InfrastructureEditForm({
  item,
  action,
}: {
  item: InfrastructureItem;
  action: (prevState: InfrastructureActionState, formData: FormData) => Promise<InfrastructureActionState>;
}) {
  const [state, formAction] = useActionState(action, { success: false } as InfrastructureActionState);
  const [category, setCategory] = useState(item.category);

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
        <input id="title" name="title" type="text" required defaultValue={item.title} style={inputStyle} />
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
              defaultValue={item.category}
              onChange={(event) => setCategory(event.target.value)}
              style={selectStyle}
            >
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
            <select id="campus" name="campus" style={selectStyle}>
              <option value="" disabled style={optionStyle}>
                Select campus
              </option>
              {INFRASTRUCTURE_CAMPUSES.map((campus) => (
                <option key={campus} value={campus} selected={item.campus === campus} style={optionStyle}>
                  {campus}
                </option>
              ))}
              <option value="" selected={!item.campus} style={optionStyle}>
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
        <textarea id="description" name="description" rows={4} defaultValue={item.description ?? ""} style={{ ...inputStyle, resize: "vertical" }} />
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
          defaultValue={item.display_order}
          style={{ ...inputStyle, maxWidth: 140 }}
        />
        {state.errors?.displayOrder && (
          <p role="alert" style={{ margin: "6px 0 0", fontSize: 12, color: "#E57373", fontFamily: SANS }}>
            {state.errors.displayOrder}
          </p>
        )}
      </div>

      <label style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer", fontFamily: SANS }}>
        <input type="checkbox" name="isPublished" defaultChecked={item.is_published} style={{ width: 16, height: 16 }} />
        <span style={{ fontSize: 13, color: "rgba(248,243,232,0.75)" }}>Published (visible once public integration is enabled)</span>
      </label>

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
        }
      `}</style>
    </form>
  );
}
