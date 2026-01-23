<template>
  <section 
    id="projects" 
    class="section projects-section"
    ref="projectsSection"
  >
    <div class="container">
      <!-- Section Title -->
      <h2 class="section-title" ref="title">Projects</h2>
      
      <!-- Projects Grid -->
      <div class="projects-grid" ref="projectsGrid">
        <div 
          v-for="(project, index) in projectsData" 
          :key="project.id"
          class="project-card glass-card"
          :class="{ 'project-card--featured': project.featured }"
          ref="projectCards"
        >
          <!-- Project Image -->
          <div class="project-image" ref="projectImages">
            <div class="image-placeholder">
              <span class="project-icon">🚀</span>
            </div>
            <div class="image-overlay">
              <div class="overlay-content">
                <a 
                  v-if="project.liveUrl"
                  :href="project.liveUrl"
                  class="overlay-btn"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>View Live</span>
                  <span class="btn-arrow">→</span>
                </a>
                <a 
                  :href="project.githubUrl"
                  class="overlay-btn"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>View Code</span>
                  <span class="btn-arrow">→</span>
                </a>
              </div>
            </div>
          </div>
          
          <!-- Project Content -->
          <div class="project-content" ref="projectContent">
            <!-- Featured Badge -->
            <div 
              v-if="project.featured" 
              class="featured-badge"
              ref="featuredBadges"
            >
              <span class="badge-text">Featured</span>
            </div>
            
            <!-- Project Title -->
            <h3 class="project-title">{{ project.title }}</h3>
            
            <!-- Project Description -->
            <p class="project-description">{{ project.description }}</p>
            
            <!-- Technologies -->
            <div class="project-technologies">
              <div class="tech-tags">
                <span 
                  v-for="(tech, techIndex) in project.technologies" 
                  :key="techIndex"
                  class="tech-tag"
                >
                  {{ tech }}
                </span>
              </div>
            </div>
            
            <!-- Project Links -->
            <div class="project-links">
              <a 
                v-if="project.liveUrl"
                :href="project.liveUrl"
                class="project-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span class="link-text">Live Demo</span>
                <span class="link-icon">🔗</span>
              </a>
              <a 
                :href="project.githubUrl"
                class="project-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span class="link-text">Source Code</span>
                <span class="link-icon">⚡</span>
              </a>
            </div>
          </div>
        </div>
      </div>
      
      <!-- View All Projects Button -->
      <div class="projects-cta" ref="ctaSection" v-if="projectsData.length > 3">
        <a href="#" class="btn btn-primary">
          View All Projects
        </a>
      </div>
    </div>

    <!-- Background Elements -->
    <div class="projects-background">
      <div class="floating-shapes">
        <div class="shape shape-1" ref="shape1"></div>
        <div class="shape shape-2" ref="shape2"></div>
        <div class="shape shape-3" ref="shape3"></div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { getSectionData } from '@services/data-loader'
import { 
  createScrollReveal, 
  createHoverInteraction,
  createParallax 
} from '@animations/gsapAnimations'

// Reactive data
const projectsData = ref([])

// Template refs
const projectsSection = ref(null)
const title = ref(null)
const projectsGrid = ref(null)
const projectCards = ref([])
const projectImages = ref([])
const projectContent = ref([])
const featuredBadges = ref([])
const ctaSection = ref(null)
const shape1 = ref(null)
const shape2 = ref(null)
const shape3 = ref(null)

// Initialize projects section
const initializeProjects = async () => {
  // Load data
  projectsData.value = getSectionData('projects') || []

  await nextTick()
  
  // Animate section title
  createScrollReveal(title.value, {
    delay: 0.2,
    y: 60
  })
  
  // Animate projects grid
  if (projectsGrid.value) {
    createScrollReveal(projectsGrid.value, {
      delay: 0.3,
      y: 40
    })
  }
  
  // Animate project cards with stagger
  if (projectCards.value.length > 0) {
    projectCards.value.forEach((card, index) => {
      createScrollReveal(card, {
        delay: 0.4 + index * 0.15,
        y: 80,
        opacity: 0
      })
      
      // Add hover interaction to cards
      createHoverInteraction(card, {
        scale: 1.02,
        duration: 0.3
      })
    })
  }
  
  // Animate project images with parallax
  if (projectImages.value.length > 0) {
    projectImages.value.forEach((image, index) => {
      createParallax(image, { speed: 0.1 })
    })
  }
  
  // Animate featured badges
  if (featuredBadges.value.length > 0) {
    featuredBadges.value.forEach((badge, index) => {
      createScrollReveal(badge, {
        delay: 0.6 + index * 0.1,
        scale: 0,
        opacity: 0
      })
    })
  }
  
  // Animate CTA section
  if (ctaSection.value) {
    createScrollReveal(ctaSection.value, {
      delay: 0.8,
      y: 40
    })
  }
  
  // Create parallax effects for background shapes
  if (shape1.value) {
    createParallax(shape1.value, { speed: 0.3 })
  }
  
  if (shape2.value) {
    createParallax(shape2.value, { speed: 0.2, direction: 'horizontal' })
  }
  
  if (shape3.value) {
    createParallax(shape3.value, { speed: 0.15 })
  }
  
  // Animate floating shapes
  animateFloatingShapes()
}

// Animate floating background shapes
const animateFloatingShapes = () => {
  const shapes = [shape1.value, shape2.value, shape3.value].filter(Boolean)
  
  shapes.forEach((shape, index) => {
    gsap.to(shape, {
      y: 'random(-25, 25)',
      x: 'random(-15, 15)',
      rotation: 'random(-120, 120)',
      duration: `random(6, 12)`,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      delay: index * 0.5
    })
  })
}

onMounted(() => {
  initializeProjects()
})
</script>

<style scoped>
.projects-section {
  position: relative;
  overflow: hidden;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.project-card {
  overflow: hidden;
  transition: var(--transition-smooth);
  position: relative;
}

.project-card--featured {
  grid-column: span 2;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1));
  border: 1px solid rgba(102, 126, 234, 0.3);
}

.project-image {
  position: relative;
  height: 200px;
  overflow: hidden;
  border-radius: 15px 15px 0 0;
}

.image-placeholder {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.2), rgba(118, 75, 162, 0.2));
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
}

.project-icon {
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(30, 60, 114, 0.9);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: var(--transition-smooth);
}

.project-card:hover .image-overlay {
  opacity: 1;
}

.overlay-content {
  display: flex;
  gap: 1rem;
}

.overlay-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: var(--primary-gradient);
  color: white;
  text-decoration: none;
  border-radius: 25px;
  font-weight: 600;
  transition: var(--transition-bounce);
}

.overlay-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
}

.btn-arrow {
  transition: var(--transition-smooth);
}

.overlay-btn:hover .btn-arrow {
  transform: translateX(3px);
}

.project-content {
  padding: 2rem;
  position: relative;
}

.featured-badge {
  position: absolute;
  top: -10px;
  right: 20px;
  background: var(--primary-gradient);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
}

.project-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 1rem;
  line-height: 1.3;
}

.project-description {
  color: var(--text-secondary);
  line-height: 1.7;
  margin-bottom: 1.5rem;
  font-size: 0.95rem;
}

.project-technologies {
  margin-bottom: 1.5rem;
}

.tech-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tech-tag {
  background: rgba(102, 126, 234, 0.15);
  color: #667eea;
  padding: 0.4rem 0.8rem;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: 500;
  border: 1px solid rgba(102, 126, 234, 0.2);
  transition: var(--transition-smooth);
}

.tech-tag:hover {
  background: rgba(102, 126, 234, 0.25);
  transform: translateY(-1px);
}

.project-links {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.project-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--text-secondary);
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 500;
  transition: var(--transition-smooth);
  padding: 0.5rem 1rem;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.05);
}

.project-link:hover {
  color: var(--text-primary);
  background: rgba(255, 255, 255, 0.1);
  transform: translateY(-2px);
}

.link-icon {
  font-size: 1rem;
}

.projects-cta {
  text-align: center;
  margin-top: 4rem;
}

.projects-background {
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
  width: 280px;
  height: 280px;
  top: 15%;
  right: -100px;
}

.shape-2 {
  width: 200px;
  height: 200px;
  bottom: 25%;
  left: -80px;
}

.shape-3 {
  width: 150px;
  height: 150px;
  top: 60%;
  right: 20%;
}

/* Responsive Design */
@media (max-width: 968px) {
  .projects-grid {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  }
  
  .project-card--featured {
    grid-column: span 1;
  }
}

@media (max-width: 768px) {
  .projects-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .project-content {
    padding: 1.5rem;
  }
  
  .project-title {
    font-size: 1.3rem;
  }
  
  .project-description {
    font-size: 0.9rem;
  }
  
  .overlay-content {
    flex-direction: column;
    gap: 0.75rem;
  }
  
  .overlay-btn {
    padding: 0.6rem 1.2rem;
    font-size: 0.9rem;
  }
  
  .project-links {
    flex-direction: column;
    gap: 0.75rem;
  }
  
  .project-link {
    justify-content: center;
  }
  
  .shape-1 {
    width: 200px;
    height: 200px;
    right: -60px;
  }
  
  .shape-2 {
    width: 150px;
    height: 150px;
    left: -60px;
  }
  
  .shape-3 {
    width: 120px;
    height: 120px;
    right: 10%;
  }
}

@media (max-width: 480px) {
  .project-image {
    height: 150px;
  }
  
  .project-icon {
    font-size: 2rem;
  }
  
  .project-content {
    padding: 1rem;
  }
  
  .project-title {
    font-size: 1.2rem;
  }
  
  .tech-tags {
    gap: 0.4rem;
  }
  
  .tech-tag {
    font-size: 0.75rem;
    padding: 0.3rem 0.6rem;
  }
}
</style>
