"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import {
  validateGalleryPhoto,
  validateGalleryPhotoFile,
  type GalleryFieldErrors,
  type GalleryFormValues,
} from "@/lib/validation/gallery";

const BUCKET = "gallery-photos";

export type GalleryActionState = {
  success: boolean;
  message?: string;
  errors?: GalleryFieldErrors;
};

function readValues(formData: FormData): GalleryFormValues {
  return {
    title: String(formData.get("title") ?? ""),
    category: String(formData.get("category") ?? ""),
    academicYear: String(formData.get("academicYear") ?? ""),
    campus: String(formData.get("campus") ?? ""),
    description: String(formData.get("description") ?? ""),
    displayOrder: String(formData.get("displayOrder") ?? ""),
    isPublished: formData.get("isPublished") === "on",
  };
}

function sanitizeFileName(fileName: string): string {
  return fileName.replace(/[^a-zA-Z0-9.\-_]/g, "_").toLowerCase();
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

export async function createGalleryPhotoAction(
  _prevState: GalleryActionState,
  formData: FormData,
): Promise<GalleryActionState> {
  let supabase;
  try {
    supabase = await requireAdmin();
  } catch {
    return { success: false, message: "You must be signed in to do that." };
  }

  const values = readValues(formData);
  const errors = validateGalleryPhoto(values);

  const photoFile = formData.get("photo");
  const file = photoFile instanceof File && photoFile.size > 0 ? photoFile : null;
  const photoError = validateGalleryPhotoFile(file, true);
  if (photoError) errors.photo = photoError;

  if (Object.keys(errors).length > 0) {
    return { success: false, errors };
  }

  const photoPath = `${crypto.randomUUID()}-${sanitizeFileName(file!.name)}`;
  const { error: uploadError } = await supabase.storage.from(BUCKET).upload(photoPath, file!, {
    contentType: file!.type,
    upsert: false,
  });
  if (uploadError) {
    return { success: false, message: `Photo upload failed: ${uploadError.message}` };
  }

  const { error: insertError } = await supabase.from("gallery_photos").insert({
    title: values.title.trim(),
    category: values.category,
    academic_year: values.academicYear.trim() || null,
    campus: values.campus.trim() || null,
    description: values.description.trim() || null,
    photo_path: photoPath,
    display_order: values.displayOrder.trim() ? Number(values.displayOrder.trim()) : 0,
    is_published: values.isPublished,
  });

  if (insertError) {
    await supabase.storage.from(BUCKET).remove([photoPath]);
    return { success: false, message: `Could not save gallery photo: ${insertError.message}` };
  }

  revalidatePath("/admin/dashboard/gallery");
  redirect("/admin/dashboard/gallery");
}

export async function updateGalleryPhotoAction(
  id: string,
  existingPhotoPath: string,
  _prevState: GalleryActionState,
  formData: FormData,
): Promise<GalleryActionState> {
  let supabase;
  try {
    supabase = await requireAdmin();
  } catch {
    return { success: false, message: "You must be signed in to do that." };
  }

  const values = readValues(formData);
  const errors = validateGalleryPhoto(values);

  const photoFile = formData.get("photo");
  const file = photoFile instanceof File && photoFile.size > 0 ? photoFile : null;
  const photoError = validateGalleryPhotoFile(file, false);
  if (photoError) errors.photo = photoError;

  if (Object.keys(errors).length > 0) {
    return { success: false, errors };
  }

  let photoPath = existingPhotoPath;
  if (file) {
    const newPath = `${crypto.randomUUID()}-${sanitizeFileName(file.name)}`;
    const { error: uploadError } = await supabase.storage.from(BUCKET).upload(newPath, file, {
      contentType: file.type,
      upsert: false,
    });
    if (uploadError) {
      return { success: false, message: `Photo upload failed: ${uploadError.message}` };
    }
    photoPath = newPath;
  }

  const { error: updateError } = await supabase
    .from("gallery_photos")
    .update({
      title: values.title.trim(),
      category: values.category,
      academic_year: values.academicYear.trim() || null,
      campus: values.campus.trim() || null,
      description: values.description.trim() || null,
      photo_path: photoPath,
      display_order: values.displayOrder.trim() ? Number(values.displayOrder.trim()) : 0,
      is_published: values.isPublished,
    })
    .eq("id", id);

  if (updateError) {
    if (file && photoPath !== existingPhotoPath) {
      await supabase.storage.from(BUCKET).remove([photoPath]);
    }
    return { success: false, message: `Could not save changes: ${updateError.message}` };
  }

  if (file && existingPhotoPath !== photoPath) {
    await supabase.storage.from(BUCKET).remove([existingPhotoPath]);
  }

  revalidatePath("/admin/dashboard/gallery");
  redirect("/admin/dashboard/gallery");
}

export async function deleteGalleryPhotoAction(
  id: string,
  photoPath: string,
): Promise<{ success: boolean; message?: string }> {
  let supabase;
  try {
    supabase = await requireAdmin();
  } catch {
    return { success: false, message: "You must be signed in to do that." };
  }

  const { error } = await supabase.from("gallery_photos").delete().eq("id", id);

  if (error) {
    return { success: false, message: `Could not delete gallery photo: ${error.message}` };
  }

  if (photoPath) {
    await supabase.storage.from(BUCKET).remove([photoPath]);
  }

  revalidatePath("/admin/dashboard/gallery");
  return { success: true };
}
