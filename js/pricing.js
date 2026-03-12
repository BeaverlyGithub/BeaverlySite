/* ══════════════════════════════════════════════════
   pricing.js — Beaverly / Chilla Pricing Page
   Handles: billing toggle · scroll reveals · FAQ · footer year
   ══════════════════════════════════════════════════ */

'use strict';

document.addEventListener('DOMContentLoaded', () => {

  // ─── Lucide Icons ────────────────────────────────
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // ─── Footer Year ─────────────────────────────────
  const yearEl = document.getElementById('footer-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ─── Mobile Nav Toggle ───────────────────────────
  const mobileToggle = document.getElementById('mobile-toggle');
  const navLinks = document.getElementById('nav-links');

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('active');
      mobileToggle.setAttribute('aria-expanded', String(isOpen));
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!mobileToggle.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove('active');
        mobileToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // ─── Billing Toggle ──────────────────────────────
  const toggleMonthly = document.getElementById('toggle-monthly');
  const toggleYearly = document.getElementById('toggle-yearly');
  const billingToggle = document.querySelector('.billing-toggle');

  let currentBilling = 'monthly';

  function setBilling(mode) {
    currentBilling = mode;

    // Update toggle button states
    toggleMonthly.classList.toggle('active', mode === 'monthly');
    toggleYearly.classList.toggle('active', mode === 'yearly');
    toggleMonthly.setAttribute('aria-pressed', String(mode === 'monthly'));
    toggleYearly.setAttribute('aria-pressed', String(mode === 'yearly'));

    // Slide the indicator
    if (billingToggle) {
      billingToggle.setAttribute('data-active', mode);
    }

    // Update all price amounts
    document.querySelectorAll('.price-amount[data-monthly]').forEach(el => {
      const monthly = el.getAttribute('data-monthly');
      const yearly = el.getAttribute('data-yearly');
      const newVal = mode === 'monthly' ? monthly : yearly;

      // Animate the number change
      el.style.opacity = '0';
      el.style.transform = 'translateY(6px)';
      setTimeout(() => {
        el.textContent = newVal;
        el.style.transition = 'opacity 0.2s ease, transform 0.2s ease';
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }, 150);
    });

    // Update cadence text
    document.querySelectorAll('.price-cadence[data-monthly]').forEach(el => {
      const monthly = el.getAttribute('data-monthly');
      const yearly = el.getAttribute('data-yearly');
      el.style.opacity = '0';
      setTimeout(() => {
        el.textContent = mode === 'monthly' ? monthly : yearly;
        el.style.transition = 'opacity 0.2s ease';
        el.style.opacity = '1';
      }, 150);
    });
  }

  if (toggleMonthly) {
    toggleMonthly.addEventListener('click', () => setBilling('monthly'));
  }
  if (toggleYearly) {
    toggleYearly.addEventListener('click', () => setBilling('yearly'));
  }

  // ─── Scroll Reveal (IntersectionObserver) ────────
  const revealEls = document.querySelectorAll('.reveal-fade, .reveal-up');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
      }
    );

    revealEls.forEach(el => revealObserver.observe(el));
  } else {
    // Fallback: show everything immediately
    revealEls.forEach(el => el.classList.add('in-view'));
  }

  // ─── FAQ Accordion ───────────────────────────────
  const faqQuestions = document.querySelectorAll('.faq-question');

  faqQuestions.forEach(btn => {
    btn.addEventListener('click', () => {
      const isExpanded = btn.getAttribute('aria-expanded') === 'true';
      const answerId = btn.getAttribute('aria-controls');
      const answerEl = document.getElementById(answerId);

      if (!answerEl) return;

      if (isExpanded) {
        // Close
        btn.setAttribute('aria-expanded', 'false');
        collapsePanel(answerEl);
      } else {
        // Open this one
        btn.setAttribute('aria-expanded', 'true');
        expandPanel(answerEl);
      }
    });

    // Keyboard accessibility
    btn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        btn.click();
      }
    });
  });

  function expandPanel(el) {
    el.removeAttribute('hidden');
    el.style.height = '0';
    el.style.overflow = 'hidden';
    el.style.transition = 'height 0.3s cubic-bezier(0.4, 0, 0.2, 1)';

    requestAnimationFrame(() => {
      el.style.height = el.scrollHeight + 'px';
    });

    el.addEventListener('transitionend', () => {
      el.style.height = '';
      el.style.overflow = '';
    }, { once: true });
  }

  function collapsePanel(el) {
    el.style.height = el.scrollHeight + 'px';
    el.style.overflow = 'hidden';
    el.style.transition = 'height 0.3s cubic-bezier(0.4, 0, 0.2, 1)';

    requestAnimationFrame(() => {
      el.style.height = '0';
    });

    el.addEventListener('transitionend', () => {
      el.setAttribute('hidden', '');
      el.style.height = '';
      el.style.overflow = '';
    }, { once: true });
  }

  // ─── Capacity meter animation ─────────────────────
  // Animate the meter fill when it scrolls into view
  const meterFill = document.querySelector('.capacity-meter-fill');
  const meterTrack = document.querySelector('.capacity-meter-track');

  if (meterFill && meterTrack && 'IntersectionObserver' in window) {
    // Start with 0 width so animation triggers on scroll
    meterFill.style.width = '0';

    const meterObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              meterFill.style.width = '34%';
            }, 400);
            meterObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    meterObserver.observe(meterTrack);
  }

  // ─── Smooth scroll for anchor links ──────────────
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const navHeight = document.querySelector('.nav')?.offsetHeight || 80;
        const top = target.getBoundingClientRect().top + window.scrollY - navHeight - 24;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

});