import type { PostOrPage } from "@tryghost/content-api";
import { formatDate } from "../lib/date";
import { FocusableLink } from "./FocusableLink";

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
          <FocusableLink href={`/blog/${post.slug}`}>
            {post.title}
          </FocusableLink>
        </li>
      ))}
    </ul>
  );
};
