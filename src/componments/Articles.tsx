import type { PostOrPage } from "@tryghost/content-api";
import { formatDate } from "../lib/date";
import styles from "./articles.module.css";
import Link from "next/link";
interface Props {
  posts: PostOrPage[];
  withoutyear?: true;
}

export const Articles = (props: Props) => {
  return (
    <ul role="feed" aria-busy="false" className={styles.articles}>
      {props.posts.map((post, index, ary) => {
        return (
          <li
            key={post.id}
            role="article"
            aria-posinset={index + 1}
            aria-setsize={ary.length}
            aria-labelledby={post.id}
            className={styles.article}
          >
            <Link href={`/blog/${post.slug}`} id={post.id} className="link">
              {post.published_at && (
                <time dateTime={post.published_at} className={styles.time}>
                  {formatDate(post.published_at)}
                </time>
              )}
              {post.title}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};
