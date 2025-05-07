# Buddies HTML

A static website for the Buddies Open event, built for easy deployment on GitHub Pages and local development with Vite or a simple static server.

## Features
- Static HTML, CSS, and JS
- All assets in the root `assets/` directory for compatibility with Vite and GitHub Pages
- Ready for client demos and public sharing

## Local Development
To preview the site locally:

1. Install dependencies (if you haven't already):
   ```sh
   npm install
   ```
2. Start the Vite dev server:
   ```sh
   npm run dev
   ```
3. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Deployment
- Push to the `main` branch to update the live site on GitHub Pages.
- All asset paths are relative for seamless deployment.

## Directory Structure
```
buddies-html/
  assets/           # All images and static assets
  src/              # Source HTML, CSS, JS, and sections
  index.html        # Main entry point
  ...
```

## License
MIT 