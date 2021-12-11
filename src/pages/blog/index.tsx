import { PostOrPage } from "@tryghost/content-api";
import { InferGetStaticPropsType } from "next";
import { AppLayout } from "../../componments/AppLayout";
import { Articles } from "../../componments/Articles";
import { ghostRepo } from "../../lib/ghost";

const Index = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  const years = Object.keys(props.postsPerYear)
    .map((string) => +string)
    .sort((a, b) => b - a);
  return (
    <AppLayout title="全ての記事">
      <h2>全ての記事</h2>
      {years.map((year) => {
        return (
          <section key={year}>
            <h6>
              {year}年（{props.postsPerYear[year].length}件）
            </h6>
            <Articles posts={props.postsPerYear[year]} withoutyear />
          </section>
        );
      })}
    </AppLayout>
  );
};
export const getStaticProps = async () => {
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
