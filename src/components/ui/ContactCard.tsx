import Button from "@/components/ui/Button";
import { MapPinIcon, PhoneIcon } from "@/components/ui/icons";
import { ACADEMY_CONTACT } from "@/content/contactInfo";

type ContactCardProps = {
  intro?: string;
  closing?: string;
  website?: { value: string; note?: string };
  prominentCalls?: boolean;
};

export default function ContactCard({
  intro,
  closing,
  website,
  prominentCalls = false,
}: ContactCardProps) {
  return (
    <div className="mx-auto max-w-3xl">
      {intro && <p className="text-base leading-relaxed text-ink sm:text-lg">{intro}</p>}

      <div className="mt-6 rounded-lg border border-line bg-surface p-6">
        <p className="text-base font-semibold text-primary">{ACADEMY_CONTACT.orgName}</p>

        <div className="mt-4 flex items-start gap-3">
          <MapPinIcon className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
          <p className="text-sm text-muted">
            {ACADEMY_CONTACT.addressLines.map((line, index) => (
              <span key={index} className="block">
                {line}
              </span>
            ))}
          </p>
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

        {website && (
          <p className="mt-3 text-sm text-muted">
            {website.value}
            {website.note && <span className="ml-1 italic">{website.note}</span>}
          </p>
        )}
      </div>

      {closing && <p className="mt-6 text-base leading-relaxed text-ink sm:text-lg">{closing}</p>}
    </div>
  );
}
