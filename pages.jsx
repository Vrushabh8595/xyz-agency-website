import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import {
  APP_TECH, CASE_STUDIES, CLIENTS, CMS_TECH, COMPANY, EBOOKS, HERO_WORDS, HOME_FAQS, getPostContent, loadPostContent, HOSTING, INDUSTRIES, JOBS, MARKETING_TECH, PARTNERS, POSTS,
  SERVICE_GROUPS, SERVICES, STATS, STEPS, VALUES,
} from './data.js'
import { LOGO_MARK, RECAPTCHA_SITE_KEY, SITE_URL } from './site.config.js'
import { MIN_FILL_MS, validateLead } from './formguard.js'
import {
  CaseCard, Counter, CtaBand, EbookCover, Honeypot, Icon, LottiePlayer, PageHero, Parallax, PostCard, Reveal, RichText, SplitText,
  Socials, TechTile, loadRecaptcha, sendLead, spotlight, useInView, useSectionProgress, useTitle,
} from './components.jsx'

/* Shared state for every lead form: validation → idle → sending → sent | error.
   Rules live in formguard.js and are enforced again server-side in api/lead.js. */
function useLeadForm(kind, initial) {
  const [form, setForm] = useState(initial)
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')
  const [honey, setHoney] = useState('')
  const [touched, setTouched] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [serverErrors, setServerErrors] = useState({})
  const startedAt = useRef(0)
  useEffect(() => { startedAt.current = Date.now() }, [])
  const errors = { ...serverErrors, ...validateLead(kind, form) }
  const errorFor = (k) => ((submitted || touched[k]) && errors[k]) || ''
  const up = (k) => (e) => {
    const val = e.target.value
    setForm((f) => ({ ...f, [k]: val }))
    if (serverErrors[k]) setServerErrors(({ [k]: _, ...rest }) => rest)
  }
  /* Spread onto an input: <input {...bind('email')} /> */
  const bind = (k) => ({
    name: k, value: form[k], onChange: up(k),
    onBlur: () => setTouched((t) => (t[k] ? t : { ...t, [k]: true })),
    onFocus: () => { loadRecaptcha() },
    'aria-invalid': errorFor(k) ? 'true' : undefined,
    'aria-describedby': errorFor(k) ? `err-${kind}-${k}` : undefined,
  })
  const fieldError = (k) => (errorFor(k) ? <span className="field-error" id={`err-${kind}-${k}`} role="alert">{errorFor(k)}</span> : null)
  const submit = async (e, subject, fields, onDone) => {
    e?.preventDefault()
    const formEl = e?.currentTarget
    setSubmitted(true)
    const errs = validateLead(kind, form)
    const first = Object.keys(errs)[0]
    if (first) {
      setStatus('idle'); setError('')
      formEl?.querySelector(`[name="${first}"]`)?.focus()
      return
    }
    if (honey) { setStatus('sent'); onDone?.(); return } // bot: pretend it worked, send nothing
    if (recentLeads() >= 4) { setError('You have sent several messages in the last few minutes — please wait a little and try again'); setStatus('error'); return }
    setStatus('sending'); setError('')
    const wait = MIN_FILL_MS + 300 - (Date.now() - startedAt.current)
    if (wait > 0) await new Promise((r) => setTimeout(r, wait)) // very fast submits are treated as bots server-side
    try {
      await sendLead({ kind, subject, values: form, fields, honey, elapsed: Date.now() - startedAt.current })
      rememberLead()
      setStatus('sent')
      onDone?.()
    } catch (err) {
      if (err.fields) { setServerErrors(err.fields); const f = Object.keys(err.fields)[0]; formEl?.querySelector(`[name="${f}"]`)?.focus() }
      setError(err.message || 'Something went wrong')
      setStatus('error')
    }
  }
  return { form, setForm, up, bind, fieldError, status, setStatus, error, honey, setHoney, submit }
}

/* Light client-side rate limit (the server enforces its own per-IP limit too) */
function recentLeads() {
  try { return JSON.parse(localStorage.getItem('lead-times') || '[]').filter((t) => Date.now() - t < 10 * 60 * 1000).length } catch (e) { return 0 }
}
function rememberLead() {
  try {
    const list = JSON.parse(localStorage.getItem('lead-times') || '[]').filter((t) => Date.now() - t < 10 * 60 * 1000)
    localStorage.setItem('lead-times', JSON.stringify([...list, Date.now()]))
  } catch (e) { /* storage blocked */ }
}

function FormError({ error }) {
  return (
    <p className="form-error" role="alert">
      Sorry — we couldn't send that. {error}. Please try again, or email us at <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>.
    </p>
  )
}

function RecaptchaNote() {
  if (!RECAPTCHA_SITE_KEY) return null
  return (
    <small className="fine recaptcha-note">
      Protected by reCAPTCHA — Google's <a href="https://policies.google.com/privacy" target="_blank" rel="noopener">Privacy Policy</a> and <a href="https://policies.google.com/terms" target="_blank" rel="noopener">Terms</a> apply.
    </small>
  )
}

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

const HERO_SLIDES = [
  { key: 'web', label: 'Web & apps', icon: 'code', chip: ['bolt', '98', 'Lighthouse score'], to: '/services/web-applications' },
  { key: 'mobile', label: 'Mobile apps', icon: 'mobile', chip: ['star', '4.8★', 'App store rating'], to: '/services/mobile-apps' },
  { key: 'marketing', label: 'Digital marketing', icon: 'target', chip: ['chart', '+212%', 'Pipeline growth'], to: '/services/seo' },
]

function HeroShowcase() {
  const [i, setI] = useState(0)
  const slide = HERO_SLIDES[i]
  const next = () => setI((n) => (n + 1) % HERO_SLIDES.length)
  return (
    <div className="showcase">
      <div className="showcase-stage card">
        <div className="showcase-glow" aria-hidden="true" />
        <LottiePlayer key={slide.key} name={slide.key} loop={false} onComplete={next} className="showcase-lottie" label={`${slide.label} animation`} />
        <Link to={slide.to} className="showcase-chip card" key={`chip-${slide.key}`}>
          <span className="f-ico"><Icon name={slide.chip[0]} size={18} /></span>
          <div><small>{slide.chip[2]}</small><b>{slide.chip[1]}</b></div>
        </Link>
      </div>
      <div className="showcase-tabs" role="tablist" aria-label="What we do">
        {HERO_SLIDES.map((sl, k) => (
          <button key={sl.key} role="tab" aria-selected={k === i} className={`sc-tab ${k === i ? 'on' : ''}`} onClick={() => setI(k)}>
            <Icon name={sl.icon} size={16} /><span>{sl.label}</span>
            <i className="sc-bar" aria-hidden="true" />
          </button>
        ))}
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
            <span className="eyebrow fade-in"><span className="pulse-dot" /> Software development &amp; digital marketing company</span>
            <h1 className="hero-title">
              <span className="line"><span>We build &amp; grow</span></span>
              <span className="sr-only"> web applications, mobile apps, AI products, online stores and qualified pipeline</span>
              <span className="line" aria-hidden="true"><RotatingWord words={HERO_WORDS} /></span>
            </h1>
            <p className="lead fade-in d2">
              Advotis Agency engineers websites, web apps, mobile apps and AI products — then grows them with SEO,
              paid media and data-driven marketing. One senior team from first commit to first customer.
            </p>
            <div className="hero-ctas fade-in d3">
              <Link to="/contact" className="btn btn-primary shine">Start your project <Icon name="arrow" size={18} /></Link>
              <Link to="/services" className="btn btn-ghost">Explore services</Link>
            </div>
            <div className="hero-proof fade-in d4">
              {STATS.filter((s) => s.label !== 'Ad spend managed ($)').map((s) => (
                <div key={s.label}><b><Counter value={s.value} suffix={s.suffix} /></b><small>{s.label}</small></div>
              ))}
            </div>
          </div>
          <div className="fade-in d2"><HeroShowcase /></div>
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

      <PartnersBand />

      <HomeServices />

      <IdeaToLaunch />

      <TechExpertise />

      <StatsBand />

      <CloudSection />

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
            {POSTS.slice(0, 3).map((p, i) => <Reveal key={p.slug} delay={i * 90}><PostCard post={p} /></Reveal>)}
          </div>
        </div>
      </section>

      <section className="section alt" id="faq">
        <div className="container faq-wrap">
          <div>
            <Reveal><span className="kicker">FAQ</span></Reveal>
            <SplitText text="Questions clients ask us most" />
            <Reveal delay={120}>
              <p className="body-text">Quick answers about how we build, launch and grow digital products. Have another question? Our team replies within one business day.</p>
              <Link to="/contact" className="btn btn-ghost mt-btn">Ask a question <Icon name="arrow" size={18} /></Link>
            </Reveal>
          </div>
          <Faq items={HOME_FAQS} />
        </div>
      </section>

      <CtaBand />
    </>
  )
}

function PartnersBand() {
  return (
    <section className="partners">
      <div className="partners-glow" aria-hidden="true" />
      <div className="container partners-inner">
        <div className="partners-copy">
          <Reveal><span className="kicker">Certified partners</span></Reveal>
          <Reveal delay={80}><h2>Proud <span className="grad-text">Google Premier Partner</span> — certified on the platforms you run on</h2></Reveal>
          <Reveal delay={160}><p>Our engineers and marketers hold active certifications with Google, AWS, Microsoft, Salesforce and HubSpot, so your stack is in expert hands.</p></Reveal>
        </div>
        <div className="partner-grid">
          {PARTNERS.map((p, i) => (
            <Reveal key={p.name} variant="zoom" delay={i * 70} className={`partner-tile ${p.featured ? 'featured' : ''}`}>
              <img src={p.img} alt={p.name} width={p.w} height={p.h} loading="lazy" />
              {p.featured && <span className="partner-tag"><Icon name="star" size={12} /> Premier</span>}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function HomeServices() {
  const [tab, setTab] = useState('development')
  const group = SERVICE_GROUPS.find((g) => g.key === tab)
  const list = SERVICES.filter((s) => s.group === tab)
  return (
    <section className="section" id="services">
      <div className="container">
        <div className="section-head row">
          <div>
            <Reveal><span className="kicker">What we do</span></Reveal>
            <SplitText text="One partner to build, launch and grow your digital products" />
          </div>
          <Reveal variant="left"><Link to="/services" className="btn btn-ghost">All services <Icon name="arrow" size={18} /></Link></Reveal>
        </div>
        <Reveal className="svc-tabs">
          <div role="tablist" aria-label="Service groups" className="svc-tabs-inner">
            {SERVICE_GROUPS.map((g) => (
              <button key={g.key} role="tab" aria-selected={tab === g.key} className={tab === g.key ? 'on' : ''} onClick={() => setTab(g.key)}>
                <Icon name={g.icon} size={18} />{g.label}<small>{SERVICES.filter((s) => s.group === g.key).length}</small>
              </button>
            ))}
          </div>
          <p className="svc-tab-desc" key={tab}>{group.desc}</p>
        </Reveal>
        <div className="grid-3 svc-tab-grid" key={tab}>
          {list.map((s, i) => <div key={s.slug} className="tab-in" style={{ animationDelay: `${i * 70}ms` }}><ServiceCard s={s} /></div>)}
        </div>
      </div>
    </section>
  )
}

const IDEA_STEPS = [
  { icon: 'spark', title: 'Understand your idea', text: 'We listen first. In a discovery session we unpack your idea, your users and your goals, then shape a clear scope and roadmap.', points: ['Discovery workshop', 'User & market research', 'Scope, timeline & budget'] },
  { icon: 'layout', title: 'Build the wireframe', text: 'We turn the idea into wireframes and a clickable prototype, so you can see, test and refine it before a line of code is written.', points: ['User flows', 'Wireframes', 'Clickable UI prototype'] },
  { icon: 'code', title: 'Build the software', text: 'Our engineers build your website, web app, mobile app or AI product — tested, secure and ready to scale.', points: ['Web, mobile & AI', 'Agile sprints & demos', 'QA, launch & hosting'] },
  { icon: 'target', title: 'Market your idea', text: 'Then we bring customers to it with SEO, paid ads, social and content — measured against real leads and revenue.', points: ['Go-to-market plan', 'SEO, ads & social', 'Analytics & growth'] },
]

function IdeaToLaunch() {
  const [ref, p] = useSectionProgress()
  const reached = Math.min(IDEA_STEPS.length, Math.floor(p * IDEA_STEPS.length * 1.6))
  return (
    <section className="section idea-sec" ref={ref}>
      <div className="orbs dim" aria-hidden="true"><span className="orb o1" /><span className="orb o2" /></div>
      <div className="container">
        <div className="section-head center">
          <Reveal><span className="kicker">From idea to growth</span></Reveal>
          <SplitText text="Have an idea? We'll build it and grow it" />
          <Reveal delay={150}><p>We understand your idea, design the wireframe, build the software and then market it — one team, one plan, from first sketch to first customers.</p></Reveal>
        </div>
        <div className="idea-track" style={{ '--prog': reached / IDEA_STEPS.length }}>
          <span className="idea-line" aria-hidden="true"><i /></span>
          <ol className="idea-steps">
            {IDEA_STEPS.map((st, i) => (
              <Reveal as="li" key={st.title} delay={i * 110} className={`idea-step ${i < reached ? 'lit' : ''}`}>
                <div className="idea-node"><Icon name={st.icon} size={24} /><span className="idea-num">{String(i + 1).padStart(2, '0')}</span></div>
                <div className="card idea-card">
                  <h3>{st.title}</h3>
                  <p>{st.text}</p>
                  <ul>{st.points.map((x) => <li key={x}><Icon name="check" size={14} />{x}</li>)}</ul>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
        <Reveal className="idea-cta">
          <p><b>Got an idea you want to build?</b> Tell us about it — we'll come back with a wireframe plan and estimate.</p>
          <Link to="/contact" className="btn btn-primary shine">Share your idea <Icon name="arrow" size={18} /></Link>
        </Reveal>
      </div>
    </section>
  )
}

const techLink = (t) => (t.to ? t.to : CMS_TECH.includes(t) ? '/services/web-development'
  : t.name === 'AI / ML' ? '/services/ai-development'
    : ['Flutter', 'Android', 'iOS'].includes(t.name) ? '/services/mobile-apps' : '/services/web-applications')

const TECH_MODES = [
  { key: 'cms', label: 'CMS & e‑commerce', icon: 'globe', list: CMS_TECH },
  { key: 'app', label: 'Web & mobile apps', icon: 'code', list: APP_TECH },
  { key: 'mkt', label: 'Digital marketing', icon: 'target', list: MARKETING_TECH },
]

function TechExpertise() {
  const [mode, setMode] = useState('cms')
  const [ref, inView] = useInView()
  const list = TECH_MODES.find((m) => m.key === mode).list
  return (
    <section className="section alt tech-sec">
      <div className="container tech-grid">
        <div>
          <Reveal><span className="kicker">Technology expertise</span></Reveal>
          <SplitText text="Experts in every CMS, app stack and marketing channel" />
          <Reveal delay={120}>
            <p className="body-text">We're more than a marketing agency — we're a full software development company. Our certified developers build on the platform that fits your business, and our certified marketers grow it on the channels where your buyers are.</p>
          </Reveal>
          <Reveal delay={180} className="tech-switch">
            <div role="tablist" aria-label="Technology type">
              {TECH_MODES.map((m) => (
                <button key={m.key} role="tab" aria-selected={mode === m.key} className={mode === m.key ? 'on' : ''} onClick={() => setMode(m.key)}>
                  <Icon name={m.icon} size={16} /><span>{m.label}</span>
                </button>
              ))}
              <span className={`tech-switch-thumb ${mode}`} aria-hidden="true" />
            </div>
          </Reveal>
          <div className="tech-list" key={mode}>
            {list.map((t, i) => (
              <Link key={t.name} to={techLink(t)} className="tech-item tab-in" style={{ '--tc': t.color, animationDelay: `${i * 60}ms` }}>
                <span className="tech-mono">{t.short}</span>
                <span><b>{t.name}</b><small>{t.desc}</small></span>
                <Icon name="arrow" size={16} />
              </Link>
            ))}
          </div>
        </div>
        <div className="orbit-wrap" ref={ref} aria-hidden="true">
          <div className={`tech-orbit ${inView ? 'in' : ''} focus-${mode}`}>
            <span className="orbit-pulse" />
            <div className="ring r1">
              {CMS_TECH.map((t, k) => <span key={t.name} className="sat" style={{ '--a': `${k * 60}deg` }}><span className="sat-in"><TechTile t={t} size="sm" /></span></span>)}
            </div>
            <div className="ring r2">
              {APP_TECH.map((t, k) => <span key={t.name} className="sat" style={{ '--a': `${k * 60 + 30}deg` }}><span className="sat-in"><TechTile t={t} size="sm" /></span></span>)}
            </div>
            <div className="ring r3">
              {MARKETING_TECH.map((t, k) => <span key={t.name} className="sat" style={{ '--a': `${k * 60 + 15}deg` }}><span className="sat-in"><TechTile t={t} size="sm" /></span></span>)}
            </div>
            <div className="hub">
              <span className="logo-mark logo-mark-img"><img src={LOGO_MARK} alt="" width="44" height="44" /></span>
              <b>Build &amp; grow</b>
              <small>18+ platforms</small>
            </div>
          </div>
        </div>
      </div>
      <div className="tech-marquee" aria-hidden="true">
        {[[...CMS_TECH, ...HOSTING], [...APP_TECH, ...MARKETING_TECH]].map((row, r) => (
          <div key={r} className={`tm-row ${r ? 'rev' : ''}`}>
            <div className="tm-track">
              {[...row, ...row].map((t, k) => <TechTile key={k} t={t} />)}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

function ServerVisual() {
  return (
    <div className="server-vis card" aria-hidden="true">
      <div className="srv-head"><span><i className="live" />All systems operational</span><b>99.99% uptime</b></div>
      <div className="rack">
        {[['web-01', 'CPU', 34], ['app-02', 'RAM', 52], ['db-01', 'I/O', 27]].map(([n, m, v], k) => (
          <div className="unit" key={n}>
            <span className="leds"><i /><i /><i /></span>
            <span className="uname">{n}</span>
            <span className="ubar"><span style={{ '--w': `${v}%`, animationDelay: `${0.3 + k * 0.2}s` }} /></span>
            <span className="uval">{m} {v}%</span>
          </div>
        ))}
      </div>
      <div className="uptime-label"><small>Last 30 days</small><small>Response · 182 ms</small></div>
      <div className="uptime">
        {Array.from({ length: 30 }).map((_, k) => <i key={k} className={k === 18 ? 'warn' : ''} style={{ animationDelay: `${k * 35}ms` }} />)}
      </div>
      <svg className="srv-spark" viewBox="0 0 300 60" preserveAspectRatio="none">
        <path className="draw" pathLength="1" d="M0 40 L20 36 L40 42 L60 30 L80 34 L100 22 L120 28 L140 18 L160 26 L180 20 L200 30 L220 16 L240 24 L260 14 L280 20 L300 12" fill="none" stroke="url(#srvg)" strokeWidth="2.5" />
        <defs><linearGradient id="srvg" x1="0" x2="1"><stop offset="0" stopColor="var(--primary)" /><stop offset="1" stopColor="var(--cyan)" /></linearGradient></defs>
      </svg>
      <div className="srv-chip c1 card"><Icon name="shield" size={16} /> SSL A+ · Firewall on</div>
      <div className="srv-chip c2 card"><Icon name="cloud" size={16} /> Auto-backup · 03:00</div>
    </div>
  )
}

function CloudSection() {
  return (
    <section className="section cloud-sec">
      <div className="container cloud-grid">
        <Reveal variant="right" className="cloud-vis-wrap"><ServerVisual /></Reveal>
        <div>
          <Reveal><span className="kicker">Cloud &amp; server management</span></Reveal>
          <SplitText text="An expert server team that keeps you fast, secure and online" />
          <Reveal delay={120}><p className="body-text">From a single WordPress site to auto-scaling applications, our certified engineers set up, migrate and manage servers on the hosting platform that fits your traffic and budget.</p></Reveal>
          <div className="host-list">
            {HOSTING.map((h, i) => (
              <Reveal key={h.name} variant="left" delay={i * 70}>
                <Link to="/services/cloud-hosting" className="host card" style={{ '--tc': h.color }}>
                  <span className="tech-mono">{h.short}</span>
                  <span className="host-txt"><b>{h.name}</b><small>{h.desc}</small></span>
                  <span className="host-status"><i />Managed</span>
                </Link>
              </Reveal>
            ))}
          </div>
          <Reveal className="cloud-feats">
            {['24/7 monitoring', 'Zero-downtime migrations', 'Daily backups', 'SSL & firewalls', 'CDN & caching'].map((f) => (
              <span key={f}><Icon name="check" size={14} />{f}</span>
            ))}
          </Reveal>
          <Reveal><Link to="/services/cloud-hosting" className="btn btn-primary">Explore cloud services <Icon name="arrow" size={18} /></Link></Reveal>
        </div>
      </div>
    </section>
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
      <PageHero kicker="Services" crumbs={[['Services']]} aside={<HeroShowcase />}
        title="Software development and digital marketing — under one roof"
        text="Build websites, web apps and mobile apps, host them on expertly managed servers, and grow them with full-funnel marketing. Every engagement is led by senior specialists.">
        <div className="hero-ctas">
          {SERVICE_GROUPS.map((g) => <a key={g.key} href={`#${g.key}`} className="btn btn-ghost sm"><Icon name={g.icon} size={16} />{g.label}</a>)}
        </div>
      </PageHero>
      {SERVICE_GROUPS.map((g, gi) => (
        <section key={g.key} className={`section ${gi % 2 ? 'alt' : ''}`} id={g.key}>
          <div className="container">
            <div className="section-head">
              <Reveal><span className="kicker"><Icon name={g.icon} size={16} /> {g.label}</span></Reveal>
              <SplitText text={g.desc} />
            </div>
            <div className="grid-3">
              {SERVICES.filter((s) => s.group === g.key).map((s, i) => <Reveal key={s.slug} delay={(i % 3) * 90}><ServiceCard s={s} /></Reveal>)}
            </div>
          </div>
        </section>
      ))}
      <section className="section alt">
        <div className="container">
          <div className="section-head center">
            <Reveal><span className="kicker">Better together</span></Reveal>
            <SplitText text="One team, from code to customers" />
            <Reveal delay={150}><p>When the people who build your product also market it, launches are faster and every channel makes the others stronger.</p></Reveal>
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
const SERVICE_LOTTIE = { 'web-development': 'web', 'web-applications': 'web', 'ecommerce-development': 'web', 'mobile-apps': 'mobile' }

function ServiceVisual({ slug }) {
  if (SERVICE_LOTTIE[slug]) return <div className="sv card sv-lottie"><LottiePlayer name={SERVICE_LOTTIE[slug]} label="Service animation" /></div>
  if (slug === 'cloud-hosting' || slug === 'devops-maintenance') return <ServerVisual />
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
  'web-development': ['Web Development'], 'web-applications': ['Web Development', 'AI'], 'mobile-apps': ['Mobile Apps'],
  'ai-development': ['AI'], 'ecommerce-development': ['E-commerce'], seo: ['SEO'], 'paid-media': ['Paid Media'],
  'content-social': ['Content', 'Demand Gen'], 'web-experience': ['CRO', 'Web Development'], 'analytics-cro': ['Analytics', 'CRO'],
  'ai-automation': ['AI'], 'cloud-hosting': ['Cloud & DevOps'], 'devops-maintenance': ['Cloud & DevOps'],
}
const postsForService = (slug, n = 3) => {
  const cats = SERVICE_POST_CATS[slug] || []
  const direct = POSTS.filter((p) => p.service === slug)
  const near = POSTS.filter((p) => !direct.includes(p) && cats.includes(p.category))
  const rest = POSTS.filter((p) => !direct.includes(p) && !near.includes(p))
  return [...direct, ...near, ...rest].slice(0, n)
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
  const posts = postsForService(s.slug)

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
          <div className="grid-3">{posts.map((p, i) => <Reveal key={p.slug} delay={i * 90}><PostCard post={p} /></Reveal>)}</div>
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
        text="Advotis Agency was founded on a simple idea: marketing works best when every channel is planned, built and measured as one connected system." />
      <section className="section">
        <div className="container split">
          <Reveal>
            <span className="kicker">Our story</span>
            <h2>Senior specialists, one connected system</h2>
            <p className="body-text">Too many companies juggle separate vendors for SEO, ads, web and analytics — each reporting their own version of success. We built Advotis Agency to fix that.</p>
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
          <div className={COMPANY.offices.length === 1 ? 'office-single' : 'grid-3'}>
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
const slugify = (t) => t.toLowerCase().replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

export function Blog() {
  useTitle('Blog')
  const cats = ['All', ...new Set(POSTS.map((p) => p.category))]
  const [cat, setCat] = useState('All')
  const [q, setQ] = useState('')
  const featured = POSTS[0]
  const list = useMemo(() => POSTS.filter((p) =>
    p !== featured && (cat === 'All' || p.category === cat) &&
    (p.title + p.excerpt + p.keywords.join(' ')).toLowerCase().includes(q.toLowerCase())), [cat, q, featured])
  return (
    <>
      <PageHero kicker="Blog" crumbs={[['Blog']]}
        title="Insights on software, AI search and growth marketing"
        text="Practical, up-to-date playbooks on AEO and GEO, SEO, AI agents, web and app development, paid media, analytics and cloud — written by the people doing the work." />
      <section className="section tight-top">
        <div className="container">
          <Link to={`/blog/${featured.slug}`} className="card featured-post">
            <div className="post-img photo big">
              <img src={featured.image} alt={featured.imageAlt} width="1200" height="630" fetchpriority="high" decoding="async" />
            </div>
            <div className="post-body">
              <span className="tag">Latest · {featured.category}</span>
              <h2>{featured.title}</h2>
              <p>{featured.excerpt}</p>
              <small className="meta"><time dateTime={featured.date}>{featured.dateLabel}</time> · {featured.read}</small>
            </div>
          </Link>

          <div className="filter-bar">
            <div className="filters" role="toolbar" aria-label="Filter by category">
              {cats.map((c) => (
                <button key={c} className={`filter ${cat === c ? 'on' : ''}`} aria-pressed={cat === c} onClick={() => setCat(c)}>{c}</button>
              ))}
            </div>
            <label className="search">
              <Icon name="search" size={18} />
              <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search articles" aria-label="Search articles" />
            </label>
          </div>

          {list.length ? (
            <div className="grid-3">
              {list.map((p) => <PostCard key={p.slug} post={p} />)}
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

function Block({ b }) {
  const [type, v] = b
  switch (type) {
    case 'h': return <h2 id={slugify(v)}>{v}</h2>
    case 'h3': return <h3>{v}</h3>
    case 'q': return <blockquote>{v}</blockquote>
    case 'tip': return <aside className="tip"><span className="tip-ico"><Icon name="bolt" size={18} /></span><p><b>Pro tip: </b><RichText text={v} /></p></aside>
    case 'ul': return <ul className="art-list">{v.map((x, i) => <li key={i}><RichText text={x} /></li>)}</ul>
    case 'ol': return <ol className="art-list num">{v.map((x, i) => <li key={i}><RichText text={x} /></li>)}</ol>
    case 'table': return (
      <div className="table-wrap">
        <table>
          <thead><tr>{v.head.map((h) => <th key={h} scope="col">{h}</th>)}</tr></thead>
          <tbody>{v.rows.map((r, i) => <tr key={i}>{r.map((c, k) => (k === 0 ? <th key={k} scope="row"><RichText text={c} /></th> : <td key={k}><RichText text={c} /></td>))}</tr>)}</tbody>
        </table>
      </div>
    )
    default: return <p><RichText text={v} /></p>
  }
}

export function BlogPost() {
  const { slug } = useParams()
  const meta = POSTS.find((p) => p.slug === slug)
  const [, rerender] = useState(0)
  const content = meta && getPostContent(meta.slug)
  useEffect(() => {
    if (meta && !content) loadPostContent(meta.slug).then(() => rerender((n) => n + 1))
  }, [meta, content])
  if (!meta) return <NotFound />
  const post = { ...meta, ...(content || { body: [], takeaways: [], faqs: [], sources: [] }) }
  const same = POSTS.filter((p) => p.slug !== slug && p.category === post.category)
  const related = [...same, ...POSTS.filter((p) => p.slug !== slug && !same.includes(p))].slice(0, 3)
  const service = SERVICES.find((s) => s.slug === post.service)
  const book = EBOOKS[POSTS.indexOf(meta) % EBOOKS.length]
  const url = `${SITE_URL}/blog/${post.slug}`
  const toc = post.body.filter(([t]) => t === 'h').map(([, v]) => v)
  return (
    <>
      <PageHero kicker={post.category} crumbs={[['Blog', '/blog'], [post.title]]} title={post.title}>
        <p className="meta light-meta">
          By {post.author} · <time dateTime={post.date}>{post.dateLabel}</time>
          {post.updated !== post.date && <> · Updated <time dateTime={post.updated}>{post.updated}</time></>} · {post.read}
        </p>
      </PageHero>
      <section className="section tight-top">
        <div className="container article-wrap">
          <article className="article">
            <figure className="art-figure">
              <img src={post.image} alt={post.imageAlt} width="1200" height="630" fetchpriority="high" decoding="async" />
            </figure>
            {!content && <p className="empty">Loading article…</p>}
            <div className="quick-answer">
              <span className="qa-label"><Icon name="spark" size={16} /> Quick answer</span>
              <p>{post.summary}</p>
            </div>
            {content && <div className="takeaways">
              <h2 className="no-top">Key takeaways</h2>
              <ul>{post.takeaways.map((t) => <li key={t}><Icon name="check" size={16} />{t}</li>)}</ul>
            </div>}
            {post.body.map((b, i) => <Block key={i} b={b} />)}
            {post.faqs.length > 0 && <>
              <h2 id="faq">Frequently asked questions</h2>
              <Faq items={post.faqs} key={post.slug} />
            </>}
            {post.sources?.length > 0 && (
              <div className="sources">
                <h2 id="sources">Sources</h2>
                <ol>{post.sources.map(([label, href]) => <li key={href}><a href={href} target="_blank" rel="noopener">{label}</a></li>)}</ol>
              </div>
            )}
            <div className="author-box card">
              <span className="logo-mark logo-mark-img"><img src={LOGO_MARK} alt="" width="44" height="44" /></span>
              <div>
                <b>{post.author}</b>
                <p>Written and reviewed by the {post.author.replace(/^Advotis /, '')} at {COMPANY.name} — specialists who build and grow websites, apps and AI products for clients every day. <Link to="/about">About us</Link></p>
              </div>
            </div>
            <div className="share">
              <span>Share:</span>
              <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`} target="_blank" rel="noopener">LinkedIn</a>
              <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(post.title)}`} target="_blank" rel="noopener">X</a>
              <a href={`https://wa.me/?text=${encodeURIComponent(`${post.title} ${url}`)}`} target="_blank" rel="noopener">WhatsApp</a>
              <a href={`mailto:?subject=${encodeURIComponent(post.title)}&body=${encodeURIComponent(url)}`}>Email</a>
            </div>
            <Link to="/blog" className="back-link"><Icon name="back" size={18} /> Back to blog</Link>
          </article>
          <aside className="sidebar">
            <nav className="card side-card toc" aria-label="On this page">
              <h3>On this page</h3>
              {toc.map((h) => <a key={h} href={`#${slugify(h)}`}>{h}</a>)}
              <a href="#faq">Frequently asked questions</a>
            </nav>
            {service && (
              <div className="card side-card">
                <span className="icon-box sm"><Icon name={service.icon} size={18} /></span>
                <h3>{service.title}</h3>
                <p>{service.short}</p>
                <Link to={`/services/${service.slug}`} className="btn btn-primary full">Explore the service</Link>
              </div>
            )}
            <div className="card side-card">
              <EbookCover book={book} small />
              <h3>{book.title}</h3>
              <p>{book.subtitle}</p>
              <Link to={`/ebooks/${book.slug}`} className="btn btn-ghost full">Get the free ebook</Link>
            </div>
          </aside>
        </div>
      </section>
      <section className="section alt">
        <div className="container">
          <Reveal className="section-head"><span className="kicker">Keep reading</span><h2>Related articles</h2></Reveal>
          <div className="grid-3">{related.map((p) => <PostCard key={p.slug} post={p} />)}</div>
        </div>
      </section>
      <CtaBand title={service ? `Need help with ${service.title.split(' &')[0].toLowerCase()}?` : 'Need a hand?'} text="Talk to a senior specialist — we reply within one business day with a clear plan." />
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
  const { form, bind, fieldError, status, error, honey, setHoney, submit: send } = useLeadForm('ebook', { name: '', email: '', company: '' })
  useTitle(b?.title)
  if (!b) return <NotFound />
  const submit = (e) => {
    send(e, `Ebook download – ${form.name.trim()} (${b.title})`, {
      'Lead type': 'Ebook download', Ebook: b.title, Name: form.name, Email: form.email, Company: form.company || '—',
    }, () => {
      try { sessionStorage.setItem('ebook-access', '1') } catch (err) { /* ignore */ }
      navigate(`/ebooks/${b.slug}/read`)
    })
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
              <li><span className="check"><Icon name="check" size={16} /></span>Written by senior Advotis specialists</li>
            </ul>
            <form className="card form" onSubmit={submit} noValidate>
              <h3><Icon name="lock" size={18} /> Get instant access</h3>
              <label><span>Full name <Req /></span><input required autoComplete="name" maxLength={80} {...bind('name')} placeholder="Jane Doe" />{fieldError('name')}</label>
              <label><span>Work email <Req /></span><input required type="email" autoComplete="email" maxLength={120} {...bind('email')} placeholder="jane@company.com" />{fieldError('email')}</label>
              <label>Company<input autoComplete="organization" maxLength={120} {...bind('company')} placeholder="Company Inc." />{fieldError('company')}</label>
              <Honeypot value={honey} onChange={(e) => setHoney(e.target.value)} />
              {status === 'error' && <FormError error={error} />}
              <button className="btn btn-primary full" type="submit" disabled={status === 'sending'}>{status === 'sending' ? 'Unlocking…' : <>Read the ebook <Icon name="arrow" size={18} /></>}</button>
              <small className="fine">By continuing you agree to our <Link to="/privacy">privacy policy</Link>.</small>
              <RecaptchaNote />
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
const ROLES = JOBS.filter((j) => !j.freelance)
const FREELANCE = JOBS.find((j) => j.freelance)

function JobCard({ j }) {
  return (
    <Link to={`/careers/${j.slug}`} className="card job spot" onMouseMove={spotlight}>
      <span className="icon-box job-ico"><Icon name={j.icon} /></span>
      <div className="job-main">
        <h3>{j.title}</h3>
        <p>{j.summary}</p>
        <small><span className="tag soft">{j.team}</span><span><Icon name="pin" size={14} /> {j.location}</span><span><Icon name="clock" size={14} /> {j.type}</span></small>
      </div>
      <span className="btn btn-ghost sm">View &amp; apply <Icon name="arrow" size={16} /></span>
    </Link>
  )
}

function FreelanceBand() {
  return (
    <div className="freelance-band">
      <div className="fb-copy">
        <span className="tag fb-tag"><Icon name="globe" size={14} /> Remote · Flexible hours</span>
        <h3>Prefer to freelance? Join our freelance network.</h3>
        <p>{FREELANCE.summary}</p>
        <div className="chips left">{FREELANCE.skills.map((x) => <span key={x} className="chip sm">{x}</span>)}</div>
      </div>
      <Link to={`/careers/${FREELANCE.slug}`} className="btn btn-white">Join as a freelancer <Icon name="arrow" size={18} /></Link>
    </div>
  )
}

export function Careers() {
  useTitle('Careers')
  return (
    <>
      <PageHero kicker="Careers" crumbs={[['Careers']]}
        title="Do the best work of your career"
        text="Join a team of curious builders and marketers who turn ideas into software — and software into growth. Start as an intern, or work with us as a freelancer.">
        <div className="hero-ctas">
          <a href="#openings" className="btn btn-primary">See open roles <Icon name="arrow" size={18} /></a>
          <Link to={`/careers/${FREELANCE.slug}`} className="btn btn-ghost">Join as a freelancer</Link>
        </div>
      </PageHero>
      <section className="section tight-top">
        <div className="container">
          <div className="grid-4">
            {[
              ['clock', 'Flexible work', 'Remote-friendly with offices across three countries.'],
              ['spark', 'Learn by doing', 'Work on live client projects from week one, with senior mentors.'],
              ['users', 'Great people', 'Work alongside specialists who share what they know.'],
              ['chart', 'Real impact', 'Own outcomes for clients — not just tasks.'],
            ].map(([ic, t, d]) => (
              <div key={t} className="card value"><span className="icon-box"><Icon name={ic} /></span><h3>{t}</h3><p>{d}</p></div>
            ))}
          </div>
        </div>
      </section>
      <section className="section alt" id="openings">
        <div className="container">
          <div className="section-head row">
            <Reveal><span className="kicker">Open roles</span><h2>Current openings</h2></Reveal>
            <Reveal variant="left"><span className="openings-count"><b>{ROLES.length}</b> internships · <b>1</b> freelance</span></Reveal>
          </div>
          <div className="jobs">
            {ROLES.map((j, i) => <Reveal key={j.slug} delay={i * 80}><JobCard j={j} /></Reveal>)}
          </div>
          <Reveal><FreelanceBand /></Reveal>
        </div>
      </section>
      <section className="section">
        <div className="container careers-social">
          <div>
            <h3>Follow life at {COMPANY.name}</h3>
            <p>New openings, team stories and behind-the-scenes posts.</p>
          </div>
          <Socials labels />
        </div>
      </section>
    </>
  )
}

export function JobDetail() {
  const { slug } = useParams()
  const j = JOBS.find((x) => x.slug === slug)
  useTitle(j ? j.title : 'Job not found')
  const navigate = useNavigate()
  const { form, bind, fieldError, status, error, honey, setHoney, submit: send } = useLeadForm('job', { name: '', email: '', phone: '', link: '', cv: '', extra: '', message: '' })
  if (!j) return <NotFound />
  const submit = (e) => {
    send(e, `${j.freelance ? 'Freelancer application' : 'Job application'} – ${form.name.trim()} (${j.title})`, {
      'Lead type': j.freelance ? 'Freelancer application' : 'Job application',
      Role: j.title, Name: form.name, Email: form.email, Phone: form.phone || '—',
      'LinkedIn / portfolio': form.link || '—', 'CV / resume link': form.cv || '—',
      [j.freelance ? 'Skills & rate' : 'College & availability']: form.extra || '—',
      Message: form.message || '—',
    }, () => navigate('/thank-you', { state: { type: j.freelance ? 'freelancer' : 'application', name: form.name, role: j.title } }))
  }
  const others = JOBS.filter((x) => x.slug !== j.slug)
  return (
    <>
      <PageHero kicker={j.freelance ? 'Freelance network' : `${j.team} · ${j.type}`} crumbs={[['Careers', '/careers'], [j.short]]}
        title={j.title} text={j.summary}>
        <div className="job-meta">
          <span><Icon name="briefcase" size={16} /> {j.type}</span>
          <span><Icon name="pin" size={16} /> {j.location}</span>
          <span><Icon name="users" size={16} /> {j.team}</span>
        </div>
      </PageHero>
      <section className="section tight-top">
        <div className="container job-grid">
          <article className="job-body">
            <h2>{j.freelance ? 'About the freelance network' : 'About the role'}</h2>
            <p>{j.about}</p>
            <h2>{j.freelance ? 'What you will do' : "What you'll do"}</h2>
            <ul className="check-list">{j.responsibilities.map((x) => <li key={x}><Icon name="check" size={16} />{x}</li>)}</ul>
            <h2>{j.freelance ? 'Who we are looking for' : "What we're looking for"}</h2>
            <ul className="check-list">{j.requirements.map((x) => <li key={x}><Icon name="check" size={16} />{x}</li>)}</ul>
            <h2>{j.freelance ? 'Why freelance with us' : "What you'll gain"}</h2>
            <div className="gain-grid">{j.gains.map((x) => <div key={x} className="card gain"><Icon name="star" size={16} />{x}</div>)}</div>
            <h2>Skills</h2>
            <div className="chips left">{j.skills.map((x) => <span key={x} className="chip sm">{x}</span>)}</div>
            {!j.freelance && (
              <div className="job-alt card">
                <span className="icon-box sm"><Icon name="globe" size={18} /></span>
                <div><b>Not looking for an internship?</b><p>You can also work with us remotely as a freelancer.</p></div>
                <Link to={`/careers/${FREELANCE.slug}`} className="btn btn-ghost sm">Join as a freelancer <Icon name="arrow" size={16} /></Link>
              </div>
            )}
          </article>
          <aside className="job-apply">
            <form className="card form" onSubmit={submit} noValidate>
              {(
                <>
                  <h3>{j.freelance ? 'Join the network' : 'Apply for this role'}</h3>
                  <p className="form-sub">Takes 2 minutes. We reply within a week.</p>
                  <label><span>Full name <Req /></span><input required autoComplete="name" maxLength={80} {...bind('name')} placeholder="Your name" />{fieldError('name')}</label>
                  <label><span>Email <Req /></span><input required type="email" autoComplete="email" maxLength={120} {...bind('email')} placeholder="you@email.com" />{fieldError('email')}</label>
                  <label>Phone<input type="tel" autoComplete="tel" maxLength={20} {...bind('phone')} placeholder="+91 98765 43210" />{fieldError('phone')}</label>
                  <label>LinkedIn / portfolio / GitHub<input type="url" maxLength={300} {...bind('link')} placeholder="https://" />{fieldError('link')}</label>
                  <label>CV / resume link (Google Drive, Dropbox…)<input type="url" maxLength={300} {...bind('cv')} placeholder="https://drive.google.com/…" />{fieldError('cv')}</label>
                  <small className="fine hint">Add at least one: a CV link or a LinkedIn / portfolio link.</small>
                  <label>{j.freelance ? 'Your skills & hourly rate' : 'College & availability'}<input maxLength={200} {...bind('extra')} placeholder={j.freelance ? 'E.g. React developer, $25/hr' : 'E.g. Final year, available from June'} />{fieldError('extra')}</label>
                  <label>{j.freelance ? 'Tell us about your experience' : 'Why do you want this role?'}<textarea rows="4" maxLength={3000} {...bind('message')} />{fieldError('message')}</label>
                  <Honeypot value={honey} onChange={(e) => setHoney(e.target.value)} />
                  {status === 'error' && <FormError error={error} />}
                  <button className="btn btn-primary full" type="submit" disabled={status === 'sending'}>{status === 'sending' ? 'Sending…' : <>{j.freelance ? 'Join as a freelancer' : 'Submit application'} <Icon name="arrow" size={18} /></>}</button>
                  <RecaptchaNote />
                </>
              )}
            </form>
          </aside>
        </div>
      </section>
      <section className="section alt">
        <div className="container">
          <Reveal className="section-head"><span className="kicker">Careers</span><h2>Other openings</h2></Reveal>
          <div className="jobs">{others.map((x) => <JobCard key={x.slug} j={x} />)}</div>
        </div>
      </section>
    </>
  )
}

/* =================== CONTACT =================== */
export function Contact() {
  useTitle('Contact')
  const navigate = useNavigate()
  const { form, bind, fieldError, status, error, honey, setHoney, submit: send } = useLeadForm('contact', { name: '', email: '', phone: '', company: '', service: SERVICES[0].title, budget: '', message: '' })
  const submit = (e) => {
    send(e, `Contact enquiry – ${form.name.trim()} (${form.service})`, {
      'Lead type': 'Contact enquiry', Name: form.name, Email: form.email, Phone: form.phone || '—', Company: form.company || '—',
      Service: form.service, Budget: form.budget || '—', Message: form.message || '—',
    }, () => navigate('/thank-you', { state: { type: 'contact', name: form.name } }))
  }
  return (
    <>
      <PageHero kicker="Contact" crumbs={[['Contact']]}
        title="Let's partner together"
        text="Tell us where you want to be in 12 months. We'll come back within one business day with next steps." />
      <section className="section tight-top">
        <div className="container contact-grid">
          <form className="card form big" onSubmit={submit} noValidate>
            {(
              <>
                <div className="field-row">
                  <label><span>Name <Req /></span><input required autoComplete="name" maxLength={80} {...bind('name')} placeholder="Jane Doe" />{fieldError('name')}</label>
                  <label><span>Work email <Req /></span><input required type="email" autoComplete="email" maxLength={120} {...bind('email')} placeholder="jane@company.com" />{fieldError('email')}</label>
                </div>
                <div className="field-row">
                  <label>Phone / WhatsApp<input type="tel" autoComplete="tel" maxLength={20} {...bind('phone')} placeholder="+91 98765 43210" />{fieldError('phone')}</label>
                  <label>Company<input autoComplete="organization" maxLength={120} {...bind('company')} placeholder="Company Inc." />{fieldError('company')}</label>
                </div>
                <div className="field-row">
                  <label>Monthly budget
                    <select {...bind('budget')}>
                      <option value="">Select a range</option>
                      <option>Under $5k</option><option>$5k – $15k</option><option>$15k – $50k</option><option>$50k+</option>
                    </select>
                  </label>
                  <label>Interested in
                  <select {...bind('service')}>
                    {SERVICES.map((s) => <option key={s.slug}>{s.title}</option>)}
                    <option>My idea — wireframe, build &amp; marketing</option>
                    <option>Full-funnel partnership</option>
                  </select>
                  </label>
                </div>
                <label><span>What are your goals? <Req /></span><textarea required rows="5" maxLength={3000} {...bind('message')} placeholder="E.g. double inbound demo requests in the next two quarters" />{fieldError('message')}</label>
                <Honeypot value={honey} onChange={(e) => setHoney(e.target.value)} />
                {status === 'error' && <FormError error={error} />}
                <button className="btn btn-primary full" type="submit" disabled={status === 'sending'}>{status === 'sending' ? 'Sending…' : <>Send message <Icon name="arrow" size={18} /></>}</button>
                <small className="fine">We reply within one business day. Your details are only used to respond to your enquiry — see our <Link to="/privacy">privacy policy</Link>.</small>
                <RecaptchaNote />
              </>
            )}
          </form>
          <div className="contact-side">
            <div className="card contact-item"><span className="icon-box sm"><Icon name="mail" size={18} /></span><div><small>Email</small><a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a></div></div>
            {COMPANY.offices.map((o) => (
              <div key={o.city} className="card contact-item"><span className="icon-box sm"><Icon name="pin" size={18} /></span><div><small>{o.city}, {o.country}</small><span>{o.address}</span></div></div>
            ))}
            <div className="card contact-item"><div><small>Follow us</small><Socials labels /></div></div>
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
            <p>Information you submit through forms on this website is delivered to our team by email through a third-party form processing service (FormSubmit). We do not sell your personal information.</p>
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

function Req() {
  return <span className="req" aria-hidden="true">*</span>
}

/* =================== THANK YOU (shown only after a lead is delivered) =================== */
const THANKS = {
  contact: { kicker: 'Message received', text: "Your message is with our team. We'll reply within one business day with next steps." },
  application: { kicker: 'Application received', text: 'Our team reviews every application and will get back to you within a week.' },
  freelancer: { kicker: 'Welcome to the network', text: "We've received your details and will reach out when a project matches your skills." },
}
export function ThankYou() {
  useTitle('Thank you')
  const navigate = useNavigate()
  const { state } = useLocation()
  const [info, setInfo] = useState(null)
  useEffect(() => {
    // Reached only via a successful form submit; a direct visit goes back to the contact page.
    if (!state?.type) { navigate('/contact', { replace: true }); return }
    setInfo(state)
    try { (window.dataLayer = window.dataLayer || []).push({ event: 'generate_lead', lead_type: state.type }) } catch (e) { /* ignore */ }
  }, [state, navigate])
  const t = THANKS[info?.type] || THANKS.contact
  const first = info?.name ? info.name.trim().split(/\s+/)[0] : ''
  return (
    <PageHero kicker={t.kicker} title={first ? `Thank you, ${first}!` : 'Thank you!'}
      text={info?.role ? `Your application for ${info.role} has been received. ${t.text}` : t.text}>
      <div className="hero-ctas">
        <Link to="/" className="btn btn-primary">Back to home</Link>
        {info?.type === 'contact' ? <Link to="/work" className="btn btn-ghost">See our work</Link> : <Link to="/careers" className="btn btn-ghost">More openings</Link>}
      </div>
    </PageHero>
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
