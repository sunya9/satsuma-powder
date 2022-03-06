import { PostOrPage } from "@tryghost/content-api";
import Link from "next/link";
import { formatDate } from "../lib/date";
import Head from "next/head";
import React, { useEffect } from "react";

interface Props {
  postOrPage: PostOrPage;
  hideDate?: boolean;
  olderPost?: PostOrPage;
  newerPost?: PostOrPage;
  hideTitle?: boolean;
}

const DangerouslyHtml = ({ html }: { html: string }) => {
  useEffect(() => {
    const div = document.createElement("div");
    div.innerHTML = html;
    const scripts = div.querySelectorAll("script");
    const externalScriptElementsWithId = Array.from(scripts)
      .filter((script) => script.src)
      .map((script) => {
        const id = `script-${Date.now()}`;
        script.id = id;
        const range = document.createRange();
        const fragment = range.createContextualFragment(script.outerHTML);
        return [id, fragment] as const;
      });
    externalScriptElementsWithId.forEach(([, script]) =>
      document.head.appendChild(script)
    );
    return () => {
      externalScriptElementsWithId.forEach(([id]) =>
        document.getElementById(id)?.remove()
      );
    };
  }, [html]);
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
};

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
        <DangerouslyHtml html={html} />
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
