# CocaCola40 — Sound design (V2)

## Philosophy

V1 used a single **40s dramatic music bed** at ~88% gain, with thin procedural SFX on top. That masked weak scene design and fought the visual beats.

**V2 is SFX-first:** each clip gets a **designed hit** at a fixed wall time (see `compositions/CocaCola40/TIMING.md`). Music is optional: a short **underbed** at ≤28% only if `music/underbed.mp3` exists. No random long track required for assembly.

## Manifest

| File | Purpose |
|------|---------|
| `sfx-manifest.v2.json` | Wall times, stems, gains, search queries |
| `sfx-manifest.json` | Legacy V1 (deprecated for assembly) |

### Wall map (40s spot)

| Wall (s) | Event | Scene |
|----------|-------|-------|
| 0.35 | Cold room tone + sub | 01 void |
| 5.00 | Ice crack / glass tick | 02 macro |
| 10.00 | Pour liquid + fizz burst | 03 pour |
| 16.00 | Hero rise / air swell | 04 hero |
| 24.00 | Typographic whoosh | 05 type |
| 32.00 | Build | 06 lock (pre-slam) |
| 36.00 | Logo slam + glass clink | 06 lock |
| 38.50 | Carbonation fizz tail | 06 outro |

## Stems

Directory: `assets/CocaCola40/sfx/v2/` (max ~5s each, 48 kHz stereo WAV).

| Stem | Scene verb |
|------|------------|
| `cold_room_tone_sub.wav` | Refrigerated hum + sub pulse |
| `ice_crack_glass_tick.wav` | High tick / ice fracture |
| `pour_liquid_fizz_burst.wav` | Lowpassed pour + fizz layer |
| `hero_rise_air_swell.wav` | Pink air swell + low lift |
| `typographic_whoosh.wav` | Fast band-limited whoosh |
| `build_rise.wav` | Short riser into logo |
| `logo_slam_glass_clink.wav` | Sub slam + glass tick |
| `carbonation_fizz_tail.wav` | High fizz sparkle tail |

### Acquisition

1. **Preferred:** Freesound (CC0) via `tools/sfx-mcp/.env` + `FREESOUND_API_TOKEN`, then Openverse fallback.
2. **CLI:** `node scripts/cocacola40-acquire-v2-stems.mjs`
3. **Fallback:** Scene-tuned **ffmpeg lavfi** recipes in that script (not generic sine beeps).

Log CC-BY picks in `sfx-ATTRIBUTION.md` if you swap to attribution-licensed sources.

## Assembly

```bash
# After CI render download to renders/out/CocaCola40/
npm run assemble:cocacola40:v2
# or
bash scripts/assemble-cocacola40-v2.sh [artifact_dir]
```

Output: `renders/out/CocaCola40/CocaCola40-v2.mp4`

Legacy `assemble:cocacola40` still requires `music/dramatic-bed-40s.mp3` and is **not** the V2 path.

## Optional underbed

Place a **short loop or stem** (not a full random 40s bed) at:

`assets/CocaCola40/music/underbed.mp3`

Manifest default gain: **0.28**, with 0.8s fade-in and 2s fade-out before 40s. Omit the file for **SFX-only** output.

## Acceptance

- [ ] Eight stems on disk under `sfx/v2/`
- [ ] `sfx-manifest.v2.json` wall times match `TIMING.md`
- [ ] Assemble completes without `dramatic-bed-40s.mp3`
- [ ] Hits audible at clip boundaries (pour @ 10s, logo @ 36s)
