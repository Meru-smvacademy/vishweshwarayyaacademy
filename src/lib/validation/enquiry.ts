export const PROGRAMS = [
  "Foundation",
  "NEET Achievement",
  "NEET Long-Term",
  "JEE Achievement",
  "JEE Long-Term",
  "KCET Integrated",
];

export type EnquiryFormValues = {
  studentName: string;
  parentName: string;
  phone: string;
  qualification: string;
  program: string;
  message: string;
  companyWebsite: string;
};

export type EnquiryFieldErrors = Partial<
  Record<Exclude<keyof EnquiryFormValues, "message" | "companyWebsite">, string>
>;

const PHONE_PATTERN = /^[6-9]\d{9}$/;

export function normalizePhone(phone: string): string {
  return phone.replace(/\D/g, "").slice(-10);
}

export function validateEnquiry(values: EnquiryFormValues): EnquiryFieldErrors {
  const errors: EnquiryFieldErrors = {};

  if (values.studentName.trim().length < 2) {
    errors.studentName = "Enter the student's full name.";
  }

  if (values.parentName.trim().length < 2) {
    errors.parentName = "Enter the parent or guardian's full name.";
  }

  if (!PHONE_PATTERN.test(normalizePhone(values.phone))) {
    errors.phone = "Enter a valid 10-digit mobile number.";
  }

  if (!values.qualification) {
    errors.qualification = "Select the current class.";
  }

  if (!values.program) {
    errors.program = "Select the program you're interested in.";
  }

  return errors;
}

export function isLikelyBot(values: EnquiryFormValues): boolean {
  return values.companyWebsite.trim().length > 0;
}
