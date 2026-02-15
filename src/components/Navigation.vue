<template>
  <nav 
    ref="navbar" 
    class="navbar"
    :class="{ 'navbar--scrolled': isScrolled }"
  >
    <div class="container">
      <div class="navbar__content">
        <!-- Logo -->
        <div class="navbar__logo" ref="logo">
          <a href="#hero" class="logo-link">
            <span class="logo-text">{{ personalInfo.name?.split(' ')[0] || 'Portfolio' }}</span>
          </a>
        </div>

        <!-- Desktop Navigation -->
        <div class="navbar__menu" ref="menu">
          <ul class="nav-list">
            <li 
              v-for="section in availableSections" 
              :key="section.key"
              class="nav-item"
              ref="navItems"
            >
              <a 
                :href="`#${section.key}`"
                class="nav-link"
                :class="{ 'nav-link--active': activeSection === section.key }"
                @click="handleNavClick(section.key)"
              >
                {{ section.label }}
              </a>
            </li>
            <li v-if="resumeUrl" class="nav-item">
              <a 
                :href="resumeUrl" 
                target="_blank" 
                rel="noopener noreferrer"
                class="nav-link nav-link--resume"
              >
                Resume
              </a>
            </li>
          </ul>
        </div>

        <!-- Mobile Menu Toggle -->
        <button 
          class="navbar__toggle"
          ref="toggle"
          @click="toggleMobileMenu"
          :class="{ 'navbar__toggle--active': isMobileMenuOpen }"
        >
          <span class="hamburger-line"></span>
          <span class="hamburger-line"></span>
          <span class="hamburger-line"></span>
        </button>
      </div>

      <!-- Mobile Menu -->
      <div 
        class="navbar__mobile-menu"
        :class="{ 'navbar__mobile-menu--open': isMobileMenuOpen }"
        ref="mobileMenu"
      >
        <ul class="mobile-nav-list">
          <li 
            v-for="section in availableSections" 
            :key="section.key"
            class="mobile-nav-item"
          >
            <a 
              :href="`#${section.key}`"
              class="mobile-nav-link"
              :class="{ 'mobile-nav-link--active': activeSection === section.key }"
              @click="handleMobileNavClick(section.key)"
            >
              {{ section.label }}
            </a>
          </li>
          <li v-if="resumeUrl" class="mobile-nav-item">
            <a 
              :href="resumeUrl" 
              target="_blank" 
              rel="noopener noreferrer"
              class="mobile-nav-link mobile-nav-link--resume"
              @click="isMobileMenuOpen = false"
            >
              Download Resume
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import { getAvailableSections, getPersonalInfo, getResumeUrl } from '@services/data-loader'
import { animateNavbar, createScrollReveal } from '@animations/gsapAnimations'

// Reactive data
const availableSections = ref([])
const personalInfo = ref({})
const activeSection = ref('hero')
const isScrolled = ref(false)
const isMobileMenuOpen = ref(false)
const resumeUrl = ref(null)

// Template refs
const navbar = ref(null)
const logo = ref(null)
const menu = ref(null)
const navItems = ref([])
const toggle = ref(null)
const mobileMenu = ref(null)

// Intersection Observer for active section tracking
let sectionObserver = null

// Handle navigation click
const handleNavClick = (sectionKey) => {
  const element = document.getElementById(sectionKey)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}

// Handle mobile navigation click
const handleMobileNavClick = (sectionKey) => {
  handleNavClick(sectionKey)
  isMobileMenuOpen.value = false
}

// Toggle mobile menu
const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

// Update active section based on scroll
const updateActiveSection = () => {
  const sections = availableSections.value.map(section => ({
    key: section.key,
    element: document.getElementById(section.key)
  })).filter(section => section.element)

  const scrollPosition = window.scrollY + 100

  for (let i = sections.length - 1; i >= 0; i--) {
    const section = sections[i]
    const rect = section.element.getBoundingClientRect()
    const elementTop = rect.top + window.scrollY
    
    if (elementTop <= scrollPosition) {
      activeSection.value = section.key
      break
    }
  }
}

// Handle scroll events
const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
  updateActiveSection()
}

// Initialize animations
const initializeAnimations = async () => {
  await nextTick()
  
  // Animate navbar elements
  createScrollReveal(logo.value, { delay: 0.2 })
  createScrollReveal(menu.value, { delay: 0.3 })
  
  // Animate nav items with stagger
  if (navItems.value.length > 0) {
    navItems.value.forEach((item, index) => {
      createScrollReveal(item, { delay: 0.4 + index * 0.1 })
    })
  }
}

// Setup intersection observer for sections
const setupSectionObserver = () => {
  const options = {
    root: null,
    rootMargin: '-20% 0px -70% 0px',
    threshold: 0
  }

  sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        activeSection.value = entry.target.id
      }
    })
  }, options)

  // Observe all sections
  availableSections.value.forEach(section => {
    const element = document.getElementById(section.key)
    if (element) {
      sectionObserver.observe(element)
    }
  })
}

onMounted(async () => {
  // Load data
  availableSections.value = getAvailableSections()
  personalInfo.value = getPersonalInfo()
  resumeUrl.value = getResumeUrl()

  // Initialize animations
  await initializeAnimations()

  // Setup scroll listeners
  window.addEventListener('scroll', handleScroll)
  
  // Setup section observer
  setupSectionObserver()

  // Initial scroll check
  handleScroll()
})

onUnmounted(() => {
  // Cleanup
  window.removeEventListener('scroll', handleScroll)
  if (sectionObserver) {
    sectionObserver.disconnect()
  }
})
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: var(--glass-bg);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom: 1px solid var(--glass-border);
  transition: var(--transition-smooth);
  transform: translateY(0);
}

.navbar--scrolled {
  background: rgba(30, 60, 114, 0.95);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.3);
}

.navbar__content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
}

.navbar__logo {
  flex-shrink: 0;
}

.logo-link {
  text-decoration: none;
  color: var(--text-primary);
}

.logo-text {
  font-size: 1.5rem;
  font-weight: 700;
  background: var(--primary-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.navbar__menu {
  display: flex;
  align-items: center;
}

.nav-list {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: 2rem;
}

.nav-item {
  position: relative;
}

.nav-link {
  color: var(--text-secondary);
  text-decoration: none;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 25px;
  transition: var(--transition-smooth);
  position: relative;
  overflow: hidden;
}

.nav-link::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: var(--primary-gradient);
  opacity: 0;
  transition: var(--transition-smooth);
  border-radius: 25px;
}

.nav-link:hover {
  color: var(--text-primary);
}

.nav-link:hover::before {
  opacity: 0.1;
}

.nav-link--active {
  color: var(--text-primary);
}

.nav-link--active::before {
  opacity: 0.2;
}

.navbar__toggle {
  display: none;
  flex-direction: column;
  justify-content: space-between;
  width: 30px;
  height: 25px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
}

.hamburger-line {
  width: 100%;
  height: 3px;
  background: var(--text-primary);
  border-radius: 3px;
  transition: var(--transition-smooth);
  transform-origin: center;
}

.navbar__toggle--active .hamburger-line:nth-child(1) {
  transform: translateY(11px) rotate(45deg);
}

.navbar__toggle--active .hamburger-line:nth-child(2) {
  opacity: 0;
}

.navbar__toggle--active .hamburger-line:nth-child(3) {
  transform: translateY(-11px) rotate(-45deg);
}

.navbar__mobile-menu {
  display: none;
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: rgba(30, 60, 114, 0.98);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom: 1px solid var(--glass-border);
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease;
}

.navbar__mobile-menu--open {
  max-height: 400px;
}

.mobile-nav-list {
  list-style: none;
  margin: 0;
  padding: 2rem 0;
}

.mobile-nav-item {
  padding: 0.5rem 0;
}

.mobile-nav-link {
  display: block;
  color: var(--text-secondary);
  text-decoration: none;
  font-weight: 500;
  padding: 1rem 2rem;
  transition: var(--transition-smooth);
}

.mobile-nav-link:hover,
.mobile-nav-link--active {
  color: var(--text-primary);
  background: rgba(255, 255, 255, 0.1);
}

/* Responsive Design */
@media (max-width: 768px) {
  .navbar__menu {
    display: none;
  }

  .navbar__toggle {
    display: flex;
  }

  .navbar__mobile-menu {
    display: block;
  }

  .nav-list {
    gap: 1rem;
  }
}

@media (max-width: 480px) {
  .navbar__content {
    padding: 0.75rem 0;
  }

  .logo-text {
    font-size: 1.25rem;
  }
}
</style>
