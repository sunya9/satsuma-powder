import { PostOrPage } from "@tryghost/content-api";
import { GetStaticProps } from "next";
import Link from "next/link";
import { AppLayout } from "../componments/AppLayout";
import { Articles } from "../componments/Articles";
import { ghostRepo } from "../lib/ghost";

interface Props {
  posts: PostOrPage[];
}

const Index = (props: Props) => {
  return (
    <AppLayout>
      <h2>最近の記事</h2>
      <Articles posts={props.posts} />
      <Link href="/blog/">もっと読む</Link>
    </AppLayout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const posts = await ghostRepo.getPosts(10);
  return {
    props: {
      posts,
    },
  };
};

export default Index;
