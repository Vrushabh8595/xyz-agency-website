# XYZ Agency — Software Development & Digital Marketing Website

A multi-page, responsive marketing website for **XYZ Agency**, built with **React 18 + Vite + React Router** in a blue theme with a light/dark mode toggle and scroll animations.

## Pages

| Route | Page |
| --- | --- |
| `/` | Home — Lottie hero, partner badges, service tabs, CMS/app-stack orbit, cloud & server section |
| `/services`, `/services/:slug` | Services grouped by Development / Marketing / Cloud + 13 rich single-service pages (unique hero visual, process timeline, FAQ, tools, related results & posts) |
| `/work`, `/work/:slug` | Case studies + case study detail |
| `/about` | About us, values, offices |
| `/blog`, `/blog/:slug` | Blog (26 posts with featured images) with category filter & search + answer-first article pages |
| `/ebooks`, `/ebooks/:slug`, `/ebooks/:slug/read` | Ebook library, gated landing page, online reader |
| `/careers` | Benefits + open roles |
| `/contact` | Contact form + office details |
| `/privacy` | Privacy policy & terms (template) |

## Run locally

```bash
npm install
npm run dev      # dev server
npm run build    # production build: prerenders every page to static HTML in /dist
npm run preview  # serve /dist locally
```

## SEO, AEO & GEO (how it works)

- **Prerendered HTML for every route.** `npm run build` builds the React app, then `prerender.mjs` renders each page
  (home, services, case studies, every blog post, ebooks, careers, contact…) to its own static HTML file with the full
  content, so Google, Bing and AI crawlers (ChatGPT, Perplexity, Claude, Gemini) read real content without running JavaScript.
  The browser then hydrates it into the interactive React app.
- **Per-page metadata** in `seo.js`: unique title, meta description, canonical URL, robots, Open Graph + Twitter cards
  and JSON-LD structured data (Organization, WebSite, Service, FAQPage, BlogPosting, BreadcrumbList, JobPosting, Book, ItemList).
- **Generated at build time:** `sitemap.xml` (with blog images), `robots.txt` (search + AI bots allowed), `llms.txt`
  (plain-language site guide for AI assistants), `rss.xml`, and a real `404.html` (served with a 404 status).
- **Answer-first blog template:** quick answer, key takeaways, question-style headings, tables, FAQ and cited sources on every post.
- **Domain:** set `SITE_URL` in `site.config.js` (or `VITE_SITE_URL` in Vercel) when you connect a custom domain, then redeploy.
- **After going live:** add the site to Google Search Console and Bing Webmaster Tools, submit `/sitemap.xml`
  (paste the verification meta tag in `index.html` where marked).

## Forms & leads

All forms (contact, job applications, freelancer sign-ups, ebook downloads) send leads by email through
[FormSubmit](https://formsubmit.co) to the inbox in `site.config.js` (`LEAD_INBOX`).
**The first submission triggers a one-time "Activate form" email to that inbox — click the link once** and every
lead after that is delivered. Leads include the page URL and a reply-to set to the visitor's email.

## Blog posts

- Posts live in `posts/posts-*.js`. Each file exports an array of posts with: `slug, category, service, title, description,
  excerpt, date, author, keywords, summary, takeaways, body, faqs, sources`.
- Body blocks: `['p', text]`, `['h', heading]`, `['h3', heading]`, `['ul', [items]]`, `['ol', [items]]`, `['tip', text]`,
  `['q', quote]`, `['table', { head: [...], rows: [[...]] }]`. Use `[anchor](/path)` for links inside text.
- Featured image: add `public/blog/<slug>.webp` (1200×630). It is also the social share image.
- `posts/meta.json` is regenerated automatically on every build/dev start.

## Logo & contact details

- Logo: replace the `Logo` component in `components.jsx`, and replace `public/logo.png` (512×512, used in structured data),
  `public/favicon.svg`, `public/favicon-48.png`, `public/apple-touch-icon.png`, `public/icon-192.png`, `public/icon-512.png`
  and `public/og-default.jpg` (1200×630 default share image).
- Contact info, offices and social links: `COMPANY` in `data.js` (used on the site and in structured data —
  placeholder phone/email values are left out of the schema automatically).

## Editing content

- All copy (services, case studies, ebooks, jobs, offices, home FAQ) lives in `data.js`; blog posts live in `posts/`. Per-service page content is in `SERVICE_EXTRAS` at the bottom of that file.
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

Push to `main` and Vercel builds with `npm run build` and serves `/dist` (see `vercel.json`: clean URLs, no trailing slash,
security and cache headers).
