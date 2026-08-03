import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import PillarCard from "@/components/ui/PillarCard";
import {
  BookIcon,
  ChartIcon,
  ClipboardCheckIcon,
  MonitorIcon,
  UsersIcon,
} from "@/components/ui/icons";
import { KRIT_ECOSYSTEM } from "@/content/academicPathways";

const ICONS = [BookIcon, ClipboardCheckIcon, MonitorIcon, ChartIcon, UsersIcon];

export default function KritEcosystem() {
  return (
    <section className="py-14 sm:py-20">
      <Container>
        <div className="mx-auto max-w-3xl">
          <SectionHeading eyebrow="Our Technology" title="KRIT Academic Ecosystem" align="left" />
          <p className="mt-6 text-base leading-relaxed text-ink sm:text-lg">{KRIT_ECOSYSTEM.intro}</p>
          <p className="mt-4 text-base leading-relaxed text-ink sm:text-lg">
            {KRIT_ECOSYSTEM.leadIn}
          </p>
        </div>

        <div className="mx-auto mt-10 grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {KRIT_ECOSYSTEM.groups.map((group, index) => (
            <PillarCard key={group.title} icon={ICONS[index]} title={group.title} items={group.items} />
          ))}
        </div>

        <div className="mx-auto mt-8 max-w-3xl">
          <p className="text-base leading-relaxed text-ink sm:text-lg">{KRIT_ECOSYSTEM.closing}</p>
        </div>
      </Container>
    </section>
  );
}
