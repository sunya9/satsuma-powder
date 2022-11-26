import { ghostRepo } from "../../lib/ghost";
import { Canonical, Description } from "../../lib/head";

export default async function Head({ params }: { params: { slug: string } }) {
  const post = await ghostRepo.getPage(params.slug);

  return (
    <>
      <title>{post.title}</title>
      <Description description={post.custom_excerpt} />
      <Canonical relativePath={post.slug} />
    </>
  );
}
