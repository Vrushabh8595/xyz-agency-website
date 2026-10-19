# XYZ Agency — Software Development & Digital Marketing Website

A multi-page, responsive marketing website for **XYZ Agency**, built with **React 18 + Vite + React Router** in a blue theme with a light/dark mode toggle and scroll animations.

## Pages

| Route | Page |
| --- | --- |
| `/` | Home — Lottie hero, partner badges, service tabs, CMS/app-stack orbit, cloud & server section |
| `/services`, `/services/:slug` | Services grouped by Development / Marketing / Cloud + 13 rich single-service pages (unique hero visual, process timeline, FAQ, tools, related results & posts) |
| `/work`, `/work/:slug` | Case studies + case study detail |
| `/about` | About us, values, offices |
| `/blog`, `/blog/:slug` | Blog with category filter & search + article pages |
| `/ebooks`, `/ebooks/:slug`, `/ebooks/:slug/read` | Ebook library, gated landing page, online reader |
| `/careers` | Benefits + open roles |
| `/contact` | Contact form + office details |
| `/privacy` | Privacy policy & terms (template) |

## Run locally

```bash
npm install
npm run dev
```

## Editing content

- All copy (services, case studies, blog posts, ebooks, jobs, offices) lives in `data.js`. Per-service page content is in `SERVICE_EXTRAS` at the bottom of that file.
- Light/dark colors are CSS variables in `:root` and `[data-theme="dark"]` in `styles.css`.
- Shared layout (header, footer, cards, icons) is in `components.jsx`; pages are in `pages.jsx`.
- Colors are CSS variables at the top of `styles.css`.

## Lottie (JSON) animations

- Hero/banner animations are Lottie files in the repo root: `lottie-<web|mobile|marketing>-<light|dark>.json`.
- `LottiePlayer` in `components.jsx` lazy-loads `lottie-web` (light build) and swaps the light/dark file when the theme toggle changes.
- To use a LottieFiles animation instead, drop the JSON in the root with the same naming (e.g. `lottie-web-light.json` and `lottie-web-dark.json`).

## Header

- **Services** opens a full-width mega menu on hover (click on touch/mobile), grouped into Software Development, Digital Marketing and Cloud & DevOps, with a technologies strip.
- The sun/moon switch in the header toggles light/dark mode (saved per visitor).

## Deploy

Vercel auto-detects Vite. `vercel.json` rewrites all routes to `index.html` so deep links like `/blog/...` work.

> Forms currently open the visitor's email app (mailto). Connect them to a form backend (HubSpot, Formspree, etc.) before going live.
