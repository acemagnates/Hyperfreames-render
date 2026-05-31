/**
 * BlackWed Scene A — Bespoke Dealing Room WebGL Environment.
 * Implements procedural bump textures, mahogany wood specs, and motivated spotlights.
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

  // Generates a procedural fabric cross-hatch canvas bump-map
  function createCarpetTexture(THREE) {
    const size = 128;
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#808080"; // Neutral grey bump map base
    ctx.fillRect(0, 0, size, size);
    
    // Draw cross-hatch texture lines
    ctx.strokeStyle = "#a0a0a0";
    ctx.lineWidth = 1;
    for (let i = 0; i < size; i += 4) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, size);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(size, i);
      ctx.stroke();
    }
    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(16, 16);
    return texture;
  }

  function initDealingRoom(canvas) {
    if (!global.THREE || !canvas || !canWebGL()) {
      return noopDealing();
    }
    const THREE = global.THREE;
    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
      renderer.setSize(1080, 1920, false);
      renderer.setPixelRatio(1);
    } catch (e) {
      return noopDealing();
    }

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x090703, 0.075);

    const camera = new THREE.PerspectiveCamera(42, 1080 / 1920, 0.1, 80);
    // Start position: Over-the-shoulder, upper-right
    camera.position.set(7.5, 6.8, 10.5);
    camera.lookAt(0, 2.2, 0);

    // Procedural Carpet bump weave
    const carpetBump = createCarpetTexture(THREE);
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0x160404,
      bumpMap: carpetBump,
      bumpScale: 0.04,
      roughness: 0.95,
      metalness: 0.0
    });

    // Mahogany Desk caught by desk light glints
    const deskMat = new THREE.MeshStandardMaterial({
      color: 0x150a02,
      roughness: 0.58,
      metalness: 0.12,
    });

    // Matte Institutional Monitor Housing
    const monitorMat = new THREE.MeshStandardMaterial({
      color: 0x8a846e,
      roughness: 0.88,
      metalness: 0.0
    });

    // Emissive CRT screen with initial phosphor luminance
    const crtMat = new THREE.MeshStandardMaterial({
      color: 0x020a02,
      emissive: 0x0a2a0a,
      emissiveIntensity: 0.7,
      roughness: 0.15,
      metalness: 0.05
    });

    // Desk papers
    const paperMat = new THREE.MeshStandardMaterial({
      color: 0xdaccaa,
      roughness: 0.94,
      metalness: 0.0
    });

    // Plane floor geometry
    const floor = new THREE.Mesh(new THREE.PlaneGeometry(24, 24), floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = 0;
    scene.add(floor);

    // Generate 3 Mahagony desks in a row with monitor terminals
    for (let i = -1; i <= 1; i++) {
      // Mahogany Desk Slab
      const desk = new THREE.Mesh(new THREE.BoxGeometry(3.2, 0.18, 1.4), deskMat);
      desk.position.set(i * 3.5, 1.1, -i * 0.4);
      scene.add(desk);

      // CRT Housing
      const mon = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.7, 0.5), monitorMat);
      mon.position.set(i * 3.5 + 0.4, 1.65, -i * 0.4 + 0.2);
      scene.add(mon);

      // Screen
      const crt = new THREE.Mesh(new THREE.PlaneGeometry(0.75, 0.55), crtMat);
      crt.position.set(i * 3.5 + 0.4, 1.68, -i * 0.4 + 0.45);
      scene.add(crt);

      // Documents scattered on the mahogany desks
      const doc1 = new THREE.Mesh(new THREE.PlaneGeometry(0.4, 0.55), paperMat);
      doc1.rotation.x = -Math.PI / 2;
      doc1.rotation.z = 0.15 * i + 0.1;
      doc1.position.set(i * 3.5 - 0.5, 1.2, -i * 0.4 - 0.1);
      scene.add(doc1);

      const doc2 = new THREE.Mesh(new THREE.PlaneGeometry(0.38, 0.52), paperMat);
      doc2.rotation.x = -Math.PI / 2;
      doc2.rotation.z = -0.22 * i - 0.08;
      doc2.position.set(i * 3.5 + 0.9, 1.2, -i * 0.4 - 0.2);
      scene.add(doc2);
    }

    // Bare ambient shadow wash
    scene.add(new THREE.AmbientLight(0x0e0904, 0.28));

    // Overhead fluorescent strip
    const fluorescent = new THREE.DirectionalLight(0xd2e5f2, 0.38);
    fluorescent.position.set(0, 14, 3);
    scene.add(fluorescent);

    // motivated warm tungsten pool (Near Right Desk)
    const deskLamp = new THREE.PointLight(0xd49510, 2.2, 7.5, 2.0);
    deskLamp.position.set(2.2, 2.6, 0.6);
    scene.add(deskLamp);

    // Motivated cool-dim fill pool (Far Left Desk)
    const deskLamp2 = new THREE.PointLight(0xc07808, 0.9, 5.0, 2.0);
    deskLamp2.position.set(-4.0, 2.4, -3.0);
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
      }
    };
  }

  global.BlackWedThreeDealing = { initDealingRoom };
})(typeof window !== "undefined" ? window : globalThis);
