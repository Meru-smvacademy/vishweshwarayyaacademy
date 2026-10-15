// Hall ticket numbers are exactly 10 digits: the exam year followed by a
// 6-digit zero-padded sequence (2027000001). They are issued by the database
// (snt_mark_paid) only when a payment is confirmed; this module only checks them.

export const HALL_TICKET_PATTERN = /^[0-9]{10}$/;

export function isHallTicketNumber(value: string, examYear?: number): boolean {
  return HALL_TICKET_PATTERN.test(value) && (examYear === undefined || value.startsWith(String(examYear)));
}
