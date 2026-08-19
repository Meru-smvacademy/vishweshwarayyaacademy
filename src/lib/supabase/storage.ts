const FACULTY_BUCKET = "faculty-photos";
const GALLERY_BUCKET = "gallery-photos";
const INFRASTRUCTURE_BUCKET = "infrastructure-photos";

export function getFacultyPhotoUrl(photoPath: string | null): string | null {
  if (!photoPath) return null;
  const base = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!base) return null;
  return `${base}/storage/v1/object/public/${FACULTY_BUCKET}/${photoPath}`;
}

export function getGalleryPhotoUrl(photoPath: string | null): string | null {
  if (!photoPath) return null;
  const base = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!base) return null;
  return `${base}/storage/v1/object/public/${GALLERY_BUCKET}/${photoPath}`;
}

export function getInfrastructurePhotoUrl(photoPath: string | null): string | null {
  if (!photoPath) return null;
  const base = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!base) return null;
  return `${base}/storage/v1/object/public/${INFRASTRUCTURE_BUCKET}/${photoPath}`;
}
