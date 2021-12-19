import { PostOrPage } from "@tryghost/content-api";
import Link from "next/link";
import { formatDate } from "../lib/date";
import InnerHTML from "dangerously-set-html-content";
import Head from "next/head";

interface Props {
  postOrPage: PostOrPage;
  hideDate?: boolean;
  olderPost?: PostOrPage;
  newerPost?: PostOrPage;
}

export const Article = ({
  postOrPage,
  hideDate,
  olderPost,
  newerPost,
}: Props) => {
  return (
    <article>
      <h1>{postOrPage.title}</h1>
      {!hideDate && postOrPage.published_at && (
        <p>
          <time dateTime={postOrPage.published_at}>
            {formatDate(postOrPage.published_at)}
          </time>
        </p>
      )}
      <Head>
        {newerPost && <link rel="prev" href={`/blog/${newerPost.slug}`} />}
        {olderPost && <link rel="next" href={`/blog/${olderPost.slug}`} />}
      </Head>
      <InnerHTML html={postOrPage.html || ""} />
      <footer>
        {(newerPost || olderPost) && (
          <ul>
            {newerPost && (
              <li>
                次の記事（
                {newerPost.published_at && (
                  <time dateTime={newerPost.published_at}>
                    {formatDate(newerPost.published_at)}
                  </time>
                )}
                ）
                <br />
                <Link href={`/blog/${newerPost.slug}`} passHref>
                  <a>{newerPost.title}</a>
                </Link>
              </li>
            )}
            {olderPost && (
              <li>
                前の記事（
                {olderPost.published_at && (
                  <time dateTime={olderPost.published_at}>
                    {formatDate(olderPost.published_at)}
                  </time>
                )}
                ）
                <br />
                <Link href={`/blog/${olderPost.slug}`} passHref>
                  <a>{olderPost.title}</a>
                </Link>
              </li>
            )}
          </ul>
        )}
      </footer>
    </article>
  );
};
