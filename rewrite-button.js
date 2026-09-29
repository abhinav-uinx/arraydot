const fs = require('fs');
let code = fs.readFileSync('src/app/page.tsx', 'utf8');

// 1. Modify the HTML button
code = code.replace(
  /<a className="hbtn" href="#">Get Secured <span aria-hidden="true">?<\/span><\/a>/,
  '<a className="hbtn" id="hbtn" href="#" style={{color: "transparent"}}>GET SECURED <span aria-hidden="true" style={{color: "#fff"}}>?</span></a>'
);

// 2. Add globals
code = code.replace(
  /var W,H,dpr,stars=\[\],words=\[\],dots=\[\];/,
  'var W,H,dpr,stars=[],words=[],dots=[],btnDots=[],btnRect={x:-999,y:-999,w:0,h:0};'
);

// 3. Inject btnDots build logic at the end of build()
const buildEnd = code.indexOf('}\nfunction frame(t){');
if (buildEnd > -1) {
  const btnBuildLogic = `
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
`;
  code = code.substring(0, buildEnd) + btnBuildLogic + code.substring(buildEnd);
}

// 4. Inject btnRect intersection into words loop in frame()
const exactHoverLine = 'var isHovered = (m.on && m.x >= w.x - 5 && m.x <= w.x + tw + 5 && m.y >= w.y - w.f && m.y <= w.y + w.f);';
const intersectionLogic = `
  var intersectsBtn = (w.x < btnRect.x + btnRect.w && w.x + tw > btnRect.x && w.y - w.f < btnRect.y + btnRect.h && w.y + w.f > btnRect.y);
  if(intersectsBtn) {
      g = 0;
      w.a = 0;
      isHovered = false;
  }
`;
code = code.replace(exactHoverLine, exactHoverLine + '\n' + intersectionLogic);

// 5. Inject btnDots render loop at the end of frame()
const dotsLoopEnd = 'ctx.arc(px,py,r,0,6.283);\n  ctx.fill();\n }\n \n ctx.globalAlpha=1;';
const btnDotsLoop = `
 // render btnDots
 for(var i=0;i<btnDots.length;i++){
  var p=btnDots[i], ex=p.x-m.x, ey=p.y-m.y, e2=ex*ex+ey*ey, px=p.x, py=p.y, r=p.r, c='#fff', al2=1;
  if(m.on && e2 < RR2) {
    var k=1-Math.sqrt(e2)/RR;
    c=k>.35?'#ffffff':'#dddddd';
    var e=Math.sqrt(e2)||1;
    px+=ex/e*k*3;
    py+=ey/e*k*3;
  }
  ctx.globalAlpha=al2;
  ctx.fillStyle=c;
  ctx.beginPath();
  ctx.arc(px,py,r,0,6.283);
  ctx.fill();
 }
`;
code = code.replace(dotsLoopEnd, 'ctx.arc(px,py,r,0,6.283);\n  ctx.fill();\n }\n' + btnDotsLoop + '\n ctx.globalAlpha=1;');

fs.writeFileSync('src/app/page.tsx', code, 'utf8');
