/* ============ SEO, AEO & GEO metadata for every route ============
   One function builds the <head> for any path: title, description, canonical, Open Graph, Twitter card,
   robots and JSON-LD structured data. Used at build time (prerendered HTML) and in the browser on navigation. */
import { CASE_STUDIES, COMPANY, EBOOKS, HOME_FAQS, JOBS, POSTS, SERVICE_GROUPS, SERVICES, getPostContent } from './data.js'
import { DEFAULT_OG_IMAGE, LOGO, SITE_URL } from './site.config.js'

const BRAND = COMPANY.name
const abs = (p = '/') => (/^https?:/.test(p) ? p : `${SITE_URL}${p === '/' ? '' : p}`)
const plain = (t = '') => t.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
const clip = (t, n = 158) => (t.length <= n ? t : `${t.slice(0, n - 1).replace(/\s+\S*$/, '')}…`)
const isPlaceholder = (v = '') => /000|placeholder/i.test(v)

const ORG_ID = `${SITE_URL}/#organization`
const SITE_ID = `${SITE_URL}/#website`

export const organization = () => ({
  '@type': ['Organization', 'ProfessionalService'],
  '@id': ORG_ID,
  name: BRAND,
  url: abs('/'),
  logo: { '@type': 'ImageObject', url: abs(LOGO), width: 512, height: 512 },
  image: abs(DEFAULT_OG_IMAGE),
  description: 'Software development and digital marketing company building websites, web apps, mobile apps, AI solutions and e-commerce stores, with managed cloud hosting, SEO, paid media, content and analytics.',
  ...(isPlaceholder(COMPANY.email) ? {} : { email: COMPANY.email }),
  ...(isPlaceholder(COMPANY.phone) ? {} : { telephone: COMPANY.phone }),
  address: COMPANY.offices.map((o) => ({ '@type': 'PostalAddress', ...(o.street ? { streetAddress: o.street } : {}), addressLocality: o.city, ...(o.region ? { addressRegion: o.region } : {}), ...(o.postalCode ? { postalCode: o.postalCode } : {}), addressCountry: o.country === 'India' ? 'IN' : o.country })),
  areaServed: ['United States', 'United Arab Emirates', 'India', 'Worldwide'],
  sameAs: COMPANY.social.map((s) => s.url),
  knowsAbout: ['Software development', 'Web application development', 'Mobile app development', 'Flutter', 'MERN stack', 'Artificial intelligence', 'E-commerce development', 'Cloud hosting', 'DevOps', 'Search engine optimization', 'Answer engine optimization', 'Generative engine optimization', 'Pay-per-click advertising', 'Content marketing', 'Marketing analytics'],
  contactPoint: { '@type': 'ContactPoint', contactType: 'sales', url: abs('/contact'), availableLanguage: ['English', 'Hindi', 'Arabic'] },
})

const website = () => ({
  '@type': 'WebSite', '@id': SITE_ID, url: abs('/'), name: BRAND, publisher: { '@id': ORG_ID }, inLanguage: 'en',
})

const crumbs = (items) => ({
  '@type': 'BreadcrumbList',
  itemListElement: [['Home', '/'], ...items].map(([name, path], i) => ({ '@type': 'ListItem', position: i + 1, name, item: abs(path) })),
})

const faqPage = (faqs, path) => ({
  '@type': 'FAQPage', '@id': `${abs(path)}#faq`,
  mainEntity: faqs.map(([q, a]) => ({ '@type': 'Question', name: plain(q), acceptedAnswer: { '@type': 'Answer', text: plain(a) } })),
})

const webPage = (type, path, title, description, extra = {}) => ({
  '@type': type, '@id': `${abs(path)}#webpage`, url: abs(path), name: title, description,
  isPartOf: { '@id': SITE_ID }, about: { '@id': ORG_ID }, inLanguage: 'en', ...extra,
})

const itemList = (items) => ({
  '@type': 'ItemList',
  itemListElement: items.map(([name, path], i) => ({ '@type': 'ListItem', position: i + 1, name, url: abs(path) })),
})

/* --- route → metadata --- */
export function getSeo(pathname = '/') {
  const path = pathname.replace(/\/+$/, '') || '/'
  const seg = path.split('/').filter(Boolean)
  const base = { path, image: DEFAULT_OG_IMAGE, imageAlt: `${BRAND} — software development & digital marketing`, type: 'website', robots: 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1' }
  const page = (o) => {
    const title = o.fullTitle || (o.title.length + BRAND.length + 3 <= 62 ? `${o.title} | ${BRAND}` : o.title)
    const description = clip(o.description)
    const graph = [organization(), website(), webPage(o.pageType || 'WebPage', path, title, description, o.pageExtra), ...(o.schema || [])]
    return { ...base, ...o, title, description, canonical: abs(path), jsonLd: { '@context': 'https://schema.org', '@graph': graph } }
  }

  if (path === '/') {
    return page({
      fullTitle: `${BRAND} | Software Development & Digital Marketing Company`,
      description: 'Advotis Agency builds websites, web apps, mobile apps and AI products, hosts them on managed cloud servers, and grows them with SEO, AEO, paid media and content.',
      schema: [faqPage(HOME_FAQS, '/'), itemList(SERVICES.map((s) => [s.title, `/services/${s.slug}`]))],
    })
  }

  if (path === '/services') {
    return page({
      title: 'Software Development & Digital Marketing Services',
      description: 'Website and CMS development, custom web apps, Flutter and native mobile apps, AI solutions, e-commerce, cloud hosting, DevOps, SEO, paid media and analytics.',
      pageType: 'CollectionPage',
      schema: [crumbs([['Services', '/services']]), itemList(SERVICES.map((s) => [s.title, `/services/${s.slug}`]))],
    })
  }

  if (seg[0] === 'services' && seg.length === 2) {
    const s = SERVICES.find((x) => x.slug === seg[1])
    if (!s) return notFound(path)
    const group = SERVICE_GROUPS.find((g) => g.key === s.group)
    return page({
      title: s.title,
      description: `${s.short} ${s.tagline}`,
      schema: [
        crumbs([['Services', '/services'], [s.title, path]]),
        {
          '@type': 'Service', '@id': `${abs(path)}#service`, name: s.title, serviceType: s.title, description: s.intro,
          provider: { '@id': ORG_ID }, areaServed: 'Worldwide', category: group?.label, url: abs(path),
          hasOfferCatalog: { '@type': 'OfferCatalog', name: `${s.title} deliverables`, itemListElement: s.deliverables.map((d) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: d } })) },
        },
        faqPage(s.faqs, path),
      ],
    })
  }

  if (path === '/work') {
    return page({
      title: 'Case Studies & Results',
      description: 'Selected software development and digital marketing case studies across B2B SaaS, healthcare, e-commerce and professional services.',
      pageType: 'CollectionPage',
      schema: [crumbs([['Work', '/work']]), itemList(CASE_STUDIES.map((c) => [c.title, `/work/${c.slug}`]))],
    })
  }

  if (seg[0] === 'work' && seg.length === 2) {
    const c = CASE_STUDIES.find((x) => x.slug === seg[1])
    if (!c) return notFound(path)
    return page({
      title: c.title,
      description: `${c.industry} case study: ${c.metric} ${c.metricLabel}. ${c.challenge}`,
      type: 'article',
      schema: [
        crumbs([['Work', '/work'], [c.industry, path]]),
        { '@type': 'Article', headline: c.title, about: c.services, author: { '@id': ORG_ID }, publisher: { '@id': ORG_ID }, mainEntityOfPage: abs(path), image: abs(DEFAULT_OG_IMAGE) },
      ],
    })
  }

  if (path === '/about') {
    return page({
      title: 'About Us — Software & Marketing Experts',
      description: 'Advotis Agency is a team of senior engineers and marketers across the USA, UAE and India who build software and grow it with data-driven digital marketing.',
      pageType: 'AboutPage',
      schema: [crumbs([['About', '/about']])],
    })
  }

  if (path === '/blog') {
    return page({
      title: 'Blog: Software, AI, SEO & Marketing Insights',
      description: 'Practical, up-to-date guides on AI search (AEO and GEO), SEO, AI agents, web and app development, paid media, analytics and cloud — from the Advotis Agency team.',
      pageType: 'CollectionPage',
      schema: [
        crumbs([['Blog', '/blog']]),
        { '@type': 'Blog', '@id': `${abs('/blog')}#blog`, name: `${BRAND} Blog`, url: abs('/blog'), publisher: { '@id': ORG_ID }, blogPost: POSTS.map((p) => ({ '@type': 'BlogPosting', headline: p.title, url: abs(`/blog/${p.slug}`), datePublished: p.date, image: abs(p.image) })) },
      ],
    })
  }

  if (seg[0] === 'blog' && seg.length === 2) {
    const meta = POSTS.find((x) => x.slug === seg[1])
    if (!meta) return notFound(path)
    const p = { faqs: [], sources: [], ...meta, ...getPostContent(meta.slug) }
    return page({
      title: p.title,
      description: p.description,
      type: 'article',
      image: p.image,
      imageAlt: p.imageAlt,
      article: { published: p.date, modified: p.updated, section: p.category, tags: p.keywords, author: p.author },
      pageExtra: { primaryImageOfPage: { '@id': `${abs(path)}#image` }, datePublished: p.date, dateModified: p.updated },
      schema: [
        crumbs([['Blog', '/blog'], [p.title, path]]),
        { '@type': 'ImageObject', '@id': `${abs(path)}#image`, url: abs(p.image), contentUrl: abs(p.image), width: 1200, height: 630, caption: p.imageAlt },
        {
          '@type': 'BlogPosting', '@id': `${abs(path)}#article`, headline: p.title, description: p.description,
          abstract: p.summary, image: { '@id': `${abs(path)}#image` }, datePublished: p.date, dateModified: p.updated,
          author: { '@type': 'Organization', name: p.author, url: abs('/about'), parentOrganization: { '@id': ORG_ID } },
          publisher: { '@id': ORG_ID }, mainEntityOfPage: { '@id': `${abs(path)}#webpage` }, articleSection: p.category,
          keywords: p.keywords.join(', '), wordCount: p.wordCount, inLanguage: 'en', isAccessibleForFree: true,
          citation: p.sources.map(([name, url]) => ({ '@type': 'CreativeWork', name, url })),
          speakable: { '@type': 'SpeakableSpecification', cssSelector: ['.art-summary'] },
          about: { '@type': 'Thing', name: p.keywords[0] },
        },
        ...(p.faqs.length ? [faqPage(p.faqs, path)] : []),
      ],
    })
  }

  if (path === '/ebooks') {
    return page({
      title: 'Free Ebooks & Marketing Guides',
      description: 'Free in-depth guides on B2B SEO, paid media, marketing analytics and AI for marketing teams — practical frameworks you can use this quarter.',
      pageType: 'CollectionPage',
      schema: [crumbs([['Ebooks', '/ebooks']]), itemList(EBOOKS.map((b) => [b.title, `/ebooks/${b.slug}`]))],
    })
  }

  if (seg[0] === 'ebooks' && seg.length >= 2) {
    const b = EBOOKS.find((x) => x.slug === seg[1])
    if (!b || (seg.length === 3 && seg[2] !== 'read') || seg.length > 3) return notFound(path)
    if (seg[2] === 'read') {
      return page({ title: `Read: ${b.title}`, description: b.summary, robots: 'noindex,follow', schema: [crumbs([['Ebooks', '/ebooks'], [b.title, `/ebooks/${b.slug}`], ['Read', path]])] })
    }
    return page({
      title: `${b.title} (Free Ebook)`,
      description: `${b.subtitle}. ${b.summary}`,
      schema: [
        crumbs([['Ebooks', '/ebooks'], [b.title, path]]),
        { '@type': 'Book', name: b.title, alternativeHeadline: b.subtitle, description: b.summary, bookFormat: 'https://schema.org/EBook', numberOfPages: b.pages, author: { '@id': ORG_ID }, publisher: { '@id': ORG_ID }, isAccessibleForFree: true, url: abs(path), inLanguage: 'en' },
      ],
    })
  }

  if (path === '/careers') {
    return page({
      title: 'Careers & Internships',
      description: 'Join Advotis Agency: internships in business development, AI engineering, paid ads and project management, plus a remote freelance network for developers and marketers.',
      schema: [crumbs([['Careers', '/careers']]), itemList(JOBS.map((j) => [j.title, `/careers/${j.slug}`]))],
    })
  }

  if (seg[0] === 'careers' && seg.length === 2) {
    const j = JOBS.find((x) => x.slug === seg[1])
    if (!j) return notFound(path)
    return page({
      title: `${j.title} — ${j.location}`,
      description: `${j.summary} ${j.type}, ${j.location}. Apply online in 2 minutes.`,
      schema: [crumbs([['Careers', '/careers'], [j.short, path]]), jobPosting(j, path)],
    })
  }

  if (path === '/contact') {
    return page({
      title: 'Contact Us — Get a Free Proposal',
      description: 'Tell us about your website, app, AI or marketing project. Advotis Agency replies within one business day with next steps, a plan and an estimate.',
      pageType: 'ContactPage',
      schema: [crumbs([['Contact', '/contact']])],
    })
  }

  if (path === '/thank-you') {
    return page({ title: 'Thank you', description: 'Thanks for getting in touch with Advotis Agency.', robots: 'noindex,nofollow', schema: [] })
  }

  if (path === '/privacy') {
    return page({
      title: 'Privacy Policy & Terms',
      description: 'How Advotis Agency collects, uses and protects the information you submit through this website, your privacy choices, and our website terms of use.',
      schema: [crumbs([['Privacy Policy', '/privacy']])],
    })
  }

  return notFound(path)
}

function jobPosting(j, path) {
  const posted = '2026-10-01'
  return {
    '@type': 'JobPosting',
    title: j.title,
    description: `<p>${j.about}</p><h3>Responsibilities</h3><ul>${j.responsibilities.map((x) => `<li>${x}</li>`).join('')}</ul><h3>Requirements</h3><ul>${j.requirements.map((x) => `<li>${x}</li>`).join('')}</ul>`,
    datePosted: posted,
    validThrough: '2027-03-31T23:59:59Z',
    employmentType: j.freelance ? 'CONTRACTOR' : 'INTERN',
    hiringOrganization: { '@type': 'Organization', name: BRAND, sameAs: abs('/'), logo: abs(LOGO) },
    jobLocationType: 'TELECOMMUTE',
    applicantLocationRequirements: (j.freelance ? ['India', 'United States', 'United Arab Emirates', 'United Kingdom', 'Canada'] : ['India', 'United States', 'United Arab Emirates'])
      .map((name) => ({ '@type': 'Country', name })),
    directApply: true,
    skills: j.skills.join(', '),
    industry: 'Software development and digital marketing',
    url: abs(path),
  }
}

function notFound(path) {
  return {
    path, status: 404, title: `Page not found | ${BRAND}`, description: 'The page you are looking for may have moved. Explore our services, case studies and blog.',
    robots: 'noindex,follow', canonical: null, image: DEFAULT_OG_IMAGE, imageAlt: BRAND, type: 'website', jsonLd: null,
  }
}

/* --- render head tags to an HTML string (build time) --- */
const esc = (s = '') => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

export function headTags(seo) {
  const img = abs(seo.image)
  const t = [
    `<title>${esc(seo.title)}</title>`,
    `<meta name="description" content="${esc(seo.description)}" />`,
    `<meta name="robots" content="${seo.robots}" />`,
    seo.canonical && `<link rel="canonical" href="${seo.canonical}" />`,
    `<meta property="og:type" content="${seo.type}" />`,
    `<meta property="og:site_name" content="${esc(BRAND)}" />`,
    `<meta property="og:locale" content="en_US" />`,
    `<meta property="og:title" content="${esc(seo.title)}" />`,
    `<meta property="og:description" content="${esc(seo.description)}" />`,
    seo.canonical && `<meta property="og:url" content="${seo.canonical}" />`,
    `<meta property="og:image" content="${img}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:image:alt" content="${esc(seo.imageAlt)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(seo.title)}" />`,
    `<meta name="twitter:description" content="${esc(seo.description)}" />`,
    `<meta name="twitter:image" content="${img}" />`,
    ...(seo.article ? [
      `<meta property="article:published_time" content="${seo.article.published}T00:00:00Z" />`,
      `<meta property="article:modified_time" content="${seo.article.modified}T00:00:00Z" />`,
      `<meta property="article:section" content="${esc(seo.article.section)}" />`,
      ...seo.article.tags.map((k) => `<meta property="article:tag" content="${esc(k)}" />`),
      `<meta name="author" content="${esc(seo.article.author)}" />`,
    ] : []),
    seo.image !== DEFAULT_OG_IMAGE && `<link rel="preload" as="image" href="${seo.image}" fetchpriority="high" />`,
    seo.jsonLd && `<script type="application/ld+json">${JSON.stringify(seo.jsonLd).replace(/</g, '\\u003c')}</script>`,
  ]
  return t.filter(Boolean).map((x) => x.replace(/^<(\w+)/, '<$1 data-seo')).join('\n    ')
}

/* --- update head in the browser after client-side navigation --- */
export function applyHead(seo) {
  if (typeof document === 'undefined') return
  document.querySelectorAll('[data-seo]').forEach((n) => n.remove())
  document.title = seo.title
  const tpl = document.createElement('template')
  tpl.innerHTML = headTags(seo).replace(/<title[^>]*>.*?<\/title>/, '')
  document.head.append(...tpl.content.childNodes)
}
