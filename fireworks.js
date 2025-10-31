
(function(){
  let c,ctx,run=false,ps=[],id,btn;
  function init(){ if(c) return;
    c=document.createElement('canvas'); ctx=c.getContext('2d'); resize(); addEventListener('resize', resize);
    Object.assign(c.style,{position:'fixed', inset:'0', width:'100vw', height:'100vh', zIndex:9999, pointerEvents:'none'});
    document.body.appendChild(c);
  }
  function resize(){ if(!c) return; c.width=innerWidth; c.height=innerHeight; }
  function launch(){ const x=Math.random()*c.width*0.9+c.width*0.05; const y=Math.random()*c.height*0.35+c.height*0.05; const hue=(Math.random()*360)|0, n=60+((Math.random()*30)|0); for(let i=0;i<n;i++){ const a=6.283*i/n, s=1.6+Math.random()*2.8; ps.push({x,y,vx:Math.cos(a)*s,vy:Math.sin(a)*s,life:60+Math.random()*25,h:hue}); } }
  function step(){ if(!run) return; ctx.clearRect(0,0,c.width,c.height); for(let i=ps.length-1;i>=0;i--){ const p=ps[i]; p.x+=p.vx; p.y+=p.vy; p.vy+=0.02; p.life--; const a=Math.max(0,p.life/80); ctx.globalCompositeOperation='lighter'; ctx.fillStyle=`hsla(${p.h},100%,60%,${a})`; ctx.beginPath(); ctx.arc(p.x,p.y,2,0,6.283); ctx.fill(); if(p.life<=0) ps.splice(i,1);} if(Math.random()<0.05) launch(); id=requestAnimationFrame(step); }
  function start(){ if(!run){ init(); run=true; step(); if(btn) btn.textContent='🎆'; } }
  function stop(){ run=false; if(id) cancelAnimationFrame(id); if(btn) btn.textContent='🎇'; }
  function toggle(){ run?stop():start(); }
  window.FW = {start, stop, toggle};
  btn=document.createElement('button'); btn.className='fx-toggle'; btn.type='button'; btn.textContent='🎇'; btn.title='เปิด/ปิดพลุ (กด F ก็ได้)'; btn.style.zIndex = 10000; btn.addEventListener('click', e=>{ e.stopPropagation(); toggle(); });
  document.addEventListener('DOMContentLoaded', ()=>{ document.body.appendChild(btn); const prefersReduce = matchMedia('(prefers-reduced-motion: reduce)').matches; if(!prefersReduce) start(); });
  addEventListener('keydown', e=>{ if(e.key.toLowerCase()==='f') toggle(); });
})();