import { PostOrPage } from "@tryghost/content-api";
import { GetStaticProps } from "next";
import Head from "next/head";
import React from "react";
import { AppLayout } from "../componments/AppLayout";
import { Article } from "../componments/Article";
import { Articles } from "../componments/Articles";
import { FocusableLink } from "../componments/FocusableLink";
import { ghostRepo } from "../lib/ghost";

interface Props {
  posts: PostOrPage[];
  about: PostOrPage;
}

const Index = (props: Props) => {
  return (
    <AppLayout>
      <Head>
        <link rel="next" href="/blog/" />
      </Head>
      <Article postOrPage={props.about} hideTitle hideDate />
      <section aria-labelledby="recent-entries">
        <h2 id="recent-entries">最近の投稿</h2>
        <Articles posts={props.posts} />
      </section>
      <p>
        <FocusableLink href="/blog/">全ての投稿</FocusableLink>
      </p>
    </AppLayout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const posts = await ghostRepo.getPosts(10);
  const about = await ghostRepo.getPage("about");
  return {
    props: {
      posts,
      about,
    },
  };
};

export default Index;
