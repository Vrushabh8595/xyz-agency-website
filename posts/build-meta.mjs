/* Build step 0: writes posts/meta.json — the lightweight list of posts (no article bodies) that ships in the
   main JS bundle. Full article content is code-split and loaded per batch file. Runs automatically on `npm run build`
   and `npm run dev`; re-run after adding or editing posts. */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const dir = path.dirname(fileURLToPath(import.meta.url))
const files = fs.readdirSync(dir).filter((f) => /^posts-.+\.js$/.test(f)).sort()
const fmt = (iso) => new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' })
const words = (p) => [p.summary, ...p.takeaways, ...p.body.flatMap(([, v]) => (typeof v === 'string' ? [v] : Array.isArray(v) ? v : [...v.head, ...v.rows.flat()])), ...p.faqs.flat()]
  .join(' ').replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').split(/\s+/).filter(Boolean).length

const meta = []
for (const f of files) {
  const { default: list } = await import(pathToFileURL(path.join(dir, f)).href)
  for (const p of list) {
    const wc = words(p)
    meta.push({
      slug: p.slug, file: f.replace(/\.js$/, ''), category: p.category, service: p.service, title: p.title,
      description: p.description, excerpt: p.excerpt, summary: p.summary, date: p.date, updated: p.updated || p.date,
      dateLabel: fmt(p.date), author: p.author, keywords: p.keywords, image: `/blog/${p.slug}.webp`,
      imageAlt: p.imageAlt || `${p.title} — featured image`, wordCount: wc, read: `${Math.max(3, Math.round(wc / 230))} min read`,
    })
  }
}
const dupes = meta.map((m) => m.slug).filter((s, i, a) => a.indexOf(s) !== i)
if (dupes.length) throw new Error(`Duplicate post slugs: ${dupes.join(', ')}`)
meta.sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0))
fs.writeFileSync(path.join(dir, 'meta.json'), `${JSON.stringify(meta, null, 1)}\n`)
console.log(`posts/meta.json: ${meta.length} posts`)
