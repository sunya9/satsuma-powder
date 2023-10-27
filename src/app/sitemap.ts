import { MetadataRoute } from "next";
import { ghostRepo } from "../lib/ghost";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://private.unsweets.net";
  const entries = await ghostRepo.getPosts().then((res) =>
    res.map<MetadataRoute.Sitemap[number]>((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified:
        post.updated_at || post.published_at || post.created_at || undefined,
    })),
  );
  const lastModified = [...entries].sort((a, b) => {
    if (!a.lastModified || !b.lastModified) return 0;
    return (
      new Date(b.lastModified).getTime() - new Date(a.lastModified).getTime()
    );
  })[0].lastModified;

  const sitemap = [
    { url: baseUrl },
    { url: `${baseUrl}/blog` },
    ...entries,
  ].map<MetadataRoute.Sitemap[number]>((entry) => ({
    lastModified,
    ...entry,
    changeFrequency: "weekly",
  }));
  return sitemap;
}
