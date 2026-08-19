import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import {
  isLikelyBot,
  normalizePhone,
  validateEnquiry,
  type EnquiryFormValues,
} from "@/lib/validation/enquiry";

const DUPLICATE_KEY_ERROR_CODE = "23505";

function generateReferenceNo(): string {
  return `SMV-${Date.now().toString(36).toUpperCase()}`;
}

function buildEnquiryRow(values: EnquiryFormValues, referenceNo: string, phone: string) {
  return {
    reference_no: referenceNo,
    student_name: values.studentName.trim(),
    parent_name: values.parentName.trim(),
    phone,
    qualification: values.qualification,
    program: values.program,
    message: values.message.trim() || null,
    status: "New", // must match a value in the enquiries.status check constraint
    admin_notes: null,
  };
}

export async function POST(request: Request) {
  let values: EnquiryFormValues;

  try {
    values = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (isLikelyBot(values)) {
    return NextResponse.json({ referenceNo: generateReferenceNo() }, { status: 201 });
  }

  const errors = validateEnquiry(values);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ errors }, { status: 422 });
  }

  const normalizedPhone = normalizePhone(values.phone);
  const supabase = await createClient();

  // anon has an insert-only RLS policy on public.enquiries (no select), so
  // this intentionally never chains .select() after the insert.
  let referenceNo = generateReferenceNo();
  let { error: insertError } = await supabase
    .from("enquiries")
    .insert(buildEnquiryRow(values, referenceNo, normalizedPhone));

  if (insertError?.code === DUPLICATE_KEY_ERROR_CODE) {
    referenceNo = generateReferenceNo();
    ({ error: insertError } = await supabase
      .from("enquiries")
      .insert(buildEnquiryRow(values, referenceNo, normalizedPhone)));
  }

  if (insertError) {
    console.error("Failed to save admission enquiry:", insertError);
    return NextResponse.json(
      { error: "Something went wrong while submitting your enquiry. Please try again." },
      { status: 500 },
    );
  }

  return NextResponse.json({ referenceNo, phone: normalizedPhone }, { status: 201 });
}
