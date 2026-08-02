import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import { PhoneIcon } from "@/components/ui/icons";
import { ACADEMY_PHONE, PRIMARY_CTA_HREF, PRIMARY_CTA_LABEL } from "@/config/nav";

export default function AdmissionCta() {
  return (
    <section className="py-14 sm:py-20">
      <Container>
        <div className="rounded-2xl bg-primary px-6 py-10 text-center text-white sm:px-12 sm:py-14">
          <h2 className="text-2xl font-bold sm:text-3xl">Ready to Start Your NEET Journey?</h2>
          <p className="mt-3 text-white/80">Talk to our admission team today.</p>
          <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button href={PRIMARY_CTA_HREF} variant="secondary">
              {PRIMARY_CTA_LABEL}
            </Button>
            <Button href={`tel:${ACADEMY_PHONE}`} variant="outlineInverse">
              <PhoneIcon className="h-4 w-4" />
              Call Now
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
