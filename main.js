/**
 * Objectif Visa — Main Interactive Script
 * Responsive Navigation, Mobile Drawer & UX micro-interactions
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initFaqAccordion();
  initButtonSwap();
});

/**
 * Mobile Navigation Burger Toggle & Drawer
 */
function initMobileMenu() {
  const burgerBtn = document.getElementById('burger-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const backdrop = document.getElementById('mobile-backdrop');

  if (!burgerBtn || !mobileMenu) return;

  let scrollLocked = false;
  let lockedScrollTop = 0;

  function lockScroll() {
    if (scrollLocked) return;
    lockedScrollTop = window.pageYOffset || document.documentElement.scrollTop || 0;
    document.body.style.position = 'fixed';
    document.body.style.top = '-' + lockedScrollTop + 'px';
    document.body.style.left = '0';
    document.body.style.right = '0';
    scrollLocked = true;
  }

  function unlockScroll() {
    if (!scrollLocked) return;
    scrollLocked = false;
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.left = '';
    document.body.style.right = '';
    document.documentElement.style.scrollBehavior = 'auto';
    window.scrollTo(0, lockedScrollTop);
    document.documentElement.style.scrollBehavior = '';
  }

  function openMenu() {
    burgerBtn.classList.add('is-active');
    mobileMenu.classList.add('is-active');
    if (backdrop) backdrop.classList.add('is-active');
    burgerBtn.setAttribute('aria-expanded', 'true');
    mobileMenu.setAttribute('aria-hidden', 'false');
    lockScroll();
  }

  function closeMenu() {
    burgerBtn.classList.remove('is-active');
    mobileMenu.classList.remove('is-active');
    if (backdrop) backdrop.classList.remove('is-active');
    burgerBtn.setAttribute('aria-expanded', 'false');
    mobileMenu.setAttribute('aria-hidden', 'true');
    unlockScroll();
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
 * Button text-swap hover effect — wraps each .btn label in two layers
 * so CSS can slide the label out and its duplicate in (see styles.css).
 */
function initButtonSwap() {
  document.querySelectorAll('.btn').forEach((btn) => {
    if (btn.querySelector('.btn-label')) return;

    const label = (btn.textContent || '').replace(/\s+/g, ' ').trim();
    if (!label) return;

    const nodes = [];
    Array.from(btn.childNodes).forEach((node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        const text = (node.textContent || '').trim();
        if (text) {
          const span = document.createElement('span');
          span.className = 'btn-label';
          span.textContent = text;
          nodes.push(span);
        }
      } else {
        nodes.push(node);
      }
    });

    const swap = document.createElement('span');
    swap.className = 'btn-text-swap';
    swap.setAttribute('aria-hidden', 'true');
    swap.textContent = label;

    btn.replaceChildren(...nodes, swap);
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
