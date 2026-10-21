/* ============ Site-wide settings ============
   Change these in one place — every page, sitemap, schema and form reads from here. */

/* Your live domain (no trailing slash). Update this when you connect a custom domain in Vercel,
   e.g. 'https://www.advotisagency.com' — canonical URLs, sitemap.xml, robots.txt and social cards use it.
   You can also set VITE_SITE_URL in Vercel → Settings → Environment Variables instead of editing this file. */
export const SITE_URL = (import.meta.env?.VITE_SITE_URL || 'https://www.advotisagency.com').replace(/\/$/, '')

/* Where form leads are delivered. All forms (contact, job applications, freelancer sign-ups, ebook downloads)
   post to FormSubmit, which emails each lead to this address.
   After the FIRST submission FormSubmit sends a one-time "Activate form" email to this inbox — click it once
   and every later lead is delivered. FormSubmit then shows a random alias (e.g. 'a1b2c3d4…'); you can paste
   that alias here instead of the email to hide the address from the page source. */
export const LEAD_INBOX = import.meta.env?.VITE_LEAD_INBOX || 'gulhanev33@gmail.com'
export const FORM_ENDPOINT = `https://formsubmit.co/ajax/${LEAD_INBOX}`

export const DEFAULT_OG_IMAGE = '/og-default.jpg'
export const LOGO = '/logo.png'
export const LOGO_FULL = '/logo-advotis.png'
export const LOGO_FULL_WHITE = '/logo-advotis-white.png'
export const LOGO_MARK = '/logo-mark.png'
