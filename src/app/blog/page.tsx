import { type PostOrPage } from "@tryghost/content-api";
import { AppLayout } from "../../componments/AppLayout";
import { Articles } from "../../componments/Articles";
import { ghostRepo } from "../../lib/ghost";
import { config } from "../../lib/config";
import { Metadata } from "next";

interface GroupedByYear {
  readonly [key: number]: PostOrPage[];
}

export const dynamic = "force-static";

const Index = async () => {
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
  const years = Object.keys(postsPerYear)
    .map((string) => +string)
    .sort((a, b) => b - a);
  return (
    <AppLayout
      header={{
        title: "全ての投稿",
      }}
    >
      {years.map((year) => {
        const yearId = `year-${year}`;
        return (
          <section key={year} aria-labelledby={yearId}>
            <h2 id={yearId}>
              {year}年 <small>{postsPerYear[year].length}件</small>
            </h2>
            <Articles posts={postsPerYear[year]} withoutyear />
          </section>
        );
      })}
    </AppLayout>
  );
};

export default Index;

export const metadata: Metadata = {
  title: "全ての投稿",
  description: "過去の投稿一覧です。",
  alternates: {
    canonical: `${config.url}blog`,
  },
  openGraph: {
    siteName: config.title,
    url: `${config.url}blog`,
    type: "website",
  },
};
