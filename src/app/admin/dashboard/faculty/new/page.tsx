import Link from "next/link";
import FacultyForm from "@/components/admin/faculty/FacultyForm";
import { createFacultyAction } from "@/app/admin/dashboard/faculty/actions";
import { IVORY_100, DISPLAY, SANS } from "@/components/admin/tokens";

export default function AddFacultyPage() {
  return (
    <div className="admin-content-wrap">
      <Link href="/admin/dashboard/faculty" style={{ fontFamily: SANS, fontSize: 12.5, color: "rgba(248,243,232,0.5)", textDecoration: "none" }}>
        &larr; Back to Faculty
      </Link>
      <h1 style={{ margin: "14px 0 28px", fontFamily: DISPLAY, fontSize: 26, fontWeight: 500, color: IVORY_100 }}>Add Faculty</h1>
      <FacultyForm mode="create" action={createFacultyAction} />

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
