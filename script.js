
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
      if (entry.target.classList.contains('demo-card')) {
        entry.target.classList.add('animate-in');
      } else if (entry.target.classList.contains('testimonial')) {
        entry.target.classList.add('animate-in');
      } else {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    }
  });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
  const animatedElements = document.querySelectorAll('.feature-card, .pricing-card, .testimonial, .why-item, .demo-card');

  animatedElements.forEach((el, index) => {
    if (el.classList.contains('demo-card') || el.classList.contains('testimonial')) {
      // These use CSS classes for animation
      observer.observe(el);
    } else {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
      observer.observe(el);
    }
  });
});

// Mobile menu functionality
const setupMobileMenu = () => {
  const navLinks = document.querySelector('.nav-links');
  const navContainer = document.querySelector('.nav-container');

  if (!document.querySelector('.mobile-menu-toggle')) {
    const menuToggle = document.createElement('button');
    menuToggle.className = 'mobile-menu-toggle';
    menuToggle.innerHTML = '☰';

    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      menuToggle.innerHTML = navLinks.classList.contains('active') ? '✕' : '☰';
    });

    navContainer.appendChild(menuToggle);
  }

  // Close menu when clicking on links
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      document.querySelector('.mobile-menu-toggle').innerHTML = '☰';
    });
  });
};

// Initialize mobile menu
document.addEventListener('DOMContentLoaded', setupMobileMenu);

// FAQ Accordion functionality
document.addEventListener('DOMContentLoaded', function() {
  const faqItems = document.querySelectorAll('.faq-item');
  
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      
      // Close all other FAQ items
      faqItems.forEach(otherItem => {
        otherItem.classList.remove('active');
      });
      
      // Toggle current item
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
});

// Add form handling for contact
document.querySelectorAll('.btn-primary[href="mailto:contact@beaverly.ai"]').forEach(btn => {
  btn.addEventListener('click', function(e) {
    // Could integrate with a contact form or payment processor here
    console.log('Contact/Purchase initiated');
  });
});
