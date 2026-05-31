# Black Wednesday — Beat Sheet

## Rhythm Pattern

```
HOLD — ARRIVE — SWEEP — GLOW — DRIFT — PRINT — PUSH — BURST
RAIN — CRACK — SHATTER — SHAKE — FREEZE — CUT
EMERGE — RESOLVE — IGNITE — WARM — DIE — RETREAT
SWIRL — FALL — MATERIALISE — RECEDE — RESOLVE — BLACK
```

---

## Motion verbs

### Clip 01 — The Room + The Telex (0.0–9.5s)

| Beat   | Time     | Verb        | Target           | Easing             | Notes                                   |
| ------ | -------- | ----------- | ---------------- | ------------------ | --------------------------------------- |
| 1.1    | 0.0–0.5  | **HOLD**    | Frame            | —                  | Pure black. Grain only.                 |
| 1.2    | 0.5–2.0  | **ARRIVE**  | Camera           | power2.inOut       | Orbital sweep, high-right to eye-level  |
| 1.3    | 2.0–3.5  | **SWEEP**   | Desk lamp        | sine.inOut         | position.x: 2.2 → -1.6                 |
| 1.4    | 3.5–5.0  | **GLOW**    | CRT screens      | power1.in          | emissiveIntensity: 0 → 1.0             |
| 1.5    | 5.0–6.5  | **DRIFT**   | Camera z-axis    | sine.inOut         | Subtle 5% push-in                       |
| 1.6    | 6.5–8.0  | **PRINT**   | Telex text       | steps(1)           | Character-by-character reveal           |
| 1.7    | 8.0–9.0  | **PUSH**    | Camera           | power2.in          | Accelerating z-push                     |
| 1.8    | 9.0–9.5  | **BURST**   | White flash      | expo.in            | Opacity spike + grain explosion         |

### Clip 02 — The Cascade + The Fracture (9.5–14.5s)

| Beat   | Time      | Verb        | Target           | Easing             | Notes                                  |
| ------ | --------- | ----------- | ---------------- | ------------------ | -------------------------------------- |
| 2.1    | 9.5–10.0  | **RAIN**    | Number digits    | linear             | Constant downward velocity             |
| 2.2    | 10.0–11.0 | **CRACK**   | £ fracture line  | power3.out         | Hairline grows from 0 to full height   |
| 2.3    | 11.0–12.0 | **SHATTER** | £ shards         | expo.out           | Explosive outward burst                |
| 2.4    | 12.0–13.0 | **SHAKE**   | Composition root | elastic.out(1,0.3) | Decaying oscillation ±15px             |
| 2.5    | 13.0–14.0 | **FREEZE**  | All elements     | —                  | Complete stop. Zero velocity.          |
| 2.6    | 14.0–14.5 | **CUT**     | Frame            | —                  | Instant transition to black            |

### Clip 03 — The Institution Stands (14.5–22.5s)

| Beat   | Time       | Verb        | Target           | Easing             | Notes                                 |
| ------ | ---------- | ----------- | ---------------- | ------------------ | ------------------------------------- |
| 3.1    | 14.5–16.0  | **EMERGE**  | Building         | power1.out         | Fog thins to reveal columns           |
| 3.2    | 16.0–17.5  | **RESOLVE** | Columns          | power2.out         | Detail sharpens as fog recedes        |
| 3.3    | 17.5–19.0  | **IGNITE**  | Windows          | power1.in          | Sequential window illumination        |
| 3.4    | 19.0–20.5  | **WARM**    | Street lamp      | sine.inOut         | Sodium vapour pool spreads            |
| 3.5    | 20.5–21.5  | **DIE**     | Spotlight        | power4.in          | Light flickers twice, then out        |
| 3.6    | 21.5–22.5  | **RETREAT** | Camera           | sine.inOut         | Slow dolly out into fog               |

### Clip 04 — The Dissolution + The Void (22.5–30.0s)

| Beat   | Time       | Verb          | Target          | Easing             | Notes                               |
| ------ | ---------- | ------------- | --------------- | ------------------ | ----------------------------------- |
| 4.1    | 22.5–24.0  | **SWIRL**     | Paper particles | sine.inOut         | Upward chaotic rotation             |
| 4.2    | 24.0–25.5  | **FALL**      | Coin particles  | power1.in          | Gravity-like downward motion        |
| 4.3    | 25.5–27.0  | **MATERIALISE**| Exchange rate  | power2.out         | Fade in, then digit-by-digit dissolve|
| 4.4    | 27.0–28.5  | **RECEDE**    | All elements    | power1.in          | Everything fades to grain           |
| 4.5    | 28.5–29.5  | **RESOLVE**   | Title card      | back.out(1.4)      | "BLACK WEDNESDAY" slam-settle       |
| 4.6    | 29.5–30.0  | **BLACK**     | Frame           | power2.in          | Final fade to black                 |

---

## Energy Map

```
Energy
  ▲
  │            ╱╲
  │           ╱  ╲        ╱╲
  │     ╱╲   ╱    ╲      ╱  ╲
  │    ╱  ╲ ╱      ╲    ╱    ╲
  │   ╱    ╳        ╲  ╱      ╲         ╱╲
  │  ╱              ╲╱        ╲       ╱  ╲
  │ ╱                          ╲     ╱    ╲
  │╱                            ╲   ╱      ╲
  │                              ╲ ╱        ╲___
  └──────────────────────────────────────────────▶ Time
  0    3    6    9.5   12   14.5  17.5  22.5  27  30
       ROOM    TELEX  CASCADE  EXT    WINDOWS  VOID
```

- **Low start** (0–2s): Black hold → room reveal. Slow, observational.
- **Medium build** (2–6.5s): Lamp sweep, CRT glow. Accumulating details.
- **Spike** (6.5–9.5s): Telex print → urgency → burst. First energy peak.
- **Maximum** (9.5–13s): Numbers, crack, shatter, shake. Violence of the market.
- **Dead stop** (13–14.5s): Freeze → cut. The most powerful beat is silence.
- **Low reset** (14.5–17.5s): Fog, emergence. Institutional calm.
- **Medium** (17.5–21.5s): Windows, warmth, spotlight death. Controlled tension.
- **Final decay** (22.5–30s): Paper storm → coins → void → title → black. Entropy.

---

## Transition Inventory

| From → To  | Time   | Type               | Duration |
| ---------- | ------ | ------------------ | -------- |
| 01 → 02    | 9.0s   | White burst + grain | 0.5s    |
| 02 → 03    | 14.0s  | Hard cut to black   | 0.5s    |
| 03 → 04    | 22.0s  | Fog dissolve        | 0.5s    |
| 04 → END   | 29.5s  | Fade to black       | 0.5s    |
