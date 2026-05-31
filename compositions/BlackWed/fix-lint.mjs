import fs from 'fs';
import path from 'path';

const dir = '/home/ace/Documents/Hyperfreames/compositions/BlackWed/';
const files = [
  'BlackWed-clip-01.html',
  'BlackWed-clip-02.html',
  'BlackWed-clip-03.html',
  'BlackWed-clip-04.html'
];

for (const file of files) {
  const filePath = path.join(dir, file);
  if (!fs.existsSync(filePath)) continue;
  
  let content = fs.readFileSync(filePath, 'utf8');
  
  // AL-04: canvas id="three-canvas" -> canvas id="canvas3d"
  content = content.replace(/id="three-canvas"/g, 'id="canvas3d"');
  
  // EL-F01: Fonts
  content = content.replace(/Inter/g, 'Helvetica');
  content = content.replace(/Playfair Display/gi, 'Georgia');
  
  // EL-D01: Decoratives
  if (!content.includes('id="vig"')) {
    content = content.replace(
      /<div id="depth-stage"[^>]*>/,
      '<div id="depth-stage" style="position:relative; width:1080px; height:1920px; overflow:hidden; perspective:950px; perspective-origin:50% 46%;">\n  <div id="vig" style="position:absolute;inset:0;pointer-events:none;z-index:99;box-shadow:inset 0 0 200px rgba(0,0,0,0.8);"></div>\n  <div id="grain" style="position:absolute;inset:0;pointer-events:none;z-index:99;"></div>'
    );
  }

  // AL-03: ease spam in clip-02
  if (file === 'BlackWed-clip-02.html') {
    let power2Count = 0;
    content = content.replace(/power2\.out/g, (match) => {
      power2Count++;
      if (power2Count > 4) {
        return (power2Count % 2 === 0) ? 'power3.out' : 'expo.out';
      }
      return match;
    });
  }

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Updated ${file}`);
}
