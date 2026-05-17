/**
 * CALENDAR-654 shared motion helpers (deterministic, no Math.random).
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
    if (typeof gsap === "undefined" || !gsap.registerPlugin) return;
    try {
      gsap.registerPlugin(window.CustomEase);
    } catch (e) {
      /* optional */
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

  function repeatCount(D, period) {
    return Math.max(0, Math.ceil(D / period) - 1);
  }

  function screenShake(tl, rootEl, time, intensity) {
    const amp = 6 * (intensity == null ? 1 : intensity);
    tl.to(rootEl, { x: amp, duration: 0.035, ease: "none" }, time);
    tl.to(rootEl, { x: -amp * 0.8, duration: 0.035, ease: "none" }, time + 0.035);
    tl.to(rootEl, { x: amp * 0.45, duration: 0.03, ease: "none" }, time + 0.07);
    tl.to(rootEl, { x: -amp * 0.25, duration: 0.03, ease: "none" }, time + 0.1);
    tl.to(rootEl, { x: amp * 0.12, duration: 0.03, ease: "none" }, time + 0.13);
    tl.to(rootEl, { x: 0, duration: 0.07, ease: "power2.out" }, time + 0.16);
  }

  function particleBurst(tl, container, cx, cy, time, count, color, seed) {
    if (!container || !container.appendChild) return;
    const rng = mulberry32((seed != null ? seed : 0x65400001) >>> 0);
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2 + (rng() - 0.5) * 0.45;
      const dist = 70 + rng() * 150;
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
        ";border-radius:50%;box-shadow:0 2px 8px rgba(0,0,0,0.5);pointer-events:none;opacity:0;";
      container.appendChild(dot);
      tl.fromTo(
        dot,
        { x: 0, y: 0, scale: 1, opacity: 0.92 },
        {
          x: Math.cos(angle) * dist,
          y: Math.sin(angle) * dist,
          scale: 0,
          opacity: 0,
          duration: 0.52 + rng() * 0.28,
          ease: "power2.out",
        },
        time
      );
    }
  }

  function chromaticFlash(tl, layer, rEl, bEl, time, intensity) {
    const shift = 14 * (intensity == null ? 1 : intensity);
    tl.to(layer, { opacity: 1, duration: 0.03, ease: "none" }, time);
    tl.to(rEl, { x: -shift, duration: 0.06, ease: "power2.out" }, time);
    tl.to(bEl, { x: shift, duration: 0.06, ease: "power2.out" }, time);
    tl.to(rEl, { x: 0, duration: 0.1, ease: "power2.in" }, time + 0.06);
    tl.to(bEl, { x: 0, duration: 0.1, ease: "power2.in" }, time + 0.06);
    tl.to(layer, { opacity: 0, duration: 0.04, ease: "none" }, time + 0.16);
  }

  function bracketPulse(tl, selector, time) {
    tl.to(selector, { scale: 1.08, duration: 0.08, ease: "power2.out" }, time);
    tl.to(
      selector,
      { scale: 1, duration: 0.32, ease: "elastic.out(1, 0.4)" },
      time + 0.08
    );
  }

  function bgPulse(tl, bgState, time, intensity, updateBG) {
    const boost = 0.08 * (intensity == null ? 1 : intensity);
    tl.to(
      bgState,
      {
        opacity: "+=" + boost,
        size: "+=8",
        duration: 0.15,
        ease: "power2.out",
        onUpdate: updateBG,
      },
      time
    );
    tl.to(
      bgState,
      {
        opacity: "-=" + boost,
        size: "-=8",
        duration: 0.5,
        ease: "power2.in",
        onUpdate: updateBG,
      },
      time + 0.15
    );
  }

  function glowBleed(tl, bgEl, heroPosition, time, rgbCsv, duration) {
    const dur = duration == null ? 0.5 : duration;
    const x = heroPosition.x;
    const y = heroPosition.y;
    tl.to(
      bgEl,
      {
        background:
          "radial-gradient(ellipse 62% 52% at " +
          x +
          "% " +
          y +
          "%, rgba(" +
          rgbCsv +
          ", 0.24), transparent 56%)",
        duration: dur * 0.32,
        ease: "power2.out",
      },
      time
    );
    tl.to(
      bgEl,
      {
        background:
          "radial-gradient(ellipse 74% 58% at 50% 46%, rgba(" +
          rgbCsv +
          ", 0.16), transparent 64%)",
        duration: dur * 0.68,
        ease: "power1.inOut",
      },
      time + dur * 0.32
    );
  }

  function lifePulse(tl, el, D, opts) {
    const o = opts || {};
    const scaleAmp = o.scaleAmp != null ? o.scaleAmp : 0.012;
    const scalePeriod = o.scalePeriod != null ? o.scalePeriod : 3.4;
    const yAmp = o.yAmp != null ? o.yAmp : 4;
    const yPeriod = o.yPeriod != null ? o.yPeriod : 2.6;
    const rotAmp = o.rotAmp != null ? o.rotAmp : 0.35;
    const rotPeriod = o.rotPeriod != null ? o.rotPeriod : 4.2;
    const startOffset = o.startOffset != null ? o.startOffset : 0;
    const sReps = repeatCount(D, scalePeriod);
    const yReps = repeatCount(D, yPeriod);
    const rReps = repeatCount(D, rotPeriod);
    if (sReps >= 0) {
      tl.to(
        el,
        {
          scale: "+=" + scaleAmp,
          yoyo: true,
          repeat: sReps,
          duration: scalePeriod / 2,
          ease: "sine.inOut",
        },
        startOffset
      );
    }
    if (yReps >= 0) {
      tl.to(
        el,
        {
          y: "+=" + yAmp,
          yoyo: true,
          repeat: yReps,
          duration: yPeriod / 2,
          ease: "sine.inOut",
        },
        startOffset + 0.25
      );
    }
    if (rotAmp && rReps >= 0) {
      tl.to(
        el,
        {
          rotation: rotAmp,
          yoyo: true,
          repeat: rReps,
          duration: rotPeriod / 2,
          ease: "sine.inOut",
        },
        startOffset + 0.5
      );
    }
  }

  function orbitalReveal(tl, containerEl, time, duration) {
    const d = duration == null ? 1.0 : duration;
    tl.fromTo(
      containerEl,
      { rotateY: -12, rotateX: 5 },
      { rotateY: 0, rotateX: 0, duration: d, ease: "power3.out" },
      time
    );
    tl.from(containerEl, { opacity: 0, duration: 0.4, ease: "power2.out" }, time);
  }

  function snapZoomWithRecover(tl, heroEl, time, opts) {
    const o = opts || {};
    const ps = o.peakScale != null ? o.peakScale : 1.6;
    const pz = o.peakZ != null ? o.peakZ : 400;
    const pd = o.peakDur != null ? o.peakDur : 0.18;
    const rd = o.recoverDur != null ? o.recoverDur : 0.55;
    tl.fromTo(
      heroEl,
      { scale: 1, z: 0 },
      { scale: ps, z: pz, duration: pd, ease: "power4.out" },
      time
    );
    tl.to(
      heroEl,
      { scale: 1, z: 0, duration: rd, ease: "elastic.out(1, 0.38)" },
      time + pd
    );
  }

  /** Spec snapZoom: crush depth + blur non-hero layers, then recover blur. */
  function snapZoomImpact(tl, heroEl, blurSelectors, time, opts) {
    const o = opts || {};
    const blurPx = o.blurPx != null ? o.blurPx : 6;
    const peakDur = o.peakDur != null ? o.peakDur : 0.2;
    const recoverDur = o.recoverDur != null ? o.recoverDur : 0.65;
    const sel = blurSelectors || [];
    sel.forEach(function (s) {
      tl.to(s, { filter: "blur(" + blurPx + "px)", duration: 0.08, ease: "power2.out" }, time);
    });
    snapZoomWithRecover(tl, heroEl, time, o);
    sel.forEach(function (s) {
      tl.to(
        s,
        { filter: o.restoreFilter != null ? o.restoreFilter : "blur(0px)", duration: recoverDur, ease: "power2.out" },
        time + peakDur
      );
    });
  }

  function impactResponse(tl, el, time, strength) {
    const s = strength == null ? 0.85 : strength;
    tl.to(el, { scale: "-=" + 0.04 * s, duration: 0.06, ease: "power2.out" }, time);
    tl.to(el, { scale: "+=" + 0.04 * s, duration: 0.22, ease: "elastic.out(1, 0.45)" }, time + 0.06);
  }

  function rackFocus(tl, sharpSelector, blurSelectors, time, dur) {
    const d = dur == null ? 0.1 : dur;
    const blurs = blurSelectors || [];
    blurs.forEach(function (s) {
      tl.to(s, { filter: "blur(10px)", duration: d, ease: "power2.out" }, time);
    });
    tl.to(sharpSelector, { filter: "blur(0px)", duration: d, ease: "power2.out" }, time);
  }

  function rackFocusRelease(tl, blurSelectors, defaultFilters, time, dur) {
    const d = dur == null ? 0.35 : dur;
    const blurs = blurSelectors || [];
    const defs = defaultFilters || [];
    blurs.forEach(function (s, i) {
      const defF = defs[i] != null ? defs[i] : "blur(2px)";
      tl.to(s, { filter: defF, duration: d, ease: "power2.out" }, time);
    });
  }

  global.Calendar654 = {
    mulberry32,
    registerEases,
    repeatCount,
    screenShake,
    particleBurst,
    chromaticFlash,
    bracketPulse,
    bgPulse,
    glowBleed,
    lifePulse,
    orbitalReveal,
    snapZoomWithRecover,
    snapZoomImpact,
    impactResponse,
    rackFocus,
    rackFocusRelease,
  };
})(typeof window !== "undefined" ? window : globalThis);
