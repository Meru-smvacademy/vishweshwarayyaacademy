export type FaqItem = { question: string; answer: string[] };
export type FaqCategory = { title: string; items: FaqItem[] };

export const FAQ_CATEGORIES: FaqCategory[] = [
  {
    title: "Admissions",
    items: [
      {
        question: "When do admissions begin?",
        answer: [
          "Admissions open every academic year. Please contact the admission office for the latest admission schedule.",
        ],
      },
      {
        question: "Can I visit the campus before taking admission?",
        answer: [
          "Yes. Parents and students are welcome to visit our campus and interact with our academic counsellors before taking admission.",
        ],
      },
    ],
  },
  {
    title: "Courses",
    items: [
      {
        question: "How do I choose the right program?",
        answer: [
          "Our academic counsellors will guide you in selecting the most suitable program based on your academic background, career goals, and aspirations.",
        ],
      },
      {
        question: "Is individual academic guidance provided?",
        answer: [
          "Yes. Every student receives continuous academic guidance, mentoring, and performance monitoring throughout the program.",
        ],
      },
    ],
  },
  {
    title: "Scholarship",
    items: [
      {
        question: "Is the SNT Scholarship based on merit?",
        answer: [
          "Yes. Scholarships are awarded purely on merit based on the student's performance in the SNT Scholarship Examination.",
        ],
      },
      {
        question: "Can students from any school apply for the scholarship?",
        answer: [
          "Yes. Eligible students can apply by registering for the SNT Scholarship Examination and participating in the selection process.",
        ],
      },
    ],
  },
  {
    title: "Hostel",
    items: [
      {
        question: "Is hostel facility available?",
        answer: [
          "Yes. Hostel assistance is available for outstation students. Please contact the admission office for availability and further details.",
        ],
      },
      {
        question: "Are separate hostel facilities available for boys and girls?",
        answer: ["Please contact the admission office for the latest hostel accommodation details."],
      },
    ],
  },
  {
    title: "Contact",
    items: [
      {
        question: "How can I contact the academy?",
        answer: ["+91 96119 19028", "+91 89516 33963", "info@visveshwarayyaacademy.com"],
      },
      {
        question: "Where is Visveshwarayya Academy located?",
        answer: [
          "Lingasuguru Campus: Opposite Annadanegouda Hospital, Lingasuguru, Karnataka, India",
          "Sindhanur Campus: Sri Kanakadasa Degree College Campus, Kustagi Road, Sindhanur – 584128, Raichur District, Karnataka, India",
        ],
      },
    ],
  },
];
