import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { SNT_EXAM } from "@/content/scholarship";
import { createAdminClient } from "@/lib/supabase/admin";
import { isSntRegistrationOpen } from "@/lib/snt/examSchedule";
import { SNT_AMOUNT_PAISE, SNT_PHOTO_BUCKET, SNT_PHOTO_MAX_BYTES } from "@/lib/snt/constants";
import { validatePhotoBytes } from "@/lib/snt/imageValidation";
import { isLikelyBot, normalizePhone } from "@/lib/validation/scholarshipApplication";
import { parseSntDob, resolveWhatsapp, validateSntRegistration, type SntRegistrationValues } from "@/lib/validation/sntRegistration";

export const runtime = "nodejs";

function text(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === "string" ? value : "";
}

export async function POST(request: Request) {
  if (!isSntRegistrationOpen(SNT_EXAM)) {
    return NextResponse.json({ closed: true, error: SNT_EXAM.registrationClosedMessage }, { status: 403 });
  }

  const declaredLength = Number(request.headers.get("content-length") ?? 0);
  // Photo limit plus generous room for the text fields and multipart framing.
  if (declaredLength > SNT_PHOTO_MAX_BYTES + 64 * 1024) {
    return NextResponse.json({ errors: { photo: "The photo must be 4 MB or smaller." } }, { status: 413 });
  }

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const values: SntRegistrationValues = {
    studentName: text(formData, "studentName"),
    applyingFor: text(formData, "applyingFor"),
    educationCompleted: text(formData, "educationCompleted"),
    schoolCollegeName: text(formData, "schoolCollegeName"),
    nativePlace: text(formData, "nativePlace"),
    phone: text(formData, "phone"),
    academicYear: text(formData, "academicYear"),
    companyWebsite: text(formData, "companyWebsite"),
    parentName: text(formData, "parentName"),
    medium: text(formData, "medium"),
    whatsapp: text(formData, "whatsapp"),
    dob: text(formData, "dob"),
    rulesAccepted: text(formData, "rulesAccepted") === "true",
    consentGiven: text(formData, "consentGiven") === "true",
  };

  if (isLikelyBot(values)) {
    return NextResponse.json({ id: randomUUID() }, { status: 201 });
  }

  const errors = validateSntRegistration(values);
  const photoFile = formData.get("photo");
  let photoBytes: Uint8Array | null = null;

  if (!(photoFile instanceof File) || photoFile.size === 0) {
    errors.photo = "Upload the student's passport photo.";
  } else if (photoFile.size > SNT_PHOTO_MAX_BYTES) {
    errors.photo = "The photo must be 4 MB or smaller.";
  } else {
    photoBytes = new Uint8Array(await photoFile.arrayBuffer());
  }

  const photoCheck = photoBytes ? validatePhotoBytes(photoBytes) : null;
  if (photoCheck && !photoCheck.ok) {
    errors.photo = photoCheck.error;
  }

  const dob = parseSntDob(values.dob);
  if (Object.keys(errors).length > 0 || !photoBytes || !photoCheck?.ok || !dob.ok) {
    return NextResponse.json({ errors }, { status: 422 });
  }

  const id = randomUUID();
  const photoPath = `${id}.${photoCheck.photo.extension}`;
  const supabase = createAdminClient();

  const { error: uploadError } = await supabase.storage.from(SNT_PHOTO_BUCKET).upload(photoPath, photoBytes, {
    contentType: photoCheck.photo.contentType,
    upsert: false,
  });

  if (uploadError) {
    console.error("Failed to store SNT photo:", uploadError);
    return NextResponse.json({ error: "Could not save the photo. Please try again." }, { status: 500 });
  }

  const { error: insertError } = await supabase.from("scholarship_registrations").insert({
    id,
    student_name: values.studentName.trim(),
    applying_for: values.applyingFor,
    education_completed: values.educationCompleted,
    medium: values.medium,
    school_name: values.schoolCollegeName.trim(),
    native_place: values.nativePlace.trim(),
    phone: normalizePhone(values.phone),
    whatsapp: resolveWhatsapp(values),
    parent_name: values.parentName.trim(),
    // Stored as an ISO date, never as the text the student typed.
    dob: dob.iso,
    academic_year: values.academicYear,
    // Never taken from the browser: there is one exam centre, fixed in content.
    centre: SNT_EXAM.centre.value,
    photo_path: photoPath,
    consent_given: true,
    consent_at: new Date().toISOString(),
    status: "pending",
    amount_paise: SNT_AMOUNT_PAISE,
  });

  if (insertError) {
    console.error("Failed to save SNT registration:", insertError);
    await supabase.storage.from(SNT_PHOTO_BUCKET).remove([photoPath]);
    return NextResponse.json(
      { error: "Something went wrong while saving your registration. Please try again." },
      { status: 500 },
    );
  }

  return NextResponse.json({ id }, { status: 201 });
}
