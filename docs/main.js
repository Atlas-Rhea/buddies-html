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