const fs = require('fs');

let code = fs.readFileSync('src/app/page.tsx', 'utf8');

const particleComponent = `
function ParticleMorphText({ word }) {
  const canvasRef = useRef(null);
  const particles = useRef([]);
  const animationRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    const W = 1200;
    const H = 200;
    
    const hiddenCanvas = document.createElement('canvas');
    hiddenCanvas.width = W;
    hiddenCanvas.height = H;
    const hCtx = hiddenCanvas.getContext('2d', { willReadFrequently: true });
    
    hCtx.fillStyle = '#fff';
    hCtx.font = '800 52px system-ui, -apple-system, sans-serif';
    hCtx.textAlign = 'center';
    hCtx.textBaseline = 'middle';
    hCtx.fillText(word, W/2, H/2);
    
    const imgData = hCtx.getImageData(0, 0, W, H).data;
    const targets = [];
    
    for (let y = 0; y < H; y += 4) {
      for (let x = 0; x < W; x += 4) {
        const idx = (y * W + x) * 4;
        const alpha = imgData[idx + 3];
        if (alpha > 128) {
           targets.push({ x, y });
        }
      }
    }
    
    targets.sort(() => Math.random() - 0.5);
    const current = particles.current;
    
    while(current.length < targets.length) {
      current.push({
        x: Math.random() * W,
        y: Math.random() * H,
        tx: 0, ty: 0, active: false
      });
    }
    
    for(let i=0; i<current.length; i++) {
      if (i < targets.length) {
        current[i].tx = targets[i].x;
        current[i].ty = targets[i].y;
        current[i].active = true;
      } else {
        const angle = Math.random() * Math.PI * 2;
        const dist = 500 + Math.random() * 500;
        current[i].tx = W/2 + Math.cos(angle)*dist;
        current[i].ty = H/2 + Math.sin(angle)*dist;
        current[i].active = false;
      }
    }
    
    const render = () => {
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = '#ffffff';
      
      let moving = false;
      for(let i=0; i<current.length; i++) {
        const p = current[i];
        const dx = p.tx - p.x;
        const dy = p.ty - p.y;
        
        p.x += dx * 0.12;
        p.y += dy * 0.12;
        
        if (Math.abs(dx) > 0.5 || Math.abs(dy) > 0.5) moving = true;
        
        if (p.active || moving) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      
      if (moving) {
        animationRef.current = requestAnimationFrame(render);
      }
    };
    
    if (animationRef.current) cancelAnimationFrame(animationRef.current);
    render();
    
    return () => cancelAnimationFrame(animationRef.current);
  }, [word]);

  return (
    <canvas 
      ref={canvasRef} 
      width={1200} 
      height={200} 
      style={{ width: '100%', maxWidth: '1200px', height: 'auto', display: 'block', margin: '0 auto', filter: 'drop-shadow(0 0 8px rgba(255,255,255,0.4))' }} 
    />
  );
}

function StickyPhases() {`;

code = code.replace('function StickyPhases() {', particleComponent);

// Now update StickyPhases implementation
const oldStickyPhasesRegex = /function StickyPhases\(\) \{[\s\S]*?<\/section>\s*\);\s*\}/;

const newStickyPhases = `function StickyPhases() {
  const [phase, setPhase] = useState(1);
  const [subWordIndex, setSubWordIndex] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      const scrollDistance = rect.height - windowHeight;
      const scrolled = -rect.top;
      
      let progress = scrolled / scrollDistance;
      
      if (progress < 0) progress = 0;
      if (progress > 1) progress = 1;
      
      if (progress < 0.33) setPhase(1);
      else if (progress < 0.66) setPhase(2);
      else setPhase(3);
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const subWords = ["COMPROMISED", "HACKED", "BREACHED", "EXPOSED", "VULNERABLE"];
  
  useEffect(() => {
    let interval;
    if (phase === 2) {
      interval = setInterval(() => {
        setSubWordIndex(prev => (prev + 1) % subWords.length);
      }, 1500);
    }
    return () => clearInterval(interval);
  }, [phase]);

  let currentTitle = "Problems We Hear Every Week";
  if (phase === 2) {
    currentTitle = subWords[subWordIndex];
  } else if (phase === 3) {
    currentTitle = "Remediations That We Offer";
  }

  const problems = [
    { text: 'Identity & Credential Compromise', style: { top: '25%', left: '12%' } },
    { text: 'Unpatched & Vulnerable Systems', style: { top: '18%', right: '12%' } },
    { text: 'Malware & Ransomware Attacks', style: { top: '38%', left: '40%' } },
    { text: 'Email-borne Threats', style: { bottom: '35%', left: '38%' } },
    { text: 'Data Breaches & Exfiltration', style: { bottom: '20%', left: '18%' } },
    { text: 'Compliance Gaps', style: { bottom: '25%', right: '15%' } },
  ];

  const remediations = [
    { text: 'Deploying Identity Threat Detection and Response', style: { top: '25%', left: '12%' } },
    { text: 'Implement a Vulnerability Management Program', style: { top: '18%', right: '12%' } },
    { text: 'Deploying EDR Solutions', style: { top: '38%', left: '40%' } },
    { text: 'Deploying Email Security Gateways & Awareness Training', style: { bottom: '35%', left: '38%' } },
    { text: 'Deploy DLP & CASB', style: { bottom: '20%', left: '18%' } },
    { text: 'Continuous Compliance Monitoring', style: { bottom: '25%', right: '15%' } },
  ];

  return (
    <section ref={containerRef} className="sticky-container">
      <div className="sticky-content">
         <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '100%', zIndex: 5 }}>
           <ParticleMorphText word={currentTitle} />
         </div>

         {problems.map((p, i) => {
           const isGreen = phase === 3;
           const isVisible = phase >= 2;
           const text = isGreen ? remediations[i].text : p.text;
           const dotClass = isGreen ? 'dot-green' : 'dot-red';
           
           return (
             <div key={i} className={\`phase-card \${isVisible ? 'visible' : ''}\`} style={p.style}>
               <div className={\`dot-indicator \${dotClass}\`}></div>
               {text}
             </div>
           );
         })}
      </div>
    </section>
  );
}`;

code = code.replace(oldStickyPhasesRegex, newStickyPhases);

fs.writeFileSync('src/app/page.tsx', code, 'utf8');
