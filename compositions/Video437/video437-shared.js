/**
 * NEURO-NET GENESIS (Video437) Shared Visual Engine (Headless-Safe & High-End)
 * Programmatic Canvas & SVG motion helpers for stunning 3D-depth parallax spaces.
 */
(function (global) {
  // Deterministic PRNG
  function mulberry32(a) {
    return function () {
      let t = (a += 0x6d2b79f5);
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  // Register Custom Springs in GSAP
  function registerEases(gsap) {
    if (typeof gsap === "undefined" || !gsap.registerPlugin) return;
    try {
      gsap.registerPlugin(window.CustomEase);
    } catch (e) {
      // safe fallback if plugin load is asynchronous
    }
    if (window.CustomEase && typeof CustomEase.create === "function") {
      CustomEase.create(
        "springHeavy",
        "M0,0 C0.1,0 0.12,1.2 0.22,1.2 0.32,1.2 0.36,0.96 0.44,0.96 0.52,0.96 0.55,1.03 0.62,1.03 0.7,1.03 0.76,1 1,1"
      );
      CustomEase.create(
        "springLight",
        "M0,0 C0.06,0 0.08,1.28 0.18,1.28 0.28,1.28 0.33,0.94 0.4,0.94 0.47,0.94 0.5,1.04 0.56,1.04 0.63,1.04 0.68,1 1,1"
      );
      CustomEase.create(
        "springSnappy",
        "M0,0 C0.04,0 0.06,1.35 0.14,1.35 0.22,1.35 0.26,0.92 0.32,0.92 0.38,0.92 0.4,1.02 0.44,1.02 0.5,1.02 0.55,1 1,1"
      );
    }
  }

  // Procedural Static Film Grain (adds analog premium grit)
  function initFilmGrain(canvas, opacity = 0.12, seed = 437) {
    const ctx = canvas.getContext("2d");
    const w = canvas.width;
    const h = canvas.height;
    const img = ctx.createImageData(w, h);
    const data = img.data;
    const rng = mulberry32(seed);

    for (let i = 0; i < data.length; i += 4) {
      const g = (rng() * 45) | 0;
      data[i] = g;
      data[i + 1] = g;
      data[i + 2] = g;
      data[i + 3] = (opacity * 255) | 0;
    }
    ctx.putImageData(img, 0, 0);
  }

  // Procedural Cyber Plexus Network (L0 - Background)
  function drawPlexus(canvas, time, accentColor = "#00ff88", glowColor = "#00d4ff", seed = 1001) {
    const ctx = canvas.getContext("2d");
    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);

    const rng = mulberry32(seed);
    const nodeCount = 35;
    const nodes = [];

    // Generate deterministic nodes drifting over time
    for (let i = 0; i < nodeCount; i++) {
      const bx = rng() * w;
      const by = rng() * h;
      const speedX = (rng() - 0.5) * 50;
      const speedY = (rng() - 0.5) * 50;

      // Animate position using time and speed
      const x = (bx + speedX * time + w) % w;
      const y = (by + speedY * time + h) % h;
      nodes.push({ x, y, size: 2 + rng() * 3 });
    }

    // Draw connecting lines
    ctx.lineWidth = 0.6;
    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 220) {
          const alpha = (1.0 - dist / 220) * 0.28;
          ctx.strokeStyle = `rgba(0, 212, 255, ${alpha})`;
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.stroke();
        }
      }
    }

    // Draw glowing nodes
    for (let i = 0; i < nodeCount; i++) {
      ctx.beginPath();
      ctx.arc(nodes[i].x, nodes[i].y, nodes[i].size, 0, Math.PI * 2);
      ctx.fillStyle = accentColor;
      ctx.shadowBlur = 12;
      ctx.shadowColor = accentColor;
      ctx.fill();
      ctx.shadowBlur = 0; // reset
    }
  }

  // Waving Mathematical Cyber Terrain (2D Wireframe Landscape)
  function drawWavingGrid(canvas, time, accentColor = "#00d4ff", seed = 2002) {
    const ctx = canvas.getContext("2d");
    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);

    const cols = 22;
    const rows = 26;
    const points = [];

    // Calculate grid vertices in perspective space
    for (let r = 0; r <= rows; r++) {
      const rowPoints = [];
      const v = r / rows; // Depth factor (0 = horizon, 1 = bottom screen)
      const py = h * 0.45 + (v * h * 0.55); // exponential vertical spacing

      for (let c = 0; c <= cols; c++) {
        const u = c / cols;
        const xOffset = (u - 0.5) * w * (1.2 + v * 2.8); // fan out downwards
        const px = w * 0.5 + xOffset;

        // Wave formula deforming terrain height based on time and coords
        const wave = Math.sin(u * 8.0 - time * 2.5) * Math.cos(v * 6.0 + time * 1.8) * 45 * v;
        rowPoints.push({ x: px, y: py - wave });
      }
      points.push(rowPoints);
    }

    // Draw horizontal grid lines
    ctx.lineWidth = 1.0;
    for (let r = 0; r <= rows; r++) {
      ctx.strokeStyle = `rgba(0, 212, 255, ${0.08 + (r / rows) * 0.35})`;
      ctx.beginPath();
      ctx.moveTo(points[r][0].x, points[r][0].y);
      for (let c = 1; c <= cols; c++) {
        ctx.lineTo(points[r][c].x, points[r][c].y);
      }
      ctx.stroke();
    }

    // Draw vertical grid lines
    for (let c = 0; c <= cols; c++) {
      ctx.beginPath();
      ctx.moveTo(points[0][c].x, points[0][c].y);
      for (let r = 1; r <= rows; r++) {
        // fade lines towards horizon
        ctx.strokeStyle = `rgba(0, 212, 255, ${0.08 + (r / rows) * 0.35})`;
        ctx.lineTo(points[r][c].x, points[r][c].y);
      }
      ctx.stroke();
    }
  }

  // Camera Shake response (GSAP)
  function screenShake(tl, rootEl, time, intensity = 1.0) {
    const amp = 8 * intensity;
    tl.to(rootEl, { x: amp, y: -amp * 0.5, duration: 0.035, ease: "none" }, time);
    tl.to(rootEl, { x: -amp * 0.8, y: amp * 0.6, duration: 0.035, ease: "none" }, time + 0.035);
    tl.to(rootEl, { x: amp * 0.45, y: -amp * 0.3, duration: 0.03, ease: "none" }, time + 0.07);
    tl.to(rootEl, { x: -amp * 0.25, y: amp * 0.15, duration: 0.03, ease: "none" }, time + 0.1);
    tl.to(rootEl, { x: amp * 0.12, y: -amp * 0.05, duration: 0.03, ease: "none" }, time + 0.13);
    tl.to(rootEl, { x: 0, y: 0, duration: 0.07, ease: "power2.out" }, time + 0.16);
  }

  // Chromatic Aberration overlay flash
  function chromaticFlash(tl, layer, rEl, bEl, time, intensity = 1.0) {
    const shift = 16 * intensity;
    tl.to(layer, { opacity: 1, duration: 0.03, ease: "none" }, time);
    tl.to(rEl, { x: -shift, duration: 0.06, ease: "power2.out" }, time);
    tl.to(bEl, { x: shift, duration: 0.06, ease: "power2.out" }, time);
    tl.to(rEl, { x: 0, duration: 0.1, ease: "power2.in" }, time + 0.06);
    tl.to(bEl, { x: 0, duration: 0.1, ease: "power2.in" }, time + 0.06);
    tl.to(layer, { opacity: 0, duration: 0.04, ease: "none" }, time + 0.16);
  }

  // Floating Particle Burst
  function particleBurst(tl, container, cx, cy, time, count, color, seed = 5001) {
    if (!container || !container.appendChild) return;
    const rng = mulberry32(seed);
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2 + (rng() - 0.5) * 0.5;
      const dist = 90 + rng() * 180;
      const size = 3 + rng() * 5;
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
        ";border-radius:50%;box-shadow:0 0 10px " + color + ";pointer-events:none;opacity:0;z-index:200;";
      container.appendChild(dot);
      tl.fromTo(
        dot,
        { x: 0, y: 0, scale: 1, opacity: 0.95 },
        {
          x: Math.cos(angle) * dist,
          y: Math.sin(angle) * dist,
          scale: 0.1,
          opacity: 0,
          duration: 0.45 + rng() * 0.35,
          ease: "power3.out",
        },
        time
      );
    }
  }

  // General organic life drifting movement
  function lifePulse(tl, el, D, opts = {}) {
    const scaleAmp = opts.scaleAmp != null ? opts.scaleAmp : 0.01;
    const scalePeriod = opts.scalePeriod != null ? opts.scalePeriod : 3.0;
    const yAmp = opts.yAmp != null ? opts.yAmp : 5;
    const yPeriod = opts.yPeriod != null ? opts.yPeriod : 2.5;
    const rotAmp = opts.rotAmp != null ? opts.rotAmp : 0.25;
    const rotPeriod = opts.rotPeriod != null ? opts.rotPeriod : 4.0;
    
    // Calculates how many times to repeat
    function repeatCount(dur, period) {
      return Math.max(0, Math.ceil(dur / period) - 1);
    }

    const sReps = repeatCount(D, scalePeriod);
    const yReps = repeatCount(D, yPeriod);
    const rReps = repeatCount(D, rotPeriod);

    if (sReps >= 0) {
      tl.to(el, { scale: "+=" + scaleAmp, yoyo: true, repeat: sReps, duration: scalePeriod / 2, ease: "sine.inOut" }, 0);
    }
    if (yReps >= 0) {
      tl.to(el, { y: "+=" + yAmp, yoyo: true, repeat: yReps, duration: yPeriod / 2, ease: "sine.inOut" }, 0.15);
    }
    if (rotAmp && rReps >= 0) {
      tl.to(el, { rotation: rotAmp, yoyo: true, repeat: rReps, duration: rotPeriod / 2, ease: "sine.inOut" }, 0.3);
    }
  }

  global.VisualEngine = {
    mulberry32,
    registerEases,
    initFilmGrain,
    drawPlexus,
    drawWavingGrid,
    screenShake,
    chromaticFlash,
    particleBurst,
    lifePulse
  };
})(typeof window !== "undefined" ? window : globalThis);
