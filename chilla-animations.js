
// Chilla Page Animations
document.addEventListener('DOMContentLoaded', function() {
  
  // Intersection Observer for scroll animations
  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  };

  const scrollObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        // Unobserve after animation to improve performance
        scrollObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all elements with animation class
  const animatedElements = document.querySelectorAll('.animate-on-scroll');
  animatedElements.forEach(el => {
    scrollObserver.observe(el);
  });

  // Enhanced button interactions
  const buttons = document.querySelectorAll('.btn');
  buttons.forEach(button => {
    button.addEventListener('mouseenter', function() {
      this.style.transform = this.classList.contains('btn-primary') 
        ? 'translateY(-3px) scale(1.02)' 
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
  const style = document.createElement('style');
  style.textContent = `
    @keyframes ripple {
      to {
        transform: scale(2);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);

  // Parallax effect for immersive breaks
  const immersiveBreaks = document.querySelectorAll('.immersive-break');
  
  function updateParallax() {
    immersiveBreaks.forEach(break => {
      const rect = break.getBoundingClientRect();
      const speed = -0.5;
      const yPos = rect.top * speed;
      break.style.transform = `translateY(${yPos}px)`;
    });
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

  // Enhanced card hover effects with mouse tracking
  const cards = document.querySelectorAll('.flow-card, .user-story');
  
  cards.forEach(card => {
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

  // Smooth reveal for hero content
  const heroContent = document.querySelector('.hero-content');
  if (heroContent) {
    // Small delay to ensure smooth load animation
    setTimeout(() => {
      heroContent.classList.add('animate-in');
    }, 300);
  }

  // Dynamic typing effect for immersive text (subtle)
  const immersiveTexts = document.querySelectorAll('.immersive-text');
  
  const typeEffect = (element, text, speed = 100) => {
    let i = 0;
    element.textContent = '';
    
    const timer = setInterval(() => {
      if (i < text.length) {
        element.textContent += text.charAt(i);
        i++;
      } else {
        clearInterval(timer);
      }
    }, speed);
  };

  // Observer for immersive text typing
  const typingObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const text = entry.target.dataset.originalText || entry.target.textContent;
        entry.target.dataset.originalText = text;
        typeEffect(entry.target, text, 50);
        typingObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.8 });

  immersiveTexts.forEach(text => {
    typingObserver.observe(text);
  });

});
