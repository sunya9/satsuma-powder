import { notFound } from "next/navigation";
import { OgImageTemplate } from "../../../componments/OgImageTemplate";
import { ghostRepo } from "../../../lib/ghost";

export const size = {
  width: 1200,
  height: 630,
};

export const dynamic = "force-static";

export const contentType = "image/png";
export default async function Image({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const post = await ghostRepo.getPost(slug);
  if (!post) notFound();
  return OgImageTemplate({
    title: post.title,
    date: post.published_at,
  });
}
