# HostFolio Template 11 - Next-Level Animated Portfolio

A premium Vue 3 portfolio template with GSAP animations, glassmorphism design, and complete JSON-driven content management.

## 🚀 Features

### Core Architecture
- **Vue 3 Composition API** - Modern, reactive component architecture
- **Vite** - Lightning-fast development and building
- **JSON-Driven** - All content dynamically loaded from `data.json`
- **Conditional Rendering** - Sections appear only if data exists
- **Dynamic Navigation** - Navbar items generated from available sections

### Design & UI
- **Glassmorphism** - Modern frosted glass effects
- **Soft Gradients** - Beautiful color transitions
- **OS-Level Polish** - Premium, desktop-app feel
- **Fully Responsive** - Desktop, Tablet, Mobile optimized
- **Dark Theme** - Professional dark gradient background

### Animations
- **GSAP + ScrollTrigger** - Industry-standard animation library
- **Page Load Intro** - Smooth entrance animations
- **Scroll-Based Reveals** - Content appears as you scroll
- **Text Split Animations** - Character, word, and line animations
- **Hover Micro-interactions** - Delightful user feedback
- **Parallax Effects** - Depth and movement
- **60fps Performance** - Smooth, optimized animations

### Sections (All Optional)
- **Hero** - Impressive landing with animated text
- **About** - Personal info with skills grid
- **Experience** - Timeline with achievements
- **Projects** - Portfolio with hover effects
- **Contact** - Interactive contact form

## 📁 Project Structure

```
src/
├── components/
│   └── Navigation.vue          # Dynamic navbar
├── sections/
│   ├── HeroSection.vue         # Landing section
│   ├── AboutSection.vue       # About & skills
│   ├── ExperienceSection.vue  # Work timeline
│   ├── ProjectsSection.vue    # Portfolio grid
│   └── ContactSection.vue     # Contact form
├── services/
│   └── dataLoader.js          # JSON data management
├── animations/
│   └── gsapAnimations.js      # Animation utilities
├── App.vue                    # Main app component
├── main.js                    # App entry point
└── style.css                  # Global styles
```

## 🛠 Tech Stack

- **Vue 3** - Progressive JavaScript framework
- **Vite** - Build tool and dev server
- **GSAP** - Professional animation library
- **CSS3** - Modern styling with glassmorphism
- **ES6+** - Modern JavaScript features

## 📋 Setup Instructions

### Prerequisites
- Node.js 16+ installed
- npm or yarn package manager

### Installation

1. **Clone or download the template**
   ```bash
   # If using git
   git clone <repository-url>
   cd hostfolio_template_11
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

### Building for Production

```bash
npm run build
# or
yarn build
```

The built files will be in the `dist/` directory.

## 🎨 Customization Guide

### 1. Edit Your Content

All content is managed through `data.json`. Simply edit this file to customize:

```json
{
  "personal": {
    "name": "Your Name",
    "title": "Your Title",
    "email": "your.email@example.com",
    "bio": "Your professional bio..."
  },
  "hero": {
    "greeting": "Hi, I'm",
    "description": "Your hero description..."
  },
  // ... other sections
}
```

### 2. Add/Remove Sections

**To add a section:**
1. Add data to `data.json`
2. Create Vue component in `src/sections/`
3. Import and add to `App.vue`

**To remove a section:**
1. Remove the section data from `data.json`
2. The section will automatically disappear from navigation and page

### 3. Customize Colors

Edit CSS variables in `src/style.css`:

```css
:root {
  --primary-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  --secondary-gradient: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  --dark-gradient: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
}
```

### 4. Modify Animations

Animation settings are in `src/animations/gsapAnimations.js`. You can adjust:
- Animation durations
- Easing functions
- Stagger delays
- Scroll trigger positions

## 📱 Responsive Breakpoints

- **Desktop**: > 968px
- **Tablet**: 768px - 968px
- **Mobile**: < 768px
- **Small Mobile**: < 480px

## 🎯 Performance Features

- **Lazy Loading** - Components load as needed
- **Optimized Animations** - 60fps target
- **Minimal Bundle Size** - Tree-shaking enabled
- **Efficient ScrollTrigger** - Performance-optimized scroll events

## 🔧 Advanced Configuration

### Vite Config

Customize build settings in `vite.config.js`:

```javascript
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      // ... other aliases
    }
  },
  server: {
    port: 3000,
    open: true
  }
})
```

### Environment Variables

Create `.env.local` for environment-specific settings:

```env
VITE_APP_TITLE=My Portfolio
VITE_API_URL=https://your-api.com
```

## 🚀 Deployment

### Netlify
1. Connect your repository
2. Build command: `npm run build`
3. Publish directory: `dist`

### Vercel
1. Import your repository
2. Build command: `npm run build`
3. Output directory: `dist`

### Static Hosting
1. Run `npm run build`
2. Upload `dist/` folder to your hosting provider

## 🎨 Design Principles

This template follows these design principles:

1. **Content First** - Everything driven by data
2. **Performance** - Smooth 60fps animations
3. **Accessibility** - Semantic HTML and keyboard navigation
4. **Responsive** - Works on all devices
5. **Modern** - Latest web standards and best practices

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

## 📄 License

This template is open source and available under the [MIT License](LICENSE).

## 🆘 Support

If you encounter any issues:

1. Check the console for errors
2. Ensure `data.json` is properly formatted
3. Verify all dependencies are installed
4. Clear browser cache and restart dev server

---

**Built with ❤️ using Vue 3 + GSAP**
