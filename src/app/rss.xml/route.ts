import { env } from "../../lib/env";

export const dynamic = "force-static";

export async function GET() {
  const rssUrl = `${env.url}/rss`;
  const res = await fetch(rssUrl);
  if (!res.ok || !res.body) throw new Error("Failed to fetch RSS");
  return new Response(res.body, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
    },
  });
}
