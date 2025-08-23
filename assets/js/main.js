
// theme toggle
const themeBtn = document.querySelector('#themeToggle');
function setTheme(t){ document.body.classList.toggle('light', t==='light'); localStorage.setItem('tbc-theme', t) }
const stored = localStorage.getItem('tbc-theme') || 'dark'; setTheme(stored);
themeBtn?.addEventListener('click', ()=> setTheme(document.body.classList.contains('light')?'dark':'light'));

// music
const audio = new Audio('https://cdn.pixabay.com/download/audio/2023/02/28/audio_26c0b1f01a.mp3?filename=ambient-141125.mp3');
audio.loop = true; audio.volume = 0.5; audio.muted = true; audio.play().catch(()=>{});
const musicBtn = document.querySelector('#musicToggle');
musicBtn?.addEventListener('click', ()=> { audio.muted = !audio.muted; musicBtn.innerText = audio.muted ? '🔇' : '🎵'; });

// dropdown (services)
const dd = document.querySelector('#servicesDD');
const ddmenu = document.querySelector('#servicesMenu');
dd?.addEventListener('click', (e)=>{ e.stopPropagation(); ddmenu.classList.toggle('open'); });
document.addEventListener('click', ()=> ddmenu?.classList.remove('open'));

// lightbox
const lb = document.querySelector('#lightbox');
const lbimg = document.querySelector('#lightbox img');
document.querySelectorAll('[data-lightbox]').forEach(el=>{
  el.addEventListener('click', ()=>{ lbimg.src = el.getAttribute('data-lightbox'); lb.style.display='flex'; });
});
lb?.addEventListener('click', ()=> lb.style.display='none');

// scroll arrows
const toTop = document.querySelector('#toTop');
const toBottom = document.querySelector('#toBottom');
toTop?.addEventListener('click', ()=> window.scrollTo({top:0, behavior:'smooth'}));
toBottom?.addEventListener('click', ()=> window.scrollTo({top:document.body.scrollHeight, behavior:'smooth'}));
