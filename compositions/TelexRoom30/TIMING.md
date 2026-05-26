# TelexRoom30 — wall vs clip-local GSAP

Master root: **30.00s** @ **30fps** — root `index.html` (`data-composition-id="TelexRoom30"`).

| Clip | `data-start` (wall) | Local timeline |
|------|---------------------|----------------|
| 01 | 0 | 0–5s |
| 02 | 5 | 0–5s |
| 03 | 10 | 0–5s |
| 04 | 15 | 0–5s |
| 05 | 20 | 0–5s |
| 06 | 25 | 0–5s |

GSAP inside each `TelexRoom30-clip-*.html` is **clip-local** (t=0 at clip start). Canvas `hf-seek` handlers use **local** `e.detail.time` (0–5).
