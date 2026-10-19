import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import {
  CASE_STUDIES, CLIENTS, COMPANY, EBOOKS, HERO_WORDS, INDUSTRIES, JOBS, POSTS, SERVICES, STATS, STEPS, VALUES,
} from './data.js'
import {
  CaseCard, Counter, CtaBand, EbookCover, Icon, PageHero, Parallax, PostCard, Reveal, SplitText,
  spotlight, useSectionProgress, useTitle,
} from './components.jsx'

const mailto = (subject, lines) =>
  `mailto:${COMPANY.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join('\n'))}`

/* =================== HOME =================== */
function RotatingWord({ words, interval = 2600 }) {
  const [i, setI] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setI((n) => (n + 1) % words.length), interval)
    return () => clearInterval(t)
  }, [words.length, interval])
  return (
    <span className="rotator" aria-live="polite">
      {words.map((w, k) => (
        <span key={w} className={`rot-word ${k === i ? 'on' : ''} ${k === (i - 1 + words.length) % words.length ? 'out' : ''}`} aria-hidden={k !== i}>{w}</span>
      ))}
    </span>
  )
}

function HeroVisual() {
  return (
    <div className="hero-visual" aria-hidden="true">
      <div className="orbit">
        {['search', 'target', 'pen', 'chart'].map((ic, k) => (
          <span key={ic} className={`orbit-ico i${k}`}><Icon name={ic} size={18} /></span>
        ))}
      </div>
      <div className="dash card mp mp-1">
        <div className="dash-top"><span>Pipeline generated</span><span className="pill up">+212%</span></div>
        <div className="dash-value">$4.8M</div>
        <svg className="dash-chart" viewBox="0 0 300 110" preserveAspectRatio="none">
          <defs>
            <linearGradient id="hg" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0" stopColor="var(--primary)" stopOpacity=".35" />
              <stop offset="1" stopColor="var(--primary)" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="hl" x1="0" x2="1">
              <stop offset="0" stopColor="var(--primary)" />
              <stop offset="1" stopColor="var(--cyan)" />
            </linearGradient>
          </defs>
          <path className="area" d="M0 95 L30 88 L60 90 L90 75 L120 78 L150 60 L180 55 L210 40 L240 35 L270 20 L300 12 L300 110 L0 110Z" fill="url(#hg)" />
          <path className="draw" d="M0 95 L30 88 L60 90 L90 75 L120 78 L150 60 L180 55 L210 40 L240 35 L270 20 L300 12" fill="none" stroke="url(#hl)" strokeWidth="3" pathLength="1" />
          <circle className="dot-end" cx="300" cy="12" r="5" fill="var(--cyan)" />
        </svg>
        <div className="dash-bars">
          {[38, 52, 46, 64, 58, 76, 88].map((h, k) => <span key={k} style={{ '--h': `${h}%`, animationDelay: `${0.9 + k * 0.08}s` }} />)}
        </div>
        <div className="dash-row">
          <div><small>Organic</small><b>48%</b></div>
          <div><small>Paid</small><b>31%</b></div>
          <div><small>Referral</small><b>21%</b></div>
        </div>
      </div>
      <div className="float card f1 mp mp-2">
        <span className="f-ico"><Icon name="target" size={18} /></span>
        <div><small>Cost per lead</small><b>−37%</b></div>
      </div>
      <div className="float card f2 mp mp-3">
        <span className="f-ico cyan"><Icon name="search" size={18} /></span>
        <div><small>Keywords in top 3</small><b>1,240</b></div>
      </div>
      <div className="toast card mp mp-2">
        <span className="toast-dot" />
        <div><b>New qualified lead</b><small>Demo booked · just now</small></div>
      </div>
    </div>
  )
}

export function Home() {
  useTitle()
  const heroRef = useRef(null)
  const onMove = (e) => {
    const el = heroRef.current
    if (!el) return
    const r = el.getBoundingClientRect()
    el.style.setProperty('--px', ((e.clientX - r.left) / r.width - 0.5).toFixed(3))
    el.style.setProperty('--py', ((e.clientY - r.top) / r.height - 0.5).toFixed(3))
  }
  return (
    <>
      <section className="hero home-hero" ref={heroRef} onMouseMove={onMove}>
        <div className="orbs" aria-hidden="true"><span className="orb o1" /><span className="orb o2" /><span className="orb o3" /></div>
        <div className="grid-bg" aria-hidden="true" />
        <div className="container hero-grid">
          <div className="hero-copy">
            <span className="eyebrow fade-in"><span className="pulse-dot" /> Full-funnel digital marketing agency</span>
            <h1 className="hero-title">
              <span className="line"><span>Marketing that drives</span></span>
              <span className="line"><RotatingWord words={HERO_WORDS} /></span>
            </h1>
            <p className="lead fade-in d2">
              XYZ Agency brings SEO, paid media, content, web and AI together as one connected growth system —
              run by senior specialists and measured against revenue.
            </p>
            <div className="hero-ctas fade-in d3">
              <Link to="/contact" className="btn btn-primary shine">Get a free growth audit <Icon name="arrow" size={18} /></Link>
              <Link to="/work" className="btn btn-ghost">See our results</Link>
            </div>
            <div className="hero-proof fade-in d4">
              {STATS.filter((s) => s.label !== 'Ad spend managed ($)').map((s) => (
                <div key={s.label}><b><Counter value={s.value} suffix={s.suffix} /></b><small>{s.label}</small></div>
              ))}
            </div>
          </div>
          <Parallax speed={0.08}><HeroVisual /></Parallax>
        </div>
        <a href="#services" className="scroll-cue" aria-label="Scroll to services"><span className="mouse"><span /></span>Scroll</a>
        <div className="logos">
          <p>Trusted by growing brands worldwide</p>
          <div className="marquee">
            <div className="marquee-track">
              {[...CLIENTS, ...CLIENTS].map((c, i) => <span key={i}>{c}</span>)}
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="services">
        <div className="container">
          <div className="section-head row">
            <div>
              <Reveal><span className="kicker">What we do</span></Reveal>
              <SplitText text="We plan, build and run the systems behind your growth" />
            </div>
            <Reveal variant="left"><Link to="/services" className="btn btn-ghost">All services <Icon name="arrow" size={18} /></Link></Reveal>
          </div>
          <div className="grid-3">
            {SERVICES.map((s, i) => (
              <Reveal key={s.slug} delay={(i % 3) * 90}><ServiceCard s={s} /></Reveal>
            ))}
          </div>
        </div>
      </section>

      <StatsBand />

      <section className="section alt">
        <div className="container">
          <div className="section-head row">
            <div>
              <Reveal><span className="kicker">Results</span></Reveal>
              <SplitText text="Delivering on expectations with measurable outcomes" />
            </div>
            <Reveal variant="left"><Link to="/work" className="btn btn-ghost">View case studies <Icon name="arrow" size={18} /></Link></Reveal>
          </div>
          <div className="grid-4">
            {CASE_STUDIES.map((c, i) => <Reveal key={c.slug} variant="zoom" delay={i * 90}><CaseCard c={c} /></Reveal>)}
          </div>
          <p className="footnote">Figures shown are illustrative sample outcomes.</p>
        </div>
      </section>

      <Approach />

      <section className="section">
        <div className="container">
          <div className="section-head center">
            <Reveal><span className="kicker">Industries</span></Reveal>
            <SplitText text="Specialists in the markets we serve" />
            <Reveal delay={150}><p>Deep category knowledge means faster ramp-up and messaging that lands with your buyers.</p></Reveal>
          </div>
          <div className="chips">
            {INDUSTRIES.map((x, i) => <Reveal key={x} as="span" variant="zoom" delay={i * 50} className="chip">{x}</Reveal>)}
          </div>
        </div>
      </section>

      <section className="section alt">
        <div className="container">
          <div className="section-head row">
            <div>
              <Reveal><span className="kicker">Free resources</span></Reveal>
              <SplitText text="Guides from experts driving results on the ground" />
            </div>
            <Reveal variant="left"><Link to="/ebooks" className="btn btn-ghost">All ebooks <Icon name="arrow" size={18} /></Link></Reveal>
          </div>
          <div className="ebook-feature">
            {EBOOKS.slice(0, 2).map((b, i) => (
              <Reveal key={b.slug} variant={i ? 'left' : 'right'}>
                <Link to={`/ebooks/${b.slug}`} className="card ebook-row spot" onMouseMove={spotlight}>
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
          <div className="section-head row">
            <div>
              <Reveal><span className="kicker">From the blog</span></Reveal>
              <SplitText text="Recent thinking" />
            </div>
            <Reveal variant="left"><Link to="/blog" className="btn btn-ghost">Read the blog <Icon name="arrow" size={18} /></Link></Reveal>
          </div>
          <div className="grid-3">
            {POSTS.slice(0, 3).map((p, i) => <Reveal key={p.slug} delay={i * 90}><PostCard post={p} i={i} /></Reveal>)}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  )
}

function ServiceCard({ s }) {
  return (
    <Link to={`/services/${s.slug}`} className="card service spot" onMouseMove={spotlight} style={{ '--svc': s.color }}>
      <span className="icon-box svc-ico"><Icon name={s.icon} /></span>
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
      <div className="stats-shine" aria-hidden="true" />
      <div className="container stats-grid">
        {STATS.map((s, i) => (
          <Reveal key={s.label} variant="zoom" delay={i * 90}>
            <div className="stat-num"><Counter value={s.value} suffix={s.suffix} /></div>
            <div className="stat-label">{s.label}</div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

function Approach() {
  const [ref, p] = useSectionProgress()
  const [hover, setHover] = useState(null)
  const active = hover ?? Math.min(STEPS.length - 1, Math.floor(p * STEPS.length * 1.1))
  return (
    <section className="section dark">
      <div className="orbs dim" aria-hidden="true"><span className="orb o1" /><span className="orb o2" /></div>
      <div className="container approach">
        <div className="section-head light">
          <Reveal><span className="kicker">How we work</span></Reveal>
          <SplitText text="GrowthOS — one operating model, compounding results" />
          <Reveal delay={150}>
            <p>A shared playbook, a senior pod embedded with your team, and weekly reporting that turns predictive by month four.</p>
            <Link to="/contact" className="btn btn-primary">Start with a growth audit <Icon name="arrow" size={18} /></Link>
          </Reveal>
        </div>
        <div className="steps" ref={ref} onMouseLeave={() => setHover(null)}>
          <span className="steps-line" style={{ transform: `scaleY(${p})` }} aria-hidden="true" />
          {STEPS.map((s, i) => (
            <Reveal key={s.title} variant="left" delay={i * 100}>
              <button className={`step ${active === i ? 'active' : ''} ${i <= active ? 'done' : ''}`}
                onMouseEnter={() => setHover(i)} onFocus={() => setHover(i)}>
                <span className="step-num">0{i + 1}</span>
                <div><small>{s.when}</small><h3>{s.title}</h3><p>{s.text}</p></div>
              </button>
            </Reveal>
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
          {SERVICES.map((s, i) => <Reveal key={s.slug} delay={(i % 3) * 90}><ServiceCard s={s} /></Reveal>)}
        </div>
      </section>
      <section className="section alt">
        <div className="container">
          <div className="section-head center">
            <Reveal><span className="kicker">Better together</span></Reveal>
            <SplitText text="One team, every channel" />
            <Reveal delay={150}><p>When SEO, paid, content, web and analytics share one plan, each channel makes the others stronger.</p></Reveal>
          </div>
          <div className="grid-3">
            {[
              ['users', 'One senior pod', 'A dedicated strategist and specialists across every channel you need.'],
              ['chart', 'One source of truth', 'Shared dashboards that connect every channel to pipeline and revenue.'],
              ['spark', 'One growth plan', 'A single roadmap so channels reinforce each other instead of competing.'],
            ].map(([ic, t, d], i) => (
              <Reveal key={t} variant="zoom" delay={i * 90}>
                <div className="card value"><span className="icon-box"><Icon name={ic} /></span><h3>{t}</h3><p>{d}</p></div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <Approach />
      <CtaBand title="Not sure where to start?" text="We'll audit your channels and recommend the two or three moves with the biggest upside." />
    </>
  )
}

/* ---------- Unique hero visual for each service ---------- */
function ServiceVisual({ slug }) {
  switch (slug) {
    case 'seo':
      return (
        <div className="sv card sv-seo">
          <div className="sv-search"><Icon name="search" size={16} /> b2b marketing agency</div>
          {['competitor-one.com', 'industry-blog.net', 'yourbrand.com', 'directory-site.org'].map((d, k) => (
            <div key={d} className={`serp ${k === 2 ? 'you' : ''}`}>
              <span className="pos">{k === 2 ? '#1' : `#${k < 2 ? k + 2 : 4}`}</span>
              <div><b>{d}</b><i /><i className="short" /></div>
              {k === 2 && <span className="up-badge"><Icon name="up" size={12} /> 8</span>}
            </div>
          ))}
          <div className="sv-chip c1"><small>Organic traffic</small><b>+180%</b></div>
        </div>
      )
    case 'paid-media':
      return (
        <div className="sv card sv-paid">
          <h4>Campaign performance</h4>
          {[['Google Ads', 86], ['Meta', 68], ['LinkedIn', 54]].map(([n, v], k) => (
            <div key={n} className="bar-row">
              <span>{n}</span>
              <div className="bar"><span style={{ '--w': `${v}%`, animationDelay: `${0.3 + k * 0.15}s` }} /></div>
              <b>{(v / 20).toFixed(1)}x</b>
            </div>
          ))}
          <div className="gauge">
            <svg viewBox="0 0 120 120"><circle cx="60" cy="60" r="50" className="g-bg" /><circle cx="60" cy="60" r="50" className="g-fg" pathLength="100" /></svg>
            <div><b>4.2x</b><small>Blended ROAS</small></div>
          </div>
          <div className="sv-chip c1"><small>Cost per lead</small><b>−37%</b></div>
        </div>
      )
    case 'content-social':
      return (
        <div className="sv sv-content">
          {[0, 1, 2].map((k) => (
            <div key={k} className={`post-mock card pm${k}`}>
              <div className="pm-head"><span className="av" /><div><i /><i className="short" /></div></div>
              <div className={`pm-img g${k}`} />
              <div className="pm-foot"><span>♥ {[248, 1032, 512][k]}</span><span>↻ {[36, 140, 77][k]}</span></div>
            </div>
          ))}
          <div className="sv-chip c1"><small>Engagement</small><b>3x</b></div>
        </div>
      )
    case 'web-experience':
      return (
        <div className="sv card sv-web">
          <div className="browser-bar"><span /><span /><span /><div className="url">yourbrand.com</div></div>
          <div className="wf">
            <div className="wf-hero"><i /><i className="short" /><span className="wf-btn" /></div>
            <div className="wf-grid"><span /><span /><span /></div>
          </div>
          <div className="scores">
            {[['98', 'Performance'], ['100', 'SEO'], ['96', 'Accessibility']].map(([v, l], k) => (
              <div key={l} className="score">
                <svg viewBox="0 0 44 44"><circle cx="22" cy="22" r="18" className="g-bg" /><circle cx="22" cy="22" r="18" className="g-fg" pathLength="100" style={{ '--v': v, animationDelay: `${0.4 + k * 0.2}s` }} /></svg>
                <b>{v}</b><small>{l}</small>
              </div>
            ))}
          </div>
        </div>
      )
    case 'analytics-cro':
      return (
        <div className="sv card sv-analytics">
          <h4>Funnel overview</h4>
          {[['Visitors', 100, '48,200'], ['Leads', 62, '3,140'], ['Qualified', 38, '1,020'], ['Customers', 20, '212']].map(([l, w, v], k) => (
            <div key={l} className="funnel-row">
              <div className="funnel-bar" style={{ '--w': `${w}%`, animationDelay: `${0.2 + k * 0.15}s` }}><span>{l}</span></div>
              <b>{v}</b>
            </div>
          ))}
          <div className="ab">
            <div><small>Variant A</small><b>3.1%</b></div>
            <div className="win"><small>Variant B</small><b>4.3%</b><span>Winner</span></div>
          </div>
        </div>
      )
    default:
      return (
        <div className="sv card sv-ai">
          {[['mail', 'New lead captured'], ['spark', 'AI enrichment'], ['target', 'Lead score: 92'], ['users', 'Routed to sales']].map(([ic, t], k) => (
            <div key={t} className="node-wrap">
              <div className="node" style={{ animationDelay: `${k * 0.6}s` }}><span className="icon-box sm"><Icon name={ic} size={16} /></span>{t}<Icon name="check" size={16} /></div>
              {k < 3 && <span className="connector" />}
            </div>
          ))}
          <div className="sv-chip c1"><small>Time saved</small><b>20+ hrs/wk</b></div>
        </div>
      )
  }
}

const SERVICE_POST_CATS = {
  seo: ['SEO'], 'paid-media': ['Paid Media'], 'content-social': ['Demand Gen'],
  'web-experience': ['CRO'], 'analytics-cro': ['Analytics', 'CRO'], 'ai-automation': ['AI'],
}

function Faq({ items }) {
  const [open, setOpen] = useState(0)
  return (
    <div className="faq">
      {items.map(([q, a], i) => (
        <Reveal key={q} delay={i * 70}>
          <div className={`faq-item card ${open === i ? 'open' : ''}`}>
            <button className="faq-q" aria-expanded={open === i} onClick={() => setOpen(open === i ? -1 : i)}>
              {q}<span className="faq-ico"><Icon name="plus" size={18} /></span>
            </button>
            <div className="faq-a"><div><p>{a}</p></div></div>
          </div>
        </Reveal>
      ))}
    </div>
  )
}

function ServiceProcess({ steps }) {
  const [ref, p] = useSectionProgress()
  return (
    <div className="timeline" ref={ref}>
      <span className="tl-track" aria-hidden="true"><span className="tl-fill" style={{ transform: `scaleY(${p})` }} /></span>
      {steps.map(([t, d], i) => (
        <Reveal key={t} variant={i % 2 ? 'left' : 'right'} className={`tl-item ${p * steps.length > i + 0.2 ? 'lit' : ''}`}>
          <span className="tl-dot">{i + 1}</span>
          <div className="card tl-card">
            <small>Step {i + 1}</small>
            <h3>{t}</h3>
            <p>{d}</p>
          </div>
        </Reveal>
      ))}
    </div>
  )
}

export function ServiceDetail() {
  const { slug } = useParams()
  const s = SERVICES.find((x) => x.slug === slug)
  useTitle(s?.title)
  if (!s) return <NotFound />
  const idx = SERVICES.indexOf(s)
  const prev = SERVICES[(idx - 1 + SERVICES.length) % SERVICES.length]
  const next = SERVICES[(idx + 1) % SERVICES.length]
  let related = CASE_STUDIES.filter((c) => c.services.includes(s.title))
  if (related.length < 2) related = [...related, ...CASE_STUDIES.filter((c) => !related.includes(c))].slice(0, 2)
  const cats = SERVICE_POST_CATS[s.slug] || []
  let posts = POSTS.filter((p) => cats.includes(p.category))
  if (posts.length < 3) posts = [...posts, ...POSTS.filter((p) => !posts.includes(p))].slice(0, 3)

  return (
    <div className="svc-page" style={{ '--svc': s.color }} key={s.slug}>
      <section className="page-hero svc-hero">
        <div className="orbs" aria-hidden="true"><span className="orb o1" /><span className="orb o2" /></div>
        <div className="grid-bg" aria-hidden="true" />
        <div className="container svc-hero-grid">
          <div>
            <nav className="crumbs fade-in" aria-label="Breadcrumb">
              <Link to="/">Home</Link> / <Link to="/services">Services</Link> / <span aria-current="page">{s.title}</span>
            </nav>
            <span className="kicker svc-kicker fade-in"><span className="icon-box sm svc-ico"><Icon name={s.icon} size={16} /></span> Service</span>
            <SplitText as="h1" text={s.title} />
            <p className="svc-tagline fade-in d2">{s.tagline}</p>
            <p className="lead fade-in d2">{s.intro}</p>
            <div className="hero-ctas fade-in d3">
              <Link to="/contact" className="btn btn-primary shine">Get a proposal <Icon name="arrow" size={18} /></Link>
              <a href="#process" className="btn btn-ghost">How it works</a>
            </div>
          </div>
          <Parallax speed={0.06}><div className="fade-in d2"><ServiceVisual slug={s.slug} /></div></Parallax>
        </div>
        <div className="container">
          <div className="svc-stats fade-in d4">
            {s.stats.map(([v, l]) => <div key={l}><b>{v}</b><span>{l}</span></div>)}
          </div>
        </div>
      </section>

      <nav className="subnav" aria-label="On this page">
        <div className="container subnav-inner">
          {[['Overview', '#overview'], ["What's included", '#included'], ['Process', '#process'], ['Results', '#results'], ['FAQ', '#faq']].map(([l, h]) => (
            <a key={h} href={h}>{l}</a>
          ))}
          <Link to="/contact" className="btn btn-primary sm">Get a proposal</Link>
        </div>
      </nav>

      <section className="section" id="overview">
        <div className="container split">
          <div>
            <Reveal><span className="kicker">Why it matters</span></Reveal>
            <SplitText text={s.tagline} />
            {s.why.map((t, i) => <Reveal key={i} delay={100 + i * 80}><p className="body-text">{t}</p></Reveal>)}
          </div>
          <Reveal variant="left" className="card outcome-card">
            <span className="icon-box svc-ico"><Icon name={s.icon} /></span>
            <h3>Outcomes you can expect</h3>
            <ul className="check-list compact">
              {s.outcomes.map((o) => <li key={o}><span className="check"><Icon name="check" size={16} /></span>{o}</li>)}
            </ul>
            <Link to="/contact" className="btn btn-primary full">Talk to a specialist</Link>
          </Reveal>
        </div>
      </section>

      <section className="section alt" id="included">
        <div className="container">
          <div className="section-head">
            <Reveal><span className="kicker">What's included</span></Reveal>
            <SplitText text="Everything you need, nothing you don't" />
          </div>
          <div className="grid-3">
            {s.deliverables.map((d, i) => (
              <Reveal key={d} variant="zoom" delay={(i % 3) * 90}>
                <div className="card deliverable spot" onMouseMove={spotlight}>
                  <span className="d-num">{String(i + 1).padStart(2, '0')}</span>
                  <h3>{d}</h3>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="process">
        <div className="container">
          <div className="section-head center">
            <Reveal><span className="kicker">Our process</span></Reveal>
            <SplitText text="How we deliver results, step by step" />
          </div>
          <ServiceProcess steps={s.process} />
        </div>
      </section>

      <section className="section alt" id="results">
        <div className="container">
          <div className="section-head row">
            <div>
              <Reveal><span className="kicker">Proof</span></Reveal>
              <SplitText text="Related results" />
            </div>
            <Reveal variant="left"><Link to="/work" className="btn btn-ghost">All case studies <Icon name="arrow" size={18} /></Link></Reveal>
          </div>
          <div className="grid-2">{related.map((c, i) => <Reveal key={c.slug} variant="zoom" delay={i * 90}><CaseCard c={c} /></Reveal>)}</div>
          <p className="footnote">Figures shown are illustrative sample outcomes.</p>
        </div>
      </section>

      <section className="section tight">
        <div className="container">
          <Reveal className="tools">
            <span className="kicker">Platforms we work with</span>
            <div className="tool-list">
              {s.tools.map((t, i) => <span key={t} className="chip" style={{ transitionDelay: `${i * 40}ms` }}>{t}</span>)}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section" id="faq">
        <div className="container faq-wrap">
          <div>
            <Reveal><span className="kicker">FAQ</span></Reveal>
            <SplitText text="Questions, answered" />
            <Reveal delay={120}>
              <p className="body-text">Can't find what you're looking for? Our team is happy to help.</p>
              <Link to="/contact" className="btn btn-ghost mt-btn">Ask a question <Icon name="arrow" size={18} /></Link>
            </Reveal>
          </div>
          <Faq items={s.faqs} />
        </div>
      </section>

      <section className="section alt">
        <div className="container">
          <div className="section-head row">
            <div>
              <Reveal><span className="kicker">Learn more</span></Reveal>
              <SplitText text="Related reading" />
            </div>
            <Reveal variant="left"><Link to="/blog" className="btn btn-ghost">Visit the blog <Icon name="arrow" size={18} /></Link></Reveal>
          </div>
          <div className="grid-3">{posts.slice(0, 3).map((p, i) => <Reveal key={p.slug} delay={i * 90}><PostCard post={p} i={POSTS.indexOf(p)} /></Reveal>)}</div>
        </div>
      </section>

      <section className="section tight">
        <div className="container svc-pager">
          <Link to={`/services/${prev.slug}`} className="card pager" style={{ '--svc': prev.color }}>
            <small><Icon name="back" size={16} /> Previous service</small>
            <span><span className="icon-box sm svc-ico"><Icon name={prev.icon} size={16} /></span>{prev.title}</span>
          </Link>
          <Link to={`/services/${next.slug}`} className="card pager right" style={{ '--svc': next.color }}>
            <small>Next service <Icon name="arrow" size={16} /></small>
            <span>{next.title}<span className="icon-box sm svc-ico"><Icon name={next.icon} size={16} /></span></span>
          </Link>
        </div>
      </section>

      <CtaBand title={`Ready to talk about ${s.title.split(' &')[0]}?`} text="Get a free audit and a clear 90-day plan from our senior team." />
    </div>
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
