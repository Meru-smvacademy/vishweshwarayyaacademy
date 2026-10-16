import { ATHLETICS_EVENTS, ELIGIBLE_LEVELS, LEVELS, SPORTS, SPORTS_MEET } from "@/content/sports";
import { parseDob, type DobParseResult } from "@/lib/snt/dateOfBirth";
import { DOB_ERRORS } from "@/lib/validation/sntRegistration";
import { normalizePhone } from "@/lib/validation/scholarshipApplication";
import { validateSportsChoices, type SportsChoiceErrors } from "@/lib/sports/rules";

export type SportsRegistrationValues = {
  studentName: string;
  dob: string;
  schoolCollegeName: string;
  nativePlace: string;
  phone: string;
  whatsapp: string;
  parentName: string;
  sport: string;
  athleticsEvent: string;
  level: string;
  certificateDeclared: boolean;
  fitnessDeclared: boolean;
  consentGiven: boolean;
  companyWebsite: string;
};

export type SportsRegistrationFieldErrors = SportsChoiceErrors &
  Partial<
    Record<
      | "studentName"
      | "dob"
      | "schoolCollegeName"
      | "nativePlace"
      | "phone"
      | "whatsapp"
      | "parentName"
      | "consentGiven"
      | "photo"
      | "sportsCertificate"
      | "fitnessCertificate",
      string
    >
  >;

const PHONE_PATTERN = /^[6-9]\d{9}$/;

export const SPORTS_CHOICE_LISTS = {
  sports: SPORTS,
  athleticsEvents: ATHLETICS_EVENTS,
  levels: LEVELS,
  eligibleLevels: ELIGIBLE_LEVELS,
};

// The sports meet sets no age rule. This window only catches mistyped dates
// and places 2-digit years; it is not an eligibility rule.
const DOB_PLAUSIBLE = {
  on: new Date(`${SPORTS_MEET.eventDate}T00:00:00Z`),
  minAge: 8,
  maxAge: 40,
};

export const SPORTS_DOB_AGE_ERROR = "Check the date of birth — it looks incorrect.";

/** Day-first date of birth, same parser as the exam form. */
export function parseSportsDob(value: string): DobParseResult {
  return parseDob(value, DOB_PLAUSIBLE);
}

export function dobErrorMessage(reason: Exclude<DobParseResult, { ok: true }>["reason"]): string {
  return reason === "age" ? SPORTS_DOB_AGE_ERROR : DOB_ERRORS[reason];
}

export function validateSportsRegistration(values: SportsRegistrationValues): SportsRegistrationFieldErrors {
  const errors: SportsRegistrationFieldErrors = validateSportsChoices(values, SPORTS_CHOICE_LISTS);

  if (values.studentName.trim().length < 2) errors.studentName = "Enter the student's full name.";
  if (values.parentName.trim().length < 2) errors.parentName = "Enter the parent or guardian's name.";
  if (values.schoolCollegeName.trim().length < 2) errors.schoolCollegeName = "Enter the school or college name.";
  if (values.nativePlace.trim().length < 2) errors.nativePlace = "Enter the native place.";
  if (!PHONE_PATTERN.test(normalizePhone(values.phone))) errors.phone = "Enter a valid 10-digit mobile number.";
  if (values.whatsapp.trim() && !PHONE_PATTERN.test(normalizePhone(values.whatsapp))) {
    errors.whatsapp = "Enter a valid 10-digit WhatsApp number, or leave it empty.";
  }

  const dob = parseSportsDob(values.dob);
  if (!dob.ok) errors.dob = dobErrorMessage(dob.reason);

  if (values.consentGiven !== true) errors.consentGiven = "Parent/guardian consent is required to register.";

  return errors;
}
