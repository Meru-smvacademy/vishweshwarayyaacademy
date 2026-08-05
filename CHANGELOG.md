# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [0.3.0] - 2026-08-03

**Implementation phase complete**, except Module 5 (Results & Success Stories), which remains intentionally on hold until verified admission data is supplied in `docs/RESULTS_FOUNDATION.md`.

### Added
- SNT Scholarship page (Module 7) at `/scholarship` — Introduction, About/Vision/Categories narrative sections, Objectives and Benefits as icon-card grids, Eligibility as icon cards, a numbered Selection Process timeline, Required Documents and Important Dates checklists, an FAQ accordion, and a Contact card; built verbatim from `docs/SCHOLARSHIP_FOUNDATION.md`.
- Admissions page (Module 8) at `/admissions` — hero, Programs Offered icon-card grid, a 5-step Admission Process timeline, a Required Documents section, and a Contact section with prominent Call Now buttons; built verbatim from `docs/ADMISSIONS_FOUNDATION.md`.
- Gallery page (Module 9) at `/gallery` — all 8 required categories (Campus, Classrooms, Laboratories, Academic Activities, Scholarship Examination, Student Activities, Annual Day & Cultural Events, Results & Achievements) as forward-compatible placeholder cards; no stock photography used anywhere.
- FAQ page (Module 10) at `/faq` — all 10 questions across the 5 required categories (Admissions, Courses, Scholarship, Hostel, Contact) in a single globally-exclusive accordion (only one answer open at a time, verified programmatically), built verbatim from `docs/FAQ_FOUNDATION.md`.
- Admission Enquiry page at `/admission-enquiry` — wired the pre-existing `EnquiryForm`, validation logic, and `/api/enquiry` route into a live page, fixing a sitewide 404 on the site's primary CTA.
- `docs/SCHOLARSHIP_FOUNDATION.md`, `docs/ADMISSIONS_FOUNDATION.md`, `docs/GALLERY_FOUNDATION.md`, `docs/FAQ_FOUNDATION.md`, `docs/RESULTS_FOUNDATION.md` (structure only, awaiting content) — source-of-truth documents for each module.
- Shared `ui/` components promoted or added as multiple pages began needing them: `ContentBlocks` (moved from `courses/`), `ProseSection`, `IconCardGrid`, `IconChecklist`, `IconListSection`, `StepTimeline`, `ContactCard`, `GalleryPlaceholderTile`.

### Changed
- Replaced the "Faculty" navigation item with an external "Our Team" link to KRITPrep (opens in a new tab); no Faculty page was built, and team information is intentionally not duplicated on this site.

### Fixed
- The primary "Admission Enquiry" CTA — present on every page, the header, and the sticky mobile bar — returned a 404. Root cause: the enquiry form and its backing logic were built early but never connected to a page after an earlier pivot to the homepage. Found during a full-project QA pass; verified fixed across all pages, the header, footer, and mobile sticky CTA.

### Known issues
- Three content fields in `docs/COURSES_FOUNDATION.md` remain pending correction (unchanged from 0.2.0).
- Five FAQ answers and one website URL in `docs/SCHOLARSHIP_FOUNDATION.md`, and the Required Documents section in `docs/ADMISSIONS_FOUNDATION.md`, remain pending real content.
- All 8 Gallery categories await real photographs.
- Several nav/footer links (`/about`, `/about/infrastructure`, `/results`, `/results/stories`, `/tribute`, `/hostel`, `/contact`, `/legal/privacy`, `/legal/terms`, and the four `/courses/[slug]` deep links) point to pages not yet built — expected at this stage, not a defect.
- `NEXT_PUBLIC_ACADEMY_PHONE` remains unset — Call Now buttons and the header phone display have no number until it's configured.

## [0.2.0] - 2026-08-03

### Added
- Our Philosophy page (Module 3) at `/philosophy` — Hero, Why We Exist, Our Beginning, "We Don't Deliver Lectures. We Design Learning.", The Sir M V Learning Ecosystem, The Legacy That Inspires Us, SNT Scholarship, Founder & Administrator's Message, and Final Admission CTA, built verbatim from `docs/BRAND_FOUNDATION.md`.
- `docs/BRAND_FOUNDATION.md` — source-of-truth document for the Philosophy page's approved brand content.
- Academic Pathways / Courses hub (Module 4) at `/courses` — Introduction, six accessible program accordions (Foundation, NEET Achievement, NEET Long-Term, JEE Achievement, JEE Long-Term, KCET Integrated), The Sir M V Learning Advantage, KRIT Academic Ecosystem, KRIT Counselling, and Admission Journey, built verbatim from `docs/COURSES_FOUNDATION.md`.
- `docs/COURSES_FOUNDATION.md` — source-of-truth document for the Courses module's approved content.
- Shared `PillarCard` UI component (promoted from a Philosophy-specific component once Courses became a second consumer) and a reusable `ContentBlocks` renderer for structured prose/list content.

### Known issues
- Three content fields in `docs/COURSES_FOUNDATION.md` contain misplaced or duplicated text (NEET Achievement's Teaching Methodology; NEET Long-Term's and JEE Long-Term's Who is it for?) and render as pending placeholders on `/courses` until the source document is corrected. Tracked in `docs/CONTENT_CHECKLIST.md` item 10.

## [0.1.0] - 2026-08-02

### Added
- Project initialization — Next.js 15, React 19, TypeScript, Tailwind CSS, App Router, and ESLint, with a clean folder structure (`components/`, `lib/`, `types/`, `config/`).
- Module 1 (shared layout & navigation) — sticky header with desktop and mobile nav, a Courses dropdown (NEET/JEE/KCET/Foundation), a prominent external KRITPrep link, a sticky mobile CTA bar (Admission Enquiry, Call Now), a footer, and brand design tokens in `globals.css`.
- Homepage (Module 2) — Hero, Why Choose Us, Courses Overview, Results Highlights, Success Stories Preview, SNT Scholarship Preview, Tribute Story Preview, Branches, and Final Admission CTA sections, built from reusable components (`SectionHeading`, `PlaceholderTag`, `ProgramCard`, `StatCard`, `StoryCard`).
- `docs/PROJECT_RULES.md` — governing project rules (vision, brand, coding standards, AI workflow rules).
- `docs/CONTENT_CHECKLIST.md` — tracked checklist of placeholder content pending real data.

### Changed
- Homepage refinements — added a mid-page Admission CTA section, a Hero trust strip (tagline + stat), a click-to-call phone number in the desktop header, and restructured the footer into grouped columns (About / Programs / Admissions); fixed duplicate placeholder initials on the Success Story cards.

### Infrastructure
- Git initialization — initialized the repository.
- Initial commit `61f9f3a` — "Complete Module 2 - Homepage and shared layout".
