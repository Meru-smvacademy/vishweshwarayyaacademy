import type { Metadata } from "next";
import EnquiryForm from "@/components/enquiry/EnquiryForm";
import { PROGRAMS } from "@/lib/validation/enquiry";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Admission Enquiry — Vishweshwarayya NEET | JEE Academy",
  description:
    "Send an admission enquiry to Sir M Vishweshwarayya NEET | JEE Academy and hear back from our team about NEET, JEE and KCET programs at the Lingasuguru and Sindhanur campuses.",
  path: "/admission-enquiry",
});

const NAVY = "#0f1f3d";
const GOLD = "#c9993f";
const GOLD_LIGHT = "#f0e8d6";
const BORDER = "#e2e0da";
const MUTED = "#6b6860";
const PLACEHOLDER = "#b0ada5";

const LORA = "var(--font-lora), serif";
const INSTRUMENT_SANS = "var(--font-instrument-sans), sans-serif";

export default function AdmissionEnquiryPage() {
  return (
    <div style={{ background: "#fafaf8" }}>
      <section
        className="mx-auto grid grid-cols-1 items-start gap-10 max-[781px]:grid-cols-1 min-[782px]:grid-cols-2"
        style={{
          maxWidth: "1100px",
          padding: "clamp(48px, 8vw, 96px) clamp(20px, 5vw, 60px) clamp(40px, 6vw, 72px)",
          gap: "clamp(40px, 6vw, 100px)",
        }}
      >
        {/* Left: headline */}
        <div className="pt-2">
          <div
            className="mb-7 inline-flex items-center gap-2 rounded-full"
            style={{ background: GOLD_LIGHT, padding: "5px 14px 5px 10px" }}
          >
            <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full" style={{ background: GOLD }} />
            <span
              className="uppercase"
              style={{ fontFamily: INSTRUMENT_SANS, fontSize: "12px", fontWeight: 600, color: GOLD, letterSpacing: "0.08em" }}
            >
              Admission Enquiry
            </span>
          </div>

          <h1
            className="mb-6"
            style={{ fontFamily: LORA, fontSize: "clamp(36px, 5vw, 58px)", fontWeight: 400, lineHeight: 1.1, color: NAVY, letterSpacing: "-0.02em", margin: "0 0 24px" }}
          >
            Take the first step
            <br />
            <em style={{ fontStyle: "italic", color: GOLD, fontWeight: 300 }}>towards your</em>
            <br />
            academic journey.
          </h1>

          <p style={{ fontFamily: INSTRUMENT_SANS, fontSize: "16px", lineHeight: 1.75, color: MUTED, margin: "0 0 40px", maxWidth: "380px" }}>
            Fill in the form and our admissions team will reach out to help you choose the right program for your
            goals.
          </p>

          <div>
            <p
              className="uppercase"
              style={{ fontFamily: INSTRUMENT_SANS, fontSize: "11px", fontWeight: 600, letterSpacing: "0.1em", color: PLACEHOLDER, margin: "0 0 14px" }}
            >
              Programs offered
            </p>
            <div className="flex flex-col">
              {PROGRAMS.map((program) => (
                <div key={program} className="flex items-center gap-3 border-b" style={{ padding: "11px 0", borderColor: BORDER }}>
                  <span className="h-1 w-1 flex-shrink-0 rounded-full" style={{ background: GOLD }} />
                  <span style={{ fontFamily: INSTRUMENT_SANS, fontSize: "14px", fontWeight: 500, color: NAVY }}>{program}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: form card */}
        <div
          className="rounded-xl border bg-white"
          style={{ borderColor: BORDER, padding: "clamp(28px, 4vw, 44px)", boxShadow: "0 2px 20px rgba(15,31,61,0.05)" }}
        >
          <p style={{ fontFamily: LORA, fontSize: "20px", fontWeight: 400, color: NAVY, margin: "0 0 28px", letterSpacing: "-0.01em" }}>
            Tell us about you
          </p>
          <EnquiryForm />
        </div>
      </section>
    </div>
  );
}
