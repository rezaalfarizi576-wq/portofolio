/**
 * PORTFOLIO SCRIPT: script.js
 * Controls Navigation, Sticky Header, Active Links, Copy Email, and Contact Form
 */

document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const header = document.getElementById('header');
  const menuToggle = document.getElementById('menu-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  const backToTopBtn = document.getElementById('back-to-top');
  const btnCopyEmail = document.getElementById('btn-copy-email');
  const contactEmail = document.getElementById('contact-email');
  const contactForm = document.getElementById('portfolio-contact-form');
  const formFeedback = document.getElementById('form-feedback');

  // 1. STICKY HEADER & SCROLL BEHAVIOR
  const handleScroll = () => {
    const scrollY = window.scrollY;

    // Header shadow on scroll
    if (scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Back to top button visibility
    if (scrollY > 400) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }

    // Highlight current active nav item
    updateActiveNavLink();
  };

  window.addEventListener('scroll', handleScroll, { passive: true });

  // 2. MOBILE MENU TOGGLE
  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', isOpen);
    });

    // Close menu when clicking a link
    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        if (navMenu.classList.contains('open')) {
          navMenu.classList.remove('open');
          menuToggle.setAttribute('aria-expanded', 'false');
        }
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (event) => {
      if (
        navMenu.classList.contains('open') &&
        !navMenu.contains(event.target) &&
        !menuToggle.contains(event.target)
      ) {
        navMenu.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // 3. ACTIVE NAV LINK ON SCROLL (SPY NAVIGATION)
  const sections = document.querySelectorAll('section[id]');

  function updateActiveNavLink() {
    const scrollPosition = window.scrollY + 120;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (
        scrollPosition >= sectionTop &&
        scrollPosition < sectionTop + sectionHeight
      ) {
        navLinks.forEach((link) => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  // 4. BACK TO TOP CLICK
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // 5. COPY EMAIL TO CLIPBOARD
  if (btnCopyEmail && contactEmail) {
    btnCopyEmail.addEventListener('click', async () => {
      const emailText = contactEmail.textContent.trim();

      // If it's still a placeholder or valid email
      const textToCopy = emailText.includes('@')
        ? emailText.replace(/\[|\]/g, '').split('—').pop().trim()
        : emailText;

      try {
        await navigator.clipboard.writeText(textToCopy);
        const originalText = btnCopyEmail.textContent;
        btnCopyEmail.textContent = 'Tersalin!';
        btnCopyEmail.style.borderColor = 'var(--color-primary)';
        btnCopyEmail.style.color = 'var(--color-primary)';

        setTimeout(() => {
          btnCopyEmail.textContent = originalText;
          btnCopyEmail.style.borderColor = '';
          btnCopyEmail.style.color = '';
        }, 2200);
      } catch (err) {
        // Fallback for older browsers
        const tempInput = document.createElement('input');
        tempInput.value = textToCopy;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);

        btnCopyEmail.textContent = 'Tersalin!';
        setTimeout(() => {
          btnCopyEmail.textContent = 'Salin';
        }, 2000);
      }
    });
  }

  // 6. CONTACT FORM SUBMISSION HANDLER
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('contact-name').value.trim();
      const email = document.getElementById('contact-email-input').value.trim();
      const subject = document.getElementById('contact-subject').value.trim();
      const message = document.getElementById('contact-message').value.trim();

      if (!name || !email || !subject || !message) {
        showFeedback('Mohon isi semua field yang tersedia.', 'error');
        return;
      }

      // Simple frontend mock submission feedback
      showFeedback(
        `Terima kasih, ${name}! Pesan Anda telah dicatat. Form ini berjalan secara statis di portofolio Anda. Anda juga dapat langsung menghubungi email pengembang.`,
        'success'
      );

      contactForm.reset();
    });
  }

  function showFeedback(message, type) {
    if (!formFeedback) return;
    formFeedback.textContent = message;
    formFeedback.className = `form-feedback ${type}`;
    formFeedback.style.display = 'block';

    setTimeout(() => {
      formFeedback.style.display = 'none';
      formFeedback.textContent = '';
      formFeedback.className = 'form-feedback';
    }, 6000);
  }

  // Initial trigger for active link
  updateActiveNavLink();
});
