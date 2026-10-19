/* All site content lives here. Edit freely. */

export const COMPANY = {
  name: 'XYZ Agency',
  email: 'hello@xyzagency.com',
  phone: '+1 (000) 000-0000',
  offices: [
    { city: 'New York', country: 'USA', address: '000 Placeholder Ave, New York, NY' },
    { city: 'Dubai', country: 'UAE', address: 'Placeholder Tower, Business Bay' },
    { city: 'Pune', country: 'India', address: 'Placeholder Park, Baner' },
  ],
}

export const SERVICES = [
  {
    slug: 'seo',
    icon: 'search',
    title: 'SEO & Organic Growth',
    short: 'Technical SEO, content strategy and authority building that turn search into a predictable pipeline channel.',
    tags: ['Technical audits', 'Content clusters', 'AI search / GEO'],
    intro: 'Search is still the highest-intent channel your buyers use. We build organic programs that compound — every page, link and fix adds to an asset that keeps paying back.',
    deliverables: ['Full technical SEO audit and fix roadmap', 'Keyword and topic cluster strategy', 'On-page optimization and content briefs', 'Digital PR and link acquisition', 'Local SEO and Google Business Profile', 'Visibility in AI search (ChatGPT, Gemini, Perplexity)'],
    outcomes: ['More qualified organic traffic', 'Lower blended acquisition cost', 'Rankings for buying-intent keywords'],
  },
  {
    slug: 'paid-media',
    icon: 'target',
    title: 'Paid Media & Performance',
    short: 'Google, Meta and LinkedIn campaigns engineered around cost per qualified lead, not vanity clicks.',
    tags: ['Search & shopping', 'Paid social', 'ABM programs'],
    intro: 'We manage paid media like an investment portfolio: clear hypotheses, disciplined testing and budgets that move toward what produces revenue.',
    deliverables: ['Google Ads search, Performance Max and shopping', 'Meta, LinkedIn and TikTok campaigns', 'Account-based advertising', 'Creative testing frameworks', 'Landing page optimization', 'Offline conversion and CRM syncing'],
    outcomes: ['Lower cost per qualified lead', 'Higher return on ad spend', 'Spend tied to closed revenue'],
  },
  {
    slug: 'content-social',
    icon: 'pen',
    title: 'Content & Social',
    short: 'Thought leadership, video and social programs that build trust with buyers before they talk to sales.',
    tags: ['Editorial', 'Short-form video', 'Community'],
    intro: 'Great content earns attention you do not have to rent. We plan, produce and distribute content that your buyers actually want to read and watch.',
    deliverables: ['Content strategy and editorial calendar', 'Long-form articles and ebooks', 'Short-form video and reels', 'LinkedIn executive ghostwriting', 'Email newsletters', 'Social community management'],
    outcomes: ['Stronger brand authority', 'Higher engagement and share of voice', 'Content that sales teams use'],
  },
  {
    slug: 'web-experience',
    icon: 'layout',
    title: 'Web Experience & Tech',
    short: 'Fast, conversion-focused websites and landing pages on WordPress, Webflow, HubSpot and headless stacks.',
    tags: ['UX / UI', 'Development', 'Landing pages'],
    intro: 'Your website is your best salesperson. We design and build sites that load fast, rank well and make it easy for visitors to become customers.',
    deliverables: ['UX research and information architecture', 'UI design systems', 'WordPress, Webflow, HubSpot and React builds', 'Landing page systems', 'Core Web Vitals and performance', 'Accessibility (WCAG) compliance'],
    outcomes: ['Higher conversion rates', 'Faster page loads', 'A site your team can update easily'],
  },
  {
    slug: 'analytics-cro',
    icon: 'chart',
    title: 'Analytics & CRO',
    short: 'Clean tracking, revenue attribution and experimentation so every dollar traces to an outcome.',
    tags: ['GA4 & GTM', 'Dashboards', 'A/B testing'],
    intro: 'You cannot scale what you cannot measure. We fix tracking, connect marketing data to your CRM, and run experiments that lift conversion.',
    deliverables: ['GA4 and Google Tag Manager setup', 'Server-side tracking', 'Multi-touch attribution', 'Looker Studio and BI dashboards', 'Conversion rate optimization program', 'Heatmaps and session analysis'],
    outcomes: ['Trustworthy reporting', 'Clear view of channel ROI', 'Steady conversion lifts'],
  },
  {
    slug: 'ai-automation',
    icon: 'spark',
    title: 'AI & Marketing Automation',
    short: 'AI agents, lead scoring and lifecycle automation that let a lean team operate like a large one.',
    tags: ['CRM automation', 'AI content ops', 'Lead scoring'],
    intro: 'AI should remove busywork, not add risk. We design automations and AI workflows that save hours every week and improve lead quality.',
    deliverables: ['HubSpot and Salesforce automation', 'Lead scoring and routing', 'AI-assisted content workflows', 'Chatbots and AI assistants', 'Lifecycle email programs', 'Reporting automation'],
    outcomes: ['Hours saved every week', 'Faster speed-to-lead', 'Better-qualified pipeline'],
  },
]

export const CASE_STUDIES = [
  {
    slug: 'saas-organic-pipeline',
    industry: 'B2B SaaS',
    title: 'Tripling organic pipeline for a B2B SaaS platform',
    metric: '3.2x', metricLabel: 'pipeline from organic search in 9 months',
    color: '#2563eb',
    services: ['SEO & Organic Growth', 'Content & Social'],
    challenge: 'A fast-growing SaaS company relied almost entirely on paid search. Costs were rising and organic traffic had plateaued for two years.',
    solution: 'We fixed technical issues blocking indexation, built 6 topic clusters around buying-intent keywords, and launched a digital PR program to earn authority.',
    results: [['3.2x', 'organic pipeline'], ['+180%', 'non-brand traffic'], ['−28%', 'blended CAC']],
  },
  {
    slug: 'healthcare-patient-leads',
    industry: 'Healthcare',
    title: 'Scaling patient acquisition for a multi-location clinic group',
    metric: '600+', metricLabel: 'qualified patient leads per quarter',
    color: '#0891b2',
    services: ['Paid Media & Performance', 'Web Experience & Tech'],
    challenge: 'Each location ran its own ads with no shared tracking, so leadership could not see which spend produced booked appointments.',
    solution: 'We rebuilt location landing pages, consolidated ad accounts, and connected call tracking and bookings back to campaigns.',
    results: [['600+', 'leads / quarter'], ['−34%', 'cost per booking'], ['2.1x', 'conversion rate']],
  },
  {
    slug: 'ecommerce-paid-social',
    industry: 'E-commerce',
    title: 'Cutting acquisition cost on paid social for a DTC brand',
    metric: '−41%', metricLabel: 'cost per acquisition on paid social',
    color: '#4f46e5',
    services: ['Paid Media & Performance', 'Analytics & CRO'],
    challenge: 'Rising Meta costs and iOS tracking changes left the brand unsure which creative and audiences were really working.',
    solution: 'We introduced server-side tracking, a weekly creative testing cadence, and a structured audience framework.',
    results: [['−41%', 'CPA'], ['+62%', 'ROAS'], ['40+', 'creatives tested / month']],
  },
  {
    slug: 'professional-services-website',
    industry: 'Professional Services',
    title: 'A website redesign that turned visitors into consultations',
    metric: '+38%', metricLabel: 'website conversion rate after redesign',
    color: '#0284c7',
    services: ['Web Experience & Tech', 'Analytics & CRO'],
    challenge: 'An outdated, slow website was losing visitors before they ever reached the contact page.',
    solution: 'We redesigned the site around clear service paths, rebuilt it for speed, and ran A/B tests on key forms and CTAs.',
    results: [['+38%', 'conversion rate'], ['1.2s', 'load time'], ['+52%', 'consultation requests']],
  },
]

export const POSTS = [
  {
    slug: 'b2b-demand-generation-playbook',
    category: 'Demand Gen',
    title: 'The B2B demand generation playbook for 2027',
    excerpt: 'A practical framework for building a pipeline engine that does not depend on a single channel.',
    date: 'Oct 12, 2026', read: '8 min read', author: 'XYZ Strategy Team',
    body: [
      ['p', 'Most B2B teams confuse lead generation with demand generation. Lead gen captures people who are already looking. Demand gen creates the reason to look in the first place. A healthy pipeline needs both.'],
      ['h', '1. Start with your ideal customer profile'],
      ['p', 'Define the companies and roles that close fastest and stay longest. Every channel decision that follows — keywords, audiences, content topics — should map back to this profile.'],
      ['h', '2. Build a content engine, not one-off campaigns'],
      ['p', 'Pick three to five themes your buyers care about and publish consistently around them: in-depth articles, short video, LinkedIn posts and a monthly newsletter. Consistency beats volume.'],
      ['h', '3. Capture and convert intent'],
      ['p', 'Pair your content engine with high-intent paid search, retargeting and clear conversion paths. Make it easy for a ready buyer to book a meeting in under a minute.'],
      ['h', '4. Measure what sales actually cares about'],
      ['p', 'Report on qualified pipeline and revenue, not just form fills. Connect your ad platforms and website to the CRM so you can see which programs create opportunities that close.'],
      ['q', 'Demand generation is a system. The teams that win treat it like one.'],
    ],
  },
  {
    slug: 'seo-agency-vs-in-house',
    category: 'SEO',
    title: 'SEO agency vs. in-house team: how to decide',
    excerpt: 'Cost, speed, expertise and control — a clear comparison to help you choose the right model.',
    date: 'Oct 3, 2026', read: '6 min read', author: 'XYZ SEO Team',
    body: [
      ['p', 'There is no single right answer, but there is a right answer for your stage, budget and goals. Here is how to think about it.'],
      ['h', 'When an in-house team makes sense'],
      ['p', 'If SEO is your primary growth channel and you publish at high volume, a dedicated in-house team gives you speed and deep product knowledge.'],
      ['h', 'When an agency makes sense'],
      ['p', 'Agencies bring specialists across technical SEO, content and digital PR that would be expensive to hire individually. They are ideal when you need results quickly or lack senior SEO leadership.'],
      ['h', 'The hybrid model'],
      ['p', 'Many growing companies keep a content owner in-house and use an agency for strategy, technical work and link building. It combines control with expertise.'],
    ],
  },
  {
    slug: 'attribution-your-cfo-will-trust',
    category: 'Analytics',
    title: 'Attribution that your CFO will actually trust',
    excerpt: 'Why most attribution reports get ignored — and how to build one leadership relies on.',
    date: 'Sep 24, 2026', read: '7 min read', author: 'XYZ Analytics Team',
    body: [
      ['p', 'Attribution models are only useful if people believe them. The fastest way to lose trust is a report that credits marketing with more revenue than the business actually earned.'],
      ['h', 'Start from the CRM, not the ad platform'],
      ['p', 'Ad platforms each claim credit for the same conversion. Begin with closed revenue in your CRM and work backwards to the touchpoints that influenced it.'],
      ['h', 'Use more than one lens'],
      ['p', 'Combine first-touch, multi-touch and self-reported attribution ("How did you hear about us?"). Where they agree, you can act with confidence.'],
      ['h', 'Report trends, not decimals'],
      ['p', 'Leadership needs direction, not false precision. Show how efficiency is moving over time and what you plan to do about it.'],
    ],
  },
  {
    slug: 'ai-in-marketing-operations',
    category: 'AI',
    title: 'Where AI fits in a modern marketing operation',
    excerpt: 'Five practical places AI saves time today — and two places it still needs a human in the loop.',
    date: 'Sep 15, 2026', read: '5 min read', author: 'XYZ Automation Team',
    body: [
      ['p', 'AI is most valuable when it removes repetitive work so your team can spend more time on strategy and creativity.'],
      ['h', 'Where AI works well today'],
      ['p', 'Research summaries, first drafts of briefs, ad copy variations, lead enrichment and reporting commentary are all areas where AI can save hours each week.'],
      ['h', 'Where humans still matter most'],
      ['p', 'Brand voice, final editorial judgment and anything involving sensitive customer data still need careful human review.'],
      ['q', 'Use AI to go faster, and people to go in the right direction.'],
    ],
  },
  {
    slug: 'landing-page-conversion-checklist',
    category: 'CRO',
    title: 'The 12-point landing page conversion checklist',
    excerpt: 'Small changes that consistently lift conversion rates on paid and organic landing pages.',
    date: 'Sep 2, 2026', read: '6 min read', author: 'XYZ Web Team',
    body: [
      ['p', 'Before you spend more on traffic, make sure the page that receives it is doing its job. These are the checks we run on every landing page.'],
      ['h', 'Message match'],
      ['p', 'The headline should mirror the ad or search query that brought the visitor. If they searched for "B2B SEO agency", say exactly that.'],
      ['h', 'One clear action'],
      ['p', 'Remove competing links and give the page a single primary call to action, repeated at natural decision points.'],
      ['h', 'Speed and trust'],
      ['p', 'Aim for a load time under two seconds and show proof early: results, recognizable logos and short testimonials.'],
    ],
  },
  {
    slug: 'linkedin-ads-for-b2b',
    category: 'Paid Media',
    title: 'LinkedIn Ads for B2B: what works in 2026',
    excerpt: 'Targeting, creative and bidding strategies that keep LinkedIn costs under control.',
    date: 'Aug 20, 2026', read: '7 min read', author: 'XYZ Paid Media Team',
    body: [
      ['p', 'LinkedIn is expensive, but for reaching specific job titles at specific companies, nothing else comes close. The key is spending efficiently.'],
      ['h', 'Narrow audiences, broad creative'],
      ['p', 'Keep audiences tight around your ideal customer profile and test a wide range of creative formats: document ads, short video and thought-leader ads.'],
      ['h', 'Nurture before you ask'],
      ['p', 'Warm up audiences with valuable content before asking for a demo. Retarget engaged viewers with a stronger offer.'],
    ],
  },
]

export const EBOOKS = [
  {
    slug: 'b2b-seo-blueprint',
    title: 'The B2B SEO Blueprint',
    subtitle: 'Turn organic search into your most reliable pipeline channel',
    pages: 42, gradient: ['#1d4ed8', '#38bdf8'],
    summary: 'A step-by-step guide to building an SEO program that drives qualified pipeline, from technical foundations to content clusters and link building.',
    chapters: [
      ['Why SEO compounds', 'Paid traffic stops the moment you stop paying. Organic visibility, once earned, keeps working. This chapter explains how to model SEO as a long-term asset and set realistic expectations with leadership.'],
      ['Technical foundations', 'Crawlability, indexation, site speed and structured data. Fix these first, because content cannot rank on a site search engines struggle to read.'],
      ['Keyword strategy for B2B', 'B2B search volumes are small but valuable. Learn to prioritize keywords by buying intent and fit with your ideal customer profile, not just volume.'],
      ['Building topic clusters', 'Organize content around pillar pages and supporting articles so search engines understand your expertise and visitors find what they need.'],
      ['Earning authority', 'Digital PR, original research and partnerships that earn links naturally — and why buying links is a risk not worth taking.'],
      ['Measuring SEO by revenue', 'Connect organic sessions to pipeline in your CRM so you can report on what matters.'],
    ],
  },
  {
    slug: 'paid-media-playbook',
    title: 'The Paid Media Playbook',
    subtitle: 'Lower your cost per qualified lead across Google, Meta and LinkedIn',
    pages: 36, gradient: ['#4338ca', '#818cf8'],
    summary: 'Our framework for structuring accounts, testing creative and allocating budget toward the campaigns that produce revenue.',
    chapters: [
      ['Set the right goal', 'Optimize for qualified pipeline, not clicks. This chapter shows how to send CRM outcomes back to ad platforms.'],
      ['Account structure', 'Simple structures give algorithms more data to learn from. We share the templates we use for search and social.'],
      ['Creative testing', 'A weekly testing cadence that finds winners fast without wasting budget.'],
      ['Budget allocation', 'How to shift spend toward what works using simple marginal-return thinking.'],
      ['Landing pages', 'Why the page after the click matters as much as the ad itself.'],
    ],
  },
  {
    slug: 'marketing-analytics-guide',
    title: 'Marketing Analytics, Simplified',
    subtitle: 'Build reporting your leadership team trusts',
    pages: 30, gradient: ['#0369a1', '#22d3ee'],
    summary: 'A practical guide to GA4, attribution and dashboards for marketing leaders who want clarity, not complexity.',
    chapters: [
      ['The measurement plan', 'Decide what to measure before you configure any tool. Start with business questions and work backwards.'],
      ['GA4 essentials', 'Events, conversions and audiences that every marketing team should have set up correctly.'],
      ['Connecting the CRM', 'Join marketing touchpoints to opportunities and revenue so reports reflect reality.'],
      ['Attribution without the hype', 'Use several lenses and look for agreement rather than chasing a perfect model.'],
      ['Dashboards that get used', 'Fewer charts, clearer decisions. Templates for executive and channel-level views.'],
    ],
  },
  {
    slug: 'ai-marketing-ops',
    title: 'AI for Marketing Teams',
    subtitle: 'Practical workflows that save hours every week',
    pages: 28, gradient: ['#1e3a8a', '#60a5fa'],
    summary: 'Real-world AI use cases for research, content, campaigns and reporting — plus the guardrails to use them responsibly.',
    chapters: [
      ['Where to start', 'Pick repetitive, low-risk tasks first and measure the time saved.'],
      ['AI for research and briefs', 'Summarize competitors, customer interviews and search results into usable briefs.'],
      ['AI for content and ads', 'Generate drafts and variations, then apply human editing for voice and accuracy.'],
      ['AI for operations', 'Lead enrichment, routing and reporting commentary that run in the background.'],
      ['Guardrails', 'Data privacy, brand safety and review steps that keep AI output trustworthy.'],
    ],
  },
]

export const JOBS = [
  { title: 'Senior SEO Strategist', team: 'SEO', location: 'Remote / Pune', type: 'Full-time' },
  { title: 'Paid Media Manager', team: 'Performance', location: 'New York / Remote', type: 'Full-time' },
  { title: 'Content Marketing Lead', team: 'Content', location: 'Remote', type: 'Full-time' },
  { title: 'Frontend Developer (React)', team: 'Web', location: 'Pune', type: 'Full-time' },
  { title: 'Marketing Analytics Specialist', team: 'Analytics', location: 'Dubai / Remote', type: 'Full-time' },
  { title: 'Marketing Intern', team: 'Growth', location: 'Pune', type: 'Internship' },
]

export const STEPS = [
  { when: 'Weeks 1–2', title: 'Diagnose', text: 'Audit channels, tracking and funnel. Agree on the few metrics that matter.' },
  { when: 'Weeks 3–6', title: 'Design', text: 'Build the channel plan, messaging, creative and measurement framework.' },
  { when: 'Month 2–3', title: 'Deploy', text: 'Launch campaigns and content with a senior pod embedded in your team.' },
  { when: 'Month 4+', title: 'Compound', text: 'Optimize weekly, scale what works, and let results stack month over month.' },
]

export const INDUSTRIES = ['B2B SaaS', 'Healthcare', 'Legal', 'Financial Services', 'E-commerce', 'IT & Technology', 'Education', 'Real Estate']

export const STATS = [
  { value: 250, suffix: '+', label: 'Campaigns launched' },
  { value: 12, suffix: 'M+', label: 'Ad spend managed ($)' },
  { value: 94, suffix: '%', label: 'Client retention' },
  { value: 40, suffix: '+', label: 'Senior specialists' },
]

export const CLIENTS = ['NORTHWIND', 'Lumina', 'BRIGHTPATH', 'Vertex Labs', 'Orbitly', 'HELIX', 'Cobalt & Co', 'Summit Health']

export const VALUES = [
  { icon: 'target', title: 'Outcomes over outputs', text: 'We measure success by pipeline and revenue, not by the number of deliverables shipped.' },
  { icon: 'users', title: 'Senior people, always', text: 'Every account is led by experienced specialists, not handed down to juniors after the pitch.' },
  { icon: 'chart', title: 'Radical transparency', text: 'Shared dashboards, honest reporting and clear recommendations — even when the news is bad.' },
  { icon: 'spark', title: 'Always be testing', text: 'Curiosity drives us. We test, learn and share what we find with our clients and our team.' },
]
