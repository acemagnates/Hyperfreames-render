# ACE-435 — build notes

- **Wall vs local GSAP:** see `compositions/ACE-435/TIMING.md`.
- **Shared motion:** `compositions/ACE-435/ace435-shared.js` — use **project-root-relative** `src` in clip HTML (not `./ace435-shared.js` alone).
- **CI / EPIPE:** If a clip fails in GitHub Actions with streaming pipe errors, lower `render_fps` to `30` for that matrix row or split the composition and concat with FFmpeg.
