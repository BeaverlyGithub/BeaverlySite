/**
 * Footer Loader
 * Injects main site footer into pages with placeholder comment
 */

async function loadFooter() {
  const candidates = [
    '/includes/footer-main.html',
    'includes/footer-main.html',
    '../includes/footer-main.html',
    '../../includes/footer-main.html',
  ];

  try {
    let footerHtml = '';

    for (const path of candidates) {
      try {
        const footerRes = await fetch(path);
        if (footerRes.ok) {
          footerHtml = await footerRes.text();
          break;
        }
      } catch (err) {
        // Try next candidate path.
      }
    }

    if (!footerHtml) return;

    const placeholder = document.querySelector('footer') ||
                       Array.from(document.querySelectorAll('*')).find(el =>
                         el.textContent.includes('Footer will be injected')
                       );

    if (placeholder) {
      placeholder.innerHTML = footerHtml;
    } else {
      const footerEl = document.createElement('div');
      footerEl.innerHTML = footerHtml;
      document.body.appendChild(footerEl.firstElementChild);
    }

    // Re-render Lucide icons if available
    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }
  } catch (err) {
    console.error('Error loading footer:', err);
  }
}

// Load when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', loadFooter);
} else {
  loadFooter();
}
