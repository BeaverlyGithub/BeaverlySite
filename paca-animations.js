
// Paca Page Animations
document.addEventListener('DOMContentLoaded', function() {
  
  // Mobile menu functionality
  const mobileToggle = document.querySelector('.mobile-menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  
  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', function() {
      this.classList.toggle('active');
      navLinks.classList.toggle('active');
    });

    // Close menu when clicking on links
    navLinks.addEventListener('click', function(e) {
      if (e.target.tagName === 'A') {
        mobileToggle.classList.remove('active');
        navLinks.classList.remove('active');
      }
    });
  }
  
  // Intersection Observer for scroll animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const scrollObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        scrollObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all elements with animation class
  const animatedElements = document.querySelectorAll('.animate-on-scroll');
  animatedElements.forEach((el, index) => {
    // Make content visible immediately
    el.style.opacity = '1';
    el.style.transform = 'translateY(0)';
    
    // Add a small delay for staggered effect
    setTimeout(() => {
      scrollObserver.observe(el);
    }, index * 50);
  });

  // Ensure hero content is visible
  const heroContent = document.querySelector('.hero-content');
  if (heroContent) {
    heroContent.style.opacity = '1';
    heroContent.style.transform = 'translateY(0)';
    heroContent.classList.add('animate-in');
  }

  // Toggle functionality
  const toggleBtns = document.querySelectorAll('.toggle-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  toggleBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const targetTab = this.dataset.tab;
      
      // Remove active class from all buttons and tabs
      toggleBtns.forEach(b => b.classList.remove('active'));
      tabContents.forEach(tab => tab.classList.remove('active'));
      
      // Add active class to clicked button and corresponding tab
      this.classList.add('active');
      document.getElementById(targetTab).classList.add('active');
    });
  });

  // Enhanced button interactions
  const buttons = document.querySelectorAll('.btn');
  buttons.forEach(button => {
    button.addEventListener('mouseenter', function() {
      this.style.transform = this.classList.contains('btn-primary') 
        ? 'translateY(-2px) scale(1.02)' 
        : 'translateY(-2px)';
    });

    button.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1)';
    });

    // Add click ripple effect
    button.addEventListener('click', function(e) {
      const ripple = document.createElement('span');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      
      ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s ease-out;
        pointer-events: none;
      `;
      
      this.style.position = 'relative';
      this.appendChild(ripple);
      
      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });

  // Add ripple animation keyframes
  if (!document.querySelector('#ripple-styles')) {
    const style = document.createElement('style');
    style.id = 'ripple-styles';
    style.textContent = `
      @keyframes ripple {
        to {
          transform: scale(2);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);
  }

  // Enhanced feature card interactions
  const featureCards = document.querySelectorAll('.feature-card');
  
  featureCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-8px) scale(1.02)';
    });

    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1)';
    });
  });

  // Flow step animations
  const flowSteps = document.querySelectorAll('.flow-step');
  
  flowSteps.forEach((step, index) => {
    step.addEventListener('mouseenter', function() {
      const icon = this.querySelector('.step-icon');
      if (icon) {
        icon.style.transform = 'scale(1.1) rotate(5deg)';
        icon.style.transition = 'transform 0.3s ease';
      }
    });

    step.addEventListener('mouseleave', function() {
      const icon = this.querySelector('.step-icon');
      if (icon) {
        icon.style.transform = 'scale(1) rotate(0deg)';
      }
    });
  });

  // Enhanced persona card hover effects
  const personaCards = document.querySelectorAll('.persona-card');
  
  personaCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      const avatar = this.querySelector('.persona-avatar');
      if (avatar) {
        avatar.style.transform = 'scale(1.2) rotate(10deg)';
        avatar.style.transition = 'transform 0.3s ease';
      }
    });

    card.addEventListener('mouseleave', function() {
      const avatar = this.querySelector('.persona-avatar');
      if (avatar) {
        avatar.style.transform = 'scale(1) rotate(0deg)';
      }
    });
  });

  // Tech blocks enhanced interaction
  const techBlocks = document.querySelectorAll('.tech-block');
  
  techBlocks.forEach(block => {
    block.addEventListener('mouseenter', function() {
      const icon = this.querySelector('.tech-icon');
      if (icon) {
        icon.style.transform = 'scale(1.2) rotate(10deg)';
        icon.style.transition = 'transform 0.3s ease';
      }
    });

    block.addEventListener('mouseleave', function() {
      const icon = this.querySelector('.tech-icon');
      if (icon) {
        icon.style.transform = 'scale(1) rotate(0deg)';
      }
    });
  });

  // Scroll hint click handler
  const scrollHint = document.querySelector('.scroll-hint');
  if (scrollHint) {
    scrollHint.addEventListener('click', function() {
      const featuresSection = document.querySelector('.features-section');
      if (featuresSection) {
        featuresSection.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  }

  // Parallax effect for hero background
  function updateParallax() {
    const scrollY = window.scrollY;
    const codeLines = document.querySelectorAll('.code-line');
    
    if (scrollY < window.innerHeight) {
      codeLines.forEach((line, index) => {
        const speed = 0.2 + (index * 0.1);
        line.style.transform = `translateY(${scrollY * speed}px)`;
      });
    }
  }

  // Throttled scroll handler for performance
  let ticking = false;
  function handleScroll() {
    if (!ticking) {
      requestAnimationFrame(() => {
        updateParallax();
        ticking = false;
      });
      ticking = true;
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });

  // Make sure all content is visible on load
  const allContent = document.querySelectorAll('section, .hero-content, .nav');
  allContent.forEach(el => {
    el.style.opacity = '1';
    el.style.visibility = 'visible';
  });

  // Staggered animation for personas
  const personas = document.querySelectorAll('.persona-card.floating');
  personas.forEach((persona, index) => {
    persona.style.animationDelay = `${index * -2}s`;
  });

});
