// SNT Sports Meet — event details shown on /sports and printed on the entry
// card. Separate from the SNT exam (src/content/scholarship.ts). No imports,
// so the unit tests can load this file directly with Node's type stripping.
// Kannada for everything here lives in scholarship-kn.ts (SPORTS_KN).

export const SPORTS_MEET = {
  name: "SNT SPORTS MEET 2027",
  academyName: "Sir M Vishweshwarayya NEET | JEE Academy",
  // Entry card numbers are this year + '5' + a 5-digit sequence: 2027500001.
  eventYear: 2027,
  eventDate: "2027-01-10", // "YYYY-MM-DD", IST
  feeRupees: 500,
  // Reporting and start time are not fixed yet: set either as 24-hour "HH:MM"
  // IST and the page and entry card show it; null shows "To be announced".
  times: {
    reportingTime: null as string | null,
    startTime: null as string | null,
  },
  // Provisional. Registration closes at exactly this instant, India Standard
  // Time; spot entry is allowed right up to it. A payment already in
  // progress before then still completes and still issues an entry card.
  registrationCloses: { date: "2027-01-10", time: "08:30" },
  venue: {
    name: "Sir M V NEET & JEE Academy",
    addressLines: [
      "Khazi Complex, Opposite Bayyapur Hospital",
      "Raichur Bypass Road, Lingasugur",
      "Raichur District, Karnataka 584122",
    ],
  },
  eligibilityNotice:
    "Only students who have represented at District level or above in the selected sport are eligible. A medical fitness certificate from a government doctor is compulsory.",
  registrationClosedMessage: "Registration for the SNT Sports Meet has closed.",
} as const;

// Exactly three sports; one per registration.
export const SPORTS = ["Volleyball", "Throw Ball", "Athletics"] as const;
export type Sport = (typeof SPORTS)[number];

// Shown and required only when the sport is Athletics.
export const ATHLETICS_EVENTS = [
  "100m",
  "200m",
  "400m",
  "800m",
  "1500m",
  "Long Jump",
  "High Jump",
  "Shot Put",
  "Discus Throw",
  "Javelin Throw",
] as const;

export const BELOW_DISTRICT = "Below district / none";
// Offered in the form in this order; only the first three are eligible.
export const LEVELS = ["District", "State", "National", BELOW_DISTRICT] as const;
export const ELIGIBLE_LEVELS = ["District", "State", "National"] as const;

/** WHAT TO BRING: compulsory, entry refused without them. Shown on /sports and on the entry card. */
export const WHAT_TO_BRING: { title: string; detail: string }[] = [
  { title: "ENTRY CARD", detail: "This card, printed. No entry without it." },
  { title: "AADHAAR CARD", detail: "Original." },
  {
    title: "MEDICAL FITNESS CERTIFICATE",
    detail: "Original, issued by a government doctor. Participation will not be allowed without it.",
  },
  {
    title: "SPORTS WEAR",
    detail: "Proper sports dress and shoes. Students not in sports wear will not be allowed to participate.",
  },
];

export const WHAT_TO_BRING_TITLE = "WHAT TO BRING — COMPULSORY";
export const WHAT_TO_BRING_INTRO = "Entry is refused without all four of these:";
export const WHAT_TO_BRING_ALSO =
  "Also bring the original sports certificate for the level declared at registration, for verification.";

export const SPORTS_RULES: string[] = [
  "Report 30 minutes before the scheduled time.",
  "The ₹500 entry fee is non-refundable and non-transferable.",
  "The academy's decision on eligibility and results is final.",
  "Changes to the date, time or venue will be informed by SMS or WhatsApp.",
];

// Fails the build if the entry card year and the event date disagree.
if (!SPORTS_MEET.eventDate.startsWith(`${SPORTS_MEET.eventYear}-`)) {
  throw new Error(`SPORTS_MEET.eventDate (${SPORTS_MEET.eventDate}) is not in SPORTS_MEET.eventYear (${SPORTS_MEET.eventYear}).`);
}
