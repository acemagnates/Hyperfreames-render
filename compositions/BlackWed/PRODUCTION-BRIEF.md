# HYPERFRAMES PRODUCTION BRIEF — "BLACK WEDNESDAY"
## £10,000,000,000 — THE NIGHT SOROS BROKE THE BANK OF ENGLAND
**HF-BLACKWED-001 | 30 seconds | 1080 × 1920 | 30fps | Hybrid CSS + Three.js**

---

## PART I — CREATIVE BRIEF

**THE STORY:** September 16, 1992. Overnight, George Soros's Quantum Fund short-sold
£10 billion in sterling. The Bank of England raised its base rate from 10% to 15%
in a single day. Then surrendered. Britain crashed out of the European Exchange Rate
Mechanism. The Bank lost £3.3 billion. Soros pocketed $1 billion by morning.

**THE EMOTIONAL ARC:**

| Time | State | Feeling |
|------|-------|---------|
| 0:00–0:05.5 | Institutional Confidence | A room built to hold power |
| 0:05.5–0:09.5 | The Document Arrives | Someone has done something irreversible |
| 0:09.5–0:12.0 | Mechanical Pressure | Numbers fall like physical blows |
| 0:12.0–0:14.5 | Structural Rupture | The interface shatters into architecture |
| 0:14.5–0:22.5 | The Institution Stands — Then Doesn't | Power, then the absence of it |
| 0:22.5–0:26.5 | Currency Rain | The building becomes what it defended |
| 0:26.5–0:30.0 | The Void | £3.3 billion can look like nothing |

**DIRECTOR'S MANDATE:** This is not a presentation about a financial event. It is a
30-second film about the physical weight of institutional failure. Every element has
mass. The camera has memory. Sound is physics, not decoration. Nothing floats
arbitrarily. Everything is somewhere specific for a specific reason.

---

## PART II — AESTHETIC SIGNATURE
*(These values ARE the flavor — do not approximate or replace with close alternatives)*

### Color System (CSS Custom Properties — Register All)

```css
/* Register animatable color properties using @property */
@property --paper-warm { syntax: '<color>'; inherits: false; initial-value: #e8d9b5; }
@property --phosphor-green { syntax: '<color>'; inherits: false; initial-value: #4aff4a; }
@property --stone-grey { syntax: '<color>'; inherits: false; initial-value: #9a8f7a; }
@property --void-text { syntax: '<color>'; inherits: false; initial-value: rgba(200,170,110,0.55); }

/* INSTITUTIONAL WARMTH (Beats 1–2) */
--env-bg-center:   rgba(48, 31, 12, 0.96);
--env-bg-edge:     rgba(8, 5, 2, 1.0);
--tungsten-glow:   rgba(210, 155, 70, 0.11);   /* desk lamp halo */
--desk-surface:    #170c04;
--paper-texture:   #e8d9b5;
--ink-struck:      #1c0f05;                     /* typewriter impression */
--shadow-warm:     rgba(0, 0, 0, 0.62);

/* PHOSPHOR TERMINAL (Beats 3–4) */
--crt-bg:          #040e04;
--crt-glow-near:   rgba(74, 255, 74, 0.48);
--crt-glow-far:    rgba(74, 255, 74, 0.09);
--crt-border:      rgba(120, 200, 120, 0.22);
--crt-scanline:    rgba(0, 0, 0, 0.055);
--rate-fall-red:   #ff3030;
--rate-fall-glow:  rgba(255, 48, 48, 0.45);

/* LIMESTONE ARCHITECTURE (Beat 5) */
--stone-warm:      #c4b59a;
--stone-shadow:    rgba(18, 12, 5, 0.82);
--window-fire:     rgba(255, 195, 125, 0.90);  /* windows lighting up */
--sodium-lamp:     rgba(212, 118, 10, 0.78);   /* street lamp bleed */

/* FINAL VOID (Beats 6–7) */
--void-bg:         #030303;
--ghost-type:      rgba(195, 160, 100, 0.025); /* background text layer */
--coin-gold:       rgba(185, 145, 62, 0.82);
--coin-border:     rgba(180, 138, 58, 0.78);
--payoff-text:     rgba(200, 170, 110, 0.55);  /* quiet, not triumphant */
```

### Typography Assignments

| Role | Font | Size | Weight | Treatment |
|------|------|------|--------|-----------|
| Hero numbers (£10B, 15%) | `Playfair Display` | 160–240px | 700 | Multi-layer `text-shadow` at 3 radii |
| Terminal rates (2.9500) | `Courier Prime` | 48–56px | 400 | `--crt-glow-near` text-shadow |
| Document headers | `Courier Prime` | 13px | 400 | 4px `letter-spacing`, UPPERCASE |
| Rate labels (GBP/DEM) | `Courier Prime` | 22px | 400 | Normal |
| Architecture text (15%) | `Oswald` | 96px | 700 | Gold-leaf feel, tracking -1px |
| Final payoff | `Inter` | 26–30px | 300 | `--payoff-text`, no glow |
| Ghost BG text | `Courier Prime` | 220–260px | 700 | `--ghost-type` (2–3% opacity, NOT legible) |

### Hero Number Shadow Stack (Preserves Depth in Code)

```css
.hero-number {
  color: var(--paper-texture);
  text-shadow:
    0 0 3px  var(--paper-texture),       /* core luminance */
    0 0 10px rgba(232, 217, 181, 0.55),  /* immediate halo */
    0 0 28px rgba(210, 180, 120, 0.30),  /* mid glow */
    0 0 65px rgba(190, 155, 90, 0.14),   /* atmospheric bleed */
    2px 4px 12px rgba(0, 0, 0, 0.75);   /* physical shadow (motivated from lamp) */
}
/* The last shadow is NOT decorative — it should shift x/y when the camera moves,
   simulating a real shadow cast by a real lamp at a specific angle. */
```

---

## PART III — DEPTH STACK ARCHITECTURE (HYBRID CSS + THREE.JS)

> **Architectural principle:** Three.js is a window into a physical room, not a primitive
> showcase. The CSS depth system wraps AROUND it. Think of the Three.js canvas as the
> set, and the CSS layers as the camera's glass and atmospheric filters.

```html
<div id="depth-stage" data-fps="30" style="
  position: relative;
  width: 1080px;
  height: 1920px;
  overflow: hidden;
  perspective: 950px;
  perspective-origin: 50% 46%;
">

  <!-- ── Z-BG: CSS atmospheric layers ─────────────────────── Z: -450px -->
  <div class="z-bg" style="
    position: absolute; inset: -9%;
    transform: translateZ(-450px) scale(1.88);
    transform-style: preserve-3d;
  ">
    <!-- Gradient atmosphere, ghost text blocks, film grain canvas -->
  </div>

  <!-- ── Z-3D: THREE.JS CANVAS ─────────────────────────────── Z: 0px -->
  <div class="z-3d" style="
    position: absolute; inset: 0;
    transform: translateZ(0);
  ">
    <canvas id="three-canvas" style="width: 1080px; height: 1920px;"></canvas>
  </div>

  <!-- ── Z-MG-UI: CSS 3D documents, terminal, text ──────── Z: +60px -->
  <div class="z-mg-ui" style="
    position: absolute; inset: -3%;
    transform: translateZ(60px) scale(0.944);
    transform-style: preserve-3d;
  ">
    <!-- Telex doc, terminal screen, architectural overlays -->
  </div>

  <!-- ── Z-FG-1: Framing layer ─────────────────────────── Z: +160px -->
  <div class="z-fg-1" style="
    position: absolute; inset: -5%;
    transform: translateZ(160px) scale(0.858);
    transform-style: preserve-3d;
  ">
    <!-- Corner brackets, scan line, vignette frame, morph particles -->
  </div>

  <!-- ── Z-FG-2: Atmospheric foreground ────────────────── Z: +280px -->
  <div class="z-fg-2" style="
    position: absolute; inset: -8%;
    transform: translateZ(280px) scale(0.765);
    transform-style: preserve-3d;
  ">
    <!-- Particle field, lens dust, metadata ghosts -->
  </div>

  <!-- ── Film grain (always top) ─────────────────────── Z: auto/98 -->
  <canvas id="film-grain" style="
    position: absolute; inset: 0;
    width: 1080px; height: 1920px;
    z-index: 98;
    pointer-events: none;
    mix-blend-mode: overlay;
    opacity: 0.17;
  "></canvas>

</div>
```

**Independent Orbital Motion (MANDATORY — all layers run simultaneously):**
```javascript
const D = 30; // total composition seconds

// Z-BG: slowest, mostly Y-axis sway
tl.fromTo(".z-bg",
  { rotateY: -2.5, rotateX: 1.2 },
  { rotateY: 3.0,  rotateX: -1.0, duration: D, ease: "sine.inOut" }, 0);

// Z-MG-UI: medium, counter-rotation to BG
tl.fromTo(".z-mg-ui",
  { rotateY: 1.4,  rotateX: -0.6 },
  { rotateY: -1.8, rotateX: 0.7,  duration: D * 0.73, ease: "sine.inOut" }, 0);

// Z-FG-1: faster, more X-axis
tl.fromTo(".z-fg-1",
  { rotateY: -3.2, rotateX: 1.8 },
  { rotateY: 4.1,  rotateX: -2.2, duration: D * 0.54, ease: "sine.inOut" }, 0);

// Z-FG-2: fastest, counters FG-1
tl.fromTo(".z-fg-2",
  { rotateY: 3.5,  rotateX: -2.0 },
  { rotateY: -4.2, rotateX: 2.6,  duration: D * 0.39, ease: "sine.inOut" }, 0);
```

---

## PART IV — THREE.JS ENVIRONMENT SPECIFICATIONS

> Three.js renders PHYSICAL ENVIRONMENTS: a room you could walk into, a building
> you could stand outside. Not objects placed in a void.

### Scene A — The Dealing Room (0:00 – 0:11.5)

```javascript
// ── Scene Setup ──────────────────────────────────────────────────
const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(0x09070300, 0.075);
// Fog tinted warm-dark. Density is substantial — back of room barely visible.

// ── Materials ─────────────────────────────────────────────────────

// Floor: Bank of England dark burgundy carpet
const floorMat = new THREE.MeshStandardMaterial({
  color: 0x160404,
  roughness: 0.97,
  metalness: 0.0,
  // [FREE A]: If you can add a woven procedural texture, do so — it creates
  // massive depth without extra geometry. Even a NormalMap of fabric weave
  // at 0.3 normalScale will read in this light.
});

// Desk surfaces: dark mahogany, institutional, 1992-era
const deskMat = new THREE.MeshStandardMaterial({
  color: 0x150a02,
  roughness: 0.62,
  metalness: 0.09,   // catches desk lamp glint
  envMapIntensity: 0.3
});

// CRT monitor housing: matte institutional grey-beige
const monitorHousingMat = new THREE.MeshStandardMaterial({
  color: 0x8a846e,
  roughness: 0.88,
  metalness: 0.0
});

// CRT screen face: emissive phosphor glow (off at start, builds during Beat 3)
const crtScreenMat = new THREE.MeshStandardMaterial({
  color: 0x020a02,
  emissive: 0x0a2a0a,
  emissiveIntensity: 0.7, // animate to 2.4 during terminal reveal
  roughness: 0.15,
  metalness: 0.05
});

// Paper documents (telex printouts on desks)
const paperMat = new THREE.MeshStandardMaterial({
  color: 0xdaccaa,
  roughness: 0.94,
  metalness: 0.0
  // [FREE A]: Normal map of paper grain would be ideal here
});

// ── Lighting (NO ambient wash — only motivated sources) ───────────

// Overhead institutional fluorescent (cold strip)
const fluorescent = new THREE.DirectionalLight(0xd2e5f2, 0.38);
fluorescent.position.set(0, 14, 3);
fluorescent.castShadow = true;
fluorescent.shadow.mapSize.set(2048, 2048);

// Desk lamp — near-right desk: warm tungsten pool
const deskLamp = new THREE.PointLight(0xd49510, 2.2, 7.5, 2.0);
deskLamp.position.set(2.2, 2.6, 0.6);

// Second desk lamp — far left (dimmer, cooler, creates depth separation)
const deskLamp2 = new THREE.PointLight(0xc07808, 0.9, 5.0, 2.0);
deskLamp2.position.set(-4.0, 2.4, -3.0);

// Scene ambient: barely perceptible warm base
const sceneAmbient = new THREE.AmbientLight(0x0e0904, 0.28);

// ── Scene Geometry ─────────────────────────────────────────────────

// Agent designs: 3 desks in a row, 2 CRT monitors per desk.
// Documents scattered on each desk — 2–3 paper rectangles per desk surface.
// One wooden chair visible (back-left). Institutional 1992 — no computers beyond CRTs.
// Camera-facing desk should be in strongest light. Back desks recede into fog.

// ── Camera Setup ──────────────────────────────────────────────────
// Start: over-the-shoulder, upper-right, looking toward center desk
camera.position.set(7.5, 6.8, 10.5);
camera.lookAt(new THREE.Vector3(0, 2.2, 0));

// Orbital arrive: settles to near-eye-level over 2.4s
// Target: camera.position = (2.8, 3.4, 8.2), lookAt = (0, 2.0, 0)
// Tween via GSAP: { x: 2.8, y: 3.4, z: 8.2 }, ease: "power2.out", 2.4s, from t=0.0
// Camera lookAt interpolates in sync via GSAP proxy object

// Desk lamp SWEEPS during Beat 2 (light as cinematography):
// deskLamp.position.x: 2.2 → -1.6, over 4.0s, ease: "sine.inOut"
// This creates a moving shadow across the telex — the only "camera" motion
// inside the static Three.js scene during the document beat
```

### Scene B — Bank of England Exterior (0:13.5 – 0:23.5)

```javascript
// ── Scene Setup ──────────────────────────────────────────────────
const sceneB = new THREE.Scene();
sceneB.fog = new THREE.FogExp2(0x07060400, 0.018);
// Night fog — the building recedes gently. Not lost, but not complete.
// London overcast: fog tinted very faintly warm toward the bottom (street lamps)

// ── Materials ─────────────────────────────────────────────────────

// Ground: Threadneedle Street at night, wet stone
const groundMat = new THREE.MeshStandardMaterial({
  color: 0x090805,
  roughness: 0.82,
  metalness: 0.06  // slightly wet — catches the sodium lamp
});

// Portland limestone columns: the Bank of England's actual material
const columnMat = new THREE.MeshStandardMaterial({
  color: 0x9e9280,  // aged Portland limestone under sodium light
  roughness: 0.90,
  metalness: 0.01
});

// Column capital (top): slightly lighter, catches the institutional spotlight
const capitalMat = new THREE.MeshStandardMaterial({
  color: 0xb8a88a,
  roughness: 0.85,
  metalness: 0.02
});

// Windows (6 visible): START OFF, animate to lit
const windowMat = new THREE.MeshStandardMaterial({
  color: 0x040302,
  emissive: 0xd4820a,
  emissiveIntensity: 0.0,  // animates to 1.8 one by one during Beat 5
  roughness: 0.2,
  metalness: 0.1
});

// ── Lighting ─────────────────────────────────────────────────────

// Sodium vapour street lamp (warm orange — harsh London streetlight)
const sodiumLamp = new THREE.PointLight(0xd47208, 4.2, 28, 1.5);
sodiumLamp.position.set(-9, 7, 6);

// Institutional spotlight — marks the Bank's authority (will go out)
const institutionalSpot = new THREE.SpotLight(0xeef0ff, 2.4);
institutionalSpot.position.set(0, 28, 8);
institutionalSpot.target.position.set(0, 4, 0);
institutionalSpot.angle = Math.PI / 11;
institutionalSpot.penumbra = 0.45;
institutionalSpot.decay = 1.8;
// animate institutionalSpot.intensity: 2.4 → 0.0 over 3.0s during Beat 5
// This is the moment the building goes dark

// Overcast sky glow (cold blue-grey, very dim, from above)
const skyGlow = new THREE.DirectionalLight(0x8090a8, 0.15);
skyGlow.position.set(0, 20, -5);

// ── Scene Geometry ─────────────────────────────────────────────────

// Columns: CylinderGeometry — tapered Ionic column
// Top radius: 0.38, Bottom radius: 0.44, Height: 14, radialSegments: 16
// [FREE A]: Agent may use a fluted column (BufferGeometry with ridge detail)
// for added photorealism. Standard cylinder reads clearly at this distance.
// Place 6 columns visible, 3 front-facing. Column spacing: 3.0 units.

// Building facade between columns: solid limestone blocks, flat plane with
// slight NormalMap or bump detail if available

// Steps: 4 risers leading up to colonnade level. Slight perspective depth.

// ── Camera Setup ──────────────────────────────────────────────────
// Establishing: low angle, looking slightly up at the columns
// Start: (0, 1.5, 16), lookAt: (0, 6, 0)
// Transition IN: this position is achieved by the morphism (see Part V Morph 2)

// After establishing (Beat 5 hold):
// Slow dolly out: camera.position.z: 16 → 24 over 6.0s, ease: "power1.inOut"
// Creates the sense of being gently pushed back by what we're seeing

// Three.js Post-Processing (EffectComposer — GPU safe, NOT CSS filter):
const composer = new EffectComposer(renderer);
const renderPass = new RenderPass(sceneB, camera);
const bloomPass = new UnrealBloomPass(
  new THREE.Vector2(1080, 1920),
  0.35,   // strength: subtle bloom on window emissives
  0.40,   // radius
  0.82    // threshold: only brightest areas bloom (the lit windows)
);
composer.addPass(renderPass);
composer.addPass(bloomPass);
// This creates the authentic sodium-lamp + window glow without CSS blur
```

---

## PART V — 30-SECOND MASTER TIMELINE

**GSAP Timeline Registration (required):**
```javascript
const tl = gsap.timeline({ paused: true });
window.__timelines = window.__timelines || [];
window.__timelines.push(tl);
```

---

### ▌BEAT 1 — THE ROOM (0:00 – 0:05.5)

**Three.js:** Scene A active. Fog dense (0.08), clearing toward desk.
**CSS Layers:** z-bg enters (sepia gradient + ghost text), z-fg-1 (corner brackets), z-fg-2 (dust).

**Ghost Text Layer (z-bg — atmospheric density, NOT readable):**
```css
.ghost-bg-text {
  font-family: 'Courier Prime', monospace;
  font-size: 250px;
  font-weight: 700;
  color: var(--ghost-type);   /* ~2.5% opacity — felt, not seen */
  letter-spacing: -5px;
  line-height: 1.08;
  position: absolute;
  top: 8%;
  left: -4%;
  width: 108%;
  pointer-events: none;
  user-select: none;
}
/* Content (stacked): "STERLING / RESERVE / DEFENDED" */
/* Scale is so large the letters BLEED off frame edges — this is correct */
```

**Entrance sequence:**
- t=0.00: Composition from black — `opacity: 0 → 1`, 0.8s, `power2.out`
- t=0.20: `SUB_BASS_IMPACT` SFX (see Part VI)
- t=0.00–2.40: Three.js camera orbital arrive; fog clears center-out
- t=0.60: z-bg layer: sepia gradient radial fades in, 1.4s, `power1.inOut`
- t=1.20: Ghost text `opacity: 0 → 0.025`, 2.0s, `sine.inOut` (extremely slow reveal)
- t=2.80: Corner brackets materialize — stagger from edges, `springHeavy`, 0.08s gap each
- t=4.20: Date stamp appears — "SEPT 16, 1992" — 12px Courier Prime, tracking 8px:
  - Entrance: `overflow: hidden` + `yPercent: 100 → 0`, 0.35s, `expo.out` (masked reveal)
  - Sits bottom-right, at `--paper-texture` 60% opacity — institutional distance

**Life Pulse (all persistent elements, duration of scene):**
- z-fg-2 particles: `y: +=12px` drift, sine.inOut, 3.8s period, seeded
- Ghost text: `scale: 1.0 → 1.015 → 1.0`, 7.2s yoyo, `sine.inOut`
- Corner brackets: `opacity: 0.85 → 1.0 → 0.85`, 3.4s yoyo, `sine.inOut`

**Transition to Beat 2:**
- Dolly in: `depth-stage perspective: 950 → 630`, 0.85s, `power3.out`
- Three.js camera: z-position 8.2 → 5.5, 0.85s (matched timing)
- z-mg-ui layer: opacity 0 → 1, 0.5s — telex printout materializes on desk

---

### ▌BEAT 2 — THE TELEX (0:05.5 – 0:09.5)

**Three.js:** Scene A. Desk lamp sweeps (see Scene A spec). Camera close to desk.
**CSS Layers:** z-mg-ui ENTERS — telex printout.

**The Telex Printout DOM Element:**
```css
.telex-doc {
  position: absolute;
  width: 540px;
  left: 270px;
  top: 680px;
  background: var(--paper-texture);
  /* Physical shadow — motivated from desk lamp at upper-right */
  box-shadow:
    -10px 14px 44px rgba(0, 0, 0, 0.65),   /* primary shadow drop */
    -3px  5px  10px rgba(0, 0, 0, 0.32),   /* contact shadow */
    inset 0 0 0 1px rgba(28, 15, 5, 0.04); /* paper edge darkening */
  transform: translateZ(80px) rotateX(7deg) rotateZ(-1.8deg);
  /* Slight pitch + rotation: document placed by a human hand, not a machine */
  padding: 40px 44px;
  font-family: 'Courier Prime', monospace;
  font-size: 13px;
  color: var(--ink-struck);
  letter-spacing: 0.5px;
  line-height: 1.7;
  /* Paper aging — subtle yellowing from edges */
  background-image: radial-gradient(
    ellipse 80% 50% at 50% 50%,
    rgba(248, 238, 210, 0) 0%,
    rgba(170, 130, 70, 0.06) 100%
  );
}
```

**Telex content (strict 1992 format):**
```
TELEX: LONDON / FRANKFURT
REF:   QF-160992-STG-003
DATE:  16-09-1992  07:43 GMT
FROM:  QUANTUM FUND

INSTRUCTION: SELL
INSTRUMENT:  GBP/DEM
AMOUNT:      £ 1,000,000,000
RATE:        2.9500
CONFIRM EXECUTION AT OPEN.

[3 more lines of overtyped text — corrupted / accumulating positions overnight]
[Agent: choose the overtype marks — they suggest the scale of what happened]
```

**Entrance — has weight:**
- Telex drops from above: `y: -280 → 0`, 0.72s `power3.in` (fall)
- On land: `y: += 8px`, 0.32s `elastic.out(1, 0.35)` (bounce)
- Landing impact: screen shake 4px amplitude, 6-frame decay

**GSAP ScrambleText on the exchange rate field:**
```javascript
// The rate scrambles as if it's being received over telex line
tl.to(".telex-rate-value", {
  duration: 1.1,
  scrambleText: {
    text: "2.9500",
    chars: "0123456789",
    revealDelay: 0.5,
    speed: 0.4
  },
  ease: "none"
}, 6.5); // t=6.5s
```

**Three.js desk lamp sweep** creates a moving shadow across the telex during this beat.
Shadow direction should visibly rotate approximately 25deg across the document face.

**SOUND (wall times):**
- t=5.60: `PAPER_RUSTLE` — telex lands. Dry. Physical. No reverb.
- t=6.42: `UI_CLICK` — scramble text resolves to "2.9500"

**Transition to Beat 3:**
- `WHOOSH` SFX at t=9.10
- `depth-stage perspective: 630 → 420`, 0.75s, `power3.out` (extreme push)
- Three.js camera: continues pushing toward desk — CRT screen fills view
- MORPHISM SEQUENCE 1 fires at t=9.5

---

### ▌BEAT 3 — THE CASCADE (0:09.5 – 0:12.0)

**Three.js:** Scene A. Opacity fades 1.0 → 0.5 as CSS terminal takes prominence.
**CSS Layers:** z-mg-ui DOMINANT — terminal screen (post Morph 1).

> **MORPHISM 1 fires at t=9.5 — see Part VI (Morphism Sequences)**

**Terminal Screen (CSS, post-morph):**
```css
.terminal-screen {
  position: absolute;
  width: 620px;
  height: 440px;
  left: 230px;
  top: 620px;
  background: var(--crt-bg);
  border: 2px solid var(--crt-border);
  /* Phosphor glow stack — NO CSS filter */
  box-shadow:
    0 0  50px var(--crt-glow-far),
    0 0 100px rgba(74, 255, 74, 0.05),
    inset 0 0  28px rgba(0, 0, 0, 0.55);
  /* Scanlines: repeating gradient, NOT filter: blur */
  background-image: repeating-linear-gradient(
    0deg,
    transparent,
    transparent 3px,
    var(--crt-scanline) 3px,
    var(--crt-scanline) 4px
  );
  transform: translateZ(90px) rotateX(3deg);
  /* Slight backward tilt — a real monitor on a desk */
  padding: 32px 36px;
}
```

**The Rate Cascade (6 lines):**
```
GBP/DEM  2.9500  ↓
GBP/DEM  2.8750  ↓
GBP/DEM  2.7800  ↓
GBP/DEM  2.6100  ↓  [INTERVENTION: BASE RATE → 12%]
GBP/DEM  2.5200  ↓  [INTERVENTION: BASE RATE → 15%]
         ···     [cursor blink stops]
```

Each line enters via masked reveal:
```javascript
// Each line: overflow:hidden parent + child slides up
const rateTimings = [9.85, 10.22, 10.58, 10.94, 11.30];
const rateEases   = ["expo.out", "power3.out", "expo.out", "power3.out", "springSnappy"];
// Vary the ease per line — the market accelerating

document.querySelectorAll('.rate-line').forEach((line, i) => {
  tl.from(line, {
    yPercent: 105,
    duration: 0.20,
    ease: rateEases[i]
  }, rateTimings[i]);
});
// "↓" arrows: red, glow pulse on each appearance
// Rate NUMBER in Courier Prime 48px — heavier than label text
```

**CRT screen physical reactions:**
- Each `↓` appearance: `opacity: 1 → 0.72 → 1`, 0.06s (screen flicker)
- Three.js `crtScreenMat.emissiveIntensity`: pulses `0.8 → 1.5 → 0.9` per drop
- Wall times for UI_CLICK_SERIES: 9.85, 10.22, 10.58, 10.94, 11.30s

**At t=11.80:** Last line freezes. Cursor blink stops. `SILENCE_DROP` — all audio cuts.
0.3 seconds of absolute silence. Hold.

**Transition to Beat 4:**
- MORPHISM SEQUENCE 2 fires at t=11.85
- `GLASS_SHATTER` SFX at t=12.00

---

### ▌BEAT 4 — THE FRACTURE (0:12.0 – 0:14.5) — THE TURN

> **MORPHISM 2 fires at t=11.85 — see Part VI (Morphism Sequences)**

**Camera during morph:**
- Snap zoom: `depth-stage perspective: 420 → 290`, 0.25s, `power4.out` (maximum violence)
- z-bg: `scale: 1 → 1.09`, 0.35s, `power2.out` (environment gasps)
- z-fg-2: `opacity: 1 → 0.4 → 1`, 0.5s (particles sucked toward center then released)

**SOUND:**
- t=12.00: `GLASS_SHATTER` — 0.92 volume. CRT glass specifically: thin, high-pitched, + electrical discharge pop. Loudest moment in the piece.
- t=12.14: Drone surges: -20 LUFS → -14 LUFS, 0.4s `power2.out`
- t=13.80: `IMPACT_HIT` — stone columns land. 0.72 volume. Restrained. Heavy.

**Chromatic Aberration:**
- Fires at t=12.00, intensity: 1.5, channel split: 22px
- Duration: 0.18s — then decays 0.12s

**Screen Shake:**
- t=12.00: 9px amplitude, 11-frame decay (most intense shake in the piece)

---

### ▌BEAT 5 — THE INSTITUTION STANDS (0:14.5 – 0:22.5)

**Three.js:** Scene B crossfades in over 1.2s (t=14.0–15.2). EffectComposer active.
**CSS Layers:** DOM column-shards (from Morph 2) fade out as Three.js scene fades in.

**Crossfade overlap:**
- DOM shards: `opacity: 1.0 → 0.0`, 1.0s (t=14.0–15.0), `power1.inOut`
- Three.js canvas: `opacity: 0.0 → 1.0`, 1.2s (t=14.0–15.2), `power1.inOut`
- 0.2s overlap window ensures no black gap

**Establishing — the building reveals itself:**
- Camera low angle: (0, 1.5, 16), looking up at columns
- Dolly out: `camera.position.z: 16 → 22`, 1.6s, `power2.out` — reveals full facade
- Six windows: light up one by one, staggered 0.45s each (t=15.0–17.7)
  - `windowMat.emissiveIntensity: 0 → 1.8`, 0.6s per window, `expo.out`
  - EffectComposer bloom catches each window as it lights

**"BASE RATE: 15%" burns into the stone facade:**
- Font: `Oswald`, 96px, `--window-fire` color — gold leaf feel
- Entrance: GSAP SplitText, character stagger, each char: clip-path from bottom, 0.15s gap
- Physical shadow: Three.js projector spot aimed at text plane, texture projected
- t=16.20: `DING` SFX — 0.55 volume — the announcement. Single clean bell.

**The institutional spotlight goes out (t=17.5 – 20.5):**
- `institutionalSpot.intensity: 2.4 → 0.0`, 3.0s, `power1.inOut`
- Only sodium street lamp remains
- The building in only orange street light is suddenly just stone in the dark
- NO new SFX t=16.5–19.5. Only drone. The silence is the comment.

**Camera holds at wide during silence, then very slow push-in:**
- t=19.5: `camera.position.z: 22 → 18`, 3.0s, `power1.inOut` (subtle, not dramatic)
- The camera's slow approach during silence creates unease

**Transition to Beat 6:**
- FlyThrough: z-fg-1 and z-fg-2 `scale: 1 → 2.5, opacity: 1 → 0`, 0.38s `power3.in`
- Three.js Scene B: canvas `opacity: 1.0 → 0.0`, 0.6s
- DOM coin elements initialize at column screen-positions (all opacity: 0)

---

### ▌BEAT 6 — THE DISSOLUTION (0:22.5 – 0:26.5)

**Three.js:** Off. Pure CSS.
**CSS Layers:** z-mg-ui — 44 coins falling.

> **MORPHISM 3 fires at t=22.5 — see Part VI (Morphism Sequences)**

**Coin element spec:**
```css
.coin {
  position: absolute;
  width: 52px;
  height: 52px;
  border-radius: 50%;
  border: 2px solid var(--coin-border);
  background: radial-gradient(
    circle at 35% 35%,
    rgba(210, 175, 85, 0.9) 0%,
    rgba(165, 128, 48, 0.85) 50%,
    rgba(120, 90, 30, 0.8) 100%
  );
  box-shadow:
    0 0 6px  var(--coin-gold),
    0 0 14px rgba(185, 145, 62, 0.25),
    inset 0 0 6px rgba(255, 220, 120, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Courier Prime', monospace;
  font-size: 22px;
  color: rgba(210, 175, 85, 0.9);
  /* "£" glyph centered */
}
```

**Fall physics (mulberry32 seed: 7774 for all coin positions):**
```javascript
// 44 coins initialized — mulberry32 seeded positions
// Each coin falls from its initialized column-position Y to ground zone
// NO elastic on fall itself — only on LAND

coins.forEach((coin, i) => {
  const fallDuration = 0.55 + prng() * 0.35;  // 0.55–0.90s
  const fallDelay    = prng() * 1.6;           // 0–1.6s stagger
  const landY        = 1620 + prng() * 180;    // ground zone Y
  const landX        = parseFloat(coin.style.left) + (prng()-0.5) * 40;

  // The fall
  tl.to(coin, {
    x: landX,
    y: landY,
    opacity: 1,
    scale: 1,
    duration: fallDuration,
    ease: "power3.in"   // gravity — accelerating, no bounce during flight
  }, 22.5 + fallDelay);

  // The land — brief elastic settle
  tl.to(coin, {
    y: `-=8`,
    duration: 0.12,
    ease: "power2.out"
  }, 22.5 + fallDelay + fallDuration);
  tl.to(coin, {
    y: `+=8`,
    duration: 0.22,
    ease: "elastic.out(1, 0.25)"
  }, 22.5 + fallDelay + fallDuration + 0.12);

  // Small particle burst on land (3 particles each)
  // particleBurst(z-fg-1 container, coinLandX, landY, t, 3, '--coin-gold', 7774+i)
});
```

**SOUND:**
- t=22.80: `SLAM` — first coin lands. 0.88 volume. Gold on marble. Ring + sustain.
- t=23.40: `IMPACT_HIT` — cluster lands. 0.42 volume.
- t=23.90: `IMPACT_HIT` — another cluster. 0.40 volume.

**Camera:** Ken Burns drift — `scale: 1.0 → 1.035`, 4.0s, `sine.inOut`. Slight upward tilt, `rotateX: 0 → -0.7deg`. We are watching accumulation from slightly above.

---

### ▌BEAT 7 — THE VOID (0:26.5 – 0:30.0)

**Three.js:** Remains off. Pure CSS throughout.

> **MORPHISM 4 fires at t=26.5 — see Part VI (Morphism Sequences)**

**Final text (appears at t=27.8, after coins implode):**
```
SEPT 16, 1992
£3,300,000,000 LOST
ONE TRADER
```
- Font: `Inter` 300, 28px / 34px / 28px. Line height 2.2.
- Color: `var(--payoff-text)` — `rgba(200, 170, 110, 0.55)`. Not triumphant. Quiet.
- Entrance: `opacity: 0 → 0.55`, 1.4s, `power1.inOut`. No slide, no spring.
  Just: present. Like a fact already known.
- Centered. Middle-screen. Nothing else.

**Camera during void:** Dolly out — `perspective: 950 → 1900`, 3.5s, `sine.inOut`. The viewer is being slowly, firmly pushed away.

**Outro hold (28.5s – 30.0s):**
- t=28.5: All text `opacity: 0.55 → 0.18`, 1.0s, `power1.inOut` (not gone, but receding)
- t=28.5–30.0: Film grain only. Corner brackets only. Drone in final decay.
- The frame is near-black. But not black. Never completely black.

---

## PART VI — MORPHISM SEQUENCES

> Morphism is structural continuity. The viewer's eye follows an OBJECT as it
> transforms — not as Scene A dissolves and Scene B appears. No black frames.
> No dissolve-to-nothing. The thing becomes the other thing.

### ◆ MORPHISM 1: TELEX → TERMINAL (t=9.5 – t=11.0, 1.5s total)

**Phase 1 — Expansion + Reframe (0.45s, t=9.5–9.95):**
- `.telex-doc`: `width: 540 → 1080px`, `height: proportional`, `scale: 1 → 1.55`
- Tween `--paper-warm` (via `@property`) from `#e8d9b5` → `#040e04`, `power2.inOut`
- Box-shadow cross-dissolves: warm `rgba(0,0,0,0.65)` → phosphor glow `rgba(74,255,74,0.12)`
- `rotateX: 7deg → 3deg` (screen tilt vs. document tilt — different physics)

**Phase 2 — Texture Crossfade (0.4s, t=9.75–10.15, overlapping P1):**
- Paper aging vignette overlay: `opacity: 0.06 → 0`, 0.3s
- CRT scanline gradient: `opacity: 0 → 1`, 0.35s
- These are separate overlay divs stacked — one fades as other rises

**Phase 3 — Content Dissolve (0.35s, t=9.9–10.25):**
- Telex text: `opacity: 1 → 0`, 0.22s
- Terminal text: `opacity: 0 → 1`, 0.28s (5-frame overlap with exit)
- Exchange rate line: ScrambleText resolves from "X.XXXX" → "2.9500", 0.55s

**Phase 4 — Border Morph (0.3s, t=10.0–10.3):**
- CSS `border-color: rgba(0,0,0,0.04) → rgba(120,200,120,0.22)`, via `@property`
- Corner brackets: scale pulse `1.0 → 1.1 → 1.0`, `elastic.out(1, 0.4)`, 0.4s

**Result:** By t=11.0, the telex document is fully a terminal screen in the same DOM node.
No new element created. The same box transformed.

---

### ◆ MORPHISM 2: TERMINAL → COLUMNS (t=11.85 – t=14.5, 2.65s total)

**This is the hero morphism. The flat screen shatters into three-dimensional space.**

**Step 1 — Freeze (t=11.80–11.85, 0.05s):**
All terminal content `opacity: 1 → 0`, 0.05s. Screen goes dark. Not black — dark green.

**Step 2 — Shard Generation (instant, t=11.85):**
10 shard divs initialized, each with a clip-path polygon defining a portion of the terminal:
```javascript
// Pre-computed fracture map — natural glass-break pattern
const shardPolygons = [
  "polygon(0% 0%, 36% 0%, 28% 44%, 0% 30%)",         // top-left
  "polygon(36% 0%, 68% 0%, 72% 36%, 28% 44%)",         // top-center
  "polygon(68% 0%, 100% 0%, 100% 26%, 72% 36%)",       // top-right
  "polygon(0% 30%, 28% 44%, 18% 76%, 0% 62%)",         // mid-left
  "polygon(28% 44%, 72% 36%, 66% 70%, 18% 76%)",       // center
  "polygon(72% 36%, 100% 26%, 100% 60%, 66% 70%)",     // mid-right
  "polygon(0% 62%, 18% 76%, 12% 100%, 0% 100%)",       // bot-left
  "polygon(18% 76%, 66% 70%, 60% 100%, 12% 100%)",     // bot-center
  "polygon(66% 70%, 100% 60%, 100% 100%, 60% 100%)",   // bot-right
  "polygon(40% 36%, 62% 32%, 58% 54%, 36% 58%)"        // inner fragment (center crack)
];
// Each shard is a div, same position as terminal, clipped to its polygon
// Each shard carries terminal content (same green background + scanlines)
// Agent: [FREE F] — redesign fracture map for more natural glass-break aesthetics
// provided shards still map to column positions in Step 4
```

**Step 3 — Shard Scatter (t=12.0–12.65, 0.65s):**
```javascript
// All shards explode outward from terminal center
// mulberry32 seed: 3392 for scatter vectors
shards.forEach((shard, i) => {
  const angle  = (i / shards.length) * Math.PI * 2 + (prng() - 0.5) * 0.7;
  const dist   = 100 + prng() * 220;
  const rot    = (prng() - 0.5) * 55; // degrees

  tl.to(shard, {
    x: Math.cos(angle) * dist,
    y: Math.sin(angle) * dist,
    rotation: rot,
    scale: 0.55 + prng() * 0.45,
    opacity: 0.85,
    duration: 0.55 + prng() * 0.12,
    ease: "power3.out"
  }, 12.0 + i * 0.018); // fast stagger
});
```

**Step 4 — Color Shift During Flight (t=12.1–13.0, 0.9s):**
Each shard's `--shard-color` (registered `@property <color>`) transitions:
- FROM: `#040e04` (phosphor crt dark) → TO: `#9e9280` (Portland limestone)
- Simultaneously: `box-shadow` shifts from CRT glow to stone cold
- Stagger: `i * 0.04s` — shards don't all turn to stone simultaneously

**Step 5 — Column Formation (t=13.0–14.3, 1.3s):**
Pre-mapped column positions: 6 columns, X positions [105, 270, 430, 600, 760, 915]px
```javascript
// Each shard navigates to its assigned column position and stretches vertically
const columnMap = [
  {x: 105, y: 960, scaleY: 14, scaleX: 0.28},
  {x: 270, y: 960, scaleY: 16, scaleX: 0.30},
  {x: 430, y: 960, scaleY: 15, scaleX: 0.28},
  {x: 600, y: 960, scaleY: 15, scaleX: 0.29},
  {x: 760, y: 960, scaleY: 13, scaleX: 0.27},
  {x: 915, y: 960, scaleY: 14, scaleX: 0.28},
  // remaining 4 shards map to the in-between or overlap
];

shards.forEach((shard, i) => {
  const col = columnMap[i % columnMap.length];
  tl.to(shard, {
    x: col.x,
    y: col.y,
    scaleY: col.scaleY,
    scaleX: col.scaleX,
    rotation: 0,   // columns are perfectly vertical
    opacity: 1.0,
    "clip-path": "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", // rectangular
    duration: 0.95,
    ease: "power2.inOut"
  }, 13.0 + i * 0.065);
});
```

**Step 6 — Three.js Scene B crossfades in (t=13.8–15.2):**
As DOM columns reach formation, Three.js Scene B fades in over 1.4s.
DOM columns: `opacity: 1.0 → 0.0`, 0.9s (t=14.0–14.9)
Three.js canvas: `opacity: 0.0 → 1.0`, 1.2s (t=14.0–15.2)

---

### ◆ MORPHISM 3: ARCHITECTURE → COINS (t=22.5 – t=23.5, 1.0s)

**The building becomes what it was trying to defend.**

- t=22.5: Three.js Scene B canvas: `opacity: 1.0 → 0.0`, 0.9s, `power2.inOut`
- t=22.5: 44 DOM coin divs: pre-positioned at the 6 column screen-positions (distributed across columns), all `scale: 0.08, opacity: 0`
- t=22.65: Coins scale up to 1.0 and opacity to 1.0 in 0.28s `power2.out` — they pop into existence where the columns stood
- t=22.9: Gravity begins — coins fall (see Beat 6 timeline)

---

### ◆ MORPHISM 4: COINS → VOID (t=26.5 – t=27.8, 1.3s)

**Not an explosion. An implosion. Currency returning to nothing.**

```javascript
// All 44 coins converge to screen center (540, 960)
coins.forEach((coin, i) => {
  const currentX = parseFloat(gsap.getProperty(coin, "x")) + parseFloat(coin.style.left);
  const currentY = parseFloat(gsap.getProperty(coin, "y")) + parseFloat(coin.style.top);

  tl.to(coin, {
    x: 540 - parseFloat(coin.style.left),
    y: 960 - parseFloat(coin.style.top),
    scale: 0,
    opacity: 0,
    duration: 0.52 + i * 0.018,
    ease: "power2.in"
  }, 26.5 + i * 0.012); // stagger: near coins go first
});

// Final "£" symbol: appears at convergence point, then dissolves
// [FREE D]: agent may choreograph this single symbol's arrival and departure
// as they see fit — provided it takes no more than 1.5s total and ends
// in near-black before t=27.8 when the payoff text appears
```

---

## PART VII — SOUND ENGINEERING PATH

> Sound is not added to picture. Sound IS picture, arriving at the same instant as
> the visual event that gave birth to it.

### Layer 1 — Foundation (Full Duration)

| Asset | Character | Target Level | Wall Start | Wall End |
|-------|-----------|-------------|-----------|---------|
| `drone_institutional.wav` | Low cluster, ~42–58Hz, no pitch, no melody. The sound of a building holding its breath. | -20 LUFS | 0.0s | 30.0s |

Drone arc:
- 0.0–2.0s: fade in from silence
- 2.0–22.5s: hold at -20 LUFS
- 22.5–26.5s: drop to -22 LUFS (coins falling — drone recedes slightly)
- 26.5–30.0s: decay to -∞ LUFS (6-second fade into complete silence)

Freesound search: `"institutional building tone low frequency held cluster no melody"` — prefer CC0, under 12s loop, no room reverb, no breathing or organic noise.

### Layer 2 — Atmospheric (Scene-Specific)

| Scene | Sound Character | Level | Timing | Fade |
|-------|----------------|-------|--------|------|
| Beat 1 (room) | Fluorescent hum: 120Hz + harmonic. Subtle ventilation undertone. Institutional distance. | -30 LUFS | 0.0–5.5s | +1.5s in / -0.8s out |
| Beat 3 (terminal) | CRT hiss: thin high-frequency noise, 8–12kHz presence, 60Hz electrical undertone | -34 LUFS | 9.5–12.0s | +0.5s in / instant out (shatter cuts it) |
| Beat 5 (exterior) | London street night: 2 cars far away, very distant, wind past limestone. NOTHING else. | -38 LUFS | 14.5–22.5s | +1.0s in / -0.8s out |

### Layer 3 — Event Stingers

```json
{
  "sfx": [
    {
      "sound": "SUB_BASS_IMPACT",
      "timestamp_wall": 0.20,
      "word": "ROOM",
      "volume": 0.85,
      "lead_lag": "on visual peak",
      "note": "The camera arrives. The room asserts its own weight. Single sub hit, no tail."
    },
    {
      "sound": "PAPER_RUSTLE",
      "timestamp_wall": 5.60,
      "word": "TELEX",
      "volume": 0.50,
      "lead_lag": "+2 frames after visual land",
      "note": "Document lands on mahogany. Dry. Physical. Very brief. No reverb."
    },
    {
      "sound": "UI_CLICK",
      "timestamp_wall": 6.42,
      "word": "CONFIRM",
      "volume": 0.45,
      "lead_lag": "on visual peak",
      "note": "Scramble text resolves. Single electromechanical click."
    },
    {
      "sound": "WHOOSH",
      "timestamp_wall": 9.10,
      "word": "CASCADE",
      "volume": 0.60,
      "lead_lag": "-2 frames before visual (ear leads eye)",
      "note": "Camera drives forward. Paired with perspective push. The air of a room compressing."
    },
    {
      "sound": "UI_CLICK_SERIES",
      "timestamp_wall": 9.85,
      "word": "DROP",
      "volume": 0.38,
      "lead_lag": "-1 frame before each visual",
      "note": "5 mechanical relay clicks at t=9.85, 10.22, 10.58, 10.94, 11.30. Accelerating pace. Treat as ONE composed sequence, not 5 independent stingers.",
      "repeat_times": [9.85, 10.22, 10.58, 10.94, 11.30]
    },
    {
      "sound": "GLASS_SHATTER",
      "timestamp_wall": 12.00,
      "word": "FRACTURE",
      "volume": 0.92,
      "lead_lag": "on visual peak",
      "note": "CRT glass specifically: thin, high-pitched initial break + electrical discharge pop + brief sustained high-frequency ring. NOT a generic glass-break. Loudest moment."
    },
    {
      "sound": "IMPACT_HIT",
      "timestamp_wall": 13.80,
      "word": "COLUMN",
      "volume": 0.72,
      "lead_lag": "+1 frame after shards reach column position",
      "note": "Stone columns form. Heavy, dry, 40Hz resonance, 0.5s sustain. Like concrete blocks placed (not thrown) on a stone floor."
    },
    {
      "sound": "DING",
      "timestamp_wall": 16.20,
      "word": "RATE",
      "volume": 0.55,
      "lead_lag": "on visual peak (character stagger complete)",
      "note": "15% announcement. Single clear bell. Institutional. Final. Not reverberant."
    },
    {
      "sound": "SLAM",
      "timestamp_wall": 22.80,
      "word": "COIN",
      "volume": 0.88,
      "lead_lag": "+1 frame after first coin bounce settles",
      "note": "Gold sovereign on marble. Clear ring tone + 1.2s natural decay. Not a thud — a ring that hangs in the air."
    },
    {
      "sound": "IMPACT_HIT",
      "timestamp_wall": 23.40,
      "word": "CLUSTER",
      "volume": 0.40,
      "lead_lag": "on visual peak"
    },
    {
      "sound": "IMPACT_HIT",
      "timestamp_wall": 23.90,
      "word": "CLUSTER2",
      "volume": 0.38,
      "lead_lag": "on visual peak"
    },
    {
      "sound": "SILENCE_DROP",
      "timestamp_wall": 27.80,
      "note": "Mix decision — not a stem file. All sources (drone, atmospherics, any residual) reach 0 by 27.80. The payoff text appears into complete silence. 0.2s before composition end."
    }
  ]
}
```

**SFX budget accounting:** 11 entries total. UI_CLICK_SERIES (5 sub-events) = 1 composite.
Effective stinger count: **8** (one over maximum). Flag for producer: SLAM cluster at 23.40/23.90 can be reduced if needed.

### Physical Weight Specifications (For SFX Creation or Precision Search)

| Element | Exact Physical Character | Search Keywords |
|---------|------------------------|----------------|
| Telex paper landing | Crisp bond paper on mahogany. One impact. Light air displacement. <0.3s total. No room tail. | `"paper drop wood desk"` CC0 |
| CRT terminal hiss | Thin phosphor noise, -32 LUFS constant presence, 60Hz electrical base | `"crt monitor hiss phosphor old television"` |
| Rate relay clicks | 1950s-60s electromechanical relay closing. Dry, short, mechanical. NOT modern keyboard. | `"electromechanical relay click switch"` |
| CRT glass shatter | CRT tube implosion: initial sharp crack + inrush of air + brief electrical discharge crackle | `"crt tube implosion shatter vintage"` |
| Stone column landing | Concrete block set (not dropped) on limestone floor. 40Hz fundamental. Brief. | `"concrete stone heavy set impact"` |
| Gold coin on marble | Sovereign-weight coin on polished stone. Clear ring at ~1200Hz, 1.2s natural decay | `"gold coin marble floor ring"` |

### Score Mood (Agent's Creative Latitude — [FREE E])

```
SCORE MOOD (if pursued):
  Tempo:    Do not specify BPM — no rhythmic pulse. Drone-like.
  Key:      D minor cluster — not resolved
  Texture:  Low cello + processed breath, -22 LUFS. No melody. No harmony.
            If it were removed you would notice a room getting louder —
            that is the correct level.
  Arc:      Enters t=0 with drone. Thickens slightly at t=9.5 (terminal).
            Goes nearly silent at t=11.8 (SILENCE_DROP).
            Brief swell t=12.0–13.0 (glass → stone) then retreats.
            Decays from t=22.5 through composition end.
  Search:   "drone dark processed cello no melody documentary score minimal"
```

---

## PART VIII — HYPERFRAMES TECHNICAL CONSTRAINTS

1. **`data-fps="30"`** on `#depth-stage` root element — non-negotiable
2. **No `repeat: -1`** on any tween — use `Math.ceil(D / period) - 1` exactly
3. **Film grain:** `createImageData(540, 960)` only — stretched to 1080px via CSS. Never 1080×1920 (performance)
4. **CSS `filter: blur()` and `backdrop-filter: blur()` are BANNED** on ALL animated or persistent DOM elements. Simulate depth via opacity, scale, and brightness only.
5. **Three.js EffectComposer IS PERMITTED** — GPU post-processing bypasses the CSS blur performance penalty. Bloom, film grain (Three.js only), and depth-of-field via Three.js DepthOfFieldShader are all acceptable on the 3D canvas.
6. **`Math.random()` is BANNED** — all PRNG via mulberry32. Seeds: particles=88888, coins=7774, shard scatter=3392
7. **`@property` CSS registration required** before any animated custom property: `--paper-warm`, `--phosphor-green`, `--stone-grey` (type: `<color>`)
8. **GSAP premium plugins (assumed available):** ScrambleTextPlugin, SplitText, MorphSVGPlugin, DrawSVGPlugin
9. **`window.__timelines`** — register all timelines, `paused: true`
10. **Three.js canvas dimensions:** `renderer.setSize(1080, 1920)`. PixelRatio: 1.0 (not `devicePixelRatio` — deterministic output)
11. **No `top`/`left` animation** — all position tweens via `transform: translate()` (GPU-bound)
12. **`repeat: Math.ceil(D / period) - 1`** for ALL looping elements (life pulse, grain, scan line sweep)

---

## PART IX — AGENT CREATIVE LATITUDE

The following elements are **intentionally underspecified**. The agent has full creative authority in these zones:

**[FREE A]** — Three.js environment detail (both scenes). Exactly how the desks, columns, and floors are modeled, textured, and populated is the agent's domain. The brief gives material specs and lighting setup. The physical feel of the set — chair placement, paper scatter density, whether the building has a plaque visible, how many steps the entrance has — belongs to the agent.

**[FREE B]** — Ghost text layer content. It must suggest 1992 Bank of England institutional language. "STERLING / RESERVE / DEFENDED" is a reference starting point. The agent may choose words, density, how they bleed off frame, and whether they suggest a document or just institutional vocabulary.

**[FREE C]** — Coin fall choreography. The 44 coins with seeded positions give the structural set. How they interact visually — whether a few fall dramatically late and alone, how they cluster, whether the last coin to land creates a moment of pause — is creative territory.

**[FREE D]** — The "£" symbol in Morphism 4. The brief says it appears and dissolves. The agent owns the choreography of this single symbol: how it rises, how it occupies the frame, what it does before going. Duration cap: 1.5s maximum. Must end in near-black.

**[FREE E]** — Score mood suggestion. After implementation, the agent may append one score note at end of delivery (see Part VII spec).

**[FREE F]** — Fracture map redesign. The 10 polygons in Morphism 2 are a reference. The agent may redesign the fracture pattern for more authentic glass-break aesthetics. Constraint: the resulting shards must map cleanly to the 6 column positions.

**[FREE G]** — Particle behavior during the shard scatter. Particle burst timing, density, and behavior at the shard scatter phase is the agent's to design — provided it uses mulberry32 seeding and stays within z-fg-1 bounds.

---

## PART X — QUALITY GATE

Before delivery:
- [ ] Three.js: Both scenes render as physical environments (rooms, exteriors) — not objects floating in space
- [ ] All 4 morphism sequences are continuous — no black frames between states
- [ ] Morphism 2 (terminal → columns): same DOM node transforms, no cuts
- [ ] Film grain canvas: 540×960 rendered, stretched to 1080px via CSS — verified
- [ ] `data-fps="30"` on root element
- [ ] Three.js EffectComposer bloom active on Scene B — NOT on DOM elements
- [ ] At least 3 distinct camera events (orbital reveal, dolly in/out, snap zoom present)
- [ ] At least 3 distinct easing families per clip (`springHeavy`, `expo.out`, `sine.inOut` minimum)
- [ ] Speed zones all represented: snap (<0.25s on glass shatter), medium (0.4-0.6s standard), cinematic slow (>0.8s on column formation + dolly out)
- [ ] No CSS `filter: blur()` anywhere
- [ ] `Math.random()` not present — mulberry32 only
- [ ] All `@property` values registered before use
- [ ] `window.__timelines` registered
- [ ] Outro hold: minimum 2.0s grain-only after last text appears
- [ ] SFX total: 8 effective stingers (note: over standard 4-6 budget; justified as compound sequence — producer review)
- [ ] Coin fall uses `power3.in` (gravity) not `elastic.out`
- [ ] Drone decays to silence by t=30.0
- [ ] Ghost text NOT consciously readable (2–3% opacity maximum)
- [ ] Life Pulse (`sine.inOut`, finite repeat) applied to all holds >1s
