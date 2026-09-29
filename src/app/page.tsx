// @ts-nocheck
'use client';
import { useEffect, useState, useRef } from 'react';


function BinaryText({ text }) {
  const [display, setDisplay] = useState(text.replace(/[^ ]/g, '0'));
  useEffect(() => {
    let iter = 0;
    const maxIter = text.length;
    const interval = setInterval(() => {
      setDisplay(text.split('').map((char, i) => {
        if (char === ' ') return ' ';
        if (i < iter) return char;
        return Math.random() > 0.5 ? '0' : '1';
      }).join(''));
      iter += 0.5;
      if (iter >= maxIter) clearInterval(interval);
    }, 25);
    return () => clearInterval(interval);
  }, [text]);
  return <span>{display}</span>;
}

function BreachSection() {
  const [count, setCount] = useState(4466336);

  useEffect(() => {
    const interval = setInterval(() => {
      // Tick up realistically like a live meter
      setCount(c => c + Math.floor(Math.random() * 8 + 1));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="breach-section">
      <div className="breach-w">
        <p className="breach-p">
          SMBs are often affected by cyberattacks, incurring an average cost of USD 4.4 M. A huge price that can easily be avoided with our cost-effective security solutions. We provide comprehensive services that keep your operations secure while ensuring you don't overspend.
        </p>
        <p className="breach-q">
          "Threats are evolving faster than solutions; stay on guard with the right security partner"
        </p>
        
        <div className="breach-counter-wrap">
          <div className="breach-number">{count}</div>
          <div className="breach-dotted-text">The Cost of a Data Breach</div>
        </div>
      </div>
      <div className="breach-attr">
        *Cost of a Data Breach Report 2025, IBM
      </div>
    </section>
  );
}



function ParticleMorphText({ word }) {
  const canvasRef = useRef(null);
  const particles = useRef([]);
  const animationRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    
    // Fill the exact dimensions of the screen to truly center it
    const W = window.innerWidth;
    const H = window.innerHeight;
    canvas.width = W;
    canvas.height = H;
    
    const hiddenCanvas = document.createElement('canvas');
    hiddenCanvas.width = W;
    hiddenCanvas.height = H;
    const hCtx = hiddenCanvas.getContext('2d', { willReadFrequently: true });
    
    hCtx.fillStyle = '#fff';
    const fontSize = Math.min(80, W * 0.065); // Scale up dynamically
    hCtx.font = `800 ${fontSize}px system-ui, -apple-system, sans-serif`;
    hCtx.textAlign = 'center';
    hCtx.textBaseline = 'middle';
    const lines = word.split('\n');
      const lineHeight = fontSize * 1.1;
      const startY = H/2 - ((lines.length - 1) * lineHeight) / 2;
      
      lines.forEach((line, i) => {
         hCtx.fillText(line, W/2, startY + i * lineHeight);
      });
    
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
    
    targets.sort((a, b) => (a.x + a.y * 0.5) - (b.x + b.y * 0.5));
    const current = particles.current;
    current.sort((a, b) => (a.x + a.y * 0.5) - (b.x + b.y * 0.5));
    
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
        const dist = Math.max(W, H) * (0.5 + Math.random() * 0.5);
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
        
        p.x += dx * 0.04;;
        p.y += dy * 0.04;;
        
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
      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1, pointerEvents: 'none', filter: 'drop-shadow(0 0 10px rgba(255,255,255,0.4))' }} 
    />
  );
}


function AsciiText({ text, isGreen, align }) {
  const [imgSrc, setImgSrc] = useState('');

  useEffect(() => {
    const W = 2800;
    const H = 480;
    
    const canvas = document.createElement('canvas');
    canvas.width = W;
    canvas.height = H;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    
    const hiddenCanvas = document.createElement('canvas');
    hiddenCanvas.width = W;
    hiddenCanvas.height = H;
    const hCtx = hiddenCanvas.getContext('2d', { willReadFrequently: true });
    
    hCtx.fillStyle = '#fff';
    let fontSize = 140;
    hCtx.font = `900 ${fontSize}px system-ui, -apple-system, sans-serif`;
    hCtx.textBaseline = 'middle';
    hCtx.textAlign = align;
    
    const words = text.split(' ');
    let line1 = ''; 
    let line2 = '';
    
    for(let w of words) {
       if (hCtx.measureText(line1 + w + ' ').width < W - 100 && !line2) {
           line1 += w + ' ';
       } else {
           line2 += w + ' ';
       }
    }
    
    while(hCtx.measureText(line1).width > W - 100 && fontSize > 60) {
       fontSize -= 10;
       hCtx.font = `900 ${fontSize}px system-ui, -apple-system, sans-serif`;
    }
    
    const xPos = align === 'left' ? 0 : W;
    
    if (!line2) {
       hCtx.fillText(line1.trim(), xPos, H/2);
    } else {
       hCtx.fillText(line1.trim(), xPos, H/2 - 70);
       hCtx.fillText(line2.trim(), xPos, H/2 + 70);
    }
    
    const imgData = hCtx.getImageData(0, 0, W, H).data;
    
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = isGreen ? '#4ade80' : '#ff6b6b';
    ctx.font = 'bold 12px monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    const stepX = 8;
    const stepY = 12;
    let dots = 0;
    
    for (let y = 0; y < H; y += stepY) {
      for (let x = 0; x < W; x += stepX) {
        const idx = (y * W + x) * 4;
        if (imgData[idx + 3] > 128) {
           ctx.fillText(Math.random() > 0.5 ? '0' : '1', x, y);
           dots++;
        }
      }
    }
    
    if (dots < 50) {
       ctx.font = 'bold 80px monospace';
       ctx.textAlign = align;
       ctx.fillText(text, xPos, H/2);
    }
    
    setImgSrc(canvas.toDataURL());
  }, [text, isGreen, align]);

  if (!imgSrc) return <div style={{ width: '100%', height: '10vh' }}></div>;

  return (
    <img 
      src={imgSrc} 
      alt={text}
      style={{ 
         width: '100%', 
         maxWidth: '700px',
         height: 'auto', 
         display: 'block', 
         filter: `drop-shadow(0 0 4px ${isGreen ? 'rgba(74,222,128,0.5)' : 'rgba(255,107,107,0.5)'})` 
      }}
    />
  );
}

function StickyPhases() {
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
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [phase, subWords.length]);

  let currentTitle = "Problems We\nHear Every Week";
  if (phase === 2) {
    currentTitle = subWords[subWordIndex];
  } else if (phase === 3) {
    currentTitle = "Remediations\nWe\nOffer";
  }

  const problems = [
    'Identity & Credential Compromise',
    'Unpatched & Vulnerable Systems',
    'Compliance Gaps',
    'Email-borne Threats',
    'Data Breaches & Exfiltration',
    'Malware & Ransomware Attacks',
  ];

  const remediations = [
    'Deploying Identity Threat Detection and Response',
    'Implement a Vulnerability Management Program',
    'Continuous Compliance Monitoring',
    'Deploying Email Security Gateways & Awareness Training',
    'Deploy DLP & CASB',
    'Deploying EDR Solutions',
  ];

  const isGreen = phase === 3;
  const isVisible = phase >= 2;
  const colorClass = isGreen ? 'text-green' : 'text-red';
  const arr = isGreen ? remediations : problems;

  const renderItem = (idx) => {
    const isLeft = idx % 2 === 0;
    return (
      <div className={`phase-card ${isVisible ? 'visible' : ''}`} style={{ 
         position: 'relative', 
         transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
         display: 'flex',
         justifyContent: isLeft ? 'flex-start' : 'flex-end',
         width: '100%',
         margin: 0
      }}>
        {isVisible && <AsciiText key={arr[idx]} text={arr[idx]} isGreen={isGreen} align={isLeft ? 'left' : 'right'} />}
      </div>
    );
  };

  return (
    <section ref={containerRef} className="sticky-container">
      <div className="sticky-content">
         <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1 }}>
           <ParticleMorphText word={currentTitle} />
         </div>
         
         <div style={{ position: 'absolute', top: 0, left: 0, width: '100vw', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', zIndex: 10, padding: '12vh 1vw', boxSizing: 'border-box' }}>
            
            {/* Top Row */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
               {renderItem(0)}
               {renderItem(1)}
            </div>

            {/* Middle Row - Horizontally flanking the center morphing text */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
               {renderItem(2)}
               {renderItem(3)}
            </div>

            {/* Bottom Row */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
               {renderItem(4)}
               {renderItem(5)}
            </div>
         </div>
      </div>
    </section>
  );
}



function AlwaysOnGuardSection() {
  
  const DottedPlus = () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 3px)', gap: '3px' }}>
       {Array.from({ length: 25 }).map((_, i) => {
          const r = Math.floor(i / 5);
          const c = i % 5;
          const isPlus = r === 2 || c === 2;
          return <div key={i} style={{ width: '3px', height: '3px', borderRadius: '50%', background: isPlus ? '#fff' : 'transparent', opacity: isPlus ? 1 : 0 }} />;
       })}
    </div>
  );

  const SegBar = ({ label, color, value, width }) => (
    <div style={{ marginBottom: '12px' }}>
       <div style={{ fontSize: '0.7rem', color: '#888', marginBottom: '6px' }}>{label}</div>
       <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ flexGrow: 1, height: '6px', background: '#222', borderRadius: '3px', overflow: 'hidden' }}>
             <div style={{ 
                width: width, 
                height: '100%', 
                background: `repeating-linear-gradient(to right, ${color}, ${color} 4px, transparent 4px, transparent 6px)` 
             }}></div>
          </div>
          <div style={{ fontSize: '0.8rem', color: color, width: '20px', fontWeight: 'bold' }}>{value}</div>
       </div>
    </div>
  );

  const KpiBox = ({ label, value }) => (
    <div style={{ background: 'linear-gradient(to bottom, #1a1a1a, #0a0a0a)', border: '1px solid #333', borderRadius: '8px', padding: '10px 12px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
       <div style={{ fontSize: '0.65rem', color: '#888', marginBottom: '4px' }}>{label}</div>
       <div style={{ fontSize: '1.2rem', color: '#fff', fontWeight: 'bold' }}>{value}</div>
    </div>
  );

  return (
    <section style={{ backgroundColor: '#000', padding: '15vh 5vw', color: '#fff', borderTop: '1px solid #111', position: 'relative', zIndex: 20 }}>
       <div style={{ textAlign: 'center', marginBottom: '10vh' }}>
          <div style={{ color: '#3b82f6', letterSpacing: '0.2em', fontSize: '0.85rem', fontWeight: 600, marginBottom: '1.5rem', textTransform: 'uppercase' }}>
             Comprehensive Cybersecurity Solutions
          </div>
          <h2 className="dotted-title" style={{ fontSize: 'clamp(40px, 6vw, 90px)', margin: 0, paddingBottom: '10px' }}>
             Always On Guard
          </h2>
       </div>

       <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', gap: '3rem', maxWidth: '1400px', margin: '0 auto' }}>
          
          {/* Card 1 */}
          <div className="service-card" style={{ border: '1px solid #222', borderRadius: '24px', background: '#050505', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
             <div style={{ padding: '3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 400, margin: 0, maxWidth: '85%', lineHeight: '1.3', letterSpacing: '-0.02em' }}>
                   Managed Security Services for Modern Business
                </h3>
                <div style={{ width: '48px', height: '48px', background: '#111', border: '1px solid #333', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', borderRadius: '8px' }}>
                   <DottedPlus />
                </div>
             </div>
             
             <div style={{ padding: '0 3rem 3rem 3rem', flexGrow: 1 }}>
                <div style={{ background: '#0a0a0a', border: '1px solid #222', borderRadius: '12px 12px 0 0', height: '550px', padding: '1.5rem', position: 'relative', overflow: 'hidden', borderBottom: 'none' }}>
                   
                   <div style={{ background: '#111', border: '1px solid #222', borderRadius: '12px', padding: '1.25rem', height: '100%', display: 'flex', flexDirection: 'column' }}>
                      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1.25rem', borderBottom: '1px solid #222', paddingBottom: '0.75rem' }}>
                         <div style={{ width: '16px', height: '16px', background: '#3b82f6', borderRadius: '4px', marginRight: '10px' }}></div>
                         <span style={{ fontSize: '0.75rem', color: '#888', fontWeight: 600, letterSpacing: '1.5px' }}>ALERT CENTER</span>
                      </div>
                      
                      <div style={{ display: 'grid', gridTemplateColumns: '80px 1fr 100px', fontSize: '0.75rem', color: '#555', marginBottom: '0.75rem', padding: '0 0.5rem', fontWeight: 600 }}>
                         <span>Severity</span>
                         <span>Incident</span>
                         <span style={{ textAlign: 'right' }}>Status</span>
                      </div>
                      
                      {[
                         { sev: 'Critical', color: '#ef4444', text: 'Credential stuffing attempt - VPN gateway', status: 'Contained', sColor: '#10b981' },
                         { sev: 'High', color: '#f59e0b', text: 'Suspicious PowerShell execution - WS-114', status: 'Investigating', sColor: '#8b5cf6' },
                         { sev: 'Low', color: '#10b981', text: 'New asset discovered - cloud-eu-west', status: 'Triaged', sColor: '#3b82f6' },
                         { sev: 'Medium', color: '#3b82f6', text: 'Unauthorized access attempt - user123', status: 'Under review', sColor: '#10b981' }
                      ].map((row, i) => (
                         <div key={i} style={{ display: 'grid', gridTemplateColumns: '80px 1fr 100px', fontSize: '0.85rem', background: '#1a1a1a', padding: '1rem 0.75rem', borderRadius: '8px', marginBottom: '6px', alignItems: 'center', border: '1px solid #222' }}>
                            <div style={{ display: 'flex', alignItems: 'center', color: '#ddd' }}><span style={{ width: '8px', height: '8px', borderRadius: '50%', background: row.color, marginRight: '8px', boxShadow: `0 0 8px ${row.color}80` }}></span>{row.sev}</div>
                            <div style={{ color: '#aaa', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', paddingRight: '1rem' }}>{row.text}</div>
                            <div style={{ textAlign: 'right' }}><span style={{ fontSize: '0.7rem', padding: '4px 10px', borderRadius: '12px', background: `${row.sColor}15`, color: row.sColor, border: `1px solid ${row.sColor}30` }}>{row.status}</span></div>
                         </div>
                      ))}

                      {/* Vulnerability Management Bottom Section */}
                      <div style={{ marginTop: 'auto', borderTop: '1px solid #222', paddingTop: '1.25rem' }}>
                         <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                            <span style={{ fontSize: '0.75rem', color: '#888', fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase' }}>Vulnerability Management</span>
                         </div>
                         <div style={{ display: 'flex', gap: '1.5rem' }}>
                            <div style={{ flex: 1 }}>
                               <SegBar label="Critical" color="#ef4444" value="3" width="10%" />
                               <SegBar label="High" color="#f59e0b" value="14" width="30%" />
                               <SegBar label="Low" color="#10b981" value="88" width="80%" />
                            </div>
                            <div style={{ width: '140px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                               <KpiBox label="Events triaged / 24h" value="1,284" />
                               <KpiBox label="Mean time to respond" value="9 min" />
                               <KpiBox label="Security posture" value="72/100" />
                            </div>
                         </div>
                      </div>
                   </div>
                </div>
             </div>
          </div>

          {/* Card 2 */}
          <div className="service-card" style={{ border: '1px solid #222', borderRadius: '24px', background: '#050505', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
             <div style={{ padding: '3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 400, margin: 0, maxWidth: '85%', lineHeight: '1.3', letterSpacing: '-0.02em' }}>
                   Partner Services for MSPs, MSSPs & Technology Vendors
                </h3>
                <div style={{ width: '48px', height: '48px', background: '#111', border: '1px solid #333', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', borderRadius: '8px' }}>
                   <DottedPlus />
                </div>
             </div>
             
             <div style={{ padding: '0 3rem 3rem 3rem', flexGrow: 1 }}>
                <div style={{ background: '#0a0a0a', border: '1px solid #222', borderRadius: '12px 12px 0 0', height: '550px', padding: '1.5rem', position: 'relative', overflow: 'hidden', borderBottom: 'none' }}>
                   
                   <div style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, opacity: 0.15, backgroundImage: 'radial-gradient(#3b82f6 1.5px, transparent 1.5px)', backgroundSize: '16px 16px', pointerEvents: 'none' }}></div>
                   
                   <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      
                      <div style={{ background: '#111', border: '1px solid #222', borderRadius: '12px', padding: '1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>
                         <div style={{ display: 'flex', alignItems: 'center' }}>
                            <div style={{ width: '40px', height: '40px', background: '#3b82f6', borderRadius: '8px', marginRight: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                               <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                            </div>
                            <div>
                               <div style={{ fontSize: '1.05rem', color: '#fff', fontWeight: 500 }}>SOC Analyst</div>
                               <div style={{ fontSize: '0.75rem', color: '#3b82f6', marginTop: '2px' }}>Night-shift Tier 2 analyst</div>
                            </div>
                         </div>
                         <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                            <span style={{ fontSize: '0.8rem', padding: '6px 14px', background: '#3b82f615', color: '#3b82f6', borderRadius: '16px', border: '1px solid #3b82f630' }}>Tier 2</span>
                            <div style={{ display: 'flex', alignItems: 'center', fontSize: '0.85rem', color: '#10b981' }}>
                               <span style={{ width: '8px', height: '8px', background: '#10b981', borderRadius: '50%', marginRight: '8px', boxShadow: '0 0 8px #10b98180' }}></span> Online
                            </div>
                         </div>
                      </div>
                      
                      <div style={{ background: '#111', border: '1px solid #222', borderRadius: '12px', padding: '1.25rem', height: '60px', display: 'flex', alignItems: 'center', opacity: 0.8 }}>
                         <div style={{ width: '28px', height: '28px', background: '#222', borderRadius: '6px', marginRight: '1.25rem' }}></div>
                         <div style={{ width: '45%', height: '12px', background: '#222', borderRadius: '4px' }}></div>
                         <div style={{ marginLeft: 'auto', width: '15%', height: '12px', background: '#222', borderRadius: '4px' }}></div>
                      </div>
                      
                      <div style={{ background: '#111', border: '1px solid #222', borderRadius: '12px', padding: '1.25rem', height: '60px', display: 'flex', alignItems: 'center', opacity: 0.5 }}>
                         <div style={{ width: '28px', height: '28px', background: '#222', borderRadius: '6px', marginRight: '1.25rem' }}></div>
                         <div style={{ width: '35%', height: '12px', background: '#222', borderRadius: '4px' }}></div>
                         <div style={{ marginLeft: 'auto', width: '20%', height: '12px', background: '#222', borderRadius: '4px' }}></div>
                      </div>
                   </div>

                   {/* Concentric Graphic */}
                   <div style={{ position: 'relative', height: '250px', display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '1rem', zIndex: 1 }}>
                      <div style={{ position: 'absolute', width: '350px', height: '350px', border: '1px solid rgba(59,130,246,0.1)', borderRadius: '50%', background: 'radial-gradient(circle, rgba(59,130,246,0.05) 0%, transparent 70%)' }}></div>
                      <div style={{ position: 'absolute', width: '240px', height: '240px', border: '1px solid rgba(59,130,246,0.2)', borderRadius: '50%' }}></div>
                      <div style={{ position: 'absolute', width: '130px', height: '130px', border: '1px solid rgba(59,130,246,0.4)', borderRadius: '50%', background: 'rgba(59,130,246,0.1)' }}></div>
                      
                      <div style={{ position: 'absolute', width: '70px', height: '70px', background: '#050505', borderRadius: '16px', border: '1px solid #333', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 10, boxShadow: '0 0 30px rgba(59,130,246,0.5)' }}>
                         <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                      </div>

                      <div style={{ position: 'absolute', bottom: '20px', left: '20px', background: '#10b981', borderRadius: '12px', padding: '12px', display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 11, boxShadow: '0 10px 20px rgba(16,185,129,0.2)' }}>
                         <div style={{ display: 'flex', gap: '4px', marginBottom: '4px', alignItems: 'center' }}>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="#000" stroke="none"><circle cx="12" cy="7" r="4"/><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/></svg>
                            <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#000' }}>+</span>
                         </div>
                         <span style={{ fontSize: '0.65rem', color: '#000', fontWeight: 'bold' }}>MSP'S</span>
                      </div>

                      <div style={{ position: 'absolute', bottom: '20px', right: '20px', background: '#f97316', borderRadius: '12px', padding: '12px', display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 11, boxShadow: '0 10px 20px rgba(249,115,22,0.2)' }}>
                         <div style={{ display: 'flex', gap: '4px', marginBottom: '4px', alignItems: 'center' }}>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="#000" stroke="none"><circle cx="12" cy="7" r="4"/><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/></svg>
                            <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#000' }}>+</span>
                         </div>
                         <span style={{ fontSize: '0.65rem', color: '#000', fontWeight: 'bold' }}>TECH VENDORS</span>
                      </div>

                      {/* Small floating blue avatars */}
                      <div style={{ position: 'absolute', top: '20px', right: '70px', width: '32px', height: '32px', background: '#3b82f6', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', boxShadow: '0 0 15px rgba(59,130,246,0.6)' }}><svg width="16" height="16" viewBox="0 0 24 24" fill="#fff" stroke="none"><circle cx="12" cy="7" r="4"/><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/></svg></div>
                      <div style={{ position: 'absolute', bottom: '70px', right: '110px', width: '28px', height: '28px', background: '#3b82f6', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', opacity: 0.8 }}><svg width="14" height="14" viewBox="0 0 24 24" fill="#fff" stroke="none"><circle cx="12" cy="7" r="4"/><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/></svg></div>
                      <div style={{ position: 'absolute', bottom: '50px', left: '130px', width: '36px', height: '36px', background: '#3b82f6', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', boxShadow: '0 0 20px rgba(59,130,246,0.8)' }}><svg width="18" height="18" viewBox="0 0 24 24" fill="#fff" stroke="none"><circle cx="12" cy="7" r="4"/><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/></svg></div>
                   </div>
                </div>
             </div>
          </div>
       </div>
    </section>
  );
}

export default function Home() {
  useEffect(() => {
    
(function(){
var cv=document.getElementById('c'),ctx=cv.getContext('2d'),hero=document.getElementById('hero');
var W,H,dpr,stars=[],words=[],dots=[],btnDots=[],btnRect={x:-999,y:-999,w:0,h:0},btnExploded=false;
var HEAD='Defense Never Sleeps';
var LIST=['RANSOMWARE','PHISHING','MALWARE','ZERO-DAY','SOC','SIEM','EDR','FIREWALL','BREACH','PATCH','IAM','MFA','THREAT INTEL','EXFILTRATION','BOTNET','DDOS','INCIDENT RESPONSE','VULNERABILITY','ENCRYPTION','COMPLIANCE','PENTEST','SPOOFING','TROJAN','BACKDOOR','LOGS','ALERTS','FORENSICS','ZERO TRUST','CVE','SANDBOX'];
var m={x:-9999,y:-9999,tx:-9999,ty:-9999,on:false};
function rnd(a,b){return a+Math.random()*(b-a)}
function build(){
 dpr=Math.min(window.devicePixelRatio||1,2);W=hero.clientWidth;H=hero.clientHeight;
 cv.width=W*dpr;cv.height=H*dpr;ctx.setTransform(dpr,0,0,dpr,0,0);
 stars=[];var ns=Math.round(W*H/5500);
 for(var i=0;i<ns;i++)stars.push({x:rnd(0,W),y:rnd(0,H),r:rnd(.3,1.3),p:rnd(0,6.28),s:rnd(.4,1.6),b:Math.random()<.06});
 words=[];var cw=150,ch=54;
 for(var y=20;y<H;y+=ch)for(var x=(Math.floor(y/ch)%2?-40:0);x<W;x+=cw){
  words.push({t:LIST[Math.floor(Math.random()*LIST.length)],x:x+rnd(0,40),y:y+rnd(0,20),f:rnd(11,16),a:0})}
// dotted headline
 var fs=Math.min(W*.115,150),off=document.createElement('canvas'),oc=off.getContext('2d');
 var fam='Poppins,"Segoe UI",system-ui,sans-serif';
 oc.font='600 '+fs+'px '+fam;
 var tw=oc.measureText(HEAD).width,maxw=W*.88;
 if(tw>maxw){fs*=maxw/tw}
 off.width=Math.max(1, W);off.height=Math.ceil(fs*1.4);oc.font='600 '+fs+'px '+fam;oc.textBaseline='middle';oc.textAlign='center';
 oc.fillStyle='#fff';oc.fillText(HEAD,W/2,off.height/2);
 var img=oc.getImageData(0,0,off.width,off.height).data,step=Math.max(4,Math.round(fs/22)),oy=H*.38-off.height/2;
 dots=[];
 for(var yy=0;yy<off.height;yy+=step)for(var xx=0;xx<off.width;xx+=step){
  if(img[(yy*off.width+xx)*4+3]>128)dots.push({x:xx,y:yy+oy,r:Math.max(1,step*.3)})}

 // build button dots
 var btn = document.getElementById('hbtn');
 if(btn) {
   var r = btn.getBoundingClientRect();
   var hr = hero.getBoundingClientRect();
   btnRect = {x: r.left - hr.left, y: r.top - hr.top, w: r.width, h: r.height};
   
   var fsBtn = 17;
   off.width = btnRect.w; 
   off.height = btnRect.h;
   oc.clearRect(0,0,off.width,off.height);
   oc.font = '500 '+fsBtn+'px '+fam;
   oc.textBaseline = 'middle';
   oc.textAlign = 'center';
   oc.fillStyle = '#fff';
   oc.fillText('GET SECURED', off.width/2 - 12, off.height/2);
   
   var imgBtn = oc.getImageData(0,0,off.width,off.height).data;
   var stepBtn = 2;
   btnDots = [];
   for(var yy=0;yy<off.height;yy+=stepBtn) {
     for(var xx=0;xx<off.width;xx+=stepBtn) {
       if(imgBtn[(yy*off.width+xx)*4+3]>128) {
         btnDots.push({x: btnRect.x + xx, y: btnRect.y + yy, r: 1});
       }
     }
   }
 }
}
function frame(t){
 m.x+=(m.tx-m.x)*.18;m.y+=(m.ty-m.y)*.18;
 ctx.clearRect(0,0,W,H);
 // stars
 for(var i=0;i<stars.length;i++){
  var s=stars[i],a=.35+.65*Math.abs(Math.sin(t*.0006*s.s+s.p));
  ctx.globalAlpha=a*(s.b?1:.7);
  ctx.fillStyle=s.b?'#9fd4ff':'#fff';
  ctx.beginPath();
  ctx.arc(s.x,s.y,s.r*(s.b?1.5:1),0,6.283);
  ctx.fill();
 }
 
 // hidden words that light up near cursor (proximity + exact hover)
 ctx.textBaseline='middle';
 var R=210, R2=R*R;
 for(var i=0;i<words.length;i++){
  var w=words[i], dx=w.x-m.x, dy=w.y-m.y, d2=dx*dx+dy*dy, g=0;
  
  if(m.on && d2 < R2) {
    g = 1 - Math.sqrt(d2)/R;
    g = g*g*(3-2*g);
  }
  
  ctx.font='600 '+w.f+'px ui-monospace,Menlo,Consolas,monospace';
  var tw = ctx.measureText(w.t).width;
  
  var isHovered = (m.on && m.x >= w.x - 5 && m.x <= w.x + tw + 5 && m.y >= w.y - w.f && m.y <= w.y + w.f);

  var intersectsBtn = (w.x < btnRect.x + btnRect.w && w.x + tw > btnRect.x && w.y - w.f < btnRect.y + btnRect.h && w.y + w.f > btnRect.y);
  if(intersectsBtn) {
      g = 0;
      w.a = 0;
      isHovered = false;
  }

  if(isHovered) g = 1;
  
  // Smooth hover interpolation
  w.h = w.h || 0;
  w.h += ((isHovered ? 1 : 0) - w.h) * 0.15;
  
  w.a += (g-w.a)*.2;
  var al = 0.035 + w.a*.95;
  ctx.globalAlpha = Math.min(al, 1);
  
  var drawY = w.y - (w.h * 3); // Smooth upward lift
  
  if(w.a > .05) {
    // Crossfade base color (blue) to hover color (white)
    var baseR = w.a > .6 ? 217 : 60;
    var baseG = w.a > .6 ? 243 : 196;
    var baseB = 255;
    var currR = Math.round(baseR + (255 - baseR) * w.h);
    var currG = Math.round(baseG + (255 - baseG) * w.h);
    var currB = Math.round(baseB + (255 - baseB) * w.h);
    ctx.fillStyle = 'rgb(' + currR + ',' + currG + ',' + currB + ')';
    
    // Crossfade shadow color (blue) to hover shadow (white)
    var shadR = 28 + (255 - 28) * w.h;
    var shadG = 183 + (255 - 183) * w.h;
    var shadB = 255;
    ctx.shadowColor = 'rgb(' + Math.round(shadR) + ',' + Math.round(shadG) + ',' + Math.round(shadB) + ')';
    ctx.shadowBlur = 14 * w.a + (6 * w.h);
  } else {
    ctx.shadowBlur = 0;
    ctx.fillStyle = '#121b2d';
  }
  
  ctx.fillText(w.t, w.x, drawY);
 }
 ctx.shadowBlur=0;
 
 // dotted headline
 var RR=150, RR2=RR*RR;
 for(var i=0;i<dots.length;i++){
  var p=dots[i], ex=p.x-m.x, ey=p.y-m.y, e2=ex*ex+ey*ey, px=p.x, py=p.y, r=p.r, c='#fff', al2=.92;
  if(m.on && e2 < RR2) {
    var k=1-Math.sqrt(e2)/RR;
    r*=1+k*.9;
    c=k>.35?'#ffffff':'#dddddd';
    al2=1;
    var e=Math.sqrt(e2)||1;
    px+=ex/e*k*5;
    py+=ey/e*k*5;
  }
  ctx.globalAlpha=al2;
  ctx.fillStyle=c;
  ctx.beginPath();
  ctx.arc(px,py,r,0,6.283);
  ctx.fill();
 }

 
 // Handle button click explosion
 if(m.click && m.x > btnRect.x && m.x < btnRect.x + btnRect.w && m.y > btnRect.y && m.y < btnRect.y + btnRect.h) {
   btnExploded = true;
   for(var i=0; i<btnDots.length; i++) {
     var angle = Math.random() * Math.PI * 2;
     var speed = Math.random() * 20 + 5;
     btnDots[i].vx = Math.cos(angle) * speed;
     btnDots[i].vy = Math.sin(angle) * speed;
     btnDots[i].a = 1;
   }
 }
 m.click = false;

 // render btnDots
 for(var i=0;i<btnDots.length;i++){

  
  var p=btnDots[i], c='#fff', al2=1, px=p.x, py=p.y, r=p.r;
  
  if(btnExploded) {
    p.x += p.vx;
    p.y += p.vy;
    p.vx *= 0.92; // friction
    p.vy *= 0.92;
    p.a -= 0.02; // fade out
    if(p.a < 0) p.a = 0;
    px = p.x;
    py = p.y;
    al2 = p.a;
  } else {
    var ex=p.x-m.x, ey=p.y-m.y, e2=ex*ex+ey*ey;
    if(m.on && e2 < RR2) {
      var k=1-Math.sqrt(e2)/RR;
      c=k>.35?'#ffffff':'#dddddd';
      var e=Math.sqrt(e2)||1;
      px+=ex/e*k*3;
      py+=ey/e*k*3;
    }
  }
  
  ctx.globalAlpha=al2;
  ctx.fillStyle=c;
  ctx.beginPath();
  ctx.arc(px,py,r,0,6.283);
  ctx.fill();

 }

 ctx.globalAlpha=1;
 requestAnimationFrame(frame);
}
function mv(e){var r=hero.getBoundingClientRect();m.tx=e.clientX-r.left;m.ty=e.clientY-r.top;if(!m.on){m.x=m.tx;m.y=m.ty}m.on=true}
hero.addEventListener('pointermove',mv);hero.addEventListener('pointerdown',function(e){ mv(e); m.click=true; });
hero.addEventListener('pointerleave',function(){m.on=false});
var rt;window.addEventListener('resize',function(){clearTimeout(rt);rt=setTimeout(build,150)});
(document.fonts&&document.fonts.ready?document.fonts.ready:Promise.resolve()).then(function(){build();requestAnimationFrame(frame)});
})();


// Cleaned up dead DOM logic

  }, []);

  return (
    <>
      


<div className="hero" id="hero">
<canvas id="c"></canvas>
<h1 className="sr">Defense Never Sleeps</h1>
<div className="txt"><p><BinaryText text="End-to-end cybersecurity protection for your business. We identify risks and neutralize evolving threats to keep your critical systems and data secured 24/7." /></p>
<a className="hbtn" id="hbtn" href="#" onClick={(e) => e.preventDefault()} style={{color: "transparent"}}>GET SECURED <span aria-hidden="true" style={{color: "#fff"}}>?</span></a></div>
</div>
  <BreachSection />
  <StickyPhases />
      <AlwaysOnGuardSection />
    </>

  );
}
