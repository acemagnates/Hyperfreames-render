/**
 * THE CITICORP CENTER'S SECRET FLAW (Video438) Shared Visual Engine
 * Highly optimized, crash-safe procedural drawing tools for engineering blueprints,
 * stress vectors, and volumetric cinematic cameras.
 */
(function (global) {
  // Seeded PRNG
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
      // safe fallback
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
  function initFilmGrain(canvas, opacity = 0.18, seed = 438) {
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const w = canvas.width;
    const h = canvas.height;
    const img = ctx.createImageData(w, h);
    const data = img.data;
    const rng = mulberry32(seed);

    for (let i = 0; i < data.length; i += 4) {
      const g = (rng() * 35) | 0;
      data[i] = g;
      data[i + 1] = g;
      data[i + 2] = g;
      data[i + 3] = (opacity * 255) | 0;
    }
    ctx.putImageData(img, 0, 0);
  }

  // Draw Drafting Grid Background (L0 - Background)
  function drawDraftGrid(canvas, time, gridColor = "rgba(0, 245, 212, 0.03)", seed = 101) {
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);

    // Drifting coordinates for continuous micro-motion
    const shiftX = Math.sin(time * 0.15) * 12;
    const shiftY = Math.cos(time * 0.12) * 12;

    ctx.strokeStyle = gridColor;
    ctx.lineWidth = 1.0;

    const spacing = 80;

    // Vertical lines
    for (let x = shiftX % spacing; x < w; x += spacing) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      ctx.stroke();
    }

    // Horizontal lines
    for (let y = shiftY % spacing; y < h; y += spacing) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }

    // Optional compass circle elements in background corner
    ctx.strokeStyle = "rgba(0, 245, 212, 0.05)";
    ctx.beginPath();
    ctx.arc(w - 100, 200, 150, 0, Math.PI * 2);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(w - 100, 200, 152, 0, Math.PI * 2);
    ctx.setLineDash([4, 8]);
    ctx.stroke();
    ctx.setLineDash([]);
  }

  // Draw Citicorp Tower Silhouette with Highlighted Chevrons
  function drawCiticorpTower(canvas, progress, highlightProgress = 0, alertJointIndex = -1) {
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);

    const bx = w / 2; // base x
    const by = h * 0.85; // base y
    const tw = 220; // building width
    const th = 850; // building height

    // Glow setup
    ctx.shadowBlur = 0;

    // Draw coordinate axis labels (looks highly authentic)
    ctx.font = "14px 'Courier Prime', monospace";
    ctx.fillStyle = "rgba(255, 255, 255, 0.3)";
    ctx.fillText("SCALE: 1:1200", bx - 260, by + 40);
    ctx.fillText("STRUCTURAL MODEL // CITICORP", bx - 260, by + 60);

    // Stilt pillars
    ctx.strokeStyle = "#90E0EF";
    ctx.lineWidth = 4;
    ctx.beginPath();
    // Stilts are in the middle of each side, not corners!
    ctx.moveTo(bx - tw/2 + 25, by);
    ctx.lineTo(bx - tw/2 + 25, by - 90);
    ctx.moveTo(bx + tw/2 - 25, by);
    ctx.lineTo(bx + tw/2 - 25, by - 90);
    // Center column
    ctx.moveTo(bx, by);
    ctx.lineTo(bx, by - 90);
    ctx.stroke();

    // Floor outline (building body)
    ctx.strokeStyle = "rgba(0, 245, 212, 0.5)";
    ctx.lineWidth = 2;
    const buildingHeightAnimated = th * progress;
    
    ctx.beginPath();
    ctx.moveTo(bx - tw/2, by - 90);
    ctx.lineTo(bx - tw/2, by - 90 - buildingHeightAnimated);

    // Sloped roof (45 degrees)
    if (progress >= 1.0) {
      ctx.lineTo(bx + tw/2, by - 90 - th + 90); // 45 degree slope
    } else {
      ctx.lineTo(bx - tw/2 + tw * progress, by - 90 - buildingHeightAnimated);
    }
    
    ctx.lineTo(bx + tw/2, by - 90);
    ctx.closePath();
    ctx.stroke();

    // Internal structural Chevrons (8 chevron segments)
    const chevronCount = 8;
    const segmentHeight = (th - 90) / chevronCount;

    ctx.strokeStyle = "rgba(144, 224, 239, 0.3)";
    ctx.lineWidth = 1.5;

    for (let i = 0; i < chevronCount; i++) {
      const cy = by - 90 - i * segmentHeight;
      const nextY = cy - segmentHeight;

      if (by - 90 - nextY > buildingHeightAnimated) continue;

      ctx.beginPath();
      // Chevron structure: V-shape or inverted V
      ctx.moveTo(bx - tw/2, cy);
      ctx.lineTo(bx, nextY);
      ctx.lineTo(bx + tw/2, cy);
      ctx.stroke();

      // Highlight alert joint (where bolts were used instead of welds)
      if (i === alertJointIndex && highlightProgress > 0) {
        ctx.save();
        ctx.strokeStyle = "#FF3366";
        ctx.lineWidth = 4;
        ctx.shadowBlur = 15;
        ctx.shadowColor = "#FF3366";
        
        ctx.beginPath();
        ctx.arc(bx, nextY, 20 + Math.sin(highlightProgress * 15) * 5, 0, Math.PI * 2);
        ctx.stroke();
        
        ctx.fillStyle = "#FF3366";
        ctx.font = "16px 'Courier Prime', monospace";
        ctx.fillText("BOLTED JOINT // FAILED DESIGN", bx + 35, nextY + 5);
        ctx.restore();
      }
    }
  }

  // Draw close-up Joint detail schematic
  function drawJointDetail(canvas, progress, isBolted = true, stressIntensity = 0) {
    if (!canvas) return;
    const ctx = canvas.getContext;
    const w = canvas.width;
    const h = canvas.height;
    const context = canvas.getContext("2d");
    if (!context) return;
    context.clearRect(0, 0, w, h);

    const cx = w / 2;
    const cy = h / 2;

    // Heavy steel plate drawing
    context.fillStyle = "#1E2A4A";
    context.strokeStyle = "#90E0EF";
    context.lineWidth = 3;

    // Left plate
    context.beginPath();
    context.rect(cx - 160, cy - 200, 150, 400);
    context.fill();
    context.stroke();

    // Right plate
    context.beginPath();
    context.rect(cx + 10, cy - 200, 150, 400);
    context.fill();
    context.stroke();

    if (isBolted) {
      // Draw standard bolts (circles with dashed inner ring)
      context.fillStyle = "#0A122A";
      context.strokeStyle = "#FFD166";
      context.lineWidth = 2.5;

      const boltY = [cy - 120, cy - 40, cy + 40, cy + 120];
      boltY.forEach((by) => {
        // Bolt 1
        context.beginPath();
        context.arc(cx - 85, by, 22, 0, Math.PI * 2);
        context.fill();
        context.stroke();

        // Bolt 2
        context.beginPath();
        context.arc(cx + 85, by, 22, 0, Math.PI * 2);
        context.fill();
        context.stroke();
      });

      // Stress cracks if high intensity
      if (stressIntensity > 0) {
        context.strokeStyle = "#FF3366";
        context.lineWidth = 3 + Math.sin(stressIntensity * 12) * 1.5;
        context.beginPath();
        context.moveTo(cx - 5, cy - 200);
        context.lineTo(cx - 5, cy + 200);
        context.stroke();

        // Flash warnings
        context.fillStyle = "#FF3366";
        context.font = "16px 'Courier Prime', monospace";
        context.fillText("SHEAR STRESS LIMIT EXCEEDED", cx - 130, cy + 240);
      }
    } else {
      // Draw heavy welds (continuous blue/yellow glow plate joint)
      context.save();
      context.fillStyle = "#00F5D4";
      context.shadowBlur = 20;
      context.shadowColor = "#00F5D4";

      // Welded joint fill
      context.beginPath();
      context.rect(cx - 15, cy - 200, 30, 400);
      context.fill();
      context.restore();

      // Spark/Weld points
      const weldProgress = Math.min(1.0, progress * 1.5);
      context.strokeStyle = "#FFFFFF";
      context.lineWidth = 3;
      context.beginPath();
      context.moveTo(cx, cy + 200);
      context.lineTo(cx, cy + 200 - 400 * weldProgress);
      context.stroke();
    }
  }

  // Draw high-fidelity aerodynamic Wind Vectors & aerodynamic pressure curves
  function drawWindForces(canvas, time, pressureProgress = 0, isCollapsing = false) {
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);

    const cx = w / 2;
    const cy = h * 0.45;
    const tw = 240;
    const th = 700;

    // Draw subtle aerodynamic grid
    ctx.strokeStyle = "rgba(0, 245, 212, 0.05)";
    ctx.lineWidth = 1;
    for (let i = 0; i < 20; i++) {
      ctx.beginPath();
      ctx.moveTo(0, i * 100);
      ctx.lineTo(w, i * 100);
      ctx.stroke();
    }

    // Draw simple building block vector
    ctx.strokeStyle = "rgba(144, 224, 239, 0.5)";
    ctx.lineWidth = 2;
    ctx.fillStyle = "rgba(11, 19, 43, 0.8)";
    ctx.beginPath();
    ctx.rect(cx - tw/2, cy, tw, th);
    ctx.fill();
    ctx.stroke();

    // Wind flow lines rushing from left to right deforming around building
    ctx.lineWidth = 1.5;
    const lineCount = 14;
    for (let i = 0; i < lineCount; i++) {
      const ly = cy - 100 + (i / lineCount) * (th + 200);
      ctx.beginPath();
      
      // Calculate smooth wind stream curve
      ctx.moveTo(0, ly);
      
      const segments = 40;
      for (let s = 0; s <= segments; s++) {
        const sx = (s / segments) * w;
        
        let sy = ly;
        // Aero distortion around building
        const dx = sx - (cx - tw/2);
        const distY = Math.abs(ly - cy);
        
        if (sx < cx - tw/2) {
          // Approaching building
          const factor = Math.max(0, 1.0 - Math.abs(dx) / 300);
          sy -= Math.sin(factor * Math.PI * 0.5) * 60 * (ly < cy + th/2 ? -1 : 1);
        } else if (sx >= cx - tw/2 && sx <= cx + tw/2) {
          // Blocked or over building
          sy = ly - 90 * (ly < cy + th/2 ? -1 : 1);
        } else {
          // Passing building
          const adx = sx - (cx + tw/2);
          const factor = Math.max(0, 1.0 - adx / 300);
          sy -= Math.sin(factor * Math.PI * 0.5) * 60 * (ly < cy + th/2 ? -1 : 1);
        }

        // Add wind ripple noise based on time
        const wave = Math.sin(sx * 0.02 - time * 6) * 12 * pressureProgress;
        ctx.lineTo(sx, sy + wave);
      }

      ctx.strokeStyle = `rgba(0, 245, 212, ${0.1 + (i / lineCount) * 0.3})`;
      if (pressureProgress > 0.8) {
        ctx.strokeStyle = `rgba(255, 51, 102, ${0.2 + (i / lineCount) * 0.4})`;
      }
      ctx.stroke();
    }

    // Force indicators
    if (pressureProgress > 0) {
      ctx.save();
      ctx.strokeStyle = "#FF3366";
      ctx.lineWidth = 4;
      ctx.shadowBlur = 10;
      ctx.shadowColor = "#FF3366";

      // Draw big force arrows pushing against tower
      const arrowY = cy + 180;
      ctx.beginPath();
      ctx.moveTo(cx - 300, arrowY);
      ctx.lineTo(cx - 160, arrowY);
      // arrowhead
      ctx.lineTo(cx - 180, arrowY - 15);
      ctx.moveTo(cx - 160, arrowY);
      ctx.lineTo(cx - 180, arrowY + 15);
      ctx.stroke();

      ctx.fillStyle = "#FF3366";
      ctx.font = "16px 'Courier Prime', monospace";
      ctx.fillText(`WIND LOAD: ${Math.floor(pressureProgress * 135)} MPH`, cx - 310, arrowY - 25);
      ctx.restore();
    }
  }

  // Camera Shake
  function screenShake(tl, rootEl, time, intensity = 1.0) {
    const amp = 8 * intensity;
    tl.to(rootEl, { x: amp, y: -amp * 0.5, duration: 0.035, ease: "none" }, time);
    tl.to(rootEl, { x: -amp * 0.8, y: amp * 0.6, duration: 0.035, ease: "none" }, time + 0.035);
    tl.to(rootEl, { x: amp * 0.45, y: -amp * 0.3, duration: 0.03, ease: "none" }, time + 0.07);
    tl.to(rootEl, { x: -amp * 0.25, y: amp * 0.15, duration: 0.03, ease: "none" }, time + 0.1);
    tl.to(rootEl, { x: amp * 0.12, y: -amp * 0.05, duration: 0.03, ease: "none" }, time + 0.13);
    tl.to(rootEl, { x: 0, y: 0, duration: 0.07, ease: "power2.out" }, time + 0.16);
  }

  // Chromatic Flash
  function chromaticFlash(tl, layer, rEl, bEl, time, intensity = 1.0) {
    const shift = 16 * intensity;
    tl.to(layer, { opacity: 1, duration: 0.03, ease: "none" }, time);
    tl.to(rEl, { x: -shift, duration: 0.06, ease: "power2.out" }, time);
    tl.to(bEl, { x: shift, duration: 0.06, ease: "power2.out" }, time);
    tl.to(rEl, { x: 0, duration: 0.1, ease: "power2.in" }, time + 0.06);
    tl.to(bEl, { x: 0, duration: 0.1, ease: "power2.in" }, time + 0.06);
    tl.to(layer, { opacity: 0, duration: 0.04, ease: "none" }, time + 0.16);
  }

  // Particle Burst
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

  // Micro-motion pulsing loop
  function lifePulse(tl, el, D, opts = {}) {
    const scaleAmp = opts.scaleAmp != null ? opts.scaleAmp : 0.012;
    const scalePeriod = opts.scalePeriod != null ? opts.scalePeriod : 3.0;
    const yAmp = opts.yAmp != null ? opts.yAmp : 6;
    const yPeriod = opts.yPeriod != null ? opts.yPeriod : 2.5;
    const rotAmp = opts.rotAmp != null ? opts.rotAmp : 0.25;
    const rotPeriod = opts.rotPeriod != null ? opts.rotPeriod : 4.0;
    
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
    drawDraftGrid,
    drawCiticorpTower,
    drawJointDetail,
    drawWindForces,
    screenShake,
    chromaticFlash,
    particleBurst,
    lifePulse
  };
})(typeof window !== "undefined" ? window : globalThis);
