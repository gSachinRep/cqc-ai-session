import React, { useEffect, useState } from 'react'

const sections = [
  { label: 'Index', href: '#page-index' },
  { label: 'Purpose', href: '#purpose' },
  { label: 'Outcomes in Practice', href: '#outcomes-in-practice' },
  { label: 'Operating Model', href: '#operating-model' },
  { label: 'Brand and Messaging', href: '#brand-and-messaging' },
  { label: 'Campaign Planning', href: '#campaign-planning' },
  { label: 'Content and Creative', href: '#content-and-creative' },
  { label: 'Customer Research', href: '#customer-research' },
  { label: 'Performance Insights', href: '#performance-insights' },
  { label: 'Lifecycle and CRM', href: '#lifecycle-and-crm' },
  { label: 'Workflow Automation', href: '#workflow-automation' },
  { label: 'Governance', href: '#governance' },
  { label: 'Prompt Library', href: '#prompt-library' },
  { label: 'What Changes', href: '#deeper-idea' }
]

const outcomes = [
  { title: 'Design strong marketing prompts', detail: 'Claude performs much better when it knows the audience, funnel stage, brand voice, objective, and output format.' },
  { title: 'Use Claude in everyday marketing work', detail: 'Claude is especially useful for messaging, research synthesis, campaign planning, content structuring, and performance narrative.' },
  { title: 'Improve speed without losing strategic quality', detail: 'The goal is not generic copy faster; it is stronger first drafts and clearer thinking across the marketing workflow.' },
  { title: 'Standardize brand and campaign outputs', detail: 'Teams can use Claude to create more consistent messaging, content templates, and review standards across channels and functions.' },
  { title: 'Support better go-to-market decisions', detail: 'Claude helps organize customer signals, campaign insights, and strategic trade-offs so marketing decisions are easier to discuss and defend.' },
  { title: 'Reduce repetitive production work', detail: 'Claude is best used to remove low-leverage writing and synthesis effort so marketers can spend more time on strategy and experimentation.' }
]

const augmentationExamples = [
  {
    title: 'From scattered product notes to a launch message',
    before: 'Teams collect notes from product, sales, and customer conversations, then spend time turning them into a coherent launch story.',
    after: 'Claude turns those notes into a first-pass message hierarchy, value proposition, and rollout copy that the marketing team can refine.',
    prompt: `Act as a product marketing strategist.\n\nUse these launch notes to create:\n- Core message\n- Supporting proof points\n- Audience-specific value proposition\n- Suggested launch email headline and opening paragraph`
  },
  {
    title: 'From campaign results to an insights summary',
    before: 'Marketers manually translate dashboards, comments, and channel results into a usable narrative for the next review.',
    after: 'Claude turns the campaign data and notes into a summary of what worked, what underperformed, and what to change next.',
    prompt: `Act as a growth marketing analyst.\n\nSummarize these campaign results.\n\nInclude:\n- What performed best\n- What underperformed\n- Likely reasons\n- Experiments to run next`
  }
]

const operatingRoles = [
  { title: 'Synthesizer', detail: 'Reads campaign notes, research transcripts, brand docs, and performance reports to extract useful themes and decisions.' },
  { title: 'Drafting Partner', detail: 'Creates first drafts of messaging, copy, campaign outlines, briefs, and reporting summaries.' },
  { title: 'Structured Thinking Assistant', detail: 'Helps marketing teams compare angles, organize strategy, and turn messy inputs into clearer go-to-market decisions.' }
]

const contentSections = [
  {
    id: 'brand-and-messaging',
    eyebrow: 'Brand and Messaging',
    title: 'Claude for brand and positioning work',
    lead: 'Claude is valuable when messaging needs structure, variants, and sharper articulation without losing brand discipline.',
    cards: [
      {
        title: 'Message hierarchy',
        concept: 'Claude can turn positioning notes into a clearer message hierarchy for different audiences and channels.',
        steps: ['Provide the product, audience, and market context.', 'Ask for core message, proof points, and message variants.', 'Specify brand tone and prohibited language.', 'Refine the result with the brand owner.'],
        prompt: `Act as a brand strategist.\n\nCreate a message hierarchy for this offer.\n\nInclude:\n- Core message\n- Three supporting proof points\n- Audience-specific variations\n- One thing the messaging should avoid`
      },
      {
        title: 'Brand voice adaptation',
        concept: 'Claude can help adapt the same message for different channels while keeping the voice consistent.',
        steps: ['Provide the voice guidelines and the base message.', 'Ask for channel-specific versions.', 'Check that claims remain consistent.', 'Use the output as a first draft, not auto-publish copy.'],
        prompt: `Use this brand voice guide and adapt the same core message for:\n- Website hero copy\n- LinkedIn post\n- Sales email intro\n- Product launch note`
      }
    ]
  },
  {
    id: 'campaign-planning',
    eyebrow: 'Campaign Planning',
    title: 'Claude for campaign planning and execution',
    lead: 'Campaign work benefits from clear structure across audience, angle, channel, timing, and experiment logic. Claude helps get there faster.',
    cards: [
      {
        title: 'Campaign brief creation',
        concept: 'Claude can turn a rough campaign idea into a sharper brief with goals, audience, channel plan, and success metrics.',
        steps: ['Describe the goal, audience, offer, and constraints.', 'Ask for messaging, channels, timing, and metrics.', 'Use the output to align stakeholders before launch.', 'Edit the brief with channel owners before execution.'],
        prompt: `Act as a campaign strategist.\n\nCreate a campaign brief for this marketing initiative.\n\nInclude:\n- Objective\n- Target audience\n- Core message\n- Channel plan\n- Success metrics\n- Risks or dependencies`
      },
      {
        title: 'Experiment planning',
        concept: 'Claude can help marketing teams think through test design, hypotheses, and what success or failure should mean before a campaign goes live.',
        steps: ['Share the planned campaign or funnel issue.', 'Ask for test hypotheses and measurement logic.', 'Have Claude separate quick experiments from deeper bets.', 'Review the plan against the actual data environment.'],
        prompt: `Act as a growth marketing advisor.\n\nDesign an experiment plan for this campaign.\n\nInclude:\n- Hypotheses\n- Test variations\n- Metrics to watch\n- Decision criteria\n- Follow-up experiments`
      }
    ]
  },
  {
    id: 'content-and-creative',
    eyebrow: 'Content and Creative',
    title: 'Claude for content and creative operations',
    lead: 'Claude helps with content production when teams need strong first drafts, clearer briefs, and more consistent creative review language.',
    cards: [
      {
        title: 'Content outline generator',
        concept: 'Claude can produce article, webinar, case study, or landing page outlines from a rough topic and audience brief.',
        steps: ['Provide the audience, objective, and topic.', 'Ask for a structure before asking for full copy.', 'Use the outline to align the content team first.', 'Then expand only the sections that pass review.'],
        prompt: `Create a content outline for this topic.\n\nInclude:\n- Target audience\n- Key sections\n- Main arguments\n- Suggested proof points\n- CTA direction`
      },
      {
        title: 'Creative review assistant',
        concept: 'Claude can help critique drafts against a brief so the team has more structured creative feedback than vague preferences.',
        steps: ['Provide the creative brief and the draft asset text or notes.', 'Ask for strengths, gaps, and misalignment with the brief.', 'Use Claude to surface specific fix areas.', 'Keep final creative judgment with the team.'],
        prompt: `Review this campaign draft against the original brief.\n\nTell me:\n- What aligns well\n- What is unclear or weak\n- What is missing\n- Three concrete improvements`
      }
    ]
  },
  {
    id: 'customer-research',
    eyebrow: 'Customer Research',
    title: 'Claude for research and voice-of-customer synthesis',
    lead: 'Claude is especially strong when research is text-heavy: interviews, surveys, win-loss notes, and open-ended feedback.',
    cards: [
      {
        title: 'Interview synthesis',
        concept: 'Claude can summarize multiple customer interviews into patterns, quotes, objections, and messaging implications.',
        steps: ['Provide transcripts or notes.', 'Ask for themes, tension points, and message implications.', 'Keep notable quotes separate from interpretation.', 'Validate against the raw interviews before final use.'],
        prompt: `Analyze these customer interview notes.\n\nInclude:\n- Top themes\n- Repeated objections\n- Desired outcomes customers mention\n- Messaging implications for marketing`
      },
      {
        title: 'Competitive narrative synthesis',
        concept: 'Claude can help turn competitive notes into a clearer view of market position, likely competitor narratives, and differentiator options.',
        steps: ['Provide competitor notes, website extracts, and market observations.', 'Ask for themes and likely positioning.', 'Use the output to sharpen differentiation, not to invent claims.', 'Review with product marketing before use.'],
        prompt: `Act as a product marketing analyst.\n\nSummarize this competitive input.\n\nInclude:\n- What competitors appear to emphasize\n- Likely customer appeal\n- Where we may differentiate\n- Claims we should avoid without evidence`
      }
    ]
  },
  {
    id: 'performance-insights',
    eyebrow: 'Performance Insights',
    title: 'Claude for marketing performance insights',
    lead: 'Performance reviews often combine numbers, channel notes, and campaign context. Claude helps convert those into a sharper learning narrative.',
    cards: [
      {
        title: 'Channel performance summary',
        concept: 'Claude can turn dashboard screenshots, notes, and KPI exports into a concise explanation of what happened and why it may have happened.',
        steps: ['Provide the relevant KPIs and channel context.', 'Ask for top performers, weak areas, and likely causes.', 'Separate observed data from inference.', 'Use the summary in the weekly growth review.'],
        prompt: `Act as a marketing analyst.\n\nSummarize this channel performance update.\n\nInclude:\n- Top-performing channels\n- Underperforming areas\n- Likely reasons\n- Risks or opportunities for next period`
      },
      {
        title: 'Campaign learning memo',
        concept: 'Claude can help marketing teams capture what a campaign taught them so the learning survives beyond one meeting.',
        steps: ['Share results, notes, and post-campaign observations.', 'Ask Claude to organize wins, misses, and lessons.', 'Use the memo to drive the next planning cycle.', 'Review for overconfident inference.'],
        prompt: `Turn these campaign notes and results into a learning memo.\n\nInclude:\n- What worked\n- What failed\n- What we learned\n- What to test next`
      }
    ]
  },
  {
    id: 'lifecycle-and-crm',
    eyebrow: 'Lifecycle and CRM',
    title: 'Claude for lifecycle messaging and CRM work',
    lead: 'Lifecycle teams often need multiple variants, segment-aware messaging, and a clear sequence logic. Claude helps speed that up while preserving strategic intent.',
    cards: [
      {
        title: 'Email sequence drafting',
        concept: 'Claude can create a first-pass lifecycle or nurture sequence based on audience stage, message objective, and CTA logic.',
        steps: ['Describe the segment, trigger, and goal of the sequence.', 'Ask for email-by-email purpose and CTA.', 'Specify voice and channel constraints.', 'Review against actual CRM and compliance rules before scheduling.'],
        prompt: `Act as a lifecycle marketer.\n\nCreate a four-email nurture sequence for this audience.\n\nFor each email include:\n- Purpose\n- Subject line direction\n- Core message\n- CTA`
      },
      {
        title: 'Segmentation message adaptation',
        concept: 'Claude can help adapt the same campaign idea for different audience segments without rewriting every variant from scratch.',
        steps: ['Provide the base campaign message and segment definitions.', 'Ask for segment-specific versions and rationale.', 'Check that differences are meaningful, not cosmetic.', 'Use the output as draft copy for further review.'],
        prompt: `Adapt this campaign message for three different customer segments.\n\nFor each segment include:\n- Angle\n- Main value proposition\n- One objection to address\n- CTA direction`
      }
    ]
  }
]

const workflowSteps = ['Claude drafts the campaign brief or messaging options.', 'Claude helps structure research and audience insights.', 'Claude prepares content or lifecycle first drafts.', 'The marketing team reviews for brand, claims, and strategic fit.', 'Campaigns launch with better documentation and clearer learning loops.']

const governance = { allowed: ['Drafting campaign briefs and messaging', 'Summarizing research and performance notes', 'Generating first-pass content outlines'], restricted: ['Publishing without review', 'Inventing claims or testimonials', 'Treating AI output as final market truth'] }

const promptLibrary = [
  { label: 'Messaging', text: 'Create a message hierarchy for this offer by audience, proof point, and CTA.' },
  { label: 'Campaigns', text: 'Draft a campaign brief with objective, audience, channel plan, success metrics, and risks.' },
  { label: 'Research', text: 'Summarize these customer interviews into themes, objections, and messaging implications.' },
  { label: 'Performance', text: 'Turn these campaign results into a short learning memo with what worked, what failed, and what to test next.' },
  { label: 'Lifecycle', text: 'Create a nurture sequence with email purpose, message angle, and CTA for each step.' }
]

function CopyPrompt({ prompt }) {
  const [copyState, setCopyState] = useState('idle')
  useEffect(() => {
    if (copyState === 'idle') return undefined
    const timeoutId = window.setTimeout(() => setCopyState('idle'), 1600)
    return () => window.clearTimeout(timeoutId)
  }, [copyState])
  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(prompt)
      setCopyState('copied')
    } catch {
      setCopyState('failed')
    }
  }
  return (
    <button className="prompt-copy-btn" type="button" onClick={handleCopy}>
      <span aria-hidden="true">📋</span>
      <span>{copyState === 'copied' ? 'Copied' : copyState === 'failed' ? 'Retry' : 'Copy'}</span>
    </button>
  )
}

function CollapsibleSection({ id, eyebrow, title, lead, children }) {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <section id={id} className="section collapsible-card section-collapse-shell">
      <button className="collapse-toggle" type="button" onClick={() => setIsOpen((value) => !value)}>
        <div className="collapse-copy">
          <span className="eyebrow">{eyebrow}</span>
          <strong>{title}</strong>
          <small>{lead}</small>
        </div>
        <span className="collapse-icon" aria-hidden="true">{isOpen ? '−' : '+'}</span>
      </button>
      {isOpen ? <div className="collapse-body section-collapse-body">{children}</div> : null}
    </section>
  )
}

function InfoCard({ title, detail, tone = 'model-note' }) {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <article className={`note-card collapsible-card ${tone}`}>
      <button className="collapse-toggle" type="button" onClick={() => setIsOpen((value) => !value)}>
        <div className="collapse-copy">
          <strong>{title}</strong>
          <small>{detail}</small>
        </div>
        <span className="collapse-icon" aria-hidden="true">{isOpen ? '−' : '+'}</span>
      </button>
      {isOpen ? <div className="collapse-body"><div className="model-row"><span>{detail}</span></div></div> : null}
    </article>
  )
}

function PromptCard({ item }) {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <article className="scenario-card collapsible-card">
      <button className="collapse-toggle" type="button" onClick={() => setIsOpen((value) => !value)}>
        <div className="collapse-copy">
          <strong>{item.title}</strong>
          <small>{item.concept}</small>
        </div>
        <span className="collapse-icon" aria-hidden="true">{isOpen ? '−' : '+'}</span>
      </button>
      {isOpen ? (
        <div className="collapse-body">
          <h4>Suggested Steps</h4>
          <ol>{item.steps.map((step) => <li key={step}>{step}</li>)}</ol>
          <div className="section-subhead">
            <div className="prompt-controls"><CopyPrompt prompt={item.prompt} /></div>
            <pre>{item.prompt}</pre>
          </div>
        </div>
      ) : null}
    </article>
  )
}

function ClaudeMarketingPage() {
  return (
    <div className="page-shell" style={{ '--accent': '#0d9488', '--accent-soft': '#ccfbf1' }}>
      <header className="hero">
        <div className="hero-copy">
          <p className="eyebrow">Claude for Marketing</p>
          <h1>Claude <span>Marketing Playbook</span></h1>
          <p className="lead">
            Marketing is full of briefs, customer language, campaign notes, performance summaries, and positioning choices. Claude works best as a copilot for synthesis, messaging, and planning while marketers keep brand and market judgment firmly in hand.
          </p>
          <div className="hero-actions">
            <a className="btn primary" href="#purpose">Start here</a>
            <a className="btn" href="/">Back to main tutorial</a>
          </div>
          <div id="page-index" className="panel-card hero-index-card">
            <h3>Index</h3>
            <div className="surface-nav hero-index-nav">
              {sections.filter((section) => section.href !== '#page-index').map((section) => (
                <a key={section.href} className="surface-link" href={section.href}>{section.label}</a>
              ))}
            </div>
          </div>
        </div>
        <aside className="hero-panel">
          <div className="panel-card accent">
            <h3>Goal</h3>
            <p>Help marketing teams use Claude to sharpen messaging, accelerate planning, structure research, and improve campaign learning without diluting brand judgment.</p>
          </div>
        </aside>
      </header>
      <main>
        <CollapsibleSection id="purpose" eyebrow="Purpose" title="Practical guide for AI-augmented marketing" lead="This page focuses on repeatable marketing workflows where Claude improves speed and structure without replacing creative or strategic judgment.">
          <div className="section-subhead">
            <h3>Practical examples of augmentation</h3>
            <div className="scenario-list">
              {augmentationExamples.map((item) => (
                <article key={item.title} className="scenario-card">
                  <h3>{item.title}</h3>
                  <p className="scenario-meta"><strong>Before:</strong> {item.before}</p>
                  <p className="scenario-meta"><strong>With Claude:</strong> {item.after}</p>
                  <div className="prompt-controls"><CopyPrompt prompt={item.prompt} /></div>
                  <pre>{item.prompt}</pre>
                </article>
              ))}
            </div>
          </div>
        </CollapsibleSection>
        <CollapsibleSection id="outcomes-in-practice" eyebrow="Outcomes in Practice" title="What these outcomes mean in marketing" lead="These are practical improvements in how marketing teams think, write, plan, and learn.">
          <div className="notes-grid">{outcomes.map((item) => <InfoCard key={item.title} title={item.title} detail={item.detail} tone="prompt-note" />)}</div>
        </CollapsibleSection>
        <CollapsibleSection id="operating-model" eyebrow="Operating Model" title="The marketing + Claude operating model" lead="Claude should support synthesis, drafting, and structured exploration while the team keeps the final say on brand and market choices.">
          <div className="notes-grid">{operatingRoles.map((item) => <InfoCard key={item.title} title={item.title} detail={item.detail} tone="model-note" />)}</div>
        </CollapsibleSection>
        {contentSections.map((section) => (
          <CollapsibleSection key={section.id} id={section.id} eyebrow={section.eyebrow} title={section.title} lead={section.lead}>
            <div className="scenario-list">{section.cards.map((item) => <PromptCard key={item.title} item={item} />)}</div>
          </CollapsibleSection>
        ))}
        <CollapsibleSection id="workflow-automation" eyebrow="Workflow Automation" title="Marketing workflow automation with Claude" lead="Claude becomes more valuable when it is embedded into campaign and learning loops, not only used for ad hoc drafting.">
          <div className="timeline">{workflowSteps.map((step, index) => <article key={step} className="timeline-card"><p className="timeline-time">Step {index + 1}</p><p>{step}</p></article>)}</div>
        </CollapsibleSection>
        <CollapsibleSection id="governance" eyebrow="Governance" title="Governance guidelines" lead="Define where Claude is appropriate in marketing workflows and where review is mandatory.">
          <div className="scenario-list">
            <PromptCard item={{ title: 'Allowed uses', concept: 'Use Claude to support briefs, drafts, research synthesis, and structured campaign thinking.', steps: governance.allowed, prompt: 'Use Claude to draft campaign briefs, summarize research, and create first-pass messaging, but always keep human review before publish.' }} />
            <PromptCard item={{ title: 'Restricted uses', concept: 'Do not let Claude publish unchecked claims or replace brand and market judgment.', steps: governance.restricted, prompt: 'Do not publish AI-generated claims, testimonials, or messaging without human review and evidence validation.' }} />
          </div>
        </CollapsibleSection>
        <CollapsibleSection id="prompt-library" eyebrow="Prompt Library" title="Marketing prompt library quick reference" lead="These are useful starters for common marketing work.">
          <div className="scenario-list">{promptLibrary.map((item) => <PromptCard key={item.label} item={{ title: item.label, concept: 'Copy and adapt this prompt for everyday marketing work.', steps: ['Add audience and channel context.', 'Set tone and claim boundaries.', 'Review before using externally.'], prompt: item.text }} />)}</div>
        </CollapsibleSection>
        <CollapsibleSection id="deeper-idea" eyebrow="What Changes" title="The deeper idea behind this playbook" lead="Marketing spends less time forcing order onto messy inputs and more time refining signal, strategy, and experimentation.">
          <div className="notes-grid">
            <InfoCard title="From copy producer to signal interpreter" detail="Claude handles more of the first-pass organization and drafting so marketing can focus more on audience understanding, angle selection, and creative judgment." tone="model-note" />
            <InfoCard title="Marketing as the market-intelligence layer" detail="With AI support, marketing can become faster at turning customer language and campaign data into sharper decisions without losing strategic nuance." tone="model-note" />
          </div>
        </CollapsibleSection>
      </main>
      <a className="floating-index" href="#page-index">Index</a>
    </div>
  )
}

export default ClaudeMarketingPage
