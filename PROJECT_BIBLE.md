# Project Bible

## Overview

The Buddies HTML Prototype is a single-page responsive website for the Buddies Open golf tournament. It aims to:
- Inform participants about event rules, history, registration, and charity initiatives.
- Highlight past champions in an engaging, accessible slider.
- Showcase sponsors, partners, and trusted stakeholders across devices.
- Promote donation and registration flows with clear CTAs.
- Optimize for performance, accessibility (WCAG AA), and maintainability.

### Target Audience
- Tournament participants and families
- Corporate sponsors and partners
- Charity donors and general visitors

### Non-functional Requirements
- Fast load times (<1s on mobile)
- Mobile-first, responsive design
- Cross-browser compatibility (Chrome, Safari, Edge)
- Accessibility compliance (ARIA labels, keyboard navigation)

## Recent Changes

- **2025-05-23**: Initial PROJECT_BIBLE.md created with outline.
- **2025-05-24**: Expanded Overview, Architecture, Core Components, User Flows, and External Dependencies sections with detailed descriptions.
- **2025-05-24**: Replaced mobile year selector in Champions section with a dropdown pill design featuring previous/next controls and smooth crossfade transitions.
- **2025-05-24**: Fixed liftkit-css directory by removing embedded Git repository while preserving CSS framework files.

## Architecture

### Directory Structure
```
buddies-html/
├─ src/
│  ├─ sections/         # Partial HTML templates per section (champions, rules, about, gallery)
│  └─ styles/           # Tailwind config and custom CSS overrides
├─ assets/              # Static assets: images, icons, gallery source
├─ docs/                # Output of static build: index.html, assets/
├─ scripts/             # Node build scripts (build-static-pages, update-docs-index)
├─ gallery_scraper.py   # Optional Python script for scraping gallery images
├─ tailwind.config.js   # Tailwind CSS configuration
├─ vite.config.js       # Vite development and build settings
├─ package.json         # NPM dependencies and scripts
└─ PROJECT_BIBLE.md     # This canonical reference
```

### Build Process
- `npm run dev`: Launches Vite dev server with hot reload
- `npm run build`: Bundles assets and generates static pages via Node scripts
- `npm run postbuild`: Copies build artifacts into `docs/` for deployment
- `npm run push-to-live`: Automates build, postbuild, Git commit, and push to `main`

### Styling & Theming
- Tailwind CSS (v4) for utility-first styling
- Custom theme overrides in `src/styles`
- PostCSS autoprefixer and forms plugin
- Inline `<style>` blocks for component-specific overrides

### Scripting & Interaction
- Vanilla JS for mobile menu toggle (ARIA-enabled)
- Champions year selector with smooth scroll and dynamic class toggling

## Core Components

### Navigation Bar
- Fixed header with desktop horizontal menu and CTA button
- Mobile hamburger menu toggling a slide-down menu
- ARIA attributes ensure screen reader compatibility

### Hero Section
- Full-viewport background image with dual gradient overlay
- Prominent header text and two CTA buttons: Donate & Register
- Responsive text and button sizes across breakpoints

### About Section
- Two-column layout: event legend text and image card
- Mobile tag overlay indicating "32 Years of Legendary Tradition"

### Rules Section
- Card UI with scrollable rule list on mobile
- Paired images and numbered lists for clarity
- Consistent typography and spacing

### Previous Champions Section
- Styled green year selector inside a rounded card
- Horizontal scroll fallback and mobile flex layout
- Dynamic winner details displayed per selected year

### Sponsors Section
- Responsive grid of sponsor logos
- Collapses to single column on narrow viewports
- Accessible `alt` attributes on all logos

### Gallery Section
- Masonry-style image grid powered by CSS grid
- Conditional show/hide for gallery items based on viewport size
- "See all" button links to full gallery page

### Footer
- Contact information with icons (email, phone)
- Newsletter signup form with validation styling
- Copyright and brand messaging

## User Flows

1. **Page Navigation**
   - User clicks on nav links or hamburger menu → smooth scroll to section
2. **Champion Year Selection**
   - User taps/swipes year in selector bar → JS updates champion details without full reload
3. **Gallery Exploration**
   - User browses grid → taps "See all" → navigates to full gallery page
4. **Newsletter Signup**
   - User enters email → form submission (placeholder for integration)
5. **Donate & Register CTAs**
   - User clicks Donate/Register → scrolls or navigates to respective anchor or external form

## External Dependencies

### NPM Packages
- `tailwindcss@^4.1.5`, `@tailwindcss/forms@^0.5.10`, `@tailwindcss/vite@^4.1.5`
- `postcss@^8.5.3`, `autoprefixer@^10.4.21`
- `vite@^4.1.5`
- `@playwright/test@^1.52.0` (browser/visual tests)
- `stylelint@^16.19.1`
- `@fortawesome/fontawesome-free@^6.7.2`, `@heroicons/react@^2.2.0`, `@tabler/icons@^3.31.0`
- `@squoosh/cli@^0.7.1` (image optimization)
- `ncp-cli@^1.0.4` (asset copying in postbuild)
- `serve@^14.2.4` (local static server)
- `bivvy@^0.1.5` (pitch management)

### Python
- `Scrapy` for optional gallery asset scraping (`gallery_scraper.py`)

### External Services
- Google Fonts: Montserrat & Roboto
- Deployment targets: GitHub Pages, Netlify, or any static host 