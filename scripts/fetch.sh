#!/usr/bin/env bash

set -u

curl -sL $GHOST_URL/ghost/api/v3/content/settings?key=$GHOST_KEY -o site.json
curl -sL $GHOST_URL/rss -o public/rss.xml
