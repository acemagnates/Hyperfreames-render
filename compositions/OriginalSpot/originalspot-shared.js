/**
 * OriginalSpot — Metamorphic Glass & Obsidian cinematic engine.
 * Fully deterministic LCG and custom procedural assets.
 */
(function (global) {
  const C = {
    obsidianVault: "#070709", // hsl(240, 12%, 3%)
    tectonicShale: "#232326",  // hsl(240, 6%, 15%)
    moltenMagma: "#f33f0b",    // hsl(14, 95%, 48%)
    chronoCyan: "#0ec2dd",     // hsl(188, 88%, 46%)
    prismaticWhite: "#ffffff", // hsl(0, 0%, 100%)
    mutedSlate: "#6e6e73",     // hsl(240, 4%, 45%)
  };

  function registerEases(gsap) {
    if (typeof CustomEase !== "undefined") {
      gsap.registerPlugin(CustomEase);
      // Massive tectonic slam: abrupt stop with concrete weight
      CustomEase.create("tectonicSlam", "M0,0 C0.05,0.95 0.15,1 1,1");
      // Crystalline refraction spin ease: slow start, sweep, sudden lock
      CustomEase.create("crystalLock", "M0,0 C0.4,0 0.2,1 1,1");
      // Micro-motion gentle breathing
      CustomEase.create("breathEase", "M0,0 C0.25,0.1 0.25,1 1,1");
    }
  }

  function initGrain(canvas, opacity, seed) {
    const ctx = canvas.getContext("2d");
    const w = canvas.width;
    const h = canvas.height;
    let s = seed >>> 0;
    const rand = () => {
      s = (s * 1664525 + 1013904223) >>> 0;
      return s / 4294967296;
    };
    const img = ctx.createImageData(w, h);
    for (let i = 0; i < img.data.length; i += 4) {
      const v = (rand() * 255) | 0;
      img.data[i] = v;
      img.data[i + 1] = v;
      img.data[i + 2] = v;
      img.data[i + 3] = (opacity * 255) | 0;
    }
    ctx.putImageData(img, 0, 0);
    return ctx;
  }

  function spawnDebris(parent, count, seed) {
    let s = seed >>> 0;
    const rand = () => {
      s = (s * 1103515245 + 12345) >>> 0;
      return s / 4294967296;
    };
    const frag = document.createDocumentFragment();
    const debris = [];
    for (let i = 0; i < count; i++) {
      const el = document.createElement("div");
      el.className = "debris clip";
      el.dataset.start = "0";
      el.dataset.duration = "10";
      el.dataset.trackIndex = "25";
      const size = 3 + (rand() * 9) | 0;
      el.style.width = `${size}px`;
      el.style.height = `${size}px`;
      
      const r1 = 20 + rand() * 50;
      const r2 = 20 + rand() * 50;
      const r3 = 20 + rand() * 50;
      const r4 = 20 + rand() * 50;
      el.style.borderRadius = `${r1}% ${r2}% ${r3}% ${r4}%`;
      el.style.left = `${rand() * 100}%`;
      el.style.top = `${rand() * 100}%`;
      // Obsidian dark shards, with dynamic sulfur amber sparks
      el.style.background = rand() > 0.85 ? C.moltenMagma : C.tectonicShale;
      el.style.boxShadow = rand() > 0.85 
        ? `0 0 8px ${C.moltenMagma}, 0 2px 4px rgba(0,0,0,0.8)` 
        : "0 2px 4px rgba(0,0,0,0.9)";
      el.dataset.drift = String(40 + rand() * 180);
      el.dataset.rot = String(-120 + rand() * 240);
      frag.appendChild(el);
      debris.push(el);
    }
    parent.appendChild(frag);
    return debris;
  }

  // Heavy crystalline geometric SVGs representing physical crystal structures
  const crystalGeometricSVGs = {
    monolith: `<svg viewBox="0 0 100 100" class="geom-svg" style="fill: ${C.tectonicShale}; stroke: ${C.chronoCyan}; stroke-width: 0.75px; filter: drop-shadow(0 15px 25px rgba(0,0,0,0.85));">
      <polygon points="50,5 90,25 90,75 50,95 10,75 10,25" />
      <line x1="50" y1="5" x2="50" y2="95" />
      <line x1="10" y1="25" x2="50" y2="45" />
      <line x1="90" y1="25" x2="50" y2="45" />
      <line x1="10" y1="75" x2="50" y2="45" />
      <line x1="90" y1="75" x2="50" y2="45" />
    </svg>`,
    prism: `<svg viewBox="0 0 100 100" class="geom-svg" style="fill: rgba(14, 194, 221, 0.08); stroke: ${C.chronoCyan}; stroke-width: 1px; filter: drop-shadow(0 12px 24px rgba(14, 194, 221, 0.35));">
      <polygon points="50,10 90,70 10,70" />
      <line x1="50" y1="10" x2="50" y2="70" />
      <line x1="10" y1="70" x2="50" y2="35" />
      <line x1="90" y1="70" x2="50" y2="35" />
      <!-- Specular facets -->
      <polygon points="50,10 50,35 10,70" style="fill: rgba(255,255,255,0.06); stroke: none;" />
      <polygon points="50,10 50,35 90,70" style="fill: rgba(255,255,255,0.12); stroke: none;" />
    </svg>`
  };

  global.OriginalSpot = {
    colors: C,
    registerEases,
    initGrain,
    spawnDebris,
    crystalGeometricSVGs,
  };
})(typeof window !== "undefined" ? window : globalThis);
