"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import {
  PROGRAMS,
  validateEnquiry,
  type EnquiryFieldErrors,
  type EnquiryFormValues,
} from "@/lib/validation/enquiry";

const CLASSES = ["Class 8", "Class 9", "Class 10", "Class 11", "Class 12", "Appeared / Repeater"];

const NAVY = "#0f1f3d";
const GOLD = "#c9993f";
const BORDER = "#e2e0da";
const MUTED = "#6b6860";
const PLACEHOLDER = "#b0ada5";

const LORA = "var(--font-lora), serif";
const INSTRUMENT_SANS = "var(--font-instrument-sans), sans-serif";

const initialValues: EnquiryFormValues = {
  studentName: "",
  parentName: "",
  phone: "",
  qualification: "",
  program: "",
  message: "",
  companyWebsite: "",
};

type SubmitState = "idle" | "submitting" | "success" | "error";

const inputClasses =
  "block w-full appearance-auto rounded-[6px] border-[1.5px] bg-[#fafaf8] px-[14px] py-[11px] text-[14px] transition-colors duration-150 ease-out focus:border-[#0f1f3d] focus:bg-white";

function Field({
  label,
  htmlFor,
  required,
  optional,
  error,
  children,
}: {
  label: string;
  htmlFor: string;
  required?: boolean;
  optional?: boolean;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div className="group block">
      <label htmlFor={htmlFor} className="mb-[7px] flex items-baseline justify-between">
        <span
          className="transition-colors duration-150 ease-out group-focus-within:!text-[#0f1f3d]"
          style={{ fontFamily: INSTRUMENT_SANS, fontSize: "13px", fontWeight: 500, color: "#3d3a34" }}
        >
          {label}
          {required && <span style={{ color: GOLD, marginLeft: 3 }}>*</span>}
        </span>
        {optional && (
          <span style={{ fontFamily: INSTRUMENT_SANS, fontSize: "11px", color: PLACEHOLDER }}>Optional</span>
        )}
      </label>
      {children}
      {error && (
        <p id={`${htmlFor}-error`} className="mt-1.5 text-sm" style={{ fontFamily: INSTRUMENT_SANS, color: "#c0392b" }}>
          {error}
        </p>
      )}
    </div>
  );
}

export default function EnquiryForm() {
  const [values, setValues] = useState<EnquiryFormValues>(initialValues);
  const [errors, setErrors] = useState<EnquiryFieldErrors>({});
  const [status, setStatus] = useState<SubmitState>("idle");
  const [referenceNo, setReferenceNo] = useState<string | null>(null);

  function updateField<K extends keyof EnquiryFormValues>(field: K, value: EnquiryFormValues[K]) {
    setValues((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const fieldErrors = validateEnquiry(values);
    setErrors(fieldErrors);

    if (Object.keys(fieldErrors).length > 0) {
      return;
    }

    setStatus("submitting");

    try {
      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error("Submission failed");
      }

      const data = await response.json();
      setReferenceNo(data.referenceNo);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  function resetForm() {
    setValues(initialValues);
    setErrors({});
    setReferenceNo(null);
    setStatus("idle");
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center py-10 text-center">
        <div className="mb-7 flex h-14 w-14 items-center justify-center rounded-full" style={{ background: NAVY }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M5 12.5l5 5 9-9" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <p style={{ fontFamily: LORA, fontSize: "clamp(24px, 3.5vw, 30px)", fontWeight: 400, color: NAVY, margin: "0 0 12px", lineHeight: 1.2 }}>
          Enquiry Received
        </p>
        <p style={{ fontFamily: INSTRUMENT_SANS, fontSize: "15px", color: MUTED, lineHeight: 1.7, margin: "0 0 8px", maxWidth: "360px" }}>
          Thank you, {values.studentName}. Our admissions team will be in touch with you shortly on {values.phone}.
        </p>
        {referenceNo && (
          <p style={{ fontFamily: INSTRUMENT_SANS, fontSize: "13px", color: MUTED, margin: "0 0 28px" }}>
            Reference number: <span style={{ fontWeight: 600, color: NAVY }}>{referenceNo}</span>
          </p>
        )}
        <button
          type="button"
          onClick={resetForm}
          className="uppercase"
          style={{
            fontFamily: INSTRUMENT_SANS,
            fontSize: "13px",
            fontWeight: 600,
            letterSpacing: "0.08em",
            color: GOLD,
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 0,
            marginTop: referenceNo ? 0 : "20px",
          }}
        >
          Submit another enquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="flex flex-col gap-[18px]">
        <Field label="Student Name" htmlFor="studentName" required error={errors.studentName}>
          <input
            id="studentName"
            type="text"
            autoComplete="name"
            placeholder="Full name of the student"
            value={values.studentName}
            onChange={(e) => updateField("studentName", e.target.value)}
            className={inputClasses}
            style={{ borderColor: BORDER }}
            aria-invalid={Boolean(errors.studentName)}
            aria-describedby={errors.studentName ? "studentName-error" : undefined}
          />
        </Field>

        <Field label="Parent / Guardian Name" htmlFor="parentName" required error={errors.parentName}>
          <input
            id="parentName"
            type="text"
            autoComplete="off"
            placeholder="Full name of parent or guardian"
            value={values.parentName}
            onChange={(e) => updateField("parentName", e.target.value)}
            className={inputClasses}
            style={{ borderColor: BORDER }}
            aria-invalid={Boolean(errors.parentName)}
            aria-describedby={errors.parentName ? "parentName-error" : undefined}
          />
        </Field>

        <Field label="Phone Number" htmlFor="phone" required error={errors.phone}>
          <input
            id="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="10-digit mobile number"
            value={values.phone}
            onChange={(e) => updateField("phone", e.target.value)}
            className={inputClasses}
            style={{ borderColor: BORDER }}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? "phone-error" : undefined}
          />
        </Field>

        <div className="grid grid-cols-1 gap-3 min-[481px]:grid-cols-2">
          <Field label="Current Class" htmlFor="qualification" required error={errors.qualification}>
            <select
              id="qualification"
              value={values.qualification}
              onChange={(e) => updateField("qualification", e.target.value)}
              className={inputClasses}
              style={{ borderColor: BORDER, color: values.qualification ? NAVY : PLACEHOLDER }}
              aria-invalid={Boolean(errors.qualification)}
              aria-describedby={errors.qualification ? "qualification-error" : undefined}
            >
              <option value="" disabled>
                Select class
              </option>
              {CLASSES.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </Field>

          <Field label="Interested Program" htmlFor="program" required error={errors.program}>
            <select
              id="program"
              value={values.program}
              onChange={(e) => updateField("program", e.target.value)}
              className={inputClasses}
              style={{ borderColor: BORDER, color: values.program ? NAVY : PLACEHOLDER }}
              aria-invalid={Boolean(errors.program)}
              aria-describedby={errors.program ? "program-error" : undefined}
            >
              <option value="" disabled>
                Select program
              </option>
              {PROGRAMS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </Field>
        </div>

        <Field label="Message / Question" htmlFor="message" optional>
          <textarea
            id="message"
            rows={3}
            placeholder="Any specific questions or context you'd like to share…"
            value={values.message}
            onChange={(e) => updateField("message", e.target.value)}
            className={inputClasses}
            style={{ borderColor: BORDER, resize: "none", lineHeight: 1.6 }}
          />
        </Field>

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

        {status === "error" && (
          <p role="alert" style={{ fontFamily: INSTRUMENT_SANS, fontSize: "13px", color: "#c0392b" }}>
            Something went wrong while submitting. Please try again, or call us directly.
          </p>
        )}

        <button
          type="submit"
          disabled={status === "submitting"}
          className="mt-1.5 flex w-full items-center justify-center gap-2.5 rounded-[8px] transition-colors duration-200 ease-out hover:!bg-[#1a3160] disabled:cursor-not-allowed disabled:opacity-70"
          style={{
            padding: "15px 24px",
            background: NAVY,
            color: "#fff",
            border: "none",
            fontFamily: INSTRUMENT_SANS,
            fontSize: "14px",
            fontWeight: 600,
            letterSpacing: "0.06em",
            cursor: status === "submitting" ? "not-allowed" : "pointer",
          }}
        >
          {status === "submitting" ? "Sending…" : "Send Enquiry"}
          {status !== "submitting" && (
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </button>

        <p style={{ fontFamily: INSTRUMENT_SANS, fontSize: "12px", color: PLACEHOLDER, textAlign: "center", margin: 0, lineHeight: 1.6 }}>
          Your information is kept confidential and used only for admissions communication.
        </p>
      </div>
    </form>
  );
}
