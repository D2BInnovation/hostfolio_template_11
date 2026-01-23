<template>
  <section 
    id="experience" 
    class="section experience-section"
    ref="experienceSection"
  >
    <div class="container">
      <!-- Section Title -->
      <h2 class="section-title" ref="title">Experience</h2>
      
      <!-- Timeline -->
      <div class="timeline" ref="timeline">
        <div 
          v-for="(job, index) in experienceData" 
          :key="job.id"
          class="timeline-item"
          :class="{ 'timeline-item--left': index % 2 === 0, 'timeline-item--right': index % 2 === 1 }"
          ref="timelineItems"
        >
          <!-- Timeline Dot -->
          <div class="timeline-dot" ref="timelineDots">
            <div class="dot-inner"></div>
          </div>
          
          <!-- Content Card -->
          <div class="timeline-content glass-card" ref="contentCards">
            <!-- Job Header -->
            <div class="job-header">
              <h3 class="job-title">{{ job.position }}</h3>
              <div class="job-company">
                <span class="company-name">{{ job.company }}</span>
                <span class="job-duration">{{ job.duration }}</span>
              </div>
              <div class="job-location">
                <span class="location-text">{{ job.location }}</span>
              </div>
            </div>
            
            <!-- Job Description -->
            <p class="job-description">{{ job.description }}</p>
            
            <!-- Achievements -->
            <div class="job-achievements" v-if="job.achievements?.length">
              <h4 class="achievements-title">Key Achievements</h4>
              <ul class="achievements-list">
                <li 
                  v-for="(achievement, achIndex) in job.achievements" 
                  :key="achIndex"
                  class="achievement-item"
                >
                  {{ achievement }}
                </li>
              </ul>
            </div>
            
            <!-- Technologies -->
            <div class="job-technologies" v-if="job.technologies?.length">
              <div class="tech-tags">
                <span 
                  v-for="(tech, techIndex) in job.technologies" 
                  :key="techIndex"
                  class="tech-tag"
                >
                  {{ tech }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Background Elements -->
    <div class="experience-background">
      <div class="timeline-line" ref="timelineLine"></div>
      <div class="floating-shapes">
        <div class="shape shape-1" ref="shape1"></div>
        <div class="shape shape-2" ref="shape2"></div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { getSectionData } from '@services/data-loader'
import { 
  createScrollReveal, 
  animateTimeline, 
  createParallax 
} from '@animations/gsapAnimations'

// Reactive data
const experienceData = ref([])

// Template refs
const experienceSection = ref(null)
const title = ref(null)
const timeline = ref(null)
const timelineItems = ref([])
const timelineDots = ref([])
const contentCards = ref([])
const timelineLine = ref(null)
const shape1 = ref(null)
const shape2 = ref(null)

// Initialize experience section
const initializeExperience = async () => {
  // Load data
  experienceData.value = getSectionData('experience') || []

  await nextTick()
  
  // Animate section title
  createScrollReveal(title.value, {
    delay: 0.2,
    y: 60
  })
  
  // Animate timeline line
  if (timelineLine.value) {
    gsap.set(timelineLine.value, { scaleY: 0, transformOrigin: 'top center' })
    
    ScrollTrigger.create({
      trigger: timeline.value,
      start: 'top 70%',
      end: 'bottom 30%',
      onEnter: () => {
        gsap.to(timelineLine.value, {
          scaleY: 1,
          duration: 1.5,
          ease: 'power2.out'
        })
      }
    })
  }
  
  // Animate timeline items with stagger
  if (timelineItems.value.length > 0) {
    animateTimeline(timelineItems.value)
  }
  
  // Animate timeline dots with pulse effect
  if (timelineDots.value.length > 0) {
    timelineDots.value.forEach((dot, index) => {
      createScrollReveal(dot, {
        delay: 0.5 + index * 0.2,
        scale: 0,
        opacity: 0
      })
      
      // Add continuous pulse animation
      gsap.to(dot.querySelector('.dot-inner'), {
        scale: 1.2,
        opacity: 0.8,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: index * 0.3
      })
    })
  }
  
  // Animate content cards
  if (contentCards.value.length > 0) {
    contentCards.value.forEach((card, index) => {
      createScrollReveal(card, {
        delay: 0.6 + index * 0.2,
        y: 80,
        opacity: 0
      })
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
      y: 'random(-15, 15)',
      x: 'random(-10, 10)',
      rotation: 'random(-60, 60)',
      duration: `random(5, 10)`,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      delay: index * 0.4
    })
  })
}

onMounted(() => {
  initializeExperience()
})
</script>

<style scoped>
.experience-section {
  position: relative;
  overflow: hidden;
}

.timeline {
  position: relative;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 0;
}

.timeline-item {
  position: relative;
  display: flex;
  align-items: center;
  margin-bottom: 4rem;
  min-height: 200px;
}

.timeline-item--left {
  justify-content: flex-start;
}

.timeline-item--right {
  justify-content: flex-end;
}

.timeline-dot {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 20px;
  height: 20px;
  z-index: 10;
}

.dot-inner {
  width: 100%;
  height: 100%;
  background: var(--primary-gradient);
  border-radius: 50%;
  border: 3px solid rgba(255, 255, 255, 0.9);
  box-shadow: 0 0 20px rgba(102, 126, 234, 0.5);
}

.timeline-content {
  width: 45%;
  padding: 2rem;
  position: relative;
}

.timeline-item--left .timeline-content {
  margin-right: auto;
  margin-left: 0;
}

.timeline-item--right .timeline-content {
  margin-left: auto;
  margin-right: 0;
}

.job-header {
  margin-bottom: 1.5rem;
}

.job-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
}

.job-company {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.company-name {
  font-size: 1.1rem;
  font-weight: 600;
  color: #667eea;
}

.job-duration {
  font-size: 0.9rem;
  color: var(--text-muted);
  font-weight: 500;
}

.job-location {
  margin-bottom: 1rem;
}

.location-text {
  font-size: 0.9rem;
  color: var(--text-secondary);
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.location-text::before {
  content: '📍';
  font-size: 0.8rem;
}

.job-description {
  color: var(--text-secondary);
  line-height: 1.7;
  margin-bottom: 1.5rem;
  font-size: 1rem;
}

.job-achievements {
  margin-bottom: 1.5rem;
}

.achievements-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 1rem;
}

.achievements-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.achievement-item {
  position: relative;
  padding-left: 1.5rem;
  margin-bottom: 0.75rem;
  color: var(--text-secondary);
  line-height: 1.6;
}

.achievement-item::before {
  content: '✓';
  position: absolute;
  left: 0;
  color: #667eea;
  font-weight: 700;
}

.job-technologies {
  margin-top: 1.5rem;
}

.tech-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tech-tag {
  background: rgba(102, 126, 234, 0.2);
  color: #667eea;
  padding: 0.4rem 0.8rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
  border: 1px solid rgba(102, 126, 234, 0.3);
  transition: var(--transition-smooth);
}

.tech-tag:hover {
  background: rgba(102, 126, 234, 0.3);
  transform: translateY(-2px);
}

.experience-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
  pointer-events: none;
}

.timeline-line {
  position: absolute;
  left: 50%;
  top: 0;
  bottom: 0;
  width: 2px;
  background: linear-gradient(
    to bottom,
    transparent 0%,
    rgba(102, 126, 234, 0.3) 10%,
    rgba(102, 126, 234, 0.3) 90%,
    transparent 100%
  );
  transform: translateX(-50%);
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
  width: 250px;
  height: 250px;
  top: 10%;
  left: -100px;
}

.shape-2 {
  width: 180px;
  height: 180px;
  bottom: 15%;
  right: -80px;
}

/* Responsive Design */
@media (max-width: 968px) {
  .timeline-item {
    justify-content: flex-start !important;
  }
  
  .timeline-content {
    width: calc(100% - 80px);
    margin-left: 80px !important;
    margin-right: 0 !important;
  }
  
  .timeline-dot {
    left: 40px;
    transform: translateX(-50%);
  }
  
  .timeline-line {
    left: 40px;
  }
}

@media (max-width: 768px) {
  .timeline-content {
    padding: 1.5rem;
  }
  
  .job-title {
    font-size: 1.3rem;
  }
  
  .company-name {
    font-size: 1rem;
  }
  
  .job-company {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.25rem;
  }
  
  .tech-tags {
    gap: 0.4rem;
  }
  
  .tech-tag {
    font-size: 0.75rem;
    padding: 0.3rem 0.6rem;
  }
  
  .shape-1 {
    width: 180px;
    height: 180px;
    left: -60px;
  }
  
  .shape-2 {
    width: 140px;
    height: 140px;
    right: -60px;
  }
}

@media (max-width: 480px) {
  .timeline-item {
    margin-bottom: 3rem;
    min-height: auto;
  }
  
  .timeline-content {
    width: calc(100% - 60px);
    margin-left: 60px !important;
    padding: 1rem;
  }
  
  .timeline-dot {
    left: 30px;
    width: 16px;
    height: 16px;
  }
  
  .timeline-line {
    left: 30px;
  }
  
  .job-title {
    font-size: 1.2rem;
  }
  
  .achievement-item {
    font-size: 0.9rem;
  }
}
</style>
