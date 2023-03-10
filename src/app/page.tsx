import Link from "next/link";
import React from "react";
import { AppLayout } from "../componments/AppLayout";
import { Article } from "../componments/Article";
import { Articles } from "../componments/Articles";
import { FocusableLink } from "../componments/FocusableLink";
import { config } from "../lib/config";
import { ghostRepo } from "../lib/ghost";

const Index = async () => {
  const [posts, about] = await Promise.all([
    ghostRepo.getPosts(5),
    ghostRepo.getPage("about"),
  ]);
  if (!about) throw new Error("Cannot fetch about page");
  return (
    <AppLayout coverImage={config.cover_image}>
      <Article postOrPage={about} />
      <section aria-labelledby="recent-entries">
        <h2 id="recent-entries">最近の投稿</h2>
        <Articles posts={posts} />
      </section>
      <hr className="invisible" />
      <p>
        <Link className="button" href="/blog" scroll>
          全ての投稿
        </Link>
      </p>
    </AppLayout>
  );
};

export default Index;
