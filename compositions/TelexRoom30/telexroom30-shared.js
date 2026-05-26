/**
 * TelexRoom30 — procedural relay-room engine (1973 night-shift palette).
 * Warm umber field, amber pilot lamps, cream paper, oxidized brass, ink green.
 */
(function (global) {
  const PAL = {
    bg: "#1a1510",
    umber: "#2d241c",
    amber: "#D4A574",
    amberDim: "rgba(212, 165, 116, 0.35)",
    cream: "#EDE6D9",
    ink: "#1a1814",
    brass: "#8B6914",
    green: "#1e4d3a",
    rust: "#8C3B2E",
  };

  function mulberry32(a) {
    return function () {
      let t = (a += 0x6d2b79f5);
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  function registerEases(gsap) {
    if (typeof gsap === "undefined" || !gsap.registerPlugin) return;
    try {
      gsap.registerPlugin(window.CustomEase);
    } catch (e) {
      /* noop */
    }
    if (window.CustomEase && typeof CustomEase.create === "function") {
      CustomEase.create(
        "springHeavy",
        "M0,0 C0.1,0 0.12,1.2 0.22,1.2 0.32,1.2 0.36,0.96 0.44,0.96 0.52,0.96 0.55,1.03 0.62,1.03 0.7,1.03 0.76,1 1,1"
      );
      CustomEase.create(
        "springSnappy",
        "M0,0 C0.04,0 0.06,1.35 0.14,1.35 0.22,1.35 0.26,0.92 0.32,0.92 0.38,0.92 0.4,1.02 0.44,1.02 0.5,1.02 0.55,1 1,1"
      );
    }
  }

  function initFilmGrain(canvas, opacity, seed) {
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const w = canvas.width;
    const h = canvas.height;
    const img = ctx.createImageData(w, h);
    const data = img.data;
    const rng = mulberry32(seed || 4201);
    for (let i = 0; i < data.length; i += 4) {
      const g = (rng() * 26) | 0;
      data[i] = g;
      data[i + 1] = g;
      data[i + 2] = g;
      data[i + 3] = (opacity * 255) | 0;
    }
    ctx.putImageData(img, 0, 0);
  }

  function drawRelayMesh(canvas, time, seed) {
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);
    const drift = Math.sin(time * 0.11) * 8;
    const spacing = 64;
    ctx.strokeStyle = "rgba(212, 165, 116, 0.06)";
    ctx.lineWidth = 1;
    for (let x = drift % spacing; x < w; x += spacing) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      ctx.stroke();
    }
    for (let y = (drift * 0.7) % spacing; y < h; y += spacing) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }
    const rng = mulberry32(seed || 4202);
    ctx.fillStyle = "rgba(30, 77, 58, 0.08)";
    for (let i = 0; i < 36; i++) {
      const px = rng() * w;
      const py = rng() * h;
      const r = 2 + rng() * 3;
      ctx.beginPath();
      ctx.arc(px, py, r, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function drawRotorDrum(canvas, progress, time) {
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);
    const cx = w / 2;
    const cy = h * 0.48;
    const bandH = 420;
    const bandY = cy - bandH / 2;
    const scroll = (time * 38 + progress * 120) % 140;

    ctx.fillStyle = PAL.umber;
    ctx.strokeStyle = PAL.amberDim;
    ctx.lineWidth = 2;
    ctx.fillRect(cx - 320, bandY, 640, bandH);
    ctx.strokeRect(cx - 320, bandY, 640, bandH);

    ctx.save();
    ctx.beginPath();
    ctx.rect(cx - 300, bandY + 20, 600, bandH - 40);
    ctx.clip();
    for (let x = -scroll - 200; x < 700; x += 28) {
      ctx.fillStyle = "rgba(212, 165, 116, 0.12)";
      ctx.fillRect(cx - 300 + x, bandY + 30, 14, bandH - 60);
      ctx.fillStyle = "rgba(26, 24, 20, 0.55)";
      ctx.fillRect(cx - 300 + x + 6, bandY + 40, 4, bandH - 80);
    }
    ctx.restore();

    ctx.strokeStyle = PAL.brass;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(cx, cy, 95, 0, Math.PI * 2 * Math.min(1, progress * 1.1));
    ctx.stroke();

    ctx.fillStyle = PAL.cream;
    ctx.font = "13px 'Courier Prime', monospace";
    ctx.fillText("CHARACTER DRUM // RELAY MARK IV", cx - 150, bandY + bandH + 52);
  }

  function drawTapeCurl(canvas, progress, time) {
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);
    const tapeY = h * 0.52;
    const tapeW = 720;
    const tapeX = w / 2 - tapeW / 2;
    const advance = time * 55 + progress * 200;

    ctx.fillStyle = "#d8cfc0";
    ctx.shadowColor = "rgba(0,0,0,0.4)";
    ctx.shadowBlur = 20;
    ctx.shadowOffsetY = 10;
    ctx.fillRect(tapeX, tapeY - 44, tapeW, 88);
    ctx.shadowBlur = 0;

    ctx.strokeStyle = "rgba(26, 24, 20, 0.2)";
    ctx.lineWidth = 1;
    ctx.strokeRect(tapeX, tapeY - 44, tapeW, 88);

    const rng = mulberry32(4205);
    ctx.fillStyle = PAL.ink;
    const span = tapeW - 56;
    for (let i = 0; i < 56; i++) {
      const u = (((i * 13 - advance * 0.62) % span) + span) % span;
      const hx = tapeX + 28 + u;
      if (rng() > 0.38) continue;
      ctx.fillRect(hx, tapeY - 6, 3, 12);
      ctx.fillRect(hx, tapeY + 2, 3, 10);
    }

    ctx.fillStyle = PAL.green;
    ctx.font = "700 18px 'Courier Prime', monospace";
    ctx.fillText("PAPER ROUTE // HOLE PATTERN", tapeX, tapeY - 72);
  }

  function drawRouteForm(canvas, progress, time) {
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);
    const lx = w / 2 - 310;
    const ly = h / 2 - 400;
    const lw = 620;
    const lh = 800;

    ctx.fillStyle = PAL.cream;
    ctx.shadowColor = "rgba(0,0,0,0.45)";
    ctx.shadowBlur = 22;
    ctx.shadowOffsetY = 9;
    ctx.fillRect(lx, ly, lw, lh);
    ctx.shadowBlur = 0;
    ctx.strokeStyle = "rgba(139, 105, 20, 0.35)";
    ctx.lineWidth = 2;
    ctx.strokeRect(lx, ly, lw, lh);

    ctx.fillStyle = PAL.ink;
    ctx.font = "700 18px 'Courier Prime', monospace";
    ctx.fillText("INTERNAL ROUTING SLIP", lx + 32, ly + 52);

    const rows = [
      "ORIGIN: RELAY HALL B",
      "DESTINATION: COAST SWITCHBOARD",
      "CLASS: PRIORITY NIGHT",
      "OPERATOR ID: ————",
    ];
    ctx.font = "15px 'Courier Prime', monospace";
    let y = ly + 110;
    for (let i = 0; i < rows.length; i++) {
      if (progress < 0.12 + i * 0.12) break;
      ctx.fillText(rows[i], lx + 32, y);
      y += 48;
    }

    const stampT = 0.62;
    if (progress > stampT) {
      const alpha = Math.min(1, (progress - stampT) * 4);
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.translate(lx + lw - 200, ly + lh - 220);
      ctx.rotate(-0.12 + Math.sin(time * 0.4) * 0.02);
      ctx.fillStyle = "rgba(140, 59, 46, 0.25)";
      ctx.strokeStyle = PAL.rust;
      ctx.lineWidth = 4;
      ctx.fillRect(-80, -40, 160, 80);
      ctx.strokeRect(-80, -40, 160, 80);
      ctx.fillStyle = PAL.rust;
      ctx.font = "700 16px 'Oswald', sans-serif";
      ctx.fillText("ROUTE", -42, -8);
      ctx.fillText("PRIORITY", -52, 18);
      ctx.restore();
    }
    ctx.globalAlpha = 1;
  }

  function drawSignalInk(canvas, progress, time) {
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);
    const padX = 120;
    const padY = h * 0.38;
    const gw = w - padX * 2;
    const gh = 420;

    ctx.fillStyle = "rgba(237, 230, 217, 0.08)";
    ctx.strokeStyle = PAL.amberDim;
    ctx.lineWidth = 1;
    ctx.strokeRect(padX, padY, gw, gh);
    for (let i = 1; i < 6; i++) {
      const yy = padY + (gh / 6) * i;
      ctx.beginPath();
      ctx.moveTo(padX, yy);
      ctx.lineTo(padX + gw, yy);
      ctx.stroke();
    }

    const pts = 28;
    ctx.strokeStyle = PAL.amber;
    ctx.lineWidth = 3;
    ctx.beginPath();
    for (let i = 0; i <= pts; i++) {
      const t = i / pts;
      if (t > progress * 1.05) break;
      const x = padX + t * gw;
      const wave = Math.sin(t * 9 + time * 1.4) * 38;
      const y = padY + gh * 0.55 - t * gh * 0.35 + wave;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();

    ctx.fillStyle = PAL.cream;
    ctx.font = "14px 'Courier Prime', monospace";
    ctx.fillText("SIGNAL TRACE // INK ON RULED GLASS", padX, padY - 28);
  }

  function drawAmberHalo(canvas, progress, time) {
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);
    const cx = w / 2;
    const cy = h * 0.42;
    const pulse = 0.55 + Math.sin(time * 2.1) * 0.08 + progress * 0.12;

    const g = ctx.createRadialGradient(cx, cy, 40, cx, cy, 420);
    g.addColorStop(0, `rgba(212, 165, 116, ${0.35 * pulse})`);
    g.addColorStop(0.4, "rgba(212, 165, 116, 0.08)");
    g.addColorStop(1, "rgba(26, 21, 16, 0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);
  }

  function screenShake(tl, rootEl, time, intensity) {
    const amp = 6 * (intensity || 1);
    tl.to(rootEl, { x: amp, y: -amp * 0.35, duration: 0.03, ease: "none" }, time);
    tl.to(rootEl, { x: -amp * 0.7, y: amp * 0.45, duration: 0.03, ease: "none" }, time + 0.03);
    tl.to(rootEl, { x: amp * 0.25, y: -amp * 0.15, duration: 0.028, ease: "none" }, time + 0.06);
    tl.to(rootEl, { x: 0, y: 0, duration: 0.08, ease: "power2.out" }, time + 0.088);
  }

  function chromaticFlash(tl, layer, rEl, bEl, time, intensity) {
    const shift = 12 * (intensity || 1);
    tl.to(layer, { opacity: 1, duration: 0.03, ease: "none" }, time);
    tl.to(rEl, { x: -shift, duration: 0.06, ease: "power2.out" }, time);
    tl.to(bEl, { x: shift, duration: 0.06, ease: "power2.out" }, time);
    tl.to(rEl, { x: 0, duration: 0.1, ease: "power2.in" }, time + 0.06);
    tl.to(bEl, { x: 0, duration: 0.1, ease: "power2.in" }, time + 0.06);
    tl.to(layer, { opacity: 0, duration: 0.04, ease: "none" }, time + 0.15);
  }

  function particleBurst(tl, container, cx, cy, time, count, color, seed) {
    if (!container) return;
    const rng = mulberry32(seed || 4299);
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2 + (rng() - 0.5) * 0.35;
      const dist = 60 + rng() * 120;
      const size = 2 + rng() * 3;
      const dot = document.createElement("div");
      dot.style.cssText =
        "position:absolute;left:" +
        cx +
        "px;top:" +
        cy +
        "px;width:" +
        size +
        "px;height:" +
        size +
        "px;background:" +
        color +
        ";border-radius:50%;box-shadow:0 2px 8px rgba(0,0,0,0.5);pointer-events:none;opacity:0;z-index:200;";
      container.appendChild(dot);
      tl.fromTo(
        dot,
        { x: 0, y: 0, scale: 1, opacity: 0.85 },
        {
          x: Math.cos(angle) * dist,
          y: Math.sin(angle) * dist,
          scale: 0,
          opacity: 0,
          duration: 0.48 + rng() * 0.22,
          ease: "power2.out",
        },
        time
      );
    }
  }

  function lifePulse(tl, el, D, opts) {
    opts = opts || {};
    const scaleAmp = opts.scaleAmp != null ? opts.scaleAmp : 0.008;
    const scalePeriod = opts.scalePeriod != null ? opts.scalePeriod : 2.6;
    const yAmp = opts.yAmp != null ? opts.yAmp : 5;
    const yPeriod = opts.yPeriod != null ? opts.yPeriod : 2.1;
    const reps = Math.max(0, Math.ceil(D / scalePeriod) - 1);
    const yReps = Math.max(0, Math.ceil(D / yPeriod) - 1);
    tl.to(el, { scale: "+=" + scaleAmp, yoyo: true, repeat: reps, duration: scalePeriod / 2, ease: "sine.inOut" }, 0);
    tl.to(el, { y: "+=" + yAmp, yoyo: true, repeat: yReps, duration: yPeriod / 2, ease: "sine.inOut" }, 0.08);
  }

  global.TelexEngine = {
    PAL,
    mulberry32,
    registerEases,
    initFilmGrain,
    drawRelayMesh,
    drawRotorDrum,
    drawTapeCurl,
    drawRouteForm,
    drawSignalInk,
    drawAmberHalo,
    screenShake,
    chromaticFlash,
    particleBurst,
    lifePulse,
  };
})(typeof window !== "undefined" ? window : globalThis);
