# HYPERFRAMES STYLE BIBLE — Chrono-Fracture (OriginalSpot)

**Purpose:** Translate *Metamorphic Glass & Obsidian* cinematic taste into **render-safe HyperFrames** without collapsing into template void-slop, gold HUD brackets, or ease-spam slideshows.

**Audience:** Sub-agents (`crew-story`, `crew-cd`, `crew-comp`, `crew-anim`, `crew-td`). Read this **after** `docs/PROJECT-AGENT-RULES.md` §2 and **before** any clip HTML.

---

## 1. What this spot is (and is not)

### Is

- **Geological sci‑fi:** pressure, fracture, refraction, resolution — time as a **physical material** (basalt, magma, crystal, obsidian).
- **Tactile macro cinema:** dust in backlight, plate grain, specular sweeps, camera mass (dolly, rack via scale/opacity/Z — never full-frame CSS blur).
- **Procedural luxury:** layered CSS geometry, SVG facets, canvas grain, optional **integration plates** from `assets/OriginalSpot/plates/` (derived from `references/`).
- **Three-act thermal arc:** hot compression (magma) → cold tension (cyan prism) → cool authority (obsidian monolith).

### Is not

- Generic cyber void + neon headline.
- Decorative **gold corner brackets**, HUD frames, or `RECIPE-MAP` layouts (repo ban — §7.1).
- Single full-screen stock photo with a fade (AL-01/AL-02 failure).
- `power2.out` on everything (AL-03).
- Lathe bottle / placeholder 3D (AL-W4) unless a real `.glb` is approved.

---

## 2. Taste anchors (keep these in every frame)

| Principle | Cinematic meaning | HyperFrames enforcement |
|-----------|-------------------|-------------------------|
| **Mass** | Plates feel tons heavy; crystal feels brittle | CustomEase `tectonicSlam` for impacts; `crystalLock` for optical locks; no `elastic.out` text slams |
| **Light is material** | Magma = viscosity; cyan = dispersion; white = specular peak only | Radial gradients + `mix-blend-mode: screen/overlay` on **layers**, not one gradient bg |
| **Depth is physical** | Foreground sharp, background falls away | `.depth-stage` + `.z-bg` / `.z-mg` / `.z-fg`; parallax on **camera rig** (`.grade-target` or `.camera-rig`) |
| **Texture is mandatory** | Film isn’t flat vector | Canvas `#grain` 15–22% opacity, `mix-blend-mode: overlay`; vignette `#vig` always |
| **Motion never sleeps** | Holds >0.8s still breathe | `breathEase` sine on scale/Y; debris drift; flare sweep loops **finite** repeats only |
| **Information is geological** | Readouts feel **surveyed**, not “dashboard” | Clip 03: **lithic survey traces** (see §6) — not corner brackets |

---

## 3. Palette → CSS tokens (do not drift)

Bind in `:root` / `originalspot-shared.js` (`OriginalSpot.colors`):

| Role | Hex | HSL (spec) | Use |
|------|-----|------------|-----|
| Vault void | `#070709` | 240°, 12%, 3% | `#root` solid bg — not pure `#000` (EL-C01) |
| Tectonic shale | `#232326` | 240°, 6%, 15% | Plate panels, monolith faces |
| Molten magma | `#f33f0b` | 14°, 95%, 48% | Fissure core, ember debris (~15% particles) |
| Chrono cyan | `#0ec2dd` | 188°, 88%, 46% | Refraction edges, survey lines, prism stroke |
| Specular peak | `#ffffff` | — | Flash frames ≤7 frames; flare cores |
| Muted slate | `#6e6e73` | 240°, 4%, 45% | Micro-labels, tick marks |

**Accent CSS:** `--g-x`, `--g-y` on vault bg for moving magma pool (GSAP tween radials).

---

## 4. Typography (editorial, not shouty)

| Use | Family | Weight | Tracking | Placement |
|-----|--------|--------|----------|-----------|
| Chapter whispers | **Cormorant Garamond** | 600 | 0.12em | Lower third, 18% opacity slate |
| Instrument readouts | **Courier Prime** | 400 | 0.28em | Along **stone edges** or survey grid — max 8 chars |

No Inter/Roboto/Poppins (EL-F01). No centered 120px hero type.

---

## 5. Layer stack (every clip — TD gate)

```text
#root (opaque bg #070709)
├── .solid-bg.clip                    [L0 track 0]
├── .plate-stage.clip                 [L1 integration — ref plates 8–18% overlay]
├── .depth-stage.clip / #vault-bg     [L1 atmosphere + radial magma]
├── .camera-rig.grade-target.clip     [L2 — ALL camera scale/rotate/x/y]
│   ├── .z-bg  (plates, panels, prism SVG)
│   ├── .z-mg  (debris, fissure, shards)
│   └── .z-fg  (flares, flash, type)
├── #vig.clip                           [L3 vignette]
└── #grain.clip (canvas)                [L3 film grain]
```

**Camera rule:** Only tween `.camera-rig` or `.grade-target` for dolly/pan/rack simulation.

**Rack-focus rule:** Background plates `autoAlpha` 1→0.35 + `scale` 1.05; foreground crystal `scale` 0.92→1 — **not** `filter: blur()`.

---

## 6. Clip-by-clip translation (cinematic → HyperFrames)

### Clip 01 — The Compression (0–10s)

**Viewer feels:** Geological pressure — walls closing, heat rising.

| Cinematic beat | Time (local) | HyperFrames implementation |
|----------------|--------------|----------------------------|
| Tectonic slam | 0.0–0.35 | `#plate-left/right` `x: ±0` from `±540px`, ease `tectonicSlam` |
| Dust drift | 0.2–10 | `OriginalSpot.spawnDebris(#dust-particles, 48, seed)` + per-particle `y`/`rotation` infinite-free loops with **repeat: 3–5** only |
| Magma breathe | 2.0–10 | `#fissure-light` opacity pulse + `--g-x/y` on `#vault-bg` |
| Rack to crystal | 7.5–10 | Plates fade back; `#crystal-seed` (small prism SVG) scales in; warm→cool crossfade on fissure color |

**Atmosphere (≥2 signals):** grain, vig, plate-stage with `ref-eclipse-gold.jpg` at 12% overlay, magma radial.

**Motion verbs:** `SLAM`, `DRIFT`, `GLOW`, `RACK`.

---

### Clip 02 — The Refractive Fracture (10–20s)

**Viewer feels:** Optical tension — light bending, structure about to fail.

| Cinematic beat | Time | HyperFrames implementation |
|----------------|------|----------------------------|
| Prism bloom | 0.0–0.4 | `crystalGeometricSVGs.prism` scale 0.6→1, `crystalLock` |
| Orbit pan | 0.4–8.0 | `.camera-rig` `rotationY` simulated via `skewY` + `x` sine **or** prism `transform: rotateY` stepped keyframes (deterministic) |
| Flare sweep | 1.0–7.5 | `.flare-band` divs, `xPercent` sweep, `mix-blend-mode: screen`, opacity 0→0.5→0 |
| Glitch tension | 13.4–18.0 | Micro `x` jitter on prism (4–6px, seeded), `repeat: 8` max |
| Shatter | 19.2–20.0 | Shard divs explode radially; `#impact-flash` white overlay 0.4 peak 3 frames |

**Sound sync:** B05–B08 on MASTER-TIMELINE.

**Motion verbs:** `ORBIT`, `FLARE`, `GLITCH`, `SHATTER`.

---

### Clip 03 — The Crystallized Resolution (20–30s)

**Viewer feels:** Order after chaos — monument, surveyed calm, fade to vault.

**Banned:** Gold corner brackets, void HUD grid, decorative frame lines.

**Approved replacement — Lithic survey traces:**

- Thin **1px** `chrono-cyan` lines along **monolith facet edges** (SVG same geometry as monolith, stroke-only overlay).
- **Courier Prime** ticks: `Δt`, `ρ`, `λ` — 8px from stone margin, not screen corners.
- Horizontal **seismograph** stroke draws L→R over 1.2s (`stroke-dashoffset` on SVG path) at bottom 18% — reads as instrumentation on rock, not UI chrome.

| Cinematic beat | Time | HyperFrames implementation |
|----------------|------|----------------------------|
| Post-flash reveal | 0.0–0.8 | Monolith `autoAlpha` 0→1 from white flash carry |
| Monolith dolly-out | 0.8–6.0 | `.camera-rig` `scale` 1.12→1.0, `y` 40→0 |
| Survey draw | 1.0–3.5 | `#survey-svg` paths `stroke-dashoffset` tween |
| Ambient breathe | 3.5–9.0 | Monolith `scale` 1±0.008 sine |
| Vault fade | 9.0–10.0 | `#vault-fade` opacity 0→1 on `#070709` |

**Motion verbs:** `MONOLITH`, `DRAW`, `BREATHE`, `FADE`.

---

## 7. GSAP / timeline contract

```js
// Per clip file
const CID = "OriginalSpot-clip-01";
const D = 10; // must match #root data-duration
OriginalSpot.registerEases(gsap);
const tl = gsap.timeline({ paused: true });
window.__timelines[CID] = tl;
// hf-seek: registered ONCE in shared helper or single listener — avoid double-seek (PERMANENT-MEMORY §2)
```

| Pattern | Ease | Duration band |
|---------|------|----------------|
| Impact | `tectonicSlam` | 0.12–0.35s |
| Optical lock | `crystalLock` | 0.4–1.2s |
| Camera drift | `breathEase` / `sine.inOut` | 2.5–7.5s |
| Flash | `power4.out` | ≤0.08s rise |

**Distribute eases:** max 4× `power2.out` per file (AL-03).

---

## 8. Assets & engine-lint (pipeline: full)

Procedural lane still needs **integration plates** for AL-04:

| File | Path | Role |
|------|------|------|
| Void glass mood | `assets/OriginalSpot/plates/ref-void-glass.jpg` | Copy from `references/` — plate-stage 10–15% |
| Eclipse gold | `assets/OriginalSpot/plates/ref-eclipse-gold.jpg` | Magma wash overlay clip 01 |

Static `src=` on every `<img>`. Optional `ASSETS-MANIFEST.json`.

No `fetch()`, `Date.now()`, `Math.random()` — use `mulberry32` / `OriginalSpot.spawnDebris` seeds.

---

## 9. Transitions (FFmpeg + in-clip)

| Join | Type | Implementation |
|------|------|----------------|
| 01→02 | Motivated hard cut + 3-frame dip | Assemble; optional 0.1s black in FFmpeg |
| 02→03 | Flash bridge | Clip 02 ends white; clip 03 starts on monolith |

In-clip WebGL/shader transitions: **≤3 per project** (SPEC) — this spot uses **0** (CSS/SVG only).

---

## 10. Quality checklist (human + QA)

Before clip approval at `t_hero`:

- [ ] 2+ atmosphere signals (grain, vig, plate, leak/flare, multi-layer)
- [ ] Camera on rig; no full-frame blur
- [ ] Beat readable in 2s (human CD pass)
- [ ] No gold brackets / dashboard template
- [ ] `npm run check` clean for this clip
- [ ] `npm run dev` scrub matches beat sheet verbs at wall times

---

## 11. Sub-agent map (this project)

| Agent | Reads | Writes |
|-------|-------|--------|
| `crew-story` | Brief | Story package §1 in `docs/motion-crew/projects/ORIGINAL-SPOT.md` |
| `crew-feasibility` | Beats | Tier table — all Tier A for this spot |
| `crew-cd` | Story + this bible | `VISUAL-STORYBOARD.md`, `BEAT-SHEET.md` |
| `crew-comp` | CD + bible §5–6 | Clip HTML layout **end-state** at `t_hero` |
| `crew-anim` | Comp HTML | `window.__timelines` + `originalspot-shared.js` |
| `crew-td` | Anim | Depth stack sign-off |
| `crew-integrator` | All | `index.html`, workflow matrix refresh via `project:prepare` |

Launch prompts: `docs/motion-crew/agents/originalspot/*.md`

---

*Chrono-Fracture — taste preserved by structure, not by copying old Obsidian30 templates.*
