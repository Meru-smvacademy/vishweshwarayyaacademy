# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [Unreleased]

### Changed
- The SNT exam registration form is now served at `/snt` (a real route, so QR scans with no referrer work). `/scholarship/apply` serves the same page for links already in circulation; both set `/snt` as the canonical URL, the sitemap lists `/snt` instead of `/scholarship/apply`, and the scholarship page's Apply button links to `/snt`. The status and hall-ticket routes are unchanged and are the same whichever address the parent started from.
- `/scholarship/apply`, the registration status page and the closed page: text darkened for outdoor readability. All English text uses the form's navy ink (16.5:1 on white), Kannada lines `--scholarship-navy-light` (11.5:1), placeholders and empty selects `--muted` (6.0:1); input underlines are 2px `--muted` (navy on focus, red on error); gold is no longer used for text. Every text/background pair passes WCAG AA (lowest 5.05:1). Colour and border weight only — no layout, spacing or size changes.
- SNT hall ticket numbers are now exactly 10 digits — the exam year (`SNT_EXAM.examYear`, set to 2027) followed by a 6-digit sequence, e.g. `2027000001` — issued only on payment confirmation from a locked per-year row (`snt_hall_ticket_sequences`, migration `0009_snt_numeric_hall_ticket.sql`, which replaces `snt_hall_ticket_counters` and refuses to run while old `SNT26-…` rows exist). Shown on the hall ticket PDF in a bordered box labelled "HALL TICKET NUMBER / ಹಾಲ್ ಟಿಕೆಟ್ ಸಂಖ್ಯೆ", one digit per cell for OMR copying, and on the status page, admin list and export.
- `/scholarship/apply` shows Kannada beneath every English label, option, helper line, button, error, consent text, fee line, exam-centre block and notice; the registration-closed page too. All Kannada strings are in `src/content/scholarship-kn.ts` (draft wording — to be reviewed by the office).
- Noto Sans Kannada is self-hosted for the web (`src/app/fonts/noto-sans-kannada`, loaded only where Kannada appears) and embedded in the hall ticket PDF. Added `regenerator-runtime` — `@pdf-lib/fontkit`'s Kannada shaper needs it as a global.
- Fonts are self-hosted with `next/font/local` instead of `next/font/google`, so builds no longer fetch Google Fonts (intermittent Vercel build failures in `src/app/layout.tsx`). All 20 families keep their weights, styles, CSS variables and fallback metrics; the woff2 files (Google Fonts latin + latin-ext subsets, OFL licences alongside) are in `src/app/fonts`.

## [0.4.0] - 2026-10-14

### Added
- SNT Scholarship Exam paid registration (Module 17) on the existing `/scholarship/apply` page — existing fields and design kept; added student passport photo (JPG/PNG, max 4 MB, resized client-side to 600×800, previewed), parent/guardian name, WhatsApp number (defaults to phone), date of birth, medium of studying (Kannada/English/Urdu/Other), a rules-and-regulations checkbox linking to the rules PDF, and a required parent/guardian consent checkbox. No Aadhaar numbers are collected. There is a single exam centre (Lingasugur), set server-side from `SNT_EXAM.centre` and shown with its address on the application page, the confirmation page and the hall ticket.
- `scholarship_registrations` table, private `snt-photos` storage bucket, hall-ticket counter and payment-outcome functions (`supabase/migrations/0007_snt_scholarship_registrations.sql`). All writes go through server routes; admins have read-only access.
- Direct Razorpay integration: `POST /api/scholarship/order` creates the order (amount fixed in config, receipt = registration id, notes product/batch/registration). This site's signed webhook `POST /api/scholarship/webhook` is the only place a registration becomes paid or failed; it re-reads the payment and order from Razorpay, ignores non-SNT events, and is idempotent on the Razorpay event id. Hall ticket numbers (`SNT26-00001`…) are issued only on a captured payment, transactionally, unique and gapless.
- Net settlement via Razorpay Route (migration 0008): after capture, amount paid minus Razorpay's fee (incl. GST) is transferred to the academy's linked account (`SNT_ROUTE_ACCOUNT_ID`) exactly once, with retries; no commission. Fee, GST, transferred amount and transfer id are stored per registration, shown in admin with totals and in the export; unresolved transfers are listed with a retry button.
- No last date of registration: spot entry is allowed on exam day. Registration and new payments close automatically when the exam begins (`examDate` + `reportingTime`, IST, in `src/content/scholarship.ts`); while `examDate` is unset, registration stays open.
- `/scholarship/registration/[id]` — status page with Pay now (pending/failed) and hall-ticket download (paid). 2-page A4 hall-ticket PDF at `/api/scholarship/ticket/[id]` (paid only); rules PDF at `/api/scholarship/rules`, both rendered from `src/content/scholarship-rules.ts`.
- `/admin/scholarship` — photo thumbnails, hall ticket numbers, payment status, consent, filters (status, class, medium), search, totals with medium/class counts, centre column, CSV export (Excel-ready) including payment, order and transfer ids, and ticket re-download.
- `tests/snt` integration suite (`npm run test:snt`) with a mock of the Razorpay API: success with correct net transfer, tampered amount, failed payment, duplicate webhook event, non-SNT webhook ignored, transfer failure and retry, 20 concurrent payments, oversized and non-image photos, consent enforcement, webhook signature checks.
- Dependencies: `pdf-lib`, `@pdf-lib/fontkit`; bundled Noto Sans/Serif fonts (OFL) for the PDF.

### Known issues
- Exam date, reporting time, duration, scholarship/prize details, centre addresses and all rules text are TODO placeholders in `src/content/scholarship.ts` and `src/content/scholarship-rules.ts`.
- End-to-end Razorpay test-mode checkout has not been exercised against real Razorpay (only against a local mock of its API).
- Razorpay Route charges its own transfer fee to the account holding the API keys (not to the academy); that account needs balance to cover it.
- The site header overflows horizontally by 2px at 1280px width (pre-existing, all pages).

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
