/* ══════════════════════════════════════════════════
   pricing.js — Beaverly / Chilla Pricing Page
   Nav is handled by header-loader.js — not here.
   Handles: billing toggle · scroll reveals · FAQ accordion · capacity meter
   ══════════════════════════════════════════════════ */

'use strict';

document.addEventListener('DOMContentLoaded', () => {

  // ─── Lucide Icons ─────────────────────────────
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // ─── Billing Toggle ───────────────────────────
  // Yearly shows the full annual price (e.g. $200/yr) not a monthly equiv.
  // Data lives in data-attributes on the .js-price span:
  //   data-monthly-amount / data-monthly-period / data-monthly-cadence
  //   data-yearly-amount  / data-yearly-period  / data-yearly-cadence

  const toggleMonthly = document.getElementById('toggle-monthly');
  const toggleYearly  = document.getElementById('toggle-yearly');
  const billingToggle = document.querySelector('.billing-toggle');

  let currentBilling = 'monthly';

  function setBilling(mode) {
    if (mode === currentBilling) return;
    currentBilling = mode;

    // Update button states
    [toggleMonthly, toggleYearly].forEach(btn => {
      const isActive = btn.id === `toggle-${mode}`;
      btn.classList.toggle('active', isActive);
      btn.setAttribute('aria-pressed', String(isActive));
    });

    // Slide the pill indicator
    if (billingToggle) {
      billingToggle.setAttribute('data-active', mode);
    }

    // Update each switchable card
    document.querySelectorAll('.js-price').forEach(priceEl => {
      const amount  = priceEl.getAttribute(`data-${mode}-amount`);
      const period  = priceEl.getAttribute(`data-${mode}-period`);
      const cadence = priceEl.getAttribute(`data-${mode}-cadence`);

      if (!amount) return; // skip static cards (Architect, Enterprise)

      const periodEl  = priceEl.nextElementSibling; // .js-period
      const cadenceEl = priceEl.closest('.plan-price-block').querySelector('.js-cadence');

      // Fade transition
      [priceEl, periodEl, cadenceEl].forEach(el => {
        if (!el) return;
        el.style.transition = 'opacity 0.15s ease, transform 0.15s ease';
        el.style.opacity    = '0';
        el.style.transform  = 'translateY(5px)';
      });

      setTimeout(() => {
        priceEl.textContent  = amount;
        if (periodEl)  periodEl.textContent  = period;
        if (cadenceEl) cadenceEl.textContent = cadence;

        [priceEl, periodEl, cadenceEl].forEach(el => {
          if (!el) return;
          el.style.opacity   = '1';
          el.style.transform = 'translateY(0)';
        });
      }, 160);
    });
  }

  if (toggleMonthly) toggleMonthly.addEventListener('click', () => setBilling('monthly'));
  if (toggleYearly)  toggleYearly.addEventListener('click',  () => setBilling('yearly'));

  // ─── Scroll Reveal ────────────────────────────
  const revealEls = document.querySelectorAll('.reveal-fade, .reveal-up');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    revealEls.forEach(el => observer.observe(el));
  } else {
    // Reduced-motion / old browser fallback
    revealEls.forEach(el => el.classList.add('in-view'));
  }

  // ─── FAQ Accordion ────────────────────────────
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const expanded  = btn.getAttribute('aria-expanded') === 'true';
      const answerId  = btn.getAttribute('aria-controls');
      const answerEl  = document.getElementById(answerId);
      if (!answerEl) return;

      if (expanded) {
        btn.setAttribute('aria-expanded', 'false');
        collapsePanel(answerEl);
      } else {
        btn.setAttribute('aria-expanded', 'true');
        expandPanel(answerEl);
      }
    });

    btn.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); btn.click(); }
    });
  });

  function expandPanel(el) {
    el.removeAttribute('hidden');
    el.style.height   = '0';
    el.style.overflow = 'hidden';
    el.style.transition = 'height 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    requestAnimationFrame(() => { el.style.height = el.scrollHeight + 'px'; });
    el.addEventListener('transitionend', () => {
      el.style.height = '';
      el.style.overflow = '';
    }, { once: true });
  }

  function collapsePanel(el) {
    el.style.height   = el.scrollHeight + 'px';
    el.style.overflow = 'hidden';
    el.style.transition = 'height 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    requestAnimationFrame(() => { el.style.height = '0'; });
    el.addEventListener('transitionend', () => {
      el.setAttribute('hidden', '');
      el.style.height = '';
      el.style.overflow = '';
    }, { once: true });
  }

  // ─── Capacity meter animation ─────────────────
  const meterFill  = document.querySelector('.capacity-meter-fill');
  const meterTrack = document.querySelector('.capacity-meter-track');

  if (meterFill && meterTrack && 'IntersectionObserver' in window) {
    const meterObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setTimeout(() => { meterFill.style.width = '34%'; }, 400);
            meterObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );
    meterObserver.observe(meterTrack);
  }

  // ─── Smooth scroll for #anchor links ─────────
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      // Account for the floating navbar height (64px + 20px top offset)
      const navOffset = 96;
      const top = target.getBoundingClientRect().top + window.scrollY - navOffset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

});