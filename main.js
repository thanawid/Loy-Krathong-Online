
(function(){
  const area = document.getElementById('floatArea');
  const btn = document.getElementById('floatBtn');
  const wishText = document.getElementById('wishText');
  let ktype = 'krathong1';

  document.querySelectorAll('.kbtn').forEach(b=>{
    b.addEventListener('click', ()=>{
      document.querySelectorAll('.kbtn').forEach(x=>x.classList.remove('active'));
      b.classList.add('active'); ktype = b.dataset.type || 'krathong1';
    });
  });

  function addWish(text){
    const arr = JSON.parse(localStorage.getItem('wishes')||'[]');
    arr.push({text, time: Date.now(), type: ktype});
    localStorage.setItem('wishes', JSON.stringify(arr));
  }

  function preload(src){ return new Promise((res,rej)=>{ const im=new Image(); im.onload=()=>res(src); im.onerror=rej; im.src=src; }); }

  async function spawn(){
    const river = document.getElementById('river');
    let src = `assets/${ktype}.png`;
    try{ await preload(src); }catch(e){ src = 'assets/krathong1.png'; }

    const el = document.createElement('div'); el.className='krathong';
    const img = document.createElement('img'); img.src = src; img.alt='กระทง';
    const refl= document.createElement('img'); refl.className='reflection'; refl.src = src;
    el.appendChild(img); el.appendChild(refl); area.appendChild(el);

    function position(){
      const H = river.clientHeight;
      const kh = img.naturalHeight || img.height || 84;
      const wl = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--waterline')) || 0.62;
      const waterline = H * wl;
      const bobOffset = kh * 0.55;
      const jitter = (H * 0.06) * (Math.random() - 0.5);
      el.style.left = '-100px';
      el.style.top  = (waterline - bobOffset + jitter) + 'px';

      const total = area.clientWidth + 220;
      const speed = 36 + Math.random()*18;
      let x = -110;
      function step(){
        x += speed * 0.016;
        el.style.transform = `translateX(${x}px)`;
        if (x < total) requestAnimationFrame(step);
        else el.remove();
      }
      requestAnimationFrame(step);
    }
    if (img.complete) position(); else img.onload = position;
  }

  if (btn){
    btn.addEventListener('click', ()=>{
      const text = (wishText.value || '').trim();
      addWish(text);
      spawn();
      wishText.value='';
    });
  }
})();
