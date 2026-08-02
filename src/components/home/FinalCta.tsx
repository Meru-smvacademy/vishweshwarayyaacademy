import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import { PRIMARY_CTA_HREF, PRIMARY_CTA_LABEL } from "@/config/nav";

export default function FinalCta() {
  return (
    <section className="bg-primary py-14 text-white sm:py-20">
      <Container className="flex flex-col items-center gap-6 text-center">
        <h2 className="max-w-2xl text-2xl font-bold sm:text-3xl">
          Begin Your Admission Journey Today
        </h2>
        <p className="max-w-xl text-white/80">
          Speak with our admissions team and take the first step toward NEET, JEE, or KCET
          success.
        </p>
        <Button href={PRIMARY_CTA_HREF} variant="secondary">
          {PRIMARY_CTA_LABEL}
        </Button>
      </Container>
    </section>
  );
}
