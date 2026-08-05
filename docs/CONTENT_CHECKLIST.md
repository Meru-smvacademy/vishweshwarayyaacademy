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
| 10 | FAQ (`/faq`) | ✅ Approved (2026-08-03) — fully resolved, no pending content, see item 14 |
| — | P0 fix: Admission Enquiry form wired up (`/admission-enquiry`) | ✅ Approved (2026-08-03) |
| 11 | Contact (`/contact`) | ✅ Approved (2026-08-03) — Office Hours timings + Maps embed pending, see item 15 |
| 12 | Infrastructure (`/about/infrastructure`) | ✅ Approved (2026-08-03) — all 6 sections still placeholders, see item 16 |
| 13 | Hostel (`/hostel`) | ✅ Approved (2026-08-03) — Boys'/Girls' Hostel photos pending, see item 17 |
| 14 (About) | About (`/about`) | ✅ Approved |
| 15 | Privacy Policy (`/legal/privacy`) | ⏳ Built (2026-08-04), pending approval — standard legal boilerplate customized with real contact details, see item 19 |
| 16 | Terms & Conditions (`/legal/terms`) | ⏳ Built (2026-08-04), pending approval — standard legal boilerplate customized with real contact details, see item 20 |

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

## 15. Contact page — content status
- [x] ~~Hero title/subtitle, Address, Phone Numbers, Email~~ — resolved verbatim, supplied directly in the build instruction (2026-08-03)
- [ ] Office Hours — days confirmed (Monday – Saturday); exact timings not yet supplied. Rendered as "Office timings will be announced shortly" rather than inventing hours, and without a visible placeholder tag per the build instruction.
- [ ] Google Maps embed — not yet supplied. Rendered as a clean bordered placeholder ("Map view will be added here"), no placeholder tag chip, easy to swap for a real embed later.
- Files: [MapsSection.tsx](../src/components/contact/MapsSection.tsx), [OfficeHoursSection.tsx](../src/components/contact/OfficeHoursSection.tsx)
- Note: per the build instruction, no `PlaceholderTag` component is shown anywhere on this page — both pending items are communicated through natural copy instead.

## 16. Infrastructure page — content status
- [ ] Campus — photographs pending
- [ ] Smart Classrooms — photographs pending
- [ ] Science Laboratories — photographs pending
- [ ] Digital Learning — photographs pending
- [ ] Library — photographs pending
- [ ] Study Environment — photographs pending
- Files: [infrastructure.ts](../src/content/infrastructure.ts), [InfrastructureGrid.tsx](../src/components/infrastructure/InfrastructureGrid.tsx)
- Note: no facility descriptions were written for any section — only the 6 given section titles are shown, each with a placeholder image tile, to avoid describing facilities not confirmed to exist. `CategoryImageCard` (promoted from Gallery's page-specific card, now shared in `ui/`) accepts an optional `images` prop — supplying real campus photos later is a pure data change, no layout or component changes required. No stock photography was used.

## 17. Hostel page — content status
- [x] ~~Hero, About Our Hostels, Hostel Facilities (6 items), Student Life, Contact~~ — resolved verbatim, supplied directly in the build instruction (2026-08-03)
- [ ] Boys' Hostel — photograph pending
- [ ] Girls' Hostel — photograph pending
- Files: [hostel.ts](../src/content/hostel.ts), [AccommodationSection.tsx](../src/components/hostel/AccommodationSection.tsx)
- Note: no facility descriptions were invented beyond the 6 explicitly given (Safe and secure environment, Comfortable rooms, Study-friendly atmosphere, Nutritious meals, Clean drinking water, Regular supervision and discipline). Hostel enquiry phone numbers reuse the same shared academy contact numbers (no separate hostel-specific number was supplied).

## 18. About page — content status
- [ ] Hero intro, "Our Story" overview, and all four gateway summaries (Philosophy, Infrastructure, Our Team, SNT Scholarship) are original short copy synthesized from already-approved facts in `docs/BRAND_FOUNDATION.md`, `docs/SCHOLARSHIP_FOUNDATION.md`, and `src/content/infrastructure.ts` — no dedicated `ABOUT_FOUNDATION.md` was supplied for this module. Wording deliberately does not repeat Philosophy's "Our Beginning" prose (per the build instruction: "Do not duplicate the Philosophy page").
- Files: [AboutHero.tsx](../src/components/about/AboutHero.tsx), [page.tsx](../src/app/about/page.tsx), [AboutGatewaySection.tsx](../src/components/about/AboutGatewaySection.tsx)
- Note: reused `PhilosophySection` (Our Story), `AboutGatewaySection` (new, mirrors the existing `ScholarshipPreview`/`TributePreview` teaser pattern), and `AdmissionCta` (Final CTA — already the site's "Admission Enquiry + Call Now" banner) rather than building new one-off layouts.

## 19. Privacy Policy page — content status
- [x] ~~Email, Address~~ — resolved verbatim, supplied directly in the build instruction (2026-08-04); both match the already-live `ACADEMY_CONTACT` record in `src/content/contactInfo.ts`, reused via `ContactCard` rather than duplicated.
- [ ] All 10 section bodies (Introduction through Contact Information) are standard privacy-policy boilerplate, grounded in what this website actually does (the Admission Enquiry form's fields, no payment collection, KRITPrep as the only external platform, no WhatsApp/SMS/analytics vendor confirmed as wired up) rather than invented claims. This is not sourced from a dedicated `PRIVACY_FOUNDATION.md` — flagged for your legal review before this page is treated as binding.
- [ ] "Last updated: August 2026" reflects the build date, not a reviewed effective date — update if formal legal sign-off happens on a different date.
- Files: [privacyPolicy.ts](../src/content/privacyPolicy.ts), [page.tsx](../src/app/legal/privacy/page.tsx), [LegalHero.tsx](../src/components/legal/LegalHero.tsx)
- Note: reused `ProseSection`/`ContentBlocks` (the same components powering `/scholarship`'s prose sections), `ContactCard`, and `FinalCta` — no new one-off layout was built. `LegalHero` is named generically (not `PrivacyHero`) so `/legal/terms` can reuse it directly.

## 20. Terms & Conditions page — content status
- [x] ~~Academy contact details~~ — resolved, reused the same `ACADEMY_CONTACT` record via `ContactCard` (2026-08-04), no new address/email introduced.
- [ ] All 10 section bodies (Acceptance of Terms through Contact Information) are standard terms-and-conditions boilerplate for a coaching institute, grounded in already-approved facts (no online fee payment exists on this site, SNT Scholarship's merit-based process per §7, KRITPrep as a separate platform per §6) rather than invented policy specifics (no disciplinary penalty schedule, no refund percentages, or fee amounts were stated, since none were supplied). Not sourced from a dedicated `TERMS_FOUNDATION.md` — flagged for your legal review before this page is treated as binding.
- [ ] "Last updated: August 2026" reflects the build date, not a reviewed effective date.
- Files: [termsConditions.ts](../src/content/termsConditions.ts), [page.tsx](../src/app/legal/terms/page.tsx)
- Note: reuses the same `LegalHero`, `ProseSection`/`ContentBlocks`, `ContactCard`, and `FinalCta` components built for the Privacy Policy (Module 15) — no new components were introduced for this module.

---

**Status:** 9 / 10 Philosophy items resolved (all Founder's Message flags now confirmed). Homepage items 1–8 remain outstanding. Academic Pathways (item 10) is built from `docs/COURSES_FOUNDATION.md` with 3 fields pending your correction of the source document. SNT Scholarship (item 11) is built with all prose sections resolved; 5 FAQ answers and 1 website URL still pending. Admissions (item 12) is built with Admissions Open / Programs Offered / Admission Process resolved; Required Documents pending real content. Gallery (item 13) is built with the Introduction resolved; all 8 categories await real photographs. FAQ (item 14) is fully resolved with no pending content. Contact (item 15) has all core info resolved; Office Hours timings and the Maps embed remain pending, shown as natural copy rather than placeholder tags. Infrastructure (item 16) has only structural section titles; all 6 sections await real campus photographs. Hostel (item 17) has all text content resolved; Boys'/Girls' Hostel photos remain pending.
