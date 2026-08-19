"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import {
  validateInfrastructureItem,
  validatePhotoFiles,
  type InfrastructureFieldErrors,
  type InfrastructureFormValues,
} from "@/lib/validation/infrastructure";

const BUCKET = "infrastructure-photos";

export type InfrastructureActionState = {
  success: boolean;
  message?: string;
  errors?: InfrastructureFieldErrors;
};

export type PhotoActionState = {
  success: boolean;
  message?: string;
};

function readValues(formData: FormData): InfrastructureFormValues {
  return {
    title: String(formData.get("title") ?? ""),
    category: String(formData.get("category") ?? ""),
    campus: String(formData.get("campus") ?? ""),
    description: String(formData.get("description") ?? ""),
    displayOrder: String(formData.get("displayOrder") ?? ""),
    isPublished: formData.get("isPublished") === "on",
  };
}

function sanitizeFileName(fileName: string): string {
  return fileName.replace(/[^a-zA-Z0-9.\-_]/g, "_").toLowerCase();
}

function newPhotoPath(fileName: string): string {
  return `${crypto.randomUUID()}-${sanitizeFileName(fileName)}`;
}

async function requireAdmin() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Not authenticated.");
  }

  return supabase;
}

// ── Item: create ────────────────────────────────────────────────────────────

export async function createInfrastructureItemAction(
  _prevState: InfrastructureActionState,
  formData: FormData,
): Promise<InfrastructureActionState> {
  let supabase;
  try {
    supabase = await requireAdmin();
  } catch {
    return { success: false, message: "You must be signed in to do that." };
  }

  const values = readValues(formData);
  const errors = validateInfrastructureItem(values);

  const files = formData.getAll("photos").filter((entry): entry is File => entry instanceof File && entry.size > 0);
  const photosError = validatePhotoFiles(files);
  if (photosError) errors.photos = photosError;

  if (Object.keys(errors).length > 0) {
    return { success: false, errors };
  }

  const { data: item, error: insertError } = await supabase
    .from("infrastructure_items")
    .insert({
      title: values.title.trim(),
      category: values.category,
      campus: values.campus.trim() || null,
      description: values.description.trim() || null,
      display_order: values.displayOrder.trim() ? Number(values.displayOrder.trim()) : 0,
      is_published: values.isPublished,
    })
    .select("id")
    .single();

  if (insertError || !item) {
    return { success: false, message: `Could not save infrastructure item: ${insertError?.message ?? "unknown error"}` };
  }

  const uploadedPaths: string[] = [];
  for (const file of files) {
    const path = newPhotoPath(file.name);
    const { error: uploadError } = await supabase.storage.from(BUCKET).upload(path, file, {
      contentType: file.type,
      upsert: false,
    });
    if (uploadError) {
      if (uploadedPaths.length) await supabase.storage.from(BUCKET).remove(uploadedPaths);
      await supabase.from("infrastructure_items").delete().eq("id", item.id);
      return { success: false, message: `Photo upload failed: ${uploadError.message}` };
    }
    uploadedPaths.push(path);
  }

  if (uploadedPaths.length) {
    const rows = uploadedPaths.map((photo_path, index) => ({
      infrastructure_id: item.id,
      photo_path,
      display_order: index,
    }));
    const { error: photosInsertError } = await supabase.from("infrastructure_photos").insert(rows);
    if (photosInsertError) {
      await supabase.storage.from(BUCKET).remove(uploadedPaths);
      await supabase.from("infrastructure_items").delete().eq("id", item.id);
      return { success: false, message: `Could not save photos: ${photosInsertError.message}` };
    }
  }

  revalidatePath("/admin/dashboard/infrastructure");
  redirect(`/admin/dashboard/infrastructure/${item.id}/edit`);
}

// ── Item: update details only (photos are managed separately) ──────────────

export async function updateInfrastructureItemAction(
  id: string,
  _prevState: InfrastructureActionState,
  formData: FormData,
): Promise<InfrastructureActionState> {
  let supabase;
  try {
    supabase = await requireAdmin();
  } catch {
    return { success: false, message: "You must be signed in to do that." };
  }

  const values = readValues(formData);
  const errors = validateInfrastructureItem(values);

  if (Object.keys(errors).length > 0) {
    return { success: false, errors };
  }

  const { error: updateError } = await supabase
    .from("infrastructure_items")
    .update({
      title: values.title.trim(),
      category: values.category,
      campus: values.campus.trim() || null,
      description: values.description.trim() || null,
      display_order: values.displayOrder.trim() ? Number(values.displayOrder.trim()) : 0,
      is_published: values.isPublished,
    })
    .eq("id", id);

  if (updateError) {
    return { success: false, message: `Could not save changes: ${updateError.message}` };
  }

  revalidatePath("/admin/dashboard/infrastructure");
  revalidatePath(`/admin/dashboard/infrastructure/${id}/edit`);
  redirect("/admin/dashboard/infrastructure");
}

// ── Item: delete (cleans up ALL associated Storage files first) ────────────

export async function deleteInfrastructureItemAction(id: string): Promise<PhotoActionState> {
  let supabase;
  try {
    supabase = await requireAdmin();
  } catch {
    return { success: false, message: "You must be signed in to do that." };
  }

  const { data: photos, error: fetchError } = await supabase
    .from("infrastructure_photos")
    .select("photo_path")
    .eq("infrastructure_id", id);

  if (fetchError) {
    return { success: false, message: `Could not look up photos: ${fetchError.message}` };
  }

  const paths = (photos ?? []).map((p) => p.photo_path);
  if (paths.length) {
    await supabase.storage.from(BUCKET).remove(paths);
  }

  const { error: deleteError } = await supabase.from("infrastructure_items").delete().eq("id", id);
  if (deleteError) {
    return { success: false, message: `Could not delete infrastructure item: ${deleteError.message}` };
  }

  revalidatePath("/admin/dashboard/infrastructure");
  return { success: true };
}

// ── Photos: add one or more to an existing item ─────────────────────────────

export async function addInfrastructurePhotosAction(
  infrastructureId: string,
  nextDisplayOrder: number,
  formData: FormData,
): Promise<PhotoActionState> {
  let supabase;
  try {
    supabase = await requireAdmin();
  } catch {
    return { success: false, message: "You must be signed in to do that." };
  }

  const files = formData.getAll("photos").filter((entry): entry is File => entry instanceof File && entry.size > 0);
  if (files.length === 0) {
    return { success: false, message: "Choose at least one photo to add." };
  }

  const photosError = validatePhotoFiles(files);
  if (photosError) {
    return { success: false, message: photosError };
  }

  const uploadedPaths: string[] = [];
  for (const file of files) {
    const path = newPhotoPath(file.name);
    const { error: uploadError } = await supabase.storage.from(BUCKET).upload(path, file, {
      contentType: file.type,
      upsert: false,
    });
    if (uploadError) {
      if (uploadedPaths.length) await supabase.storage.from(BUCKET).remove(uploadedPaths);
      return { success: false, message: `Photo upload failed: ${uploadError.message}` };
    }
    uploadedPaths.push(path);
  }

  const rows = uploadedPaths.map((photo_path, index) => ({
    infrastructure_id: infrastructureId,
    photo_path,
    display_order: nextDisplayOrder + index,
  }));
  const { error: insertError } = await supabase.from("infrastructure_photos").insert(rows);
  if (insertError) {
    await supabase.storage.from(BUCKET).remove(uploadedPaths);
    return { success: false, message: `Could not save photos: ${insertError.message}` };
  }

  revalidatePath(`/admin/dashboard/infrastructure/${infrastructureId}/edit`);
  return { success: true };
}

// ── Photos: replace one photo's image file in place ─────────────────────────

export async function replaceInfrastructurePhotoAction(
  photoId: string,
  infrastructureId: string,
  existingPath: string,
  file: File,
): Promise<PhotoActionState> {
  let supabase;
  try {
    supabase = await requireAdmin();
  } catch {
    return { success: false, message: "You must be signed in to do that." };
  }

  const photosError = validatePhotoFiles([file]);
  if (photosError) {
    return { success: false, message: photosError };
  }

  const newPath = newPhotoPath(file.name);
  const { error: uploadError } = await supabase.storage.from(BUCKET).upload(newPath, file, {
    contentType: file.type,
    upsert: false,
  });
  if (uploadError) {
    return { success: false, message: `Photo upload failed: ${uploadError.message}` };
  }

  const { error: updateError } = await supabase
    .from("infrastructure_photos")
    .update({ photo_path: newPath })
    .eq("id", photoId);

  if (updateError) {
    await supabase.storage.from(BUCKET).remove([newPath]);
    return { success: false, message: `Could not save the replacement photo: ${updateError.message}` };
  }

  await supabase.storage.from(BUCKET).remove([existingPath]);

  revalidatePath(`/admin/dashboard/infrastructure/${infrastructureId}/edit`);
  return { success: true };
}

// ── Photos: delete one photo ─────────────────────────────────────────────────

export async function deleteInfrastructurePhotoAction(
  photoId: string,
  infrastructureId: string,
  photoPath: string,
): Promise<PhotoActionState> {
  let supabase;
  try {
    supabase = await requireAdmin();
  } catch {
    return { success: false, message: "You must be signed in to do that." };
  }

  const { error } = await supabase.from("infrastructure_photos").delete().eq("id", photoId);
  if (error) {
    return { success: false, message: `Could not delete photo: ${error.message}` };
  }

  await supabase.storage.from(BUCKET).remove([photoPath]);

  revalidatePath(`/admin/dashboard/infrastructure/${infrastructureId}/edit`);
  return { success: true };
}

// ── Photos: reorder ──────────────────────────────────────────────────────────

export async function reorderInfrastructurePhotosAction(
  infrastructureId: string,
  orderedPhotoIds: string[],
): Promise<PhotoActionState> {
  let supabase;
  try {
    supabase = await requireAdmin();
  } catch {
    return { success: false, message: "You must be signed in to do that." };
  }

  const updates = orderedPhotoIds.map((photoId, index) =>
    supabase.from("infrastructure_photos").update({ display_order: index }).eq("id", photoId),
  );
  const results = await Promise.all(updates);
  const failed = results.find((r) => r.error);
  if (failed?.error) {
    return { success: false, message: `Could not save the new order: ${failed.error.message}` };
  }

  revalidatePath(`/admin/dashboard/infrastructure/${infrastructureId}/edit`);
  return { success: true };
}
