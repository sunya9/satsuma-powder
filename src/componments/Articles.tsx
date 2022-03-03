import type { PostOrPage } from "@tryghost/content-api";
import Link from "next/link";
import { formatDate } from "../lib/date";

interface Props {
  posts: PostOrPage[];
  withoutyear?: true;
}

export const Articles = (props: Props) => {
  return (
    <ul>
      {props.posts.map((post) => (
        <li key={post.id}>
          {post.published_at && (
            <time dateTime={post.published_at}>
              {formatDate(post.published_at, props.withoutyear)}
            </time>
          )}
          {"\u2007"}
          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
        </li>
      ))}
    </ul>
  );
};
