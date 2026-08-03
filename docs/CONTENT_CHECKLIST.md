# Homepage Content Checklist

Tracks every placeholder currently live on the homepage (see [PROJECT_RULES.md](PROJECT_RULES.md) §11 rule 2 — no content invention). Check off each item as real, verified content is supplied and wired in.

## Module Status

| Module | Page | Status |
|---|---|---|
| 1 | Shared layout & navigation | ✅ Approved |
| 2 | Homepage (`/`) | ✅ Approved |
| 3 | Our Philosophy (`/philosophy`) | ✅ Approved (2026-08-03) |
| 4 | Academic Pathways / Courses (`/courses`) | ✅ Approved (2026-08-03) — 3 content fields still pending correction, see item 10 |

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

---

**Status:** 9 / 10 Philosophy items resolved (all Founder's Message flags now confirmed). Homepage items 1–8 remain outstanding. Academic Pathways (item 10) is built from `docs/COURSES_FOUNDATION.md` with 3 fields pending your correction of the source document.
