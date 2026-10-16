import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SportsRegistrationStatus from "@/components/sports/SportsRegistrationStatus";
import { getSportsRegistration } from "@/lib/sports/registrations";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "SNT Sports Meet Registration — Vishweshwarayya NEET | JEE Academy",
  robots: { index: false, follow: false },
};

export default async function SportsRegistrationStatusPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ pay?: string }>;
}) {
  const [{ id }, { pay }] = await Promise.all([params, searchParams]);
  const registration = await getSportsRegistration(id);

  if (!registration) {
    notFound();
  }

  return (
    <SportsRegistrationStatus
      registrationId={registration.id}
      studentName={registration.student_name}
      sport={registration.sport}
      athleticsEvent={registration.athletics_event}
      initialStatus={registration.status}
      initialEntryCardNo={registration.entry_card_no}
      autoStartPayment={pay === "1" && registration.status !== "paid"}
    />
  );
}
