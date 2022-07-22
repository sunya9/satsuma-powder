#!/usr/bin/env zx

import { $, cd, path, fs } from "zx";

$.verbose = false;

cd(path.resolve(__dirname, "../"));

await fetch(
  `${process.env.GHOST_URL}/ghost/api/v3/content/settings?key=${process.env.GHOST_KEY}`
)
  .then((res) => res.text())
  .then((res) => fs.writeFile("site.json", res));

await fetch(`${process.env.GHOST_URL}/rss`)
  .then((res) => res.text())
  .then((res) => fs.writeFile("public/rss.xml", res));
