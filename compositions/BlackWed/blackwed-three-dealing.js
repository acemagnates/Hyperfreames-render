/**
 * BlackWed Scene A — dealing room (deterministic Three.js).
 */
(function (global) {
  function noopDealing() {
    return { render: function () {}, setOpacity: function () {}, deskLamp: null, crtMat: null, fog: null, camera: null };
  }

  function canWebGL() {
    try {
      const c = document.createElement("canvas");
      return !!(c.getContext("webgl") || c.getContext("experimental-webgl"));
    } catch (e) {
      return false;
    }
  }

  function initDealingRoom(canvas) {
    if (!global.THREE || !canvas || !canWebGL()) {
      return noopDealing();
    }
    const THREE = global.THREE;
    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: "default" });
      renderer.setSize(1080, 1920, false);
      renderer.setPixelRatio(1);
    } catch (e) {
      return noopDealing();
    }

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x090703, 0.075);

    const camera = new THREE.PerspectiveCamera(42, 1080 / 1920, 0.1, 80);
    camera.position.set(7.5, 6.8, 10.5);
    camera.lookAt(0, 2.2, 0);

    const floorMat = new THREE.MeshStandardMaterial({ color: 0x160404, roughness: 0.97, metalness: 0 });
    const deskMat = new THREE.MeshStandardMaterial({ color: 0x150a02, roughness: 0.62, metalness: 0.09 });
    const monitorMat = new THREE.MeshStandardMaterial({ color: 0x8a846e, roughness: 0.88, metalness: 0 });
    const crtMat = new THREE.MeshStandardMaterial({
      color: 0x020a02,
      emissive: 0x0a2a0a,
      emissiveIntensity: 0.7,
      roughness: 0.15,
      metalness: 0.05,
    });

    const floor = new THREE.Mesh(new THREE.PlaneGeometry(24, 24), floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = 0;
    scene.add(floor);

    for (let i = -1; i <= 1; i++) {
      const desk = new THREE.Mesh(new THREE.BoxGeometry(3.2, 0.18, 1.4), deskMat);
      desk.position.set(i * 3.5, 1.1, -i * 0.4);
      scene.add(desk);
      const mon = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.7, 0.5), monitorMat);
      mon.position.set(i * 3.5 + 0.4, 1.65, -i * 0.4 + 0.2);
      scene.add(mon);
      const crt = new THREE.Mesh(new THREE.PlaneGeometry(0.75, 0.55), crtMat);
      crt.position.set(i * 3.5 + 0.4, 1.68, -i * 0.4 + 0.45);
      scene.add(crt);
    }

    scene.add(new THREE.AmbientLight(0x0e0904, 0.28));
    const fluorescent = new THREE.DirectionalLight(0xd2e5f2, 0.38);
    fluorescent.position.set(0, 14, 3);
    scene.add(fluorescent);
    const deskLamp = new THREE.PointLight(0xd49510, 2.2, 7.5, 2);
    deskLamp.position.set(2.2, 2.6, 0.6);
    scene.add(deskLamp);
    const deskLamp2 = new THREE.PointLight(0xc07808, 0.9, 5, 2);
    deskLamp2.position.set(-4, 2.4, -3);
    scene.add(deskLamp2);

    let opacity = 1;
    return {
      scene,
      camera,
      renderer,
      deskLamp,
      crtMat,
      fog: scene.fog,
      render: function () {
        renderer.setClearColor(0x000000, opacity < 0.99 ? 0 : 1);
        renderer.render(scene, camera);
      },
      setOpacity: function (v) {
        opacity = v;
        canvas.style.opacity = String(v);
      },
      setFogDensity: function (d) {
        scene.fog.density = d;
      },
    };
  }

  global.BlackWedThreeDealing = { initDealingRoom };
})(typeof window !== "undefined" ? window : globalThis);
