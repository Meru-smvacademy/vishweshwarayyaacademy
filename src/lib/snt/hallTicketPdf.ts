import "server-only";
import { readFile } from "node:fs/promises";
import path from "node:path";
import fontkit from "@pdf-lib/fontkit";
import regeneratorRuntime from "regenerator-runtime";
import { PDFDocument, rgb, type PDFFont, type PDFImage, type PDFPage, type RGB } from "pdf-lib";
import { SNT_EXAM, findSntExamCentre } from "@/content/scholarship";
import { formatSntExamDate, formatSntReportingTime } from "@/lib/snt/examSchedule";
import { isHallTicketNumber } from "@/lib/snt/hallTicketNumber";
import { SNT_KN } from "@/content/scholarship-kn";
import { SCHOLARSHIP_RULES, SCHOLARSHIP_RULES_FOOTNOTE, SCHOLARSHIP_RULES_TITLE } from "@/content/scholarship-rules";
import type { SntRegistration } from "@/lib/supabase/types";

// @pdf-lib/fontkit's Indic shaper (needed for Kannada conjuncts) was compiled
// expecting this global; without it, drawing Kannada text throws.
(globalThis as { regeneratorRuntime?: unknown }).regeneratorRuntime ??= regeneratorRuntime;

const A4: [number, number] = [595.28, 841.89];
const MARGIN = 40;
const CONTENT_WIDTH = A4[0] - MARGIN * 2;

function hex(value: string): RGB {
  const n = parseInt(value.slice(1), 16);
  return rgb(((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255);
}

// Same palette as the public application form.
const NAVY = hex("#0F1E3C");
const GOLD = hex("#C4922A");
const MUTED = hex("#6B7A90");
const RULE = hex("#DDD6CC");
const CREAM = hex("#F9F6F0");
const NOTICE_BG = hex("#FFF8E8");
const PAID_GREEN = hex("#1E7A46");
const PAID_BG = hex("#EEF7F1");
const WHITE = rgb(1, 1, 1);

type Fonts = { regular: PDFFont; bold: PDFFont; display: PDFFont; kannada: PDFFont; kannadaBold: PDFFont };

const FONT_DIR = path.join(process.cwd(), "src", "assets", "fonts");
let fontBytesCache: Promise<Buffer[]> | null = null;

function loadFontBytes() {
  fontBytesCache ??= Promise.all([
    readFile(path.join(FONT_DIR, "NotoSans-Regular.ttf")),
    readFile(path.join(FONT_DIR, "NotoSans-Bold.ttf")),
    readFile(path.join(FONT_DIR, "NotoSerif-Bold.ttf")),
    readFile(path.join(FONT_DIR, "NotoSansKannada-Regular.ttf")),
    readFile(path.join(FONT_DIR, "NotoSansKannada-Bold.ttf")),
  ]);
  return fontBytesCache;
}

async function createDocument(title: string): Promise<{ doc: PDFDocument; fonts: Fonts }> {
  const doc = await PDFDocument.create();
  doc.registerFontkit(fontkit);
  const [regular, bold, display, kannada, kannadaBold] = await loadFontBytes();
  // Subset embedding is required for Kannada: it keeps fontkit's shaped glyphs
  // (conjuncts, vowel signs) and their advances together.
  const fonts = {
    regular: await doc.embedFont(regular, { subset: true }),
    bold: await doc.embedFont(bold, { subset: true }),
    display: await doc.embedFont(display, { subset: true }),
    kannada: await doc.embedFont(kannada, { subset: true }),
    kannadaBold: await doc.embedFont(kannadaBold, { subset: true }),
  };
  doc.setTitle(title);
  doc.setAuthor(SNT_EXAM.academyName);
  doc.setCreator(SNT_EXAM.academyName);
  return { doc, fonts };
}

function wrapText(text: string, font: PDFFont, size: number, maxWidth: number): string[] {
  const lines: string[] = [];
  for (const paragraph of text.split("\n")) {
    let line = "";
    for (const word of paragraph.split(/\s+/).filter(Boolean)) {
      const candidate = line ? `${line} ${word}` : word;
      if (font.widthOfTextAtSize(candidate, size) <= maxWidth) {
        line = candidate;
        continue;
      }
      if (line) lines.push(line);
      // Hard-break a single word that is wider than the line (e.g. a long ID).
      let rest = word;
      while (font.widthOfTextAtSize(rest, size) > maxWidth) {
        let cut = rest.length - 1;
        while (cut > 1 && font.widthOfTextAtSize(rest.slice(0, cut), size) > maxWidth) cut--;
        lines.push(rest.slice(0, cut));
        rest = rest.slice(cut);
      }
      line = rest;
    }
    lines.push(line);
  }
  return lines;
}

function drawCentered(page: PDFPage, text: string, font: PDFFont, size: number, y: number, color: RGB) {
  const width = font.widthOfTextAtSize(text, size);
  page.drawText(text, { x: (A4[0] - width) / 2, y, size, font, color });
}

function drawHeader(page: PDFPage, fonts: Fonts, subtitle: string): number {
  const bandHeight = 92;
  const top = A4[1];
  page.drawRectangle({ x: 0, y: top - bandHeight, width: A4[0], height: bandHeight, color: NAVY });
  page.drawRectangle({ x: 0, y: top - bandHeight - 3, width: A4[0], height: 3, color: GOLD });
  drawCentered(page, SNT_EXAM.name, fonts.display, 22, top - 36, WHITE);
  drawCentered(page, SNT_EXAM.academyName, fonts.bold, 11, top - 56, GOLD);
  drawCentered(page, SNT_EXAM.campusNames, fonts.regular, 9.5, top - 71, WHITE);
  drawCentered(page, subtitle, fonts.regular, 8, top - 85, hex("#C9D2E0"));
  return top - bandHeight - 3;
}

function formatDob(iso: string): string {
  const [year, month, day] = iso.split("-").map(Number);
  return new Date(Date.UTC(year, month - 1, day)).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

function formatIst(iso: string): string {
  return new Date(iso).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    timeZone: "Asia/Kolkata",
  });
}

function drawPhoto(page: PDFPage, image: PDFImage, fonts: Fonts, x: number, yTop: number) {
  const frameWidth = 112;
  const frameHeight = 144;
  const pad = 4;
  page.drawRectangle({
    x,
    y: yTop - frameHeight,
    width: frameWidth,
    height: frameHeight,
    borderColor: NAVY,
    borderWidth: 1.5,
    color: WHITE,
  });
  const scale = Math.min((frameWidth - pad * 2) / image.width, (frameHeight - pad * 2) / image.height);
  const width = image.width * scale;
  const height = image.height * scale;
  page.drawImage(image, {
    x: x + (frameWidth - width) / 2,
    y: yTop - frameHeight + (frameHeight - height) / 2,
    width,
    height,
  });
  const caption = "Student Photograph";
  page.drawText(caption, {
    x: x + (frameWidth - fonts.regular.widthOfTextAtSize(caption, 7)) / 2,
    y: yTop - frameHeight - 10,
    size: 7,
    font: fonts.regular,
    color: MUTED,
  });
  return frameHeight + 12;
}

type Row = { label: string; value: string };

function drawDetailRows(page: PDFPage, fonts: Fonts, rows: Row[], x: number, yTop: number, width: number) {
  const labelWidth = 128;
  const size = 9.5;
  const lineHeight = 12.5;
  let y = yTop;
  rows.forEach((row, index) => {
    const lines = wrapText(row.value || "—", fonts.bold, size, width - labelWidth - 12);
    const height = Math.max(1, lines.length) * lineHeight + 6;
    if (index % 2 === 0) {
      page.drawRectangle({ x, y: y - height, width, height, color: CREAM });
    }
    page.drawText(row.label.toUpperCase(), { x: x + 6, y: y - 13, size: 7.5, font: fonts.regular, color: MUTED });
    lines.forEach((line, i) => {
      page.drawText(line, { x: x + labelWidth, y: y - 13 - i * lineHeight, size, font: fonts.bold, color: NAVY });
    });
    y -= height;
  });
  page.drawRectangle({ x, y, width, height: yTop - y, borderColor: RULE, borderWidth: 0.75 });
  return yTop - y;
}

/**
 * The hall ticket number in a bordered box, one digit per equal-width cell, so
 * it can be copied digit by digit into the OMR sheet's bubbles.
 */
function drawHallTicketNumber(page: PDFPage, fonts: Fonts, number: string, x: number, yTop: number, width: number) {
  const height = 84;
  const pad = 12;
  page.drawRectangle({ x, y: yTop - height, width, height, color: CREAM, borderColor: NAVY, borderWidth: 1.5 });

  const english = "HALL TICKET NUMBER / ";
  page.drawText(english, { x: x + pad, y: yTop - 17, size: 8.5, font: fonts.bold, color: GOLD });
  page.drawText(SNT_KN.hallTicketNumber, {
    x: x + pad + fonts.bold.widthOfTextAtSize(english, 8.5),
    y: yTop - 17,
    size: 9,
    font: fonts.kannadaBold,
    color: GOLD,
  });

  const digits = [...number];
  const gap = 4;
  const cellWidth = (width - pad * 2 - gap * (digits.length - 1)) / Math.max(digits.length, 1);
  const cellHeight = 44;
  const cellTop = yTop - 28;
  const size = 24;
  digits.forEach((digit, i) => {
    const cellX = x + pad + i * (cellWidth + gap);
    page.drawRectangle({ x: cellX, y: cellTop - cellHeight, width: cellWidth, height: cellHeight, color: WHITE, borderColor: NAVY, borderWidth: 1 });
    const digitWidth = fonts.bold.widthOfTextAtSize(digit, size);
    page.drawText(digit, { x: cellX + (cellWidth - digitWidth) / 2, y: cellTop - cellHeight / 2 - size * 0.36, size, font: fonts.bold, color: NAVY });
  });
}

function drawFront(page: PDFPage, fonts: Fonts, registration: SntRegistration, photo: PDFImage) {
  let y = drawHeader(page, fonts, `HALL TICKET  ·  ACADEMIC YEAR ${registration.academic_year}`) - 18;

  const photoX = A4[0] - MARGIN - 112;
  drawPhoto(page, photo, fonts, photoX, y);

  const boxWidth = photoX - MARGIN - 16;
  drawHallTicketNumber(page, fonts, registration.hall_ticket_no ?? "", MARGIN, y, boxWidth);

  const centre = findSntExamCentre(registration.centre);
  const examRows: Row[] = [
    { label: "Exam Date", value: formatSntExamDate(SNT_EXAM) },
    { label: "Reporting Time", value: formatSntReportingTime(SNT_EXAM) },
  ];
  drawDetailRows(page, fonts, examRows, MARGIN, y - 92, boxWidth);

  y -= 168;

  const rows: Row[] = [
    { label: "Student Name", value: registration.student_name },
    { label: "Parent / Guardian", value: registration.parent_name },
    { label: "Date of Birth", value: formatDob(registration.dob) },
    { label: "Applying For", value: registration.applying_for },
    { label: "Education Completed", value: registration.education_completed },
    { label: "Medium of Studying", value: registration.medium },
    { label: "School / College", value: registration.school_name },
    { label: "Native Place", value: registration.native_place },
    { label: "Phone", value: `+91 ${registration.phone}` },
    { label: "Academic Year", value: registration.academic_year },
    { label: "Exam Centre", value: centre?.name ?? registration.centre },
    { label: "Centre Address", value: centre?.addressLines.join("\n") ?? "" },
    { label: "Exam Duration", value: SNT_EXAM.duration },
  ];
  y -= drawDetailRows(page, fonts, rows, MARGIN, y, CONTENT_WIDTH) + 12;

  // Payment block.
  const paymentHeight = 42;
  page.drawRectangle({ x: MARGIN, y: y - paymentHeight, width: CONTENT_WIDTH, height: paymentHeight, color: PAID_BG, borderColor: PAID_GREEN, borderWidth: 1 });
  page.drawText(`FEES PAID — ₹${SNT_EXAM.feeRupees}`, { x: MARGIN + 12, y: y - 26, size: 13, font: fonts.bold, color: PAID_GREEN });
  const paymentLines = [
    `Payment ID: ${registration.payment_id ?? ""}`,
    `Payment Date: ${registration.paid_at ? formatIst(registration.paid_at) : ""}`,
  ];
  paymentLines.forEach((line, i) => {
    const width = fonts.regular.widthOfTextAtSize(line, 8.5);
    page.drawText(line, { x: A4[0] - MARGIN - 12 - width, y: y - 17 - i * 13, size: 8.5, font: fonts.regular, color: NAVY });
  });
  y -= paymentHeight + 12;

  // Notice box.
  const noticeLines = wrapText(SNT_EXAM.documentsNotice, fonts.bold, 9, CONTENT_WIDTH - 24);
  const noticeHeight = 26 + noticeLines.length * 12.5;
  page.drawRectangle({ x: MARGIN, y: y - noticeHeight, width: CONTENT_WIDTH, height: noticeHeight, color: NOTICE_BG, borderColor: GOLD, borderWidth: 2 });
  page.drawText("NOTICE", { x: MARGIN + 12, y: y - 16, size: 10, font: fonts.display, color: GOLD });
  noticeLines.forEach((line, i) => {
    page.drawText(line, { x: MARGIN + 12, y: y - 31 - i * 12.5, size: 9, font: fonts.bold, color: NAVY });
  });

  // Signatures sit on a fixed baseline near the bottom of the page.
  const signatureY = 78;
  const signatureWidth = 190;
  for (const [x, label] of [
    [MARGIN, "Student Signature"],
    [A4[0] - MARGIN - signatureWidth, "Invigilator Signature"],
  ] as const) {
    page.drawLine({ start: { x, y: signatureY }, end: { x: x + signatureWidth, y: signatureY }, thickness: 0.8, color: NAVY });
    page.drawText(label, { x, y: signatureY - 13, size: 8.5, font: fonts.regular, color: MUTED });
  }

  drawCentered(page, "Rules and regulations are printed overleaf. Please read them before the exam.", fonts.regular, 7.5, 34, MUTED);
}

function drawRules(doc: PDFDocument, fonts: Fonts) {
  let page = doc.addPage(A4);
  let y = drawHeader(page, fonts, SCHOLARSHIP_RULES_TITLE.toUpperCase()) - 34;
  page.drawText(SCHOLARSHIP_RULES_TITLE, { x: MARGIN, y, size: 17, font: fonts.display, color: NAVY });
  page.drawRectangle({ x: MARGIN, y: y - 9, width: 36, height: 2, color: GOLD });
  y -= 32;

  const size = 10;
  const lineHeight = 14.5;
  const indent = 24;
  SCHOLARSHIP_RULES.forEach((rule, index) => {
    const lines = wrapText(rule, fonts.regular, size, CONTENT_WIDTH - indent);
    if (y - lines.length * lineHeight < 70) {
      page = doc.addPage(A4);
      y = A4[1] - MARGIN - 10;
    }
    page.drawText(`${index + 1}.`, { x: MARGIN, y, size, font: fonts.bold, color: GOLD });
    lines.forEach((line, i) => {
      page.drawText(line, { x: MARGIN + indent, y: y - i * lineHeight, size, font: fonts.regular, color: NAVY });
    });
    y -= lines.length * lineHeight + 8;
  });

  if (SCHOLARSHIP_RULES_FOOTNOTE) {
    y -= 6;
    for (const line of wrapText(SCHOLARSHIP_RULES_FOOTNOTE, fonts.regular, 8.5, CONTENT_WIDTH)) {
      page.drawText(line, { x: MARGIN, y, size: 8.5, font: fonts.regular, color: MUTED });
      y -= 12;
    }
  }
}

async function embedPhoto(doc: PDFDocument, bytes: Uint8Array): Promise<PDFImage> {
  const isPng = bytes[0] === 0x89 && bytes[1] === 0x50;
  return isPng ? doc.embedPng(bytes) : doc.embedJpg(bytes);
}

export async function renderHallTicketPdf(registration: SntRegistration, photoBytes: Uint8Array): Promise<Uint8Array> {
  if (registration.status !== "paid" || !registration.hall_ticket_no) {
    throw new Error("Hall tickets can only be rendered for paid registrations.");
  }
  if (!isHallTicketNumber(registration.hall_ticket_no)) {
    throw new Error(`Hall ticket number ${registration.hall_ticket_no} is not 10 digits.`);
  }
  const { doc, fonts } = await createDocument(`SNT Hall Ticket ${registration.hall_ticket_no}`);
  const photo = await embedPhoto(doc, photoBytes);
  drawFront(doc.addPage(A4), fonts, registration, photo);
  drawRules(doc, fonts);
  return doc.save();
}

export async function renderRulesPdf(): Promise<Uint8Array> {
  const { doc, fonts } = await createDocument(`${SNT_EXAM.name} — ${SCHOLARSHIP_RULES_TITLE}`);
  drawRules(doc, fonts);
  return doc.save();
}
