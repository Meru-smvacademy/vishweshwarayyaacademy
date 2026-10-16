import { SNT_EXAM } from "@/content/scholarship";
import { parseDob, type DobParseResult } from "@/lib/snt/dateOfBirth";
import { SNT_APPLYING_FOR_OPTIONS, SNT_EDUCATION_OPTIONS, SNT_MEDIUMS } from "@/lib/snt/constants";
import {
  normalizePhone,
  validateScholarshipApplication,
  type ScholarshipApplicationFieldErrors,
  type ScholarshipApplicationValues,
} from "@/lib/validation/scholarshipApplication";

export type SntRegistrationValues = ScholarshipApplicationValues & {
  parentName: string;
  medium: string;
  whatsapp: string;
  dob: string;
  rulesAccepted: boolean;
  consentGiven: boolean;
};

export type SntRegistrationFieldErrors = ScholarshipApplicationFieldErrors &
  Partial<Record<"parentName" | "medium" | "whatsapp" | "dob" | "rulesAccepted" | "consentGiven" | "photo", string>>;

const PHONE_PATTERN = /^[6-9]\d{9}$/;
export const DOB_ERRORS = {
  empty: "Enter the date of birth.",
  format: "Type the date of birth as DD-MM-YYYY, day first.",
  impossible: "This date does not exist. Check the day and the month.",
  // Must match SNT_EXAM.ageRule (and its Kannada in scholarship-kn.ts).
  age: "The student must be 12 to 20 years old on 3 January 2027. Check the date of birth.",
} as const;

const AGE_WINDOW = {
  on: new Date(`${SNT_EXAM.ageRule.on}T00:00:00Z`),
  minAge: SNT_EXAM.ageRule.minAge,
  maxAge: SNT_EXAM.ageRule.maxAge,
};

/** Reads the typed date of birth, day first, and checks the age on the exam day. */
export function parseSntDob(value: string): DobParseResult {
  return parseDob(value, AGE_WINDOW);
}

export function validateSntRegistration(values: SntRegistrationValues): SntRegistrationFieldErrors {
  const errors: SntRegistrationFieldErrors = validateScholarshipApplication(values);

  if (values.parentName.trim().length < 2) {
    errors.parentName = "Enter the parent or guardian's name.";
  }

  if (!(SNT_MEDIUMS as readonly string[]).includes(values.medium)) {
    errors.medium = "Select the medium of studying.";
  }

  if (values.whatsapp.trim() && !PHONE_PATTERN.test(normalizePhone(values.whatsapp))) {
    errors.whatsapp = "Enter a valid 10-digit WhatsApp number, or leave it empty.";
  }

  // Only the programme and class the SNT form offers; the shared lists keep older values for the admin filters.
  if (values.applyingFor && !SNT_APPLYING_FOR_OPTIONS.includes(values.applyingFor)) {
    errors.applyingFor = "Select the scholarship pathway you're applying for.";
  }

  if (!SNT_EDUCATION_OPTIONS.includes(values.educationCompleted)) {
    errors.educationCompleted = "Select the class you are currently studying in.";
  }

  const dob = parseSntDob(values.dob);
  if (!dob.ok) {
    errors.dob = DOB_ERRORS[dob.reason];
  }

  if (values.rulesAccepted !== true) {
    errors.rulesAccepted = "Please read and accept the rules and regulations.";
  }

  if (values.consentGiven !== true) {
    errors.consentGiven = "Parent/guardian consent is required to register.";
  }

  return errors;
}

export function resolveWhatsapp(values: Pick<SntRegistrationValues, "phone" | "whatsapp">): string {
  return values.whatsapp.trim() ? normalizePhone(values.whatsapp) : normalizePhone(values.phone);
}
