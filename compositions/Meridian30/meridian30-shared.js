/**
 * Meridian30 — The Forgotten Meridian (shared procedural engine)
 * Jewel-rich documentary palette: burgundy, antique gold, cream paper, deep teal.
 */
(function (global) {
  const PAL = {
    bg: "#14100e",
    gold: "#BB9457",
    goldDim: "rgba(187, 148, 87, 0.35)",
    burgundy: "#461220",
    cream: "#F4F1EA",
    ink: "#1C1915",
    teal: "#0F4C5C",
    coral: "#E56B6F",
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
    const rng = mulberry32(seed || 3001);
    for (let i = 0; i < data.length; i += 4) {
      const g = (rng() * 28) | 0;
      data[i] = g;
      data[i + 1] = g;
      data[i + 2] = g;
      data[i + 3] = (opacity * 255) | 0;
    }
    ctx.putImageData(img, 0, 0);
  }

  function drawArchiveGrid(canvas, time, seed) {
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);
    const shiftX = Math.sin(time * 0.09) * 6;
    const shiftY = Math.cos(time * 0.07) * 6;
    const spacing = 72;
    ctx.strokeStyle = "rgba(187, 148, 87, 0.04)";
    ctx.lineWidth = 1;
    for (let x = shiftX % spacing; x < w; x += spacing) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      ctx.stroke();
    }
    for (let y = shiftY % spacing; y < h; y += spacing) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }
    const rng = mulberry32(seed || 3002);
    ctx.fillStyle = "rgba(187, 148, 87, 0.03)";
    for (let i = 0; i < 40; i++) {
      const px = rng() * w;
      const py = rng() * h;
      const r = 1 + rng() * 2;
      ctx.beginPath();
      ctx.arc(px, py, r, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function drawMeridianMap(canvas, progress, time) {
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);
    const cx = w / 2;
    const cy = h * 0.52;
    const breathe = Math.sin(time * 0.5) * 3;

    ctx.save();
    ctx.translate(cx, cy + breathe);
    ctx.strokeStyle = PAL.goldDim;
    ctx.lineWidth = 1.2;
    for (let lat = -3; lat <= 3; lat++) {
      const ry = lat * 55;
      ctx.beginPath();
      ctx.ellipse(0, ry, 280, 38 + Math.abs(lat) * 8, 0, 0, Math.PI * 2);
      ctx.stroke();
    }
    for (let lon = -4; lon <= 4; lon++) {
      ctx.beginPath();
      ctx.moveTo(lon * 62, -220);
      ctx.lineTo(lon * 62, 220);
      ctx.stroke();
    }

    const meridianP = Math.min(1, Math.max(0, progress));
    ctx.strokeStyle = PAL.coral;
    ctx.lineWidth = 3;
    ctx.shadowColor = "rgba(229, 107, 111, 0.45)";
    ctx.shadowBlur = 12;
    ctx.beginPath();
    ctx.moveTo(0, -240);
    ctx.lineTo(0, -240 + 480 * meridianP);
    ctx.stroke();
    ctx.shadowBlur = 0;

    if (progress > 0.55) {
      ctx.fillStyle = PAL.gold;
      ctx.font = "700 22px 'Courier Prime', monospace";
      ctx.fillText("PRIME MERIDIAN", -120, -200);
      ctx.font = "14px 'Courier Prime', monospace";
      ctx.fillStyle = "rgba(244, 241, 234, 0.75)";
      ctx.fillText("0°00′00″ E", -68, -175);
    }
    ctx.restore();
  }

  function drawTransitCircle(canvas, progress, time) {
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);
    const cx = w / 2;
    const cy = h * 0.5;
    const rot = time * 0.12;

    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(rot * 0.15);

    const rOuter = 220;
    const arcP = Math.min(1, progress);

    ctx.strokeStyle = PAL.gold;
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.arc(0, 0, rOuter, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * arcP);
    ctx.stroke();

    ctx.strokeStyle = "rgba(187, 148, 87, 0.35)";
    for (let i = 0; i < 36; i++) {
      const a = (i / 36) * Math.PI * 2;
      const inner = i % 9 === 0 ? rOuter - 28 : rOuter - 14;
      ctx.beginPath();
      ctx.moveTo(Math.cos(a) * inner, Math.sin(a) * inner);
      ctx.lineTo(Math.cos(a) * rOuter, Math.sin(a) * rOuter);
      ctx.stroke();
    }

    ctx.fillStyle = "rgba(15, 76, 92, 0.35)";
    ctx.beginPath();
    ctx.arc(0, 0, 90, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = PAL.teal;
    ctx.lineWidth = 2;
    ctx.stroke();

    const scopeAngle = -0.4 + Math.sin(time * 0.35) * 0.08;
    ctx.save();
    ctx.rotate(scopeAngle);
    ctx.strokeStyle = PAL.cream;
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(rOuter - 20, 0);
    ctx.stroke();
    ctx.restore();

    if (progress > 0.7) {
      ctx.fillStyle = PAL.cream;
      ctx.font = "14px 'Courier Prime', monospace";
      ctx.fillText("GREENWICH // TRANSIT", -95, rOuter + 45);
    }
    ctx.restore();
  }

  function drawRedactedWire(canvas, progress) {
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);
    const lx = w / 2 - 300;
    const ly = h / 2 - 380;
    const lw = 600;
    const lh = 760;

    ctx.fillStyle = PAL.cream;
    ctx.shadowColor = "rgba(0,0,0,0.45)";
    ctx.shadowBlur = 24;
    ctx.shadowOffsetY = 8;
    ctx.fillRect(lx, ly, lw, lh);
    ctx.shadowBlur = 0;

    ctx.strokeStyle = "rgba(70, 18, 32, 0.25)";
    ctx.lineWidth = 2;
    ctx.strokeRect(lx, ly, lw, lh);

    ctx.fillStyle = PAL.ink;
    ctx.font = "700 20px 'Courier Prime', monospace";
    ctx.fillText("TELEGRAPH // CLASSIFIED", lx + 28, ly + 48);

    const lines = [
      "TO: ROYAL OBSERVATORY",
      "RE: MERIDIAN RELOCATION",
      "THE LINE WAS MOVED 47 METERS",
      "WITHOUT PUBLIC RECORD",
      "DESTROY AFTER READING",
    ];
    ctx.font = "16px 'Courier Prime', monospace";
    let y = ly + 100;
    for (let i = 0; i < lines.length; i++) {
      if (progress < (i + 1) * 0.14) break;
      if (i >= 2 && i <= 3) {
        ctx.fillStyle = PAL.burgundy;
        ctx.fillRect(lx + 24, y - 18, lw - 48, 26);
        ctx.fillStyle = PAL.ink;
      }
      ctx.fillText(lines[i], lx + 28, y);
      y += 52;
    }

    if (progress > 0.85) {
      ctx.strokeStyle = PAL.coral;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(lx + 40, ly + lh - 80);
      ctx.lineTo(lx + lw - 40, ly + lh - 120);
      ctx.stroke();
    }
  }

  function drawCoordinateRain(canvas, progress, time) {
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);
    const rng = mulberry32(3044);
    const coords = [
      "51°28′40″ N",
      "0°00′05″ W",
      "47.3m OFFSET",
      "Δ LONGITUDE",
      "1884.10.22",
    ];
    ctx.textAlign = "center";
    for (let i = 0; i < coords.length; i++) {
      const reveal = Math.min(1, Math.max(0, (progress - i * 0.12) * 4));
      if (reveal <= 0) continue;
      const y = h * 0.32 + i * 110 + Math.sin(time * 1.2 + i) * 6;
      const size = 28 + i * 4;
      ctx.globalAlpha = reveal;
      ctx.fillStyle = i === 2 ? PAL.coral : PAL.gold;
      ctx.font = `700 ${size}px 'Oswald', sans-serif`;
      ctx.fillText(coords[i], w / 2, y);
    }
    ctx.globalAlpha = 1;
    ctx.fillStyle = PAL.goldDim;
    for (let j = 0; j < 18; j++) {
      const py = ((time * 40 + j * 110) % (h + 100)) - 50;
      const px = 80 + rng() * (w - 160);
      ctx.fillRect(px, py, 2, 8 + rng() * 20);
    }
  }

  function screenShake(tl, rootEl, time, intensity) {
    const amp = 7 * (intensity || 1);
    tl.to(rootEl, { x: amp, y: -amp * 0.4, duration: 0.032, ease: "none" }, time);
    tl.to(rootEl, { x: -amp * 0.75, y: amp * 0.5, duration: 0.032, ease: "none" }, time + 0.032);
    tl.to(rootEl, { x: amp * 0.3, y: -amp * 0.2, duration: 0.028, ease: "none" }, time + 0.064);
    tl.to(rootEl, { x: 0, y: 0, duration: 0.08, ease: "power2.out" }, time + 0.092);
  }

  function chromaticFlash(tl, layer, rEl, bEl, time, intensity) {
    const shift = 14 * (intensity || 1);
    tl.to(layer, { opacity: 1, duration: 0.03, ease: "none" }, time);
    tl.to(rEl, { x: -shift, duration: 0.06, ease: "power2.out" }, time);
    tl.to(bEl, { x: shift, duration: 0.06, ease: "power2.out" }, time);
    tl.to(rEl, { x: 0, duration: 0.1, ease: "power2.in" }, time + 0.06);
    tl.to(bEl, { x: 0, duration: 0.1, ease: "power2.in" }, time + 0.06);
    tl.to(layer, { opacity: 0, duration: 0.04, ease: "none" }, time + 0.16);
  }

  function particleBurst(tl, container, cx, cy, time, count, color, seed) {
    if (!container) return;
    const rng = mulberry32(seed || 3099);
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2 + (rng() - 0.5) * 0.4;
      const dist = 70 + rng() * 130;
      const size = 2 + rng() * 4;
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
        { x: 0, y: 0, scale: 1, opacity: 0.9 },
        {
          x: Math.cos(angle) * dist,
          y: Math.sin(angle) * dist,
          scale: 0,
          opacity: 0,
          duration: 0.5 + rng() * 0.25,
          ease: "power2.out",
        },
        time
      );
    }
  }

  function lifePulse(tl, el, D, opts) {
    opts = opts || {};
    const scaleAmp = opts.scaleAmp != null ? opts.scaleAmp : 0.01;
    const scalePeriod = opts.scalePeriod != null ? opts.scalePeriod : 2.8;
    const yAmp = opts.yAmp != null ? opts.yAmp : 5;
    const yPeriod = opts.yPeriod != null ? opts.yPeriod : 2.2;
    const reps = Math.max(0, Math.ceil(D / scalePeriod) - 1);
    const yReps = Math.max(0, Math.ceil(D / yPeriod) - 1);
    tl.to(el, { scale: "+=" + scaleAmp, yoyo: true, repeat: reps, duration: scalePeriod / 2, ease: "sine.inOut" }, 0);
    tl.to(el, { y: "+=" + yAmp, yoyo: true, repeat: yReps, duration: yPeriod / 2, ease: "sine.inOut" }, 0.1);
  }

  global.MeridianEngine = {
    PAL,
    mulberry32,
    registerEases,
    initFilmGrain,
    drawArchiveGrid,
    drawMeridianMap,
    drawTransitCircle,
    drawRedactedWire,
    drawCoordinateRain,
    screenShake,
    chromaticFlash,
    particleBurst,
    lifePulse,
  };
})(typeof window !== "undefined" ? window : globalThis);
