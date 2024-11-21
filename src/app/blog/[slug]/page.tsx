import { Metadata } from "next";
import { notFound } from "next/navigation";
import { AppLayout } from "../../../componments/AppLayout";
import { Article } from "../../../componments/Article";
import { ghostRepo } from "../../../lib/ghost";

type Props = {
  params: Promise<{ slug: string }>;
};

const Post = async (props: Props) => {
  const { slug } = await props.params;

  const post = await ghostRepo.getPost(slug);
  if (!post) notFound();
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

export const generateMetadata: (props: Props) => Promise<Metadata> = async (
  props
) => {
  const { slug } = await props.params;
  const post = await ghostRepo.getPost(slug);
  if (!post) notFound();
  const [olderPost, newerPost] = await Promise.all([
    ghostRepo.getOlderPost(post.published_at).catch(() => void 0),
    ghostRepo.getNewerPost(post.published_at).catch(() => void 0),
  ]);
  return {
    title: post.title,
    description: post.custom_excerpt,
    prev: newerPost ? `/blog/${newerPost.slug}` : null,
    next: olderPost ? `/blog/${olderPost.slug}` : null,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
  };
};
