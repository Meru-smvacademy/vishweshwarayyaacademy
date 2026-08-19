export const INFRASTRUCTURE_CATEGORIES = [
  "Campus",
  "Smart Classrooms",
  "Science Laboratories",
  "Digital Learning",
  "Library",
  "Study Environment",
] as const;

export const INFRASTRUCTURE_CAMPUSES = ["Lingasuguru", "Sindhanur"] as const;

export type InfrastructureFormValues = {
  title: string;
  category: string;
  campus: string;
  description: string;
  displayOrder: string;
  isPublished: boolean;
};

export type InfrastructureFieldErrors = Partial<Record<"title" | "category" | "campus" | "displayOrder" | "photos", string>>;

export const MAX_PHOTO_BYTES = 4 * 1024 * 1024; // 4 MB

export const ALLOWED_PHOTO_TYPES = ["image/jpeg", "image/png", "image/webp"];

export function validateInfrastructureItem(values: InfrastructureFormValues): InfrastructureFieldErrors {
  const errors: InfrastructureFieldErrors = {};

  if (values.title.trim().length < 2) {
    errors.title = "Enter a title for this infrastructure item.";
  }

  if (!INFRASTRUCTURE_CATEGORIES.includes(values.category as (typeof INFRASTRUCTURE_CATEGORIES)[number])) {
    errors.category = "Select a valid category.";
  }

  if (
    values.campus.trim().length > 0 &&
    !INFRASTRUCTURE_CAMPUSES.includes(values.campus as (typeof INFRASTRUCTURE_CAMPUSES)[number])
  ) {
    errors.campus = "Select a valid campus.";
  }

  if (values.displayOrder.trim().length > 0 && !/^-?\d+$/.test(values.displayOrder.trim())) {
    errors.displayOrder = "Display order must be a whole number.";
  }

  return errors;
}

export function validatePhotoFile(file: File): string | undefined {
  if (!ALLOWED_PHOTO_TYPES.includes(file.type)) {
    return `"${file.name}" must be a JPG, PNG, or WebP image.`;
  }

  if (file.size > MAX_PHOTO_BYTES) {
    return `"${file.name}" must be smaller than 4 MB.`;
  }

  return undefined;
}

export function validatePhotoFiles(files: File[]): string | undefined {
  for (const file of files) {
    const error = validatePhotoFile(file);
    if (error) return error;
  }
  return undefined;
}
