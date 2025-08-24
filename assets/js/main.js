// Cache-bust version included in filename query

document.addEventListener('DOMContentLoaded', () => {
  // Theme toggle
  const body = document.body;
  const themeBtn = document.getElementById('themeToggle');
  if (localStorage.getItem('theme') === 'light') body.classList.add('light');
  themeBtn.onclick = () => {
    body.classList.toggle('light');
    localStorage.setItem('theme', body.classList.contains('light') ? 'light' : 'dark');
  };

  // Music toggle
  const musicBtn = document.getElementById('musicToggle');
  const bgAudio = new Audio('https://cdn.example.com/bgtrack.mp3');
  bgAudio.loop = true;
  bgAudio.volume = 0.2;
  bgAudio.muted = true;
  bgAudio.play();
  musicBtn.onclick = () => {
    bgAudio.muted = !bgAudio.muted;
    musicBtn.textContent = bgAudio.muted ? '♪' : '♫';
  };

  // Dropdown
  const dd = document.querySelector('.dropdown');
  const servicesBtn = document.getElementById('servicesBtn');
  servicesBtn.onclick = e => {
    e.stopPropagation();
    dd.classList.toggle('open');
  };
  document.body.addEventListener('click', () => dd.classList.remove('open'));

  // Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.onclick = e => {
      e.preventDefault();
      document.querySelector(link.getAttribute('href'))
        .scrollIntoView({ behavior:'smooth' });
    };
  });

  // Scroll arrows
  document.getElementById('scrollTop').onclick = () =>
    window.scrollTo({ top:0, behavior:'smooth' });
  document.getElementById('scrollBottom').onclick = () =>
    window.scrollTo({ top: document.body.scrollHeight, behavior:'smooth' });

  // Contact CAPTCHA
  const form = document.getElementById('contactForm');
  if (form) {
    const n1 = Math.floor(Math.random()*10);
    const n2 = Math.floor(Math.random()*10);
    document.getElementById('num1').textContent = n1;
    document.getElementById('num2').textContent = n2;
    form.onsubmit = e => {
      const answer = +document.getElementById('captchaAnswer').value;
      if (answer !== n1 + n2) {
        e.preventDefault();
        alert('Incorrect captcha answer.');
      }
    };
  }
});
