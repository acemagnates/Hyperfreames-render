/**
 * Vault3D30 — shared Three.js bootstrap (deterministic, hf-seek driven)
 */
(function (global) {
  const BG = 0x14100e;
  const GOLD = 0xc9a84c;
  const BRONZE = 0x8c5a2b;
  const STONE = 0x3d342c;

  function mulberry32(a) {
    return function () {
      let t = (a += 0x6d2b79f5);
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
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
    if (!global.THREE || !canvas) {
      return { render: function () {}, setSize: function () {} };
    }
    if (!isWebGLAvailable()) {
      return { render: function () {}, setSize: function () {} };
    }
    try {
      const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        antialias: true,
        alpha: false,
        powerPreference: "high-performance",
      });
      renderer.setSize(1080, 1920, false);
      renderer.setPixelRatio(1);
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.18;
      if (THREE.SRGBColorSpace) {
        renderer.outputColorSpace = THREE.SRGBColorSpace;
      }
      return renderer;
    } catch (e) {
      return { render: function () {}, setSize: function () {} };
    }
  }

  function createSceneCamera() {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(BG);
    scene.fog = new THREE.Fog(BG, 14, 48);
    const camera = new THREE.PerspectiveCamera(46, 1080 / 1920, 0.2, 120);
    camera.position.set(0, 4, 18);
    return { scene, camera };
  }

  function addCinematicLights(scene) {
    scene.add(new THREE.AmbientLight(0x2a2218, 0.55));
    const key = new THREE.SpotLight(0xffe8c8, 28, 60, Math.PI / 5.5, 0.65, 1.2);
    key.position.set(8, 14, 10);
    scene.add(key);
    const fill = new THREE.DirectionalLight(0x6a8a9a, 1.8);
    fill.position.set(-10, 2, 6);
    scene.add(fill);
    const rim = new THREE.SpotLight(0xc9a84c, 22, 50, Math.PI / 4, 0.5, 1);
    rim.position.set(-4, 8, -12);
    rim.target.position.set(0, 0, 0);
    scene.add(rim);
    scene.add(rim.target);
    return { key, fill, rim };
  }

  function addVaultFloor(scene) {
    const floor = new THREE.Mesh(
      new THREE.PlaneGeometry(40, 40),
      new THREE.MeshStandardMaterial({ color: STONE, roughness: 0.92, metalness: 0.05 })
    );
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -3.2;
    scene.add(floor);
    const grid = new THREE.GridHelper(40, 32, 0x5a4a38, 0x1f1a16);
    grid.position.y = -3.19;
    scene.add(grid);
    return floor;
  }

  function goldMaterial(emissiveIntensity) {
    return new THREE.MeshPhysicalMaterial({
      color: GOLD,
      metalness: 0.92,
      roughness: 0.22,
      clearcoat: 0.35,
      clearcoatRoughness: 0.15,
      emissive: 0x3a2a10,
      emissiveIntensity: emissiveIntensity || 0.25,
    });
  }

  function glassMaterial() {
    return new THREE.MeshPhysicalMaterial({
      color: 0xf4f1ea,
      metalness: 0,
      roughness: 0.04,
      transmission: 0.88,
      thickness: 1.2,
      transparent: true,
      opacity: 0.95,
    });
  }

  function orbitCamera(camera, p, opts) {
    const o = opts || {};
    const radius0 = o.radius0 != null ? o.radius0 : 20;
    const radius1 = o.radius1 != null ? o.radius1 : 11;
    const y0 = o.y0 != null ? o.y0 : 6;
    const y1 = o.y1 != null ? o.y1 : 2.5;
    const turns = o.turns != null ? o.turns : 0.85;
    const r = radius0 + (radius1 - radius0) * p;
    const ang = p * Math.PI * 2 * turns;
    camera.position.x = Math.sin(ang) * r;
    camera.position.z = Math.cos(ang) * r;
    camera.position.y = y0 + (y1 - y0) * p;
    camera.lookAt(0, o.lookAtY != null ? o.lookAtY : 0.5, 0);
  }

  function initGrainCanvas(canvas, seed) {
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const w = canvas.width;
    const h = canvas.height;
    const img = ctx.createImageData(w, h);
    const rng = mulberry32(seed || 3030);
    for (let i = 0; i < img.data.length; i += 4) {
      const g = (rng() * 26) | 0;
      img.data[i] = g;
      img.data[i + 1] = g;
      img.data[i + 2] = g;
      img.data[i + 3] = 42;
    }
    ctx.putImageData(img, 0, 0);
  }

  global.Vault3D = {
    BG,
    GOLD,
    BRONZE,
    mulberry32,
    createRenderer,
    createSceneCamera,
    addCinematicLights,
    addVaultFloor,
    goldMaterial,
    glassMaterial,
    orbitCamera,
    initGrainCanvas,
  };
})(typeof window !== "undefined" ? window : globalThis);
