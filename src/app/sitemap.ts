import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/seo";
import { getAllCaseStudySlugs } from "@/lib/work";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const slugs = await getAllCaseStudySlugs();
  const now = new Date();
  return [
    { url: `${siteUrl}/`, lastModified: now, priority: 1 },
    { url: `${siteUrl}/resume`, lastModified: now, priority: 0.5 },
    ...slugs.map((slug) => ({
      url: `${siteUrl}/work/${slug}`,
      lastModified: now,
      priority: 0.8,
    })),
  ];
}
