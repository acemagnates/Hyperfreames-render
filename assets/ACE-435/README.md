# ACE-435 assets

## Narration

`narration.mp3` is currently a **58s silent placeholder** so `npm run check` succeeds when this project is wired as `index.html`. Replace it with your final VO (include **≥3s silence** after the last spoken syllable, wall ~55s, through ~58s total).

## SFX stems (FFmpeg assembly)

Per Master Timeline / manifest:

| Wall (s) | Stem | Notes |
|---------:|------|--------|
| 0.00 | `sfx/cinematic_drone.wav` | Full bed; outro decay per spec |
| 10.21 | `sfx/sub_bass_impact.wav` | WEAPONIZE |
| 22.70 | `sfx/whoosh.wav` | LOGIC / blueprint reveal |
| 30.92 | `sfx/glass_shatter.wav` | COPYRIGHTED |
| 43.00 | *(mix automation)* | SILENCE_DROP — duck VO + drone |
| 53.48 | `sfx/slam.wav` | CRIME |

Place files under `assets/ACE-435/sfx/` (paths match manifest `stem_file`).
