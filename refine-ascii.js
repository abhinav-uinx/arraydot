const fs = require('fs');
let code = fs.readFileSync('src/app/page.tsx', 'utf8');

const regex = /function AsciiText[\s\S]*?function StickyPhases/m;

const newComponent = `function AsciiText({ text, isGreen }) {
  const [ascii, setAscii] = useState('');

  useEffect(() => {
    const W = 600;
    const H = 80;
    const c = document.createElement('canvas');
    c.width = W; 
    c.height = H;
    const ctx = c.getContext('2d', { willReadFrequently: true });
    
    ctx.fillStyle = '#fff';
    ctx.font = '900 26px system-ui, -apple-system, sans-serif';
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';
    
    const words = text.split(' ');
    let line1 = ''; 
    let line2 = '';
    
    for(let w of words) {
       if (ctx.measureText(line1 + w + ' ').width < W - 40 && !line2) {
           line1 += w + ' ';
       } else {
           line2 += w + ' ';
       }
    }
    
    if (!line2) {
       ctx.fillText(line1.trim(), W/2, H/2);
    } else {
       ctx.fillText(line1.trim(), W/2, H/2 - 14);
       ctx.fillText(line2.trim(), W/2, H/2 + 14);
    }
    
    const img = ctx.getImageData(0,0,W,H).data;
    let str = '';
    
    // Monospace fonts are ~2x taller than they are wide.
    // Sampling at dx=3, dy=6 ensures the final ASCII art isn't stretched or squished!
    for (let y = 0; y < H; y += 6) {
       let row = '';
       let hasChar = false;
       for (let x = 0; x < W; x += 3) {
          const a = img[(y*W+x)*4 + 3];
          if (a > 128) {
              row += Math.random()>0.5 ? '0' : '1';
              hasChar = true;
          } else {
              row += ' ';
          }
       }
       if (hasChar || str.length > 0) {
         str += row.trimEnd() + '\\n';
       }
    }
    
    str = str.replace(/\\s+$/, '');
    setAscii(str);
  }, [text]);

  return (
    <pre style={{
       fontFamily: 'monospace',
       fontSize: 'clamp(2.5px, 0.45vw, 6px)',
       lineHeight: '1.1',
       color: isGreen ? '#4ade80' : '#ff6b6b',
       margin: 0,
       whiteSpace: 'pre',
       textAlign: 'center',
       textShadow: \`0 0 5px \${isGreen ? 'rgba(74,222,128,0.4)' : 'rgba(255,107,107,0.4)'}\`
    }}>
       {ascii || text}
    </pre>
  );
}

function StickyPhases`;

code = code.replace(regex, newComponent);
fs.writeFileSync('src/app/page.tsx', code, 'utf8');
console.log("Success refined ASCII resolution");
