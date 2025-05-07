const fs = require('fs');
const path = require('path');

const distAssetsDir = path.join(__dirname, '../dist/assets');
const docsAssetsDir = path.join(__dirname, '../docs/assets');

// Find the built CSS file (index-*.css)
const files = fs.readdirSync(distAssetsDir);
const cssFile = files.find(f => /^index-.*\.css$/.test(f));

if (!cssFile) {
  console.error('No built CSS file found in dist/assets');
  process.exit(1);
}

const src = path.join(distAssetsDir, cssFile);
const dest = path.join(docsAssetsDir, 'index.css');

fs.copyFileSync(src, dest);
console.log(`Copied ${cssFile} to docs/assets/index.css`); 