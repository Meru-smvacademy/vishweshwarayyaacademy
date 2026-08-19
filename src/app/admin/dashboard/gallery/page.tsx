import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import GalleryGrid from "@/components/admin/gallery/GalleryGrid";
import { GOLD_500, IVORY_100, DISPLAY, SANS } from "@/components/admin/tokens";

export default async function AdminGalleryPage() {
  const supabase = await createClient();
  const { data, error } = await supabase.from("gallery_photos").select("*").order("display_order", { ascending: true });

  return (
    <div className="admin-content-wrap">
      <div className="admin-gallery-header" style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 20, marginBottom: 36, flexWrap: "wrap" }}>
        <div>
          <h1 style={{ margin: "0 0 8px", fontFamily: DISPLAY, fontSize: 28, fontWeight: 500, color: IVORY_100 }}>Gallery</h1>
          <p style={{ margin: 0, fontFamily: SANS, fontSize: 14, color: "rgba(248,243,232,0.5)" }}>Manage academy photographs and gallery content.</p>
        </div>
        <Link
          href="/admin/dashboard/gallery/new"
          style={{
            display: "inline-flex",
            alignItems: "center",
            padding: "10px 20px",
            borderRadius: 3,
            background: GOLD_500,
            color: "#0B1628",
            fontFamily: SANS,
            fontSize: 12.5,
            fontWeight: 600,
            letterSpacing: "0.05em",
            textTransform: "uppercase",
            textDecoration: "none",
            whiteSpace: "nowrap",
          }}
        >
          + Add Gallery Photo
        </Link>
      </div>

      {error ? (
        <div style={{ border: "1px solid rgba(229,115,115,0.3)", background: "rgba(229,115,115,0.06)", padding: "24px", borderRadius: 3 }}>
          <p style={{ margin: "0 0 6px", fontFamily: SANS, fontSize: 13.5, color: "#E57373", fontWeight: 600 }}>Could not load gallery photos.</p>
          <p style={{ margin: 0, fontFamily: SANS, fontSize: 12.5, color: "rgba(248,243,232,0.55)" }}>
            {error.message}. If this is the first time using this module, make sure the database migration in{" "}
            <code>supabase/migrations/0002_gallery.sql</code> has been run in your Supabase project.
          </p>
        </div>
      ) : (
        <GalleryGrid photos={data ?? []} />
      )}

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
