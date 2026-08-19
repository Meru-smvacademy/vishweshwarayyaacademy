import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getInfrastructurePhotoUrl } from "@/lib/supabase/storage";
import InfrastructureEditForm from "@/components/admin/infrastructure/InfrastructureEditForm";
import InfrastructurePhotoManager from "@/components/admin/infrastructure/InfrastructurePhotoManager";
import { updateInfrastructureItemAction } from "@/app/admin/dashboard/infrastructure/actions";
import { IVORY_100, DISPLAY, SANS, RULE } from "@/components/admin/tokens";

export default async function EditInfrastructureItemPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: item, error } = await supabase.from("infrastructure_items").select("*").eq("id", id).maybeSingle();

  if (error || !item) {
    notFound();
  }

  const { data: photos } = await supabase
    .from("infrastructure_photos")
    .select("*")
    .eq("infrastructure_id", id)
    .order("display_order", { ascending: true });

  const photosWithUrls = (photos ?? []).map((photo) => ({
    id: photo.id,
    photo_path: photo.photo_path,
    display_order: photo.display_order,
    url: getInfrastructurePhotoUrl(photo.photo_path),
  }));

  const boundAction = updateInfrastructureItemAction.bind(null, item.id);

  return (
    <div className="admin-content-wrap">
      <Link href="/admin/dashboard/infrastructure" style={{ fontFamily: SANS, fontSize: 12.5, color: "rgba(248,243,232,0.5)", textDecoration: "none" }}>
        &larr; Back to Infrastructure
      </Link>
      <h1 style={{ margin: "14px 0 28px", fontFamily: DISPLAY, fontSize: 26, fontWeight: 500, color: IVORY_100 }}>Edit Infrastructure Item</h1>

      <InfrastructureEditForm item={item} action={boundAction} />

      <div style={{ borderTop: `1px solid ${RULE}`, marginTop: 40, paddingTop: 32 }}>
        <InfrastructurePhotoManager infrastructureId={item.id} initialPhotos={photosWithUrls} />
      </div>

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
