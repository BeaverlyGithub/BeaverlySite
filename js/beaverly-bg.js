/**
 * Beaverly — Calm Background Parallax
 * Drives a subtle scroll-reactive shift on .bv-dark-bg sections.
 * Very light — no RAF loops unless user is actually scrolling.
 */

(function () {
  'use strict';

  const SECTIONS = document.querySelectorAll('.bv-dark-bg');
  if (!SECTIONS.length) return;

  // Respect reduced-motion preference
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) return;

  let ticking = false;

  function update() {
    const scrollY = window.scrollY;

    SECTIONS.forEach(section => {
      const rect = section.getBoundingClientRect();
      const vh   = window.innerHeight;

      // Only animate sections near the viewport
      if (rect.bottom < -vh || rect.top > 2 * vh) return;

      // Progress through section: 0 (entering) → 1 (leaving)
      const progress = -rect.top / (rect.height + vh);

      // Gentle Y shift: ±18px over full scroll through section
      const shiftY = (progress - 0.5) * -36;
      // Very subtle X wobble driven by scroll velocity proxy
      const shiftX = Math.sin(progress * Math.PI) * -8;

      section.style.setProperty('--bv-py', `${shiftY.toFixed(2)}px`);
      section.style.setProperty('--bv-px', `${shiftX.toFixed(2)}px`);
      section.classList.add('bv-parallax-active');
    });

    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(update);
      ticking = true;
    }
  }, { passive: true });

  // Run once on load
  update();
})();