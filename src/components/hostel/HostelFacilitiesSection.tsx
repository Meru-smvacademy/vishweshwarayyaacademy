import Container from "@/components/ui/Container";
import HostelFeatureCard from "@/components/hostel/HostelFeatureCard";
import SectionHeading from "@/components/ui/SectionHeading";
import {
  BoltIcon,
  BookIcon,
  CameraIcon,
  ClockIcon,
  DropletIcon,
  ShieldCheckIcon,
  SparkleIcon,
  UsersIcon,
  UtensilsIcon,
  WifiIcon,
} from "@/components/ui/icons";
import { HOSTEL_FACILITIES } from "@/content/hostel";

const ICONS = [
  ShieldCheckIcon,
  UsersIcon,
  DropletIcon,
  UtensilsIcon,
  BookIcon,
  WifiIcon,
  ClockIcon,
  CameraIcon,
  BoltIcon,
  SparkleIcon,
];

export default function HostelFacilitiesSection() {
  return (
    <section className="py-14 sm:py-20">
      <Container>
        <div className="mx-auto max-w-3xl">
          <SectionHeading title="Hostel Facilities" align="left" />
        </div>

        <div className="mx-auto mt-10 grid max-w-5xl gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {HOSTEL_FACILITIES.map((title, index) => (
            <HostelFeatureCard
              key={title}
              icon={ICONS[index]}
              title={title}
              tint={index % 2 === 0 ? "navy" : "orange"}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
