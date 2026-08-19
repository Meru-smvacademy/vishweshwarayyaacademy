import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

const STATIC_ROUTES: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
  { path: "/", priority: 1, changeFrequency: "weekly" },
  { path: "/about", priority: 0.8, changeFrequency: "monthly" },
  { path: "/about/infrastructure", priority: 0.6, changeFrequency: "monthly" },
  { path: "/admission-enquiry", priority: 0.9, changeFrequency: "monthly" },
  { path: "/admissions", priority: 0.8, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.7, changeFrequency: "monthly" },
  { path: "/courses", priority: 0.8, changeFrequency: "monthly" },
  { path: "/courses/foundation", priority: 0.7, changeFrequency: "monthly" },
  { path: "/courses/jee-achievement", priority: 0.7, changeFrequency: "monthly" },
  { path: "/courses/jee-long-term", priority: 0.7, changeFrequency: "monthly" },
  { path: "/courses/kcet-integrated", priority: 0.7, changeFrequency: "monthly" },
  { path: "/courses/neet-achievement", priority: 0.7, changeFrequency: "monthly" },
  { path: "/courses/neet-long-term", priority: 0.7, changeFrequency: "monthly" },
  { path: "/faq", priority: 0.5, changeFrequency: "monthly" },
  { path: "/founder", priority: 0.5, changeFrequency: "monthly" },
  { path: "/gallery", priority: 0.6, changeFrequency: "weekly" },
  { path: "/hostel", priority: 0.6, changeFrequency: "monthly" },
  { path: "/legal/privacy", priority: 0.2, changeFrequency: "yearly" },
  { path: "/legal/terms", priority: 0.2, changeFrequency: "yearly" },
  { path: "/philosophy", priority: 0.5, changeFrequency: "monthly" },
  { path: "/results", priority: 0.6, changeFrequency: "monthly" },
  { path: "/scholarship", priority: 0.7, changeFrequency: "monthly" },
  { path: "/scholarship/apply", priority: 0.7, changeFrequency: "monthly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return STATIC_ROUTES.map(({ path, priority, changeFrequency }) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
  }));
}
