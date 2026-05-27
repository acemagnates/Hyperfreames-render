/**
 * CocaCola40 clip-04 — real GLB hero bottle (deterministic, hf-seek).
 * Requires window.THREE (+ GLTFLoader on THREE), cocacola40-shared.js.
 */
(function (global) {
  const C = global.CocaCola40;
  const COLA_TINT = 0xff1a28;
  const TARGET_HEIGHT = 7;

  function getGLTFLoader() {
    if (!global.THREE) return null;
    if (!global.THREE.GLTFLoader && global.CokeGLTFLoaderPack && global.CokeGLTFLoaderPack.GLTFLoader) {
      global.THREE.GLTFLoader = global.CokeGLTFLoaderPack.GLTFLoader;
    }
    if (!global.THREE.GLTFLoader) return null;
    return new global.THREE.GLTFLoader();
  }

  function isTransmissionMaterial(mat) {
    return (
      mat &&
      mat.isMeshPhysicalMaterial &&
      ((mat.transmission && mat.transmission > 0) || (mat.thickness && mat.thickness > 0))
    );
  }

  function toCiSafeMaterial(mat, opts) {
    if (!mat || !global.THREE) return mat;
    if (isTransmissionMaterial(mat)) {
      const safe = new THREE.MeshStandardMaterial({
        color: mat.color ? mat.color.clone() : new THREE.Color(COLA_TINT),
        metalness: opts.metalness != null ? opts.metalness : 0.42,
        roughness: opts.roughness != null ? opts.roughness : 0.16,
        transparent: true,
        opacity: 0.9,
        side: THREE.DoubleSide,
      });
      if (mat.map) safe.map = mat.map;
      if (mat.normalMap) safe.normalMap = mat.normalMap;
      if (typeof mat.dispose === "function") mat.dispose();
      return safe;
    }
    return mat;
  }

  function enhanceMaterials(root, opts) {
    if (!root || !global.THREE) return;
    const tint = opts && opts.tint != null ? opts.tint : COLA_TINT;
    const tintStrength = (opts && opts.tintStrength) || 0.22;
    const tintColor = new THREE.Color(tint);

    root.traverse(function (child) {
      if (!child.isMesh) return;
      const applyOne = function (mat) {
        let m = toCiSafeMaterial(mat, opts || {});
        if (m && m.isMeshStandardMaterial) {
          if (m.metalness != null) m.metalness = Math.min(Math.max(m.metalness, 0.15), 0.72);
          if (m.roughness != null) m.roughness = Math.min(Math.max(m.roughness, 0.08), 0.42);
          if (m.color && tintStrength > 0) m.color.lerp(tintColor, tintStrength);
          if (m.emissive) {
            m.emissive.set(0x2a0006);
            m.emissiveIntensity = Math.min(m.emissiveIntensity || 0, 0.28);
          }
        }
        return m;
      };
      if (Array.isArray(child.material)) {
        child.material = child.material.map(applyOne);
      } else {
        child.material = applyOne(child.material);
      }
      child.castShadow = false;
      child.receiveShadow = false;
    });
  }

  function fitBottleToHeight(root, targetH) {
    const box = new THREE.Box3().setFromObject(root);
    const size = new THREE.Vector3();
    box.getSize(size);
    const h = size.y > 0.001 ? size.y : 1;
    const s = targetH / h;
    root.scale.setScalar(s);
    box.setFromObject(root);
    const center = new THREE.Vector3();
    box.getCenter(center);
    root.position.x -= center.x;
    root.position.z -= center.z;
    root.position.y -= box.min.y;
    return s;
  }

  function loadBottle(scene, url, onReady) {
    const loader = getGLTFLoader();
    if (!loader || !scene) {
      if (onReady) onReady(null, false);
      return;
    }
    loader.load(
      url,
      function (gltf) {
        const model = gltf.scene;
        enhanceMaterials(model, { tint: COLA_TINT, tintStrength: 0.2, metalness: 0.48, roughness: 0.14 });
        fitBottleToHeight(model, TARGET_HEIGHT);
        const group = new THREE.Group();
        group.name = "heroBottle";
        group.add(model);
        group.userData.baseY = -3.2;
        scene.add(group);
        if (onReady) onReady(group, true);
      },
      undefined,
      function () {
        if (onReady) onReady(null, false);
      }
    );
  }

  /** AE speed-ramp: 0–2s slow, 2–5s fast sweep, 5–8s breathe */
  function speedRamp(p) {
    const t = Math.max(0, Math.min(1, p));
    if (t < 0.25) return (t / 0.25) * 0.22;
    if (t < 0.625) {
      const u = (t - 0.25) / 0.375;
      return 0.22 + u * 0.68;
    }
    const u = (t - 0.625) / 0.375;
    return 0.9 + Math.sin(u * Math.PI) * 0.04;
  }

  function animateBottle(bottle, p) {
    if (!bottle) return;
    const pr = speedRamp(p);
    const rise = Math.min(1, p * 1.35);
    const baseY = bottle.userData.baseY != null ? bottle.userData.baseY : -3.2;
    bottle.rotation.y = pr * Math.PI * 0.5;
    bottle.position.y = baseY + (1 - rise) * 4.5;
    const base = 0.88 + rise * 0.18;
    const breathe = 1 + Math.sin(p * Math.PI * 4) * 0.012;
    bottle.scale.set(base * breathe, base * breathe, base * breathe);
  }

  function frameHero(state, p) {
    if (!state || !C) return;
    const pr = speedRamp(p);
    animateBottle(state.bottle, p);
    C.orbitBottle(state.camera, pr);
    if (state.renderer && state.renderer.render) {
      state.renderer.render(state.scene, state.camera);
    }
  }

  function initHeroScene(canvas) {
    if (!C) return null;
    const renderer = C.createRenderer(canvas);
    const sc = C.createScene();
    C.addColaLights(sc.scene);
    C.addReflectiveFloor(sc.scene);
    return {
      renderer: renderer,
      scene: sc.scene,
      camera: sc.camera,
      bottle: null,
      glbReady: false,
    };
  }

  global.CocaCola40ThreeHero = {
    COLA_TINT: COLA_TINT,
    TARGET_HEIGHT: TARGET_HEIGHT,
    enhanceMaterials: enhanceMaterials,
    loadBottle: loadBottle,
    speedRamp: speedRamp,
    animateBottle: animateBottle,
    frameHero: frameHero,
    initHeroScene: initHeroScene,
  };
})(typeof window !== "undefined" ? window : globalThis);
