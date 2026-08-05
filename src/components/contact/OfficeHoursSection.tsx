import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { ClockIcon } from "@/components/ui/icons";
import { ACADEMY_CONTACT } from "@/content/contactInfo";

export default function OfficeHoursSection() {
  const { weekday, hours, sunday } = ACADEMY_CONTACT.officeHours;

  return (
    <section className="py-14 sm:py-20">
      <Container>
        <div className="mx-auto max-w-3xl">
          <SectionHeading title="Office Hours" align="left" />

          <div className="mt-6 flex items-start gap-3 rounded-lg border border-line bg-surface p-6">
            <ClockIcon className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
            <div>
              <p className="text-base font-semibold text-primary">{weekday}</p>
              <p className="mt-1 text-sm text-muted">{hours}</p>
              <p className="mt-1 text-sm text-muted">{sunday}</p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
