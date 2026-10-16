import Link from "next/link";
import { SNT_EXAM } from "@/content/scholarship";
import { SNT_KN } from "@/content/scholarship-kn";
import { sntRegistrationClosedDetail } from "@/lib/snt/examDetails";

const NAVY = "#0F1E3C";
const GOLD = "#C4922A";
// Kannada lines: slightly lighter than the NAVY English text, still 10.7:1 on CREAM.
const KN_INK = "var(--scholarship-navy-light)";
const CREAM = "#F9F6F0";

const DISPLAY = "var(--font-playfair-display), Georgia, serif";
const SANS = "var(--font-outfit), system-ui, sans-serif";
const KANNADA = "var(--font-noto-kannada), system-ui, sans-serif";

export default function SntRegistrationClosed() {
  const detail = sntRegistrationClosedDetail();
  return (
    <div style={{ fontFamily: SANS, backgroundColor: CREAM }} className="flex min-h-screen items-center justify-center px-4 py-12">
      <div className="mx-auto max-w-md text-center">
        <div style={{ backgroundColor: GOLD }} className="mx-auto mb-6 h-0.5 w-10" />
        <h1 style={{ fontFamily: DISPLAY, color: NAVY }} className="mb-3 text-3xl font-semibold">
          {SNT_EXAM.registrationClosedMessage}
          <span lang="kn" className="mt-1 block text-sm" style={{ fontFamily: KANNADA, color: KN_INK }}>
            {SNT_KN.registrationClosed}
          </span>
        </h1>
        <p style={{ color: NAVY }} className="mb-8 text-base leading-relaxed">
          {detail.en}
          <span lang="kn" className="mt-1 block text-sm" style={{ fontFamily: KANNADA, color: KN_INK }}>
            {detail.kn}
          </span>
        </p>
        <Link
          href="/scholarship"
          className="inline-flex min-h-[44px] flex-col justify-center rounded-2xl border px-6 py-1.5 text-sm font-medium transition-all hover:opacity-70"
          style={{ color: NAVY, borderColor: NAVY }}
        >
          About the SNT Scholarship
          <span lang="kn" className="block text-xs font-normal" style={{ fontFamily: KANNADA }}>
            {SNT_KN.aboutScholarship}
          </span>
        </Link>
      </div>
    </div>
  );
}
