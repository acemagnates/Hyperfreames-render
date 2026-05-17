# CALENDAR-654 assets

- **`narration.mp3`** — Replace the checked-in silent placeholder with the final VO (≥3s silence after last word for assembly `-shortest`).
- **`sfx/`** — Drop stems from the Stage 3.5 manifest (`sfx-manifest.json` in this folder): `sub_bass_impact.wav`, `whoosh_swish.wav`, `record_scratch.wav`, `glass_shatter.wav`, `bass_drop.wav`. SILENCE_DROP is a mix decision only (duck stems), not a file.

Wall times in `sfx-manifest.json` are **master timeline** seconds (same origin as `index.html`).
