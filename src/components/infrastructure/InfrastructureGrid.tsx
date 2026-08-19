import { createClient } from "@/lib/supabase/server";
import { getInfrastructurePhotoUrl } from "@/lib/supabase/storage";
import InfraItem from "@/components/infrastructure/InfraItem";
import { INFRASTRUCTURE_AREAS } from "@/content/infrastructure";

const GOLD = "#b8933c";
const IVORY = "#f4efe5";
const MONO = "var(--font-dm-mono), 'Courier New', monospace";

type CategoryContent = { description: string | null; imageUrl: string | null };

// The public page has exactly one card per approved category — it always
// has, and isn't being redesigned into a flexible list. When more than one
// published item shares a category, the first one (by display_order, then
// created_at) is the representative shown here; any others in that same
// category aren't shown on this page, since there's no slot for them.
async function getRepresentativeByCategory(): Promise<Record<string, CategoryContent>> {
  const supabase = await createClient();

  const { data: items, error } = await supabase
    .from("infrastructure_items")
    .select("id, category, description")
    .eq("is_published", true)
    .order("display_order", { ascending: true })
    .order("created_at", { ascending: true });

  if (error || !items || items.length === 0) {
    return {};
  }

  const representativeByCategory = new Map<string, { id: string; description: string | null }>();
  for (const item of items) {
    if (!representativeByCategory.has(item.category)) {
      representativeByCategory.set(item.category, { id: item.id, description: item.description });
    }
  }

  const representativeIds = Array.from(representativeByCategory.values()).map((entry) => entry.id);

  const { data: photos } = await supabase
    .from("infrastructure_photos")
    .select("infrastructure_id, photo_path")
    .in("infrastructure_id", representativeIds)
    .order("display_order", { ascending: true })
    .order("created_at", { ascending: true });

  const firstPhotoPathByItemId = new Map<string, string>();
  for (const photo of photos ?? []) {
    if (!firstPhotoPathByItemId.has(photo.infrastructure_id)) {
      firstPhotoPathByItemId.set(photo.infrastructure_id, photo.photo_path);
    }
  }

  const result: Record<string, CategoryContent> = {};
  for (const [category, { id, description }] of representativeByCategory) {
    result[category] = {
      description: description?.trim() ? description.trim() : null,
      imageUrl: getInfrastructurePhotoUrl(firstPhotoPathByItemId.get(id) ?? null),
    };
  }

  return result;
}

export default async function InfrastructureGrid() {
  const representativeByCategory = await getRepresentativeByCategory();
  const [campus, smartClassrooms, scienceLabs, digitalLearning, library, studyEnvironment] = INFRASTRUCTURE_AREAS;

  return (
    <section style={{ backgroundColor: IVORY }}>
      <div className="infra-grid-inner" style={{ maxWidth: "1152px", margin: "0 auto", padding: "5rem 1.5rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "3.5rem" }}>
          <div style={{ width: "20px", height: "1px", backgroundColor: GOLD }} />
          <span style={{ fontFamily: MONO, fontSize: "10px", letterSpacing: "0.3em", color: GOLD, textTransform: "uppercase" }}>
            The Spaces
          </span>
        </div>

        <div className="infra-row-1" style={{ display: "grid", gridTemplateColumns: "1fr", gap: "2rem", marginBottom: "3rem" }}>
          <InfraItem
            area={campus}
            description={representativeByCategory[campus.title]?.description ?? null}
            imageUrl={representativeByCategory[campus.title]?.imageUrl ?? null}
          />
          <InfraItem
            area={smartClassrooms}
            description={representativeByCategory[smartClassrooms.title]?.description ?? null}
            imageUrl={representativeByCategory[smartClassrooms.title]?.imageUrl ?? null}
          />
          <InfraItem
            area={scienceLabs}
            description={representativeByCategory[scienceLabs.title]?.description ?? null}
            imageUrl={representativeByCategory[scienceLabs.title]?.imageUrl ?? null}
          />
        </div>

        <div style={{ marginBottom: "3rem" }}>
          <InfraItem
            area={digitalLearning}
            description={representativeByCategory[digitalLearning.title]?.description ?? null}
            imageUrl={representativeByCategory[digitalLearning.title]?.imageUrl ?? null}
          />
        </div>

        <div className="infra-row-3" style={{ display: "grid", gridTemplateColumns: "1fr", gap: "2rem" }}>
          <InfraItem
            area={library}
            description={representativeByCategory[library.title]?.description ?? null}
            imageUrl={representativeByCategory[library.title]?.imageUrl ?? null}
          />
          <InfraItem
            area={studyEnvironment}
            description={representativeByCategory[studyEnvironment.title]?.description ?? null}
            imageUrl={representativeByCategory[studyEnvironment.title]?.imageUrl ?? null}
          />
        </div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .infra-grid-inner { padding-left: 3rem !important; padding-right: 3rem !important; }
          .infra-row-1 { grid-template-columns: 1.4fr 1fr 1fr !important; gap: 3rem !important; }
          .infra-row-3 { grid-template-columns: 1fr 1.4fr !important; gap: 3rem !important; }
        }
        @media (min-width: 1024px) {
          .infra-grid-inner { padding-left: 4rem !important; padding-right: 4rem !important; }
        }
      `}</style>
    </section>
  );
}
