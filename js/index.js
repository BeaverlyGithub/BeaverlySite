/* =============================================
   PAGE INIT
   ============================================= */
document.addEventListener('DOMContentLoaded', () => {

  // Lucide
  if (window.lucide) lucide.createIcons();

  // Hero entrance
  requestAnimationFrame(() => setTimeout(() => {
    const h = document.getElementById('heroEl');
    if (h) h.classList.add('in');
  }, 100));

  // Scroll cue
  const sc = document.getElementById('heroScroll');
  if (sc) sc.addEventListener('click', () => {
    const t = document.getElementById('interactive-flow-demo');
    if (t) t.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  // Scroll reveal
  const ro = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); ro.unobserve(e.target); } });
  }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });
  document.querySelectorAll('.reveal').forEach(el => ro.observe(el));

  // FAQ icons
  document.querySelectorAll('.hp-faq-item').forEach(item => {
    item.addEventListener('toggle', () => { if (window.lucide) lucide.createIcons(); });
  });

  // Navbar smart hide
  let lastY = 0;
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    const nav = document.querySelector('.nav');
    if (nav) {
      nav.style.transform = (y > lastY && y > 80) ? 'translateY(-100%)' : 'translateY(0)';
      nav.style.transition = 'transform .28s ease';
    }
    lastY = y;
  }, { passive: true });

  // Homepage demo
  initDemo();
});

/* =============================================
   HOMEPAGE DEMO
   ============================================= */
function initDemo() {
  const STEPS = 6;
  let step = 1, connected = false, behavior = null, consented = false, fTimer = null;

  const nextBtn  = document.getElementById('demoNextBtn');
  const footEl   = document.getElementById('demoFoot');
  const rstFoot  = document.getElementById('demoRstFoot');
  const rstHead  = document.getElementById('demoRstHeader');

  function go(n) {
    step = n;
    document.querySelectorAll('.demo-card').forEach(c => c.classList.remove('active'));
    const card = document.getElementById('dc-step-' + n);
    if (card) card.classList.add('active');
    syncProgress();
    syncNext();
    if (n === STEPS) {
      footEl.style.display = 'none';
      startFlow();
    } else {
      footEl.style.display = 'flex';
      if (rstFoot) rstFoot.style.visibility = n > 1 ? 'visible' : 'hidden';
    }
    if (window.lucide) lucide.createIcons();
  }

  function syncProgress() {
    document.querySelectorAll('#demoProgressRail .demo-prog-seg').forEach((s, i) => {
      s.classList.remove('done', 'active');
      if (i + 1 < step) s.classList.add('done');
      else if (i + 1 === step) s.classList.add('active');
    });
  }

  function syncNext() {
    if (!nextBtn) return;
    const ok = { 1: connected, 2: !!behavior, 3: true, 4: true, 5: consented };
    nextBtn.disabled = !ok[step];
    nextBtn.textContent = step === 5 ? 'Activate' : 'Continue';
  }

  document.addEventListener('click', e => {
    // Connect
    if (e.target.id === 'dcConnectBtn') {
      const b = e.target; b.textContent = 'Connecting…'; b.disabled = true;
      setTimeout(() => {
        connected = true;
        const s = document.getElementById('dcBrokerS');
        if (s) { s.textContent = 'Connected ✓'; s.classList.add('ok'); }
        const badge = document.createElement('div');
        badge.className = 'dc-connected-badge';
        badge.innerHTML = '<span class="gdot"></span>Environment ready';
        b.replaceWith(badge);
        syncNext();
      }, 1100);
      return;
    }

    // Next
    if (e.target.id === 'demoNextBtn' && !e.target.disabled) { if (step < STEPS) go(step + 1); return; }

    // Behavior
    const bhv = e.target.closest('.dc-bhv');
    if (bhv) { document.querySelectorAll('.dc-bhv').forEach(x => x.classList.remove('sel')); bhv.classList.add('sel'); behavior = bhv.dataset.bhv; syncNext(); return; }

    // Playground
    const pg = e.target.closest('.dc-pg');
    if (pg) { pg.classList.toggle('sel'); const c = pg.querySelector('.dc-pg-chk'); if (c) c.textContent = pg.classList.contains('sel') ? '✓' : ''; return; }

    // Consent
    if (e.target.closest('#dcConsentBox')) {
      consented = !consented;
      const b = document.getElementById('dcConsentBox');
      if (b) { b.classList.toggle('checked'); b.textContent = consented ? '✓' : ''; }
      syncNext(); return;
    }

    // Restart
    if (e.target.id === 'demoRstHeader' || e.target.id === 'demoRstFoot') { restart(); }
  });

  document.addEventListener('input', e => {
    if (e.target.id !== 'dcComfortSlider') return;
    const v = parseInt(e.target.value);
    const val = document.getElementById('dcComfortVal'), sub = document.getElementById('dcComfortSub');
    if (!val || !sub) return;
    if (v <= 30) { val.textContent = 'Deep Sleep'; sub.textContent = 'Minimal exposure'; }
    else if (v >= 70) { val.textContent = 'No Sleep'; sub.textContent = 'Higher exposure'; }
    else { val.textContent = 'Balanced'; sub.textContent = 'Moderate exposure'; }
  });

  function startFlow() {
    const el = document.getElementById('dcFlowList'); if (!el) return; el.innerHTML = '';
    const events = [
      { t:'ok',   i:'check',  tx:'Instruction accepted',       mx:'Authorization verified — scope locked' },
      { t:'info', i:'bolt',   tx:'Behavior initialized',       mx:'Momentum Follow active on EURUSD, XAUUSD' },
      { t:'info', i:'globe',  tx:'Market observation started', mx:'Evaluating conditions…' },
      { t:'mon',  i:'eye',    tx:'Conditions evaluated',       mx:'No action yet — waiting for clarity' },
      { t:'ok',   i:'check',  tx:'Conditions matched',         mx:'Integrity & risk checks passed' },
      { t:'ok',   i:'target', tx:'Position opened',            mx:'EURUSD — within comfort and risk bounds' },
      { t:'mon',  i:'eye',    tx:'Monitoring position',        mx:'Active lifecycle observation' },
      { t:'ok',   i:'check',  tx:'Position closed',            mx:'Exit conditions met — lifecycle complete' },
      { t:'info', i:'pause',  tx:'Awaiting next opportunity',  mx:'Instruction remains active' },
    ];
    let i = 0;
    (function tick() {
      if (i >= events.length) return;
      const ev = events[i++];
      const d = document.createElement('div'); d.className = 'dc-flow-msg';
      d.innerHTML = `<div class="dc-fdot ${ev.t}">${ico(ev.i)}</div><div><div class="dc-ftext">${ev.tx}</div><div class="dc-fmeta">${ev.mx}</div></div>`;
      el.appendChild(d); el.scrollTop = el.scrollHeight;
      fTimer = setTimeout(tick, 1150);
    })();
  }

  function ico(n) {
    const m = {
      check:  `<svg width="10" height="10" viewBox="0 0 24 24" fill="none"><path d="M20 6L9 17l-5-5" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
      bolt:   `<svg width="10" height="10" viewBox="0 0 24 24" fill="none"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
      globe:  `<svg width="10" height="10" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.5"/><path d="M2 12h20M12 2c2 4 2 6 2 10s0 6-2 10" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/></svg>`,
      eye:    `<svg width="10" height="10" viewBox="0 0 24 24" fill="none"><path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="1.5"/></svg>`,
      target: `<svg width="10" height="10" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="8" stroke="currentColor" stroke-width="1.5"/><circle cx="12" cy="12" r="4" stroke="currentColor" stroke-width="1.5"/><circle cx="12" cy="12" r="1.5" fill="currentColor"/></svg>`,
      pause:  `<svg width="10" height="10" viewBox="0 0 24 24" fill="none"><rect x="6" y="5" width="3" height="14" fill="currentColor"/><rect x="15" y="5" width="3" height="14" fill="currentColor"/></svg>`,
    };
    return m[n] || '';
  }

  function restart() {
    if (fTimer) clearTimeout(fTimer);
    connected = false; behavior = null; consented = false;
    const s = document.getElementById('dcBrokerS'); if (s) { s.textContent = 'Not connected'; s.classList.remove('ok'); }
    const badge = document.querySelector('#dc-step-1 .dc-connected-badge');
    if (badge) { const b = document.createElement('button'); b.className = 'dc-connect-btn'; b.id = 'dcConnectBtn'; b.textContent = 'Connect'; badge.replaceWith(b); }
    document.querySelectorAll('.dc-bhv').forEach(x => x.classList.remove('sel'));
    document.querySelectorAll('.dc-pg').forEach(p => { p.classList.remove('sel'); const c = p.querySelector('.dc-pg-chk'); if (c) c.textContent = ''; });
    ['EURUSD','XAUUSD'].forEach(pg => { const el = document.querySelector(`.dc-pg[data-pg="${pg}"]`); if (el) { el.classList.add('sel'); const c = el.querySelector('.dc-pg-chk'); if (c) c.textContent = '✓'; } });
    const sl = document.getElementById('dcComfortSlider'); if (sl) sl.value = 50;
    const cv = document.getElementById('dcComfortVal'); if (cv) cv.textContent = 'Balanced';
    const cs = document.getElementById('dcComfortSub'); if (cs) cs.textContent = 'Moderate exposure';
    const cb = document.getElementById('dcConsentBox'); if (cb) { cb.classList.remove('checked'); cb.textContent = ''; }
    const fl = document.getElementById('dcFlowList'); if (fl) fl.innerHTML = '';
    footEl.style.display = 'flex'; if (rstFoot) rstFoot.style.visibility = 'hidden';
    go(1);
  }

  go(1);
}
