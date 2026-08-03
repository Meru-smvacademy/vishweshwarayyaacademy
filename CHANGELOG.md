# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

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
