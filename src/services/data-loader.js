import { ref, reactive } from 'vue'

// Global reactive state for portfolio data
const portfolioData = reactive({})
const isLoading = ref(true)
const error = ref(null)

// Available sections that can be rendered
const availableSections = ref([])

/**
 * Load portfolio data from JSON file
 * @returns {Promise<Object>} Portfolio data
 */
export async function loadPortfolioData() {
  try {
    isLoading.value = true
    error.value = null

    // In production, this would be fetched from an API
    // For now, we'll import the JSON directly
    const data = await import('../../data.json')

    // Merge data into reactive object
    Object.assign(portfolioData, data.default)

    // Determine which sections are available
    determineAvailableSections()

    isLoading.value = false
    return portfolioData

  } catch (err) {
    console.error('Error loading portfolio data:', err)
    error.value = 'Failed to load portfolio data'
    isLoading.value = false
    throw err
  }
}

/**
 * Determine which sections have data and should be rendered
 */
function determineAvailableSections() {
  const sections = []

  // Check each section for valid data
  const sectionChecks = [
    { key: 'hero', label: 'Home' },
    { key: 'about', label: 'About' },
    { key: 'skills', label: 'Skills' },
    { key: 'experience', label: 'Experience' },
    { key: 'projects', label: 'Projects' },
    { key: 'services', label: 'Services' },
    { key: 'testimonials', label: 'Testimonials' },
    { key: 'achievements', label: 'Achievements' },
    { key: 'contact', label: 'Contact' }
  ]

  sectionChecks.forEach(section => {
    const sectionData = portfolioData[section.key]

    // Section is available if:
    // - It exists
    // - It's not null
    // - It's not an empty object
    // - It's not an empty array
    if (sectionData &&
      typeof sectionData === 'object' &&
      ((Array.isArray(sectionData) && sectionData.length > 0) ||
        (!Array.isArray(sectionData) && Object.keys(sectionData).length > 0))) {
      sections.push({
        key: section.key,
        label: section.label,
        data: sectionData
      })
    }
  })

  availableSections.value = sections
}

/**
 * Get portfolio data
 * @returns {Object} Current portfolio data
 */
export function getPortfolioData() {
  return portfolioData
}

/**
 * Get available sections for navigation
 * @returns {Array} Array of available sections
 */
export function getAvailableSections() {
  return availableSections.value
}

/**
 * Check if a specific section is available
 * @param {string} sectionKey - Section key to check
 * @returns {boolean} Whether section is available
 */
export function isSectionAvailable(sectionKey) {
  return availableSections.value.some(section => section.key === sectionKey)
}

/**
 * Get loading state
 * @returns {Ref} Loading state ref
 */
export function getLoadingState() {
  return {
    isLoading,
    error
  }
}

/**
 * Get personal information
 * @returns {Object} Personal data
 */
export function getPersonalInfo() {
  return portfolioData.personal || {}
}

/**
 * Get section data by key
 * @param {string} sectionKey - Section key
 * @returns {*} Section data
 */
export function getSectionData(sectionKey) {
  return portfolioData[sectionKey]
}

/**
 * Get resume URL
 * @returns {string|null} Resume URL
 */
export function getResumeUrl() {
  return portfolioData.resume || portfolioData.personal?.resume || null
}
