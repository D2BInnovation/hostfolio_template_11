<template>
  <section 
    id="hero" 
    class="section hero-section"
    ref="heroSection"
  >
    <div class="container">
      <div class="hero-content">
        <!-- Greeting -->
        <div class="hero-greeting" ref="greeting">
          <span class="greeting-text">{{ heroData.greeting }}</span>
        </div>

        <!-- Name -->
        <h1 class="hero-title" ref="title">
          <span class="title-text">{{ personalInfo.name }}</span>
          <span class="title-cursor">|</span>
        </h1>

        <!-- Professional Title -->
        <div class="hero-subtitle" ref="subtitle">
          <span class="subtitle-text">{{ personalInfo.title }}</span>
        </div>

        <!-- Description -->
        <p class="hero-description" ref="description">
          {{ heroData.description }}
        </p>

        <!-- CTA Buttons -->
        <div class="hero-buttons" ref="buttons">
          <a 
            :href="heroData.primaryButton?.link" 
            class="btn btn-primary hero-btn"
            ref="primaryBtn"
          >
            {{ heroData.primaryButton?.text }}
          </a>
          <a 
            :href="heroData.secondaryButton?.link" 
            class="btn btn-secondary hero-btn"
            ref="secondaryBtn"
          >
            {{ heroData.secondaryButton?.text }}
          </a>
        </div>

        <!-- Social Links -->
        <div class="hero-social" ref="social">
          <a 
            v-for="link in socialLinks" 
            :key="link.platform"
            :href="link.url"
            class="social-link"
            :title="link.platform"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span class="social-icon">{{ getSocialIcon(link.icon) }}</span>
          </a>
        </div>
      </div>

      <!-- Background Elements -->
      <div class="hero-background">
        <div class="floating-shapes">
          <div class="shape shape-1" ref="shape1"></div>
          <div class="shape shape-2" ref="shape2"></div>
          <div class="shape shape-3" ref="shape3"></div>
        </div>
        
        <!-- Gradient Overlay -->
        <div class="gradient-overlay"></div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { getSectionData, getPersonalInfo } from '@services/data-loader'
import { 
  animateHeroSection, 
  animateTextSplit, 
  createParallax, 
  createHoverInteraction 
} from '@animations/gsapAnimations'

// Reactive data
const heroData = ref({})
const personalInfo = ref({})
const socialLinks = ref([])

// Template refs
const heroSection = ref(null)
const greeting = ref(null)
const title = ref(null)
const subtitle = ref(null)
const description = ref(null)
const buttons = ref(null)
const primaryBtn = ref(null)
const secondaryBtn = ref(null)
const social = ref(null)
const shape1 = ref(null)
const shape2 = ref(null)
const shape3 = ref(null)

// Get social icon (simplified for demo)
const getSocialIcon = (iconName) => {
  const icons = {
    linkedin: 'in',
    github: '⚡',
    twitter: '𝕏',
    email: '@'
  }
  return icons[iconName] || '●'
}

// Initialize hero section
const initializeHero = async () => {
  // Load data
  heroData.value = getSectionData('hero') || {}
  personalInfo.value = getPersonalInfo()
  
  // Create social links from personal info
  socialLinks.value = [
    { platform: 'LinkedIn', url: personalInfo.value.linkedin, icon: 'linkedin' },
    { platform: 'GitHub', url: personalInfo.value.github, icon: 'github' },
    { platform: 'Email', url: `mailto:${personalInfo.value.email}`, icon: 'email' }
  ].filter(link => link.url)

  await nextTick()
  
  // Animate hero section
  const elements = {
    greeting: greeting.value,
    title: title.value,
    subtitle: subtitle.value,
    description: description.value,
    buttons: buttons.value
  }
  
  // Staggered animation
  animateHeroSection(elements)
  
  // Animate text with character splitting
  if (title.value) {
    const titleText = title.value.querySelector('.title-text')
    if (titleText) {
      animateTextSplit(titleText, {
        type: 'chars',
        stagger: 0.05,
        from: { opacity: 0, y: 100, rotationX: -90 },
        to: { opacity: 1, y: 0, rotationX: 0 },
        duration: 1.2,
        ease: 'power3.out'
      })
    }
  }
  
  // Animate subtitle with word splitting
  if (subtitle.value) {
    animateTextSplit(subtitle.value, {
      type: 'words',
      stagger: 0.1,
      from: { opacity: 0, y: 50 },
      to: { opacity: 1, y: 0 },
      duration: 0.8,
      ease: 'power2.out'
    })
  }
  
  // Add hover interactions to buttons
  if (primaryBtn.value) {
    createHoverInteraction(primaryBtn.value, {
      scale: 1.05,
      duration: 0.3
    })
  }
  
  if (secondaryBtn.value) {
    createHoverInteraction(secondaryBtn.value, {
      scale: 1.05,
      duration: 0.3
    })
  }
  
  // Animate social links with stagger
  if (social.value) {
    const socialLinks = social.value.querySelectorAll('.social-link')
    socialLinks.forEach((link, index) => {
      createHoverInteraction(link, {
        scale: 1.2,
        rotation: 5,
        duration: 0.2
      })
    })
  }
  
  // Create parallax effects for background shapes
  if (shape1.value) {
    createParallax(shape1.value, { speed: 0.3 })
  }
  
  if (shape2.value) {
    createParallax(shape2.value, { speed: 0.5, direction: 'horizontal' })
  }
  
  if (shape3.value) {
    createParallax(shape3.value, { speed: 0.2 })
  }
  
  // Animate floating shapes
  animateFloatingShapes()
}

// Animate floating background shapes
const animateFloatingShapes = () => {
  const shapes = [shape1.value, shape2.value, shape3.value].filter(Boolean)
  
  shapes.forEach((shape, index) => {
    // Random floating animation
    gsap.to(shape, {
      y: 'random(-30, 30)',
      x: 'random(-20, 20)',
      rotation: 'random(-180, 180)',
      duration: `random(3, 6)`,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      delay: index * 0.5
    })
  })
}

onMounted(() => {
  initializeHero()
})
</script>

<style scoped>
.hero-section {
  min-height: 100vh;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
}

.hero-content {
  position: relative;
  z-index: 2;
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
}

.hero-greeting {
  margin-bottom: 1rem;
}

.greeting-text {
  font-size: 1.2rem;
  color: var(--text-secondary);
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.hero-title {
  font-size: clamp(3rem, 8vw, 6rem);
  font-weight: 800;
  line-height: 1.1;
  margin-bottom: 1.5rem;
  position: relative;
}

.title-text {
  background: linear-gradient(135deg, #ffffff 0%, #667eea 50%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  display: inline-block;
}

.title-cursor {
  color: #667eea;
  animation: blink 1s infinite;
}

@keyframes blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}

.hero-subtitle {
  margin-bottom: 2rem;
}

.subtitle-text {
  font-size: clamp(1.5rem, 3vw, 2rem);
  color: var(--text-secondary);
  font-weight: 300;
  display: inline-block;
}

.hero-description {
  font-size: 1.25rem;
  color: var(--text-muted);
  line-height: 1.8;
  margin-bottom: 3rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.hero-buttons {
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  align-items: center;
  margin-bottom: 3rem;
  flex-wrap: wrap;
}

.hero-btn {
  min-width: 160px;
  text-align: center;
}

.hero-social {
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  align-items: center;
}

.social-link {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: var(--glass-bg);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid var(--glass-border);
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  color: var(--text-secondary);
  font-size: 1.2rem;
  font-weight: 600;
  transition: var(--transition-smooth);
}

.social-link:hover {
  color: var(--text-primary);
  border-color: rgba(255, 255, 255, 0.5);
  transform: translateY(-3px);
}

.hero-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  pointer-events: none;
}

.floating-shapes {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.shape {
  position: absolute;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1));
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.shape-1 {
  width: 200px;
  height: 200px;
  top: 10%;
  left: 10%;
}

.shape-2 {
  width: 150px;
  height: 150px;
  top: 60%;
  right: 15%;
}

.shape-3 {
  width: 100px;
  height: 100px;
  bottom: 20%;
  left: 20%;
}

.gradient-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(
    circle at 50% 50%,
    transparent 0%,
    rgba(30, 60, 114, 0.1) 50%,
    rgba(30, 60, 114, 0.3) 100%
  );
  pointer-events: none;
}

/* Responsive Design */
@media (max-width: 768px) {
  .hero-title {
    font-size: clamp(2.5rem, 6vw, 4rem);
  }
  
  .subtitle-text {
    font-size: clamp(1.2rem, 2.5vw, 1.5rem);
  }
  
  .hero-description {
    font-size: 1.1rem;
    margin-bottom: 2rem;
  }
  
  .hero-buttons {
    flex-direction: column;
    gap: 1rem;
  }
  
  .hero-btn {
    width: 100%;
    max-width: 280px;
  }
  
  .social-link {
    width: 45px;
    height: 45px;
    font-size: 1rem;
  }
  
  .shape-1 {
    width: 150px;
    height: 150px;
  }
  
  .shape-2 {
    width: 100px;
    height: 100px;
  }
  
  .shape-3 {
    width: 80px;
    height: 80px;
  }
}

@media (max-width: 480px) {
  .hero-content {
    padding: 0 1rem;
  }
  
  .greeting-text {
    font-size: 1rem;
  }
  
  .hero-description {
    font-size: 1rem;
  }
}
</style>
