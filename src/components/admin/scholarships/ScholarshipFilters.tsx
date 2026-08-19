"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { SCHOLARSHIP_PATHWAYS, EDUCATION_COMPLETED_OPTIONS, ACADEMIC_YEARS } from "@/lib/validation/scholarshipApplication";
import { SCHOLARSHIP_STATUSES } from "@/lib/validation/scholarshipAdmin";
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

export default function ScholarshipFilters({
  initialQuery,
  initialStatus,
  initialAcademicYear,
  initialApplyingFor,
  initialEducationCompleted,
}: {
  initialQuery: string;
  initialStatus: string;
  initialAcademicYear: string;
  initialApplyingFor: string;
  initialEducationCompleted: string;
}) {
  const router = useRouter();
  const [query, setQuery] = useState(initialQuery);
  const [status, setStatus] = useState(initialStatus);
  const [academicYear, setAcademicYear] = useState(initialAcademicYear);
  const [applyingFor, setApplyingFor] = useState(initialApplyingFor);
  const [educationCompleted, setEducationCompleted] = useState(initialEducationCompleted);

  function pushParams(next: {
    q?: string;
    status?: string;
    academicYear?: string;
    applyingFor?: string;
    educationCompleted?: string;
  }) {
    const merged = {
      q: next.q ?? query,
      status: next.status ?? status,
      academicYear: next.academicYear ?? academicYear,
      applyingFor: next.applyingFor ?? applyingFor,
      educationCompleted: next.educationCompleted ?? educationCompleted,
    };
    const params = new URLSearchParams();
    if (merged.q) params.set("q", merged.q);
    if (merged.status) params.set("status", merged.status);
    if (merged.academicYear) params.set("academicYear", merged.academicYear);
    if (merged.applyingFor) params.set("applyingFor", merged.applyingFor);
    if (merged.educationCompleted) params.set("educationCompleted", merged.educationCompleted);
    router.push(`/admin/dashboard/scholarships${params.toString() ? `?${params.toString()}` : ""}`);
  }

  function handleSearchSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    pushParams({ q: query.trim() });
  }

  function handleClear() {
    setQuery("");
    setStatus("");
    setAcademicYear("");
    setApplyingFor("");
    setEducationCompleted("");
    router.push("/admin/dashboard/scholarships");
  }

  const hasActiveFilter = query || status || academicYear || applyingFor || educationCompleted;

  return (
    <div className="scholarship-filters" style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 24, alignItems: "center" }}>
      <form onSubmit={handleSearchSubmit} style={{ display: "flex", gap: 8, flex: "1 1 240px", minWidth: 200 }}>
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search name, phone, reference, school, or place"
          style={{ ...inputStyle, flex: 1, minWidth: 0 }}
          aria-label="Search scholarship applications"
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
          value={academicYear}
          onChange={(event) => {
            setAcademicYear(event.target.value);
            pushParams({ academicYear: event.target.value });
          }}
          style={selectStyle}
          aria-label="Filter by academic year"
        >
          <option value="" style={optionStyle}>
            All academic years
          </option>
          {ACADEMIC_YEARS.map((year) => (
            <option key={year} value={year} style={optionStyle}>
              {year}
            </option>
          ))}
        </select>
        <SelectChevron />
      </div>

      <div style={{ position: "relative" }}>
        <select
          value={applyingFor}
          onChange={(event) => {
            setApplyingFor(event.target.value);
            pushParams({ applyingFor: event.target.value });
          }}
          style={selectStyle}
          aria-label="Filter by scholarship pathway"
        >
          <option value="" style={optionStyle}>
            All pathways
          </option>
          {SCHOLARSHIP_PATHWAYS.map((pathway) => (
            <option key={pathway} value={pathway} style={optionStyle}>
              {pathway}
            </option>
          ))}
        </select>
        <SelectChevron />
      </div>

      <div style={{ position: "relative" }}>
        <select
          value={educationCompleted}
          onChange={(event) => {
            setEducationCompleted(event.target.value);
            pushParams({ educationCompleted: event.target.value });
          }}
          style={selectStyle}
          aria-label="Filter by education completed"
        >
          <option value="" style={optionStyle}>
            All classes
          </option>
          {EDUCATION_COMPLETED_OPTIONS.map((option) => (
            <option key={option} value={option} style={optionStyle}>
              {option}
            </option>
          ))}
        </select>
        <SelectChevron />
      </div>

      <div style={{ position: "relative" }}>
        <select
          value={status}
          onChange={(event) => {
            setStatus(event.target.value);
            pushParams({ status: event.target.value });
          }}
          style={selectStyle}
          aria-label="Filter by status"
        >
          <option value="" style={optionStyle}>
            All statuses
          </option>
          {SCHOLARSHIP_STATUSES.map((statusOption) => (
            <option key={statusOption} value={statusOption} style={optionStyle}>
              {statusOption}
            </option>
          ))}
        </select>
        <SelectChevron />
      </div>

      {hasActiveFilter && (
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
          .scholarship-filters { flex-direction: column; align-items: stretch; }
        }
      `}</style>
    </div>
  );
}
