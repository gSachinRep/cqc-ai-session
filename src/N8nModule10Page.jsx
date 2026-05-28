import React, { useEffect, useState } from 'react'

const sections = [
  { label: 'Index', href: '#page-index' },
  { label: 'Overview', href: '#overview' },
  { label: 'Prerequisites', href: '#prerequisites' },
  { label: 'Core Concepts', href: '#core-concepts' },
  { label: 'Hands-On Labs', href: '#hands-on-labs' },
  { label: 'Templates', href: '#templates' },
  { label: 'Quiz', href: '#quiz' },
  { label: 'Assignment', href: '#assignment' },
  { label: 'Tips', href: '#tips' }
]

const overviewCards = [
  ['Module', 'Module 10: Deployment, Scaling, Security & Next Steps'],
  ['Goal by end', 'Take workflows beyond the editor by planning deployment, monitoring, security, scaling, collaboration, and long-term maintenance.'],
  ['Why this matters', 'A workflow only creates lasting value when it can run reliably, securely, and visibly after the demo ends.']
]

const prerequisiteSteps = [
  'Choose one workflow from earlier modules that is worth taking toward production readiness.',
  'Know which integrations, credentials, and external endpoints that workflow depends on.',
  'Be ready to think about monitoring, ownership, and failure handling rather than only feature expansion.',
  'Review the difference between test-only setups and production-facing behavior such as live webhooks and external triggers.'
]

const conceptCards = [
  {
    title: 'Going live changes the design questions',
    detail:
      'In production, teams need to know what happens when the workflow fails, who owns the credentials, how incidents are seen, and what data is being exposed.'
  },
  {
    title: 'Security is part of workflow architecture',
    detail:
      'Credential handling, webhook protection, access control, and data minimization are design concerns, not afterthoughts.'
  },
  {
    title: 'Scaling is more than performance',
    detail:
      'Workers, queues, retries, and throughput matter, but so do workflow boundaries, step isolation, and operational visibility.'
  },
  {
    title: 'Versioning and collaboration matter early',
    detail:
      'Exporting workflows, documenting changes, and clarifying ownership make automation sustainable when more than one person touches it.'
  },
  {
    title: 'Next steps are strategic, not just technical',
    detail:
      'Learners should leave this module able to decide whether a workflow is ready to deploy, what has to change first, and which opportunity should be built next.'
  }
]

const labs = [
  {
    title: 'Lab 1: Production Readiness Review',
    concept:
      'Take one existing workflow and evaluate what must change before it should be exposed to live traffic or real business usage.',
    steps: [
      'Choose a workflow from an earlier module.',
      'Map its triggers, external systems, credentials, and failure points.',
      'Identify what must change for live use, such as webhook protection, retries, monitoring, or approval steps.',
      'Document the current risks and the next improvements needed.',
      'Review whether the workflow should be deployed as-is, after small fixes, or only after deeper redesign.'
    ],
    prompt:
      'Review this workflow for production readiness. Identify security risks, operational gaps, missing monitoring, and the top three improvements needed before it should go live.'
  },
  {
    title: 'Lab 2: Add Monitoring, Alerts, and Failure Paths',
    concept:
      'Teach the workflow to report on its own health so issues are visible instead of silently failing in the background.',
    steps: [
      'Choose a workflow with at least one external dependency.',
      'Add failure notifications or alerting through email, Slack, or another messaging tool.',
      'Create a simple log or audit output for completed runs.',
      'Add retry or fallback logic for one predictable failure case.',
      'Run both success and failure tests so the learner sees the operational difference clearly.'
    ],
    prompt:
      'Add operational visibility to this workflow. Capture failure cases, send a useful alert, and record enough detail that someone can diagnose the issue later.'
  },
  {
    title: 'Lab 3: Define the Next Production Version',
    concept:
      'Use what the learner has built so far to create a realistic deployment and ownership plan rather than a vague “go live someday” intention.',
    steps: [
      'Select one workflow as the candidate for real deployment.',
      'Define its users, inputs, outputs, owner, and failure escalation path.',
      'List the infrastructure or product decisions still required, such as public endpoints, worker mode, hosting, or self-hosting.',
      'Describe what data the workflow handles and what protections it needs.',
      'Write a short implementation plan for the next production-ready version.'
    ],
    prompt:
      'Create a deployment readiness brief for this workflow. Include ownership, operational risks, security considerations, and the concrete next steps required to move from prototype to production.'
  }
]

const templateLinks = [
  {
    label: 'n8n docs',
    href: 'https://docs.n8n.io/'
  },
  {
    label: 'n8n enterprise and scaling docs',
    href: 'https://docs.n8n.io/hosting/'
  },
  {
    label: 'n8n workflow gallery',
    href: 'https://n8n.io/workflows'
  }
]

const quizCards = [
  {
    title: 'Quick check 1',
    question: 'What changes when a workflow moves from prototype to production?',
    options: [
      'Security, monitoring, failure handling, and ownership all become central',
      'Only the prompt text changes',
      'The workflow no longer needs credentials',
      'Manual testing is enough forever'
    ],
    correctIndex: 0
  },
  {
    title: 'Quick check 2',
    question: 'Why is monitoring important in production workflows?',
    options: [
      'Because failures need to be visible and diagnosable',
      'Because it makes the UI brighter',
      'Because it replaces retries',
      'Because it removes the need for documentation'
    ],
    correctIndex: 0
  },
  {
    title: 'Quick check 3',
    question: 'What is a useful way to think about scaling?',
    options: [
      'As a mix of throughput, workflow boundaries, and operational visibility',
      'Only as CPU usage',
      'Only as token cost',
      'As something to ignore until after deployment'
    ],
    correctIndex: 0
  },
  {
    title: 'Quick check 4',
    question: 'What should a deployment brief include?',
    options: [
      'Owners, risks, protections, and the next concrete steps to go live',
      'Only the model name',
      'Only the final prompt',
      'Only the node count'
    ],
    correctIndex: 0
  }
]

const assignmentPrompts = [
  'Take one existing workflow and create a production-readiness review with risks, controls, and next steps.',
  'Add monitoring and alerting to a workflow that currently has none, then test both success and failure paths.',
  'Write a deployment brief for one capstone workflow covering ownership, security, visibility, and scaling considerations.'
]

const tips = [
  'Choose one real workflow and take it seriously. Production thinking is easier when the workflow actually matters.',
  'Make monitoring actionable. An alert should help someone respond, not only tell them something broke.',
  'Keep security and data handling visible in the design conversation. They should not be retrofitted at the very end.',
  'The best outcome in this module is clarity about what is ready, what is not ready, and why.'
]

function CollapsibleSection({ id, eyebrow, title, lead, children }) {
  const [isOpen, setIsOpen] = useState(false)
  return <section id={id} className="section collapsible-card section-collapse-shell"><button className="collapse-toggle" type="button" onClick={() => setIsOpen((v) => !v)}><div className="collapse-copy"><span className="eyebrow">{eyebrow}</span><strong>{title}</strong><small>{lead}</small></div><span className="collapse-icon" aria-hidden="true">{isOpen ? '−' : '+'}</span></button>{isOpen ? <div className="collapse-body section-collapse-body">{children}</div> : null}</section>
}

function InfoCard({ title, detail, tone = 'model-note' }) {
  const [isOpen, setIsOpen] = useState(false)
  return <article className={`note-card collapsible-card ${tone}`}><button className="collapse-toggle" type="button" onClick={() => setIsOpen((v) => !v)}><div className="collapse-copy"><strong>{title}</strong><small>{detail}</small></div><span className="collapse-icon" aria-hidden="true">{isOpen ? '−' : '+'}</span></button>{isOpen ? <div className="collapse-body"><div className="model-row"><span>{detail}</span></div></div> : null}</article>
}

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

function LabCard({ item }) {
  const [isOpen, setIsOpen] = useState(false)
  const [isPromptVisible, setIsPromptVisible] = useState(false)
  return <article className="scenario-card collapsible-card"><button className="collapse-toggle" type="button" onClick={() => setIsOpen((v) => !v)}><div className="collapse-copy"><strong>{item.title}</strong><small>{item.concept}</small></div><span className="collapse-icon" aria-hidden="true">{isOpen ? '−' : '+'}</span></button>{isOpen ? <div className="collapse-body"><h4>Step-by-step build</h4><ol>{item.steps.map((step) => <li key={step}>{step}</li>)}</ol><div className="section-subhead"><div className="prompt-controls"><CopyPrompt prompt={item.prompt} /><button className="prompt-toggle-btn" type="button" onClick={() => setIsPromptVisible((v) => !v)}>{isPromptVisible ? 'Hide lab prompt' : 'Show lab prompt'}</button></div>{isPromptVisible ? <pre>{item.prompt}</pre> : <div className="prompt-placeholder">Prompt hidden</div>}</div></div> : null}</article>
}

function QuizCard({ item }) {
  const [selectedIndex, setSelectedIndex] = useState(null)
  return (
    <article className="scenario-card quiz-card">
      <h4>{item.title}</h4>
      <p className="scenario-meta">{item.question}</p>
      <div className="quiz-options">
        {item.options.map((option, index) => {
          const isSelected = selectedIndex === index
          const isCorrect = index === item.correctIndex
          let className = 'quiz-option'
          if (isSelected && isCorrect) className += ' is-correct'
          if (isSelected && !isCorrect) className += ' is-wrong'
          return (
            <button key={option} className={className} type="button" onClick={() => setSelectedIndex(index)}>
              <span>{option}</span>
            </button>
          )
        })}
      </div>
      {selectedIndex !== null ? (
        <p className="quiz-feedback">
          {selectedIndex === item.correctIndex ? 'Correct' : `Not quite. Correct answer: ${item.options[item.correctIndex]}`}
        </p>
      ) : null}
    </article>
  )
}

export default function N8nModule10Page() {
  return (
    <div className="page-shell" style={{ '--accent': '#ea580c', '--accent-soft': '#fed7aa' }}>
      <header className="hero">
        <div className="hero-copy">
          <p className="eyebrow">n8n Module 10</p>
          <h1>Deployment, Scaling, Security <span>& Next Steps</span></h1>
          <p className="lead">A practical module for taking workflows beyond the editor and into monitored, secure, production-ready operation with clear ownership and next-step planning.</p>
          <div className="hero-actions">
            <a className="btn primary" href="#overview">Start here</a>
            <a className="btn" href="/n8n/deep-dive.html">Back to deep dive</a>
          </div>
          <div id="page-index" className="panel-card hero-index-card">
            <h3>Index</h3>
            <div className="surface-nav hero-index-nav">
              {sections.filter((s) => s.href !== '#page-index').map((s) => <a key={s.href} className="surface-link" href={s.href}>{s.label}</a>)}
            </div>
          </div>
        </div>
        <aside className="hero-panel">
          <div className="panel-card accent">
            <h3>Goal</h3>
            <p>Finish this module able to assess production readiness, add operational visibility, and plan the path from prototype to reliable live workflow.</p>
          </div>
        </aside>
      </header>
      <main>
        <CollapsibleSection id="overview" eyebrow="Overview" title="What this module is designed to achieve" lead="This is where learners shift from building workflows to operating them responsibly.">
          <div className="notes-grid">{overviewCards.map(([title, detail]) => <InfoCard key={title} title={title} detail={detail} tone="model-note" />)}</div>
        </CollapsibleSection>
        <CollapsibleSection id="prerequisites" eyebrow="Prerequisites" title="What to prepare before planning deployment" lead="A real workflow candidate makes production thinking much more concrete.">
          <div className="section-subhead">
            <ol>{prerequisiteSteps.map((step) => <li key={step}>{step}</li>)}</ol>
          </div>
        </CollapsibleSection>
        <CollapsibleSection id="core-concepts" eyebrow="Core Concepts" title="The deployment concepts learners need to understand first" lead="These ideas help the learner reason beyond the canvas and into operating reality.">
          <div className="notes-grid">{conceptCards.map((item) => <InfoCard key={item.title} title={item.title} detail={item.detail} tone="model-note" />)}</div>
        </CollapsibleSection>
        <CollapsibleSection id="hands-on-labs" eyebrow="Hands-On Labs" title="Review, harden, and plan the live version" lead="These labs focus on production readiness, monitoring, and ownership rather than adding new features.">
          <div className="scenario-list">{labs.map((item) => <LabCard key={item.title} item={item} />)}</div>
        </CollapsibleSection>
        <CollapsibleSection id="templates" eyebrow="Templates" title="Useful references and starter links" lead="Use these to compare your operational thinking against official documentation and hosting guidance.">
          <div className="download-grid">{templateLinks.map((item) => <a key={item.href} className="download-chip" href={item.href} target="_blank" rel="noreferrer">{item.label}</a>)}</div>
        </CollapsibleSection>
        <CollapsibleSection id="quiz" eyebrow="Quiz" title="Quick self-check before wrapping up" lead="Use these to confirm the learner understands what changes when a workflow leaves the prototype stage.">
          <div className="scenario-list">{quizCards.map((item) => <QuizCard key={item.title} item={item} />)}</div>
        </CollapsibleSection>
        <CollapsibleSection id="assignment" eyebrow="Assignment" title="Create a production readiness package" lead="The assignment should prove the learner can evaluate and improve a workflow as an operating system, not just as a demo.">
          <div className="section-subhead">
            <ol>{assignmentPrompts.map((item) => <li key={item}>{item}</li>)}</ol>
          </div>
        </CollapsibleSection>
        <CollapsibleSection id="tips" eyebrow="💡 Tips" title="Tips for this module" lead="This module works best when learners treat operational clarity as part of the product, not as an afterthought.">
          <div className="tips-grid">{tips.map((tip) => <article key={tip} className="tip-card"><p>{tip}</p></article>)}</div>
        </CollapsibleSection>
      </main>
      <a className="floating-index" href="#page-index">Index</a>
    </div>
  )
}
