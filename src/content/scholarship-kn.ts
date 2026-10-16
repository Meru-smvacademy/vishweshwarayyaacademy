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
  registrationNotice:
    "ಪರೀಕ್ಷೆ ಪ್ರಾರಂಭವಾಗುವವರೆಗೂ ನೋಂದಣಿ ತೆರೆದಿರುತ್ತದೆ. ಪರೀಕ್ಷೆಯ ದಿನ ಕೇಂದ್ರದಲ್ಲೇ ಸ್ಥಳದಲ್ಲೇ ನೋಂದಣಿ ಮಾಡಿಕೊಳ್ಳಲು ಅವಕಾಶವಿದೆ.",
  registrationClosed: "ಈ ಪರೀಕ್ಷೆಗೆ ನೋಂದಣಿ ಮುಕ್ತಾಯವಾಗಿದೆ.",
  registrationClosedDetail:
    "ಎಸ್‌ಎನ್‌ಟಿ ವಿದ್ಯಾರ್ಥಿವೇತನ ಪರೀಕ್ಷೆ ಪ್ರಾರಂಭವಾಗಿದೆ. ನೀವು ಈಗಾಗಲೇ ನೋಂದಾಯಿಸಿದ್ದರೆ, ನಿಮಗೆ ದೊರೆತ ಲಿಂಕ್ ಬಳಸಿ ಹಾಲ್ ಟಿಕೆಟ್ ಡೌನ್‌ಲೋಡ್ ಮಾಡಿಕೊಳ್ಳಿ.",
  aboutScholarship: "ಎಸ್‌ಎನ್‌ಟಿ ವಿದ್ಯಾರ್ಥಿವೇತನದ ಬಗ್ಗೆ",

  // Field labels
  labels: {
    photo: "ವಿದ್ಯಾರ್ಥಿಯ ಪಾಸ್‌ಪೋರ್ಟ್ ಅಳತೆಯ ಭಾವಚಿತ್ರ",
    studentName: "ವಿದ್ಯಾರ್ಥಿಯ ಹೆಸರು",
    parentName: "ತಂದೆ / ತಾಯಿ / ಪಾಲಕರ ಹೆಸರು",
    applyingFor: "ಅರ್ಜಿ ಸಲ್ಲಿಸುತ್ತಿರುವ ಕೋರ್ಸ್",
    educationCompleted: "ಪೂರ್ಣಗೊಳಿಸಿದ ಶಿಕ್ಷಣ",
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
    educationCompleted: "ತರಗತಿ ಆಯ್ಕೆಮಾಡಿ",
    medium: "ಮಾಧ್ಯಮ ಆಯ್ಕೆಮಾಡಿ",
  },

  // Dropdown options: English value (do not change) → Kannada
  options: {
    "NEET Achievement": "ನೀಟ್ ಅಚೀವ್‌ಮೆಂಟ್",
    "NEET Long-Term": "ನೀಟ್ ಲಾಂಗ್-ಟರ್ಮ್",
    "JEE Achievement": "ಜೆಇಇ ಅಚೀವ್‌ಮೆಂಟ್",
    "JEE Long-Term": "ಜೆಇಇ ಲಾಂಗ್-ಟರ್ಮ್",
    "Class 10": "10ನೇ ತರಗತಿ",
    "Class 12": "12ನೇ ತರಗತಿ (ದ್ವಿತೀಯ ಪಿಯುಸಿ)",
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
    "Select the education completed.": "ಪೂರ್ಣಗೊಳಿಸಿದ ಶಿಕ್ಷಣವನ್ನು ಆಯ್ಕೆಮಾಡಿ.",
    "Enter the school or college name.": "ಶಾಲೆ ಅಥವಾ ಕಾಲೇಜಿನ ಹೆಸರನ್ನು ನಮೂದಿಸಿ.",
    "Enter the native place.": "ಸ್ವಂತ ಊರಿನ ಹೆಸರನ್ನು ನಮೂದಿಸಿ.",
    "Enter a valid 10-digit mobile number.": "ಸರಿಯಾದ 10 ಅಂಕಿಯ ಮೊಬೈಲ್ ಸಂಖ್ಯೆಯನ್ನು ನಮೂದಿಸಿ.",
    "Select the academic year.": "ಶೈಕ್ಷಣಿಕ ವರ್ಷವನ್ನು ಆಯ್ಕೆಮಾಡಿ.",
    "Enter the parent or guardian's name.": "ತಂದೆ, ತಾಯಿ ಅಥವಾ ಪಾಲಕರ ಹೆಸರನ್ನು ನಮೂದಿಸಿ.",
    "Select the medium of studying.": "ಓದುತ್ತಿರುವ ಮಾಧ್ಯಮವನ್ನು ಆಯ್ಕೆಮಾಡಿ.",
    "Enter a valid 10-digit WhatsApp number, or leave it empty.":
      "ಸರಿಯಾದ 10 ಅಂಕಿಯ ವಾಟ್ಸಾಪ್ ಸಂಖ್ಯೆಯನ್ನು ನಮೂದಿಸಿ, ಅಥವಾ ಖಾಲಿ ಬಿಡಿ.",
    "Enter the date of birth.": "ಹುಟ್ಟಿದ ದಿನಾಂಕವನ್ನು ನಮೂದಿಸಿ.",
    "Check the date of birth — it looks incorrect.": "ಹುಟ್ಟಿದ ದಿನಾಂಕವನ್ನು ಪರಿಶೀಲಿಸಿ — ಅದು ತಪ್ಪಾಗಿರುವಂತಿದೆ.",
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

/** Kannada for an English option or error message, or undefined if there is none yet. */
export function kannadaFor(table: Record<string, string>, english: string): string | undefined {
  return table[english];
}
