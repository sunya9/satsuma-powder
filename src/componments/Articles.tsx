import type { PostOrPage } from "@tryghost/content-api";
import { formatDate } from "../lib/date";
import { FocusableLink } from "./FocusableLink";

interface Props {
  posts: PostOrPage[];
  withoutyear?: true;
}

export const Articles = (props: Props) => {
  return (
    <ul role="feed" aria-busy="false" className="articles">
      {props.posts.map((post, index, ary) => {
        return (
          <li
            key={post.id}
            role="article"
            aria-posinset={index + 1}
            aria-setsize={ary.length}
            aria-labelledby={post.id}
          >
            <FocusableLink
              href={`/blog/${post.slug}`}
              id={post.id}
              className="item"
            >
              {post.published_at && (
                <time dateTime={post.published_at}>
                  {formatDate(post.published_at)}
                </time>
              )}
              {post.title}
            </FocusableLink>
          </li>
        );
      })}
      <style jsx>{`
        time {
          display: block;
          color: var(--secondary-text-color);
        }
        .articles {
          list-style: none;
          padding-left: 0;
        }
        li :global(.item) {
          text-decoration: none;
          display: block;
          padding: var(--spacing-2) 0;
        }

        .articles > li + li {
          border-top: 1px solid var(--border-color);
        }
      `}</style>
    </ul>
  );
};
