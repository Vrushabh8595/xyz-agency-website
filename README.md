# XYZ Agency — Digital Marketing Website

A multi-page, responsive marketing website for **XYZ Agency**, built with **React 18 + Vite + React Router** in a blue theme.

## Pages

| Route | Page |
| --- | --- |
| `/` | Home |
| `/services`, `/services/:slug` | Services overview + 6 service detail pages |
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

- All copy (services, case studies, blog posts, ebooks, jobs, offices) lives in `data.js`.
- Shared layout (header, footer, cards, icons) is in `components.jsx`; pages are in `pages.jsx`.
- Colors are CSS variables at the top of `styles.css`.

## Deploy

Vercel auto-detects Vite. `vercel.json` rewrites all routes to `index.html` so deep links like `/blog/...` work.

> Forms currently open the visitor's email app (mailto). Connect them to a form backend (HubSpot, Formspree, etc.) before going live.
