"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, type ChangeEvent, type FormEvent, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { SNT_EXAM } from "@/content/scholarship";
import { SNT_KN, kannadaFor } from "@/content/scholarship-kn";
import SntRegistrationClosed from "@/components/scholarship/SntRegistrationClosed";
import { formatDobInWords } from "@/lib/snt/dateOfBirth";
import {
  SNT_APPLYING_FOR_OPTIONS,
  SNT_CONSENT_TEXT,
  SNT_EDUCATION_OPTIONS,
  SNT_MEDIUMS,
  SNT_PHOTO_MAX_BYTES,
  SNT_PHOTO_MAX_HEIGHT,
  SNT_PHOTO_MAX_WIDTH,
  SNT_PHOTO_MIN_SIDE,
  SNT_PHOTO_TYPES,
  SNT_RULES_PDF_PATH,
  sntClassLabel,
  sntRegistrationPath,
} from "@/lib/snt/constants";
import { ACADEMIC_YEARS, DEFAULT_ACADEMIC_YEAR } from "@/lib/validation/scholarshipApplication";
import {
  DOB_ERRORS,
  parseSntDob,
  validateSntRegistration,
  type SntRegistrationFieldErrors,
  type SntRegistrationValues,
} from "@/lib/validation/sntRegistration";

// Outdoor readability: all text is NAVY (16.5:1 on white) or, for Kannada
// second lines, --scholarship-navy-light (11.5:1). --muted (6.0:1) is used only
// for placeholders and input borders. GOLD is decoration only, never text.
const NAVY = "#0F1E3C";
const GOLD = "#C4922A";
const KN_INK = "var(--scholarship-navy-light)";
const SOFT_INK = "var(--muted)";
const CARD_BORDER = "#E2DAD0";
const STRIP_BG = "#FDFAF6";
const DISABLED_BG = "#C5BDB0";
const ERROR = "#C0392B";
const CREAM = "#F9F6F0";

const DISPLAY = "var(--font-playfair-display), Georgia, serif";
// Kannada characters fall through to Noto Sans Kannada (Outfit has none), so
// mixed text such as dropdown options renders correctly in one element.
const SANS = "var(--font-outfit), var(--font-noto-kannada), system-ui, sans-serif";
const KANNADA = "var(--font-noto-kannada), system-ui, sans-serif";

const initialValues: SntRegistrationValues = {
  studentName: "",
  // A single programme is still shown as a dropdown, already selected.
  applyingFor: SNT_APPLYING_FOR_OPTIONS.length === 1 ? SNT_APPLYING_FOR_OPTIONS[0] : "",
  educationCompleted: SNT_EDUCATION_OPTIONS.length === 1 ? SNT_EDUCATION_OPTIONS[0] : "",
  schoolCollegeName: "",
  nativePlace: "",
  phone: "",
  academicYear: DEFAULT_ACADEMIC_YEAR,
  companyWebsite: "",
  parentName: "",
  medium: "",
  whatsapp: "",
  dob: "",
  rulesAccepted: false,
  consentGiven: false,
};

type SubmitState = "idle" | "submitting" | "error" | "closed";

type PreparedPhoto = { blob: Blob; previewUrl: string };

function decodeImage(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const image = new window.Image();
    image.onload = () => {
      URL.revokeObjectURL(url);
      resolve(image);
    };
    image.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("not an image"));
    };
    image.src = url;
  });
}

// Decoding the file proves it is a real image (a renamed PDF or text file fails
// here); re-encoding through a canvas then strips metadata and caps the size.
async function preparePhoto(file: File): Promise<PreparedPhoto> {
  if (!SNT_PHOTO_TYPES.includes(file.type)) {
    throw new Error("Upload a JPG or PNG photo.");
  }
  if (file.size > SNT_PHOTO_MAX_BYTES) {
    throw new Error("The photo must be 4 MB or smaller.");
  }

  let image: HTMLImageElement;
  try {
    image = await decodeImage(file);
  } catch {
    throw new Error("This file is not a valid image. Upload a JPG or PNG photo.");
  }

  const { naturalWidth: width, naturalHeight: height } = image;
  if (width < SNT_PHOTO_MIN_SIDE || height < SNT_PHOTO_MIN_SIDE) {
    throw new Error("The photo is too small. Upload a clearer passport photo.");
  }

  const scale = Math.min(1, SNT_PHOTO_MAX_WIDTH / width, SNT_PHOTO_MAX_HEIGHT / height);
  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.floor(width * scale));
  canvas.height = Math.max(1, Math.floor(height * scale));
  const context = canvas.getContext("2d");
  if (!context) throw new Error("Could not process the photo. Try a different browser.");
  context.fillStyle = "#FFFFFF";
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.drawImage(image, 0, 0, canvas.width, canvas.height);

  const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/jpeg", 0.88));
  if (!blob) throw new Error("Could not process the photo. Try a different browser.");
  return { blob, previewUrl: URL.createObjectURL(blob) };
}

function ChevronIcon() {
  return (
    <span
      className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2"
      style={{ color: SOFT_INK }}
    >
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path d="M3 5l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

/** The Kannada line under an English label or sentence: smaller and muted. */
function Kn({ children, className = "", color = KN_INK }: { children: ReactNode; className?: string; color?: string }) {
  return (
    <span
      lang="kn"
      className={`block text-[12.5px] font-normal leading-snug ${className}`}
      // Letter-spacing and uppercase from the English label would break Kannada letter joining.
      style={{ fontFamily: KANNADA, color, letterSpacing: "normal", textTransform: "none" }}
    >
      {children}
    </span>
  );
}

function ErrorText({ message, indent = false, role }: { message: string; indent?: boolean; role?: "alert" }) {
  const kannada = kannadaFor(SNT_KN.errors, message);
  return (
    <div role={role} style={{ fontFamily: SANS, fontSize: "12px", color: ERROR, margin: indent ? "4px 0 0 32px" : 0 }}>
      <p style={{ margin: 0 }}>{message}</p>
      {kannada && <Kn color={ERROR}>{kannada}</Kn>}
    </div>
  );
}

/** "English / ಕನ್ನಡ" for a dropdown option (a native option cannot hold two lines). */
function optionLabel(english: string, kannada = kannadaFor(SNT_KN.options, english)): string {
  return kannada ? `${english} / ${kannada}` : english;
}

function Field({
  label,
  labelKn,
  htmlFor,
  isFocused,
  error,
  hint,
  children,
}: {
  label: string;
  labelKn: string;
  htmlFor: string;
  isFocused: boolean;
  error?: string;
  hint?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="flex min-w-0 flex-col gap-1.5">
      <label
        htmlFor={htmlFor}
        className="text-xs font-medium uppercase tracking-widest transition-colors duration-150"
        style={{ fontFamily: SANS, color: NAVY, letterSpacing: "0.1em" }}
      >
        {label}
        <Kn className="mt-0.5">{labelKn}</Kn>
      </label>
      <div
        className="relative flex items-center pb-0.5 transition-colors duration-150 [&>input]:min-h-[44px] [&>select]:min-h-[44px]"
        style={{ borderBottom: `2px solid ${error ? ERROR : isFocused ? NAVY : SOFT_INK}` }}
      >
        {children}
      </div>
      {hint}
      {error && <ErrorText message={error} />}
    </div>
  );
}

export default function ScholarshipApplicationForm() {
  const router = useRouter();
  const [values, setValues] = useState<SntRegistrationValues>(initialValues);
  const [errors, setErrors] = useState<SntRegistrationFieldErrors>({});
  const [status, setStatus] = useState<SubmitState>("idle");
  const [focused, setFocused] = useState<string | null>(null);
  const [photo, setPhoto] = useState<PreparedPhoto | null>(null);
  const [isPreparingPhoto, setIsPreparingPhoto] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      if (photo) URL.revokeObjectURL(photo.previewUrl);
    };
  }, [photo]);

  function updateField<K extends keyof SntRegistrationValues>(field: K, value: SntRegistrationValues[K]) {
    setValues((prev) => ({ ...prev, [field]: value }));
  }

  async function handlePhotoChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;

    setIsPreparingPhoto(true);
    try {
      setPhoto(await preparePhoto(file));
      setErrors((prev) => ({ ...prev, photo: undefined }));
    } catch (error) {
      setPhoto(null);
      setErrors((prev) => ({ ...prev, photo: (error as Error).message }));
    } finally {
      setIsPreparingPhoto(false);
    }
  }

  const parsedDob = parseSntDob(values.dob);

  function handleDobBlur() {
    setFocused(null);
    // Explain a wrong date as soon as the student leaves the field, not only on submit.
    if (values.dob.trim() && !parsedDob.ok) {
      setErrors((prev) => ({ ...prev, dob: DOB_ERRORS[parsedDob.reason] }));
    }
  }

  const isComplete = Boolean(
    values.studentName.trim() &&
      values.applyingFor &&
      values.educationCompleted &&
      values.schoolCollegeName.trim() &&
      values.nativePlace.trim() &&
      values.phone.trim() &&
      values.academicYear &&
      values.parentName.trim() &&
      values.medium &&
      values.dob &&
      values.rulesAccepted &&
      values.consentGiven &&
      photo
  );

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const fieldErrors = validateSntRegistration(values);
    if (!photo) {
      fieldErrors.photo = "Upload the student's passport photo.";
    }
    setErrors(fieldErrors);

    if (Object.keys(fieldErrors).length > 0 || !photo) {
      return;
    }

    setStatus("submitting");
    setSubmitError(null);

    const body = new FormData();
    for (const [key, value] of Object.entries(values)) {
      body.append(key, String(value));
    }
    body.append("photo", photo.blob, "photo.jpg");

    try {
      const response = await fetch("/api/scholarship/register", { method: "POST", body });
      const data = await response.json().catch(() => ({}));

      if (response.status === 403 && data.closed) {
        setStatus("closed");
        return;
      }
      if (response.status === 422 && data.errors) {
        setErrors(data.errors);
        setStatus("idle");
        return;
      }
      if (!response.ok || typeof data.id !== "string") {
        throw new Error(data.error ?? "Submission failed");
      }

      router.push(`${sntRegistrationPath(data.id)}?pay=1`);
    } catch {
      setSubmitError("Something went wrong while submitting. Please try again, or call us directly.");
      setStatus("error");
    }
  }

  if (status === "closed") {
    return <SntRegistrationClosed />;
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
          <p style={{ color: NAVY }} className="text-base font-light sm:text-lg">
            Take the first step towards your academic journey.
          </p>
          <Kn className="mt-1 text-sm">
            {SNT_KN.pageTitle} · {SNT_KN.pageSubtitle}
          </Kn>
          <div
            className="mt-6 rounded-xl px-5 py-4"
            style={{ backgroundColor: STRIP_BG, border: `1px solid ${CARD_BORDER}` }}
          >
            <p
              className="text-xs font-medium uppercase tracking-widest"
              style={{ fontFamily: SANS, color: NAVY, letterSpacing: "0.1em" }}
            >
              Exam Centre
            </p>
            <Kn>{SNT_KN.examCentre}</Kn>
            <p style={{ fontFamily: SANS, color: NAVY }} className="mt-2 text-base font-medium">
              {SNT_EXAM.centre.name}
            </p>
            <Kn>{SNT_KN.centreName}</Kn>
            <address style={{ fontFamily: SANS, color: NAVY }} className="text-sm font-light not-italic leading-relaxed">
              {SNT_EXAM.centre.addressLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </address>
            <address className="mt-1 not-italic">
              {SNT_KN.centreAddressLines.map((line) => (
                <Kn key={line}>{line}</Kn>
              ))}
            </address>
            <p
              style={{ fontFamily: SANS, color: NAVY, borderTop: `1px solid ${CARD_BORDER}` }}
              className="mt-3 pt-3 text-sm leading-relaxed"
            >
              {SNT_EXAM.registrationNotice}
              <Kn className="mt-1">{SNT_KN.registrationNotice}</Kn>
            </p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          noValidate
          className="overflow-hidden rounded-2xl shadow-sm sm:rounded-3xl"
          style={{ backgroundColor: "#FFFFFF", border: `1px solid ${CARD_BORDER}` }}
        >
          <div
            className="px-6 py-5 sm:px-10"
            style={{ backgroundColor: STRIP_BG, borderBottom: `1px solid ${CARD_BORDER}`, borderLeft: `4px solid ${GOLD}` }}
          >
            <p
              className="text-xs font-medium uppercase tracking-widest"
              style={{ fontFamily: SANS, color: NAVY, letterSpacing: "0.1em" }}
            >
              Eligibility
            </p>
            <Kn>{SNT_KN.eligibilityTitle}</Kn>
            <p style={{ fontFamily: SANS, color: NAVY }} className="mt-2 text-base font-medium leading-snug">
              {SNT_EXAM.eligibilityNotice}
            </p>
            <Kn className="mt-1 text-sm">{SNT_KN.eligibilityNotice}</Kn>
          </div>
          <div className="grid grid-cols-1 gap-x-8 gap-y-7 px-6 py-8 sm:grid-cols-2 sm:px-10 sm:py-10">
            <div className="sm:col-span-2">
              <span
                className="mb-3 block text-xs font-medium uppercase tracking-widest"
                style={{ fontFamily: SANS, color: errors.photo ? ERROR : NAVY, letterSpacing: "0.1em" }}
              >
                Student Passport Photo
                <Kn className="mt-0.5">{SNT_KN.labels.photo}</Kn>
              </span>
              <div className="flex items-center gap-5">
                <div
                  className="relative flex h-32 w-24 flex-shrink-0 items-center justify-center overflow-hidden rounded-lg"
                  style={{ border: `2px dashed ${errors.photo ? ERROR : photo ? NAVY : SOFT_INK}`, backgroundColor: STRIP_BG }}
                >
                  {photo ? (
                    <Image
                      src={photo.previewUrl}
                      alt="Preview of the uploaded student photo"
                      fill
                      unoptimized
                      sizes="96px"
                      className="object-cover"
                    />
                  ) : (
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <circle cx="12" cy="9" r="4" stroke={SOFT_INK} strokeWidth="1.3" />
                      <path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6" stroke={SOFT_INK} strokeWidth="1.3" strokeLinecap="round" />
                    </svg>
                  )}
                </div>
                <div className="flex min-w-0 flex-col items-start gap-2">
                  <label
                    htmlFor="photo"
                    className="inline-flex min-h-[44px] cursor-pointer flex-col justify-center rounded-2xl border px-5 py-1.5 text-sm font-medium transition-all hover:opacity-70"
                    style={{ fontFamily: SANS, color: NAVY, borderColor: NAVY }}
                  >
                    {isPreparingPhoto ? "Processing…" : photo ? "Change photo" : "Upload photo"}
                    <Kn>
                      {isPreparingPhoto ? SNT_KN.processingPhoto : photo ? SNT_KN.changePhoto : SNT_KN.uploadPhoto}
                    </Kn>
                  </label>
                  <input
                    id="photo"
                    type="file"
                    accept="image/jpeg,image/png"
                    onChange={handlePhotoChange}
                    className="sr-only"
                    aria-invalid={Boolean(errors.photo)}
                  />
                  <p style={{ fontFamily: SANS, color: NAVY }} className="text-xs font-light leading-snug">
                    Recent passport-size photo · JPG or PNG · max 4 MB. It will be printed on the hall ticket.
                  </p>
                  <Kn className="text-xs">{SNT_KN.photoHelp}</Kn>
                </div>
              </div>
              {errors.photo && (
                <div className="mt-2">
                  <ErrorText role="alert" message={errors.photo} />
                </div>
              )}
            </div>

            <div className="sm:col-span-2">
              <Field label="Student Name" labelKn={SNT_KN.labels.studentName} htmlFor="studentName" isFocused={focused === "studentName"} error={errors.studentName}>
                <input
                  id="studentName"
                  type="text"
                  placeholder="Full name as per records"
                  value={values.studentName}
                  onChange={(e) => updateField("studentName", e.target.value)}
                  onFocus={() => setFocused("studentName")}
                  onBlur={() => setFocused(null)}
                  className="w-full bg-transparent text-base font-light placeholder:text-muted"
                  style={{ fontFamily: SANS, color: NAVY }}
                  autoComplete="name"
                  aria-invalid={Boolean(errors.studentName)}
                />
              </Field>
            </div>

            <div className="sm:col-span-2">
              <Field label="Parent / Guardian Name" labelKn={SNT_KN.labels.parentName} htmlFor="parentName" isFocused={focused === "parentName"} error={errors.parentName}>
                <input
                  id="parentName"
                  type="text"
                  placeholder="Father, mother or guardian"
                  value={values.parentName}
                  onChange={(e) => updateField("parentName", e.target.value)}
                  onFocus={() => setFocused("parentName")}
                  onBlur={() => setFocused(null)}
                  className="w-full bg-transparent text-base font-light placeholder:text-muted"
                  style={{ fontFamily: SANS, color: NAVY }}
                  aria-invalid={Boolean(errors.parentName)}
                />
              </Field>
            </div>

            <div>
              <Field label="Applying For" labelKn={SNT_KN.labels.applyingFor} htmlFor="applyingFor" isFocused={focused === "applyingFor"} error={errors.applyingFor}>
                <select
                  id="applyingFor"
                  value={values.applyingFor}
                  onChange={(e) => updateField("applyingFor", e.target.value)}
                  onFocus={() => setFocused("applyingFor")}
                  onBlur={() => setFocused(null)}
                  className="w-full cursor-pointer appearance-none text-ellipsis bg-transparent pr-6 text-base font-light"
                  style={{ fontFamily: SANS, color: values.applyingFor ? NAVY : SOFT_INK }}
                  aria-invalid={Boolean(errors.applyingFor)}
                >
                  <option value="" disabled hidden>
                    {optionLabel("Select scholarship", SNT_KN.selectPrompts.applyingFor)}
                  </option>
                  {SNT_APPLYING_FOR_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {optionLabel(option)}
                    </option>
                  ))}
                </select>
                <ChevronIcon />
              </Field>
            </div>

            <div>
              <Field label="Currently Studying In" labelKn={SNT_KN.labels.currentClass} htmlFor="educationCompleted" isFocused={focused === "educationCompleted"} error={errors.educationCompleted}>
                <select
                  id="educationCompleted"
                  value={values.educationCompleted}
                  onChange={(e) => updateField("educationCompleted", e.target.value)}
                  onFocus={() => setFocused("educationCompleted")}
                  onBlur={() => setFocused(null)}
                  className="w-full cursor-pointer appearance-none text-ellipsis bg-transparent pr-6 text-base font-light"
                  style={{ fontFamily: SANS, color: values.educationCompleted ? NAVY : SOFT_INK }}
                  aria-invalid={Boolean(errors.educationCompleted)}
                >
                  <option value="" disabled hidden>
                    {optionLabel("Select class", SNT_KN.selectPrompts.currentClass)}
                  </option>
                  {SNT_EDUCATION_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {optionLabel(sntClassLabel(option))}
                    </option>
                  ))}
                </select>
                <ChevronIcon />
              </Field>
            </div>

            <div className="sm:col-span-2">
              <Field label="Medium of Studying" labelKn={SNT_KN.labels.medium} htmlFor="medium" isFocused={focused === "medium"} error={errors.medium}>
                <select
                  id="medium"
                  value={values.medium}
                  onChange={(e) => updateField("medium", e.target.value)}
                  onFocus={() => setFocused("medium")}
                  onBlur={() => setFocused(null)}
                  className="w-full cursor-pointer appearance-none text-ellipsis bg-transparent pr-6 text-base font-light"
                  style={{ fontFamily: SANS, color: values.medium ? NAVY : SOFT_INK }}
                  aria-invalid={Boolean(errors.medium)}
                >
                  <option value="" disabled hidden>
                    {optionLabel("Select medium", SNT_KN.selectPrompts.medium)}
                  </option>
                  {SNT_MEDIUMS.map((option) => (
                    <option key={option} value={option}>
                      {optionLabel(option)}
                    </option>
                  ))}
                </select>
                <ChevronIcon />
              </Field>
            </div>

            <div className="sm:col-span-2">
              <Field label="School / College Name" labelKn={SNT_KN.labels.schoolCollegeName} htmlFor="schoolCollegeName" isFocused={focused === "schoolCollegeName"} error={errors.schoolCollegeName}>
                <input
                  id="schoolCollegeName"
                  type="text"
                  placeholder="Name of your institution"
                  value={values.schoolCollegeName}
                  onChange={(e) => updateField("schoolCollegeName", e.target.value)}
                  onFocus={() => setFocused("schoolCollegeName")}
                  onBlur={() => setFocused(null)}
                  className="w-full bg-transparent text-base font-light placeholder:text-muted"
                  style={{ fontFamily: SANS, color: NAVY }}
                  aria-invalid={Boolean(errors.schoolCollegeName)}
                />
              </Field>
            </div>

            <div>
              <Field label="Native Place" labelKn={SNT_KN.labels.nativePlace} htmlFor="nativePlace" isFocused={focused === "nativePlace"} error={errors.nativePlace}>
                <input
                  id="nativePlace"
                  type="text"
                  placeholder="City or town"
                  value={values.nativePlace}
                  onChange={(e) => updateField("nativePlace", e.target.value)}
                  onFocus={() => setFocused("nativePlace")}
                  onBlur={() => setFocused(null)}
                  className="w-full bg-transparent text-base font-light placeholder:text-muted"
                  style={{ fontFamily: SANS, color: NAVY }}
                  aria-invalid={Boolean(errors.nativePlace)}
                />
              </Field>
            </div>

            <div>
              <Field
                label="Date of Birth"
                labelKn={SNT_KN.labels.dob}
                htmlFor="dob"
                isFocused={focused === "dob"}
                error={errors.dob}
                hint={
                  <div id="dob-hint" style={{ fontFamily: SANS, color: NAVY }} className="text-xs font-light leading-snug">
                    <p>DD-MM-YYYY · day first, e.g. 03-01-2010 is 3 January 2010</p>
                    <Kn className="text-xs">{SNT_KN.dobHelp}</Kn>
                    <p aria-live="polite" className="mt-1 text-sm font-medium">
                      {parsedDob.ok && (
                        <>
                          {formatDobInWords(parsedDob)}
                          {" / "}
                          <span lang="kn" style={{ fontFamily: KANNADA }}>
                            {formatDobInWords(parsedDob, SNT_KN.months)}
                          </span>
                        </>
                      )}
                    </p>
                  </div>
                }
              >
                <input
                  id="dob"
                  type="text"
                  placeholder="DD-MM-YYYY"
                  value={values.dob}
                  onChange={(e) => {
                    updateField("dob", e.target.value);
                    if (errors.dob && parseSntDob(e.target.value).ok) {
                      setErrors((prev) => ({ ...prev, dob: undefined }));
                    }
                  }}
                  onFocus={() => setFocused("dob")}
                  onBlur={handleDobBlur}
                  className="w-full bg-transparent text-base font-light placeholder:text-muted"
                  style={{ fontFamily: SANS, color: NAVY }}
                  autoComplete="off"
                  aria-describedby="dob-hint"
                  aria-invalid={Boolean(errors.dob)}
                />
              </Field>
            </div>

            <div>
              <Field label="Phone Number" labelKn={SNT_KN.labels.phone} htmlFor="phone" isFocused={focused === "phone"} error={errors.phone}>
                <input
                  id="phone"
                  type="tel"
                  inputMode="tel"
                  placeholder="+91 00000 00000"
                  value={values.phone}
                  onChange={(e) => updateField("phone", e.target.value)}
                  onFocus={() => setFocused("phone")}
                  onBlur={() => setFocused(null)}
                  className="w-full bg-transparent text-base font-light placeholder:text-muted"
                  style={{ fontFamily: SANS, color: NAVY }}
                  autoComplete="tel"
                  aria-invalid={Boolean(errors.phone)}
                />
              </Field>
            </div>

            <div>
              <Field label="WhatsApp Number (optional)" labelKn={SNT_KN.labels.whatsapp} htmlFor="whatsapp" isFocused={focused === "whatsapp"} error={errors.whatsapp}>
                <input
                  id="whatsapp"
                  type="tel"
                  inputMode="tel"
                  placeholder="Same as phone number"
                  value={values.whatsapp}
                  onChange={(e) => updateField("whatsapp", e.target.value)}
                  onFocus={() => setFocused("whatsapp")}
                  onBlur={() => setFocused(null)}
                  className="w-full bg-transparent text-base font-light placeholder:text-muted"
                  style={{ fontFamily: SANS, color: NAVY }}
                  aria-invalid={Boolean(errors.whatsapp)}
                />
              </Field>
            </div>

            <div>
              <Field label="Academic Year" labelKn={SNT_KN.labels.academicYear} htmlFor="academicYear" isFocused={focused === "academicYear"} error={errors.academicYear}>
                <select
                  id="academicYear"
                  value={values.academicYear}
                  onChange={(e) => updateField("academicYear", e.target.value)}
                  onFocus={() => setFocused("academicYear")}
                  onBlur={() => setFocused(null)}
                  className="w-full cursor-pointer appearance-none text-ellipsis bg-transparent pr-6 text-base font-light"
                  style={{ fontFamily: SANS, color: NAVY }}
                  aria-invalid={Boolean(errors.academicYear)}
                >
                  {ACADEMIC_YEARS.map((option) => (
                    <option key={option} value={option}>
                      {optionLabel(option)}
                    </option>
                  ))}
                </select>
                <ChevronIcon />
              </Field>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="rulesAccepted" className="flex min-h-[44px] cursor-pointer items-start gap-3">
                <input
                  id="rulesAccepted"
                  type="checkbox"
                  checked={values.rulesAccepted}
                  onChange={(e) => updateField("rulesAccepted", e.target.checked)}
                  className="mt-0.5 h-5 w-5 flex-shrink-0 cursor-pointer"
                  style={{ accentColor: NAVY }}
                  aria-invalid={Boolean(errors.rulesAccepted)}
                />
                <span style={{ fontFamily: SANS, color: NAVY }} className="text-sm font-light leading-relaxed">
                  I have read the{" "}
                  <Link
                    href={SNT_RULES_PDF_PATH}
                    target="_blank"
                    rel="noopener"
                    className="py-[13px] font-medium underline underline-offset-2"
                    style={{ color: NAVY }}
                  >
                    rules and regulations
                  </Link>
                  <Kn className="mt-0.5">{SNT_KN.rulesAccepted}</Kn>
                </span>
              </label>
              {errors.rulesAccepted && <ErrorText message={errors.rulesAccepted} indent />}
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="consentGiven" className="flex min-h-[44px] cursor-pointer items-start gap-3">
                <input
                  id="consentGiven"
                  type="checkbox"
                  checked={values.consentGiven}
                  onChange={(e) => updateField("consentGiven", e.target.checked)}
                  className="mt-0.5 h-5 w-5 flex-shrink-0 cursor-pointer"
                  style={{ accentColor: NAVY }}
                  aria-invalid={Boolean(errors.consentGiven)}
                />
                <span style={{ fontFamily: SANS, color: NAVY }} className="text-sm font-light leading-relaxed">
                  {SNT_CONSENT_TEXT}
                  <Kn className="mt-1">{SNT_KN.consent}</Kn>
                </span>
              </label>
              {errors.consentGiven && <ErrorText message={errors.consentGiven} indent />}
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
              <p style={{ fontFamily: SANS, color: NAVY }} className="text-xs font-light leading-snug">
                Registration fee ₹{SNT_EXAM.feeRupees} is paid in the next step. Your hall ticket is issued only after
                the payment is confirmed.
              </p>
              <Kn className="mt-1 text-xs">{SNT_KN.feeLine(SNT_EXAM.feeRupees)}</Kn>
              {status === "error" && submitError && (
                <div role="alert" style={{ fontFamily: SANS, fontSize: "12px", color: ERROR, marginTop: "8px" }}>
                  <p style={{ margin: 0 }}>{submitError}</p>
                  <Kn color={ERROR}>{SNT_KN.submitFailed}</Kn>
                </div>
              )}
            </div>
            <button
              type="submit"
              disabled={!isComplete || status === "submitting"}
              className="flex flex-shrink-0 items-center gap-3 rounded-full px-7 py-3.5 text-sm font-medium transition-all duration-200 hover:!bg-[#1A3260]"
              style={{
                fontFamily: SANS,
                backgroundColor: isComplete ? NAVY : DISABLED_BG,
                color: isComplete ? "#FFFFFF" : NAVY,
                cursor: isComplete && status !== "submitting" ? "pointer" : "not-allowed",
                letterSpacing: "0.03em",
              }}
            >
              <span className="flex flex-col items-start text-left">
                {status === "submitting" ? "Saving…" : `Register & Pay ₹${SNT_EXAM.feeRupees}`}
                <Kn color={isComplete ? "rgba(255,255,255,0.8)" : KN_INK}>
                  {status === "submitting" ? SNT_KN.submitting : SNT_KN.submit(SNT_EXAM.feeRupees)}
                </Kn>
              </span>
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
