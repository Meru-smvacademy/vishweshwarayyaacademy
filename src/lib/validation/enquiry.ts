export type EnquiryFormValues = {
  name: string;
  phone: string;
  studentClass: string;
  targetExam: string;
  city: string;
  message: string;
  consent: boolean;
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

  if (values.name.trim().length < 2) {
    errors.name = "Enter the student's full name.";
  }

  if (!PHONE_PATTERN.test(normalizePhone(values.phone))) {
    errors.phone = "Enter a valid 10-digit mobile number.";
  }

  if (!values.studentClass) {
    errors.studentClass = "Select the current class.";
  }

  if (!values.targetExam) {
    errors.targetExam = "Select a target exam.";
  }

  if (!values.city.trim()) {
    errors.city = "Enter your city.";
  }

  if (!values.consent) {
    errors.consent = "Consent is required to submit an enquiry.";
  }

  return errors;
}

export function isLikelyBot(values: EnquiryFormValues): boolean {
  return values.companyWebsite.trim().length > 0;
}
