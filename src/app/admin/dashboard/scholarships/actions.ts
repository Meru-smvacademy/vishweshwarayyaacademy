"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { isValidScholarshipStatus } from "@/lib/validation/scholarshipAdmin";

export type ScholarshipActionState = {
  success: boolean;
  message?: string;
};

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

export async function updateScholarshipApplicationAction(
  id: string,
  _prevState: ScholarshipActionState,
  formData: FormData,
): Promise<ScholarshipActionState> {
  let supabase;
  try {
    supabase = await requireAdmin();
  } catch {
    return { success: false, message: "You must be signed in to do that." };
  }

  const status = String(formData.get("status") ?? "");
  const adminNotes = String(formData.get("adminNotes") ?? "");

  if (!isValidScholarshipStatus(status)) {
    return { success: false, message: "Select a valid status." };
  }

  const { error } = await supabase
    .from("scholarship_applications")
    .update({
      status,
      admin_notes: adminNotes.trim() || null,
    })
    .eq("id", id);

  if (error) {
    return { success: false, message: `Could not save changes: ${error.message}` };
  }

  revalidatePath("/admin/dashboard/scholarships");
  revalidatePath(`/admin/dashboard/scholarships/${id}`);
  return { success: true };
}

export async function deleteScholarshipApplicationAction(id: string): Promise<ScholarshipActionState> {
  let supabase;
  try {
    supabase = await requireAdmin();
  } catch {
    return { success: false, message: "You must be signed in to do that." };
  }

  const { error } = await supabase.from("scholarship_applications").delete().eq("id", id);

  if (error) {
    return { success: false, message: `Could not delete application: ${error.message}` };
  }

  revalidatePath("/admin/dashboard/scholarships");
  return { success: true };
}
