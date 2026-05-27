# VISUAL STORYBOARD — Chrysalis30

## Logline

**A flat digital world learns depth, mutates form, shatters into a thousand pieces, and fuses into one living core** — told entirely through morphing 2D typography, CSS 3D space, and staggered dimensional shards. No narrator: the *feeling* is the story.

**Emotional arc:** Curiosity → Vertigo → Ecstasy → Overwhelm → Transcendence → Stillness.

**Reference mood board (web — inspiration only, implementation is procedural/CSS):**

| Ref | URL | Use |
|-----|-----|-----|
| Liquid metal abstract | https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1080 | Morph clip color language (chrome + violet) |
| Neon tunnel depth | https://images.unsplash.com/photo-1550684848-26070a3dd14a?w=1080 | Fold clip perspective + rim light |
| Crystal fracture | https://images.unsplash.com/photo-1541701494587-43e8c0b3f0b2?w=1080 | Stagger shard material |
| Cosmic core | https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=1080 | Fusion nucleus glow |

---

## Clip 01 — FLATLAND (0.00s – 5.00s)

### Narrative & emotion
> **Emotion:** Clinical curiosity  
> **Goal:** Establish a *pure 2D* universe — data without depth. The audience should feel “this is a screen, not a world.”

### Visual representation
- **Dominant plane:** Single Z=0 layer; orthographic grid at 0° (no perspective).
- **Hero:** Monospace HUD `DIMENSION // 0` + kinetic label `FLATLAND`.
- **Motion:** Scanline sweep; grid cells pulse in **row stagger** (2D only).
- **Tease:** Final 0.8s — entire plane **lifts** `rotateX(12deg)` hinting 3D without fully committing.

### Depth stack
- L0: `#050508` solid + fine grid (1px lines, 48px pitch).
- L1: Floating 2D glyphs (Courier) — no translateZ.
- L2: Cyan scan beam (horizontal, 4px, blur 0 — not full-frame blur).

### SFX co-design
- **0.00s** bed: low digital hum  
- **0.35s** HOOK: soft glitch tick when “FLATLAND” locks in  

---

## Clip 02 — THE FOLD (5.00s – 10.00s)

### Narrative & emotion
> **Emotion:** Vertigo / awe  
> **Goal:** The grid **folds** into a corridor — 2D becomes 3D through camera + CSS perspective (not tutorial primitives).

### Visual representation
- **Technique:** `perspective: 1400px` stage; floor + ceiling grid lines converge to vanishing point.
- **Morph:** Clip-path on a mask reveals “tunnel mouth” widening.
- **Typography:** `DEPTH ONLINE` extruded via layered text-shadow stacks (fake 3D), real Z on panels.
- **Camera:** Dolly `translateZ(-80px → 120px)` + `rotateX(8deg → -4deg)`.

### Reference feel
Neon corridor photography (see mood board) — violet key, cyan rim, zero fog blur on full frame.

### SFX
- **5.00s** WHOOSH: air rush as fold begins  
- **7.20s** SUB: bass pulse when vanishing point aligns center  

---

## Clip 03 — MORPHESIS (10.00s – 16.00s)

### Narrative & emotion
> **Emotion:** Organic ecstasy  
> **Goal:** **Morphing** between circle ↔ diamond ↔ fluid blob using `border-radius` + `clip-path` GSAP — 2D shapes that *feel* 3D via lighting gradients.

### Visual representation
- Three **morph blobs** (divs, 420–680px) with mesh gradients, `mix-blend-mode: screen`.
- Each blob cycles: `border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%` → `50%` → `polygon(...)` via GSAP Morph pattern (manual keyframes).
- **2D↔3D bridge:** Blobs sit on `translateZ(40px / 0 / -60px)` alternating — parallax against dark void.
- Label: `METAMORPH` with letter stagger (3D rotateX per char).

### SFX
- **10.00s** shimmer texture bed rises  
- **12.40s** wet morph swipe  
- **14.80s** glassy tick on METAMORPH lock  

---

## Clip 04 — STAGGER FIELD (16.00s – 22.00s)

### Narrative & emotion
> **Emotion:** Overwhelming beauty / information avalanche  
> **Goal:** **Staggering** entrance of 28 glass shards — each a mini composition (gradient + edge highlight) — spiraling from off-screen Z.

### Visual representation
- **Layout:** Fibonacci-spiral placement in XY; Z from -400px to +200px.
- **Stagger:** GSAP `stagger: { each: 0.055, from: "random" }` + `back.out(1.4)`.
- **Material:** Shard = clipped rectangle with diagonal specular (CSS linear-gradient), thin cyan border.
- **2D/3D:** Shards are DOM planes in `preserve-3d`; occasional shard flips `rotateY(180deg)` exposing “back” (darker gradient).

### SFX
- **16.00s** cascade of micro-clicks (staggered delays 0–1.2s) — one stem, volume automation in manifest  
- **20.50s** swarm bass swell  

---

## Clip 05 — FUSION CORE (22.00s – 27.00s)

### Narrative & emotion
> **Emotion:** Transcendence  
> **Goal:** All shards **suck** into center core; morph into single pulsing **luminous nucleus** (radial gradients + scale breathe).

### Visual representation
- Shards: `x/y/z → 50% center`, `scale → 0`, `opacity → 0` over 2.2s.
- Core: 360px orb, `box-shadow` rings (no full-frame blur), colors `#7b5cff` → `#2ee8d6`.
- Typography: `FUSION` scales from 0.3 → 1 with overshoot.

### SFX
- **22.00s** vacuum whoosh (reverse)  
- **24.60s** PAYOFF slam + sub when core ignites  

---

## Clip 06 — MIRROR (27.00s – 30.00s)

### Narrative & emotion
> **Emotion:** Stillness / invitation  
> **Goal:** Symmetric **mirror** composition — top/bottom reflection — title `CHRYSALIS` + tagline `2D · 3D · ONE`.

### Visual representation
- Core orb reflected via `scaleY(-1)` with gradient fade mask (not filter: blur on full frame).
- Slow `rotateZ(0 → 3deg)` on entire stage.
- Fade to black last 0.4s.

### SFX
- **27.00s** gentle chime  
- **28.80s** silence drop before final fade  

---

## Global design system

| Token | Value |
|-------|--------|
| Canvas | 1080×1920 @ 30fps |
| Void | `#050508` |
| Violet key | `#7b5cff` |
| Cyan rim | `#2ee8d6` |
| Magenta accent | `#ff4d8d` |
| Type HUD | `JetBrains Mono`, `Syne` |
| Camera rule | Continuous motion every clip — no static holds > 0.4s |
| Banned | Full-frame CSS blur, `repeat:-1`, `fetch()`, tutorial Three.js heroes |
