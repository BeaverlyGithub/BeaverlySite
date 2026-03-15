document.addEventListener('DOMContentLoaded', () => {
  const hero = document.getElementById('saHeroEl');
  if (hero) {
    requestAnimationFrame(() => hero.classList.add('in'));
  }

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.09 }
  );

  document.querySelectorAll('.reveal').forEach((element) => {
    revealObserver.observe(element);
  });

  if (window.lucide) {
    window.lucide.createIcons();
  }
});
