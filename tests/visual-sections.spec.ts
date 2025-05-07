// Playwright visual regression test for multiple sections at mobile breakpoints
// To add more sections, add entries to the 'sections' array below.

import { test, expect } from '@playwright/test';

const breakpoints = [
  { width: 320, height: 700 },
  { width: 375, height: 700 },
  { width: 414, height: 700 },
  { width: 480, height: 700 },
];

const sections = [
  {
    name: 'nav-bar',
    selector: 'nav, .nav-bar, header, #nav-bar',
    reference: (width: number) => `ref-png/nav-bar-${width}.png`,
    url: 'http://localhost:5179/',
  },
  // Example for adding more sections:
  // {
  //   name: 'footer',
  //   selector: 'footer',
  //   reference: (width) => `ref-png/footer-${width}.png`,
  //   url: 'http://localhost:5179/',
  // },
];

test.describe('Visual regression for site sections at mobile breakpoints', () => {
  for (const section of sections) {
    for (const bp of breakpoints) {
      test(`${section.name} at ${bp.width}px`, async ({ page }) => {
        await page.setViewportSize({ width: bp.width, height: bp.height });
        await page.goto(section.url);
        // Wait for section to be visible
        await page.waitForSelector(section.selector, { state: 'visible' });
        const element = await page.$(section.selector);
        if (!element) throw new Error(`Section ${section.name} not found`);
        const screenshot = await element.screenshot();
        // Compare to reference snapshot (must be in tests/_snapshots_ or use custom path)
        expect(screenshot).toMatchSnapshot(section.reference(bp.width));
      });
    }
  }
});

// To add a new section:
// 1. Add a new object to the 'sections' array with name, selector, reference, and url.
// 2. Place your reference PNGs in ref-png/ as section-name-width.png (e.g., nav-bar-320.png).
// 3. Run: npx playwright test --update-snapshots 