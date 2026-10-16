import { SPORTS_DOCUMENT_MAX_BYTES } from "@/lib/sports/constants";

export type ValidatedDocument = {
  contentType: "image/jpeg" | "image/png" | "application/pdf";
  extension: "jpg" | "png" | "pdf";
};
export type DocumentValidationResult = { ok: true; document: ValidatedDocument } | { ok: false; error: string };

export const DOCUMENT_ERRORS = {
  type: "The certificate must be a JPG, PNG or PDF file.",
  size: "The certificate must be 2 MB or smaller.",
} as const;

/**
 * Optional certificate upload, judged by its bytes rather than the
 * browser-supplied name or MIME type: it must start like a PDF, PNG or JPEG.
 */
export function validateDocumentBytes(bytes: Uint8Array): DocumentValidationResult {
  if (bytes.byteLength > SPORTS_DOCUMENT_MAX_BYTES) return { ok: false, error: DOCUMENT_ERRORS.size };
  const startsWith = (...signature: number[]) => signature.every((b, i) => bytes[i] === b);
  if (startsWith(0x25, 0x50, 0x44, 0x46, 0x2d)) {
    return { ok: true, document: { contentType: "application/pdf", extension: "pdf" } };
  }
  if (startsWith(0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a)) {
    return { ok: true, document: { contentType: "image/png", extension: "png" } };
  }
  if (startsWith(0xff, 0xd8, 0xff)) {
    return { ok: true, document: { contentType: "image/jpeg", extension: "jpg" } };
  }
  return { ok: false, error: DOCUMENT_ERRORS.type };
}
