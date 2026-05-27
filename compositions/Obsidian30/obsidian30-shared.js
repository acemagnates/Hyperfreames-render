/**
 * Obsidian30 — volcanic glass / eclipse gold helpers (deterministic).
 */
(function (global) {
  const C = {
    voidBg: "#0a0604",
    amber: "#ff9a3c",
    gold: "#ffd166",
    ember: "#c41e3a",
    ash: "#2a1f18",
  };

  function registerEases(gsap) {
    if (typeof CustomEase !== "undefined") {
      gsap.registerPlugin(CustomEase);
      CustomEase.create("obsidianSnap", "M0,0 C0.08,0.92 0.18,1 1,1");
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
      img.data[i + 1] = (v * 0.85) | 0;
      img.data[i + 2] = (v * 0.55) | 0;
      img.data[i + 3] = (opacity * 255) | 0;
    }
    ctx.putImageData(img, 0, 0);
    return ctx;
  }

  function spawnEmbers(parent, count, seed) {
    let s = seed >>> 0;
    const rand = () => {
      s = (s * 1103515245 + 12345) >>> 0;
      return s / 4294967296;
    };
    const frag = document.createDocumentFragment();
    const embers = [];
    for (let i = 0; i < count; i++) {
      const el = document.createElement("div");
      el.className = "ember clip";
      el.dataset.start = "0";
      el.dataset.duration = "5";
      el.dataset.trackIndex = "20";
      const size = 3 + (rand() * 6) | 0;
      el.style.width = `${size}px`;
      el.style.height = `${size}px`;
      el.style.left = `${rand() * 100}%`;
      el.style.top = `${rand() * 100}%`;
      el.dataset.drift = String(40 + rand() * 120);
      el.dataset.delay = String(rand() * 2);
      frag.appendChild(el);
      embers.push(el);
    }
    parent.appendChild(frag);
    return embers;
  }

  global.Obsidian30 = {
    colors: C,
    registerEases,
    initGrain,
    spawnEmbers,
  };
})(typeof window !== "undefined" ? window : globalThis);
