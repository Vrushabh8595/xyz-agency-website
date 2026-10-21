/* Blog posts.
   - Article content lives in posts-*.js files (each exports an array of posts — see README → "Blog posts").
   - posts/meta.json is generated from them at build time (title, dates, excerpt…) and is all the listing pages need.
   - Full article content is code-split per file and loaded on demand (prerendered HTML already contains it).
   Featured images: /public/blog/<slug>.webp (1200×630, also used as the social share image). */
import META from './meta.json'

export const POSTS = META
export const POST_CATEGORIES = [...new Set(POSTS.map((p) => p.category))]

const cache = {}
const loaders = import.meta.glob('./posts-*.js')

export function registerPostContent(list) {
  list.forEach((p) => { cache[p.slug] = { body: p.body, takeaways: p.takeaways, faqs: p.faqs, sources: p.sources } })
}
export const getPostContent = (slug) => cache[slug]

export function loadPostContent(slug) {
  const meta = POSTS.find((p) => p.slug === slug)
  if (!meta || cache[slug]) return Promise.resolve(cache[slug])
  const load = loaders[`./${meta.file}.js`]
  return load ? load().then((m) => { registerPostContent(m.default); return cache[slug] }) : Promise.resolve()
}

/* Called before hydration so a prerendered article hydrates with its content already in memory */
export function preloadForPath(pathname) {
  const m = pathname.match(/^\/blog\/([^/]+)\/?$/)
  return m ? loadPostContent(m[1]).catch(() => {}) : Promise.resolve()
}
