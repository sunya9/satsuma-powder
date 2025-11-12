import { config } from "../lib/config";
import React, { PropsWithChildren } from "react";
import { formatDate } from "../lib/date";
import styles from "./appLayout.module.css";
import classNames from "classnames";
import Link from "next/link";

interface Props {
  coverImage?: string | null;
  coverImageCaption?: string | null;
  header?: {
    title?: string;
    description?: string;
    date?: string | null;
  };
}

export const AppLayout = (props: PropsWithChildren<Props>) => {
  return (
    <React.Fragment key="appLayout">
      <header
        key="appHeader"
        className={classNames(styles.header, {
          [styles.hasCover]: props.coverImage,
        })}
        style={
          props?.coverImage
            ? {
                backgroundImage: ` linear-gradient(
            rgba(0, 0, 0, 0.3),
            rgba(0, 0, 0, 0.8)
          ), url(${props.coverImage})`,
              }
            : undefined
        }
      >
        <div className="container">
          {!props.header ? (
            <>
              <h1 className={styles.h1}>{config.title}</h1>
              <p>{config.description}</p>
            </>
          ) : (
            <>
              <h1 className={styles.h1}>{props.header.title}</h1>
              {props.header.description && <p>{props.header.description}</p>}

              {props.header.date && (
                <time className={styles.time} dateTime={props.header.date}>
                  {formatDate(props.header.date)}
                </time>
              )}
            </>
          )}
          {props.coverImageCaption && (
            <p
              className={styles.coverImageCaption}
              dangerouslySetInnerHTML={{ __html: props.coverImageCaption }}
            />
          )}
        </div>
      </header>
      <main key="appContents" className={styles.main}>
        <div className="container">{props.children}</div>
      </main>
      <footer className={styles.footer}>
        <div className="container">
          {props.header && (
            <p>
              <Link className="button" href="/">
                ホームに戻る
              </Link>
            </p>
          )}
          <p>
            ©&nbsp;
            <a href={`https://twitter.com/${config.twitter}`}>
              {config.twitter}
            </a>
          </p>
        </div>
      </footer>
    </React.Fragment>
  );
};
