import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import ScholarshipIllustration from "@/components/home/ScholarshipIllustration";
import { ArrowRightIcon } from "@/components/ui/icons";

export default function ScholarshipBanner() {
  return (
    <section className="bg-scholarship-surface py-14 sm:py-20">
      <Container className="lg:!max-w-7xl">
        <div className="relative overflow-hidden rounded-[32px] border border-scholarship-gold/20 bg-gradient-to-r from-scholarship-cream to-white p-6 shadow-[0_10px_20px_-6px_rgba(0,0,0,0.051),0_2px_5px_rgba(0,0,0,0.031),0_4px_10px_-4px_rgba(212,168,83,0.078)] transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_18px_30px_-8px_rgba(0,0,0,0.08),0_4px_8px_rgba(0,0,0,0.05),0_6px_14px_-4px_rgba(212,168,83,0.12)] sm:p-8 lg:p-10">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="#D4A853"
            strokeWidth="2"
            strokeLinecap="round"
            aria-hidden="true"
            className="pointer-events-none absolute right-10 top-8 hidden h-8 w-8 opacity-[0.08] lg:block"
          >
            <path d="m8.5 13-1.8 7 5.3-2.5 5.3 2.5-1.8-7" />
            <circle cx="12" cy="8.5" r="5.5" />
          </svg>

          <div className="flex flex-col items-center gap-10 lg:flex-row">
            <div className="aspect-[360/220] w-full shrink-0 overflow-hidden rounded-[24px] border border-scholarship-gold/10 bg-scholarship-cream lg:w-[360px]">
              <ScholarshipIllustration className="h-full w-full" />
            </div>

            <div className="w-full max-w-[535px] text-center lg:text-left">
              <div className="flex items-center justify-center gap-3 lg:justify-start">
                <span className="h-0.5 w-12 bg-scholarship-gold" />
                <p className="text-[13px] font-extrabold uppercase tracking-[0.20em] text-scholarship-gold">
                  SNT Scholarship
                </p>
              </div>

              <h2 className="mt-5 font-manrope text-[26px] font-extrabold leading-[1.2] tracking-[-0.02em] text-scholarship-navy sm:text-[30px] lg:text-[36px]">
                Unlock Your Potential with the{" "}
                <span className="text-scholarship-gold">SNT</span> Scholarship Test
              </h2>

              <p className="mt-3 text-[16px] font-medium leading-[1.7] text-scholarship-muted">
                Identify your academic potential through a competitive scholarship examination.
                Outstanding performers receive scholarships, expert mentorship and an opportunity
                to join Vishweshwarayya Academy&rsquo;s excellence program.
              </p>

              <div className="mt-3 flex flex-col justify-center gap-4 sm:flex-row lg:justify-start">
                <Button href="/scholarship" variant="scholarshipPrimary">
                  Apply for Scholarship
                </Button>
                <Button href="/scholarship" variant="scholarshipOutline">
                  Learn More
                  <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-1" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
