/* All site content lives here. Edit freely. */

/* Partner badges (cropped from the brand partner strip) */
import pClutch from './partner-clutch.png'
import pAws from './partner-aws.png'
import pMicrosoft from './partner-microsoft.png'
import pSalesforce from './partner-salesforce.png'
import pMarketo from './partner-marketo.png'
import pHubspot from './partner-hubspot.png'
import pGoogle from './partner-google.png'

export const COMPANY = {
  name: 'Advotis Agency',
  email: 'contact@advotisagency.com',
  offices: [
    { city: 'Pune', country: 'India', region: 'Maharashtra', postalCode: '411014', street: 'Ashok Plaza, Pune - Nagar Rd, Sakore Nagar, Viman Nagar',
      address: 'Ashok Plaza, Pune - Nagar Rd, Sakore Nagar, Viman Nagar, Pune, Maharashtra 411014, India' },
  ],
  social: [
    { name: 'LinkedIn', icon: 'linkedin', url: 'https://www.linkedin.com/company/advotis-agency/' },
    { name: 'Instagram', icon: 'instagram', url: 'https://www.instagram.com/advotisagency' },
  ],
}

export const SERVICES = [
  {
    slug: 'web-development',
    group: 'development',
    icon: 'globe',
    title: 'Website & CMS Development',
    short: 'High-performance websites on WordPress, Webflow, Shopify, Magento, Squarespace and Concrete5 — built to rank and convert.',
    tags: ['WordPress', 'Webflow', 'Shopify'],
    intro: 'Whatever platform your team prefers, our certified developers build fast, secure, editor-friendly websites with SEO and analytics wired in from day one.',
    deliverables: ['Custom WordPress themes and Gutenberg blocks', 'Webflow builds with CMS collections', 'Shopify and Magento storefronts', 'Squarespace and Concrete5 sites', 'Platform migrations without SEO loss', 'Speed, security and Core Web Vitals tuning'],
    outcomes: ['Sites your team can update in minutes', 'Faster load times and better rankings', 'Higher conversion from every visit'],
  },
  {
    slug: 'web-applications',
    group: 'development',
    icon: 'code',
    title: 'Custom Web Applications',
    short: 'SaaS platforms, portals and dashboards engineered on MERN, MEAN, Next.js and Laravel — secure, scalable and tested.',
    tags: ['MERN', 'MEAN', 'Next.js'],
    intro: 'From MVP to enterprise platform, we design and engineer web applications with clean architecture, automated testing and the scalability to grow with you.',
    deliverables: ['Product discovery and technical architecture', 'MERN and MEAN stack development', 'Next.js, Node.js and Laravel builds', 'REST and GraphQL APIs', 'SaaS multi-tenancy, auth and billing', 'Automated testing and CI/CD'],
    outcomes: ['Launch your MVP in weeks, not months', 'Architecture that scales with users', 'Code your team can own and extend'],
  },
  {
    slug: 'mobile-apps',
    group: 'development',
    icon: 'mobile',
    title: 'Mobile App Development',
    short: 'Native iOS and Android apps plus cross-platform Flutter and React Native apps your users will love.',
    tags: ['Flutter', 'iOS', 'Android'],
    intro: 'We take mobile products from idea to App Store and Google Play — with polished UX, reliable performance and analytics that show how people use your app.',
    deliverables: ['App strategy, UX and UI design', 'Flutter and React Native cross-platform apps', 'Native iOS (Swift) and Android (Kotlin)', 'Backend, APIs and push notifications', 'App Store and Google Play launch', 'App store optimization and growth'],
    outcomes: ['One codebase for iOS and Android', '4.5★+ store ratings', 'Higher retention and engagement'],
  },
  {
    slug: 'ai-development',
    group: 'development',
    icon: 'cpu',
    title: 'AI & ML Solutions',
    short: 'Custom AI assistants, RAG search, predictive models and LLM integrations built into your products and workflows.',
    tags: ['LLM apps', 'RAG', 'Computer vision'],
    intro: 'We turn AI from a buzzword into shipped features — chatbots trained on your data, intelligent search, document automation and predictive analytics.',
    deliverables: ['AI strategy and use-case discovery', 'Custom GPT and LLM-powered assistants', 'RAG knowledge search over your data', 'Document and workflow automation', 'Predictive and recommendation models', 'Secure, private AI deployment'],
    outcomes: ['Hours of manual work automated', 'Smarter products that differentiate', 'AI with guardrails and privacy built in'],
  },
  {
    slug: 'ecommerce-development',
    group: 'development',
    icon: 'cart',
    title: 'E-commerce Development',
    short: 'Shopify, Magento and WooCommerce stores with custom features, integrations and checkout flows that sell.',
    tags: ['Shopify Plus', 'Magento', 'WooCommerce'],
    intro: 'We build online stores that load fast, convert well and connect to your ERP, inventory and marketing stack — then help you grow revenue after launch.',
    deliverables: ['Shopify and Shopify Plus stores', 'Magento (Adobe Commerce) development', 'WooCommerce builds', 'Payment, shipping and ERP integrations', 'Custom apps and checkout extensions', 'Conversion optimization for stores'],
    outcomes: ['Higher conversion rates', 'Automated store operations', 'A platform ready to scale'],
  },
  {
    slug: 'seo',
    group: 'marketing',
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
    group: 'marketing',
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
    group: 'marketing',
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
    group: 'development',
    icon: 'layout',
    title: 'UI/UX & Web Experience',
    short: 'Fast, conversion-focused websites and landing pages on WordPress, Webflow, HubSpot and headless stacks.',
    tags: ['UX / UI', 'Development', 'Landing pages'],
    intro: 'Your website is your best salesperson. We design and build sites that load fast, rank well and make it easy for visitors to become customers.',
    deliverables: ['UX research and information architecture', 'UI design systems', 'WordPress, Webflow, HubSpot and React builds', 'Landing page systems', 'Core Web Vitals and performance', 'Accessibility (WCAG) compliance'],
    outcomes: ['Higher conversion rates', 'Faster page loads', 'A site your team can update easily'],
  },
  {
    slug: 'analytics-cro',
    group: 'marketing',
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
    group: 'marketing',
    icon: 'spark',
    title: 'AI & Marketing Automation',
    short: 'AI agents, lead scoring and lifecycle automation that let a lean team operate like a large one.',
    tags: ['CRM automation', 'AI content ops', 'Lead scoring'],
    intro: 'AI should remove busywork, not add risk. We design automations and AI workflows that save hours every week and improve lead quality.',
    deliverables: ['HubSpot and Salesforce automation', 'Lead scoring and routing', 'AI-assisted content workflows', 'Chatbots and AI assistants', 'Lifecycle email programs', 'Reporting automation'],
    outcomes: ['Hours saved every week', 'Faster speed-to-lead', 'Better-qualified pipeline'],
  },
  {
    slug: 'cloud-hosting',
    group: 'cloud',
    icon: 'cloud',
    title: 'Cloud Hosting & Server Management',
    short: 'Certified engineers who set up, migrate and manage servers on AWS, Cloudways, DigitalOcean, Hostinger and HostGator.',
    tags: ['AWS', 'DigitalOcean', 'Cloudways'],
    intro: 'Our server team keeps your websites and applications fast, secure and online — with 24/7 monitoring, hardened configurations and zero-downtime migrations.',
    deliverables: ['Cloud architecture on AWS and DigitalOcean', 'Managed Cloudways, Hostinger and HostGator setups', 'Zero-downtime server migrations', 'Security hardening, SSL and firewalls', 'CDN, caching and performance tuning', '24/7 uptime monitoring and backups'],
    outcomes: ['99.9%+ uptime', 'Faster sites and lower hosting bills', 'Peace of mind with daily backups'],
  },
  {
    slug: 'devops-maintenance',
    group: 'cloud',
    icon: 'shield',
    title: 'DevOps, Security & Maintenance',
    short: 'CI/CD pipelines, containerization, security patching and care plans that keep every release smooth.',
    tags: ['CI/CD', 'Docker', 'Care plans'],
    intro: 'We automate how code moves from commit to production and keep your platforms patched, monitored and improving every month.',
    deliverables: ['CI/CD with GitHub Actions and GitLab', 'Docker and Kubernetes deployments', 'Infrastructure as code (Terraform)', 'Security audits and patching', 'Website care plans and updates', 'Incident response and SLAs'],
    outcomes: ['Faster, safer releases', 'Fewer incidents and outages', 'Predictable monthly maintenance'],
  },
]

export const SERVICE_GROUPS = [
  { key: 'development', label: 'Software Development', icon: 'code', desc: 'Websites, web apps, mobile apps and AI products engineered to scale.' },
  { key: 'marketing', label: 'Digital Marketing', icon: 'target', desc: 'SEO, paid media, content and analytics measured against revenue.' },
  { key: 'cloud', label: 'Cloud & DevOps', icon: 'cloud', desc: 'Hosting, servers, security and maintenance handled by experts.' },
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
    services: ['Paid Media & Performance', 'UI/UX & Web Experience'],
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
    services: ['UI/UX & Web Experience', 'Analytics & CRO'],
    challenge: 'An outdated, slow website was losing visitors before they ever reached the contact page.',
    solution: 'We redesigned the site around clear service paths, rebuilt it for speed, and ran A/B tests on key forms and CTAs.',
    results: [['+38%', 'conversion rate'], ['1.2s', 'load time'], ['+52%', 'consultation requests']],
  },
]

/* Blog posts live in /posts (one file per batch) — see posts/index.js */
export { POSTS, POST_CATEGORIES, getPostContent, loadPostContent } from './posts/index.js'

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

/* ---------- Careers ----------
   Every opening gets its own page at /careers/<slug>, rendered by one shared template. */
export const JOBS = [
  {
    slug: 'bde-intern',
    title: 'Business Development Executive (BDE) Intern',
    short: 'BDE Intern',
    team: 'Sales',
    icon: 'users',
    location: 'Remote / Hybrid',
    type: 'Internship',
    summary: 'Help us find, qualify and win new clients for our software development and digital marketing services.',
    about: 'You will work directly with our founders and sales leads to build pipeline — researching target accounts, starting conversations on LinkedIn and email, and supporting proposals from first call to signed deal.',
    responsibilities: [
      'Research and build lead lists of companies that need websites, apps or marketing',
      'Run personalised outreach on LinkedIn, email and calls',
      'Qualify leads and book discovery calls for the sales team',
      'Keep the CRM clean and up to date',
      'Help prepare proposals, pitch decks and follow-ups',
    ],
    requirements: [
      'Excellent spoken and written English',
      'Comfortable starting conversations with business owners and managers',
      'Curious about technology, software and digital marketing',
      'Organised, persistent and target-driven',
      'Final-year students and recent graduates welcome',
    ],
    gains: ['Hands-on B2B sales experience across tech and marketing', 'Mentorship from senior sales leaders', 'Certificate and letter of recommendation', 'Chance of a full-time offer based on performance'],
    skills: ['Lead generation', 'LinkedIn', 'CRM', 'Cold outreach', 'Communication'],
  },
  {
    slug: 'ai-engineer-intern',
    title: 'AI Engineer Intern',
    short: 'AI Engineer Intern',
    team: 'Engineering',
    icon: 'cpu',
    location: 'Remote / Hybrid',
    type: 'Internship',
    summary: 'Build real AI features — LLM apps, RAG pipelines and automations — that ship to client products.',
    about: 'You will join our engineering team building AI-powered products for clients and for our own agency: chatbots, document search, content tools and workflow automation using modern LLM APIs.',
    responsibilities: [
      'Build LLM-powered features using APIs such as OpenAI, Anthropic and open-source models',
      'Create retrieval-augmented generation (RAG) pipelines with vector databases',
      'Write prompts, evaluations and tests to improve output quality',
      'Integrate AI features into React / Node.js and Python applications',
      'Document your work and demo it to the team',
    ],
    requirements: [
      'Good programming skills in Python or JavaScript / TypeScript',
      'Basic understanding of machine learning and LLM concepts',
      'Familiarity with REST APIs and Git',
      'A project, GitHub repo or demo you can show us',
      'Students and recent graduates in CS / IT or related fields',
    ],
    gains: ['Ship AI features used by real clients', 'Code reviews from senior engineers', 'Certificate and letter of recommendation', 'Chance of a full-time offer based on performance'],
    skills: ['Python', 'LLMs', 'RAG', 'Node.js', 'Prompt engineering'],
  },
  {
    slug: 'paid-ads-intern',
    title: 'Paid Ads Intern',
    short: 'Paid Ads Intern',
    team: 'Performance Marketing',
    icon: 'target',
    location: 'Remote / Hybrid',
    type: 'Internship',
    summary: 'Learn to plan, launch and optimise Google, Meta and LinkedIn ad campaigns that drive real leads.',
    about: 'You will work inside our performance marketing team — a Google Premier Partner team — helping manage live client campaigns, test creatives and report on results.',
    responsibilities: [
      'Help set up and manage Google Ads, Meta Ads and LinkedIn Ads campaigns',
      'Do keyword and audience research',
      'Write ad copy and brief creative variations for testing',
      'Monitor budgets, CPC, CPL and ROAS daily',
      'Prepare weekly performance reports with insights',
    ],
    requirements: [
      'Strong interest in digital marketing and data',
      'Comfortable with spreadsheets and numbers',
      'Good written English for ad copy',
      'Google Ads or Meta Blueprint certification is a plus',
      'Students and recent graduates welcome',
    ],
    gains: ['Manage real ad budgets under expert guidance', 'Google Ads and Meta certifications support', 'Certificate and letter of recommendation', 'Chance of a full-time offer based on performance'],
    skills: ['Google Ads', 'Meta Ads', 'LinkedIn Ads', 'Excel / Sheets', 'GA4'],
  },
  {
    slug: 'project-manager-intern',
    title: 'Project Manager Intern',
    short: 'Project Manager Intern',
    team: 'Delivery',
    icon: 'layers',
    location: 'Remote / Hybrid',
    type: 'Internship',
    summary: 'Keep client projects on time and on track — from idea and wireframes to launch and marketing.',
    about: 'You will support our project managers across software and marketing projects: planning sprints, running stand-ups, tracking tasks and keeping clients updated.',
    responsibilities: [
      'Plan project timelines, sprints and milestones with the team',
      'Track tasks, risks and blockers in our project management tools',
      'Take notes in client calls and share clear action items',
      'Coordinate between designers, developers and marketers',
      'Prepare status reports for clients and leadership',
    ],
    requirements: [
      'Highly organised with strong attention to detail',
      'Clear communicator in English, written and spoken',
      'Basic understanding of how software or websites are built',
      'Familiarity with tools like Jira, Asana, Trello or Notion is a plus',
      'Students and recent graduates welcome',
    ],
    gains: ['Run real software and marketing projects end to end', 'Agile / Scrum experience', 'Certificate and letter of recommendation', 'Chance of a full-time offer based on performance'],
    skills: ['Agile / Scrum', 'Planning', 'Communication', 'Jira / Asana', 'Reporting'],
  },
  {
    slug: 'freelancer',
    title: 'Join as a Freelancer',
    short: 'Freelancer',
    team: 'Freelance network',
    icon: 'globe',
    location: 'Remote · Worldwide',
    type: 'Freelance',
    freelance: true,
    summary: 'Developers, designers and marketers: join our freelance network and work on client projects on your own schedule.',
    about: 'We regularly bring in trusted freelancers to scale our teams on client projects. Join our network once and we will reach out when a project matches your skills, rate and availability.',
    responsibilities: [
      'Deliver project work to the agreed scope, quality and timeline',
      'Collaborate with our project managers and in-house team',
      'Share regular progress updates',
      'Follow our coding, design or brand guidelines on each project',
    ],
    requirements: [
      'Proven experience in your field with a portfolio to match',
      'Reliable communication and availability during agreed hours',
      'Your own setup and tools to work remotely',
      'We work with: web & app developers, AI engineers, UI/UX designers, SEO & paid ads specialists, content writers and video editors',
    ],
    gains: ['Steady flow of vetted client projects', 'Flexible hours, fully remote', 'On-time payments', 'Long-term collaboration with a growing team'],
    skills: ['Development', 'UI / UX design', 'SEO', 'Paid ads', 'Content', 'Video'],
  },
]

export const STEPS = [
  { when: 'Weeks 1–2', title: 'Diagnose', text: 'Audit channels, tracking and funnel. Agree on the few metrics that matter.' },
  { when: 'Weeks 3–6', title: 'Design', text: 'Build the channel plan, messaging, creative and measurement framework.' },
  { when: 'Month 2–3', title: 'Deploy', text: 'Launch campaigns and content with a senior pod embedded in your team.' },
  { when: 'Month 4+', title: 'Compound', text: 'Optimize weekly, scale what works, and let results stack month over month.' },
]

export const INDUSTRIES = ['B2B SaaS', 'Healthcare', 'Legal', 'Financial Services', 'E-commerce', 'IT & Technology', 'Education', 'Real Estate']

export const STATS = [
  { value: 650, suffix: '+', label: 'Projects delivered' },
  { value: 12, suffix: 'M+', label: 'Ad spend managed ($)' },
  { value: 94, suffix: '%', label: 'Client retention' },
  { value: 85, suffix: '+', label: 'Engineers & marketers' },
]

export const CLIENTS = [
  { name: 'Pustakalay', url: 'https://www.pustakalay.store/', logo: '/client-pustakalay.webp', w: 174, h: 160 },
  { name: 'Raj Rajeshwar Health Care', url: 'https://rajrajeshwar.co.in/', logo: '/client-rajrajeshwar-health-care.webp', w: 570, h: 160 },
  { name: 'BidAsked', url: 'https://bidasked.com/', logo: '/client-bidasked.webp', w: 387, h: 160 },
  { name: 'Dressing Room — Costumes on Rent', url: 'https://dressingrdrapery.in/', logo: '/client-dressing-room.webp', w: 294, h: 160 },
]

export const VALUES = [
  { icon: 'target', title: 'Outcomes over outputs', text: 'We measure success by pipeline and revenue, not by the number of deliverables shipped.' },
  { icon: 'users', title: 'Senior people, always', text: 'Every account is led by experienced specialists, not handed down to juniors after the pitch.' },
  { icon: 'chart', title: 'Radical transparency', text: 'Shared dashboards, honest reporting and clear recommendations — even when the news is bad.' },
  { icon: 'spark', title: 'Always be testing', text: 'Curiosity drives us. We test, learn and share what we find with our clients and our team.' },
]

/* ---------- Extra detail for each single service page ---------- */
const SERVICE_EXTRAS = {
  'web-development': {
    color: '#2563eb',
    tagline: 'Every CMS, one expert team.',
    stats: [['300+', 'websites launched'], ['6', 'CMS platforms mastered'], ['95+', 'target Lighthouse score']],
    why: ['The right platform depends on your team, content and growth plans — not on what an agency happens to know. We are fluent in all the major CMS platforms, so our advice is unbiased.', 'Every build ships with performance, SEO, accessibility and analytics baked in, plus training so your team can publish confidently.'],
    process: [['Discover', 'Audit your current site, content and goals, then recommend the right platform.'], ['Design', 'Wireframes and a component-based UI system tailored to your brand.'], ['Develop', 'Build on WordPress, Webflow, Shopify, Magento, Squarespace or Concrete5 with clean, reusable components.'], ['Launch & care', 'QA, SEO-safe migration, go-live and ongoing care plans.']],
    tools: ['WordPress', 'Webflow', 'Shopify', 'Magento', 'Squarespace', 'Concrete5', 'Elementor', 'HubSpot CMS'],
    faqs: [['Which CMS is right for us?', 'WordPress suits content-heavy sites, Webflow is great for design-led marketing sites, Shopify and Magento power e-commerce, Squarespace fits small teams and Concrete5 works well for in-context editing. We recommend after discovery.'], ['Can you migrate our existing site?', 'Yes — we migrate content, redirects and SEO signals so rankings are protected.'], ['Will we be able to edit the site ourselves?', 'Absolutely. Every build includes an editor-friendly setup and a recorded training session.'], ['Do you provide hosting?', 'Yes. Our server team can host and manage your site on AWS, Cloudways, DigitalOcean, Hostinger or HostGator.']],
  },
  'web-applications': {
    color: '#4f46e5',
    tagline: 'Software that scales with your business.',
    stats: [['120+', 'web apps shipped'], ['8–12 wks', 'typical MVP timeline'], ['99.9%', 'uptime on managed apps']],
    why: ['Off-the-shelf tools rarely fit the way your business actually works. A custom web application removes workarounds and becomes a competitive advantage.', 'Our engineers use proven stacks like MERN and MEAN, with automated tests and CI/CD, so you get speed now and maintainability later.'],
    process: [['Discovery', 'Workshops to define users, features, architecture and a phased roadmap.'], ['UX & prototype', 'Clickable prototypes validated with real users before code is written.'], ['Agile build', 'Two-week sprints with demos, code reviews and automated testing.'], ['Launch & scale', 'Deploy to the cloud, monitor performance and iterate on feedback.']],
    tools: ['MongoDB', 'Express', 'React', 'Angular', 'Node.js', 'Next.js', 'PostgreSQL', 'Laravel', 'GraphQL', 'Docker'],
    faqs: [['What is the MERN / MEAN stack?', 'MERN is MongoDB, Express, React and Node.js; MEAN swaps React for Angular. Both use JavaScript end to end, which makes apps fast to build and easy to maintain.'], ['Do we own the code?', 'Yes. You own 100% of the source code and IP, delivered in your own repository.'], ['Can you take over an existing app?', 'Yes. We start with a code and architecture audit, then stabilize and extend it.'], ['How do you price projects?', 'Fixed-price for well-defined scopes, or a dedicated team on a monthly retainer for evolving products.']],
  },
  'mobile-apps': {
    color: '#0891b2',
    tagline: 'Apps people download — and keep using.',
    stats: [['80+', 'apps published'], ['4.7★', 'avg. store rating'], ['iOS + Android', 'from one codebase']],
    why: ['Your customers spend most of their screen time in apps. A fast, intuitive app keeps your brand in their pocket and drives repeat business.', 'We build with Flutter and React Native for cross-platform speed, or go fully native with Swift and Kotlin when performance demands it.'],
    process: [['Strategy', 'Define the audience, core features and monetization model.'], ['Design', 'Platform-native UX and UI with interactive prototypes.'], ['Develop', 'Flutter, React Native, Swift or Kotlin builds with a secure backend.'], ['Launch & grow', 'Store submission, ASO, analytics and continuous releases.']],
    tools: ['Flutter', 'Dart', 'Swift', 'Kotlin', 'React Native', 'Firebase', 'App Store Connect', 'Google Play Console'],
    faqs: [['Flutter or native?', 'Flutter covers iOS and Android from one codebase and suits most products. Native is best for heavy graphics, advanced hardware access or platform-specific experiences.'], ['How long does an app take?', 'A focused MVP typically takes 10–14 weeks from design to store launch.'], ['Do you handle App Store approval?', 'Yes — we prepare listings, handle submission and respond to review feedback.'], ['Can you market the app too?', 'Yes. Our marketing team runs app store optimization, paid user acquisition and lifecycle campaigns.']],
  },
  'ai-development': {
    color: '#7c3aed',
    tagline: 'AI features that ship — with guardrails.',
    stats: [['40+', 'AI solutions deployed'], ['70%', 'avg. reduction in manual work'], ['2–6 wks', 'to a working prototype']],
    why: ['AI can now read documents, answer questions and make predictions that used to need a human. The winners are the companies that build it into their products and workflows first.', 'We focus on practical, measurable use cases and deploy them securely, with your data staying private.'],
    process: [['Discover', 'Identify high-value use cases and assess data readiness.'], ['Prototype', 'Build a working proof of concept on your real data.'], ['Productionize', 'Harden for accuracy, security, cost and scale.'], ['Monitor', 'Track quality, gather feedback and keep improving the models.']],
    tools: ['OpenAI', 'Anthropic Claude', 'LangChain', 'Python', 'TensorFlow', 'PyTorch', 'Pinecone', 'Hugging Face'],
    faqs: [['Is our data safe?', 'Yes. We use enterprise APIs with no training on your data, or deploy private models in your own cloud.'], ['Do we need a lot of data?', 'Not always. Many LLM solutions work with your existing documents and knowledge base.'], ['Can AI integrate with our existing software?', 'Yes — we connect AI to your CRM, ERP, help desk and internal tools via APIs.'], ['How do you measure success?', 'Against clear KPIs agreed upfront, such as time saved, accuracy or conversion lift.']],
  },
  'ecommerce-development': {
    color: '#db2777',
    tagline: 'Stores built to sell more, every day.',
    stats: [['150+', 'stores launched'], ['+42%', 'avg. conversion lift after rebuild'], ['<2s', 'target page load']],
    why: ['Every second of load time and every extra checkout step costs sales. A well-built store pays for itself quickly.', 'We combine e-commerce engineering with performance marketing, so your store is built to grow — not just to launch.'],
    process: [['Plan', 'Catalog, integrations, payments and platform selection.'], ['Design', 'Conversion-focused product, cart and checkout UX.'], ['Build', 'Theme development, custom apps and system integrations.'], ['Grow', 'Launch, CRO testing and marketing campaigns.']],
    tools: ['Shopify Plus', 'Magento', 'WooCommerce', 'BigCommerce', 'Stripe', 'Klaviyo', 'Google Merchant Center'],
    faqs: [['Shopify or Magento?', 'Shopify is ideal for fast growth with low maintenance; Magento suits complex catalogs and B2B requirements.'], ['Can you migrate our store?', 'Yes — products, customers, orders and SEO redirects are all migrated safely.'], ['Do you integrate with our ERP?', 'Yes, we integrate with common ERP, inventory, shipping and accounting systems.'], ['Do you offer ongoing support?', 'Yes, through monthly care and growth retainers.']],
  },
  'cloud-hosting': {
    color: '#0d9488',
    tagline: 'Fast, secure servers — managed by experts.',
    stats: [['99.99%', 'uptime across managed servers'], ['500+', 'servers under management'], ['24/7', 'monitoring and response']],
    why: ['Slow or unreliable hosting quietly erodes SEO, conversions and trust. Most businesses do not have in-house server expertise to fix it.', 'Our certified team manages infrastructure across AWS, Cloudways, DigitalOcean, Hostinger and HostGator — choosing the right fit for your traffic and budget.'],
    process: [['Assess', 'Review current hosting, performance, security and costs.'], ['Architect', 'Design the right setup — from shared hosting to auto-scaling cloud.'], ['Migrate', 'Zero-downtime migration with full backups and testing.'], ['Manage', '24/7 monitoring, patching, backups and performance tuning.']],
    tools: ['AWS', 'Cloudways', 'DigitalOcean', 'Hostinger', 'HostGator', 'Cloudflare', 'Nginx', 'cPanel'],
    faqs: [['Which hosting provider is best?', 'It depends on traffic, budget and technical needs. AWS and DigitalOcean suit apps and high traffic; Cloudways is great managed hosting; Hostinger and HostGator are cost-effective for smaller sites.'], ['Will migration cause downtime?', 'No. We stage everything, test thoroughly and switch DNS with zero or near-zero downtime.'], ['Do you handle security?', 'Yes — firewalls, SSL, malware scanning, hardening and regular patching are included.'], ['Can you reduce our hosting costs?', 'Often, yes. We right-size servers and add caching and CDN to do more with less.']],
  },
  'devops-maintenance': {
    color: '#0284c7',
    tagline: 'Ship faster. Sleep better.',
    stats: [['10x', 'faster deployments'], ['−60%', 'avg. incident reduction'], ['<1 hr', 'critical response time']],
    why: ['Manual deployments and unpatched systems are the root cause of most outages and security incidents.', 'We automate delivery pipelines and keep every platform maintained, so your team can focus on building features.'],
    process: [['Audit', 'Review pipelines, infrastructure, security and incident history.'], ['Automate', 'Set up CI/CD, containers and infrastructure as code.'], ['Secure', 'Patch, harden and monitor every environment.'], ['Maintain', 'Monthly care plans with SLAs and reporting.']],
    tools: ['GitHub Actions', 'GitLab CI', 'Docker', 'Kubernetes', 'Terraform', 'Grafana', 'Sentry', 'Cloudflare'],
    faqs: [['Do you offer SLAs?', 'Yes — care plans include defined response times for critical, high and normal issues.'], ['Can you work with our in-house developers?', 'Absolutely. We often set up pipelines and tooling that internal teams then use daily.'], ['What does a care plan include?', 'Updates, security patches, backups, uptime monitoring, small fixes and a monthly report.'], ['Do you support legacy systems?', 'Yes, and we can plan a gradual modernization path.']],
  },
  seo: {
    color: '#2563eb',
    tagline: 'Rank for the searches that turn into revenue.',
    stats: [['+180%', 'avg. non-brand traffic growth'], ['1,200+', 'keywords moved into the top 3'], ['6–9 mo', 'to compounding results']],
    why: ['Over two-thirds of B2B buyers start their research on a search engine — and most never click past page one.', 'Unlike paid media, SEO builds an asset. Every page you rank and every link you earn keeps working long after the invoice is paid.'],
    process: [['Audit', 'Crawl the site, benchmark competitors and map every technical and content gap.'], ['Strategy', 'Prioritize keywords by buying intent and build a 6-month topic cluster roadmap.'], ['Execute', 'Ship technical fixes, publish optimized content and launch digital PR every month.'], ['Scale', 'Report on pipeline from organic, double down on winning clusters and expand.']],
    tools: ['Google Search Console', 'GA4', 'Ahrefs', 'Semrush', 'Screaming Frog', 'Surfer', 'Looker Studio'],
    faqs: [['How long does SEO take to work?', 'Most clients see meaningful movement in 3–4 months and compounding pipeline growth by months 6–9, depending on site authority and competition.'], ['Do you write the content too?', 'Yes. Our content team writes briefs and articles, or we can work alongside your in-house writers.'], ['Do you build links?', 'We earn links through digital PR, original research and partnerships. We never buy links.'], ['Can you help with AI search visibility?', 'Yes — we optimize content and entities so your brand is cited in AI answers from tools like ChatGPT, Gemini and Perplexity.']],
  },
  'paid-media': {
    color: '#4f46e5',
    tagline: 'Every dollar of ad spend, accountable to pipeline.',
    stats: [['−37%', 'avg. cost per qualified lead'], ['+62%', 'avg. return on ad spend'], ['$12M+', 'annual spend managed']],
    why: ['Ad platforms are built to spend your budget, not to protect it. Without the right structure and signals, they optimize for cheap clicks instead of customers.', 'We connect campaigns to your CRM so algorithms learn from real revenue, then test relentlessly to lower costs over time.'],
    process: [['Audit', 'Review account structure, tracking, creative and landing pages to find wasted spend.'], ['Rebuild', 'Restructure campaigns around intent and feed CRM conversions back to the platforms.'], ['Test', 'Run a weekly creative and audience testing cadence with clear success criteria.'], ['Scale', 'Shift budget to what works and expand into new channels with confidence.']],
    tools: ['Google Ads', 'Meta Ads', 'LinkedIn Ads', 'TikTok Ads', 'Microsoft Ads', 'GA4', 'HubSpot'],
    faqs: [['What budget do I need?', 'We typically work with monthly ad budgets from $5k upward. We will recommend a test budget based on your goals and market.'], ['Do you create the ads?', 'Yes. Our creative team produces static, video and copy variations for testing every month.'], ['How is your fee structured?', 'A flat monthly management fee based on scope — never a percentage that rewards us for spending more.'], ['How quickly will we see results?', 'Quick wins from fixing waste often show in the first 30 days; sustained efficiency gains build over the first quarter.']],
  },
  'content-social': {
    color: '#0891b2',
    tagline: 'Content your buyers actually want to read and share.',
    stats: [['3x', 'avg. engagement rate lift'], ['40+', 'content pieces per month'], ['+65%', 'avg. share of voice growth']],
    why: ['Buyers complete most of their research before they ever speak to sales. The brands they trust are the ones that taught them something along the way.', 'Consistent, useful content builds that trust — and gives your sales team assets they are proud to send.'],
    process: [['Discover', 'Interview your experts and customers to find the stories only you can tell.'], ['Plan', 'Build a themed editorial calendar across blog, social, video and email.'], ['Produce', 'Write, design and edit content with your brand voice and approvals built in.'], ['Distribute', 'Publish, promote and repurpose every piece across channels — then measure what lands.']],
    tools: ['LinkedIn', 'Instagram', 'YouTube', 'TikTok', 'Canva', 'Figma', 'HubSpot'],
    faqs: [['Can you write in our brand voice?', 'Yes. We start with a voice and tone guide and refine it with your feedback over the first month.'], ['Do you manage our social accounts?', 'We can fully manage publishing and community engagement, or support your in-house team.'], ['Do you produce video?', 'Yes — short-form video, reels and simple explainer videos are part of our content packages.'], ['How do you measure content success?', 'Engagement and reach, but most importantly influenced pipeline and how often sales uses each asset.']],
  },
  'web-experience': {
    color: '#0284c7',
    tagline: 'Websites that load fast, rank well and convert.',
    stats: [['+38%', 'avg. conversion rate lift'], ['95+', 'target Lighthouse score'], ['8–12 wks', 'typical launch timeline']],
    why: ['Your website is often the first and last thing a buyer sees before they contact you. Slow, confusing sites quietly lose deals every day.', 'We design and build sites around how your buyers decide — with speed, accessibility and SEO built in from the start.'],
    process: [['Discover', 'Research your audience, map user journeys and define site goals and structure.'], ['Design', 'Create wireframes and a UI design system that brings your brand to life.'], ['Build', 'Develop on the right platform with performance, SEO and accessibility baked in.'], ['Launch & optimize', 'Migrate safely, launch, and keep improving with data and A/B tests.']],
    tools: ['WordPress', 'Webflow', 'HubSpot CMS', 'React', 'Next.js', 'Figma', 'Vercel'],
    faqs: [['Which platform should we use?', 'It depends on your team and goals. We recommend WordPress, Webflow, HubSpot or a headless React build after discovery.'], ['Will we be able to edit the site ourselves?', 'Yes. Every build includes an editor-friendly setup and a training session for your team.'], ['Will our SEO rankings be affected?', 'We plan redirects and migrations carefully to protect — and usually improve — your existing rankings.'], ['Do you offer ongoing support?', 'Yes, through monthly care plans covering updates, fixes and continuous optimization.']],
  },
  'analytics-cro': {
    color: '#0d9488',
    tagline: 'Know exactly what works — and make it work better.',
    stats: [['100%', 'of spend traced to outcomes'], ['+24%', 'avg. lift from CRO programs'], ['1 view', 'of your full funnel']],
    why: ['Most marketing teams make decisions on incomplete or conflicting data. Platforms over-report, tracking breaks, and leadership loses trust in the numbers.', 'We rebuild measurement from the ground up and use it to run experiments that steadily lift conversion.'],
    process: [['Audit', 'Review tracking, data quality and reporting to find gaps and errors.'], ['Instrument', 'Implement GA4, GTM, server-side tracking and CRM integration properly.'], ['Visualize', 'Build dashboards that answer real business questions for each audience.'], ['Experiment', 'Run a prioritized CRO testing roadmap and roll out the winners.']],
    tools: ['GA4', 'Google Tag Manager', 'Looker Studio', 'BigQuery', 'Hotjar', 'VWO', 'HubSpot'],
    faqs: [['Our tracking is a mess. Where do we start?', 'With an audit. We document what is broken, what matters most and fix it in priority order.'], ['Can you connect ads data to our CRM?', 'Yes — we connect ad platforms, website and CRM so you can see revenue by channel and campaign.'], ['How many A/B tests do you run?', 'It depends on traffic, but most programs run two to four meaningful tests per month.'], ['Which BI tools do you support?', 'Looker Studio, Power BI and Tableau, plus BigQuery for larger data sets.']],
  },
  'ai-automation': {
    color: '#7c3aed',
    tagline: 'Let a lean team operate like a large one.',
    stats: [['20+ hrs', 'saved per team each week'], ['5 min', 'avg. speed-to-lead'], ['+30%', 'avg. lead-to-meeting rate']],
    why: ['Marketing teams lose hours every week to manual reporting, list cleanup and repetitive content tasks — time that should go into strategy.', 'We design practical automations and AI workflows, with the right guardrails, that remove busywork and improve lead quality.'],
    process: [['Map', 'Document your current workflows and find the highest-value automation opportunities.'], ['Design', 'Design workflows, scoring models and AI prompts with clear guardrails.'], ['Build', 'Implement in your CRM and tools, test thoroughly and train your team.'], ['Improve', 'Monitor results, refine models and roll out the next automation.']],
    tools: ['HubSpot', 'Salesforce', 'Zapier', 'Make', 'n8n', 'OpenAI', 'Clay'],
    faqs: [['Is our data safe with AI tools?', 'We design every workflow with data privacy in mind and only use tools and settings that meet your security requirements.'], ['Will AI replace our team?', 'No. Our goal is to remove repetitive work so your team can focus on strategy, creativity and customers.'], ['Which CRM do you work with?', 'Mostly HubSpot and Salesforce, plus many common sales and marketing tools via Zapier, Make or n8n.'], ['How fast can we see value?', 'Most first automations go live within 2–4 weeks and start saving time immediately.']],
  },
}
SERVICES.forEach((s) => Object.assign(s, SERVICE_EXTRAS[s.slug]))

export const HERO_WORDS = ['web applications', 'mobile apps', 'AI products', 'online stores', 'qualified pipeline']

/* ---------- Home page FAQ (also published as FAQPage structured data) ---------- */
export const HOME_FAQS = [
  ['What does Advotis Agency do?', 'Advotis Agency is a software development and digital marketing company. We design and build websites on every major CMS, custom web applications (MERN, MEAN, Next.js, Laravel), Flutter, iOS and Android apps, AI solutions and online stores, host them on managed cloud servers, and grow them with SEO, paid media, content and analytics.'],
  ['Can one agency handle both development and marketing?', 'Yes. One senior team plans, builds, launches and markets your product, so the website or app is built to rank and convert from day one and every channel reports into the same dashboard.'],
  ['How much does a website or app cost with Advotis Agency?', 'It depends on scope. Marketing websites, e-commerce stores, custom web apps and mobile apps are priced as fixed-price projects for clear scopes or as a monthly dedicated team for evolving products. Share your idea and we will send a wireframe plan and estimate.'],
  ['Do you help brands show up in AI search like ChatGPT, Gemini and Google AI Overviews?', 'Yes. Our SEO team covers answer engine optimization (AEO) and generative engine optimization (GEO): technical SEO, structured data, answer-first content and authority building so your brand is cited in AI answers as well as ranking in classic search.'],
  ['Which industries do you work with?', 'We work with B2B SaaS, healthcare, legal, financial services, e-commerce, IT, education and real estate companies across the USA, UAE, India and beyond.'],
  ['How fast can we get started?', 'Most projects start with a free discovery call within one business day of your enquiry, followed by a scoped proposal. Typical MVPs launch in 8–14 weeks, and marketing programs usually show early wins within the first 30–90 days.'],
]

/* ---------- Partners ---------- */
export const PARTNERS = [
  { name: 'Google Premier Partner', img: pGoogle, w: 169, h: 64, featured: true },
  { name: 'AWS Partner Network', img: pAws, w: 178, h: 74 },
  { name: 'Microsoft Partner', img: pMicrosoft, w: 180, h: 44 },
  { name: 'Salesforce Partner', img: pSalesforce, w: 171, h: 74 },
  { name: 'HubSpot Certified Partner', img: pHubspot, w: 150, h: 70 },
  { name: 'Marketo', img: pMarketo, w: 154, h: 60 },
  { name: 'Clutch Top SEO Company', img: pClutch, w: 96, h: 102 },
]

/* ---------- Technology expertise ---------- */
export const CMS_TECH = [
  { name: 'WordPress', short: 'WP', color: '#21759b', desc: 'Custom themes, Gutenberg blocks, WooCommerce' },
  { name: 'Webflow', short: 'Wf', color: '#4353ff', desc: 'Design-led sites with CMS collections' },
  { name: 'Shopify', short: 'Sh', color: '#5e8e3e', desc: 'Storefronts, Shopify Plus and custom apps' },
  { name: 'Magento', short: 'Mg', color: '#ee672f', desc: 'Adobe Commerce for complex catalogs' },
  { name: 'Squarespace', short: 'Sq', color: '#334155', desc: 'Polished sites for lean teams' },
  { name: 'Concrete5', short: 'C5', color: '#1f8fd8', desc: 'In-context editing for enterprises' },
]

export const APP_TECH = [
  { name: 'MERN', short: 'MR', color: '#10b981', desc: 'MongoDB, Express, React, Node.js' },
  { name: 'MEAN', short: 'MN', color: '#dc2626', desc: 'MongoDB, Express, Angular, Node.js' },
  { name: 'AI / ML', short: 'AI', color: '#7c3aed', desc: 'LLM apps, RAG, predictive models' },
  { name: 'Flutter', short: 'Fl', color: '#0ea5e9', desc: 'Cross-platform iOS & Android apps' },
  { name: 'Android', short: 'An', color: '#16a34a', desc: 'Native Kotlin apps' },
  { name: 'iOS', short: 'iOS', color: '#475569', desc: 'Native Swift & SwiftUI apps' },
]

export const MARKETING_TECH = [
  { name: 'SEO', short: 'SEO', color: '#0891b2', desc: 'Technical, on-page and content SEO', to: '/services/seo' },
  { name: 'Google Ads', short: 'GA', color: '#2563eb', desc: 'Search, Performance Max and Shopping', to: '/services/paid-media' },
  { name: 'Meta Ads', short: 'Me', color: '#1877f2', desc: 'Facebook and Instagram campaigns', to: '/services/paid-media' },
  { name: 'LinkedIn Ads', short: 'Li', color: '#0a66c2', desc: 'B2B and account-based advertising', to: '/services/paid-media' },
  { name: 'Social Media', short: 'So', color: '#db2777', desc: 'Content, reels and community management', to: '/services/content-social' },
  { name: 'Analytics', short: 'GA4', color: '#ea580c', desc: 'GA4, tracking and conversion optimisation', to: '/services/analytics-cro' },
]

export const HOSTING = [
  { name: 'AWS', short: 'AWS', color: '#f59e0b', desc: 'EC2, Lightsail, RDS, S3 and auto-scaling architectures' },
  { name: 'Cloudways', short: 'Cw', color: '#2f39bf', desc: 'Managed cloud for WordPress, WooCommerce and PHP apps' },
  { name: 'DigitalOcean', short: 'DO', color: '#0080ff', desc: 'Droplets, Kubernetes and managed databases' },
  { name: 'Hostinger', short: 'Hg', color: '#673de6', desc: 'Cost-effective VPS and business hosting' },
  { name: 'HostGator', short: 'HG', color: '#f97316', desc: 'Shared, VPS and dedicated servers with cPanel' },
]
