import { defineConfig } from 'vite';
import path from 'path';
import fs from 'fs';

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

function injectSectionsPlugin() {
  return {
    name: 'inject-sections',
    enforce: 'post',
    apply: 'build',
    closeBundle() {
      const distIndexPath = path.resolve(__dirname, 'dist/index.html');
      if (!fs.existsSync(distIndexPath)) return;
      let indexHtml = fs.readFileSync(distIndexPath, 'utf8');
      // Read and concatenate all section files
      const sectionsDir = path.resolve(__dirname, 'src/sections');
      let sectionsContent = '';
      for (const file of sectionOrder) {
        const filePath = path.join(sectionsDir, file);
        if (fs.existsSync(filePath)) {
          sectionsContent += fs.readFileSync(filePath, 'utf8') + '\n';
        }
      }
      // Inject into #sections div
      indexHtml = indexHtml.replace(
        /(<div id="sections">)([\s\S]*?)(<\/div>)/,
        `$1\n${sectionsContent}$3`
      );
      fs.writeFileSync(distIndexPath, indexHtml, 'utf8');
      console.log('Injected sections into dist/index.html');
    },
  };
}

export default defineConfig({
  base: '/buddies-html/',
  build: {
    rollupOptions: {
      // Use default output options so Vite will hash CSS and JS filenames
    },
  },
  plugins: [injectSectionsPlugin()],
}); 