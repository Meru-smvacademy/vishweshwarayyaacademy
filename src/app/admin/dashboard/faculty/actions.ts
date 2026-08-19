"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import {
  validateFaculty,
  validatePhotoFile,
  type FacultyFieldErrors,
  type FacultyFormValues,
} from "@/lib/validation/faculty";

const BUCKET = "faculty-photos";

export type FacultyActionState = {
  success: boolean;
  message?: string;
  errors?: FacultyFieldErrors;
};

function readValues(formData: FormData): FacultyFormValues {
  return {
    name: String(formData.get("name") ?? ""),
    designation: String(formData.get("designation") ?? ""),
    subject: String(formData.get("subject") ?? ""),
    qualification: String(formData.get("qualification") ?? ""),
    experience: String(formData.get("experience") ?? ""),
    bio: String(formData.get("bio") ?? ""),
    campus: String(formData.get("campus") ?? ""),
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

export async function createFacultyAction(
  _prevState: FacultyActionState,
  formData: FormData,
): Promise<FacultyActionState> {
  let supabase;
  try {
    supabase = await requireAdmin();
  } catch {
    return { success: false, message: "You must be signed in to do that." };
  }

  const values = readValues(formData);
  const errors = validateFaculty(values, true);

  const photoFile = formData.get("photo");
  const file = photoFile instanceof File && photoFile.size > 0 ? photoFile : null;
  const photoError = validatePhotoFile(file, true);
  if (photoError) errors.photo = photoError;

  if (Object.keys(errors).length > 0) {
    return { success: false, errors };
  }

  let photoPath: string | null = null;
  if (file) {
    photoPath = `${crypto.randomUUID()}-${sanitizeFileName(file.name)}`;
    const { error: uploadError } = await supabase.storage.from(BUCKET).upload(photoPath, file, {
      contentType: file.type,
      upsert: false,
    });
    if (uploadError) {
      return { success: false, message: `Photo upload failed: ${uploadError.message}` };
    }
  }

  const { error: insertError } = await supabase.from("faculty").insert({
    name: values.name.trim(),
    designation: values.designation.trim(),
    subject: values.subject.trim() || null,
    qualification: values.qualification.trim() || null,
    experience: values.experience.trim() || null,
    bio: values.bio.trim() || null,
    photo_path: photoPath,
    campus: values.campus.trim() || null,
    display_order: values.displayOrder.trim() ? Number(values.displayOrder.trim()) : 0,
    is_published: values.isPublished,
  });

  if (insertError) {
    if (photoPath) {
      await supabase.storage.from(BUCKET).remove([photoPath]);
    }
    return { success: false, message: `Could not save faculty member: ${insertError.message}` };
  }

  revalidatePath("/admin/dashboard/faculty");
  redirect("/admin/dashboard/faculty");
}

export async function updateFacultyAction(
  id: string,
  existingPhotoPath: string | null,
  _prevState: FacultyActionState,
  formData: FormData,
): Promise<FacultyActionState> {
  let supabase;
  try {
    supabase = await requireAdmin();
  } catch {
    return { success: false, message: "You must be signed in to do that." };
  }

  const values = readValues(formData);
  const errors = validateFaculty(values, false);

  const photoFile = formData.get("photo");
  const file = photoFile instanceof File && photoFile.size > 0 ? photoFile : null;
  const photoError = validatePhotoFile(file, false);
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
    .from("faculty")
    .update({
      name: values.name.trim(),
      designation: values.designation.trim(),
      subject: values.subject.trim() || null,
      qualification: values.qualification.trim() || null,
      experience: values.experience.trim() || null,
      bio: values.bio.trim() || null,
      photo_path: photoPath,
      campus: values.campus.trim() || null,
      display_order: values.displayOrder.trim() ? Number(values.displayOrder.trim()) : 0,
      is_published: values.isPublished,
    })
    .eq("id", id);

  if (updateError) {
    if (file && photoPath && photoPath !== existingPhotoPath) {
      await supabase.storage.from(BUCKET).remove([photoPath]);
    }
    return { success: false, message: `Could not save changes: ${updateError.message}` };
  }

  if (file && existingPhotoPath && existingPhotoPath !== photoPath) {
    await supabase.storage.from(BUCKET).remove([existingPhotoPath]);
  }

  revalidatePath("/admin/dashboard/faculty");
  redirect("/admin/dashboard/faculty");
}

export async function deleteFacultyAction(
  id: string,
  photoPath: string | null,
): Promise<{ success: boolean; message?: string }> {
  let supabase;
  try {
    supabase = await requireAdmin();
  } catch {
    return { success: false, message: "You must be signed in to do that." };
  }

  const { error } = await supabase.from("faculty").delete().eq("id", id);

  if (error) {
    return { success: false, message: `Could not delete faculty member: ${error.message}` };
  }

  if (photoPath) {
    await supabase.storage.from(BUCKET).remove([photoPath]);
  }

  revalidatePath("/admin/dashboard/faculty");
  return { success: true };
}
