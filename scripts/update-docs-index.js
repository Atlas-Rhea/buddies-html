const fs = require('fs');
const path = require('path');

// Section order as specified
const sectionOrder = [
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
];

const sectionsDir = path.join(__dirname, '../src/sections');
const docsIndexPath = path.join(__dirname, '../docs/index.html');

// Read and concatenate all section files
let sectionsContent = '';
for (const file of sectionOrder) {
  const filePath = path.join(sectionsDir, file);
  if (fs.existsSync(filePath)) {
    sectionsContent += fs.readFileSync(filePath, 'utf8') + '\n';
  } else {
    console.warn(`Section file not found: ${file}`);
  }
}

// Read docs/index.html
let indexHtml = fs.readFileSync(docsIndexPath, 'utf8');

// Replace content between <!-- SECTIONS_START --> and <!-- SECTIONS_END -->
const startMarker = '<!-- SECTIONS_START -->';
const endMarker = '<!-- SECTIONS_END -->';
const startIdx = indexHtml.indexOf(startMarker);
const endIdx = indexHtml.indexOf(endMarker);

if (startIdx === -1 || endIdx === -1) {
  console.error('Section markers not found in docs/index.html');
  process.exit(1);
}

const before = indexHtml.slice(0, startIdx + startMarker.length);
const after = indexHtml.slice(endIdx);
const newHtml = before + '\n' + sectionsContent + after;

fs.writeFileSync(docsIndexPath, newHtml, 'utf8');
console.log('docs/index.html updated with latest sections.'); 