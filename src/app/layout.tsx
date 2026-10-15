import type { Metadata } from "next";
import localFont from "next/font/local";
import PublicChrome from "@/components/layout/PublicChrome";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/seo";
import "./globals.css";
import "./fonts/fallbacks.css";

// Fonts are self-hosted (src/app/fonts) so builds never depend on fetching
// Google Fonts. Files are the Google Fonts latin + latin-ext subsets, with the
// family names, weights, styles and fallback metrics (src/app/fonts/fallbacks.css)
// that next/font/google produced.

const geistSans = localFont({
  src: [
    { path: "./fonts/geist/geist.woff2", weight: "100 900", style: "normal" },
  ],
  declarations: [{ prop: "font-family", value: "Geist" }],
  variable: "--font-geist-sans",
  fallback: ['"Geist Fallback"'],
  adjustFontFallback: false,
});

const geistMono = localFont({
  src: [
    { path: "./fonts/geist-mono/geist-mono.woff2", weight: "100 900", style: "normal" },
  ],
  declarations: [{ prop: "font-family", value: "Geist Mono" }],
  variable: "--font-geist-mono",
  fallback: ['"Geist Mono Fallback"'],
  adjustFontFallback: false,
});

const manrope = localFont({
  src: [
    { path: "./fonts/manrope/manrope.woff2", weight: "600", style: "normal" },
    { path: "./fonts/manrope/manrope.woff2", weight: "700", style: "normal" },
    { path: "./fonts/manrope/manrope.woff2", weight: "800", style: "normal" },
  ],
  declarations: [{ prop: "font-family", value: "Manrope" }],
  variable: "--font-manrope",
  fallback: ['"Manrope Fallback"'],
  adjustFontFallback: false,
});

const inter = localFont({
  src: [
    { path: "./fonts/inter/inter.woff2", weight: "300", style: "normal" },
    { path: "./fonts/inter/inter.woff2", weight: "400", style: "normal" },
    { path: "./fonts/inter/inter.woff2", weight: "500", style: "normal" },
    { path: "./fonts/inter/inter.woff2", weight: "600", style: "normal" },
    { path: "./fonts/inter/inter.woff2", weight: "700", style: "normal" },
  ],
  declarations: [{ prop: "font-family", value: "Inter" }],
  variable: "--font-inter",
  fallback: ['"Inter Fallback"'],
  adjustFontFallback: false,
});

const outfit = localFont({
  src: [
    { path: "./fonts/outfit/outfit.woff2", weight: "300", style: "normal" },
    { path: "./fonts/outfit/outfit.woff2", weight: "400", style: "normal" },
    { path: "./fonts/outfit/outfit.woff2", weight: "500", style: "normal" },
    { path: "./fonts/outfit/outfit.woff2", weight: "600", style: "normal" },
    { path: "./fonts/outfit/outfit.woff2", weight: "700", style: "normal" },
    { path: "./fonts/outfit/outfit.woff2", weight: "900", style: "normal" },
  ],
  declarations: [{ prop: "font-family", value: "Outfit" }],
  variable: "--font-outfit",
  fallback: ['"Outfit Fallback"'],
  adjustFontFallback: false,
});

const playfairDisplay = localFont({
  src: [
    { path: "./fonts/playfair-display/playfair-display.woff2", weight: "400", style: "normal" },
    { path: "./fonts/playfair-display/playfair-display.woff2", weight: "500", style: "normal" },
    { path: "./fonts/playfair-display/playfair-display.woff2", weight: "600", style: "normal" },
    { path: "./fonts/playfair-display/playfair-display.woff2", weight: "700", style: "normal" },
    { path: "./fonts/playfair-display/playfair-display.woff2", weight: "800", style: "normal" },
    { path: "./fonts/playfair-display/playfair-display-italic.woff2", weight: "400", style: "italic" },
    { path: "./fonts/playfair-display/playfair-display-italic.woff2", weight: "500", style: "italic" },
    { path: "./fonts/playfair-display/playfair-display-italic.woff2", weight: "600", style: "italic" },
    { path: "./fonts/playfair-display/playfair-display-italic.woff2", weight: "700", style: "italic" },
    { path: "./fonts/playfair-display/playfair-display-italic.woff2", weight: "800", style: "italic" },
  ],
  declarations: [{ prop: "font-family", value: "Playfair Display" }],
  variable: "--font-playfair-display",
  fallback: ['"Playfair Display Fallback"'],
  adjustFontFallback: false,
});

const poppins = localFont({
  src: [
    { path: "./fonts/poppins/poppins-300.woff2", weight: "300", style: "normal" },
    { path: "./fonts/poppins/poppins-400.woff2", weight: "400", style: "normal" },
    { path: "./fonts/poppins/poppins-500.woff2", weight: "500", style: "normal" },
    { path: "./fonts/poppins/poppins-600.woff2", weight: "600", style: "normal" },
    { path: "./fonts/poppins/poppins-700.woff2", weight: "700", style: "normal" },
  ],
  declarations: [{ prop: "font-family", value: "Poppins" }],
  variable: "--font-poppins",
  fallback: ['"Poppins Fallback"'],
  adjustFontFallback: false,
});

const fraunces = localFont({
  src: [
    { path: "./fonts/fraunces/fraunces.woff2", weight: "100 900", style: "normal" },
    { path: "./fonts/fraunces/fraunces-italic.woff2", weight: "100 900", style: "italic" },
  ],
  declarations: [{ prop: "font-family", value: "Fraunces" }],
  variable: "--font-fraunces",
  fallback: ['"Fraunces Fallback"'],
  adjustFontFallback: false,
});

const workSans = localFont({
  src: [
    { path: "./fonts/work-sans/work-sans.woff2", weight: "300", style: "normal" },
    { path: "./fonts/work-sans/work-sans.woff2", weight: "400", style: "normal" },
    { path: "./fonts/work-sans/work-sans.woff2", weight: "500", style: "normal" },
    { path: "./fonts/work-sans/work-sans.woff2", weight: "600", style: "normal" },
  ],
  declarations: [{ prop: "font-family", value: "Work Sans" }],
  variable: "--font-work-sans",
  fallback: ['"Work Sans Fallback"'],
  adjustFontFallback: false,
});

const dmSans = localFont({
  src: [
    { path: "./fonts/dm-sans/dm-sans.woff2", weight: "300", style: "normal" },
    { path: "./fonts/dm-sans/dm-sans.woff2", weight: "400", style: "normal" },
    { path: "./fonts/dm-sans/dm-sans.woff2", weight: "500", style: "normal" },
    { path: "./fonts/dm-sans/dm-sans.woff2", weight: "600", style: "normal" },
  ],
  declarations: [{ prop: "font-family", value: "DM Sans" }],
  variable: "--font-dm-sans",
  fallback: ['"DM Sans Fallback"'],
  adjustFontFallback: false,
});

const sourceSans3 = localFont({
  src: [
    { path: "./fonts/source-sans-3/source-sans-3.woff2", weight: "300", style: "normal" },
    { path: "./fonts/source-sans-3/source-sans-3.woff2", weight: "600", style: "normal" },
  ],
  declarations: [{ prop: "font-family", value: "Source Sans 3" }],
  variable: "--font-source-sans-3",
  fallback: ['"Source Sans 3 Fallback"'],
  adjustFontFallback: false,
});

const dmMono = localFont({
  src: [
    { path: "./fonts/dm-mono/dm-mono-400.woff2", weight: "400", style: "normal" },
    { path: "./fonts/dm-mono/dm-mono-500.woff2", weight: "500", style: "normal" },
  ],
  declarations: [{ prop: "font-family", value: "DM Mono" }],
  variable: "--font-dm-mono",
  fallback: ['"DM Mono Fallback"'],
  adjustFontFallback: false,
});

const barlowCondensed = localFont({
  src: [
    { path: "./fonts/barlow-condensed/barlow-condensed-300.woff2", weight: "300", style: "normal" },
    { path: "./fonts/barlow-condensed/barlow-condensed-400.woff2", weight: "400", style: "normal" },
    { path: "./fonts/barlow-condensed/barlow-condensed-500.woff2", weight: "500", style: "normal" },
    { path: "./fonts/barlow-condensed/barlow-condensed-600.woff2", weight: "600", style: "normal" },
    { path: "./fonts/barlow-condensed/barlow-condensed-700.woff2", weight: "700", style: "normal" },
    { path: "./fonts/barlow-condensed/barlow-condensed-800.woff2", weight: "800", style: "normal" },
    { path: "./fonts/barlow-condensed/barlow-condensed-900.woff2", weight: "900", style: "normal" },
  ],
  declarations: [{ prop: "font-family", value: "Barlow Condensed" }],
  variable: "--font-barlow-condensed",
  fallback: ['"Barlow Condensed Fallback"'],
  adjustFontFallback: false,
});

const jetbrainsMono = localFont({
  src: [
    { path: "./fonts/jetbrains-mono/jetbrains-mono.woff2", weight: "300", style: "normal" },
    { path: "./fonts/jetbrains-mono/jetbrains-mono.woff2", weight: "400", style: "normal" },
    { path: "./fonts/jetbrains-mono/jetbrains-mono.woff2", weight: "500", style: "normal" },
    { path: "./fonts/jetbrains-mono/jetbrains-mono.woff2", weight: "600", style: "normal" },
  ],
  declarations: [{ prop: "font-family", value: "JetBrains Mono" }],
  variable: "--font-jetbrains-mono",
  fallback: ['"JetBrains Mono Fallback"'],
  adjustFontFallback: false,
});

const dmSerifDisplay = localFont({
  src: [
    { path: "./fonts/dm-serif-display/dm-serif-display-400.woff2", weight: "400", style: "normal" },
    { path: "./fonts/dm-serif-display/dm-serif-display-400-italic.woff2", weight: "400", style: "italic" },
  ],
  declarations: [{ prop: "font-family", value: "DM Serif Display" }],
  variable: "--font-dm-serif-display",
  fallback: ['"DM Serif Display Fallback"'],
  adjustFontFallback: false,
});

const instrumentSans = localFont({
  src: [
    { path: "./fonts/instrument-sans/instrument-sans.woff2", weight: "400", style: "normal" },
    { path: "./fonts/instrument-sans/instrument-sans.woff2", weight: "500", style: "normal" },
    { path: "./fonts/instrument-sans/instrument-sans.woff2", weight: "600", style: "normal" },
  ],
  declarations: [{ prop: "font-family", value: "Instrument Sans" }],
  variable: "--font-instrument-sans",
  fallback: ['"Instrument Sans Fallback"'],
  adjustFontFallback: false,
});

const instrumentSerif = localFont({
  src: [
    { path: "./fonts/instrument-serif/instrument-serif-400.woff2", weight: "400", style: "normal" },
    { path: "./fonts/instrument-serif/instrument-serif-400-italic.woff2", weight: "400", style: "italic" },
  ],
  declarations: [{ prop: "font-family", value: "Instrument Serif" }],
  variable: "--font-instrument-serif",
  fallback: ['"Instrument Serif Fallback"'],
  adjustFontFallback: false,
});

const lora = localFont({
  src: [
    { path: "./fonts/lora/lora.woff2", weight: "400", style: "normal" },
    { path: "./fonts/lora/lora.woff2", weight: "500", style: "normal" },
    { path: "./fonts/lora/lora.woff2", weight: "600", style: "normal" },
    { path: "./fonts/lora/lora-italic.woff2", weight: "400", style: "italic" },
    { path: "./fonts/lora/lora-italic.woff2", weight: "500", style: "italic" },
    { path: "./fonts/lora/lora-italic.woff2", weight: "600", style: "italic" },
  ],
  declarations: [{ prop: "font-family", value: "Lora" }],
  variable: "--font-lora",
  fallback: ['"Lora Fallback"'],
  adjustFontFallback: false,
});

const ebGaramond = localFont({
  src: [
    { path: "./fonts/eb-garamond/eb-garamond.woff2", weight: "400", style: "normal" },
    { path: "./fonts/eb-garamond/eb-garamond.woff2", weight: "500", style: "normal" },
    { path: "./fonts/eb-garamond/eb-garamond.woff2", weight: "600", style: "normal" },
    { path: "./fonts/eb-garamond/eb-garamond-italic.woff2", weight: "400", style: "italic" },
    { path: "./fonts/eb-garamond/eb-garamond-italic.woff2", weight: "500", style: "italic" },
    { path: "./fonts/eb-garamond/eb-garamond-italic.woff2", weight: "600", style: "italic" },
  ],
  declarations: [{ prop: "font-family", value: "EB Garamond" }],
  variable: "--font-eb-garamond",
  fallback: ['"EB Garamond Fallback"'],
  adjustFontFallback: false,
});

const cinzel = localFont({
  src: [
    { path: "./fonts/cinzel/cinzel.woff2", weight: "400", style: "normal" },
    { path: "./fonts/cinzel/cinzel.woff2", weight: "500", style: "normal" },
    { path: "./fonts/cinzel/cinzel.woff2", weight: "600", style: "normal" },
  ],
  declarations: [{ prop: "font-family", value: "Cinzel" }],
  variable: "--font-cinzel",
  fallback: ['"Cinzel Fallback"'],
  adjustFontFallback: false,
});

// Kannada (SNT registration form, hall ticket status). Not preloaded: only the
// pages that show Kannada text download it.
const notoSansKannada = localFont({
  src: [
    { path: "./fonts/noto-sans-kannada/noto-sans-kannada.woff2", weight: "400", style: "normal" },
    { path: "./fonts/noto-sans-kannada/noto-sans-kannada.woff2", weight: "500", style: "normal" },
    { path: "./fonts/noto-sans-kannada/noto-sans-kannada.woff2", weight: "600", style: "normal" },
  ],
  declarations: [{ prop: "font-family", value: "Noto Sans Kannada" }],
  variable: "--font-noto-kannada",
  fallback: ['"Noto Sans Kannada Fallback"'],
  adjustFontFallback: false,
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: "%s",
  },
  description: SITE_DESCRIPTION,
  openGraph: {
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: "/",
    siteName: SITE_NAME,
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${manrope.variable} ${inter.variable} ${outfit.variable} ${playfairDisplay.variable} ${fraunces.variable} ${workSans.variable} ${dmSans.variable} ${sourceSans3.variable} ${dmMono.variable} ${barlowCondensed.variable} ${jetbrainsMono.variable} ${dmSerifDisplay.variable} ${instrumentSans.variable} ${instrumentSerif.variable} ${lora.variable} ${ebGaramond.variable} ${cinzel.variable} ${poppins.variable} ${notoSansKannada.variable} antialiased`}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        <PublicChrome>{children}</PublicChrome>
      </body>
    </html>
  );
}
