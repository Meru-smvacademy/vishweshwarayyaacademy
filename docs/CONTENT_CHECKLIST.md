# Homepage Content Checklist

Tracks every placeholder currently live on the homepage (see [PROJECT_RULES.md](PROJECT_RULES.md) §11 rule 2 — no content invention). Check off each item as real, verified content is supplied and wired in.

## Module Status

| Module | Page | Status |
|---|---|---|
| 1 | Shared layout & navigation | ✅ Approved |
| 2 | Homepage (`/`) | ✅ Approved |
| 3 | Our Philosophy (`/philosophy`) | ✅ Approved (2026-08-03) |
| 4 | Academic Pathways / Courses (`/courses`) | ✅ Approved (2026-08-03) — 3 content fields still pending correction, see item 10 |
| 7 | SNT Scholarship (`/scholarship`) | ✅ Approved (2026-08-03) — 5 FAQ answers + website URL still pending, see item 11 |
| 8 | Admissions (`/admissions`) | ✅ Approved (2026-08-03) — Required Documents still pending, see item 12 |
| 9 | Gallery (`/gallery`) | ✅ Approved (2026-08-03) — all 8 categories still placeholders, see item 13 |
| 10 | FAQ (`/faq`) | 🔶 Built, pending approval — fully resolved, no pending content, see item 14 |

---

## 1. Hero illustration
- [ ] Replace `public/illustrations/hero-placeholder.svg` with a real photo or commissioned illustration.
- File: [Hero.tsx](../src/components/home/Hero.tsx)

## 2. Why Choose Us — 6 feature descriptions
- [ ] Experienced Faculty — real description (credentials, experience)
- [ ] Structured Curriculum — real description (methodology)
- [ ] Regular Assessments — real description (testing cadence)
- [ ] Performance Tracking — real description (how progress is monitored)
- [ ] Disciplined Environment — real description (campus culture)
- [ ] Modern Infrastructure — real description (facilities)
- File: [WhyChooseUs.tsx](../src/components/home/WhyChooseUs.tsx)

## 3. Results Highlights — 4 statistics
- [ ] Selections — real number
- [ ] Top Rankers — real number
- [ ] Qualifying Rate — real percentage
- [ ] Years of Coaching — real number
- File: [ResultsHighlights.tsx](../src/components/home/ResultsHighlights.tsx)
- Note: per PROJECT_RULES.md §9, published results must carry a `verified` flag and consent record once the data layer exists — these 4 numbers should trace back to real, checkable figures.

## 4. Success Stories Preview — 3 student stories
- [ ] Story 1 (NEET) — real name (with consent), photo/initials, quote
- [ ] Story 2 (JEE) — real name (with consent), photo/initials, quote
- [ ] Story 3 (KCET) — real name (with consent), photo/initials, quote
- File: [SuccessStoriesPreview.tsx](../src/components/home/SuccessStoriesPreview.tsx)
- Note: per PROJECT_RULES.md §9, each story requires a linked consent record before publish (guardian consent if the student was a minor at the time).

## 5. Tribute Story preview copy
- [ ] Short, factually-verifiable intro paragraph about Sir M. Visvesvaraya's connection to the academy's name
- File: [TributePreview.tsx](../src/components/home/TributePreview.tsx)
- Note: per PROJECT_RULES.md §8, content must be sourced/attributed — no embellishment.

## 6. Branch addresses
- [ ] Lingasuguru branch — full address
- [ ] Sindhanuru branch — full address
- File: [BranchCard.tsx](../src/components/home/BranchCard.tsx)

## 7. Academy phone number
- [ ] Set `NEXT_PUBLIC_ACADEMY_PHONE` in `.env.local` (currently unset — Call Now buttons link to `tel:` with no number, and the desktop header phone display won't render at all until this is set)
- Used by: desktop header, sticky mobile CTA, both Branch cards, mid-page Admission CTA

## 8. Hero trust tagline + stat
- [ ] Replace "Since XXXX" with the academy's actual founding year
- [ ] Replace "1200+ Students Guided" with a real, verifiable number
- File: [Hero.tsx](../src/components/home/Hero.tsx)

## 9. Our Philosophy page — content status
- [x] ~~Hero tagline~~ — resolved: "Come to Learn. Go to Serve." (2026-08-02)
- [x] ~~"Why We Exist" paragraph~~ — resolved from `docs/BRAND_FOUNDATION.md` (2026-08-02)
- [x] ~~"Our Beginning" paragraph~~ — resolved from `docs/BRAND_FOUNDATION.md` (2026-08-02)
- [x] ~~"We Don't Deliver Lectures. We Design Learning." paragraph~~ — resolved from `docs/BRAND_FOUNDATION.md` (2026-08-02)
- [x] ~~"The Sir M V Learning Ecosystem" content~~ — resolved from `docs/BRAND_FOUNDATION.md`, all 6 pillars (2026-08-02)
- [x] ~~"The Legacy That Inspires Us" pull-quote~~ — resolved: "Empowering Students. Empowering the Nation." (2026-08-02)
- [x] ~~"The Legacy That Inspires Us" full paragraph~~ — resolved from `docs/BRAND_FOUNDATION.md` (2026-08-02)
- [x] ~~SNT Scholarship legacy content~~ — resolved from `docs/BRAND_FOUNDATION.md`, page-specific (distinct from the homepage's generic copy) (2026-08-02)
- [x] ~~Founder & Administrator's name~~ — resolved: Ramesh Tegginamani (2026-08-02)
- [x] ~~Founder & Administrator's message~~ — resolved from `docs/BRAND_FOUNDATION.md` (2026-08-02)
- **Flag (resolved 2026-08-02):** `docs/BRAND_FOUNDATION.md`'s Founder's Message section contained the same message pasted three times with slightly different wording. The majority version was used; user confirmed Name (Ramesh Tegginamani), Title (Founder & Administrator), and single-message treatment as correct.
- Files: [PhilosophyHero.tsx](../src/components/philosophy/PhilosophyHero.tsx), [page.tsx](../src/app/philosophy/page.tsx), [LearningEcosystem.tsx](../src/components/philosophy/LearningEcosystem.tsx), [FounderMessage.tsx](../src/components/philosophy/FounderMessage.tsx)

## 10. Academic Pathways (Courses) module — 3 corrupted content fields
`docs/COURSES_FOUNDATION.md` had content pasted into the wrong headings in three places. These are marked as pending placeholders on the live `/courses` page rather than guessed at:
- [ ] **NEET Achievement Program → Teaching Methodology** — currently contains a duplicate of the Learning Outcomes bullets, not real methodology text
- [ ] **NEET Long-Term Program → Who is it for?** — currently contains a stray copy of NEET Achievement's KRIT Integration paragraph
- [ ] **JEE Long-Term Program → Who is it for?** — currently contains a duplicate of its own Objective paragraph
- File: [academicPathways.ts](../src/content/academicPathways.ts) (the three fields are set to `null` — see `ProgramAccordion.tsx` for how that renders as a placeholder tag)
- Note: all other content in `docs/COURSES_FOUNDATION.md` (Foundation Program, JEE Achievement Program, KCET Integrated Program, Learning Advantage, KRIT Academic Ecosystem, KRIT Counselling, Admission Journey) was clean and used verbatim.

## 11. SNT Scholarship page — content status
- [x] ~~Introduction through Important Dates (9 sections)~~ — resolved verbatim from `docs/SCHOLARSHIP_FOUNDATION.md` (2026-08-03)
- [ ] FAQ answer — "Who can apply for the SNT Scholarship?"
- [ ] FAQ answer — "Is the scholarship based on merit?"
- [ ] FAQ answer — "Is there any application fee?"
- [ ] FAQ answer — "How is the scholarship awarded?"
- [ ] FAQ answer — "Can students from any school apply?"
- [ ] Website URL — source document itself flags `www.sirmvacademy.com` as provisional ("or your final website address"); rendered as plain text, not a link, pending confirmation
- Files: [scholarship.ts](../src/content/scholarship.ts), [ScholarshipFaq.tsx](../src/components/scholarship/ScholarshipFaq.tsx), [ScholarshipContact.tsx](../src/components/scholarship/ScholarshipContact.tsx)
- Note: the 5 FAQ questions were provided with no answers in the source document — all 5 questions render with a pending-answer tag rather than an invented answer.

## 12. Admissions page — content status
- [x] ~~Admissions Open, Programs Offered, Admission Process~~ — resolved verbatim from `docs/ADMISSIONS_FOUNDATION.md` (2026-08-03)
- [ ] Required Documents — no document list was ever supplied for Admissions; the source's "Required Documents" heading was overwritten by a misplaced copy of the Admission Process text (now corrected — see flag below). Section renders with a pending placeholder tag rather than borrowing the Scholarship page's document list, which is specific to scholarship applicants.
- **Flag:** `docs/ADMISSIONS_FOUNDATION.md`'s "Admission Process" heading was left as literal `_Pending_`, while the actual 5-step process text was pasted under "Required Documents" (itself labeled with its own embedded "## Admission Process" heading). The 5 steps were moved to the correct "Admission Process" section based on that embedded label; "Required Documents" is now correctly empty pending real content.
- **Flag:** the build instruction requested a "4-step" process timeline, but the approved source content has 5 distinct steps (Submit Enquiry → Attend Counselling → Choose Program → Complete Formalities → Begin Journey). All 5 were kept rather than cutting one to match the stated count — confirm if a step should be removed.
- Files: [admissions.ts](../src/content/admissions.ts), [AdmissionProcessSection.tsx](../src/components/admissions/AdmissionProcessSection.tsx), [RequiredDocumentsSection.tsx](../src/components/admissions/RequiredDocumentsSection.tsx)

## 13. Gallery page — content status
- [x] ~~Introduction~~ — resolved verbatim from `docs/GALLERY_FOUNDATION.md` (2026-08-03)
- [ ] Campus — photographs pending
- [ ] Classrooms — photographs pending
- [ ] Laboratories — photographs pending
- [ ] Academic Activities — photographs pending
- [ ] Scholarship Examination — photographs pending
- [ ] Student Activities — photographs pending
- [ ] Annual Day & Cultural Events — photographs pending
- [ ] Results & Achievements — photographs pending
- Files: [gallery.ts](../src/content/gallery.ts), [GalleryCategoryCard.tsx](../src/components/gallery/GalleryCategoryCard.tsx)
- Note: `GalleryCategoryCard` accepts an optional `images` prop — supplying real photos later is a pure data change (pass `images` when calling it from `GalleryGrid.tsx`); no layout or component changes required. No stock photography was used anywhere on this page.

## 14. FAQ page — content status
- [x] ~~All 10 questions across 5 categories (Admissions, Courses, Scholarship, Hostel, Contact)~~ — resolved verbatim from `docs/FAQ_FOUNDATION.md` (2026-08-03)
- Files: [faq.ts](../src/content/faq.ts), [FaqAccordion.tsx](../src/components/faq/FaqAccordion.tsx)
- Note: `docs/FAQ_FOUNDATION.md` was clean and complete — no duplication or misplacement issues, unlike the Courses/Admissions source documents. Nothing is pending for this page.

---

**Status:** 9 / 10 Philosophy items resolved (all Founder's Message flags now confirmed). Homepage items 1–8 remain outstanding. Academic Pathways (item 10) is built from `docs/COURSES_FOUNDATION.md` with 3 fields pending your correction of the source document. SNT Scholarship (item 11) is built with all prose sections resolved; 5 FAQ answers and 1 website URL still pending. Admissions (item 12) is built with Admissions Open / Programs Offered / Admission Process resolved; Required Documents pending real content. Gallery (item 13) is built with the Introduction resolved; all 8 categories await real photographs. FAQ (item 14) is fully resolved with no pending content.
