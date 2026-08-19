export const SCHOLARSHIP_PATHWAYS = [
  "NEET Achievement",
  "NEET Long-Term",
  "JEE Achievement",
  "JEE Long-Term",
];

export const EDUCATION_COMPLETED_OPTIONS = ["Class 10", "Class 12"];

export const ACADEMIC_YEARS = ["2026–27", "2027–28"];

export const DEFAULT_ACADEMIC_YEAR = ACADEMIC_YEARS[0];

export type ScholarshipApplicationValues = {
  studentName: string;
  applyingFor: string;
  educationCompleted: string;
  schoolCollegeName: string;
  nativePlace: string;
  phone: string;
  academicYear: string;
  companyWebsite: string;
};

export type ScholarshipApplicationFieldErrors = Partial<
  Record<Exclude<keyof ScholarshipApplicationValues, "companyWebsite">, string>
>;

const PHONE_PATTERN = /^[6-9]\d{9}$/;

export function normalizePhone(phone: string): string {
  return phone.replace(/\D/g, "").slice(-10);
}

export function validateScholarshipApplication(
  values: ScholarshipApplicationValues
): ScholarshipApplicationFieldErrors {
  const errors: ScholarshipApplicationFieldErrors = {};

  if (values.studentName.trim().length < 2) {
    errors.studentName = "Enter the student's full name.";
  }

  if (!values.applyingFor) {
    errors.applyingFor = "Select the scholarship pathway you're applying for.";
  }

  if (!values.educationCompleted) {
    errors.educationCompleted = "Select the education completed.";
  }

  if (values.schoolCollegeName.trim().length < 2) {
    errors.schoolCollegeName = "Enter the school or college name.";
  }

  if (values.nativePlace.trim().length < 2) {
    errors.nativePlace = "Enter the native place.";
  }

  if (!PHONE_PATTERN.test(normalizePhone(values.phone))) {
    errors.phone = "Enter a valid 10-digit mobile number.";
  }

  if (!ACADEMIC_YEARS.includes(values.academicYear)) {
    errors.academicYear = "Select the academic year.";
  }

  return errors;
}

export function isLikelyBot(values: ScholarshipApplicationValues): boolean {
  return values.companyWebsite.trim().length > 0;
}
