/**
 * PORTFOLIO MAIN JAVASCRIPT MODULE
 * Developer: Praful Singh
 */

document.addEventListener("DOMContentLoaded", () => {
  initMobileMenu();
  initTypingEffect();
  initScrollObserver();
  initSkillBarObserver();
  initCursorTrail();
  initContactForm();
  initBackToTop();
  
  // Upgraded Feature Initializations
  initThemeSwitcher();
  initHeroVisual();
  initSkillFilter();
  initProjectModal();
  initGitHubStats();
  initAIDemo();
  initServiceWorker();
});

/* --------------------------------------------------------------------------
   1. MOBILE NAVIGATION DRAWER & KEYBOARD ACCESS
   -------------------------------------------------------------------------- */
function initMobileMenu() {
  const menuIcon = document.getElementById("menu-icon");
  const navLinks = document.querySelector(".nav-links");
  const navAnchors = document.querySelectorAll(".nav-links a");

  if (!menuIcon || !navLinks) return;

  function toggleMenu(show) {
    const isActive = show !== undefined ? show : !navLinks.classList.contains("active");
    navLinks.classList.toggle("active", isActive);
    menuIcon.setAttribute("aria-expanded", isActive ? "true" : "false");
    
    // Toggle icon visual
    const iconEl = menuIcon.querySelector("i");
    if (iconEl) {
      iconEl.className = isActive ? "fa-solid fa-xmark" : "fa-solid fa-bars";
    }
  }

  menuIcon.addEventListener("click", () => toggleMenu());

  // Close menu when clicking outside or clicking any nav link
  document.addEventListener("click", (e) => {
    if (!menuIcon.contains(e.target) && !navLinks.contains(e.target)) {
      toggleMenu(false);
    }
  });

  navAnchors.forEach((anchor) => {
    anchor.addEventListener("click", () => toggleMenu(false));
  });

  // Escape key closes menu
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && navLinks.classList.contains("active")) {
      toggleMenu(false);
    }
  });
}

/* --------------------------------------------------------------------------
   2. TYPING ROTATOR FOR HERO ROLE
   -------------------------------------------------------------------------- */
function initTypingEffect() {
  const typedSpan = document.getElementById("typed-text");
  if (!typedSpan) return;

  const roles = [
    "CSE Student",
    "Web Developer",
    "AI / ML Enthusiast",
    "Problem Solver"
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typeSpeed = 100;

  function type() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      typedSpan.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      typeSpeed = 50;
    } else {
      typedSpan.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typeSpeed = 100;
    }

    if (!isDeleting && charIndex === currentRole.length) {
      typeSpeed = 2000; // Pause at full word
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typeSpeed = 400; // Pause before typing next word
    }

    setTimeout(type, typeSpeed);
  }

  type();
}

/* --------------------------------------------------------------------------
   3. SCROLL REVEAL OBSERVER (INTERSECTION OBSERVER)
   -------------------------------------------------------------------------- */
function initScrollObserver() {
  const reveals = document.querySelectorAll(".reveal");
  if (!reveals.length) return;

  const observerOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        obs.unobserve(entry.target); // Unobserve once animated
      }
    });
  }, observerOptions);

  reveals.forEach((el) => observer.observe(el));
}

/* --------------------------------------------------------------------------
   4. SKILL PROFICIENCY BAR ANIMATION (INTERSECTION OBSERVER)
   -------------------------------------------------------------------------- */
function initSkillBarObserver() {
  const skillSection = document.getElementById("skills");
  const barFills = document.querySelectorAll(".bar-fill");
  if (!skillSection || !barFills.length) return;

  const observerOptions = {
    threshold: 0.15
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        barFills.forEach((fill) => {
          const targetWidth = fill.getAttribute("data-percentage") || "70%";
          fill.style.width = targetWidth;
        });
        obs.unobserve(entry.target);
      }
    });
  }, observerOptions);

  observer.observe(skillSection);
}

/* --------------------------------------------------------------------------
   5. OPTIMIZED CURSOR TRAIL PARTICLES
   -------------------------------------------------------------------------- */
function initCursorTrail() {
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (isTouchDevice || prefersReducedMotion) return;

  const dots = [];
  const DOTS_COUNT = 16;

  for (let i = 0; i < DOTS_COUNT; i++) {
    const dot = document.createElement("div");
    dot.className = "trail-dot";
    document.body.appendChild(dot);
    dots.push({ el: dot, x: -100, y: -100 });
  }

  let mouse = { x: -100, y: -100 };
  let isMoving = false;
  let timeout;

  document.addEventListener("mousemove", (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    isMoving = true;

    clearTimeout(timeout);
    timeout = setTimeout(() => {
      isMoving = false;
    }, 120);
  });

  function animate() {
    let currX = mouse.x;
    let currY = mouse.y;

    dots.forEach((dot, index) => {
      dot.x += (currX - dot.x) * 0.3;
      dot.y += (currY - dot.y) * 0.3;

      if (!isMoving && index === 0) {
        dot.el.style.opacity = "0";
      } else {
        dot.el.style.opacity = String((dots.length - index) / dots.length);
      }

      dot.el.style.left = `${dot.x}px`;
      dot.el.style.top = `${dot.y}px`;

      currX = dot.x;
      currY = dot.y;
    });

    requestAnimationFrame(animate);
  }

  animate();
}

/* --------------------------------------------------------------------------
   6. CONTACT FORM AJAX SUBMISSION & VALIDATION
   -------------------------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById("contact-form");
  const statusDiv = document.getElementById("form-status");

  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const nameInput = form.querySelector('input[name="name"]');
    const emailInput = form.querySelector('input[name="email"]');
    const messageInput = form.querySelector('textarea[name="message"]');
    const submitBtn = form.querySelector('button[type="submit"]');

    // Validation
    if (!nameInput.value.trim() || !emailInput.value.trim() || !messageInput.value.trim()) {
      showStatus("Please fill in all fields before sending.", "error");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(emailInput.value.trim())) {
      showStatus("Please enter a valid email address.", "error");
      return;
    }

    const originalBtnText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';

    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        showStatus("Thank you! Your message has been sent successfully.", "success");
        form.reset();
      } else {
        const data = await response.json();
        if (Object.hasOwn(data, 'errors')) {
          showStatus(data["errors"].map(error => error["message"]).join(", "), "error");
        } else {
          showStatus("Oops! There was a problem submitting your form.", "error");
        }
      }
    } catch (error) {
      showStatus("Connection error. Please check your internet and try again.", "error");
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnText;
    }
  });

  function showStatus(message, type) {
    if (!statusDiv) return;
    statusDiv.textContent = message;
    statusDiv.className = `form-status ${type}`;
    statusDiv.style.display = "block";
    
    if (type === "success") {
      setTimeout(() => {
        statusDiv.style.display = "none";
      }, 5000);
    }
  }
}

/* --------------------------------------------------------------------------
   7. BACK TO TOP BUTTON CONTROLLER
   -------------------------------------------------------------------------- */
function initBackToTop() {
  const backToTopBtn = document.getElementById("back-to-top");
  if (!backToTopBtn) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 400) {
      backToTopBtn.style.opacity = "1";
      backToTopBtn.style.pointerEvents = "auto";
    } else {
      backToTopBtn.style.opacity = "0";
      backToTopBtn.style.pointerEvents = "none";
    }
  });

  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

/* --------------------------------------------------------------------------
   8. LIGHT / DARK THEME SWITCHER (IN-MEMORY SESSION PERSISTENCE)
   -------------------------------------------------------------------------- */
function initThemeSwitcher() {
  const themeBtn = document.getElementById("theme-toggle");
  if (!themeBtn) return;

  let currentTheme = "dark";

  themeBtn.addEventListener("click", () => {
    currentTheme = currentTheme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", currentTheme);

    const icon = themeBtn.querySelector("i");
    if (icon) {
      icon.className = currentTheme === "light" ? "fa-solid fa-sun" : "fa-solid fa-moon";
    }
  });
}

/* --------------------------------------------------------------------------
   9. LIGHTWEIGHT AMBIENT HERO VISUAL CANVAS
   -------------------------------------------------------------------------- */
function initHeroVisual() {
  const canvas = document.getElementById("hero-canvas");
  if (!canvas) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  const ctx = canvas.getContext("2d");
  let width, height;
  let particles = [];
  let animId;

  function resize() {
    width = canvas.width = canvas.offsetWidth;
    height = canvas.height = canvas.offsetHeight;
    createParticles();
  }

  function createParticles() {
    particles = [];
    const count = Math.floor(width / 35);
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 2 + 1,
        alpha: Math.random() * 0.5 + 0.2
      });
    }
  }

  function render() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0 || p.x > width) p.vx *= -1;
      if (p.y < 0 || p.y > height) p.vy *= -1;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(59, 130, 246, ${p.alpha})`;
      ctx.fill();

      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j];
        const dx = p.x - p2.x;
        const dy = p.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 110) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(139, 92, 246, ${(1 - dist / 110) * 0.2})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }

    animId = requestAnimationFrame(render);
  }

  window.addEventListener("resize", resize);
  resize();
  render();
}

/* --------------------------------------------------------------------------
   10. SKILL CATEGORY FILTER TABS
   -------------------------------------------------------------------------- */
function initSkillFilter() {
  const filterBtns = document.querySelectorAll(".skill-filter-btn");
  const categoryCards = document.querySelectorAll(".skill-category-card");

  if (!filterBtns.length || !categoryCards.length) return;

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const filter = btn.getAttribute("data-filter");

      categoryCards.forEach((card) => {
        const cat = card.getAttribute("data-category");
        if (filter === "all" || cat === filter) {
          card.classList.remove("hidden");
          // Re-trigger bar fill animations for newly visible items
          const barFills = card.querySelectorAll(".bar-fill");
          barFills.forEach((fill) => {
            const targetWidth = fill.getAttribute("data-percentage") || "70%";
            fill.style.width = targetWidth;
          });
        } else {
          card.classList.add("hidden");
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   11. ACCESSIBLE PROJECT QUICK VIEW MODAL
   -------------------------------------------------------------------------- */
function initProjectModal() {
  const modal = document.getElementById("project-modal");
  const closeBtn = document.getElementById("modal-close");
  const quickBtns = document.querySelectorAll(".project-quick-btn");

  if (!modal || !closeBtn) return;

  const PROJECTS_DATA = {
    "flappy-bird": {
      title: "Flappy Bird Arcade Game",
      category: "Game Dev",
      image: "Flappybird.webp",
      summary: "Interactive 2D arcade game built from scratch using Python and Pygame with custom physics, sprite sheet animations, and dynamic collision detection.",
      highlights: [
        "Implemented Axis-Aligned Bounding Box (AABB) collision detection algorithms",
        "Developed custom game loop and state machine architecture (Menu, Playing, Game Over)",
        "Integrated real-time high-score tracking and audio sound effects pipeline"
      ],
      tags: ["Python", "Pygame", "OOP", "Game Physics", "Audio API"],
      github: "https://github.com/RajputPraful/Flappy-Bird",
      demo: null
    },
    "swadika": {
      title: "SWADIKA — Authentic Nepali Spices & Sweets Store",
      category: "Web Dev / E-Commerce",
      image: "swadika.webp",
      summary: "A premium e-commerce platform for authentic Nepali spices and traditional sweets ('Taste the Pure Heritage of Spice & Sweet'), featuring a full product catalog, category filters, interactive cart drawer, and authentication screens.",
      highlights: [
        "Crafted custom hero section showcasing authentic Nepali Chicken Masala and spice blends",
        "Built interactive product catalog grid with category filter controls and quick add-to-cart functionality",
        "Designed clean user account portal with Login & Registration forms",
        "Optimized mobile responsiveness and UI layout hierarchy"
      ],
      tags: ["HTML5", "CSS3", "JavaScript", "E-Commerce", "Responsive UI"],
      github: "https://github.com/RajputPraful/SWADIKA",
      demo: null
    },
    "yolo-augmenter": {
      title: "YOLO Dataset Augmenter",
      category: "AI / ML",
      image: "yolo.webp",
      summary: "Computer vision utility pipeline automating dataset image augmentation (rotation, scaling, noise injection, bounding box transformation) to increase model accuracy.",
      highlights: [
        "Automates bounding box coordinate recalculation during image transformations",
        "Multiplies dataset training volume by 4x while preserving YOLO annotation format",
        "Optimized batch processing speed using OpenCV and NumPy vectorization"
      ],
      tags: ["Python", "YOLO", "OpenCV", "Data Augmentation", "NumPy"],
      github: "https://github.com/RajputPraful/yolo_dataset_project",
      demo: null
    },
    "worker-safety": {
      title: "Worker Safety Detection AI",
      category: "In Progress",
      image: "yolo-detection.webp",
      summary: "Real-time automated computer vision system designed to monitor workplace environments and detect personal protective equipment (PPE) compliance.",
      highlights: [
        "Real-time multi-class PPE detection (helmets, safety vests, eye protection)",
        "Configurable compliance threshold alerts for industrial safety enforcement",
        "Optimized inference speed for low-latency live video stream processing"
      ],
      tags: ["Computer Vision", "YOLOv8", "PyTorch", "Real-Time Detection", "OpenCV"],
      github: "https://github.com/RajputPraful",
      demo: null
    },
    "mcp-nitro-stack": {
      title: "MCP Nitro Stack — Amrita Hackathon Project",
      category: "Hackathon / AI Stack",
      image: "mcp-nitro-certificate.jpg",
      isCertificate: true,
      summary: "Full-stack AI tool integration & backend microservices stack developed by Praful Singh (Team 'ByteDex') during the Amrita University Amritapuri Campus Hackathon (Jul 17-18, 2026). Powered by Nitrostack infrastructure and Model Context Protocol (MCP), recognized with an official Certificate of Participation.",
      highlights: [
        "Participated as a key member of team 'ByteDex' at the Amrita University Amritapuri Campus Hackathon (Jul 17-18, 2026)",
        "Architected Model Context Protocol (MCP) server hooks and Nitrostack backend services for high-speed AI workflows",
        "Awarded official Certificate of Participation signed by Abhishek Pandit (CEO, Nitrostack) and Pablo Jiménez Godoy (CEO, Wekan Enterprises)",
        "Built scalable microservices API handlers and asynchronous payload parsers under tight hackathon sprint timelines"
      ],
      tags: ["MCP", "Nitrostack", "Python", "JavaScript", "REST APIs", "Hackathon", "Microservices"],
      github: "https://github.com/RajputPraful",
      demo: null,
      certificate: "mcp-nitro-certificate.jpg"
    }
  };

  let triggerBtn = null;
  const modalImg = document.getElementById("modal-img");
  const lightbox = document.getElementById("image-lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxClose = document.getElementById("lightbox-close");

  function openLightbox(imgSrc) {
    if (!lightbox || !lightboxImg) return;
    lightboxImg.src = imgSrc;
    lightbox.classList.add("active");
    lightbox.setAttribute("aria-hidden", "false");
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove("active");
    lightbox.setAttribute("aria-hidden", "true");
  }

  if (lightboxClose) {
    lightboxClose.addEventListener("click", closeLightbox);
  }
  if (lightbox) {
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox || e.target === lightboxClose || e.target.closest("#lightbox-close")) {
        closeLightbox();
      }
    });
  }

  function openModal(projectId) {
    const data = PROJECTS_DATA[projectId];
    if (!data) return;

    document.getElementById("modal-title").textContent = data.title;
    document.getElementById("modal-summary").textContent = data.summary;
    if (modalImg) {
      modalImg.src = data.image;
      if (data.isCertificate) {
        modalImg.style.cursor = "zoom-in";
        modalImg.title = "Click to enlarge Certificate of Participation";
      } else {
        modalImg.style.cursor = "pointer";
        modalImg.title = "Click to enlarge image";
      }
    }
    document.getElementById("modal-badge").textContent = data.category;

    const highlightsList = document.getElementById("modal-highlights");
    highlightsList.innerHTML = data.highlights.map((h) => `<li>${h}</li>`).join("");

    const tagsDiv = document.getElementById("modal-tags");
    tagsDiv.innerHTML = data.tags.map((t) => `<span class="tag">${t}</span>`).join("");

    const githubBtn = document.getElementById("modal-github");
    githubBtn.href = data.github;

    const demoBtn = document.getElementById("modal-demo");
    if (data.demo) {
      demoBtn.href = data.demo;
      demoBtn.style.display = "inline-flex";
    } else {
      demoBtn.style.display = "none";
    }

    // Dynamic Certificate Button in Modal
    let certBtn = document.getElementById("modal-cert-btn");
    if (data.certificate) {
      if (!certBtn) {
        certBtn = document.createElement("button");
        certBtn.id = "modal-cert-btn";
        certBtn.className = "btn btn-secondary";
        certBtn.innerHTML = '<i class="fa-solid fa-certificate"></i> View Certificate Fullscreen';
        const actionsDiv = document.querySelector(".modal-actions");
        if (actionsDiv) actionsDiv.appendChild(certBtn);
      }
      certBtn.style.display = "inline-flex";
      certBtn.onclick = () => openLightbox(data.certificate);
    } else if (certBtn) {
      certBtn.style.display = "none";
    }

    modal.classList.add("active");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";

    closeBtn.focus();
  }

  if (modalImg) {
    modalImg.addEventListener("click", () => {
      if (modalImg.src) {
        openLightbox(modalImg.src);
      }
    });
  }

  function closeModal() {
    modal.classList.remove("active");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";

    if (triggerBtn) {
      triggerBtn.focus();
    }
  }

  // Delegated click event listener for quick view buttons (handles dynamically bound buttons too)
  document.addEventListener("click", (e) => {
    const btn = e.target.closest(".project-quick-btn");
    if (btn) {
      triggerBtn = btn;
      const projId = btn.getAttribute("data-project");
      openModal(projId);
    }
  });

  closeBtn.addEventListener("click", closeModal);

  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      if (lightbox && lightbox.classList.contains("active")) {
        closeLightbox();
      } else if (modal.classList.contains("active")) {
        closeModal();
      }
    }

    // Trap focus inside modal when open
    if (e.key === "Tab" && modal.classList.contains("active")) {
      const focusables = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  });
}

/* --------------------------------------------------------------------------
   12. GITHUB REST API LIVE STATS WIDGET
   -------------------------------------------------------------------------- */
async function initGitHubStats() {
  const repoEl = document.getElementById("gh-repo-count");
  const starEl = document.getElementById("gh-star-count");
  const followerEl = document.getElementById("gh-followers");

  if (!repoEl || !starEl || !followerEl) return;

  try {
    const userRes = await fetch("https://api.github.com/users/RajputPraful");
    if (!userRes.ok) throw new Error("API rate limited");
    const userData = await userRes.json();

    const reposRes = await fetch("https://api.github.com/users/RajputPraful/repos?per_page=100");
    const reposData = reposRes.ok ? await reposRes.json() : [];

    const totalStars = Array.isArray(reposData)
      ? reposData.reduce((acc, repo) => acc + (repo.stargazers_count || 0), 0)
      : 5;

    repoEl.textContent = userData.public_repos || "8+";
    starEl.textContent = totalStars || "5+";
    followerEl.textContent = userData.followers || "12+";
  } catch (err) {
    // Graceful Fallback
    repoEl.textContent = "8+";
    starEl.textContent = "5+";
    followerEl.textContent = "12+";
  }
}

/* --------------------------------------------------------------------------
   13. IN-BROWSER TENSORFLOW.JS AI OBJECT DETECTION DEMO (LAZY LOADED)
   -------------------------------------------------------------------------- */
function initAIDemo() {
  const demoSection = document.getElementById("ai-demo");
  const runBtn = document.getElementById("ai-run-btn");
  const statusBadge = document.getElementById("ai-model-status");
  const targetImg = document.getElementById("ai-target-image");
  const canvas = document.getElementById("ai-canvas");
  const resultsList = document.getElementById("ai-detected-list");
  const sampleBtns = document.querySelectorAll(".btn-sample");
  const uploadInput = document.getElementById("ai-upload-input");

  if (!demoSection || !runBtn || !targetImg || !canvas) return;

  let model = null;
  let isModelLoading = false;

  // Lazy-load TF.js & COCO-SSD when section enters viewport
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !model && !isModelLoading) {
        loadModel();
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  observer.observe(demoSection);

  function loadScript(src) {
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }

  async function loadModel() {
    isModelLoading = true;
    statusBadge.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Loading Neural Net...';

    try {
      await loadScript("https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@4.15.0/dist/tf.min.js");
      await loadScript("https://cdn.jsdelivr.net/npm/@tensorflow-models/coco-ssd@2.2.3/dist/coco-ssd.min.js");

      if (window.cocoSsd) {
        model = await window.cocoSsd.load();
        statusBadge.className = "ai-model-badge ready";
        statusBadge.innerHTML = '<i class="fa-solid fa-check"></i> Model Ready';
        runBtn.disabled = false;
      }
    } catch (err) {
      statusBadge.className = "ai-model-badge";
      statusBadge.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i> Model Load Error';
    }
  }

  sampleBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      sampleBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      const sampleSrc = btn.getAttribute("data-sample");
      targetImg.src = sampleSrc;
      clearCanvas();
    });
  });

  if (uploadInput) {
    uploadInput.addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          targetImg.src = event.target.result;
          sampleBtns.forEach((b) => b.classList.remove("active"));
          clearCanvas();
        };
        reader.readAsDataURL(file);
      }
    });
  }

  function clearCanvas() {
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    resultsList.innerHTML = '<li class="detected-placeholder">Click "Run Detection" to view identified objects.</li>';
  }

  runBtn.addEventListener("click", async () => {
    if (!model) return;

    runBtn.disabled = true;
    runBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Detecting...';

    // Match canvas dimensions to displayed image
    canvas.width = targetImg.clientWidth;
    canvas.height = targetImg.clientHeight;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    try {
      const predictions = await model.detect(targetImg);
      
      runBtn.disabled = false;
      runBtn.innerHTML = '<i class="fa-solid fa-play"></i> Run Detection';

      if (!predictions.length) {
        resultsList.innerHTML = '<li class="detected-placeholder">No clear objects detected with high confidence in this sample.</li>';
        return;
      }

      resultsList.innerHTML = "";
      const scaleX = canvas.width / targetImg.naturalWidth;
      const scaleY = canvas.height / targetImg.naturalHeight;

      predictions.forEach((pred) => {
        const [x, y, w, h] = pred.bbox;
        const scaledX = x * scaleX;
        const scaledY = y * scaleY;
        const scaledW = w * scaleX;
        const scaledH = h * scaleY;
        const score = Math.round(pred.score * 100);

        // Draw Bounding Box
        ctx.strokeStyle = "#3b82f6";
        ctx.lineWidth = 3;
        ctx.strokeRect(scaledX, scaledY, scaledW, scaledH);

        // Draw Label Background
        ctx.fillStyle = "rgba(59, 130, 246, 0.85)";
        const labelText = `${pred.class} (${score}%)`;
        ctx.font = "bold 13px Outfit, sans-serif";
        const textWidth = ctx.measureText(labelText).width;
        ctx.fillRect(scaledX, scaledY > 20 ? scaledY - 22 : scaledY, textWidth + 12, 22);

        // Draw Label Text
        ctx.fillStyle = "#ffffff";
        ctx.fillText(labelText, scaledX + 6, scaledY > 20 ? scaledY - 6 : scaledY + 15);

        // Append to Results Panel
        const li = document.createElement("li");
        li.className = "detected-item";
        li.innerHTML = `
          <span class="detected-name"><i class="fa-solid fa-cube"></i> ${pred.class}</span>
          <span class="detected-score">${score}% Match</span>
        `;
        resultsList.appendChild(li);
      });
    } catch (err) {
      runBtn.disabled = false;
      runBtn.innerHTML = '<i class="fa-solid fa-play"></i> Run Detection';
    }
  });
}

/* --------------------------------------------------------------------------
   14. PWA SERVICE WORKER REGISTRATION
   -------------------------------------------------------------------------- */
function initServiceWorker() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('sw.js')
        .then(() => console.log('Portfolio Service Worker registered.'))
        .catch((err) => console.log('SW registration skipped:', err));
    });
  }
}

