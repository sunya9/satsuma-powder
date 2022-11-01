import { PostOrPage } from "@tryghost/content-api";
import { GetStaticProps } from "next";
import Head from "next/head";
import React from "react";
import { AppLayout } from "../componments/AppLayout";
import { Article } from "../componments/Article";
import { Articles } from "../componments/Articles";
import { FocusableLink } from "../componments/FocusableLink";
import { config } from "../lib/config";
import { ghostRepo } from "../lib/ghost";
import { canonicalUrl } from "../lib/util";

interface Props {
  posts: PostOrPage[];
  about: PostOrPage;
}

const Index = (props: Props) => {
  return (
    <AppLayout canonicalUrl={canonicalUrl("")} coverImage={config.cover_image}>
      <Head>
        <link rel="next" href="/blog" />
      </Head>
      <Article postOrPage={props.about} />
      <section aria-labelledby="recent-entries">
        <h2 id="recent-entries">最近の投稿</h2>
        <Articles posts={props.posts} />
      </section>
      <hr className="invisible" />
      <p>
        <FocusableLink className="button" href="/blog">
          全ての投稿
        </FocusableLink>
      </p>
    </AppLayout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const [posts, about] = await Promise.all([
    ghostRepo.getPosts(5),
    ghostRepo.getPage("about"),
  ]);
  return {
    props: {
      posts,
      about,
    },
  };
};

export default Index;
