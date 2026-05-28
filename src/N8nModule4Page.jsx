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
  ['Module', 'Module 4: Introduction to AI in n8n — LLMs & Chains'],
  ['Goal by end', 'Understand how n8n infuses AI, configure LLM credentials, build prompt-to-LLM chains, and distinguish chains from agents.'],
  ['Why this matters', 'This is the bridge from classic automation into intelligent workflows. It helps learners see AI as another node in the workflow, not as a separate universe.']
]

const prerequisiteSteps = [
  'Open your n8n Cloud or self-hosted instance and confirm AI credits or provider access are available.',
  'Create at least one model credential such as Groq, Gemini, OpenAI, or Anthropic Claude.',
  'Test the credential connection in n8n before building the first chain.',
  'If using a local model path such as Ollama, confirm the model is running and reachable from the instance.'
]

const conceptCards = [
  {
    title: 'LLM vs Chain vs Agent',
    detail:
      'An LLM node is a direct model call, a chain is a structured sequence of prompt and model steps, and an agent adds reasoning, tool use, and often memory. This module stays with the simpler end of that spectrum.'
  },
  {
    title: 'Chat models are parameterized systems',
    detail:
      'Model name, temperature, max tokens, and system prompt all shape behavior. Learners should treat these settings as workflow variables, not as one-time defaults.'
  },
  {
    title: 'Prompt engineering is workflow design',
    detail:
      'Inside n8n, prompting is not only about words. It is also about where data comes from, how expressions are inserted, and whether the output will be readable or machine-usable downstream.'
  },
  {
    title: 'Structured output matters',
    detail:
      'Workflows become more robust when models are asked for predictable output such as JSON or clearly delimited sections. That makes branching, validation, and later automation much easier.'
  },
  {
    title: 'n8n AI nodes are built on an orchestration layer',
    detail:
      'n8n\'s AI architecture was originally built on LangChain.js concepts, and that structure still explains why root nodes, model nodes, prompt nodes, and memory nodes fit together. As of 2025, n8n has matured this into its own first-class AI interface with a dedicated Agent node, structured output, tool calling, and memory management. LangChain knowledge transfers well, but learners should work from n8n\'s own visual interface and official AI documentation rather than mapping directly from LangChain code.'
  }
]

const labs = [
  {
    title: 'Lab 1: Your First LLM Chain',
    concept:
      'Start with a simple summarization chain to show that AI can sit inside a normal workflow just like any other transformation step.',
    steps: [
      'Create a Manual Trigger and a Set node with a sample article or paragraph.',
      'Add an OpenAI, Groq, Gemini, or Anthropic Chat Model node with a concise summarizer system prompt.',
      'Pass the article text into the model using expressions.',
      'Extract or forward the model output into Set, Gmail, or Telegram for delivery.',
      'Test with a low temperature first so the result stays stable.'
    ],
    prompt:
      'Explain what this LLM chain is doing step by step, including where the article text enters, how the system prompt shapes the output, and what the downstream node will receive.'
  },
  {
    title: 'Lab 2: Classification and Reply Generation Chain',
    concept:
      'Use a single chain to classify a message and then generate a response, which helps learners see how AI adds value inside ordinary business workflows.',
    steps: [
      'Start with a Manual Trigger and a Set node holding a sample customer email or complaint.',
      'Use a prompt template or direct prompt that asks the model to classify the sentiment and generate a reply.',
      'Request a structured JSON response with sentiment and reply fields.',
      'Optionally branch using IF based on the parsed sentiment field.',
      'Route the output into a notification or escalation path.'
    ],
    prompt:
      'Review this chain and explain how the model is doing both classification and generation. Then suggest how to make the output more reliable for downstream branching.'
  },
  {
    title: 'Lab 3: Import and Dissect a Beginner AI Template',
    concept:
      'Import a basic AI template and treat it as a study object so learners understand the anatomy of an AI workflow instead of only copying it.',
    steps: [
      'Open the n8n workflow gallery and filter for AI templates.',
      'Import a simple chain-focused workflow such as a summarizer or a first agent template for inspection.',
      'Execute it node by node and inspect the payload entering and leaving the model node.',
      'Change the model or system prompt and re-run it with a different input.',
      'Document what changed and why.'
    ],
    prompt:
      'Walk me through this imported AI workflow node by node. Tell me what is generic LangChain structure, what is model-specific, and what is safe to customize first.'
  }
]

const templateLinks = [
  {
    label: 'n8n AI workflow gallery',
    href: 'https://n8n.io/workflows'
  },
  {
    label: 'Build your first AI agent',
    href: 'https://n8n.io/workflows/6270'
  },
  {
    label: 'Use any LangChain module in n8n',
    href: 'https://n8n.io/workflows/2082'
  }
]

const quizCards = [
  {
    title: 'Quick check 1',
    question: 'What is the practical difference between an LLM node and an AI Agent?',
    options: [
      'An LLM node generates directly; an agent reasons and can use tools',
      'They are the same thing with different colors',
      'LLM nodes can only summarize and agents can only translate',
      'Agents are only for self-hosted instances'
    ],
    correctIndex: 0
  },
  {
    title: 'Quick check 2',
    question: 'Where should you define the persona or role of the model?',
    options: [
      'In the system prompt of the chat model node',
      'In the webhook path',
      'Inside the Merge node',
      'Only in the credentials screen'
    ],
    correctIndex: 0
  },
  {
    title: 'Quick check 3',
    question: 'What is the best way to make model output easier to use downstream?',
    options: [
      'Ask for a structured format such as JSON',
      'Increase temperature as high as possible',
      'Remove all instructions from the prompt',
      'Always use a Code node before the model'
    ],
    correctIndex: 0
  },
  {
    title: 'Quick check 4',
    question: 'Why are chains a better beginner step than agents?',
    options: [
      'They are simpler and avoid tool use, memory, and reasoning loops',
      'They are faster only because they skip credentials',
      'They work only with OpenAI',
      'They do not need prompts'
    ],
    correctIndex: 0
  }
]

const assignmentPrompts = [
  'Build an article classifier and responder chain that categorizes a piece of text, produces a short summary, and suggests one next action.',
  'Build an email drafter chain that turns a customer query into a professional reply with tone adjusted by urgency.',
  'Extend the Module 1 quote workflow with an LLM chain that explains the quote simply and adds a motivational angle for entrepreneurs.'
]

const tips = [
  'Keep the first model workflow narrow. The win is understanding the chain pattern, not building an all-in-one assistant too early.',
  'Prefer cheaper and faster models for early practice so the learner can experiment more freely.',
  'Ask for structured outputs early, even in simple labs. That habit will pay off in later modules.',
  'Treat chains as deterministic workflow steps whenever possible. Save tool use and autonomy for Module 5 and beyond.'
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

export default function N8nModule4Page() {
  return (
    <div className="page-shell" style={{ '--accent': '#ea580c', '--accent-soft': '#fed7aa' }}>
      <header className="hero">
        <div className="hero-copy">
          <p className="eyebrow">n8n Module 4</p>
          <h1>Introduction to AI in n8n <span>— LLMs & Chains</span></h1>
          <p className="lead">A practical module for learning how n8n adds AI through chat models and chains before moving into full agents, tools, and memory.</p>
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
            <p>Finish this module able to configure model credentials, build simple chains, structure prompts, and understand why chains are the right stepping stone before agents.</p>
          </div>
        </aside>
      </header>
      <main>
        <CollapsibleSection id="overview" eyebrow="Overview" title="What this module is designed to achieve" lead="This is the bridge from classic automation into intelligent workflows.">
          <div className="notes-grid">{overviewCards.map(([title, detail]) => <InfoCard key={title} title={title} detail={detail} tone="model-note" />)}</div>
        </CollapsibleSection>
        <CollapsibleSection id="prerequisites" eyebrow="Prerequisites" title="What to prepare before starting the AI builds" lead="A little setup here prevents most of the early friction with AI nodes.">
          <div className="section-subhead">
            <ol>{prerequisiteSteps.map((step) => <li key={step}>{step}</li>)}</ol>
          </div>
        </CollapsibleSection>
        <CollapsibleSection id="core-concepts" eyebrow="Core Concepts" title="The AI concepts learners should understand first" lead="These ideas create the mental model for everything from simple chains to more advanced agents later.">
          <div className="notes-grid">{conceptCards.map((item) => <InfoCard key={item.title} title={item.title} detail={item.detail} tone="model-note" />)}</div>
        </CollapsibleSection>
        <CollapsibleSection id="hands-on-labs" eyebrow="Hands-On Labs" title="Build simple AI-infused chains" lead="These labs are deliberately narrow so learners can focus on how model nodes behave inside a normal workflow.">
          <div className="scenario-list">{labs.map((item) => <LabCard key={item.title} item={item} />)}</div>
        </CollapsibleSection>
        <CollapsibleSection id="templates" eyebrow="Templates" title="Useful AI templates and references" lead="These links are useful for importing, studying, and adapting basic AI workflow patterns.">
          <div className="download-grid">{templateLinks.map((item) => <a key={item.href} className="download-chip" href={item.href} target="_blank" rel="noreferrer">{item.label}</a>)}</div>
        </CollapsibleSection>
        <CollapsibleSection id="quiz" eyebrow="Quiz" title="Quick self-check before moving on" lead="Use these to confirm the learner understands the role of chains and model setup before agents.">
          <div className="scenario-list">{quizCards.map((item) => <QuizCard key={item.title} item={item} />)}</div>
        </CollapsibleSection>
        <CollapsibleSection id="assignment" eyebrow="Assignment" title="Build one simple AI-infused chain" lead="The assignment proves the learner can add a model call into a practical automation without yet depending on agents or tools.">
          <div className="section-subhead">
            <ol>{assignmentPrompts.map((item) => <li key={item}>{item}</li>)}</ol>
          </div>
        </CollapsibleSection>
        <CollapsibleSection id="tips" eyebrow="💡 Tips" title="Tips for this module" lead="This module works best when learners experiment but keep the workflow shape simple.">
          <div className="tips-grid">{tips.map((tip) => <article key={tip} className="tip-card"><p>{tip}</p></article>)}</div>
        </CollapsibleSection>
      </main>
      <a className="floating-index" href="#page-index">Index</a>
    </div>
  )
}
