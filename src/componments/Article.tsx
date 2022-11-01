import { PostOrPage } from "@tryghost/content-api";
import { formatDate } from "../lib/date";
import Head from "next/head";
import React, { useEffect } from "react";
import { FocusableLink } from "./FocusableLink";
import { useRef } from "react";

interface Props {
  postOrPage: PostOrPage;
  olderPost?: PostOrPage;
  newerPost?: PostOrPage;
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

export const Article = ({ postOrPage, olderPost, newerPost }: Props) => {
  const html = postOrPage.html || "";
  const hasRelatedPosts = newerPost || olderPost;
  return (
    <article aria-label={postOrPage.title}>
      <Head>
        {newerPost && <link rel="prev" href={`/blog/${newerPost.slug}`} />}
        {olderPost && <link rel="next" href={`/blog/${olderPost.slug}`} />}
      </Head>
      <DangerouslyHtml html={html} />
      {hasRelatedPosts && (
        <nav aria-label="前後の記事" className="related-posts">
          {newerPost && (
            <FocusableLink href={`/blog/${newerPost.slug}`} className="next">
              <span className="label">
                {newerPost.published_at && (
                  <time dateTime={newerPost.published_at}>
                    {formatDate(newerPost.published_at)}
                  </time>
                )}
              </span>
              {newerPost.title}
            </FocusableLink>
          )}
          {olderPost && (
            <FocusableLink href={`/blog/${olderPost.slug}`} className="prev">
              <span className="label">
                {olderPost.published_at && (
                  <time dateTime={olderPost.published_at}>
                    {formatDate(olderPost.published_at)}
                  </time>
                )}
              </span>
              {olderPost.title}
            </FocusableLink>
          )}
        </nav>
      )}
      <style jsx>
        {`
          .related-posts {
            display: grid;
            grid-template: "next prev" 1fr / 1fr 1fr;
            gap: var(--spacing-2);
            margin: 2rem 0;
          }
          .related-posts :global(.next),
          .related-posts :global(.prev) {
            border: 1px solid var(--border-color);
            padding: var(--spacing-2);
            display: block;
            text-decoration: none;
          }
          .label {
            display: block;
            color: var(--secondary-text-color);
          }
          .related-posts :global(.next) {
            grid-area: next;
          }
          .related-posts :global(.prev) {
            grid-area: prev;
            text-align: right;
          }
        `}
      </style>
    </article>
  );
};
