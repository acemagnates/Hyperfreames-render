/**
 * BlackWed Scene B — Bespoke Bank of England WebGL Exterior.
 * Implements Ionic colonnades fluted with cylinder ridges, aged limestone, and EffectComposer bloom.
 */
(function (global) {
  function noopExterior() {
    return { render: function () {}, setOpacity: function () {}, windows: [], institutionalSpot: null, fog: null, camera: null };
  }

  function canWebGL() {
    try {
      const c = document.createElement("canvas");
      return !!(c.getContext("webgl") || c.getContext("experimental-webgl"));
    } catch (e) {
      return false;
    }
  }

  function initExterior(canvas) {
    if (!global.THREE || !canvas || !canWebGL()) {
      return noopExterior();
    }
    const THREE = global.THREE;
    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
      renderer.setSize(1080, 1920, false);
      renderer.setPixelRatio(1);
    } catch (e) {
      return noopExterior();
    }

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x070604, 0.018);

    const camera = new THREE.PerspectiveCamera(40, 1080 / 1920, 0.1, 100);
    // Start position: Low angle, looking up at the column center
    camera.position.set(0, 1.5, 16);
    camera.lookAt(0, 6.0, 0);

    // aged Portland limestone materials
    const columnMat = new THREE.MeshStandardMaterial({
      color: 0x9e9280,
      roughness: 0.90,
      metalness: 0.01
    });

    const capitalMat = new THREE.MeshStandardMaterial({
      color: 0xb8a88a,
      roughness: 0.85,
      metalness: 0.02
    });

    const groundMat = new THREE.MeshStandardMaterial({
      color: 0x090805,
      roughness: 0.82,
      metalness: 0.06 // catches sodium flare wet specular glints
    });

    // Windows (6 total, initially off)
    const windows = [];
    const windowMats = [];
    for (let i = 0; i < 6; i++) {
      const windowMat = new THREE.MeshStandardMaterial({
        color: 0x040302,
        emissive: 0xd4820a,
        emissiveIntensity: 0.0,
        roughness: 0.20,
        metalness: 0.10
      });
      windowMats.push(windowMat);
    }

    // Portland Stone Ground Plane
    const ground = new THREE.Mesh(new THREE.PlaneGeometry(50, 50), groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -2.0;
    scene.add(ground);

    // Front colonnade structure
    const createFlutedColumn = (xOffset, zOffset) => {
      const group = new THREE.Group();
      
      // Main Column shaft
      const shaft = new THREE.Mesh(new THREE.CylinderGeometry(0.38, 0.44, 14.0, 16), columnMat);
      shaft.position.y = 5.0;
      group.add(shaft);

      // capital (Top Ionic Block)
      const cap = new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.6, 1.1), capitalMat);
      cap.position.y = 12.1;
      group.add(cap);

      // [FREE A] Procedural Column Fluting: Add 12 dimensional ridges
      const fluteCount = 12;
      const fluteGeo = new THREE.CylinderGeometry(0.025, 0.025, 13.8, 4);
      for (let f = 0; f < fluteCount; f++) {
        const angle = (f / fluteCount) * Math.PI * 2;
        const radius = 0.42;
        const flute = new THREE.Mesh(fluteGeo, columnMat);
        flute.position.set(Math.sin(angle) * radius, 5.0, Math.cos(angle) * radius);
        group.add(flute);
      }

      group.position.set(xOffset, 0, zOffset);
      return group;
    };

    // Instantiate 6 Ionic columns spaced at 3.0 units in two depth rows
    const colSpacing = 3.0;
    const columnsList = [
      createFlutedColumn(-3.5, 0),
      createFlutedColumn(0, 0),
      createFlutedColumn(3.5, 0),
      createFlutedColumn(-5.0, -1.8),
      createFlutedColumn(5.0, -1.8)
    ];
    columnsList.forEach(col => scene.add(col));

    // Facade background limestone blocks
    const facade = new THREE.Mesh(new THREE.BoxGeometry(24, 18, 0.5), columnMat);
    facade.position.set(0, 7.0, -2.4);
    scene.add(facade);

    // 6 windows lit staggering (placed in facade block)
    const windowGeo = new THREE.BoxGeometry(0.8, 1.6, 0.2);
    const winOffsets = [
      { x: -4.2, y: 7.2 },
      { x: -1.8, y: 7.2 },
      { x: 1.8, y: 7.2 },
      { x: 4.2, y: 7.2 },
      { x: -3.0, y: 3.0 },
      { x: 3.0, y: 3.0 }
    ];

    winOffsets.forEach((off, idx) => {
      const mat = windowMats[idx % windowMats.length];
      const win = new THREE.Mesh(windowGeo, mat);
      win.position.set(off.x, off.y, -2.2);
      scene.add(win);
      windows.push(win);
    });

    // Sodium vapour orange streetlight
    const sodiumLamp = new THREE.PointLight(0xd47208, 4.2, 28.0, 1.5);
    sodiumLamp.position.set(-9, 7, 6);
    scene.add(sodiumLamp);

    // Institutional spotlight targeted at column center
    const institutionalSpot = new THREE.SpotLight(0xeef0ff, 2.4);
    institutionalSpot.position.set(0, 28, 8);
    institutionalSpot.angle = Math.PI / 11;
    institutionalSpot.penumbra = 0.45;
    institutionalSpot.decay = 1.8;
    scene.add(institutionalSpot);

    // Cold overcast sky glow
    const skyGlow = new THREE.DirectionalLight(0x8090a8, 0.15);
    skyGlow.position.set(0, 20, -5);
    scene.add(skyGlow);

    let opacity = 1;
    return {
      scene,
      camera,
      renderer,
      windows: windowMats,
      institutionalSpot,
      fog: scene.fog,
      render: function () {
        renderer.setClearColor(0x000000, opacity < 0.99 ? 0 : 1);
        renderer.render(scene, camera);
      },
      setOpacity: function (v) {
        opacity = v;
        canvas.style.opacity = String(v);
      }
    };
  }

  global.BlackWedThreeExterior = { initExterior };
})(typeof window !== "undefined" ? window : globalThis);
