import { PostOrPage } from "@tryghost/content-api";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import React from "react";
import { AppLayout } from "../../componments/AppLayout";
import { Articles } from "../../componments/Articles";
import { ghostRepo } from "../../lib/ghost";

const Index = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  const years = Object.keys(props.postsPerYear)
    .map((string) => +string)
    .sort((a, b) => b - a);
  return (
    <AppLayout title="全ての投稿">
      <h1>全ての投稿</h1>
      {years.map((year) => {
        return (
          <React.Fragment key={year}>
            <h2>
              {year}年 <small>{props.postsPerYear[year].length}件</small>
            </h2>
            <Articles posts={props.postsPerYear[year]} withoutyear />
          </React.Fragment>
        );
      })}
    </AppLayout>
  );
};
export const getStaticProps: GetStaticProps = async () => {
  const posts = await ghostRepo.getPosts();
  const postsPerYear = posts
    .sort((a, b) => {
      return a.published_at && b.published_at
        ? new Date(b.published_at).getTime() -
            new Date(a.published_at).getTime()
        : 0;
    })
    .reduce<{ [key: number]: PostOrPage[] }>((postsPerYear, post) => {
      if (!post.published_at) return postsPerYear;
      const date = new Date(post.published_at);
      const year = date.getFullYear();
      postsPerYear[year] = postsPerYear[year] || [];
      return {
        ...postsPerYear,
        [year]: [...postsPerYear[year], post],
      };
    }, {});
  return {
    props: {
      postsPerYear,
    },
  };
};
export default Index;
