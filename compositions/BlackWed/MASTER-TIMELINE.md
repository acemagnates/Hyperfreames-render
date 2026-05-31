# Black Wednesday — Master Timeline (30s @ 30fps / 1080×1920)

## Global Settings

| Property   | Value         |
| ---------- | ------------- |
| Resolution | 1080 × 1920  |
| FPS        | 30            |
| Duration   | 30.0 s (900f) |
| Codec      | H.264 mp4     |

---

## Color System

| Token             | Hex       | Usage                            |
| ----------------- | --------- | -------------------------------- |
| `--paper-warm`    | `#F5E6C8` | Document surfaces, paper texture |
| `--phosphor-green`| `#33FF66` | CRT screens, terminal text       |
| `--stone-grey`    | `#8B8680` | Building stone, institutional    |
| `--void-text`     | `#E8DCC8` | Typography on dark backgrounds   |
| `--shard-color`   | `#C9A84C` | Gold accent shards               |
| `--dealing-bg`    | `#1A1210` | Warm dark interior               |
| `--night-fog`     | `#0A0D14` | Exterior night sky               |
| `--sodium-orange` | `#FF8C42` | Street lamp glow                 |
| `--burgundy`      | `#2D1B1B` | Dealing room carpet              |
| `--mahogany`      | `#3B1F1F` | Desk surfaces                    |
| `--crt-housing`   | `#A09888` | Monitor bezels                   |
| `--limestone`     | `#D4C8B0` | BoE column stone                 |

---

## Clip Structure

| Clip | ID               | Start  | Duration | End    | Beats                           |
| ---- | ---------------- | ------ | -------- | ------ | ------------------------------- |
| 01   | BlackWed-clip-01 | 0.0 s  | 9.5 s    | 9.5 s  | The Room + The Telex            |
| 02   | BlackWed-clip-02 | 9.5 s  | 5.0 s    | 14.5 s | The Cascade + The Fracture      |
| 03   | BlackWed-clip-03 | 14.5 s | 8.0 s    | 22.5 s | The Institution Stands          |
| 04   | BlackWed-clip-04 | 22.5 s | 7.5 s    | 30.0 s | The Dissolution + The Void      |

---

## Beat-by-Beat Timeline

### CLIP 01 — The Room + The Telex (0.0–9.5s)

| Time      | Frame   | Beat                  | Description                                                      |
| --------- | ------- | --------------------- | ---------------------------------------------------------------- |
| 0.0–0.5   | 0–15    | BLACK HOLD            | Pure black. Tension build.                                       |
| 0.5–2.0   | 15–60   | THE ROOM REVEALS      | Camera orbital arrive: dealing room fades in from darkness.       |
| 2.0–3.5   | 60–105  | DESK LAMP SWEEP       | Warm tungsten sweeps across the three desks (position.x anim).   |
| 3.5–5.0   | 105–150 | CRT GLOW              | Phosphor green CRT screens pulse with trading data.              |
| 5.0–6.5   | 150–195 | PAPER DRIFT           | Documents on desks subtly illuminate under lamp pass.            |
| 6.5–8.0   | 195–240 | THE TELEX ARRIVES     | Telex overlay text begins printing — "SELL GBP" cascade.         |
| 8.0–9.0   | 240–270 | URGENCY BUILD         | Camera pushes in slightly. Fluorescent lights flicker once.      |
| 9.0–9.5   | 270–285 | CROSS-TRANSITION      | Smash to white/grain burst into clip 02.                         |

### CLIP 02 — The Cascade + The Fracture (9.5–14.5s)

| Time       | Frame   | Beat                  | Description                                                     |
| ---------- | ------- | --------------------- | --------------------------------------------------------------- |
| 9.5–10.0   | 285–300 | NUMBERS RAIN          | Cascading numbers fall like a waterfall of red digits.           |
| 10.0–11.0  | 300–330 | THE POUND CRACKS      | £ symbol rendered large, hairline fracture grows across it.      |
| 11.0–12.0  | 330–360 | SHARD BURST           | £ shatters outward — gold shards fly toward camera.             |
| 12.0–13.0  | 360–390 | SCREEN SHAKE          | Violent shake + chromatic aberration. Numbers accelerate.        |
| 13.0–14.0  | 390–420 | DATA FREEZE           | All motion halts for one beat. Dead silence visual.             |
| 14.0–14.5  | 420–435 | HARD CUT              | Instant cut to black, then exterior materialises.               |

### CLIP 03 — The Institution Stands (14.5–22.5s)

| Time       | Frame   | Beat                  | Description                                                     |
| ---------- | ------- | --------------------- | --------------------------------------------------------------- |
| 14.5–16.0  | 435–480 | EXTERIOR REVEAL       | Low angle: Bank of England columns emerge from night fog.       |
| 16.0–17.5  | 480–525 | COLUMNS RESOLVE       | Portland limestone columns gain detail as fog thins.            |
| 17.5–19.0  | 525–570 | WINDOWS IGNITE        | Windows behind columns light up one by one, warm interior glow. |
| 19.0–20.5  | 570–615 | SODIUM VAPOUR         | Street lamp casts orange pool on wet Threadneedle Street.       |
| 20.5–21.5  | 615–645 | SPOTLIGHT DIES        | Institutional spotlight goes dark. Columns in shadow.           |
| 21.5–22.5  | 645–675 | DOLLY OUT             | Camera slowly pulls back. Building becomes monolith in fog.     |

### CLIP 04 — The Dissolution + The Void (22.5–30.0s)

| Time       | Frame   | Beat                  | Description                                                     |
| ---------- | ------- | --------------------- | --------------------------------------------------------------- |
| 22.5–24.0  | 675–720 | PAPER STORM           | Documents/papers swirl upward, caught in invisible wind.        |
| 24.0–25.5  | 720–765 | COIN RAIN             | Gold coins tumble downward through frame (seeded particles).    |
| 25.5–27.0  | 765–810 | FINAL NUMBER          | "£1 = $1.5090" materialises large, then dissolves digit by digit|
| 27.0–28.5  | 810–855 | THE VOID              | Everything recedes. Grain intensifies. Typography fades.        |
| 28.5–29.5  | 855–885 | TITLE CARD            | "BLACK WEDNESDAY" in --void-text, gold accent line beneath.     |
| 29.5–30.0  | 885–900 | FINAL BLACK           | Hard cut to pure black.                                         |

---

## Audio Cues (for future SFX pass)

| Time  | Cue               | Description                          |
| ----- | ------------------ | ------------------------------------ |
| 0.5   | ROOM_TONE_IN       | Low hum of fluorescent lights        |
| 2.0   | DESK_LAMP_CLICK    | Switch click, tungsten warmth        |
| 6.5   | TELEX_CLATTER      | Mechanical telex printing            |
| 9.5   | STATIC_BURST       | CRT static / white noise hit         |
| 11.0  | GLASS_SHATTER      | £ symbol shatters                    |
| 12.0  | BASS_DROP           | Sub-bass impact for shake            |
| 14.5  | NIGHT_AMBIENCE     | City night, distant traffic          |
| 17.5  | WINDOW_HUM         | Lights buzzing on                    |
| 20.5  | SPOTLIGHT_POP      | Bulb dying                           |
| 22.5  | WIND_GUST          | Papers catching wind                 |
| 28.5  | TITLE_RESOLVE      | Low tonal drone                      |
