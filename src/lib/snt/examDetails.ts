// Exam date, reporting time, exam time and duration in English and Kannada,
// built once from SNT_EXAM so the registration page, the status page,
// /scholarship and the hall ticket can never disagree.
import { SNT_EXAM } from "@/content/scholarship";
import { SNT_KN } from "@/content/scholarship-kn";
import {
  formatSntExamDate,
  formatSntExamTime,
  formatSntReportingTime,
  formatSntTime,
  isValidSntDate,
  isValidSntTime,
} from "@/lib/snt/examSchedule";

export type SntExamDetail = { label: string; labelKn: string; value: string; valueKn: string };

/** "ಭಾನುವಾರ, 3 ಜನವರಿ 2027" (weekday first, like "Sunday, 3 January 2027") */
export function kannadaDate(isoDate: string): string {
  const [year, month, day] = isoDate.split("-").map(Number);
  // Midday IST is the same calendar day in UTC, so getUTCDay is the IST weekday.
  const weekday = new Date(`${isoDate}T12:00:00+05:30`).getUTCDay();
  return `${SNT_KN.weekdays[weekday]}, ${day} ${SNT_KN.months[month - 1]} ${year}`;
}

/** "ಬೆಳಿಗ್ಗೆ 10:30", "ಮಧ್ಯಾಹ್ನ 12:00" */
export function kannadaTime(time: string): string {
  const [hours, minutes] = time.split(":").map(Number);
  const part =
    hours < 12 ? SNT_KN.dayParts.morning
    : hours < 16 ? SNT_KN.dayParts.afternoon
    : hours < 19 ? SNT_KN.dayParts.evening
    : SNT_KN.dayParts.night;
  return `${part} ${hours % 12 === 0 ? 12 : hours % 12}:${String(minutes).padStart(2, "0")}`;
}

function examDateKn(): string {
  return isValidSntDate(SNT_EXAM.examDate) ? kannadaDate(SNT_EXAM.examDate) : SNT_KN.toBeAnnounced;
}

function reportingTimeKn(): string {
  return isValidSntTime(SNT_EXAM.reportingTime) ? kannadaTime(SNT_EXAM.reportingTime) : SNT_KN.toBeAnnounced;
}

function examTimeKn(): string {
  const { examStartTime, examEndTime } = SNT_EXAM;
  if (!isValidSntTime(examStartTime) || !isValidSntTime(examEndTime)) return SNT_KN.toBeAnnounced;
  return SNT_KN.examTimeRange(kannadaTime(examStartTime), kannadaTime(examEndTime));
}

export function sntExamDetails(): SntExamDetail[] {
  return [
    { label: "Exam Date", labelKn: SNT_KN.examDetailLabels.examDate, value: formatSntExamDate(SNT_EXAM), valueKn: examDateKn() },
    { label: "Reporting Time", labelKn: SNT_KN.examDetailLabels.reportingTime, value: formatSntReportingTime(SNT_EXAM), valueKn: reportingTimeKn() },
    { label: "Exam Time", labelKn: SNT_KN.examDetailLabels.examTime, value: formatSntExamTime(SNT_EXAM), valueKn: examTimeKn() },
    { label: "Duration", labelKn: SNT_KN.examDetailLabels.duration, value: SNT_EXAM.duration, valueKn: SNT_KN.duration },
  ];
}

const hasClosingTime = () => isValidSntDate(SNT_EXAM.examDate) && isValidSntTime(SNT_EXAM.reportingTime);

/** Shown on the form while registration is open. */
export function sntRegistrationNotice(): { en: string; kn: string } {
  if (!hasClosingTime()) {
    return {
      en: "Registration is open until the exam begins. Spot registration is allowed on the exam day at the centre.",
      kn: SNT_KN.registrationNoticeOpen,
    };
  }
  const time = formatSntTime(SNT_EXAM.reportingTime as string);
  return {
    en: `Registration closes at ${time} on ${formatSntExamDate(SNT_EXAM)}, the reporting time. Spot registration is allowed at the centre on the exam day until then.`,
    kn: SNT_KN.registrationNotice(examDateKn(), reportingTimeKn()),
  };
}

/** Shown once registration has closed. */
export function sntRegistrationClosedDetail(): { en: string; kn: string } {
  const after = "If you have already registered, use the link you received to download your hall ticket.";
  if (!hasClosingTime()) {
    return { en: `Registration for the SNT Scholarship Exam has closed. ${after}`, kn: SNT_KN.registrationClosed };
  }
  const time = formatSntTime(SNT_EXAM.reportingTime as string);
  return {
    en: `Registration closed at ${time} on ${formatSntExamDate(SNT_EXAM)}, the reporting time for the exam. ${after}`,
    kn: SNT_KN.registrationClosedDetail(examDateKn(), reportingTimeKn()),
  };
}
