import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://lavelleventure.com",
      lastModified: new Date("2026-02-28"),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}