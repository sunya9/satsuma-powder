import { PostOrPage } from "@tryghost/content-api";
import { GetStaticPaths, GetStaticProps } from "next";
import { AppLayout } from "../componments/AppLayout";
import { Article } from "../componments/Article";
import { ghostRepo } from "../lib/ghost";
import { canonicalUrl } from "../lib/util";

interface Props {
  post: PostOrPage;
}

const Post = ({ post }: Props) => {
  return (
    <AppLayout
      title={post.title}
      canonicalUrl={canonicalUrl(`blog/${post.slug}`)}
    >
      <Article postOrPage={post} />
    </AppLayout>
  );
};

export default Post;

const exclusionPageSlugs = ["about"];

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = await ghostRepo
    .getPages()
    .then((res) =>
      res
        .map((post) => post.slug)
        .filter((slug) => !exclusionPageSlugs.includes(slug))
    );
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
  const post = await ghostRepo.getPage(slug);
  return {
    props: {
      post,
    },
  };
};
