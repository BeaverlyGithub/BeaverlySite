
// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Add scroll effect to navigation
window.addEventListener('scroll', function() {
  const nav = document.querySelector('.nav');
  if (window.scrollY > 100) {
    nav.style.background = 'rgba(255, 255, 255, 0.98)';
    nav.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
  } else {
    nav.style.background = 'rgba(255, 255, 255, 0.95)';
    nav.style.boxShadow = 'none';
  }
});

// Add animation on scroll for elements
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
  const animatedElements = document.querySelectorAll('.feature-card, .pricing-card, .testimonial, .faq-item, .why-item');
  
  animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
});

// Add mobile menu functionality if needed
const createMobileMenu = () => {
  const navLinks = document.querySelector('.nav-links');
  const navContainer = document.querySelector('.nav-container');
  
  if (window.innerWidth <= 768) {
    if (!document.querySelector('.mobile-menu-toggle')) {
      const menuToggle = document.createElement('button');
      menuToggle.className = 'mobile-menu-toggle';
      menuToggle.innerHTML = '☰';
      menuToggle.style.cssText = `
        background: none;
        border: none;
        font-size: 1.5rem;
        color: #0a0a0a;
        cursor: pointer;
        display: block;
      `;
      
      menuToggle.addEventListener('click', () => {
        navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
        if (navLinks.style.display === 'flex') {
          navLinks.style.cssText = `
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: white;
            flex-direction: column;
            padding: 1rem;
            box-shadow: 0 4px 20px rgba(0,0,0,0.1);
          `;
        }
      });
      
      navContainer.appendChild(menuToggle);
    }
  }
};

// Initialize mobile menu on load and resize
window.addEventListener('load', createMobileMenu);
window.addEventListener('resize', createMobileMenu);

// Add form handling for contact
document.querySelectorAll('.btn-primary[href="mailto:contact@beaverly.ai"]').forEach(btn => {
  btn.addEventListener('click', function(e) {
    // Could integrate with a contact form or payment processor here
    console.log('Contact/Purchase initiated');
  });
});
