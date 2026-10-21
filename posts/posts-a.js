export default [
  // 1
  {
    slug: 'answer-engine-optimization-guide',
    category: 'SEO',
    service: 'seo',
    title: 'Answer Engine Optimization (AEO): How to Get Cited by AI',
    description: "Answer engine optimization (AEO) explained: how ChatGPT, Google AI Mode and Copilot pick sources, and a 30-day plan to get your pages cited by AI.",
    excerpt: "How AI answer engines choose sources, and the content, technical and measurement steps that make your pages the ones they cite.",
    date: '2026-10-20',
    author: 'Advotis SEO Team',
    keywords: ['answer engine optimization', 'AEO', 'how to get cited by AI', 'AI search optimization', 'ChatGPT search citations', 'Google AI Mode optimization'],
    summary: "Answer engine optimization (AEO) is the practice of making your content easy for AI systems like Google AI Mode, ChatGPT search and Microsoft Copilot to find, understand and cite. To get cited, keep pages crawlable and indexed, lead each section with a direct answer, back claims with sources and data, build brand authority off-site, and track citations and AI referrals.",
    takeaways: [
      "AEO is about earning citations inside AI-generated answers, not just ranking in a list of links.",
      "Google says there are no special technical requirements for AI Overviews or AI Mode beyond being indexed and eligible for a snippet.",
      "Answer-first structure, original data and clear sourcing make a passage easy for a model to lift and attribute.",
      "Each AI engine has its own crawler, so robots.txt and firewall rules decide whether you can be cited at all.",
      "Measure AEO with Search Console, GA4 referral data and Bing Webmaster Tools' AI Performance report."
    ],
    body: [
      ['p', "Answer engine optimization (AEO) is the discipline of getting your brand's content selected, quoted and linked inside AI-generated answers. Buyers now ask Google AI Mode, ChatGPT, Perplexity and Copilot full questions and read a synthesized response before they ever see a list of links. If your page is not one of the cited sources, you are invisible at the moment the decision is shaped."],
      ['p', "This guide covers how answer engines pick sources, how to structure pages so they can be quoted, the technical controls that matter, and how to measure results. If you are still sorting out the terminology, start with our explainer on [GEO vs SEO vs AEO](/blog/geo-vs-seo-vs-aeo)."],
      ['h', 'What is answer engine optimization (AEO)?'],
      ['p', "AEO is the practice of optimizing content so AI systems can retrieve it, trust it and cite it as part of a direct answer. It builds on SEO fundamentals but shifts the goal from a ranking position to a citation inside the answer itself."],
      ['p', "An answer engine is any system that responds to a question with a generated answer instead of, or before, a list of results. In 2026 the main ones are Google AI Overviews and AI Mode, ChatGPT search, Perplexity, Microsoft Copilot and Gemini."],
      ['ul', [
        "SEO asks: does my page rank for this query?",
        "AEO asks: is my page one of the sources the AI quotes when it answers this question?",
        "Both depend on the same foundation: crawlable, indexable, genuinely helpful pages."
      ]],
      ['h', 'How do AI answer engines choose which sources to cite?'],
      ['p', "Most answer engines run a retrieval step first, pulling candidate pages from a search index, then generate an answer grounded in the passages they retrieved. Pages that are indexed, relevant to the sub-questions and easy to extract from have the best odds."],
      ['p', "According to [Google's documentation on AI features](https://developers.google.com/search/docs/appearance/ai-features), AI Overviews and AI Mode may use a 'query fan-out' technique, issuing multiple related searches across subtopics to find supporting pages. That means one buyer question can trigger searches for pricing, comparisons, risks and implementation steps, and each is a chance to be cited."],
      ['p', "Google also states that a page only needs to be indexed and eligible to show with a snippet to appear as a supporting link, with no additional technical requirements. OpenAI's publisher FAQ similarly says any public website can appear in ChatGPT search, provided it allows the OAI-SearchBot crawler."],
      ['h', 'How do you structure content so AI engines can quote it?'],
      ['p', "Write so that any single section can stand alone as a complete, accurate answer. Models extract passages, not whole pages, so each passage needs its own context."],
      ['ol', [
        "Phrase H2s as the questions buyers actually ask, such as 'How much does X cost?' or 'Which is better, X or Y?'.",
        "Answer the heading in the first one or two sentences beneath it, then add detail, examples and caveats.",
        "Define key terms explicitly with an 'X is...' sentence so the model has a clean definition to reuse.",
        "Use lists for steps and criteria, and tables for comparisons, pricing tiers and specifications.",
        "Name entities precisely: product names, versions, standards and organizations, not vague references.",
        "Attribute every number to its source in the same sentence, and link to that source."
      ]],
      ['p', "Research supports this approach. The [GEO paper from Princeton and collaborators](https://arxiv.org/abs/2311.09735v3) tested content changes on generative engines and found that adding quotations, statistics and source citations improved visibility, while keyword stuffing performed below the unoptimized baseline."],
      ['q', "Write every section as if it will be read alone, because to an AI engine, it will be."],
      ['h', 'Which technical signals help you get cited by AI?'],
      ['p', "The biggest technical factor is access: if an engine's crawler is blocked, your content cannot be retrieved or cited. Check robots.txt, CDN bot rules and firewall settings for each engine you care about."],
      ['table', {
        head: ['Answer engine', 'What it relies on', 'What to check'],
        rows: [
          ['Google AI Overviews and AI Mode', 'Google Search index (Googlebot)', 'Indexed, snippet-eligible, no blocking nosnippet rules'],
          ['ChatGPT search', 'OAI-SearchBot plus search partners', 'OAI-SearchBot allowed in robots.txt and at the CDN'],
          ['Microsoft Copilot', 'Bing index (Bingbot)', 'Site verified in Bing Webmaster Tools, sitemaps submitted'],
          ['Perplexity', 'PerplexityBot and its own index', 'PerplexityBot allowed, key content in server HTML']
        ]
      }],
      ['ul', [
        "Serve important content in the initial HTML, since several AI crawlers do not execute JavaScript.",
        "Keep structured data accurate and consistent with visible text; Google requires it to match the page.",
        "Maintain fresh XML sitemaps with honest lastmod dates.",
        "Fix redirect chains and broken URLs so cited links resolve."
      ]],
      ['p', "For a deeper walkthrough of crawlers, llms.txt and rendering, see our guide to [technical SEO for AI crawlers](/blog/technical-seo-for-ai-crawlers)."],
      ['h', 'How do you build the authority AI engines trust?'],
      ['p', "AI engines favor sources that are consistently corroborated across the web, so authority is built both on your site and off it. Original information is the strongest lever because it gives a model something it cannot get elsewhere."],
      ['ul', [
        "Publish first-party data, benchmarks, pricing ranges and real implementation details.",
        "Show expertise with named authors or teams, clear editorial standards and visible update dates.",
        "Earn mentions in industry publications, review sites, communities and partner pages.",
        "Keep your Google Business Profile, Merchant Center feeds and company profiles accurate and consistent.",
        "Answer the long-tail follow-up questions competitors skip, since fan-out searches reach them."
      ]],
      ['p', "Google's 2026 marketer guide on SEO in AI search makes the same point, warning against 'commodity content' that only summarizes what already exists and calling trust the most important part of E-E-A-T."],
      ['h', 'How do you measure AEO results?'],
      ['p', "Measure AEO with a mix of citation visibility, referral traffic and downstream conversions, because AI answers often influence buyers without producing a click."],
      ['ul', [
        "Google Search Console: Google says AI Overviews and AI Mode traffic is included in the Performance report under the Web search type.",
        "Google Analytics 4: OpenAI adds 'utm_source=chatgpt.com' to referral links, so ChatGPT visits can be segmented.",
        "Bing Webmaster Tools: the AI Performance report, launched in public preview in early 2026, shows total citations, cited pages and grounding queries for Copilot and Bing AI summaries.",
        "Manual prompt tracking: a fixed set of 20 to 50 buyer questions checked monthly across engines.",
        "Brand signals: branded search volume, direct traffic and demo requests that mention AI tools."
      ]],
      ['tip', "Add a 'How did you hear about us?' field to your lead forms with ChatGPT, Perplexity and Google AI as options. Self-reported attribution often reveals AI influence that analytics cannot see."],
      ['h', 'What should a 30-day AEO plan include?'],
      ['p', "A focused month is enough to fix access issues, upgrade your most valuable pages and set a measurement baseline."],
      ['ol', [
        "Week 1: audit robots.txt, CDN bot rules and indexing for Googlebot, Bingbot, OAI-SearchBot and PerplexityBot.",
        "Week 1: build a list of 30 buyer questions and record which sources each engine cites today.",
        "Week 2: rewrite your top 10 commercial pages with question-led H2s, answer-first paragraphs and comparison tables.",
        "Week 3: add original data, attributed statistics, author details and update dates.",
        "Week 4: set up GA4 segments for AI referrals, verify Bing Webmaster Tools and repeat the citation check."
      ]],
      ['h', 'How Advotis Agency can help'],
      ['p', "Advotis Agency combines technical SEO, content strategy and analytics to make your pages easier for AI engines to find and cite. Explore our [SEO services](/services/seo) or [contact our team](/contact) for an AEO audit of your most important pages."]
    ],
    faqs: [
      ['Is AEO different from SEO?', "AEO builds on SEO but targets a different outcome. SEO aims for ranking positions, while AEO aims for your content to be cited inside AI-generated answers. The technical foundation is shared, but AEO puts more weight on answer-first structure, clear definitions and verifiable sources."],
      ['Do I need special markup or an llms.txt file to appear in AI Overviews?', "No. Google states there are no additional requirements to appear in AI Overviews or AI Mode, and that you do not need special schema or AI text files. Your page must be indexed and eligible to show a snippet."],
      ['How do I get my website cited by ChatGPT?', "Allow OAI-SearchBot in robots.txt and at your CDN, keep key content in server-rendered HTML, and publish clear, well-sourced answers to specific questions. OpenAI says any public site can appear in ChatGPT search but does not guarantee placement."],
      ['How long does AEO take to show results?', "Access fixes can take effect within days once crawlers revisit; OpenAI says robots.txt changes take about 24 hours to register. Content and authority improvements usually take several weeks to months, similar to traditional SEO."]
    ],
    sources: [
      ['Google Search Central — AI features and your website', 'https://developers.google.com/search/docs/appearance/ai-features'],
      ['arXiv — GEO: Generative Engine Optimization (Aggarwal et al.)', 'https://arxiv.org/abs/2311.09735v3'],
      ['OpenAI Help Center — Publishers and developers FAQ', 'https://help.openai.com/en/articles/12627856-publishers-and-developers-faq'],
      ['Google — Navigating the Future of Search: 2026 SEO in AI search guide for marketers', 'https://services.google.com/fh/files/misc/2026_seo_in_ai_search_guide_for_marketers.pdf'],
      ['Koozai — Bing Webmaster Tools launches AI Performance reporting', 'https://www.koozai.com/blog/search-marketing/bing-webmaster-tools-launches-ai-performance-reporting/']
    ]
  },

  // 2
  {
    slug: 'geo-vs-seo-vs-aeo',
    category: 'SEO',
    service: 'seo',
    title: "GEO vs SEO vs AEO: What's the Difference in 2026?",
    description: "GEO vs SEO vs AEO in 2026: clear definitions, a side-by-side comparison and a practical way to prioritize search, answer and generative engine work.",
    excerpt: "Clear definitions of SEO, AEO and GEO, how they overlap, and how to split effort between them without wasting budget.",
    date: '2026-10-13',
    author: 'Advotis SEO Team',
    keywords: ['GEO vs SEO', 'GEO vs SEO vs AEO', 'generative engine optimization', 'answer engine optimization', 'what is GEO', 'AI search optimization'],
    summary: "SEO optimizes pages to rank in search results, AEO optimizes content to be quoted as a direct answer, and GEO (generative engine optimization) optimizes content and brand presence to be cited in AI-generated responses from tools like ChatGPT and Google AI Mode. They share one foundation, so treat AEO and GEO as layers on top of strong SEO, not replacements.",
    takeaways: [
      "SEO, AEO and GEO share the same base: crawlable, indexed, helpful pages.",
      "AEO focuses on being the quoted answer; GEO focuses on visibility across generative AI responses.",
      "Peer-reviewed GEO research found that adding citations, quotations and statistics raised visibility, while keyword stuffing did not.",
      "Google says AI Overviews and AI Mode need no special optimization beyond normal SEO best practices.",
      "Budget should follow buyer behavior: fix SEO foundations first, then layer answer and generative work."
    ],
    body: [
      ['p', "GEO vs SEO vs AEO is one of the most common questions marketing leaders ask in 2026, and the acronyms often get used interchangeably. They are related but not identical. Understanding the difference helps you brief agencies, set the right KPIs and avoid paying twice for the same work."],
      ['p', "The short version: SEO earns rankings, AEO earns direct answers and GEO earns citations in generative AI responses. All three start from the same technical and content foundation."],
      ['h', 'What is the difference between SEO, AEO and GEO?'],
      ['p', "SEO targets ranked results, AEO targets the single direct answer, and GEO targets mentions and citations inside AI-generated responses. They differ mainly in the surface they aim for and how success is measured."],
      ['table', {
        head: ['', 'SEO', 'AEO', 'GEO'],
        rows: [
          ['Full name', 'Search engine optimization', 'Answer engine optimization', 'Generative engine optimization'],
          ['Primary goal', 'Rank pages in search results', 'Be the quoted direct answer', 'Be cited or mentioned in AI-generated responses'],
          ['Main surfaces', 'Google and Bing organic results', 'AI Overviews, featured answers, voice assistants', 'ChatGPT, Google AI Mode, Perplexity, Copilot, Gemini'],
          ['Unit of optimization', 'Page and site', 'Passage and question', 'Passage, entity and brand'],
          ['Key metrics', 'Rankings, clicks, organic conversions', 'Answer ownership, snippet visibility', 'Citations, share of AI voice, AI referrals'],
          ['Core tactics', 'Technical health, content, links', 'Question-led headings, concise answers', 'Original data, sourcing, off-site mentions']
        ]
      }],
      ['h', 'What is SEO in 2026?'],
      ['p', "SEO is the practice of improving a website so search engines can crawl, index and rank it for relevant queries. In 2026 it remains the foundation, because most AI answer systems retrieve from search indexes before they generate a response."],
      ['ul', [
        "Technical SEO: crawlability, indexing, rendering, site speed and structured data.",
        "Content SEO: pages that match search intent and demonstrate real expertise.",
        "Off-page SEO: links, mentions and reputation signals from other sites."
      ]],
      ['p', "Google's own guidance on [AI features and your website](https://developers.google.com/search/docs/appearance/ai-features) says the same SEO best practices apply to AI Overviews and AI Mode, and that no additional technical requirements exist beyond being indexed and snippet-eligible."],
      ['p', "What has changed is the shape of the queries. Google's 2026 guide for marketers reports that early AI Mode testers wrote queries two to three times longer than traditional searches. Longer, more specific questions reward pages that cover a topic in depth and anticipate follow-ups, which is where SEO starts to blend into AEO and GEO."],
      ['h', 'What is AEO?'],
      ['p', "AEO, or answer engine optimization, is the practice of structuring content so a system can extract it as a direct answer to a specific question. The term predates generative AI, starting with featured snippets and voice assistants, and now applies to AI answers too."],
      ['ul', [
        "Phrase headings as real questions.",
        "Answer in the first one or two sentences, then elaborate.",
        "Use definitions, numbered steps and tables that can be lifted cleanly.",
        "Write FAQ answers that make sense without the surrounding page."
      ]],
      ['p', "Our [answer engine optimization guide](/blog/answer-engine-optimization-guide) covers AEO tactics and measurement in depth."],
      ['h', 'What is GEO?'],
      ['p', "GEO, or generative engine optimization, is the practice of increasing how often and how prominently your content and brand appear in responses from generative AI systems. The term was formalized in a 2023 research paper by Aggarwal and colleagues from Princeton and other institutions."],
      ['p', "In that [GEO paper](https://arxiv.org/abs/2311.09735v3), the authors report that optimization methods boosted visibility in generative engine responses by up to 40%. Adding quotations, statistics and source citations were among the strongest methods, while keyword stuffing scored below the unoptimized baseline. The study also found that lower-ranked sources gained the most, which suggests GEO can help challengers compete with incumbents."],
      ['p', "GEO extends beyond your own pages. Generative systems form a view of your brand from reviews, forums, news coverage and partner sites, so off-site presence matters more than in classic SEO."],
      ['q', "SEO gets you into the index; GEO gets you into the answer."],
      ['h', 'Do you need separate strategies for SEO, AEO and GEO?'],
      ['p', "No. You need one search strategy with three layers, because the same pages and signals serve all three. Splitting them into separate teams or vendors usually creates duplicated work and conflicting content."],
      ['ol', [
        "Foundation (SEO): make sure every important page is crawlable, indexed, fast and server-rendered.",
        "Answer layer (AEO): restructure key pages around buyer questions with answer-first sections.",
        "Generative layer (GEO): add original data, attributed sources and off-site authority so AI systems trust and cite you.",
        "Measurement layer: track rankings, AI citations and conversions in one report."
      ]],
      ['h3', 'Example: one buyer question across all three layers'],
      ['p', "Imagine a CTO searching 'How much does it cost to migrate a monolith to microservices?'. Each layer handles a different part of winning that moment."],
      ['ul', [
        "SEO: your migration guide is indexed, loads fast and ranks on page one for the query and its variants.",
        "AEO: the guide opens with a direct cost-range answer, followed by a table of cost drivers that can be quoted cleanly.",
        "GEO: your pricing data is cited by industry publications and community threads, so AI systems see it corroborated and name your firm in their answers."
      ]],
      ['p', "Where the layers do diverge is in measurement. Classic SEO reports on rankings and clicks, while GEO needs citation tracking across several engines, which most rank trackers were not built for."],
      ['h', 'How should you prioritize budget between SEO, AEO and GEO?'],
      ['p', "Prioritize by where your buyers research and where your gaps are largest. A site with indexing problems should not be spending on GEO yet."],
      ['table', {
        head: ['Your situation', 'Where to focus first', 'Why'],
        rows: [
          ['Pages not indexed or slow', 'SEO foundations', 'AI engines retrieve from indexes; unindexed pages cannot be cited'],
          ['Good rankings, falling clicks', 'AEO restructuring', 'You need to own the answer when clicks decline'],
          ['Competitors named in ChatGPT answers, you are not', 'GEO and digital PR', 'AI systems lean on off-site corroboration'],
          ['Complex B2B sale with long research', 'All three, AEO-led', 'Buyers ask many follow-up questions across tools']
        ]
      }],
      ['p', "Context matters for expectations, too. [Pew Research Center](https://www.pewresearch.org/short-reads/2025/07/22/google-users-are-less-likely-to-click-on-links-when-an-ai-summary-appears-in-the-results/) found that in March 2025, users clicked a traditional search result on 8% of visits when an AI summary appeared, compared with 15% when none appeared. Visibility inside the answer is becoming as important as the click."],
      ['tip', "Before buying a GEO tool, ask ChatGPT, Perplexity and Google AI Mode ten of your highest-value buyer questions and record which brands are cited. That free baseline tells you whether your problem is SEO, AEO or GEO."],
      ['h', 'Which GEO myths should you ignore?'],
      ['p', "Several popular tactics have little evidence behind them. Treat them with caution and test before investing."],
      ['ul', [
        "Myth: you need a special file or markup to appear in AI answers. Google says no special schema or AI text files are required.",
        "Myth: keyword density drives AI citations. The GEO research found keyword stuffing underperformed.",
        "Myth: GEO replaces SEO. Most AI systems still retrieve from search indexes.",
        "Myth: AI visibility cannot be measured. Search Console, GA4 referrals and Bing Webmaster Tools' AI reporting all provide signals."
      ]],
      ['h', 'Next steps'],
      ['p', "Advotis Agency runs SEO, AEO and GEO as one integrated program so you get visibility in search results and AI answers without paying twice. See our [SEO services](/services/seo) or [contact our team](/contact) to benchmark your AI visibility against competitors."]
    ],
    faqs: [
      ['Is GEO replacing SEO?', "No. GEO builds on SEO because most generative AI systems retrieve information from search indexes before generating answers. If your pages are not crawlable and indexed, GEO tactics have nothing to work with."],
      ['What is the main difference between AEO and GEO?', "AEO focuses on structuring content so it can be extracted as a direct answer to a specific question. GEO is broader and covers how often your content and brand appear and are cited across generative AI responses, including signals from other websites."],
      ['Does structured data help with GEO?', "Structured data helps search engines understand your pages, and Google requires it to match visible content. However, Google says no special schema is needed to appear in AI Overviews or AI Mode, so treat structured data as a clarity aid rather than a shortcut."],
      ['How do you measure GEO success?', "Track how often your brand is cited across a fixed set of prompts in ChatGPT, Perplexity, Google AI Mode and Copilot. Combine that with AI referral traffic in analytics, Bing Webmaster Tools citation data and conversions from those visits."]
    ],
    sources: [
      ['arXiv — GEO: Generative Engine Optimization (Aggarwal et al.)', 'https://arxiv.org/abs/2311.09735v3'],
      ['Google Search Central — AI features and your website', 'https://developers.google.com/search/docs/appearance/ai-features'],
      ['Pew Research Center — Google users are less likely to click on links when an AI summary appears in the results', 'https://www.pewresearch.org/short-reads/2025/07/22/google-users-are-less-likely-to-click-on-links-when-an-ai-summary-appears-in-the-results/'],
      ['Google — Navigating the Future of Search: 2026 SEO in AI search guide for marketers', 'https://services.google.com/fh/files/misc/2026_seo_in_ai_search_guide_for_marketers.pdf']
    ]
  },

  // 3
  {
    slug: 'google-ai-mode-zero-click-search',
    category: 'SEO',
    service: 'seo',
    title: 'Google AI Mode and Zero-Click Search: What to Do Now',
    description: "Google AI Mode and zero-click search are reshaping organic traffic in 2026. See what the data shows and seven practical moves to protect your pipeline.",
    excerpt: "What AI Mode and rising zero-click searches mean for organic traffic, and seven moves to protect visibility and leads.",
    date: '2026-10-06',
    author: 'Advotis SEO Team',
    keywords: ['Google AI Mode', 'zero-click search', 'AI Mode SEO', 'zero-click searches 2026', 'AI Overviews traffic', 'organic traffic decline'],
    summary: "Google AI Mode is a conversational search experience that answers complex questions with an AI-generated response and supporting links. Combined with AI Overviews, it is pushing more searches to end without a click. To respond, make pages citable, target questions AI cannot fully answer, strengthen brand demand, and measure conversions and visibility rather than clicks alone.",
    takeaways: [
      "Google says AI Mode passed one billion monthly users by I/O 2026 and now defaults to Gemini 3.5 Flash.",
      "SparkToro data reported by Search Engine Land found 68% of US Google searches ended without a click in early 2026.",
      "Simple factual pages are most exposed; pages with original data, tools and first-hand expertise hold value.",
      "AI Mode and AI Overviews traffic is reported inside Search Console's Web search type, not separately.",
      "Success metrics should shift from raw clicks toward visibility, branded demand and conversions."
    ],
    body: [
      ['p', "Google AI Mode and zero-click search are the two forces reshaping organic traffic in 2026. AI Mode answers complex questions in a conversational, AI-generated format, and more searches now end on Google without a visit to any website. For businesses that rely on organic leads, the response is not to panic but to change what you publish and how you measure it."],
      ['h', 'What is Google AI Mode?'],
      ['p', "Google AI Mode is a conversational search experience that answers complex, multi-part questions with an AI-generated response and links to supporting websites. It is designed for queries that need exploration, reasoning or comparison."],
      ['p', "According to [Google's documentation](https://developers.google.com/search/docs/appearance/ai-features), AI Mode and AI Overviews may use query fan-out, running multiple related searches across subtopics to assemble a response. At Google I/O 2026 in May, Google said AI Mode had surpassed one billion monthly users and that Gemini 3.5 Flash had become its default model worldwide, as [reported by PPC Land](https://ppc.land/google-search-gets-agents-a-new-search-box-and-gemini-3-5-at-i-o-2026/)."],
      ['ul', [
        "AI Overviews: a short AI summary shown at the top of some regular search results.",
        "AI Mode: a dedicated conversational experience for deeper, follow-up driven research.",
        "Search agents: announced at I/O 2026, including information agents that monitor the web and agentic booking for local services."
      ]],
      ['h3', 'What the I/O 2026 changes mean for businesses'],
      ['p', "Google also introduced a redesigned search box that accepts text, images, files, videos and browser tabs, and lets users ask follow-up questions from an AI Overview that carry into AI Mode. The practical effect is that more of the research journey happens inside Google before a buyer chooses which site to visit."],
      ['ul', [
        "Local service businesses should expect more bookings to start inside Google's agentic flows.",
        "Publishers and B2B brands should expect fewer early-stage informational clicks and more late-stage, high-intent visits.",
        "Anyone tracking leads should note that agent-driven activity may not appear in traditional attribution reports."
      ]],
      ['h', 'What is zero-click search and how big is it in 2026?'],
      ['p', "Zero-click search is a search that ends without the user clicking through to any website. In 2026 it describes the majority of Google searches in the US."],
      ['p', "SparkToro's study, using Similarweb clickstream data and [reported by Search Engine Land](https://searchengineland.com/google-zero-click-searches-2026-study-479717), found that 68.01% of US Google searches from January to April 2026 ended without a click, up from 60.45% in its 2024 study. The same report noted that only 0.34% of searches in the study period moved into AI Mode, so most of the shift is happening on the main results page."],
      ['p', "Earlier research points the same way. Pew Research Center found in March 2025 that users clicked a traditional result on 8% of visits when an AI summary appeared, versus 15% when none appeared."],
      ['h', 'How does AI Mode change which pages get traffic?'],
      ['p', "AI Mode and AI Overviews absorb simple, factual questions and send the remaining clicks to pages that offer depth, tools or first-hand perspective. Traffic is redistributed, not just reduced."],
      ['p', "Google's 2026 guide for marketers states that total organic click volume has been roughly stable year over year and that traffic is shifting between sites, with forums, videos and first-hand perspectives gaining. Treat that as Google's view, and check it against your own data."],
      ['p', "In practice, the clicks that survive tend to come from people further along in their decision. A buyer who has already read an AI summary of your category and still clicks through is often comparing vendors or ready to act, so the page they land on needs clear proof, pricing context and an obvious next step."],
      ['table', {
        head: ['Page type', 'Exposure to zero-click', 'What to do'],
        rows: [
          ['Definitions and simple facts', 'High', 'Consolidate, add depth or accept as a visibility play'],
          ['Generic how-to guides', 'High', 'Add original examples, templates and expert detail'],
          ['Comparisons and buying guides', 'Medium', 'Add first-hand testing, pricing and decision criteria'],
          ['Calculators, tools and configurators', 'Low', 'Invest and promote; AI cannot replace interaction'],
          ['Case studies and original research', 'Low', 'Publish more; these earn citations and links'],
          ['Service and product pages', 'Low to medium', 'Strengthen proof, pricing clarity and conversion paths']
        ]
      }],
      ['h', 'What should you do now? Seven practical moves'],
      ['p', "Focus on being cited where answers are generated and on owning the clicks that remain. These seven moves cover both."],
      ['ol', [
        "Audit query exposure: in Search Console, find pages where impressions are stable but CTR has fallen, a common sign of AI answers absorbing the click.",
        "Make pages citable: lead each section with a direct answer, define terms and attribute data. Our [AEO guide](/blog/answer-engine-optimization-guide) covers the details.",
        "Target follow-up questions: AI Mode users ask longer, more specific questions, so cover the second and third questions buyers ask.",
        "Build interactive assets: calculators, ROI tools, checklists and configurators give users a reason to click.",
        "Strengthen brand demand: branded searches still lead to your site, so invest in content, social and PR that make buyers search for you by name.",
        "Keep business data current: Google recommends maintaining Merchant Center and Business Profile information, which feeds shopping and local answers.",
        "Diversify channels: combine organic with [paid media](/services/paid-media), email and social so no single surface controls your pipeline."
      ]],
      ['q', "When the answer moves onto the results page, your brand has to move into the answer."],
      ['h', 'How should you measure success when clicks fall?'],
      ['p', "Measure visibility, demand and revenue together, because clicks alone now understate organic search's influence. A flat click line with rising conversions is a healthy result in 2026."],
      ['ul', [
        "Search Console impressions and average position for priority queries, since AI Mode and AI Overviews data is included in the Web search type.",
        "Conversion rate and revenue from organic landing pages in Google Analytics.",
        "Branded search volume and direct traffic trends.",
        "Citation share across a fixed set of buyer prompts in AI Mode, ChatGPT and Perplexity.",
        "Self-reported attribution on lead forms."
      ]],
      ['tip', "Create a Search Console comparison of the last three months against the same period last year, filtered to pages with more than 1,000 impressions. Sort by CTR change to find the pages most affected by AI answers in minutes."],
      ['h', 'Should you block Google from using your content in AI Mode?'],
      ['p', "For most businesses, no. Google treats AI features as part of Search, so you cannot block AI Mode with robots.txt without also limiting your presence in regular search."],
      ['p', "Google provides preview controls such as nosnippet, data-nosnippet, max-snippet and noindex to limit what is shown. Separately, Google points publishers to the Google-Extended token to limit use of their content for AI training and grounding in Google's other systems, which is a different control from Search visibility. Use restrictive controls only for content where visibility in answers clearly harms your business, such as paywalled research."],
      ['ul', [
        "Use data-nosnippet for specific passages you do not want quoted.",
        "Use max-snippet to cap preview length on sensitive pages.",
        "Review the trade-off: less exposure in answers usually means less visibility overall."
      ]],
      ['h', 'Next steps'],
      ['p', "Advotis Agency helps teams audit AI Mode exposure, restructure content for citations and rebuild reporting around visibility and revenue. Explore our [SEO services](/services/seo) or [contact our team](/contact) for a zero-click impact review."]
    ],
    faqs: [
      ['Is Google AI Mode reducing website traffic?', "It changes where traffic goes. Third-party studies show fewer clicks when AI summaries appear, while Google says overall organic clicks have been roughly stable and shifting between sites. The effect varies by query type, so check your own Search Console data."],
      ['How do I get my site cited in Google AI Mode?', "Your page must be indexed and eligible to show a snippet; Google says no special markup is required. Beyond that, answer specific questions clearly, add original data and expertise, and cover the follow-up questions buyers ask."],
      ['Can I see AI Mode traffic in Search Console?', "Partly. Google says AI Mode and AI Overviews clicks and impressions are counted in the Performance report under the Web search type, but they are not broken out as a separate filter."],
      ['What percentage of Google searches are zero-click in 2026?', "SparkToro's study, reported by Search Engine Land, found that 68.01% of US Google searches from January to April 2026 ended without a click. That was up from 60.45% in its 2024 study."]
    ],
    sources: [
      ['Search Engine Land — Google zero-click searches hit 68% in early 2026: Study', 'https://searchengineland.com/google-zero-click-searches-2026-study-479717'],
      ['PPC Land — Google Search gets agents, a new search box, and Gemini 3.5 at I/O 2026', 'https://ppc.land/google-search-gets-agents-a-new-search-box-and-gemini-3-5-at-i-o-2026/'],
      ['Google Search Central — AI features and your website', 'https://developers.google.com/search/docs/appearance/ai-features'],
      ['Pew Research Center — Google users are less likely to click on links when an AI summary appears in the results', 'https://www.pewresearch.org/short-reads/2025/07/22/google-users-are-less-likely-to-click-on-links-when-an-ai-summary-appears-in-the-results/'],
      ['Google — Navigating the Future of Search: 2026 SEO in AI search guide for marketers', 'https://services.google.com/fh/files/misc/2026_seo_in_ai_search_guide_for_marketers.pdf']
    ]
  },

  // 4
  {
    slug: 'technical-seo-for-ai-crawlers',
    category: 'SEO',
    service: 'seo',
    title: 'Technical SEO for AI Crawlers: llms.txt, Schema and Rendering',
    description: "Technical SEO for AI crawlers: which bots to allow in robots.txt, whether llms.txt and schema help, and why server-rendered HTML matters for AI search.",
    excerpt: "Robots.txt rules, llms.txt, schema and JavaScript rendering: the technical checklist that decides whether AI engines can read your site.",
    date: '2026-09-28',
    author: 'Advotis SEO Team',
    keywords: ['technical SEO for AI crawlers', 'AI crawlers robots.txt', 'llms.txt', 'OAI-SearchBot', 'GPTBot', 'schema markup for AI search', 'JavaScript rendering AI crawlers'],
    summary: "Technical SEO for AI crawlers means making sure bots like Googlebot, OAI-SearchBot, Bingbot and PerplexityBot can access, render and understand your pages. Allow the search crawlers you want citations from, decide separately on training bots like GPTBot, serve key content in server HTML, keep schema accurate, and treat llms.txt as optional rather than a ranking requirement.",
    takeaways: [
      "AI search crawlers and AI training crawlers are separate bots; you can allow one and block the other.",
      "Vercel's analysis found major AI crawlers such as GPTBot and ClaudeBot did not execute JavaScript, so server-rendered HTML matters.",
      "Google says no special AI text files or schema are needed for AI Overviews or AI Mode.",
      "llms.txt is an optional convention, useful mainly for documentation and agent-facing sites.",
      "Google ended FAQ rich results in May 2026, but accurate structured data still helps machines understand pages."
    ],
    body: [
      ['p', "Technical SEO for AI crawlers is the work of making sure AI systems can access, render and understand your website. If a crawler cannot reach or read your content, no amount of great writing will get you cited in ChatGPT, Perplexity or Google AI Mode. This guide covers the decisions that matter in 2026: robots.txt, rendering, llms.txt and schema."],
      ['h', 'What is technical SEO for AI crawlers?'],
      ['p', "It is the set of technical controls that determine whether AI-powered search and assistant systems can crawl, render and interpret your pages. It extends classic technical SEO to a wider set of bots with different capabilities."],
      ['ul', [
        "Access: robots.txt, CDN bot management and firewall rules.",
        "Rendering: whether content exists in the initial HTML or only after JavaScript runs.",
        "Understanding: semantic HTML, structured data and clear page structure.",
        "Hygiene: status codes, redirects, canonicals and sitemaps."
      ]],
      ['h', 'Which AI crawlers should you allow in robots.txt?'],
      ['p', "Allow the search and retrieval crawlers for any engine where you want to be cited, and make a separate business decision about training crawlers. Most AI companies now publish distinct user agents for each purpose."],
      ['table', {
        head: ['User agent', 'Operator', 'Purpose', 'Blocking it means'],
        rows: [
          ['Googlebot', 'Google', 'Search indexing, including AI Overviews and AI Mode', 'Removal from Google Search and its AI features'],
          ['Google-Extended', 'Google', 'Control token for Gemini training and grounding', 'No effect on Google Search inclusion or ranking'],
          ['OAI-SearchBot', 'OpenAI', 'Surfacing sites in ChatGPT search', 'Not shown in ChatGPT search answers'],
          ['GPTBot', 'OpenAI', 'Collecting data for model training', 'Content not used to train OpenAI foundation models'],
          ['ChatGPT-User', 'OpenAI', 'User-initiated page visits', 'robots.txt may not apply to user-initiated actions'],
          ['Bingbot', 'Microsoft', 'Bing index, which grounds Copilot', 'Reduced Bing and Copilot visibility'],
          ['PerplexityBot', 'Perplexity', 'Indexing for Perplexity search', 'Reduced Perplexity visibility']
        ]
      }],
      ['p', "These roles come from [OpenAI's crawler documentation](https://developers.openai.com/api/docs/bots), Google's list of common crawlers and Perplexity's bot documentation. OpenAI notes it can take about 24 hours for robots.txt changes to take effect in its systems."],
      ['ol', [
        "List every engine where you want visibility and the crawler each one uses.",
        "Check robots.txt for blanket Disallow rules or wildcard blocks that catch AI bots.",
        "Review CDN and WAF settings; one-click 'block AI bots' features often block search crawlers too.",
        "Decide on training bots like GPTBot and Google-Extended as a separate content licensing choice.",
        "Verify in server logs that the bots you allow are actually fetching pages successfully."
      ]],
      ['h3', 'A sample robots.txt policy'],
      ['p', "A common 2026 policy for a business site is to allow search and retrieval while opting out of model training. In robots.txt that looks like separate groups for each user agent."],
      ['ul', [
        "User-agent: OAI-SearchBot with Allow: / so ChatGPT search can cite your pages.",
        "User-agent: PerplexityBot with Allow: / for Perplexity visibility.",
        "User-agent: GPTBot with Disallow: / to opt out of OpenAI model training.",
        "User-agent: Google-Extended with Disallow: / to opt out of Gemini training and grounding without affecting Google Search.",
        "Keep your normal Googlebot and Bingbot rules unchanged, and list your XML sitemap URL at the end of the file."
      ]],
      ['p', "Remember that robots.txt is a request, not an enforcement mechanism. OpenAI and Google publish IP ranges for their crawlers, so you can verify that traffic claiming to be a given bot is genuine before allowing or blocking it at the firewall."],
      ['h', 'Do AI crawlers render JavaScript?'],
      ['p', "Many do not. If your content only appears after client-side JavaScript runs, several AI crawlers will see an empty or partial page."],
      ['p', "[Vercel's analysis of AI crawler traffic](https://vercel.com/blog/the-rise-of-the-ai-crawler), published in December 2024 with MERJ, found that none of the major AI crawlers it studied, including those from OpenAI, Anthropic, Meta, ByteDance and Perplexity, rendered JavaScript. Gemini benefits from Googlebot's rendering infrastructure. Vercel also observed that ChatGPT's and Claude's crawlers hit 404 pages on roughly a third of their requests, compared with about 8% for Googlebot."],
      ['ul', [
        "Serve core content, headings, links and structured data in the initial HTML response.",
        "Use server-side rendering or static generation for marketing, product and content pages.",
        "Keep URLs stable and redirects tidy so AI crawlers do not waste requests on dead links.",
        "Test by fetching pages with JavaScript disabled or with curl to see what a non-rendering bot receives."
      ]],
      ['p', "If your site is built with React, our guide to [JavaScript SEO with SSR and SSG](/blog/javascript-seo-react-ssr-ssg) explains how to fix rendering without a full rebuild."],
      ['h', 'What is llms.txt and do you need one?'],
      ['p', "llms.txt is a proposed markdown file placed at a site's root that gives AI systems a concise summary of the site and links to its most useful content. It is optional, and no major search engine has said it uses the file as a ranking signal."],
      ['p', "The [llms.txt proposal](https://llmstxt.org/) was published by Jeremy Howard of Answer.AI in September 2024. Only an H1 with the site name is required; a summary blockquote and H2 sections of links are optional. The proposal also suggests offering clean markdown versions of pages at the same URL with .md appended."],
      ['p', "Google's documentation states that you do not need new machine-readable files or AI text files to appear in AI Overviews or AI Mode. In May 2026, Google added an llms.txt check to Lighthouse's agentic browsing audits, which flags server errors but marks a missing file as not applicable."],
      ['table', {
        head: ['Site type', 'llms.txt value', 'Recommendation'],
        rows: [
          ['Developer docs and APIs', 'High', 'Publish one, with markdown page versions'],
          ['SaaS with help center', 'Medium', 'Worth adding for agent and assistant use'],
          ['Marketing and service sites', 'Low', 'Optional; fix crawl access and rendering first'],
          ['E-commerce catalogs', 'Low', 'Focus on product feeds and structured data instead']
        ]
      }],
      ['h', 'Does schema markup help AI search?'],
      ['p', "Structured data helps machines understand what a page is about, but it is not a shortcut to AI citations. Google says no special schema is required for its AI features, and markup must match the visible content of the page."],
      ['p', "The schema landscape is shifting. As reported by PPC Land, Google stopped showing FAQ rich results for all sites on May 7, 2026. Existing FAQPage markup causes no errors, and other engines may still read it, but it no longer earns a Google rich result."],
      ['ul', [
        "Prioritize Organization, Product, Article, LocalBusiness, Event and JobPosting where they genuinely apply.",
        "Use JSON-LD, which Google's structured data guide recommends as the easiest format to maintain.",
        "Validate with the Rich Results Test and monitor Search Console reports after deployment.",
        "Never mark up content users cannot see."
      ]],
      ['tip', "Run curl -A with the OAI-SearchBot or PerplexityBot user agent against your top pages. If the response is a 403, a challenge page or an empty app shell, you have found a visibility problem in seconds."],
      ['h', 'What does an AI crawler technical checklist look like?'],
      ['p', "Use this checklist quarterly or after any CDN, framework or hosting change."],
      ['ol', [
        "Robots.txt allows Googlebot, Bingbot, OAI-SearchBot and PerplexityBot on public content.",
        "CDN and firewall bot rules are reviewed and documented.",
        "Key pages return full content in server HTML.",
        "Status codes are accurate, with real 404s and minimal redirect chains.",
        "XML sitemaps are current and submitted to Google and Bing.",
        "Structured data is valid and matches visible content.",
        "Server logs are monitored for AI crawler activity and errors.",
        "llms.txt is published if your site is documentation-heavy."
      ]],
      ['h', 'How Advotis Agency can help'],
      ['p', "Advotis Agency audits crawler access, rendering and structured data so AI engines can read and cite your site. Explore our [SEO services](/services/seo), or [contact our team](/contact) for a technical AI-readiness review."]
    ],
    faqs: [
      ['Should I block GPTBot?', "That depends on whether you want your content used to train OpenAI's models. Blocking GPTBot does not remove you from ChatGPT search, which uses OAI-SearchBot, so you can block training while still allowing search visibility."],
      ['Does llms.txt improve rankings?', "There is no evidence it does. Google says AI text files are not required for AI Overviews or AI Mode. It can still help documentation-heavy sites by giving agents a clean map of key content."],
      ['Can Google render my JavaScript site?', "Yes. Googlebot renders pages with a recent version of Chromium, though rendering can be queued. Many other AI crawlers do not run JavaScript, so server-rendered HTML is the safer choice."],
      ['Is FAQ schema still worth adding?', "Google stopped showing FAQ rich results in May 2026, so it no longer produces a visual enhancement in Google. Existing markup is harmless, and other engines may still use it, but it should not be a priority."]
    ],
    sources: [
      ['OpenAI — Overview of OpenAI crawlers', 'https://developers.openai.com/api/docs/bots'],
      ['Google for Developers — List of Google\'s common crawlers', 'https://developers.google.com/crawling/docs/crawlers-fetchers/google-common-crawlers'],
      ['Vercel — The rise of the AI crawler', 'https://vercel.com/blog/the-rise-of-the-ai-crawler'],
      ['llmstxt.org — The /llms.txt file proposal', 'https://llmstxt.org/'],
      ['PPC Land — Google kills FAQ rich results', 'https://ppc.land/google-kills-faq-rich-results-what-seos-saw-coming-since-2019/']
    ]
  },

  // 5
  {
    slug: 'javascript-seo-react-ssr-ssg',
    category: 'Web Development',
    service: 'web-applications',
    title: 'JavaScript SEO: How to Make React Sites Rank (SSR vs SSG)',
    description: "JavaScript SEO for React: how Google renders JS, when to use SSR, SSG or ISR, and a practical checklist to make React sites rank in search and AI answers.",
    excerpt: "How Google and AI crawlers handle React, when to choose SSR, SSG or ISR, and the fixes that make JavaScript sites rank.",
    date: '2026-09-19',
    author: 'Advotis Engineering Team',
    keywords: ['JavaScript SEO', 'React SEO', 'SSR vs SSG', 'server-side rendering SEO', 'Next.js SEO', 'client-side rendering SEO'],
    summary: "JavaScript SEO is the practice of making JavaScript-heavy sites crawlable, renderable and indexable. React sites can rank well, but pure client-side rendering is risky because Google renders in a queue and many AI crawlers do not run JavaScript. Use static generation for stable pages, server-side rendering for dynamic ones, and ship real links, titles and status codes in HTML.",
    takeaways: [
      "Google processes JavaScript pages in three phases: crawling, rendering and indexing.",
      "Many AI crawlers do not execute JavaScript, so client-only React content may be invisible to them.",
      "SSG suits stable content, SSR suits personalized or fast-changing pages, and ISR blends the two.",
      "Google calls dynamic rendering a workaround, not a long-term solution.",
      "React's docs recommend starting new apps with a framework such as Next.js or React Router."
    ],
    body: [
      ['p', "JavaScript SEO is the practice of making sure search engines and AI crawlers can crawl, render and index sites built with JavaScript frameworks like React. React sites can absolutely rank, but the rendering strategy you choose decides how easily they do. This guide explains how Google handles JavaScript, compares SSR, SSG and ISR, and gives you a checklist for fixing an existing React app."],
      ['h', 'Can React sites rank on Google?'],
      ['p', "Yes. React sites rank well when their important content, links and metadata are available to crawlers, ideally in the initial HTML. Problems usually come from client-side-only rendering, not from React itself."],
      ['p', "The risk has grown with AI search. Google can render JavaScript, but Vercel's December 2024 research on AI crawlers found that major AI crawlers from OpenAI, Anthropic, Meta, ByteDance and Perplexity did not render JavaScript. A client-rendered page may rank in Google yet be blank to ChatGPT search."],
      ['h', 'How does Google process JavaScript pages?'],
      ['p', "Google processes JavaScript web apps in three phases: crawling, rendering and indexing. Pages are fetched, queued for rendering in a headless Chromium browser, then indexed based on the rendered HTML."],
      ['ol', [
        "Crawling: Googlebot fetches the URL and checks robots.txt, then parses links in the raw HTML.",
        "Rendering: according to [Google's JavaScript SEO basics](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics), pages with a 200 status are queued for rendering, and may wait in that queue before JavaScript runs.",
        "Indexing: Google uses the rendered HTML to index content and discover additional links."
      ]],
      ['p', "Google's guide adds that server-side or pre-rendering is still a great idea because it makes sites faster for users and crawlers, and notes that not all bots can run JavaScript."],
      ['h', 'What is the difference between CSR, SSR, SSG and ISR?'],
      ['p', "The difference is where and when the HTML is produced: in the browser, on the server per request, at build time, or at build time with background updates."],
      ['table', {
        head: ['Strategy', 'Where HTML is built', 'SEO strength', 'Best for'],
        rows: [
          ['CSR (client-side rendering)', 'In the browser after JavaScript loads', 'Weakest; relies on crawler rendering', 'Logged-in dashboards and internal tools'],
          ['SSR (server-side rendering)', 'On the server for each request', 'Strong; full HTML on first response', 'Personalized, inventory or frequently changing pages'],
          ['SSG (static site generation)', 'At build time', 'Strongest; fast HTML from a CDN', 'Marketing pages, blogs, docs'],
          ['ISR (incremental static regeneration)', 'At build time, then regenerated on demand', 'Strong; static speed with fresher content', 'Large catalogs and content libraries']
        ]
      }],
      ['p', "web.dev's [Rendering on the Web](https://web.dev/articles/rendering-on-the-web) defines static rendering as happening at build time, and SSR as rendering on the server to send HTML rather than JavaScript. It recommends considering server-side or static rendering over a full rehydration approach."],
      ['h', 'Which rendering strategy should you choose for SEO?'],
      ['p', "Choose static generation wherever content is the same for every visitor, and SSR where content must be fresh or personalized at request time. Most real sites mix both by route."],
      ['ul', [
        "Use SSG for home, service, about, blog and documentation pages.",
        "Use ISR or cached static output for product and category pages that change daily.",
        "Use SSR for search results, pricing that varies by region or pages showing live inventory.",
        "Keep CSR for authenticated areas that should not be indexed anyway."
      ]],
      ['p', "Frameworks make this easier. [React's documentation](https://react.dev/learn/creating-a-react-app) recommends starting new apps with a framework such as Next.js or React Router, noting they support CSR, SPAs and static generation, and let you add server rendering per route. In Next.js 16, Cache Components and Partial Prerendering serve a static shell instantly and stream or regenerate the rest."],
      ['q', "If the content matters for search, it belongs in the HTML, not behind a loading spinner."],
      ['h', 'How do you fix a client-side rendered React SPA?'],
      ['p', "The most durable fix is moving public routes to a framework with SSR or SSG. If a full migration is not possible right now, prerender your public pages at build time as an interim step."],
      ['ol', [
        "Inventory routes and separate public, indexable pages from logged-in app screens.",
        "Prerender public routes to static HTML at build time, or migrate them to Next.js or React Router with static generation.",
        "Move titles, meta descriptions, canonicals and structured data into the server-rendered head.",
        "Replace click handlers used for navigation with real anchor links that include an href.",
        "Return true 404 status codes for missing pages instead of a 200 with an error message.",
        "Re-test with Search Console's URL Inspection tool and a plain HTML fetch."
      ]],
      ['p', "Avoid building new dynamic rendering setups that serve bots a different version. Google's documentation on dynamic rendering states it is a workaround and not a recommended solution, and points to server-side rendering, static rendering or hydration instead."],
      ['h', 'What should a JavaScript SEO checklist for React include?'],
      ['p', "Check these items on every release that touches routing, rendering or templates."],
      ['ul', [
        "Primary content and H1 present in the initial HTML response.",
        "Unique title and meta description per route, rendered on the server.",
        "Links are anchor elements with href attributes, not buttons with onClick.",
        "Client-side routing uses the History API, not URL fragments, for different content.",
        "Canonical tag set in HTML and not changed by JavaScript to a different value.",
        "No noindex in the initial HTML on pages you want indexed; Google may skip rendering when it sees one.",
        "Static assets use content fingerprinting for long-lived caching.",
        "Core Web Vitals monitored, especially INP, since heavy hydration hurts responsiveness."
      ]],
      ['h3', 'How do you test what Google actually renders?'],
      ['p', "Compare the raw HTML your server returns with the rendered HTML Google sees. Gaps between the two show exactly what depends on JavaScript."],
      ['ul', [
        "Search Console URL Inspection: run a live test and view the rendered HTML and screenshot for a page.",
        "Rich Results Test: confirms that structured data survives rendering and is valid.",
        "View source versus browser DevTools: view source shows server HTML, while the Elements panel shows the DOM after JavaScript.",
        "Server logs: confirm Googlebot and AI crawlers receive 200 responses for your key routes, not redirects or errors."
      ]],
      ['p', "Repeat these checks after framework upgrades, because a change to data fetching or routing can quietly move content from the server to the client."],
      ['tip', "Run curl on your key URLs and search the output for your H1 and main body text. If they are missing, any crawler that does not run JavaScript, including most AI crawlers, cannot see them either."],
      ['h', 'What are the most common JavaScript SEO mistakes?'],
      ['p', "Most issues come from treating a marketing site like an app. These are the patterns we see most often."],
      ['ul', [
        "Soft 404s: SPAs returning 200 for every URL, which Google flags as soft 404s.",
        "Removing noindex with JavaScript: Google may never render the page to see the change.",
        "Lazy-loading critical content only on scroll or interaction.",
        "Blocking JavaScript or API endpoints in robots.txt that rendering depends on.",
        "Heavy hydration that delays interactivity and hurts INP; see our [INP optimization guide](/blog/core-web-vitals-inp-guide)."
      ]],
      ['h', 'Next steps'],
      ['p', "Advotis Agency builds and migrates React applications with SEO-ready rendering from day one. Explore our [web application development services](/services/web-applications) or [contact our team](/contact) for a JavaScript SEO and rendering audit."]
    ],
    faqs: [
      ['Is React bad for SEO?', "No. React is not bad for SEO, but client-side-only rendering can be. Using a framework with server-side rendering or static generation gives crawlers full HTML and avoids most JavaScript SEO problems."],
      ['Is SSR or SSG better for SEO?', "Both deliver full HTML to crawlers, so both are strong for SEO. SSG is usually faster and cheaper to serve for stable content, while SSR suits pages that must be fresh or personalized on every request."],
      ['Does Google index client-side rendered content?', "Yes, Google renders JavaScript and can index client-side content, but pages wait in a rendering queue first. Other crawlers, including many AI crawlers, may not run JavaScript at all, so they could miss that content."],
      ['Do I need Next.js for React SEO?', "Not strictly, but a framework helps. React's documentation recommends frameworks like Next.js or React Router for new apps because they support static generation and per-route server rendering out of the box."]
    ],
    sources: [
      ['Google Search Central — Understand the JavaScript SEO basics', 'https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics'],
      ['web.dev — Rendering on the Web', 'https://web.dev/articles/rendering-on-the-web'],
      ['React — Creating a React App', 'https://react.dev/learn/creating-a-react-app'],
      ['Vercel — The rise of the AI crawler', 'https://vercel.com/blog/the-rise-of-the-ai-crawler'],
      ['Next.js Docs — Incremental Static Regeneration with Cache Components', 'https://nextjs.org/docs/app/guides/incremental-static-regeneration-cache-components']
    ]
  }
];
