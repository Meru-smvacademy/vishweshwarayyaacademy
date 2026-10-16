import "server-only";
import { type PDFDocument, type PDFImage, type PDFPage } from "pdf-lib";
import {
  SPORTS_MEET,
  SPORTS_RULES,
  WHAT_TO_BRING,
  WHAT_TO_BRING_ALSO,
  WHAT_TO_BRING_INTRO,
  WHAT_TO_BRING_TITLE,
} from "@/content/sports";
import { SPORTS_KN } from "@/content/scholarship-kn";
import {
  A4,
  CONTENT_WIDTH,
  GOLD,
  MARGIN,
  MUTED,
  NAVY,
  NOTICE_BG,
  PAID_BG,
  PAID_GREEN,
  createDocument,
  drawCentered,
  drawDetailRows,
  drawHallTicketNumber,
  drawHeader,
  drawPhoto,
  formatDob,
  formatIst,
  wrapText,
  type Fonts,
  type Row,
} from "@/lib/snt/hallTicketPdf";
import { isEntryCardNumber } from "@/lib/sports/rules";
import { sportsEventDate, sportsEventDetails } from "@/lib/sports/eventDetails";
import type { SportsRegistration } from "@/lib/supabase/types";

const FITNESS_LINE = "Declared at registration: medical fitness certificate from a GOVERNMENT doctor. Bring the original.";

function kn(option: string): string | undefined {
  return SPORTS_KN.options[option];
}

function drawFront(page: PDFPage, fonts: Fonts, registration: SportsRegistration, photo: PDFImage) {
  const date = sportsEventDate();
  let y = drawHeader(page, fonts, `ENTRY CARD  ·  ${date.en.toUpperCase()}`, SPORTS_MEET.name) - 18;

  const photoX = A4[0] - MARGIN - 112;
  drawPhoto(page, photo, fonts, photoX, y);

  const boxWidth = photoX - MARGIN - 16;
  drawHallTicketNumber(page, fonts, registration.entry_card_no ?? "", MARGIN, y, boxWidth, {
    english: "ENTRY CARD NUMBER / ",
    kannada: SPORTS_KN.entryCardNumber,
  });

  // Date, reporting time and start time beside the photo.
  const eventRows: Row[] = sportsEventDetails().filter((detail) => detail.label !== "Entry Fee");
  const eventHeight = drawDetailRows(page, fonts, eventRows, MARGIN, y - 92, boxWidth);
  y -= Math.max(168, 92 + eventHeight + 12);

  const rows: Row[] = [
    { label: "Student Name", value: registration.student_name },
    { label: "Date of Birth", value: formatDob(registration.dob) },
    { label: "School / College", value: registration.school_name },
    { label: "Phone", value: `+91 ${registration.phone}` },
    { label: "Sport", value: registration.sport, labelKn: SPORTS_KN.labels.sport, valueKn: kn(registration.sport) },
    ...(registration.athletics_event
      ? [
          {
            label: "Athletics Event",
            value: registration.athletics_event,
            labelKn: SPORTS_KN.labels.athleticsEvent,
            valueKn: kn(registration.athletics_event),
          },
        ]
      : []),
    {
      label: "Level Represented",
      value: registration.level_represented,
      labelKn: SPORTS_KN.labels.level,
      valueKn: kn(registration.level_represented),
    },
    { label: "Fitness Certificate", value: FITNESS_LINE, valueKn: SPORTS_KN.fitnessDeclaredLine },
    { label: "Venue", value: [SPORTS_MEET.venue.name, ...SPORTS_MEET.venue.addressLines].join("\n") },
  ];
  y -= drawDetailRows(page, fonts, rows, MARGIN, y, CONTENT_WIDTH) + 12;

  const paymentHeight = 42;
  page.drawRectangle({ x: MARGIN, y: y - paymentHeight, width: CONTENT_WIDTH, height: paymentHeight, color: PAID_BG, borderColor: PAID_GREEN, borderWidth: 1 });
  page.drawText(`FEES PAID — ₹${SPORTS_MEET.feeRupees}`, { x: MARGIN + 12, y: y - 26, size: 13, font: fonts.bold, color: PAID_GREEN });
  const paymentLines = [
    `Payment ID: ${registration.payment_id ?? ""}`,
    `Payment Date: ${registration.paid_at ? formatIst(registration.paid_at) : ""}`,
  ];
  paymentLines.forEach((line, i) => {
    const width = fonts.regular.widthOfTextAtSize(line, 8.5);
    page.drawText(line, { x: A4[0] - MARGIN - 12 - width, y: y - 17 - i * 13, size: 8.5, font: fonts.regular, color: NAVY });
  });

  const signatureY = 78;
  const signatureWidth = 190;
  for (const [x, label] of [
    [MARGIN, "Student Signature"],
    [A4[0] - MARGIN - signatureWidth, "Organiser Signature"],
  ] as const) {
    page.drawLine({ start: { x, y: signatureY }, end: { x: x + signatureWidth, y: signatureY }, thickness: 0.8, color: NAVY });
    page.drawText(label, { x, y: signatureY - 13, size: 8.5, font: fonts.regular, color: MUTED });
  }

  drawCentered(page, "WHAT TO BRING and the rules are printed overleaf. Entry is refused without the compulsory items.", fonts.bold, 7.5, 34, NAVY);
}

/** The bold boxed WHAT TO BRING block. Returns its height. */
function drawWhatToBring(page: PDFPage, fonts: Fonts, yTop: number): number {
  const pad = 14;
  const width = CONTENT_WIDTH - pad * 2;
  const blocks: { lines: string[]; font: typeof fonts.bold; size: number; lineHeight: number; gapAfter: number; numbered?: number }[] = [];
  const add = (text: string, font: typeof fonts.bold, size: number, lineHeight: number, gapAfter: number, indent = 0, numbered?: number) =>
    blocks.push({ lines: wrapText(text, font, size, width - indent), font, size, lineHeight, gapAfter, numbered });

  add(WHAT_TO_BRING_TITLE, fonts.display, 13, 16, 2);
  add(SPORTS_KN.whatToBringTitle, fonts.kannadaBold, 11, 15, 6);
  add(WHAT_TO_BRING_INTRO, fonts.bold, 9.5, 13, 0);
  add(SPORTS_KN.whatToBringIntro, fonts.kannada, 9, 13, 8);
  WHAT_TO_BRING.forEach((item, i) => {
    add(`${item.title} — ${item.detail}`, fonts.bold, 10, 13.5, 0, 18, i + 1);
    add(SPORTS_KN.whatToBring[i], fonts.kannadaBold, 9, 13, 7, 18);
  });
  add(WHAT_TO_BRING_ALSO, fonts.bold, 9.5, 13, 0);
  add(SPORTS_KN.whatToBringAlso, fonts.kannada, 9, 13, 0);

  const height = pad * 2 + blocks.reduce((sum, b) => sum + b.lines.length * b.lineHeight + b.gapAfter, 0);
  page.drawRectangle({ x: MARGIN, y: yTop - height, width: CONTENT_WIDTH, height, color: NOTICE_BG, borderColor: NAVY, borderWidth: 2.5 });

  let y = yTop - pad - 11;
  let indentNext = 0;
  for (const block of blocks) {
    const indent = block.numbered !== undefined || indentNext ? 18 : 0;
    if (block.numbered !== undefined) {
      page.drawText(`${block.numbered}.`, { x: MARGIN + pad, y, size: block.size, font: fonts.bold, color: GOLD });
    }
    block.lines.forEach((line) => {
      page.drawText(line, { x: MARGIN + pad + indent, y, size: block.size, font: block.font, color: NAVY });
      y -= block.lineHeight;
    });
    y -= block.gapAfter;
    // The Kannada line under a numbered item keeps the item's indent.
    indentNext = block.numbered !== undefined ? 1 : 0;
  }
  return height;
}

function drawBack(doc: PDFDocument, fonts: Fonts) {
  const page = doc.addPage(A4);
  let y = drawHeader(page, fonts, "WHAT TO BRING  ·  RULES", SPORTS_MEET.name) - 22;

  y -= drawWhatToBring(page, fonts, y) + 22;

  page.drawText("Rules", { x: MARGIN, y, size: 15, font: fonts.display, color: NAVY });
  page.drawText(SPORTS_KN.rulesTitle, {
    x: MARGIN + fonts.display.widthOfTextAtSize("Rules", 15) + 10,
    y,
    size: 12,
    font: fonts.kannadaBold,
    color: NAVY,
  });
  page.drawRectangle({ x: MARGIN, y: y - 8, width: 36, height: 2, color: GOLD });
  y -= 26;

  SPORTS_RULES.forEach((rule, i) => {
    const lines = wrapText(rule, fonts.regular, 10, CONTENT_WIDTH - 24);
    const knLines = wrapText(SPORTS_KN.rules[i] ?? "", fonts.kannada, 9, CONTENT_WIDTH - 24);
    page.drawText(`${i + 1}.`, { x: MARGIN, y, size: 10, font: fonts.bold, color: GOLD });
    lines.forEach((line) => {
      page.drawText(line, { x: MARGIN + 24, y, size: 10, font: fonts.regular, color: NAVY });
      y -= 14.5;
    });
    knLines.forEach((line) => {
      page.drawText(line, { x: MARGIN + 24, y, size: 9, font: fonts.kannada, color: NAVY });
      y -= 13.5;
    });
    y -= 6;
  });

  drawCentered(page, SPORTS_MEET.academyName, fonts.regular, 8, 34, MUTED);
}

async function embedPhoto(doc: PDFDocument, bytes: Uint8Array): Promise<PDFImage> {
  const isPng = bytes[0] === 0x89 && bytes[1] === 0x50;
  return isPng ? doc.embedPng(bytes) : doc.embedJpg(bytes);
}

/** The 2-page SNT Sports Meet entry card. Only ever rendered for a paid registration. */
export async function renderEntryCardPdf(registration: SportsRegistration, photoBytes: Uint8Array): Promise<Uint8Array> {
  if (registration.status !== "paid" || !registration.entry_card_no) {
    throw new Error("Entry cards can only be rendered for paid registrations.");
  }
  if (!isEntryCardNumber(registration.entry_card_no, SPORTS_MEET.eventYear)) {
    throw new Error(`Entry card number ${registration.entry_card_no} is not in the ${SPORTS_MEET.eventYear}5xxxxx format.`);
  }
  const { doc, fonts } = await createDocument(`SNT Sports Meet Entry Card ${registration.entry_card_no}`);
  const photo = await embedPhoto(doc, photoBytes);
  drawFront(doc.addPage(A4), fonts, registration, photo);
  drawBack(doc, fonts);
  return doc.save();
}
