/**
 * Objectif Visa — Main Interactive Script
 * Responsive Navigation, Mobile Drawer & UX micro-interactions
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initFaqAccordion();
});

/**
 * Mobile Navigation Burger Toggle & Drawer
 */
function initMobileMenu() {
  const burgerBtn = document.getElementById('burger-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const backdrop = document.getElementById('mobile-backdrop');

  if (!burgerBtn || !mobileMenu) return;

  function openMenu() {
    burgerBtn.classList.add('is-active');
    mobileMenu.classList.add('is-active');
    if (backdrop) backdrop.classList.add('is-active');
    burgerBtn.setAttribute('aria-expanded', 'true');
    mobileMenu.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    burgerBtn.classList.remove('is-active');
    mobileMenu.classList.remove('is-active');
    if (backdrop) backdrop.classList.remove('is-active');
    burgerBtn.setAttribute('aria-expanded', 'false');
    mobileMenu.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function toggleMenu() {
    const isExpanded = burgerBtn.getAttribute('aria-expanded') === 'true';
    if (isExpanded) {
      closeMenu();
    } else {
      openMenu();
    }
  }

  burgerBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMenu();
  });

  if (backdrop) {
    backdrop.addEventListener('click', closeMenu);
  }

  // Close when clicking any nav link in mobile menu
  const mobileLinks = mobileMenu.querySelectorAll('a');
  mobileLinks.forEach((link) => {
    link.addEventListener('click', () => {
      closeMenu();
    });
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && burgerBtn.classList.contains('is-active')) {
      closeMenu();
      burgerBtn.focus();
    }
  });

  // Reset state if resized beyond tablet breakpoint (992px)
  window.addEventListener('resize', () => {
    if (window.innerWidth > 992 && burgerBtn.classList.contains('is-active')) {
      closeMenu();
    }
  });
}

/**
 * FAQ Smooth Details Accordion (optional progressive enhancement)
 */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  if (!faqItems.length) return;

  faqItems.forEach((item) => {
    const summary = item.querySelector('summary');
    if (!summary) return;

    summary.addEventListener('click', (e) => {
      // Allow native browser details behavior
    });
  });
}
