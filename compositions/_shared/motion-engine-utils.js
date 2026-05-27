/**
 * Motion Engine — shared deterministic helpers (AE craft, timelines, grain).
 * See docs/motion-engine/README.md
 */
(function (global) {
  const ACCENT_RGB = "230, 0, 18";

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
      CustomEase.create("meSlam", "M0,0 C0.1,0.95 0.22,1 1,1");
      CustomEase.create("meBreath", "M0,0 C0.4,0 0.6,1 1,1");
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

  function setAccentRgb(root, rgb) {
    if (root) root.style.setProperty("--accent-rgb", rgb || ACCENT_RGB);
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

  function applyCrushGrade(el) {
    const target = el && el.nodeType ? el : document.querySelector(el);
    const grade = { contrast: 1.05, saturate: 1.1, brightness: 1.0 };
    function paint() {
      if (!target) return;
      target.style.filter =
        "contrast(" + grade.contrast + ") saturate(" + grade.saturate + ") brightness(" + grade.brightness + ")";
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
  }

  function lightLeakSweep(el, tl, start) {
    const target = el && el.nodeType ? el : document.querySelector(el);
    if (!target || !tl) return;
    const at = start != null ? start : 0.15;
    gsap.set(target, { xPercent: -40, opacity: 0 });
    tl.fromTo(target, { xPercent: -40, opacity: 0 }, { xPercent: 35, opacity: 0.85, duration: 2.2, ease: "sine.inOut" }, at);
    tl.to(target, { opacity: 0, duration: 0.6, ease: "power2.in" }, at + 2.65);
  }

  function chromaticSplit(stackEl, tl, at) {
    const root = stackEl && stackEl.nodeType ? stackEl : document.querySelector(stackEl);
    if (!root || !tl) return;
    const at0 = at != null ? at : 0.2;
    const chR = root.querySelector(".ch-r");
    const chG = root.querySelector(".ch-g");
    const chB = root.querySelector(".ch-b");
    if (chR) tl.fromTo(chR, { x: -14, y: 2, opacity: 0.9 }, { x: -4, y: 0, duration: 0.35, ease: "power3.out" }, at0);
    if (chG) tl.fromTo(chG, { x: 12, y: -2, opacity: 0.8 }, { x: 3, y: 0, duration: 0.35, ease: "power3.out" }, at0);
    if (chB) tl.fromTo(chB, { scale: 1.08, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(2)" }, at0 + 0.02);
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
      { pct: 0, at: 1.2, dur: 1.2, ease: "power3.inOut" },
    ];
    keys.forEach(function (k, i) {
      if (i === 0) {
        matte.reveal.pct = k.pct;
        matte.paint();
        return;
      }
      tl.to(matte.reveal, { pct: k.pct, duration: k.dur, ease: k.ease || "power3.inOut", onUpdate: matte.paint }, k.at);
    });
  }

  function sineBreathe(tl, el, D, opts) {
    opts = opts || {};
    const delay = opts.delay != null ? opts.delay : 1.5;
    const scalePeriod = opts.scalePeriod != null ? opts.scalePeriod : 2.8;
    const scaleAmp = opts.scaleAmp != null ? opts.scaleAmp : 0.012;
    const reps = Math.max(0, Math.ceil((D - delay) / scalePeriod) - 1);
    if (reps > 0) {
      tl.to(el, { scale: "+=" + scaleAmp, yoyo: true, repeat: reps, duration: scalePeriod / 2, ease: "sine.inOut" }, delay);
    }
  }

  function wireOpticalFlare(tl, coreSel, streakSel, D, start) {
    const at = start != null ? start : 0.3;
    const core = document.querySelector(coreSel);
    const streak = document.querySelector(streakSel);
    if (core) tl.fromTo(core, { left: "8%", opacity: 0 }, { left: "72%", opacity: 0.65, duration: D * 0.85, ease: "sine.inOut" }, at);
    if (streak) tl.fromTo(streak, { left: "-75%", opacity: 0 }, { left: "-50%", opacity: 0.9, duration: D * 0.85, ease: "sine.inOut" }, at);
  }

  function isWebGLAvailable() {
    try {
      const c = document.createElement("canvas");
      return !!(global.WebGLRenderingContext && (c.getContext("webgl") || c.getContext("experimental-webgl")));
    } catch (e) {
      return false;
    }
  }

  /**
   * Subtle opacity pulse on decorative layers (finite repeat; no repeat:-1).
   */
  function ambientDecorativePulse(tl, selector, D, opts) {
    opts = opts || {};
    const at = opts.at != null ? opts.at : 0.15;
    const els = document.querySelectorAll(selector || "[data-decorative=ambient]");
    if (!els.length || !tl) return;
    const reps = Math.min(6, Math.max(2, opts.repeats != null ? opts.repeats : 4));
    tl.fromTo(
      els,
      { autoAlpha: 0.35 },
      { autoAlpha: 0.85, yoyo: true, repeat: reps, duration: 0.85, ease: "sine.inOut", stagger: 0.06 },
      at
    );
  }

  /** Prefer autoAlpha over raw opacity when driving scene visibility (HyperShader / transitions). */
  function preferAutoAlpha(gsap, targets, visible) {
    if (!gsap) return;
    gsap.set(targets, { autoAlpha: visible ? 1 : 0 });
  }

  global.MotionEngine = {
    ACCENT_RGB,
    mulberry32,
    registerEases,
    initGrain,
    setAccentRgb,
    makeTimeline,
    applyCrushGrade,
    wireCrushGrade,
    lightLeakSweep,
    chromaticSplit,
    createMatteReveal,
    wireMatteReveal,
    sineBreathe,
    wireOpticalFlare,
    isWebGLAvailable,
    ambientDecorativePulse,
    preferAutoAlpha,
  };
})(typeof window !== "undefined" ? window : globalThis);
