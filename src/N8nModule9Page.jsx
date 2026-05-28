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
  ['Module', 'Module 9: Real-World Use Cases & Capstone Projects'],
  ['Goal by end', 'Choose business-facing use cases, build and test end-to-end workflows, and package them as portfolio-quality or deployable capstone projects.'],
  ['Why this matters', 'This module is where learners prove business value, not just technical understanding.']
]

const prerequisiteSteps = [
  'Complete the earlier modules so integrations, AI models, agents, retrieval, and review patterns are already available to you.',
  'Pick one business context such as support, CRM, marketing, operations, content, or internal knowledge.',
  'Define a small but real problem statement so the capstone is scoped enough to finish.',
  'Gather the data sources, apps, or documents you will need before you start building.'
]

const conceptCards = [
  {
    title: 'A use case should solve a real problem',
    detail:
      'The strongest projects are anchored in a clear business problem with a visible before-and-after workflow, not in a list of features.'
  },
  {
    title: 'Scope beats ambition',
    detail:
      'A smaller workflow that is tested, documented, and understandable is much stronger than an oversized project that only works in a live demo.'
  },
  {
    title: 'Capstones should show judgment',
    detail:
      'Learners should be able to explain why they chose a trigger, why AI is or is not used, where human review is needed, and what success looks like.'
  },
  {
    title: 'Documentation is part of the deliverable',
    detail:
      'A good capstone includes a short walkthrough, assumptions, failure handling, and the business impact of the workflow. That makes it reusable and teachable.'
  },
  {
    title: 'Variety of use cases strengthens confidence',
    detail:
      'This module should expose learners to several patterns such as email processing, CRM help, content transformation, and support routing so they see the range of what n8n can do.'
  }
]

const labs = [
  {
    title: 'Lab 1: AI Email Processor & Responder',
    concept:
      'Build a workflow that ingests an incoming email, classifies it, drafts a response, and routes it according to urgency or topic.',
    steps: [
      'Choose an email trigger or simulate incoming message content.',
      'Classify the email by type, urgency, or sentiment.',
      'Generate a response draft or recommendation.',
      'Route the result to reply, escalation, or review based on business rules.',
      'Log the output or store a record so the workflow stays auditable.'
    ],
    prompt:
      'Analyze this incoming message, identify the topic and urgency, draft a useful reply, and state whether the workflow should answer automatically or send the case for human review.'
  },
  {
    title: 'Lab 2: CRM or Account Research Assistant',
    concept:
      'Build a workflow that assembles structured context for account reviews, lead qualification, or customer briefings.',
    steps: [
      'Select a CRM-like source or a spreadsheet-based substitute.',
      'Pull relevant account or lead context into the workflow.',
      'Use AI to summarize the most important information and next actions.',
      'Send the result to a workspace channel, email, or a CRM note field.',
      'Review whether the output is specific enough to save actual prep time.'
    ],
    prompt:
      'Create a concise account briefing using the available customer, pipeline, and activity context. Highlight risks, opportunities, and the next best action.'
  },
  {
    title: 'Lab 3: Content or Knowledge Workflow',
    concept:
      'Turn one source into multiple outputs so learners see how n8n can support content, enablement, and knowledge workflows with one automation backbone.',
    steps: [
      'Choose a source such as a transcript, blog post, meeting notes, or document set.',
      'Transform it into two or more outputs such as a summary, social draft, FAQ, or internal note.',
      'Add review steps if the output will be externally visible.',
      'Store or publish the outputs into the destination systems.',
      'Document what part of the workflow saves the most time.'
    ],
    prompt:
      'Transform the source material into a short executive summary, a customer-facing snippet, and an internal next-steps note. Keep each output aligned to its audience.'
  }
]

const templateLinks = [
  {
    label: 'n8n AI workflow gallery',
    href: 'https://n8n.io/workflows'
  },
  {
    label: 'n8n community forum',
    href: 'https://community.n8n.io/'
  },
  {
    label: 'n8n blog',
    href: 'https://blog.n8n.io/'
  }
]

const quizCards = [
  {
    title: 'Quick check 1',
    question: 'What makes a capstone use case strong?',
    options: [
      'It solves a clear business problem with a testable workflow',
      'It uses the maximum possible number of nodes',
      'It avoids documentation',
      'It must include every AI technique from the course'
    ],
    correctIndex: 0
  },
  {
    title: 'Quick check 2',
    question: 'Why is scope so important in Module 9?',
    options: [
      'Because a smaller, well-tested workflow is more valuable than an oversized unfinished one',
      'Because n8n only supports small projects',
      'Because capstones cannot use integrations',
      'Because documentation replaces the build'
    ],
    correctIndex: 0
  },
  {
    title: 'Quick check 3',
    question: 'What should a good capstone explanation include?',
    options: [
      'The business problem, workflow design choices, guardrails, and expected impact',
      'Only a screenshot of the canvas',
      'Only the API keys used',
      'Only the final prompt'
    ],
    correctIndex: 0
  },
  {
    title: 'Quick check 4',
    question: 'Why are business-facing use cases important in this module?',
    options: [
      'They prove that the workflow creates value beyond technical novelty',
      'They make the workflow harder for no benefit',
      'They remove the need for testing',
      'They are only useful for marketers'
    ],
    correctIndex: 0
  }
]

const assignmentPrompts = [
  'Build and document one end-to-end workflow in a business context such as support, CRM, operations, marketing, or internal knowledge.',
  'Choose three candidate capstone ideas and develop one into a tested workflow with a clear demo path.',
  'Prepare a short walkthrough of your workflow that explains the business problem, the workflow design, and the guardrails.'
]

const tips = [
  'Pick a problem that feels real to you. Learners usually do better when the workflow solves something they actually understand.',
  'Document decisions as you go. That is much easier than reconstructing the logic after the workflow is finished.',
  'Test business usefulness, not only technical correctness. Ask whether the output would actually save time or improve a decision.',
  'A focused capstone with clear value is stronger than a broad one with too many half-finished ideas.'
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

export default function N8nModule9Page() {
  return (
    <div className="page-shell" style={{ '--accent': '#ea580c', '--accent-soft': '#fed7aa' }}>
      <header className="hero">
        <div className="hero-copy">
          <p className="eyebrow">n8n Module 9</p>
          <h1>Real-World Use Cases <span>& Capstone Projects</span></h1>
          <p className="lead">A practical module for choosing business-facing projects, turning them into tested workflows, and packaging them as capstones with clear business value.</p>
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
            <p>Finish this module with at least one project that clearly demonstrates business value, tested workflow behavior, and a story you can explain to someone else.</p>
          </div>
        </aside>
      </header>
      <main>
        <CollapsibleSection id="overview" eyebrow="Overview" title="What this module is designed to achieve" lead="This is where technical learning becomes demonstrated business value.">
          <div className="notes-grid">{overviewCards.map(([title, detail]) => <InfoCard key={title} title={title} detail={detail} tone="model-note" />)}</div>
        </CollapsibleSection>
        <CollapsibleSection id="prerequisites" eyebrow="Prerequisites" title="What to prepare before choosing a capstone" lead="A clear problem statement and available data are more important here than adding more features.">
          <div className="section-subhead">
            <ol>{prerequisiteSteps.map((step) => <li key={step}>{step}</li>)}</ol>
          </div>
        </CollapsibleSection>
        <CollapsibleSection id="core-concepts" eyebrow="Core Concepts" title="The capstone concepts learners should understand first" lead="These ideas help learners choose projects that are practical, explainable, and worth completing.">
          <div className="notes-grid">{conceptCards.map((item) => <InfoCard key={item.title} title={item.title} detail={item.detail} tone="model-note" />)}</div>
        </CollapsibleSection>
        <CollapsibleSection id="hands-on-labs" eyebrow="Hands-On Labs" title="Build business-facing workflows" lead="These labs are structured to move from common business tasks into capstone-grade projects.">
          <div className="scenario-list">{labs.map((item) => <LabCard key={item.title} item={item} />)}</div>
        </CollapsibleSection>
        <CollapsibleSection id="templates" eyebrow="Templates" title="Useful references and starter links" lead="Use these to source ideas, compare patterns, and avoid starting from a blank page unnecessarily.">
          <div className="download-grid">{templateLinks.map((item) => <a key={item.href} className="download-chip" href={item.href} target="_blank" rel="noreferrer">{item.label}</a>)}</div>
        </CollapsibleSection>
        <CollapsibleSection id="quiz" eyebrow="Quiz" title="Quick self-check before moving on" lead="Use these to confirm the learner is choosing and framing projects in a business-relevant way.">
          <div className="scenario-list">{quizCards.map((item) => <QuizCard key={item.title} item={item} />)}</div>
        </CollapsibleSection>
        <CollapsibleSection id="assignment" eyebrow="Assignment" title="Develop one capstone-quality workflow" lead="The assignment should prove the learner can frame a business problem, build a usable workflow, and explain the value clearly.">
          <div className="section-subhead">
            <ol>{assignmentPrompts.map((item) => <li key={item}>{item}</li>)}</ol>
          </div>
        </CollapsibleSection>
        <CollapsibleSection id="tips" eyebrow="💡 Tips" title="Tips for this module" lead="This module goes best when learners choose a project they can actually explain and validate, not just one that sounds impressive.">
          <div className="tips-grid">{tips.map((tip) => <article key={tip} className="tip-card"><p>{tip}</p></article>)}</div>
        </CollapsibleSection>
      </main>
      <a className="floating-index" href="#page-index">Index</a>
    </div>
  )
}
