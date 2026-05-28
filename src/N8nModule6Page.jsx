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
  ['Module', 'Module 6: AI Agents Deep Dive — Tools, Reasoning & Autonomy'],
  ['Goal by end', 'Build AI agents that can use tools, hand work to sub-workflows, reason through multi-step tasks, and act across connected systems more reliably.'],
  ['Why this matters', 'This is the shift from AI that only responds to AI that can inspect, decide, fetch, and trigger actions inside a workflow.']
]

const prerequisiteSteps = [
  'Complete Modules 4 and 5 so chat models, prompts, and basic agent structure already feel familiar.',
  'Prepare one or two connected services the agent can use as tools, such as Gmail, Google Sheets, HTTP Request, or a custom n8n workflow.',
  'Keep a working model credential ready and confirm Chat Hub testing still works.',
  'Be ready to inspect execution traces carefully because tool-using agents need closer debugging than simple chains.'
]

const conceptCards = [
  {
    title: 'Tools turn an agent into an actor',
    detail:
      'A tool-enabled agent can look things up, write to systems, trigger workflows, and retrieve structured context. That is what makes the agent operational instead of only conversational.'
  },
  {
    title: 'Reasoning loops need guardrails',
    detail:
      'Agents may think, act, observe, and try again. Iteration limits, clear prompts, and narrow tool permissions keep that loop useful instead of wasteful.'
  },
  {
    title: 'Sub-workflows are reusable tools',
    detail:
      'Call n8n Workflow Tool lets you package common logic into a sub-workflow that the agent can invoke. This keeps the main agent cleaner and makes capabilities reusable.'
  },
  {
    title: 'Output discipline still matters',
    detail:
      'Even autonomous agents need bounded outputs. Learners should keep asking for structured summaries, status fields, and explicit next actions so downstream workflow logic stays stable.'
  },
  {
    title: 'Autonomy should be scoped',
    detail:
      'A good agent is not one that does everything. It is one that has permission to do the right set of things, in the right order, with enough context and enough limits.'
  }
]

const labs = [
  {
    title: 'Lab 1: Add Search and Retrieval Tools to an Agent',
    concept:
      'Upgrade a basic chat agent by giving it a few narrowly scoped tools so it can retrieve facts and answer with more grounded context.',
    steps: [
      'Start from a working chat-agent workflow from Module 5.',
      'Add one retrieval-style tool such as HTTP Request, SerpAPI, or a sub-workflow that returns structured information.',
      'Update the system prompt so the agent knows when to use the tool and when to answer directly.',
      'Test questions that should trigger tool use and compare them with questions that should not.',
      'Inspect the execution trace to confirm the tool call path is happening the way you intended.'
    ],
    prompt:
      'You are an operations research assistant. Use tools when a question requires current or external data. If the answer can be given from the current conversation alone, respond directly. Explain your final answer clearly and briefly.'
  },
  {
    title: 'Lab 2: Create a Reusable Sub-Workflow Tool',
    concept:
      'Wrap a repeatable capability in a separate workflow and expose it as a tool the agent can call on demand.',
    steps: [
      'Create a new workflow that accepts a topic or query and returns a structured result such as project status, account notes, or document lookup.',
      'Expose that workflow through Call n8n Workflow Tool.',
      'Connect the tool to the agent in the main workflow.',
      'Update the system prompt so the agent understands what the tool does and when to use it.',
      'Test at least three conversations that should trigger the sub-workflow and inspect the returned payload.'
    ],
    prompt:
      'You can call an internal workflow tool called project_lookup. Use it whenever the user asks about project status, owners, blockers, or next milestones. Summarize the returned information clearly and avoid exposing raw internal payloads.'
  },
  {
    title: 'Lab 3: Multi-Step Action Agent',
    concept:
      'Design an agent that must retrieve information, decide on a next step, and trigger an action such as sending a summary or creating a record.',
    steps: [
      'Choose a practical use case such as meeting prep, account research, or issue triage.',
      'Connect at least two tools, such as one retrieval tool and one action tool.',
      'Set max iterations and clear instructions so the agent does not wander between tools.',
      'Run end-to-end tests where the agent has to gather context and then perform an action.',
      'Review the execution trace and tighten prompts or tool descriptions where the reasoning gets sloppy.'
    ],
    prompt:
      'You are a workflow assistant for account reviews. First gather the account context using the available tools. Then decide whether there is enough information to send a briefing summary. If yes, trigger the summary action. If not, ask one clarifying question.'
  }
]

const templateLinks = [
  {
    label: 'n8n AI agent docs',
    href: 'https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.agent/'
  },
  {
    label: 'Call n8n Workflow Tool docs',
    href: 'https://docs.n8n.io/advanced-ai/'
  },
  {
    label: 'n8n AI workflow gallery',
    href: 'https://n8n.io/workflows'
  }
]

const quizCards = [
  {
    title: 'Quick check 1',
    question: 'What changes when you add tools to an agent?',
    options: [
      'The agent can retrieve information or take actions beyond pure text generation',
      'The agent no longer needs a model',
      'The workflow becomes deterministic by default',
      'The agent stops using prompts'
    ],
    correctIndex: 0
  },
  {
    title: 'Quick check 2',
    question: 'Why would you use Call n8n Workflow Tool?',
    options: [
      'To package reusable workflow logic as a tool the agent can invoke',
      'To replace all triggers in the workflow',
      'To disable execution history',
      'To make credentials unnecessary'
    ],
    correctIndex: 0
  },
  {
    title: 'Quick check 3',
    question: 'Why are max iterations useful in an agent workflow?',
    options: [
      'They limit runaway reasoning loops and unnecessary tool calls',
      'They make the model more creative',
      'They replace memory',
      'They are only needed for webhooks'
    ],
    correctIndex: 0
  },
  {
    title: 'Quick check 4',
    question: 'What is the safest way to expand agent autonomy?',
    options: [
      'Add a few tightly scoped tools and test each tool path deliberately',
      'Give the agent every connected app at once',
      'Remove all action limits from the prompt',
      'Skip execution-trace review to save time'
    ],
    correctIndex: 0
  }
]

const assignmentPrompts = [
  'Build an autonomous research agent that gathers context from one or two tools and returns a structured briefing.',
  'Build a meeting-prep agent that looks up project or account information and then drafts a concise preparation note.',
  'Build an issue-triage agent that inspects incoming context, decides whether there is enough information, and either routes an action or asks a clarifying question.'
]

const tips = [
  'Start with one retrieval tool and one action tool. That is usually enough to teach the pattern without overcomplicating the agent.',
  'Name tools clearly and describe them narrowly. Agents behave better when the tool contract is obvious.',
  'Review execution traces after every failed run. Most agent bugs are prompt, tool-description, or payload-shape issues rather than model issues.',
  'Scope autonomy carefully. The best learning outcome is a reliable agent, not the most ambitious one.'
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

export default function N8nModule6Page() {
  return (
    <div className="page-shell" style={{ '--accent': '#ea580c', '--accent-soft': '#fed7aa' }}>
      <header className="hero">
        <div className="hero-copy">
          <p className="eyebrow">n8n Module 6</p>
          <h1>AI Agents Deep Dive <span>— Tools, Reasoning & Autonomy</span></h1>
          <p className="lead">A practical module for moving from chat-style agents to agents that can use tools, call sub-workflows, make bounded decisions, and act inside larger automation systems.</p>
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
            <p>Finish this module able to connect tools to an agent, reason about multi-step autonomy, and keep agent behavior constrained enough to be useful and reviewable.</p>
          </div>
        </aside>
      </header>
      <main>
        <CollapsibleSection id="overview" eyebrow="Overview" title="What this module is designed to achieve" lead="This is where learners move from conversational AI to agents that can actually do work in a workflow.">
          <div className="notes-grid">{overviewCards.map(([title, detail]) => <InfoCard key={title} title={title} detail={detail} tone="model-note" />)}</div>
        </CollapsibleSection>
        <CollapsibleSection id="prerequisites" eyebrow="Prerequisites" title="What to prepare before adding tool use" lead="A little setup here makes agent debugging much more manageable.">
          <div className="section-subhead">
            <ol>{prerequisiteSteps.map((step) => <li key={step}>{step}</li>)}</ol>
          </div>
        </CollapsibleSection>
        <CollapsibleSection id="core-concepts" eyebrow="Core Concepts" title="The autonomy concepts learners need to understand first" lead="These ideas make agent behavior easier to design and much easier to control.">
          <div className="notes-grid">{conceptCards.map((item) => <InfoCard key={item.title} title={item.title} detail={item.detail} tone="model-note" />)}</div>
        </CollapsibleSection>
        <CollapsibleSection id="hands-on-labs" eyebrow="Hands-On Labs" title="Give your agent tools and bounded autonomy" lead="These labs focus on controlled action, reusable tooling, and step-by-step trace review.">
          <div className="scenario-list">{labs.map((item) => <LabCard key={item.title} item={item} />)}</div>
        </CollapsibleSection>
        <CollapsibleSection id="templates" eyebrow="Templates" title="Useful references and starter links" lead="Use these to ground the build in official patterns while still adapting to your use case.">
          <div className="download-grid">{templateLinks.map((item) => <a key={item.href} className="download-chip" href={item.href} target="_blank" rel="noreferrer">{item.label}</a>)}</div>
        </CollapsibleSection>
        <CollapsibleSection id="quiz" eyebrow="Quiz" title="Quick self-check before moving on" lead="Use these to confirm the learner understands tool use, bounded reasoning, and safe autonomy.">
          <div className="scenario-list">{quizCards.map((item) => <QuizCard key={item.title} item={item} />)}</div>
        </CollapsibleSection>
        <CollapsibleSection id="assignment" eyebrow="Assignment" title="Build one tool-using agent workflow" lead="The assignment should prove the learner can connect retrieval and action without losing control of the workflow.">
          <div className="section-subhead">
            <ol>{assignmentPrompts.map((item) => <li key={item}>{item}</li>)}</ol>
          </div>
        </CollapsibleSection>
        <CollapsibleSection id="tips" eyebrow="💡 Tips" title="Tips for this module" lead="This module goes best when learners keep autonomy narrow and inspect every tool path carefully.">
          <div className="tips-grid">{tips.map((tip) => <article key={tip} className="tip-card"><p>{tip}</p></article>)}</div>
        </CollapsibleSection>
      </main>
      <a className="floating-index" href="#page-index">Index</a>
    </div>
  )
}
