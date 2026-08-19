export const GALLERY_CATEGORIES = [
  "Campus",
  "Classroom",
  "Laboratory",
  "Events",
  "Achievements",
  "Students",
  "Faculty",
  "Hostel",
  "Sports",
  "Other",
] as const;

export const GALLERY_CAMPUSES = ["Lingasuguru", "Sindhanur"] as const;

export type GalleryFormValues = {
  title: string;
  category: string;
  academicYear: string;
  campus: string;
  description: string;
  displayOrder: string;
  isPublished: boolean;
};

export type GalleryFieldErrors = Partial<Record<"title" | "category" | "campus" | "displayOrder" | "photo", string>>;

export const MAX_PHOTO_BYTES = 4 * 1024 * 1024; // 4 MB

export const ALLOWED_PHOTO_TYPES = ["image/jpeg", "image/png", "image/webp"];

export function validateGalleryPhoto(values: GalleryFormValues): GalleryFieldErrors {
  const errors: GalleryFieldErrors = {};

  if (values.title.trim().length < 2) {
    errors.title = "Enter a title for this photo.";
  }

  if (!GALLERY_CATEGORIES.includes(values.category as (typeof GALLERY_CATEGORIES)[number])) {
    errors.category = "Select a valid category.";
  }

  if (values.campus.trim().length > 0 && !GALLERY_CAMPUSES.includes(values.campus as (typeof GALLERY_CAMPUSES)[number])) {
    errors.campus = "Select a valid campus.";
  }

  if (values.displayOrder.trim().length > 0 && !/^-?\d+$/.test(values.displayOrder.trim())) {
    errors.displayOrder = "Display order must be a whole number.";
  }

  return errors;
}

export function validateGalleryPhotoFile(file: File | null, required: boolean): string | undefined {
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
