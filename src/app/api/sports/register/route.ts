import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { SPORTS_MEET } from "@/content/sports";
import { createAdminClient } from "@/lib/supabase/admin";
import { validatePhotoBytes } from "@/lib/snt/imageValidation";
import { normalizePhone } from "@/lib/validation/scholarshipApplication";
import {
  SPORTS_AMOUNT_PAISE,
  SPORTS_DOCUMENT_BUCKET,
  SPORTS_PHOTO_BUCKET,
  SPORTS_REQUEST_MAX_BYTES,
} from "@/lib/sports/constants";
import { validateDocumentBytes, type ValidatedDocument } from "@/lib/sports/documents";
import { isSportsRegistrationOpen, normalizedAthleticsEvent } from "@/lib/sports/rules";
import { parseSportsDob, validateSportsRegistration, type SportsRegistrationValues } from "@/lib/sports/validation";

export const runtime = "nodejs";

const TOO_LARGE = "The files are too large together. Use smaller certificate files.";

function text(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === "string" ? value : "";
}

async function fileBytes(formData: FormData, key: string): Promise<Uint8Array | null> {
  const file = formData.get(key);
  return file instanceof File && file.size > 0 ? new Uint8Array(await file.arrayBuffer()) : null;
}

export async function POST(request: Request) {
  if (!isSportsRegistrationOpen(SPORTS_MEET.registrationCloses)) {
    return NextResponse.json({ closed: true, error: SPORTS_MEET.registrationClosedMessage }, { status: 403 });
  }

  const declaredLength = Number(request.headers.get("content-length") ?? 0);
  if (declaredLength > SPORTS_REQUEST_MAX_BYTES) {
    return NextResponse.json({ errors: { sportsCertificate: TOO_LARGE } }, { status: 413 });
  }

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const values: SportsRegistrationValues = {
    studentName: text(formData, "studentName"),
    dob: text(formData, "dob"),
    schoolCollegeName: text(formData, "schoolCollegeName"),
    nativePlace: text(formData, "nativePlace"),
    phone: text(formData, "phone"),
    whatsapp: text(formData, "whatsapp"),
    parentName: text(formData, "parentName"),
    sport: text(formData, "sport"),
    athleticsEvent: text(formData, "athleticsEvent"),
    level: text(formData, "level"),
    certificateDeclared: text(formData, "certificateDeclared") === "true",
    fitnessDeclared: text(formData, "fitnessDeclared") === "true",
    consentGiven: text(formData, "consentGiven") === "true",
    companyWebsite: text(formData, "companyWebsite"),
  };

  // Honeypot: pretend success, store nothing.
  if (values.companyWebsite.trim()) {
    return NextResponse.json({ id: randomUUID() }, { status: 201 });
  }

  const errors = validateSportsRegistration(values);

  const photoBytes = await fileBytes(formData, "photo");
  const photoCheck = photoBytes ? validatePhotoBytes(photoBytes) : null;
  if (!photoBytes) errors.photo = "Upload the student's passport photo.";
  else if (photoCheck && !photoCheck.ok) errors.photo = photoCheck.error;

  const documents: { key: "sportsCertificate" | "fitnessCertificate"; name: string; bytes: Uint8Array; document: ValidatedDocument }[] = [];
  for (const [key, name] of [
    ["sportsCertificate", "sports-certificate"],
    ["fitnessCertificate", "fitness-certificate"],
  ] as const) {
    const bytes = await fileBytes(formData, key);
    if (!bytes) continue;
    const check = validateDocumentBytes(bytes);
    if (check.ok) documents.push({ key, name, bytes, document: check.document });
    else errors[key] = check.error;
  }

  const dob = parseSportsDob(values.dob);
  if (Object.keys(errors).length > 0 || !photoBytes || !photoCheck?.ok || !dob.ok) {
    return NextResponse.json({ errors }, { status: 422 });
  }

  const id = randomUUID();
  const supabase = createAdminClient();
  const photoPath = `${id}.${photoCheck.photo.extension}`;
  const documentPaths: Record<string, string> = {};

  const { error: photoError } = await supabase.storage
    .from(SPORTS_PHOTO_BUCKET)
    .upload(photoPath, photoBytes, { contentType: photoCheck.photo.contentType, upsert: false });
  if (photoError) {
    console.error("Failed to store sports photo:", photoError);
    return NextResponse.json({ error: "Could not save the photo. Please try again." }, { status: 500 });
  }

  const removeUploads = async () => {
    await supabase.storage.from(SPORTS_PHOTO_BUCKET).remove([photoPath]);
    const paths = Object.values(documentPaths);
    if (paths.length) await supabase.storage.from(SPORTS_DOCUMENT_BUCKET).remove(paths);
  };

  for (const doc of documents) {
    const path = `${id}/${doc.name}.${doc.document.extension}`;
    const { error } = await supabase.storage
      .from(SPORTS_DOCUMENT_BUCKET)
      .upload(path, doc.bytes, { contentType: doc.document.contentType, upsert: false });
    if (error) {
      console.error("Failed to store sports certificate:", error);
      await removeUploads();
      return NextResponse.json({ error: "Could not save the certificate. Please try again." }, { status: 500 });
    }
    documentPaths[doc.key] = path;
  }

  const whatsapp = values.whatsapp.trim() ? normalizePhone(values.whatsapp) : normalizePhone(values.phone);
  const { error: insertError } = await supabase.from("sports_registrations").insert({
    id,
    student_name: values.studentName.trim(),
    // Stored as an ISO date, never as the text the student typed.
    dob: dob.iso,
    school_name: values.schoolCollegeName.trim(),
    native_place: values.nativePlace.trim(),
    phone: normalizePhone(values.phone),
    whatsapp,
    parent_name: values.parentName.trim(),
    sport: values.sport,
    athletics_event: normalizedAthleticsEvent(values.sport, values.athleticsEvent),
    level_represented: values.level,
    photo_path: photoPath,
    sports_certificate_path: documentPaths.sportsCertificate ?? null,
    fitness_certificate_path: documentPaths.fitnessCertificate ?? null,
    certificate_declared: true,
    fitness_declared: true,
    consent_given: true,
    consent_at: new Date().toISOString(),
    status: "pending",
    amount_paise: SPORTS_AMOUNT_PAISE,
  });

  if (insertError) {
    console.error("Failed to save sports registration:", insertError);
    await removeUploads();
    return NextResponse.json(
      { error: "Something went wrong while saving your registration. Please try again." },
      { status: 500 },
    );
  }

  return NextResponse.json({ id }, { status: 201 });
}
