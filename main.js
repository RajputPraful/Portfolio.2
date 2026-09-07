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
    threshold: 0.25
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
  // Disable on touch devices or if reduced motion is preferred
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

    // Dynamic submit loading state
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
