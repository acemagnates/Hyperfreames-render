/**
 * BlackWed Scene B — Bank exterior night (deterministic Three.js).
 */
(function (global) {
  function noopExt() {
    return { render: function () {}, windows: [], institutionalSpot: null, camera: null };
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
      return noopExt();
    }
    const THREE = global.THREE;
    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: "default" });
      renderer.setSize(1080, 1920, false);
      renderer.setPixelRatio(1);
    } catch (e) {
      return noopExt();
    }

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x070604, 0.018);

    const camera = new THREE.PerspectiveCamera(38, 1080 / 1920, 0.1, 120);
    camera.position.set(0, 1.5, 16);
    camera.lookAt(0, 6, 0);

    const groundMat = new THREE.MeshStandardMaterial({ color: 0x090805, roughness: 0.82, metalness: 0.06 });
    const columnMat = new THREE.MeshStandardMaterial({ color: 0x9e9280, roughness: 0.9, metalness: 0.01 });
    const windowMat = new THREE.MeshStandardMaterial({
      color: 0x040302,
      emissive: 0xd4820a,
      emissiveIntensity: 0,
      roughness: 0.2,
      metalness: 0.1,
    });

    const ground = new THREE.Mesh(new THREE.PlaneGeometry(40, 30), groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = 0;
    scene.add(ground);

    const windows = [];
    for (let i = 0; i < 6; i++) {
      const col = new THREE.Mesh(new THREE.CylinderGeometry(0.44, 0.38, 14, 16), columnMat);
      col.position.set(-7.5 + i * 3, 7, -2);
      scene.add(col);
      const win = new THREE.Mesh(new THREE.PlaneGeometry(1.2, 1.6), windowMat.clone());
      win.position.set(-7.5 + i * 3, 8.5, -1.2);
      scene.add(win);
      windows.push(win.material);
    }

    const facade = new THREE.Mesh(new THREE.BoxGeometry(20, 10, 0.8), columnMat);
    facade.position.set(0, 5, -2.5);
    scene.add(facade);

    const sodiumLamp = new THREE.PointLight(0xd47208, 4.2, 28, 1.5);
    sodiumLamp.position.set(-9, 7, 6);
    scene.add(sodiumLamp);

    const institutionalSpot = new THREE.SpotLight(0xeef0ff, 2.4);
    institutionalSpot.position.set(0, 28, 8);
    institutionalSpot.target.position.set(0, 4, 0);
    institutionalSpot.angle = Math.PI / 11;
    institutionalSpot.penumbra = 0.45;
    scene.add(institutionalSpot);
    scene.add(institutionalSpot.target);

    const skyGlow = new THREE.DirectionalLight(0x8090a8, 0.15);
    skyGlow.position.set(0, 20, -5);
    scene.add(skyGlow);

    let opacity = 0;
    return {
      scene,
      camera,
      renderer,
      windows,
      institutionalSpot,
      render: function () {
        renderer.setClearColor(0x000000, opacity < 0.99 ? 0 : 1);
        renderer.render(scene, camera);
      },
      setOpacity: function (v) {
        opacity = v;
        canvas.style.opacity = String(v);
      },
    };
  }

  global.BlackWedThreeExterior = { initExterior };
})(typeof window !== "undefined" ? window : globalThis);
