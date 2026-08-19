import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { getInfrastructurePhotoUrl } from "@/lib/supabase/storage";
import InfrastructureList, { type InfrastructureListRow } from "@/components/admin/infrastructure/InfrastructureList";
import { GOLD_500, IVORY_100, DISPLAY, SANS } from "@/components/admin/tokens";

export default async function AdminInfrastructurePage() {
  const supabase = await createClient();
  const { data: items, error } = await supabase
    .from("infrastructure_items")
    .select("*")
    .order("display_order", { ascending: true });

  let rows: InfrastructureListRow[] = [];

  if (!error && items) {
    const { data: photos } = await supabase
      .from("infrastructure_photos")
      .select("infrastructure_id, photo_path, display_order")
      .order("display_order", { ascending: true });

    const photoInfoById = new Map<string, { count: number; coverPath: string | null }>();
    for (const photo of photos ?? []) {
      const existing = photoInfoById.get(photo.infrastructure_id);
      if (existing) {
        existing.count += 1;
      } else {
        photoInfoById.set(photo.infrastructure_id, { count: 1, coverPath: photo.photo_path });
      }
    }

    rows = items.map((item) => {
      const info = photoInfoById.get(item.id);
      return {
        id: item.id,
        title: item.title,
        category: item.category,
        campus: item.campus,
        display_order: item.display_order,
        is_published: item.is_published,
        photo_count: info?.count ?? 0,
        cover_url: getInfrastructurePhotoUrl(info?.coverPath ?? null),
      };
    });
  }

  return (
    <div className="admin-content-wrap">
      <div className="admin-infra-header" style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 20, marginBottom: 36, flexWrap: "wrap" }}>
        <div>
          <h1 style={{ margin: "0 0 8px", fontFamily: DISPLAY, fontSize: 28, fontWeight: 500, color: IVORY_100 }}>Infrastructure</h1>
          <p style={{ margin: 0, fontFamily: SANS, fontSize: 14, color: "rgba(248,243,232,0.5)" }}>
            Manage campus infrastructure items and their photographs.
          </p>
        </div>
        <Link
          href="/admin/dashboard/infrastructure/new"
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
          + Add Infrastructure Item
        </Link>
      </div>

      {error ? (
        <div style={{ border: "1px solid rgba(229,115,115,0.3)", background: "rgba(229,115,115,0.06)", padding: "24px", borderRadius: 3 }}>
          <p style={{ margin: "0 0 6px", fontFamily: SANS, fontSize: 13.5, color: "#E57373", fontWeight: 600 }}>Could not load infrastructure items.</p>
          <p style={{ margin: 0, fontFamily: SANS, fontSize: 12.5, color: "rgba(248,243,232,0.55)" }}>
            {error.message}. If this is the first time using this module, make sure the database migration in{" "}
            <code>supabase/migrations/0003_infrastructure.sql</code> has been run in your Supabase project.
          </p>
        </div>
      ) : (
        <InfrastructureList items={rows} />
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
