const fs = require('fs');
let code = fs.readFileSync('src/app/page.tsx', 'utf8');

code = code.replace(
  /<BreachSection \/>\s*<div className="chips"/,
  '<BreachSection />\n  <StickyPhases />\n  <div className="chips"'
);

fs.writeFileSync('src/app/page.tsx', code, 'utf8');
