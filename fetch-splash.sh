#!/data/data/com.termux/files/usr/bin/bash

API_KEY="NxueYMHP5pJVc8vP4BcrVkGMHzhezeQZlxhjPO5PGRBjoxtMIefhCCAD"
QUERY="cinematic+dark+movie"
OUTPUT="assets/splash-bg.jpg"

curl -s "https://api.pexels.com/v1/search?query=$QUERY&per_page=10" \
  -H "Authorization: $API_KEY" |
  jq -r '.photos[0].src.landscape' |
  xargs curl -o "$OUTPUT"
