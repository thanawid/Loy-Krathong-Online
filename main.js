
(function(){
  const area = document.getElementById('floatArea');
  const btn = document.getElementById('floatBtn');
  const wishText = document.getElementById('wishText');
  let ktype = 'krathong1';

  // Button choices (image-only)
  document.querySelectorAll('.kbtn').forEach(b=>{
    b.addEventListener('click', ()=>{
      document.querySelectorAll('.kbtn').forEach(x=>x.classList.remove('active'));
      b.classList.add('active');
      ktype = b.dataset.type || 'krathong1';
    });
  });

  function addWish(text){
    const arr = JSON.parse(localStorage.getItem('wishes')||'[]');
    arr.push({text, time: Date.now(), type: ktype});
    localStorage.setItem('wishes', JSON.stringify(arr));
  }

  function spawn(){
    const river = document.getElementById('river');

    const el = document.createElement('div');
    el.className = 'krathong';

    const src = `assets/${ktype}.png`;
    const img = document.createElement('img');
    img.src = src; img.alt = 'กระทง';

    const refl = document.createElement('img');
    refl.className = 'reflection';
    refl.src = src;

    el.appendChild(img);
    el.appendChild(refl);
    area.appendChild(el);

    function position(){
      const H = river.clientHeight;
      const kh = img.naturalHeight || img.height || 84;
      const wl = parseFloat(getComputedStyle(document.documentElement)
        .getPropertyValue('--waterline')) || 0.62;
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

  if(btn){
    btn.addEventListener('click', ()=>{
      const text = (wishText.value || '').trim(); // allow empty
      addWish(text); spawn(); wishText.value='';
    });
  }

  // Save image
  const btnSave = document.getElementById('saveImageBtn');
  const river = document.getElementById('river');
  if(btnSave && window.html2canvas){
    btnSave.addEventListener('click', async ()=>{
      btnSave.disabled = true;
      try{
        const canvas = await html2canvas(river, { useCORS:true, backgroundColor: null, scale:2 });
        const a = document.createElement('a');
        a.download = 'loy-krathong.png';
        a.href = canvas.toDataURL('image/png');
        a.click();
      }catch(e){ alert('ไม่สามารถบันทึกรูปได้'); }
      btnSave.disabled = false;
    });
  }
})();
