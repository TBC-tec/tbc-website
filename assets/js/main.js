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
    const updateThemeUI = (isLight)=>{
      toggle.classList.toggle('light', isLight);
      toggle.setAttribute('aria-pressed', isLight);
      toggle.setAttribute('aria-label', isLight ? 'Switch to dark mode' : 'Switch to light mode');
    };
    updateThemeUI(root.classList.contains('light'));
    toggle.addEventListener('click', ()=>{
      const isLight = root.classList.toggle('light');
      body.classList.toggle('light', isLight);
      localStorage.setItem('theme', isLight ? 'light' : 'dark');
      updateThemeUI(isLight);
    });
  }

  // Background music (muted until user interaction)
  const music = qs('#bgMusic');
  const musicBtn = qs('#musicToggle');
  let userInteracted = false;
  const updateMusicUI = ()=>{
    if(musicBtn){
      musicBtn.textContent = music.muted || music.paused ? '🔇' : '🎵';
    }
  };
  if(music){
    music.volume = 0.25;
    music.muted = true;
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
    window.addEventListener('pointerdown', ()=>{
      if(!userInteracted){
        userInteracted = true;
        updateMusicUI();
      }
    }, {once:true});
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
  if(lb){
    lb.addEventListener('click', ()=> lb.classList.remove('open'));
    document.addEventListener('keydown', e=>{
      if(e.key === 'Escape' && lb.classList.contains('open')){
        lb.classList.remove('open');
      }
    });
  }

  // Scroll arrows
  const toTop = qs('#toTop'), toBottom = qs('#toBottom');
  if(toTop){ toTop.addEventListener('click', ()=> window.scrollTo({top:0, behavior:'smooth'})); }
  if(toBottom){ toBottom.addEventListener('click', ()=> window.scrollTo({top:document.body.scrollHeight, behavior:'smooth'})); }

  // Simple CAPTCHA (contact page)
  const capQ = qs('#capQ'), capA = qs('#capA'), capErr = qs('#capErr'), form = qs('#contactForm');
  if(capQ && capA && form){
    const a = 2 + Math.floor(Math.random()*5), b = 3 + Math.floor(Math.random()*6);
    capQ.textContent = `${a} + ${b} = ?`;
    const honeypot = document.createElement('input');
    honeypot.type = 'text';
    honeypot.name = 'email_confirm';
    honeypot.style.display = 'none';
    form.appendChild(honeypot);
    form.addEventListener('submit', (e)=>{
      if(parseInt(capA.value,10)!==(a+b) || honeypot.value){
        e.preventDefault();
        capErr.textContent = 'Please solve the math question correctly.';
      }
    });
  }

  // Reveal on scroll
  const observer = new IntersectionObserver(entries=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        e.target.classList.add('in');
        observer.unobserve(e.target);
      }
    });
  }, {threshold:.1});
  qa('.reveal').forEach(el=>observer.observe(el));

  // Global error handler
  window.addEventListener('error', e=>{
    console.warn('Script error:', e.message);
  });
})();
