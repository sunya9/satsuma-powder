import { ghostRepo } from "../../../lib/ghost";
import { Canonical, Description } from "../../../lib/head";

export default async function Head({ params }: { params: { slug: string } }) {
  const post = await ghostRepo.getPost(params.slug);
  const [olderPost, newerPost] = await Promise.all([
    ghostRepo.getOlderPost(post.published_at).catch(() => void 0),
    ghostRepo.getNewerPost(post.published_at).catch(() => void 0),
  ]);
  return (
    <>
      <title>{post.title}</title>
      {newerPost && <link rel="prev" href={`/blog/${newerPost.slug}`} />}
      {olderPost && <link rel="next" href={`/blog/${olderPost.slug}`} />}
      <Description description={post.custom_excerpt} />
      <Canonical relativePath={`blog/${post.slug}`} />
    </>
  );
}
