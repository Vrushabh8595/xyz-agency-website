import { useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import {
  CASE_STUDIES, CLIENTS, COMPANY, EBOOKS, INDUSTRIES, JOBS, POSTS, SERVICES, STATS, STEPS, VALUES,
} from './data.js'
import {
  CaseCard, Counter, CtaBand, EbookCover, Icon, PageHero, PostCard, Reveal, useTitle,
} from './components.jsx'

const mailto = (subject, lines) =>
  `mailto:${COMPANY.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join('\n'))}`

/* =================== HOME =================== */
export function Home() {
  useTitle()
  return (
    <>
      <section className="hero">
        <div className="hero-glow" aria-hidden="true" />
        <div className="grid-bg" aria-hidden="true" />
        <div className="container hero-grid">
          <div className="hero-copy">
            <span className="eyebrow"><span className="dot" /> Full-funnel digital marketing agency</span>
            <h1>Marketing that drives <span className="accent">compounding</span> growth.</h1>
            <p className="lead">
              XYZ Agency brings SEO, paid media, content, web and AI together as one connected growth system —
              run by senior specialists and measured against revenue.
            </p>
            <div className="hero-ctas">
              <Link to="/contact" className="btn btn-primary">Get a free growth audit <Icon name="arrow" size={18} /></Link>
              <Link to="/work" className="btn btn-ghost">See our results</Link>
            </div>
            <ul className="ticks">
              <li><Icon name="check" size={16} /> No long lock-in contracts</li>
              <li><Icon name="check" size={16} /> Senior team on every account</li>
            </ul>
          </div>
          <div className="hero-visual" aria-hidden="true">
            <div className="dash card">
              <div className="dash-top"><span>Pipeline generated</span><span className="pill up">+212%</span></div>
              <div className="dash-value">$4.8M</div>
              <svg className="dash-chart" viewBox="0 0 300 110" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="g" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0" stopColor="#2563eb" stopOpacity=".35" />
                    <stop offset="1" stopColor="#2563eb" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path d="M0 95 L30 88 L60 90 L90 75 L120 78 L150 60 L180 55 L210 40 L240 35 L270 20 L300 12 L300 110 L0 110Z" fill="url(#g)" />
                <path d="M0 95 L30 88 L60 90 L90 75 L120 78 L150 60 L180 55 L210 40 L240 35 L270 20 L300 12" fill="none" stroke="#2563eb" strokeWidth="3" />
              </svg>
              <div className="dash-row">
                <div><small>Organic</small><b>48%</b></div>
                <div><small>Paid</small><b>31%</b></div>
                <div><small>Referral</small><b>21%</b></div>
              </div>
            </div>
            <div className="float card f1">
              <span className="f-ico"><Icon name="target" size={18} /></span>
              <div><small>Cost per lead</small><b>−37%</b></div>
            </div>
            <div className="float card f2">
              <span className="f-ico cyan"><Icon name="search" size={18} /></span>
              <div><small>Keywords in top 3</small><b>1,240</b></div>
            </div>
          </div>
        </div>
        <div className="logos">
          <p>Trusted by growing brands worldwide</p>
          <div className="marquee">
            <div className="marquee-track">
              {[...CLIENTS, ...CLIENTS].map((c, i) => <span key={i}>{c}</span>)}
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal className="section-head row">
            <div>
              <span className="kicker">What we do</span>
              <h2>We plan, build and run the systems behind your growth</h2>
            </div>
            <Link to="/services" className="btn btn-ghost">All services <Icon name="arrow" size={18} /></Link>
          </Reveal>
          <div className="grid-3">
            {SERVICES.map((s, i) => (
              <Reveal key={s.slug} delay={i * 60}><ServiceCard s={s} /></Reveal>
            ))}
          </div>
        </div>
      </section>

      <StatsBand />

      <section className="section alt">
        <div className="container">
          <Reveal className="section-head row">
            <div>
              <span className="kicker">Results</span>
              <h2>Delivering on expectations with measurable outcomes</h2>
            </div>
            <Link to="/work" className="btn btn-ghost">View case studies <Icon name="arrow" size={18} /></Link>
          </Reveal>
          <div className="grid-4">
            {CASE_STUDIES.map((c, i) => <Reveal key={c.slug} delay={i * 70}><CaseCard c={c} /></Reveal>)}
          </div>
          <p className="footnote">Figures shown are illustrative sample outcomes.</p>
        </div>
      </section>

      <Approach />

      <section className="section">
        <div className="container">
          <Reveal className="section-head center">
            <span className="kicker">Industries</span>
            <h2>Specialists in the markets we serve</h2>
            <p>Deep category knowledge means faster ramp-up and messaging that lands with your buyers.</p>
          </Reveal>
          <Reveal className="chips">{INDUSTRIES.map((x) => <span key={x} className="chip">{x}</span>)}</Reveal>
        </div>
      </section>

      <section className="section alt">
        <div className="container">
          <Reveal className="section-head row">
            <div>
              <span className="kicker">Free resources</span>
              <h2>Guides from experts driving results on the ground</h2>
            </div>
            <Link to="/ebooks" className="btn btn-ghost">All ebooks <Icon name="arrow" size={18} /></Link>
          </Reveal>
          <div className="ebook-feature">
            {EBOOKS.slice(0, 2).map((b) => (
              <Reveal key={b.slug}>
                <Link to={`/ebooks/${b.slug}`} className="card ebook-row">
                  <EbookCover book={b} small />
                  <div>
                    <span className="tag">Free ebook</span>
                    <h3>{b.title}</h3>
                    <p>{b.summary}</p>
                    <span className="link">Get the guide <Icon name="arrow" size={16} /></span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal className="section-head row">
            <div>
              <span className="kicker">From the blog</span>
              <h2>Recent thinking</h2>
            </div>
            <Link to="/blog" className="btn btn-ghost">Read the blog <Icon name="arrow" size={18} /></Link>
          </Reveal>
          <div className="grid-3">
            {POSTS.slice(0, 3).map((p, i) => <Reveal key={p.slug} delay={i * 70}><PostCard post={p} i={i} /></Reveal>)}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  )
}

function ServiceCard({ s }) {
  return (
    <Link to={`/services/${s.slug}`} className="card service">
      <span className="icon-box"><Icon name={s.icon} /></span>
      <h3>{s.title}</h3>
      <p>{s.short}</p>
      <ul className="tags">{s.tags.map((t) => <li key={t}>{t}</li>)}</ul>
      <span className="link">Learn more <Icon name="arrow" size={16} /></span>
    </Link>
  )
}

function StatsBand() {
  return (
    <section className="stats">
      <div className="container stats-grid">
        {STATS.map((s) => (
          <div key={s.label}>
            <div className="stat-num"><Counter value={s.value} suffix={s.suffix} /></div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  )
}

function Approach() {
  const [active, setActive] = useState(0)
  return (
    <section className="section dark">
      <div className="container approach">
        <Reveal className="section-head light">
          <span className="kicker">How we work</span>
          <h2>GrowthOS — one operating model, compounding results</h2>
          <p>A shared playbook, a senior pod embedded with your team, and weekly reporting that turns predictive by month four.</p>
          <Link to="/contact" className="btn btn-primary">Start with a growth audit <Icon name="arrow" size={18} /></Link>
        </Reveal>
        <div className="steps">
          {STEPS.map((s, i) => (
            <button key={s.title} className={`step ${active === i ? 'active' : ''}`}
              onMouseEnter={() => setActive(i)} onFocus={() => setActive(i)} onClick={() => setActive(i)}>
              <span className="step-num">0{i + 1}</span>
              <div><small>{s.when}</small><h3>{s.title}</h3><p>{s.text}</p></div>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

/* =================== SERVICES =================== */
export function Services() {
  useTitle('Services')
  return (
    <>
      <PageHero kicker="Services" crumbs={[['Services']]}
        title="Every channel your growth depends on — working as one"
        text="Choose a single service or bring us in as your full-funnel growth partner. Every engagement is led by senior specialists and measured against pipeline." />
      <section className="section">
        <div className="container grid-3">
          {SERVICES.map((s, i) => <Reveal key={s.slug} delay={i * 60}><ServiceCard s={s} /></Reveal>)}
        </div>
      </section>
      <Approach />
      <CtaBand title="Not sure where to start?" text="We'll audit your channels and recommend the two or three moves with the biggest upside." />
    </>
  )
}

export function ServiceDetail() {
  const { slug } = useParams()
  const s = SERVICES.find((x) => x.slug === slug)
  useTitle(s?.title)
  if (!s) return <NotFound />
  const related = CASE_STUDIES.filter((c) => c.services.includes(s.title)).slice(0, 2)
  const others = SERVICES.filter((x) => x.slug !== slug)
  return (
    <>
      <PageHero kicker="Service" crumbs={[['Services', '/services'], [s.title]]} title={s.title} text={s.intro}>
        <div className="hero-ctas"><Link to="/contact" className="btn btn-primary">Get a proposal <Icon name="arrow" size={18} /></Link></div>
      </PageHero>
      <section className="section">
        <div className="container split">
          <Reveal>
            <span className="kicker">What's included</span>
            <h2>Deliverables</h2>
            <ul className="check-list">
              {s.deliverables.map((d) => <li key={d}><span className="check"><Icon name="check" size={16} /></span>{d}</li>)}
            </ul>
          </Reveal>
          <Reveal className="card outcome-card">
            <span className="icon-box"><Icon name={s.icon} /></span>
            <h3>Outcomes you can expect</h3>
            <ul className="check-list compact">
              {s.outcomes.map((o) => <li key={o}><span className="check"><Icon name="check" size={16} /></span>{o}</li>)}
            </ul>
            <Link to="/contact" className="btn btn-primary full">Talk to a specialist</Link>
          </Reveal>
        </div>
      </section>
      {related.length > 0 && (
        <section className="section alt">
          <div className="container">
            <Reveal className="section-head"><span className="kicker">Proof</span><h2>Related results</h2></Reveal>
            <div className="grid-2">{related.map((c) => <CaseCard key={c.slug} c={c} />)}</div>
          </div>
        </section>
      )}
      <section className="section">
        <div className="container">
          <Reveal className="section-head"><span className="kicker">Explore more</span><h2>Other services</h2></Reveal>
          <div className="mini-grid">
            {others.map((o) => (
              <Link key={o.slug} to={`/services/${o.slug}`} className="card mini">
                <span className="icon-box sm"><Icon name={o.icon} size={18} /></span>{o.title}<Icon name="arrow" size={16} />
              </Link>
            ))}
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  )
}

/* =================== WORK =================== */
export function Work() {
  useTitle('Case Studies')
  return (
    <>
      <PageHero kicker="Our work" crumbs={[['Work']]}
        title="Delivering on expectations with measurable outcomes"
        text="A selection of engagements across SaaS, healthcare, e-commerce and professional services." />
      <section className="section">
        <div className="container">
          <div className="grid-2">
            {CASE_STUDIES.map((c, i) => (
              <Reveal key={c.slug} delay={i * 60}>
                <Link to={`/work/${c.slug}`} className="card case-big" style={{ '--c': c.color }}>
                  <div className="case-top">
                    <span className="tag">{c.industry}</span>
                    <span className="case-metric">{c.metric}</span>
                  </div>
                  <h3>{c.title}</h3>
                  <p>{c.challenge}</p>
                  <div className="tags-row">{c.services.map((s) => <span key={s} className="tag soft">{s}</span>)}</div>
                  <span className="link">Read case study <Icon name="arrow" size={16} /></span>
                </Link>
              </Reveal>
            ))}
          </div>
          <p className="footnote">Case studies are illustrative samples — replace with your own client stories.</p>
        </div>
      </section>
      <StatsBand />
      <CtaBand title="Want results like these?" />
    </>
  )
}

export function CaseStudy() {
  const { slug } = useParams()
  const c = CASE_STUDIES.find((x) => x.slug === slug)
  useTitle(c?.title)
  if (!c) return <NotFound />
  const next = CASE_STUDIES[(CASE_STUDIES.indexOf(c) + 1) % CASE_STUDIES.length]
  return (
    <>
      <PageHero kicker={c.industry} crumbs={[['Work', '/work'], [c.industry]]} title={c.title}>
        <div className="tags-row">{c.services.map((s) => <span key={s} className="tag">{s}</span>)}</div>
      </PageHero>
      <section className="section tight-top">
        <div className="container">
          <div className="result-strip">
            {c.results.map(([v, l]) => <div key={l}><b>{v}</b><span>{l}</span></div>)}
          </div>
          <div className="case-body">
            <Reveal><h2>The challenge</h2><p>{c.challenge}</p></Reveal>
            <Reveal><h2>Our approach</h2><p>{c.solution}</p></Reveal>
            <Reveal><h2>The results</h2><p>Within the engagement, the client achieved {c.results.map(([v, l]) => `${v} ${l}`).join(', ')} — and built a foundation that continues to compound.</p></Reveal>
          </div>
          <Link to={`/work/${next.slug}`} className="card next-case">
            <small>Next case study</small>
            <span>{next.title}</span>
            <Icon name="arrow" />
          </Link>
        </div>
      </section>
      <CtaBand />
    </>
  )
}

/* =================== ABOUT =================== */
export function About() {
  useTitle('About Us')
  return (
    <>
      <PageHero kicker="About us" crumbs={[['About']]}
        title="A growth partner built for compounding outcomes"
        text="XYZ Agency was founded on a simple idea: marketing works best when every channel is planned, built and measured as one connected system." />
      <section className="section">
        <div className="container split">
          <Reveal>
            <span className="kicker">Our story</span>
            <h2>Senior specialists, one connected system</h2>
            <p className="body-text">Too many companies juggle separate vendors for SEO, ads, web and analytics — each reporting their own version of success. We built XYZ Agency to fix that.</p>
            <p className="body-text">Today our team of specialists works across offices in the USA, UAE and India, partnering with B2B and growth-stage brands to turn marketing into a predictable revenue engine.</p>
          </Reveal>
          <Reveal className="about-visual">
            {STATS.map((s) => (
              <div key={s.label} className="card stat-card">
                <b><Counter value={s.value} suffix={s.suffix} /></b><span>{s.label}</span>
              </div>
            ))}
          </Reveal>
        </div>
      </section>
      <section className="section alt">
        <div className="container">
          <Reveal className="section-head center"><span className="kicker">Our values</span><h2>What we believe</h2></Reveal>
          <div className="grid-4">
            {VALUES.map((v, i) => (
              <Reveal key={v.title} delay={i * 60}>
                <div className="card value">
                  <span className="icon-box"><Icon name={v.icon} /></span>
                  <h3>{v.title}</h3><p>{v.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <Reveal className="section-head center"><span className="kicker">Where we are</span><h2>Our offices</h2></Reveal>
          <div className="grid-3">
            {COMPANY.offices.map((o) => (
              <div key={o.city} className="card office">
                <span className="icon-box sm"><Icon name="pin" size={18} /></span>
                <h3>{o.city}</h3><small>{o.country}</small><p>{o.address}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <CtaBand title="Want to work with us?" text="Whether you're a client or a future teammate, we'd love to hear from you." />
    </>
  )
}

/* =================== BLOG =================== */
export function Blog() {
  useTitle('Blog')
  const cats = ['All', ...new Set(POSTS.map((p) => p.category))]
  const [cat, setCat] = useState('All')
  const [q, setQ] = useState('')
  const list = useMemo(() => POSTS.filter((p) =>
    (cat === 'All' || p.category === cat) &&
    (p.title + p.excerpt).toLowerCase().includes(q.toLowerCase())), [cat, q])
  const featured = POSTS[0]
  return (
    <>
      <PageHero kicker="Blog" crumbs={[['Blog']]}
        title="Insights from experts driving results on the ground"
        text="Practical playbooks on SEO, paid media, analytics, content and AI — written by the people doing the work." />
      <section className="section tight-top">
        <div className="container">
          <Link to={`/blog/${featured.slug}`} className="card featured-post">
            <div className="post-img p0 big"><span>Featured</span></div>
            <div className="post-body">
              <span className="tag">{featured.category}</span>
              <h2>{featured.title}</h2>
              <p>{featured.excerpt}</p>
              <small className="meta">{featured.date} · {featured.read}</small>
            </div>
          </Link>

          <div className="filter-bar">
            <div className="filters" role="tablist">
              {cats.map((c) => (
                <button key={c} className={`filter ${cat === c ? 'on' : ''}`} onClick={() => setCat(c)}>{c}</button>
              ))}
            </div>
            <label className="search">
              <Icon name="search" size={18} />
              <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search articles" aria-label="Search articles" />
            </label>
          </div>

          {list.length ? (
            <div className="grid-3">
              {list.map((p) => <PostCard key={p.slug} post={p} i={POSTS.indexOf(p)} />)}
            </div>
          ) : (
            <p className="empty">No articles match your search. <button className="text-btn" onClick={() => { setQ(''); setCat('All') }}>Clear filters</button></p>
          )}
        </div>
      </section>
      <EbookPromo />
    </>
  )
}

export function BlogPost() {
  const { slug } = useParams()
  const post = POSTS.find((p) => p.slug === slug)
  useTitle(post?.title)
  if (!post) return <NotFound />
  const related = POSTS.filter((p) => p.slug !== slug).slice(0, 3)
  const book = EBOOKS[POSTS.indexOf(post) % EBOOKS.length]
  const url = typeof window !== 'undefined' ? window.location.href : ''
  return (
    <>
      <PageHero kicker={post.category} crumbs={[['Blog', '/blog'], [post.category]]} title={post.title}>
        <p className="meta light-meta">{post.author} · {post.date} · {post.read}</p>
      </PageHero>
      <section className="section tight-top">
        <div className="container article-wrap">
          <article className="article">
            {post.body.map(([type, text], i) =>
              type === 'h' ? <h2 key={i}>{text}</h2>
                : type === 'q' ? <blockquote key={i}>{text}</blockquote>
                  : <p key={i}>{text}</p>)}
            <div className="share">
              <span>Share:</span>
              <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`} target="_blank" rel="noreferrer">LinkedIn</a>
              <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(post.title)}`} target="_blank" rel="noreferrer">X</a>
              <a href={`mailto:?subject=${encodeURIComponent(post.title)}&body=${encodeURIComponent(url)}`}>Email</a>
            </div>
            <Link to="/blog" className="back-link"><Icon name="back" size={18} /> Back to blog</Link>
          </article>
          <aside className="sidebar">
            <div className="card side-card">
              <EbookCover book={book} small />
              <h3>{book.title}</h3>
              <p>{book.subtitle}</p>
              <Link to={`/ebooks/${book.slug}`} className="btn btn-primary full">Get the free ebook</Link>
            </div>
            <div className="card side-card">
              <h3>Need a hand?</h3>
              <p>Talk to a specialist about your growth goals.</p>
              <Link to="/contact" className="btn btn-ghost full">Contact us</Link>
            </div>
          </aside>
        </div>
      </section>
      <section className="section alt">
        <div className="container">
          <Reveal className="section-head"><span className="kicker">Keep reading</span><h2>Related articles</h2></Reveal>
          <div className="grid-3">{related.map((p) => <PostCard key={p.slug} post={p} i={POSTS.indexOf(p)} />)}</div>
        </div>
      </section>
    </>
  )
}

function EbookPromo() {
  const b = EBOOKS[0]
  return (
    <section className="section tight">
      <div className="container">
        <div className="promo">
          <EbookCover book={b} small />
          <div>
            <span className="kicker">Free ebook</span>
            <h2>{b.title}</h2>
            <p>{b.summary}</p>
            <Link to="/ebooks" className="btn btn-white">Browse all ebooks <Icon name="arrow" size={18} /></Link>
          </div>
        </div>
      </div>
    </section>
  )
}

/* =================== EBOOKS =================== */
export function Ebooks() {
  useTitle('Ebooks')
  return (
    <>
      <PageHero kicker="Ebooks & guides" crumbs={[['Ebooks']]}
        title="Free guides to grow smarter"
        text="In-depth, practical playbooks from our specialists. No fluff — just frameworks you can put to work this quarter." />
      <section className="section tight-top">
        <div className="container grid-2">
          {EBOOKS.map((b, i) => (
            <Reveal key={b.slug} delay={i * 60}>
              <Link to={`/ebooks/${b.slug}`} className="card ebook-card">
                <EbookCover book={b} small />
                <div className="ebook-info">
                  <span className="tag">{b.pages} pages · {b.chapters.length} chapters</span>
                  <h3>{b.title}</h3>
                  <p>{b.summary}</p>
                  <span className="link">Get free access <Icon name="arrow" size={16} /></span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
      <CtaBand title="Want a guide tailored to your business?" text="Our free growth audit turns these frameworks into a plan for you." />
    </>
  )
}

export function EbookDetail() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const b = EBOOKS.find((x) => x.slug === slug)
  const [form, setForm] = useState({ name: '', email: '', company: '' })
  useTitle(b?.title)
  if (!b) return <NotFound />
  const submit = (e) => {
    e.preventDefault()
    try { sessionStorage.setItem('ebook-access', '1') } catch (err) { /* ignore */ }
    navigate(`/ebooks/${b.slug}/read`)
  }
  return (
    <>
      <PageHero kicker="Free ebook" crumbs={[['Ebooks', '/ebooks'], [b.title]]} title={b.title} text={b.subtitle} />
      <section className="section tight-top">
        <div className="container ebook-detail">
          <div>
            <EbookCover book={b} />
            <div className="card inside">
              <h3>What's inside</h3>
              <ol className="chapters">
                {b.chapters.map(([t]) => <li key={t}>{t}</li>)}
              </ol>
            </div>
          </div>
          <div>
            <p className="body-text big">{b.summary}</p>
            <ul className="check-list compact">
              <li><span className="check"><Icon name="check" size={16} /></span>{b.chapters.length} practical chapters</li>
              <li><span className="check"><Icon name="check" size={16} /></span>Frameworks and checklists you can reuse</li>
              <li><span className="check"><Icon name="check" size={16} /></span>Written by senior XYZ specialists</li>
            </ul>
            <form className="card form" onSubmit={submit}>
              <h3><Icon name="lock" size={18} /> Get instant access</h3>
              <label>Full name<input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Jane Doe" /></label>
              <label>Work email<input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="jane@company.com" /></label>
              <label>Company<input value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} placeholder="Company Inc." /></label>
              <button className="btn btn-primary full" type="submit">Read the ebook <Icon name="arrow" size={18} /></button>
              <small className="fine">By continuing you agree to our <Link to="/privacy">privacy policy</Link>.</small>
            </form>
          </div>
        </div>
      </section>
    </>
  )
}

export function EbookReader() {
  const { slug } = useParams()
  const b = EBOOKS.find((x) => x.slug === slug)
  useTitle(b?.title)
  if (!b) return <NotFound />
  return (
    <>
      <PageHero kicker="Ebook" crumbs={[['Ebooks', '/ebooks'], [b.title, `/ebooks/${b.slug}`], ['Read']]} title={b.title} text={b.subtitle}>
        <div className="hero-ctas"><button className="btn btn-ghost" onClick={() => window.print()}>Print / save as PDF</button></div>
      </PageHero>
      <section className="section tight-top">
        <div className="container article-wrap">
          <article className="article">
            {b.chapters.map(([t, text], i) => (
              <section key={t} id={`ch-${i + 1}`}>
                <span className="kicker">Chapter {i + 1}</span>
                <h2 className="no-top">{t}</h2>
                <p>{text}</p>
              </section>
            ))}
            <blockquote>Want help applying this to your business? Our team offers a free growth audit.</blockquote>
            <Link to="/contact" className="btn btn-primary">Book a free audit <Icon name="arrow" size={18} /></Link>
          </article>
          <aside className="sidebar">
            <div className="card side-card toc">
              <h3>Contents</h3>
              {b.chapters.map(([t], i) => <a key={t} href={`#ch-${i + 1}`}>{i + 1}. {t}</a>)}
            </div>
          </aside>
        </div>
      </section>
    </>
  )
}

/* =================== CAREERS =================== */
export function Careers() {
  useTitle('Careers')
  return (
    <>
      <PageHero kicker="Careers" crumbs={[['Careers']]}
        title="Do the best work of your career"
        text="Join a team of curious, senior marketers and builders who care about real outcomes." />
      <section className="section">
        <div className="container">
          <div className="grid-4">
            {[
              ['clock', 'Flexible work', 'Remote-friendly with offices across three countries.'],
              ['spark', 'Learning budget', 'Annual budget for courses, certifications and events.'],
              ['users', 'Great people', 'Work alongside senior specialists who share what they know.'],
              ['chart', 'Real impact', 'Own outcomes for clients — not just tasks.'],
            ].map(([ic, t, d]) => (
              <div key={t} className="card value"><span className="icon-box"><Icon name={ic} /></span><h3>{t}</h3><p>{d}</p></div>
            ))}
          </div>
        </div>
      </section>
      <section className="section alt">
        <div className="container">
          <Reveal className="section-head"><span className="kicker">Open roles</span><h2>Current openings</h2></Reveal>
          <div className="jobs">
            {JOBS.map((j) => (
              <div key={j.title} className="card job">
                <div>
                  <h3>{j.title}</h3>
                  <small><span className="tag soft">{j.team}</span> <Icon name="pin" size={14} /> {j.location} · {j.type}</small>
                </div>
                <a className="btn btn-ghost" href={mailto(`Application: ${j.title}`, ['Hi XYZ team,', '', `I'd like to apply for the ${j.title} role.`, '', 'Portfolio / LinkedIn:', ''])}>Apply <Icon name="arrow" size={16} /></a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

/* =================== CONTACT =================== */
export function Contact() {
  useTitle('Contact')
  const [form, setForm] = useState({ name: '', email: '', company: '', service: SERVICES[0].title, budget: '', message: '' })
  const [sent, setSent] = useState(false)
  const up = (k) => (e) => setForm({ ...form, [k]: e.target.value })
  const submit = (e) => {
    e.preventDefault()
    window.location.href = mailto(`New enquiry from ${form.name}`, [
      `Name: ${form.name}`, `Email: ${form.email}`, `Company: ${form.company}`,
      `Service: ${form.service}`, `Budget: ${form.budget}`, '', form.message,
    ])
    setSent(true)
  }
  return (
    <>
      <PageHero kicker="Contact" crumbs={[['Contact']]}
        title="Let's partner together"
        text="Tell us where you want to be in 12 months. We'll come back within one business day with next steps." />
      <section className="section tight-top">
        <div className="container contact-grid">
          <form className="card form big" onSubmit={submit}>
            {sent ? (
              <div className="sent">
                <span className="icon-box"><Icon name="check" /></span>
                <h3>Thanks, {form.name.split(' ')[0] || 'there'}!</h3>
                <p>Your email app should have opened with your message. If it didn't, email us at <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>.</p>
                <button type="button" className="btn btn-ghost" onClick={() => setSent(false)}>Send another message</button>
              </div>
            ) : (
              <>
                <div className="field-row">
                  <label>Name<input required value={form.name} onChange={up('name')} placeholder="Jane Doe" /></label>
                  <label>Work email<input required type="email" value={form.email} onChange={up('email')} placeholder="jane@company.com" /></label>
                </div>
                <div className="field-row">
                  <label>Company<input value={form.company} onChange={up('company')} placeholder="Company Inc." /></label>
                  <label>Monthly budget
                    <select value={form.budget} onChange={up('budget')}>
                      <option value="">Select a range</option>
                      <option>Under $5k</option><option>$5k – $15k</option><option>$15k – $50k</option><option>$50k+</option>
                    </select>
                  </label>
                </div>
                <label>Interested in
                  <select value={form.service} onChange={up('service')}>
                    {SERVICES.map((s) => <option key={s.slug}>{s.title}</option>)}
                    <option>Full-funnel partnership</option>
                  </select>
                </label>
                <label>What are your goals?<textarea rows="5" value={form.message} onChange={up('message')} placeholder="E.g. double inbound demo requests in the next two quarters" /></label>
                <button className="btn btn-primary full" type="submit">Send message <Icon name="arrow" size={18} /></button>
              </>
            )}
          </form>
          <div className="contact-side">
            <div className="card contact-item"><span className="icon-box sm"><Icon name="mail" size={18} /></span><div><small>Email</small><a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a></div></div>
            <div className="card contact-item"><span className="icon-box sm"><Icon name="phone" size={18} /></span><div><small>Phone</small><a href="tel:+10000000000">{COMPANY.phone}</a></div></div>
            {COMPANY.offices.map((o) => (
              <div key={o.city} className="card contact-item"><span className="icon-box sm"><Icon name="pin" size={18} /></span><div><small>{o.city}, {o.country}</small><span>{o.address}</span></div></div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

/* =================== LEGAL / 404 =================== */
export function Privacy() {
  useTitle('Privacy Policy')
  return (
    <>
      <PageHero kicker="Legal" crumbs={[['Privacy Policy']]} title="Privacy Policy & Terms" text="Template text — have it reviewed by your legal advisor before publishing." />
      <section className="section tight-top">
        <div className="container">
          <article className="article narrow">
            <h2>Information we collect</h2>
            <p>We collect information you provide directly, such as your name, email address and company when you contact us or request a resource, and basic analytics data about how you use this website.</p>
            <h2>How we use information</h2>
            <p>We use your information to respond to enquiries, deliver requested content, improve our website and, where you have agreed, send relevant marketing communications.</p>
            <h2>Your choices</h2>
            <p>You can ask us to access, correct or delete your personal information at any time by emailing {COMPANY.email}.</p>
            <h2 id="terms">Terms of use</h2>
            <p>Content on this website is provided for general information. While we aim to keep it accurate and current, it does not constitute professional advice for your specific situation.</p>
          </article>
        </div>
      </section>
    </>
  )
}

export function NotFound() {
  useTitle('Page not found')
  return (
    <PageHero kicker="404" title="We couldn't find that page" text="The page may have moved. Try one of these instead.">
      <div className="hero-ctas">
        <Link to="/" className="btn btn-primary">Go home</Link>
        <Link to="/blog" className="btn btn-ghost">Read the blog</Link>
      </div>
    </PageHero>
  )
}
