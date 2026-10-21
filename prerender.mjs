/* Build step 3: prerender every route to static HTML and generate sitemap.xml, robots.txt, llms.txt and rss.xml.
   Runs after `vite build` (client) and `vite build --ssr entry-server.jsx` (server bundle). */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = path.dirname(fileURLToPath(import.meta.url))
const dist = path.join(root, 'dist')
const ssr = await import(pathToFileURL(path.join(root, 'dist-ssr', 'entry-server.js')).href)
const { render, routes, getSeo, POSTS, SERVICES, SITE_URL } = ssr

const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8')
const page = (url) => {
  const { html, head } = render(url)
  return template.replace('<!--app-head-->', head).replace('<!--app-html-->', html)
}
const write = (rel, content) => {
  const file = path.join(dist, rel)
  fs.mkdirSync(path.dirname(file), { recursive: true })
  fs.writeFileSync(file, content)
}

let count = 0
for (const url of routes) {
  write(url === '/' ? 'index.html' : `${url.slice(1)}.html`, page(url))
  count++
}
write('404.html', page('/404'))
console.log(`Prerendered ${count} pages + 404.html`)

/* ---------- sitemap.xml ---------- */
const today = new Date().toISOString().slice(0, 10)
const lastmod = (url) => POSTS.find((p) => `/blog/${p.slug}` === url)?.updated
  || (url === '/blog' || url === '/' ? POSTS[0].updated : today)
const indexable = routes.filter((u) => !getSeo(u).robots.startsWith('noindex'))
const priority = (u) => (u === '/' ? '1.0' : /^\/(services|blog|contact)$/.test(u) ? '0.9' : u.startsWith('/services/') ? '0.8' : u.startsWith('/blog/') ? '0.7' : '0.6')
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${indexable.map((u) => {
  const post = POSTS.find((p) => `/blog/${p.slug}` === u)
  return `  <url>
    <loc>${SITE_URL}${u === '/' ? '/' : u}</loc>
    <lastmod>${lastmod(u)}</lastmod>
    <priority>${priority(u)}</priority>${post ? `
    <image:image><image:loc>${SITE_URL}${post.image}</image:loc></image:image>` : ''}
  </url>`
}).join('\n')}
</urlset>
`
write('sitemap.xml', sitemap)

/* ---------- robots.txt (AI answer engines explicitly welcome) ---------- */
const aiBots = ['GPTBot', 'OAI-SearchBot', 'ChatGPT-User', 'ClaudeBot', 'Claude-SearchBot', 'Claude-User', 'PerplexityBot', 'Perplexity-User', 'Google-Extended', 'Applebot-Extended', 'Bingbot', 'CCBot', 'meta-externalagent', 'DuckAssistBot', 'MistralAI-User']
write('robots.txt', `# Advotis Agency — all search engines and AI answer engines are welcome
User-agent: *
Allow: /
Disallow: /ebooks/*/read

${aiBots.map((b) => `User-agent: ${b}\nAllow: /`).join('\n\n')}

Sitemap: ${SITE_URL}/sitemap.xml
`)

/* ---------- llms.txt (plain-language site guide for LLMs / AI agents) ---------- */
const plain = (t) => t.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
write('llms.txt', `# Advotis Agency

> Advotis Agency is a software development and digital marketing company with teams in the USA, UAE and India. We design and build websites on every major CMS, custom web applications (MERN, MEAN, Next.js, Laravel), Flutter, iOS and Android apps, AI solutions (LLM assistants, RAG, AI agents) and e-commerce stores; host and manage them on AWS, DigitalOcean, Cloudways, Hostinger and HostGator; and grow them with SEO, answer engine optimization (AEO), generative engine optimization (GEO), paid media, content and analytics.

Contact: ${SITE_URL}/contact

## Services
${SERVICES.map((s) => `- [${s.title}](${SITE_URL}/services/${s.slug}): ${s.short}`).join('\n')}

## Blog
${POSTS.map((p) => `- [${p.title}](${SITE_URL}/blog/${p.slug}): ${plain(p.summary)}`).join('\n')}

## Company
- [About Advotis Agency](${SITE_URL}/about)
- [Case studies](${SITE_URL}/work)
- [Careers and internships](${SITE_URL}/careers)
- [Free ebooks](${SITE_URL}/ebooks)
`)

/* ---------- rss.xml ---------- */
const x = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
write('rss.xml', `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:media="http://search.yahoo.com/mrss/">
<channel>
  <title>Advotis Agency Blog</title>
  <link>${SITE_URL}/blog</link>
  <description>Software development, AI, SEO and growth marketing insights from Advotis Agency.</description>
  <language>en</language>
  <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
  <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml" />
${POSTS.map((p) => `  <item>
    <title>${x(p.title)}</title>
    <link>${SITE_URL}/blog/${p.slug}</link>
    <guid isPermaLink="true">${SITE_URL}/blog/${p.slug}</guid>
    <pubDate>${new Date(`${p.date}T09:00:00Z`).toUTCString()}</pubDate>
    <category>${x(p.category)}</category>
    <description>${x(p.description)}</description>
    <media:content url="${SITE_URL}${p.image}" medium="image" width="1200" height="630" />
  </item>`).join('\n')}
</channel>
</rss>
`)

fs.rmSync(path.join(root, 'dist-ssr'), { recursive: true, force: true })
console.log(`sitemap.xml (${indexable.length} URLs), robots.txt, llms.txt, rss.xml written for ${SITE_URL}`)
