// Init Lucide icons
if (window.lucide) lucide.createIcons();
else window.addEventListener('DOMContentLoaded', () => {
  if (window.lucide) lucide.createIcons();
});

document.addEventListener('DOMContentLoaded', () => {

  // Hero entrance
  setTimeout(() => {
    const hero = document.getElementById('heroContent');
    if (hero) hero.classList.add('visible');
  }, 180);

  // Smooth scroll from hero CTA
  const scrollCue = document.getElementById('scrollCue');
  if (scrollCue) {
    scrollCue.addEventListener('click', () => {
      const target = document.getElementById('how-it-works');
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  // Smooth scroll for all anchor links
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Scroll-triggered animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));

  // Navbar hide/show on scroll
  const navbar = document.querySelector('.nav');
  let lastY = 0;
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (navbar) {
      navbar.style.transform = (y > lastY && y > 100) ? 'translateY(-100%)' : 'translateY(0)';
      navbar.style.transition = 'transform 0.3s ease';
      navbar.classList.toggle('scrolled', y > 50);
    }
    lastY = y;
  }, { passive: true });
});
