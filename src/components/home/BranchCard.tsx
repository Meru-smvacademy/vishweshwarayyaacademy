import Button from "@/components/ui/Button";
import { MapPinIcon, PhoneIcon } from "@/components/ui/icons";
import { ACADEMY_PHONE } from "@/config/nav";

type BranchCardProps = {
  name: string;
  addressLines: string[];
};

export default function BranchCard({ name, addressLines }: BranchCardProps) {
  return (
    <div className="rounded-lg border border-line bg-surface p-6">
      <div className="flex items-start gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
          <MapPinIcon className="h-5 w-5" />
        </span>
        <div>
          <h3 className="text-base font-semibold text-primary">{name}</h3>
          <p className="mt-1 text-sm text-muted">
            {addressLines.map((line, index) => (
              <span key={index} className="block">
                {line}
              </span>
            ))}
          </p>
        </div>
      </div>

      <div className="mt-5">
        <Button href={`tel:${ACADEMY_PHONE}`} variant="outline" className="w-full sm:w-auto">
          <PhoneIcon className="h-4 w-4" />
          Call Now
        </Button>
      </div>
    </div>
  );
}
