// Custom Cursor and Trail Effect
document.addEventListener('DOMContentLoaded', () => {
  const cursor = document.getElementById('cursor');
  const trails = [];
  const numTrails = 10;
  const trailDelay = 20; // in milliseconds

  // Create trail elements
  for (let i = 0; i < numTrails; i++) {
    const trail = document.createElement('div');
    trail.className = 'trail';
    document.body.appendChild(trail);
    trails.push(trail);
  }

  let mouseX = -100, mouseY = -100;
  let lastPositions = [];

  // Track mouse movement
  document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    if (cursor.style.opacity === "0") {
      cursor.style.opacity = "1";
    }
  });

  // Hide cursor when mouse leaves window
  document.addEventListener('mouseleave', () => {
    cursor.style.opacity = "0";
  });

  // Show cursor when mouse enters window
  document.addEventListener('mouseenter', () => {
    cursor.style.opacity = "1";
  });

  // Animate cursor and trails
  function animate() {
    cursor.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
    
    lastPositions.unshift({x: mouseX, y: mouseY});
    if (lastPositions.length > numTrails * (trailDelay / (1000/60))) {
      lastPositions.pop();
    }

    trails.forEach((trail, index) => {
      const posIndex = Math.floor(index * (trailDelay / (1000/60)));
      if(lastPositions[posIndex]) {
        const pos = lastPositions[posIndex];
        const scale = 1 - index / numTrails;
        trail.style.transform = `translate(${pos.x - 5}px, ${pos.y - 5}px) scale(${scale})`;
        trail.style.opacity = scale;
      }
    });

    requestAnimationFrame(animate);
  }

  animate();
});

// Dark Mode Toggle
const themeIcon = document.getElementById('theme-icon');
const observer = new MutationObserver(function(mutations) {
  mutations.forEach(function(mutation) {
    if (mutation.attributeName === "class") {
      const isDarkMode = document.documentElement.classList.contains('dark');
      themeIcon.textContent = isDarkMode ? 'dark_mode' : 'light_mode';
    }
  });
});

observer.observe(document.documentElement, { attributes: true });

// Smooth Scrolling for Navigation Links
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

// Active Navigation Link Highlight
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('nav a[href^="#"]');

window.addEventListener('scroll', () => {
  let current = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (pageYOffset >= sectionTop - 200) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

// Lazy Loading Images
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src || img.src;
        img.classList.add('loaded');
        observer.unobserve(img);
      }
    });
  });

  const images = document.querySelectorAll('img');
  images.forEach(img => imageObserver.observe(img));
}

// Disable custom cursor on mobile devices
if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
  document.body.style.cursor = 'auto';
  const cursor = document.getElementById('cursor');
  const trails = document.querySelectorAll('.trail');
  if (cursor) cursor.style.display = 'none';
  trails.forEach(trail => trail.style.display = 'none');
}

// Optionally: Check for user's preferred color scheme
// Commented out to default to light mode
// if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
//   document.documentElement.classList.add('dark');
// }

// Listen for changes in color scheme preference (optional)
// window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
//   if (e.matches) {
//     document.documentElement.classList.add('dark');
//   } else {
//     document.documentElement.classList.remove('dark');
//   }
// });

// Before/After Image Comparison Slider
document.addEventListener('DOMContentLoaded', () => {
  const slider = document.querySelector('.image-comparison-slider');
  if (!slider) return;

  const handle = slider.querySelector('.slider-handle');
  const beforeImage = slider.querySelector('.before-image');
  let isDragging = false;
  let isHovering = false;

  function updateSlider(x) {
    const rect = slider.getBoundingClientRect();
    let position = ((x - rect.left) / rect.width) * 100;
    
    // Constrain between 0 and 100
    position = Math.max(0, Math.min(100, position));
    
    // Update handle position
    handle.style.left = position + '%';
    
    // Update clip-path for before image (reveal from left, hide from right)
    beforeImage.style.clipPath = `inset(0 ${100 - position}% 0 0)`;
  }

  // Mouse enter/leave for hover effect
  slider.addEventListener('mouseenter', () => {
    isHovering = true;
  });

  slider.addEventListener('mouseleave', () => {
    isHovering = false;
  });

  // Mouse move - automatic follow on hover
  slider.addEventListener('mousemove', (e) => {
    if (isHovering || isDragging) {
      updateSlider(e.clientX);
    }
  });

  // Mouse events for dragging (optional - still works if user clicks)
  handle.addEventListener('mousedown', (e) => {
    isDragging = true;
    e.preventDefault();
  });

  document.addEventListener('mouseup', () => {
    isDragging = false;
  });

  // Touch events for mobile
  handle.addEventListener('touchstart', (e) => {
    isDragging = true;
    e.preventDefault();
  });

  document.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    const touch = e.touches[0];
    updateSlider(touch.clientX);
  });

  document.addEventListener('touchend', () => {
    isDragging = false;
  });

  // Click anywhere on the slider to move handle
  slider.addEventListener('click', (e) => {
    if (e.target === handle || handle.contains(e.target)) return;
    updateSlider(e.clientX);
  });
});

// Animated Counter for Statistics
document.addEventListener('DOMContentLoaded', () => {
  const counters = document.querySelectorAll('.counter');
  let hasAnimated = false;

  const animateCounter = (counter) => {
    const target = parseInt(counter.getAttribute('data-target'));
    const duration = 2000; // 2 seconds
    const increment = target / (duration / 16); // 60fps
    let current = 0;

    const updateCounter = () => {
      current += increment;
      if (current < target) {
        counter.textContent = Math.floor(current) + (target >= 1000 ? '+' : target > 1 ? '+' : '');
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = target + (target >= 1000 ? '+' : target > 1 ? '+' : '+');
      }
    };

    updateCounter();
  };

  const checkCounters = () => {
    if (hasAnimated) return;

    counters.forEach(counter => {
      const rect = counter.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight && rect.bottom > 0;

      if (isVisible) {
        hasAnimated = true;
        counters.forEach(c => animateCounter(c));
      }
    });
  };

  window.addEventListener('scroll', checkCounters);
  checkCounters(); // Check on load
});
