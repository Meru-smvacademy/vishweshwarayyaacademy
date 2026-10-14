import "server-only";
import { createAdminClient } from "@/lib/supabase/admin";
import type { SntRegistration } from "@/lib/supabase/types";
import { SNT_PHOTO_BUCKET } from "@/lib/snt/constants";

const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export function isUuid(value: unknown): value is string {
  return typeof value === "string" && UUID_PATTERN.test(value);
}

export async function getSntRegistration(id: string): Promise<SntRegistration | null> {
  if (!isUuid(id)) return null;
  const { data, error } = await createAdminClient()
    .from("scholarship_registrations")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) throw new Error(`Could not load registration: ${error.message}`);
  return data as SntRegistration | null;
}

export async function downloadSntPhoto(photoPath: string): Promise<Uint8Array> {
  const { data, error } = await createAdminClient().storage.from(SNT_PHOTO_BUCKET).download(photoPath);
  if (error || !data) throw new Error(`Could not load photo: ${error?.message ?? "empty"}`);
  return new Uint8Array(await data.arrayBuffer());
}
