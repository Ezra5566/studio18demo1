# Studio 18 - Agent Instructions

Welcome to the Studio 18 codebase! This repository holds a premium, highly interactive frontend web application focused on fashion, culture, and community. The aesthetic relies heavily on smooth animations, editorial typography, and immersive effects.

These guidelines ensure AI agents maintain the project's architectural simplicity, extreme performance focus, and visual fidelity.

---

## 1. Architecture & Tech Stack

This project uses a **zero-build vanilla architecture**. There is no Node.js build step, bundler (Webpack/Vite), TypeScript, or package manager (`package.json`).

- **Core Files:** `index.html`, `styles.css`, `main.js`.
- **Dependencies (via CDN):**
  - GSAP (Core, ScrollTrigger, ScrollToPlugin) for complex animations.
  - Lenis for smooth scrolling.
  - Google Fonts (Inter, Syne).

---

## 2. Build, Lint, and Test Commands

Since this is a static site without a build pipeline, standard commands do not apply.

### 2.1 Local Development
To serve the project locally and view changes:
```bash
python3 -m http.server 8000
# Alternatively, if node is available: npx serve .
```

### 2.2 Build Command
**None.** Do not attempt to run `npm run build`, `npm install`, or introduce a bundler unless explicitly requested by the user. Serve the files directly.

### 2.3 Linting & Formatting
No automated linters (ESLint, Prettier) are configured. Agents must format code manually:
- Use **4 spaces** for indentation in both JavaScript and CSS.
- Ensure consistent spacing around operators and braces.

### 2.4 Testing (Running a Single Test)
There is no automated test suite (Jest, Cypress, etc.) configured.
- **Running a Single Test:** N/A. Do not run `npm test` or `pytest`.
- **Manual Verification:** After modifying code, you *must* instruct the user to visually test the changes in their browser.
- **Critical Test Paths:**
  - Verify the custom cursor (`.cursor`, `.cursor-follower`) follows the mouse correctly.
  - Verify GSAP scroll triggers fire at the correct viewport intersections.
  - Verify Lenis smooth scrolling behaves correctly, especially on mobile.

---

## 3. Code Style Guidelines

### 3.1 JavaScript (`main.js`)
- **Paradigm:** Use modern ES6+ features (`const`, `let`, arrow functions, template literals). All code runs in the global scope. Keep it procedural but well-organized.
- **Types:** Vanilla JS only. Do not use TypeScript syntax. Use JSDoc sparingly if defining complex shapes is necessary.
- **Imports:** Do not use `import`/`export` syntax as there is no bundler. External libraries (GSAP, Lenis) are available as global variables via CDN.
- **Formatting & Strings:** Use single quotes (`'...'`) for strings unless template literals (`` `...` ``) are required.
- **Naming Conventions:**
  - Variables & Functions: `camelCase` (e.g., `animateCursor`, `updateSkew`).
  - DOM Elements: Prefix with `el` or name clearly (e.g., `cursorFollower`, `menuToggle`).
- **DOM Interactions & Performance:**
  - Cache all DOM lookups at the top level or function scope. Do not call `document.querySelector` inside `requestAnimationFrame` loops or `scroll` event listeners.
  - Hook custom scroll logic into `lenis.on('scroll', ...)` rather than native `window.addEventListener('scroll')`.
- **Animations:** All complex animations must use GSAP. The project includes specific effects like magnetic buttons, scroll-velocity-based skew, and custom cursors. Maintain the `expo.out` easing style for consistency.
- **Error Handling:** Wrap risky operations in `try...catch` blocks. Fail gracefully (e.g., fallback to standard scrolling if Lenis fails). Respect user accessibility preferences (the codebase already checks `prefers-reduced-motion` to disable animations).

### 3.2 CSS (`styles.css`)
- **Methodology:** Flat, specific class structures similar to BEM. Do not deeply nest selectors.
- **Design Tokens:** All colors, fonts, sizes, and easing functions are defined in the `:root` pseudo-class (e.g., `--color-primary`, `--ease-out-expo`). **Never hardcode hex colors, font families, or transition timings** in standard rulesets. Always reference the CSS variables.
- **Naming Conventions:** Use `kebab-case` for class names (e.g., `.grain-overlay`, `.collection-card`).
- **Responsiveness:** Handle mobile and tablet views using `@media` queries grouped either at the bottom of the relevant section or at the end of the file. Focus on fluid typography (`clamp()`) and flexbox/grid layouts.

### 3.3 HTML (`index.html`)
- **Structure:** Write semantic HTML5 (e.g., `<main>`, `<section>`, `<nav>`).
- **Accessibility:** Ensure images have `alt` attributes and interactive custom elements use `aria-label` where necessary.

---

## 4. Operational Rules for Agents

1. **Do not over-engineer:** Preserve the zero-build nature of the repository. Do not add React, Next.js, Webpack, or Vite unless specifically asked.
2. **Respect the Aesthetic:** Any newly added UI elements must align with the existing red/black/white neon aesthetic (`--color-primary`), and utilize the `Inter` and `Syne` fonts.
3. **Preserve Core Systems:** Do not modify the core `Lenis` and `GSAP` initialization block at the top of `main.js` unless fixing a systemic scrolling bug.
4. **No Restructuring:** Maintain the flat root file structure. Do not move files into `src/` or `public/` directories. 

*When in doubt, strictly mirror the established style, formatting, and architecture found in `main.js` and `styles.css`.*
