document.addEventListener('DOMContentLoaded', () => {
  // Track Pricing Tier Button Clicks
  const tierButtons = document.querySelectorAll('[data-tier]');
  tierButtons.forEach(button => {
    button.addEventListener('click', () => {
      const tier = button.getAttribute('data-tier');
      gtag('event', 'tier_click', {
        event_category: 'pricing',
        event_label: `Selected ${tier} Plan`
      });
    });
  });

  // Track Granular Button Clicks
  document.querySelectorAll('[data-track]').forEach(button => {
    button.addEventListener('click', () => {
      const label = button.getAttribute('data-track');
      gtag('event', 'cta_click', {
        event_category: 'navigation',
        event_label: label
      });
    });
  });
});

// Scroll Depth Tracking
window.addEventListener('scroll', () => {
  const scrolled = (window.scrollY + window.innerHeight) / document.body.scrollHeight;
  if (scrolled > 0.5 && !window._scrolledHalf) {
    gtag('event', 'scroll_halfway', {
      event_category: 'engagement',
      event_label: 'User Scrolled 50%'
    });
    window._scrolledHalf = true;
  }
});

// Time on site tracking (30s)
setTimeout(() => {
  gtag('event', 'time_on_site_30s', {
    event_category: 'engagement',
    event_label: 'Stayed 30s+'
  });
}, 30000);
