/**
 * Black Wednesday — Bespoke Gemini-Native Shared Animation & PRNG Engine.
 * Provides complete visual architecture helpers and deterministic math layers.
 */
(function (global) {
  // Deterministic 32-bit PRNG (mulberry32)
  function mulberry32(a) {
    return function () {
      let t = (a += 0x6d2b79f5);
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  // Pre-register GSAP Custom Eases for editorial weight
  function registerEases(gsap) {
    if (typeof CustomEase !== "undefined" && gsap.registerPlugin) {
      gsap.registerPlugin(CustomEase);
      // springHeavy: authoritative drop with zero bounce back
      CustomEase.create("springHeavy", "M0,0 C0.12,0.85 0.22,1 1,1");
      // springSnappy: rapid, elastic progression
      CustomEase.create("springSnappy", "M0,0 C0.35,0 0.15,1 1,1");
    }
  }

  // Draw procedural high-performance film grain buffer to prevent CSS-blur penalty
  function initGrain(canvas, opacity, seed) {
    if (!canvas) return null;
    const ctx = canvas.getContext("2d");
    const w = canvas.width;
    const h = canvas.height;
    const rng = mulberry32(seed || 88888);
    const img = ctx.createImageData(w, h);
    for (let i = 0; i < img.data.length; i += 4) {
      const val = (rng() * 255) | 0;
      img.data[i] = val;
      img.data[i + 1] = val;
      img.data[i + 2] = val;
      img.data[i + 3] = ((opacity || 0.17) * 255) | 0;
    }
    ctx.putImageData(img, 0, 0);
    return ctx;
  }

  // Register GSAP Master Timeline wrapper
  function makeTimeline(CID) {
    const tl = gsap.timeline({ paused: true });
    global.__timelines = global.__timelines || {};
    global.__timelines[CID] = tl;
    tl.seek(0);
    return tl;
  }

  // Multi-axis orbital parallax sways (Motivated camera sway)
  function wireOrbitalLayers(tl, D) {
    const calcRepeats = function (period) {
      return Math.max(1, Math.ceil(D / period) - 1);
    };
    // Z-BG: Slow, organic radial sway
    tl.fromTo(
      ".z-bg",
      { rotateY: -2.5, rotateX: 1.2 },
      { rotateY: 3.0, rotateX: -1.0, duration: D, ease: "sine.inOut", repeat: calcRepeats(D) },
      0
    );
    // Z-MG-UI: Staggered counter-sway
    tl.fromTo(
      ".z-mg-ui",
      { rotateY: 1.4, rotateX: -0.6 },
      { rotateY: -1.8, rotateX: 0.7, duration: D * 0.73, ease: "sine.inOut", repeat: calcRepeats(D * 0.73) },
      0
    );
    // Z-FG-1: Active X-axis camera float
    tl.fromTo(
      ".z-fg-1",
      { rotateY: -3.2, rotateX: 1.8 },
      { rotateY: 4.1, rotateX: -2.2, duration: D * 0.54, ease: "sine.inOut", repeat: calcRepeats(D * 0.54) },
      0
    );
    // Z-FG-2: Rapid foreground particle counter-drift
    tl.fromTo(
      ".z-fg-2",
      { rotateY: 3.5, rotateX: -2.0 },
      { rotateY: -4.2, rotateX: 2.6, duration: D * 0.39, ease: "sine.inOut", repeat: calcRepeats(D * 0.39) },
      0
    );
  }

  // Generate volumetric air-dust motes in z-fg-2
  function spawnDust(parent, count, seed) {
    if (!parent) return [];
    const rng = mulberry32(seed || 88888);
    const fragment = document.createDocumentFragment();
    const motes = [];
    for (let i = 0; i < count; i++) {
      const mote = document.createElement("span");
      mote.className = "dust-mote";
      const size = 2 + (rng() * 4) | 0;
      mote.style.position = "absolute";
      mote.style.borderRadius = "50%";
      mote.style.backgroundColor = "rgba(210, 155, 70, 0.35)";
      mote.style.width = size + "px";
      mote.style.height = size + "px";
      mote.style.left = rng() * 100 + "%";
      mote.style.top = rng() * 100 + "%";
      mote.style.opacity = String(0.15 + rng() * 0.35);
      fragment.appendChild(mote);
      motes.push(mote);
    }
    parent.appendChild(fragment);
    return motes;
  }

  // Generate 44 sovereign coins mapped across the 6 column coordinates
  function spawnCoins(parent, count, seed, columnXs) {
    const rng = mulberry32(seed || 7774);
    const fragment = document.createDocumentFragment();
    const coins = [];
    for (let i = 0; i < count; i++) {
      const coin = document.createElement("div");
      coin.className = "coin";
      const colX = columnXs[i % columnXs.length];
      coin.style.left = colX + (rng() - 0.5) * 36 + "px";
      coin.style.top = 320 + (rng() * 180) + "px";
      coin.textContent = "£";
      coin.dataset.landY = String(1620 + rng() * 180);
      coin.dataset.landX = String((rng() - 0.5) * 40);
      fragment.appendChild(coin);
      coins.push(coin);
    }
    parent.appendChild(fragment);
    return coins;
  }

  // Electromechanical typewriter character scrambling
  function scrambleDigits(el, finalText, tl, at, duration) {
    if (!el) return;
    const chars = "0123456789";
    const steps = 12;
    for (let s = 0; s < steps; s++) {
      tl.call(
        function () {
          let text = "";
          for (let i = 0; i < finalText.length; i++) {
            text += s === steps - 1 ? finalText[i] : chars[(s * 7 + i * 3) % 10];
          }
          el.textContent = text;
        },
        null,
        at + (duration / steps) * s
      );
    }
    tl.call(function () {
      el.textContent = finalText;
    }, null, at + duration);
  }

  // 10-shard polygonal glass fracture map reflecting natural stress fracture lines
  const shardPolygons = [
    "polygon(0% 0%, 36% 0%, 28% 44%, 0% 30%)",        // TL
    "polygon(36% 0%, 68% 0%, 72% 36%, 28% 44%)",       // TC
    "polygon(68% 0%, 100% 0%, 100% 26%, 72% 36%)",     // TR
    "polygon(0% 30%, 28% 44%, 18% 76%, 0% 62%)",       // ML
    "polygon(28% 44%, 72% 36%, 66% 70%, 18% 76%)",     // Center Core
    "polygon(72% 36%, 100% 26%, 100% 60%, 66% 70%)",   // MR
    "polygon(0% 62%, 18% 76%, 12% 100%, 0% 100%)",     // BL
    "polygon(18% 76%, 66% 70%, 60% 100%, 12% 100%)",   // BC
    "polygon(66% 70%, 100% 60%, 100% 100%, 60% 100%)", // BR
    "polygon(40% 36%, 62% 32%, 58% 54%, 36% 58%)",     // Fractured center shard
  ];

  // Column coordinate coordinates mapping the Bank exterior front risers
  const columnMap = [
    { x: 105, y: 960, scaleY: 14, scaleX: 0.28 },
    { x: 270, y: 960, scaleY: 16, scaleX: 0.30 },
    { x: 430, y: 960, scaleY: 15, scaleX: 0.28 },
    { x: 600, y: 960, scaleY: 15, scaleX: 0.29 },
    { x: 760, y: 960, scaleY: 13, scaleX: 0.27 },
    { x: 915, y: 960, scaleY: 14, scaleX: 0.28 },
  ];

  global.BlackWed = {
    mulberry32,
    registerEases,
    initGrain,
    makeTimeline,
    wireOrbitalLayers,
    spawnDust,
    spawnCoins,
    scrambleDigits,
    shardPolygons,
    columnMap,
    columnXs: [105, 270, 430, 600, 760, 915],
  };
})(typeof window !== "undefined" ? window : globalThis);
