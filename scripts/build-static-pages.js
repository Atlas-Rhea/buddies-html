const fs = require('fs');
const path = require('path');

// Helper to build a static HTML file with inlined sections
function buildStaticPage({
  templatePath,
  outputPath,
  sectionFiles,
  sectionsDir,
}) {
  // Read the template HTML
  let html = fs.readFileSync(templatePath, 'utf8');

  // Read and concatenate all section files
  let sectionsContent = '';
  for (const file of sectionFiles) {
    const filePath = path.join(sectionsDir, file);
    if (fs.existsSync(filePath)) {
      sectionsContent += fs.readFileSync(filePath, 'utf8') + '\n';
    } else {
      console.warn(`Section file not found: ${file}`);
    }
  }

  // Replace <div id="sections"></div> or <div id="sections"></div> (with whitespace) with inlined sections
  html = html.replace(/<div id="sections">[\s\S]*?<\/div>/, `<div id="sections">\n${sectionsContent}</div>`);

  // Remove the JS that fetches sections at runtime (the <script type="module"> block that loads sections)
  html = html.replace(/<script type="module">[\s\S]*?<\/script>/, '');

  // Post-process asset references (like update-docs-index.js)
  html = html
    .replace(/(["'(])buddies-html\/assets\//g, '$1assets/')
    .replace(/(["'(])\/assets\//g, '$1assets/')
    .replace(/assets\/\/+/, 'assets/');

  // Remove any <script src="main.js"></script> from the final HTML
  html = html.replace(/<script\s+src=["']main\.js["']><\/script>/g, '');

  // Write to output
  fs.writeFileSync(outputPath, html, 'utf8');
  console.log(`${outputPath} built with inlined sections.`);
}

const sectionsDir = path.join(__dirname, '../src/sections');
const docsDir = path.join(__dirname, '../docs');

// Section order for index.html
const indexSectionOrder = [
  'nav-bar.html',
  'hero.html',
  // 'join-us.html',
  'about-us.html',
  'what-we-do.html',
  'rules.html',
  'champions.html',
  'sponsors.html',
  'trusted.html',
  'gallery.html',
  'footer.html',
];

// Build index.html using dist/index.html as the template
buildStaticPage({
  templatePath: path.join(__dirname, '../dist/index.html'),
  outputPath: path.join(docsDir, 'index.html'),
  sectionFiles: indexSectionOrder,
  sectionsDir,
});

// Build event.html using dist/index.html as the template
buildStaticPage({
  templatePath: path.join(__dirname, '../dist/index.html'),
  outputPath: path.join(docsDir, 'event.html'),
  sectionFiles: [
    'nav-bar.html',
    'event-details.html',
    'footer.html',
  ],
  sectionsDir,
});

// Build gallery-masonry.html using dist/index.html as the template
buildStaticPage({
  templatePath: path.join(__dirname, '../dist/index.html'),
  outputPath: path.join(docsDir, 'gallery-masonry.html'),
  sectionFiles: [
    'nav-bar.html',
    'gallery-masonry-content.html',
    'footer.html',
  ],
  sectionsDir,
}); 