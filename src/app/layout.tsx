import * as React from "react";
import "./main.css";
import "./cards.css";

export default function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props;
  return (
    <html lang="ja">
      <head />
      <body tabIndex={-1}>{children}</body>
    </html>
  );
}
