import { PostOrPage } from "@tryghost/content-api";
import { GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";
import React from "react";
import { AppLayout } from "../componments/AppLayout";
import { Article } from "../componments/Article";
import { Articles } from "../componments/Articles";
import { config } from "../lib/config";
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

      {config.secondary_navigation.map((nav, i, ary) => (
        <React.Fragment key={nav.url}>
          <a key={nav.url} href={nav.url}>
            {nav.label}
          </a>
          {i < ary.length - 1 && "\u2007"}
        </React.Fragment>
      ))}
      <h2>最近の投稿</h2>
      <Articles posts={props.posts} />
      <p>
        <Link href="/blog/">全ての投稿</Link>
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
