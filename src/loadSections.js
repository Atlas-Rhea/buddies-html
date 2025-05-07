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

  // Mobile menu toggle logic (must run after nav-bar is in DOM)
  const toggle = document.getElementById('mobile-menu-toggle');
  const menu = document.getElementById('mobile-menu');
  if (toggle && menu) {
    toggle.addEventListener('click', function() {
      const isOpen = menu.classList.toggle('hidden') === false;
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
  }
}); 