// SNT Sports Meet date, times, venue and fee in English and Kannada, built
// once from SPORTS_MEET so /sports, the status page and the entry card agree.
import { SPORTS_MEET } from "@/content/sports";
import { SNT_KN, SPORTS_KN } from "@/content/scholarship-kn";
import { formatSntExamDate, formatSntTime, isValidSntTime } from "@/lib/snt/examSchedule";
import { kannadaDate, kannadaTime, type SntExamDetail } from "@/lib/snt/examDetails";

export type SportsEventDetail = SntExamDetail;

const TO_BE_ANNOUNCED = "To be announced";

function time(value: string | null): { en: string; kn: string } {
  return isValidSntTime(value)
    ? { en: formatSntTime(value), kn: kannadaTime(value) }
    : { en: TO_BE_ANNOUNCED, kn: SNT_KN.toBeAnnounced };
}

export const sportsEventDate = () => ({
  en: formatSntExamDate({ examDate: SPORTS_MEET.eventDate, reportingTime: null }),
  kn: kannadaDate(SPORTS_MEET.eventDate),
});

export function sportsEventDetails(): SportsEventDetail[] {
  const date = sportsEventDate();
  const reporting = time(SPORTS_MEET.times.reportingTime);
  const start = time(SPORTS_MEET.times.startTime);
  return [
    { label: "Date", labelKn: SPORTS_KN.detailLabels.eventDate, value: date.en, valueKn: date.kn },
    { label: "Reporting Time", labelKn: SPORTS_KN.detailLabels.reportingTime, value: reporting.en, valueKn: reporting.kn },
    { label: "Start Time", labelKn: SPORTS_KN.detailLabels.startTime, value: start.en, valueKn: start.kn },
    { label: "Entry Fee", labelKn: SPORTS_KN.detailLabels.fee, value: `₹${SPORTS_MEET.feeRupees}`, valueKn: `₹${SPORTS_MEET.feeRupees}` },
  ];
}

function closing() {
  const { date, time: at } = SPORTS_MEET.registrationCloses;
  return {
    en: { date: formatSntExamDate({ examDate: date, reportingTime: null }), time: formatSntTime(at) },
    kn: { date: kannadaDate(date), time: kannadaTime(at) },
  };
}

/** Shown on the form while registration is open. */
export function sportsRegistrationNotice(): { en: string; kn: string } {
  const c = closing();
  return {
    en: `Registration closes at ${c.en.time} on ${c.en.date}. Spot registration is allowed until then.`,
    kn: SPORTS_KN.registrationNotice(c.kn.date, c.kn.time),
  };
}

/** Shown once registration has closed. */
export function sportsRegistrationClosedDetail(): { en: string; kn: string } {
  const c = closing();
  return {
    en: `Registration closed at ${c.en.time} on ${c.en.date}. If you have already registered, use the link you received to download your entry card.`,
    kn: SPORTS_KN.registrationClosedDetail(c.kn.date, c.kn.time),
  };
}
