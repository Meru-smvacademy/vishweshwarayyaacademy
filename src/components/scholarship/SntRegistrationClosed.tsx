import Link from "next/link";
import { SNT_EXAM } from "@/content/scholarship";

const NAVY = "#0F1E3C";
const GOLD = "#C4922A";
const MUTED = "#6B7A90";
const CREAM = "#F9F6F0";

const DISPLAY = "var(--font-playfair-display), Georgia, serif";
const SANS = "var(--font-outfit), system-ui, sans-serif";

export default function SntRegistrationClosed() {
  return (
    <div style={{ fontFamily: SANS, backgroundColor: CREAM }} className="flex min-h-screen items-center justify-center px-4 py-12">
      <div className="mx-auto max-w-md text-center">
        <div style={{ backgroundColor: GOLD }} className="mx-auto mb-6 h-0.5 w-10" />
        <h1 style={{ fontFamily: DISPLAY, color: NAVY }} className="mb-3 text-3xl font-semibold">
          {SNT_EXAM.registrationClosedMessage}
        </h1>
        <p style={{ color: MUTED }} className="mb-8 text-base leading-relaxed">
          The SNT Scholarship Exam has begun. If you have already registered, use the link you received to download your
          hall ticket.
        </p>
        <Link
          href="/scholarship"
          className="inline-flex min-h-[44px] items-center rounded-full border px-6 text-sm font-medium transition-all hover:opacity-70"
          style={{ color: GOLD, borderColor: GOLD }}
        >
          About the SNT Scholarship
        </Link>
      </div>
    </div>
  );
}
