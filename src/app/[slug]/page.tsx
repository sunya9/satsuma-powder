import { AppLayout } from "../../componments/AppLayout";
import { Article } from "../../componments/Article";
import { ghostRepo } from "../../lib/ghost";

const Post = async ({ params }: { params: { slug: string } }) => {
  const post = await ghostRepo.getPage(params.slug);
  return (
    <AppLayout
      header={{
        title: post.title,
      }}
    >
      <Article postOrPage={post} />
    </AppLayout>
  );
};

export default Post;

const exclusionPageSlugs = ["about"];

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
