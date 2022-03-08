import { PostOrPage } from "@tryghost/content-api";
import { formatDate } from "../lib/date";
import Head from "next/head";
import React, { useEffect } from "react";
import { FocusableLink } from "./FocusableLink";
import { useRef } from "react";

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
  const div = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    div.current?.querySelectorAll("a").forEach((a) => (a.tabIndex = 0));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [html]);
  return (
    <div
      ref={(el) => (div.current = el)}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

export const Article = ({
  postOrPage,
  hideDate,
  olderPost,
  newerPost,
  hideTitle,
}: Props) => {
  const html = postOrPage.html || "";
  const hasRelatedPosts = newerPost || olderPost;
  return (
    <article aria-label={postOrPage.title}>
      <header>
        {!hideTitle && <h1>{postOrPage.title}</h1>}
        {!hideDate && postOrPage.published_at && (
          <time dateTime={postOrPage.published_at}>
            {formatDate(postOrPage.published_at)}
          </time>
        )}
      </header>
      <Head>
        {newerPost && <link rel="prev" href={`/blog/${newerPost.slug}`} />}
        {olderPost && <link rel="next" href={`/blog/${olderPost.slug}`} />}
      </Head>
      <DangerouslyHtml html={html} />
      {hasRelatedPosts && (
        <nav aria-label="前後の記事">
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
                <FocusableLink href={`/blog/${newerPost.slug}`}>
                  {newerPost.title}
                </FocusableLink>
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
                <FocusableLink href={`/blog/${olderPost.slug}`}>
                  {olderPost.title}
                </FocusableLink>
              </li>
            )}
          </ul>
        </nav>
      )}
    </article>
  );
};
