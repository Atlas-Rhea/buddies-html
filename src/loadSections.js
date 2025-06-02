// Dynamically load and inject section partials for live preview
const sectionFiles = [
  'nav-bar.html',
  'hero.html',
  'join-us.html',
  'what-we-do.html',
  'about-us.html',
  'rules.html',
  'champions.html',
  'sponsors.html',
  'trusted.html',
  'gallery.html',
  'footer.html',
  // Add more: 'rules-summary.html', etc.
];

const container = document.getElementById('sections');

Promise.all(
  sectionFiles.map(file =>
    fetch(`/src/sections/${file}`).then(res => res.text())
  )
).then(htmlArr => {
  container.innerHTML = htmlArr.join('\n');

  // Champions year selector logic (must run after champions section is in DOM)
  const yearSelector = document.getElementById('year-selector');
  if (yearSelector) {
    const yearLinks = yearSelector.querySelectorAll('.year-link');
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

  // Mobile menu toggle logic (must run after nav-bar is in DOM)
  const toggle = document.getElementById('mobile-menu-toggle');
  const menu = document.getElementById('mobile-menu');
  if (toggle && menu) {
    toggle.addEventListener('click', function() {
      const isOpen = menu.classList.toggle('hidden') === false;
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
  }

  // --- Ensure hero height and scroll margin logic runs after sections are loaded ---
  if (typeof window.setHeroHeight === 'function') window.setHeroHeight();
  if (typeof window.setScrollMarginTop === 'function') window.setScrollMarginTop();
  if (typeof window.setHeroParallax === 'function') window.setHeroParallax();
  window.addEventListener('resize', () => {
    if (typeof window.setHeroHeight === 'function') window.setHeroHeight();
    if (typeof window.setScrollMarginTop === 'function') window.setScrollMarginTop();
    if (typeof window.setHeroParallax === 'function') window.setHeroParallax();
  });
}); 