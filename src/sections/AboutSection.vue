<template>
  <section 
    id="about" 
    class="section about-section"
    ref="aboutSection"
  >
    <div class="container">
      <!-- Section Title -->
      <h2 class="section-title" ref="title">About Me</h2>
      
      <div class="about-content">
        <!-- About Text -->
        <div class="about-text" ref="textContainer">
          <div class="about-description">
            <p 
              v-for="(paragraph, index) in aboutData.description" 
              :key="index"
              class="description-paragraph"
              ref="paragraphs"
            >
              {{ paragraph }}
            </p>
          </div>
          
          <!-- Skills Grid -->
          <div class="skills-section" v-if="aboutData.skills?.length">
            <h3 class="skills-title" ref="skillsTitle">Technical Skills</h3>
            <div class="skills-grid" ref="skillsGrid">
              <div 
                v-for="(skill, index) in aboutData.skills" 
                :key="index"
                class="skill-item glass-card"
                ref="skillItems"
              >
                <span class="skill-text">{{ skill }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Personal Info Card -->
        <div class="about-info" ref="infoCard">
          <div class="info-card glass-card">
            <div class="info-header">
              <div class="info-avatar">
                <div class="avatar-placeholder">
                  <span class="avatar-text">{{ getInitials() }}</span>
                </div>
              </div>
              <div class="info-name">
                <h3>{{ personalInfo.name }}</h3>
                <p class="info-title">{{ personalInfo.title }}</p>
              </div>
            </div>
            
            <div class="info-details">
              <div class="info-item" v-if="personalInfo.email">
                <span class="info-label">Email</span>
                <a :href="`mailto:${personalInfo.email}`" class="info-value">
                  {{ personalInfo.email }}
                </a>
              </div>
              
              <div class="info-item" v-if="personalInfo.phone">
                <span class="info-label">Phone</span>
                <a :href="`tel:${personalInfo.phone}`" class="info-value">
                  {{ personalInfo.phone }}
                </a>
              </div>
              
              <div class="info-item" v-if="personalInfo.location">
                <span class="info-label">Location</span>
                <span class="info-value">{{ personalInfo.location }}</span>
              </div>
              
              <div class="info-item" v-if="personalInfo.website">
                <span class="info-label">Website</span>
                <a 
                  :href="personalInfo.website" 
                  class="info-value"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {{ personalInfo.website }}
                </a>
              </div>
            </div>
            
            <!-- Social Links -->
            <div class="info-social" v-if="socialLinks.length">
              <a 
                v-for="link in socialLinks" 
                :key="link.platform"
                :href="link.url"
                class="info-social-link"
                :title="link.platform"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span class="social-icon">{{ getSocialIcon(link.icon) }}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Background Elements -->
    <div class="about-background">
      <div class="floating-shapes">
        <div class="shape shape-1" ref="shape1"></div>
        <div class="shape shape-2" ref="shape2"></div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { getSectionData, getPersonalInfo } from '@services/data-loader'
import { 
  createScrollReveal, 
  animateTextSplit, 
  createParallax, 
  createHoverInteraction 
} from '@animations/gsapAnimations'

// Reactive data
const aboutData = ref({})
const personalInfo = ref({})
const socialLinks = ref([])

// Template refs
const aboutSection = ref(null)
const title = ref(null)
const textContainer = ref(null)
const paragraphs = ref([])
const skillsTitle = ref(null)
const skillsGrid = ref(null)
const skillItems = ref([])
const infoCard = ref(null)
const shape1 = ref(null)
const shape2 = ref(null)

// Get initials for avatar
const getInitials = () => {
  const name = personalInfo.value.name || ''
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

// Get social icon
const getSocialIcon = (iconName) => {
  const icons = {
    linkedin: 'in',
    github: '⚡',
    twitter: '𝕏',
    email: '@'
  }
  return icons[iconName] || '●'
}

// Initialize about section
const initializeAbout = async () => {
  // Load data
  aboutData.value = getSectionData('about') || {}
  personalInfo.value = getPersonalInfo()
  
  // Create social links
  socialLinks.value = [
    { platform: 'LinkedIn', url: personalInfo.value.linkedin, icon: 'linkedin' },
    { platform: 'GitHub', url: personalInfo.value.github, icon: 'github' },
    { platform: 'Email', url: `mailto:${personalInfo.value.email}`, icon: 'email' }
  ].filter(link => link.url)

  await nextTick()
  
  // Animate section title
  createScrollReveal(title.value, {
    delay: 0.2,
    y: 60
  })
  
  // Animate paragraphs with stagger
  if (paragraphs.value.length > 0) {
    paragraphs.value.forEach((paragraph, index) => {
      createScrollReveal(paragraph, {
        delay: 0.3 + index * 0.2,
        y: 40
      })
    })
  }
  
  // Animate skills title
  if (skillsTitle.value) {
    createScrollReveal(skillsTitle.value, {
      delay: 0.5,
      y: 40
    })
  }
  
  // Animate skills grid with stagger
  if (skillsGrid.value) {
    createScrollReveal(skillsGrid.value, {
      delay: 0.6,
      y: 40
    })
    
    // Animate individual skill items
    if (skillItems.value.length > 0) {
      skillItems.value.forEach((skill, index) => {
        createScrollReveal(skill, {
          delay: 0.7 + index * 0.05,
          y: 30,
          opacity: 0
        })
        
        // Add hover interaction
        createHoverInteraction(skill, {
          scale: 1.05,
          duration: 0.2
        })
      })
    }
  }
  
  // Animate info card
  if (infoCard.value) {
    createScrollReveal(infoCard.value, {
      delay: 0.8,
      y: 60
    })
  }
  
  // Create parallax effects for background shapes
  if (shape1.value) {
    createParallax(shape1.value, { speed: 0.3 })
  }
  
  if (shape2.value) {
    createParallax(shape2.value, { speed: 0.2, direction: 'horizontal' })
  }
  
  // Animate floating shapes
  animateFloatingShapes()
}

// Animate floating background shapes
const animateFloatingShapes = () => {
  const shapes = [shape1.value, shape2.value].filter(Boolean)
  
  shapes.forEach((shape, index) => {
    gsap.to(shape, {
      y: 'random(-20, 20)',
      x: 'random(-15, 15)',
      rotation: 'random(-90, 90)',
      duration: `random(4, 8)`,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      delay: index * 0.3
    })
  })
}

onMounted(() => {
  initializeAbout()
})
</script>

<style scoped>
.about-section {
  position: relative;
  overflow: hidden;
}

.about-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: start;
  max-width: 1200px;
  margin: 0 auto;
}

.about-text {
  space-y: 2rem;
}

.about-description {
  margin-bottom: 3rem;
}

.description-paragraph {
  color: var(--text-secondary);
  font-size: 1.1rem;
  line-height: 1.8;
  margin-bottom: 1.5rem;
}

.description-paragraph:last-child {
  margin-bottom: 0;
}

.skills-section {
  margin-top: 3rem;
}

.skills-title {
  font-size: 1.8rem;
  font-weight: 600;
  margin-bottom: 2rem;
  color: var(--text-primary);
}

.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 1rem;
}

.skill-item {
  padding: 1rem;
  text-align: center;
  transition: var(--transition-smooth);
  cursor: default;
}

.skill-text {
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--text-secondary);
  display: block;
}

.about-info {
  position: sticky;
  top: 100px;
}

.info-card {
  padding: 2rem;
  text-align: center;
}

.info-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2rem;
}

.info-avatar {
  margin-bottom: 1.5rem;
}

.avatar-placeholder {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: var(--primary-gradient);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  font-weight: 700;
  color: white;
  box-shadow: 0 8px 32px rgba(102, 126, 234, 0.3);
}

.info-name h3 {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: var(--text-primary);
}

.info-title {
  color: var(--text-secondary);
  font-size: 1rem;
  margin: 0;
}

.info-details {
  text-align: left;
  margin-bottom: 2rem;
}

.info-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
  border-bottom: 1px solid var(--glass-border);
}

.info-item:last-child {
  border-bottom: none;
}

.info-label {
  font-weight: 600;
  color: var(--text-secondary);
  font-size: 0.9rem;
}

.info-value {
  color: var(--text-primary);
  text-decoration: none;
  font-size: 0.9rem;
  transition: var(--transition-smooth);
}

.info-value:hover {
  color: #667eea;
}

.info-social {
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.info-social-link {
  width: 40px;
  height: 40px;
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
  font-size: 1rem;
  font-weight: 600;
  transition: var(--transition-smooth);
}

.info-social-link:hover {
  color: var(--text-primary);
  border-color: rgba(255, 255, 255, 0.5);
  transform: translateY(-2px);
}

.about-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
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
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.05), rgba(118, 75, 162, 0.05));
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.shape-1 {
  width: 300px;
  height: 300px;
  top: 20%;
  right: -100px;
}

.shape-2 {
  width: 200px;
  height: 200px;
  bottom: 20%;
  left: -50px;
}

/* Responsive Design */
@media (max-width: 968px) {
  .about-content {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
  
  .about-info {
    position: relative;
    top: 0;
    max-width: 500px;
    margin: 0 auto;
  }
}

@media (max-width: 768px) {
  .skills-grid {
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    gap: 0.75rem;
  }
  
  .skill-item {
    padding: 0.75rem 0.5rem;
  }
  
  .skill-text {
    font-size: 0.8rem;
  }
  
  .info-card {
    padding: 1.5rem;
  }
  
  .avatar-placeholder {
    width: 80px;
    height: 80px;
    font-size: 1.5rem;
  }
  
  .info-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
    padding: 0.75rem 0;
  }
  
  .shape-1 {
    width: 200px;
    height: 200px;
    right: -50px;
  }
  
  .shape-2 {
    width: 150px;
    height: 150px;
    left: -25px;
  }
}

@media (max-width: 480px) {
  .description-paragraph {
    font-size: 1rem;
  }
  
  .skills-title {
    font-size: 1.5rem;
  }
  
  .info-card {
    padding: 1rem;
  }
}
</style>
