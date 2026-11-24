# Accessibility testing

Playwright and axe-core scan the English/Turkish home pages, About, and Projects pages against automated WCAG 2.1 A/AA rules.

Run `npm run test:a11y`. Automated checks do not replace keyboard-only, screen-reader, zoom/reflow, reduced-motion, or manual contrast testing. Fix violations at their source; do not add broad axe exclusions to make CI green.
