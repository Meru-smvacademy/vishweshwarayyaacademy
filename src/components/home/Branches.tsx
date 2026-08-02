import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import BranchCard from "@/components/home/BranchCard";

const BRANCHES = ["Lingasuguru", "Sindhanuru"];

export default function Branches() {
  return (
    <section className="py-14 sm:py-20">
      <Container>
        <SectionHeading eyebrow="Our Branches" title="Visit Us" />

        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {BRANCHES.map((branch) => (
            <BranchCard key={branch} name={branch} />
          ))}
        </div>
      </Container>
    </section>
  );
}
