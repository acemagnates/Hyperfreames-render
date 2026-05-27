/**
 * CocaCola40 V2 — cinematic cola spot helpers (deterministic, hf-seek).
 */
(function (global) {
  const RED = 0xf40009;
  const RED_DARK = 0x1a0508;
  const GOLD = 0xd4a574;
  /** Shadow Cut–aligned base (tinted, not pure black) */
  const VOID = 0x0e0c10;
  const ACCENT_RGB = "230, 0, 18";

  const PLATE_BASE = "../../assets/CocaCola40/plates/v2/";
  const PLATES = {
    VOID_PRIMARY: PLATE_BASE + "01-red-bokeh-atmosphere.jpeg",
    VOID_BOKEH_ALT: PLATE_BASE + "01b-red-orange-bokeh.jpeg",
    VOID_GRADIENT: PLATE_BASE + "01c-dark-red-gradient.jpeg",
    ICE_CONDENSATION: PLATE_BASE + "02-ice-condensation-glass.jpeg",
    ICE_COLA_CLOSEUP: PLATE_BASE + "02b-cola-ice-closeup-marco-verch.jpeg",
    ICE_CUBES_MACRO: PLATE_BASE + "02c-ice-cubes-macro.jpeg",
    POUR_PRIMARY: PLATE_BASE + "03c-cola-pour-into-glass-ice.jpeg",
    POUR_SPLASH: PLATE_BASE + "03-pour-liquid-splash.jpeg",
    POUR_SERVING: PLATE_BASE + "03b-serving-ice-cold-cola.jpg",
    HERO_GLASS: PLATE_BASE + "04-hero-glass-coca-cola.png",
    HERO_BRANDED: PLATE_BASE + "04b-cola-branded-glass.jpg",
    BOTTLE_WINDOWSILL: PLATE_BASE + "05-bottle-windowsill-product.jpg",
    BOTTLE_VINTAGE: PLATE_BASE + "05b-vintage-glass-bottle.jpg",
    FIZZ_FOAM: PLATE_BASE + "06-carbonation-foam-bubbles.jpeg",
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
    if (typeof CustomEase !== "undefined" && gsap && gsap.registerPlugin) {
      gsap.registerPlugin(CustomEase);
      CustomEase.create("cokeSlam", "M0,0 C0.1,0.95 0.22,1 1,1");
      CustomEase.create("cokeBreath", "M0,0 C0.4,0 0.6,1 1,1");
    }
  }

  function initGrain(canvas, opacity, seed) {
    if (!canvas) return null;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;
    const w = canvas.width;
    const h = canvas.height;
    const rng = mulberry32(seed || 4040);
    const img = ctx.createImageData(w, h);
    for (let i = 0; i < img.data.length; i += 4) {
      const v = (rng() * 255) | 0;
      img.data[i] = v;
      img.data[i + 1] = v;
      img.data[i + 2] = v;
      img.data[i + 3] = ((opacity || 0.2) * 255) | 0;
    }
    ctx.putImageData(img, 0, 0);
    return ctx;
  }

  function setAccentRgb(root) {
    if (root) root.style.setProperty("--accent-rgb", ACCENT_RGB);
  }

  function makeTimeline(CID) {
    const tl = gsap.timeline({ paused: true });
    window.addEventListener("hf-seek", function (e) {
      tl.seek(e.detail.time);
    });
    window.__timelines = window.__timelines || {};
    tl.seek(0);
    window.__timelines[CID] = tl;
    return tl;
  }

  /** Crush grade proxy — wire with wireCrushGrade(tl, crush, D, start). */
  function applyCrushGrade(el) {
    const target = el && el.nodeType ? el : document.querySelector(el);
    const grade = { contrast: 1.05, saturate: 1.1, brightness: 1.0 };
    function paint() {
      if (!target) return;
      target.style.filter =
        "contrast(" +
        grade.contrast +
        ") saturate(" +
        grade.saturate +
        ") brightness(" +
        grade.brightness +
        ")";
    }
    return { el: target, grade, paint };
  }

  function wireCrushGrade(tl, crush, D, start, opts) {
    if (!crush || !crush.el) return;
    opts = opts || {};
    const s = start != null ? start : 0.1;
    const from = opts.from || { contrast: 0.92, saturate: 0.85, brightness: 0.9 };
    const to = opts.to || { contrast: 1.25, saturate: 1.45, brightness: 1.02 };
    tl.fromTo(
      crush.grade,
      from,
      Object.assign({}, to, {
        duration: opts.duration != null ? opts.duration : 1.8,
        ease: opts.ease || "power2.inOut",
        onUpdate: crush.paint,
      }),
      s
    );
    if (opts.resolve !== false) {
      tl.to(
        crush.grade,
        { contrast: 1.15, saturate: 1.3, brightness: 1.0, duration: 0.4, ease: "power2.out", onUpdate: crush.paint },
        D - 0.6
      );
    }
  }

  /** Screen-blend light leak sweep on overlay element. */
  function lightLeakSweep(el, tl, start) {
    const at = start != null ? start : 0.15;
    const target = el && el.nodeType ? el : document.querySelector(el);
    if (!target || !tl) return;
    gsap.set(target, { xPercent: -40, opacity: 0 });
    tl.fromTo(
      target,
      { xPercent: -40, opacity: 0 },
      { xPercent: 35, opacity: 0.85, duration: 2.2, ease: "sine.inOut" },
      at
    );
    tl.to(target, { opacity: 0, duration: 0.6, ease: "power2.in" }, at + 2.65);
  }

  /** Animate .ch-r / .ch-g / .ch-b inside stack (build HTML in clip). */
  function chromaticSplit(stackEl, tl, at) {
    const root = stackEl && stackEl.nodeType ? stackEl : document.querySelector(stackEl);
    if (!root || !tl) return;
    const at0 = at != null ? at : 0.2;
    const chR = root.querySelector(".ch-r");
    const chG = root.querySelector(".ch-g");
    const chB = root.querySelector(".ch-b");
    if (chR) {
      tl.fromTo(chR, { x: -14, y: 2, opacity: 0.9 }, { x: -4, y: 0, duration: 0.35, ease: "power3.out" }, at0);
    }
    if (chG) {
      tl.fromTo(chG, { x: 12, y: -2, opacity: 0.8 }, { x: 3, y: 0, duration: 0.35, ease: "power3.out" }, at0);
    }
    if (chB) {
      tl.fromTo(chB, { scale: 1.08, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(2)" }, at0 + 0.02);
    }
  }

  /** Collapse chromatic split before SLAM. */
  function chromaticCollapse(stackEl, tl, at) {
    const root = stackEl && stackEl.nodeType ? stackEl : document.querySelector(stackEl);
    if (!root || !tl) return;
    const at0 = at != null ? at : 0;
    ["ch-r", "ch-g"].forEach(function (cls) {
      const ch = root.querySelector("." + cls);
      if (ch) tl.to(ch, { x: 0, y: 0, opacity: 0, duration: 0.12, ease: "power2.in" }, at0);
    });
  }

  /** Motion-streak clones; parent receives .streak children. */
  function velocityStreak(parent, imgSrc, tl, opts) {
    const wrap = parent && parent.nodeType ? parent : document.querySelector(parent);
    if (!wrap || !tl) return [];
    opts = opts || {};
    const count = opts.count != null ? opts.count : 5;
    const start = opts.start != null ? opts.start : 1.0;
    const nodes = [];
    const frag = document.createDocumentFragment();
    for (let i = 0; i < count; i++) {
      const div = document.createElement("div");
      div.className = "streak s" + i;
      const img = document.createElement("img");
      img.src = imgSrc;
      img.alt = "";
      div.appendChild(img);
      frag.appendChild(div);
      nodes.push(div);
    }
    wrap.appendChild(frag);
    nodes.forEach(function (node, i) {
      gsap.set(node, { y: 80 + i * 22, opacity: 0 });
      const lag = i * 0.04;
      tl.fromTo(
        node,
        { y: 80 + i * 22, opacity: 0.35 - i * 0.06 },
        { y: -40, opacity: 0, duration: 0.55, ease: "none" },
        start + lag
      );
    });
    if (opts.moveParent !== false) {
      tl.fromTo(wrap, { y: 40 }, { y: -120, duration: 0.7, ease: "power4.in" }, start - 0.05);
    }
    return nodes;
  }

  function createMatteReveal(wrapSel) {
    const wrap = typeof wrapSel === "string" ? document.querySelector(wrapSel) : wrapSel;
    const reveal = { pct: 100 };
    function paint() {
      if (wrap) wrap.style.clipPath = "inset(" + reveal.pct + "% 0 0 0)";
    }
    return { wrap, reveal, paint };
  }

  function wireMatteReveal(tl, matte, keys) {
    if (!matte || !matte.wrap) return;
    keys = keys || [
      { pct: 100, at: 0, dur: 0, ease: "none" },
      { pct: 92, at: 0.2, dur: 0.9, ease: "sine.inOut" },
      { pct: 40, at: 1.1, dur: 0.35, ease: "power4.in" },
      { pct: 0, at: 1.45, dur: 0.8, ease: "sine.out" },
    ];
    keys.forEach(function (k, i) {
      if (i === 0) {
        matte.reveal.pct = k.pct;
        matte.paint();
        return;
      }
      tl.to(
        matte.reveal,
        { pct: k.pct, duration: k.dur, ease: k.ease || "power3.inOut", onUpdate: matte.paint },
        k.at
      );
    });
  }

  /** Ambient pulse on `[data-decorative=ambient]` layers (finite repeat). Pass `gsap` from clip. */
  function ambientDecorativePulse(gsapRef, tl, selector, opts) {
    if (!tl || !gsapRef) return;
    opts = opts || {};
    const at = opts.at != null ? opts.at : 0.18;
    const els = document.querySelectorAll(selector || "[data-decorative=ambient]");
    if (!els.length) return;
    const reps = Math.min(6, Math.max(2, opts.repeats != null ? opts.repeats : 4));
    gsapRef.fromTo(
      els,
      { autoAlpha: 0.15 },
      { autoAlpha: 0.62, yoyo: true, repeat: reps, duration: 0.75, ease: "sine.inOut", stagger: 0.07 },
      at
    );
  }

  function sineBreathe(tl, el, D, opts) {
    opts = opts || {};
    const scaleAmp = opts.scaleAmp != null ? opts.scaleAmp : 0.012;
    const scalePeriod = opts.scalePeriod != null ? opts.scalePeriod : 2.8;
    const yAmp = opts.yAmp != null ? opts.yAmp : 6;
    const yPeriod = opts.yPeriod != null ? opts.yPeriod : 2.2;
    const delay = opts.delay != null ? opts.delay : 1.5;
    const reps = Math.max(0, Math.ceil((D - delay) / scalePeriod) - 1);
    const yReps = Math.max(0, Math.ceil((D - delay) / yPeriod) - 1);
    if (reps > 0) {
      tl.to(el, { scale: "+=" + scaleAmp, yoyo: true, repeat: reps, duration: scalePeriod / 2, ease: "sine.inOut" }, delay);
    }
    if (yReps > 0) {
      tl.to(el, { y: "+=" + yAmp, yoyo: true, repeat: yReps, duration: yPeriod / 2, ease: "sine.inOut" }, delay + 0.08);
    }
  }

  function wireOpticalFlare(tl, coreSel, streakSel, D, start) {
    const at = start != null ? start : 0.3;
    const core = document.querySelector(coreSel);
    const streak = document.querySelector(streakSel);
    if (core) {
      tl.fromTo(core, { left: "8%", opacity: 0 }, { left: "72%", opacity: 0.65, duration: D * 0.85, ease: "sine.inOut" }, at);
    }
    if (streak) {
      tl.fromTo(streak, { left: "-75%", opacity: 0 }, { left: "-50%", opacity: 0.9, duration: D * 0.85, ease: "sine.inOut" }, at);
    }
  }

  function spawnSparkles(parent, count, seed) {
    if (!parent) return [];
    const rng = mulberry32(seed || 606);
    const out = [];
    const frag = document.createDocumentFragment();
    for (let i = 0; i < count; i++) {
      const s = document.createElement("div");
      s.className = "spark";
      s.style.left = rng() * 100 + "%";
      s.style.top = rng() * 100 + "%";
      frag.appendChild(s);
      out.push(s);
    }
    parent.appendChild(frag);
    return out;
  }

  function addHandheld(target, gsap, seed, amp) {
    if (!target || !gsap) return;
    const rng = mulberry32(seed || 77);
    const ax = (amp && amp.x) || 5;
    const ay = (amp && amp.y) || 7;
    const period = 2.1 + rng() * 1.4;
    const reps = Math.max(0, Math.ceil(5 / period) - 1);
    gsap.to(target, {
      x: function () {
        return (rng() - 0.5) * ax * 2;
      },
      y: function () {
        return (rng() - 0.5) * ay * 2;
      },
      duration: period,
      repeat: reps,
      yoyo: true,
      ease: "sine.inOut",
    });
  }

  function spawnBubbles(parent, count, seed) {
    if (!parent) return [];
    const rng = mulberry32(seed || 303);
    const out = [];
    const frag = document.createDocumentFragment();
    for (let i = 0; i < count; i++) {
      const b = document.createElement("div");
      b.className = "bubble";
      const size = (8 + (rng() * 36)) | 0;
      b.style.width = size + "px";
      b.style.height = size + "px";
      b.style.left = rng() * 100 + "%";
      b.style.bottom = -10 - rng() * 20 + "%";
      b.dataset.dur = String(0.9 + rng() * 0.9);
      b.dataset.delay = String(rng() * 0.6);
      b.dataset.drift = String((rng() - 0.5) * 80);
      frag.appendChild(b);
      out.push(b);
    }
    parent.appendChild(frag);
    return out;
  }

  function isWebGLAvailable() {
    try {
      const c = document.createElement("canvas");
      return !!(global.WebGLRenderingContext && (c.getContext("webgl") || c.getContext("experimental-webgl")));
    } catch (e) {
      return false;
    }
  }

  function createRenderer(canvas) {
    if (!global.THREE || !canvas || !isWebGLAvailable()) {
      return { render: function () {}, setSize: function () {} };
    }
    try {
      const r = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false });
      r.setSize(1080, 1920, false);
      r.setPixelRatio(1);
      r.toneMapping = THREE.ACESFilmicToneMapping;
      r.toneMappingExposure = 1.25;
      if (THREE.SRGBColorSpace) r.outputColorSpace = THREE.SRGBColorSpace;
      return r;
    } catch (e) {
      return { render: function () {}, setSize: function () {} };
    }
  }

  function createScene() {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(VOID);
    scene.fog = new THREE.Fog(VOID, 8, 42);
    const camera = new THREE.PerspectiveCamera(42, 1080 / 1920, 0.15, 80);
    camera.position.set(0, 3.2, 14);
    return { scene, camera };
  }

  function addColaLights(scene) {
    scene.add(new THREE.AmbientLight(0x2a0810, 0.45));
    const key = new THREE.SpotLight(0xff2230, 42, 55, Math.PI / 5, 0.62, 1.1);
    key.position.set(6, 12, 8);
    scene.add(key);
    const rim = new THREE.SpotLight(GOLD, 28, 48, Math.PI / 4.5, 0.55, 1);
    rim.position.set(-5, 6, -10);
    rim.target.position.set(0, 1.5, 0);
    scene.add(rim);
    scene.add(rim.target);
    const fill = new THREE.DirectionalLight(0xff6b8a, 1.2);
    fill.position.set(-8, 4, 6);
    scene.add(fill);
  }

  function addReflectiveFloor(scene) {
    const floor = new THREE.Mesh(
      new THREE.PlaneGeometry(30, 30),
      new THREE.MeshStandardMaterial({ color: 0x120408, roughness: 0.35, metalness: 0.65 })
    );
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -3.25;
    scene.add(floor);
    return floor;
  }

  function orbitBottle(camera, p) {
    const r = 16 - p * 5;
    const ang = p * Math.PI * 1.1 - Math.PI * 0.35;
    camera.position.x = Math.sin(ang) * r;
    camera.position.z = Math.cos(ang) * r;
    camera.position.y = 2.8 + p * 1.2;
    camera.lookAt(0, 1.8, 0);
  }

  global.CocaCola40 = {
    RED,
    GOLD,
    VOID,
    ACCENT_RGB,
    PLATE_BASE,
    PLATES,
    registerEases,
    initGrain,
    setAccentRgb,
    makeTimeline,
    applyCrushGrade,
    wireCrushGrade,
    lightLeakSweep,
    chromaticSplit,
    chromaticCollapse,
    velocityStreak,
    ambientDecorativePulse,
    createMatteReveal,
    wireMatteReveal,
    sineBreathe,
    wireOpticalFlare,
    spawnSparkles,
    addHandheld,
    spawnBubbles,
    mulberry32,
    isWebGLAvailable,
    createRenderer,
    createScene,
    addColaLights,
    addReflectiveFloor,
    orbitBottle,
  };
})(typeof window !== "undefined" ? window : globalThis);
