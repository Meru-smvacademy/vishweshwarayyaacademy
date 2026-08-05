import Container from "@/components/ui/Container";
import CategoryImageCard from "@/components/ui/CategoryImageCard";
import SectionHeading from "@/components/ui/SectionHeading";
import { UsersIcon } from "@/components/ui/icons";
import { ACCOMMODATION } from "@/content/hostel";

export default function AccommodationSection() {
  return (
    <section className="bg-surface-muted py-14 sm:py-20">
      <Container>
        <div className="mx-auto max-w-3xl">
          <SectionHeading eyebrow="Separate Accommodation" title="Separate Accommodation" align="left" />
        </div>

        <div className="mx-auto mt-8 grid max-w-3xl gap-6 sm:grid-cols-2">
          {ACCOMMODATION.map((title) => (
            <CategoryImageCard key={title} icon={UsersIcon} title={title} />
          ))}
        </div>
      </Container>
    </section>
  );
}
