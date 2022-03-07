#!/usr/bin/env zx

import "zx/globals";

cd(path.resolve(__dirname, ".."));

await $`curl -H "Authorization: token ${process.env.GITHUB_TOKEN}" "https://api.github.com/repos/TryGhost/Ghost/git/trees/main?recursive=1" |
  jq '.tree[] | select(.path | startswith("core/frontend/src/cards") and endswith("css")) | select(.type == "blob") | .path' -r |
  sed "s/^/https:\\/\\/raw.githubusercontent.com\\/TryGhost\\/Ghost\\/main\\//g" |
  tr '\n' ' ' |
  xargs curl -o- | sed "s/rem;/em;/g" > src/cards.css`;
