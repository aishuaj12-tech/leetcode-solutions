/**
 * AISHWARYA A J - PERSONAL PORTFOLIO JAVASCRIPT
 * 3rd Semester | Computer Science and Engineering
 * Fully Interactive, Accessible, and Polished
 */

'use strict';

document.addEventListener('DOMContentLoaded', () => {
  // -------------------------------------------------------------
  // 1. THEME TOGGLE (Dark / Light) with LocalStorage Persistence
  // -------------------------------------------------------------
  const themeToggleBtn = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-toggle-icon');

  const savedTheme = localStorage.getItem('aishwarya-portfolio-theme') || 'dark';
  applyTheme(savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
      const targetTheme = currentTheme === 'dark' ? 'light' : 'dark';
      applyTheme(targetTheme);
    });
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('aishwarya-portfolio-theme', theme);
    if (themeIcon) {
      if (theme === 'dark') {
        themeIcon.className = 'icon icon-sun';
      } else {
        themeIcon.className = 'icon icon-moon';
      }
    }
  }

  // -------------------------------------------------------------
  // 2. MOBILE NAVIGATION MENU (Drawer Toggle & Auto-Close)
  // -------------------------------------------------------------
  const menuToggle = document.getElementById('menu-toggle');
  const menuToggleIcon = document.getElementById('menu-toggle-icon');
  const navLinks = document.getElementById('nav-links');

  function openMobileMenu() {
    if (!navLinks) return;
    navLinks.classList.add('open');
    if (menuToggle) menuToggle.setAttribute('aria-expanded', 'true');
    if (menuToggleIcon) menuToggleIcon.className = 'icon icon-close';
  }

  function closeMobileMenu() {
    if (!navLinks) return;
    navLinks.classList.remove('open');
    if (menuToggle) menuToggle.setAttribute('aria-expanded', 'false');
    if (menuToggleIcon) menuToggleIcon.className = 'icon icon-menu';
  }

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = navLinks.classList.contains('open');
      if (isOpen) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });

    // Auto-close menu when clicking any nav link
    document.querySelectorAll('.nav-link').forEach((link) => {
      link.addEventListener('click', () => {
        closeMobileMenu();
      });
    });

    // Auto-close menu when clicking outside of navbar
    document.addEventListener('click', (e) => {
      if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
        closeMobileMenu();
      }
    });

    // Auto-close menu on Escape key press
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navLinks.classList.contains('open')) {
        closeMobileMenu();
      }
    });

    // Auto-close on viewport resize to desktop
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768 && navLinks.classList.contains('open')) {
        closeMobileMenu();
      }
    }, { passive: true });
  }

  // -------------------------------------------------------------
  // 3. SCROLL REVEAL ENTRANCE ANIMATIONS (IntersectionObserver)
  // -------------------------------------------------------------
  const revealElements = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      rootMargin: '0px 0px -40px 0px',
      threshold: 0.12
    });

    revealElements.forEach((el) => {
      revealObserver.observe(el);
    });
  } else {
    // Graceful fallback for older environments
    revealElements.forEach((el) => {
      el.classList.add('in-view');
    });
  }

  // -------------------------------------------------------------
  // 4. NAVBAR STICKY SHADOW & ACTIVE NAV LINK HIGHLIGHT ON SCROLL
  // -------------------------------------------------------------
  const navbar = document.getElementById('navbar');
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.nav-link');

  function updateNavbar() {
    if (window.scrollY > 40) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }

    let activeId = '';
    const scrollPosition = window.scrollY + 140;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        activeId = section.getAttribute('id');
      }
    });

    navItems.forEach((item) => {
      item.classList.remove('active');
      const href = item.getAttribute('href');
      if (href === `#${activeId}`) {
        item.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', updateNavbar, { passive: true });
  updateNavbar();

  // -------------------------------------------------------------
  // 5. SMOOTH SCROLLING FOR ALL INTERNAL ANCHOR LINKS
  // -------------------------------------------------------------
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId && targetId !== '#') {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          const navbarHeight = 68;
          const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - navbarHeight;
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  });

  // -------------------------------------------------------------
  // 6. BACK TO TOP BUTTON (Smooth Scroll to Top)
  // -------------------------------------------------------------
  const backToTopBtn = document.getElementById('back-to-top');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // -------------------------------------------------------------
  // 7. COPY REPOSITORY URL BUTTON ("Copied!" State & Toast)
  // -------------------------------------------------------------
  const copyBtn = document.getElementById('btn-project-copy');
  const copyBtnText = document.getElementById('copy-btn-text');
  const copyBtnIcon = document.getElementById('copy-btn-icon');
  const toast = document.getElementById('toast-notification');
  const toastText = document.getElementById('toast-text');
  let copyResetTimer = null;
  let toastTimer = null;

  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      const repoUrl = copyBtn.getAttribute('data-url') || 'https://github.com/aishuaj12-tech/leetcode-solutions';

      const showCopiedFeedback = () => {
        // Change button styling and content
        if (copyBtnText) copyBtnText.textContent = 'Copied!';
        if (copyBtnIcon) copyBtnIcon.className = 'icon icon-check';
        copyBtn.classList.add('btn-copied');

        // Show toast notification
        showToast('Copied! GitHub Repository URL copied to clipboard.');

        // Revert button after 2.5 seconds
        if (copyResetTimer) clearTimeout(copyResetTimer);
        copyResetTimer = setTimeout(() => {
          if (copyBtnText) copyBtnText.textContent = 'Copy Repository Link';
          if (copyBtnIcon) copyBtnIcon.className = 'icon icon-copy';
          copyBtn.classList.remove('btn-copied');
        }, 2500);
      };

      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(repoUrl)
          .then(showCopiedFeedback)
          .catch(() => {
            fallbackCopy(repoUrl);
            showCopiedFeedback();
          });
      } else {
        fallbackCopy(repoUrl);
        showCopiedFeedback();
      }
    });
  }

  function fallbackCopy(text) {
    try {
      const tempInput = document.createElement('input');
      tempInput.value = text;
      document.body.appendChild(tempInput);
      tempInput.select();
      document.execCommand('copy');
      document.body.removeChild(tempInput);
    } catch (err) {
      console.warn('Fallback copy failed:', err);
    }
  }

  function showToast(message) {
    if (!toast) return;
    if (toastText) toastText.textContent = message;
    if (toastTimer) clearTimeout(toastTimer);

    toast.classList.add('show');
    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  }

  // -------------------------------------------------------------
  // 8. INTERACTIVE CONTACT FORM (Validation & Feedback)
  // -------------------------------------------------------------
  const contactForm = document.getElementById('portfolio-contact-form');
  const statusMsg = document.getElementById('form-status-msg');

  if (contactForm && statusMsg) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('contact-name');
      const emailInput = document.getElementById('contact-email');
      const msgInput = document.getElementById('contact-message');

      const name = nameInput ? nameInput.value.trim() : '';
      const email = emailInput ? emailInput.value.trim() : '';
      const message = msgInput ? msgInput.value.trim() : '';

      // Reset prior status
      statusMsg.className = 'form-status';
      statusMsg.textContent = '';
      statusMsg.style.display = 'none';

      // Validation 1: Name
      if (!name || name.length < 2) {
        statusMsg.textContent = 'Please enter your name (minimum 2 characters).';
        statusMsg.className = 'form-status error';
        statusMsg.style.display = 'block';
        if (nameInput) nameInput.focus();
        return;
      }

      // Validation 2: Email format
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email || !emailPattern.test(email)) {
        statusMsg.textContent = 'Please enter a valid email address.';
        statusMsg.className = 'form-status error';
        statusMsg.style.display = 'block';
        if (emailInput) emailInput.focus();
        return;
      }

      // Validation 3: Message
      if (!message || message.length < 5) {
        statusMsg.textContent = 'Please enter a message with at least 5 characters.';
        statusMsg.className = 'form-status error';
        statusMsg.style.display = 'block';
        if (msgInput) msgInput.focus();
        return;
      }

      // Valid submission success feedback
      statusMsg.textContent = `Thank you, ${name}! Your message has been sent successfully.`;
      statusMsg.className = 'form-status success';
      statusMsg.style.display = 'block';
      contactForm.reset();

      // Clear success message after 7 seconds
      setTimeout(() => {
        if (statusMsg.className.includes('success')) {
          statusMsg.style.display = 'none';
          statusMsg.textContent = '';
        }
      }, 7000);
    });
  }
});
