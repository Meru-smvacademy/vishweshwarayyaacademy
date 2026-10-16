// Reads a date of birth typed as free text. No imports, so the unit tests can
// load this file directly with Node's TypeScript type stripping.
//
// Always DAY first (Indian convention): 03-01-2010 is 3 January 2010, never
// 1 March. Accepted shapes:
//   - day, month, year split by / - . or spaces: 3-1-2010, 03/01/2010, 3.1.10, 3 1 2010
//   - no separator: DDMMYYYY (03012010) or DDMMYY (030110)
// A 2-digit year becomes 19xx or 20xx, whichever puts the student inside the
// age window (e.g. 12–20 on the exam day). Any date outside the window, 2- or
// 4-digit year, is reported as "age".

export type AgeWindow = {
  /** The day the age is counted on, e.g. the exam day (UTC midnight). */
  on: Date;
  minAge: number;
  maxAge: number;
};

export type DobParseResult =
  | { ok: true; iso: string; day: number; month: number; year: number }
  | { ok: false; reason: "empty" | "format" | "impossible" | "age" };

const SEPARATED = /^(\d{1,2})[\s/.-]+(\d{1,2})[\s/.-]+(\d{2}|\d{4})$/;
const COMPACT = /^(\d{2})(\d{2})(\d{2}|\d{4})$/;

export const ENGLISH_MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function isRealDate(year: number, month: number, day: number): boolean {
  if (month < 1 || month > 12 || day < 1) return false;
  const daysInMonth = new Date(Date.UTC(year, month, 0)).getUTCDate();
  return day <= daysInMonth;
}

export function ageOn(year: number, month: number, day: number, on: Date): number {
  let age = on.getUTCFullYear() - year;
  const beforeBirthday =
    on.getUTCMonth() + 1 < month || (on.getUTCMonth() + 1 === month && on.getUTCDate() < day);
  if (beforeBirthday) age -= 1;
  return age;
}

function toIso(year: number, month: number, day: number): string {
  return `${String(year).padStart(4, "0")}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

function fitsWindow(year: number, month: number, day: number, ageWindow: AgeWindow): boolean {
  const age = ageOn(year, month, day, ageWindow.on);
  return age >= ageWindow.minAge && age <= ageWindow.maxAge;
}

export function parseDob(input: string, ageWindow: AgeWindow): DobParseResult {
  const text = input.trim();
  if (!text) return { ok: false, reason: "empty" };

  const match = SEPARATED.exec(text) ?? COMPACT.exec(text);
  if (!match) return { ok: false, reason: "format" };

  const day = Number(match[1]);
  const month = Number(match[2]);
  const yearText = match[3];

  let year: number;
  if (yearText.length === 4) {
    year = Number(yearText);
    if (!isRealDate(year, month, day)) return { ok: false, reason: "impossible" };
    if (!fitsWindow(year, month, day, ageWindow)) return { ok: false, reason: "age" };
  } else {
    const twoDigits = Number(yearText);
    const candidates = [1900 + twoDigits, 2000 + twoDigits];
    // 29-02-yy is real in one century and not the other, so check each century on its own.
    const real = candidates.filter((y) => isRealDate(y, month, day));
    if (real.length === 0) return { ok: false, reason: "impossible" };
    const fitting = real.find((y) => fitsWindow(y, month, day, ageWindow));
    if (fitting === undefined) return { ok: false, reason: "age" };
    year = fitting;
  }

  return { ok: true, iso: toIso(year, month, day), day, month, year };
}

/** "3 January 2010", or with Kannada month names "3 ಜನವರಿ 2010". */
export function formatDobInWords(
  dob: { day: number; month: number; year: number },
  monthNames: readonly string[] = ENGLISH_MONTHS,
): string {
  return `${dob.day} ${monthNames[dob.month - 1]} ${dob.year}`;
}
