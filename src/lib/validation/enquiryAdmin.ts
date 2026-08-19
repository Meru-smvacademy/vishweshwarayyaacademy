export const ENQUIRY_STATUSES = ["New", "Contacted", "Follow-up", "Converted", "Closed"] as const;

export type EnquiryStatus = (typeof ENQUIRY_STATUSES)[number];

export function isValidEnquiryStatus(value: string): value is EnquiryStatus {
  return (ENQUIRY_STATUSES as readonly string[]).includes(value);
}
