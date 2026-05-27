# CocaCola40 — PRODUCTION PLAN V2 (no shortcuts)

**Status:** Active rebuild · **Wall:** 40.0s · **Render:** GitHub `acemagnates/Hyperfreames-render` only

## Rejection list (V1 failures)

- No Unsplash “mood” abstractions as scene stand-ins
- No `LatheGeometry` programmer bottle / white plane label
- No single 40s music bed masking weak sound design
- No uniform `power2.out` / template HUD / first-slider GSAP

## V2 pillars

1. **Real plates** — Reference-sourced stills (pour, ice, bottle, condensation, red atmosphere) in `assets/CocaCola40/plates/v2/` with `ASSETS-MANIFEST.json` (URL, license note, usage per clip).
2. **Realistic hero 3D** — `assets/CocaCola40/models/bottle.glb` (CC0/CC-BY glTF) + image-based textures; CI-safe faux glass (no transmission).
3. **After Effects craft in HTML/GSAP** — track-matte style reveals, light leak overlays, chromatic split, velocity blur simulation (streak layers), optical flare, crush grades, overshoot SLAM, speed ramp (time-remap via timeline seek segments).
4. **Designed sound** — Per-scene SFX stems (cold, pour, fizz, glass, whoosh, logo hit); music optional underbed ≤35% or act-only swells.

## Clip map (unchanged wall times)

| Clip | Wall | AE / craft focus | Visual source |
|------|------|------------------|---------------|
| 01 void | 0–5s | Light leak + vignette animate; chromatic title; camera push | Dark plate + red gel overlay |
| 02 macro | 5–10s | Track-matte drip reveal; specular sweep | Real ice/condensation photo |
| 03 pour | 10–16s | Speed ramp pour mask; particle burst; impact flash | Real pour/splash photo sequence or high-res still |
| 04 hero | 16–24s | GLB product orbit; rim pass; floor reflection | bottle.glb + HDRI-style gradient env |
| 05 type | 24–32s | Kinetic type + displacement shimmer; bottle comp layer | Photo bottle cutout OR 3D render layer |
| 06 lock | 32–40s | Strobe sparkle; wave stroke; logo SLAM + fizz tail | Vector + comp |

## Sub-agent ownership

| Agent | Deliverable |
|-------|-------------|
| A — Assets | `plates/v2/*`, `ASSETS-MANIFEST.json`, optional `bottle.glb` |
| B — SFX | `sfx-manifest.v2.json`, downloaded stems in `assets/CocaCola40/sfx/v2/` |
| C — Motion AE bible | `AE-TECHNIQUES.md` implementation notes |
| D — Clips 01–03,05–06 | Rewritten HTML + shared JS v2 |
| E — Clip 04 3D | `cocacola40-three-hero.js` + clip-04 rewrite |
| F — Integrate | index, assemble script, workflow verify |

## Acceptance gates (before render)

- [ ] Every clip references manifest assets (no cosmic-nebula-as-pour)
- [ ] Clip 04 loads GLB; silhouette reads as beverage bottle at t=4s
- [ ] `npm run check` 0 errors
- [ ] SFX manifest maps 1:1 to scene verbs in TIMING.md
- [ ] Mirror sync pushed

## Render command

`RENDER_WORKFLOW=render-cocacola40.yml npm run render` → download → `npm run assemble:cocacola40`
