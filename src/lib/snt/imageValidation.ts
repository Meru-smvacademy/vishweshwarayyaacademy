import {
  SNT_PHOTO_MAX_BYTES,
  SNT_PHOTO_MAX_HEIGHT,
  SNT_PHOTO_MAX_WIDTH,
  SNT_PHOTO_MIN_SIDE,
} from "@/lib/snt/constants";

export type ValidatedPhoto = {
  contentType: "image/jpeg" | "image/png";
  extension: "jpg" | "png";
  width: number;
  height: number;
};

export type PhotoValidationResult = { ok: true; photo: ValidatedPhoto } | { ok: false; error: string };

const PNG_SIGNATURE = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];

function readPngSize(bytes: Uint8Array): { width: number; height: number } | null {
  if (bytes.length < 24 || !PNG_SIGNATURE.every((b, i) => bytes[i] === b)) return null;
  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  // IHDR must be the first chunk.
  if (String.fromCharCode(...bytes.slice(12, 16)) !== "IHDR") return null;
  return { width: view.getUint32(16), height: view.getUint32(20) };
}

function readJpegSize(bytes: Uint8Array): { width: number; height: number } | null {
  if (bytes.length < 4 || bytes[0] !== 0xff || bytes[1] !== 0xd8) return null;
  let offset = 2;
  while (offset + 9 < bytes.length) {
    if (bytes[offset] !== 0xff) return null;
    const marker = bytes[offset + 1];
    if (marker === 0xff) {
      offset += 1;
      continue;
    }
    const length = (bytes[offset + 2] << 8) | bytes[offset + 3];
    // SOF0–SOF15 carry the frame size, excluding DHT (C4), JPG (C8) and DAC (CC).
    if (marker >= 0xc0 && marker <= 0xcf && marker !== 0xc4 && marker !== 0xc8 && marker !== 0xcc) {
      const height = (bytes[offset + 5] << 8) | bytes[offset + 6];
      const width = (bytes[offset + 7] << 8) | bytes[offset + 8];
      return { width, height };
    }
    if (length < 2) return null;
    offset += 2 + length;
  }
  return null;
}

/**
 * Validates the uploaded photo from its bytes rather than trusting the
 * browser-supplied filename or MIME type: the file must parse as a JPEG or
 * PNG and its dimensions must match what the client-side resize produces.
 */
export function validatePhotoBytes(bytes: Uint8Array): PhotoValidationResult {
  if (bytes.byteLength === 0) {
    return { ok: false, error: "Upload the student's passport photo." };
  }
  if (bytes.byteLength > SNT_PHOTO_MAX_BYTES) {
    return { ok: false, error: "The photo must be 4 MB or smaller." };
  }

  const png = readPngSize(bytes);
  const jpeg = png ? null : readJpegSize(bytes);
  const size = png ?? jpeg;

  if (!size) {
    return { ok: false, error: "The photo must be a JPG or PNG image." };
  }
  if (size.width < SNT_PHOTO_MIN_SIDE || size.height < SNT_PHOTO_MIN_SIDE) {
    return { ok: false, error: "The photo is too small. Upload a clearer passport photo." };
  }
  if (size.width > SNT_PHOTO_MAX_WIDTH || size.height > SNT_PHOTO_MAX_HEIGHT) {
    return { ok: false, error: "The photo is larger than 600 × 800 pixels." };
  }

  return {
    ok: true,
    photo: png
      ? { contentType: "image/png", extension: "png", ...size }
      : { contentType: "image/jpeg", extension: "jpg", ...size },
  };
}
