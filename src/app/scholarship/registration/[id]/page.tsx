import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SntRegistrationStatus from "@/components/scholarship/SntRegistrationStatus";
import { findSntExamCentre } from "@/content/scholarship";
import { getSntRegistration } from "@/lib/snt/registrations";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "SNT Scholarship Registration — Vishweshwarayya NEET | JEE Academy",
  robots: { index: false, follow: false },
};

export default async function SntRegistrationPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ pay?: string }>;
}) {
  const [{ id }, { pay }] = await Promise.all([params, searchParams]);
  const registration = await getSntRegistration(id);

  if (!registration) {
    notFound();
  }

  const centre = findSntExamCentre(registration.centre);

  return (
    <SntRegistrationStatus
      registrationId={registration.id}
      studentName={registration.student_name}
      centreName={centre?.name ?? registration.centre}
      centreAddressLines={centre?.addressLines ?? []}
      initialStatus={registration.status}
      initialHallTicketNo={registration.hall_ticket_no}
      autoStartPayment={pay === "1" && registration.status !== "paid"}
    />
  );
}
