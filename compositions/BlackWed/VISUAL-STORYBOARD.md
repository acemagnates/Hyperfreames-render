# Black Wednesday — Visual Storyboard

## Design Language

**Aesthetic:** Institutional warmth — the tension between warm human spaces (dealing rooms, tungsten light, paper documents) and cold institutional power (limestone columns, fog, silence).

**Camera Philosophy:** Every shot is motivated. The camera is an actor — it arrives, discovers, recoils, retreats. Never static.

**Texture Stack:** Every frame carries at least 3 layers:
1. Film grain (540×960 canvas stretched 2×, 15–20% opacity)
2. Vignette (radial gradient overlay)
3. Scene content with motivated lighting

---

## Clip 01 — The Room + The Telex

### Beat 1.1: Black Hold (0.0–0.5s)
- **Frame:** Pure black (#0e0c10)
- **Purpose:** Let the viewer's eyes adjust. Build anticipation through absence.
- **Texture:** Film grain visible on black. Not pure digital black — film black.

### Beat 1.2: The Room Reveals (0.5–2.0s)
- **Frame:** Three.js dealing room — camera arrives from over-the-shoulder upper right
- **Composition:** 3 desks arranged in a row, receding into space. Dark burgundy carpet floor. Fog haze (FogExp2, warm-dark #1A1210, density 0.075).
- **Lighting:** Cold overhead fluorescents (slightly blue-white) fill the room with unflattering institutional light. One desk lamp OFF (warm tungsten reserved for sweep).
- **Camera:** Orbital arrive — starts high-right, settles to near-eye-level by t=2.0s. The motion communicates "entering the room."
- **Props:** Papers on each desk (flat white rectangles with paper-warm tint). 2 CRT monitors per desk — grey-beige housings, screens dark at this point.

### Beat 1.3: Desk Lamp Sweep (2.0–3.5s)
- **Frame:** The desk lamp's position.x animates from 2.2 to -1.6 over 4s
- **Composition:** Warm tungsten light sweeps across all three desk surfaces, left to right as viewed. Each desk momentarily golden, then returns to cool fluorescent.
- **Lighting:** The lamp creates a moving pool of warm light (#FFD4A0) that drags across paper surfaces, creating long moving shadows from the CRT housings.
- **Emotional beat:** Discovery — we're scanning the room, inventorying the scene.

### Beat 1.4: CRT Glow (3.5–5.0s)
- **Frame:** CRT screens activate — phosphor green (#33FF66) emissive glow
- **Composition:** Six CRT screens (2 per desk) illuminate simultaneously. The green casts onto desk surfaces and nearby papers.
- **Lighting:** CRT emissive adds a second light color to the scene — green mixing with warm tungsten and cool fluorescent. Three-color lighting.
- **Props:** CRT screens show implied trading data — just the glow is enough. The emissive intensity pulses subtly (0.8–1.2) to simulate data refresh.

### Beat 1.5: Paper Drift (5.0–6.5s)
- **Frame:** Documents on desks catch light
- **Composition:** Papers on desk surfaces are highlighted by the now-settled desk lamp. Implied importance — these are the trading positions.
- **Camera:** Very subtle push-in (z-axis) — unconscious tightening of focus.

### Beat 1.6: The Telex Arrives (6.5–8.0s)
- **Frame:** DOM overlay: telex-style text prints character by character
- **Composition:** Over the Three.js scene, a DOM text overlay appears — monospace font, phosphor-green color, printing "SELL GBP" letter by letter with cursor blink.
- **Typography:** 'Courier New', monospace. 32px. letter-spacing: 0.2em. All caps.
- **Position:** Upper-third of frame, left-aligned with 80px padding.

### Beat 1.7: Urgency Build (8.0–9.0s)
- **Frame:** Camera pushes in. Fluorescents flicker.
- **Composition:** The camera accelerates its z-push. Overhead fluorescent lights flicker once (opacity 1 → 0.3 → 1 over 0.3s). The telex text continues printing more lines.
- **Emotional beat:** Something is wrong. The room knows before the people do.

### Beat 1.8: Cross-Transition (9.0–9.5s)
- **Frame:** White burst + grain explosion
- **Composition:** Screen flashes white (opacity 0 → 1 → 0 over 0.5s), heavy film grain burst, then hard cut to clip 02.

---

## Clip 02 — The Cascade + The Fracture

### Beat 2.1: Numbers Rain (9.5–10.0s)
- **Frame:** Red digits cascade down the frame
- **Composition:** 1080×1920 filled with falling number digits (0-9), colored red (#FF3333), varying sizes (24px–72px). Seeded positions using mulberry32 PRNG.
- **Motion:** Digits fall at varying speeds, staggered entry from top.
- **Background:** Deep void black (#0A0A0A).

### Beat 2.2: The Pound Cracks (10.0–11.0s)
- **Frame:** Giant £ symbol with growing fracture
- **Composition:** "£" rendered at 400px, centered, in --void-text color. A hairline crack (2px, white) grows from center-top to center-bottom over 1s.
- **Typography:** Serif font (Georgia or Playfair Display), 400px, centered.
- **Background:** Number rain continues behind at reduced opacity (0.15).

### Beat 2.3: Shard Burst (11.0–12.0s)
- **Frame:** £ shatters into gold shards
- **Composition:** The £ breaks into triangular fragments (CSS clip-path polygons). Each shard flies outward from center with rotation. Gold accent color (#C9A84C).
- **Motion:** 12–16 shards, seeded trajectories (mulberry32, seed 3392). Each shard rotates and scales down as it flies outward. Duration 0.8s.
- **Texture:** Chromatic aberration kicks in during burst (R/G/B channel offset).

### Beat 2.4: Screen Shake (12.0–13.0s)
- **Frame:** Violent screen shake + chromatic aberration
- **Composition:** The entire composition root shakes (translateX/Y oscillation, ±15px, decaying). Chromatic aberration overlay intensifies. Numbers continue falling faster.
- **Camera effect:** Shake simulates physical impact — the market crash as a physical event.

### Beat 2.5: Data Freeze (13.0–14.0s)
- **Frame:** All motion stops
- **Composition:** Every animated element freezes in place. Numbers stop mid-fall. Shards freeze mid-flight. Total stillness for one full second.
- **Emotional beat:** The moment of realization. Before the consequences land.

### Beat 2.6: Hard Cut (14.0–14.5s)
- **Frame:** Instant black, then exterior begins to materialise
- **Composition:** Hard cut to #0A0D14 (night fog color). The next clip's Three.js scene begins loading through the fog.

---

## Clip 03 — The Institution Stands

### Beat 3.1: Exterior Reveal (14.5–16.0s)
- **Frame:** Low-angle Three.js exterior — Bank of England
- **Composition:** Camera positioned low, looking up at the building facade. Dense night fog (FogExp2, #0A0D14, density 0.018). Columns barely visible as darker shapes in fog.
- **Camera:** Static initially, then begins slow dolly backward.
- **Lighting:** Minimal — only ambient from overcast sky (#1a1a2a at 0.3 intensity).

### Beat 3.2: Columns Resolve (16.0–17.5s)
- **Frame:** Portland limestone columns gain clarity
- **Composition:** As fog thins (density 0.018 → 0.012), 6 columns become distinct. Ionic capitals visible at top. Columns are CylinderGeometry, slightly tapered. Material: MeshStandardMaterial, limestone color (#D4C8B0), roughness 0.85.
- **Architecture:** 4 steps (risers) at base. Building facade between columns — darker stone.

### Beat 3.3: Windows Ignite (17.5–19.0s)
- **Frame:** Windows light up one by one
- **Composition:** 6 windows between/behind columns. Each lights up sequentially (0.2s stagger). emissiveIntensity animates from 0 to high value. Warm interior glow suggests activity inside.
- **Glow:** Since no bloom post-processing, use high emissive + a soft CSS overlay glow div positioned behind the canvas.
- **Emotional beat:** The institution is awake. People are working through the night.

### Beat 3.4: Sodium Vapour (19.0–20.5s)
- **Frame:** Street lamp casts orange pool
- **Composition:** A sodium vapour street lamp (#FF8C42) activates — casting warm orange light on the wet stone ground and lower column bases.
- **Ground:** Wet Threadneedle Street — slightly reflective (metalness 0.1, roughness 0.3 on ground material). The orange light creates a warm pool in the cold scene.

### Beat 3.5: Spotlight Dies (20.5–21.5s)
- **Frame:** Institutional spotlight goes dark
- **Composition:** A white spotlight that had been faintly illuminating the facade flickers and dies (intensity 1 → 0 with two brief flickers). The building retreats into shadow, lit only by the sodium lamp and window glow.
- **Emotional beat:** Power failing. Even the institution cannot hold.

### Beat 3.6: Dolly Out (21.5–22.5s)
- **Frame:** Camera pulls back slowly
- **Composition:** The camera dollies out (z increases). The building recedes into fog, becoming a dark monolith. Windows still glow but diminished by distance. Fog reasserts.

---

## Clip 04 — The Dissolution + The Void

### Beat 4.1: Paper Storm (22.5–24.0s)
- **Frame:** Documents swirl upward
- **Composition:** 20–30 paper rectangles (--paper-warm color, varying sizes) rise and tumble through the frame. Seeded positions and trajectories (mulberry32, seed 88888).
- **Motion:** Each paper rotates on X, Y, Z axes as it rises. Wind-like motion — not uniform, chaotic but deterministic.
- **Background:** Deep void (#0e0c10) with heavy grain.

### Beat 4.2: Coin Rain (24.0–25.5s)
- **Frame:** Gold coins tumble down
- **Composition:** 15–20 gold circles (#C9A84C) fall through the frame. Varying sizes (30–60px diameter). Subtle rotation on each. Seeded with mulberry32, seed 7774.
- **Motion:** Coins fall at different rates. Some tumble (rotation). Some catch light (opacity flash). Papers from 4.1 continue but are fading.
- **Overlap:** Papers rising UP, coins falling DOWN — opposing vectors create visual tension.

### Beat 4.3: Final Number (25.5–27.0s)
- **Frame:** Exchange rate materialises
- **Composition:** "£1 = $1.5090" appears centered, large (64px), in --void-text. After 0.5s hold, digits dissolve right-to-left, one at a time (0.1s each).
- **Typography:** 'Georgia', serif. Weight 400. Letter-spacing 0.05em.
- **Background:** Coins and papers have faded. Clean dark background.

### Beat 4.4: The Void (27.0–28.5s)
- **Frame:** Everything recedes
- **Composition:** Any remaining elements fade to 0 opacity. Film grain intensifies (opacity 15% → 25%). The frame is nearly black, textured only by grain.
- **Emotional beat:** Aftermath. The emptiness after the event.

### Beat 4.5: Title Card (28.5–29.5s)
- **Frame:** "BLACK WEDNESDAY" title card
- **Composition:** Title text in --void-text (#E8DCC8), 72px, serif (Playfair Display). Centered vertically. A gold accent line (#C9A84C, 2px height) draws beneath the title (width 0 → 400px over 0.6s).
- **Entrance:** Title fades in (opacity 0 → 1, 0.4s) with subtle y-translate (-20px → 0).

### Beat 4.6: Final Black (29.5–30.0s)
- **Frame:** Hard cut to pure black
- **Composition:** Everything fades to 0 over 0.3s, then holds on pure black for the remaining frames.
