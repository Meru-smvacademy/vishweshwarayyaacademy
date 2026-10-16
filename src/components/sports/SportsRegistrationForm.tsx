"use client";

import Image from "next/image";
import { useEffect, useState, type ChangeEvent, type FormEvent, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import {
  ATHLETICS_EVENTS,
  BELOW_DISTRICT,
  LEVELS,
  SPORTS,
  SPORTS_MEET,
  WHAT_TO_BRING,
  WHAT_TO_BRING_ALSO,
  WHAT_TO_BRING_INTRO,
  WHAT_TO_BRING_TITLE,
} from "@/content/sports";
import { SNT_KN, SPORTS_KN, kannadaFor } from "@/content/scholarship-kn";
import SportsRegistrationClosed from "@/components/sports/SportsRegistrationClosed";
import { formatDobInWords } from "@/lib/snt/dateOfBirth";
import {
  SNT_PHOTO_MAX_BYTES,
  SNT_PHOTO_MAX_HEIGHT,
  SNT_PHOTO_MAX_WIDTH,
  SNT_PHOTO_MIN_SIDE,
  SNT_PHOTO_TYPES,
} from "@/lib/snt/constants";
import {
  SPORTS_CONSENT_TEXT,
  SPORTS_DOCUMENT_MAX_BYTES,
  SPORTS_REQUEST_MAX_BYTES,
  sportsRegistrationPath,
} from "@/lib/sports/constants";
import { sportsEventDetails, sportsRegistrationNotice } from "@/lib/sports/eventDetails";
import { SPORTS_CHOICE_ERRORS } from "@/lib/sports/rules";
import {
  dobErrorMessage,
  parseSportsDob,
  validateSportsRegistration,
  type SportsRegistrationFieldErrors,
  type SportsRegistrationValues,
} from "@/lib/sports/validation";

// Same palette and outdoor-readability rules as the SNT exam form: all text is
// NAVY or, for Kannada second lines, --scholarship-navy-light. --muted is used
// only for placeholders and input borders. GOLD is decoration only.
const NAVY = "#0F1E3C";
const GOLD = "#C4922A";
const KN_INK = "var(--scholarship-navy-light)";
const SOFT_INK = "var(--muted)";
const CARD_BORDER = "#E2DAD0";
const STRIP_BG = "#FDFAF6";
const DISABLED_BG = "#C5BDB0";
const ERROR = "#C0392B";
const CREAM = "#F9F6F0";
const NOTICE_BG = "#FFF8E8";

const DISPLAY = "var(--font-playfair-display), Georgia, serif";
const SANS = "var(--font-outfit), var(--font-noto-kannada), system-ui, sans-serif";
const KANNADA = "var(--font-noto-kannada), system-ui, sans-serif";

const DOCUMENT_ACCEPT = "image/jpeg,image/png,application/pdf";
const DOCUMENT_MAX_SIDE = 1600;

const initialValues: SportsRegistrationValues = {
  studentName: "",
  dob: "",
  schoolCollegeName: "",
  nativePlace: "",
  phone: "",
  whatsapp: "",
  parentName: "",
  sport: "",
  athleticsEvent: "",
  level: "",
  certificateDeclared: false,
  fitnessDeclared: false,
  consentGiven: false,
  companyWebsite: "",
};

type SubmitState = "idle" | "submitting" | "error" | "closed";
type PreparedPhoto = { blob: Blob; previewUrl: string };
type PreparedDocument = { blob: Blob; name: string };
type DocumentKey = "sportsCertificate" | "fitnessCertificate";

const eventDetails = sportsEventDetails();
const registrationNotice = sportsRegistrationNotice();

function decodeImage(file: Blob): Promise<HTMLImageElement> {
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

function canvasJpeg(image: HTMLImageElement, scale: number, quality: number): Promise<Blob | null> {
  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.floor(image.naturalWidth * scale));
  canvas.height = Math.max(1, Math.floor(image.naturalHeight * scale));
  const context = canvas.getContext("2d");
  if (!context) return Promise.resolve(null);
  context.fillStyle = "#FFFFFF";
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.drawImage(image, 0, 0, canvas.width, canvas.height);
  return new Promise((resolve) => canvas.toBlob(resolve, "image/jpeg", quality));
}

// Same photo handling as the exam form: decoding proves it is a real image,
// re-encoding strips metadata and caps the size at 600 × 800.
async function preparePhoto(file: File): Promise<PreparedPhoto> {
  if (!SNT_PHOTO_TYPES.includes(file.type)) throw new Error("Upload a JPG or PNG photo.");
  if (file.size > SNT_PHOTO_MAX_BYTES) throw new Error("The photo must be 4 MB or smaller.");
  let image: HTMLImageElement;
  try {
    image = await decodeImage(file);
  } catch {
    throw new Error("This file is not a valid image. Upload a JPG or PNG photo.");
  }
  if (image.naturalWidth < SNT_PHOTO_MIN_SIDE || image.naturalHeight < SNT_PHOTO_MIN_SIDE) {
    throw new Error("The photo is too small. Upload a clearer passport photo.");
  }
  const scale = Math.min(1, SNT_PHOTO_MAX_WIDTH / image.naturalWidth, SNT_PHOTO_MAX_HEIGHT / image.naturalHeight);
  const blob = await canvasJpeg(image, scale, 0.88);
  if (!blob) throw new Error("Could not process the photo. Try a different browser.");
  return { blob, previewUrl: URL.createObjectURL(blob) };
}

// Certificates stay readable: an image is only scaled down to 1600 px on its
// longer side; a PDF is sent as it is. Both must end up at 2 MB or less.
async function prepareDocument(file: File): Promise<PreparedDocument> {
  if (file.type === "application/pdf") {
    if (file.size > SPORTS_DOCUMENT_MAX_BYTES) throw new Error("The certificate must be 2 MB or smaller.");
    return { blob: file, name: file.name || "certificate.pdf" };
  }
  if (!["image/jpeg", "image/png"].includes(file.type)) throw new Error("The certificate must be a JPG, PNG or PDF file.");
  let image: HTMLImageElement;
  try {
    image = await decodeImage(file);
  } catch {
    throw new Error("The certificate must be a JPG, PNG or PDF file.");
  }
  const scale = Math.min(1, DOCUMENT_MAX_SIDE / Math.max(image.naturalWidth, image.naturalHeight));
  const blob = (await canvasJpeg(image, scale, 0.85)) ?? (await canvasJpeg(image, scale, 0.7));
  if (!blob || blob.size > SPORTS_DOCUMENT_MAX_BYTES) throw new Error("The certificate must be 2 MB or smaller.");
  return { blob, name: file.name || "certificate.jpg" };
}

function ChevronIcon() {
  return (
    <span className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2" style={{ color: SOFT_INK }}>
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
      style={{ fontFamily: KANNADA, color, letterSpacing: "normal", textTransform: "none" }}
    >
      {children}
    </span>
  );
}

function kannadaError(message: string): string | undefined {
  return kannadaFor(SPORTS_KN.errors, message) ?? kannadaFor(SNT_KN.errors, message);
}

function ErrorText({ message, indent = false, role }: { message: string; indent?: boolean; role?: "alert" }) {
  const kannada = kannadaError(message);
  return (
    <div role={role} style={{ fontFamily: SANS, fontSize: "12px", color: ERROR, margin: indent ? "4px 0 0 32px" : 0 }}>
      <p style={{ margin: 0 }}>{message}</p>
      {kannada && <Kn color={ERROR}>{kannada}</Kn>}
    </div>
  );
}

/** "English / ಕನ್ನಡ" for a dropdown option (a native option cannot hold two lines). */
function optionLabel(english: string, kannada = kannadaFor(SPORTS_KN.options, english)): string {
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

/** The bold, boxed WHAT TO BRING block — shown here before payment and on the back of the entry card. */
export function WhatToBringBox() {
  return (
    <section
      aria-labelledby="what-to-bring"
      className="rounded-xl px-5 py-5 sm:px-6"
      style={{ backgroundColor: NOTICE_BG, border: `3px solid ${NAVY}` }}
    >
      <h2 id="what-to-bring" style={{ fontFamily: DISPLAY, color: NAVY }} className="text-lg font-bold uppercase sm:text-xl">
        {WHAT_TO_BRING_TITLE}
        <Kn className="mt-1 text-[15px] font-bold" color={NAVY}>
          {SPORTS_KN.whatToBringTitle}
        </Kn>
      </h2>
      <p style={{ fontFamily: SANS, color: NAVY }} className="mt-3 text-sm font-bold">
        {WHAT_TO_BRING_INTRO}
        <Kn>{SPORTS_KN.whatToBringIntro}</Kn>
      </p>
      <ol className="mt-3 space-y-3">
        {WHAT_TO_BRING.map((item, i) => (
          <li key={item.title} className="flex gap-3" style={{ fontFamily: SANS, color: NAVY }}>
            <span className="text-base font-bold" style={{ color: GOLD }} aria-hidden="true">
              {i + 1}.
            </span>
            <span className="text-[15px] font-bold leading-snug">
              {item.title} — {item.detail}
              <Kn className="mt-0.5 text-[13px] font-bold" color={NAVY}>
                {SPORTS_KN.whatToBring[i]}
              </Kn>
            </span>
          </li>
        ))}
      </ol>
      <p style={{ fontFamily: SANS, color: NAVY }} className="mt-4 text-sm font-bold">
        {WHAT_TO_BRING_ALSO}
        <Kn>{SPORTS_KN.whatToBringAlso}</Kn>
      </p>
    </section>
  );
}

function DocumentUpload({
  id,
  label,
  labelKn,
  file,
  busy,
  error,
  onChange,
  onRemove,
}: {
  id: DocumentKey;
  label: string;
  labelKn: string;
  file: PreparedDocument | null;
  busy: boolean;
  error?: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onRemove: () => void;
}) {
  return (
    <div className="flex min-w-0 flex-col gap-2">
      <span className="text-xs font-medium uppercase tracking-widest" style={{ fontFamily: SANS, color: error ? ERROR : NAVY, letterSpacing: "0.1em" }}>
        {label}
        <Kn className="mt-0.5">{labelKn}</Kn>
      </span>
      <div className="flex flex-wrap items-center gap-3">
        <label
          htmlFor={id}
          className="inline-flex min-h-[44px] cursor-pointer flex-col justify-center rounded-2xl border px-5 py-1.5 text-sm font-medium transition-all hover:opacity-70"
          style={{ fontFamily: SANS, color: NAVY, borderColor: NAVY }}
        >
          {busy ? "Processing…" : file ? "Change file" : "Upload file"}
          <Kn>{busy ? SNT_KN.processingPhoto : file ? SPORTS_KN.changeFile : SPORTS_KN.uploadFile}</Kn>
        </label>
        <input id={id} type="file" accept={DOCUMENT_ACCEPT} onChange={onChange} className="sr-only" aria-invalid={Boolean(error)} />
        {file && (
          <>
            <span className="min-w-0 truncate text-sm" style={{ fontFamily: SANS, color: NAVY, maxWidth: "14rem" }}>
              {file.name}
            </span>
            <button type="button" onClick={onRemove} className="min-h-[44px] text-sm underline underline-offset-2" style={{ fontFamily: SANS, color: NAVY }}>
              Remove <span lang="kn" style={{ fontFamily: KANNADA }}>/ {SPORTS_KN.removeFile}</span>
            </button>
          </>
        )}
      </div>
      <p style={{ fontFamily: SANS, color: NAVY }} className="text-xs font-light leading-snug">
        Optional · JPG, PNG or PDF · max 2 MB. The original must still be brought to the meet.
      </p>
      <Kn className="text-xs">{SPORTS_KN.documentHelp}</Kn>
      {error && <ErrorText message={error} />}
    </div>
  );
}

export default function SportsRegistrationForm() {
  const router = useRouter();
  const [values, setValues] = useState<SportsRegistrationValues>(initialValues);
  const [errors, setErrors] = useState<SportsRegistrationFieldErrors>({});
  const [status, setStatus] = useState<SubmitState>("idle");
  const [focused, setFocused] = useState<string | null>(null);
  const [photo, setPhoto] = useState<PreparedPhoto | null>(null);
  const [isPreparingPhoto, setIsPreparingPhoto] = useState(false);
  const [documents, setDocuments] = useState<Record<DocumentKey, PreparedDocument | null>>({
    sportsCertificate: null,
    fitnessCertificate: null,
  });
  const [preparingDocument, setPreparingDocument] = useState<DocumentKey | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      if (photo) URL.revokeObjectURL(photo.previewUrl);
    };
  }, [photo]);

  function updateField<K extends keyof SportsRegistrationValues>(field: K, value: SportsRegistrationValues[K]) {
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

  async function handleDocumentChange(key: DocumentKey, event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    setPreparingDocument(key);
    try {
      const prepared = await prepareDocument(file);
      setDocuments((prev) => ({ ...prev, [key]: prepared }));
      setErrors((prev) => ({ ...prev, [key]: undefined }));
    } catch (error) {
      setDocuments((prev) => ({ ...prev, [key]: null }));
      setErrors((prev) => ({ ...prev, [key]: (error as Error).message }));
    } finally {
      setPreparingDocument(null);
    }
  }

  function handleSportChange(sport: string) {
    // The athletics event belongs to Athletics only; switching away clears it.
    setValues((prev) => ({ ...prev, sport, athleticsEvent: sport === "Athletics" ? prev.athleticsEvent : "" }));
    setErrors((prev) => ({ ...prev, sport: undefined, athleticsEvent: undefined }));
  }

  function handleLevelChange(level: string) {
    updateField("level", level);
    // "Below district / none" is explained the moment it is chosen.
    setErrors((prev) => ({ ...prev, level: level === BELOW_DISTRICT ? SPORTS_CHOICE_ERRORS.belowDistrict : undefined }));
  }

  const parsedDob = parseSportsDob(values.dob);
  const isAthletics = values.sport === "Athletics";
  const isBelowDistrict = values.level === BELOW_DISTRICT;

  function handleDobBlur() {
    setFocused(null);
    if (values.dob.trim() && !parsedDob.ok) {
      setErrors((prev) => ({ ...prev, dob: dobErrorMessage(parsedDob.reason) }));
    }
  }

  const isComplete = Boolean(
    values.studentName.trim() &&
      values.dob &&
      values.schoolCollegeName.trim() &&
      values.nativePlace.trim() &&
      values.phone.trim() &&
      values.parentName.trim() &&
      values.sport &&
      (!isAthletics || values.athleticsEvent) &&
      values.level &&
      !isBelowDistrict &&
      values.certificateDeclared &&
      values.fitnessDeclared &&
      values.consentGiven &&
      photo &&
      !preparingDocument,
  );

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const fieldErrors = validateSportsRegistration(values);
    if (!photo) fieldErrors.photo = "Upload the student's passport photo.";
    const totalBytes = (photo?.blob.size ?? 0) + (documents.sportsCertificate?.blob.size ?? 0) + (documents.fitnessCertificate?.blob.size ?? 0);
    if (totalBytes > SPORTS_REQUEST_MAX_BYTES - 64 * 1024) {
      fieldErrors.sportsCertificate = "The files are too large together. Use smaller certificate files.";
    }
    setErrors(fieldErrors);
    if (Object.keys(fieldErrors).length > 0 || !photo) return;

    setStatus("submitting");
    setSubmitError(null);

    const body = new FormData();
    for (const [key, value] of Object.entries(values)) body.append(key, String(value));
    body.append("photo", photo.blob, "photo.jpg");
    for (const key of ["sportsCertificate", "fitnessCertificate"] as const) {
      const doc = documents[key];
      if (doc) body.append(key, doc.blob, doc.name);
    }

    try {
      const response = await fetch("/api/sports/register", { method: "POST", body });
      const data = await response.json().catch(() => ({}));
      if (response.status === 403 && data.closed) {
        setStatus("closed");
        return;
      }
      if ((response.status === 422 || response.status === 413) && data.errors) {
        setErrors(data.errors);
        setStatus("idle");
        return;
      }
      if (!response.ok || typeof data.id !== "string") throw new Error(data.error ?? "Submission failed");
      router.push(`${sportsRegistrationPath(data.id)}?pay=1`);
    } catch {
      setSubmitError("Something went wrong while submitting. Please try again, or call us directly.");
      setStatus("error");
    }
  }

  if (status === "closed") {
    return <SportsRegistrationClosed />;
  }

  const inputClass = "w-full bg-transparent text-base font-light placeholder:text-muted";
  const selectClass = "w-full cursor-pointer appearance-none text-ellipsis bg-transparent pr-6 text-base font-light";

  return (
    <div style={{ fontFamily: SANS, backgroundColor: CREAM }} className="min-h-screen">
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="mb-10 sm:mb-12">
          <div style={{ backgroundColor: GOLD }} className="mb-5 h-0.5 w-10" />
          <h1 style={{ fontFamily: DISPLAY, color: NAVY, lineHeight: 1.15 }} className="mb-4 text-4xl font-semibold sm:text-5xl">
            {SPORTS_MEET.name}
          </h1>
          <p style={{ color: NAVY }} className="text-base font-light sm:text-lg">
            Register for Volleyball, Throw Ball or Athletics.
          </p>
          <Kn className="mt-1 text-sm">
            {SPORTS_KN.pageTitle} · {SPORTS_KN.pageSubtitle}
          </Kn>

          <div className="mt-6 rounded-xl px-5 py-4" style={{ backgroundColor: STRIP_BG, border: `1px solid ${CARD_BORDER}` }}>
            <p className="text-xs font-medium uppercase tracking-widest" style={{ fontFamily: SANS, color: NAVY, letterSpacing: "0.1em" }}>
              Venue
            </p>
            <Kn>{SPORTS_KN.venue}</Kn>
            <p style={{ fontFamily: SANS, color: NAVY }} className="mt-2 text-base font-medium">
              {SPORTS_MEET.venue.name}
            </p>
            <Kn>{SNT_KN.centreName}</Kn>
            <address style={{ fontFamily: SANS, color: NAVY }} className="text-sm font-light not-italic leading-relaxed">
              {SPORTS_MEET.venue.addressLines.map((line) => (
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
            <dl className="mt-3 grid grid-cols-1 gap-x-6 gap-y-3 pt-3 sm:grid-cols-2" style={{ borderTop: `1px solid ${CARD_BORDER}` }}>
              {eventDetails.map((detail) => (
                <div key={detail.label}>
                  <dt className="text-xs font-medium uppercase tracking-widest" style={{ fontFamily: SANS, color: NAVY, letterSpacing: "0.1em" }}>
                    {detail.label}
                    <Kn>{detail.labelKn}</Kn>
                  </dt>
                  <dd style={{ fontFamily: SANS, color: NAVY }} className="mt-1 text-base font-medium">
                    {detail.value}
                    <Kn>{detail.valueKn}</Kn>
                  </dd>
                </div>
              ))}
            </dl>
            <p style={{ fontFamily: SANS, color: NAVY, borderTop: `1px solid ${CARD_BORDER}` }} className="mt-3 pt-3 text-sm leading-relaxed">
              {registrationNotice.en}
              <Kn className="mt-1">{registrationNotice.kn}</Kn>
            </p>
          </div>

          <div className="mt-6">
            <WhatToBringBox />
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
            <p className="text-xs font-medium uppercase tracking-widest" style={{ fontFamily: SANS, color: NAVY, letterSpacing: "0.1em" }}>
              Eligibility
            </p>
            <Kn>{SNT_KN.eligibilityTitle}</Kn>
            <p style={{ fontFamily: SANS, color: NAVY }} className="mt-2 text-base font-medium leading-snug">
              {SPORTS_MEET.eligibilityNotice}
            </p>
            <Kn className="mt-1 text-sm">{SPORTS_KN.eligibilityNotice}</Kn>
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
                    <Image src={photo.previewUrl} alt="Preview of the uploaded student photo" fill unoptimized sizes="96px" className="object-cover" />
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
                    <Kn>{isPreparingPhoto ? SNT_KN.processingPhoto : photo ? SNT_KN.changePhoto : SNT_KN.uploadPhoto}</Kn>
                  </label>
                  <input id="photo" type="file" accept="image/jpeg,image/png" onChange={handlePhotoChange} className="sr-only" aria-invalid={Boolean(errors.photo)} />
                  <p style={{ fontFamily: SANS, color: NAVY }} className="text-xs font-light leading-snug">
                    Recent passport-size photo · JPG or PNG · max 4 MB. It will be printed on the entry card.
                  </p>
                  <Kn className="text-xs">{SPORTS_KN.photoHelp}</Kn>
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
                  className={inputClass}
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
                  className={inputClass}
                  style={{ fontFamily: SANS, color: NAVY }}
                  aria-invalid={Boolean(errors.parentName)}
                />
              </Field>
            </div>

            <div className={isAthletics ? "" : "sm:col-span-2"}>
              <Field label="Sport" labelKn={SPORTS_KN.labels.sport} htmlFor="sport" isFocused={focused === "sport"} error={errors.sport}>
                <select
                  id="sport"
                  value={values.sport}
                  onChange={(e) => handleSportChange(e.target.value)}
                  onFocus={() => setFocused("sport")}
                  onBlur={() => setFocused(null)}
                  className={selectClass}
                  style={{ fontFamily: SANS, color: values.sport ? NAVY : SOFT_INK }}
                  aria-invalid={Boolean(errors.sport)}
                >
                  <option value="" disabled hidden>
                    {optionLabel("Select sport", SPORTS_KN.selectPrompts.sport)}
                  </option>
                  {SPORTS.map((option) => (
                    <option key={option} value={option}>
                      {optionLabel(option)}
                    </option>
                  ))}
                </select>
                <ChevronIcon />
              </Field>
            </div>

            {isAthletics && (
              <div>
                <Field
                  label="Athletics Event"
                  labelKn={SPORTS_KN.labels.athleticsEvent}
                  htmlFor="athleticsEvent"
                  isFocused={focused === "athleticsEvent"}
                  error={errors.athleticsEvent}
                >
                  <select
                    id="athleticsEvent"
                    value={values.athleticsEvent}
                    onChange={(e) => {
                      updateField("athleticsEvent", e.target.value);
                      setErrors((prev) => ({ ...prev, athleticsEvent: undefined }));
                    }}
                    onFocus={() => setFocused("athleticsEvent")}
                    onBlur={() => setFocused(null)}
                    className={selectClass}
                    style={{ fontFamily: SANS, color: values.athleticsEvent ? NAVY : SOFT_INK }}
                    aria-invalid={Boolean(errors.athleticsEvent)}
                  >
                    <option value="" disabled hidden>
                      {optionLabel("Select event", SPORTS_KN.selectPrompts.athleticsEvent)}
                    </option>
                    {ATHLETICS_EVENTS.map((option) => (
                      <option key={option} value={option}>
                        {optionLabel(option)}
                      </option>
                    ))}
                  </select>
                  <ChevronIcon />
                </Field>
              </div>
            )}

            <div className="sm:col-span-2">
              <Field label="Highest Level Represented" labelKn={SPORTS_KN.labels.level} htmlFor="level" isFocused={focused === "level"} error={errors.level}>
                <select
                  id="level"
                  value={values.level}
                  onChange={(e) => handleLevelChange(e.target.value)}
                  onFocus={() => setFocused("level")}
                  onBlur={() => setFocused(null)}
                  className={selectClass}
                  style={{ fontFamily: SANS, color: values.level ? NAVY : SOFT_INK }}
                  aria-invalid={Boolean(errors.level)}
                >
                  <option value="" disabled hidden>
                    {optionLabel("Select level", SPORTS_KN.selectPrompts.level)}
                  </option>
                  {LEVELS.map((option) => (
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
                  className={inputClass}
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
                  className={inputClass}
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
                    if (errors.dob && parseSportsDob(e.target.value).ok) {
                      setErrors((prev) => ({ ...prev, dob: undefined }));
                    }
                  }}
                  onFocus={() => setFocused("dob")}
                  onBlur={handleDobBlur}
                  className={inputClass}
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
                  className={inputClass}
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
                  className={inputClass}
                  style={{ fontFamily: SANS, color: NAVY }}
                  aria-invalid={Boolean(errors.whatsapp)}
                />
              </Field>
            </div>

            <div className="sm:col-span-2">
              <DocumentUpload
                id="sportsCertificate"
                label="Sports Certificate (optional)"
                labelKn={SPORTS_KN.labels.sportsCertificate}
                file={documents.sportsCertificate}
                busy={preparingDocument === "sportsCertificate"}
                error={errors.sportsCertificate}
                onChange={(e) => handleDocumentChange("sportsCertificate", e)}
                onRemove={() => setDocuments((prev) => ({ ...prev, sportsCertificate: null }))}
              />
            </div>

            <div className="sm:col-span-2">
              <DocumentUpload
                id="fitnessCertificate"
                label="Medical Fitness Certificate (optional)"
                labelKn={SPORTS_KN.labels.fitnessCertificate}
                file={documents.fitnessCertificate}
                busy={preparingDocument === "fitnessCertificate"}
                error={errors.fitnessCertificate}
                onChange={(e) => handleDocumentChange("fitnessCertificate", e)}
                onRemove={() => setDocuments((prev) => ({ ...prev, fitnessCertificate: null }))}
              />
            </div>

            {(
              [
                ["certificateDeclared", "The student holds a genuine certificate for the level selected and will bring the original to the meet.", SPORTS_KN.certificateDeclaration],
                ["fitnessDeclared", "The student holds a medical fitness certificate issued by a GOVERNMENT doctor and will bring the original to the meet.", SPORTS_KN.fitnessDeclaration],
                ["consentGiven", SPORTS_CONSENT_TEXT, SPORTS_KN.consent],
              ] as const
            ).map(([key, english, kannada]) => (
              <div key={key} className="sm:col-span-2">
                <label htmlFor={key} className="flex min-h-[44px] cursor-pointer items-start gap-3">
                  <input
                    id={key}
                    type="checkbox"
                    checked={values[key]}
                    onChange={(e) => {
                      updateField(key, e.target.checked);
                      setErrors((prev) => ({ ...prev, [key]: undefined }));
                    }}
                    className="mt-0.5 h-5 w-5 flex-shrink-0 cursor-pointer"
                    style={{ accentColor: NAVY }}
                    aria-invalid={Boolean(errors[key])}
                  />
                  <span style={{ fontFamily: SANS, color: NAVY }} className={`text-sm leading-relaxed ${key === "consentGiven" ? "font-light" : "font-medium"}`}>
                    {english}
                    <Kn className="mt-1">{kannada}</Kn>
                  </span>
                </label>
                {errors[key] && <ErrorText message={errors[key] as string} indent />}
              </div>
            ))}

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
                Entry fee ₹{SPORTS_MEET.feeRupees} is paid in the next step. Your entry card is issued only after the payment is confirmed.
              </p>
              <Kn className="mt-1 text-xs">{SPORTS_KN.feeLine(SPORTS_MEET.feeRupees)}</Kn>
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
                {status === "submitting" ? "Saving…" : `Register & Pay ₹${SPORTS_MEET.feeRupees}`}
                <Kn color={isComplete ? "rgba(255,255,255,0.8)" : KN_INK}>
                  {status === "submitting" ? SNT_KN.submitting : SNT_KN.submit(SPORTS_MEET.feeRupees)}
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
