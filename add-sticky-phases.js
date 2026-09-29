const fs = require('fs');

// 1. Update CSS
let css = fs.readFileSync('src/app/globals.css', 'utf8');
const stickyCss = `
.sticky-container {
  position: relative;
  height: 300vh;
  background: #000;
  border-top: 1px solid #111;
}
.sticky-content {
  position: sticky;
  top: 0;
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}
.dotted-title {
  font-size: clamp(30px, 4.5vw, 70px);
  font-weight: 600;
  color: transparent;
  background-image: radial-gradient(circle, #ffffff 1.5px, transparent 1.5px);
  background-size: 4px 4px;
  -webkit-background-clip: text;
  background-clip: text;
  white-space: nowrap;
  letter-spacing: 3px;
  text-shadow: 0 0 12px rgba(255, 255, 255, 0.2);
  transition: opacity 0.5s ease;
}
.phase-card {
  position: absolute;
  background: rgba(15, 15, 15, 0.9);
  border: 1px solid rgba(255,255,255,0.08);
  padding: 12px 24px;
  border-radius: 6px;
  color: #ccc;
  font-size: clamp(12px, 1vw, 16px);
  display: flex;
  align-items: center;
  gap: 12px;
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  opacity: 0;
  transform: translateY(20px) scale(0.95);
  pointer-events: none;
  box-shadow: 0 10px 30px rgba(0,0,0,0.5);
  white-space: nowrap;
  z-index: 10;
}
.phase-card.visible {
  opacity: 1;
  transform: translateY(0) scale(1);
}
.dot-indicator {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
  transition: all 0.6s ease;
}
.dot-red {
  background: #ff4444;
  box-shadow: 0 0 12px #ff4444;
}
.dot-green {
  background: #00ff88;
  box-shadow: 0 0 12px #00ff88;
}
`;
fs.writeFileSync('src/app/globals.css', css + stickyCss, 'utf8');


// 2. Update page.tsx
let code = fs.readFileSync('src/app/page.tsx', 'utf8');

// Ensure useRef is imported
code = code.replace(
  "import { useEffect, useState } from 'react';",
  "import { useEffect, useState, useRef } from 'react';"
);

const componentCode = `
function StickyPhases() {
  const [phase, setPhase] = useState(1);
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
         <div style={{ opacity: phase === 3 ? 0 : 1, position: 'absolute' }} className="dotted-title">
           Problems We Hear Every Week
         </div>
         <div style={{ opacity: phase === 3 ? 1 : 0, position: 'absolute' }} className="dotted-title">
           Remediations That We Offer
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
}

export default function Home() {`;

code = code.replace('export default function Home() {', componentCode);

code = code.replace(
  /<\/section>\s*<div className="chips"/,
  '</section>\n  <StickyPhases />\n  <div className="chips"'
);

fs.writeFileSync('src/app/page.tsx', code, 'utf8');
