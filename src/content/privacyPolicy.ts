import type { ContentBlock } from "@/content/shared";

export const LAST_UPDATED = "August 2026";

export type PrivacySection = {
  title: string;
  blocks: ContentBlock[];
};

export const PRIVACY_SECTIONS: PrivacySection[] = [
  {
    title: "1. Introduction",
    blocks: [
      {
        type: "p",
        text: "Vishweshwarayya NEET | JEE Academy (\"we\", \"us\", or \"our\") operates this website to share information about our NEET, JEE, and KCET coaching programs and to allow prospective students and parents to enquire about admissions.",
      },
      {
        type: "p",
        text: "This Privacy Policy explains what information we collect, how we use it, and the choices you have. By using this website or submitting an enquiry, you agree to the practices described here.",
      },
    ],
  },
  {
    title: "2. Information We Collect",
    blocks: [
      {
        type: "p",
        text: "We collect information you choose to share with us, primarily through the Admission Enquiry form and other enquiry forms on this website:",
      },
      {
        type: "ul",
        items: [
          "Student's full name",
          "Phone number",
          "Current class / academic stage",
          "Target exam (NEET, JEE, KCET, or Foundation)",
          "City",
          "Any additional message you choose to provide",
        ],
      },
      {
        type: "p",
        text: "We do not collect payment details, government ID numbers, or other sensitive personal data through this website.",
      },
    ],
  },
  {
    title: "3. How We Use Your Information",
    blocks: [
      {
        type: "p",
        text: "The information you share with us is used to:",
      },
      {
        type: "ul",
        items: [
          "Respond to your enquiry and share information about our programs",
          "Contact you by phone call, SMS, WhatsApp, or email regarding admissions",
          "Maintain records required for our admissions process",
          "Improve our website and the services we offer",
        ],
      },
      {
        type: "p",
        text: "We do not use your information for any purpose unrelated to admissions and academy communication.",
      },
    ],
  },
  {
    title: "4. Information Sharing",
    blocks: [
      {
        type: "p",
        text: "We do not sell, rent, or trade your personal information to third parties.",
      },
      {
        type: "p",
        text: "Your information is accessed only by our admissions and academic staff to respond to your enquiry. We may share information with service providers who help us operate the website or manage enquiries, and only to the extent necessary for them to perform that service.",
      },
      {
        type: "p",
        text: "We may disclose information if required to do so by law.",
      },
    ],
  },
  {
    title: "5. Data Security",
    blocks: [
      {
        type: "p",
        text: "We take reasonable technical and organisational measures to protect the information you share with us from unauthorised access, alteration, or disclosure.",
      },
      {
        type: "p",
        text: "No method of transmission over the internet is completely secure, and while we work to protect your information, we cannot guarantee absolute security.",
      },
    ],
  },
  {
    title: "6. Cookies",
    blocks: [
      {
        type: "p",
        text: "This website may use cookies and similar technologies to remember your preferences, understand how visitors use the site, and improve your browsing experience.",
      },
      {
        type: "p",
        text: "You can choose to disable cookies through your browser settings. Some parts of the website may not function as intended if cookies are disabled.",
      },
    ],
  },
  {
    title: "7. Third-Party Services",
    blocks: [
      {
        type: "p",
        text: "Our website links to KRITPrep, our academic partner platform for practice tests and learning resources. We are not responsible for the privacy practices of third-party websites, and we encourage you to review their privacy policies separately.",
      },
      {
        type: "p",
        text: "We do not share your enquiry information with KRITPrep or any other third-party platform without your consent.",
      },
    ],
  },
  {
    title: "8. Children's Privacy",
    blocks: [
      {
        type: "p",
        text: "Many of our prospective students are minors. Where an enquiry is submitted on behalf of a student under 18 years of age, we expect it to be submitted by, or with the knowledge and consent of, a parent or guardian.",
      },
      {
        type: "p",
        text: "We do not knowingly collect personal information directly from children without parental or guardian involvement.",
      },
    ],
  },
  {
    title: "9. Changes to this Privacy Policy",
    blocks: [
      {
        type: "p",
        text: "We may update this Privacy Policy from time to time to reflect changes in our practices or for legal reasons. Any changes will be posted on this page, along with an updated revision date. We encourage you to review this page periodically.",
      },
    ],
  },
];

export const CONTACT_INTRO =
  "If you have questions about this Privacy Policy or how your information is handled, please contact us:";
