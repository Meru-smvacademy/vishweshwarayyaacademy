"use client";

import { useState } from "react";
import TheoryResultsOrbital, { type TheoryOrbitalYear } from "@/components/results/TheoryResultsOrbital";

type Category = "THEORY" | "NEET" | "JEE" | "KCET";

const YEARS = [
  "2025–26",
  "2024–25",
  "2023–24",
  "2022–23",
  "2021–22",
  "2020–21",
  "2019–20",
  "2018–19",
  "2017–18",
  "2016–17",
  "2015–16",
] as const;
type Year = (typeof YEARS)[number];

const ALL_CATEGORIES: Category[] = ["THEORY", "NEET", "JEE", "KCET"];

// Only categories with verified, supplied source material are marked
// available for a given academic year. Do not mark a category
// available until real source material has been supplied for it.
const VERIFIED: Record<Year, Category[]> = {
  "2025–26": ["THEORY", "KCET", "NEET"],
  "2024–25": ["THEORY", "KCET", "NEET"],
  "2023–24": ["THEORY", "KCET", "NEET"],
  "2022–23": ["THEORY", "KCET", "NEET"],
  "2021–22": ["THEORY", "NEET"],
  "2020–21": ["THEORY", "KCET", "NEET"],
  "2019–20": ["THEORY", "NEET"],
  "2018–19": ["THEORY"],
  "2017–18": ["THEORY"],
  "2016–17": ["THEORY"],
  "2015–16": ["THEORY"],
};

type TheoryRecord = {
  students: number;
  passed: number;
  passPercentage: string;
  firstClass: number;
  distinction: number;
  firstRankScore: number;
  firstRankPercentage: string;
};

// Verified II PUC Theory Results, exactly as supplied by the Academy.
const THEORY_DATA: Record<Year, TheoryRecord> = {
  "2015–16": { students: 65, passed: 51, passPercentage: "78.46%", firstClass: 35, distinction: 11, firstRankScore: 556, firstRankPercentage: "92%" },
  "2016–17": { students: 84, passed: 68, passPercentage: "80.91%", firstClass: 48, distinction: 19, firstRankScore: 550, firstRankPercentage: "91%" },
  "2017–18": { students: 128, passed: 71, passPercentage: "55.46%", firstClass: 53, distinction: 7, firstRankScore: 529, firstRankPercentage: "88%" },
  "2018–19": { students: 171, passed: 122, passPercentage: "71.34%", firstClass: 54, distinction: 17, firstRankScore: 565, firstRankPercentage: "94.16%" },
  "2019–20": { students: 218, passed: 136, passPercentage: "62.38%", firstClass: 72, distinction: 11, firstRankScore: 598, firstRankPercentage: "99.66%" },
  "2020–21": { students: 209, passed: 181, passPercentage: "86.60%", firstClass: 122, distinction: 34, firstRankScore: 572, firstRankPercentage: "95.33%" },
  "2021–22": { students: 185, passed: 181, passPercentage: "97.83%", firstClass: 99, distinction: 31, firstRankScore: 582, firstRankPercentage: "97%" },
  "2022–23": { students: 137, passed: 132, passPercentage: "96.35%", firstClass: 69, distinction: 35, firstRankScore: 578, firstRankPercentage: "96.33%" },
  "2023–24": { students: 286, passed: 239, passPercentage: "83.56%", firstClass: 95, distinction: 130, firstRankScore: 588, firstRankPercentage: "98%" },
  "2024–25": { students: 194, passed: 167, passPercentage: "86%", firstClass: 93, distinction: 55, firstRankScore: 582, firstRankPercentage: "97%" },
  "2025–26": { students: 240, passed: 237, passPercentage: "98.75%", firstClass: 95, distinction: 136, firstRankScore: 578, firstRankPercentage: "96.33%" },
};

type KcetHistoricalHighlight = { course: string; ranks: number[] };

// Verified historical KCET state-rank highlights, exactly as supplied.
const KCET_HISTORICAL: Partial<Record<Year, KcetHistoricalHighlight[]>> = {
  "2020–21": [{ course: "Veterinary Science", ranks: [9, 103] }],
  "2022–23": [{ course: "Veterinary Science", ranks: [16] }],
  "2023–24": [{ course: "Veterinary Science", ranks: [56] }],
  "2024–25": [{ course: "Veterinary Science", ranks: [22] }],
};

type KcetStudentAchievement = { name: string; ranks: { course: string; rank: number }[] };

// All uploaded 2025–26 KCET achievement posters, exactly as supplied.
// Every entry below belongs to the 2025–26 academic year only.
const KCET_2025_26_STUDENTS: KcetStudentAchievement[] = [
  { name: "Abhishek", ranks: [{ course: "Agriculture", rank: 3046 }, { course: "Veterinary Science", rank: 2099 }, { course: "Food Science", rank: 3046 }] },
  { name: "Amaresh", ranks: [{ course: "Agriculture", rank: 1833 }, { course: "Veterinary Science", rank: 2570 }, { course: "Food Science", rank: 1833 }] },
  { name: "Arun", ranks: [{ course: "Veterinary Science", rank: 964 }, { course: "Agriculture", rank: 2192 }, { course: "B.Pharma", rank: 1485 }, { course: "Naturopathy", rank: 1024 }, { course: "Nursing", rank: 967 }, { course: "Pharm D", rank: 1485 }] },
  { name: "Bhagyashree Ramesh", ranks: [{ course: "B.Pharm", rank: 2910 }, { course: "BPT", rank: 1037 }, { course: "Nursing", rank: 1884 }, { course: "Pharm D", rank: 2910 }, { course: "D.Pharm", rank: 1037 }, { course: "BPO", rank: 2634 }, { course: "Veterinary Science", rank: 1871 }, { course: "BSc AHS", rank: 1037 }, { course: "Naturopathy", rank: 1051 }] },
  { name: "Deepa", ranks: [{ course: "Veterinary Science", rank: 1711 }] },
  { name: "Devaraj Patil", ranks: [{ course: "Veterinary Science", rank: 2849 }] },
  { name: "Jeetu", ranks: [{ course: "Agriculture", rank: 509 }, { course: "Veterinary Science", rank: 703 }, { course: "Food Science", rank: 509 }, { course: "Sericulture", rank: 509 }] },
  { name: "Mallikarjun", ranks: [{ course: "Agriculture", rank: 1847 }, { course: "Veterinary Science", rank: 1175 }, { course: "Food Science", rank: 1847 }, { course: "Sericulture", rank: 1847 }] },
  { name: "Manoj Kumar", ranks: [{ course: "BPT", rank: 3477 }, { course: "D.Pharm", rank: 3401 }, { course: "BPO", rank: 2484 }, { course: "Agriculture", rank: 3378 }, { course: "Veterinary Science", rank: 3058 }, { course: "Food Science", rank: 3378 }, { course: "Sericulture", rank: 3378 }, { course: "BSc AHS", rank: 3400 }] },
  { name: "Prajwal Nirupadeppa", ranks: [{ course: "Veterinary Science", rank: 19 }, { course: "B.Pharm", rank: 794 }, { course: "Nursing", rank: 638 }, { course: "Pharm D", rank: 794 }, { course: "Agriculture", rank: 257 }, { course: "Food Science", rank: 257 }, { course: "Sericulture", rank: 257 }, { course: "Naturopathy", rank: 1531 }] },
  { name: "Ravichandra", ranks: [{ course: "Agriculture", rank: 327 }, { course: "Veterinary Science", rank: 109 }, { course: "Food Science", rank: 327 }, { course: "Sericulture", rank: 327 }] },
  { name: "Savita Jayaram", ranks: [{ course: "Agriculture", rank: 760 }, { course: "Veterinary Science", rank: 780 }, { course: "Food Science", rank: 760 }, { course: "Sericulture", rank: 760 }] },
  { name: "Shashank", ranks: [{ course: "BPT", rank: 743 }, { course: "D.Pharma", rank: 743 }, { course: "BPO", rank: 1226 }, { course: "BSc AH", rank: 743 }] },
  { name: "Suvarna", ranks: [{ course: "Agriculture", rank: 1865 }, { course: "Veterinary Science", rank: 2105 }, { course: "Food Science", rank: 1865 }, { course: "Sericulture", rank: 1865 }] },
];

type KcetHeroHighlight = { rank: number; course: string; student: string };

// Prioritized strongest verified 2025–26 KCET ranks, exactly as specified.
const KCET_HERO_HIGHLIGHTS: KcetHeroHighlight[] = [
  { rank: 19, course: "Veterinary Science", student: "Prajwal Nirupadeppa" },
  { rank: 109, course: "Veterinary Science", student: "Ravichandra" },
  { rank: 257, course: "Agriculture", student: "Prajwal Nirupadeppa" },
  { rank: 327, course: "Agriculture", student: "Ravichandra" },
  { rank: 509, course: "Agriculture / Food Science / Sericulture", student: "Jeetu" },
  { rank: 703, course: "Veterinary Science", student: "Jeetu" },
];

// ---- NEET data, exactly as supplied by the Academy ----

type NeetSeatSummary = { label: string; count: number };

// Years with only a verified seat/selection count (no detailed sheet).
const NEET_SIMPLE: Partial<Record<Year, NeetSeatSummary[]>> = {
  "2019–20": [
    { label: "MBBS", count: 1 },
    { label: "BAMS", count: 3 },
    { label: "Veterinary Science", count: 2 },
  ],
  "2020–21": [
    { label: "MBBS", count: 1 },
    { label: "BAMS", count: 5 },
    { label: "Veterinary Science", count: 3 },
  ],
  "2022–23": [
    { label: "MBBS", count: 2 },
    { label: "BAMS", count: 8 },
    { label: "Veterinary Science", count: 4 },
  ],
};

// 2021–22 has only a highest-score highlight and a BAMS seat count verified.
const NEET_2021_22 = { highestScore: "490 / 720", bamsSeats: 6 };

type NeetStudentResult = { name: string; marks: number; college: string };
type NeetCourseGroup = { course: string; students: NeetStudentResult[] };
type NeetDetailedYear = { summary: NeetSeatSummary[]; groups: NeetCourseGroup[] };

// Years with a complete uploaded result sheet.
const NEET_DETAILED: Partial<Record<Year, NeetDetailedYear>> = {
  "2023–24": {
    summary: [
      { label: "MBBS", count: 3 },
      { label: "BAMS", count: 3 },
      { label: "BDS", count: 1 },
      { label: "Veterinary Science", count: 2 },
    ],
    groups: [
      {
        course: "MBBS",
        students: [
          { name: "Praveen Kumar Basavaraj", marks: 652, college: "VIMS BELLARY" },
          { name: "Padmini R", marks: 630, college: "KIMS KARNATAKA INSTITUTE OF MEDICAL SCIENCE COLLEGE HUBLI" },
          { name: "Shareefsab", marks: 574, college: "AIMS ADICHUNCHINAGIRI INSTITITE OF MEDICAL SCIENCE MANDY" },
        ],
      },
      {
        course: "BAMS",
        students: [
          { name: "Gopal Amaresh", marks: 454, college: "SRI D.G.M. AYURVEDIC MEDICAL COLLEGE AND HOSPITAL GADAG" },
          { name: "Nivedita Kantha Gouda", marks: 302, college: "KRISHNA AYURVEDIC MEDICAL COLLEGE & HOSPITAL SANKESHWAR" },
          { name: "Darshan C", marks: 398, college: "GATAPRABHA AYURVEDIC COLLEGE GATAPRABHA" },
        ],
      },
      {
        course: "BDS",
        students: [{ name: "Sujata Daragappa", marks: 353, college: "S B PATIL DENTAL COLLEGE BIDAR" }],
      },
      {
        course: "Veterinary Science",
        students: [
          { name: "Vishal Motilal Rathod", marks: 425, college: "VETERINARY COLLEGE HASSAN" },
          { name: "Anjanaya Lakashman", marks: 355, college: "VETERINARY COLLEGE BIDAR" },
        ],
      },
    ],
  },
  "2024–25": {
    summary: [
      { label: "MBBS", count: 10 },
      { label: "BAMS", count: 6 },
      { label: "BDS", count: 6 },
      { label: "Veterinary Science", count: 2 },
    ],
    groups: [
      {
        course: "MBBS",
        students: [
          { name: "Vivek Sanjivappa", marks: 517, college: "VIMS BELLARY" },
          { name: "Ravikumar Hulagappa", marks: 485, college: "KOPPALA MEDICAL COLLEGE" },
          { name: "Vishwanath", marks: 477, college: "BIMS BELAGAVI" },
          { name: "Ramkrishna", marks: 470, college: "VIMS BELLARY" },
          { name: "Sachin Kumar", marks: 464, college: "VIMS BELLARY" },
          { name: "Amaramma", marks: 434, college: "RIMS RAICHUR" },
          { name: "Bhagyavanti", marks: 417, college: "YIMS GOVT MEDICAL COLLEGE YADIGR" },
          { name: "Suma", marks: 402, college: "HIMS MEDICAL COLLEGE HAVERI" },
          { name: "Hanumanthi", marks: 398, college: "SRI MADHUSUDAN SAI MUDDENAHALLI" },
          { name: "Sumangal", marks: 385, college: "PEST MEDICAL COLLEGE BENGALUR" },
        ],
      },
      {
        course: "BAMS",
        students: [
          { name: "Saniya", marks: 413, college: "DGM AYURVEDIC COLLEGE GADAG" },
          { name: "Bhoomika", marks: 373, college: "TARANATH AYURVEDIC MEDICAL COLLEGE BENGALORE" },
          { name: "Arun Gulagunji", marks: 371, college: "RAJIV GANDI AYURVEDIC COLLEGE RONA" },
          { name: "Bhagya Sanganna", marks: 320, college: "A.M SHAIKA HOMOEPATIC MEDICAL COLLEGE NEHARU NAGARA BELAGAVI" },
          { name: "Prema Somanna", marks: 307, college: "KANNADA BALAGA SOCIETY RURAL AYURVEDIC MEDICAL CLG BELAGAVI" },
          { name: "Pragati Sanjeev Kumar", marks: 275, college: "TAPOVAN AYURVEDIC MEDICAL COLLEGE DAVANGERA" },
        ],
      },
      {
        course: "BDS",
        students: [
          { name: "J Akhila", marks: 459, college: "GOVT DENTAL COLLEGE BELLARY" },
          { name: "Sharada", marks: 424, college: "GOVT DENTAL COLLEGE BELLARY" },
          { name: "Sahima Talikoti", marks: 417, college: "RAJARAJESHWARI DENTAL COLLEGE BENGALURU" },
          { name: "Deepa Balappa", marks: 378, college: "NAVODAYA DENTAL COLLEGE RAICHUR" },
          { name: "Mahesh Devindrappa", marks: 369, college: "GOVT DENTAL COLLEGE BENGALURU" },
          { name: "Devamma Terina", marks: 321, college: "AL BADAR DENTAL COLLEGE GULBARGA" },
        ],
      },
    ],
  },
};

type NeetRankedStudent = { name: string; marks: number; air?: number; categoryRank?: number };

// 2025–26 Long-Term NEET — all 19 students from the uploaded result sheet.
const NEET_2025_26_LONG_TERM: NeetRankedStudent[] = [
  { name: "Arun Kumar", marks: 612, air: 6747, categoryRank: 2954 },
  { name: "Lakshmi Mallayya", marks: 536, air: 49522, categoryRank: 24412 },
  { name: "Prajwal N Nirupadeppa", marks: 534, air: 51181, categoryRank: 25232 },
  { name: "Bhagyashree Ramesh", marks: 509, air: 78242, categoryRank: 38834 },
  { name: "Ravichandra Nagalingappa", marks: 493, air: 98936, categoryRank: 49128 },
  { name: "Shivaraj Sabanna", marks: 484, air: 111966, categoryRank: 55483 },
  { name: "Tirumala Veeresh", marks: 455, air: 157794, categoryRank: 77206 },
  { name: "Ramesh Sanna Hanamagouda", marks: 438, air: 188990, categoryRank: 3634 },
  { name: "Mallikarjun Basavaraj", marks: 436, air: 193397, categoryRank: 23292 },
  { name: "Deepa Basavaraj", marks: 436, air: 193475, categoryRank: 13724 },
  { name: "Ankita Subhash Gouda", marks: 415, air: 237788, categoryRank: 113353 },
  { name: "Devaraj Patil Nagaraj Patil", marks: 388, air: 303067, categoryRank: 34719 },
  { name: "Pallavi Patil", marks: 373, air: 343789, categoryRank: 159273 },
  { name: "Savita Ramunayak", marks: 369, air: 355548, categoryRank: 35744 },
  { name: "Bheemangouda Bhagavanta", marks: 365, air: 367024, categoryRank: 12632 },
  { name: "Drakshayani Virupakshi", marks: 338, air: 454851, categoryRank: 206431 },
  { name: "Tejashwini Basavaraj", marks: 338, air: 454747, categoryRank: 206390 },
  { name: "Manjunath Amarappa", marks: 300, air: 598088, categoryRank: 266109 },
  { name: "Samreen Babu Sab", marks: 291, air: 630761, categoryRank: 279658 },
];

// 2025–26 Regular NEET — all 31 students from the uploaded result sheet.
// AIR / Category Rank retained only where the source sheet provides them.
const NEET_2025_26_REGULAR: NeetRankedStudent[] = [
  { name: "Shashank Betageri", marks: 504, air: 84630, categoryRank: 32127 },
  { name: "Mallikarjun", marks: 455 },
  { name: "Basavarajeshwari", marks: 400, air: 272719, categoryRank: 128506 },
  { name: "Gangamma", marks: 395, air: 285099, categoryRank: 133876 },
  { name: "Vijaykumar", marks: 394 },
  { name: "Chaitra", marks: 393, air: 290324, categoryRank: 26559 },
  { name: "Beebi Fathima", marks: 385, air: 310369, categoryRank: 144877 },
  { name: "Basamma", marks: 371, air: 349962, categoryRank: 161891 },
  { name: "Savita Jayaram", marks: 360, air: 382195, categoryRank: 39580 },
  { name: "Divya M", marks: 358, air: 388981, categoryRank: 178568 },
  { name: "Abhishek", marks: 346, air: 429170, categoryRank: 46841 },
  { name: "Gagan Kumar", marks: 342 },
  { name: "Sinchana Naik", marks: 335 },
  { name: "Suvarna", marks: 335 },
  { name: "Rakshitha", marks: 329 },
  { name: "Tanvi", marks: 325, air: 499952, categoryRank: 56847 },
  { name: "Manojkumar", marks: 322 },
  { name: "Prema", marks: 312, air: 548878, categoryRank: 63891 },
  { name: "Rajkumar", marks: 310 },
  { name: "Rohitkumar", marks: 309 },
  { name: "Anjali", marks: 306, air: 571360, categoryRank: 67074 },
  { name: "Netra", marks: 302, air: 588229, categoryRank: 262063 },
  { name: "Akkamma", marks: 294, air: 619406, categoryRank: 275035 },
  { name: "Shankarlinga Doddamani", marks: 290 },
  { name: "Aditi Chowdary", marks: 286, air: 653398, categoryRank: 187823 },
  { name: "Jeethu", marks: 283, air: 665755, categoryRank: 294174 },
  { name: "Nandini", marks: 274 },
  { name: "Sukanya", marks: 273 },
  { name: "Bhoomika P H", marks: 268, air: 730003, categoryRank: 210475 },
  { name: "Sachin Doddamani", marks: 264 },
  { name: "Durgamma", marks: 258 },
];

const NEET_2025_26_VETERINARY_COUNT = 5;

// Derived from THEORY_DATA — the orbital visualization has no data of
// its own, so there is only one canonical source for Theory Results.
const THEORY_ORBITAL_DATA: TheoryOrbitalYear[] = YEARS.map((year) => ({
  year,
  pass: THEORY_DATA[year].passPercentage.replace("%", ""),
  passed: THEORY_DATA[year].passed,
  dist: THEORY_DATA[year].distinction,
}));

const CATEGORY_LABEL: Record<Category, string> = {
  THEORY: "Theory Examination Results",
  NEET: "NEET Results",
  JEE: "JEE Results",
  KCET: "KCET Results",
};

const CATEGORY_BLURB: Record<Category, string> = {
  THEORY: "Internal theory examination performance across all enrolled batches for the academic year.",
  NEET: "National Eligibility cum Entrance Test outcomes for students prepared under the Academy.",
  JEE: "Joint Entrance Examination results for students from the Academy's engineering preparatory track.",
  KCET: "Karnataka Common Entrance Test results for students from the Academy's state-level preparatory track.",
};

const GOLD = "#c9a96e";
const INK = "#09090f";
const CREAM = "#f0ede6";

const DISPLAY = "var(--font-playfair-display), Georgia, serif";
const SANS = "var(--font-inter), sans-serif";

export default function ResultsArchiveSection() {
  const [activeYear, setActiveYear] = useState<Year>("2025–26");
  const [activeCategory, setActiveCategory] = useState<Category | null>("THEORY");

  function handleYearSelect(year: Year) {
    setActiveYear(year);
    const available = VERIFIED[year];
    setActiveCategory(available.includes(activeCategory as Category) ? activeCategory : available[0] ?? null);
  }

  const availableCategories = VERIFIED[activeYear];

  return (
    <section style={{ fontFamily: SANS, backgroundColor: INK, color: CREAM, position: "relative", overflow: "hidden" }}>
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(240,237,230,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(240,237,230,0.03) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          pointerEvents: "none",
        }}
      />

      {/* Section header */}
      <div style={{ position: "relative", maxWidth: "1200px", margin: "0 auto", padding: "120px 48px 0" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "48px" }}>
          <div style={{ width: "32px", height: "1px", backgroundColor: GOLD }} />
          <span
            style={{
              fontFamily: SANS,
              fontSize: "11px",
              fontWeight: 600,
              letterSpacing: "0.2em",
              color: GOLD,
              textTransform: "uppercase",
            }}
          >
            Results Archive
          </span>
        </div>

        <h2
          style={{
            fontFamily: DISPLAY,
            fontSize: "clamp(36px, 5.5vw, 68px)",
            fontWeight: 700,
            lineHeight: 1.08,
            letterSpacing: "-0.02em",
            color: CREAM,
            margin: "0 0 20px",
            maxWidth: "760px",
          }}
        >
          The Years. The Results.
          <br />
          <em style={{ fontStyle: "italic", color: GOLD }}>The Journey.</em>
        </h2>

        <p style={{ fontFamily: SANS, fontSize: "16px", fontWeight: 300, color: "rgba(240,237,230,0.5)", letterSpacing: "0.02em", margin: 0 }}>
          Explore the Academy&rsquo;s academic record across the years.
        </p>
      </div>

      {/* Year Navigator */}
      <div style={{ padding: "80px 0 0", position: "relative" }}>
        <div
          className="results-year-scroll"
          style={{ overflowX: "auto", overflowY: "visible", paddingBottom: "4px", scrollbarWidth: "none" }}
        >
          <div style={{ display: "flex", alignItems: "flex-end", minWidth: "max-content", padding: "0 48px", position: "relative" }}>
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                left: "48px",
                right: "48px",
                bottom: "40px",
                height: "1px",
                backgroundColor: "rgba(201,169,110,0.18)",
                pointerEvents: "none",
              }}
            />

            {YEARS.map((year) => {
              const isActive = year === activeYear;
              return (
                <button
                  key={year}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => handleYearSelect(year)}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: "0 0 32px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "14px",
                    position: "relative",
                    width: isActive ? "168px" : "104px",
                    flexShrink: 0,
                    transition: "width 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                  }}
                >
                  <span
                    style={{
                      fontFamily: DISPLAY,
                      fontSize: isActive ? "56px" : "22px",
                      fontWeight: isActive ? 700 : 400,
                      color: isActive ? CREAM : "rgba(240,237,230,0.2)",
                      lineHeight: 1,
                      letterSpacing: isActive ? "-0.02em" : "-0.01em",
                      transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                      display: "block",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {year}
                  </span>

                  <div
                    style={{
                      width: isActive ? "7px" : "4px",
                      height: isActive ? "7px" : "4px",
                      borderRadius: "50%",
                      backgroundColor: isActive ? GOLD : "rgba(201,169,110,0.28)",
                      transition: "all 0.3s ease",
                      flexShrink: 0,
                      zIndex: 1,
                    }}
                  />

                  {isActive && (
                    <div
                      style={{
                        position: "absolute",
                        bottom: 0,
                        left: "50%",
                        transform: "translateX(-50%)",
                        width: "1px",
                        height: "20px",
                        backgroundColor: GOLD,
                      }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Chapter Divider */}
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 48px" }}>
        <div style={{ borderTop: "1px solid rgba(240,237,230,0.08)", paddingTop: "48px" }} />
      </div>

      {/* Category Navigator */}
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 48px 48px" }}>
        {availableCategories.length > 0 ? (
          <div style={{ display: "flex", alignItems: "center", gap: 0, borderBottom: "1px solid rgba(240,237,230,0.08)" }}>
            {ALL_CATEGORIES.map((cat) => {
              if (!availableCategories.includes(cat)) return null;
              const isActive = cat === activeCategory;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: "16px 32px 16px 0",
                    fontFamily: SANS,
                    fontSize: "12px",
                    fontWeight: isActive ? 600 : 400,
                    letterSpacing: "0.18em",
                    color: isActive ? GOLD : "rgba(240,237,230,0.38)",
                    textTransform: "uppercase",
                    position: "relative",
                    transition: "color 0.25s ease",
                    borderBottom: isActive ? `1px solid ${GOLD}` : "1px solid transparent",
                    marginBottom: "-1px",
                  }}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        ) : (
          <div
            style={{
              fontFamily: SANS,
              fontSize: "10px",
              fontWeight: 600,
              letterSpacing: "0.2em",
              color: "rgba(240,237,230,0.28)",
              textTransform: "uppercase",
              borderBottom: "1px solid rgba(240,237,230,0.08)",
              paddingBottom: "16px",
            }}
          >
            No verified records yet
          </div>
        )}
      </div>

      {/* Results Content Area */}
      {activeCategory === "THEORY" ? (
        <TheoryResultsOrbital data={THEORY_ORBITAL_DATA} />
      ) : (
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 48px 160px", minHeight: "360px" }}>
          <ResultsPanel year={activeYear} category={activeCategory} />
        </div>
      )}

      <style>{`
        .results-year-scroll::-webkit-scrollbar {
          display: none;
        }
        @media (max-width: 900px) {
          .kcet-highlights-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 700px) {
          .results-panel-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
          .theory-stats-grid {
            grid-template-columns: 1fr !important;
          }
          .kcet-cards-grid {
            grid-template-columns: 1fr !important;
          }
          .kcet-highlights-grid {
            grid-template-columns: 1fr !important;
          }
          .neet-table-row {
            grid-template-columns: 1fr 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}

function ResultsPanel({ year, category }: { year: Year; category: Category | null }) {
  const theory = category === "THEORY" ? THEORY_DATA[year] : null;
  const isKcet = category === "KCET";
  const isNeet = category === "NEET";

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "80px", alignItems: "start" }} className="results-panel-grid">
      {/* Left — record meta */}
      <div>
        <div style={{ borderTop: "1px solid rgba(201,169,110,0.3)", paddingTop: "32px" }}>
          <div
            style={{
              fontFamily: SANS,
              fontSize: "10px",
              fontWeight: 600,
              letterSpacing: "0.2em",
              color: "rgba(240,237,230,0.3)",
              textTransform: "uppercase",
              marginBottom: "16px",
            }}
          >
            Academic Record
          </div>

          <div
            style={{
              fontFamily: DISPLAY,
              fontSize: "44px",
              fontWeight: 700,
              color: "rgba(240,237,230,0.06)",
              lineHeight: 1,
              letterSpacing: "-0.02em",
              marginBottom: "32px",
              userSelect: "none",
              whiteSpace: "nowrap",
            }}
          >
            {year}
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <MetaRow label="Academic Year" value={year} />
            <MetaRow label="Category" value={category ?? "—"} />
            <MetaRow label="Status" value={category ? "Verified" : "Pending"} accent={Boolean(category)} />
          </div>
        </div>
      </div>

      {/* Right — record content */}
      <div>
        <div style={{ borderTop: "1px solid rgba(201,169,110,0.3)", paddingTop: "32px" }}>
          {category ? (
            <>
              <div
                style={{
                  fontFamily: DISPLAY,
                  fontSize: "22px",
                  fontWeight: 600,
                  color: CREAM,
                  marginBottom: "8px",
                  letterSpacing: "-0.01em",
                }}
              >
                {CATEGORY_LABEL[category]} &mdash; {year}
              </div>
              <p
                style={{
                  fontFamily: SANS,
                  fontSize: "13px",
                  fontWeight: 300,
                  color: "rgba(240,237,230,0.4)",
                  lineHeight: 1.7,
                  marginBottom: "40px",
                }}
              >
                {CATEGORY_BLURB[category]}
              </p>

              {theory && (
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", columnGap: "48px", rowGap: "0" }} className="theory-stats-grid">
                  <StatRow label="Students" value={String(theory.students)} />
                  <StatRow label="Passed" value={String(theory.passed)} />
                  <StatRow label="Pass Percentage" value={theory.passPercentage} accent />
                  <StatRow label="First Class" value={String(theory.firstClass)} />
                  <StatRow label="Distinction" value={String(theory.distinction)} />
                  <StatRow label="First Rank" value={`${theory.firstRankScore} (${theory.firstRankPercentage})`} accent />
                </div>
              )}

              {isKcet && <KcetContent year={year} />}
              {isNeet && <NeetContent year={year} />}
            </>
          ) : (
            <>
              <div
                style={{
                  fontFamily: DISPLAY,
                  fontSize: "22px",
                  fontWeight: 600,
                  color: CREAM,
                  marginBottom: "8px",
                  letterSpacing: "-0.01em",
                }}
              >
                Records for {year}
              </div>
              <p
                style={{
                  fontFamily: SANS,
                  fontSize: "13px",
                  fontWeight: 300,
                  color: "rgba(240,237,230,0.4)",
                  lineHeight: 1.7,
                  marginBottom: 0,
                }}
              >
                Official results for this year have not yet been added to the archive. Records
                are published here once submitted and verified.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function SubheadLabel({ children }: { children: string }) {
  return (
    <div
      style={{
        marginBottom: "16px",
        fontFamily: SANS,
        fontSize: "10px",
        fontWeight: 600,
        letterSpacing: "0.2em",
        color: "rgba(240,237,230,0.3)",
        textTransform: "uppercase",
      }}
    >
      {children}
    </div>
  );
}

function KcetContent({ year }: { year: Year }) {
  if (year === "2025–26") {
    return (
      <div>
        <SubheadLabel>2025–26 Hero Highlights</SubheadLabel>
        <div
          className="kcet-highlights-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "1px",
            backgroundColor: "rgba(240,237,230,0.07)",
            border: "1px solid rgba(240,237,230,0.07)",
            marginBottom: "56px",
          }}
        >
          {KCET_HERO_HIGHLIGHTS.map((h, i) => (
            <div key={i} style={{ backgroundColor: INK, padding: "24px 20px" }}>
              <div style={{ fontFamily: DISPLAY, fontSize: "34px", fontWeight: 700, color: GOLD, lineHeight: 1, marginBottom: "10px" }}>
                {h.rank}
              </div>
              <div
                style={{
                  fontFamily: SANS,
                  fontSize: "9px",
                  fontWeight: 600,
                  letterSpacing: "0.14em",
                  color: "rgba(240,237,230,0.4)",
                  textTransform: "uppercase",
                  marginBottom: "8px",
                }}
              >
                KCET State Rank
              </div>
              <div style={{ fontFamily: SANS, fontSize: "12px", color: "rgba(240,237,230,0.7)", marginBottom: "4px", lineHeight: 1.4 }}>
                {h.course}
              </div>
              <div style={{ fontFamily: SANS, fontSize: "12px", fontWeight: 500, color: CREAM }}>{h.student}</div>
            </div>
          ))}
        </div>

        <SubheadLabel>2025–26 Student Achievements</SubheadLabel>
        <div
          className="kcet-cards-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "1px",
            backgroundColor: "rgba(240,237,230,0.07)",
            border: "1px solid rgba(240,237,230,0.07)",
          }}
        >
          {KCET_2025_26_STUDENTS.map((s) => {
            const sorted = [...s.ranks].sort((a, b) => a.rank - b.rank);
            const [top, ...rest] = sorted;
            return (
              <div key={s.name} style={{ backgroundColor: INK, padding: "24px" }}>
                <div
                  style={{
                    fontFamily: SANS,
                    fontSize: "9px",
                    fontWeight: 600,
                    letterSpacing: "0.18em",
                    color: GOLD,
                    textTransform: "uppercase",
                    marginBottom: "10px",
                  }}
                >
                  KCET
                </div>
                <div style={{ fontFamily: DISPLAY, fontSize: "17px", fontWeight: 600, color: CREAM, marginBottom: "14px" }}>
                  {s.name}
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    justifyContent: "space-between",
                    borderTop: "1px solid rgba(240,237,230,0.07)",
                    paddingTop: "10px",
                  }}
                >
                  <span style={{ fontFamily: SANS, fontSize: "12px", color: "rgba(240,237,230,0.55)" }}>{top.course}</span>
                  <span style={{ fontFamily: DISPLAY, fontSize: "16px", fontWeight: 600, color: GOLD }}>{top.rank}</span>
                </div>
                {rest.length > 0 && (
                  <details style={{ marginTop: "12px" }}>
                    <summary
                      style={{
                        cursor: "pointer",
                        fontFamily: SANS,
                        fontSize: "10px",
                        fontWeight: 500,
                        letterSpacing: "0.1em",
                        color: "rgba(240,237,230,0.35)",
                        textTransform: "uppercase",
                      }}
                    >
                      View all {sorted.length} ranks
                    </summary>
                    <div style={{ marginTop: "10px", display: "flex", flexDirection: "column", gap: "6px" }}>
                      {rest.map((r, i) => (
                        <div key={i} style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
                          <span style={{ fontFamily: SANS, fontSize: "11px", color: "rgba(240,237,230,0.45)" }}>{r.course}</span>
                          <span style={{ fontFamily: SANS, fontSize: "11px", color: "rgba(240,237,230,0.55)" }}>{r.rank}</span>
                        </div>
                      ))}
                    </div>
                  </details>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  const historical = KCET_HISTORICAL[year];
  if (!historical) return null;

  return (
    <div>
      <SubheadLabel>Historical Year Highlights</SubheadLabel>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {historical.flatMap((h) =>
          h.ranks.map((r, i) => (
            <div
              key={`${h.course}-${i}`}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                borderBottom: "1px solid rgba(240,237,230,0.07)",
                padding: "14px 0",
              }}
            >
              <span style={{ fontFamily: SANS, fontSize: "13px", color: "rgba(240,237,230,0.65)" }}>{h.course}</span>
              <span style={{ fontFamily: DISPLAY, fontSize: "17px", fontWeight: 600, color: GOLD }}>KCET State Rank {r}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

function SeatBadges({ items }: { items: NeetSeatSummary[] }) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
      {items.map((item) => (
        <div
          key={item.label}
          style={{
            border: "1px solid rgba(201,169,110,0.25)",
            padding: "10px 18px",
            display: "flex",
            alignItems: "baseline",
            gap: "8px",
          }}
        >
          <span style={{ fontFamily: DISPLAY, fontSize: "20px", fontWeight: 700, color: GOLD }}>{item.count}</span>
          <span style={{ fontFamily: SANS, fontSize: "12px", color: "rgba(240,237,230,0.65)" }}>{item.label}</span>
        </div>
      ))}
    </div>
  );
}

function NeetRankedGroup({
  title,
  students,
  highest,
}: {
  title: string;
  students: NeetRankedStudent[];
  highest: number;
}) {
  const hasRanks = students.some((s) => s.air != null);
  return (
    <div style={{ border: "1px solid rgba(240,237,230,0.08)", padding: "24px", marginBottom: "20px" }}>
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "baseline", justifyContent: "space-between", gap: "12px", marginBottom: "18px" }}>
        <div style={{ fontFamily: DISPLAY, fontSize: "18px", fontWeight: 600, color: CREAM }}>{title}</div>
        <div style={{ display: "flex", gap: "24px" }}>
          <span style={{ fontFamily: SANS, fontSize: "11px", color: "rgba(240,237,230,0.45)" }}>
            {students.length} students
          </span>
          <span style={{ fontFamily: SANS, fontSize: "11px", color: "rgba(240,237,230,0.45)" }}>
            Highest Score: <span style={{ color: GOLD, fontWeight: 600 }}>{highest}</span>
          </span>
        </div>
      </div>

      <details>
        <summary
          style={{
            cursor: "pointer",
            fontFamily: SANS,
            fontSize: "10px",
            fontWeight: 600,
            letterSpacing: "0.16em",
            color: "rgba(240,237,230,0.4)",
            textTransform: "uppercase",
          }}
        >
          View Complete Results
        </summary>
        <div style={{ marginTop: "16px", display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: hasRanks ? "2fr 1fr 1fr 1fr" : "2fr 1fr",
              gap: "12px",
              padding: "8px 0",
              borderBottom: "1px solid rgba(240,237,230,0.1)",
            }}
            className="neet-table-row"
          >
            <span style={{ fontFamily: SANS, fontSize: "9px", fontWeight: 600, letterSpacing: "0.14em", color: "rgba(240,237,230,0.3)", textTransform: "uppercase" }}>Student</span>
            <span style={{ fontFamily: SANS, fontSize: "9px", fontWeight: 600, letterSpacing: "0.14em", color: "rgba(240,237,230,0.3)", textTransform: "uppercase" }}>Marks</span>
            {hasRanks && (
              <>
                <span style={{ fontFamily: SANS, fontSize: "9px", fontWeight: 600, letterSpacing: "0.14em", color: "rgba(240,237,230,0.3)", textTransform: "uppercase" }}>All-India Rank</span>
                <span style={{ fontFamily: SANS, fontSize: "9px", fontWeight: 600, letterSpacing: "0.14em", color: "rgba(240,237,230,0.3)", textTransform: "uppercase" }}>Category Rank</span>
              </>
            )}
          </div>
          {students.map((s, i) => (
            <div
              key={i}
              className="neet-table-row"
              style={{
                display: "grid",
                gridTemplateColumns: hasRanks ? "2fr 1fr 1fr 1fr" : "2fr 1fr",
                gap: "12px",
                padding: "10px 0",
                borderBottom: i < students.length - 1 ? "1px solid rgba(240,237,230,0.05)" : "none",
              }}
            >
              <span style={{ fontFamily: SANS, fontSize: "12px", color: "rgba(240,237,230,0.75)" }}>{s.name}</span>
              <span style={{ fontFamily: DISPLAY, fontSize: "13px", fontWeight: 600, color: GOLD }}>{s.marks}</span>
              {hasRanks && (
                <>
                  <span style={{ fontFamily: SANS, fontSize: "12px", color: "rgba(240,237,230,0.5)" }}>{s.air ?? "—"}</span>
                  <span style={{ fontFamily: SANS, fontSize: "12px", color: "rgba(240,237,230,0.5)" }}>{s.categoryRank ?? "—"}</span>
                </>
              )}
            </div>
          ))}
        </div>
      </details>
    </div>
  );
}

function NeetCourseGroupDetail({ group }: { group: NeetCourseGroup }) {
  return (
    <div style={{ marginBottom: "20px" }}>
      <div style={{ fontFamily: SANS, fontSize: "11px", fontWeight: 600, letterSpacing: "0.1em", color: GOLD, textTransform: "uppercase", marginBottom: "10px" }}>
        {group.course}
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {group.students.map((s, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "baseline",
              justifyContent: "space-between",
              gap: "6px 16px",
              padding: "10px 0",
              borderBottom: i < group.students.length - 1 ? "1px solid rgba(240,237,230,0.05)" : "none",
            }}
          >
            <span style={{ fontFamily: SANS, fontSize: "12px", color: "rgba(240,237,230,0.75)" }}>{s.name}</span>
            <span style={{ fontFamily: SANS, fontSize: "10px", color: "rgba(240,237,230,0.35)", flex: "1 1 auto" }}>{s.college}</span>
            <span style={{ fontFamily: DISPLAY, fontSize: "14px", fontWeight: 600, color: GOLD, flexShrink: 0 }}>{s.marks}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function NeetContent({ year }: { year: Year }) {
  const simple = NEET_SIMPLE[year];
  if (simple) {
    return (
      <div>
        <SubheadLabel>Verified Selections</SubheadLabel>
        <SeatBadges items={simple} />
      </div>
    );
  }

  if (year === "2021–22") {
    return (
      <div>
        <SubheadLabel>Verified Highlights</SubheadLabel>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "40px" }}>
          <div>
            <div style={{ fontFamily: DISPLAY, fontSize: "40px", fontWeight: 700, color: GOLD, lineHeight: 1, marginBottom: "8px" }}>
              {NEET_2021_22.highestScore}
            </div>
            <div style={{ fontFamily: SANS, fontSize: "10px", fontWeight: 600, letterSpacing: "0.14em", color: "rgba(240,237,230,0.4)", textTransform: "uppercase" }}>
              Highest NEET Score
            </div>
          </div>
          <SeatBadges items={[{ label: "BAMS Seats", count: NEET_2021_22.bamsSeats }]} />
        </div>
      </div>
    );
  }

  const detailed = NEET_DETAILED[year];
  if (detailed) {
    return (
      <div>
        <SubheadLabel>Verified Selections</SubheadLabel>
        <div style={{ marginBottom: "28px" }}>
          <SeatBadges items={detailed.summary} />
        </div>

        <details>
          <summary
            style={{
              cursor: "pointer",
              fontFamily: SANS,
              fontSize: "10px",
              fontWeight: 600,
              letterSpacing: "0.16em",
              color: "rgba(240,237,230,0.4)",
              textTransform: "uppercase",
            }}
          >
            View Complete Results
          </summary>
          <div style={{ marginTop: "20px" }}>
            {detailed.groups.map((group) => (
              <NeetCourseGroupDetail key={group.course} group={group} />
            ))}
          </div>
        </details>
      </div>
    );
  }

  if (year === "2025–26") {
    return (
      <div>
        <SubheadLabel>2025–26 NEET Results</SubheadLabel>
        <NeetRankedGroup title="Long-Term NEET" students={NEET_2025_26_LONG_TERM} highest={612} />
        <NeetRankedGroup title="Regular NEET" students={NEET_2025_26_REGULAR} highest={504} />
        <div style={{ marginTop: "24px" }}>
          <SeatBadges items={[{ label: "Veterinary Science", count: NEET_2025_26_VETERINARY_COUNT }]} />
        </div>
      </div>
    );
  }

  return null;
}

function StatRow({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottom: "1px solid rgba(240,237,230,0.07)",
        padding: "14px 0",
      }}
    >
      <span
        style={{
          fontFamily: SANS,
          fontSize: "11px",
          fontWeight: 500,
          letterSpacing: "0.1em",
          color: "rgba(240,237,230,0.4)",
          textTransform: "uppercase",
        }}
      >
        {label}
      </span>
      <span
        style={{
          fontFamily: DISPLAY,
          fontSize: "18px",
          fontWeight: 600,
          color: accent ? GOLD : CREAM,
          letterSpacing: "-0.01em",
        }}
      >
        {value}
      </span>
    </div>
  );
}

function MetaRow({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottom: "1px solid rgba(240,237,230,0.06)",
        paddingBottom: "10px",
      }}
    >
      <span
        style={{
          fontFamily: SANS,
          fontSize: "10px",
          fontWeight: 500,
          letterSpacing: "0.15em",
          color: "rgba(240,237,230,0.28)",
          textTransform: "uppercase",
        }}
      >
        {label}
      </span>
      <span
        style={{
          fontFamily: SANS,
          fontSize: "11px",
          fontWeight: accent ? 600 : 400,
          color: accent ? GOLD : "rgba(240,237,230,0.55)",
          letterSpacing: accent ? "0.12em" : "0.04em",
          textTransform: accent ? "uppercase" : "none",
        }}
      >
        {value}
      </span>
    </div>
  );
}
