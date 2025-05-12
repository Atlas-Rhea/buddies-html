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

// Ensure hero height and scroll margin logic runs on page load and resize (for production)
if (typeof window.setHeroHeight === 'function') window.setHeroHeight();
if (typeof window.setScrollMarginTop === 'function') window.setScrollMarginTop();

window.addEventListener('resize', () => {
  if (typeof window.setHeroHeight === 'function') window.setHeroHeight();
  if (typeof window.setScrollMarginTop === 'function') window.setScrollMarginTop();
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