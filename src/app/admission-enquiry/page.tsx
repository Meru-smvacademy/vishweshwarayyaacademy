import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import EnquiryForm from "@/components/enquiry/EnquiryForm";

export const metadata: Metadata = {
  title: "Admission Enquiry — Visveshwarayya NEET | JEE Academy",
  description: "",
};

export default function AdmissionEnquiryPage() {
  return (
    <Container className="py-14 sm:py-20">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-2xl font-bold text-primary sm:text-3xl">Admission Enquiry</h1>
        <p className="mt-2 text-base text-muted">
          Share a few details and our admissions team will get in touch with you.
        </p>

        <div className="mt-8">
          <EnquiryForm />
        </div>
      </div>
    </Container>
  );
}
