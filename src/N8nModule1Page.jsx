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
  ['Module', 'Module 1: Foundations of n8n & Workflow Automation (2026 Edition)'],
  ['Goal by end', 'Be fully comfortable in the n8n editor, understand triggers, actions, data items, and basic expressions, and complete your first real automation.'],
  ['Why this matters', 'This module creates the baseline for logic, data handling, integrations, and later AI modules.']
]

const prerequisiteSteps = [
  'Go to n8n.io, sign up, and start with n8n Cloud free tier unless you already have a self-hosted setup.',
  'Open the Workflows dashboard and click New to enter the editor.',
  'Optionally prepare a low-cost or free LLM API key for later modules, but do not use it in this module.',
  'Confirm that you can save a workflow and execute a manual test run.'
]

const conceptCards = [
  {
    title: 'What n8n is today',
    detail:
      'n8n is a fair-code workflow automation platform that combines visual building with low-code flexibility. It is useful because it can stay simple for beginners and still scale into production later.'
  },
  {
    title: 'The items paradigm',
    detail:
      'Workflows move arrays of JSON items from left to right. A good mental model is spreadsheet rows as structured JSON objects flowing through connected steps.'
  },
  {
    title: 'Triggers, actions, and helpers',
    detail:
      'Triggers start the workflow, actions do business work, and helper nodes transform or branch the data. That mental separation makes later workflow design much easier.'
  },
  {
    title: 'Expressions',
    detail:
      'Expressions are how workflows become dynamic. Learners should get comfortable with {{ }} syntax early because it powers field references, formatting, and cross-node data access.'
  }
]

const labs = [
  {
    title: 'Lab 1: Daily Zen Quote to Email',
    concept:
      'Build a small but complete workflow that starts on a schedule, fetches data, reshapes it, and sends an output to email.',
    steps: [
      'Create a Schedule Trigger and configure it for daily or every few minutes during testing.',
      'Add an HTTP Request node pointing to https://zenquotes.io/api/random and execute it.',
      'Use a Set node to create clean fields such as quote and author with expressions.',
      'Add Gmail or Send Email and send the quote to yourself using the Set node output.',
      'Execute the whole workflow and inspect each node input and output to trace the data.'
    ],
    prompt:
      'While building this workflow, explain each node’s role in plain language and tell me what data shape is moving between nodes so I understand the workflow, not just the clicks.'
  },
  {
    title: 'Lab 2: Import and Explore a Beginner Template',
    concept:
      'Use an official beginner template as a guided exploration exercise rather than starting every time from a blank canvas.',
    steps: [
      'Open the n8n workflow gallery and search for basic or first-step templates.',
      'Import a beginner template such as Learn n8n basics in 3 easy steps or a JSON/expressions tutorial.',
      'Execute it node by node and inspect input and output at each step.',
      'Add one Set node or personalization field so the learner changes something real before rerunning it.'
    ],
    prompt:
      'Review this imported beginner workflow and explain it node by node. Then suggest one small personalization change that helps me understand the pattern better.'
  }
]

const templateLinks = [
  {
    label: 'Learn n8n basics in 3 easy steps',
    href: 'https://n8n.io/workflows/8527'
  },
  {
    label: 'Build your first AI agent',
    href: 'https://n8n.io/workflows/6270'
  },
  {
    label: 'n8n workflow gallery',
    href: 'https://n8n.io/workflows'
  }
]

const quizCards = [
  {
    title: 'Quick check 1',
    question: 'What node type starts a workflow automatically?',
    options: ['Trigger', 'Set', 'Merge', 'Code'],
    correctIndex: 0
  },
  {
    title: 'Quick check 2',
    question: 'How do you reference a field from the previous node?',
    options: [
      'Use an expression such as {{ $json.fieldName }}',
      'Type the field name as plain text',
      'Use only the node label',
      'It can only be done in the Code node'
    ],
    correctIndex: 0
  },
  {
    title: 'Quick check 3',
    question: 'Where do you see what a node received and produced?',
    options: [
      'In the Input and Output pane of the selected node',
      'Only in the workflow name',
      'Only in browser developer tools',
      'Inside credentials settings'
    ],
    correctIndex: 0
  },
  {
    title: 'Quick check 4',
    question: 'What is the difference between manual execution and an active workflow?',
    options: [
      'Manual runs on demand; active runs on trigger events',
      'Manual runs are faster than active runs',
      'Active runs work only with AI nodes',
      'There is no real difference'
    ],
    correctIndex: 0
  }
]

const assignmentPrompts = [
  'Build a morning weather alert for Delhi that fetches the current weather, formats the result cleanly, and sends it through email or Telegram.',
  'Build a to-do reminder workflow that reads tasks from Google Sheets and sends a useful reminder message through email or Slack.',
  'Build a new RSS articles digest that pulls recent feed items, cleans the text, and sends the latest articles as a formatted message.'
]

const tips = [
  'Do not rush into branching or AI in this module. The win condition is comfort inside the editor and confidence tracing data through a simple workflow.',
  'Inspect Input and Output after every node execution. That habit will save a lot of debugging time later.',
  'Use the expression editor instead of memorizing syntax too early. It teaches the structure while reducing friction.',
  'If credentials slow the learner down, switch temporarily to a simpler output node so the workflow pattern is still learned.'
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

export default function N8nModule1Page() {
  return (
    <div className="page-shell" style={{ '--accent': '#ea580c', '--accent-soft': '#fed7aa' }}>
      <header className="hero">
        <div className="hero-copy">
          <p className="eyebrow">n8n Module 1</p>
          <h1>Foundations of n8n <span>& Workflow Automation</span></h1>
          <p className="lead">A dedicated 2026-edition module page for beginners who need a strong, practical foundation in the n8n editor before moving into logic, integrations, and AI workflows.</p>
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
            <p>Finish this module comfortable inside the n8n editor, able to explain the core building blocks, and able to execute one real starter automation on your own.</p>
          </div>
        </aside>
      </header>
      <main>
        <CollapsibleSection id="overview" eyebrow="Overview" title="What this module is designed to achieve" lead="This module intentionally stays foundational so later logic and AI work feels easier instead of overwhelming.">
          <div className="notes-grid">{overviewCards.map(([title, detail]) => <InfoCard key={title} title={title} detail={detail} tone="model-note" />)}</div>
        </CollapsibleSection>
        <CollapsibleSection id="prerequisites" eyebrow="Prerequisites" title="What to do before starting the labs" lead="This setup removes the most common blockers before the hands-on work begins.">
          <div className="section-subhead">
            <ol>{prerequisiteSteps.map((step) => <li key={step}>{step}</li>)}</ol>
          </div>
        </CollapsibleSection>
        <CollapsibleSection id="core-concepts" eyebrow="Core Concepts" title="Concepts every learner should understand before Module 2" lead="These are the building blocks that make later logic, APIs, and AI much easier to grasp.">
          <div className="notes-grid">{conceptCards.map((item) => <InfoCard key={item.title} title={item.title} detail={item.detail} tone="model-note" />)}</div>
        </CollapsibleSection>
        <CollapsibleSection id="hands-on-labs" eyebrow="Hands-On Labs" title="Build first, then inspect and explain" lead="The labs are designed to make learners read data flow, not just click through nodes.">
          <div className="scenario-list">{labs.map((item) => <LabCard key={item.title} item={item} />)}</div>
        </CollapsibleSection>
        <CollapsibleSection id="templates" eyebrow="Templates" title="Recommended templates and direct links" lead="These are useful shortcuts for guided exploration and reinforcement.">
          <div className="download-grid">{templateLinks.map((item) => <a key={item.href} className="download-chip" href={item.href} target="_blank" rel="noreferrer">{item.label}</a>)}</div>
        </CollapsibleSection>
        <CollapsibleSection id="quiz" eyebrow="Quiz" title="Quick self-check before moving on" lead="Use these to confirm the learner understands the workflow basics, not just the screen clicks.">
          <div className="scenario-list">{quizCards.map((item) => <QuizCard key={item.title} item={item} />)}</div>
        </CollapsibleSection>
        <CollapsibleSection id="assignment" eyebrow="Assignment" title="Complete one starter automation before saying done" lead="The assignment matters because it proves the learner can transfer the pattern into a new workflow.">
          <div className="section-subhead">
            <ol>{assignmentPrompts.map((item) => <li key={item}>{item}</li>)}</ol>
          </div>
        </CollapsibleSection>
        <CollapsibleSection id="tips" eyebrow="💡 Tips" title="Tips for this module" lead="Use these coaching notes to keep the learner focused and moving.">
          <div className="tips-grid">{tips.map((tip) => <article key={tip} className="tip-card"><p>{tip}</p></article>)}</div>
        </CollapsibleSection>
      </main>
      <a className="floating-index" href="#page-index">Index</a>
    </div>
  )
}
