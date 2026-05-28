import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://udipmandora.com",
      lastModified: "2026-05-28",
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
