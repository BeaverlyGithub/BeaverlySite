
// DOM Elements
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navLinks = document.querySelector('.nav-links');

// Mobile Menu Toggle
if (mobileMenuToggle && navLinks) {
  mobileMenuToggle.addEventListener('click', () => {
    mobileMenuToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
  });

  // Close mobile menu when clicking on a link
  const navLinkItems = navLinks.querySelectorAll('a');
  navLinkItems.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenuToggle.classList.remove('active');
      navLinks.classList.remove('active');
    });
  });

  // Close mobile menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!mobileMenuToggle.contains(e.target) && !navLinks.contains(e.target)) {
      mobileMenuToggle.classList.remove('active');
      navLinks.classList.remove('active');
    }
  });
}

// Scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-in');
    }
  });
}, observerOptions);

// Observe all elements with animation class
const animatedElements = document.querySelectorAll('.animate-on-scroll');
animatedElements.forEach(el => observer.observe(el));

// Smooth scroll for anchor links
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

// Scroll hint functionality
const scrollHint = document.querySelector('.scroll-hint');
if (scrollHint) {
  scrollHint.addEventListener('click', () => {
    const nextSection = document.querySelector('.what-section');
    if (nextSection) {
      nextSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
}

// Enhanced power tile interactions
const powerTiles = document.querySelectorAll('.power-tile');
powerTiles.forEach((tile, index) => {
  // Stagger animation delays
  tile.style.animationDelay = `${index * 0.2}s`;
  
  // Add hover sound effect (visual feedback)
  tile.addEventListener('mouseenter', () => {
    tile.style.transform = 'translateY(-12px) scale(1.02)';
  });
  
  tile.addEventListener('mouseleave', () => {
    tile.style.transform = 'translateY(0) scale(1)';
  });
});

// Ecosystem diagram animations
const ecosystemNodes = document.querySelectorAll('.ecosystem-node');
const connectionLines = document.querySelectorAll('.connection-line');

// Animate ecosystem on scroll
const ecosystemSection = document.querySelector('.ecosystem-section');
if (ecosystemSection) {
  const ecosystemObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Animate nodes with staggered delays
        ecosystemNodes.forEach((node, index) => {
          setTimeout(() => {
            node.style.opacity = '1';
            node.style.transform = node.classList.contains('center') 
              ? 'translate(-50%, -50%) scale(1)' 
              : 'scale(1)';
          }, index * 200);
        });

        // Animate connection lines
        setTimeout(() => {
          connectionLines.forEach((line, index) => {
            setTimeout(() => {
              line.style.opacity = '1';
            }, index * 100);
          });
        }, ecosystemNodes.length * 200);
      }
    });
  }, { threshold: 0.3 });

  ecosystemObserver.observe(ecosystemSection);
}

// Initialize ecosystem styles
ecosystemNodes.forEach(node => {
  if (!node.classList.contains('center')) {
    node.style.opacity = '0';
    node.style.transform = 'scale(0.8)';
  } else {
    node.style.opacity = '0';
    node.style.transform = 'translate(-50%, -50%) scale(0.8)';
  }
  node.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
});

connectionLines.forEach(line => {
  line.style.opacity = '0';
  line.style.transition = 'opacity 0.4s ease';
});

// Enhanced attribute cards
const attributeCards = document.querySelectorAll('.attribute-card');
attributeCards.forEach((card, index) => {
  card.addEventListener('mouseenter', () => {
    card.style.transform = 'translateY(-12px) rotateX(5deg)';
  });
  
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'translateY(0) rotateX(0deg)';
  });
});

// Comparison table row hover effects
const tableRows = document.querySelectorAll('.table-row');
tableRows.forEach(row => {
  row.addEventListener('mouseenter', () => {
    row.style.backgroundColor = 'rgba(0, 0, 0, 0.02)';
  });
  
  row.addEventListener('mouseleave', () => {
    row.style.backgroundColor = 'transparent';
  });
});

// Navbar scroll effect
let lastScrollY = window.scrollY;
const navbar = document.querySelector('.nav');

window.addEventListener('scroll', () => {
  const currentScrollY = window.scrollY;
  
  if (navbar) {
    if (currentScrollY > lastScrollY && currentScrollY > 100) {
      // Scrolling down
      navbar.style.transform = 'translateY(-100%)';
    } else {
      // Scrolling up
      navbar.style.transform = 'translateY(0)';
    }
    
    // Add background blur when scrolled
    if (currentScrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }
  
  lastScrollY = currentScrollY;
});

// Add CSS for navbar scroll effects
const style = document.createElement('style');
style.textContent = `
  .nav {
    transition: transform 0.3s ease, background-color 0.3s ease;
  }
  
  .nav.scrolled {
    background: rgba(255, 255, 255, 0.98);
    backdrop-filter: blur(20px);
  }
  
  .power-tile {
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  .attribute-card {
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    transform-style: preserve-3d;
  }
  
  .table-row {
    transition: background-color 0.2s ease;
  }
`;
document.head.appendChild(style);

// Performance optimization: Throttle scroll events
function throttle(func, limit) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// Apply throttling to scroll event
const throttledScrollHandler = throttle(() => {
  const currentScrollY = window.scrollY;
  
  if (navbar) {
    if (currentScrollY > lastScrollY && currentScrollY > 100) {
      navbar.style.transform = 'translateY(-100%)';
    } else {
      navbar.style.transform = 'translateY(0)';
    }
    
    if (currentScrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }
  
  lastScrollY = currentScrollY;
}, 16);

window.addEventListener('scroll', throttledScrollHandler);

// Add entrance animations for hero content
const heroContent = document.querySelector('.hero-content');
if (heroContent) {
  setTimeout(() => {
    heroContent.style.opacity = '1';
    heroContent.style.transform = 'translateY(0)';
  }, 300);
  
  // Initial state
  heroContent.style.opacity = '0';
  heroContent.style.transform = 'translateY(30px)';
  heroContent.style.transition = 'all 1s cubic-bezier(0.4, 0, 0.2, 1)';
}

console.log('M-II animations loaded successfully');
