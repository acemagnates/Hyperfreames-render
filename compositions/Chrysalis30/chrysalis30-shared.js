/**
 * Chrysalis30 — morph / 2D-3D / stagger helpers (deterministic).
 */
(function (global) {
  const C = {
    voidBg: "#050508",
    violet: "#7b5cff",
    cyan: "#2ee8d6",
    magenta: "#ff4d8d",
  };

  function registerEases(gsap) {
    if (typeof CustomEase !== "undefined") {
      gsap.registerPlugin(CustomEase);
      CustomEase.create("chrysalisSnap", "M0,0 C0.12,0.9 0.2,1 1,1");
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

  function spawnShards(parent, count, seed) {
    let s = seed >>> 0;
    const rand = () => {
      s = (s * 1103515245 + 12345) >>> 0;
      return s / 4294967296;
    };
    const frag = document.createDocumentFragment();
    const shards = [];
    const cx = 540;
    const cy = 960;
    for (let i = 0; i < count; i++) {
      const el = document.createElement("div");
      el.className = "shard";
      const angle = i * 2.399963229728653 + rand() * 0.4;
      const radius = 180 + rand() * 520;
      const w = 48 + (rand() * 90) | 0;
      const h = 120 + (rand() * 200) | 0;
      const x = cx + Math.cos(angle) * radius;
      const y = cy + Math.sin(angle) * radius;
      const z = -400 + rand() * 600;
      const rot = rand() * 360;
      el.style.width = `${w}px`;
      el.style.height = `${h}px`;
      el.style.left = `${x - w / 2}px`;
      el.style.top = `${y - h / 2}px`;
      el.dataset.z = String(z);
      el.dataset.rx = String((rand() - 0.5) * 50);
      el.dataset.ry = String((rand() - 0.5) * 80);
      frag.appendChild(el);
      shards.push(el);
    }
    parent.appendChild(frag);
    return shards;
  }

  global.Chrysalis30 = {
    colors: C,
    registerEases,
    initGrain,
    spawnShards,
  };
})(typeof window !== "undefined" ? window : globalThis);
