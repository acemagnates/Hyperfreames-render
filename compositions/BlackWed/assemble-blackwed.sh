#!/bin/bash
# Assemble script for Black Wednesday
# Concatenates the 4 generated clips sequentially.

set -e

PROJECT_ID="BlackWed"
RENDER_DIR="renders/out/${PROJECT_ID}"
OUTPUT_FILE="${RENDER_DIR}/${PROJECT_ID}.mp4"
LIST_FILE="${RENDER_DIR}/concat_list.txt"

echo "Assembling ${PROJECT_ID}..."

# Ensure render directory exists
mkdir -p "${RENDER_DIR}"

# Ensure all 4 clips exist
for i in 1 2 3 4; do
  CLIP_FILE="${RENDER_DIR}/${PROJECT_ID}-clip-0${i}.mp4"
  if [ ! -f "${CLIP_FILE}" ]; then
    echo "Error: Missing clip ${CLIP_FILE}"
    exit 1
  fi
done

# Create concat list
cat > "${LIST_FILE}" << EOF
file '${PROJECT_ID}-clip-01.mp4'
file '${PROJECT_ID}-clip-02.mp4'
file '${PROJECT_ID}-clip-03.mp4'
file '${PROJECT_ID}-clip-04.mp4'
EOF

echo "Concatenating clips..."
ffmpeg -y -f concat -safe 0 -i "${LIST_FILE}" -c copy "${OUTPUT_FILE}"

echo "Assembly complete: ${OUTPUT_FILE}"
