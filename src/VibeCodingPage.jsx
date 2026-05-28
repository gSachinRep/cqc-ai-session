import React, { useEffect, useState } from 'react'

const sections = [
  { label: 'Index', href: '#page-index' },
  { label: 'Purpose', href: '#purpose' },
  { label: 'Claude Artifacts', href: '#claude-artifacts' },
  { label: 'Build Challenges', href: '#build-challenges' },
  { label: 'How To Facilitate', href: '#how-to-facilitate' }
]

const artifactCard = {
  title: 'Claude Artifacts - Building Apps and Prototypes',
  summary:
    'Use Claude Artifacts when you want Claude to generate something interactive and visible, not just a text response. This is useful for lightweight apps, internal tools, calculators, demos, mockups, and fast prototypes.',
  points: [
    'Artifacts are useful when participants need a tangible output they can interact with during the session.',
    'They work well for small apps, internal utilities, workflows, forms, explainers, calculators, and rough product prototypes.',
    'They are best for fast iteration: ask Claude to generate, inspect, refine, and improve the artifact in short cycles.',
    'Use Claude Artifacts for quick prototype thinking; use tools like Lovable.dev, Bolt, or v0 when teams want a fuller product build path.'
  ],
  prompt:
    'Build this as a Claude Artifact, not just as plain text. Create a lightweight interactive prototype with a clear user flow, sensible labels, and an interface that demonstrates the core value of the idea. Keep it practical and easy to iterate during a workshop.'
}

const vibeCodingProblems = [
  {
    color: 'orange',
    title: 'The Meeting Overload Analyzer',
    brief:
      "Our teams spend hours in meetings with no visibility into whether they're productive. I want a tool where I can paste a meeting transcript and get a quick summary — decisions made, action items, owners, and a 'was this meeting necessary?' score.",
    whyItWorks:
      'Universal pain point. No domain expertise needed. Tests summarization plus structured-output thinking.',
    buildFocus: ['Transcript input', 'Structured summary output', 'Decision and owner extraction', 'Meeting-value scoring'],
    starterPrompt:
      'Build a simple internal tool called Meeting Overload Analyzer. It should accept a pasted meeting transcript and return: summary, decisions made, action items, owners, risks, and a 1-10 score for whether the meeting was necessary. Use a clean, executive-friendly interface.'
  },
  {
    color: 'blue',
    title: 'The New Joiner Buddy Bot',
    brief:
      'Onboarding is inconsistent across our service lines. Build a simple chatbot that answers common Day 1–30 questions for new employees — policies, who to contact, what tools to use — based on information I feed it.',
    whyItWorks:
      'HR and operations relevance for every leader. Forces participants to think about knowledge structuring and prompt design for Q&A flows.',
    buildFocus: ['FAQ knowledge source', 'Chat interface', 'Contact escalation logic', 'Source-grounded answers'],
    starterPrompt:
      'Build a lightweight onboarding chatbot for new joiners. It should answer Day 1 to Day 30 questions using company information I provide, suggest who to contact when unsure, and clearly separate confirmed answers from items that need HR or manager confirmation.'
  },
  {
    color: 'green',
    title: 'The Client Proposal Accelerator',
    brief:
      "Our teams waste time formatting the same types of proposals. I want a tool where I enter a client name, industry, and the problem we're solving — and it generates a first-draft proposal outline with sections, suggested messaging, and a few differentiators.",
    whyItWorks:
      'Directly relevant to business development and service line heads. High perceived ROI.',
    buildFocus: ['Simple form inputs', 'Proposal outline generation', 'Messaging suggestions', 'Differentiator prompts'],
    starterPrompt:
      'Build a proposal drafting assistant. Inputs: client name, industry, business problem, and service line. Output: a first-draft proposal outline with executive summary, problem statement, approach, timeline, assumptions, and three differentiators.'
  },
  {
    color: 'violet',
    title: 'The Team Pulse Dashboard',
    brief:
      'I want a lightweight weekly check-in tool — team members answer 3 quick questions about workload, blockers, and morale, and I get a simple visual dashboard showing trends across my team over time.',
    whyItWorks:
      'Leadership-relevant, data plus UI challenge, and it pushes thinking about form inputs, storage, and visualization.',
    buildFocus: ['Weekly check-in form', 'Trend storage', 'Simple charts or status cards', 'Leader dashboard summary'],
    starterPrompt:
      'Build a weekly team pulse tool. It should let team members answer three check-in questions about workload, blockers, and morale, and then show a simple dashboard with team trends over time and the main risk signals for the manager.'
  },
  {
    color: 'red',
    title: 'The Competitive Intel Snapshot',
    brief:
      "Before a client meeting, I want to quickly generate a one-pager on a competitor — what they offer, their likely pricing positioning, and 3 talking points on why we're different — just by entering a company name and our service line.",
    whyItWorks:
      'Strategic and exciting for senior leaders. Pushes participants to think about grounding AI outputs with context and constraints.',
    buildFocus: ['Competitor input form', 'One-page output', 'Differentiation talking points', 'Grounding and disclaimer section'],
    starterPrompt:
      'Build a competitor snapshot generator. Inputs: competitor name and our service line. Output: overview of likely offerings, estimated pricing position, risks in relying on incomplete information, and three talking points on how we are different.'
  }
]

const facilitationTips = [
  'Start with the business pain, not the app idea. Ask teams to define what friction they are removing before they start building.',
  'Keep the first build deliberately narrow. A small working flow is more valuable in the session than a broad but vague prototype.',
  'Ask every team to show one user flow, one risk, and one human review point when they demo.',
  'Use Claude Artifacts for rapid prototyping and iteration, then mention Lovable.dev, Bolt, or v0 when the room wants a stronger app-builder path.',
  'Close each challenge by asking what would make the prototype trustworthy enough for a real pilot.'
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
  return <button className="prompt-copy-btn" type="button" onClick={handleCopy}><span aria-hidden="true">📋</span><span>{copyState === 'copied' ? 'Copied' : copyState === 'failed' ? 'Retry' : 'Copy'}</span></button>
}

function CollapsibleSection({ id, eyebrow, title, lead, children }) {
  const [isOpen, setIsOpen] = useState(false)
  return <section id={id} className="section collapsible-card section-collapse-shell"><button className="collapse-toggle" type="button" onClick={() => setIsOpen((v) => !v)}><div className="collapse-copy"><span className="eyebrow">{eyebrow}</span><strong>{title}</strong><small>{lead}</small></div><span className="collapse-icon" aria-hidden="true">{isOpen ? '−' : '+'}</span></button>{isOpen ? <div className="collapse-body section-collapse-body">{children}</div> : null}</section>
}

function CollapsibleCard({ className = '', title, subtitle, children, defaultOpen = false }) {
  const [isOpen, setIsOpen] = useState(defaultOpen)
  return <article className={`${className} collapsible-card ${isOpen ? 'is-open' : 'is-closed'}`.trim()}><button className="collapse-toggle" type="button" onClick={() => setIsOpen((current) => !current)}><span className="collapse-copy"><strong>{title}</strong>{subtitle ? <small>{subtitle}</small> : null}</span><span className="collapse-icon" aria-hidden="true">{isOpen ? '−' : '+'}</span></button>{isOpen ? <div className="collapse-body">{children}</div> : null}</article>
}

function PromptPanel({ prompt, buttonLabel = 'prompt' }) {
  const [isVisible, setIsVisible] = useState(false)
  return <div><div className="prompt-header"><h4 className="prompt-title" /><div className="prompt-controls"><CopyPrompt prompt={prompt} /><button className="prompt-toggle-btn" type="button" onClick={() => setIsVisible((current) => !current)}>{isVisible ? `Hide ${buttonLabel}` : `Show ${buttonLabel}`}</button></div></div>{isVisible ? <pre>{prompt}</pre> : <div className="prompt-placeholder">Prompt hidden</div>}</div>
}

function VibeCodingCard({ item }) {
  return (
    <CollapsibleCard className={`vibe-card vibe-${item.color}`} title={item.title} subtitle={item.whyItWorks}>
      <div className="vibe-header">
        <p className="vibe-brief">{item.brief}</p>
      </div>
      <p className="scenario-meta">
        <strong>Why it works:</strong> {item.whyItWorks}
      </p>
      <div className="scenario-columns">
        <div>
          <h4>What participants should think through</h4>
          <ol>
            {item.buildFocus.map((focus) => (
              <li key={focus}>{focus}</li>
            ))}
          </ol>
        </div>
        <div>
          <PromptPanel prompt={item.starterPrompt} buttonLabel="starter prompt" />
        </div>
      </div>
    </CollapsibleCard>
  )
}

function InfoCard({ title, detail, tone = 'model-note' }) {
  const [isOpen, setIsOpen] = useState(false)
  return <article className={`note-card collapsible-card ${tone}`}><button className="collapse-toggle" type="button" onClick={() => setIsOpen((v) => !v)}><div className="collapse-copy"><strong>{title}</strong><small>{detail}</small></div><span className="collapse-icon" aria-hidden="true">{isOpen ? '−' : '+'}</span></button>{isOpen ? <div className="collapse-body"><div className="model-row"><span>{detail}</span></div></div> : null}</article>
}

export default function VibeCodingPage() {
  return (
    <div className="page-shell" style={{ '--accent': '#c026d3', '--accent-soft': '#f5d0fe' }}>
      <header className="hero">
        <div className="hero-copy">
          <p className="eyebrow">Vibe Coding</p>
          <h1>Build-First <span>Vibe Coding</span></h1>
          <p className="lead">Use these live build challenges in tools like Lovable.dev, Claude, Bolt, v0, or any AI-assisted app builder. They are familiar business problems, but solving them well requires product thinking rather than just prompting.</p>
          <div className="hero-actions">
            <a className="btn primary" href="#purpose">Start here</a>
            <a className="btn" href="/">Back to main tutorial</a>
          </div>
          <div id="page-index" className="panel-card hero-index-card">
            <h3>Index</h3>
            <div className="surface-nav hero-index-nav">
              {sections.filter((s) => s.href !== '#page-index').map((s) => (
                <a key={s.href} className="surface-link" href={s.href}>
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </div>
        <aside className="hero-panel">
          <div className="panel-card accent">
            <h3>Goal</h3>
            <p>Help participants move from prompt users to prototype builders by turning familiar business pain points into lightweight, testable app concepts.</p>
          </div>
        </aside>
      </header>

      <main>
        <CollapsibleSection id="purpose" eyebrow="Purpose" title="Use build challenges to shift the room into product thinking" lead="Vibe Coding works well in mixed senior groups because everyone understands the problem statement, but the build requires structure, trade-offs, and visible user flow decisions.">
          <div className="notes-grid">
            <InfoCard title="Why this works for senior audiences" detail="The problem feels immediately relevant, but the act of building forces clarity about user flow, scope, risk, and what AI should or should not do." tone="model-note" />
            <InfoCard title="What good looks like" detail="A strong output is not just a flashy mockup. It should show inputs, outputs, trust boundaries, and where a human should still intervene." tone="prompt-note" />
            <InfoCard title="What to avoid" detail="Do not let teams drift into feature lists. Keep them focused on one clear pain point, one core flow, and one believable first version." tone="prompt-note" />
          </div>
        </CollapsibleSection>

        <CollapsibleSection id="claude-artifacts" eyebrow="Claude Artifacts" title={artifactCard.title} lead={artifactCard.summary}>
          <div className="artifact-feature-body">
            <div>
              <h4>When to use Claude Artifacts</h4>
              <ol>
                {artifactCard.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ol>
            </div>
            <div>
              <PromptPanel prompt={artifactCard.prompt} buttonLabel="artifact prompt" />
            </div>
          </div>
        </CollapsibleSection>

        <CollapsibleSection id="build-challenges" eyebrow="Build Challenges" title="Participant problems to build during the session" lead="These are practical, leadership-relevant problems that produce strong demos in a workshop.">
          <div className="scenario-list">
            {vibeCodingProblems.map((item) => (
              <VibeCodingCard key={item.title} item={item} />
            ))}
          </div>
        </CollapsibleSection>

        <CollapsibleSection id="how-to-facilitate" eyebrow="How To Facilitate" title="What to emphasize while teams build" lead="These are the habits that make the exercise more valuable than a generic hackathon.">
          <div className="tips-grid">
            {facilitationTips.map((tip) => (
              <article key={tip} className="tip-card">
                <p>{tip}</p>
              </article>
            ))}
          </div>
        </CollapsibleSection>
      </main>

      <a className="floating-index" href="#page-index">Index</a>
    </div>
  )
}
