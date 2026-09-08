# Portfolio Upgrade Changelog — Praful Singh

All notable changes and upgrades made to the portfolio codebase are documented in this file.

---

## 🚀 Upgrade Overview — Sept 2026

### 🎨 Design System & UI/UX
- **Custom CSS Variables (`:root`)**: Created a centralized design token system in `style.css` (`--bg-dark`, `--accent-primary`, `--accent-secondary`, `--accent-gradient`, `--font-heading`, `--font-body`, `--radius-lg`, `--shadow-glow`).
- **Refined Typography**: Integrated Google Fonts (`Outfit` for high-impact display headings, `Inter` for clean body readability).
- **Glassmorphism Components**: Replaced flat elements with backdrop-filtered cards (`backdrop-filter: blur(12px)`), gradient text effects, and glowing hover states.

### 📱 Responsive Layout & Accessibility (WCAG AA)
- **Accessible Mobile Navigation Drawer**: Upgraded navigation with ARIA toggles (`aria-expanded`, `aria-label`), keyboard navigation trap, `Escape` key close handler, and responsive drawer dropdown under $768\text{px}$.
- **Focus Rings & Reduced Motion**: Added `:focus-visible` styling for interactive controls and disabled particle trail animations when `prefers-reduced-motion: reduce` or touch screen devices are detected.

### ⚡ Hero & Motion Upgrades
- **Dynamic Typed Text Rotator**: Added vanilla JS typing effect in the hero section displaying rotating roles (*"CSE Student"*, *"Web Developer"*, *"AI / ML Enthusiast"*, *"Problem Solver"*).
- **Direct Resume Download**: Placed prominent "Download Resume" CTA button in the hero linking directly to `Praful_Singh_CV.pdf`.
- **IntersectionObserver Scroll Reveals**: Replaced page-load CSS `fadeUp` animations with scroll-triggered `.reveal` observers that trigger smoothly as elements scroll into the viewport.

### 💡 Skills & Progress Bars Integration
- **Merged `qq.html` Concept**: Brought over animated skill proficiency bars and grouped skills into 3 structured categories:
  1. *Programming Languages* (Python, C/C++, Java, JavaScript)
  2. *Web & Frontend* (HTML5 & CSS3, Responsive UI, DOM ES6+)
  3. *Tools & Technologies* (Git/GitHub, Computer Vision/YOLO, Pygame, OpenCV)
- **Scroll-Triggered Skill Fills**: Proficiency progress bars fill automatically via `IntersectionObserver` when the user scrolls down to the Skills section.

### 🛠️ Projects & Achievements
- **Project Cards Polish**:
  - Added tech-stack tags to each project.
  - Added one-line problem/impact statements.
  - Added individual GitHub repository buttons (e.g. `Flappy-Bird` and `yolo_dataset_project`).
- **New Achievements Section**: Added a dedicated section highlighting algorithmic problem solving, hackathons, and technical certifications.

### 📬 Contact Form & Footer
- **AJAX Formspree Contact Form**: Connected form to Formspree endpoint (`action="https://formspree.io/f/xzzpqjqv"`) with client-side validation, loading spinner button state, and error/success feedback banners (no page reload).
- **Footer Upgrades**: Added quick nav links, back-to-top smooth scroll button, and social media links.

### 🔍 SEO, Meta & Cleanup
- **Complete Meta & Open Graph**: Added `<title>`, `meta description`, Open Graph tags (`og:image`, `og:title`), Twitter Cards, and `theme-color`.
- **Favicon & Sitemap**: Created vector SVG monogram favicon (`favicon.svg`), `sitemap.xml`, and `robots.txt`.
- **Archived Draft Files**: Cleaned up empty 0-byte draft files (`portfolio.html`, `Portfolio1.html`) and documented `qq.html` as an archived concept page.

---

## 🌟 Advanced Upgrade Release — Sept 2026

### 🔍 Phase 1 — Visual & Interaction Polish
- **Accessible Project Quick View Modal**: Added keyboard-accessible modal dialog (`#project-modal`, `role="dialog"`, `aria-modal="true"`) with focus trapping (`Tab`/`Shift+Tab`), `Escape` key close, and backdrop click listener. Displays expanded project media, key highlights, architecture tags, and repository links.
- **Light & Dark Theme Switcher**: Implemented dynamic theme toggle button (`#theme-toggle`) in header swapping `:root[data-theme="light"]` custom properties in-memory without breaking glassmorphism card elevation.
- **Skill Category Filter Tabs**: Added filter controls (`All`, `Languages`, `Web & UI`, `Tools & AI`) that dynamically toggle skill cards while re-animating skill proficiency progress bars.
- **Ambient Hero Canvas Visual**: Added a lightweight 2D constellation & floating particle canvas (`#hero-canvas`) under 1.5kB that automatically pauses on `prefers-reduced-motion`.

### 📊 Phase 2 — Live Data Integration
- **GitHub REST API Live Stats Widget**: Client-side fetch integration showing real-time public repositories, total stargazers, and followers for `@RajputPraful` with graceful fallback error states.
- **Competitive Coding Metrics Card**: Added visual problem-solving metrics breakdown (Easy, Medium, Hard DSA challenges).

### 🤖 Phase 3 — In-Browser AI Object Detection Demo
- **Lazy-Loaded TensorFlow.js COCO-SSD Model**: Created `#ai-demo` showcase lazily loading `@tensorflow/tfjs` and `@tensorflow-models/coco-ssd` scripts on demand when scrolling into view.
- **Live Bounding Box Canvas Drawing**: Enables visitors to run real-time object detection on sample image presets (`yolo.webp`, `yolo-detection.webp`, `Flappybird.webp`) or custom uploaded images with bounding boxes and confidence score lists.

### 📱 Phase 4 — PWA & Infrastructure
- **Web App Manifest (`manifest.json`)**: Configured standalone PWA manifest with theme colors and SVG app icons.
- **Service Worker (`sw.js`)**: Implemented offline cache-first service worker strategy caching HTML shell, CSS, JS, and image assets.
### 🛍️ Featured Projects
- **Swadika E-Commerce Store**: Added Swadika Store web application card with full Quick View modal integration, GitHub repository link (`RajputPraful/SWADIKA`), custom preview thumbnail (`swadika.webp`), and e-commerce tech tags.


