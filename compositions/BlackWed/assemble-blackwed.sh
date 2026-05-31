#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
cd "$ROOT"
OUT="$ROOT/renders/out/BlackWed"
FINAL="$OUT/BlackWed_Master.mp4"
CONCAT="$OUT/concat-list.txt"
mkdir -p "$OUT"
order=(BlackWed-clip-01 BlackWed-clip-02 BlackWed-clip-03 BlackWed-clip-04)
rm -f "$CONCAT"
for id in "${order[@]}"; do
  f="$OUT/$id/$id.mp4"
  [[ -f "$f" ]] || f="$OUT/$id.mp4"
  [[ -f "$f" ]] || { echo "Missing: $id"; exit 1; }
  echo "file '$(realpath "$f")'" >> "$CONCAT"
done
ffmpeg -y -f concat -safe 0 -i "$CONCAT" -c copy "$OUT/BlackWed-concat-nosound.mp4"
ffmpeg -y -i "$OUT/BlackWed-concat-nosound.mp4" -c:v libx264 -pix_fmt yuv420p -movflags +faststart "$FINAL"
echo "Done: $FINAL"
