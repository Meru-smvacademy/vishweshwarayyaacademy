import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { MapPinIcon } from "@/components/ui/icons";

export default function MapsSection() {
  return (
    <section className="bg-surface-muted py-14 sm:py-20">
      <Container>
        <div className="mx-auto max-w-3xl">
          <SectionHeading eyebrow="Location" title="Find Us" align="left" />
        </div>

        <div className="mx-auto mt-8 max-w-5xl">
          <div className="flex aspect-[16/9] w-full flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-line bg-surface">
            <MapPinIcon className="h-10 w-10 text-muted" />
            <span className="text-sm font-medium text-muted">Map view will be added here</span>
          </div>
        </div>
      </Container>
    </section>
  );
}
