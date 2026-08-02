import Button from "@/components/ui/Button";

type ProgramCardProps = {
  title: string;
  description: string;
  href: string;
};

export default function ProgramCard({ title, description, href }: ProgramCardProps) {
  return (
    <div className="flex flex-col rounded-lg border border-line bg-surface p-6">
      <span className="inline-flex w-fit items-center rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-primary">
        {title}
      </span>
      <p className="mt-4 flex-1 text-sm text-muted">{description}</p>
      <div className="mt-5">
        <Button href={href} variant="outline" className="w-full sm:w-auto">
          Learn More
        </Button>
      </div>
    </div>
  );
}
