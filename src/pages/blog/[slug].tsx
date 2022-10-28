import { PostOrPage } from "@tryghost/content-api";
import { GetStaticPaths, GetStaticProps } from "next";
import { AppLayout } from "../../componments/AppLayout";
import { Article } from "../../componments/Article";
import { ghostRepo } from "../../lib/ghost";
import { canonicalUrl } from "../../lib/util";

interface Props {
  post: PostOrPage;
  olderPost?: PostOrPage;
  newerPost?: PostOrPage;
}

const Post = ({ post, olderPost, newerPost }: Props) => {
  return (
    <AppLayout
      title={post.title}
      canonicalUrl={canonicalUrl(`blog/${post.slug}`)}
    >
      <Article postOrPage={post} olderPost={olderPost} newerPost={newerPost} />
    </AppLayout>
  );
};

export default Post;

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = await ghostRepo
    .getPosts()
    .then((res) => res.map((post) => post.slug));
  return {
    paths: slugs.map((slug) => {
      return {
        params: {
          slug,
        },
      };
    }),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<Props> = async (context) => {
  const slug = context.params?.slug;
  if (typeof slug !== "string") return { notFound: true };
  const post = await ghostRepo.getPost(slug);
  if (!post) return { notFound: true };
  const olderPost = await ghostRepo.getOlderPost(post.published_at);
  const newerPost = await ghostRepo.getNewerPost(post.published_at);
  return {
    props: {
      post,
      olderPost: olderPost || null,
      newerPost: newerPost || null,
    },
  };
};
