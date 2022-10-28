import { config } from "../lib/config";
import React, { PropsWithChildren } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { FocusableLink } from "./FocusableLink";

interface Props {
  title?: string;
  description?: string;
  canonicalUrl?: string | null;
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

      <header key="appHeader">
        {isIndex ? (
          <>
            <h1>{config.title}</h1>
            <p>
              <small>{config.description}</small>
            </p>
          </>
        ) : (
          <nav>
            <FocusableLink href="/">ホームに戻る</FocusableLink>
          </nav>
        )}
      </header>
      <main key="appContents">{props.children}</main>
      <footer>
        <p>
          ©&nbsp;
          <FocusableLink href={`https://twitter.com/${config.twitter}`}>
            {config.twitter}
          </FocusableLink>
        </p>
      </footer>
    </React.Fragment>
  );
};
