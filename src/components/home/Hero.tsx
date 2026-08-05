import Image from "next/image";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import PlaceholderTag from "@/components/ui/PlaceholderTag";
import { PRIMARY_CTA_HREF, PRIMARY_CTA_LABEL } from "@/config/nav";

const BRANCHES = ["Lingasuguru", "Sindhanur"];

export default function Hero() {
  return (
    <section className="border-b border-line bg-surface-muted">
      <Container className="grid items-center gap-10 py-16 lg:!max-w-7xl lg:grid-cols-[1fr_1.25fr] lg:gap-14 lg:py-24">
        <div>
          <div className="flex flex-wrap gap-2">
            {BRANCHES.map((branch) => (
              <span
                key={branch}
                className="rounded-full border border-line bg-surface px-3 py-1 text-xs font-semibold text-primary"
              >
                {branch}
              </span>
            ))}
          </div>

          <h1 className="mt-5 text-3xl font-bold leading-tight text-primary sm:text-4xl lg:text-5xl">
            Focused Coaching for NEET, JEE &amp; KCET Success
          </h1>

          <p className="mt-4 max-w-xl text-base text-muted sm:text-lg">
            Structured classes, experienced faculty guidance, and a disciplined study environment
            for Class 8–12 and repeater students, at our Lingasuguru and Sindhanur campuses.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <p className="text-sm font-semibold text-primary">
              Trusted NEET &amp; JEE Coaching Since XXXX
            </p>
            <span className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-3 py-1">
              <span className="text-base font-bold text-primary">1200+</span>
              <span className="text-xs font-medium text-muted">Students Guided</span>
            </span>
          </div>
          <div className="mt-2">
            <PlaceholderTag label="Trust stats pending verification" />
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href={PRIMARY_CTA_HREF} variant="primary">
              {PRIMARY_CTA_LABEL}
            </Button>
            <Button href="/courses" variant="outline">
              Explore Courses
            </Button>
          </div>
        </div>

        <div className="relative mx-auto aspect-[5504/3072] w-full">
          <Image
            src="/images/hero/hero-illustration.png"
            alt="A NEET aspirant in a white coat and a JEE aspirant carrying a laptop and blueprints, standing in front of a campus building"
            fill
            priority
            className="object-contain"
          />
          <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-1/5 bg-gradient-to-r from-surface-muted to-transparent lg:block" />
        </div>
      </Container>
    </section>
  );
}
