import type { SVGProps } from "react";
import Link from "next/link";
import Container from "@/components/ui/Container";
import { ArrowRightIcon } from "@/components/ui/icons";
import { PRIMARY_CTA_HREF, PRIMARY_CTA_LABEL } from "@/config/nav";

// Same decorative treatment as the approved homepage Admission CTA
// (src/components/home/AdmissionCta.tsx), adapted for the Courses page.
function SparkleDecoration(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" aria-hidden="true" {...props}>
      <path d="M11.361 2.22753C11.1815 2.37664 11.0598 2.58384 11.0169 2.81326L9.96584 8.37171C9.89119 8.76689 9.69914 9.13039 9.41476 9.41476C9.13039 9.69914 8.76689 9.89119 8.37171 9.96584L2.81326 11.0169C2.58384 11.0598 2.37664 11.1815 2.22753 11.361C2.07842 11.5406 1.9968 11.7666 1.9968 12C1.9968 12.2334 2.07842 12.4594 2.22753 12.639C2.37664 12.8185 2.58384 12.9402 2.81326 12.9831L8.37171 14.0342C8.76689 14.1088 9.13039 14.3009 9.41476 14.5852C9.69914 14.8696 9.89119 15.2331 9.96584 15.6283L11.0169 21.1867C11.0598 21.4162 11.1815 21.6234 11.361 21.7725C11.5406 21.9216 11.7666 22.0032 12 22.0032C12.2334 22.0032 12.4594 21.9216 12.639 21.7725C12.8185 21.6234 12.9402 21.4162 12.9831 21.1867L14.0342 15.6283C14.1088 15.2331 14.3009 14.8696 14.5852 14.5852C14.8696 14.3009 15.2331 14.1088 15.6283 14.0342L21.1867 12.9831C21.4162 12.9402 21.6234 12.8185 21.7725 12.639C21.9216 12.4594 22.0032 12.2334 22.0032 12C22.0032 11.7666 21.9216 11.5406 21.7725 11.361C21.6234 11.1815 21.4162 11.0598 21.1867 11.0169L15.6283 9.96584C15.2331 9.89119 14.8696 9.69914 14.5852 9.41476C14.3009 9.13039 14.1088 8.76689 14.0342 8.37171L12.9831 2.81326C12.9402 2.58384 12.8185 2.37664 12.639 2.22753C12.4594 2.07842 12.2334 1.9968 12 1.9968C11.7666 1.9968 11.5406 2.07842 11.361 2.22753Z" />
    </svg>
  );
}

function GraduationCapDecoration(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" aria-hidden="true" {...props}>
      <path d="M43.998 19.9995V32.0009M12.0006 25.0001V32.0009C12.0006 33.5924 13.2648 35.1187 15.515 36.244C17.7653 37.3694 20.8173 38.0016 23.9996 38.0016C27.182 38.0016 30.234 37.3694 32.4843 36.244C34.7345 35.1187 35.9987 33.5924 35.9987 32.0009V25.0001M42.8377 21.8445C43.1957 21.6865 43.4996 21.427 43.7115 21.098C43.9235 20.769 44.0343 20.3851 44.0303 19.9937C44.0262 19.6024 43.9075 19.2208 43.6888 18.8963C43.47 18.5718 43.1609 18.3186 42.7997 18.168L25.6591 10.3592C25.138 10.1214 24.572 9.9984 23.9992 9.9984C23.4265 9.9984 22.8605 10.1214 22.3394 10.3592L5.20075 18.16C4.84471 18.316 4.54183 18.5724 4.32915 18.8978C4.11647 19.2232 4.0032 19.6035 4.0032 19.9923C4.0032 20.381 4.11647 20.7614 4.32915 21.0868C4.54183 21.4121 4.84471 21.6685 5.20075 21.8245L22.3394 29.6414C22.8605 29.8791 23.4265 30.0021 23.9992 30.0021C24.572 30.0021 25.138 29.8791 25.6591 29.6414L42.8377 21.8445Z" />
    </svg>
  );
}

function StarDecoration(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" aria-hidden="true" {...props}>
      <path d="M7.8143 1.38595C7.75835 1.42068 7.71322 1.47037 7.684 1.5294L6.14467 4.64873C6.04314 4.85424 5.89319 5.03201 5.70772 5.16672C5.52226 5.30143 5.30684 5.38906 5.08 5.42206L1.63667 5.9254C1.57114 5.93466 1.50952 5.96215 1.45885 6.00472C1.40818 6.04729 1.37048 6.10324 1.35005 6.16619C1.32962 6.22914 1.32729 6.29656 1.34331 6.36078C1.35933 6.42499 1.39306 6.48342 1.44067 6.5294L3.93133 8.95406C4.09574 9.11416 4.21873 9.31186 4.28969 9.53009C4.36066 9.74833 4.37746 9.98055 4.33867 10.2067L3.75133 13.6327C3.73991 13.6979 3.74699 13.7649 3.77177 13.8262C3.79656 13.8875 3.83805 13.9406 3.89153 13.9795C3.94501 14.0184 4.00834 14.0415 4.0743 14.0462C4.14026 14.0509 4.20622 14.037 4.26467 14.0061L7.34267 12.3874C7.54552 12.2809 7.77121 12.2252 8.00033 12.2252C8.22945 12.2252 8.45514 12.2809 8.658 12.3874L11.7367 14.0061C11.7951 14.0372 11.8612 14.0513 11.9272 14.0467C11.9933 14.0421 12.0568 14.019 12.1104 13.9801C12.164 13.9411 12.2055 13.8879 12.2303 13.8265C12.2551 13.7651 12.2622 13.698 12.2507 13.6327L11.6627 10.2061C11.624 9.97999 11.6409 9.74791 11.7119 9.52981C11.7828 9.31172 11.9057 9.11413 12.07 8.95406L14.5607 6.52873C14.6079 6.4827 14.6413 6.42437 14.6571 6.36035C14.6728 6.29633 14.6704 6.22917 14.65 6.16647C14.6296 6.10376 14.5921 6.04801 14.5417 6.00553C14.4912 5.96304 14.4299 5.93552 14.3647 5.92606L10.9207 5.42206C10.6941 5.3888 10.479 5.30106 10.2937 5.16636C10.1085 5.03167 9.95879 4.85404 9.85733 4.64873L8.31733 1.5294C8.28812 1.47037 8.24299 1.42068 8.18703 1.38595C8.13108 1.35121 8.06653 1.3328 8.00067 1.3328C7.93481 1.3328 7.87026 1.35121 7.8143 1.38595Z" />
    </svg>
  );
}

const BACKGROUND_LAYERS = [
  "radial-gradient(ellipse at center, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 100%)",
  "repeating-linear-gradient(to bottom, rgba(255,255,255,0.03) 0px, rgba(255,255,255,0.03) 1px, transparent 1px, transparent 72px)",
  "linear-gradient(90deg, #163A63 0%, #1E4A7B 100%)",
].join(", ");

export default function CoursesAdmissionCta() {
  return (
    <section className="py-14 sm:py-20">
      <Container className="lg:!max-w-7xl">
        <div
          className="relative overflow-hidden rounded-[24px] border-t border-white/10 px-6 py-16 sm:px-12 sm:py-20 lg:px-16 lg:py-20"
          style={{ backgroundImage: BACKGROUND_LAYERS }}
        >
          <SparkleDecoration
            className="absolute left-6 top-8 h-5 w-5 text-white opacity-[0.12] sm:left-10 sm:top-[39px] sm:h-6 sm:w-6"
          />
          <GraduationCapDecoration
            className="absolute right-8 top-6 hidden h-10 w-10 text-white opacity-[0.08] sm:right-[60px] sm:top-[29px] sm:block sm:h-12 sm:w-12"
          />
          <StarDecoration
            className="absolute bottom-8 right-16 hidden h-4 w-4 text-white opacity-10 sm:bottom-[35px] sm:right-[120px] sm:block"
          />

          <div className="relative mx-auto flex max-w-[760px] flex-col items-center gap-6 text-center">
            <h2 className="font-inter text-[32px] font-bold leading-[1.1] tracking-[0.84px] text-white sm:text-[42px] lg:text-[56px]">
              Ready to Begin Your Program?
            </h2>

            <p className="max-w-[600px] text-[16px] font-normal leading-[1.6] text-white/75">
              Speak with our admissions team about enrolling in Foundation, NEET, JEE, or KCET.
            </p>

            <Link
              href={PRIMARY_CTA_HREF}
              className="group mt-6 inline-flex items-center gap-2.5 rounded-[18px] bg-[#FFB81A] px-10 py-4 text-[16px] font-semibold tracking-[0.5px] text-[#0D1F38] shadow-[0px_4px_8px_0px_rgba(255,184,26,0.4)] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[0px_8px_18px_0px_rgba(255,184,26,0.55)]"
            >
              {PRIMARY_CTA_LABEL}
              <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
