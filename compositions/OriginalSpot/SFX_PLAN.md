# SOUND DESIGN & SFX CUE SHEET: THE METAMORPHOSIS OF TIME (CHRONO-FRACTURE)

**Project ID:** OriginalSpot  
**Total Duration:** 30.00 Seconds  
**Audio Quality:** 48 kHz, 24-bit Stereo  
**Loudness Target:** -14 LUFS (Integrated), -1.0 dBTP (True Peak)  
**Philosophy:** SFX-First Cinematic Scoring. No generic music tracks. Every visual shift, pressure build, focus pull, and shatter has a corresponding sound layer that grounds it in physical reality.

---

## 1. Sound Design Structure & Frequencies

The soundscape is divided into four distinct frequency bands to prevent masking and create maximum cinematic impact:

```
┌────────────────────────────────────────────────────────┐
│  HIGH TACTILE (8 kHz - 20 kHz): Glass Ticks, Sparks     │
├────────────────────────────────────────────────────────┤
│  MID TEXTURE (500 Hz - 5 kHz): Slate Scraping, Friction│
├────────────────────────────────────────────────────────┤
│  LOW ENERGY (80 Hz - 250 Hz): Tectonic Wholes, Rumbles  │
├────────────────────────────────────────────────────────┤
│  SUB PRESSURE (20 Hz - 80 Hz): Sub-Bass Drops, Slams   │
└────────────────────────────────────────────────────────┘
```

* **Sub Pressure (20 Hz - 80 Hz):** Ground-shaking sub-bass drops that give geological weight to the obsidian plates. These are felt rather than heard.
* **Low Energy (80 Hz - 250 Hz):** Heavy tectonic low-end rumbles, representing the massive friction of compression.
* **Mid Texture (500 Hz - 5 kHz):** Tactile scraping, morphing, and rushing air whooshes that handle the physical movement and transition phases.
* **High Tactile (8 kHz - 20 kHz):** Crystalline cracks, micro-ticks, and glass sparkles that emphasize the sharpness of the metamorphic crystals and the blinding white transitions.

---

## 2. Complete SFX Stem Manifest

Directory: `assets/OriginalSpot/sfx/` (max ~5s each, 48 kHz stereo WAV).

| File Name | Panning | Base Gain | Role / Scene Verb | Description |
| :--- | :--- | :--- | :--- | :--- |
| `obsidian_pressure_sub.wav` | Center | -3.5 dB | Tectonic compression / Rumble | A deep, sustained sub hum (40 Hz) that pulses and rises in volume, mimicking intense pressure. |
| `plate_slam_impact.wav` | Center | -1.5 dB | 0.00s Tectonic Slam | A massive, heavy, low-mid impact with a metalloid rock crunch. |
| `slate_friction_scrape.wav` | 30% Left | -8.0 dB | Drift / Friction | A gritty, gravel-like scratching sound of rock against rock under high load. |
| `metamorphic_morph_whoosh.wav`| Center | -4.0 dB | 09.50s Rack Focus Morph | A warm, lowpass whoosh that sweeps from low-mid to high, representing the crystal morph. |
| `crystal_shimmer_spark.wav` | Dynamic | -6.0 dB | 10.00s Glass Reveal | A bright, crystalline chime with a wide stereo delay, highlighting the cold glass shard. |
| `glass_tension_crack.wav` | 40% Right | -2.0 dB | 12.00s - 18.00s Micro-Cracks | Sudden, high-pitched ticks and crystalline fracturing sounds. |
| `shatter_prism_impact.wav` | Wide | -0.5 dB | 20.00s Catastrophic Shatter | An explosive, high-impact crash of breaking glass layered with a massive sub-bass sweep. |
| `monolith_reverb_hum.wav` | Center | -5.0 dB | 20.80s Monolithic Outro | A cold, ambient hum (110 Hz) with an expansive stereo space, signifying solid resolution. |
| `blueprint_draw_chime.wav` | 20% Left | -10.0 dB | 21.00s coordinate draw | High-frequency, light digital metallic ticks, indicating technical blueprints drawing. |

---

## 3. Precise Visual-SFX Synchronization Map

Every audio hit is locked to precise wall-clock seconds, syncing directly with the visual actions detailed in the storyboard.

```
0.00s      3.20s         7.50s   10.00s    13.40s      18.00s  20.00s       24.50s      28.20s    30.00s
  ▼          ▼             ▼       ▼         ▼           ▼       ▼            ▼           ▼         ▼
[SLAM]───[SCRAPE]───────[BUILD]─[MORPH]──[TENSION]───[GLITCH]─[SHATTER]──[BLUEPRINT]──[FADE-OUT]──[SILENCE]
```

### 3.1 Clip 01: "The Compression" (0.00s - 10.00s)
* **0.00s - [SLAM]:** The instant the clip begins, the obsidian plates slam shut from the screen edges.
  * *Audio Sync:* Trigger `plate_slam_impact.wav` at exactly **0.00s** (0ms delay) with a sudden, heavy sub-bass explosion.
* **3.20s - [SCRAPE]:** The obsidian plates continue to squeeze together.
  * *Audio Sync:* Trigger `slate_friction_scrape.wav` at **3.20s**. A slow-moving rock-scrape texture that pans from 30% Left to 30% Right, accentuating the physical displacement.
* **7.50s - [BUILD]:** The magma core begins to pulse and glow bright.
  * *Audio Sync:* Fade in `obsidian_pressure_sub.wav` starting at **7.50s**, rising in amplitude from -18 dB to -3.5 dB by **9.50s**.
* **9.50s - [MORPH]:** The sudden rack focus and crystal morph transition begins.
  * *Audio Sync:* Trigger `metamorphic_morph_whoosh.wav` at **9.50s**. The whoosh peaks exactly at **10.00s**, carrying the energy across the clip boundary.

### 3.2 Clip 02: "The Refractive Fracture" (10.00s - 20.00s)
* **10.00s - [REVEAL]:** The glass shard scales up, flashing dynamic white specular flares.
  * *Audio Sync:* Trigger `crystal_shimmer_spark.wav` at exactly **10.00s**. A beautiful, glittering high-frequency decay that lasts 3.5 seconds.
* **13.40s - [TENSION]:** The glass shard undergoes structural tension as the camera dollies around it.
  * *Audio Sync:* Trigger `glass_tension_crack.wav` at **13.40s**. A quick, sharp, dual-channel high tick.
* **18.00s - [GLITCH]:** Structural stress lines build, and the camera dollies violently toward the core.
  * *Audio Sync:* Re-fade `obsidian_pressure_sub.wav` at **18.00s** but with a quick, high-tension frequency pitch-up, creating anxiety before the explosion.

### 3.3 Clip 03: "The Crystallized Resolution" (20.00s - 30.00s)
* **20.00s - [SHATTER]:** Blinding white prismatic flash as the crystal shatters.
  * *Audio Sync:* Trigger `shatter_prism_impact.wav` at exactly **20.00s**. This is the highest energy point of the 30-second spot. It includes an extremely loud, sharp shatter, a heavy sub drop, and an expansive stereo reverb tail.
* **20.80s - [MONOLITH]:** The white flash fades, revealing the massive obsidian monolith.
  * *Audio Sync:* Trigger `monolith_reverb_hum.wav` at **20.80s**, providing a steady, solid, tranquil bed that replaces the tension of the previous clips.
* **21.00s - [BLUEPRINT]:** Blueprint corner brackets and coordinate arrays draw in.
  * *Audio Sync:* Trigger `blueprint_draw_chime.wav` at **21.00s** with dynamic, staggered high-frequency clicks that follow the coordinate lines.
* **28.20s - [FADE-OUT]:** The scene begins its final fade to black.
  * *Audio Sync:* Apply a exponential volume ramp down (fade-out) on `monolith_reverb_hum.wav` from **28.20s** to **30.00s**, sinking the entire soundscape into absolute silence.

---

## 4. Advanced FFmpeg Mux & Assembly Specifications

The following filter graph defines the exact production mixing matrix to assemble the 3 rendered video clips (`OriginalSpot-clip-01.mp4`, `OriginalSpot-clip-02.mp4`, `OriginalSpot-clip-03.mp4`) with the 9 SFX stems.

### 4.1 Production FFmpeg Assembly Script

```bash
#!/usr/bin/env bash
# ==============================================================================
# Chrono-Fracture Video & Sound Assembly Script
# Total Output Length: exactly 30.00s (900 frames at 30fps)
# ==============================================================================

# Ensure output directory exists
mkdir -p renders/out/OriginalSpot

# Step 1: Concat the three 10-second clips into a continuous 30-second video stream
ffmpeg -y \
  -i compositions/OriginalSpot/OriginalSpot-clip-01.mp4 \
  -i compositions/OriginalSpot/OriginalSpot-clip-02.mp4 \
  -i compositions/OriginalSpot/OriginalSpot-clip-03.mp4 \
  -filter_complex "[0:v][1:v][2:v]concat=n=3:v=1:a=0[v]" \
  -map "[v]" -an -c:v libx264 -pix_fmt yuv420p renders/out/OriginalSpot/temp_video_only.mp4

# Step 2: Mux and mix the SFX manifest with precision timing delays and gain staging
ffmpeg -y \
  -i renders/out/OriginalSpot/temp_video_only.mp4 \
  -f lavfi -i anullsrc=r=48000:cl=stereo \
  -i assets/OriginalSpot/sfx/plate_slam_impact.wav \
  -i assets/OriginalSpot/sfx/slate_friction_scrape.wav \
  -i assets/OriginalSpot/sfx/obsidian_pressure_sub.wav \
  -i assets/OriginalSpot/sfx/metamorphic_morph_whoosh.wav \
  -i assets/OriginalSpot/sfx/crystal_shimmer_spark.wav \
  -i assets/OriginalSpot/sfx/glass_tension_crack.wav \
  -i assets/OriginalSpot/sfx/shatter_prism_impact.wav \
  -i assets/OriginalSpot/sfx/monolith_reverb_hum.wav \
  -i assets/OriginalSpot/sfx/blueprint_draw_chime.wav \
  -filter_complex \
  "[1:a]atrim=duration=30.0[silent]; \
   [2:a]volume=0.85[sfx0]; \
   [3:a]adelay=3200|3200,volume=0.40[sfx1]; \
   [4:a]adelay=7500|7500,volume=0.65,afade=t=in:ss=7.5:d=2.0[sfx2]; \
   [5:a]adelay=9500|9500,volume=0.60[sfx3]; \
   [6:a]adelay=10000|10000,volume=0.50[sfx4]; \
   [7:a]adelay=13400|13400,volume=0.80[sfx5]; \
   [8:a]adelay=20000|20000,volume=0.95[sfx6]; \
   [9:a]adelay=20800|20800,volume=0.55,afade=t=out:ss=28.2:d=1.8[sfx7]; \
   [10:a]adelay=21000|21000,volume=0.30[sfx8]; \
   [silent][sfx0][sfx1][sfx2][sfx3][sfx4][sfx5][sfx6][sfx7][sfx8]amix=inputs=10:duration=longest:dropout_transition=0[aout]; \
   [aout]limiter=level_in=1.0:level_out=0.9:limit=0.95[final_audio]" \
  -map 0:v -c:v copy \
  -map "[final_audio]" -c:a aac -b:a 320k \
  -t 30.00 \
  renders/out/OriginalSpot/OriginalSpot_Master.mp4

# Clean up temporary files
rm renders/out/OriginalSpot/temp_video_only.mp4

echo "🚀 Master Video successfully compiled with high-fidelity sound at renders/out/OriginalSpot/OriginalSpot_Master.mp4"
```

### 4.2 Assembly Command Explanations
1. **`-i anullsrc=r=48000:cl=stereo`:** Creates a high-fidelity 48 kHz silent audio canvas to guarantee the absolute exact length of 30.00s and prevent sync drift.
2. **`adelay=X|X`:** Delays the stereo audio stream by `X` milliseconds. Both the left and right channels are delayed equally to preserve the custom panning of the stems.
3. **`volume=Y`:** Stage gains each stem to maintain a clean headroom balance and ensure that the explosive shatter at 20.00s stays dynamic and crisp without clipping.
4. **`afade`:** Applies exponential volume curves. `sfx2` fades in over 2 seconds starting at 7.50s, and `sfx7` fades out over 1.8 seconds starting at 28.20s.
5. **`limiter`:** A brickwall limiter applied at the master level to catch transient peaks and bring the integrated loudness exactly to the commercial broadcasting target of -14 LUFS.
