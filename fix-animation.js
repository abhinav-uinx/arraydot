const fs = require('fs');
let code = fs.readFileSync('src/app/page.tsx', 'utf8');

// 1. Stars generation
// change rnd(.3,1.3) to rnd(.1,.9), remove .b (blue star) logic entirely
code = code.replace(
  /for\(var i=0;i<ns;i\+\+\)stars\.push\(\{x:rnd\(0,W\),y:rnd\(0,H\),r:rnd\(\.3,1\.3\),p:rnd\(0,6\.28\),s:rnd\(\.4,1\.6\),b:Math\.random\(\)<\.06\}\);/,
  "for(var i=0;i<ns;i++)stars.push({x:rnd(0,W),y:rnd(0,H),r:rnd(.1,.9),p:rnd(0,6.28),s:rnd(.4,1.6)});"
);
code = code.replace(
  /Math\.round\(W\*H\/5500\)/,
  "Math.round(W*H/4000)"
);

// 2. Stars rendering
code = code.replace(
  /for\(var i=0;i<stars\.length;i\+\+\)\{var s=stars\[i\],a=\.35\+\.65\*Math\.abs\(Math\.sin\(t\*\.0006\*s\.s\+s\.p\)\);\s*ctx\.globalAlpha=a\*\(s\.b\?1:\.7\);ctx\.fillStyle=s\.b\?'#9fd4ff':'#fff';ctx\.beginPath\(\);ctx\.arc\(s\.x,s\.y,s\.r\*\(s\.b\?1\.5:1\),0,6\.283\);ctx\.fill\(\)\}/,
  "for(var i=0;i<stars.length;i++){var s=stars[i],a=.2+.8*Math.abs(Math.sin(t*.0004*s.s+s.p)); ctx.globalAlpha=a;ctx.fillStyle='#fff';ctx.beginPath();ctx.arc(s.x,s.y,s.r,0,6.283);ctx.fill()}"
);

// 3. Remove hidden words entirely (generation and rendering)
code = code.replace(
  /words=\[\];var cw=150,ch=54;\s*for\(var y=20;y<H;y\+=ch\)for\(var x=\(Math\.floor\(y\/ch\)%2\?-40:0\);x<W;x\+=cw\)\{\s*words\.push\(\{t:LIST\[Math\.floor\(Math\.random\(\)\*LIST\.length\)\],x:x\+rnd\(0,40\),y:y\+rnd\(0,20\),f:rnd\(11,16\),a:0\}\)\}/,
  ""
);

// Replace rendering of hidden words (multiline regex)
code = code.replace(
  /\/\/ hidden words that light up near cursor[\s\S]*?ctx\.shadowBlur=0;/,
  ""
);

// 4. Modify dotted headline rendering to not react to mouse
code = code.replace(
  /for\(i=0;i<dots\.length;i\+\+\)\{var p=dots\[i\],ex=p\.x-m\.x,ey=p\.y-m\.y,e2=ex\*ex\+ey\*ey,px=p\.x,py=p\.y,r=p\.r,c='#fff',al2=\.92;\s*if\(m\.on&&e2<RR2\)\{var k=1-Math\.sqrt\(e2\)\/RR;r\*=1\+k\*\.9;c=k>\.35\?'#7fdcff':'#cfeeff';al2=1;var e=Math\.sqrt\(e2\)\|\|1;px\+=ex\/e\*k\*5;py\+=ey\/e\*k\*5\}\s*ctx\.globalAlpha=al2;ctx\.fillStyle=c;ctx\.beginPath\(\);ctx\.arc\(px,py,r,0,6\.283\);ctx\.fill\(\)\}/,
  "for(i=0;i<dots.length;i++){var p=dots[i]; ctx.globalAlpha=.92;ctx.fillStyle='#fff';ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,6.283);ctx.fill()}"
);

// 5. Remove cursor glow
code = code.replace(
  /\/\/ cursor glow\s*if\(m\.on\)\{var gr=ctx\.createRadialGradient[\s\S]*?R\*2\}/,
  ""
);

fs.writeFileSync('src/app/page.tsx', code, 'utf8');
