/* ============ Form validation + spam rules ============
   Shared by the browser (instant field errors) and the /api/lead serverless function
   (the same rules are enforced again on the server, so bots can't skip them). No dependencies. */

export const MIN_FILL_MS = 3000 // humans need more than 3s to fill a form; faster = bot
export const LIMITS = { name: 80, email: 120, phone: 20, company: 120, url: 300, short: 200, message: 3000 }

const EMAIL_RE = /^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)*\.[a-z]{2,}$/i
const URL_RE = /^https?:\/\/[^\s/$.?#][^\s]*\.[^\s]{2,}$/i
const LINK_RE = /(https?:\/\/|www\.)\S+/gi
const NAME_RE = /^[\p{L}\p{M}][\p{L}\p{M} .'-]*$/u

const DISPOSABLE = [
  'mailinator.com', 'yopmail.com', 'guerrillamail.com', 'guerrillamail.net', 'sharklasers.com', '10minutemail.com', 'tempmail.com',
  'temp-mail.org', 'tempmail.net', 'throwawaymail.com', 'trashmail.com', 'getnada.com', 'dispostable.com', 'maildrop.cc',
  'fakeinbox.com', 'mintemail.com', 'mailnesia.com', 'moakt.com', 'emailondeck.com', 'spamgourmet.com', 'tempinbox.com', 'mohmal.com',
]
const SPAM_WORDS = [
  'viagra', 'cialis', 'casino', 'porn', 'xxx', 'escort', 'betting', 'gambling', 'loan offer', 'payday loan', 'bitcoin investment',
  'crypto investment', 'forex signal', 'binary option', 'buy followers', 'buy backlinks', 'cheap backlinks', 'whatsapp me at',
  'telegram me', 'web traffic for $', 'unsubscribe from future', 'this is not spam', 'dear sir/madam, we offer',
]

const clean = (v) => (typeof v === 'string' ? v.trim() : '')
const digits = (v) => clean(v).replace(/\D/g, '')

function checkName(v) {
  if (!v) return 'Please enter your name.'
  if (v.length < 2) return 'Name looks too short.'
  if (v.length > LIMITS.name) return 'Name is too long.'
  if (!NAME_RE.test(v)) return 'Please use letters only (no numbers or links).'
  return ''
}
function checkEmail(v) {
  if (!v) return 'Please enter your email.'
  if (v.length > LIMITS.email || !EMAIL_RE.test(v)) return 'Please enter a valid email, e.g. jane@company.com.'
  const domain = v.split('@')[1].toLowerCase()
  if (DISPOSABLE.some((d) => domain === d || domain.endsWith(`.${d}`))) return 'Please use a permanent email address (not a temporary inbox).'
  return ''
}
function checkPhone(v, required) {
  if (!v) return required ? 'Please enter your phone number.' : ''
  if (!/^[+()\d\s.-]+$/.test(v)) return 'Phone can only contain digits, spaces, +, - and brackets.'
  const n = digits(v).length
  if (n < 7 || n > 15) return 'Please enter a valid phone number with country code (7–15 digits).'
  return ''
}
function checkUrl(v, label) {
  if (!v) return ''
  if (v.length > LIMITS.url || !URL_RE.test(v)) return `${label} must be a full link starting with https://`
  return ''
}
function checkText(v, { label, min = 0, max = LIMITS.message, required = false, maxLinks = 2 }) {
  if (!v) return required ? `Please add ${label}.` : ''
  if (v.length < min) return `Please add a little more detail (at least ${min} characters).`
  if (v.length > max) return `Please keep this under ${max} characters.`
  if ((v.match(LINK_RE) || []).length > maxLinks) return `Please include no more than ${maxLinks} link${maxLinks === 1 ? '' : 's'}.`
  if (/<\s*(a|script|iframe|img)\b|\[url=/i.test(v)) return 'HTML or code is not allowed here.'
  return ''
}

/* Per-form rules. `v` is the raw form state; returns { field: 'error message' } (empty object = valid). */
export function validateLead(kind, v = {}) {
  const f = Object.fromEntries(Object.entries(v).map(([k, x]) => [k, clean(x)]))
  const e = {}
  const set = (k, msg) => { if (msg) e[k] = msg }
  set('name', checkName(f.name))
  set('email', checkEmail(f.email))
  if (kind === 'contact') {
    set('phone', checkPhone(f.phone, false))
    set('company', f.company.length > LIMITS.company ? 'Company name is too long.' : '')
    set('service', f.service ? '' : 'Please choose what you are interested in.')
    set('message', checkText(f.message, { label: 'a short description of your goals', min: 10, required: true }))
  } else if (kind === 'job') {
    set('phone', checkPhone(f.phone, false))
    set('link', checkUrl(f.link, 'LinkedIn / portfolio'))
    set('cv', checkUrl(f.cv, 'CV link'))
    if (!f.link && !f.cv && !e.link && !e.cv) e.cv = 'Please add a CV link or a LinkedIn / portfolio link.'
    set('extra', checkText(f.extra, { label: 'this', max: LIMITS.short, maxLinks: 1 }))
    set('message', checkText(f.message, { label: 'a message', max: LIMITS.message, maxLinks: 3 }))
  } else if (kind === 'ebook') {
    set('company', f.company.length > LIMITS.company ? 'Company name is too long.' : '')
  }
  return e
}

/* Content heuristics that real enquiries almost never trip. Returns a reason string, or '' if clean. */
export function spamReason(v = {}) {
  const text = Object.values(v).map(clean).join(' \n ').toLowerCase()
  if (SPAM_WORDS.some((w) => text.includes(w))) return 'blocked-words'
  if ((text.match(LINK_RE) || []).length > 4) return 'too-many-links'
  if (/(.)\1{9,}/.test(text)) return 'repeated-chars'
  const name = clean(v.name)
  if (name && /[A-Z]{2,}[a-z]+[A-Z]{2,}/.test(name) && !/\s/.test(name) && name.length > 12) return 'random-name' // e.g. "JHkdsKJHkdfKJ"
  return ''
}
