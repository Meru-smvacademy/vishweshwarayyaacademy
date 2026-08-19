"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { isValidEnquiryStatus } from "@/lib/validation/enquiryAdmin";

export type EnquiryActionState = {
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

export async function updateEnquiryAction(
  id: string,
  _prevState: EnquiryActionState,
  formData: FormData,
): Promise<EnquiryActionState> {
  let supabase;
  try {
    supabase = await requireAdmin();
  } catch {
    return { success: false, message: "You must be signed in to do that." };
  }

  const status = String(formData.get("status") ?? "");
  const adminNotes = String(formData.get("adminNotes") ?? "");

  if (!isValidEnquiryStatus(status)) {
    return { success: false, message: "Select a valid status." };
  }

  const { error } = await supabase
    .from("enquiries")
    .update({
      status,
      admin_notes: adminNotes.trim() || null,
    })
    .eq("id", id);

  if (error) {
    return { success: false, message: `Could not save changes: ${error.message}` };
  }

  revalidatePath("/admin/dashboard/enquiries");
  revalidatePath(`/admin/dashboard/enquiries/${id}`);
  return { success: true };
}

export async function deleteEnquiryAction(id: string): Promise<EnquiryActionState> {
  let supabase;
  try {
    supabase = await requireAdmin();
  } catch {
    return { success: false, message: "You must be signed in to do that." };
  }

  const { error } = await supabase.from("enquiries").delete().eq("id", id);

  if (error) {
    return { success: false, message: `Could not delete enquiry: ${error.message}` };
  }

  revalidatePath("/admin/dashboard/enquiries");
  return { success: true };
}
