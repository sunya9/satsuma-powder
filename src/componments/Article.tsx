import { PostOrPage } from "@tryghost/content-api";
import { formatDate } from "../lib/date";
import { DangerouslyHtml } from "./DangerouslyHtml";
import styles from "./article.module.css";
import Link from "next/link";

interface Props {
  postOrPage: PostOrPage;
  olderPost?: PostOrPage;
  newerPost?: PostOrPage;
}

export const Article = ({ postOrPage, olderPost, newerPost }: Props) => {
  const html = postOrPage.html || "";
  const hasRelatedPosts = newerPost || olderPost;
  return (
    <article aria-label={postOrPage.title}>
      <DangerouslyHtml html={html} />
      {hasRelatedPosts && (
        <nav aria-label="前後の記事" className={styles.relatedPosts}>
          {newerPost && (
            <Link href={`/blog/${newerPost.slug}`} className="next">
              <span className={styles.label}>
                {newerPost.published_at && (
                  <time dateTime={newerPost.published_at}>
                    {formatDate(newerPost.published_at)}
                  </time>
                )}
              </span>
              {newerPost.title}
            </Link>
          )}
          {olderPost && (
            <Link href={`/blog/${olderPost.slug}`} className="prev">
              <span className={styles.label}>
                {olderPost.published_at && (
                  <time dateTime={olderPost.published_at}>
                    {formatDate(olderPost.published_at)}
                  </time>
                )}
              </span>
              {olderPost.title}
            </Link>
          )}
        </nav>
      )}
    </article>
  );
};
