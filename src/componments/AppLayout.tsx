import { config } from "../lib/config";
import { Fragment, useEffect } from "react";
import Link from "next/link";
import { ActiveLink } from "./ActiveLink";
import Head from "next/head";

interface Props {
  title?: string;
  description?: string;
}

export const AppLayout: React.FC<Props> = (props) => {
  return (
    <div key="appLayout">
      <Head>
        <title>
          {props.title ? `${props.title} - ${config.title}` : `${config.title}`}
        </title>
        <meta
          name="description"
          content={props.description || config.description}
        />
      </Head>

      <header key="appHeader">
        <h1>{config.title}</h1>
        <p>{config.description}</p>
        <nav>
          {config.navigation.map((nav, i, ary) => (
            <Fragment key={nav.url}>
              <ActiveLink key={nav.url} href={nav.url}>
                {nav.label}
              </ActiveLink>
              {i < ary.length - 1 && "\u2007"}
            </Fragment>
          ))}
        </nav>
      </header>
      <main key="appContents">{props.children}</main>

      <hr />
      <footer>
        <div>
          {config.secondary_navigation.map((nav, i, ary) => (
            <Fragment key={nav.url}>
              <a key={nav.url} href={nav.url}>
                {nav.label}
              </a>
              {i < ary.length - 1 && "\u2007"}
            </Fragment>
          ))}
        </div>
        <small>
          © {config.title}
          {"\u2007"}
          <a href={`https://twitter.com/${config.twitter}`}>@ephemeralMocha</a>
        </small>
      </footer>
    </div>
  );
};
