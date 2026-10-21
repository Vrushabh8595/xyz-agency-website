/* Server entry used only at build time to prerender every route to static HTML (see prerender.mjs). */
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import App from './App.jsx'
import { CASE_STUDIES, EBOOKS, JOBS, POSTS, SERVICES } from './data.js'
import { registerPostContent } from './posts/index.js'
import { getSeo, headTags } from './seo.js'
import { SITE_URL } from './site.config.js'

export { getSeo, POSTS, SERVICES, SITE_URL }

/* Load every article body into memory so each post prerenders with full content */
const files = import.meta.glob('./posts/posts-*.js', { eager: true })
Object.values(files).forEach((m) => registerPostContent(m.default))

export function render(url) {
  const html = renderToString(<StaticRouter location={url} future={{ v7_startTransition: true, v7_relativeSplatPath: true }}><App /></StaticRouter>)
  const seo = getSeo(url)
  return { html, head: headTags(seo), seo }
}

export const routes = [
  '/', '/services', ...SERVICES.map((s) => `/services/${s.slug}`),
  '/work', ...CASE_STUDIES.map((c) => `/work/${c.slug}`),
  '/about',
  '/blog', ...POSTS.map((p) => `/blog/${p.slug}`),
  '/ebooks', ...EBOOKS.flatMap((b) => [`/ebooks/${b.slug}`, `/ebooks/${b.slug}/read`]),
  '/careers', ...JOBS.map((j) => `/careers/${j.slug}`),
  '/contact', '/privacy',
]
