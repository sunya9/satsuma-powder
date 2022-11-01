import { PostOrPage } from "@tryghost/content-api";
import { GetStaticProps } from "next";
import React from "react";
import { AppLayout } from "../../componments/AppLayout";
import { Articles } from "../../componments/Articles";
import { ghostRepo } from "../../lib/ghost";
import { canonicalUrl } from "../../lib/util";

interface GroupedByYear {
  readonly [key: number]: PostOrPage[];
}
interface Props {
  postsPerYear: GroupedByYear;
}

const Index = (props: Props) => {
  const years = Object.keys(props.postsPerYear)
    .map((string) => +string)
    .sort((a, b) => b - a);
  return (
    <AppLayout title="全ての投稿" canonicalUrl={canonicalUrl("blog")}>
      {years.map((year) => {
        const yearId = `year-${year}`;
        return (
          <section key={year} aria-labelledby={yearId}>
            <h2 id={yearId}>
              {year}年 <small>{props.postsPerYear[year].length}件</small>
            </h2>
            <Articles posts={props.postsPerYear[year]} withoutyear />
          </section>
        );
      })}
    </AppLayout>
  );
};
export const getStaticProps: GetStaticProps<GroupedByYear> = async () => {
  const posts = await ghostRepo.getPosts();
  const postsPerYear: GroupedByYear = posts
    .sort((a, b) => {
      return a.published_at && b.published_at
        ? new Date(b.published_at).getTime() -
            new Date(a.published_at).getTime()
        : 0;
    })
    .reduce<GroupedByYear>((postsPerYear, post) => {
      if (!post.published_at) return postsPerYear;
      const date = new Date(post.published_at);
      const year = date.getFullYear();
      return {
        ...postsPerYear,
        [year]: [...(postsPerYear[year] || []), post],
      };
    }, {});
  return {
    props: {
      postsPerYear,
    },
  };
};
export default Index;
