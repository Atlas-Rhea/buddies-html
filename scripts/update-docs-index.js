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
const docsDir = path.join(__dirname, '../docs');
const docsIndexPath = path.join(docsDir, 'index.html');

// Ensure docs directory exists
if (!fs.existsSync(docsDir)) {
  fs.mkdirSync(docsDir, { recursive: true });
}

// If docs/index.html does not exist, create it with a minimal template
if (!fs.existsSync(docsIndexPath)) {
  fs.writeFileSync(
    docsIndexPath,
    `<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8" />\n  <meta name="viewport" content="width=device-width, initial-scale=1.0" />\n  <title>Buddies Open HTML Prototype</title>\n  <link rel="stylesheet" href="assets/index.css">\n</head>\n<body>\n  <div id="app">\n    <div id="sections">\n      <!-- SECTIONS_START -->\n      <!-- SECTIONS_END -->\n    </div>\n  </div>\n</body>\n</html>\n`
  );
}

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

// Post-process: ensure all asset references use 'assets/' (no leading slash, no buddies-html/ prefix)
let finalHtml = fs.readFileSync(docsIndexPath, 'utf8')
  // Replace any src="buddies-html/assets/ or href="buddies-html/assets/ or url('buddies-html/assets/ or url("buddies-html/assets/
  .replace(/(["'(])buddies-html\/assets\//g, '$1assets/')
  // Replace any src="/assets/ or href="/assets/ or url('/assets/ or url("/assets/
  .replace(/(["'(])\/assets\//g, '$1assets/')
  // Remove any accidental double slashes
  .replace(/assets\/\/+/, 'assets/');

// Only inject main.js, do not inject loadSections.js
const scriptTags = '\n    <script src="main.js"></script>\n';
finalHtml = finalHtml.replace(/<\/body>/i, scriptTags + '</body>');

fs.writeFileSync(docsIndexPath, finalHtml, 'utf8');

console.log('docs/index.html updated with latest sections, asset references, and script tags.'); 