import { createClient } from "@/lib/supabase/server";
import ScholarshipFilters from "@/components/admin/scholarships/ScholarshipFilters";
import ScholarshipList from "@/components/admin/scholarships/ScholarshipList";
import { IVORY_100, DISPLAY, SANS } from "@/components/admin/tokens";

function sanitizeSearchTerm(term: string): string {
  // Supabase's .or() filter string uses commas/parentheses as syntax, so
  // strip them from user input to avoid building a malformed filter.
  return term.replace(/[(),]/g, "").trim();
}

export default async function AdminScholarshipsPage({
  searchParams,
}: {
  searchParams: Promise<{
    q?: string;
    status?: string;
    academicYear?: string;
    applyingFor?: string;
    educationCompleted?: string;
  }>;
}) {
  const { q, status, academicYear, applyingFor, educationCompleted } = await searchParams;
  const supabase = await createClient();

  let query = supabase.from("scholarship_applications").select("*").order("created_at", { ascending: false });

  if (status) {
    query = query.eq("status", status);
  }
  if (academicYear) {
    query = query.eq("academic_year", academicYear);
  }
  if (applyingFor) {
    query = query.eq("applying_for", applyingFor);
  }
  if (educationCompleted) {
    query = query.eq("education_completed", educationCompleted);
  }

  const searchTerm = q ? sanitizeSearchTerm(q) : "";
  if (searchTerm) {
    const pattern = `%${searchTerm}%`;
    query = query.or(
      `student_name.ilike.${pattern},phone.ilike.${pattern},reference_no.ilike.${pattern},school_college_name.ilike.${pattern},native_place.ilike.${pattern}`,
    );
  }

  const { data, error } = await query;

  return (
    <div className="admin-content-wrap">
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ margin: "0 0 8px", fontFamily: DISPLAY, fontSize: 28, fontWeight: 500, color: IVORY_100 }}>
          Scholarship Applications
        </h1>
        <p style={{ margin: 0, fontFamily: SANS, fontSize: 14, color: "rgba(248,243,232,0.5)" }}>
          Review and manage applications submitted through the public SNT Scholarship form.
        </p>
      </div>

      <ScholarshipFilters
        initialQuery={q ?? ""}
        initialStatus={status ?? ""}
        initialAcademicYear={academicYear ?? ""}
        initialApplyingFor={applyingFor ?? ""}
        initialEducationCompleted={educationCompleted ?? ""}
      />

      {error ? (
        <div style={{ border: "1px solid rgba(229,115,115,0.3)", background: "rgba(229,115,115,0.06)", padding: "24px", borderRadius: 3 }}>
          <p style={{ margin: "0 0 6px", fontFamily: SANS, fontSize: 13.5, color: "#E57373", fontWeight: 600 }}>Could not load scholarship applications.</p>
          <p style={{ margin: 0, fontFamily: SANS, fontSize: 12.5, color: "rgba(248,243,232,0.55)" }}>
            {error.message}. If this is the first time using this module, make sure the database migration in{" "}
            <code>supabase/migrations/0005_scholarship_applications.sql</code> has been run in your Supabase project.
          </p>
        </div>
      ) : (
        <ScholarshipList applications={data ?? []} />
      )}

      <style>{`
        .admin-content-wrap {
          max-width: 1200px;
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
