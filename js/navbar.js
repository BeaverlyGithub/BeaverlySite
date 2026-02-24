/**
 * navbar.js — Beaverly Floating Navbar Controller
 *
 * Responsibilities:
 *  - Detects scroll position → toggles .nav-scrolled (wordmark → logo swap)
 *  - Detects dark-background sections under the nav → toggles .nav-dark-ctx
 *  - Opens/closes the sidebar panel + overlay
 */

(function () {
  'use strict';

  const SCROLL_THRESHOLD = 60;

  // ── Selectors ──────────────────────────────────────────────
  const nav       = document.querySelector('.bvly-nav');
  const overlay   = document.querySelector('.bvly-sidebar-overlay');
  const sidebar   = document.querySelector('.bvly-sidebar');
  const openBtn   = document.querySelector('.bvly-nav__sidebar-btn');
  const closeBtn  = document.querySelector('.bvly-sidebar__close');

  if (!nav) return; // guard: header not yet injected

  // ── Scroll handler ─────────────────────────────────────────
  function onScroll() {
    const y = window.scrollY || window.pageYOffset;

    // Scrolled class (wordmark → logo)
    nav.classList.toggle('nav-scrolled', y > SCROLL_THRESHOLD);

    // Dark context: sample background colour at nav midpoint
    detectDarkContext();
  }

  /**
   * Inspects the element sitting directly below the nav centre.
   * If it has a dark background (or is the hero), applies nav-dark-ctx.
   */
  function detectDarkContext() {
    const navRect  = nav.getBoundingClientRect();
    const midX     = navRect.left + navRect.width / 2;
    const belowY   = navRect.bottom + 4; // just below nav

    // Temporarily hide nav so elementFromPoint skips it
    nav.style.pointerEvents = 'none';
    const el = document.elementFromPoint(midX, belowY);
    nav.style.pointerEvents = '';

    if (!el) {
      nav.classList.remove('nav-dark-ctx');
      return;
    }

    const bg = getComputedStyle(el).backgroundColor;
    const isDark = isBgDark(bg) || el.closest('[data-nav-dark]') !== null;
    nav.classList.toggle('nav-dark-ctx', isDark);
  }

  /**
   * Returns true if the CSS rgba() colour is perceived as dark.
   * Uses relative luminance heuristic (< 0.18).
   */
  function isBgDark(rgba) {
    if (!rgba || rgba === 'transparent' || rgba === 'rgba(0, 0, 0, 0)') return false;
    const m = rgba.match(/[\d.]+/g);
    if (!m || m.length < 3) return false;
    const [r, g, b, a = 1] = m.map(Number);
    if (a < 0.15) return false; // transparent enough → not dark
    // Perceived luminance
    const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return lum < 0.35;
  }

  // ── Sidebar open/close ─────────────────────────────────────
  function openSidebar() {
    sidebar?.classList.add('is-open');
    overlay?.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    openBtn?.setAttribute('aria-expanded', 'true');
  }

  function closeSidebar() {
    sidebar?.classList.remove('is-open');
    overlay?.classList.remove('is-open');
    document.body.style.overflow = '';
    openBtn?.setAttribute('aria-expanded', 'false');
  }

  // ── Event listeners ────────────────────────────────────────
  openBtn?.addEventListener('click',  openSidebar);
  closeBtn?.addEventListener('click', closeSidebar);
  overlay?.addEventListener('click',  closeSidebar);

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeSidebar();
  });

  // Scroll & resize
  window.addEventListener('scroll',  onScroll, { passive: true });
  window.addEventListener('resize',  onScroll, { passive: true });

  // Run once on load
  onScroll();

})();