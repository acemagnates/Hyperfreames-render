/**
 * BorrowedLight38 — diagram silhouettes, lantern, camera helpers (deterministic).
 */
(function (global) {
  const COLORS = {
    void: "#121816",
    slate: "#2A332E",
    amber: "#D4B483",
    cool: "#6E7F8C",
    ivory: "#E6DFD2",
    miraFill: "#1A1428",
    miraRim: "#E8A838",
    holtFill: "#121820",
    holtRim: "#5B8FD4",
    kestFill: "#0E1612",
    kestRim: "#6BC48A",
  };

  const POSES = {
    mira: {
      stride:
        '<path d="M36 8 L52 8 L58 28 L64 120 L28 120 L34 28 Z M20 48 L24 88 L12 88 Z M58 52 L72 72 L64 80 L52 60 Z" fill="currentColor"/>',
      offer:
        '<path d="M34 10 L50 10 L56 32 L60 118 L26 118 L30 32 Z M58 40 L78 36 L82 52 L62 56 Z M8 44 L22 48 L18 64 L4 58 Z" fill="currentColor"/>',
      wait:
        '<path d="M38 12 L52 12 L56 30 L60 118 L28 118 L32 30 Z M48 52 L52 88 L44 88 Z" fill="currentColor"/>',
    },
    holt: {
      stamp:
        '<path d="M20 24 L68 24 L72 48 L76 118 L16 118 L20 48 Z M28 8 L60 8 L64 20 L24 20 Z M44 4 L48 18 L40 18 Z" fill="currentColor"/><rect x="52" y="56" width="28" height="36" rx="2" fill="currentColor" opacity="0.9"/>',
      gate:
        '<path d="M18 26 L70 26 L74 118 L14 118 Z M32 6 L56 6 L60 18 L28 18 Z" fill="currentColor"/><path d="M8 40 L88 40 L88 48 L8 48 Z" fill="currentColor"/>',
      nod:
        '<path d="M20 28 L68 28 L72 118 L16 118 Z M34 8 L54 8 L58 22 L30 22 Z" fill="currentColor"/><path d="M52 52 L76 48 L78 56 L54 60 Z" fill="currentColor" opacity="0.85"/>',
    },
    kest: {
      reach:
        '<path d="M32 20 L48 20 L52 118 L28 118 Z M40 4 L52 4 L56 14 L36 14 Z" fill="currentColor"/><path d="M48 32 L92 8 L96 16 L52 40 Z" fill="currentColor"/><circle cx="90" cy="10" r="6" fill="currentColor"/>',
      plant:
        '<path d="M34 24 L50 24 L54 118 L30 118 Z M38 8 L46 8 L48 20 L36 20 Z" fill="currentColor"/><path d="M20 100 L64 88 L68 96 L24 108 Z" fill="currentColor"/>',
      horizon:
        '<path d="M36 22 L48 22 L52 118 L32 118 Z M40 6 L48 6 L50 16 L38 16 Z" fill="currentColor"/><path d="M44 36 L44 8 L48 8 L48 36 Z" fill="currentColor" opacity="0.7"/>',
    },
  };

  function registerEases(gsap) {
    if (typeof CustomEase !== "undefined" && gsap?.registerPlugin) {
      gsap.registerPlugin(CustomEase);
      CustomEase.create("blSnap", "M0,0 C0.1,0.92 0.2,1 1,1");
    }
  }

  function silhouette(who, pose, opts) {
    const o = opts || {};
    const paths = POSES[who]?.[pose];
    if (!paths) return null;
    const fill =
      who === "mira" ? COLORS.miraFill : who === "holt" ? COLORS.holtFill : COLORS.kestFill;
    const rim = who === "mira" ? COLORS.miraRim : who === "holt" ? COLORS.holtRim : COLORS.kestRim;
    const el = document.createElement("div");
    el.className = "silhouette clip " + (o.className || "");
    if (o.start != null) {
      el.dataset.start = String(o.start);
      el.dataset.duration = String(o.duration ?? 5);
      el.dataset.trackIndex = String(o.trackIndex ?? 10);
    }
    el.style.cssText =
      "position:absolute;width:" +
      (o.w || 100) +
      "px;height:" +
      (o.h || 140) +
      "px;left:" +
      (o.x ?? 0) +
      "px;top:" +
      (o.y ?? 0) +
      "px;transform:translate(-50%,-100%)" +
      (o.flip ? " scaleX(-1)" : "") +
      ";color:" +
      fill +
      ";filter:drop-shadow(0 0 12px " +
      rim +
      "88);";
    el.innerHTML =
      '<svg viewBox="0 0 100 130" width="100%" height="100%" aria-hidden="true">' + paths + "</svg>";
    return el;
  }

  function lantern(opts) {
    const o = opts || {};
    const el = document.createElement("div");
    el.className = "lantern-prop clip " + (o.className || "lantern-prop");
    if (o.start != null) {
      el.dataset.start = String(o.start);
      el.dataset.duration = String(o.duration ?? 5);
      el.dataset.trackIndex = String(o.trackIndex ?? 11);
    }
    const w = o.w || 72;
    const h = o.h || 96;
    el.style.cssText =
      "position:absolute;width:" +
      w +
      "px;height:" +
      h +
      "px;left:" +
      (o.x ?? 540) +
      "px;top:" +
      (o.y ?? 900) +
      "px;transform:translate(-50%,-50%);";
    el.innerHTML =
      '<div class="lantern-glass" style="position:absolute;inset:0;border:2px solid ' +
      COLORS.amber +
      ';border-radius:42% 42% 38% 38%;background:linear-gradient(145deg,rgba(212,180,131,0.35),rgba(26,20,24,0.5));box-shadow:0 0 40px rgba(212,180,131,0.45)"></div>' +
      '<div class="lantern-seed" style="position:absolute;left:50%;top:52%;width:14px;height:14px;margin:-7px;background:' +
      COLORS.amber +
      ';border-radius:50%;box-shadow:0 0 20px ' +
      COLORS.amber +
      '"></div>';
    return el;
  }

  function knockRings(parent, x, y) {
    const frag = document.createDocumentFragment();
    const rings = [];
    for (let i = 0; i < 3; i++) {
      const r = document.createElement("div");
      r.className = "knock-ring clip";
      r.dataset.start = "0";
      r.dataset.duration = "5";
      r.dataset.trackIndex = String(20 + i);
      r.style.cssText =
        "position:absolute;left:" +
        x +
        "px;top:" +
        y +
        "px;width:40px;height:40px;margin:-20px;border:2px solid " +
        COLORS.amber +
        ";border-radius:50%;opacity:0;transform:scale(0.3);";
      frag.appendChild(r);
      rings.push(r);
    }
    parent.appendChild(frag);
    return rings;
  }

  function wireCamera(tl, cam, D) {
    if (!cam || !tl) return;
    tl.fromTo(
      cam,
      { z: 0, rotateX: 0.4, rotateY: -0.5 },
      { z: 36, rotateX: -0.25, rotateY: 0.6, duration: D - 0.4, ease: "sine.inOut" },
      0.12
    );
    tl.fromTo(".z-bg", { rotateY: 0.8 }, { rotateY: -0.9, duration: D, ease: "sine.inOut" }, 0);
    tl.fromTo(".z-fg-decor", { rotateY: -1.2 }, { rotateY: 1.4, duration: D * 0.95, ease: "sine.inOut" }, 0.08);
  }

  global.BorrowedLight38 = {
    COLORS,
    registerEases,
    silhouette,
    lantern,
    knockRings,
    wireCamera,
  };
})(typeof window !== "undefined" ? window : globalThis);
