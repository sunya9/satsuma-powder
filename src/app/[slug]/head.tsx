import { ghostRepo } from "../../lib/ghost";
import { Canonical } from "../../lib/head";

async function getPost(slug: string) {
  const post = await ghostRepo.getPage(slug);
  return post;
}

export default async function Head({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);

  return (
    <>
      <title>{post.title}</title>
      <Canonical relativePath={post.slug} />
    </>
  );
}
