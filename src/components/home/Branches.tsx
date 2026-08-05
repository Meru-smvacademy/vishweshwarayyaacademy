import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import BranchCard from "@/components/home/BranchCard";
import { ACADEMY_CONTACT } from "@/content/contactInfo";

export default function Branches() {
  return (
    <section className="py-14 sm:py-20">
      <Container>
        <SectionHeading eyebrow="Our Branches" title="Visit Us" />

        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {ACADEMY_CONTACT.campuses.map((campus) => (
            <BranchCard key={campus.name} name={campus.name} addressLines={campus.addressLines} />
          ))}
        </div>
      </Container>
    </section>
  );
}
