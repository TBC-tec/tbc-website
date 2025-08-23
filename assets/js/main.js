
(function(){
  const qs = (s, el=document)=>el.querySelector(s);
  const qa = (s, el=document)=>[...el.querySelectorAll(s)];
  const root = document.documentElement;
  const body = document.body;

  // Dark/Light toggle
  const saved = localStorage.getItem('theme');
  if(saved==='light'){ root.classList.add('light'); body.classList.add('light'); }
  const toggle = qs('#themeToggle');
  if(toggle){
    toggle.addEventListener('click', ()=>{
      const isLight = root.classList.toggle('light');
      body.classList.toggle('light', isLight);
      localStorage.setItem('theme', isLight ? 'light' : 'dark');
      toggle.classList.toggle('light', isLight);
    });
  }

  // Background music (muted until user interaction)
  const music = qs('#bgMusic');
  const musicBtn = qs('#musicToggle');
  let userInteracted = false;
  const updateMusicUI = ()=>{ if(musicBtn){ musicBtn.textContent = music.muted || music.paused ? '🔇' : '🎵'; } };
  if(music){
    music.volume = 0.25;
    music.muted = true; // required to start in most browsers
    // try to play muted in the background (no error if blocked)
    music.play().catch(()=>{});
    updateMusicUI();
    if(musicBtn){
      musicBtn.addEventListener('click', ()=>{
        userInteracted = true;
        if(music.paused){ music.play(); }
        music.muted = !music.muted;
        updateMusicUI();
      });
    }
    // Unmute after first user interaction (optional)
    window.addEventListener('pointerdown', ()=>{ if(!userInteracted){ userInteracted=true; updateMusicUI(); } }, {once:true});
  }

  // Lightbox
  const lb = qs('.lightbox');
  const lbImg = qs('.lightbox img');
  qa('[data-lightbox]').forEach(el=>{
    el.addEventListener('click', e=>{
      e.preventDefault();
      const src = el.getAttribute('href') || el.getAttribute('src');
      lbImg.src = src;
      lb.classList.add('open');
    });
  });
  if(lb){ lb.addEventListener('click', ()=> lb.classList.remove('open')); }

  // Scroll arrows
  const toTop = qs('#toTop'), toBottom = qs('#toBottom');
  if(toTop){ toTop.addEventListener('click', ()=> window.scrollTo({top:0, behavior:'smooth'})); }
  if(toBottom){ toBottom.addEventListener('click', ()=> window.scrollTo({top:document.body.scrollHeight, behavior:'smooth'})); }

  // Simple CAPTCHA (contact page)
  const capQ = qs('#capQ'), capA = qs('#capA'), capErr = qs('#capErr'), form = qs('#contactForm');
  if(capQ && capA && form){
    const a = 2 + Math.floor(Math.random()*5), b = 3 + Math.floor(Math.random()*6);
    capQ.textContent = `${a} + ${b} = ?`;
    form.addEventListener('submit', (e)=>{
      if(parseInt(capA.value,10)!==(a+b)){
        e.preventDefault();
        capErr.textContent = 'Please solve the math question correctly.';
      }
    });
  }

  // Reveal on scroll
  const observer = new IntersectionObserver(entries=>{
    entries.forEach(e=>{ if(e.isIntersecting) e.target.classList.add('in'); });
  }, {threshold:.1});
  qa('.reveal').forEach(el=>observer.observe(el));
})();
