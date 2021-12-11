#!/usr/bin/env bash

set -u

wget -q $GHOST_URL/ghost/api/v3/content/settings?key=$GHOST_KEY -O site.json
wget -q $GHOST_URL/rss -O public/rss.xml
