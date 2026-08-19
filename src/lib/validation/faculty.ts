export const FACULTY_CAMPUSES = ["Lingasuguru", "Sindhanur"] as const;

export type FacultyFormValues = {
  name: string;
  designation: string;
  subject: string;
  qualification: string;
  experience: string;
  bio: string;
  campus: string;
  displayOrder: string;
  isPublished: boolean;
};

export type FacultyFieldErrors = Partial<Record<"name" | "designation" | "displayOrder" | "photo" | "campus", string>>;

export const MAX_PHOTO_BYTES = 4 * 1024 * 1024; // 4 MB

export const ALLOWED_PHOTO_TYPES = ["image/jpeg", "image/png", "image/webp"];

// campusRequired is false when editing a pre-existing record: legacy rows
// created before the campus field existed may still have campus = null, and
// opening/saving that record again must not be blocked just because the
// field hasn't been backfilled yet. It's true for new records, where campus
// must be chosen up front.
export function validateFaculty(values: FacultyFormValues, campusRequired: boolean): FacultyFieldErrors {
  const errors: FacultyFieldErrors = {};

  if (values.name.trim().length < 2) {
    errors.name = "Enter the faculty member's full name.";
  }

  if (values.designation.trim().length < 2) {
    errors.designation = "Enter a designation.";
  }

  if (values.displayOrder.trim().length > 0 && !/^-?\d+$/.test(values.displayOrder.trim())) {
    errors.displayOrder = "Display order must be a whole number.";
  }

  const campus = values.campus.trim();
  if (campusRequired && !campus) {
    errors.campus = "Select the campus.";
  } else if (campus && !FACULTY_CAMPUSES.includes(campus as (typeof FACULTY_CAMPUSES)[number])) {
    errors.campus = "Select a valid campus.";
  }

  return errors;
}

export function validatePhotoFile(file: File | null, required: boolean): string | undefined {
  if (!file || file.size === 0) {
    return required ? "Upload a photograph." : undefined;
  }

  if (!ALLOWED_PHOTO_TYPES.includes(file.type)) {
    return "Photo must be a JPG, PNG, or WebP image.";
  }

  if (file.size > MAX_PHOTO_BYTES) {
    return "Photo must be smaller than 4 MB.";
  }

  return undefined;
}
