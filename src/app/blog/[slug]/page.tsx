import { AppLayout } from "../../../componments/AppLayout";
import { Article } from "../../../componments/Article";
import { ghostRepo } from "../../../lib/ghost";

const Post = async ({ params }: { params: { slug: string } }) => {
  const slug = params.slug;

  const post = await ghostRepo.getPost(slug);
  const [olderPost, newerPost] = await Promise.all([
    ghostRepo.getOlderPost(post.published_at).catch(() => void 0),
    ghostRepo.getNewerPost(post.published_at).catch(() => void 0),
  ]);
  return (
    <AppLayout
      coverImage={post.feature_image}
      header={{
        title: post.title,
        date: post.published_at,
        description: post.custom_excerpt,
      }}
    >
      <Article postOrPage={post} olderPost={olderPost} newerPost={newerPost} />
    </AppLayout>
  );
};

export default Post;

export const generateStaticParams = async () => {
  const slugs = await ghostRepo
    .getPosts()
    .then((res) => res.map((post) => post.slug));
  return slugs.map((slug) => ({
    slug,
  }));
};
