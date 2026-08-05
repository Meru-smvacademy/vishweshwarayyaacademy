import Button from "@/components/ui/Button";
import { ClockIcon, ExternalLinkIcon, MapPinIcon, PhoneIcon } from "@/components/ui/icons";
import { ACADEMY_CONTACT } from "@/content/contactInfo";

type ContactCardProps = {
  intro?: string;
  closing?: string;
  prominentCalls?: boolean;
};

export default function ContactCard({ intro, closing, prominentCalls = false }: ContactCardProps) {
  return (
    <div className="mx-auto max-w-3xl">
      {intro && <p className="text-base leading-relaxed text-ink sm:text-lg">{intro}</p>}

      <div className="mt-6 rounded-lg border border-line bg-surface p-6">
        <p className="text-base font-semibold text-primary">{ACADEMY_CONTACT.orgName}</p>

        <div className="mt-4 space-y-4">
          {ACADEMY_CONTACT.campuses.map((campus) => (
            <div key={campus.name} className="flex items-start gap-3">
              <MapPinIcon className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
              <p className="text-sm text-muted">
                <span className="block font-medium text-ink">{campus.name}</span>
                {campus.addressLines.map((line, index) => (
                  <span key={index} className="block">
                    {line}
                  </span>
                ))}
              </p>
            </div>
          ))}
        </div>

        {prominentCalls ? (
          <div className="mt-4 flex flex-wrap gap-3">
            {ACADEMY_CONTACT.phones.map((phone, index) => (
              <Button
                key={phone}
                href={`tel:${phone.replace(/\s+/g, "")}`}
                variant={index === 0 ? "primary" : "outline"}
              >
                <PhoneIcon className="h-4 w-4" />
                Call {phone}
              </Button>
            ))}
          </div>
        ) : (
          <div className="mt-4 flex flex-col gap-2">
            {ACADEMY_CONTACT.phones.map((phone) => (
              <a
                key={phone}
                href={`tel:${phone.replace(/\s+/g, "")}`}
                className="flex items-center gap-2 text-sm text-ink hover:text-primary"
              >
                <PhoneIcon className="h-4 w-4 text-primary" />
                {phone}
              </a>
            ))}
          </div>
        )}

        <a
          href={`mailto:${ACADEMY_CONTACT.email}`}
          className="mt-3 inline-block text-sm text-ink hover:text-primary"
        >
          {ACADEMY_CONTACT.email}
        </a>

        <a
          href={`https://${ACADEMY_CONTACT.website}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-1 flex items-center gap-1.5 text-sm text-ink hover:text-primary"
        >
          {ACADEMY_CONTACT.website}
          <ExternalLinkIcon className="h-3.5 w-3.5" />
          <span className="sr-only"> (opens in a new tab)</span>
        </a>

        <div className="mt-4 flex items-start gap-3 border-t border-line pt-4">
          <ClockIcon className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
          <p className="text-sm text-muted">
            <span className="block font-medium text-ink">{ACADEMY_CONTACT.officeHours.weekday}</span>
            <span className="block">{ACADEMY_CONTACT.officeHours.hours}</span>
            <span className="block">{ACADEMY_CONTACT.officeHours.sunday}</span>
          </p>
        </div>
      </div>

      {closing && <p className="mt-6 text-base leading-relaxed text-ink sm:text-lg">{closing}</p>}
    </div>
  );
}
