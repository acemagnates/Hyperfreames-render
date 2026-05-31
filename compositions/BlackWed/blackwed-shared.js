// blackwed-shared.js
// Shared utilities for Black Wednesday project

// Deterministic PRNG (mulberry32)
window.__blackwedSeed = window.__blackwedSeed || 12345;
window.__prng = function(seed) {
  if (seed !== undefined) window.__blackwedSeed = seed;
  let t = window.__blackwedSeed += 0x6D2B79F5;
  t = Math.imul(t ^ (t >>> 15), t | 1);
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

// CSS Custom Properties Registration
if (typeof CSS !== 'undefined' && CSS.registerProperty) {
  try {
    CSS.registerProperty({ name: '--paper-warm', syntax: '<color>', inherits: false, initialValue: '#e8d9b5' });
    CSS.registerProperty({ name: '--phosphor-green', syntax: '<color>', inherits: false, initialValue: '#4aff4a' });
    CSS.registerProperty({ name: '--stone-grey', syntax: '<color>', inherits: false, initialValue: '#9a8f7a' });
    CSS.registerProperty({ name: '--void-text', syntax: '<color>', inherits: false, initialValue: 'rgba(200,170,110,0.55)' });
    CSS.registerProperty({ name: '--shard-color', syntax: '<color>', inherits: false, initialValue: '#040e04' });
  } catch (e) {
    // Already registered
  }
}

// Color System Constants (for JS access if needed)
window.__colors = {
  envBgCenter: 'rgba(48, 31, 12, 0.96)',
  envBgEdge: 'rgba(8, 5, 2, 1.0)',
  tungstenGlow: 'rgba(210, 155, 70, 0.11)',
  deskSurface: '#170c04',
  paperTexture: '#e8d9b5',
  inkStruck: '#1c0f05',
  shadowWarm: 'rgba(0, 0, 0, 0.62)',
  crtBg: '#040e04',
  crtGlowNear: 'rgba(74, 255, 74, 0.48)',
  crtGlowFar: 'rgba(74, 255, 74, 0.09)',
  crtBorder: 'rgba(120, 200, 120, 0.22)',
  crtScanline: 'rgba(0, 0, 0, 0.055)',
  rateFallRed: '#ff3030',
  rateFallGlow: 'rgba(255, 48, 48, 0.45)',
  stoneWarm: '#c4b59a',
  stoneShadow: 'rgba(18, 12, 5, 0.82)',
  windowFire: 'rgba(255, 195, 125, 0.90)',
  sodiumLamp: 'rgba(212, 118, 10, 0.78)',
  voidBg: '#030303',
  ghostType: 'rgba(195, 160, 100, 0.025)',
  coinGold: 'rgba(185, 145, 62, 0.82)',
  coinBorder: 'rgba(180, 138, 58, 0.78)',
  payoffText: 'rgba(200, 170, 110, 0.55)'
};

// Film Grain Utility
window.__initFilmGrain = function(canvasId, seed = 12345) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  canvas.width = 540;
  canvas.height = 960;
  
  const imgData = ctx.createImageData(540, 960);
  const data = imgData.data;
  
  // Use a local seeded PRNG for consistent grain
  let localSeed = seed;
  function lprng() {
    let t = localSeed += 0x6D2B79F5;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  }
  
  for (let i = 0; i < data.length; i += 4) {
    const value = Math.floor(lprng() * 255);
    data[i] = value;
    data[i + 1] = value;
    data[i + 2] = value;
    data[i + 3] = 40 + Math.floor(lprng() * 40); // alpha
  }
  
  ctx.putImageData(imgData, 0, 0);
  
  // We can animate the grain by slightly shifting the canvas
  return function renderGrain(time) {
    const shiftX = Math.floor((time * 30) % 3) * 10;
    const shiftY = Math.floor((time * 20) % 3) * 10;
    canvas.style.transform = `translate(${shiftX}px, ${shiftY}px)`;
  };
};

// Screen Shake Utility
window.__triggerScreenShake = function(target, timeline, startTime, amplitude = 4, duration = 0.3) {
  if (!timeline || !target) return;
  
  // Create a violent spring decay
  timeline.fromTo(target, 
    { x: amplitude, y: -amplitude },
    { x: 0, y: 0, duration: duration, ease: "elastic.out(1, 0.2)", clearProps: "x,y" },
    startTime
  );
};
