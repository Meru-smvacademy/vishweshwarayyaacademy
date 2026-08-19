import type { Metadata } from "next";

export const SITE_NAME = "Sir M Vishweshwarayya NEET | JEE Academy";
export const SITE_URL = "https://sirmv.academy";
export const SITE_DESCRIPTION =
  "Sir M Vishweshwarayya NEET | JEE Academy offers structured NEET, JEE and KCET coaching across its Lingasuguru and Sindhanur campuses, with experienced faculty and personalised mentoring.";

export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      siteName: SITE_NAME,
      locale: "en_IN",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}
