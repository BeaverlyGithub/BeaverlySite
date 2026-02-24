/**
 * header-loader.js
 * Fetches and injects includes/header.html as the first child of <body>.
 * Completely independent of footer-loader.js — does not touch it.
 */

(function () {
  'use strict';

  async function loadHeader() {
    const isBlogPage   = window.location.pathname.includes('/blog/');
    const basePath     = isBlogPage ? '../../' : '';
    const includesPath = basePath + 'includes/';

    try {
      const res = await fetch(includesPath + 'header.html');
      if (!res.ok) return;

      const html = await res.text();
      const frag = document.createRange().createContextualFragment(html);

      // Insert before the first element in <body>
      document.body.insertBefore(frag, document.body.firstChild);

      // Re-render Lucide icons if loaded
      if (window.lucide) {
        lucide.createIcons();
      }

    } catch (err) {
      console.warn('header-loader: could not load header.html', err);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadHeader);
  } else {
    loadHeader();
  }

})();