import Container from "@/components/ui/Container";
import CategoryImageCard from "@/components/ui/CategoryImageCard";
import {
  BookIcon,
  BuildingIcon,
  ChartIcon,
  CheckCircleIcon,
  ClipboardCheckIcon,
  FlaskIcon,
  SparkleIcon,
  UsersIcon,
} from "@/components/ui/icons";
import { GALLERY_CATEGORIES } from "@/content/gallery";

const ICONS = [
  BuildingIcon,
  BookIcon,
  FlaskIcon,
  ChartIcon,
  ClipboardCheckIcon,
  UsersIcon,
  SparkleIcon,
  CheckCircleIcon,
];

export default function GalleryGrid() {
  return (
    <section className="py-14 sm:py-20">
      <Container>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {GALLERY_CATEGORIES.map((title, index) => (
            <CategoryImageCard key={title} icon={ICONS[index]} title={title} />
          ))}
        </div>
      </Container>
    </section>
  );
}
