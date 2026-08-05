import Container from "@/components/ui/Container";
import CategoryImageCard from "@/components/ui/CategoryImageCard";
import {
  BookIcon,
  BuildingIcon,
  FlaskIcon,
  LaptopIcon,
  MonitorIcon,
  ShieldCheckIcon,
} from "@/components/ui/icons";
import { INFRASTRUCTURE_SECTIONS } from "@/content/infrastructure";

const ICONS = [BuildingIcon, MonitorIcon, FlaskIcon, LaptopIcon, BookIcon, ShieldCheckIcon];

export default function InfrastructureGrid() {
  return (
    <section className="py-14 sm:py-20">
      <Container>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {INFRASTRUCTURE_SECTIONS.map((title, index) => (
            <CategoryImageCard key={title} icon={ICONS[index]} title={title} />
          ))}
        </div>
      </Container>
    </section>
  );
}
