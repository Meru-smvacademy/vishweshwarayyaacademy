import { SNT_CENTRES, SNT_MEDIUMS } from "@/lib/snt/constants";
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
  centre: string;
  rulesAccepted: boolean;
  consentGiven: boolean;
};

export type SntRegistrationFieldErrors = ScholarshipApplicationFieldErrors &
  Partial<Record<"parentName" | "medium" | "whatsapp" | "dob" | "centre" | "rulesAccepted" | "consentGiven" | "photo", string>>;

const PHONE_PATTERN = /^[6-9]\d{9}$/;
const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;
const MIN_AGE_YEARS = 10;
const MAX_AGE_YEARS = 30;

function parseIsoDate(value: string): Date | null {
  if (!DATE_PATTERN.test(value)) return null;
  const date = new Date(`${value}T00:00:00Z`);
  // Rejects dates like 2010-02-31 that Date would silently roll over.
  return Number.isNaN(date.getTime()) || date.toISOString().slice(0, 10) !== value ? null : date;
}

function ageInYears(dob: Date, today: Date): number {
  let age = today.getUTCFullYear() - dob.getUTCFullYear();
  const beforeBirthday =
    today.getUTCMonth() < dob.getUTCMonth() ||
    (today.getUTCMonth() === dob.getUTCMonth() && today.getUTCDate() < dob.getUTCDate());
  if (beforeBirthday) age -= 1;
  return age;
}

export function validateSntRegistration(
  values: SntRegistrationValues,
  today: Date = new Date(),
): SntRegistrationFieldErrors {
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

  const dob = parseIsoDate(values.dob);
  if (!dob) {
    errors.dob = "Enter the date of birth.";
  } else {
    const age = ageInYears(dob, today);
    if (age < MIN_AGE_YEARS || age > MAX_AGE_YEARS) {
      errors.dob = "Check the date of birth — it looks incorrect.";
    }
  }

  if (!(SNT_CENTRES as readonly string[]).includes(values.centre)) {
    errors.centre = "Select an exam centre.";
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
