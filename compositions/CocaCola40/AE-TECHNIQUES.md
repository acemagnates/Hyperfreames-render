# AE Techniques → HyperFrames — CocaCola40

**Purpose:** Concrete After Effects craft translated to HTML/CSS/GSAP/canvas for clips `CocaCola40-clip-01` … `06`. Not slider demos — layered comps, blend modes, matte stacks, time choreography.

**Alignment:** [`motion-principles.md`](../../.agents/skills/hyperframes/references/motion-principles.md) (vary ease/speed/direction; build/breathe/resolve; `fromTo` on `tl`; no stacked transforms on one node; ambient on seekable timeline). [`cinematic-lighting.md`](../../.agents/skills/hyperframes/references/cinematic-lighting.md) (parametric `--accent-rgb`; no God Rays + anamorphic flare in same scene; localized streaks, not full-frame blur).

**Clip map (wall):**

| Clip | Act | Primary AE stack |
|------|-----|------------------|
| 01 | I — VOID | Light leak, chromatic title, crush grade, optical flare |
| 02 | II — MACRO COLD | Track matte drip, specular sweep, light rim |
| 03 | III — POUR | Track matte / speed ramp, velocity blur, impact flash |
| 04 | IV — HERO GLASS | Rim + anamorphic flare (no god rays), crush on comp |
| 05 | V — RED WORLD | Displacement shimmer, chromatic accents, crush |
| 06 | VI — LOCK | Overshoot SLAM, optical sparkle streak, crush punch |

**HyperFrames rules (all clips):** Register on `window.__timelines[CID]`; only `tl.fromTo` / `tl.to` / `tl.set`; kill exits with `tl.set(..., { visibility: "hidden" })`; `repeat` = finite (`Math.ceil(D / loopDur) - 1`); parent/child split when entrance + Ken Burns share one subject.

---

## 1. Track matte / luma matte reveal

**AE:** A matte layer (often B&W video or animated gradient) drives transparency via *Track Matte → Luma* or *Alpha*. The fill layer is clipped to bright areas of the matte as it animates.

**HyperFrames:** Duplicate stack — bottom = full plate; top = same or hero plate inside a wrapper whose `clip-path` or `mask-image` is animated. For “luma” behavior without video mattes, animate `clip-path: inset()` or a linear gradient mask on the wrapper (bright = revealed). Do not use `filter: blur()` on the full frame.

```html
<div class="plate-base"><img class="clip ice-plate" src="…" alt="" /></div>
<div class="matte-reveal">
  <img class="clip ice-plate" src="…" alt="" />
</div>
```

```css
.matte-reveal {
  position: absolute;
  inset: 0;
  overflow: hidden;
  clip-path: inset(100% 0 0 0); /* hidden: wipe from top */
  will-change: clip-path;
}
/* Optional soft luma edge: mask instead of hard clip */
.matte-reveal--soft {
  clip-path: none;
  mask-image: linear-gradient(to bottom, #000 0%, #000 var(--reveal, 0%), transparent calc(var(--reveal, 0%) + 8%));
  -webkit-mask-image: linear-gradient(to bottom, #000 0%, #000 var(--reveal, 0%), transparent calc(var(--reveal, 0%) + 8%));
}
```

```js
const tl = window.__timelines[CID];
const reveal = { pct: 100 };
function paintMatte() {
  document.querySelector(".matte-reveal").style.clipPath =
    `inset(${reveal.pct}% 0 0 0)`;
}
tl.fromTo(reveal, { pct: 100 }, { pct: 0, duration: 1.4, ease: "power3.inOut", onUpdate: paintMatte }, 0.35);
tl.fromTo(".spec-sweep", { xPercent: -120, opacity: 0 }, { xPercent: 120, opacity: 0.35, duration: 0.9, ease: "power2.inOut" }, 0.8);
```

**Clips:** **02** (ice drip / condensation reveal), **03** (pour column unmask on `.pour-wrap` — already `clip-path:inset(100% 0 0 0)`; drive with same pattern).

---

## 2. Light leak (screen blend gradient sweep)

**AE:** Orange/red film-stock leak on a duplicate comp, *Blend Mode: Screen*, often a soft gradient band that sweeps diagonally across the edit point.

**HyperFrames:** Full-frame overlay `mix-blend-mode: screen` + `pointer-events: none`; animate position/opacity on `tl` only. Use Coca-Cola red gel from `--accent-rgb`, not flat white. Pair with vignette on a separate layer (multiply), not blur.

```html
<div class="leak-layer clip" data-start="0" data-duration="5" data-track-index="90"></div>
```

```css
.leak-layer {
  position: absolute;
  inset: -20%;
  z-index: 90;
  pointer-events: none;
  mix-blend-mode: screen;
  opacity: 0;
  background: linear-gradient(
    118deg,
    transparent 30%,
    rgba(var(--accent-rgb, 230, 0, 18), 0.55) 48%,
    rgba(255, 180, 80, 0.35) 52%,
    transparent 70%
  );
  transform: translateX(-40%) rotate(-8deg);
}
```

```js
tl.fromTo(".leak-layer",
  { xPercent: -40, opacity: 0 },
  { xPercent: 35, opacity: 0.85, duration: 2.2, ease: "sine.inOut" },
  0.15
);
tl.to(".leak-layer", { opacity: 0, duration: 0.6, ease: "power2.in" }, 2.8);
```

**Clips:** **01** (void wake — wall 0–5s), subtle return on **06** (36s logo hit, short 0.4s leak, no god rays in same shot).

---

## 3. Chromatic aberration (RGB split duplicate text)

**AE:** *Shift Channels* or duplicated text with R/G/B offsets and slight scale difference; strongest on high-contrast edges during impact frames.

**HyperFrames:** Three absolutely positioned copies of the headline (or one parent + three children), `mix-blend-mode: screen` optional on colored channels only; offset `x`/`y` in px, animate separation on SLAM then collapse to 0. Never blur the whole frame.

```html
<h1 class="title-stack">
  <span class="ch ch-r" aria-hidden="true">REAL MAGIC</span>
  <span class="ch ch-g" aria-hidden="true">REAL MAGIC</span>
  <span class="ch ch-b">REAL MAGIC</span>
</h1>
```

```css
.title-stack { position: relative; }
.ch { position: absolute; inset: 0; }
.ch-r { color: #ff2a2a; mix-blend-mode: screen; transform: translate(-3px, 0); }
.ch-g { color: #2aff9a; mix-blend-mode: screen; transform: translate(2px, 1px); opacity: 0.7; }
.ch-b { color: #fff; position: relative; }
```

```js
tl.fromTo(".ch-r", { x: -14, y: 2, opacity: 0.9 }, { x: -4, y: 0, duration: 0.35, ease: "power3.out" }, 0.2);
tl.fromTo(".ch-g", { x: 12, y: -2, opacity: 0.8 }, { x: 3, y: 0, duration: 0.35, ease: "power3.out" }, 0.2);
tl.fromTo(".ch-b", { scale: 1.08, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(2)" }, 0.22);
```

**Clips:** **01** (chapter title in void), **05** (kinetic type accents on beat), **06** (pre-SLAM 0.1s split then collapse at slam).

---

## 4. Velocity blur (motion streak clones, opacity trail)

**AE:** *CC Force Motion Blur* or duplicated subframes with directional smear; for still plates, ghost layers offset along motion vector with falling opacity.

**HyperFrames:** 4–7 clone nodes of the moving subject (pour stream, splash, logo shard), same asset, staggered `x`/`y` and `opacity`; animate parent motion on wrapper, streak offsets on children. Linear ease on clones (`ease: "none"`). No CSS `filter: blur()` on full frame.

```html
<div class="pour-velocity">
  <div class="streak s0"><img src="…" alt="" /></div>
  <div class="streak s1">…</div>
  <!-- s2–s4 -->
  <div class="streak core">…</div>
</div>
```

```css
.streak { position: absolute; inset: 0; opacity: 0; pointer-events: none; }
.streak img { width: 100%; height: 100%; object-fit: cover; }
```

```js
const streaks = [".s0", ".s1", ".s2", ".s3", ".s4"];
streaks.forEach((sel, i) => {
  const lag = i * 0.04;
  tl.fromTo(sel,
    { y: 80 + i * 22, opacity: 0.35 - i * 0.06 },
    { y: -40, opacity: 0, duration: 0.55, ease: "none" },
    1.05 + lag
  );
});
tl.fromTo(".pour-velocity", { y: 40 }, { y: -120, duration: 0.7, ease: "power4.in" }, 1.0);
```

**Clips:** **03** (pour downbeat ~10s wall), light use on **06** (sparkle shards only, 0.25s).

---

## 5. Optical flare (anamorphic streak, not full-frame blur)

**AE:** Lens flare bundle: bright core + horizontal anamorphic streak, *Add*/*Screen*, drifting with camera move — localized, not gaussian blur on the comp.

**HyperFrames:** Follow cinematic-lighting §5 — `flare-core` + `flare-streak`, `mix-blend-mode: screen`, accent RGB. **Do not** combine with god-ray overlay in the same clip (04 picks flare OR rim sweep, not both heavy).

```html
<div class="lens-flare-container">
  <div class="flare-core clip" data-start="0" data-duration="8" data-track-index="28"></div>
  <div class="flare-streak clip" data-start="0" data-duration="8" data-track-index="29"></div>
</div>
```

```css
.lens-flare-container {
  position: absolute; inset: 0; pointer-events: none; z-index: 28;
  mix-blend-mode: screen; overflow: hidden;
}
.flare-streak {
  width: 250%; height: 6px; left: -75%; top: 42%;
  background: linear-gradient(90deg, transparent 0%,
    rgba(var(--accent-rgb, 230, 0, 18), 0.05) 20%,
    rgba(var(--accent-rgb, 230, 0, 18), 0.75) 50%,
    rgba(var(--accent-rgb, 230, 0, 18), 0.05) 80%, transparent 100%);
  transform: translateY(-50%) rotate(-3deg);
}
```

```js
tl.fromTo(".flare-core", { left: "8%", opacity: 0 }, { left: "72%", opacity: 0.7, duration: D, ease: "sine.inOut" }, 0.3);
tl.fromTo(".flare-streak", { left: "-75%", opacity: 0 }, { left: "-50%", opacity: 1, duration: D, ease: "sine.inOut" }, 0.3);
```

**Clips:** **01** (subtle streak on void), **04** (hero orbit — primary flare scene), **06** (38.5s sparkle: short streak burst, 0.5s).

---

## 6. Speed ramp feel (staggered time offsets via timeline segments)

**AE:** *Time Remapping* with easy-eased hold keys: slow → fast → slow on pour or camera move.

**HyperFrames:** No true time-remap — fake with **segmented tweens** on the same target: long `duration` + `ease: "power4.in"` for acceleration, short burst segment with `ease: "power2.out"` for decel. Sub-layers get **negative/positive position offsets** on one `tl` (pour mask, splash, streaks) so they “lead” or “lag” the master move.

```js
// Master pour mask — slow start, violent mid, settle
tl.fromTo(reveal, { pct: 92 }, { pct: 40, duration: 0.9, ease: "sine.inOut" }, 0.2);
tl.to(reveal, { pct: 0, duration: 0.35, ease: "power4.in", onUpdate: paintMatte }, 1.1);
tl.to(reveal, { pct: 0, duration: 0.8, ease: "sine.out", onUpdate: paintMatte }, 1.45); // hold open

// Sub-layer lag: splash leads by 0.08s
tl.fromTo(".splash-hit", { scale: 0.6, opacity: 0 }, { scale: 1.15, opacity: 1, duration: 0.12, ease: "power4.out" }, 1.02);
tl.to(".splash-hit", { scale: 1, opacity: 0.6, duration: 0.5, ease: "power2.in" }, 1.14);
```

**Clips:** **03** (core technique), **04** (camera orbit segments: 0–2s slow, 2–5s fast sweep, 5–8s breathe).

---

## 7. Crush grade (CSS filter stack: contrast + saturate)

**AE:** *Levels* crush blacks + *Hue/Saturation* punch on reds; often on adjustment layer above plate.

**HyperFrames:** Apply to **wrapper** around plate/comp, not per-tween on same node as transform. Animate filter values via `tl.fromTo` on a proxy object + `onUpdate`, or discrete keys at beat boundaries. Keep backgrounds solid `#050508` — crush is for photographic plates and hero comp only.

```js
const grade = { contrast: 1.05, saturate: 1.1, brightness: 1.0 };
const plate = document.querySelector(".grade-target");
function paintGrade() {
  plate.style.filter =
    `contrast(${grade.contrast}) saturate(${grade.saturate}) brightness(${grade.brightness})`;
}
tl.fromTo(grade,
  { contrast: 0.92, saturate: 0.85, brightness: 0.9 },
  { contrast: 1.25, saturate: 1.45, brightness: 1.02, duration: 1.8, ease: "power2.inOut", onUpdate: paintGrade },
  0.1
);
// Resolve: punch then settle
tl.to(grade, { contrast: 1.15, saturate: 1.3, duration: 0.4, ease: "power2.out", onUpdate: paintGrade }, D - 0.6);
```

**Clips:** **01** (void plate), **03** (pour plate), **04** (bottle comp export / canvas capture layer), **05** (red world plates), **06** (final 1s crush punch before hold).

---

## 8. Overshoot SLAM (`back` / `elastic` + scale)

**AE:** Scale pop 115% → 100% with overshoot easing on logo lock-up; often 2–3 frames of RGB split (see §3) on the same beat.

**HyperFrames:** **Medium weight** element (`back.out(1.7)` or `elastic.out(1, 0.4)` sparingly — one hero per clip max. Entrance uses `.out`; exit faster with `.in`. Sync to wall **36.00s** logo slam in `TIMING.md`.

```js
tl.fromTo(".logo-lock",
  { scale: 1.35, opacity: 0, rotation: -2 },
  { scale: 1, opacity: 1, rotation: 0, duration: 0.55, ease: "back.out(2.2)" },
  4.0 // clip-06 local ~4s = wall 36s
);
tl.fromTo(".logo-glow",
  { scale: 0.8, opacity: 0 },
  { scale: 1.12, opacity: 0.5, duration: 0.35, ease: "power2.out" },
  4.0
);
tl.to(".logo-lock", { scale: 1.02, duration: 0.2, ease: "sine.inOut" }, 4.55);
tl.set(".logo-lock", { visibility: "visible" }, 4.0);
```

**Clips:** **06** (primary), micro-SLAM on **05** (typographic hit at wall 24s, `back.out(1.4)` only on keyword).

---

## 9. Displacement shimmer (`background-position` sine on texture)

**AE:** *Displacement Map* with soft moving noise → subtle heat-haze on red typography or label texture.

**HyperFrames:** Tiled or large `background-image` on type panel; drive `backgroundPosition` with sine via `onUpdate` on seekable `tl` (not `requestAnimationFrame`). Separate from transform on text — shimmer on `.type-panel` wrapper, text opacity/tracking on child.

```css
.type-panel {
  background-image: url("../assets/CocaCola40/plates/v2/red-noise-tile.jpg");
  background-size: 200% 200%;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
```

```js
const shim = { phase: 0 };
const panel = document.querySelector(".type-panel");
tl.to(shim, {
  phase: Math.PI * 4,
  duration: D,
  ease: "none",
  onUpdate: () => {
    const x = Math.sin(shim.phase) * 12;
    const y = Math.cos(shim.phase * 0.7) * 8;
    panel.style.backgroundPosition = `${50 + x}% ${50 + y}%`;
  }
}, 0.5);
```

**Clips:** **05** (RED WORLD kinetic cathedral), optional subtle on **02** macro label only during breathe (30–70% of clip).

---

## Per-clip implementation checklist

| Technique | 01 | 02 | 03 | 04 | 05 | 06 |
|-----------|:--:|:--:|:--:|:--:|:--:|:--:|
| Track matte | | ● | ● | | | |
| Light leak | ● | | | | | ○ |
| Chromatic | ● | | | | ● | ● |
| Velocity blur | | | ● | | | ○ |
| Optical flare | ○ | | | ● | | ● |
| Speed ramp | | | ● | ● | | |
| Crush grade | ● | ○ | ● | ● | ● | ● |
| Overshoot SLAM | | | | | ○ | ● |
| Displacement shimmer | | ○ | | | ● | |

● = primary · ○ = accent only

---

## Scene structure reminder (per clip)

| Phase | % of clip | Motion |
|-------|-------------|--------|
| Build | 0–30% | Staggered entries; first tween ≥0.1s offset |
| Breathe | 30–70% | One ambient: flare drift, shimmer phase, or slow Ken Burns on child |
| Resolve | 70–100% | Faster exit than entrance; `tl.set` kill |

**Weight:** void/macro plates = **Heavy** (`sine.inOut`, 1.2s+); pour/splash = **Medium**; leaks/flares/streaks = **Volumetric**; logo SLAM = **Medium** with `back.out`.

---

## Shared hook

Use `window.CocaCola40` from `cocacola40-shared.js` for `makeTimeline(CID, D)`, `--accent-rgb`, and vignette helpers. Each technique registers only on `window.__timelines[CID]` for that clip file.

**Do not edit clips in this pass** — wire techniques during clip rebuild per `PRODUCTION-PLAN-V2.md` agents D/E.
