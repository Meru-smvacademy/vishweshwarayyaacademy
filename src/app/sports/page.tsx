import type { Metadata } from "next";
import SportsRegistrationForm from "@/components/sports/SportsRegistrationForm";
import SportsRegistrationClosed from "@/components/sports/SportsRegistrationClosed";
import { SPORTS_MEET } from "@/content/sports";
import { SPORTS_REGISTRATION_PATH } from "@/lib/sports/constants";
import { isSportsRegistrationOpen } from "@/lib/sports/rules";
import { pageMetadata } from "@/lib/seo";

// Served directly (no redirect) so a QR scan with no referrer gets the form.
export const metadata: Metadata = pageMetadata({
  title: "SNT Sports Meet 2027 Registration — Vishweshwarayya NEET | JEE Academy",
  description:
    "Register for the SNT Sports Meet 2027 (Volleyball, Throw Ball, Athletics) at Sir M V NEET & JEE Academy, Lingasugur — 10 January 2027.",
  path: SPORTS_REGISTRATION_PATH,
});

// Re-checked every minute so the form disappears soon after registration
// closes; the register and order routes enforce the same cut-off every time.
export const revalidate = 60;

export default function SportsPage() {
  return isSportsRegistrationOpen(SPORTS_MEET.registrationCloses) ? <SportsRegistrationForm /> : <SportsRegistrationClosed />;
}
