# Project Rules — Sir M V NEET | JEE | KCET Academy Website

**Document type:** Governing project rules (binding — read before building anything)
**Applies to:** Everyone and everything committing to this repository, including AI-assisted development
**Version:** 1.0

---

## 1. Project Vision

Sir M V NEET | JEE | KCET Academy (Lingasuguru & Sindhanuru) is building a **premium admissions website**. The site exists to earn trust and convert that trust into enquiries — it is not a brochure for its own sake.

**North star:** every page exists to move a prospective student or parent toward submitting an enquiry.

Non-negotiable qualities:

- **Premium, not flashy.** The academy competes on credibility (results, faculty, legacy) — the design must read as serious and trustworthy, not gimmicky.
- **Admissions-first.** Every page terminates in a clear enquiry path. Features that don't serve admissions are deferred, not built "because it'd be nice."
- **Fast and mobile-first.** The primary visitor is a parent or student on a mid-range Android phone, on 4G, often opening a WhatsApp-forwarded link.
- **The lead is sacred.** Enquiry capture must keep working even if every third-party integration (WhatsApp, SMS, email, analytics, KRITPrep) is down.
- **Honest.** Results, testimonials, and success stories are real records, never invented or exaggerated copy.

---

## 2. Brand Colors

| Token | Hex | Usage |
|---|---|---|
| `primary` (Navy) | `#0B1F3A` | Header, footer, primary buttons, headings on light backgrounds — the "trust" color |
| `primary-light` | `#16335C` | Hover/active states on primary elements |
| `accent` (Academic Gold) | `#C9A227` | Achievement/results highlights, badges, awards, key CTA accents — used sparingly |
| `accent-light` | `#E0C069` | Hover state for gold accents, subtle highlight backgrounds |
| `surface` (White) | `#FFFFFF` | Base background |
| `surface-muted` | `#F7F8FA` | Section alternation, card backgrounds |
| `border` | `#E5E7EB` | Dividers, card borders, input borders |
| `text-primary` | `#171717` | Body copy, headings |
| `text-muted` | `#5B6472` | Secondary text, captions, metadata |
| `success` | `#1E7A46` | Confirmation states (e.g. enquiry submitted) |
| `warning` | `#B45309` | Non-blocking alerts |
| `danger` | `#B3261E` | Form errors only — never decorative |

**Rules:**
- Navy and Gold are the only brand colors used for identity. Every other color is a neutral or a semantic (success/warning/danger) state.
- Gold is an **accent**, not a background color — it marks achievement (results, awards, toppers), it does not flood the page.
- All color pairs must meet **WCAG AA contrast (4.5:1)** minimum; body text on navy uses white, never gray-on-navy.
- Dark mode is not in scope for Phase 1. Do not build a dark theme until explicitly requested.
- All colors are defined once as CSS variables / Tailwind theme tokens (`globals.css` / `tailwind.config`). No hard-coded hex values in components.

---

## 3. Typography

| Role | Font | Notes |
|---|---|---|
| UI / Body | **Geist Sans** (already wired via `next/font/google` in `layout.tsx`) | All paragraph text, nav, forms, cards |
| Monospace | **Geist Mono** | Reference numbers, application IDs, code-like data only |
| Display / Hero headings (optional, Phase 2) | A single serif (e.g. Fraunces or Playfair Display) may be introduced later for hero moments only | Do not add a second font family without a stated reason — every extra font is extra weight on a 4G connection |

**Type scale (fluid, mobile-first via `clamp()`):**

| Level | Size | Weight | Usage |
|---|---|---|---|
| Display | `clamp(2rem, 5vw, 3.5rem)` | 700 | Hero headline only |
| H1 | `clamp(1.75rem, 4vw, 2.5rem)` | 700 | Page title |
| H2 | `clamp(1.5rem, 3vw, 2rem)` | 600 | Section title |
| H3 | `1.25rem` | 600 | Card/subsection title |
| Body | `1rem` (16px minimum) | 400 | Paragraph copy |
| Small | `0.875rem` | 400 | Captions, metadata, legal text |

**Rules:**
- Body text is never smaller than 16px — this also prevents iOS Safari's auto-zoom on form inputs.
- Maximum 2 font families, maximum 3 weights per family, total font payload ≤ 90 KB.
- Line length for body copy: 60–75 characters (`max-w-prose` or equivalent).
- Font loading uses `next/font` exclusively — no external `<link>` font tags, no FOUT/CLS from late-loading fonts.

---

## 4. Website Pages

The full page set (build order is governed separately — see §12). This is the site map, not a build schedule.

```
/                                  Home
/about                             Our Story / Vision
/about/infrastructure              Campus & Infrastructure
/hostel                            Hostel & accommodation
/philosophy                        Our Philosophy
/tribute                           The Tribute — Sir M. Visvesvaraya
/courses                           Courses hub
/courses/[programSlug]             NEET · JEE · KCET · Foundation
/results                           Results hub
/results/[year]                    Results by year
/results/stories                   Success Stories hub
/results/stories/[slug]            Success story detail
/scholarship                       SNT Scholarship overview
/scholarship/eligibility           Eligibility & pattern
/scholarship/apply                 Application form
/scholarship/status                Status lookup (noindex)
/gallery                           Gallery hub
/gallery/[albumSlug]                Album detail
/kritprep                          KRITPrep — external link landing (see §6)
/admissions                        Admission process, fees, dates
/admission-enquiry                 Full enquiry form
/locations/[city]                  Local SEO landing pages
/blog , /blog/[slug]               Editorial
/faq                               FAQ
/contact                           Contact / local SEO
/legal/*                           Privacy, terms, refund, disclaimer
/thank-you/[type]                  Post-conversion confirmation (noindex)
/admin/**                          Internal application (noindex, authenticated)
```

**Rules:**
- URLs are lowercase, hyphenated, no dates, no IDs, max 3 segments, and are permanent — a slug change always ships with a 301 redirect.
- Every route maps to one of a fixed set of templates (Landing, Content, Program, Listing, Detail, Form, Admin). A new page must reuse a template, not invent a one-off layout.
- **No Faculty page.** Team information is intentionally not duplicated on this site. The nav item "Our Team" (header, mobile drawer, and footer) links externally to `https://www.kritprep.com/our-team` in a new tab. Do not build `/about/faculty` or any local team roster page.

---

## 5. Homepage Section Order

The homepage is a fixed sequence. Sections are not reordered casually — this order is deliberately built as a conversion funnel.

```
1.  Header (logo, nav, "Admission Enquiry" CTA) — shell, built in the layout module
2.  Hero (headline, subheadline, Admission Enquiry + Explore Courses CTAs, branch badges, illustration)
3.  Why Choose Us (6 feature cards)
4.  Courses Overview (NEET / JEE / KCET / Foundation — card grid)
5.  Results Highlights (headline stats)
6.  Admission CTA (mid-page card banner: "Ready to Start Your NEET Journey?" — Admission Enquiry + Call Now)
7.  Success Stories Preview (3 story cards)
8.  SNT Scholarship Preview (short intro + Learn More CTA)
9.  Tribute Story Preview (short intro + Read the Story CTA)
10. Branches (Lingasuguru & Sindhanuru, address + Call Now)
11. Final Admission CTA (full-width closing banner)
12. Sticky Mobile CTA bar (persists across the whole page: Admission Enquiry · Call Now — no WhatsApp) — shell, built in the layout module
13. Footer — shell, built in the layout module
```

Gallery Preview, KRITPrep Teaser, FAQ Preview, and Trust Bar are intentionally not part of the homepage — those pages are still reachable via navigation, but do not get a dedicated homepage section.

**Rules:**
- Every section must justify its position relative to the funnel — sections are not added "because other coaching sites have it."
- The enquiry CTA must be reachable within one scroll on mobile (hero) and persistently available thereafter (sticky bar).
- No section blocks the initial render for its own sake — anything below the fold that isn't needed for LCP is deferred.

---

## 6. KRITPrep Integration — External Link Only

**This phase is explicitly limited in scope. Do not build more than this.**

KRITPrep is a separate, third-party practice platform. In this phase of the project:

- The `/kritprep` route is a **static, self-contained informational page**: what KRITPrep is, its value to students, and a single outbound button ("Open KRITPrep") to the external platform.
- The link may carry a UTM/partner reference as a query parameter for attribution. Nothing else.
- **No** server-side API calls to KRITPrep.
- **No** authentication or SSO handoff.
- **No** embedded iframe or widget.
- **No** webhook listeners.
- **No** KRITPrep credentials, secrets, or SDKs anywhere in the codebase.
- KRITPrep must **never** appear on the critical enquiry path — a student can complete an admissions enquiry with zero dependency on KRITPrep being reachable.

If deeper integration (API sync, SSO, embedded widgets) is ever needed, it is a **separate, explicitly-scoped module** built later behind an isolated integration boundary — not an extension of this page.

---

## 7. SNT Scholarship Page

The SNT (Scholarship-cum-Nurture Test) is the academy's highest-intent acquisition funnel — a test as the entry point, admissions counselling as the outcome.

**Structure (as built, Module 7):** `/scholarship` is a single consolidated informational page — Introduction, About SNT Scholarship, Vision, Objectives, Eligibility, Scholarship Categories, Selection Process, Scholarship Benefits, Required Documents, Important Dates, FAQ, and Contact — built verbatim from `docs/SCHOLARSHIP_FOUNDATION.md`. `/scholarship/eligibility`, `/scholarship/apply`, and `/scholarship/status` from the original plan below were not built — Eligibility lives on the main page instead, and Apply/Status are deferred until an actual application form and lead-pipeline integration are scoped.

**Original planned structure (superseded for now by the single-page build above):**
```
/scholarship              Overview: value, award slabs, past awardees, deadline
/scholarship/eligibility  Class-wise criteria, syllabus, pattern
/scholarship/apply        Application form (the conversion endpoint)
/scholarship/status       Reference-number + phone lookup (noindex)
```

**Rules:**
- The application form (once built) captures the same core identity fields as the general enquiry form (name, phone, class, target exam) plus academic record — it feeds the same lead pipeline, not a separate silo.
- Award tiers/slabs are content, not hard-coded numbers in components — they must be editable without a code deploy once the admin module exists.
- DPDP consent (and guardian consent for minors) is mandatory before submission — no exceptions.
- `/scholarship/status` is a lookup surface only: reference number + phone, `noindex`, no listing/enumeration of other applicants.
- Every applicant, awarded or not, is a warm lead — the page copy and downstream flow must never treat "not awarded" as a dead end.

---

## 8. Tribute Story Page

`/tribute` honours **Sir M. Visvesvaraya** and explains why the academy carries his name. It is a trust and brand-differentiation page — it still must route to admissions.

**Rules:**
- Content must be **factually verifiable** — dates, achievements, quotes are sourced and attributed, never embellished.
- The academy **honours** the legacy; copy must never imply endorsement, affiliation, or descent from the person or his estate.
- Structure: hero portrait + dates → why the name → timeline of milestones → values (discipline, precision, public service, excellence) mapped to concrete academy practices → a soft CTA into `/courses` or `/admissions`.
- Historical images require documented public-domain or licensed status, with a visible `credit` attribution.
- Built as a static, content-driven page — the narrative and timeline should come from structured content records, not hard-coded prose, so it can be extended without a redeploy once the content layer exists.
- Fully respects `prefers-reduced-motion`; the timeline is a semantic ordered list that reads correctly with styles disabled.

---

## 9. Success Stories Page

Success Stories are the **emotional, narrative counterpart** to `/results` (which is quantitative). They are two distinct concerns and must not be merged into one page.

**Anatomy of a story** (`/results/stories/[slug]`):
```
Hero (photo, name, rank, exam, year)
→ Pull quote
→ Background / struggle
→ At the academy
→ Turning point
→ Result
→ Advice to juniors
→ Related program CTA
→ Related stories
```

**Rules:**
- Every story links to the underlying `Result` record it substantiates — stories are not free-floating testimonials.
- Every story requires a linked consent record before publish; no photo or name goes live without it (mandatory guardian consent if the student is a minor).
- Stories are shareable (WhatsApp is the dominant sharing channel for this audience) — each story needs a clean share affordance and an auto-generated share image.
- Do not mark up stories as review/rating structured data — they are testimonials/narratives, not product reviews.
- Every story ends by routing back into a program page or the enquiry CTA — a story that doesn't convert is a missed opportunity, not just a nice read.

---

## 10. Coding Standards

- **TypeScript strict mode always on.** No `any` unless justified with a comment explaining why no better type exists.
- **Server Components by default.** A component becomes a Client Component only when it needs interactivity, state, or a browser API — and only at the leaf level, not the whole page.
- **`app/` route files contain no business logic.** They compose `components/` and `lib/`/feature logic. This keeps the framework replaceable and routes readable.
- **No comments that explain *what* the code does** — good naming does that. A comment is only justified when it explains a non-obvious *why* (a workaround, a subtle constraint, a hidden invariant).
- **No premature abstraction.** Build what the current module needs. Three similar lines beat a speculative shared helper for a "future" case that doesn't exist yet.
- **Naming:** `PascalCase` for components and types, `camelCase` for functions/variables, `kebab-case` for route segments and file names outside of component files.
- **Styling is Tailwind-first**, driven by the design tokens in `globals.css`. No inline `style=` attributes, no ad-hoc hex values in JSX.
- **Images always go through `next/image`** — no raw `<img>` tags — with explicit width/height to avoid layout shift.
- **Accessibility is not optional:** semantic HTML, visible focus states, keyboard navigability, mandatory alt text, minimum 44×44px touch targets.
- **Mobile-first, always.** Design and test at 360px width before checking larger breakpoints, not the reverse.
- **A module is not "done" until:** `tsc --noEmit` passes, `npm run lint` passes, and `npm run build` succeeds — with zero new errors or warnings introduced.

---

## 11. AI Workflow Rules

These rules govern how AI-assisted development (Claude Code or any other assistant) operates on this repository.

1. **One module at a time.** The assistant builds a single, clearly-scoped module per work session — never multiple unrelated pages or features in parallel (see §12).
2. **No content invention.** Results, testimonials, statistics, faculty bios, and success stories are real academy records. The assistant never fabricates copy to "fill in" a page — it uses clearly-marked placeholders until real content is supplied.
3. **Stop and summarize after every module.** After completing a module, the assistant reports what changed in plain terms and **waits for explicit approval** before starting the next one. It does not chain modules together unprompted.
4. **No silent deviation from this document.** If a requested change conflicts with a rule here (a color, a page structure, the KRITPrep boundary in §6, etc.), the assistant flags the conflict and asks before implementing — it does not quietly override the rule.
5. **No destructive or hard-to-reverse actions without confirmation** — this includes deleting files, force-pushing, rewriting history, or removing dependencies.
6. **Every change must be verifiable.** Lint, type-check, and build must be run and shown to pass before a module is presented as complete.
7. **This file is binding.** If the project's direction changes in a way that requires updating a rule, update `PROJECT_RULES.md` itself as part of that change, so the document never drifts out of sync with reality.

---

## 12. Build One Module at a Time

**Definition:** a *module* is one coherent, independently reviewable unit of work — typically one page, one major section, or one self-contained feature (e.g., "the enquiry form," "the results table," "the homepage hero"). It is never "the whole site" and never "everything left in the backlog."

**Workflow for every module:**
```
1. Propose   — state exactly what will be built and which files it touches
2. Build     — implement only that module
3. Verify    — tsc --noEmit, npm run lint, npm run build must all pass
4. Present   — summarize what was built, in plain language
5. Wait      — do not start the next module until the user approves
```

**Recommended build order** (admissions-critical first, matching §1's north star):

```
1. Shared layout & navigation (header, footer, sticky mobile CTA)
2. Enquiry form + submission flow (the revenue-critical path)
3. Homepage (assembled from the section order in §5)
4. Admissions pages (process, fees, dates)
5. Courses hub + program pages
6. Results + Success Stories
7. SNT Scholarship
8. Tribute Story
9. Gallery
10. KRITPrep landing (§6 boundary applies)
11. FAQ, Contact, Legal, Blog
12. Admin module
```

**Rules:**
- Do not start module *N+1* while module *N* is unapproved or has failing checks.
- Do not scaffold pages "ahead of schedule" just because they're quick — every page still goes through Propose → Build → Verify → Present → Wait.
- If a module turns out to be larger than expected, split it and get approval on the smaller pieces rather than quietly expanding scope.

**Progress** (actual module numbering used during development, which reordered and extended the recommended list above):

| Module | Scope | Status |
|---|---|---|
| 1 | Shared layout & navigation | ✅ Approved |
| 2 | Homepage | ✅ Approved |
| 3 | Our Philosophy (`/philosophy`) — added mid-stream, not in the original recommended order | ✅ Approved |
| 4 | Academic Pathways / Courses hub (`/courses`) | ✅ Approved |
| — | Nav revision: Faculty replaced with an external "Our Team" link (KRITPrep) | ✅ Approved |
| 7 | SNT Scholarship (`/scholarship`) | ✅ Approved |
| 8 | Admissions (`/admissions`) | ✅ Approved |
| 9 | Gallery (`/gallery`) | ✅ Approved |
| 10 | FAQ (`/faq`) | ✅ Approved |
| P0 | Admission Enquiry form wired up (`/admission-enquiry`) — fixed a sitewide 404 on the primary CTA, found during full-project QA | ✅ Approved |
| 11 | Contact (`/contact`) | ✅ Approved |
| 12 | Infrastructure (`/about/infrastructure`) | ✅ Approved |
| 13 | Hostel (`/hostel`) | ✅ Approved |
| — | P1 fix: `NEXT_PUBLIC_ACADEMY_PHONE` configured to the academy's primary number | ✅ Approved |
| 14 (Tribute) | Tribute Story (`/tribute`) | ⏸ Blocked — `docs/TRIBUTE_FOUNDATION.md` created (structure only), awaiting factually-verifiable content on Sir M. Visvesvaraya per §8; page not yet built |
| 14 (About) | About (`/about`) — number reused by the user's own instruction for this module; kept distinct from the blocked Tribute entry above rather than renumbering it | ✅ Approved |
| 15 | Privacy Policy (`/legal/privacy`) | ✅ Built — pending approval; see `docs/CONTENT_CHECKLIST.md` item 19 |
| 16 | Terms & Conditions (`/legal/terms`) | ✅ Built — pending approval; see `docs/CONTENT_CHECKLIST.md` item 20 |
| 5 | Results & Success Stories (`/results`) | ⏸ Intentionally on hold — pending verified admission data in `docs/RESULTS_FOUNDATION.md` |

**Implementation phase: complete**, except Module 5 (Results) and Module 14/Tribute, both deliberately blocked pending real, verified content — see `docs/RESULTS_FOUNDATION.md` and `docs/TRIBUTE_FOUNDATION.md`. Modules 3, 4, 7–13, 14/About, 15, and 16 were built from dedicated source-of-truth documents or content supplied directly in-conversation per rule 2 — see `docs/CONTENT_CHECKLIST.md` for content fields still pending correction or real data within otherwise-approved modules. Note also that several nav/footer links (`/results`, `/results/stories`, `/tribute`, and the four `/courses/[slug]` deep links) point to pages not yet built — this is expected at this stage of the build order, not a defect. `/contact`, `/about/infrastructure`, `/hostel`, `/about`, `/legal/privacy`, and now `/legal/terms` are resolved as of Modules 11–13, 14/About, 15, and 16.
