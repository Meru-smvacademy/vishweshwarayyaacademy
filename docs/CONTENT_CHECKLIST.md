# Homepage Content Checklist

Tracks every placeholder currently live on the homepage (see [PROJECT_RULES.md](PROJECT_RULES.md) §11 rule 2 — no content invention). Check off each item as real, verified content is supplied and wired in.

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

---

**Status:** 0 / 8 resolved. Update this file as each item is filled in — strike through or check the box, and note the date.
