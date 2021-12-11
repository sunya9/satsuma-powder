#!/usr/bin/env zx

import "zx/globals";

$.verbose = false;

const rootDir = path.resolve(__dirname, "../");
cd(rootDir);

await fetch(
  `${process.env.GHOST_URL}/ghost/api/v3/content/settings?key=${process.env.GHOST_KEY}`
)
  .then((res) => res.text())
  .then((res) => fs.writeFile("site.json", res));

await fetch(`${process.env.GHOST_URL}/rss`)
  .then((res) => res.text())
  .then((res) => fs.writeFile("public/rss.xml", res));
