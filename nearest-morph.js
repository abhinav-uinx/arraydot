const fs = require('fs');

let code = fs.readFileSync('src/app/page.tsx', 'utf8');

// 1. Change random shuffle to geometric sort for nearest-neighbor-like localized morphing
code = code.replace(
  /targets\.sort\(\(\) => Math\.random\(\) - 0\.5\);/g,
  `// Sort both targets and current particles from left-to-right to force localized, nearest-neighbor morphing
    targets.sort((a, b) => (a.x + a.y * 0.5) - (b.x + b.y * 0.5));
    particles.current.sort((a, b) => (a.x + a.y * 0.5) - (b.x + b.y * 0.5));`
);

// 2. Make movement even slower
code = code.replace(/p\.x \+= dx \* [0-9.]+/g, 'p.x += dx * 0.015');
code = code.replace(/p\.y \+= dy \* [0-9.]+/g, 'p.y += dy * 0.015');

// 3. Make interval slightly longer to accommodate the slow transition
code = code.replace(/setInterval\(\(\) => \{\s*setSubWordIndex\(prev => \(prev \+ 1\) % subWords\.length\);\s*\}, [0-9]+\);/g, `setInterval(() => {
        setSubWordIndex(prev => (prev + 1) % subWords.length);
      }, 5000);`);

fs.writeFileSync('src/app/page.tsx', code, 'utf8');
