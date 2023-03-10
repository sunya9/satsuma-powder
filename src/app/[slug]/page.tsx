import { notFound } from "next/navigation";
import { AppLayout } from "../../componments/AppLayout";
import { Article } from "../../componments/Article";
import { exclusionPageSlugs } from "../../lib/excludedPages";
import { ghostRepo } from "../../lib/ghost";

const Post = async ({ params }: { params: { slug: string } }) => {
  if (exclusionPageSlugs.includes(params.slug)) notFound();
  const page = await ghostRepo.getPage(params.slug);
  if (!page) notFound();
  return (
    <AppLayout
      header={{
        title: page.title,
      }}
    >
      <Article postOrPage={page} />
    </AppLayout>
  );
};

export default Post;

export async function generateStaticParams() {
  const slugs = await ghostRepo
    .getPages()
    .then((res) =>
      res
        .map((post) => post.slug)
        .filter((slug) => !exclusionPageSlugs.includes(slug))
    );
  return slugs.map((slug) => {
    return {
      params: {
        slug,
      },
    };
  });
}
