"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { PROGRAMS } from "@/lib/validation/enquiry";
import { ENQUIRY_STATUSES } from "@/lib/validation/enquiryAdmin";
import { IVORY_100, SANS } from "@/components/admin/tokens";

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

export default function EnquiryFilters({
  initialQuery,
  initialStatus,
  initialProgram,
}: {
  initialQuery: string;
  initialStatus: string;
  initialProgram: string;
}) {
  const router = useRouter();
  const [query, setQuery] = useState(initialQuery);
  const [status, setStatus] = useState(initialStatus);
  const [program, setProgram] = useState(initialProgram);

  function pushParams(next: { q?: string; status?: string; program?: string }) {
    const merged = {
      q: next.q ?? query,
      status: next.status ?? status,
      program: next.program ?? program,
    };
    const params = new URLSearchParams();
    if (merged.q) params.set("q", merged.q);
    if (merged.status) params.set("status", merged.status);
    if (merged.program) params.set("program", merged.program);
    router.push(`/admin/dashboard/enquiries${params.toString() ? `?${params.toString()}` : ""}`);
  }

  function handleSearchSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    pushParams({ q: query.trim() });
  }

  function handleStatusChange(value: string) {
    setStatus(value);
    pushParams({ status: value });
  }

  function handleProgramChange(value: string) {
    setProgram(value);
    pushParams({ program: value });
  }

  function handleClear() {
    setQuery("");
    setStatus("");
    setProgram("");
    router.push("/admin/dashboard/enquiries");
  }

  return (
    <div
      className="enquiry-filters"
      style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 24, alignItems: "center" }}
    >
      <form onSubmit={handleSearchSubmit} style={{ display: "flex", gap: 8, flex: "1 1 260px", minWidth: 220 }}>
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search name, phone, or reference no."
          style={{ ...inputStyle, flex: 1, minWidth: 0 }}
          aria-label="Search enquiries"
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

      <div style={{ position: "relative" }}>
        <select
          value={status}
          onChange={(event) => handleStatusChange(event.target.value)}
          style={selectStyle}
          aria-label="Filter by status"
        >
          <option value="" style={optionStyle}>
            All statuses
          </option>
          {ENQUIRY_STATUSES.map((statusOption) => (
            <option key={statusOption} value={statusOption} style={optionStyle}>
              {statusOption}
            </option>
          ))}
        </select>
        <SelectChevron />
      </div>

      <div style={{ position: "relative" }}>
        <select
          value={program}
          onChange={(event) => handleProgramChange(event.target.value)}
          style={selectStyle}
          aria-label="Filter by program"
        >
          <option value="" style={optionStyle}>
            All programs
          </option>
          {PROGRAMS.map((programOption) => (
            <option key={programOption} value={programOption} style={optionStyle}>
              {programOption}
            </option>
          ))}
        </select>
        <SelectChevron />
      </div>

      {(query || status || program) && (
        <button
          type="button"
          onClick={handleClear}
          style={{
            padding: "9px 12px",
            border: "none",
            background: "transparent",
            color: "rgba(248,243,232,0.45)",
            fontFamily: SANS,
            fontSize: 12.5,
            cursor: "pointer",
            textDecoration: "underline",
          }}
        >
          Clear
        </button>
      )}

      <style>{`
        @media (max-width: 480px) {
          .enquiry-filters { flex-direction: column; align-items: stretch; }
        }
      `}</style>
    </div>
  );
}
