#!/usr/bin/env bash
# BlackWed — concat clips + SFX mix per PRODUCTION-BRIEF.md Part VII
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
cd "$ROOT"
source "$ROOT/scripts/assemble-open-vlc.sh"

OUT="$ROOT/renders/out/BlackWed"
SFX_DIR="$ROOT/assets/BlackWed/sfx"
FINAL_V="$OUT/BlackWed-concat-nosound.mp4"
FINAL="$OUT/BlackWed_Master.mp4"
CONCAT="$OUT/concat-list.txt"

mkdir -p "$OUT" "$SFX_DIR"

order=(BlackWed-clip-01 BlackWed-clip-02 BlackWed-clip-03 BlackWed-clip-04)
rm -f "$CONCAT"
for id in "${order[@]}"; do
  f="$OUT/$id/$id.mp4"
  [[ -f "$f" ]] || f="$OUT/$id.mp4"
  [[ -f "$f" ]] || { echo "Missing: $id"; exit 1; }
  echo "file '$(realpath "$f")'" >> "$CONCAT"
done

echo "Concatenating video clips..."
ffmpeg -y -hide_banner -loglevel error -f concat -safe 0 -i "$CONCAT" \
  -c:v libx264 -preset fast -crf 18 -pix_fmt yuv420p -an "$FINAL_V"

gen_stem() {
  local name="$1"
  local filter="$2"
  local out="$SFX_DIR/$name"
  if [[ -f "$out" && "${HF_REGEN_SFX:-}" != "1" ]]; then
    return 0
  fi
  ffmpeg -y -hide_banner -loglevel error -f lavfi -i "$filter" \
    -ar 48000 -ac 2 -c:a pcm_s16le "$out"
}

echo "Generating SFX stems (procedural placeholders — replace with Freesound assets later)..."
gen_stem drone_institutional.wav "anoisesrc=d=30:c=pink,lowpass=f=120,afade=t=in:st=0:d=2,afade=t=out:st=24:d=6,volume=0.35"
gen_stem fluorescent_hum.wav "sine=frequency=120:duration=5.5,lowpass=f=400,volume=0.12"
gen_stem crt_hiss.wav "anoisesrc=d=3:c=white,highpass=f=6000,lowpass=f=12000,volume=0.08"
gen_stem london_street.wav "anoisesrc=d=9:c=brown,lowpass=f=800,volume=0.1"
gen_stem sub_bass_impact.wav "sine=frequency=52:duration=0.4,afade=t=out:st=0.15:d=0.25,volume=1.2"
gen_stem paper_rustle.wav "anoisesrc=d=0.25:c=white,highpass=f=2000,afade=t=out:st=0:d=0.2,volume=0.5"
gen_stem ui_click.wav "sine=frequency=2800:duration=0.04,afade=t=out:st=0:d=0.04,volume=0.6"
gen_stem whoosh.wav "anoisesrc=d=0.6:c=white,lowpass=f=2000,afade=t=in:st=0:d=0.1,afade=t=out:st=0.35:d=0.25,volume=0.7"
gen_stem glass_shatter.wav "anoisesrc=d=0.5:c=white,highpass=f=4000,afade=t=out:st=0:d=0.45,volume=1.0"
gen_stem impact_hit.wav "sine=frequency=42:duration=0.55,afade=t=out:st=0.1:d=0.45,volume=0.9"
gen_stem ding.wav "sine=frequency=1240:duration=1.2,afade=t=out:st=0.2:d=1.0,volume=0.5"
gen_stem slam.wav "sine=frequency=1180:duration=1.4,afade=t=out:st=0.05:d=1.35,volume=0.85"

echo "Mixing 30s audio bed + stingers..."
ffmpeg -y -hide_banner -loglevel error \
  -i "$FINAL_V" \
  -i "$SFX_DIR/drone_institutional.wav" \
  -i "$SFX_DIR/fluorescent_hum.wav" \
  -i "$SFX_DIR/crt_hiss.wav" \
  -i "$SFX_DIR/london_street.wav" \
  -i "$SFX_DIR/sub_bass_impact.wav" \
  -i "$SFX_DIR/paper_rustle.wav" \
  -i "$SFX_DIR/ui_click.wav" \
  -i "$SFX_DIR/ui_click.wav" \
  -i "$SFX_DIR/ui_click.wav" \
  -i "$SFX_DIR/ui_click.wav" \
  -i "$SFX_DIR/ui_click.wav" \
  -i "$SFX_DIR/ui_click.wav" \
  -i "$SFX_DIR/whoosh.wav" \
  -i "$SFX_DIR/glass_shatter.wav" \
  -i "$SFX_DIR/impact_hit.wav" \
  -i "$SFX_DIR/impact_hit.wav" \
  -i "$SFX_DIR/impact_hit.wav" \
  -i "$SFX_DIR/ding.wav" \
  -i "$SFX_DIR/slam.wav" \
  -filter_complex "\
[1:a]volume=0.14[drone]; \
[2:a]atrim=end=5.5,afade=t=out:st=4.7:d=0.8,volume=0.55[fluoro]; \
[3:a]adelay=9500|9500,atrim=end=2.5,afade=t=in:st=0:d=0.5,afade=t=out:st=1.8:d=0.5,volume=0.7[crt]; \
[4:a]adelay=14500|14500,atrim=end=8,afade=t=in:st=0:d=1,afade=t=out:st=7:d=0.8,volume=0.55[street]; \
[5:a]adelay=200|200,volume=0.85[sub]; \
[6:a]adelay=5600|5600,volume=0.5[paper]; \
[7:a]adelay=6420|6420,volume=0.45[click1]; \
[8:a]adelay=9850|9850,volume=0.38[click2]; \
[9:a]adelay=10220|10220,volume=0.38[click3]; \
[10:a]adelay=10580|10580,volume=0.38[click4]; \
[11:a]adelay=10940|10940,volume=0.38[click5]; \
[12:a]adelay=11330|11330,volume=0.38[click6]; \
[13:a]adelay=9100|9100,volume=0.6[whoosh]; \
[14:a]adelay=12000|12000,volume=0.92[shatter]; \
[15:a]adelay=13800|13800,volume=0.72[col]; \
[16:a]adelay=23400|23400,volume=0.4[imp2]; \
[17:a]adelay=23900|23900,volume=0.38[imp3]; \
[18:a]adelay=16200|16200,volume=0.55[ding]; \
[19:a]adelay=22800|22800,volume=0.88[slam]; \
[drone][fluoro][crt][street][sub][paper][click1][click2][click3][click4][click5][click6][whoosh][shatter][col][imp2][imp3][ding][slam]amix=inputs=19:duration=longest:dropout_transition=0,afade=t=out:st=27.8:d=2.2,volume=0.95[aud]; \
[aud]alimiter=limit=0.92[final_audio]" \
  -map 0:v -c:v copy \
  -map "[final_audio]" -c:a aac -b:a 256k -ar 48000 \
  -t 30.0 \
  -movflags +faststart \
  "$FINAL"

echo "Done: $FINAL"
ls -lh "$FINAL"
ffprobe -v error -show_entries stream=codec_type -of csv=p=0 "$FINAL" | sort | uniq -c
assemble_open_vlc "$FINAL"
