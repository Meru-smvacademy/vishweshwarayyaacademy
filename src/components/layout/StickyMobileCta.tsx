import { PRIMARY_CTA_HREF, PRIMARY_CTA_LABEL } from "@/config/nav";
import { ACADEMY_CONTACT } from "@/content/contactInfo";
import Button from "@/components/ui/Button";
import { PhoneIcon } from "@/components/ui/icons";

// "+91 89516 33963" from the contact page's list -> "tel:+918951633963".
const CALL_NOW_HREF = `tel:${ACADEMY_CONTACT.phones[1].replace(/\s+/g, "")}`;

export default function StickyMobileCta() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-line bg-surface/95 backdrop-blur supports-[backdrop-filter]:bg-surface/80 xl:hidden">
      <div className="flex gap-2 p-2">
        <Button href={PRIMARY_CTA_HREF} variant="primary" className="flex-1">
          {PRIMARY_CTA_LABEL}
        </Button>
        <Button href={CALL_NOW_HREF} variant="outline" className="flex-1">
          <PhoneIcon className="h-4 w-4" />
          Call Now
        </Button>
      </div>
    </div>
  );
}
