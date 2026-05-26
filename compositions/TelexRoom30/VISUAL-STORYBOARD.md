# VISUAL STORYBOARD — TelexRoom30

Fiction: **1973 overnight teletype relay hall** — concrete props only (paper, brass, pilot lamps, routing slips). Palette: umber `#1a1510`, amber `#D4A574`, cream `#EDE6D9`, ink `#1a1814`, stamp rust `#8C3B2E`, brass `#8B6914`.

---

## Clip 01 — Cold open (wall 0–5s, local 0–5s)

| Local t | Frame intent | On-screen copy / props | Motion / camera |
|---------|--------------|------------------------|-----------------|
| 0.0–0.5 | Black field + faint mesh | HUD: `RELAY HALL // NIGHT LOG` · date `1973.11.04` | Depth-stage scale 0.94; mesh static seed |
| 0.5–1.0 | Pilot wash enters | Top light-ray rotation −26° | Ray eases in |
| 1.0–1.6 | Ledger card below frame | Meta: `SHIFT NOTE — OPEN` | Ledger translateY +80, rotateX 8°, opacity 0 |
| 1.6–2.4 | Card lands | H1 builds: `THE ROOM STILL RUNS` (Playfair) | SpringHeavy settle; micro shake at 0.9s |
| 2.4–3.2 | Brackets resolve | Four L-brackets scale 0.6→1 stagger 0.07 | springSnappy |
| 3.2–4.0 | Readability hold | Footer: `PRIMARY GRID // CIRCUIT B` | Continuous dolly scale toward 1.06 end |
| 4.0–5.0 | Chromatic edge + dust burst | Coral/teal 1-frame split then off | chromaticFlash + sparse particle burst gold |

**Layers:** `#depth-stage` perspective 1100px; `.z-bg` canvas `#grid-canvas` + `.z-light`; `.z-mg` HUD + `#ledger`; `.z-fg` brackets; `#vignette`; `#chrom-wrap`; `#grain` 540×960.

---

## Clip 02 — Rotor drum (wall 5–10s)

| Local t | Frame intent | Copy | Motion |
|---------|--------------|------|--------|
| 0.0–1.0 | Housing reveal | Label: `CHARACTER DRUM // TYPE-B` | Stage scale-in from 0.96 |
| 1.0–2.5 | Slit band scroll | Vertical windows drift (canvas) | Band scroll + subtle rotateY on housing |
| 2.5–3.8 | Brass ring draws | Ring stroke 0→360° tied to progress | ease sine |
| 3.8–5.0 | Instrument hold | Small caption under housing | Slow push Z on `.z-mg` |

**Canvas:** `#rotor-canvas` full frame behind cream bezel card.

---

## Clip 03 — Paper tape (wall 10–15s)

| Local t | Frame intent | Copy | Motion |
|---------|--------------|------|--------|
| 0.0–1.2 | Tape enters from below | Title: `PAPER ROUTE // HOLE PATTERN` | Card y +120 → 0 |
| 1.2–3.5 | Punch crawl | Deterministic holes (seeded) | Horizontal advance + time |
| 3.5–4.4 | Curl shadow deepens | — | tape shadow blur implied via offset duplicate optional skip |
| 4.4–5.0 | Lock frame | Footer: `PHYSICAL AUDIT TRAIL` | Gentle scale 1→1.02 on stage |

---

## Clip 04 — Routing slip (wall 15–20s)

| Local t | Frame intent | Copy | Motion |
|---------|--------------|------|--------|
| 0.0–1.0 | Form off-axis | Header `INTERNAL ROUTING SLIP` | rotateZ −3° → 0 |
| 1.0–3.0 | Rows type on | Four monospace lines sequential | progress gates |
| 3.0–4.2 | Stamp approaches | — | slight x drift |
| 4.2–5.0 | `ROUTE` / `PRIORITY` stamp lands | Rust oval + knock | opacity ramp; micro shake |

---

## Clip 05 — Signal ink (wall 20–25s)

| Local t | Frame intent | Copy | Motion |
|---------|--------------|------|--------|
| 0.0–1.0 | Ruled plate | `SIGNAL TRACE // INK ON RULED GLASS` | Plate fades in |
| 1.0–4.2 | Polyline draws | — | path progress = local t/5 * 1.05 |
| 4.2–5.0 | Hold + sway | — | sin wave on line via time in draw |

**Camera:** slow pan on `#depth-stage` translateX ±14px over 5s.

---

## Clip 06 — Payoff (wall 25–30s)

| Local t | Frame intent | Copy | Motion |
|---------|--------------|------|--------|
| 0.0–1.4 | Halo bloom | Canvas radial amber | drawAmberHalo pulse |
| 1.4–2.8 | Hero line | Oswald: `THE LINE STAYS LIVE` | opacity + slight tracking |
| 2.8–4.0 | Subline | Courier: `1973 SHIFT LOG — CLASS B` | fade up |
| 4.0–5.0 | Outro hold | Pilot dot (CSS) 12px | opacity breathe; vignette darken + lighten 5% |

**Outro:** Author 5s clip; VO export should add **2s silence** after last word when assembling with narration.

---

## Global HUD (root `index.html`)

- Top: `TELEXROOM30 // NIGHT RELAY` + running `00:SS.d`
- Bottom chapter line swaps per 5s wall: `I — COLD OPEN` … `VI — HOLD`
