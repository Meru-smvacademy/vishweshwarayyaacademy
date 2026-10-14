"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { SNT_MEDIUMS, SNT_STATUSES } from "@/lib/snt/constants";
import { sntAdminFilterQueryString, type SntAdminFilters } from "@/lib/snt/adminFilters";
import { EDUCATION_COMPLETED_OPTIONS } from "@/lib/validation/scholarshipApplication";
import { IVORY_100, SANS } from "@/components/admin/tokens";

const BASE_PATH = "/admin/scholarship";

const inputStyle: React.CSSProperties = {
  padding: "9px 12px",
  fontSize: 13.5,
  border: "1px solid rgba(200,185,155,0.22)",
  borderRadius: 3,
  background: "rgba(255,255,255,0.03)",
  color: IVORY_100,
  outline: "none",
  fontFamily: SANS,
};

const selectStyle: React.CSSProperties = {
  ...inputStyle,
  background: "#0F1F3A",
  cursor: "pointer",
  appearance: "none",
  WebkitAppearance: "none",
  MozAppearance: "none",
  paddingRight: 30,
};

const optionStyle: React.CSSProperties = { backgroundColor: "#0F1F3A", color: IVORY_100 };

function SelectChevron() {
  return (
    <svg
      aria-hidden="true"
      width="11"
      height="11"
      viewBox="0 0 12 12"
      fill="none"
      style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}
    >
      <path d="M2.5 4.5L6 8L9.5 4.5" stroke="rgba(248,243,232,0.55)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const SELECTS: { key: Exclude<keyof SntAdminFilters, "q">; label: string; allLabel: string; options: readonly string[] }[] = [
  { key: "status", label: "Filter by payment status", allLabel: "All payment statuses", options: SNT_STATUSES },
  { key: "education", label: "Filter by class", allLabel: "All classes", options: EDUCATION_COMPLETED_OPTIONS },
  { key: "medium", label: "Filter by medium", allLabel: "All mediums", options: SNT_MEDIUMS },
];

export default function SntRegistrationFilters({ initial }: { initial: SntAdminFilters }) {
  const router = useRouter();
  const [filters, setFilters] = useState<SntAdminFilters>(initial);

  function push(next: SntAdminFilters) {
    setFilters(next);
    router.push(`${BASE_PATH}${sntAdminFilterQueryString(next)}`);
  }

  function handleSearchSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    push({ ...filters, q: filters.q.trim() });
  }

  const hasActiveFilter = Object.values(filters).some(Boolean);

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 24, alignItems: "center" }}>
      <form onSubmit={handleSearchSubmit} style={{ display: "flex", gap: 8, flex: "1 1 240px", minWidth: 200 }}>
        <input
          type="search"
          value={filters.q}
          onChange={(event) => setFilters({ ...filters, q: event.target.value })}
          placeholder="Search name, phone or hall ticket no."
          style={{ ...inputStyle, flex: 1, minWidth: 0 }}
          aria-label="Search SNT registrations"
        />
        <button
          type="submit"
          style={{
            padding: "9px 16px",
            borderRadius: 3,
            border: "1px solid rgba(200,185,155,0.22)",
            background: "transparent",
            color: "rgba(248,243,232,0.75)",
            fontFamily: SANS,
            fontSize: 12.5,
            fontWeight: 500,
            cursor: "pointer",
            whiteSpace: "nowrap",
          }}
        >
          Search
        </button>
      </form>

      {SELECTS.map((select) => (
        <div key={select.key} style={{ position: "relative" }}>
          <select
            value={filters[select.key]}
            onChange={(event) => push({ ...filters, [select.key]: event.target.value })}
            style={selectStyle}
            aria-label={select.label}
          >
            <option value="" style={optionStyle}>
              {select.allLabel}
            </option>
            {select.options.map((option) => (
              <option key={option} value={option} style={optionStyle}>
                {option}
              </option>
            ))}
          </select>
          <SelectChevron />
        </div>
      ))}

      {hasActiveFilter && (
        <button
          type="button"
          onClick={() => push({ q: "", status: "", education: "", medium: "" })}
          style={{ background: "none", border: "none", color: "rgba(248,243,232,0.55)", fontFamily: SANS, fontSize: 12.5, cursor: "pointer", textDecoration: "underline" }}
        >
          Clear filters
        </button>
      )}
    </div>
  );
}
