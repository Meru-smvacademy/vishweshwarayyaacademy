import type { ContentBlock } from "@/content/shared";

export const LAST_UPDATED = "August 2026";

export type TermsSection = {
  title: string;
  blocks: ContentBlock[];
};

export const TERMS_SECTIONS: TermsSection[] = [
  {
    title: "1. Acceptance of Terms",
    blocks: [
      {
        type: "p",
        text: "These Terms & Conditions govern your use of this website and your relationship with Vishweshwarayya NEET | JEE Academy (\"we\", \"us\", or \"our\") as a prospective or enrolled student, or as a parent/guardian acting on a student's behalf.",
      },
      {
        type: "p",
        text: "By using this website or submitting an enquiry or admission form, you agree to be bound by these Terms & Conditions and our Privacy Policy.",
      },
    ],
  },
  {
    title: "2. Admissions",
    blocks: [
      {
        type: "p",
        text: "Admission to any program is at the sole discretion of the academy and is subject to seat availability, eligibility, and completion of the admission process described on our Admissions page.",
      },
      {
        type: "p",
        text: "Submitting an enquiry or admission form does not guarantee admission. Admission is confirmed only once counselling, program selection, and admission formalities are completed.",
      },
      {
        type: "p",
        text: "Information provided during enquiry or admission (student details, academic records, contact information) must be accurate. The academy is not responsible for delays or issues arising from incorrect information supplied by the applicant.",
      },
    ],
  },
  {
    title: "3. Fees & Payments",
    blocks: [
      {
        type: "p",
        text: "Fee structures, payment schedules, and applicable terms are communicated directly to students and parents during admission counselling and at the time of enrolment.",
      },
      {
        type: "p",
        text: "This website does not process online fee payments or financial transactions of any kind. All fee payments are made directly at the academy as per the schedule shared at enrolment.",
      },
      {
        type: "p",
        text: "Refund, transfer, or cancellation of fees is governed by the academy's admission policy communicated at enrolment, and not by this website.",
      },
    ],
  },
  {
    title: "4. Scholarships",
    blocks: [
      {
        type: "p",
        text: "The SNT Scholarship and any other scholarship offered by the academy are awarded through a transparent, merit-based selection process, as described on our SNT Scholarship page.",
      },
      {
        type: "p",
        text: "Scholarship decisions made by the academy's selection process are final. A scholarship is not transferable and cannot be exchanged for cash or applied retroactively.",
      },
      {
        type: "p",
        text: "The academy reserves the right to revise scholarship categories, benefits, or the selection process for future examination cycles.",
      },
    ],
  },
  {
    title: "5. Student Responsibilities",
    blocks: [
      {
        type: "p",
        text: "Students enrolled at Vishweshwarayya Academy are expected to:",
      },
      {
        type: "ul",
        items: [
          "Maintain regular attendance and punctuality",
          "Follow the academy's code of conduct and disciplinary guidelines",
          "Treat faculty, staff, and fellow students with respect",
          "Take reasonable care of academy property and infrastructure",
          "Keep their contact details and academic information up to date",
        ],
      },
      {
        type: "p",
        text: "Failure to meet these responsibilities may affect a student's continued enrolment, as determined by the academy's disciplinary policy communicated at enrolment.",
      },
    ],
  },
  {
    title: "6. Website Usage",
    blocks: [
      {
        type: "p",
        text: "This website is provided for prospective and current students, parents, and visitors to learn about our programs and to submit enquiries.",
      },
      {
        type: "p",
        text: "You agree not to misuse this website, including by submitting false information, attempting unauthorised access to any part of the site or its systems, or using automated tools to extract data from the website.",
      },
    ],
  },
  {
    title: "7. Intellectual Property",
    blocks: [
      {
        type: "p",
        text: "The content on this website — including text, images, the academy name, and logo — is the property of Vishweshwarayya NEET | JEE Academy and may not be copied, reproduced, or used without our prior written permission.",
      },
      {
        type: "p",
        text: "This website links to KRITPrep, a separate academic partner platform. KRITPrep's content and services are governed by KRITPrep's own terms, not by this document.",
      },
    ],
  },
  {
    title: "8. Limitation of Liability",
    blocks: [
      {
        type: "p",
        text: "This website and its content are provided on an \"as is\" basis. While we make reasonable efforts to keep information accurate and up to date, we do not guarantee that the website will be error-free or uninterrupted.",
      },
      {
        type: "p",
        text: "Submitting an enquiry, taking the SNT Scholarship examination, or using this website does not guarantee admission, a scholarship award, or any particular academic or examination outcome.",
      },
      {
        type: "p",
        text: "To the extent permitted by law, the academy is not liable for any indirect or consequential loss arising from the use of this website.",
      },
    ],
  },
  {
    title: "9. Changes to Terms",
    blocks: [
      {
        type: "p",
        text: "We may update these Terms & Conditions from time to time to reflect changes in our practices, programs, or policies, or for legal reasons. Any changes will be posted on this page, along with an updated revision date.",
      },
      {
        type: "p",
        text: "Continued use of this website after changes are posted constitutes acceptance of the updated Terms & Conditions.",
      },
    ],
  },
];

export const CONTACT_INTRO =
  "If you have questions about these Terms & Conditions, please contact us:";
