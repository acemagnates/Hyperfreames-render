/**
 * BlackWed — Black Wednesday institutional collapse (deterministic).
 */
(function (global) {
  function mulberry32(a) {
    return function () {
      let t = (a += 0x6d2b79f5);
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  function registerEases(gsap) {
    if (typeof CustomEase !== "undefined" && gsap.registerPlugin) {
      gsap.registerPlugin(CustomEase);
      CustomEase.create("springHeavy", "M0,0 C0.12,0.88 0.22,1 1,1");
      CustomEase.create("springSnappy", "M0,0 C0.35,0 0.15,1 1,1");
    }
  }

  function initGrain(canvas, opacity, seed) {
    if (!canvas) return null;
    const ctx = canvas.getContext("2d");
    const w = canvas.width;
    const h = canvas.height;
    const rng = mulberry32(seed || 88888);
    const img = ctx.createImageData(w, h);
    for (let i = 0; i < img.data.length; i += 4) {
      const v = (rng() * 255) | 0;
      img.data[i] = v;
      img.data[i + 1] = v;
      img.data[i + 2] = v;
      img.data[i + 3] = ((opacity || 0.17) * 255) | 0;
    }
    ctx.putImageData(img, 0, 0);
    return ctx;
  }

  function makeTimeline(CID) {
    const tl = gsap.timeline({ paused: true });
    global.__timelines = global.__timelines || {};
    global.__timelines[CID] = tl;
    tl.seek(0);
    return tl;
  }

  function wireOrbitalLayers(tl, D) {
    const reps = function (period) {
      return Math.max(1, Math.ceil(D / period) - 1);
    };
    tl.fromTo(
      ".z-bg",
      { rotateY: -2.5, rotateX: 1.2 },
      { rotateY: 3, rotateX: -1, duration: D, ease: "sine.inOut", repeat: reps(D) },
      0
    );
    tl.fromTo(
      ".z-mg-ui",
      { rotateY: 1.4, rotateX: -0.6 },
      { rotateY: -1.8, rotateX: 0.7, duration: D * 0.73, ease: "sine.inOut", repeat: reps(D * 0.73) },
      0
    );
    tl.fromTo(
      ".z-fg-1",
      { rotateY: -3.2, rotateX: 1.8 },
      { rotateY: 4.1, rotateX: -2.2, duration: D * 0.54, ease: "sine.inOut", repeat: reps(D * 0.54) },
      0
    );
    tl.fromTo(
      ".z-fg-2",
      { rotateY: 3.5, rotateX: -2 },
      { rotateY: -4.2, rotateX: 2.6, duration: D * 0.39, ease: "sine.inOut", repeat: reps(D * 0.39) },
      0
    );
  }

  function spawnDust(parent, count, seed) {
    if (!parent) return [];
    const rng = mulberry32(seed);
    const frag = document.createDocumentFragment();
    const out = [];
    for (let i = 0; i < count; i++) {
      const el = document.createElement("span");
      el.className = "dust-mote";
      const s = 2 + (rng() * 4) | 0;
      el.style.width = s + "px";
      el.style.height = s + "px";
      el.style.left = rng() * 100 + "%";
      el.style.top = rng() * 100 + "%";
      el.style.opacity = String(0.15 + rng() * 0.35);
      frag.appendChild(el);
      out.push(el);
    }
    parent.appendChild(frag);
    return out;
  }

  function spawnCoins(parent, count, seed, columnXs) {
    const rng = mulberry32(seed);
    const frag = document.createDocumentFragment();
    const coins = [];
    for (let i = 0; i < count; i++) {
      const el = document.createElement("div");
      el.className = "coin";
      const col = columnXs[i % columnXs.length];
      el.style.left = col + (rng() - 0.5) * 36 + "px";
      el.style.top = 320 + (rng() * 180) + "px";
      el.textContent = "£";
      el.dataset.landY = String(1620 + rng() * 180);
      el.dataset.landX = String((rng() - 0.5) * 40);
      frag.appendChild(el);
      coins.push(el);
    }
    parent.appendChild(frag);
    return coins;
  }

  function scrambleDigits(el, finalText, tl, at, duration) {
    if (!el) return;
    const chars = "0123456789";
    const steps = 12;
    for (let s = 0; s < steps; s++) {
      tl.call(
        function () {
          let t = "";
          for (let i = 0; i < finalText.length; i++) {
            t += s === steps - 1 ? finalText[i] : chars[(s * 7 + i * 3) % 10];
          }
          el.textContent = t;
        },
        null,
        at + (duration / steps) * s
      );
    }
    tl.call(function () {
      el.textContent = finalText;
    }, null, at + duration);
  }

  const shardPolygons = [
    "polygon(0% 0%, 36% 0%, 28% 44%, 0% 30%)",
    "polygon(36% 0%, 68% 0%, 72% 36%, 28% 44%)",
    "polygon(68% 0%, 100% 0%, 100% 26%, 72% 36%)",
    "polygon(0% 30%, 28% 44%, 18% 76%, 0% 62%)",
    "polygon(28% 44%, 72% 36%, 66% 70%, 18% 76%)",
    "polygon(72% 36%, 100% 26%, 100% 60%, 66% 70%)",
    "polygon(0% 62%, 18% 76%, 12% 100%, 0% 100%)",
    "polygon(18% 76%, 66% 70%, 60% 100%, 12% 100%)",
    "polygon(66% 70%, 100% 60%, 100% 100%, 60% 100%)",
    "polygon(40% 36%, 62% 32%, 58% 54%, 36% 58%)",
  ];

  const columnMap = [
    { x: 105, y: 960, scaleY: 14, scaleX: 0.28 },
    { x: 270, y: 960, scaleY: 16, scaleX: 0.3 },
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
