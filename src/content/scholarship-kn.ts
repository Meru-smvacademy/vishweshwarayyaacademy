// Kannada text for the SNT registration form (/scholarship/apply), the hall
// ticket and the registration status page — all in one place so the office
// can correct the wording without touching any component.
//
// DRAFT: written by the developer, not yet reviewed by a native speaker.
// Please have the office check every line before real students see it.
//
// Editing rules:
// - Change only the Kannada text inside the quotes.
// - In `options` and `errors`, the LEFT side (English) must stay exactly as it
//   is: it is how the form finds the Kannada for that option or message.
// - Some words contain an invisible "zero-width non-joiner" character (e.g. in
//   ಪಾಸ್‌ಪೋರ್ಟ್). Keep it when editing those words, or the letters join wrongly.

export const SNT_KN = {
  pageTitle: "ಎಸ್‌ಎನ್‌ಟಿ ವಿದ್ಯಾರ್ಥಿವೇತನಕ್ಕೆ ಅರ್ಜಿ ಸಲ್ಲಿಸಿ",
  pageSubtitle: "ನಿಮ್ಮ ಶೈಕ್ಷಣಿಕ ಪಯಣದತ್ತ ಮೊದಲ ಹೆಜ್ಜೆ ಇಡಿ.",

  // Exam centre block
  examCentre: "ಪರೀಕ್ಷಾ ಕೇಂದ್ರ",
  centreName: "ಸರ್ ಎಂ ವಿ ನೀಟ್ ಮತ್ತು ಜೆಇಇ ಅಕಾಡೆಮಿ",
  centreAddressLines: [
    "ಖಾಜಿ ಕಾಂಪ್ಲೆಕ್ಸ್, ಬಯ್ಯಾಪುರ ಆಸ್ಪತ್ರೆ ಎದುರು",
    "ರಾಯಚೂರು ಬೈಪಾಸ್ ರಸ್ತೆ, ಲಿಂಗಸುಗೂರು",
    "ರಾಯಚೂರು ಜಿಲ್ಲೆ, ಕರ್ನಾಟಕ 584122",
  ],
  // Shown while no exam date or reporting time is set.
  registrationNoticeOpen:
    "ಪರೀಕ್ಷೆ ಪ್ರಾರಂಭವಾಗುವವರೆಗೂ ನೋಂದಣಿ ತೆರೆದಿರುತ್ತದೆ. ಪರೀಕ್ಷೆಯ ದಿನ ಕೇಂದ್ರದಲ್ಲೇ ಸ್ಥಳದಲ್ಲೇ ನೋಂದಣಿ ಮಾಡಿಕೊಳ್ಳಲು ಅವಕಾಶವಿದೆ.",
  // `date` is e.g. "ಭಾನುವಾರ, 3 ಜನವರಿ 2027" and `time` e.g. "ಬೆಳಿಗ್ಗೆ 10:30" — both
  // are filled in from SNT_EXAM, so keep the ${...} parts when editing.
  registrationNotice: (date: string, time: string) =>
    `ನೋಂದಣಿ ${date} ರಂದು ${time}ಕ್ಕೆ (ಪರೀಕ್ಷೆಗೆ ಹಾಜರಾಗಬೇಕಾದ ಸಮಯ) ಮುಕ್ತಾಯವಾಗುತ್ತದೆ. ಪರೀಕ್ಷೆಯ ದಿನ ಆ ಸಮಯದವರೆಗೂ ಕೇಂದ್ರದಲ್ಲೇ ಸ್ಥಳದಲ್ಲೇ ನೋಂದಣಿ ಮಾಡಿಕೊಳ್ಳಲು ಅವಕಾಶವಿದೆ.`,
  registrationClosed: "ಈ ಪರೀಕ್ಷೆಗೆ ನೋಂದಣಿ ಮುಕ್ತಾಯವಾಗಿದೆ.",
  registrationClosedDetail: (date: string, time: string) =>
    `ನೋಂದಣಿ ${date} ರಂದು ${time}ಕ್ಕೆ (ಪರೀಕ್ಷೆಗೆ ಹಾಜರಾಗಬೇಕಾದ ಸಮಯ) ಮುಕ್ತಾಯವಾಗಿದೆ. ನೀವು ಈಗಾಗಲೇ ನೋಂದಾಯಿಸಿದ್ದರೆ, ನಿಮಗೆ ದೊರೆತ ಲಿಂಕ್ ಬಳಸಿ ಹಾಲ್ ಟಿಕೆಟ್ ಡೌನ್‌ಲೋಡ್ ಮಾಡಿಕೊಳ್ಳಿ.`,

  // Documents to bring: hall ticket NOTICE box and the documents rule. Same
  // order as DOCUMENTS in scholarship.ts.
  documentsToBring: [
    "ಶಾಲೆ ಅಥವಾ ಕಾಲೇಜಿನ ಗುರುತಿನ ಚೀಟಿ",
    "ಆಧಾರ್ ಕಾರ್ಡ್",
    "ಗುರುತಿನ ಚೀಟಿ ಇಲ್ಲದಿದ್ದರೆ, ಅದರ ಬದಲಿಗೆ ಮುಖ್ಯೋಪಾಧ್ಯಾಯರ ಪ್ರಮಾಣಪತ್ರ",
  ],
  documentsNotice:
    "ಈ ಹಾಲ್ ಟಿಕೆಟ್ ಮತ್ತು ಈ ದಾಖಲೆಗಳನ್ನು ಪರೀಕ್ಷಾ ಕೊಠಡಿಗೆ ತನ್ನಿ: (1) ಶಾಲೆ ಅಥವಾ ಕಾಲೇಜಿನ ಗುರುತಿನ ಚೀಟಿ, (2) ಆಧಾರ್ ಕಾರ್ಡ್, (3) ಗುರುತಿನ ಚೀಟಿ ಇಲ್ಲದಿದ್ದರೆ, ಅದರ ಬದಲಿಗೆ ಮುಖ್ಯೋಪಾಧ್ಯಾಯರ ಪ್ರಮಾಣಪತ್ರ. ಈ ದಾಖಲೆಗಳಿಲ್ಲದ ವಿದ್ಯಾರ್ಥಿಗಳಿಗೆ ಪರೀಕ್ಷೆ ಬರೆಯಲು ಅವಕಾಶ ನೀಡದಿರಬಹುದು.",

  // Exam details (registration page, /scholarship, status page, hall ticket)
  examDetailsTitle: "ಪರೀಕ್ಷೆಯ ವಿವರಗಳು",
  examDetailLabels: {
    examDate: "ಪರೀಕ್ಷೆಯ ದಿನಾಂಕ",
    reportingTime: "ಹಾಜರಾಗಬೇಕಾದ ಸಮಯ",
    examTime: "ಪರೀಕ್ಷೆಯ ಸಮಯ",
    duration: "ಪರೀಕ್ಷೆಯ ಅವಧಿ",
  },
  duration: "1 ಗಂಟೆ",
  toBeAnnounced: "ಶೀಘ್ರದಲ್ಲೇ ಪ್ರಕಟಿಸಲಾಗುವುದು",
  // Sunday first, as JavaScript counts days.
  weekdays: ["ಭಾನುವಾರ", "ಸೋಮವಾರ", "ಮಂಗಳವಾರ", "ಬುಧವಾರ", "ಗುರುವಾರ", "ಶುಕ್ರವಾರ", "ಶನಿವಾರ"],
  // Written before the clock time: "ಬೆಳಿಗ್ಗೆ 10:30", "ಮಧ್ಯಾಹ್ನ 12:00".
  dayParts: { morning: "ಬೆಳಿಗ್ಗೆ", afternoon: "ಮಧ್ಯಾಹ್ನ", evening: "ಸಂಜೆ", night: "ರಾತ್ರಿ" },
  examTimeRange: (start: string, end: string) => `${start} ರಿಂದ ${end} ರವರೆಗೆ`,

  eligibilityTitle: "ಅರ್ಹತೆ",
  eligibilityNotice:
    "ಪ್ರಸ್ತುತ 10ನೇ ತರಗತಿ (ಎಸ್‌ಎಸ್‌ಎಲ್‌ಸಿ) ಪರೀಕ್ಷೆಗೆ ಹಾಜರಾಗುತ್ತಿರುವ ವಿದ್ಯಾರ್ಥಿಗಳು ಮಾತ್ರ ಈ ವಿದ್ಯಾರ್ಥಿವೇತನ ಪರೀಕ್ಷೆಗೆ ಅರ್ಹರು.",
  aboutScholarship: "ಎಸ್‌ಎನ್‌ಟಿ ವಿದ್ಯಾರ್ಥಿವೇತನದ ಬಗ್ಗೆ",

  // Field labels
  labels: {
    photo: "ವಿದ್ಯಾರ್ಥಿಯ ಪಾಸ್‌ಪೋರ್ಟ್ ಅಳತೆಯ ಭಾವಚಿತ್ರ",
    studentName: "ವಿದ್ಯಾರ್ಥಿಯ ಹೆಸರು",
    parentName: "ತಂದೆ / ತಾಯಿ / ಪಾಲಕರ ಹೆಸರು",
    applyingFor: "ಅರ್ಜಿ ಸಲ್ಲಿಸುತ್ತಿರುವ ಕೋರ್ಸ್",
    currentClass: "ಪ್ರಸ್ತುತ ಓದುತ್ತಿರುವ ತರಗತಿ",
    medium: "ಓದುತ್ತಿರುವ ಮಾಧ್ಯಮ",
    schoolCollegeName: "ಶಾಲೆ / ಕಾಲೇಜಿನ ಹೆಸರು",
    nativePlace: "ಸ್ವಂತ ಊರು",
    dob: "ಹುಟ್ಟಿದ ದಿನಾಂಕ",
    phone: "ಫೋನ್ ಸಂಖ್ಯೆ",
    whatsapp: "ವಾಟ್ಸಾಪ್ ಸಂಖ್ಯೆ (ಐಚ್ಛಿಕ)",
    academicYear: "ಶೈಕ್ಷಣಿಕ ವರ್ಷ",
  },

  // First (empty) choice in each dropdown
  selectPrompts: {
    applyingFor: "ಕೋರ್ಸ್ ಆಯ್ಕೆಮಾಡಿ",
    currentClass: "ತರಗತಿ ಆಯ್ಕೆಮಾಡಿ",
    medium: "ಮಾಧ್ಯಮ ಆಯ್ಕೆಮಾಡಿ",
  },

  // Dropdown options: English value (do not change) → Kannada
  options: {
    "NEET Achievement": "ನೀಟ್ ಅಚೀವ್‌ಮೆಂಟ್",
    "NEET Long-Term": "ನೀಟ್ ಲಾಂಗ್-ಟರ್ಮ್",
    "JEE Achievement": "ಜೆಇಇ ಅಚೀವ್‌ಮೆಂಟ್",
    "JEE Long-Term": "ಜೆಇಇ ಲಾಂಗ್-ಟರ್ಮ್",
    "10th Standard (SSLC)": "10ನೇ ತರಗತಿ (ಎಸ್‌ಎಸ್‌ಎಲ್‌ಸಿ)",
    Kannada: "ಕನ್ನಡ",
    English: "ಇಂಗ್ಲಿಷ್",
    Urdu: "ಉರ್ದು",
    Other: "ಇತರೆ",
  } as Record<string, string>,

  // Date of birth: helper under the field, and month names for the
  // "3 January 2010 / 3 ಜನವರಿ 2010" confirmation shown once a valid date is typed.
  dobHelp: "ಮೊದಲು ದಿನ, ನಂತರ ತಿಂಗಳು, ನಂತರ ವರ್ಷ: ದಿನ-ತಿಂಗಳು-ವರ್ಷ (DD-MM-YYYY). ಉದಾ: 03-01-2010 ಅಂದರೆ 3 ಜನವರಿ 2010.",
  months: [
    "ಜನವರಿ", "ಫೆಬ್ರವರಿ", "ಮಾರ್ಚ್", "ಏಪ್ರಿಲ್", "ಮೇ", "ಜೂನ್",
    "ಜುಲೈ", "ಆಗಸ್ಟ್", "ಸೆಪ್ಟೆಂಬರ್", "ಅಕ್ಟೋಬರ್", "ನವೆಂಬರ್", "ಡಿಸೆಂಬರ್",
  ],

  // Photo
  photoHelp: "ಇತ್ತೀಚಿನ ಪಾಸ್‌ಪೋರ್ಟ್ ಅಳತೆಯ ಭಾವಚಿತ್ರ · JPG ಅಥವಾ PNG · ಗರಿಷ್ಠ 4 MB. ಇದನ್ನು ಹಾಲ್ ಟಿಕೆಟ್‌ನಲ್ಲಿ ಮುದ್ರಿಸಲಾಗುತ್ತದೆ.",
  uploadPhoto: "ಭಾವಚಿತ್ರ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ",
  changePhoto: "ಭಾವಚಿತ್ರ ಬದಲಿಸಿ",
  processingPhoto: "ಸಿದ್ಧಪಡಿಸಲಾಗುತ್ತಿದೆ…",

  // Checkboxes
  rulesAccepted: "ನಾನು ನಿಯಮಗಳು ಮತ್ತು ನಿಬಂಧನೆಗಳನ್ನು ಓದಿದ್ದೇನೆ",
  consent:
    "ನಾನು ವಿದ್ಯಾರ್ಥಿಯ ತಂದೆ/ತಾಯಿ/ಪಾಲಕ, ಅಥವಾ ನನಗೆ ನನ್ನ ತಂದೆ/ತಾಯಿ/ಪಾಲಕರ ಅನುಮತಿ ಇದೆ. ಈ ವಿದ್ಯಾರ್ಥಿವೇತನ ಪರೀಕ್ಷೆ, ಹಾಲ್ ಟಿಕೆಟ್ ಮತ್ತು ಫಲಿತಾಂಶ ಪ್ರಕಟಣೆಗಾಗಿ ವಿದ್ಯಾರ್ಥಿಯ ಭಾವಚಿತ್ರ ಮತ್ತು ವಿವರಗಳನ್ನು ಬಳಸಲು ನಾನು ಒಪ್ಪುತ್ತೇನೆ.",

  // Fee line, submit button, submit failure
  feeLine: (fee: number) =>
    `ನೋಂದಣಿ ಶುಲ್ಕ ₹${fee} ಅನ್ನು ಮುಂದಿನ ಹಂತದಲ್ಲಿ ಪಾವತಿಸಬೇಕು. ಪಾವತಿ ದೃಢಪಟ್ಟ ನಂತರವೇ ಹಾಲ್ ಟಿಕೆಟ್ ನೀಡಲಾಗುತ್ತದೆ.`,
  submit: (fee: number) => `ನೋಂದಾಯಿಸಿ ಮತ್ತು ₹${fee} ಪಾವತಿಸಿ`,
  submitting: "ಉಳಿಸಲಾಗುತ್ತಿದೆ…",
  submitFailed: "ಸಲ್ಲಿಸುವಾಗ ಏನೋ ತಪ್ಪಾಗಿದೆ. ದಯವಿಟ್ಟು ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ, ಅಥವಾ ನಮಗೆ ನೇರವಾಗಿ ಕರೆ ಮಾಡಿ.",

  // Hall ticket (PDF and status page)
  hallTicketNumber: "ಹಾಲ್ ಟಿಕೆಟ್ ಸಂಖ್ಯೆ",

  // Error messages: exact English message (do not change) → Kannada
  errors: {
    "Enter the student's full name.": "ವಿದ್ಯಾರ್ಥಿಯ ಪೂರ್ಣ ಹೆಸರನ್ನು ನಮೂದಿಸಿ.",
    "Select the scholarship pathway you're applying for.": "ನೀವು ಅರ್ಜಿ ಸಲ್ಲಿಸುತ್ತಿರುವ ಕೋರ್ಸ್ ಆಯ್ಕೆಮಾಡಿ.",
    "Select the class you are currently studying in.": "ನೀವು ಪ್ರಸ್ತುತ ಓದುತ್ತಿರುವ ತರಗತಿಯನ್ನು ಆಯ್ಕೆಮಾಡಿ.",
    "Enter the school or college name.": "ಶಾಲೆ ಅಥವಾ ಕಾಲೇಜಿನ ಹೆಸರನ್ನು ನಮೂದಿಸಿ.",
    "Enter the native place.": "ಸ್ವಂತ ಊರಿನ ಹೆಸರನ್ನು ನಮೂದಿಸಿ.",
    "Enter a valid 10-digit mobile number.": "ಸರಿಯಾದ 10 ಅಂಕಿಯ ಮೊಬೈಲ್ ಸಂಖ್ಯೆಯನ್ನು ನಮೂದಿಸಿ.",
    "Select the academic year.": "ಶೈಕ್ಷಣಿಕ ವರ್ಷವನ್ನು ಆಯ್ಕೆಮಾಡಿ.",
    "Enter the parent or guardian's name.": "ತಂದೆ, ತಾಯಿ ಅಥವಾ ಪಾಲಕರ ಹೆಸರನ್ನು ನಮೂದಿಸಿ.",
    "Select the medium of studying.": "ಓದುತ್ತಿರುವ ಮಾಧ್ಯಮವನ್ನು ಆಯ್ಕೆಮಾಡಿ.",
    "Enter a valid 10-digit WhatsApp number, or leave it empty.":
      "ಸರಿಯಾದ 10 ಅಂಕಿಯ ವಾಟ್ಸಾಪ್ ಸಂಖ್ಯೆಯನ್ನು ನಮೂದಿಸಿ, ಅಥವಾ ಖಾಲಿ ಬಿಡಿ.",
    "Enter the date of birth.": "ಹುಟ್ಟಿದ ದಿನಾಂಕವನ್ನು ನಮೂದಿಸಿ.",
    "The student must be 12 to 20 years old on 3 January 2027. Check the date of birth.":
      "3 ಜನವರಿ 2027 ರಂದು ವಿದ್ಯಾರ್ಥಿಯ ವಯಸ್ಸು 12 ರಿಂದ 20 ವರ್ಷಗಳ ನಡುವೆ ಇರಬೇಕು. ಹುಟ್ಟಿದ ದಿನಾಂಕವನ್ನು ಪರಿಶೀಲಿಸಿ.",
    "Type the date of birth as DD-MM-YYYY, day first.":
      "ಹುಟ್ಟಿದ ದಿನಾಂಕವನ್ನು ದಿನ-ತಿಂಗಳು-ವರ್ಷ (DD-MM-YYYY) ರೂಪದಲ್ಲಿ, ಮೊದಲು ದಿನ ಬರೆಯಿರಿ.",
    "This date does not exist. Check the day and the month.":
      "ಈ ದಿನಾಂಕ ಅಸ್ತಿತ್ವದಲ್ಲಿಲ್ಲ. ದಿನ ಮತ್ತು ತಿಂಗಳನ್ನು ಪರಿಶೀಲಿಸಿ.",
    "Please read and accept the rules and regulations.": "ದಯವಿಟ್ಟು ನಿಯಮಗಳು ಮತ್ತು ನಿಬಂಧನೆಗಳನ್ನು ಓದಿ ಒಪ್ಪಿಕೊಳ್ಳಿ.",
    "Parent/guardian consent is required to register.": "ನೋಂದಣಿಗೆ ತಂದೆ/ತಾಯಿ/ಪಾಲಕರ ಒಪ್ಪಿಗೆ ಕಡ್ಡಾಯ.",
    "Upload the student's passport photo.": "ವಿದ್ಯಾರ್ಥಿಯ ಪಾಸ್‌ಪೋರ್ಟ್ ಅಳತೆಯ ಭಾವಚಿತ್ರವನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ.",
    "Upload a JPG or PNG photo.": "JPG ಅಥವಾ PNG ಭಾವಚಿತ್ರವನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ.",
    "The photo must be 4 MB or smaller.": "ಭಾವಚಿತ್ರ 4 MB ಅಥವಾ ಅದಕ್ಕಿಂತ ಕಡಿಮೆ ಇರಬೇಕು.",
    "The photo must be a JPG or PNG image.": "ಭಾವಚಿತ್ರ JPG ಅಥವಾ PNG ಚಿತ್ರವಾಗಿರಬೇಕು.",
    "This file is not a valid image. Upload a JPG or PNG photo.":
      "ಇದು ಸರಿಯಾದ ಚಿತ್ರ ಫೈಲ್ ಅಲ್ಲ. JPG ಅಥವಾ PNG ಭಾವಚಿತ್ರವನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ.",
    "The photo is too small. Upload a clearer passport photo.":
      "ಭಾವಚಿತ್ರ ತುಂಬಾ ಚಿಕ್ಕದಾಗಿದೆ. ಸ್ಪಷ್ಟವಾದ ಪಾಸ್‌ಪೋರ್ಟ್ ಅಳತೆಯ ಭಾವಚಿತ್ರವನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ.",
    "The photo is larger than 600 × 800 pixels.": "ಭಾವಚಿತ್ರ 600 × 800 ಪಿಕ್ಸೆಲ್‌ಗಿಂತ ದೊಡ್ಡದಾಗಿದೆ.",
    "Could not process the photo. Try a different browser.":
      "ಭಾವಚಿತ್ರವನ್ನು ಸಿದ್ಧಪಡಿಸಲು ಆಗಲಿಲ್ಲ. ಬೇರೆ ಬ್ರೌಸರ್ ಬಳಸಿ ಪ್ರಯತ್ನಿಸಿ.",
  } as Record<string, string>,
};

// ===========================================================================
// SNT Sports Meet (/sports, the entry card and its status page)
// ===========================================================================
// DRAFT: written by the developer, not yet reviewed by a native speaker.
// Please have the office check every line before real students see it.
// Same editing rules as SNT_KN above: change only the Kannada; in `options`
// and `errors` the English on the LEFT must stay exactly as it is.

export const SPORTS_KN = {
  eventName: "ಎಸ್‌ಎನ್‌ಟಿ ಕ್ರೀಡಾಕೂಟ 2027",
  pageTitle: "ಎಸ್‌ಎನ್‌ಟಿ ಕ್ರೀಡಾಕೂಟ 2027ಕ್ಕೆ ನೋಂದಾಯಿಸಿ",
  pageSubtitle: "ವಾಲಿಬಾಲ್, ಥ್ರೋಬಾಲ್ ಮತ್ತು ಅಥ್ಲೆಟಿಕ್ಸ್.",

  eligibilityNotice:
    "ಆಯ್ಕೆಮಾಡಿದ ಕ್ರೀಡೆಯಲ್ಲಿ ಜಿಲ್ಲಾ ಮಟ್ಟ ಅಥವಾ ಅದಕ್ಕಿಂತ ಮೇಲಿನ ಮಟ್ಟದಲ್ಲಿ ಪ್ರತಿನಿಧಿಸಿದ ವಿದ್ಯಾರ್ಥಿಗಳು ಮಾತ್ರ ಅರ್ಹರು. ಸರ್ಕಾರಿ ವೈದ್ಯರಿಂದ ಪಡೆದ ವೈದ್ಯಕೀಯ ದೃಢತೆ ಪ್ರಮಾಣಪತ್ರ ಕಡ್ಡಾಯ.",

  // Event details
  venue: "ಸ್ಥಳ",
  detailLabels: {
    eventDate: "ದಿನಾಂಕ",
    reportingTime: "ಹಾಜರಾಗಬೇಕಾದ ಸಮಯ",
    startTime: "ಪ್ರಾರಂಭದ ಸಮಯ",
    fee: "ಪ್ರವೇಶ ಶುಲ್ಕ",
  },
  // `date` e.g. "ಭಾನುವಾರ, 10 ಜನವರಿ 2027", `time` e.g. "ಬೆಳಿಗ್ಗೆ 8:30". Keep the ${...} parts.
  registrationNotice: (date: string, time: string) =>
    `ನೋಂದಣಿ ${date} ರಂದು ${time}ಕ್ಕೆ ಮುಕ್ತಾಯವಾಗುತ್ತದೆ. ಆ ಸಮಯದವರೆಗೂ ಸ್ಥಳದಲ್ಲೇ ನೋಂದಣಿ ಮಾಡಿಕೊಳ್ಳಲು ಅವಕಾಶವಿದೆ.`,
  registrationClosed: "ಎಸ್‌ಎನ್‌ಟಿ ಕ್ರೀಡಾಕೂಟಕ್ಕೆ ನೋಂದಣಿ ಮುಕ್ತಾಯವಾಗಿದೆ.",
  registrationClosedDetail: (date: string, time: string) =>
    `ನೋಂದಣಿ ${date} ರಂದು ${time}ಕ್ಕೆ ಮುಕ್ತಾಯವಾಗಿದೆ. ನೀವು ಈಗಾಗಲೇ ನೋಂದಾಯಿಸಿದ್ದರೆ, ನಿಮಗೆ ದೊರೆತ ಲಿಂಕ್ ಬಳಸಿ ಪ್ರವೇಶ ಪತ್ರವನ್ನು ಡೌನ್‌ಲೋಡ್ ಮಾಡಿಕೊಳ್ಳಿ.`,

  // Field labels (the rest — name, date of birth, school, phone… — come from SNT_KN.labels)
  labels: {
    sport: "ಕ್ರೀಡೆ",
    athleticsEvent: "ಅಥ್ಲೆಟಿಕ್ಸ್ ಸ್ಪರ್ಧೆ",
    level: "ಪ್ರತಿನಿಧಿಸಿದ ಅತ್ಯುನ್ನತ ಮಟ್ಟ",
    sportsCertificate: "ಕ್ರೀಡಾ ಪ್ರಮಾಣಪತ್ರ (ಐಚ್ಛಿಕ)",
    fitnessCertificate: "ವೈದ್ಯಕೀಯ ದೃಢತೆ ಪ್ರಮಾಣಪತ್ರ (ಐಚ್ಛಿಕ)",
  },
  selectPrompts: {
    sport: "ಕ್ರೀಡೆ ಆಯ್ಕೆಮಾಡಿ",
    athleticsEvent: "ಸ್ಪರ್ಧೆ ಆಯ್ಕೆಮಾಡಿ",
    level: "ಮಟ್ಟ ಆಯ್ಕೆಮಾಡಿ",
  },
  // Dropdown options: English value (do not change) → Kannada
  options: {
    Volleyball: "ವಾಲಿಬಾಲ್",
    "Throw Ball": "ಥ್ರೋಬಾಲ್",
    Athletics: "ಅಥ್ಲೆಟಿಕ್ಸ್",
    "100m": "100 ಮೀ ಓಟ",
    "200m": "200 ಮೀ ಓಟ",
    "400m": "400 ಮೀ ಓಟ",
    "800m": "800 ಮೀ ಓಟ",
    "1500m": "1500 ಮೀ ಓಟ",
    "Long Jump": "ಉದ್ದ ಜಿಗಿತ",
    "High Jump": "ಎತ್ತರ ಜಿಗಿತ",
    "Shot Put": "ಗುಂಡು ಎಸೆತ",
    "Discus Throw": "ಚಕ್ರ ಎಸೆತ",
    "Javelin Throw": "ಭರ್ಜಿ ಎಸೆತ",
    District: "ಜಿಲ್ಲಾ ಮಟ್ಟ",
    State: "ರಾಜ್ಯ ಮಟ್ಟ",
    National: "ರಾಷ್ಟ್ರೀಯ ಮಟ್ಟ",
    "Below district / none": "ಜಿಲ್ಲಾ ಮಟ್ಟಕ್ಕಿಂತ ಕೆಳಗೆ / ಇಲ್ಲ",
  } as Record<string, string>,

  // Declarations (both required)
  certificateDeclaration:
    "ಆಯ್ಕೆಮಾಡಿದ ಮಟ್ಟಕ್ಕೆ ವಿದ್ಯಾರ್ಥಿಯ ಬಳಿ ನಿಜವಾದ ಪ್ರಮಾಣಪತ್ರವಿದೆ ಮತ್ತು ಅದರ ಮೂಲ ಪ್ರತಿಯನ್ನು ಕ್ರೀಡಾಕೂಟಕ್ಕೆ ತರುತ್ತಾರೆ.",
  fitnessDeclaration:
    "ವಿದ್ಯಾರ್ಥಿಯ ಬಳಿ ಸರ್ಕಾರಿ ವೈದ್ಯರು ನೀಡಿದ ವೈದ್ಯಕೀಯ ದೃಢತೆ ಪ್ರಮಾಣಪತ್ರವಿದೆ ಮತ್ತು ಅದರ ಮೂಲ ಪ್ರತಿಯನ್ನು ಕ್ರೀಡಾಕೂಟಕ್ಕೆ ತರುತ್ತಾರೆ.",

  // Photo and certificate uploads
  photoHelp: "ಇತ್ತೀಚಿನ ಪಾಸ್‌ಪೋರ್ಟ್ ಅಳತೆಯ ಭಾವಚಿತ್ರ · JPG ಅಥವಾ PNG · ಗರಿಷ್ಠ 4 MB. ಇದನ್ನು ಪ್ರವೇಶ ಪತ್ರದಲ್ಲಿ ಮುದ್ರಿಸಲಾಗುತ್ತದೆ.",
  documentHelp: "ಐಚ್ಛಿಕ · JPG, PNG ಅಥವಾ PDF · ಗರಿಷ್ಠ 2 MB. ಮೂಲ ಪ್ರತಿಯನ್ನು ಕ್ರೀಡಾಕೂಟಕ್ಕೆ ತರಲೇಬೇಕು.",
  uploadFile: "ಫೈಲ್ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ",
  changeFile: "ಫೈಲ್ ಬದಲಿಸಿ",
  removeFile: "ತೆಗೆದುಹಾಕಿ",

  // WHAT TO BRING (page and back of the entry card), same order as WHAT_TO_BRING
  whatToBringTitle: "ತರಬೇಕಾದವು — ಕಡ್ಡಾಯ",
  whatToBringIntro: "ಈ ನಾಲ್ಕನ್ನೂ ತರದಿದ್ದರೆ ಪ್ರವೇಶ ನಿರಾಕರಿಸಲಾಗುತ್ತದೆ:",
  whatToBring: [
    "ಪ್ರವೇಶ ಪತ್ರ — ಈ ಪತ್ರವನ್ನು ಮುದ್ರಿಸಿ ತನ್ನಿ. ಇದಿಲ್ಲದೆ ಪ್ರವೇಶವಿಲ್ಲ.",
    "ಆಧಾರ್ ಕಾರ್ಡ್ — ಮೂಲ ಪ್ರತಿ.",
    "ವೈದ್ಯಕೀಯ ದೃಢತೆ ಪ್ರಮಾಣಪತ್ರ — ಸರ್ಕಾರಿ ವೈದ್ಯರು ನೀಡಿದ ಮೂಲ ಪ್ರತಿ. ಇದಿಲ್ಲದೆ ಭಾಗವಹಿಸಲು ಅವಕಾಶವಿಲ್ಲ.",
    "ಕ್ರೀಡಾ ಉಡುಪು — ಸರಿಯಾದ ಕ್ರೀಡಾ ಉಡುಪು ಮತ್ತು ಶೂಗಳು. ಕ್ರೀಡಾ ಉಡುಪಿನಲ್ಲಿ ಇಲ್ಲದ ವಿದ್ಯಾರ್ಥಿಗಳಿಗೆ ಭಾಗವಹಿಸಲು ಅವಕಾಶವಿಲ್ಲ.",
  ],
  whatToBringAlso: "ನೋಂದಣಿಯಲ್ಲಿ ತಿಳಿಸಿದ ಮಟ್ಟದ ಕ್ರೀಡಾ ಪ್ರಮಾಣಪತ್ರದ ಮೂಲ ಪ್ರತಿಯನ್ನೂ ಪರಿಶೀಲನೆಗಾಗಿ ತನ್ನಿ.",

  // Rules on the back of the entry card, same order as SPORTS_RULES
  rulesTitle: "ನಿಯಮಗಳು",
  rules: [
    "ನಿಗದಿತ ಸಮಯಕ್ಕಿಂತ 30 ನಿಮಿಷ ಮುಂಚಿತವಾಗಿ ಹಾಜರಾಗಿ.",
    "₹500 ಪ್ರವೇಶ ಶುಲ್ಕವನ್ನು ಹಿಂತಿರುಗಿಸಲಾಗುವುದಿಲ್ಲ ಮತ್ತು ಬೇರೆಯವರಿಗೆ ವರ್ಗಾಯಿಸಲಾಗುವುದಿಲ್ಲ.",
    "ಅರ್ಹತೆ ಮತ್ತು ಫಲಿತಾಂಶಗಳ ಬಗ್ಗೆ ಅಕಾಡೆಮಿಯ ನಿರ್ಧಾರವೇ ಅಂತಿಮ.",
    "ದಿನಾಂಕ, ಸಮಯ ಅಥವಾ ಸ್ಥಳದಲ್ಲಿನ ಬದಲಾವಣೆಗಳನ್ನು SMS ಅಥವಾ ವಾಟ್ಸಾಪ್ ಮೂಲಕ ತಿಳಿಸಲಾಗುವುದು.",
  ],

  consent:
    "ನಾನು ವಿದ್ಯಾರ್ಥಿಯ ತಂದೆ/ತಾಯಿ/ಪಾಲಕ, ಅಥವಾ ನನಗೆ ನನ್ನ ತಂದೆ/ತಾಯಿ/ಪಾಲಕರ ಅನುಮತಿ ಇದೆ. ಎಸ್‌ಎನ್‌ಟಿ ಕ್ರೀಡಾಕೂಟ, ಪ್ರವೇಶ ಪತ್ರ ಮತ್ತು ಫಲಿತಾಂಶ ಪ್ರಕಟಣೆಗಾಗಿ ವಿದ್ಯಾರ್ಥಿಯ ಭಾವಚಿತ್ರ, ಪ್ರಮಾಣಪತ್ರಗಳು ಮತ್ತು ವಿವರಗಳನ್ನು ಬಳಸಲು ನಾನು ಒಪ್ಪುತ್ತೇನೆ.",

  // Payment / status page
  registrationComplete: "ನೋಂದಣಿ ಪೂರ್ಣಗೊಂಡಿದೆ",
  paymentIncomplete: "ಪಾವತಿ ಪೂರ್ಣಗೊಂಡಿಲ್ಲ — ನೋಂದಣಿ ಅಪೂರ್ಣ. ಪ್ರವೇಶ ಪತ್ರ ನೀಡಲಾಗಿಲ್ಲ.",
  downloadCard: "ಪ್ರವೇಶ ಪತ್ರ ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ (PDF)",
  payNow: (fee: number) => `ಈಗ ₹${fee} ಪಾವತಿಸಿ`,

  // Entry card
  entryCardNumber: "ಪ್ರವೇಶ ಪತ್ರ ಸಂಖ್ಯೆ",
  fitnessDeclaredLine: "ಸರ್ಕಾರಿ ವೈದ್ಯರ ವೈದ್ಯಕೀಯ ದೃಢತೆ ಪ್ರಮಾಣಪತ್ರ: ನೋಂದಣಿಯಲ್ಲಿ ಘೋಷಿಸಲಾಗಿದೆ — ಮೂಲ ಪ್ರತಿಯನ್ನು ತನ್ನಿ.",

  // Fee line and submit failure on the form
  feeLine: (fee: number) =>
    `ಪ್ರವೇಶ ಶುಲ್ಕ ₹${fee} ಅನ್ನು ಮುಂದಿನ ಹಂತದಲ್ಲಿ ಪಾವತಿಸಬೇಕು. ಪಾವತಿ ದೃಢಪಟ್ಟ ನಂತರವೇ ಪ್ರವೇಶ ಪತ್ರ ನೀಡಲಾಗುತ್ತದೆ.`,

  // Error messages: exact English message (do not change) → Kannada
  errors: {
    "Select the sport.": "ಕ್ರೀಡೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ.",
    "Select the athletics event.": "ಅಥ್ಲೆಟಿಕ್ಸ್ ಸ್ಪರ್ಧೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ.",
    "Select the highest level represented.": "ಪ್ರತಿನಿಧಿಸಿದ ಅತ್ಯುನ್ನತ ಮಟ್ಟವನ್ನು ಆಯ್ಕೆಮಾಡಿ.",
    "Only students who have represented at District level or above are eligible for the SNT Sports Meet.":
      "ಜಿಲ್ಲಾ ಮಟ್ಟ ಅಥವಾ ಅದಕ್ಕಿಂತ ಮೇಲಿನ ಮಟ್ಟದಲ್ಲಿ ಪ್ರತಿನಿಧಿಸಿದ ವಿದ್ಯಾರ್ಥಿಗಳು ಮಾತ್ರ ಎಸ್‌ಎನ್‌ಟಿ ಕ್ರೀಡಾಕೂಟಕ್ಕೆ ಅರ್ಹರು.",
    "Confirm that the student holds a genuine certificate for the level selected and will bring the original.":
      "ಆಯ್ಕೆಮಾಡಿದ ಮಟ್ಟಕ್ಕೆ ನಿಜವಾದ ಪ್ರಮಾಣಪತ್ರವಿದೆ ಮತ್ತು ಮೂಲ ಪ್ರತಿಯನ್ನು ತರುತ್ತೀರಿ ಎಂದು ದೃಢಪಡಿಸಿ.",
    "Confirm that the student holds a medical fitness certificate from a government doctor and will bring the original.":
      "ಸರ್ಕಾರಿ ವೈದ್ಯರ ವೈದ್ಯಕೀಯ ದೃಢತೆ ಪ್ರಮಾಣಪತ್ರವಿದೆ ಮತ್ತು ಮೂಲ ಪ್ರತಿಯನ್ನು ತರುತ್ತೀರಿ ಎಂದು ದೃಢಪಡಿಸಿ.",
    "Check the date of birth — it looks incorrect.": "ಹುಟ್ಟಿದ ದಿನಾಂಕವನ್ನು ಪರಿಶೀಲಿಸಿ — ಅದು ತಪ್ಪಾಗಿರುವಂತಿದೆ.",
    "The certificate must be a JPG, PNG or PDF file.": "ಪ್ರಮಾಣಪತ್ರವು JPG, PNG ಅಥವಾ PDF ಫೈಲ್ ಆಗಿರಬೇಕು.",
    "The certificate must be 2 MB or smaller.": "ಪ್ರಮಾಣಪತ್ರವು 2 MB ಅಥವಾ ಅದಕ್ಕಿಂತ ಕಡಿಮೆ ಇರಬೇಕು.",
    "The files are too large together. Use smaller certificate files.":
      "ಎಲ್ಲಾ ಫೈಲ್‌ಗಳು ಸೇರಿ ತುಂಬಾ ದೊಡ್ಡದಾಗಿವೆ. ಚಿಕ್ಕ ಪ್ರಮಾಣಪತ್ರ ಫೈಲ್‌ಗಳನ್ನು ಬಳಸಿ.",
    "Registration for the SNT Sports Meet has closed.": "ಎಸ್‌ಎನ್‌ಟಿ ಕ್ರೀಡಾಕೂಟಕ್ಕೆ ನೋಂದಣಿ ಮುಕ್ತಾಯವಾಗಿದೆ.",
  } as Record<string, string>,
};

/** Kannada for an English option or error message, or undefined if there is none yet. */
export function kannadaFor(table: Record<string, string>, english: string): string | undefined {
  return table[english];
}
