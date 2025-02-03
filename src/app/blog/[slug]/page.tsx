import { Metadata } from "next";
import { notFound } from "next/navigation";
import { AppLayout } from "../../../componments/AppLayout";
import { Article } from "../../../componments/Article";
import { ghostRepo } from "../../../lib/ghost";
import { config } from "../../../lib/config";

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
      {olderPost && (
        <link key="prev" rel="prev" href={`/blog/${olderPost.slug}`} />
      )}
      {newerPost && (
        <link key="next" rel="next" href={`/blog/${newerPost.slug}`} />
      )}
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

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { slug } = await props.params;
  const post = await ghostRepo.getPost(slug);
  if (!post) notFound();
  return {
    title: post.title,
    description: post.custom_excerpt,
    alternates: {
      canonical: `${config.url}blog/${post.slug}`,
    },
    openGraph: {
      type: "article",
      authors: post.authors
        ?.map((author) => author.name)
        .filter((name) => typeof name === "string"),
      url: `${config.url}blog/${post.slug}`,
      siteName: config.title,
    },
  };
}
