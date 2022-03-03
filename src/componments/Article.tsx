import { PostOrPage } from "@tryghost/content-api";
import Link from "next/link";
import { formatDate } from "../lib/date";
import InnerHTML from "dangerously-set-html-content";
import Head from "next/head";
import React from "react";

interface Props {
  postOrPage: PostOrPage;
  hideDate?: boolean;
  olderPost?: PostOrPage;
  newerPost?: PostOrPage;
  hideTitle?: boolean;
}

export const Article = ({
  postOrPage,
  hideDate,
  olderPost,
  newerPost,
  hideTitle,
}: Props) => {
  const html = postOrPage.html || "";
  return (
    <React.Fragment>
      <article>
        {!hideTitle && <h1>{postOrPage.title}</h1>}
        {!hideDate && postOrPage.published_at && (
          <time dateTime={postOrPage.published_at}>
            {formatDate(postOrPage.published_at)}
          </time>
        )}
        <Head>
          {newerPost && <link rel="prev" href={`/blog/${newerPost.slug}`} />}
          {olderPost && <link rel="next" href={`/blog/${olderPost.slug}`} />}
        </Head>
        {typeof window === "undefined" ? (
          <div dangerouslySetInnerHTML={{ __html: html }} />
        ) : (
          <InnerHTML html={html} />
        )}
      </article>
      <ul>
        {newerPost && (
          <li>
            次の投稿（
            {newerPost.published_at && (
              <time dateTime={newerPost.published_at}>
                {formatDate(newerPost.published_at)}
              </time>
            )}
            ）
            <Link href={`/blog/${newerPost.slug}`} passHref>
              <a>{newerPost.title}</a>
            </Link>
          </li>
        )}
        {olderPost && (
          <li>
            前の投稿（
            {olderPost.published_at && (
              <time dateTime={olderPost.published_at}>
                {formatDate(olderPost.published_at)}
              </time>
            )}
            ）
            <Link href={`/blog/${olderPost.slug}`} passHref>
              <a>{olderPost.title}</a>
            </Link>
          </li>
        )}
      </ul>
    </React.Fragment>
  );
};
