import type { MetadataRoute } from "next";
import { locales } from "@/lib/i18n-config";
import { siteConfig } from "@/lib/site-config";
import { blogPosts } from "@/data/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    routes.push({
      url: `${siteConfig.url}/${locale}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    });
    routes.push({
      url: `${siteConfig.url}/${locale}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    });
    for (const post of blogPosts) {
      routes.push({
        url: `${siteConfig.url}/${locale}/blog/${post.slug}`,
        lastModified: new Date(post.date),
        changeFrequency: "monthly",
        priority: 0.5,
      });
    }
  }

  return routes;
}
