/**
 * Header/Footer Loader
 * Injects shared header and footer into all pages
 * Automatically detects if it's a blog page or main site page and loads appropriate footer
 */

async function loadHeaderFooter() {
  const isBlogPage = window.location.pathname.includes('/blog/');
  const basePath = isBlogPage ? '../../' : '';
  const includesPath = basePath + 'includes/';
  
  try {
    // Load header (same for all pages)
    const headerRes = await fetch(includesPath + 'header.html');
    if (headerRes.ok) {
      const headerHtml = await headerRes.text();
      const headerEl = document.createElement('div');
      headerEl.innerHTML = headerHtml;
      document.body.insertBefore(headerEl.firstElementChild, document.body.firstChild);
    }
    
    // Load appropriate footer based on page type
    const footerFile = isBlogPage ? 'footer.html' : 'footer-main.html';
    const footerRes = await fetch(includesPath + footerFile);
    if (footerRes.ok) {
      const footerHtml = await footerRes.text();
      const footerEl = document.createElement('div');
      footerEl.innerHTML = footerHtml;
      document.body.appendChild(footerEl.firstElementChild);
    }
    
    // Reinitialize icons if lucide is loaded
    if (window.lucide) {
      lucide.createIcons();
    }
  } catch (error) {
    console.warn('Could not load header/footer:', error);
  }
}

// Load header/footer when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', loadHeaderFooter);
} else {
  loadHeaderFooter();
}
