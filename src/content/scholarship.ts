import type { ContentBlock } from "@/content/shared";

export const INTRODUCTION: ContentBlock[] = [
  {
    type: "p",
    text: "The **SNT Scholarship** is a tribute to the enduring vision of **Late Shri Sayabanna N. Tegginamani**, who believed that education has the power to transform lives and strengthen society. His lifelong commitment to learning and service continues to inspire every initiative of Vishweshwarayya Academy.",
  },
  {
    type: "p",
    text: "To honor his legacy, the SNT Scholarship identifies and supports talented, hardworking students, ensuring that merit, dedication, and determination are recognized and encouraged for generations to come.",
  },
];

export const ABOUT: ContentBlock[] = [
  {
    type: "p",
    text: "Inspired by this vision, **Vishweshwarayya NEET | JEE Academy** continues the mission of empowering students through quality education, academic excellence, and equal opportunities for every deserving learner.",
  },
  {
    type: "p",
    text: "Today, the SNT Scholarship stands as a symbol of this commitment, encouraging young minds to dream bigger, work harder, and build a brighter future through education.",
  },
];

export const VISION: ContentBlock[] = [
  {
    type: "p",
    text: "To build a future where every deserving student, regardless of financial background, has the opportunity to pursue quality education, realize their full potential, and contribute meaningfully to society.",
  },
];

export const OBJECTIVES: string[] = [
  "Identify and encourage academically talented students.",
  "Reward merit, dedication, and consistent hard work.",
  "Provide opportunities for deserving students to pursue quality education.",
  "Promote a culture of excellence, discipline, and lifelong learning.",
  "Inspire students to become responsible professionals and citizens.",
];

export const ELIGIBILITY_INTRO: ContentBlock[] = [
  {
    type: "p",
    text: "The SNT Scholarship is open to students who have successfully completed **Class 10** or **Class 12** and aspire to prepare for competitive examinations through Vishweshwarayya Academy.",
  },
  { type: "p", text: "Selection is based on performance in the **SNT Scholarship Examination**." },
];

export const ELIGIBILITY_CATEGORIES: string[] = [
  "Students who have completed Class 10 and are seeking admission to the NEET/JEE Achievement Program.",
  "Students who have completed Class 12 and are seeking admission to the NEET Long-Term Program.",
];

export const ELIGIBILITY_NOTE =
  "Admission under the scholarship is granted only to students who qualify through the SNT Scholarship Examination and the selection process.";

export const CATEGORIES: ContentBlock[] = [
  {
    type: "p",
    text: "Scholarships are awarded based on a student's performance in the SNT Scholarship Examination and the final merit ranking.",
  },
  {
    type: "p",
    text: "Depending on the merit secured, selected students may receive different levels of scholarship support toward their academic program at Vishweshwarayya Academy.",
  },
  {
    type: "p",
    text: "The scholarship percentage and benefits are determined according to the official scholarship policy announced for that academic year.",
  },
];

export const SELECTION_PROCESS_INTRO =
  "The SNT Scholarship follows a transparent and merit-based selection process designed to identify deserving students.";

export type SelectionStep = { title: string; description: string };

export const SELECTION_STEPS: SelectionStep[] = [
  { title: "Register", description: "for the SNT Scholarship Examination." },
  { title: "Appear", description: "for the scholarship examination." },
  { title: "Merit Ranking", description: "is prepared based on examination performance." },
  {
    title: "Scholarship Award",
    description: "is announced according to the merit rank and scholarship policy for the academic year.",
  },
  {
    title: "Admission Confirmation",
    description: "is completed for eligible students who accept the scholarship.",
  },
];

export const BENEFITS_INTRO =
  "Selected students receive benefits based on their merit ranking and the scholarship policy for the academic year.";

export const BENEFITS: string[] = [
  "Merit-based scholarship on academic programs.",
  "Recognition for outstanding academic performance.",
  "Opportunity to study under expert faculty.",
  "Access to the KRIT Academic Ecosystem.",
  "Continuous academic guidance and mentoring.",
];

export const DOCUMENTS_INTRO =
  "Applicants are required to submit the following documents during the scholarship application process:";

export const DOCUMENTS: string[] = [
  "SSLC (Class 10) Hall Ticket",
  "NEET Hall Ticket (for Class 12/Long-Term applicants)",
  "NEET Application Form (for Class 12/Long-Term applicants)",
  "Recent Passport Size Photograph",
  "Aadhaar Card (if required for verification)",
];

export const DOCUMENTS_NOTE =
  "Additional documents, if any, will be communicated during the admission process.";

export const DATES_INTRO: ContentBlock[] = [
  {
    type: "p",
    text: "The schedule for the SNT Scholarship Examination is announced separately for each academic year.",
  },
  {
    type: "p",
    text: "Students are advised to regularly visit the official website or contact the admission office for updates regarding:",
  },
];

export const IMPORTANT_DATES: string[] = [
  "Scholarship Application Opening Date",
  "Last Date for Registration",
  "Scholarship Examination Date",
  "Result Announcement",
  "Admission & Scholarship Confirmation",
];

export type ScholarshipFaqItem = { question: string; answer: ContentBlock[] | null };

export const FAQS: ScholarshipFaqItem[] = [
  { question: "Who can apply for the SNT Scholarship?", answer: null },
  { question: "Is the scholarship based on merit?", answer: null },
  { question: "Is there any application fee?", answer: null },
  { question: "How is the scholarship awarded?", answer: null },
  { question: "Can students from any school apply?", answer: null },
];

export const CONTACT = {
  intro: "For scholarship enquiries, application support, or admission guidance, please contact:",
  closing:
    "Our admission team will be happy to assist you with the SNT Scholarship application process.",
};
