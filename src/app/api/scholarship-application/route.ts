import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import {
  isLikelyBot,
  normalizePhone,
  validateScholarshipApplication,
  type ScholarshipApplicationValues,
} from "@/lib/validation/scholarshipApplication";

const DUPLICATE_KEY_ERROR_CODE = "23505";

function generateReferenceNo(): string {
  return `SNT-${Date.now().toString(36).toUpperCase()}`;
}

function buildApplicationRow(values: ScholarshipApplicationValues, referenceNo: string, phone: string) {
  return {
    reference_no: referenceNo,
    student_name: values.studentName.trim(),
    applying_for: values.applyingFor,
    education_completed: values.educationCompleted,
    school_college_name: values.schoolCollegeName.trim(),
    native_place: values.nativePlace.trim(),
    phone,
    academic_year: values.academicYear,
    status: "New", // must match a value in the scholarship_applications.status check constraint
    admin_notes: null,
  };
}

export async function POST(request: Request) {
  let values: ScholarshipApplicationValues;

  try {
    values = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (isLikelyBot(values)) {
    return NextResponse.json({ referenceNo: generateReferenceNo() }, { status: 201 });
  }

  const errors = validateScholarshipApplication(values);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ errors }, { status: 422 });
  }

  const normalizedPhone = normalizePhone(values.phone);
  const supabase = await createClient();

  // anon has an insert-only RLS policy on public.scholarship_applications (no
  // select), so this intentionally never chains .select() after the insert.
  let referenceNo = generateReferenceNo();
  let { error: insertError } = await supabase
    .from("scholarship_applications")
    .insert(buildApplicationRow(values, referenceNo, normalizedPhone));

  if (insertError?.code === DUPLICATE_KEY_ERROR_CODE) {
    referenceNo = generateReferenceNo();
    ({ error: insertError } = await supabase
      .from("scholarship_applications")
      .insert(buildApplicationRow(values, referenceNo, normalizedPhone)));
  }

  if (insertError) {
    console.error("Failed to save SNT scholarship application:", insertError);
    return NextResponse.json(
      { error: "Something went wrong while submitting your application. Please try again." },
      { status: 500 },
    );
  }

  return NextResponse.json({ referenceNo, phone: normalizedPhone }, { status: 201 });
}
