<Climb>
  <header>
    <id>02b7</id>
    <type>feature</type>
    <description>Convert Buddies Open Figma design into a mobile-first, static HTML/Tailwind prototype using an image-per-section workflow, with interactive section capture and automated export to HTML partials, assembled via Vite for live preview and QA.</description>
  <newDependencies>None beyond those listed in the PRD. (User can update if new ones arise.)</newDependencies>
  <prerequisitChanges>Ensure Node 20+, Vite, Tailwind, PostCSS, and CLI tools (axe-core, Framelink, NCP) are available. Confirm access to Figma and copy PDF assets.</prerequisitChanges>
  <relevantFiles>
    - src/sections/* (HTML partials)
    - dist/style.css (Tailwind/PostCSS output)
    - vite.config.js, postcss.config.js
    - /reports/ (axe & Lighthouse reports)
    - README.md
    - src/assets/ (image assets)
    - index.html (assembled preview)
  </relevantFiles>
  <everythingElse>
    ## Project Overview
    Convert the Buddies Open design into a mobile-first, static HTML/Tailwind prototype using an image-per-section workflow (screenshots → Framelink AI). Once the prototype is approved it can be ported into any CMS or framework, but no WordPress specifics are included in this phase.

    ## Objectives & Success Metrics
    - Pixel-perfect fidelity to Figma (≤ 5 px variance at 320 px, 768 px, 1440 px widths)
    - Lighthouse mobile Performance ≥ 90
    - 0 serious axe-core accessibility violations
    - 100% colour & font matches from Figma tokens

    ## Deliverables
    - src/sections/*: Individual HTML partials for each section
    - Global CSS build: Tailwind/PostCSS output (≤ 100 KB gzipped)
    - Vite dev setup: npm run dev/build
    - Axe & Lighthouse reports: /reports/
    - README: setup/build instructions

    ## Functional Requirements
    1. Interactive section capture: Prompt user to upload each section screenshot and name
    2. Automated export per section: Convert each image to responsive HTML partial styled with Tailwind
    3. Image-to-asset extraction: Save sliced images to src/assets/ and reference with lazy-loaded img tags
    4. Semantic & accessible markup: Use HTML5, ensure contrast and keyboard navigation
    5. Assembly preview: Live Vite dev server assembles all partials into index.html; allow reordering
    6. Termination: On 'done', build consolidated prototype and run accessibility/performance checks

    ## Design Assets
    - Section screenshots provided by user during interactive flow

    ## Technical Requirements
    - Stack: Node 20+, Tailwind CSS v3, PostCSS, Vite
    - Assets: Optimise images via @squoosh/cli; embed loading="lazy"
    - Linting: Prettier, Stylelint
    - Accessibility: @axe-core/cli

    ## Dependencies
    - Build tools: Node 20+, npm/yarn, Vite, PostCSS
    - CSS: Tailwind CSS, autoprefixer
    - Figma export: NCP CLI, Framelink CLI
    - Testing: axe-core CLI, Lighthouse CI (optional)

    ## Assets & Sources of Truth
    - Figma file: file://C:/Users/atlas/Documents/Buddies%20Open/buddies_open.fig
    - Copy PDF: file://C:/Users/atlas/Documents/Buddies%20Open/buddies_open_template.pdf

    ## Constraints
    - No jQuery; use vanilla JS or AlpineJS if needed
    - CSS bundle ≤ 100 KB gzipped
    - No PHP templating (except simple index.php wrapper if required)

    ## Testing & QA
    - Visual diff: manual overlay or Percy screenshot diff (stretch goal)
    - axe-core: npx axe http://localhost:5173 must return 0 serious issues
    - Performance: npx lhci collect → budget ≥ 90 mobile Perf

    ## Timeline (suggested)
    - Day 1: Repo scaffold, install deps, configure Tailwind & Vite
    - Day 2: Automate Figma export, generate header & hero
    - Day 3: Generate remaining sections, refine tokens
    - Day 4: Image optimisation, a11y pass, Lighthouse tuning
    - Day 5: Build & hand-off for review

    ## Future Considerations
    - After approval, migrate sections to CMS or JAMstack
    - Optional: connect headless e-commerce/donation API
    - Plan for multi-event scalability
  </everythingElse>
</Climb> 