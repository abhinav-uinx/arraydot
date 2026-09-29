const fs = require('fs');
let code = fs.readFileSync('src/app/page.tsx', 'utf8');

const regex = /ctx\.textBaseline='middle';[\s\S]*?ctx\.fillText\(w\.t,w\.x,w\.y\)\s*\}/;

const newBlock = `ctx.textBaseline='middle';
   var R=210, R2=R*R;
   for(i=0;i<words.length;i++){
    var w=words[i], dx=w.x-m.x, dy=w.y-m.y, d2=dx*dx+dy*dy, g=0;
    
    // Proximity glow
    if(m.on && d2 < R2) {
        g = 1 - Math.sqrt(d2)/R;
        g = g*g*(3-2*g);
    }
    
    ctx.font='600 '+w.f+'px ui-monospace,Menlo,Consolas,monospace';
    var tw = ctx.measureText(w.t).width;
    var isHovered = false;
    
    // Exact hover
    if(m.on && m.x >= w.x - 5 && m.x <= w.x + tw + 5 && m.y >= w.y - w.f && m.y <= w.y + w.f) {
      g = 1.5; // push opacity slightly harder
      isHovered = true;
    }
    
    w.a+=(g-w.a)*.2;
    var al=.035+w.a*.95;
    ctx.globalAlpha=Math.min(al, 1);
    
    var drawY = w.y;
    
    if(w.a>.05){
      if(isHovered) {
        ctx.shadowColor='#ffffff';
        ctx.shadowBlur=20;
        ctx.fillStyle='#ffffff';
        drawY -= 2; // subtle lift effect
      } else {
        ctx.shadowColor='#1cb7ff';
        ctx.shadowBlur=14*Math.min(w.a, 1);
        ctx.fillStyle=w.a>.6?'#d9f3ff':'#3cc4ff';
      }
    } else {
      ctx.shadowBlur=0;
      ctx.fillStyle='#121b2d';
    }
    ctx.fillText(w.t,w.x,drawY)
   }`;

if(regex.test(code)) {
    code = code.replace(regex, newBlock);
    fs.writeFileSync('src/app/page.tsx', code, 'utf8');
    console.log("Success");
} else {
    console.log("Failed to match block.");
}
