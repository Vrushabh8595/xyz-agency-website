import { useEffect, useRef, useState } from 'react'

/* ---------------- Content ---------------- */

const NAV = [
  { label: 'Services', href: '#services' },
  { label: 'Work', href: '#work' },
  { label: 'Approach', href: '#approach' },
  { label: 'Industries', href: '#industries' },
  { label: 'Insights', href: '#insights' },
]

const CLIENTS = ['NORTHWIND', 'Lumina', 'BRIGHTPATH', 'Vertex Labs', 'Orbitly', 'HELIX', 'Cobalt & Co', 'Summit Health']

const SERVICES = [
  {
    icon: 'search',
    title: 'SEO & Organic Growth',
    text: 'Technical SEO, content strategy and authority building that turn search into a predictable pipeline channel.',
    points: ['Technical audits', 'Content clusters', 'Local & GEO/AI search'],
  },
  {
    icon: 'target',
    title: 'Paid Media & Performance',
    text: 'Google, Meta and LinkedIn campaigns engineered around cost per qualified lead, not vanity clicks.',
    points: ['Search & shopping', 'Paid social', 'ABM programs'],
  },
  {
    icon: 'pen',
    title: 'Content & Social',
    text: 'Thought leadership, video and social programs that build trust with buyers long before they talk to sales.',
    points: ['Editorial calendars', 'Short-form video', 'Community management'],
  },
  {
    icon: 'layout',
    title: 'Web Experience & Tech',
    text: 'Fast, conversion-focused websites and landing pages on WordPress, Webflow, HubSpot and headless stacks.',
    points: ['UX / UI design', 'Development', 'Landing page systems'],
  },
  {
    icon: 'chart',
    title: 'Analytics & CRO',
    text: 'Clean tracking, revenue attribution and experimentation so every dollar can be traced to an outcome.',
    points: ['GA4 & GTM setup', 'Dashboards', 'A/B testing'],
  },
  {
    icon: 'spark',
    title: 'AI & Marketing Automation',
    text: 'AI agents, lead scoring and lifecycle automation that let a lean team operate like a large one.',
    points: ['CRM automation', 'AI content ops', 'Lead scoring'],
  },
]

const WORK = [
  { tag: 'B2B SaaS', metric: '3.2x', label: 'pipeline from organic search in 9 months', color: '#ff5a1f' },
  { tag: 'Healthcare', metric: '600+', label: 'qualified patient leads per quarter', color: '#6366f1' },
  { tag: 'E-commerce', metric: '−41%', label: 'cost per acquisition on paid social', color: '#0ea5e9' },
  { tag: 'Professional Services', metric: '+38%', label: 'website conversion rate after redesign', color: '#10b981' },
]

const STEPS = [
  { when: 'Weeks 1–2', title: 'Diagnose', text: 'Audit channels, tracking and funnel. Agree on the few metrics that matter.' },
  { when: 'Weeks 3–6', title: 'Design', text: 'Build the channel plan, messaging, creative and measurement framework.' },
  { when: 'Month 2–3', title: 'Deploy', text: 'Launch campaigns and content with a senior pod embedded in your team.' },
  { when: 'Month 4+', title: 'Compound', text: 'Optimize weekly, scale what works, and let results stack month over month.' },
]

const INDUSTRIES = ['B2B SaaS', 'Healthcare', 'Legal', 'Financial Services', 'E-commerce', 'IT & Technology', 'Education', 'Real Estate']

const INSIGHTS = [
  { cat: 'Demand Gen', title: 'The B2B demand generation playbook for 2027', read: '8 min read' },
  { cat: 'SEO', title: 'SEO agency vs. in-house team: how to decide', read: '6 min read' },
  { cat: 'Analytics', title: 'Attribution that your CFO will actually trust', read: '7 min read' },
  { cat: 'AI', title: 'Where AI fits in a modern marketing operation', read: '5 min read' },
]

const STATS = [
  { value: 250, suffix: '+', label: 'Campaigns launched' },
  { value: 12, suffix: 'M+', label: 'Ad spend managed ($)' },
  { value: 94, suffix: '%', label: 'Client retention' },
  { value: 40, suffix: '+', label: 'Senior specialists' },
]

/* ---------------- Icons ---------------- */

function Icon({ name, size = 22 }) {
  const p = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round' }
  switch (name) {
    case 'search': return <svg {...p}><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
    case 'target': return <svg {...p}><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><circle cx="12" cy="12" r="1" /></svg>
    case 'pen': return <svg {...p}><path d="M12 20h9" /><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" /></svg>
    case 'layout': return <svg {...p}><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M9 21V9" /></svg>
    case 'chart': return <svg {...p}><path d="M3 3v18h18" /><path d="m7 15 4-4 3 3 5-6" /></svg>
    case 'spark': return <svg {...p}><path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M5.6 18.4l2.8-2.8M15.6 8.4l2.8-2.8" /></svg>
    case 'arrow': return <svg {...p}><path d="M5 12h14M13 6l6 6-6 6" /></svg>
    case 'menu': return <svg {...p}><path d="M4 7h16M4 12h16M4 17h16" /></svg>
    case 'close': return <svg {...p}><path d="M6 6l12 12M18 6 6 18" /></svg>
    case 'check': return <svg {...p}><path d="m5 12 4 4 10-10" /></svg>
    default: return null
  }
}

/* ---------------- Helpers ---------------- */

function useInView(options = { threshold: 0, rootMargin: '0px 0px -60px 0px' }) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setInView(true); obs.disconnect() }
    }, options)
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return [ref, inView]
}

function Counter({ value, suffix }) {
  const [ref, inView] = useInView()
  const [n, setN] = useState(0)
  useEffect(() => {
    if (!inView) return
    let raf, start
    const dur = 1400
    const tick = (t) => {
      if (!start) start = t
      const k = Math.min((t - start) / dur, 1)
      setN(Math.round(value * (1 - Math.pow(1 - k, 3))))
      if (k < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, value])
  return <span ref={ref}>{n}{suffix}</span>
}

function Reveal({ children, className = '', delay = 0 }) {
  const [ref, inView] = useInView()
  return (
    <div ref={ref} className={`reveal ${inView ? 'in' : ''} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  )
}

/* ---------------- Sections ---------------- */

function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <div className="container nav">
        <a href="#top" className="logo" aria-label="XYZ Agency home">
          <span className="logo-mark">X</span>
          <span>XYZ<b>Agency</b></span>
        </a>
        <nav className={`nav-links ${open ? 'open' : ''}`}>
          {NAV.map((n) => (
            <a key={n.href} href={n.href} onClick={() => setOpen(false)}>{n.label}</a>
          ))}
          <a href="#contact" className="btn btn-primary nav-cta" onClick={() => setOpen(false)}>Talk to us</a>
        </nav>
        <button className="menu-btn" aria-label="Toggle menu" onClick={() => setOpen(!open)}>
          <Icon name={open ? 'close' : 'menu'} size={26} />
        </button>
      </div>
    </header>
  )
}

function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-glow" aria-hidden="true" />
      <div className="container hero-grid">
        <div className="hero-copy">
          <span className="eyebrow"><span className="dot" /> Full-funnel digital marketing agency</span>
          <h1>Marketing that drives <span className="accent">compounding</span> growth.</h1>
          <p className="lead">
            XYZ Agency brings SEO, paid media, content, web and AI together as one connected growth system —
            run by senior specialists and measured against revenue.
          </p>
          <div className="hero-ctas">
            <a href="#contact" className="btn btn-primary">Get a free growth audit <Icon name="arrow" size={18} /></a>
            <a href="#work" className="btn btn-ghost">See our results</a>
          </div>
          <ul className="hero-ticks">
            <li><Icon name="check" size={16} /> No long lock-in contracts</li>
            <li><Icon name="check" size={16} /> Senior team on every account</li>
          </ul>
        </div>

        <div className="hero-visual" aria-hidden="true">
          <div className="dash card">
            <div className="dash-top">
              <span>Pipeline generated</span>
              <span className="pill up">+212%</span>
            </div>
            <div className="dash-value">$4.8M</div>
            <svg className="dash-chart" viewBox="0 0 300 110" preserveAspectRatio="none">
              <defs>
                <linearGradient id="g" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0" stopColor="#ff5a1f" stopOpacity=".35" />
                  <stop offset="1" stopColor="#ff5a1f" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d="M0 95 L30 88 L60 90 L90 75 L120 78 L150 60 L180 55 L210 40 L240 35 L270 20 L300 12 L300 110 L0 110Z" fill="url(#g)" />
              <path d="M0 95 L30 88 L60 90 L90 75 L120 78 L150 60 L180 55 L210 40 L240 35 L270 20 L300 12" fill="none" stroke="#ff5a1f" strokeWidth="3" />
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
            <span className="f-ico blue"><Icon name="search" size={18} /></span>
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
  )
}

function Services() {
  return (
    <section className="section" id="services">
      <div className="container">
        <Reveal className="section-head">
          <span className="kicker">What we do</span>
          <h2>We plan, build and run the systems behind your growth</h2>
          <p>Pick a single channel or bring us in as your full-funnel growth partner. Either way, everything connects back to pipeline and revenue.</p>
        </Reveal>
        <div className="grid-3">
          {SERVICES.map((s, i) => (
            <Reveal key={s.title} delay={i * 70}>
              <article className="card service">
                <span className="service-ico"><Icon name={s.icon} /></span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
                <ul>{s.points.map((p) => <li key={p}>{p}</li>)}</ul>
                <a href="#contact" className="link">Learn more <Icon name="arrow" size={16} /></a>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function Stats() {
  return (
    <section className="stats">
      <div className="container stats-grid">
        {STATS.map((s) => (
          <div key={s.label} className="stat">
            <div className="stat-num"><Counter value={s.value} suffix={s.suffix} /></div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  )
}

function Work() {
  return (
    <section className="section alt" id="work">
      <div className="container">
        <Reveal className="section-head row">
          <div>
            <span className="kicker">Results</span>
            <h2>Delivering on expectations with measurable outcomes</h2>
          </div>
          <a href="#contact" className="btn btn-ghost">Discuss your goals <Icon name="arrow" size={18} /></a>
        </Reveal>
        <div className="grid-4">
          {WORK.map((w, i) => (
            <Reveal key={w.tag} delay={i * 80}>
              <article className="card work" style={{ '--c': w.color }}>
                <span className="work-tag">{w.tag}</span>
                <div className="work-metric">{w.metric}</div>
                <p>{w.label}</p>
                <span className="work-bar" />
              </article>
            </Reveal>
          ))}
        </div>
        <p className="footnote">Figures shown are illustrative sample outcomes.</p>
      </div>
    </section>
  )
}

function Approach() {
  const [active, setActive] = useState(0)
  return (
    <section className="section dark" id="approach">
      <div className="container approach">
        <Reveal className="section-head light">
          <span className="kicker">How we work</span>
          <h2>GrowthOS — one operating model, compounding results</h2>
          <p>A shared playbook, a senior pod embedded with your team, and weekly reporting that turns predictive by month four.</p>
          <a href="#contact" className="btn btn-primary">Start with a growth audit <Icon name="arrow" size={18} /></a>
        </Reveal>
        <div className="steps">
          {STEPS.map((s, i) => (
            <button
              key={s.title}
              className={`step ${active === i ? 'active' : ''}`}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              onClick={() => setActive(i)}
            >
              <span className="step-num">0{i + 1}</span>
              <div>
                <small>{s.when}</small>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

function Industries() {
  return (
    <section className="section" id="industries">
      <div className="container">
        <Reveal className="section-head center">
          <span className="kicker">Industries</span>
          <h2>Specialists in the markets we serve</h2>
          <p>Deep category knowledge means faster ramp-up and messaging that lands with your buyers.</p>
        </Reveal>
        <Reveal className="chips">
          {INDUSTRIES.map((x) => <span key={x} className="chip">{x}</span>)}
        </Reveal>
      </div>
    </section>
  )
}

function Insights() {
  return (
    <section className="section alt" id="insights">
      <div className="container">
        <Reveal className="section-head row">
          <div>
            <span className="kicker">Recent thinking</span>
            <h2>Insights from experts driving results on the ground</h2>
          </div>
          <a href="#insights" className="btn btn-ghost">Explore resources <Icon name="arrow" size={18} /></a>
        </Reveal>
        <div className="grid-4">
          {INSIGHTS.map((p, i) => (
            <Reveal key={p.title} delay={i * 70}>
              <article className="card post">
                <div className={`post-img p${i}`} />
                <div className="post-body">
                  <span className="work-tag">{p.cat}</span>
                  <h3>{p.title}</h3>
                  <small>{p.read}</small>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function Contact() {
  const [form, setForm] = useState({ name: '', email: '', company: '', service: 'SEO & Organic Growth', message: '' })
  const [sent, setSent] = useState(false)
  const update = (k) => (e) => setForm({ ...form, [k]: e.target.value })
  const submit = (e) => {
    e.preventDefault()
    const body = `Name: ${form.name}%0D%0AEmail: ${form.email}%0D%0ACompany: ${form.company}%0D%0AService: ${form.service}%0D%0A%0D%0A${encodeURIComponent(form.message)}`
    window.location.href = `mailto:hello@xyzagency.com?subject=${encodeURIComponent('New enquiry from ' + form.name)}&body=${body}`
    setSent(true)
  }
  return (
    <section className="section" id="contact">
      <div className="container">
        <div className="cta card">
          <div className="cta-copy">
            <span className="kicker">Let's partner together</span>
            <h2>Ready to grow faster?</h2>
            <p>Tell us where you want to be in 12 months. We'll come back within one business day with a free audit and a plan to get there.</p>
            <ul className="hero-ticks col">
              <li><Icon name="check" size={16} /> Free 30-minute strategy call</li>
              <li><Icon name="check" size={16} /> Channel & tracking audit</li>
              <li><Icon name="check" size={16} /> Clear 90-day roadmap</li>
            </ul>
          </div>
          <form className="form" onSubmit={submit}>
            {sent ? (
              <div className="sent">
                <span className="service-ico"><Icon name="check" /></span>
                <h3>Thanks, {form.name.split(' ')[0] || 'there'}!</h3>
                <p>Your email app should have opened with your message. We'll be in touch shortly.</p>
              </div>
            ) : (
              <>
                <div className="field-row">
                  <label>Name<input required value={form.name} onChange={update('name')} placeholder="Jane Doe" /></label>
                  <label>Work email<input required type="email" value={form.email} onChange={update('email')} placeholder="jane@company.com" /></label>
                </div>
                <div className="field-row">
                  <label>Company<input value={form.company} onChange={update('company')} placeholder="Company Inc." /></label>
                  <label>Interested in
                    <select value={form.service} onChange={update('service')}>
                      {SERVICES.map((s) => <option key={s.title}>{s.title}</option>)}
                      <option>Full-funnel partnership</option>
                    </select>
                  </label>
                </div>
                <label>What are your goals?<textarea rows="4" value={form.message} onChange={update('message')} placeholder="E.g. double inbound demo requests in the next two quarters" /></label>
                <button className="btn btn-primary full" type="submit">Let's connect <Icon name="arrow" size={18} /></button>
              </>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container foot-grid">
        <div>
          <a href="#top" className="logo light"><span className="logo-mark">X</span><span>XYZ<b>Agency</b></span></a>
          <p className="foot-about">A full-funnel digital marketing agency helping ambitious brands turn marketing into a compounding growth engine.</p>
          <div className="socials">
            {['in', 'ig', 'fb', 'x'].map((s) => <a key={s} href="#top" aria-label={s}>{s}</a>)}
          </div>
        </div>
        <div>
          <h4>Services</h4>
          {SERVICES.map((s) => <a key={s.title} href="#services">{s.title}</a>)}
        </div>
        <div>
          <h4>Company</h4>
          <a href="#approach">Our approach</a>
          <a href="#work">Results</a>
          <a href="#insights">Insights</a>
          <a href="#contact">Careers</a>
          <a href="#contact">Contact</a>
        </div>
        <div>
          <h4>Get in touch</h4>
          <a href="mailto:hello@xyzagency.com">hello@xyzagency.com</a>
          <a href="tel:+10000000000">+1 (000) 000-0000</a>
          <p className="foot-about">Offices in USA · UAE · India</p>
        </div>
      </div>
      <div className="container foot-bottom">
        <span>© {new Date().getFullYear()} XYZ Agency. All rights reserved.</span>
        <span><a href="#top">Privacy Policy</a> · <a href="#top">Terms</a></span>
      </div>
    </footer>
  )
}

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Services />
        <Stats />
        <Work />
        <Approach />
        <Industries />
        <Insights />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
