import prisma from "@/lib/prisma";
import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://vtu-question-bank.vercel.app";

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/papers`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/upload`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/dashboard`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.6,
    },
  ];

  // Dynamic paper pages
  let paperPages: MetadataRoute.Sitemap = [];
  try {
    const papers = await prisma.questionPaper.findMany({
      where: { status: "approved" },
      select: { slug: true, updatedAt: true },
    });

    paperPages = papers.map((paper) => ({
      url: `${baseUrl}/papers/${paper.slug}`,
      lastModified: paper.updatedAt,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }));
  } catch {
    // If DB is not available, skip dynamic pages
  }

  return [...staticPages, ...paperPages];
}
