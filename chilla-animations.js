
// Chilla Page Animations
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

  // Enhanced capability card interactions
  const capabilityCards = document.querySelectorAll('.capability-card');
  
  capabilityCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-4px) scale(1.02)';
    });

    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1)';
    });
  });

  // Enhanced persona card hover effects
  const personaCards = document.querySelectorAll('.persona-card');
  
  personaCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      const avatar = this.querySelector('.persona-avatar');
      if (avatar) {
        avatar.style.transform = 'scale(1.1) rotate(5deg)';
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

  // Work cards 3D tilt effect
  const workCards = document.querySelectorAll('.work-card');
  
  workCards.forEach(card => {
    card.addEventListener('mousemove', function(e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / 10;
      const rotateY = (centerX - x) / 10;
      
      this.style.transform = `
        translateY(-8px) 
        rotateX(${rotateX}deg) 
        rotateY(${rotateY}deg)
        scale3d(1.02, 1.02, 1.02)
      `;
    });

    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    });
  });

  // Scroll hint click handler
  const scrollHint = document.querySelector('.scroll-hint');
  if (scrollHint) {
    scrollHint.addEventListener('click', function() {
      const worksSection = document.querySelector('.works-section');
      if (worksSection) {
        worksSection.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  }

  // Parallax effect for hero background
  function updateParallax() {
    const scrollY = window.scrollY;
    const heroBackground = document.querySelector('.hero-background');
    
    if (heroBackground && scrollY < window.innerHeight) {
      const speed = scrollY * 0.5;
      heroBackground.style.transform = `translateY(${speed}px)`;
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

  // Tech blocks enhanced interaction
  const techBlocks = document.querySelectorAll('.tech-block');
  
  techBlocks.forEach(block => {
    block.addEventListener('mouseenter', function() {
      const icon = this.querySelector('.tech-block-icon');
      if (icon) {
        icon.style.transform = 'scale(1.2) rotate(5deg)';
        icon.style.transition = 'transform 0.3s ease';
      }
    });

    block.addEventListener('mouseleave', function() {
      const icon = this.querySelector('.tech-block-icon');
      if (icon) {
        icon.style.transform = 'scale(1) rotate(0deg)';
      }
    });
  });

  // Make sure all content is visible on load
  const allContent = document.querySelectorAll('section, .hero-content, .nav');
  allContent.forEach(el => {
    el.style.opacity = '1';
    el.style.visibility = 'visible';
  });

});
