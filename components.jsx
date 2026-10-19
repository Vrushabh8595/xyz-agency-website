import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { COMPANY, SERVICES } from './data.js'

/* ---------- Icons ---------- */
export function Icon({ name, size = 22 }) {
  const p = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true }
  switch (name) {
    case 'search': return <svg {...p}><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
    case 'target': return <svg {...p}><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><circle cx="12" cy="12" r="1" /></svg>
    case 'pen': return <svg {...p}><path d="M12 20h9" /><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" /></svg>
    case 'layout': return <svg {...p}><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M9 21V9" /></svg>
    case 'chart': return <svg {...p}><path d="M3 3v18h18" /><path d="m7 15 4-4 3 3 5-6" /></svg>
    case 'spark': return <svg {...p}><path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M5.6 18.4l2.8-2.8M15.6 8.4l2.8-2.8" /></svg>
    case 'arrow': return <svg {...p}><path d="M5 12h14M13 6l6 6-6 6" /></svg>
    case 'back': return <svg {...p}><path d="M19 12H5M11 18l-6-6 6-6" /></svg>
    case 'menu': return <svg {...p}><path d="M4 7h16M4 12h16M4 17h16" /></svg>
    case 'close': return <svg {...p}><path d="M6 6l12 12M18 6 6 18" /></svg>
    case 'check': return <svg {...p}><path d="m5 12 4 4 10-10" /></svg>
    case 'down': return <svg {...p}><path d="m6 9 6 6 6-6" /></svg>
    case 'book': return <svg {...p}><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V3H6.5A2.5 2.5 0 0 0 4 5.5v14Z" /><path d="M4 19.5A2.5 2.5 0 0 0 6.5 22H20v-5" /></svg>
    case 'doc': return <svg {...p}><path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9Z" /><path d="M14 3v6h6M8 13h8M8 17h5" /></svg>
    case 'users': return <svg {...p}><circle cx="9" cy="8" r="4" /><path d="M2 21a7 7 0 0 1 14 0M16 4a4 4 0 0 1 0 8M22 21a7 7 0 0 0-4-6.3" /></svg>
    case 'mail': return <svg {...p}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg>
    case 'phone': return <svg {...p}><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z" /></svg>
    case 'pin': return <svg {...p}><path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>
    case 'clock': return <svg {...p}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>
    case 'lock': return <svg {...p}><rect x="4" y="11" width="16" height="10" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" /></svg>
    default: return null
  }
}

/* ---------- Hooks ---------- */
export function useInView() {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el || !('IntersectionObserver' in window)) { setInView(true); return }
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setInView(true); obs.disconnect() }
    }, { threshold: 0, rootMargin: '0px 0px -60px 0px' })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return [ref, inView]
}

export function useTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} | ${COMPANY.name}` : `${COMPANY.name} | Digital Marketing that Compounds`
  }, [title])
}

export function Counter({ value, suffix }) {
  const [ref, inView] = useInView()
  const [n, setN] = useState(0)
  useEffect(() => {
    if (!inView) return
    let raf, start
    const tick = (t) => {
      if (!start) start = t
      const k = Math.min((t - start) / 1400, 1)
      setN(Math.round(value * (1 - Math.pow(1 - k, 3))))
      if (k < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, value])
  return <span ref={ref}>{n}{suffix}</span>
}

export function Reveal({ children, className = '', delay = 0, as: Tag = 'div' }) {
  const [ref, inView] = useInView()
  return (
    <Tag ref={ref} className={`reveal ${inView ? 'in' : ''} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </Tag>
  )
}

export function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

/* ---------- Layout ---------- */
const NAV = [
  { label: 'Services', to: '/services', children: SERVICES.map((s) => ({ label: s.title, to: `/services/${s.slug}`, icon: s.icon })) },
  { label: 'Work', to: '/work' },
  { label: 'About', to: '/about' },
  {
    label: 'Resources', to: '/blog', children: [
      { label: 'Blog', to: '/blog', icon: 'doc', desc: 'Articles and playbooks' },
      { label: 'Ebooks', to: '/ebooks', icon: 'book', desc: 'Free in-depth guides' },
    ],
  },
  { label: 'Careers', to: '/careers' },
]

export function Logo({ light }) {
  return (
    <Link to="/" className={`logo ${light ? 'light' : ''}`} aria-label={`${COMPANY.name} home`}>
      <span className="logo-mark">X</span>
      <span>XYZ<b>Agency</b></span>
    </Link>
  )
}

export function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [drop, setDrop] = useState(null)
  const { pathname } = useLocation()
  useEffect(() => { setOpen(false); setDrop(null) }, [pathname])
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return (
    <header className={`header ${scrolled || open ? 'scrolled' : ''}`}>
      <div className="container nav">
        <Logo />
        <nav className={`nav-links ${open ? 'open' : ''}`} aria-label="Main">
          {NAV.map((n) => n.children ? (
            <div
              key={n.label}
              className={`has-drop ${drop === n.label ? 'show' : ''}`}
              onMouseEnter={() => setDrop(n.label)}
              onMouseLeave={() => setDrop(null)}
            >
              <button className="drop-btn" aria-expanded={drop === n.label} onClick={() => setDrop(drop === n.label ? null : n.label)}>
                {n.label} <Icon name="down" size={16} />
              </button>
              <div className={`dropdown ${n.children.length > 3 ? 'wide' : ''}`}>
                {n.children.map((c) => (
                  <NavLink key={c.to} to={c.to} className="drop-item">
                    <span className="drop-ico"><Icon name={c.icon} size={18} /></span>
                    <span><b>{c.label}</b>{c.desc && <small>{c.desc}</small>}</span>
                  </NavLink>
                ))}
              </div>
            </div>
          ) : (
            <NavLink key={n.to} to={n.to}>{n.label}</NavLink>
          ))}
          <Link to="/contact" className="btn btn-primary nav-cta">Talk to us</Link>
        </nav>
        <button className="menu-btn" aria-label="Toggle menu" aria-expanded={open} onClick={() => setOpen(!open)}>
          <Icon name={open ? 'close' : 'menu'} size={26} />
        </button>
      </div>
    </header>
  )
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="container foot-grid">
        <div>
          <Logo light />
          <p className="foot-about">A full-funnel digital marketing agency helping ambitious brands turn marketing into a compounding growth engine.</p>
          <div className="socials">
            {['in', 'ig', 'fb', 'x'].map((s) => <a key={s} href="#" aria-label={s}>{s}</a>)}
          </div>
        </div>
        <div>
          <h4>Services</h4>
          {SERVICES.map((s) => <Link key={s.slug} to={`/services/${s.slug}`}>{s.title}</Link>)}
        </div>
        <div>
          <h4>Company</h4>
          <Link to="/about">About us</Link>
          <Link to="/work">Case studies</Link>
          <Link to="/careers">Careers</Link>
          <Link to="/contact">Contact</Link>
        </div>
        <div>
          <h4>Resources</h4>
          <Link to="/blog">Blog</Link>
          <Link to="/ebooks">Ebooks</Link>
          <h4 className="mt">Get in touch</h4>
          <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>
          <a href="tel:+10000000000">{COMPANY.phone}</a>
        </div>
      </div>
      <div className="container foot-bottom">
        <span>© {new Date().getFullYear()} {COMPANY.name}. All rights reserved.</span>
        <span><Link to="/privacy">Privacy Policy</Link> · <Link to="/privacy#terms">Terms</Link></span>
      </div>
    </footer>
  )
}

/* ---------- Shared blocks ---------- */
export function PageHero({ kicker, title, text, children, crumbs }) {
  return (
    <section className="page-hero">
      <div className="hero-glow" aria-hidden="true" />
      <div className="grid-bg" aria-hidden="true" />
      <div className="container page-hero-inner">
        {crumbs && (
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            {crumbs.map(([label, to]) => (
              <span key={label}> / {to ? <Link to={to}>{label}</Link> : <span aria-current="page">{label}</span>}</span>
            ))}
          </nav>
        )}
        {kicker && <span className="kicker">{kicker}</span>}
        <h1>{title}</h1>
        {text && <p className="lead">{text}</p>}
        {children}
      </div>
    </section>
  )
}

export function CtaBand({ title = 'Ready to grow faster?', text = 'Get a free growth audit and a clear 90-day plan from our senior team.' }) {
  return (
    <section className="section tight">
      <div className="container">
        <div className="cta-band">
          <div>
            <h2>{title}</h2>
            <p>{text}</p>
          </div>
          <Link to="/contact" className="btn btn-white">Let's connect <Icon name="arrow" size={18} /></Link>
        </div>
      </div>
    </section>
  )
}

export function EbookCover({ book, small }) {
  const [a, b] = book.gradient
  return (
    <div className={`ebook-cover ${small ? 'small' : ''}`} style={{ background: `linear-gradient(150deg, ${a}, ${b})` }}>
      <span className="ec-brand">XYZ Agency · Guide</span>
      <h3>{book.title}</h3>
      <p>{book.subtitle}</p>
      <span className="ec-foot">{book.pages} pages</span>
      <svg className="ec-art" viewBox="0 0 120 120" aria-hidden="true">
        <circle cx="90" cy="90" r="60" fill="rgba(255,255,255,.12)" />
        <circle cx="90" cy="90" r="38" fill="rgba(255,255,255,.14)" />
        <circle cx="90" cy="90" r="16" fill="rgba(255,255,255,.22)" />
      </svg>
    </div>
  )
}

export function PostCard({ post, i = 0 }) {
  return (
    <Link to={`/blog/${post.slug}`} className="card post">
      <div className={`post-img p${i % 4}`}><span>{post.category}</span></div>
      <div className="post-body">
        <small className="meta">{post.date} · {post.read}</small>
        <h3>{post.title}</h3>
        <p>{post.excerpt}</p>
        <span className="link">Read article <Icon name="arrow" size={16} /></span>
      </div>
    </Link>
  )
}

export function CaseCard({ c }) {
  return (
    <Link to={`/work/${c.slug}`} className="card work" style={{ '--c': c.color }}>
      <span className="tag">{c.industry}</span>
      <div className="work-metric">{c.metric}</div>
      <p>{c.metricLabel}</p>
      <span className="link">Read case study <Icon name="arrow" size={16} /></span>
      <span className="work-bar" />
    </Link>
  )
}
