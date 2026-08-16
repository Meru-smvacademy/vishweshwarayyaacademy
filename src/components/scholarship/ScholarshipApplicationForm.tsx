"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import {
  EDUCATION_COMPLETED_OPTIONS,
  SCHOLARSHIP_PATHWAYS,
  validateScholarshipApplication,
  type ScholarshipApplicationFieldErrors,
  type ScholarshipApplicationValues,
} from "@/lib/validation/scholarshipApplication";

const NAVY = "#0F1E3C";
const GOLD = "#C4922A";
const MUTED = "#6B7A90";
const MUTED_LABEL = "#8A95A5";
const RULE = "#DDD6CC";
const CARD_BORDER = "#E2DAD0";
const STRIP_BG = "#FDFAF6";
const DISABLED_BG = "#C5BDB0";
const ERROR = "#C0392B";
const CREAM = "#F9F6F0";

const DISPLAY = "var(--font-playfair-display), Georgia, serif";
const SANS = "var(--font-outfit), system-ui, sans-serif";

const initialValues: ScholarshipApplicationValues = {
  studentName: "",
  applyingFor: "",
  educationCompleted: "",
  schoolCollegeName: "",
  nativePlace: "",
  phone: "",
  companyWebsite: "",
};

type SubmitState = "idle" | "submitting" | "success" | "error";

function ChevronIcon() {
  return (
    <span
      className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2"
      style={{ color: "#A8B0BC" }}
    >
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path d="M3 5l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

function Field({
  label,
  htmlFor,
  isFocused,
  error,
  children,
}: {
  label: string;
  htmlFor: string;
  isFocused: boolean;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={htmlFor}
        className="text-xs font-medium uppercase tracking-widest transition-colors duration-150"
        style={{ fontFamily: SANS, color: isFocused ? GOLD : MUTED_LABEL, letterSpacing: "0.1em" }}
      >
        {label}
      </label>
      <div
        className="relative flex items-center pb-2.5 transition-colors duration-150"
        style={{ borderBottom: `1.5px solid ${error ? ERROR : isFocused ? GOLD : RULE}` }}
      >
        {children}
      </div>
      {error && <p style={{ fontFamily: SANS, fontSize: "12px", color: ERROR, margin: 0 }}>{error}</p>}
    </div>
  );
}

export default function ScholarshipApplicationForm() {
  const [values, setValues] = useState<ScholarshipApplicationValues>(initialValues);
  const [errors, setErrors] = useState<ScholarshipApplicationFieldErrors>({});
  const [status, setStatus] = useState<SubmitState>("idle");
  const [focused, setFocused] = useState<string | null>(null);

  function updateField<K extends keyof ScholarshipApplicationValues>(
    field: K,
    value: ScholarshipApplicationValues[K]
  ) {
    setValues((prev) => ({ ...prev, [field]: value }));
  }

  const isComplete = Boolean(
    values.studentName.trim() &&
      values.applyingFor &&
      values.educationCompleted &&
      values.schoolCollegeName.trim() &&
      values.nativePlace.trim() &&
      values.phone.trim()
  );

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const fieldErrors = validateScholarshipApplication(values);
    setErrors(fieldErrors);

    if (Object.keys(fieldErrors).length > 0) {
      return;
    }

    setStatus("submitting");

    try {
      const response = await fetch("/api/scholarship-application", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error("Submission failed");
      }

      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  function resetForm() {
    setValues(initialValues);
    setErrors({});
    setStatus("idle");
  }

  if (status === "success") {
    return (
      <div style={{ fontFamily: SANS, backgroundColor: CREAM }} className="flex min-h-screen items-center justify-center px-4">
        <div className="mx-auto max-w-md text-center">
          <div
            className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full"
            style={{ backgroundColor: GOLD }}
          >
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <path d="M5 14l7 7L23 8" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h2 style={{ fontFamily: DISPLAY, color: NAVY }} className="mb-3 text-3xl font-semibold">
            Application Received
          </h2>
          <p style={{ color: MUTED }} className="mb-8 text-base leading-relaxed">
            Thank you, {values.studentName.split(" ")[0]}. We&apos;ve received your scholarship
            enquiry and will be in touch shortly.
          </p>
          <button
            type="button"
            onClick={resetForm}
            style={{ color: GOLD, borderColor: GOLD }}
            className="rounded-full border px-6 py-2 text-sm font-medium transition-all hover:opacity-70"
          >
            Submit another application
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ fontFamily: SANS, backgroundColor: CREAM }} className="min-h-screen">
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="mb-12 sm:mb-14">
          <div style={{ backgroundColor: GOLD }} className="mb-5 h-0.5 w-10" />
          <h1
            style={{ fontFamily: DISPLAY, color: NAVY, lineHeight: 1.15 }}
            className="mb-4 text-4xl font-semibold sm:text-5xl"
          >
            Apply for SNT
            <br className="hidden sm:block" /> Scholarship
          </h1>
          <p style={{ color: "#6B7A90" }} className="text-base font-light sm:text-lg">
            Take the first step towards your academic journey.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          noValidate
          className="overflow-hidden rounded-2xl shadow-sm sm:rounded-3xl"
          style={{ backgroundColor: "#FFFFFF", border: `1px solid ${CARD_BORDER}` }}
        >
          <div className="grid grid-cols-1 gap-x-8 gap-y-7 px-6 py-8 sm:grid-cols-2 sm:px-10 sm:py-10">
            <div className="sm:col-span-2">
              <Field label="Student Name" htmlFor="studentName" isFocused={focused === "studentName"} error={errors.studentName}>
                <input
                  id="studentName"
                  type="text"
                  placeholder="Full name as per records"
                  value={values.studentName}
                  onChange={(e) => updateField("studentName", e.target.value)}
                  onFocus={() => setFocused("studentName")}
                  onBlur={() => setFocused(null)}
                  className="w-full bg-transparent text-base font-light placeholder:opacity-40"
                  style={{ fontFamily: SANS, color: NAVY }}
                  autoComplete="name"
                  aria-invalid={Boolean(errors.studentName)}
                />
              </Field>
            </div>

            <div>
              <Field label="Applying For" htmlFor="applyingFor" isFocused={focused === "applyingFor"} error={errors.applyingFor}>
                <select
                  id="applyingFor"
                  value={values.applyingFor}
                  onChange={(e) => updateField("applyingFor", e.target.value)}
                  onFocus={() => setFocused("applyingFor")}
                  onBlur={() => setFocused(null)}
                  className="w-full cursor-pointer appearance-none bg-transparent text-base font-light"
                  style={{ fontFamily: SANS, color: values.applyingFor ? NAVY : `${NAVY}66` }}
                  aria-invalid={Boolean(errors.applyingFor)}
                >
                  <option value="" disabled hidden>
                    Select scholarship
                  </option>
                  {SCHOLARSHIP_PATHWAYS.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                <ChevronIcon />
              </Field>
            </div>

            <div>
              <Field label="Education Completed" htmlFor="educationCompleted" isFocused={focused === "educationCompleted"} error={errors.educationCompleted}>
                <select
                  id="educationCompleted"
                  value={values.educationCompleted}
                  onChange={(e) => updateField("educationCompleted", e.target.value)}
                  onFocus={() => setFocused("educationCompleted")}
                  onBlur={() => setFocused(null)}
                  className="w-full cursor-pointer appearance-none bg-transparent text-base font-light"
                  style={{ fontFamily: SANS, color: values.educationCompleted ? NAVY : `${NAVY}66` }}
                  aria-invalid={Boolean(errors.educationCompleted)}
                >
                  <option value="" disabled hidden>
                    Select class
                  </option>
                  {EDUCATION_COMPLETED_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                <ChevronIcon />
              </Field>
            </div>

            <div className="sm:col-span-2">
              <Field label="School / College Name" htmlFor="schoolCollegeName" isFocused={focused === "schoolCollegeName"} error={errors.schoolCollegeName}>
                <input
                  id="schoolCollegeName"
                  type="text"
                  placeholder="Name of your institution"
                  value={values.schoolCollegeName}
                  onChange={(e) => updateField("schoolCollegeName", e.target.value)}
                  onFocus={() => setFocused("schoolCollegeName")}
                  onBlur={() => setFocused(null)}
                  className="w-full bg-transparent text-base font-light placeholder:opacity-40"
                  style={{ fontFamily: SANS, color: NAVY }}
                  aria-invalid={Boolean(errors.schoolCollegeName)}
                />
              </Field>
            </div>

            <div>
              <Field label="Native Place" htmlFor="nativePlace" isFocused={focused === "nativePlace"} error={errors.nativePlace}>
                <input
                  id="nativePlace"
                  type="text"
                  placeholder="City or town"
                  value={values.nativePlace}
                  onChange={(e) => updateField("nativePlace", e.target.value)}
                  onFocus={() => setFocused("nativePlace")}
                  onBlur={() => setFocused(null)}
                  className="w-full bg-transparent text-base font-light placeholder:opacity-40"
                  style={{ fontFamily: SANS, color: NAVY }}
                  aria-invalid={Boolean(errors.nativePlace)}
                />
              </Field>
            </div>

            <div>
              <Field label="Phone Number" htmlFor="phone" isFocused={focused === "phone"} error={errors.phone}>
                <input
                  id="phone"
                  type="tel"
                  inputMode="tel"
                  placeholder="+91 00000 00000"
                  value={values.phone}
                  onChange={(e) => updateField("phone", e.target.value)}
                  onFocus={() => setFocused("phone")}
                  onBlur={() => setFocused(null)}
                  className="w-full bg-transparent text-base font-light placeholder:opacity-40"
                  style={{ fontFamily: SANS, color: NAVY }}
                  autoComplete="tel"
                  aria-invalid={Boolean(errors.phone)}
                />
              </Field>
            </div>

            <div aria-hidden="true" className="absolute left-[-9999px] h-px w-px overflow-hidden">
              <label htmlFor="companyWebsite">Leave this field empty</label>
              <input
                id="companyWebsite"
                name="companyWebsite"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={values.companyWebsite}
                onChange={(e) => updateField("companyWebsite", e.target.value)}
              />
            </div>
          </div>

          <div
            className="flex flex-col items-start justify-between gap-4 px-6 py-6 sm:flex-row sm:items-center sm:px-10 sm:py-8"
            style={{ borderTop: `1px solid ${CARD_BORDER}`, backgroundColor: STRIP_BG }}
          >
            <div className="max-w-xs">
              <p style={{ fontFamily: SANS, color: "#9AA3B0" }} className="text-xs font-light leading-snug">
                This is a quick first enquiry. Our team will revert back to you shortly.
              </p>
              {status === "error" && (
                <p role="alert" style={{ fontFamily: SANS, fontSize: "12px", color: ERROR, marginTop: "8px" }}>
                  Something went wrong while submitting. Please try again, or call us directly.
                </p>
              )}
            </div>
            <button
              type="submit"
              disabled={!isComplete || status === "submitting"}
              className="flex flex-shrink-0 items-center gap-3 rounded-full px-7 py-3.5 text-sm font-medium transition-all duration-200 hover:!bg-[#1A3260]"
              style={{
                fontFamily: SANS,
                backgroundColor: isComplete ? NAVY : DISABLED_BG,
                color: "#FFFFFF",
                cursor: isComplete && status !== "submitting" ? "pointer" : "not-allowed",
                letterSpacing: "0.03em",
              }}
            >
              {status === "submitting" ? "Sending…" : "Apply for Scholarship"}
              {status !== "submitting" && (
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
