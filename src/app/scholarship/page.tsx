import type { Metadata } from "next";
import ScholarshipIntro from "@/components/scholarship/ScholarshipIntro";
import SelectionProcessSection from "@/components/scholarship/SelectionProcessSection";
import ScholarshipFaq from "@/components/scholarship/ScholarshipFaq";
import ScholarshipContact from "@/components/scholarship/ScholarshipContact";
import ProseSection from "@/components/ui/ProseSection";
import IconListSection from "@/components/ui/IconListSection";
import { CalendarIcon, CheckCircleIcon, ClipboardCheckIcon } from "@/components/ui/icons";
import AdmissionCta from "@/components/home/AdmissionCta";
import FinalCta from "@/components/home/FinalCta";
import {
  ABOUT,
  BENEFITS,
  BENEFITS_INTRO,
  CATEGORIES,
  DATES_INTRO,
  DOCUMENTS,
  DOCUMENTS_INTRO,
  DOCUMENTS_NOTE,
  ELIGIBILITY_CATEGORIES,
  ELIGIBILITY_INTRO,
  ELIGIBILITY_NOTE,
  IMPORTANT_DATES,
  OBJECTIVES,
  VISION,
} from "@/content/scholarship";

export const metadata: Metadata = {
  title: "SNT Scholarship — Sir M V NEET | JEE | KCET Academy",
  description: "",
};

export default function ScholarshipPage() {
  return (
    <>
      <ScholarshipIntro />

      <ProseSection eyebrow="About SNT Scholarship" title="Continuing the Legacy" blocks={ABOUT} />

      <ProseSection eyebrow="Vision" title="Vision" blocks={VISION} tinted />

      <IconListSection
        eyebrow="Objectives"
        title="Objectives"
        icon={CheckCircleIcon}
        items={OBJECTIVES}
      />

      <IconListSection
        eyebrow="Eligibility"
        title="Eligibility"
        intro={ELIGIBILITY_INTRO}
        icon={CheckCircleIcon}
        items={ELIGIBILITY_CATEGORIES}
        columns={2}
        note={ELIGIBILITY_NOTE}
        tinted
      />

      <ProseSection eyebrow="Scholarship Categories" title="Scholarship Categories" blocks={CATEGORIES} />

      <SelectionProcessSection />

      <AdmissionCta />

      <IconListSection
        eyebrow="Scholarship Benefits"
        title="Scholarship Benefits"
        intro={[{ type: "p", text: BENEFITS_INTRO }]}
        icon={CheckCircleIcon}
        items={BENEFITS}
        tinted
      />

      <IconListSection
        eyebrow="Required Documents"
        title="Required Documents"
        intro={[{ type: "p", text: DOCUMENTS_INTRO }]}
        icon={ClipboardCheckIcon}
        items={DOCUMENTS}
        variant="checklist"
        note={DOCUMENTS_NOTE}
      />

      <IconListSection
        eyebrow="Important Dates"
        title="Important Dates"
        intro={DATES_INTRO}
        icon={CalendarIcon}
        items={IMPORTANT_DATES}
        variant="checklist"
        tinted
      />

      <ScholarshipFaq />

      <ScholarshipContact />

      <FinalCta />
    </>
  );
}
