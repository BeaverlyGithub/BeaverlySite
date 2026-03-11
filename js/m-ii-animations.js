// Init icons
if (window.lucide) lucide.createIcons();
else window.addEventListener('DOMContentLoaded', function() {
  if (window.lucide) lucide.createIcons();
});

// Hero entrance
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    const hero = document.getElementById('heroContent');
    if (hero) hero.classList.add('visible');
  }, 200);

  // Scroll cue
  const scrollCue = document.getElementById('scrollCue');
  if (scrollCue) {
    scrollCue.addEventListener('click', () => {
      const next = document.querySelector('.intro-section');
      if (next) next.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  // Animate on scroll
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));

  // Navbar scroll
  const navbar = document.querySelector('.nav');
  let lastY = 0;
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (navbar) {
      navbar.style.transform = (y > lastY && y > 100) ? 'translateY(-100%)' : 'translateY(0)';
      navbar.classList.toggle('scrolled', y > 50);
    }
    lastY = y;
  }, { passive: true });
});
