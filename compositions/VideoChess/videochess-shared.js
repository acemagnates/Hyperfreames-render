/**
 * VideoChess — Concrete Brutalism & Sunset Silhouette shared engine.
 * Fully deterministic LCG and custom visual assets.
 */
(function (global) {
  const C = {
    voidBg: "#111213",
    sunsetGlow: "linear-gradient(180deg, #ff7e5f 0%, #feb47b 40%, #111213 100%)",
    darkBasalt: "#1a1b1c",
    lightConcrete: "#4a4b4d",
    accentOrange: "#feb47b",
    accentGold: "#ff7e5f",
  };

  function registerEases(gsap) {
    if (typeof CustomEase !== "undefined") {
      gsap.registerPlugin(CustomEase);
      // High-performance chess move ease: slow start, fast whip, slow settle (whip-snap)
      CustomEase.create("chessWhip", "M0,0 C0.25,0.1 0.25,1 1,1");
      // Heavy camera slam ease
      CustomEase.create("slamEase", "M0,0 C0.08,0.92 0.18,1 1,1");
    }
  }

  function initGrain(canvas, opacity, seed) {
    const ctx = canvas.getContext("2d");
    const w = canvas.width;
    const h = canvas.height;
    let s = seed >>> 0;
    const rand = () => {
      s = (s * 1664525 + 1013904223) >>> 0;
      return s / 4294967296;
    };
    const img = ctx.createImageData(w, h);
    for (let i = 0; i < img.data.length; i += 4) {
      const v = (rand() * 255) | 0;
      // Concrete grey/basalt tone noise
      img.data[i] = v;
      img.data[i + 1] = v;
      img.data[i + 2] = v;
      img.data[i + 3] = (opacity * 255) | 0;
    }
    ctx.putImageData(img, 0, 0);
    return ctx;
  }

  function spawnDebris(parent, count, seed) {
    let s = seed >>> 0;
    const rand = () => {
      s = (s * 1103515245 + 12345) >>> 0;
      return s / 4294967296;
    };
    const frag = document.createDocumentFragment();
    const debris = [];
    for (let i = 0; i < count; i++) {
      const el = document.createElement("div");
      el.className = "debris clip";
      el.dataset.start = "0";
      el.dataset.duration = "10";
      el.dataset.trackIndex = "25";
      const size = 2 + (rand() * 8) | 0;
      el.style.width = `${size}px`;
      el.style.height = `${size}px`;
      // Irregular brutalist rock shape
      const r1 = 30 + rand() * 40;
      const r2 = 30 + rand() * 40;
      const r3 = 30 + rand() * 40;
      const r4 = 30 + rand() * 40;
      el.style.borderRadius = `${r1}% ${r2}% ${r3}% ${r4}%`;
      el.style.left = `${rand() * 100}%`;
      el.style.top = `${rand() * 100}%`;
      el.style.background = rand() > 0.5 ? "#feb47b" : "#4a4b4d";
      el.style.boxShadow = "0 2px 4px rgba(0,0,0,0.5)";
      el.dataset.drift = String(50 + rand() * 150);
      el.dataset.rot = String(-180 + rand() * 360);
      frag.appendChild(el);
      debris.push(el);
    }
    parent.appendChild(frag);
    return debris;
  }

  // Beautiful minimalist silhouette chess SVGs
  const svgPaths = {
    p: '<path d="M16 9a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm8 7.5c0-1.8-3.4-3.5-8-3.5s-8 1.7-8 3.5c0 1.2 1.4 2.2 4 2.8v2.2c-3.5.5-6 1.8-6 3.5 0 2.2 4.5 4 10 4s10-1.8 10-4c0-1.7-2.5-3-6-3.5v-2.2c2.6-.6 4-1.6 4-2.8z" fill="currentColor"/>',
    r: '<path d="M5 3v5h2V6h4v2h2V6h4v2h2V6h4v2h2V3H5zm4 7v6H7v2h18v-2h-2v-6H9zm-2 9v4h18v-4H7z" fill="currentColor"/>',
    n: '<path d="M22 6c-1.5 0-3 .5-4.5 1.5C16 6 14 5 11 5c-4 0-7 3-7 7 0 2 1 4 2.5 5.5L5 21h14l.5-3.5c2-1 3.5-3 3.5-5.5 0-3.5-2.5-6-6-6zm-7 4.5c-.8 0-1.5-.7-1.5-1.5s.7-1.5 1.5-1.5 1.5.7 1.5 1.5-.7 1.5-1.5 1.5z" fill="currentColor"/>',
    b: '<path d="M16 2s-5 4-5 8.5c0 2 1.5 3.5 3.5 3.5.6 0 1.2-.2 1.5-.5.3.3.9.5 1.5.5 2 0 3.5-1.5 3.5-3.5C21 6 16 2 16 2zm-3 15v5h6v-5h-6z" fill="currentColor"/>',
    q: '<path d="M6 8l3 11h14l3-11-5 4-5-8-5 8-5-4zm2 13v2h16v-2H8z" fill="currentColor"/>',
    k: '<path d="M14 2h4v3h3v4h-3v3h-4V9h-3V5h3V2zm-7 9l2 8h14l2-8-8 2-8-2zm1 10v2h16v-2H8z" fill="currentColor"/>'
  };

  function getPieceSVG(type, color) {
    const p = svgPaths[type.toLowerCase()];
    if (!p) return "";
    const fill = color === "white" ? "#ffffff" : "#111213";
    const stroke = color === "white" ? "#ff7e5f" : "#feb47b";
    return `<svg viewBox="0 0 32 32" class="chess-piece-svg" style="color: ${fill}; filter: drop-shadow(0 4px 6px rgba(0,0,0,0.6)); stroke: ${stroke}; stroke-width: 0.5px;">${p}</svg>`;
  }

  function drawBoard(container, piecesState) {
    container.innerHTML = "";
    container.style.position = "relative";
    container.style.width = "800px";
    container.style.height = "800px";
    container.style.display = "grid";
    container.style.gridTemplateColumns = "repeat(8, 1fr)";
    container.style.gridTemplateRows = "repeat(8, 1fr)";
    container.style.transformStyle = "preserve-3d";

    const files = ["a", "b", "c", "d", "e", "f", "g", "h"];
    for (let r = 8; r >= 1; r--) {
      for (let f = 0; f < 8; f++) {
        const coord = `${files[f]}${r}`;
        const isDark = (r + f) % 2 === 0;
        
        const square = document.createElement("div");
        square.className = "board-square";
        square.dataset.coord = coord;
        square.style.position = "relative";
        square.style.width = "100px";
        square.style.height = "100px";
        square.style.background = isDark ? C.darkBasalt : C.lightConcrete;
        square.style.border = "1px solid rgba(254, 180, 123, 0.1)";
        square.style.boxShadow = "inset 0 0 12px rgba(0, 0, 0, 0.5)";
        square.style.transformStyle = "preserve-3d";

        // Add piece if exists in state
        const piece = piecesState[coord];
        if (piece) {
          const pEl = document.createElement("div");
          pEl.className = "chess-piece clip";
          pEl.dataset.start = "0";
          pEl.dataset.duration = "10";
          pEl.dataset.piece = piece.type;
          pEl.dataset.color = piece.color;
          pEl.style.position = "absolute";
          pEl.style.inset = "10px";
          pEl.style.transform = "translateZ(10px)";
          pEl.style.transformStyle = "preserve-3d";
          pEl.innerHTML = getPieceSVG(piece.type, piece.color);
          square.appendChild(pEl);
        }

        container.appendChild(square);
      }
    }
  }

  global.VideoChess = {
    colors: C,
    registerEases,
    initGrain,
    spawnDebris,
    getPieceSVG,
    drawBoard,
  };
})(typeof window !== "undefined" ? window : globalThis);
