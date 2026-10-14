/**
 * PRERANA SUNIL PATIL - PORTFOLIO INTERACTIVITY
 * Features:
 * - Dynamic Canvas Particle Network
 * - Multi-Role Typewriter Effect
 * - Scroll Spy & Active Nav Link Highlighting
 * - Mobile Navigation Drawer
 * - Project Filter System
 * - Interactive Project Details Modal
 * - Interactive Sketch & Hobby Modal
 * - Contact Form Validation & Animated Toast
 * - Back to Top Floating Action Button
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Particle Network on Canvas
  initParticleNetwork();

  // 2. Initialize Typewriter Effect
  initTypewriter();

  // 3. Initialize Navbar & Scroll Spy
  initNavigation();

  // 4. Initialize Project Filtering
  initProjectFilters();

  // 5. Initialize Modals
  initModals();

  // 6. Initialize Contact Form & Toast
  initContactForm();

  // 7. Initialize Back to Top Button
  initBackToTop();

  // 8. Initialize Profile Photos
  initProfilePhotos();

  // 9. Initialize Premium Interactive Interest Cards
  initInteractiveInterestCards();
});

/* ==========================================================================
   1. Interactive Particle Network Canvas
   ========================================================================== */
function initParticleNetwork() {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width, height;
  let particles = [];
  let mouse = { x: null, y: null, radius: 120 };

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    createParticles();
  }

  function createParticles() {
    particles = [];
    const count = Math.min(Math.floor((width * height) / 18000), 75);
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        radius: Math.random() * 2 + 1,
        color: Math.random() > 0.5 ? 'rgba(139, 92, 246, 0.6)' : 'rgba(56, 189, 248, 0.6)'
      });
    }
  }

  window.addEventListener('resize', resize);
  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });
  window.addEventListener('mouseout', () => {
    mouse.x = null;
    mouse.y = null;
  });

  resize();

  function animate() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];

      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0 || p.x > width) p.vx *= -1;
      if (p.y < 0 || p.y > height) p.vy *= -1;

      // Mouse gentle repulsion
      if (mouse.x !== null) {
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          p.x += (dx / dist) * force * 1.5;
          p.y += (dy / dist) * force * 1.5;
        }
      }

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.fill();

      // Connect near particles
      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j];
        const dx = p.x - p2.x;
        const dy = p.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 110) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(139, 92, 246, ${0.15 * (1 - dist / 110)})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(animate);
  }

  animate();
}

/* ==========================================================================
   2. Multi-Role Typewriter Effect
   ========================================================================== */
function initTypewriter() {
  const target = document.getElementById('typewriter-text');
  if (!target) return;

  const roles = [
    'Information Technology Student',
    'Aspiring Software Developer',
    'Full-Stack Web Enthusiast',
    'Creative Problem Solver',
    'Passionate Sketch Artist'
  ];

  let roleIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  const typeSpeed = 90;
  const backSpeed = 45;
  const pauseTime = 1600;

  function type() {
    const current = roles[roleIdx];

    if (isDeleting) {
      target.textContent = current.substring(0, charIdx - 1);
      charIdx--;
    } else {
      target.textContent = current.substring(0, charIdx + 1);
      charIdx++;
    }

    let delay = isDeleting ? backSpeed : typeSpeed;

    if (!isDeleting && charIdx === current.length) {
      delay = pauseTime;
      isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      roleIdx = (roleIdx + 1) % roles.length;
      delay = 400;
    }

    setTimeout(type, delay);
  }

  type();
}

/* ==========================================================================
   3. Navbar Scroll Spy & Mobile Drawer
   ========================================================================== */
function initNavigation() {
  const nav = document.getElementById('main-nav');
  const mobileToggle = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  // Navbar glass background intensity on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      nav.classList.add('shadow-xl', 'bg-opacity-95');
    } else {
      nav.classList.remove('shadow-xl', 'bg-opacity-95');
    }

    // Scroll spy for active link
    let current = '';
    const scrollPosition = window.scrollY + 200;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  // Mobile menu toggle
  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', () => {
      const isHidden = mobileMenu.classList.contains('hidden');
      if (isHidden) {
        mobileMenu.classList.remove('hidden');
        mobileToggle.innerHTML = '<i class="fa-solid fa-xmark text-2xl"></i>';
      } else {
        mobileMenu.classList.add('hidden');
        mobileToggle.innerHTML = '<i class="fa-solid fa-bars-staggered text-2xl"></i>';
      }
    });

    // Close mobile menu on link click
    mobileMenu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        mobileToggle.innerHTML = '<i class="fa-solid fa-bars-staggered text-2xl"></i>';
      } );
    });
  }
}

/* ==========================================================================
   4. Project Filter System
   ========================================================================== */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active', 'bg-violet-600', 'text-white'));
      btn.classList.add('active', 'bg-violet-600', 'text-white');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach((card) => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category.includes(filter)) {
          card.classList.remove('hidden');
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.95)';
          setTimeout(() => {
            card.classList.add('hidden');
          }, 300);
        }
      });
    });
  });
}

/* ==========================================================================
   5. Interactive Modals (Project Details & Sketch Spotlight)
   ========================================================================== */
const projectData = {
  1: {
    title: 'CampusConnect - Student Hub & Event Portal',
    subtitle: 'Comprehensive Campus Management & Collaboration Web App',
    category: 'Full-Stack Web App',
    tech: ['React.js', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS'],
    description: 'A responsive full-stack platform built for engineering colleges to centralize club activities, technical event registrations, study resource sharing, and notice announcements. Features secure student authentication and an intuitive admin dashboard.',
    highlights: [
      'Interactive Event Registration with instant QR pass generator',
      'Department-wise academic notes & assignment repository',
      'Real-time announcements and notification feed',
      'Clean mobile-first UI with dark mode support'
    ],
    liveUrl: '#',
    codeUrl: 'https://github.com/preranapatil'
  },
  2: {
    title: 'ArtisanCraft - Sketch Portfolio & Creative Showcase',
    subtitle: 'Interactive High-Resolution Sketch & Art Showcase Gallery',
    category: 'Frontend & Creative',
    tech: ['HTML5', 'CSS3 / Tailwind', 'JavaScript ES6+', 'Canvas API'],
    description: 'Born from my personal passion for sketching! A custom digital art gallery designed with an ultra-smooth lightbox viewer, zoom-in canvas lens, category filtering (Portraits, Landscapes, Speed Sketches), and visitor guestbook comments.',
    highlights: [
      'Interactive deep-zoom inspection for intricate pencil strokes',
      'Smooth masonry grid layout with fluid responsive transitions',
      'Dark room aesthetic with ambient background tinting',
      'Integrated sharing capabilities for creative social platforms'
    ],
    liveUrl: '#',
    codeUrl: 'https://github.com/preranapatil'
  },
  3: {
    title: 'SmartCare - Healthcare Appointment & Records Portal',
    subtitle: 'Streamlined Patient Doctor Booking & Health Tracker',
    category: 'Full-Stack / Healthcare',
    tech: ['Python / Flask', 'SQLite / MySQL', 'JavaScript', 'Bootstrap 5'],
    description: 'A healthcare portal designed to simplify patient-doctor appointment scheduling, reduce waiting times, and maintain digital medical prescriptions. Designed with accessibility and speed as top priorities.',
    highlights: [
      'Automated time-slot booking with conflict detection',
      'Doctor availability calendar & specialty filters',
      'Digital prescription archive and printable reports',
      'Secure credential storage and role-based access'
    ],
    liveUrl: '#',
    codeUrl: 'https://github.com/preranapatil'
  },
  4: {
    title: 'AlgoVision - Interactive Algorithm & Path Visualizer',
    subtitle: 'Educational Tool for Data Structures & Pathfinding',
    category: 'Tech & Problem Solving',
    tech: ['JavaScript', 'HTML5 Canvas', 'Tailwind CSS', 'CSS Animations'],
    description: 'An interactive visualizer designed to help students grasp complex data structures and pathfinding algorithms visually. Users can draw custom obstacles, set start/end nodes, and watch Dijkstra and BFS in action.',
    highlights: [
      'Real-time visualization of Dijkstra, A*, and Breadth-First Search',
      'Sorting algorithm visualizer (Bubble, Merge, Quick Sort) with speed controls',
      'Dynamic maze generation algorithms',
      'Step-by-step execution mode for educational study'
    ],
    liveUrl: '#',
    codeUrl: 'https://github.com/preranapatil'
  }
};

function initModals() {
  const modalOverlay = document.getElementById('project-modal');
  const closeModalBtn = document.getElementById('close-modal-btn');
  const modalTitle = document.getElementById('modal-title');
  const modalSubtitle = document.getElementById('modal-subtitle');
  const modalTech = document.getElementById('modal-tech');
  const modalDesc = document.getElementById('modal-desc');
  const modalHighlights = document.getElementById('modal-highlights');
  const modalLive = document.getElementById('modal-live');
  const modalCode = document.getElementById('modal-code');

  // Open modal buttons
  document.querySelectorAll('.open-project-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      const data = projectData[id];
      if (!data) return;

      modalTitle.textContent = data.title;
      modalSubtitle.textContent = data.subtitle;
      modalDesc.textContent = data.description;

      // Render tech tags
      modalTech.innerHTML = data.tech
        .map((t) => `<span class="px-2.5 py-1 text-xs font-code rounded-md bg-violet-900/40 text-violet-300 border border-violet-700/40">${t}</span>`)
        .join('');

      // Render highlights
      modalHighlights.innerHTML = data.highlights
        .map((h) => `<li class="flex items-start gap-2 text-slate-300 text-sm"><i class="fa-solid fa-check text-cyan-400 mt-1 text-xs"></i> <span>${h}</span></li>`)
        .join('');

      modalLive.href = data.liveUrl;
      modalCode.href = data.codeUrl;

      modalOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  // Close modal
  function closeModal() {
    if (modalOverlay) {
      modalOverlay.classList.remove('active');
      document.body.style.overflow = 'auto';
    }
  }

  if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay && modalOverlay.classList.contains('active')) {
      closeModal();
    }
  });

  // Hobby Spotlight Modal
  const hobbyModal = document.getElementById('hobby-modal');
  const openHobbyBtn = document.getElementById('open-hobby-modal');
  const closeHobbyBtn = document.getElementById('close-hobby-modal');

  if (openHobbyBtn && hobbyModal) {
    openHobbyBtn.addEventListener('click', () => {
      hobbyModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  }

  if (closeHobbyBtn && hobbyModal) {
    closeHobbyBtn.addEventListener('click', () => {
      hobbyModal.classList.remove('active');
      document.body.style.overflow = 'auto';
    });
    hobbyModal.addEventListener('click', (e) => {
      if (e.target === hobbyModal) {
        hobbyModal.classList.remove('active');
        document.body.style.overflow = 'auto';
      }
    });
  }
}

/* ==========================================================================
   6. Contact Form Validation & Toast Notification
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const toast = document.getElementById('toast-notification');
  const toastMsg = document.getElementById('toast-message');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('sender-name').value.trim();
    const email = document.getElementById('sender-email').value.trim();
    const subject = document.getElementById('sender-subject').value.trim();
    const message = document.getElementById('sender-message').value.trim();

    if (!name || !email || !message) {
      showToast('⚠️ Please fill out all required fields.', 'bg-amber-900/90 border-amber-600 text-amber-200');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showToast('⚠️ Please provide a valid email address.', 'bg-amber-900/90 border-amber-600 text-amber-200');
      return;
    }

    // Button loading state
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin mr-2"></i> Sending Message...';
    submitBtn.disabled = true;

    // Simulate reliable dispatch & fallback
    setTimeout(() => {
      submitBtn.innerHTML = originalBtnText;
      submitBtn.disabled = false;
      form.reset();

      showToast(`🎉 Thank you ${name}! Your message has been sent successfully. I will get back to you shortly!`, 'bg-emerald-950/90 border-emerald-600 text-emerald-200');
    }, 1200);
  });

  function showToast(message, colorClasses) {
    if (!toast) return;
    toastMsg.textContent = message;
    toast.className = `fixed bottom-8 right-8 z-50 flex items-center gap-3 px-5 py-3.5 rounded-xl border backdrop-blur-md shadow-2xl transition-all duration-300 show ${colorClasses}`;

    setTimeout(() => {
      toast.classList.remove('show');
    }, 5000);
  }
}

/* ==========================================================================
   7. Back to Top Floating Button
   ========================================================================== */
function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      btn.classList.remove('opacity-0', 'pointer-events-none', 'translate-y-6');
      btn.classList.add('opacity-100', 'pointer-events-auto', 'translate-y-0');
    } else {
      btn.classList.add('opacity-0', 'pointer-events-none', 'translate-y-6');
      btn.classList.remove('opacity-100', 'pointer-events-auto', 'translate-y-0');
    }
  });

  btn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* ==========================================================================
   8. Profile Photo Integration, Multi-Path Resolution & Live Browser Upload
   ========================================================================== */
function handleImageFallback(img) {
  // If the initial path failed, try alternative candidates (e.g., profile.jpg in root, images/profile.jpg, prerana.jpg)
  const candidatePaths = [
    'profile.jpg',
    'images/profile.jpg',
    'prerana.jpg',
    'photo.jpg',
    'public/images/profile.png',
    'profile.png'
  ];

  let currentTryIndex = parseInt(img.getAttribute('data-try-index') || '0', 10);

  if (currentTryIndex < candidatePaths.length) {
    const nextPath = candidatePaths[currentTryIndex];
    img.setAttribute('data-try-index', (currentTryIndex + 1).toString());
    img.src = nextPath;
  } else {
    // If all file paths fail, smoothly hide the broken image and show the fallback UI
    img.classList.add('hidden');
    const container = img.parentElement;
    if (container) {
      const fallback = container.querySelector('.profile-fallback');
      if (fallback) fallback.classList.remove('hidden');
    }
  }
}

function initProfilePhotos() {
  const profileImgs = document.querySelectorAll('.profile-photo');
  
  // When an image successfully loads, ensure it's visible and hide any fallback
  profileImgs.forEach((img) => {
    img.addEventListener('load', () => {
      img.classList.remove('hidden');
      const container = img.parentElement;
      if (container) {
        const fallback = container.querySelector('.profile-fallback');
        if (fallback) fallback.classList.add('hidden');
      }
    });
  });

  // Client-side instant photo picker: allows user to select their photo directly from their computer in the browser
  const fileInputs = document.querySelectorAll('.profile-file-input');
  fileInputs.forEach((input) => {
    input.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const photoDataUrl = event.target.result;
          profileImgs.forEach((img) => {
            img.src = photoDataUrl;
            img.classList.remove('hidden');
            const container = img.parentElement;
            if (container) {
              const fallback = container.querySelector('.profile-fallback');
              if (fallback) fallback.classList.add('hidden');
            }
          });

          // Show floating toast confirmation
          const toast = document.getElementById('toast-notification');
          const toastMsg = document.getElementById('toast-message');
          if (toast && toastMsg) {
            toastMsg.textContent = '📸 Profile photo updated in view!';
            toast.className = 'fixed bottom-8 right-8 z-50 flex items-center gap-3 px-5 py-3.5 rounded-xl border backdrop-blur-md shadow-2xl transition-all duration-300 show bg-emerald-950/90 border-emerald-600 text-emerald-200';
            setTimeout(() => toast.classList.remove('show'), 4000);
          }
        };
        reader.readAsDataURL(file);
      }
    });
  });
}

/* ==========================================================================
   9. Premium Interactive Interest Cards (Click-to-Activate & Keyboard Support)
   ========================================================================== */
function initInteractiveInterestCards() {
  const cards = document.querySelectorAll('.interest-card');
  if (!cards.length) return;

  // State tracker: keeps track of the currently selected card theme
  let activeTheme = null;

  function handleCardSelection(targetCard) {
    const theme = targetCard.getAttribute('data-theme');

    if (activeTheme === theme) {
      // Toggle off if clicking the already-selected card
      targetCard.classList.remove('active');
      targetCard.setAttribute('aria-pressed', 'false');
      activeTheme = null;
    } else {
      // Deactivate all other cards with smooth transition
      cards.forEach((c) => {
        c.classList.remove('active');
        c.setAttribute('aria-pressed', 'false');
      });

      // Activate the clicked card with its unique signature gradient & glow
      targetCard.classList.add('active');
      targetCard.setAttribute('aria-pressed', 'true');
      activeTheme = theme;
    }
  }

  cards.forEach((card) => {
    // Mouse click listener
    card.addEventListener('click', () => {
      handleCardSelection(card);
    });

    // Keyboard accessibility: Enter or Space activates/toggles the card
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') {
        e.preventDefault();
        handleCardSelection(card);
      }
    });
  });
}


