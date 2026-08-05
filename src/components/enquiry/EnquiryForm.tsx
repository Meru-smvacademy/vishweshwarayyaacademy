"use client";

import { useState, type FormEvent } from "react";
import Button from "@/components/ui/Button";
import {
  validateEnquiry,
  type EnquiryFieldErrors,
  type EnquiryFormValues,
} from "@/lib/validation/enquiry";

const TARGET_EXAMS = ["NEET", "JEE", "KCET", "Foundation"];
const CLASS_OPTIONS = [
  "Class 8",
  "Class 9",
  "Class 10",
  "Class 11",
  "Class 12",
  "Repeater / Dropper",
];

const initialValues: EnquiryFormValues = {
  name: "",
  phone: "",
  studentClass: "",
  targetExam: "",
  city: "",
  message: "",
  consent: false,
  companyWebsite: "",
};

type SubmitState = "idle" | "submitting" | "success" | "error";

const fieldClasses =
  "w-full rounded-md border border-line bg-surface px-4 py-2.5 text-base text-ink focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20";

export default function EnquiryForm() {
  const [values, setValues] = useState<EnquiryFormValues>(initialValues);
  const [errors, setErrors] = useState<EnquiryFieldErrors>({});
  const [status, setStatus] = useState<SubmitState>("idle");
  const [referenceNo, setReferenceNo] = useState<string | null>(null);

  function updateField<K extends keyof EnquiryFormValues>(
    field: K,
    value: EnquiryFormValues[K]
  ) {
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

  if (status === "success") {
    return (
      <div className="rounded-lg border border-line bg-surface-muted p-6 text-center">
        <p className="text-lg font-semibold text-primary">Thank you, {values.name}.</p>
        <p className="mt-2 text-sm text-ink">
          Your enquiry has been received. Reference number:{" "}
          <span className="font-mono font-semibold text-primary">{referenceNo}</span>
        </p>
        <p className="mt-2 text-sm text-muted">
          Our admissions team will contact you shortly on {values.phone}.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      <div>
        <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-ink">
          Student&apos;s Full Name
        </label>
        <input
          id="name"
          type="text"
          autoComplete="name"
          value={values.name}
          onChange={(e) => updateField("name", e.target.value)}
          className={fieldClasses}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "name-error" : undefined}
        />
        {errors.name && (
          <p id="name-error" className="mt-1 text-sm text-danger">
            {errors.name}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-ink">
          Phone Number
        </label>
        <input
          id="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          value={values.phone}
          onChange={(e) => updateField("phone", e.target.value)}
          className={fieldClasses}
          aria-invalid={Boolean(errors.phone)}
          aria-describedby={errors.phone ? "phone-error" : undefined}
        />
        {errors.phone && (
          <p id="phone-error" className="mt-1 text-sm text-danger">
            {errors.phone}
          </p>
        )}
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="studentClass" className="mb-1.5 block text-sm font-medium text-ink">
            Current Class
          </label>
          <select
            id="studentClass"
            value={values.studentClass}
            onChange={(e) => updateField("studentClass", e.target.value)}
            className={fieldClasses}
            aria-invalid={Boolean(errors.studentClass)}
            aria-describedby={errors.studentClass ? "class-error" : undefined}
          >
            <option value="">Select class</option>
            {CLASS_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          {errors.studentClass && (
            <p id="class-error" className="mt-1 text-sm text-danger">
              {errors.studentClass}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="targetExam" className="mb-1.5 block text-sm font-medium text-ink">
            Target Exam
          </label>
          <select
            id="targetExam"
            value={values.targetExam}
            onChange={(e) => updateField("targetExam", e.target.value)}
            className={fieldClasses}
            aria-invalid={Boolean(errors.targetExam)}
            aria-describedby={errors.targetExam ? "exam-error" : undefined}
          >
            <option value="">Select exam</option>
            {TARGET_EXAMS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          {errors.targetExam && (
            <p id="exam-error" className="mt-1 text-sm text-danger">
              {errors.targetExam}
            </p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="city" className="mb-1.5 block text-sm font-medium text-ink">
          City
        </label>
        <input
          id="city"
          type="text"
          autoComplete="address-level2"
          value={values.city}
          onChange={(e) => updateField("city", e.target.value)}
          className={fieldClasses}
          aria-invalid={Boolean(errors.city)}
          aria-describedby={errors.city ? "city-error" : undefined}
        />
        {errors.city && (
          <p id="city-error" className="mt-1 text-sm text-danger">
            {errors.city}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-ink">
          Message <span className="text-muted">(optional)</span>
        </label>
        <textarea
          id="message"
          rows={3}
          value={values.message}
          onChange={(e) => updateField("message", e.target.value)}
          className={fieldClasses}
        />
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

      <div>
        <label className="flex items-start gap-3 text-sm text-ink">
          <input
            type="checkbox"
            checked={values.consent}
            onChange={(e) => updateField("consent", e.target.checked)}
            className="mt-0.5 h-5 w-5 shrink-0 rounded border-line text-primary focus:ring-primary/30"
            aria-invalid={Boolean(errors.consent)}
            aria-describedby={errors.consent ? "consent-error" : undefined}
          />
          <span>
            I agree to be contacted by Visveshwarayya NEET | JEE Academy regarding admissions, in
            line with the{" "}
            <a href="/legal/privacy" className="underline hover:text-primary">
              Privacy Policy
            </a>
            .
          </span>
        </label>
        {errors.consent && (
          <p id="consent-error" className="mt-1 text-sm text-danger">
            {errors.consent}
          </p>
        )}
      </div>

      {status === "error" && (
        <p role="alert" className="text-sm text-danger">
          Something went wrong while submitting. Please try again, or call us directly.
        </p>
      )}

      <Button
        type="submit"
        variant="primary"
        disabled={status === "submitting"}
        className="w-full sm:w-auto"
      >
        {status === "submitting" ? "Submitting…" : "Submit Admission Enquiry"}
      </Button>
    </form>
  );
}
