import { PostOrPage } from "@tryghost/content-api";
import {
  GetStaticPaths,
  GetStaticProps,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from "next";
import { AppLayout } from "../componments/AppLayout";
import { Article } from "../componments/Article";
import { ghostRepo } from "../lib/ghost";

interface Props {
  post: PostOrPage;
}

const Post = ({ post }: Props) => {
  return (
    <AppLayout title={post.title}>
      <Article postOrPage={post} hideDate />
    </AppLayout>
  );
};

export default Post;

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = await ghostRepo
    .getPages()
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
  const post = await ghostRepo.getPage(slug);
  return {
    props: {
      post,
    },
  };
};
