import "server-only";
import { createAdminClient } from "@/lib/supabase/admin";
import type { SportsRegistration } from "@/lib/supabase/types";
import { isUuid } from "@/lib/snt/registrations";
import { SPORTS_PHOTO_BUCKET } from "@/lib/sports/constants";

export async function getSportsRegistration(id: string): Promise<SportsRegistration | null> {
  if (!isUuid(id)) return null;
  const { data, error } = await createAdminClient().from("sports_registrations").select("*").eq("id", id).maybeSingle();
  if (error) throw new Error(`Could not load sports registration: ${error.message}`);
  return data as SportsRegistration | null;
}

export async function downloadSportsPhoto(photoPath: string): Promise<Uint8Array> {
  const { data, error } = await createAdminClient().storage.from(SPORTS_PHOTO_BUCKET).download(photoPath);
  if (error || !data) throw new Error(`Could not load photo: ${error?.message ?? "empty"}`);
  return new Uint8Array(await data.arrayBuffer());
}
