import type { PostOrPage } from "@tryghost/content-api";
import { formatDate } from "../lib/date";
import { FocusableLink } from "./FocusableLink";

interface Props {
  posts: PostOrPage[];
  withoutyear?: true;
}

export const Articles = (props: Props) => {
  return (
    <ul role="feed" aria-busy="false">
      {props.posts.map((post, index, ary) => {
        return (
          <li
            key={post.id}
            role="article"
            aria-posinset={index + 1}
            aria-setsize={ary.length}
            aria-labelledby={post.id}
          >
            {post.published_at && (
              <time dateTime={post.published_at}>
                {formatDate(post.published_at, props.withoutyear)}
              </time>
            )}
            {"\u2007"}
            <FocusableLink href={`/blog/${post.slug}`} id={post.id}>
              {post.title}
            </FocusableLink>
          </li>
        );
      })}
    </ul>
  );
};
