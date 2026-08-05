import type { ContentBlock } from "@/content/shared";

export type ProgramSection = ContentBlock[] | null;

export type AcademicProgram = {
  slug: string;
  name: string;
  whoIsItFor: ProgramSection;
  objective: ProgramSection;
  learningOutcomes: ProgramSection;
  teachingMethodology: ProgramSection;
  kritIntegration: ProgramSection;
  assessment?: ProgramSection;
};

export const INTRODUCTION: ContentBlock[] = [
  {
    type: "p",
    text: "Visveshwarayya NEET | JEE Academy offers carefully designed Academic Pathways that support students at every stage of their educational journey.",
  },
  {
    type: "p",
    text: "From building strong fundamentals in school to preparing for competitive examinations and guiding students through college admissions, every program is built on research-driven learning, instructional technology, and continuous academic support.",
  },
  {
    type: "p",
    text: "Our Academic Pathways are designed not only to help students achieve excellent examination results but also to develop conceptual understanding, confidence, discipline, and lifelong learning skills.",
  },
];

export const ACADEMIC_PROGRAMS: AcademicProgram[] = [
  {
    slug: "foundation",
    name: "Foundation Program",
    whoIsItFor: [
      {
        type: "p",
        text: "The Foundation Program is designed for students of Classes 6, 7, 8, 9, and 10 who want to build a strong academic foundation for future competitive examinations such as NEET and JEE.",
      },
      {
        type: "p",
        text: "The program develops conceptual understanding, scientific thinking, logical reasoning, and problem-solving skills at an early stage, enabling students to progress with confidence as they advance through higher classes.",
      },
    ],
    objective: [
      {
        type: "p",
        text: "The objective of the Foundation Program is to prepare students for future success by strengthening their fundamentals from an early age.",
      },
      {
        type: "p",
        text: "Rather than focusing only on examinations, the program develops conceptual clarity, analytical thinking, scientific curiosity, mathematical ability, and disciplined learning habits that form the foundation for NEET, JEE, and other competitive examinations.",
      },
    ],
    learningOutcomes: [
      { type: "p", text: "Students completing the Foundation Program will develop:" },
      {
        type: "ul",
        items: [
          "Strong conceptual understanding in Mathematics and Science.",
          "Logical reasoning and analytical thinking skills.",
          "Scientific curiosity and problem-solving ability.",
          "Confidence to approach competitive examinations.",
          "Effective study habits and self-discipline.",
          "A solid academic foundation for future NEET and JEE preparation.",
        ],
      },
    ],
    teachingMethodology: [
      {
        type: "p",
        text: "The Foundation Program follows the same educational philosophy that defines every Visveshwarayya Academy program.",
      },
      {
        type: "p",
        text: "Instead of relying only on classroom lectures, students learn through Instructional Technology, research-driven teaching methods, activity-based learning, and continuous concept reinforcement.",
      },
      {
        type: "p",
        text: "Complex scientific and mathematical concepts are explained using 3D interactive models, demonstrations, and visual learning techniques, making learning engaging, enjoyable, and easy to understand.",
      },
      {
        type: "p",
        text: "Every lesson is carefully designed to strengthen conceptual understanding, encourage curiosity, and develop the confidence needed for future competitive examinations.",
      },
    ],
    kritIntegration: [
      {
        type: "p",
        text: "Every Foundation Program student receives access to the KRIT Academic Ecosystem, extending learning beyond the classroom.",
      },
      {
        type: "p",
        text: "Students can access digital learning resources, practice assessments, academic progress reports, and performance tracking through KRIT. As they progress through higher classes, KRIT continues to support their learning journey with technology-enabled academic guidance.",
      },
      {
        type: "p",
        text: "The Foundation Program introduces students to disciplined digital learning habits from an early stage, preparing them for advanced competitive examination training in the future.",
      },
    ],
  },
  {
    slug: "neet-achievement",
    name: "NEET Achievement Program",
    whoIsItFor: [
      {
        type: "p",
        text: "The NEET Achievement Program is designed for students studying in 1st PUC and 2nd PUC who aspire to secure admission into leading medical colleges through the National Eligibility cum Entrance Test (NEET).",
      },
      {
        type: "p",
        text: "The program integrates Board and NEET preparation, enabling students to excel in both without compromising conceptual understanding or academic performance.",
      },
    ],
    objective: [
      {
        type: "p",
        text: "The objective of the NEET Achievement Program is to prepare students simultaneously for Board examinations and the National Eligibility cum Entrance Test (NEET) through a structured, research-driven academic system.",
      },
      {
        type: "p",
        text: "The program focuses on conceptual understanding, scientific reasoning, problem-solving ability, examination strategy, and disciplined preparation so that students are well equipped to compete for admission to leading medical institutions.",
      },
    ],
    learningOutcomes: [
      { type: "p", text: "Students completing the NEET Achievement Program will:" },
      {
        type: "ul",
        items: [
          "Develop strong conceptual understanding in Physics, Chemistry, and Biology.",
          "Build problem-solving skills required for NEET.",
          "Gain confidence through regular CBT assessments and mock examinations.",
          "Improve accuracy, speed, and examination temperament.",
          "Track academic progress through KRIT Analytics.",
          "Be prepared for both Board examinations and NEET with confidence.",
        ],
      },
    ],
    teachingMethodology: null,
    kritIntegration: [
      {
        type: "p",
        text: "Every NEET Achievement Program student receives access to the KRIT Academic Ecosystem, ensuring that learning continues beyond the classroom.",
      },
      { type: "p", text: "Through KRIT, students can:" },
      {
        type: "ul",
        items: [
          "Access digital learning resources and study materials.",
          "Take Computer-Based Tests (CBT) that simulate the real NEET examination.",
          "Receive instant results with detailed performance analytics.",
          "View digital academic report cards and progress reports.",
          "Monitor subject-wise and chapter-wise performance.",
          "Track continuous academic progress throughout the program.",
        ],
      },
      {
        type: "p",
        text: "After NEET results are announced, students also receive guidance through **KRIT Counselling**, a dedicated platform that supports them during the counselling and college admission process by providing structured guidance, college selection assistance, and admission support.",
      },
      {
        type: "p",
        text: "KRIT ensures that students are supported throughout their academic journey—from classroom learning to college admission.",
      },
    ],
    assessment: [
      {
        type: "p",
        text: "Assessment at Visveshwarayya Academy is designed to measure understanding, identify learning gaps, and guide continuous improvement rather than simply assigning marks.",
      },
      { type: "p", text: "The NEET Achievement Program includes:" },
      {
        type: "ul",
        items: [
          "Regular classroom assessments",
          "Chapter-wise tests",
          "Unit tests",
          "Computer-Based Tests (CBT)",
          "Full-length NEET mock examinations",
          "Performance analytics through KRIT",
          "Digital academic report cards",
          "Faculty review and mentoring sessions",
          "Parent progress updates",
        ],
      },
      {
        type: "p",
        text: "Each assessment provides meaningful feedback that helps students improve their accuracy, speed, conceptual understanding, and examination readiness throughout the academic year.",
      },
    ],
  },
  {
    slug: "neet-long-term",
    name: "NEET Long-Term Program",
    whoIsItFor: [
      {
        type: "p",
        text: "**Suitable For:** 12th Passed Students & Repeaters",
      },
      {
        type: "p",
        text: "**Target Examination:** NEET UG",
      },
      {
        type: "p",
        text: "A comprehensive long-term coaching program designed for 12th passed students and repeaters who are determined to secure admission to top medical colleges. The program focuses on conceptual clarity, disciplined preparation, regular practice, and continuous performance evaluation to maximize NEET success.",
      },
      { type: "p", text: "Key Highlights:" },
      {
        type: "ul",
        items: [
          "Comprehensive NEET UG Preparation",
          "Experienced & Dedicated Faculty",
          "Structured Academic Plan",
          "Daily Practice Questions (DPQs)",
          "Weekly & Grand Tests",
          "Personalized Mentorship",
          "Doubt Solving Sessions",
          "Performance Analysis & Parent Updates",
          "High-Quality Study Material",
          "Scholarship Opportunities",
        ],
      },
    ],
    objective: [
      {
        type: "p",
        text: "The NEET Long-Term Program is designed for students who have completed their PUC/Class 12 education and are dedicated to preparing exclusively for NEET.",
      },
      {
        type: "p",
        text: "The objective of this program is to provide focused, intensive, and structured preparation through a research-driven curriculum, instructional technology, continuous mentoring, and regular assessments, enabling students to maximise their NEET performance and secure admission into leading medical colleges.",
      },
    ],
    learningOutcomes: [
      { type: "p", text: "Students completing the NEET Long-Term Program will:" },
      {
        type: "ul",
        items: [
          "Develop advanced conceptual understanding in Physics, Chemistry, and Biology.",
          "Strengthen problem-solving ability through intensive practice and revision.",
          "Improve speed, accuracy, and examination temperament through regular NEET mock tests.",
          "Identify and overcome academic weaknesses using detailed KRIT performance analytics.",
          "Build confidence through continuous mentoring, doubt resolution, and personalised academic guidance.",
          "Be fully prepared to compete for admission to leading medical colleges through NEET.",
        ],
      },
    ],
    teachingMethodology: [
      {
        type: "p",
        text: "The NEET Long-Term Program is built for students who are fully dedicated to achieving success in NEET through focused, intensive preparation.",
      },
      {
        type: "p",
        text: "Our teaching methodology combines research-driven curriculum, instructional technology, and personalised academic mentoring to strengthen conceptual understanding and examination performance.",
      },
      {
        type: "p",
        text: "Every topic is taught through interactive learning, concept-based discussions, structured problem-solving sessions, and continuous revision. Complex concepts are simplified using 3D interactive models, digital learning resources, and practical demonstrations to help students develop deep conceptual clarity.",
      },
      {
        type: "p",
        text: "The program includes regular doubt-clearing sessions, daily practice, strategic revision schedules, and faculty mentoring, ensuring that every student receives the academic support required to achieve their highest potential.",
      },
    ],
    kritIntegration: [
      {
        type: "p",
        text: "Every NEET Long-Term Program student receives full access to the KRIT Academic Ecosystem, providing continuous academic support throughout their dedicated NEET preparation.",
      },
      { type: "p", text: "Through KRIT, students can:" },
      {
        type: "ul",
        items: [
          "Access digital learning resources, recorded lectures, and study materials.",
          "Take regular Computer-Based Tests (CBT) designed to simulate the actual NEET examination.",
          "Receive instant results with detailed performance analytics.",
          "View digital academic report cards and progress reports.",
          "Monitor subject-wise and chapter-wise performance.",
          "Track continuous improvement through personalised academic analytics.",
        ],
      },
      {
        type: "p",
        text: "After the NEET results are announced, students receive continued support through **KRIT Counselling**, our dedicated counselling platform that guides students through counselling procedures, college selection, seat planning, document verification, and admission support.",
      },
      {
        type: "p",
        text: "KRIT ensures that students remain supported from the beginning of their preparation until they secure admission to their preferred medical college.",
      },
    ],
    assessment: [
      {
        type: "p",
        text: "Assessment in the NEET Long-Term Program is designed to continuously measure progress, identify learning gaps, and maximise examination readiness.",
      },
      { type: "p", text: "The assessment system includes:" },
      {
        type: "ul",
        items: [
          "Daily practice tests",
          "Chapter-wise assessments",
          "Unit tests",
          "Intensive revision tests",
          "Computer-Based Tests (CBT)",
          "Full-length NEET mock examinations",
          "Detailed performance analytics through KRIT",
          "Digital academic report cards",
          "One-to-one faculty review and mentoring sessions",
        ],
      },
      {
        type: "p",
        text: "Each assessment is followed by personalised feedback, targeted improvement plans, and strategic revision to help students continuously improve their accuracy, speed, confidence, and overall NEET performance.",
      },
    ],
  },
  {
    slug: "jee-achievement",
    name: "JEE Achievement Program",
    whoIsItFor: [
      {
        type: "p",
        text: "The JEE Achievement Program is designed for students studying in 1st PUC and 2nd PUC who aspire to secure admission into India's premier engineering institutions through JEE Main and JEE Advanced.",
      },
      {
        type: "p",
        text: "The program integrates Board and JEE preparation, enabling students to build strong conceptual understanding, advanced problem-solving skills, and examination confidence while performing well in their Board examinations.",
      },
    ],
    objective: [
      {
        type: "p",
        text: "The objective of the JEE Achievement Program is to prepare students simultaneously for Board examinations, JEE Main, and JEE Advanced through a structured, research-driven academic system.",
      },
      {
        type: "p",
        text: "The program focuses on conceptual mastery, analytical thinking, mathematical reasoning, advanced problem-solving, and disciplined preparation, enabling students to compete confidently for admission into India's leading engineering institutions.",
      },
    ],
    learningOutcomes: [
      { type: "p", text: "Students completing the JEE Achievement Program will:" },
      {
        type: "ul",
        items: [
          "Develop strong conceptual understanding in Physics, Chemistry, and Mathematics.",
          "Build analytical thinking and advanced problem-solving skills required for JEE Main and JEE Advanced.",
          "Strengthen mathematical reasoning and logical decision-making abilities.",
          "Improve speed, accuracy, and examination confidence through regular CBT assessments and mock examinations.",
          "Monitor academic progress through KRIT Analytics and personalised performance reports.",
          "Be well prepared to excel in both Board examinations and JEE Main & Advanced.",
        ],
      },
    ],
    teachingMethodology: [
      {
        type: "p",
        text: "The JEE Achievement Program follows a research-driven and concept-oriented teaching methodology that prepares students for both Board examinations and JEE Main & Advanced.",
      },
      {
        type: "p",
        text: "Every lesson is designed using Instructional Technology, enabling students to develop deep conceptual understanding through interactive learning, visual demonstrations, structured problem-solving sessions, and continuous practice.",
      },
      {
        type: "p",
        text: "Complex concepts in Physics, Chemistry, and Mathematics are simplified using 3D interactive models, digital learning resources, practical demonstrations, and advanced problem-solving workshops.",
      },
      {
        type: "p",
        text: "Regular revision, doubt-clearing sessions, faculty mentoring, and strategic test practice ensure that students continuously improve their conceptual clarity, analytical thinking, and examination performance.",
      },
    ],
    kritIntegration: [
      {
        type: "p",
        text: "Every JEE Achievement Program student receives access to the KRIT Academic Ecosystem, extending learning beyond the classroom.",
      },
      { type: "p", text: "Through KRIT, students can:" },
      {
        type: "ul",
        items: [
          "Access digital learning resources, recorded lectures, and study materials.",
          "Take Computer-Based Tests (CBT) for JEE Main and JEE Advanced preparation.",
          "Receive instant results with detailed performance analytics.",
          "View digital academic report cards and progress reports.",
          "Monitor subject-wise and chapter-wise performance.",
          "Track continuous academic improvement through KRIT Analytics.",
        ],
      },
      {
        type: "p",
        text: "After JEE results are announced, students receive continued support through **KRIT Counselling**, our dedicated counselling platform that assists with engineering college selection, counselling procedures, admission guidance, and career planning.",
      },
      {
        type: "p",
        text: "KRIT supports students throughout their academic journey from classroom learning to engineering college admission.",
      },
    ],
    assessment: [
      {
        type: "p",
        text: "Assessment in the JEE Achievement Program is designed to strengthen conceptual understanding, analytical thinking, and examination readiness through continuous evaluation.",
      },
      { type: "p", text: "The assessment system includes:" },
      {
        type: "ul",
        items: [
          "Regular classroom assessments",
          "Chapter-wise tests",
          "Unit tests",
          "Computer-Based Tests (CBT)",
          "JEE Main mock examinations",
          "JEE Advanced mock examinations",
          "Detailed performance analytics through KRIT",
          "Digital academic report cards",
          "Faculty review and mentoring sessions",
        ],
      },
      {
        type: "p",
        text: "Each assessment provides detailed feedback that helps students improve conceptual clarity, problem-solving ability, accuracy, speed, and examination strategy for both JEE Main and JEE Advanced.",
      },
    ],
  },
  {
    slug: "jee-long-term",
    name: "JEE Long-Term Program",
    whoIsItFor: null,
    objective: [
      {
        type: "p",
        text: "The objective of the JEE Long-Term Program is to provide dedicated, research-driven preparation for JEE Main and JEE Advanced through intensive academic training, instructional technology, continuous mentoring, and structured assessments.",
      },
      {
        type: "p",
        text: "The program develops conceptual mastery, analytical thinking, advanced mathematical reasoning, and problem-solving skills required to secure admission into India's leading engineering institutions.",
      },
    ],
    learningOutcomes: [
      { type: "p", text: "Students completing the JEE Long-Term Program will:" },
      {
        type: "ul",
        items: [
          "Develop advanced conceptual understanding in Physics, Chemistry, and Mathematics.",
          "Strengthen analytical thinking and complex problem-solving skills.",
          "Improve speed, accuracy, and confidence through intensive JEE practice.",
          "Enhance examination strategy through regular mock tests and performance analysis.",
          "Identify and overcome academic weaknesses using KRIT Analytics.",
          "Be fully prepared to compete successfully in JEE Main and JEE Advanced.",
        ],
      },
    ],
    teachingMethodology: [
      {
        type: "p",
        text: "The JEE Long-Term Program is designed for students who are fully committed to achieving success in JEE Main and JEE Advanced through focused and intensive preparation.",
      },
      {
        type: "p",
        text: "The program combines research-driven curriculum, instructional technology, advanced concept-based teaching, structured problem-solving sessions, and personalised academic mentoring.",
      },
      {
        type: "p",
        text: "Complex concepts are taught using interactive learning methods, 3D instructional models, digital learning resources, and continuous practice to build deep conceptual understanding.",
      },
      {
        type: "p",
        text: "Regular revision, doubt-clearing sessions, advanced problem-solving workshops, and faculty mentoring ensure that students continuously improve their academic performance and examination readiness.",
      },
    ],
    kritIntegration: [
      {
        type: "p",
        text: "Every JEE Long-Term Program student receives full access to the KRIT Academic Ecosystem, providing continuous academic support throughout their dedicated JEE preparation.",
      },
      { type: "p", text: "Through KRIT, students can:" },
      {
        type: "ul",
        items: [
          "Access digital learning resources, recorded lectures, and study materials.",
          "Take Computer-Based Tests (CBT) for JEE Main and JEE Advanced.",
          "Receive instant results with detailed performance analytics.",
          "View digital academic report cards and progress reports.",
          "Monitor subject-wise and chapter-wise performance.",
          "Track continuous academic improvement through KRIT Analytics.",
        ],
      },
      {
        type: "p",
        text: "After JEE results are announced, students receive continued support through KRIT Counselling, which assists with engineering college selection, counselling procedures, admission guidance, and career planning.",
      },
      {
        type: "p",
        text: "KRIT supports students from the beginning of their preparation until they secure admission into their preferred engineering institution.",
      },
    ],
    assessment: [
      {
        type: "p",
        text: "Assessment in the JEE Long-Term Program is designed to continuously measure progress, strengthen conceptual understanding, and maximise examination performance.",
      },
      { type: "p", text: "The assessment system includes:" },
      {
        type: "ul",
        items: [
          "Daily practice tests",
          "Chapter-wise assessments",
          "Unit tests",
          "Intensive revision tests",
          "Computer-Based Tests (CBT)",
          "JEE Main mock examinations",
          "JEE Advanced mock examinations",
          "Detailed performance analytics through KRIT",
          "Digital academic report cards",
          "One-to-one faculty review and mentoring sessions",
        ],
      },
      {
        type: "p",
        text: "Each assessment is followed by personalised feedback, targeted improvement plans, and strategic revision to improve conceptual clarity, analytical thinking, speed, accuracy, and overall examination performance.",
      },
    ],
  },
  {
    slug: "kcet-integrated",
    name: "KCET Integrated Program",
    whoIsItFor: [
      {
        type: "p",
        text: "The KCET Integrated Program is designed for students studying in 1st PUC and 2nd PUC who aspire to secure admission into leading engineering, agriculture, pharmacy, veterinary, and other professional courses through the Karnataka Common Entrance Test (KCET).",
      },
      {
        type: "p",
        text: "The program integrates Karnataka Board and KCET preparation, enabling students to perform exceptionally well in both examinations while building strong conceptual understanding.",
      },
    ],
    objective: [
      {
        type: "p",
        text: "The objective of the KCET Integrated Program is to prepare students simultaneously for Karnataka Board examinations and KCET through a structured, research-driven academic system.",
      },
      {
        type: "p",
        text: "The program focuses on conceptual understanding, application-based learning, disciplined preparation, and examination strategy, enabling students to achieve excellent Board results and competitive KCET ranks.",
      },
    ],
    learningOutcomes: [
      { type: "p", text: "Students completing the KCET Integrated Program will:" },
      {
        type: "ul",
        items: [
          "Develop strong conceptual understanding in Physics, Chemistry, Mathematics, and Biology.",
          "Build analytical thinking and problem-solving skills required for KCET.",
          "Strengthen Board examination performance alongside KCET preparation.",
          "Improve speed, accuracy, and confidence through regular CBT assessments.",
          "Track academic progress using KRIT Analytics and personalised performance reports.",
          "Be well prepared to secure competitive KCET ranks and admission into leading professional colleges.",
        ],
      },
    ],
    teachingMethodology: [
      {
        type: "p",
        text: "The KCET Integrated Program follows a research-driven and concept-oriented teaching methodology that prepares students for both Karnataka Board examinations and KCET.",
      },
      {
        type: "p",
        text: "Every lesson is delivered using Instructional Technology, interactive learning methods, visual demonstrations, and structured practice sessions to build strong conceptual understanding.",
      },
      {
        type: "p",
        text: "Complex concepts are simplified through 3D interactive models, digital learning resources, classroom discussions, and continuous revision, helping students confidently apply their knowledge during examinations.",
      },
      {
        type: "p",
        text: "Regular assessments, doubt-clearing sessions, and faculty mentoring ensure continuous academic improvement throughout the program.",
      },
    ],
    kritIntegration: [
      {
        type: "p",
        text: "Every KCET Integrated Program student receives access to the KRIT Academic Ecosystem, extending learning beyond the classroom.",
      },
      { type: "p", text: "Through KRIT, students can:" },
      {
        type: "ul",
        items: [
          "Access digital learning resources and study materials.",
          "Take Computer-Based Tests (CBT) aligned with KCET preparation.",
          "Receive instant results with detailed performance analytics.",
          "View digital academic report cards and progress reports.",
          "Monitor subject-wise and chapter-wise performance.",
          "Track continuous academic progress through KRIT Analytics.",
        ],
      },
      {
        type: "p",
        text: "After KCET results are announced, students receive continued support through KRIT Counselling, which provides guidance for counselling procedures, college selection, option entry, document verification, and admission support.",
      },
      {
        type: "p",
        text: "KRIT supports students from classroom learning to successful college admission.",
      },
    ],
    assessment: [
      {
        type: "p",
        text: "Assessment in the KCET Integrated Program is designed to strengthen conceptual understanding, improve examination performance, and support continuous academic progress.",
      },
      { type: "p", text: "The assessment system includes:" },
      {
        type: "ul",
        items: [
          "Regular classroom assessments",
          "Chapter-wise tests",
          "Unit tests",
          "Computer-Based Tests (CBT)",
          "KCET mock examinations",
          "Karnataka Board model examinations",
          "Detailed performance analytics through KRIT",
          "Digital academic report cards",
          "Faculty review and mentoring sessions",
        ],
      },
      {
        type: "p",
        text: "Each assessment provides meaningful feedback that helps students improve conceptual understanding, accuracy, examination strategy, and overall academic performance.",
      },
    ],
  },
];

export const LEARNING_ADVANTAGE = {
  intro:
    "Every Academic Pathway at Visveshwarayya Academy is built upon a common educational philosophy and a commitment to academic excellence.",
  leadIn: "Regardless of the program a student chooses, every learner benefits from:",
  items: [
    "Research-Driven Curriculum",
    "Instructional Technology",
    "3D Interactive Learning",
    "Experienced Faculty Mentoring",
    "Continuous Academic Assessment",
    "KRIT Academic Ecosystem",
    "Computer-Based Testing (CBT)",
    "Performance Analytics",
    "Personalised Academic Guidance",
    "KRIT Counselling for College Admissions",
  ],
  closing:
    "Our objective is not only to help students perform well in examinations but also to develop confident, disciplined, and responsible learners who are prepared for future success.",
};

export const KRIT_ECOSYSTEM = {
  intro: "KRIT is the digital academic ecosystem developed by Visveshwarayya Academy to extend learning beyond the classroom.",
  leadIn: "Every student benefits from technology-enabled academic support through:",
  groups: [
    {
      title: "KRIT Learning",
      items: ["Digital learning resources", "Recorded lectures", "Study materials", "Assignments"],
    },
    {
      title: "KRIT CBT",
      items: ["Computer-Based Tests", "Chapter tests", "Mock examinations", "Instant result generation"],
    },
    {
      title: "KRIT Academic Report System",
      items: [
        "Digital marks cards",
        "Academic progress reports",
        "Parent-friendly performance reports",
        "Student rankings",
      ],
    },
    {
      title: "KRIT Analytics",
      items: ["Subject-wise analysis", "Chapter-wise analysis", "Performance trends", "Improvement tracking"],
    },
    {
      title: "KRIT Counselling",
      items: ["College guidance", "Counselling support", "Admission assistance", "Career guidance"],
    },
  ],
  closing: "KRIT ensures that students receive continuous academic support from classroom learning to college admission.",
};

export const KRIT_COUNSELLING: ContentBlock[] = [
  {
    type: "p",
    text: "Success is not measured only by examination results but by securing admission into the right institution.",
  },
  {
    type: "p",
    text: "KRIT Counselling is a dedicated platform that supports students after the declaration of NEET, JEE, and KCET results.",
  },
  { type: "p", text: "The platform provides:" },
  {
    type: "ul",
    items: [
      "Counselling guidance",
      "College selection assistance",
      "Option entry guidance",
      "Seat planning support",
      "Document verification guidance",
      "Admission process support",
      "Career guidance",
    ],
  },
  {
    type: "p",
    text: "Our commitment to students continues beyond the examination until they successfully begin the next stage of their academic journey.",
  },
];

export const ADMISSION_JOURNEY = {
  intro: "Every student at Visveshwarayya Academy follows a carefully designed academic journey.",
  steps: [
    "Admission to Visveshwarayya Academy",
    "Research-Driven Learning",
    "Instructional Technology",
    "3D Interactive Learning",
    "KRIT Academic Ecosystem",
    "Continuous Assessment & CBT",
    "Performance Analytics",
    "NEET / JEE / KCET Examination",
    "KRIT Counselling",
    "College Admission",
  ],
  closing: "Come to Learn. Go to Serve.",
};
