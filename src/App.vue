<template>
  <div id="app" ref="appContainer">
    <!-- Loading State -->
    <div v-if="isLoading" class="loading-screen">
      <div class="loading-content">
        <div class="loading-spinner"></div>
        <p>Loading amazing content...</p>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="error-screen">
      <div class="error-content">
        <h2>Oops! Something went wrong</h2>
        <p>{{ error }}</p>
        <button @click="loadData" class="btn btn-primary">Try Again</button>
      </div>
    </div>

    <!-- Main App Content -->
    <template v-else>
      <!-- Navigation -->
      <Navigation v-if="availableSections.length > 0" />
      
      <!-- Main Content -->
      <main class="main-content">
        <!-- Hero Section -->
        <HeroSection v-if="isSectionAvailable('hero')" />
        
        <!-- About Section -->
        <AboutSection v-if="isSectionAvailable('about')" />
        
        <!-- Experience Section -->
        <ExperienceSection v-if="isSectionAvailable('experience')" />
        
        <!-- Projects Section -->
        <ProjectsSection v-if="isSectionAvailable('projects')" />
        
        <!-- Contact Section -->
        <ContactSection v-if="isSectionAvailable('contact')" />
      </main>

      <!-- Footer -->
      <footer class="footer" v-if="personalInfo.name">
        <div class="container">
          <div class="footer-content">
            <p>&copy; {{ currentYear }} {{ personalInfo.name }}. All rights reserved.</p>
            <div class="footer-links">
              <a 
                v-if="personalInfo.github" 
                :href="personalInfo.github"
                target="_blank"
                rel="noopener noreferrer"
                class="footer-link"
              >
                GitHub
              </a>
              <a 
                v-if="personalInfo.linkedin" 
                :href="personalInfo.linkedin"
                target="_blank"
                rel="noopener noreferrer"
                class="footer-link"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </footer>
    </template>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import Navigation from '@components/Navigation.vue'
import HeroSection from '@sections/HeroSection.vue'
import AboutSection from '@sections/AboutSection.vue'
import ExperienceSection from '@sections/ExperienceSection.vue'
import ProjectsSection from '@sections/ProjectsSection.vue'
import ContactSection from '@sections/ContactSection.vue'
import { 
  loadPortfolioData, 
  getAvailableSections, 
  isSectionAvailable,
  getPersonalInfo,
  getLoadingState 
} from '@services/data-loader'
import { pageLoadIntro, cleanupAnimations } from '@animations/gsapAnimations'

// Reactive data
const availableSections = ref([])
const personalInfo = ref({})
const currentYear = ref(new Date().getFullYear())

// Get loading state
const { isLoading, error } = getLoadingState()

// Template refs
const appContainer = ref(null)

// Load data
const loadData = async () => {
  try {
    await loadPortfolioData()
    availableSections.value = getAvailableSections()
    personalInfo.value = getPersonalInfo()
    
    // Initialize page load animation
    if (appContainer.value) {
      pageLoadIntro(appContainer.value)
    }
  } catch (err) {
    console.error('Failed to load portfolio data:', err)
  }
}

onMounted(async () => {
  await loadData()
  
  // Add smooth scroll behavior
  document.documentElement.style.scrollBehavior = 'smooth'
})

onUnmounted(() => {
  // Cleanup animations
  cleanupAnimations()
})
</script>

<style scoped>
#app {
  min-height: 100vh;
  background: var(--dark-gradient);
  position: relative;
}

.loading-screen,
.error-screen {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: var(--dark-gradient);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.loading-content,
.error-content {
  text-align: center;
  color: var(--text-primary);
}

.loading-spinner {
  width: 50px;
  height: 50px;
  border: 3px solid var(--glass-border);
  border-top: 3px solid #667eea;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 1rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.error-content h2 {
  font-size: 2rem;
  margin-bottom: 1rem;
  color: #ef4444;
}

.error-content p {
  margin-bottom: 2rem;
  color: var(--text-secondary);
}

.main-content {
  padding-top: 80px; /* Account for fixed navbar */
}

.footer {
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-top: 1px solid var(--glass-border);
  padding: 2rem 0;
  margin-top: 4rem;
}

.footer-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: var(--text-secondary);
  font-size: 0.9rem;
}

.footer-links {
  display: flex;
  gap: 1.5rem;
}

.footer-link {
  color: var(--text-secondary);
  text-decoration: none;
  transition: var(--transition-smooth);
}

.footer-link:hover {
  color: var(--text-primary);
}

/* Responsive Design */
@media (max-width: 768px) {
  .footer-content {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
  
  .footer-links {
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .main-content {
    padding-top: 70px;
  }
}
</style>
