import { config } from "../lib/config";
import React, { PropsWithChildren } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { FocusableLink } from "./FocusableLink";
import { formatDate } from "../lib/date";

interface Props {
  title?: string;
  description?: string;
  canonicalUrl?: string | null;
  coverImage?: string | null;
  date?: string | null;
}

export const AppLayout = (props: PropsWithChildren<Props>) => {
  const router = useRouter();
  const isIndex = router.pathname === "/";
  return (
    <React.Fragment key="appLayout">
      <Head>
        <title>{props.title ? `${props.title}` : `${config.title}`}</title>
        <meta
          name="description"
          content={props.description || config.description}
        />
        {props.canonicalUrl && (
          <link rel="canonical" href={props.canonicalUrl} />
        )}
      </Head>

      <header key="appHeader" className={props.coverImage ? "has-cover" : ""}>
        <div className="container">
          {isIndex ? (
            <>
              <h1>{config.title}</h1>
              <p>{config.description}</p>
            </>
          ) : (
            <>
              <h1>{props.title}</h1>
              {props.description && <p>{props.description}</p>}

              {props.date && (
                <time dateTime={props.date}>{formatDate(props.date)}</time>
              )}
            </>
          )}
        </div>
      </header>
      <main key="appContents">
        <div className="container">{props.children}</div>
      </main>
      <footer>
        <div className="container">
          {!isIndex && (
            <p>
              <FocusableLink className="button" href="/">
                ホームに戻る
              </FocusableLink>
            </p>
          )}
          <p>
            ©&nbsp;
            <FocusableLink href={`https://twitter.com/${config.twitter}`}>
              {config.twitter}
            </FocusableLink>
          </p>
        </div>
      </footer>
      <style jsx>{`
        header {
          padding: 1vw 0;
        }
        .has-cover {
          background-image: linear-gradient(
              rgba(0, 0, 0, 0.3),
              rgba(0, 0, 0, 0.8)
            ),
            url(${props.coverImage});
          background-position: center center;
          background-repeat: no-repeat;
          background-size: cover;
          color: #fff;
          padding: 10vw 0;
        }
        time {
          border-radius: 9999px;
          font-size: 0.8rem;
          padding: 0.5em 0;
          border: 1px solid transparent;
        }
        .has-cover time {
          border-color: rgba(255, 255, 255, 0.5);
          padding: 0.5em 1em;
        }
        .has-cover h1 {
          color: #fff;
          margin: 0 0 1rem;
        }
        .has-cover + main {
          margin: 3rem 0;
        }
        footer {
          margin: 5rem 0;
        }
      `}</style>
    </React.Fragment>
  );
};
