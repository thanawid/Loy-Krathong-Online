
(function(){
  const area = document.getElementById('floatArea');
  const btn = document.getElementById('floatBtn');
  const wishText = document.getElementById('wishText');
  let ktype = 'krathong1';

  document.querySelectorAll('.kbtn').forEach(b=>{
    b.addEventListener('click', ()=>{
      document.querySelectorAll('.kbtn').forEach(x=>x.classList.remove('active'));
      b.classList.add('active'); ktype = b.dataset.type;
    });
  });
  const first=document.querySelector('.kbtn'); if(first) first.classList.add('active');

  function addWish(text){
    const arr = JSON.parse(localStorage.getItem('wishes')||'[]');
    arr.push({text, time: Date.now(), type: ktype});
    localStorage.setItem('wishes', JSON.stringify(arr));
  }

  function spawn(){
    const river = document.getElementById('river');

    const el = document.createElement('div');
    el.className = 'krathong';

    const img = document.createElement('img');
    img.src = `assets/${ktype}.png`;
    img.alt = 'กระทง';

    const refl = document.createElement('img');
    refl.className = 'reflection';
    refl.src = `assets/${ktype}.png`;

    el.appendChild(img);
    el.appendChild(refl);
    area.appendChild(el);

    img.onload = () => {
      const H = river.clientHeight;
      const kh = img.naturalHeight || img.height;
      const wl = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--waterline')) || 0.62;
      const waterline = H * wl;
      const bobOffset = kh * 0.55;
      const jitter = (H * 0.06) * (Math.random() - 0.5);

      el.style.left = '-100px';
      el.style.top  = (waterline - bobOffset + jitter) + 'px';

      const total = area.clientWidth + 200;
      const speed = 35 + Math.random()*20;
      let x = -100;
      function step(){
        x += speed * 0.016;
        el.style.transform = `translateX(${x}px)`;
        if (x < total) requestAnimationFrame(step);
        else el.remove();
      }
      requestAnimationFrame(step);
    };
  }

  if(btn){
    btn.addEventListener('click', ()=>{
      const text = (wishText.value || '').trim();
      if(!text){ alert('กรุณาพิมพ์คำอธิษฐาน'); return; }
      addWish(text); spawn(); wishText.value='';
    });
  }

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