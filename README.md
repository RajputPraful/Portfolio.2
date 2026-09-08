# Praful Singh — Developer Portfolio v2

Modern, responsive, single-page developer portfolio for **Praful Singh** (Computer Science & Engineering student at Amrita Vishwa Vidyapeetham). Built with vanilla web technologies, glassmorphic design tokens, interactive project previews, real-time GitHub API metrics, in-browser AI computer vision demonstration, and PWA offline capabilities.

🌐 **Live Portfolio:** [https://prafulsingh.com.np/](https://prafulsingh.com.np/)  
📦 **GitHub Repository:** [https://github.com/RajputPraful/Portfolio.2](https://github.com/RajputPraful/Portfolio.2)

---

## ✨ Key Features & Architecture

### 🎨 Visual & UX Polish
- **Glassmorphism Design Tokens (`style.css`):** Centralized CSS custom properties for dark (`#090d16`) and light (`#f1f5f9`) themes.
- **Theme Switcher:** In-memory light/dark mode toggle button with sun/moon icons.
- **Interactive Project Quick View Modal:** Focus-trapped, keyboard accessible ARIA modal dialog displaying project highlights, architecture tags, and repository links.
- **Skill Filter Tabs:** Category filters (`All`, `Languages`, `Web & UI`, `Tools & AI`) with scroll-triggered proficiency bar animations.
- **Ambient Hero Canvas:** Lightweight 2D floating constellation visual that respects `prefers-reduced-motion`.

### 📊 Live APIs & ML Showcase
- **GitHub Live REST API Stats:** Fetches real-time repository count, stargazers, and followers for `@RajputPraful` with graceful fallback handling.
- **In-Browser TensorFlow.js AI Demo:** Lazy-loads `@tensorflow/tfjs` and `@tensorflow-models/coco-ssd` to perform real-time bounding-box object detection directly inside the browser on sample or uploaded images.

### 📱 Performance & PWA Infrastructure
- **Progressive Web App:** Installable standalone shell with `manifest.json` and cache-first Service Worker (`sw.js`).
- **AJAX Contact Form:** Formspree integration with regex validation and loading spinner states.
- **WCAG AA Accessibility:** Full keyboard navigation, ARIA dialog roles, focus ring visibility, and reduced motion settings.

---

## 🛠️ Technology Stack

- **Frontend:** Vanilla HTML5, Modern CSS3 (Custom Properties, Flexbox, Grid), ES6+ Vanilla JavaScript
- **Fonts & Icons:** Google Fonts (`Outfit` & `Inter`), Font Awesome 6.5
- **Machine Learning:** TensorFlow.js, COCO-SSD Pre-trained Object Detection Model
- **PWA & Backend:** Web App Manifest, Service Worker, Formspree API, GitHub REST API
