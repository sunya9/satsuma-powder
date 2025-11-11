#!/usr/bin/env zx

import { pipeline } from "stream/promises";
import { $, cd, path, fs } from "zx";

$.verbose = false;

cd(path.resolve(__dirname, "../"));

async function fetchConfig() {
  const res = await fetch(
    `${process.env.GHOST_URL}/ghost/api/content/settings?key=${process.env.GHOST_KEY}`
  );
  if (!res.ok || !res.body) throw new Error("Failed to fetch config");
  return pipeline(res.body, fs.createWriteStream("site.json"));
}

await fetchConfig();
