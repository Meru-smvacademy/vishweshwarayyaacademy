export const SCHOLARSHIP_STATUSES = [
  "New",
  "Contacted",
  "Registered",
  "Exam Attended",
  "Selected",
  "Not Selected",
] as const;

export type ScholarshipStatus = (typeof SCHOLARSHIP_STATUSES)[number];

export function isValidScholarshipStatus(value: string): value is ScholarshipStatus {
  return (SCHOLARSHIP_STATUSES as readonly string[]).includes(value);
}
