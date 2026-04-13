// Set current year
document.getElementById('year').textContent = new Date().getFullYear();

// Ensure résumé links download with a clean filename
document.addEventListener('DOMContentLoaded', () => {
  const resumeLinks = document.querySelectorAll('a[href="assets/resume.pdf"]');
  resumeLinks.forEach(link => link.setAttribute('download', 'Ashu-Purani-Resume.pdf'));
});

function scrollToContact() {
  document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
}

// ===========================
// SCROLL PROGRESS BAR
// ===========================
const scrollProgress = document.getElementById('scroll-progress');
window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.body.scrollHeight - window.innerHeight;
  const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  scrollProgress.style.width = Math.min(progress, 100) + '%';
}, { passive: true });

// ===========================
// NAV SCROLL COMPACT
// ===========================
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
}, { passive: true });

// ===========================
// ACTIVE NAV LINK ON SCROLL
// ===========================
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav nav a[href^="#"]');

const activeLinkObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === '#' + entry.target.id);
      });
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(section => activeLinkObserver.observe(section));

// ===========================
// HAMBURGER MENU
// ===========================
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('nav-menu');

menuToggle.addEventListener('click', () => {
  const isOpen = navMenu.classList.toggle('open');
  menuToggle.classList.toggle('open', isOpen);
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});

// Close menu when clicking a nav link
navMenu.querySelectorAll('a, button').forEach(el => {
  el.addEventListener('click', () => {
    navMenu.classList.remove('open');
    menuToggle.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  });
});

// ===========================
// BACK TO TOP
// ===========================
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  backToTop.classList.toggle('visible', window.scrollY > 400);
}, { passive: true });

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===========================
// SCROLL REVEAL ANIMATIONS
// ===========================
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ===========================
// ANIMATED COUNTERS
// ===========================
function animateCounter(el, target, duration) {
  const startTime = performance.now();
  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    // Ease out cubic
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(eased * target);
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = parseInt(el.dataset.target, 10);
      animateCounter(el, target, 1800);
      counterObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('[data-target]').forEach(el => counterObserver.observe(el));

// ===========================
// TYPING ANIMATION
// ===========================
const typingTexts = [
  'EDI Analyst',
  'Data Engineer',
  'Supply Chain Specialist',
  'SAP MM Expert',
  'Power BI Developer',
  'PySpark Developer',
];

let typingIdx = 0;
let charIdx = 0;
let isDeleting = false;
const typingEl = document.getElementById('typing-text');

function typeLoop() {
  if (!typingEl) return;
  const current = typingTexts[typingIdx];

  if (isDeleting) {
    charIdx--;
  } else {
    charIdx++;
  }

  typingEl.textContent = current.substring(0, charIdx);

  let delay = isDeleting ? 55 : 105;

  if (!isDeleting && charIdx === current.length) {
    delay = 2200;
    isDeleting = true;
  } else if (isDeleting && charIdx === 0) {
    isDeleting = false;
    typingIdx = (typingIdx + 1) % typingTexts.length;
    delay = 380;
  }

  setTimeout(typeLoop, delay);
}

setTimeout(typeLoop, 900);

// ===========================
// ASYNC CONTACT FORM
// ===========================
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');
const submitBtn = document.getElementById('submitBtn');

if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const originalHTML = submitBtn.innerHTML;
    submitBtn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg> Sending...';
    submitBtn.disabled = true;

    try {
      const response = await fetch(contactForm.action, {
        method: 'POST',
        body: new FormData(contactForm),
        headers: { Accept: 'application/json' },
      });

      if (response.ok) {
        formSuccess.classList.add('show');
        contactForm.reset();
        setTimeout(() => formSuccess.classList.remove('show'), 7000);
      } else {
        throw new Error('Submission failed');
      }
    } catch {
      alert('Something went wrong. Please email me directly at ashutoshbpurani99@gmail.com');
    }

    submitBtn.innerHTML = originalHTML;
    submitBtn.disabled = false;
  });
}
