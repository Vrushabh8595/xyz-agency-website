/* ============ POST /api/lead — Vercel serverless function ============
   Every website form posts here first. The server re-checks everything the browser checked
   (bots can skip browser code), then emails the lead through FormSubmit.

   Spam layers: origin check → honeypot → fill-time trap → per-IP rate limit → field validation
   → content heuristics → Google reCAPTCHA v3 (when keys are set) → FormSubmit.

   Vercel → Settings → Environment Variables (all optional):
     RECAPTCHA_SECRET_KEY   reCAPTCHA v3 secret key. When set, every lead must pass reCAPTCHA.
     RECAPTCHA_MIN_SCORE    0.0–1.0, default 0.5 (higher = stricter)
     LEAD_INBOX / LEAD_CC   override the inbox / CC list from site.config.js */
import { MIN_FILL_MS, spamReason, validateLead } from '../formguard.js'

const SITE_URL = (process.env.VITE_SITE_URL || 'https://www.advotisagency.com').replace(/\/$/, '')
const LEAD_INBOX = process.env.LEAD_INBOX || process.env.VITE_LEAD_INBOX || 'gulhanev33@gmail.com'
const LEAD_CC = process.env.LEAD_CC ?? process.env.VITE_LEAD_CC ?? 'contact@advotisagency.com'
const KINDS = { contact: 'contact', job: 'job_application', ebook: 'ebook' }

const hits = new Map() // best-effort per-instance rate limit: 5 leads / 10 min / IP
function rateLimited(ip) {
  const now = Date.now()
  const list = (hits.get(ip) || []).filter((t) => now - t < 10 * 60 * 1000)
  list.push(now)
  hits.set(ip, list)
  if (hits.size > 5000) hits.clear()
  return list.length > 5
}

function allowedOrigin(origin) {
  if (!origin) return false
  try {
    const { hostname } = new URL(origin)
    return hostname === 'advotisagency.com' || hostname.endsWith('.advotisagency.com') ||
      (hostname.endsWith('.vercel.app') && hostname.includes('advotis')) || hostname === 'localhost' || hostname === '127.0.0.1'
  } catch { return false }
}

async function verifyRecaptcha(token, action, ip) {
  const secret = process.env.RECAPTCHA_SECRET_KEY
  if (!secret) return { ok: true, skipped: true }
  if (!token) return { ok: false, reason: 'missing-token' }
  const r = await fetch('https://www.google.com/recaptcha/api/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ secret, response: token, remoteip: ip || '' }),
  })
  const d = await r.json().catch(() => ({}))
  const min = Number(process.env.RECAPTCHA_MIN_SCORE || 0.5)
  if (!d.success) return { ok: false, reason: `invalid-token:${(d['error-codes'] || []).join(',')}` }
  if (d.action && d.action !== action) return { ok: false, reason: 'wrong-action' }
  if (typeof d.score === 'number' && d.score < min) return { ok: false, reason: `low-score:${d.score}` }
  return { ok: true, score: d.score }
}

const reply = (res, status, body) => res.status(status).json(body)

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store')
  if (req.method !== 'POST') return reply(res, 405, { success: false, message: 'Method not allowed' })

  const origin = req.headers.origin || req.headers.referer || ''
  if (!allowedOrigin(origin)) return reply(res, 403, { success: false, message: 'Forbidden' })

  let body = req.body
  if (typeof body === 'string') { try { body = JSON.parse(body) } catch { body = {} } }
  const { kind, subject, values = {}, fields = {}, meta = {} } = body || {}
  if (!KINDS[kind] || typeof subject !== 'string' || typeof fields !== 'object') return reply(res, 400, { success: false, message: 'Bad request' })

  const ip = String(req.headers['x-forwarded-for'] || '').split(',')[0].trim() || req.socket?.remoteAddress || ''
  const drop = (why) => { console.warn(`[lead] dropped (${why})`, { kind, ip }); return reply(res, 200, { success: 'true', message: 'ok' }) }

  // Silent drops: bots get a normal "success" so they don't learn what tripped them.
  if (meta.honey) return drop('honeypot')
  if (!Number.isFinite(meta.elapsed) || meta.elapsed < MIN_FILL_MS) return drop(`too-fast:${meta.elapsed}`)

  if (rateLimited(ip)) return reply(res, 429, { success: false, message: 'Too many submissions — please wait a few minutes and try again' })

  const errors = validateLead(kind, values)
  if (Object.keys(errors).length) return reply(res, 400, { success: false, message: 'Please check the highlighted fields', errors })

  const spam = spamReason(values)
  if (spam) {
    console.warn('[lead] flagged as spam', { kind, ip, spam })
    return reply(res, 422, { success: false, message: 'Your message was flagged by our spam filter' })
  }

  const captcha = await verifyRecaptcha(meta.token, KINDS[kind], ip).catch((e) => ({ ok: false, reason: `verify-error:${e.message}` }))
  if (!captcha.ok) {
    console.warn('[lead] reCAPTCHA failed', { kind, ip, reason: captcha.reason })
    return reply(res, 403, { success: false, message: "We couldn't verify you're human — please refresh the page and try again" })
  }

  const page = typeof fields.Page === 'string' && fields.Page.startsWith('http') ? fields.Page : `${SITE_URL}/contact`
  const payload = {
    _subject: subject.slice(0, 200),
    _template: 'table',
    _captcha: 'false',
    ...(LEAD_CC ? { _cc: LEAD_CC } : {}),
    ...(values.email ? { _replyto: String(values.email).trim() } : {}),
    ...fields,
    ...(captcha.score != null ? { 'Spam score (reCAPTCHA)': `${captcha.score} (1.0 = human)` } : {}),
  }

  try {
    const r = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(LEAD_INBOX)}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json', Origin: SITE_URL, Referer: page },
      body: JSON.stringify(payload),
    })
    const d = await r.json().catch(() => null)
    if (d && String(d.success) === 'true') return reply(res, 200, { success: 'true', message: 'ok' })
    if (d && d.message) return reply(res, 502, { success: false, message: d.message })
    // FormSubmit didn't answer with JSON (e.g. it blocked a server-side request):
    // the lead already passed every check above, so tell the browser to deliver it directly.
    console.warn('[lead] FormSubmit non-JSON reply, asking browser to deliver', r.status)
    return reply(res, 200, { success: false, deliverFromBrowser: true })
  } catch (e) {
    console.error('[lead] FormSubmit request failed', e)
    return reply(res, 200, { success: false, deliverFromBrowser: true })
  }
}
