/**
 * Fusion30 — 2D documentary overlays + Three.js vault geometry (CI-safe)
 */
(function (global) {
  const PAL = {
    bg: "#14100e",
    gold: "#BB9457",
    burgundy: "#461220",
    cream: "#F4F1EA",
    ink: "#1C1915",
    coral: "#E56B6F",
    teal: "#0F4C5C",
  };
  const BG3 = 0x14100e;
  const GOLD3 = 0xc9a84c;

  function mulberry32(a) {
    return function () {
      let t = (a += 0x6d2b79f5);
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  function registerEases(gsap) {
    if (!gsap || !gsap.registerPlugin) return;
    try {
      gsap.registerPlugin(global.CustomEase);
    } catch (e) {
      /* noop */
    }
    if (global.CustomEase && global.CustomEase.create) {
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

  function initFilmGrain(canvas, opacity, seed) {
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const img = ctx.createImageData(canvas.width, canvas.height);
    const rng = mulberry32(seed || 4001);
    for (let i = 0; i < img.data.length; i += 4) {
      const g = (rng() * 26) | 0;
      img.data[i] = img.data[i + 1] = img.data[i + 2] = g;
      img.data[i + 3] = (opacity * 255) | 0;
    }
    ctx.putImageData(img, 0, 0);
  }

  function drawPaperPanel(ctx, w, h, alpha) {
    const pw = w * 0.78;
    const ph = h * 0.42;
    const px = (w - pw) / 2;
    const py = h * 0.52;
    ctx.save();
    ctx.globalAlpha = alpha != null ? alpha : 0.88;
    ctx.fillStyle = PAL.cream;
    ctx.shadowColor = "rgba(0,0,0,0.45)";
    ctx.shadowBlur = 28;
    ctx.shadowOffsetY = 10;
    ctx.fillRect(px, py, pw, ph);
    ctx.shadowBlur = 0;
    ctx.strokeStyle = "rgba(70, 18, 32, 0.2)";
    ctx.lineWidth = 2;
    ctx.strokeRect(px, py, pw, ph);
    ctx.restore();
    return { px, py, pw, ph };
  }

  function drawBlueprint(canvas, progress, time) {
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);
    const panel = drawPaperPanel(ctx, w, h, 0.72);
    const { px, py, pw, ph } = panel;
    ctx.strokeStyle = "rgba(187, 148, 87, 0.45)";
    ctx.lineWidth = 1.2;
    const rows = 8;
    for (let i = 0; i < rows; i++) {
      if (progress < i / rows) break;
      const y = py + 40 + i * ((ph - 60) / rows);
      ctx.beginPath();
      ctx.moveTo(px + 24, y);
      ctx.lineTo(px + pw - 24, y);
      ctx.stroke();
    }
    ctx.fillStyle = PAL.ink;
    ctx.font = "700 18px 'Courier Prime', monospace";
    ctx.fillText("VAULT BLUEPRINT // LAYER IX", px + 24, py + 32);
    const drift = Math.sin(time * 0.4) * 4;
    ctx.strokeStyle = PAL.coral;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(px + pw * 0.5, py + ph * 0.3 + drift);
    ctx.lineTo(px + pw * 0.5, py + ph * 0.3 + (ph * 0.5) * progress);
    ctx.stroke();
  }

  function drawMapOverlay(canvas, progress, time) {
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);
    const { px, py, pw, ph } = drawPaperPanel(ctx, w, h, 0.68);
    const cx = px + pw / 2;
    const cy = py + ph / 2;
    ctx.strokeStyle = "rgba(187, 148, 87, 0.35)";
    for (let i = -3; i <= 3; i++) {
      ctx.beginPath();
      ctx.ellipse(cx, cy + i * 18, pw * 0.35, 14, 0, 0, Math.PI * 2);
      ctx.stroke();
    }
    ctx.strokeStyle = PAL.coral;
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(cx, py + 30);
    ctx.lineTo(cx, py + 30 + (ph - 60) * progress);
    ctx.stroke();
    ctx.fillStyle = PAL.ink;
    ctx.font = "14px 'Courier Prime', monospace";
    if (progress > 0.6) ctx.fillText("PRIME MERIDIAN", cx - 70, py + 24);
  }

  function drawTelegramOverlay(canvas, progress) {
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);
    const { px, py, pw, ph } = drawPaperPanel(ctx, w, h, 0.75);
    const lines = ["CLASSIFIED TELEGRAM", "MERIDIAN OFFSET CONFIRMED", "47 METERS UNRECORDED"];
    ctx.font = "16px 'Courier Prime', monospace";
    ctx.fillStyle = PAL.ink;
    let y = py + 48;
    for (let i = 0; i < lines.length; i++) {
      if (progress < (i + 1) * 0.2) break;
      if (i === 1) {
        ctx.fillStyle = PAL.burgundy;
        ctx.fillRect(px + 20, y - 18, pw - 40, 24);
        ctx.fillStyle = PAL.ink;
      }
      ctx.fillText(lines[i], px + 24, y);
      y += 44;
    }
  }

  function drawCoordOverlay(canvas, progress) {
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);
    const { px, py, pw } = drawPaperPanel(ctx, w, h, 0.7);
    const labels = ["51°28′40″ N", "0°00′05″ W", "Δ 47.3m"];
    ctx.textAlign = "center";
    labels.forEach((txt, i) => {
      const reveal = Math.min(1, Math.max(0, (progress - i * 0.15) * 3));
      if (reveal <= 0) return;
      ctx.globalAlpha = reveal;
      ctx.fillStyle = i === 2 ? PAL.coral : PAL.gold;
      ctx.font = "700 26px 'Oswald', sans-serif";
      ctx.fillText(txt, px + pw / 2, py + 80 + i * 52);
    });
    ctx.globalAlpha = 1;
    ctx.textAlign = "left";
  }

  /* —— Three.js (no transmission) —— */
  function isWebGLAvailable() {
    try {
      const c = document.createElement("canvas");
      return !!(global.WebGLRenderingContext && (c.getContext("webgl") || c.getContext("experimental-webgl")));
    } catch (e) {
      return false;
    }
  }

  function createRenderer(canvas) {
    if (!global.THREE || !canvas) return { render: function () {}, setSize: function () {} };
    if (!isWebGLAvailable()) return { render: function () {}, setSize: function () {} };
    try {
      const r = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: false });
      r.setSize(1080, 1920, false);
      r.setPixelRatio(1);
      r.toneMapping = THREE.ACESFilmicToneMapping;
      r.toneMappingExposure = 1.16;
      return r;
    } catch (e) {
      return { render: function () {}, setSize: function () {} };
    }
  }

  function createSceneCamera() {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(BG3);
    scene.fog = new THREE.Fog(BG3, 14, 50);
    const camera = new THREE.PerspectiveCamera(46, 1080 / 1920, 0.2, 120);
    return { scene, camera };
  }

  function addLights(scene) {
    scene.add(new THREE.AmbientLight(0x2a2218, 0.55));
    const key = new THREE.SpotLight(0xffe8c8, 26, 58, Math.PI / 5.5, 0.65, 1.2);
    key.position.set(8, 14, 10);
    scene.add(key);
    const fill = new THREE.DirectionalLight(0x6a8a9a, 1.6);
    fill.position.set(-10, 2, 6);
    scene.add(fill);
    const rim = new THREE.SpotLight(GOLD3, 20, 48, Math.PI / 4, 0.5, 1);
    rim.position.set(-4, 8, -12);
    scene.add(rim);
    scene.add(rim.target);
    return { key, rim };
  }

  function addFloor(scene) {
    const floor = new THREE.Mesh(
      new THREE.PlaneGeometry(40, 40),
      new THREE.MeshStandardMaterial({ color: 0x3d342c, roughness: 0.92 })
    );
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -3.2;
    scene.add(floor);
    const grid = new THREE.GridHelper(40, 28, 0x5a4a38, 0x1f1a16);
    grid.position.y = -3.19;
    scene.add(grid);
  }

  function goldMat(intensity) {
    return new THREE.MeshPhysicalMaterial({
      color: GOLD3,
      metalness: 0.9,
      roughness: 0.24,
      clearcoat: 0.3,
      emissive: 0x3a2a10,
      emissiveIntensity: intensity || 0.3,
    });
  }

  function fauxGlass() {
    return new THREE.MeshStandardMaterial({
      color: 0xf4f1ea,
      metalness: 0.16,
      roughness: 0.12,
      transparent: true,
      opacity: 0.36,
      side: THREE.DoubleSide,
      depthWrite: false,
    });
  }

  function orbitCamera(camera, p, opts) {
    const o = opts || {};
    const r = (o.radius0 || 20) + ((o.radius1 || 11) - (o.radius0 || 20)) * p;
    const ang = p * Math.PI * 2 * (o.turns || 0.85);
    camera.position.set(Math.sin(ang) * r, (o.y0 || 6) + ((o.y1 || 2.5) - (o.y0 || 6)) * p, Math.cos(ang) * r);
    camera.lookAt(0, o.lookAtY != null ? o.lookAtY : 0.5, 0);
  }

  global.Fusion30 = {
    PAL,
    mulberry32,
    registerEases,
    initFilmGrain,
    drawBlueprint,
    drawMapOverlay,
    drawTelegramOverlay,
    drawCoordOverlay,
    createRenderer,
    createSceneCamera,
    addLights,
    addFloor,
    goldMat,
    fauxGlass,
    orbitCamera,
  };
})(typeof window !== "undefined" ? window : globalThis);
