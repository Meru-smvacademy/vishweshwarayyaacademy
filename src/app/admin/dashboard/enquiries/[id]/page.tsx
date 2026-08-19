import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import EnquiryDetail from "@/components/admin/enquiries/EnquiryDetail";
import { IVORY_100, DISPLAY, SANS } from "@/components/admin/tokens";

export default async function EnquiryDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: enquiry, error } = await supabase.from("enquiries").select("*").eq("id", id).maybeSingle();

  if (error || !enquiry) {
    notFound();
  }

  return (
    <div className="admin-content-wrap">
      <Link href="/admin/dashboard/enquiries" style={{ fontFamily: SANS, fontSize: 12.5, color: "rgba(248,243,232,0.5)", textDecoration: "none" }}>
        &larr; Back to Enquiries
      </Link>
      <h1 style={{ margin: "14px 0 28px", fontFamily: DISPLAY, fontSize: 26, fontWeight: 500, color: IVORY_100 }}>
        {enquiry.student_name}
      </h1>

      <EnquiryDetail enquiry={enquiry} />

      <style>{`
        .admin-content-wrap {
          max-width: 1100px;
          margin: 0 auto;
          padding: 48px 40px 72px;
          width: 100%;
          box-sizing: border-box;
        }
        @media (max-width: 768px) {
          .admin-content-wrap { padding: 28px 20px 60px; }
        }
      `}</style>
    </div>
  );
}
