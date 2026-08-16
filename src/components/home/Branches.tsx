import Container from "@/components/ui/Container";
import BranchCard from "@/components/home/BranchCard";

const CAMPUSES = [
  {
    name: "Lingasuguru Campus",
    description: "A high-tech digital ecosystem crafted for rigorous competitive preparation.",
    image: "/images/campuses/lingasuguru.png",
    imageAlt: "Isometric illustration of the Lingasuguru campus building",
  },
  {
    name: "Sindhanur Campus",
    description: "An oasis of focused academic peace built for peerless student outcomes.",
    image: "/images/campuses/sindhanur.png",
    imageAlt: "Isometric illustration of the Sindhanur campus building",
  },
];

export default function Branches() {
  return (
    <section className="bg-[#f5f5f7] px-5 py-14 sm:px-10 sm:py-16 lg:px-16 lg:py-10">
      <Container>
        <div className="mx-auto flex w-full max-w-[720px] flex-col items-center gap-3 text-center">
          <p className="text-[12px] font-extrabold uppercase text-scholarship-gold">Our Campuses</p>
          <h2 className="font-manrope text-[28px] font-extrabold leading-[1.15] text-scholarship-navy sm:text-[36px]">
            Choose Your Learning Environment
          </h2>
          <p className="text-[16px] font-medium leading-[1.5] text-[#515d6e]">
            Two modern campuses designed to provide a focused, technology-enabled environment
            where students prepare for NEET, JEE and KCET with confidence.
          </p>
        </div>

        <div className="mt-8 flex flex-col gap-8 sm:flex-row">
          {CAMPUSES.map((campus) => (
            <BranchCard key={campus.name} {...campus} />
          ))}
        </div>
      </Container>
    </section>
  );
}
