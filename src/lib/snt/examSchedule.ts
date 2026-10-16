// Pure scheduling rules for the SNT exam. No imports, so the integration
// tests can load this file directly with Node's TypeScript type stripping.
//
// There is no earlier last date of registration: spot entry is allowed on
// the exam day right up to the reporting time, and registration closes at
// exactly that moment. Every instant is built with an explicit +05:30 offset,
// so the result never depends on the server's own time zone.

export type SntExamSchedule = {
  /** Exam day as "YYYY-MM-DD" (India Standard Time), or null while not announced. */
  examDate: string | null;
  /** Reporting time as 24-hour "HH:MM" IST, or null while not announced. */
  reportingTime: string | null;
};

const IST_OFFSET = "+05:30";
const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;
const TIME_PATTERN = /^([01]\d|2[0-3]):[0-5]\d$/;

function validDate(value: string | null): value is string {
  return value !== null && DATE_PATTERN.test(value) && !Number.isNaN(Date.parse(`${value}T00:00:00${IST_OFFSET}`));
}

function validTime(value: string | null): value is string {
  return value !== null && TIME_PATTERN.test(value);
}

/**
 * The instant new registrations stop being accepted. Null while the exam
 * date is unset (registration stays open). With a date but no reporting time
 * yet, registration stays open until the end of the exam day so spot entries
 * are never cut off early.
 */
export function sntRegistrationClosesAt(schedule: SntExamSchedule): Date | null {
  if (!validDate(schedule.examDate)) return null;
  if (!validTime(schedule.reportingTime)) {
    return new Date(`${schedule.examDate}T23:59:59.999${IST_OFFSET}`);
  }
  return new Date(`${schedule.examDate}T${schedule.reportingTime}:00${IST_OFFSET}`);
}

export function isSntRegistrationOpen(schedule: SntExamSchedule, now: Date = new Date()): boolean {
  const closesAt = sntRegistrationClosesAt(schedule);
  return closesAt === null || now.getTime() < closesAt.getTime();
}

export function formatSntExamDate(schedule: SntExamSchedule): string {
  if (!validDate(schedule.examDate)) return "To be announced";
  return new Date(`${schedule.examDate}T12:00:00${IST_OFFSET}`).toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Kolkata",
  });
}

export type SntExamTimes = {
  /** Exam start as 24-hour "HH:MM" IST, or null while not announced. */
  examStartTime: string | null;
  /** Exam end as 24-hour "HH:MM" IST, or null while not announced. */
  examEndTime: string | null;
};

/** "10:30 AM", "1:15 PM", and "12:00 noon" for midday. */
export function formatSntTime(time: string): string {
  if (time === "12:00") return "12:00 noon";
  const [hours, minutes] = time.split(":").map(Number);
  const suffix = hours < 12 ? "AM" : "PM";
  return `${hours % 12 === 0 ? 12 : hours % 12}:${String(minutes).padStart(2, "0")} ${suffix}`;
}

export function formatSntReportingTime(schedule: SntExamSchedule): string {
  if (!validTime(schedule.reportingTime)) return "To be announced";
  return formatSntTime(schedule.reportingTime);
}

/** "11:00 AM to 12:00 noon". */
export function formatSntExamTime(times: SntExamTimes): string {
  if (!validTime(times.examStartTime) || !validTime(times.examEndTime)) return "To be announced";
  return `${formatSntTime(times.examStartTime)} to ${formatSntTime(times.examEndTime)}`;
}

export function isValidSntTime(value: string | null): value is string {
  return validTime(value);
}

export function isValidSntDate(value: string | null): value is string {
  return validDate(value);
}
