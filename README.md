# HostFolio Template 10 - Three.js 3D Interactive Portfolio

A stunning 3D interactive portfolio built with Three.js, featuring immersive 3D experiences, particle systems, and interactive animations.

## 🎨 Design Features

- **3D Scene**: Interactive Three.js canvas background
- **Particle Systems**: Floating particles with mouse interaction
- **3D Models**: Display projects as 3D cards in space
- **GSAP Scroll**: Smooth scroll-triggered 3D animations
- **Shader Effects**: Custom GLSL shaders for unique visuals
- **Responsive 3D**: Adapts to all screen sizes
- **Performance Optimized**: Efficient rendering with LOD

## 🚀 Tech Stack

- **Framework**: Vanilla JavaScript (ES6+)
- **3D Engine**: Three.js r158
- **Animation**: GSAP 3 + ScrollTrigger
- **Styling**: Custom CSS3
- **Build Tool**: Vite
- **Module Bundler**: ESM

## 📦 Installation

```bash
# Create project directory
mkdir hostfolio_template_10
cd hostfolio_template_10

# Initialize npm project
npm init -y

# Install dependencies
npm install three gsap

# Install dev dependencies
npm install -D vite

# Create project structure
mkdir -p src/{js,css,assets,shaders}
mkdir public

# Copy files (provided below)
```

## 📁 Project Structure

```
hostfolio_template_10/
├── index.html              # Main HTML file
├── src/
│   ├── js/
│   │   ├── main.js         # Main entry point
│   │   ├── scene.js        # Three.js scene setup
│   │   ├── particles.js    # Particle system
│   │   ├── projects.js     # 3D project cards
│   │   ├── animations.js   # GSAP animations
│   │   └── utils.js        # Helper functions
│   ├── css/
│   │   ├── style.css       # Main styles
│   │   ├── layout.css      # Layout styles
│   │   └── responsive.css  # Media queries
│   ├── shaders/
│   │   ├── vertex.glsl     # Vertex shader
│   │   └── fragment.glsl   # Fragment shader
│   └── assets/
│       └── models/         # 3D models (optional)
├── public/
│   ├── data.json           # Portfolio data
│   └── images/             # Project images
├── package.json
└── vite.config.js
```

## 🎮 3D Features Breakdown

### 1. **Hero Section - 3D Particles**

Animated particle system that reacts to mouse movement:

```javascript
// src/js/particles.js
import * as THREE from 'three';

export class ParticleSystem {
  constructor(scene) {
    this.scene = scene;
    this.particles = null;
    this.init();
  }

  init() {
    const count = 5000;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    for (let i = 0; i < count * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 100;
      positions[i + 1] = (Math.random() - 0.5) * 100;
      positions[i + 2] = (Math.random() - 0.5) * 100;

      colors[i] = Math.random();
      colors[i + 1] = Math.random();
      colors[i + 2] = Math.random();
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.1,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending
    });

    this.particles = new THREE.Points(geometry, material);
    this.scene.add(this.particles);
  }

  animate(time, mouse) {
    if (this.particles) {
      this.particles.rotation.y = time * 0.0001;
      this.particles.rotation.x = mouse.y * 0.0001;
      this.particles.position.x = mouse.x * 0.001;
    }
  }
}
```

### 2. **About Section - 3D Text & Skills Orbs**

Floating 3D text with rotating skill orbs:

```javascript
// src/js/skills.js
import * as THREE from 'three';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';

export class SkillOrbs {
  constructor(scene, skills) {
    this.scene = scene;
    this.skills = skills;
    this.orbs = [];
    this.init();
  }

  init() {
    const radius = 5;
    const orbGeometry = new THREE.SphereGeometry(0.3, 32, 32);

    this.skills.forEach((skill, index) => {
      const angle = (index / this.skills.length) * Math.PI * 2;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;

      const material = new THREE.MeshPhongMaterial({
        color: new THREE.Color().setHSL(index / this.skills.length, 1, 0.5),
        emissive: 0x404040,
        shininess: 100
      });

      const orb = new THREE.Mesh(orbGeometry, material);
      orb.position.set(x, 0, z);
      orb.userData = { skill };

      this.scene.add(orb);
      this.orbs.push(orb);
    });
  }

  animate(time) {
    this.orbs.forEach((orb, index) => {
      const angle = time * 0.001 + (index / this.orbs.length) * Math.PI * 2;
      orb.position.x = Math.cos(angle) * 5;
      orb.position.z = Math.sin(angle) * 5;
      orb.position.y = Math.sin(time * 0.002 + index) * 0.5;
      orb.rotation.y += 0.01;
    });
  }
}
```

### 3. **Projects Section - 3D Cards in Space**

Interactive 3D project cards:

```javascript
// src/js/projects.js
import * as THREE from 'three';

export class Project3D {
  constructor(scene, data, index) {
    this.scene = scene;
    this.data = data;
    this.mesh = null;
    this.init(index);
  }

  init(index) {
    const geometry = new THREE.BoxGeometry(4, 3, 0.2);
    
    const materials = [
      new THREE.MeshPhongMaterial({ color: 0x333333 }), // sides
      new THREE.MeshPhongMaterial({ color: 0x333333 }),
      new THREE.MeshPhongMaterial({ color: 0x333333 }),
      new THREE.MeshPhongMaterial({ color: 0x333333 }),
      new THREE.MeshBasicMaterial({ 
        map: this.loadTexture(this.data.image),
        transparent: true
      }), // front
      new THREE.MeshPhongMaterial({ color: 0x222222 }) // back
    ];

    this.mesh = new THREE.Mesh(geometry, materials);
    
    // Position cards in a grid
    const spacing = 5;
    this.mesh.position.x = (index % 3) * spacing - spacing;
    this.mesh.position.y = Math.floor(index / 3) * -spacing;
    this.mesh.position.z = -10;

    this.scene.add(this.mesh);
  }

  loadTexture(url) {
    const loader = new THREE.TextureLoader();
    return loader.load(url || '/images/placeholder.jpg');
  }

  onHover() {
    gsap.to(this.mesh.position, {
      z: -8,
      duration: 0.5,
      ease: 'power2.out'
    });
    gsap.to(this.mesh.rotation, {
      y: Math.PI * 0.1,
      duration: 0.5
    });
  }

  onLeave() {
    gsap.to(this.mesh.position, {
      z: -10,
      duration: 0.5
    });
    gsap.to(this.mesh.rotation, {
      y: 0,
      duration: 0.5
    });
  }
}
```

### 4. **Main Scene Setup**

```javascript
// src/js/scene.js
import * as THREE from 'three';

export class SceneManager {
  constructor() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.renderer = new THREE.WebGLRenderer({
      canvas: document.querySelector('#canvas'),
      antialias: true,
      alpha: true
    });
    
    this.init();
  }

  init() {
    // Setup renderer
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // Setup camera
    this.camera.position.z = 15;

    // Add lights
    this.addLights();

    // Handle resize
    window.addEventListener('resize', () => this.onResize());
  }

  addLights() {
    // Ambient light
    const ambient = new THREE.AmbientLight(0xffffff, 0.5);
    this.scene.add(ambient);

    // Directional light
    const directional = new THREE.DirectionalLight(0xffffff, 0.8);
    directional.position.set(10, 10, 10);
    directional.castShadow = true;
    this.scene.add(directional);

    // Point lights for atmosphere
    const pointLight1 = new THREE.PointLight(0xff00ff, 1, 100);
    pointLight1.position.set(-10, 5, 5);
    this.scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x00ffff, 1, 100);
    pointLight2.position.set(10, -5, 5);
    this.scene.add(pointLight2);
  }

  onResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  render() {
    this.renderer.render(this.scene, this.camera);
  }
}
```

### 5. **Main Entry Point**

```javascript
// src/js/main.js
import { SceneManager } from './scene.js';
import { ParticleSystem } from './particles.js';
import { SkillOrbs } from './skills.js';
import { Project3D } from './projects.js';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

class Portfolio {
  constructor() {
    this.sceneManager = null;
    this.particles = null;
    this.skillOrbs = null;
    this.projects = [];
    this.mouse = { x: 0, y: 0 };
    this.data = null;
    
    this.init();
  }

  async init() {
    // Load data
    this.data = await this.loadData();

    // Setup 3D scene
    this.sceneManager = new SceneManager();
    
    // Add particles
    this.particles = new ParticleSystem(this.sceneManager.scene);

    // Add skill orbs
    this.skillOrbs = new SkillOrbs(
      this.sceneManager.scene,
      this.data.about.skills
    );

    // Add projects
    this.data.projects.forEach((project, index) => {
      const project3D = new Project3D(
        this.sceneManager.scene,
        project,
        index
      );
      this.projects.push(project3D);
    });

    // Setup mouse tracking
    this.setupMouseTracking();

    // Setup scroll animations
    this.setupScrollAnimations();

    // Start animation loop
    this.animate();

    // Populate HTML content
    this.populateContent();
  }

  async loadData() {
    const response = await fetch('/data.json');
    return await response.json();
  }

  setupMouseTracking() {
    window.addEventListener('mousemove', (e) => {
      this.mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      this.mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    });
  }

  setupScrollAnimations() {
    // Hero to About transition
    ScrollTrigger.create({
      trigger: '#about',
      start: 'top center',
      end: 'bottom center',
      onEnter: () => {
        gsap.to(this.sceneManager.camera.position, {
          x: 5,
          y: 0,
          duration: 1.5
        });
      },
      onLeaveBack: () => {
        gsap.to(this.sceneManager.camera.position, {
          x: 0,
          y: 0,
          duration: 1.5
        });
      }
    });

    // Projects section
    ScrollTrigger.create({
      trigger: '#projects',
      start: 'top center',
      end: 'bottom center',
      onEnter: () => {
        gsap.to(this.sceneManager.camera.position, {
          y: -5,
          z: 12,
          duration: 1.5
        });
      }
    });
  }

  populateContent() {
    // Hero section
    document.querySelector('#hero h1').textContent = 
      `${this.data.hero.greeting} ${this.data.personal.name}`;
    document.querySelector('#hero p').textContent = 
      this.data.hero.description;

    // About section
    document.querySelector('#about .bio').textContent = 
      this.data.personal.bio;

    // Projects list
    const projectsList = document.querySelector('#projects-list');
    this.data.projects.forEach((project, index) => {
      const card = document.createElement('div');
      card.className = 'project-card';
      card.innerHTML = `
        <h3>${project.title}</h3>
        <p>${project.description}</p>
        <div class="tech-tags">
          ${project.technologies.map(tech => 
            `<span class="tag">${tech}</span>`
          ).join('')}
        </div>
      `;
      
      // Add hover interaction
      card.addEventListener('mouseenter', () => {
        this.projects[index].onHover();
      });
      card.addEventListener('mouseleave', () => {
        this.projects[index].onLeave();
      });

      projectsList.appendChild(card);
    });
  }

  animate() {
    requestAnimationFrame(() => this.animate());

    const time = Date.now();

    // Animate particles
    if (this.particles) {
      this.particles.animate(time, this.mouse);
    }

    // Animate skill orbs
    if (this.skillOrbs) {
      this.skillOrbs.animate(time);
    }

    // Render scene
    this.sceneManager.render();
  }
}

// Initialize portfolio
new Portfolio();
```

## 🎨 HTML Structure

```html
<!-- index.html -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>3D Portfolio | Your Name</title>
  <link rel="stylesheet" href="/src/css/style.css">
</head>
<body>
  <!-- Three.js Canvas (Background) -->
  <canvas id="canvas"></canvas>

  <!-- Content Overlay -->
  <div class="content">
    <!-- Navigation -->
    <nav class="navbar">
      <div class="logo">Portfolio</div>
      <ul class="nav-links">
        <li><a href="#hero">Home</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#projects">Projects</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </nav>

    <!-- Hero Section -->
    <section id="hero">
      <div class="hero-content">
        <h1>Hi, I'm Your Name</h1>
        <p>Full Stack Developer</p>
        <div class="hero-buttons">
          <a href="#projects" class="btn btn-primary">View Work</a>
          <a href="#contact" class="btn btn-secondary">Contact</a>
        </div>
      </div>
    </section>

    <!-- About Section -->
    <section id="about">
      <h2>About Me</h2>
      <p class="bio"></p>
      <div id="skills-3d">
        <!-- 3D skill orbs render here -->
      </div>
    </section>

    <!-- Projects Section -->
    <section id="projects">
      <h2>My Projects</h2>
      <div id="projects-list">
        <!-- Project cards populate here -->
      </div>
    </section>

    <!-- Contact Section -->
    <section id="contact">
      <h2>Get In Touch</h2>
      <form class="contact-form">
        <input type="text" placeholder="Name" required>
        <input type="email" placeholder="Email" required>
        <textarea placeholder="Message" required></textarea>
        <button type="submit" class="btn btn-primary">Send</button>
      </form>
    </section>
  </div>

  <script type="module" src="/src/js/main.js"></script>
</body>
</html>
```

## 🎨 CSS Styling

```css
/* src/css/style.css */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Inter', sans-serif;
  color: #ffffff;
  overflow-x: hidden;
  background: #000000;
}

#canvas {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
}

.content {
  position: relative;
  z-index: 1;
}

/* Navbar */
.navbar {
  position: fixed;
  top: 0;
  width: 100%;
  padding: 2rem 5%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(10px);
  z-index: 100;
}

.logo {
  font-size: 1.5rem;
  font-weight: bold;
  background: linear-gradient(45deg, #ff00ff, #00ffff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.nav-links {
  display: flex;
  gap: 2rem;
  list-style: none;
}

.nav-links a {
  color: #ffffff;
  text-decoration: none;
  transition: color 0.3s;
}

.nav-links a:hover {
  color: #ff00ff;
}

/* Sections */
section {
  min-height: 100vh;
  padding: 8rem 5%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

h2 {
  font-size: 3rem;
  margin-bottom: 2rem;
  background: linear-gradient(45deg, #ff00ff, #00ffff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* Hero */
#hero {
  text-align: center;
}

#hero h1 {
  font-size: 4rem;
  margin-bottom: 1rem;
  animation: fadeInUp 1s ease-out;
}

#hero p {
  font-size: 1.5rem;
  margin-bottom: 2rem;
  opacity: 0.8;
  animation: fadeInUp 1s ease-out 0.2s both;
}

.hero-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  animation: fadeInUp 1s ease-out 0.4s both;
}

.btn {
  padding: 1rem 2rem;
  border-radius: 50px;
  text-decoration: none;
  font-weight: 600;
  transition: transform 0.3s, box-shadow 0.3s;
}

.btn-primary {
  background: linear-gradient(45deg, #ff00ff, #00ffff);
  color: #ffffff;
}

.btn-secondary {
  border: 2px solid #ffffff;
  color: #ffffff;
}

.btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 30px rgba(255, 0, 255, 0.5);
}

/* Projects */
#projects-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.project-card {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 2rem;
  transition: transform 0.3s, border-color 0.3s;
  cursor: pointer;
}

.project-card:hover {
  transform: translateY(-10px);
  border-color: #ff00ff;
}

.project-card h3 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #ffffff;
}

.tech-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
}

.tag {
  padding: 0.3rem 0.8rem;
  background: rgba(255, 0, 255, 0.2);
  border-radius: 20px;
  font-size: 0.85rem;
}

/* Contact Form */
.contact-form {
  max-width: 600px;
  margin: 2rem auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.contact-form input,
.contact-form textarea {
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  color: #ffffff;
  font-family: inherit;
}

.contact-form textarea {
  min-height: 150px;
  resize: vertical;
}

/* Animations */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive */
@media (max-width: 768px) {
  #hero h1 {
    font-size: 2.5rem;
  }

  h2 {
    font-size: 2rem;
  }

  .hero-buttons {
    flex-direction: column;
  }

  .nav-links {
    display: none;
  }
}
```

## ⚙️ Vite Configuration

```javascript
// vite.config.js
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    minify: 'terser',
    rollupOptions: {
      output: {
        manualChunks: {
          'three': ['three'],
          'gsap': ['gsap']
        }
      }
    }
  },
  server: {
    port: 3000,
    open: true
  }
});
```

## 📦 Package.json

```json
{
  "name": "hostfolio-template-10-threejs",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "three": "^0.158.0",
    "gsap": "^3.12.4"
  },
  "devDependencies": {
    "vite": "^5.0.8"
  }
}
```

## 🚀 Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🌐 Deployment

### GitHub Pages

```bash
# Build
npm run build

# Deploy to GitHub Pages
# Install gh-pages
npm install -D gh-pages

# Add to package.json
"scripts": {
  "deploy": "vite build && gh-pages -d dist"
}

# Deploy
npm run deploy
```

### Netlify

```bash
# Build command: npm run build
# Publish directory: dist

# Deploy via CLI
netlify deploy --prod
```

## 🎯 Performance Optimization

1. **LOD (Level of Detail)**: Use simpler geometries for distant objects
2. **Frustum Culling**: Objects outside camera view aren't rendered
3. **Instance Rendering**: Reuse geometries for similar objects
4. **Texture Optimization**: Compress textures, use appropriate sizes
5. **Shadow Optimization**: Limit shadow-casting objects

## 📱 Mobile Optimization

```javascript
// Detect mobile and reduce particle count
const isMobile = window.innerWidth < 768;
const particleCount = isMobile ? 1000 : 5000;

// Lower renderer quality on mobile
if (isMobile) {
  renderer.setPixelRatio(1);
}
```

## 🎨 Customization

- **Colors**: Edit shader files in `src/shaders/`
- **Particle Count**: Adjust in `particles.js`
- **Camera Movement**: Modify `setupScrollAnimations()`
- **3D Models**: Add custom models in `assets/models/`

## 📚 Resources

- [Three.js Docs](https://threejs.org/docs/)
- [GSAP Docs](https://greensock.com/docs/)
- [WebGL Fundamentals](https://webglfundamentals.org/)

---

Built with ❤️ for HostFolio - 3D Interactive Edition
