<template>
  <section 
    id="contact" 
    class="section contact-section"
    ref="contactSection"
  >
    <div class="container">
      <!-- Section Title -->
      <h2 class="section-title" ref="title">Get In Touch</h2>
      
      <div class="contact-content">
        <!-- Contact Text -->
        <div class="contact-text" ref="textContainer">
          <h3 class="contact-heading">{{ contactData.title }}</h3>
          <p class="contact-description">{{ contactData.description }}</p>
          
          <!-- Social Links -->
          <div class="contact-social" ref="socialContainer">
            <a 
              v-for="link in contactData.socialLinks" 
              :key="link.platform"
              :href="link.url"
              class="social-link glass-card"
              :title="link.platform"
              target="_blank"
              rel="noopener noreferrer"
              ref="socialLinks"
            >
              <span class="social-icon">{{ getSocialIcon(link.icon) }}</span>
              <span class="social-text">{{ link.platform }}</span>
            </a>
          </div>
        </div>

        <!-- Contact Form -->
        <div class="contact-form-container" ref="formContainer">
          <form class="contact-form glass-card" @submit.prevent="handleSubmit">
            <div class="form-group" ref="formGroups">
              <label for="name" class="form-label">Name</label>
              <input 
                type="text" 
                id="name" 
                name="name" 
                class="form-input"
                placeholder="Your Name"
                required
                ref="nameInput"
              >
            </div>
            
            <div class="form-group" ref="formGroups">
              <label for="email" class="form-label">Email</label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                class="form-input"
                placeholder="your.email@example.com"
                required
                ref="emailInput"
              >
            </div>
            
            <div class="form-group" ref="formGroups">
              <label for="subject" class="form-label">Subject</label>
              <input 
                type="text" 
                id="subject" 
                name="subject" 
                class="form-input"
                placeholder="What's this about?"
                required
                ref="subjectInput"
              >
            </div>
            
            <div class="form-group" ref="formGroups">
              <label for="message" class="form-label">Message</label>
              <textarea 
                id="message" 
                name="message" 
                class="form-textarea"
                placeholder="Your message here..."
                rows="5"
                required
                ref="messageInput"
              ></textarea>
            </div>
            
            <button 
              type="submit" 
              class="btn btn-primary submit-btn"
              ref="submitBtn"
              :disabled="isSubmitting"
            >
              <span v-if="!isSubmitting">Send Message</span>
              <span v-else>Sending...</span>
            </button>
          </form>
          
          <!-- Success Message -->
          <div 
            v-if="showSuccess" 
            class="success-message glass-card"
            ref="successMessage"
          >
            <div class="success-icon">✓</div>
            <div class="success-text">
              <h4>Message Sent!</h4>
              <p>Thanks for reaching out. I'll get back to you soon.</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Background Elements -->
    <div class="contact-background">
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
import { getSectionData, getPersonalInfo } from '@services/data-loader'
import { 
  createScrollReveal, 
  createHoverInteraction,
  createParallax 
} from '@animations/gsapAnimations'

// Reactive data
const contactData = ref({})
const personalInfo = ref({})
const isSubmitting = ref(false)
const showSuccess = ref(false)

// Template refs
const contactSection = ref(null)
const title = ref(null)
const textContainer = ref(null)
const socialContainer = ref(null)
const socialLinks = ref([])
const formContainer = ref(null)
const formGroups = ref([])
const nameInput = ref(null)
const emailInput = ref(null)
const subjectInput = ref(null)
const messageInput = ref(null)
const submitBtn = ref(null)
const successMessage = ref(null)
const shape1 = ref(null)
const shape2 = ref(null)
const shape3 = ref(null)

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

// Handle form submission
const handleSubmit = async (event) => {
  event.preventDefault()
  
  isSubmitting.value = true
  
  // Simulate form submission
  await new Promise(resolve => setTimeout(resolve, 2000))
  
  isSubmitting.value = false
  showSuccess.value = true
  
  // Reset form
  event.target.reset()
  
  // Hide success message after 5 seconds
  setTimeout(() => {
    showSuccess.value = false
  }, 5000)
}

// Initialize contact section
const initializeContact = async () => {
  // Load data
  contactData.value = getSectionData('contact') || {}
  personalInfo.value = getPersonalInfo()

  await nextTick()
  
  // Animate section title
  createScrollReveal(title.value, {
    delay: 0.2,
    y: 60
  })
  
  // Animate contact text
  if (textContainer.value) {
    createScrollReveal(textContainer.value, {
      delay: 0.3,
      y: 40
    })
  }
  
  // Animate social links with stagger
  if (socialLinks.value.length > 0) {
    socialLinks.value.forEach((link, index) => {
      createScrollReveal(link, {
        delay: 0.4 + index * 0.1,
        y: 30,
        opacity: 0
      })
      
      // Add hover interaction
      createHoverInteraction(link, {
        scale: 1.05,
        duration: 0.2
      })
    })
  }
  
  // Animate form container
  if (formContainer.value) {
    createScrollReveal(formContainer.value, {
      delay: 0.6,
      y: 50
    })
  }
  
  // Animate form groups with stagger
  if (formGroups.value.length > 0) {
    formGroups.value.forEach((group, index) => {
      createScrollReveal(group, {
        delay: 0.7 + index * 0.1,
        y: 30,
        opacity: 0
      })
    })
  }
  
  // Animate submit button
  if (submitBtn.value) {
    createScrollReveal(submitBtn.value, {
      delay: 1.1,
      y: 20,
      opacity: 0
    })
    
    // Add hover interaction
    createHoverInteraction(submitBtn.value, {
      scale: 1.02,
      duration: 0.2
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
      y: 'random(-20, 20)',
      x: 'random(-15, 15)',
      rotation: 'random(-90, 90)',
      duration: `random(5, 10)`,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      delay: index * 0.4
    })
  })
}

onMounted(() => {
  initializeContact()
})
</script>

<style scoped>
.contact-section {
  position: relative;
  overflow: hidden;
}

.contact-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: start;
  max-width: 1200px;
  margin: 0 auto;
}

.contact-text {
  space-y: 2rem;
}

.contact-heading {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 1.5rem;
  line-height: 1.2;
}

.contact-description {
  font-size: 1.1rem;
  color: var(--text-secondary);
  line-height: 1.8;
  margin-bottom: 2.5rem;
}

.contact-social {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.social-link {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.25rem;
  text-decoration: none;
  transition: var(--transition-smooth);
  border: 1px solid var(--glass-border);
}

.social-link:hover {
  border-color: rgba(102, 126, 234, 0.5);
  transform: translateX(5px);
}

.social-icon {
  width: 40px;
  height: 40px;
  background: var(--primary-gradient);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 700;
  font-size: 1.1rem;
  flex-shrink: 0;
}

.social-text {
  color: var(--text-primary);
  font-weight: 600;
  font-size: 1rem;
}

.contact-form-container {
  position: relative;
}

.contact-form {
  padding: 2.5rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-label {
  display: block;
  color: var(--text-primary);
  font-weight: 600;
  margin-bottom: 0.5rem;
  font-size: 0.95rem;
}

.form-input,
.form-textarea {
  width: 100%;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid var(--glass-border);
  border-radius: 10px;
  color: var(--text-primary);
  font-size: 1rem;
  transition: var(--transition-smooth);
  font-family: inherit;
}

.form-input::placeholder,
.form-textarea::placeholder {
  color: var(--text-muted);
}

.form-input:focus,
.form-textarea:focus {
  outline: none;
  border-color: rgba(102, 126, 234, 0.5);
  background: rgba(255, 255, 255, 0.08);
}

.form-textarea {
  resize: vertical;
  min-height: 120px;
}

.submit-btn {
  width: 100%;
  padding: 1rem 2rem;
  font-size: 1rem;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: var(--transition-smooth);
}

.submit-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.success-message {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 2rem;
  text-align: center;
  z-index: 10;
  background: rgba(16, 185, 129, 0.1);
  border: 1px solid rgba(16, 185, 129, 0.3);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}

.success-icon {
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #10b981, #059669);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0 auto 1rem;
}

.success-text h4 {
  color: var(--text-primary);
  font-size: 1.3rem;
  margin-bottom: 0.5rem;
}

.success-text p {
  color: var(--text-secondary);
  font-size: 0.95rem;
}

.contact-background {
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
  top: 10%;
  left: -100px;
}

.shape-2 {
  width: 200px;
  height: 200px;
  bottom: 20%;
  right: -80px;
}

.shape-3 {
  width: 150px;
  height: 150px;
  top: 50%;
  left: 60%;
}

/* Responsive Design */
@media (max-width: 968px) {
  .contact-content {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
  
  .contact-form {
    padding: 2rem;
  }
}

@media (max-width: 768px) {
  .contact-heading {
    font-size: 2rem;
  }
  
  .contact-description {
    font-size: 1rem;
  }
  
  .contact-form {
    padding: 1.5rem;
  }
  
  .form-input,
  .form-textarea {
    padding: 0.875rem;
  }
  
  .social-link {
    padding: 1rem;
  }
  
  .social-icon {
    width: 35px;
    height: 35px;
    font-size: 1rem;
  }
  
  .shape-1 {
    width: 200px;
    height: 200px;
    left: -60px;
  }
  
  .shape-2 {
    width: 150px;
    height: 150px;
    right: -60px;
  }
  
  .shape-3 {
    width: 120px;
    height: 120px;
    left: 50%;
  }
}

@media (max-width: 480px) {
  .contact-form {
    padding: 1rem;
  }
  
  .contact-heading {
    font-size: 1.75rem;
  }
  
  .form-group {
    margin-bottom: 1.25rem;
  }
  
  .success-message {
    padding: 1.5rem;
    width: 90%;
  }
  
  .success-icon {
    width: 50px;
    height: 50px;
    font-size: 1.25rem;
  }
}
</style>
