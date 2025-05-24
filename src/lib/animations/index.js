import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

/**
 * Create a fade-in animation for elements as they scroll into view
 * @param {string} selector - CSS selector for target elements
 * @param {Object} options - Animation options
 */
export function fadeInOnScroll(selector, options = {}) {
  const defaults = {
    opacity: 0,
    y: 30,
    duration: 0.8,
    stagger: 0.1,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: selector,
      start: 'top 80%',
      end: 'bottom 20%',
      toggleActions: 'play none none reverse'
    }
  };
  
  const animOptions = { ...defaults, ...options };
  
  return gsap.from(selector, animOptions);
}

/**
 * Animate text characters one by one
 * @param {string} selector - CSS selector for target elements
 * @param {Object} options - Animation options
 */
export function animateText(selector, options = {}) {
  const defaults = {
    duration: 0.8,
    ease: 'power2.out',
    stagger: 0.02
  };
  
  const animOptions = { ...defaults, ...options };
  const elements = document.querySelectorAll(selector);
  
  elements.forEach(element => {
    // Split text into individual characters
    const text = element.innerText;
    element.innerHTML = '';
    
    const chars = text.split('');
    chars.forEach(char => {
      const span = document.createElement('span');
      span.classList.add('animated-char');
      span.style.display = 'inline-block';
      span.innerText = char === ' ' ? '\u00A0' : char;
      element.appendChild(span);
    });
    
    // Animate each character
    gsap.from(element.querySelectorAll('.animated-char'), {
      opacity: 0,
      y: 20,
      ...animOptions
    });
  });
}

/**
 * Create a parallax scroll effect
 * @param {string} selector - CSS selector for target elements
 * @param {number} speed - Parallax speed (0-1)
 */
export function parallaxScroll(selector, speed = 0.5) {
  const elements = document.querySelectorAll(selector);
  
  elements.forEach(element => {
    gsap.to(element, {
      y: () => -window.innerHeight * speed,
      ease: 'none',
      scrollTrigger: {
        trigger: element.parentElement,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    });
  });
}

/**
 * Create a horizontal scroll gallery
 * @param {string} containerSelector - CSS selector for the gallery container
 * @param {string} itemsSelector - CSS selector for the gallery items
 */
export function horizontalScrollGallery(containerSelector, itemsSelector) {
  const container = document.querySelector(containerSelector);
  const items = document.querySelectorAll(itemsSelector);
  
  if (!container || items.length === 0) return;
  
  // Calculate the total width of all items
  const totalWidth = Array.from(items).reduce((width, item) => {
    return width + item.offsetWidth;
  }, 0);
  
  // Set container width
  container.style.width = `${totalWidth}px`;
  
  // Create horizontal scroll animation
  gsap.to(container, {
    x: () => -(totalWidth - window.innerWidth),
    ease: 'none',
    scrollTrigger: {
      trigger: container,
      start: 'top top',
      end: () => `+=${totalWidth}`,
      scrub: 1,
      pin: true,
      anticipatePin: 1
    }
  });
}

/**
 * Animate a count up effect
 * @param {string} selector - CSS selector for target elements
 * @param {Object} options - Animation options
 */
export function countUp(selector, options = {}) {
  const defaults = {
    duration: 2,
    ease: 'power1.out'
  };
  
  const animOptions = { ...defaults, ...options };
  const elements = document.querySelectorAll(selector);
  
  elements.forEach(element => {
    const targetValue = parseInt(element.innerText, 10);
    const startValue = options.startValue || 0;
    
    gsap.fromTo(
      { value: startValue },
      { 
        value: targetValue,
        ...animOptions,
        onUpdate: function() {
          element.innerText = Math.round(this.targets()[0].value);
        },
        scrollTrigger: {
          trigger: element,
          start: 'top 80%'
        }
      }
    );
  });
}
