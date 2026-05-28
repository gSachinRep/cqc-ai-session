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
  ['Module', 'Module 5: Your First AI Chat Agent'],
  ['Goal by end', 'Build and customize a conversational AI agent using Chat Trigger and AI Agent, add memory, and understand how agents differ from simpler chains.'],
  ['Why this matters', 'This is the point where AI in n8n becomes interactive, contextual, and much closer to real assistant behavior.']
]

const prerequisiteSteps = [
  'Have at least one working LLM credential such as Groq, Gemini, OpenAI, or Anthropic from Module 4.',
  'Open your n8n workspace and confirm you can create or duplicate a workflow.',
  'Be ready to test inside Chat Hub or the local chat UI rather than only through manual node execution.',
  'Optional: review Module 4 so system prompts, temperature, and structured outputs still feel familiar.'
]

const conceptCards = [
  {
    title: 'Chat Trigger starts the conversation',
    detail:
      'Chat Trigger gives the workflow an interactive entry point. It can power local testing first and later an embedded or production-facing chat experience.'
  },
  {
    title: 'AI Agent adds reasoning behavior',
    detail:
      'Unlike a simple chain, the AI Agent node can manage reasoning loops and prepare for tool use. Even before tools are added, it helps learners understand agent-style orchestration.'
  },
  {
    title: 'System prompt sets the behavior',
    detail:
      'The system prompt defines role, tone, guardrails, and conversational rules. It is the fastest way to change the personality and usefulness of the agent.'
  },
  {
    title: 'Memory makes follow-up questions meaningful',
    detail:
      'Memory nodes allow the workflow to carry conversational state so the agent can answer questions like "what did I tell you earlier?" without re-supplying all context.'
  },
  {
    title: 'Testing should be conversational, not theoretical',
    detail:
      'The best way to evaluate a chat agent is through multiple turns. Learners should test clarifying questions, follow-ups, memory recall, and style consistency.'
  }
]

const labs = [
  {
    title: 'Lab 1: Build Your First Chat Agent',
    concept:
      'Create a minimal but real chat agent using Chat Trigger, AI Agent, a chat model, and a business-oriented system prompt.',
    steps: [
      'Start a new workflow and add Chat Trigger.',
      'Add AI Agent and keep the modern default Tools Agent behavior.',
      'Connect a chat model such as Groq, Gemini, OpenAI, or Anthropic.',
      'Set a system prompt for a persona such as a calm project-planning assistant or an internal operations copilot.',
      'Test the conversation in Chat Hub and inspect the execution trace.'
    ],
    prompt:
      'You are FlowGuide, a clear and practical project-planning assistant. Help users break down goals into small next steps, ask clarifying questions when needed, and keep answers concise and actionable.'
  },
  {
    title: 'Lab 2: Add Memory and Multi-Turn Recall',
    concept:
      'Upgrade the first chat agent with memory so the conversation can reference earlier user context instead of behaving like isolated one-off prompts.',
    steps: [
      'Duplicate the first workflow.',
      'Attach Simple Memory or Chat Memory Manager to the AI Agent.',
      'Test a multi-turn conversation where the user shares their name, team, or project goal.',
      'Ask follow-up questions later in the same conversation that require recall.',
      'Adjust the system prompt so the agent uses remembered context appropriately without overclaiming.'
    ],
    prompt:
      'You are FlowGuide, an internal planning coach. Remember the user’s role, project, and main constraints during the current conversation. Use that context to make later advice more relevant.'
  },
  {
    title: 'Lab 3: Import and Dissect a Beginner Agent Template',
    concept:
      'Import a starter chatbot or AI assistant template and study how Chat Trigger, model, memory, and prompt configuration fit together.',
    steps: [
      'Open the n8n workflow gallery and search for agent or chatbot templates.',
      'Import a beginner-friendly agent template.',
      'Run it in Chat Hub and inspect the execution data.',
      'Replace the template persona with a new role such as a workshop coach, onboarding guide, or meeting facilitator.',
      'Re-test and document what changed in behavior.'
    ],
    prompt:
      'Review this imported chat-agent workflow and explain which parts control conversation entry, which parts control behavior, and which parts enable memory or later tool use.'
  }
]

const templateLinks = [
  {
    label: 'Build your first AI agent',
    href: 'https://n8n.io/workflows/6270'
  },
  {
    label: 'Question and answer AI agent chatbot',
    href: 'https://n8n.io/workflows'
  },
  {
    label: 'n8n AI workflow gallery',
    href: 'https://n8n.io/workflows'
  }
]

const quizCards = [
  {
    title: 'Quick check 1',
    question: 'What node starts the conversational interface in an n8n chat workflow?',
    options: ['Chat Trigger', 'Set', 'Merge', 'Respond to Webhook'],
    correctIndex: 0
  },
  {
    title: 'Quick check 2',
    question: 'Why add memory to an AI chat agent?',
    options: [
      'To help the agent retain recent conversation context across turns',
      'To make the model cheaper',
      'To replace the system prompt entirely',
      'To remove the need for testing'
    ],
    correctIndex: 0
  },
  {
    title: 'Quick check 3',
    question: 'What is the role of the system prompt in an AI Agent workflow?',
    options: [
      'It sets role, tone, and behavior rules for the agent',
      'It stores credentials',
      'It activates webhooks',
      'It replaces the model selection'
    ],
    correctIndex: 0
  },
  {
    title: 'Quick check 4',
    question: 'How is an agent different from a simple chain?',
    options: [
      'An agent can manage reasoning behavior and later use tools or memory',
      'A chain always uses memory and an agent never does',
      'An agent cannot use prompts',
      'There is no practical difference'
    ],
    correctIndex: 0
  }
]

const assignmentPrompts = [
  'Build a personal planning coach agent that remembers the user’s current goal and helps break it into next steps.',
  'Build a support or FAQ bot that remembers what module or workflow topic the user was asking about earlier in the conversation.',
  'Build a fun but useful chat assistant with a distinct voice, then test whether the style remains consistent across five or more turns.'
]

const tips = [
  'Keep the first persona practical. It is easier to evaluate usefulness when the assistant is solving a clear job rather than only sounding entertaining.',
  'Test memory with deliberate recall questions rather than assuming it works because the node is connected.',
  'If responses get too long, tighten the system prompt before changing everything else.',
  'Use execution traces after each chat test. They reveal more than the visible conversation alone.'
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

export default function N8nModule5Page() {
  return (
    <div className="page-shell" style={{ '--accent': '#ea580c', '--accent-soft': '#fed7aa' }}>
      <header className="hero">
        <div className="hero-copy">
          <p className="eyebrow">n8n Module 5</p>
          <h1>Your First <span>AI Chat Agent</span></h1>
          <p className="lead">A practical module for building, testing, and customizing a conversational agent in n8n using Chat Trigger, AI Agent, memory, and iterative prompt refinement.</p>
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
            <p>Finish this module able to build a functioning chat agent, adjust its behavior with prompts, test memory, and explain how agent workflows differ from simple chains.</p>
          </div>
        </aside>
      </header>
      <main>
        <CollapsibleSection id="overview" eyebrow="Overview" title="What this module is designed to achieve" lead="This is where AI workflows start to feel conversational and interactive rather than just procedural.">
          <div className="notes-grid">{overviewCards.map(([title, detail]) => <InfoCard key={title} title={title} detail={detail} tone="model-note" />)}</div>
        </CollapsibleSection>
        <CollapsibleSection id="prerequisites" eyebrow="Prerequisites" title="What to prepare before building the agent" lead="A working model credential and comfort with prompt basics will make this module much smoother.">
          <div className="section-subhead">
            <ol>{prerequisiteSteps.map((step) => <li key={step}>{step}</li>)}</ol>
          </div>
        </CollapsibleSection>
        <CollapsibleSection id="core-concepts" eyebrow="Core Concepts" title="The agent concepts learners need first" lead="These ideas help learners understand what the chat workflow is doing under the hood.">
          <div className="notes-grid">{conceptCards.map((item) => <InfoCard key={item.title} title={item.title} detail={item.detail} tone="model-note" />)}</div>
        </CollapsibleSection>
        <CollapsibleSection id="hands-on-labs" eyebrow="Hands-On Labs" title="Build and test your first chat agents" lead="These labs introduce the minimum moving parts of an agent workflow before tools and retrieval are added later.">
          <div className="scenario-list">{labs.map((item) => <LabCard key={item.title} item={item} />)}</div>
        </CollapsibleSection>
        <CollapsibleSection id="templates" eyebrow="Templates" title="Useful starter templates and references" lead="These links are useful for importing, studying, and customizing early chat-agent workflows.">
          <div className="download-grid">{templateLinks.map((item) => <a key={item.href} className="download-chip" href={item.href} target="_blank" rel="noreferrer">{item.label}</a>)}</div>
        </CollapsibleSection>
        <CollapsibleSection id="quiz" eyebrow="Quiz" title="Quick self-check before moving on" lead="Use these to confirm the learner understands chat triggers, memory, and the role of the AI Agent node.">
          <div className="scenario-list">{quizCards.map((item) => <QuizCard key={item.title} item={item} />)}</div>
        </CollapsibleSection>
        <CollapsibleSection id="assignment" eyebrow="Assignment" title="Build one personalized chat agent" lead="The assignment should prove the learner can customize behavior and test multi-turn interaction, not just import a template.">
          <div className="section-subhead">
            <ol>{assignmentPrompts.map((item) => <li key={item}>{item}</li>)}</ol>
          </div>
        </CollapsibleSection>
        <CollapsibleSection id="tips" eyebrow="💡 Tips" title="Tips for this module" lead="This module improves quickly when learners test and revise instead of trying to perfect the first prompt.">
          <div className="tips-grid">{tips.map((tip) => <article key={tip} className="tip-card"><p>{tip}</p></article>)}</div>
        </CollapsibleSection>
      </main>
      <a className="floating-index" href="#page-index">Index</a>
    </div>
  )
}
