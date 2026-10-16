// Pure SNT Sports Meet rules. No runtime imports, so the unit tests can load
// this file directly with Node's type stripping; callers pass in the lists
// from src/content/sports.ts (the tests pass the very same lists).

export type SportsChoiceLists = {
  sports: readonly string[];
  athleticsEvents: readonly string[];
  levels: readonly string[];
  eligibleLevels: readonly string[];
};

export type SportsChoices = {
  sport: string;
  athleticsEvent: string;
  level: string;
  certificateDeclared: boolean;
  fitnessDeclared: boolean;
};

export type SportsChoiceErrors = Partial<
  Record<"sport" | "athleticsEvent" | "level" | "certificateDeclared" | "fitnessDeclared", string>
>;

export const SPORTS_CHOICE_ERRORS = {
  sport: "Select the sport.",
  athleticsEvent: "Select the athletics event.",
  level: "Select the highest level represented.",
  belowDistrict: "Only students who have represented at District level or above are eligible for the SNT Sports Meet.",
  certificateDeclared: "Confirm that the student holds a genuine certificate for the level selected and will bring the original.",
  fitnessDeclared:
    "Confirm that the student holds a medical fitness certificate from a government doctor and will bring the original.",
} as const;

/**
 * Sport, athletics event, level and the two declarations. The athletics event
 * is required only for Athletics; for any other sport it is ignored (see
 * normalizedAthleticsEvent). "Below district / none" always blocks.
 */
export function validateSportsChoices(values: SportsChoices, lists: SportsChoiceLists): SportsChoiceErrors {
  const errors: SportsChoiceErrors = {};

  if (!lists.sports.includes(values.sport)) {
    errors.sport = SPORTS_CHOICE_ERRORS.sport;
  } else if (values.sport === "Athletics" && !lists.athleticsEvents.includes(values.athleticsEvent)) {
    errors.athleticsEvent = SPORTS_CHOICE_ERRORS.athleticsEvent;
  }

  if (!lists.levels.includes(values.level)) {
    errors.level = SPORTS_CHOICE_ERRORS.level;
  } else if (!lists.eligibleLevels.includes(values.level)) {
    errors.level = SPORTS_CHOICE_ERRORS.belowDistrict;
  }

  if (values.certificateDeclared !== true) {
    errors.certificateDeclared = SPORTS_CHOICE_ERRORS.certificateDeclared;
  }
  if (values.fitnessDeclared !== true) {
    errors.fitnessDeclared = SPORTS_CHOICE_ERRORS.fitnessDeclared;
  }

  return errors;
}

/** The athletics event to store: only for Athletics, otherwise null. */
export function normalizedAthleticsEvent(sport: string, athleticsEvent: string): string | null {
  return sport === "Athletics" ? athleticsEvent : null;
}

// Entry card numbers: exactly 10 digits — event year, then '5', then a
// 5-digit sequence (2027500001). Exam hall tickets are year + 6 digits from
// 000001 (2027000001), so the two only meet past 499,999 exam registrations,
// which the database also refuses (sports_mark_paid).
export const ENTRY_CARD_PATTERN = /^[0-9]{4}5[0-9]{5}$/;

export function isEntryCardNumber(value: string, eventYear?: number): boolean {
  return ENTRY_CARD_PATTERN.test(value) && (eventYear === undefined || value.startsWith(String(eventYear)));
}

/** Mirrors sports_mark_paid: entryCardNumber(2027, 1) === "2027500001". */
export function entryCardNumber(eventYear: number, sequence: number): string {
  if (!Number.isInteger(sequence) || sequence < 1 || sequence > 99999) {
    throw new RangeError(`entry card sequence ${sequence} is outside 1–99999`);
  }
  return `${eventYear}5${String(sequence).padStart(5, "0")}`;
}

/** The instant registration closes, built with an explicit +05:30 (IST) offset. */
export function sportsRegistrationClosesAt(closes: { date: string; time: string }): Date {
  return new Date(`${closes.date}T${closes.time}:00+05:30`);
}

export function isSportsRegistrationOpen(closes: { date: string; time: string }, now: Date = new Date()): boolean {
  return now.getTime() < sportsRegistrationClosesAt(closes).getTime();
}
