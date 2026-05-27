/**
 * Cyber / UI lane helpers — deterministic cursor + eases (HyperFrames).
 * Exposes `window.CyberUI`.
 */
(function (global) {
  function registerCyberEases(gsap) {
    if (!gsap || !gsap.registerPlugin) return;
    try {
      gsap.registerPlugin(global.CustomEase);
    } catch (e) {
      /* optional */
    }
    if (global.CustomEase && typeof global.CustomEase.create === "function") {
      global.CustomEase.create(
        "springHeavy",
        "M0,0 C0.1,0 0.12,1.2 0.22,1.2 0.32,1.2 0.36,0.96 0.44,0.96 0.52,0.96 0.55,1.03 0.62,1.03 0.7,1.03 0.76,1 1,1"
      );
      global.CustomEase.create(
        "springSnappy",
        "M0,0 C0.04,0 0.06,1.35 0.14,1.35 0.22,1.35 0.26,0.92 0.32,0.92 0.38,0.92 0.4,1.02 0.44,1.02 0.5,1.02 0.55,1 1,1"
      );
    }
  }

  /**
   * @param {gsap.core.Timeline} tl
   * @param {HTMLElement} cursorEl - #faux-cursor (uses x/y transform)
   * @param {{ t: number, x: number, y: number }[]} waypoints - clip-local times (s)
   * @param {number|null} clickAtLocal - optional click pulse time
   */
  function moveCursor(tl, cursorEl, waypoints, clickAtLocal) {
    if (!cursorEl || !waypoints || !waypoints.length) return;
    const ring = cursorEl.querySelector(".fc-ring");
    let prev = { t: 0, x: waypoints[0].x, y: waypoints[0].y };
    tl.set(cursorEl, { x: prev.x - 14, y: prev.y - 14 }, 0);
    waypoints.forEach((w) => {
      const dur = Math.max(0.06, w.t - prev.t);
      tl.to(cursorEl, { x: w.x - 14, y: w.y - 14, duration: dur, ease: "power2.inOut" }, prev.t);
      prev = w;
    });
    if (clickAtLocal != null && ring) {
      tl.fromTo(
        ring,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1.12, duration: 0.07, ease: "power2.out" },
        clickAtLocal
      );
      tl.to(ring, { opacity: 0, scale: 1, duration: 0.22, ease: "power2.in" }, clickAtLocal + 0.08);
    }
  }

  global.CyberUI = {
    registerCyberEases,
    moveCursor,
  };
})(typeof window !== "undefined" ? window : globalThis);
