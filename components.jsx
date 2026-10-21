import { Fragment, useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { APP_TECH, CMS_TECH, COMPANY, HOSTING, PARTNERS, SERVICE_GROUPS, SERVICES } from './data.js'
import { FORM_ENDPOINT, LEAD_CC, LOGO_FULL, LOGO_FULL_WHITE, RECAPTCHA_SITE_KEY } from './site.config.js'
import { applyHead, getSeo } from './seo.js'

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
    case 'sun': return <svg {...p}><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></svg>
    case 'moon': return <svg {...p}><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" /></svg>
    case 'up': return <svg {...p}><path d="M12 19V5M6 11l6-6 6 6" /></svg>
    case 'plus': return <svg {...p}><path d="M12 5v14M5 12h14" /></svg>
    case 'star': return <svg {...p}><path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9Z" /></svg>
    case 'lock': return <svg {...p}><rect x="4" y="11" width="16" height="10" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" /></svg>
    case 'globe': return <svg {...p}><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" /></svg>
    case 'code': return <svg {...p}><path d="m8 8-4 4 4 4M16 8l4 4-4 4M14 5l-4 14" /></svg>
    case 'mobile': return <svg {...p}><rect x="6.5" y="2" width="11" height="20" rx="2.5" /><path d="M11 18h2" /></svg>
    case 'cpu': return <svg {...p}><rect x="6" y="6" width="12" height="12" rx="2" /><rect x="9.5" y="9.5" width="5" height="5" rx="1" /><path d="M9 2v3M15 2v3M9 19v3M15 19v3M2 9h3M2 15h3M19 9h3M19 15h3" /></svg>
    case 'cart': return <svg {...p}><circle cx="9" cy="20" r="1.5" /><circle cx="18" cy="20" r="1.5" /><path d="M2 3h3l2.6 12.2a1 1 0 0 0 1 .8h9.7a1 1 0 0 0 1-.8L21 7H6" /></svg>
    case 'cloud': return <svg {...p}><path d="M7 19h10.5a4.5 4.5 0 0 0 .6-8.96A6 6 0 0 0 6.4 9.1 5 5 0 0 0 7 19Z" /></svg>
    case 'shield': return <svg {...p}><path d="M12 3 4.5 6v6c0 4.6 3.2 7.9 7.5 9 4.3-1.1 7.5-4.4 7.5-9V6Z" /><path d="m9 12 2 2 4-4" /></svg>
    case 'server': return <svg {...p}><rect x="3" y="4" width="18" height="7" rx="2" /><rect x="3" y="13" width="18" height="7" rx="2" /><path d="M7 7.5h.01M7 16.5h.01M11 7.5h6M11 16.5h6" /></svg>
    case 'layers': return <svg {...p}><path d="m12 3 9 5-9 5-9-5Z" /><path d="m3 13 9 5 9-5" /></svg>
    case 'linkedin': return <svg {...p} fill="currentColor" stroke="none"><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45Z" /></svg>
    case 'instagram': return <svg {...p}><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r=".6" fill="currentColor" /></svg>
    case 'briefcase': return <svg {...p}><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M3 13h18" /></svg>
    case 'bolt': return <svg {...p}><path d="M13 2 4 14h7l-1 8 9-12h-7Z" /></svg>
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

/* Page <head> (title, meta, canonical, JSON-LD) comes from seo.js for every route.
   It is prerendered into each HTML file at build time and refreshed here on client-side navigation. */
export function useTitle() {}

export function SeoHead() {
  const { pathname } = useLocation()
  useEffect(() => { applyHead(getSeo(pathname)) }, [pathname])
  return null
}

/* ---------- Lead capture (all forms) ----------
   1. Gets a Google reCAPTCHA v3 token (only when VITE_RECAPTCHA_SITE_KEY is set — invisible, no puzzles).
   2. Posts to /api/lead (api/lead.js), which re-validates, runs the spam checks and emails the lead via FormSubmit.
   3. Falls back to posting straight to FormSubmit only when the API isn't there (local dev / non-Vercel host)
      or the API asks the browser to deliver an already-verified lead. */
let recaptchaPromise
export function loadRecaptcha() {
  if (!RECAPTCHA_SITE_KEY || typeof window === 'undefined') return Promise.resolve(null)
  if (!recaptchaPromise) {
    recaptchaPromise = new Promise((resolve) => {
      const s = document.createElement('script')
      s.src = `https://www.google.com/recaptcha/api.js?render=${encodeURIComponent(RECAPTCHA_SITE_KEY)}`
      s.async = true
      s.onload = () => window.grecaptcha.ready(() => resolve(window.grecaptcha))
      s.onerror = () => { recaptchaPromise = null; resolve(null) }
      document.head.appendChild(s)
    })
  }
  return recaptchaPromise
}
async function recaptchaToken(action) {
  const g = await loadRecaptcha()
  if (!g) return ''
  try { return await g.execute(RECAPTCHA_SITE_KEY, { action }) } catch (e) { return '' }
}

const RECAPTCHA_ACTIONS = { contact: 'contact', job: 'job_application', ebook: 'ebook' }

async function postToFormSubmit(subject, values, fields) {
  const payload = {
    _subject: subject, _template: 'table', _captcha: 'false',
    ...(LEAD_CC ? { _cc: LEAD_CC } : {}),
    ...(values.email ? { _replyto: values.email.trim() } : {}),
    ...fields,
  }
  const res = await fetch(FORM_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(payload),
  })
  let data = {}
  try { data = await res.json() } catch (e) { /* non-JSON */ }
  if (!res.ok || String(data.success) !== 'true') throw new Error(data.message || `Request failed (${res.status})`)
  return data
}

export async function sendLead({ kind, subject, values, fields, honey = '', elapsed = 0 }) {
  const allFields = {
    ...fields,
    Page: typeof window !== 'undefined' ? window.location.href : '',
    'Submitted at': new Date().toISOString(),
  }
  const token = await recaptchaToken(RECAPTCHA_ACTIONS[kind] || 'submit')
  let res
  try {
    res = await fetch('/api/lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ kind, subject, values, fields: allFields, meta: { honey, elapsed, token } }),
    })
  } catch (e) {
    throw new Error('Network error — please check your connection')
  }
  if (res.status === 404 || res.status === 405) return postToFormSubmit(subject, values, allFields) // no API on this host
  let data = {}
  try { data = await res.json() } catch (e) { /* non-JSON */ }
  if (data.deliverFromBrowser) return postToFormSubmit(subject, values, allFields)
  if (!res.ok || String(data.success) !== 'true') {
    const err = new Error(data.message || `Request failed (${res.status})`)
    if (data.errors) err.fields = data.errors
    throw err
  }
  return data
}

/* Honeypot field: hidden from people, bots fill it in and get silently dropped */
export function Honeypot({ value, onChange }) {
  return (
    <label className="hp" aria-hidden="true">Leave this empty<input tabIndex={-1} autoComplete="off" name="_honey" value={value} onChange={onChange} /></label>
  )
}

/* Renders text with markdown-style [links](/path) — internal paths use the router */
export function RichText({ text }) {
  const parts = []
  const re = /\[([^\]]+)\]\(([^)\s]+)\)/g
  let last = 0
  let m
  while ((m = re.exec(text))) {
    if (m.index > last) parts.push(text.slice(last, m.index))
    const [, label, href] = m
    parts.push(href.startsWith('/')
      ? <Link key={m.index} to={href}>{label}</Link>
      : <a key={m.index} href={href} target="_blank" rel="noopener">{label}</a>)
    last = m.index + m[0].length
  }
  if (last < text.length) parts.push(text.slice(last))
  return <>{parts}</>
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

export function Reveal({ children, className = '', delay = 0, variant = 'up', as: Tag = 'div' }) {
  const [ref, inView] = useInView()
  return (
    <Tag ref={ref} className={`reveal r-${variant} ${inView ? 'in' : ''} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </Tag>
  )
}

/* Heading that reveals word by word */
export function SplitText({ text, as: Tag = 'h2', className = '' }) {
  const [ref, inView] = useInView()
  return (
    <Tag ref={ref} className={`split-text ${inView ? 'in' : ''} ${className}`} aria-label={text}>
      {text.split(' ').map((w, i) => (
        <Fragment key={i}>
          {i > 0 && ' '}
          <span className="w" aria-hidden="true"><span style={{ transitionDelay: `${i * 45}ms` }}>{w}</span></span>
        </Fragment>
      ))}
    </Tag>
  )
}

/* Scroll position (rAF-throttled) */
export function useScrollY() {
  const [y, setY] = useState(0)
  useEffect(() => {
    let raf = 0
    const on = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(() => setY(window.scrollY)) }
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => { window.removeEventListener('scroll', on); cancelAnimationFrame(raf) }
  }, [])
  return y
}

const reduceMotion = () => typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

/* ---------- Theme hook (reacts to the header toggle) ---------- */
export function useTheme() {
  const [theme, setTheme] = useState('light')
  useEffect(() => {
    setTheme(document.documentElement.dataset.theme || 'light')
    const mo = new MutationObserver(() => setTheme(document.documentElement.dataset.theme || 'light'))
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
    return () => mo.disconnect()
  }, [])
  return theme
}

/* ---------- Lottie (JSON) animation player ----------
   Files: lottie-<name>-<light|dark>.json. Library + JSON are lazy-loaded. */
const LOTTIE_FILES = import.meta.glob('./lottie-*.json', { import: 'default' })
let lottieLib
const loadLottie = () => (lottieLib ||= import('lottie-web/build/player/lottie_light').then((m) => m.default))
const clone = (d) => (typeof structuredClone === 'function' ? structuredClone(d) : JSON.parse(JSON.stringify(d)))

export function LottiePlayer({ name, loop = true, onComplete, className = '', label = '' }) {
  const box = useRef(null)
  const theme = useTheme()
  const done = useRef(onComplete)
  done.current = onComplete
  const resume = useRef({ name: null, frame: 0 })
  useEffect(() => {
    let anim
    let io
    let dead = false
    const file = LOTTIE_FILES[`./lottie-${name}-${theme}.json`]
    if (!file) return undefined
    Promise.all([loadLottie(), file()]).then(([lottie, data]) => {
      if (dead || !box.current) return
      anim = lottie.loadAnimation({
        container: box.current, renderer: 'svg', loop, autoplay: false, animationData: clone(data),
        rendererSettings: { preserveAspectRatio: 'xMidYMid meet' },
      })
      anim.addEventListener('complete', () => done.current?.())
      if (reduceMotion()) { anim.goToAndStop(110, true); return }
      // keep the playhead when only the theme changed
      if (resume.current.name === name && resume.current.frame) anim.goToAndStop(resume.current.frame, true)
      io = new IntersectionObserver(([e]) => (e.isIntersecting ? anim.play() : anim.pause()))
      io.observe(box.current)
    })
    return () => {
      dead = true
      io?.disconnect()
      if (anim) { resume.current = { name, frame: anim.currentFrame }; anim.destroy() }
    }
  }, [name, theme, loop])
  return <div ref={box} className={`lottie ${className}`} role="img" aria-label={label} />
}

/* ---------- Monogram tile for technology names ---------- */
export function TechTile({ t, size = 'md' }) {
  return (
    <span className={`tech-tile ${size}`} style={{ '--tc': t.color }}>
      <span className="tech-mono">{t.short}</span>
      <span className="tech-name">{t.name}</span>
    </span>
  )
}

/* Element moves at a different speed than the page */
export function Parallax({ speed = 0.15, children, className = '' }) {
  const ref = useRef(null)
  useEffect(() => {
    if (reduceMotion()) return
    let raf = 0
    const update = () => {
      const el = ref.current
      if (!el) return
      const r = el.getBoundingClientRect()
      const offset = (r.top + r.height / 2 - window.innerHeight / 2) * -speed
      el.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0)`
    }
    const on = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(update) }
    update()
    window.addEventListener('scroll', on, { passive: true })
    window.addEventListener('resize', on)
    return () => { window.removeEventListener('scroll', on); window.removeEventListener('resize', on); cancelAnimationFrame(raf) }
  }, [speed])
  return <div ref={ref} className={`parallax ${className}`}>{children}</div>
}

/* 0 → 1 progress of an element passing through the viewport */
export function useSectionProgress() {
  const ref = useRef(null)
  const [p, setP] = useState(0)
  useEffect(() => {
    let raf = 0
    const update = () => {
      const el = ref.current
      if (!el) return
      const r = el.getBoundingClientRect()
      const vh = window.innerHeight
      setP(Math.min(1, Math.max(0, (vh * 0.7 - r.top) / r.height)))
    }
    const on = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(update) }
    update()
    window.addEventListener('scroll', on, { passive: true })
    return () => { window.removeEventListener('scroll', on); cancelAnimationFrame(raf) }
  }, [])
  return [ref, p]
}

/* Card spotlight that follows the cursor */
export const spotlight = (e) => {
  const r = e.currentTarget.getBoundingClientRect()
  e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
  e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
}

export function ScrollProgress() {
  const y = useScrollY()
  const [max, setMax] = useState(1)
  useEffect(() => { setMax(Math.max(1, document.documentElement.scrollHeight - window.innerHeight)) })
  return <div className="scroll-progress" style={{ transform: `scaleX(${Math.min(1, y / max)})` }} aria-hidden="true" />
}

export function BackToTop() {
  const y = useScrollY()
  return (
    <button className={`to-top ${y > 600 ? 'show' : ''}`} aria-label="Back to top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
      <Icon name="up" size={20} />
    </button>
  )
}

/* ---------- Theme ---------- */
/* Light is the default for every visitor; dark only when they pick it with the toggle. */
const THEME_KEY = 'xyz-theme'
function getInitialTheme() {
  try {
    const saved = localStorage.getItem(THEME_KEY)
    if (saved === 'dark' || saved === 'light') return saved
  } catch (e) { /* storage unavailable */ }
  return 'light'
}

export function ThemeToggle() {
  const [theme, setThemeState] = useState('light')
  useEffect(() => { setThemeState(document.documentElement.dataset.theme || getInitialTheme()) }, [])
  const setTheme = (t) => {
    setThemeState(t)
    document.documentElement.dataset.theme = t
    try { localStorage.setItem(THEME_KEY, t) } catch (e) { /* ignore */ }
  }
  const dark = theme === 'dark'
  return (
    <button
      className={`theme-toggle ${dark ? 'is-dark' : ''}`}
      onClick={() => setTheme(dark ? 'light' : 'dark')}
      aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={dark ? 'Light mode' : 'Dark mode'}
    >
      <span className="tt-track">
        <span className="tt-icon sun"><Icon name="sun" size={15} /></span>
        <span className="tt-icon moon"><Icon name="moon" size={15} /></span>
        <span className="tt-thumb" />
      </span>
    </button>
  )
}

export function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

/* ---------- Layout ---------- */
const NAV = [
  { label: 'Services', to: '/services', mega: true },
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

const MEGA_TECH = [
  ...CMS_TECH.map((t) => ({ ...t, to: '/services/web-development' })),
  ...APP_TECH.map((t) => ({ ...t, to: t.name === 'AI / ML' ? '/services/ai-development' : ['Flutter', 'Android', 'iOS'].includes(t.name) ? '/services/mobile-apps' : '/services/web-applications' })),
  ...HOSTING.map((t) => ({ ...t, to: '/services/cloud-hosting' })),
]

function MegaMenu() {
  const google = PARTNERS.find((p) => p.featured)
  return (
    <div className="mega">
      <div className="container mega-inner">
        <div className="mega-cols">
          {SERVICE_GROUPS.map((g) => (
            <div key={g.key} className="mega-col">
              <Link to={`/services#${g.key}`} className="mega-head">
                <span className="drop-ico"><Icon name={g.icon} size={18} /></span>
                <span><b>{g.label}</b><small>{g.desc}</small></span>
              </Link>
              <div className="mega-links">
                {SERVICES.filter((s) => s.group === g.key).map((s) => (
                  <NavLink key={s.slug} to={`/services/${s.slug}`} className="mega-link">
                    <Icon name={s.icon} size={16} /><span>{s.title}</span>
                  </NavLink>
                ))}
              </div>
            </div>
          ))}
        </div>
        <aside className="mega-feature">
          <img src={google.img} alt={google.name} width="169" height="64" loading="lazy" />
          <h4>Certified, partner-led delivery</h4>
          <p>Google Premier Partner, plus certified with AWS, Microsoft, Salesforce and HubSpot.</p>
          <div className="mega-badges">
            {PARTNERS.filter((p) => !p.featured).slice(0, 4).map((p) => <img key={p.name} src={p.img} alt={p.name} width={p.w} height={p.h} loading="lazy" />)}
          </div>
          <Link to="/contact" className="btn btn-primary sm">Start a project <Icon name="arrow" size={16} /></Link>
        </aside>
      </div>
      <div className="mega-foot">
        <div className="container mega-foot-inner">
          <span className="mega-foot-label">Technologies</span>
          <div className="mega-tech">
            {MEGA_TECH.map((t) => (
              <Link key={t.name} to={t.to} className="mega-pill" style={{ '--tc': t.color }}><i />{t.name}</Link>
            ))}
          </div>
          <Link to="/services" className="mega-all">All services <Icon name="arrow" size={16} /></Link>
        </div>
      </div>
    </div>
  )
}

export function Logo({ light }) {
  return (
    <Link to="/" className={`logo ${light ? 'light' : ''}`} aria-label={`${COMPANY.name} home`}>
      {light ? (
        <img src={LOGO_FULL_WHITE} alt={COMPANY.name} width="527" height="120" className="logo-img" />
      ) : (
        <>
          <img src={LOGO_FULL} alt={COMPANY.name} width="527" height="120" className="logo-img logo-img-light" />
          <img src={LOGO_FULL_WHITE} alt="" aria-hidden="true" width="527" height="120" className="logo-img logo-img-dark" />
        </>
      )}
    </Link>
  )
}

export function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [drop, setDrop] = useState(null)
  const timer = useRef(null)
  const { pathname } = useLocation()
  useEffect(() => { setOpen(false); setDrop(null) }, [pathname])
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setDrop(null) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])
  const isDesktop = () => window.matchMedia('(min-width: 961px)').matches
  const enter = (label) => { if (!isDesktop()) return; clearTimeout(timer.current); setDrop(label) }
  const leave = () => { if (!isDesktop()) return; clearTimeout(timer.current); timer.current = setTimeout(() => setDrop(null), 140) }
  return (
    <header className={`header ${scrolled || open || drop ? 'scrolled' : ''} ${drop === 'Services' ? 'mega-open' : ''}`}>
      <div className="container nav">
        <Logo />
        <nav className={`nav-links ${open ? 'open' : ''}`} aria-label="Main">
          {NAV.map((n) => (n.children || n.mega) ? (
            <div
              key={n.label}
              className={`has-drop ${n.mega ? 'is-mega' : ''} ${drop === n.label ? 'show' : ''}`}
              onMouseEnter={() => enter(n.label)}
              onMouseLeave={leave}
            >
              <button className="drop-btn" aria-expanded={drop === n.label} onClick={() => setDrop(drop === n.label ? null : n.label)}>
                {n.label} <Icon name="down" size={16} />
              </button>
              {n.mega ? <MegaMenu /> : (
                <div className="dropdown">
                  {n.children.map((c) => (
                    <NavLink key={c.to} to={c.to} className="drop-item">
                      <span className="drop-ico"><Icon name={c.icon} size={18} /></span>
                      <span><b>{c.label}</b>{c.desc && <small>{c.desc}</small>}</span>
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <NavLink key={n.to} to={n.to}>{n.label}</NavLink>
          ))}
          <Link to="/contact" className="btn btn-primary nav-cta">Talk to us</Link>
        </nav>
        <div className="nav-tools">
          <ThemeToggle />
          <button className="menu-btn" aria-label="Toggle menu" aria-expanded={open} onClick={() => setOpen(!open)}>
            <Icon name={open ? 'close' : 'menu'} size={26} />
          </button>
        </div>
      </div>
      <div className={`mega-scrim ${drop === 'Services' ? 'on' : ''}`} aria-hidden="true" />
    </header>
  )
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="container foot-grid">
        <div>
          <Logo light />
          <p className="foot-about">A software development and digital marketing company — we build websites, web apps and mobile apps, then grow them with SEO, paid media and AI.</p>
          <div className="foot-badges">
            {PARTNERS.slice(0, 4).map((p) => <img key={p.name} src={p.img} alt={p.name} width={p.w} height={p.h} loading="lazy" />)}
          </div>
          <Socials />
        </div>
        <div>
          <h4>Development</h4>
          {SERVICES.filter((s) => s.group !== 'marketing').map((s) => <Link key={s.slug} to={`/services/${s.slug}`}>{s.title}</Link>)}
        </div>
        <div>
          <h4>Marketing</h4>
          {SERVICES.filter((s) => s.group === 'marketing').map((s) => <Link key={s.slug} to={`/services/${s.slug}`}>{s.title}</Link>)}
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
export function Socials({ labels = false, className = '' }) {
  return (
    <div className={`socials ${labels ? 'with-labels' : ''} ${className}`}>
      {COMPANY.social.map((x) => (
        <a key={x.name} href={x.url} target="_blank" rel="noreferrer" aria-label={`${COMPANY.name} on ${x.name}`} className={`soc-${x.icon}`}>
          <Icon name={x.icon} size={labels ? 18 : 17} />{labels && <span>{x.name}</span>}
        </a>
      ))}
    </div>
  )
}

export function PageHero({ kicker, title, text, children, crumbs, aside }) {
  const body = (
    <>
        {crumbs && (
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            {crumbs.map(([label, to]) => (
              <span key={label}> / {to ? <Link to={to}>{label}</Link> : <span aria-current="page">{label}</span>}</span>
            ))}
          </nav>
        )}
        {kicker && <span className="kicker fade-in">{kicker}</span>}
        <SplitText as="h1" text={title} />
        {text && <p className="lead fade-in d2">{text}</p>}
        {children && <div className="fade-in d3">{children}</div>}
    </>
  )
  return (
    <section className={`page-hero ${aside ? 'with-aside' : ''}`}>
      <div className="orbs" aria-hidden="true"><span className="orb o1" /><span className="orb o2" /></div>
      <div className="grid-bg" aria-hidden="true" />
      <div className="container page-hero-inner">
        {aside ? <div className="page-hero-grid"><div>{body}</div><div className="fade-in d2">{aside}</div></div> : body}
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
      <span className="ec-brand">Advotis Agency · Guide</span>
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

export function PostCard({ post, eager = false }) {
  return (
    <Link to={`/blog/${post.slug}`} className="card post spot" onMouseMove={spotlight}>
      <div className="post-img photo">
        <img src={post.image} alt={post.imageAlt} width="1200" height="630" loading={eager ? 'eager' : 'lazy'} decoding="async" />
      </div>
      <div className="post-body">
        <small className="meta"><b className="meta-cat">{post.category}</b> · <time dateTime={post.date}>{post.dateLabel}</time> · {post.read}</small>
        <h3>{post.title}</h3>
        <p>{post.excerpt}</p>
        <span className="link">Read article <Icon name="arrow" size={16} /></span>
      </div>
    </Link>
  )
}

export function CaseCard({ c }) {
  return (
    <Link to={`/work/${c.slug}`} className="card work spot" style={{ '--c': c.color }} onMouseMove={spotlight}>
      <span className="tag">{c.industry}</span>
      <div className="work-metric">{c.metric}</div>
      <p>{c.metricLabel}</p>
      <span className="link">Read case study <Icon name="arrow" size={16} /></span>
      <span className="work-bar" />
    </Link>
  )
}
