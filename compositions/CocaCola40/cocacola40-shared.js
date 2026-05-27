/**
 * CocaCola40 — cinematic cola spot helpers (deterministic, hf-seek).
 */
(function (global) {
  const RED = 0xf40009;
  const RED_DARK = 0x1a0508;
  const GOLD = 0xd4a574;
  const VOID = 0x0a0204;

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

  function addHandheld(target, gsap, seed, amp) {
    if (!target || !gsap) return;
    const rng = mulberry32(seed || 77);
    const ax = (amp && amp.x) || 5;
    const ay = (amp && amp.y) || 7;
    gsap.to(target, {
      x: () => (rng() - 0.5) * ax * 2,
      y: () => (rng() - 0.5) * ay * 2,
      duration: 2.1 + rng() * 1.4,
      repeat: 20,
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
      const size = 8 + (rng() * 36) | 0;
      b.style.width = size + "px";
      b.style.height = size + "px";
      b.style.left = (rng() * 100) + "%";
      b.style.bottom = (-10 - rng() * 20) + "%";
      b.dataset.dur = String(0.9 + rng() * 0.9);
      b.dataset.delay = String(rng() * 0.6);
      b.dataset.drift = String((rng() - 0.5) * 80);
      frag.appendChild(b);
      out.push(b);
    }
    parent.appendChild(frag);
    return out;
  }

  function spawnDroplets(parent, count, seed) {
    if (!parent) return [];
    const rng = mulberry32(seed || 202);
    const out = [];
    for (let i = 0; i < count; i++) {
      const d = document.createElement("div");
      d.className = "droplet";
      const w = 6 + ((rng() * 14) | 0);
      d.style.width = w + "px";
      d.style.height = (w * 1.4) + "px";
      d.style.left = (10 + rng() * 80) + "%";
      d.style.top = (15 + rng() * 70) + "%";
      d.dataset.pop = String(0.15 + rng() * 0.25);
      parent.appendChild(d);
      out.push(d);
    }
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

  function colaGlassMaterial() {
    return new THREE.MeshStandardMaterial({
      color: 0xff1a28,
      metalness: 0.35,
      roughness: 0.12,
      transparent: true,
      opacity: 0.92,
      emissive: 0x4a0008,
      emissiveIntensity: 0.35,
    });
  }

  function createBottle() {
    if (!global.THREE) return null;
    const pts = [];
    pts.push(new THREE.Vector2(0, 0));
    pts.push(new THREE.Vector2(1.15, 0));
    pts.push(new THREE.Vector2(1.28, 0.35));
    pts.push(new THREE.Vector2(0.95, 0.85));
    pts.push(new THREE.Vector2(0.72, 1.05));
    pts.push(new THREE.Vector2(0.68, 1.35));
    pts.push(new THREE.Vector2(0.82, 1.55));
    pts.push(new THREE.Vector2(0.88, 1.75));
    pts.push(new THREE.Vector2(0.78, 2.05));
    pts.push(new THREE.Vector2(0.62, 2.45));
    pts.push(new THREE.Vector2(0.58, 2.85));
    pts.push(new THREE.Vector2(0.72, 3.15));
    pts.push(new THREE.Vector2(0.95, 3.35));
    pts.push(new THREE.Vector2(1.05, 3.55));
    pts.push(new THREE.Vector2(1.02, 3.85));
    pts.push(new THREE.Vector2(0.88, 4.15));
    pts.push(new THREE.Vector2(0.75, 4.55));
    pts.push(new THREE.Vector2(0.72, 5.05));
    pts.push(new THREE.Vector2(0.78, 5.55));
    pts.push(new THREE.Vector2(0.85, 6.05));
    pts.push(new THREE.Vector2(0.82, 6.55));
    pts.push(new THREE.Vector2(0.7, 7.05));
    pts.push(new THREE.Vector2(0, 7.05));
    const geo = new THREE.LatheGeometry(pts, 72);
    const mesh = new THREE.Mesh(geo, colaGlassMaterial());
    mesh.position.y = -3.2;
    const cap = new THREE.Mesh(
      new THREE.CylinderGeometry(0.78, 0.82, 0.35, 48),
      new THREE.MeshStandardMaterial({ color: 0xcc0a12, metalness: 0.7, roughness: 0.25 })
    );
    cap.position.y = 3.95;
    mesh.add(cap);
    const label = new THREE.Mesh(
      new THREE.PlaneGeometry(1.6, 0.9),
      new THREE.MeshStandardMaterial({
        color: 0xffffff,
        metalness: 0.1,
        roughness: 0.4,
        emissive: 0xffffff,
        emissiveIntensity: 0.08,
      })
    );
    label.position.set(0, 1.8, 0.92);
    label.rotation.y = 0.02;
    mesh.add(label);
    return mesh;
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
    registerEases,
    initGrain,
    addHandheld,
    spawnBubbles,
    spawnDroplets,
    createRenderer,
    createScene,
    addColaLights,
    createBottle,
    addReflectiveFloor,
    orbitBottle,
    mulberry32,
  };
})(typeof window !== "undefined" ? window : globalThis);
