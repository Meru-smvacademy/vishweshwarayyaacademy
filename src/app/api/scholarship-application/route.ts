import { NextResponse } from "next/server";
import {
  isLikelyBot,
  normalizePhone,
  validateScholarshipApplication,
  type ScholarshipApplicationValues,
} from "@/lib/validation/scholarshipApplication";

function generateReferenceNo(): string {
  return `SNT-${Date.now().toString(36).toUpperCase()}`;
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

  const referenceNo = generateReferenceNo();

  return NextResponse.json(
    { referenceNo, phone: normalizePhone(values.phone) },
    { status: 201 }
  );
}
