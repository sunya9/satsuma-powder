import { config } from "../lib/config";
import React from "react";
import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";

interface Props {
  title?: string;
  description?: string;
}

export const AppLayout: React.FC<Props> = (props) => {
  const router = useRouter();
  const isIndex = router.asPath === "/";
  return (
    <React.Fragment key="appLayout">
      <Head>
        <title>{props.title ? `${props.title}` : `${config.title}`}</title>
        <meta
          name="description"
          content={props.description || config.description}
        />
      </Head>

      <header key="appHeader">
        {isIndex ? <h1>{config.title}</h1> : <Link href="/">ホームに戻る</Link>}

        <p>
          <small>{isIndex && config.description}</small>
        </p>
      </header>
      <main key="appContents">{props.children}</main>
      <footer>
        <p>
          ©&nbsp;
          <a href={`https://twitter.com/${config.twitter}`}>@ephemeralMocha</a>
        </p>
      </footer>
    </React.Fragment>
  );
};
