// Entry point for Vite dev server
// You can add interactive logic here later 

// Champions year selector logic
if (document.getElementById('year-selector')) {
  const yearLinks = document.querySelectorAll('#year-selector .year-link');
  const yearBlocks = document.querySelectorAll('.year-winners');
  yearLinks.forEach(link => {
    link.addEventListener('click', function() {
      const year = link.getAttribute('data-year');
      // Toggle styles
      yearLinks.forEach(l => l.classList.remove('selected-year'));
      link.classList.add('selected-year');
      // Show only the selected year
      yearBlocks.forEach(block => {
        if (block.getAttribute('data-year') === year) {
          block.classList.remove('hidden');
        } else {
          block.classList.add('hidden');
        }
      });
    });
  });
  // Show the latest year by default
  if (yearLinks.length > 0) yearLinks[0].click();
} 

// Gallery Masonry Year Switcher
if (document.querySelector('.timeline-scroll-container') && document.querySelector('.masonry')) {
  const yearButtons = document.querySelectorAll('.timeline-year');
  const masonryGroups = document.querySelectorAll('.masonry-group');
  yearButtons.forEach(btn => {
    btn.addEventListener('click', function() {
      const year = btn.textContent.trim();
      // Toggle active class
      yearButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      // Show only the selected year group
      masonryGroups.forEach(group => {
        if (group.getAttribute('data-year') === year) {
          group.classList.remove('gallery-hidden', 'hidden');
        } else {
          group.classList.add('gallery-hidden');
        }
      });
    });
  });
  // Show the latest year by default
  if (yearButtons.length > 0) yearButtons[0].click();
}

// --- Hero Section Full Viewport Height Minus Nav Bar ---
function setHeroHeight() {
  const nav = document.querySelector('nav');
  const hero = document.querySelector('section'); // Assumes hero is the first section
  if (nav && hero) {
    const navHeight = nav.offsetHeight;
    hero.style.minHeight = `calc(100vh - ${navHeight}px)`;
    hero.style.paddingTop = navHeight + 'px'; // Ensure overlay starts below nav bar
  }
}
window.setHeroHeight = setHeroHeight;

// --- Smooth Scroll Offset for Anchors (scroll-margin-top) ---
function setScrollMarginTop() {
  const nav = document.querySelector('nav');
  if (!nav) return;
  const navHeight = nav.offsetHeight;
  // All sections with an id (anchors)
  document.querySelectorAll('section[id], div[id]').forEach(el => {
    el.style.scrollMarginTop = navHeight + 'px';
  });
}
window.setScrollMarginTop = setScrollMarginTop;

// --- Parallax Effect for Hero Image ---
function setHeroParallax() {
  const heroSection = document.querySelector('section');
  const heroImg = heroSection && heroSection.querySelector('img');
  if (!heroSection || !heroImg) return;
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    // Parallax: move image slower than scroll (adjust 0.4 for more/less effect)
    heroImg.style.transform = `translateY(${scrollY * 0.4}px)`;
  });
}
window.setHeroParallax = setHeroParallax;

// Ensure hero height and scroll margin logic runs on page load and resize (for production)
if (typeof window.setHeroHeight === 'function') window.setHeroHeight();
if (typeof window.setScrollMarginTop === 'function') window.setScrollMarginTop();
if (typeof window.setHeroParallax === 'function') window.setHeroParallax();

window.addEventListener('resize', () => {
  if (typeof window.setHeroHeight === 'function') window.setHeroHeight();
  if (typeof window.setScrollMarginTop === 'function') window.setScrollMarginTop();
  if (typeof window.setHeroParallax === 'function') window.setHeroParallax();
}); 

// Mobile menu toggle logic (for production)
const toggle = document.getElementById('mobile-menu-toggle');
const menu = document.getElementById('mobile-menu');
if (toggle && menu) {
  toggle.addEventListener('click', function() {
    const isOpen = menu.classList.toggle('hidden') === false;
    toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });
} 