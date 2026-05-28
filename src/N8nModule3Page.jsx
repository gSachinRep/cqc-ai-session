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
  ['Module', 'Module 3: Integrations, APIs & Webhooks'],
  ['Goal by end', 'Confidently connect real apps with native nodes, use HTTP Request for any REST API, and build event-driven workflows with webhooks.'],
  ['Why this matters', 'This is the module where n8n stops feeling like a sandbox and starts behaving like real-world automation infrastructure.']
]

const prerequisiteSteps = [
  'Open your n8n Cloud or self-hosted instance and keep Module 1 and 2 habits in mind: inspect data at every step.',
  'Prepare accounts for at least two apps such as Gmail, Telegram, or Google Sheets.',
  'Keep a free test API ready such as JSONPlaceholder or Open-Meteo.',
  'Optionally prepare a test webhook sender such as Postman, ReqBin, or curl for webhook testing.'
]

const conceptCards = [
  {
    title: 'Native integrations are usually the easiest starting point',
    detail:
      'Native app nodes handle credentials, common actions, and some pagination or schema details for you. That makes them the fastest route when the app is supported.'
  },
  {
    title: 'HTTP Request is the Swiss army knife',
    detail:
      'The HTTP Request node gives n8n universal reach. Learners should understand URL, method, headers, query params, body, auth, and response handling because those skills transfer to almost any API.'
  },
  {
    title: 'Webhooks are incoming triggers',
    detail:
      'Webhook nodes let outside systems call your workflow directly. The distinction between test URL and production URL is essential: one is for development, the other is for live execution.'
  },
  {
    title: 'Responses matter',
    detail:
      'Workflows triggered by webhooks often need to send a response back. Respond to Webhook is what turns a one-way trigger into a proper API-style interaction.'
  },
  {
    title: 'Rate limits and auth are operational concerns',
    detail:
      'This is where learners start thinking like operators: secure credentials, respect rate limits, batch when needed, and use retries or waits for external services.'
  }
]

const labs = [
  {
    title: 'Lab 1: Native App Integration',
    concept:
      'Connect one real app using a native node so learners understand how credentials, triggers, and actions work in a supported integration.',
    steps: [
      'Choose either Gmail or Telegram as the first native integration.',
      'Create the credential connection inside n8n.',
      'Use a trigger such as new email or new Telegram message.',
      'Add a Set node to extract and clean the important fields.',
      'Use a native action node to label, reply, notify, or append the result into another app.'
    ],
    prompt:
      'Explain how this native integration is handling authentication and what data shape is being passed from trigger to Set node to action node.'
  },
  {
    title: 'Lab 2: HTTP Request Mastery',
    concept:
      'Use HTTP Request to call a public API, split or reshape the result, and send the cleaned output to another service.',
    steps: [
      'Start with a Manual Trigger.',
      'Call JSONPlaceholder posts or Open-Meteo weather using HTTP Request.',
      'If the response is an array, split it into items or otherwise reshape it.',
      'Use Set to extract the fields you actually need.',
      'Send the final output through email or Telegram.'
    ],
    prompt:
      'Review this HTTP Request flow and explain which parts are API mechanics, which parts are data shaping, and where the workflow would need batching or pagination in a real production use case.'
  },
  {
    title: 'Lab 3: Webhook-Powered Real-Time Automation',
    concept:
      'Build an event-driven workflow that accepts incoming data, transforms it, branches it, writes it to a system, and responds to the caller.',
    steps: [
      'Create a Webhook trigger with POST method and a test path.',
      'Use Set to extract fields such as name and email from the incoming JSON.',
      'Add IF logic to route the payload based on a business rule such as email domain.',
      'Write to Google Sheets and send a Telegram or Gmail notification.',
      'Use Respond to Webhook to return a success message to the caller and test it with Postman, ReqBin, or curl.'
    ],
    prompt:
      'Walk me through the lifecycle of this webhook request from incoming payload to branching logic to final response. Also tell me how to secure this before moving it to production.'
  }
]

const templateLinks = [
  {
    label: 'n8n workflow gallery',
    href: 'https://n8n.io/workflows'
  },
  {
    label: 'JSONPlaceholder sample API',
    href: 'https://jsonplaceholder.typicode.com/posts'
  },
  {
    label: 'Open-Meteo API',
    href: 'https://api.open-meteo.com/v1/forecast?latitude=28.61&longitude=77.23&current=temperature_2m'
  }
]

const quizCards = [
  {
    title: 'Quick check 1',
    question: 'When should you prefer a native node over HTTP Request?',
    options: [
      'When the app is supported and the built-in node covers the action you need',
      'Only when the app is related to AI',
      'Never, HTTP Request is always better',
      'Only for testing, not real workflows'
    ],
    correctIndex: 0
  },
  {
    title: 'Quick check 2',
    question: 'What is the main difference between a test webhook URL and a production webhook URL?',
    options: [
      'Test is for development in the editor; production is for live active workflows',
      'They are identical in purpose',
      'Production is only for internal users',
      'Test URLs cannot receive JSON'
    ],
    correctIndex: 0
  },
  {
    title: 'Quick check 3',
    question: 'How do you send a custom response back to the webhook caller?',
    options: [
      'Use Respond to Webhook',
      'Use Merge',
      'Use only Set',
      'Use Loop Over Items'
    ],
    correctIndex: 0
  },
  {
    title: 'Quick check 4',
    question: 'What is the value of the HTTP Request node in a workflow platform with many native integrations?',
    options: [
      'It connects to any REST API, including unsupported or custom systems',
      'It replaces all native nodes',
      'It only works for weather APIs',
      'It can only be used with webhooks'
    ],
    correctIndex: 0
  }
]

const assignmentPrompts = [
  'Build a form-to-Telegram or form-to-Sheets workflow using a webhook trigger, field extraction, and one follow-up notification.',
  'Build a payment webhook processor using a simulated or test payload that logs the event and triggers a thank-you or confirmation action.',
  'Build an API plus native-node combo workflow that fetches news or weather, filters what matters, and sends the result through Telegram or Gmail.'
]

const tips = [
  'Start with one credentialed native integration and one public API. That keeps the module practical without overwhelming the learner.',
  'When debugging webhooks, inspect the exact incoming payload first. Most downstream issues start with wrong assumptions about the payload structure.',
  'Use Respond to Webhook early so learners understand that a webhook workflow can behave like a simple API endpoint.',
  'Treat HTTP Request as a durable skill, not a fallback hack. It is what makes n8n flexible enough for real-world systems.'
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

export default function N8nModule3Page() {
  return (
    <div className="page-shell" style={{ '--accent': '#ea580c', '--accent-soft': '#fed7aa' }}>
      <header className="hero">
        <div className="hero-copy">
          <p className="eyebrow">n8n Module 3</p>
          <h1>Integrations, APIs <span>& Webhooks</span></h1>
          <p className="lead">A practical module for connecting real apps, mastering HTTP Request, and building live event-driven workflows with webhooks before moving into AI agents that act on the world.</p>
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
            <p>Finish this module able to connect supported apps, call any REST API, and receive external events through webhooks so your workflows can operate in the real world.</p>
          </div>
        </aside>
      </header>
      <main>
        <CollapsibleSection id="overview" eyebrow="Overview" title="What this module is designed to achieve" lead="This module moves learners from isolated workflows into app-connected and event-driven automations.">
          <div className="notes-grid">{overviewCards.map(([title, detail]) => <InfoCard key={title} title={title} detail={detail} tone="model-note" />)}</div>
        </CollapsibleSection>
        <CollapsibleSection id="prerequisites" eyebrow="Prerequisites" title="What to prepare before starting the builds" lead="A small amount of setup removes most of the friction in this module.">
          <div className="section-subhead">
            <ol>{prerequisiteSteps.map((step) => <li key={step}>{step}</li>)}</ol>
          </div>
        </CollapsibleSection>
        <CollapsibleSection id="core-concepts" eyebrow="Core Concepts" title="The integration patterns learners need to understand" lead="These are the working ideas that make app connections and event-driven automation easier to reason about.">
          <div className="notes-grid">{conceptCards.map((item) => <InfoCard key={item.title} title={item.title} detail={item.detail} tone="model-note" />)}</div>
        </CollapsibleSection>
        <CollapsibleSection id="hands-on-labs" eyebrow="Hands-On Labs" title="Build integrations, APIs, and webhooks directly" lead="These labs are designed to make learners confident with the three most practical integration patterns in n8n.">
          <div className="scenario-list">{labs.map((item) => <LabCard key={item.title} item={item} />)}</div>
        </CollapsibleSection>
        <CollapsibleSection id="templates" eyebrow="Templates" title="Useful references and starter links" lead="Use these to accelerate hands-on practice or provide learners with a fallback reference.">
          <div className="download-grid">{templateLinks.map((item) => <a key={item.href} className="download-chip" href={item.href} target="_blank" rel="noreferrer">{item.label}</a>)}</div>
        </CollapsibleSection>
        <CollapsibleSection id="quiz" eyebrow="Quiz" title="Quick self-check before moving on" lead="These questions test the essential distinctions learners need before AI workflows start acting across systems.">
          <div className="scenario-list">{quizCards.map((item) => <QuizCard key={item.title} item={item} />)}</div>
        </CollapsibleSection>
        <CollapsibleSection id="assignment" eyebrow="Assignment" title="Build one event-driven integration workflow" lead="The assignment proves that the learner can combine integrations and triggers in one coherent automation.">
          <div className="section-subhead">
            <ol>{assignmentPrompts.map((item) => <li key={item}>{item}</li>)}</ol>
          </div>
        </CollapsibleSection>
        <CollapsibleSection id="tips" eyebrow="💡 Tips" title="Tips for this module" lead="This module becomes much smoother when learners keep the scope narrow and inspect each payload.">
          <div className="tips-grid">{tips.map((tip) => <article key={tip} className="tip-card"><p>{tip}</p></article>)}</div>
        </CollapsibleSection>
      </main>
      <a className="floating-index" href="#page-index">Index</a>
    </div>
  )
}
