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
  ['Module', 'Module 8: Advanced Techniques & Production Patterns'],
  ['Goal by end', 'Add human review, stronger memory patterns, evaluations, retries, and multi-step production safeguards so workflows are more reliable and enterprise-ready.'],
  ['Why this matters', 'This is where learners stop building clever demos and start building systems that people can actually trust.']
]

const prerequisiteSteps = [
  'Complete Modules 6 and 7 so tool-using agents and grounded retrieval already feel familiar.',
  'Have at least one agent or RAG workflow ready to harden rather than building from scratch again.',
  'Pick one scenario where human review or approval would make the workflow more trustworthy.',
  'Be ready to test failures intentionally instead of testing only the happy path.'
]

const conceptCards = [
  {
    title: 'Human-in-the-loop is a product decision',
    detail:
      'Approvals, pauses, and review steps are not signs of weak automation. They are often what makes a workflow deployable in the first place.'
  },
  {
    title: 'Retries and evaluations make workflows resilient',
    detail:
      'A good workflow expects occasional failure. Retries, fallback paths, and output evaluations help catch problems before they become operational damage.'
  },
  {
    title: 'Memory strategy should be intentional',
    detail:
      'Long conversations and multi-step processes need memory, but not all memory should be kept forever. Learners should think about summarization, pruning, and the business value of remembered state.'
  },
  {
    title: 'Multi-agent orchestration needs clear boundaries',
    detail:
      'If more than one agent is involved, each agent should have a narrow role. Coordination works best when responsibilities are separated rather than duplicated.'
  },
  {
    title: 'Production patterns are really trust patterns',
    detail:
      'What makes an AI workflow production-ready is not only technical correctness. It is also explainability, recoverability, and controlled decision rights.'
  }
]

const labs = [
  {
    title: 'Lab 1: Add Human Review to an Agent Workflow',
    concept:
      'Introduce an approval checkpoint so learners can see how a workflow stays useful while still preserving human control in sensitive steps.',
    steps: [
      'Choose an existing workflow that drafts a recommendation, message, or action.',
      'Add a Wait or approval-style branch before the final external action.',
      'Send the proposed output to a reviewer through email, Slack, or another review channel.',
      'Resume the workflow only when approval is provided.',
      'Test both approval and rejection paths so the learner sees the full pattern.'
    ],
    prompt:
      'Generate a draft recommendation, but do not take the final action until a reviewer approves it. Present the result clearly enough that a human can quickly decide whether to proceed.'
  },
  {
    title: 'Lab 2: Add Evaluation and Retry Logic',
    concept:
      'Teach the workflow to inspect AI outputs and handle weak responses instead of passing them forward blindly.',
    steps: [
      'Choose a workflow where the AI output should follow a structure or quality threshold.',
      'Add an evaluation step that checks whether the output contains the expected fields or answer quality.',
      'If the evaluation fails, retry with a revised prompt or route to a fallback path.',
      'Log both the original and retried output for comparison.',
      'Test the workflow with intentionally weak or ambiguous inputs.'
    ],
    prompt:
      'Review the previous output for completeness, structure, and relevance. If the answer is missing required parts, return a short diagnosis that can be used to retry with a tighter prompt.'
  },
  {
    title: 'Lab 3: Multi-Step Analysis Workflow with Human Escalation',
    concept:
      'Combine retrieval, AI analysis, and a human escalation path so the workflow feels closer to a real business process.',
    steps: [
      'Choose a scenario such as sales analysis, support escalation, or policy interpretation.',
      'Use one step to gather context, a second step to analyze it, and a third step to decide whether human review is needed.',
      'If confidence is low or risk is high, send the case to a reviewer instead of auto-completing the workflow.',
      'If risk is low, continue to the final automation step.',
      'Inspect the logs and captured outputs so the decision boundary stays visible.'
    ],
    prompt:
      'Analyze the available context and determine whether the workflow can proceed automatically or should be escalated to a human reviewer. Base the decision on completeness, ambiguity, and business risk.'
  }
]

const templateLinks = [
  {
    label: 'Advanced AI examples in n8n docs',
    href: 'https://docs.n8n.io/advanced-ai/examples/'
  },
  {
    label: 'n8n AI workflow gallery',
    href: 'https://n8n.io/workflows'
  },
  {
    label: 'Human-in-the-loop automation reference',
    href: 'https://blog.n8n.io/'
  }
]

const quizCards = [
  {
    title: 'Quick check 1',
    question: 'Why add a human-in-the-loop step to an AI workflow?',
    options: [
      'To preserve review and control in higher-risk or ambiguous decisions',
      'To make the workflow slower for no reason',
      'To avoid using AI altogether',
      'To remove the need for prompts'
    ],
    correctIndex: 0
  },
  {
    title: 'Quick check 2',
    question: 'What is the purpose of output evaluation in a workflow?',
    options: [
      'To check whether the AI output is good enough before passing it forward',
      'To replace retrieval',
      'To store credentials',
      'To disable retries'
    ],
    correctIndex: 0
  },
  {
    title: 'Quick check 3',
    question: 'What is the safest way to design a multi-agent workflow?',
    options: [
      'Give each agent a narrow, explicit role with clear boundaries',
      'Give every agent the same tools and responsibilities',
      'Skip orchestration and let them all act at once',
      'Avoid any logging or trace inspection'
    ],
    correctIndex: 0
  },
  {
    title: 'Quick check 4',
    question: 'What makes a workflow production-ready?',
    options: [
      'Reliability, recoverability, review paths, and clear controls',
      'Only using the newest model',
      'Having the most nodes possible',
      'Removing all human checkpoints'
    ],
    correctIndex: 0
  }
]

const assignmentPrompts = [
  'Take an existing agent or RAG workflow and add a human-review checkpoint before the final action.',
  'Add evaluation and retry logic to an AI workflow so it can detect weak outputs before they move downstream.',
  'Build a multi-step analysis workflow that escalates to a reviewer when confidence or completeness is too low.'
]

const tips = [
  'Pick one reliability improvement at a time. Human review alone can teach a lot before adding retries, evaluation, and multi-agent coordination together.',
  'Test the unhappy path deliberately. Production patterns only matter if learners see what happens when the workflow struggles.',
  'Keep logs readable. A production workflow is easier to trust when someone can inspect what happened after the fact.',
  'Use human review at the highest-risk point, not at every point.'
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

export default function N8nModule8Page() {
  return (
    <div className="page-shell" style={{ '--accent': '#ea580c', '--accent-soft': '#fed7aa' }}>
      <header className="hero">
        <div className="hero-copy">
          <p className="eyebrow">n8n Module 8</p>
          <h1>Advanced Techniques <span>& Production Patterns</span></h1>
          <p className="lead">A practical module for hardening AI workflows with human review, evaluations, retries, stronger memory patterns, and multi-step production safeguards.</p>
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
            <p>Finish this module able to make AI workflows more trustworthy, reviewable, and resilient enough for real business usage.</p>
          </div>
        </aside>
      </header>
      <main>
        <CollapsibleSection id="overview" eyebrow="Overview" title="What this module is designed to achieve" lead="This is where learners turn capable AI workflows into safer and more deployable systems.">
          <div className="notes-grid">{overviewCards.map(([title, detail]) => <InfoCard key={title} title={title} detail={detail} tone="model-note" />)}</div>
        </CollapsibleSection>
        <CollapsibleSection id="prerequisites" eyebrow="Prerequisites" title="What to prepare before hardening workflows" lead="The best starting point is a working workflow that now needs stronger control and reliability.">
          <div className="section-subhead">
            <ol>{prerequisiteSteps.map((step) => <li key={step}>{step}</li>)}</ol>
          </div>
        </CollapsibleSection>
        <CollapsibleSection id="core-concepts" eyebrow="Core Concepts" title="The production concepts learners need to understand first" lead="These ideas shift the mindset from demo-building to trustworthy workflow design.">
          <div className="notes-grid">{conceptCards.map((item) => <InfoCard key={item.title} title={item.title} detail={item.detail} tone="model-note" />)}</div>
        </CollapsibleSection>
        <CollapsibleSection id="hands-on-labs" eyebrow="Hands-On Labs" title="Harden workflows with review and resilience patterns" lead="These labs focus on approvals, evaluations, retries, and controlled escalation.">
          <div className="scenario-list">{labs.map((item) => <LabCard key={item.title} item={item} />)}</div>
        </CollapsibleSection>
        <CollapsibleSection id="templates" eyebrow="Templates" title="Useful references and starter links" lead="Use these to compare your patterns with official examples and adapt them to your use case.">
          <div className="download-grid">{templateLinks.map((item) => <a key={item.href} className="download-chip" href={item.href} target="_blank" rel="noreferrer">{item.label}</a>)}</div>
        </CollapsibleSection>
        <CollapsibleSection id="quiz" eyebrow="Quiz" title="Quick self-check before moving on" lead="Use these to confirm the learner understands why reliability patterns matter in AI workflows.">
          <div className="scenario-list">{quizCards.map((item) => <QuizCard key={item.title} item={item} />)}</div>
        </CollapsibleSection>
        <CollapsibleSection id="assignment" eyebrow="Assignment" title="Harden one existing AI workflow" lead="The assignment should prove the learner can improve trust and resilience, not just add more capability.">
          <div className="section-subhead">
            <ol>{assignmentPrompts.map((item) => <li key={item}>{item}</li>)}</ol>
          </div>
        </CollapsibleSection>
        <CollapsibleSection id="tips" eyebrow="💡 Tips" title="Tips for this module" lead="This module works best when learners intentionally test risky or failure-prone scenarios instead of only happy paths.">
          <div className="tips-grid">{tips.map((tip) => <article key={tip} className="tip-card"><p>{tip}</p></article>)}</div>
        </CollapsibleSection>
      </main>
      <a className="floating-index" href="#page-index">Index</a>
    </div>
  )
}
