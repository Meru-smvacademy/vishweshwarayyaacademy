import ContentBlocks from "@/components/courses/ContentBlocks";
import PlaceholderTag from "@/components/ui/PlaceholderTag";
import { ChevronDownIcon } from "@/components/ui/icons";
import type { AcademicProgram, ProgramSection } from "@/content/academicPathways";

const SUBSECTIONS: { key: keyof AcademicProgram; label: string }[] = [
  { key: "whoIsItFor", label: "Who is it for?" },
  { key: "objective", label: "Objective" },
  { key: "learningOutcomes", label: "Learning Outcomes" },
  { key: "teachingMethodology", label: "Teaching Methodology" },
  { key: "kritIntegration", label: "KRIT Integration" },
  { key: "assessment", label: "Assessment" },
];

export default function ProgramAccordion({ program }: { program: AcademicProgram }) {
  return (
    <details className="group rounded-lg border border-line bg-surface open:shadow-sm">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4">
        <span className="text-lg font-semibold text-primary">{program.name}</span>
        <ChevronDownIcon className="h-5 w-5 shrink-0 text-primary transition-transform group-open:rotate-180" />
      </summary>

      <div className="space-y-8 border-t border-line px-5 py-6">
        {SUBSECTIONS.map(({ key, label }) => {
          const content = program[key] as ProgramSection | undefined;
          if (content === undefined) return null;

          return (
            <div key={key}>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-primary">
                {label}
              </h3>
              <div className="mt-3">
                {content === null ? (
                  <PlaceholderTag label="Content pending correction in COURSES_FOUNDATION.md" />
                ) : (
                  <ContentBlocks blocks={content} />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </details>
  );
}
