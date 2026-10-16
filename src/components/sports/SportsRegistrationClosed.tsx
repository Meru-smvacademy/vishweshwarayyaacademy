import Link from "next/link";
import { SPORTS_MEET } from "@/content/sports";
import { SNT_KN, SPORTS_KN } from "@/content/scholarship-kn";
import { sportsRegistrationClosedDetail } from "@/lib/sports/eventDetails";

const NAVY = "#0F1E3C";
const GOLD = "#C4922A";
const KN_INK = "var(--scholarship-navy-light)";
const CREAM = "#F9F6F0";

const DISPLAY = "var(--font-playfair-display), Georgia, serif";
const SANS = "var(--font-outfit), system-ui, sans-serif";
const KANNADA = "var(--font-noto-kannada), system-ui, sans-serif";

export default function SportsRegistrationClosed() {
  const detail = sportsRegistrationClosedDetail();
  return (
    <div style={{ fontFamily: SANS, backgroundColor: CREAM }} className="flex min-h-screen items-center justify-center px-4 py-12">
      <div className="mx-auto max-w-md text-center">
        <div style={{ backgroundColor: GOLD }} className="mx-auto mb-6 h-0.5 w-10" />
        <h1 style={{ fontFamily: DISPLAY, color: NAVY }} className="mb-3 text-3xl font-semibold">
          {SPORTS_MEET.registrationClosedMessage}
          <span lang="kn" className="mt-1 block text-sm" style={{ fontFamily: KANNADA, color: KN_INK }}>
            {SPORTS_KN.registrationClosed}
          </span>
        </h1>
        <p style={{ color: NAVY }} className="mb-8 text-base leading-relaxed">
          {detail.en}
          <span lang="kn" className="mt-1 block text-sm" style={{ fontFamily: KANNADA, color: KN_INK }}>
            {detail.kn}
          </span>
        </p>
        <Link
          href="/"
          className="inline-flex min-h-[44px] flex-col justify-center rounded-2xl border px-6 py-1.5 text-sm font-medium transition-all hover:opacity-70"
          style={{ color: NAVY, borderColor: NAVY }}
        >
          Back to the academy website
          <span lang="kn" className="block text-xs font-normal" style={{ fontFamily: KANNADA }}>
            {SNT_KN.centreName}
          </span>
        </Link>
      </div>
    </div>
  );
}
