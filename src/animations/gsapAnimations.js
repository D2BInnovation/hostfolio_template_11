import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger)

/**
 * GSAP Animation Utilities
 * Centralized animation functions for consistent portfolio animations
 */

/**
 * Page load intro animation
 * @param {HTMLElement} container - Main app container
 */
export function pageLoadIntro(container) {
  const tl = gsap.timeline()
  
  // Initial state
  gsap.set(container, { opacity: 0 })
  
  // Fade in container
  tl.to(container, {
    opacity: 1,
    duration: 1,
    ease: 'power2.out'
  })
  
  return tl
}

/**
 * Animate hero section on page load
 * @param {Object} elements - Hero section elements
 */
export function animateHeroSection(elements) {
  const { title, subtitle, description, buttons } = elements
  
  const tl = gsap.timeline()
  
  // Set initial states
  gsap.set([title, subtitle, description, buttons], { 
    opacity: 0, 
    y: 50 
  })
  
  // Animate in sequence
  tl.to(title, {
    opacity: 1,
    y: 0,
    duration: 1,
    ease: 'power3.out'
  })
  .to(subtitle, {
    opacity: 1,
    y: 0,
    duration: 0.8,
    ease: 'power3.out'
  }, '-=0.6')
  .to(description, {
    opacity: 1,
    y: 0,
    duration: 0.8,
    ease: 'power3.out'
  }, '-=0.5')
  .to(buttons, {
    opacity: 1,
    y: 0,
    duration: 0.6,
    ease: 'power3.out'
  }, '-=0.4')
  
  return tl
}

/**
 * Create scroll-triggered section reveal animation
 * @param {HTMLElement} element - Element to animate
 * @param {Object} options - Animation options
 */
export function createScrollReveal(element, options = {}) {
  const defaults = {
    opacity: 0,
    y: 80,
    duration: 1,
    ease: 'power3.out',
    scrub: false
  }
  
  const config = { ...defaults, ...options }
  
  // Set initial state
  gsap.set(element, {
    opacity: config.opacity,
    y: config.y
  })
  
  // Create ScrollTrigger
  return ScrollTrigger.create({
    trigger: element,
    start: 'top 80%',
    end: 'bottom 20%',
    onEnter: () => {
      gsap.to(element, {
        opacity: 1,
        y: 0,
        duration: config.duration,
        ease: config.ease
      })
    },
    onLeave: () => {
      if (config.scrub) {
        gsap.to(element, {
          opacity: 0,
          y: -config.y,
          duration: config.duration,
          ease: config.ease
        })
      }
    },
    onEnterBack: () => {
      if (config.scrub) {
        gsap.to(element, {
          opacity: 1,
          y: 0,
          duration: config.duration,
          ease: config.ease
        })
      }
    }
  })
}

/**
 * Animate text with character/word splitting
 * @param {HTMLElement} element - Text element to animate
 * @param {Object} options - Animation options
 */
export function animateTextSplit(element, options = {}) {
  const defaults = {
    type: 'chars', // 'chars', 'words', or 'lines'
    stagger: 0.05,
    from: { opacity: 0, y: 50 },
    to: { opacity: 1, y: 0 },
    duration: 0.8,
    ease: 'power2.out'
  }
  
  const config = { ...defaults, ...options }
  
  // Split text based on type
  let elements
  if (config.type === 'chars') {
    elements = element.innerText.split('').map(char => {
      const span = document.createElement('span')
      span.innerText = char === ' ' ? '\u00A0' : char
      span.style.display = 'inline-block'
      return span
    })
    element.innerHTML = ''
    elements.forEach(span => element.appendChild(span))
  } else if (config.type === 'words') {
    elements = element.innerText.split(' ').map((word, index) => {
      const span = document.createElement('span')
      span.innerText = word
      span.style.display = 'inline-block'
      span.style.marginRight = index < elements.length - 1 ? '0.3em' : '0'
      return span
    })
    element.innerHTML = ''
    elements.forEach(span => element.appendChild(span))
  }
  
  // Set initial state and animate
  gsap.set(elements, config.from)
  gsap.to(elements, {
    ...config.to,
    duration: config.duration,
    stagger: config.stagger,
    ease: config.ease
  })
  
  return elements
}

/**
 * Create parallax effect
 * @param {HTMLElement} element - Element to apply parallax to
 * @param {Object} options - Parallax options
 */
export function createParallax(element, options = {}) {
  const defaults = {
    speed: 0.5,
    direction: 'vertical' // 'vertical' or 'horizontal'
  }
  
  const config = { ...defaults, ...options }
  
  return ScrollTrigger.create({
    trigger: element,
    start: 'top bottom',
    end: 'bottom top',
    scrub: true,
    onUpdate: (self) => {
      const progress = self.progress
      const movement = (progress - 0.5) * 200 * config.speed
      
      if (config.direction === 'vertical') {
        gsap.to(element, {
          y: movement,
          duration: 0.1,
          ease: 'none'
        })
      } else {
        gsap.to(element, {
          x: movement,
          duration: 0.1,
          ease: 'none'
        })
      }
    }
  })
}

/**
 * Animate navigation bar
 * @param {HTMLElement} navbar - Navigation element
 * @param {HTMLElement} container - Main container for scroll detection
 */
export function animateNavbar(navbar, container) {
  let lastScrollY = window.scrollY
  let ticking = false
  
  function updateNavbar() {
    const currentScrollY = window.scrollY
    
    if (currentScrollY > lastScrollY && currentScrollY > 100) {
      // Scrolling down - hide navbar
      gsap.to(navbar, {
        y: -100,
        duration: 0.3,
        ease: 'power2.out'
      })
    } else {
      // Scrolling up - show navbar
      gsap.to(navbar, {
        y: 0,
        duration: 0.3,
        ease: 'power2.out'
      })
    }
    
    lastScrollY = currentScrollY
    ticking = false
  }
  
  function requestTick() {
    if (!ticking) {
      requestAnimationFrame(updateNavbar)
      ticking = true
    }
  }
  
  container.addEventListener('scroll', requestTick)
  
  return () => {
    container.removeEventListener('scroll', requestTick)
  }
}

/**
 * Create hover micro-interaction
 * @param {HTMLElement} element - Element to add hover effect to
 * @param {Object} options - Hover options
 */
export function createHoverInteraction(element, options = {}) {
  const defaults = {
    scale: 1.05,
    rotation: 0,
    duration: 0.3,
    ease: 'power2.out'
  }
  
  const config = { ...defaults, ...options }
  
  element.addEventListener('mouseenter', () => {
    gsap.to(element, {
      scale: config.scale,
      rotation: config.rotation,
      duration: config.duration,
      ease: config.ease
    })
  })
  
  element.addEventListener('mouseleave', () => {
    gsap.to(element, {
      scale: 1,
      rotation: 0,
      duration: config.duration,
      ease: config.ease
    })
  })
}

/**
 * Animate timeline items
 * @param {NodeList} items - Timeline items to animate
 */
export function animateTimeline(items) {
  items.forEach((item, index) => {
    createScrollReveal(item, {
      delay: index * 0.2,
      y: 60
    })
  })
}

/**
 * Clean up all GSAP animations and ScrollTriggers
 */
export function cleanupAnimations() {
  ScrollTrigger.getAll().forEach(trigger => trigger.kill())
  gsap.killTweensOf('*')
}
