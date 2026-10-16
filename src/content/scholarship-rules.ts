// SNT Scholarship Exam — Rules and Regulations.
//
// This is the single source for the rules printed on page 2 of every hall
// ticket and in the downloadable rules PDF linked from the application form.
// The office can edit the text below without touching any PDF code: each
// string is one numbered rule, and long rules wrap automatically.
//
// TODO(office): Kannada translation. This file holds English only. Adding
// Kannada needs a translated string per rule here AND a Kannada font (e.g.
// Noto Sans Kannada) in src/assets/fonts — the current PDF fonts have no
// Kannada glyphs.

import { SNT_EXAM } from "@/content/scholarship";
import { formatSntTime } from "@/lib/snt/examSchedule";

// "by 10:30 AM, 30 minutes before the exam begins at 11:00 AM" — filled in
// from SNT_EXAM so the rules always match the hall ticket front.
const toMinutes = (time: string) => {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
};
const reportingRule =
  SNT_EXAM.reportingTime && SNT_EXAM.examStartTime
    ? `Report at the exam centre by the reporting time, ${formatSntTime(SNT_EXAM.reportingTime)}, which is ${toMinutes(SNT_EXAM.examStartTime) - toMinutes(SNT_EXAM.reportingTime)} minutes before the exam begins at ${formatSntTime(SNT_EXAM.examStartTime)}.`
    : "Report at the exam centre by the reporting time printed on this hall ticket, 30 minutes before the exam begins.";

export const SCHOLARSHIP_RULES_TITLE = "Rules and Regulations";

export const SCHOLARSHIP_RULES: string[] = [
  `Eligibility: ${SNT_EXAM.eligibilityNotice}`,
  "Bring this hall ticket, your school/college ID card and your Aadhaar card to the exam hall. If you do not have a school/college ID card, bring a certificate from your Head Master stating the class you are studying in. Students without these documents may not be allowed to write the exam.",
  `${reportingRule} Students arriving after the exam begins will not be admitted.`,
  "Bring your own blue or black ball pen and a writing pad. Nothing will be shared in the hall.",
  "Mobile phones, smart watches, calculators, bluetooth devices, books and notes are not allowed inside the exam hall.",
  "The question paper will be in the medium of study you selected while registering. This cannot be changed at the centre.",
  "Follow the invigilator's instructions at all times, and do not leave the hall before the exam ends. Copying, impersonation or any other malpractice will lead to disqualification without refund.",
  "Keep this hall ticket safely until the results are announced and the scholarship is confirmed. The ₹500 registration fee is non-refundable and non-transferable.",
];

export const SCHOLARSHIP_RULES_FOOTNOTE =
  "The exam date, reporting time or centre may change. Any change will be sent by SMS/WhatsApp to the mobile number given at registration and announced on sirmv.academy. In all matters of eligibility, evaluation and award of scholarships, the decision of Sir M V NEET & JEE Academy is final.";
