
(function(){
  function applyTheme(){
    const h = new Date().getHours();
    let mode = 'night';
    if (h >= 18 && h <= 21) mode = 'evening';
    if (h >= 22 || h <= 1) mode = 'late';
    document.documentElement.setAttribute('data-time-theme', mode);
  }
  applyTheme();
  document.addEventListener('visibilitychange', ()=>{ if(!document.hidden) applyTheme(); });
})();