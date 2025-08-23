(function(){
  const qs = (s, el=document)=>el.querySelector(s);
  const qa = (s, el=document)=>[...el.querySelectorAll(s)];
  const root = document.documentElement;
  const body = document.body;

  // Theme toggle
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

  // Music toggle
  const music = qs('#bgMusic');
  const musicBtn = qs('#musicToggle');
  let user
