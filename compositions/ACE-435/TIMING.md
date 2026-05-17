# ACE-435 — wall time vs clip-local GSAP

Master root timeline: **58.00s** @ **60fps** — repo root `index.html` (`data-composition-id="ACE-435"`).

| Event | Wall `data-start` | Clip `data-duration` | Notes |
|------:|------------------:|---------------------:|--------|
| 01 Hook | 0.00 | 8.64 | Hero words at wall 5.01 / 6.37 / 6.99 = local same |
| bridge | 8.64 | 0.28 | To 8.92 |
| 02 Weaponize | 8.92 | 2.73 | WEAPONIZE wall 10.21 → local **1.29s** |
| 03 Context | 11.65 | 8.979 | 400 / QUANTS / SYNTAX locals **1.31 / 4.03 / 7.99** |
| bridge | 20.629 | 0.111 | Float-safe gap before mechanism |
| 04 Mechanism | 20.741 | 8.909 | WHOOSH wall 22.70 → local **1.959**; UNTRACEABLE **2.66**; DARK POOL **3.58**; ALGORITHM **8.03** |
| 05 Corporate | 29.65 | 4.35 | COPYRIGHTED **1.27**; VOCABULARY **2.85** |
| bridge | 34.00 | 0.28 | To sting |
| 06 Sting | 34.28 | 8.838 | INFRINGING **5.67**; IP **8.16**; ray from **0.72** |
| 07 Resolution | 43.119 | 6.561 | ENCRYPTION **5.01**; KEY **5.98** |
| bridge | 49.68 | 0.28 | To outro |
| 08 Outro | 49.96 | 8.04 | CRIME **3.52**; SPEAK **4.30**; hold through **58.00** |

**HyperFrames rule:** GSAP times inside each clip file are **clip-local** (0 = clip start). Assembly `data-start` is **wall**.

**Lint note:** Slight nudges on clip03 duration, gap011, clip04 start, clip06 duration, and clip07 start/duration avoid same-track floating-point overlap at cuts.
