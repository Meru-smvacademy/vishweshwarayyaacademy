import { ChevronDownIcon } from "@/components/ui/icons";

export default function StepTimeline({ steps }: { steps: string[] }) {
  return (
    <ol className="mx-auto flex max-w-md flex-col items-center">
      {steps.map((step, index) => (
        <li key={step} className="flex w-full flex-col items-center">
          <span className="w-full rounded-lg border border-line bg-surface px-5 py-3 text-center text-sm font-semibold text-primary sm:text-base">
            {step}
          </span>
          {index < steps.length - 1 && (
            <ChevronDownIcon className="my-2 h-5 w-5 text-muted" aria-hidden="true" />
          )}
        </li>
      ))}
    </ol>
  );
}
