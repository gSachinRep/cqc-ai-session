import React, { useEffect, useState } from 'react'

const sections = [
  { label: 'Index', href: '#page-index' },
  { label: 'Purpose', href: '#purpose' },
  { label: 'Deep Dive Program', href: '#deep-dive-program' },
  { label: 'Getting Started', href: '#getting-started' },
  { label: 'Core Concepts', href: '#core-concepts' },
  { label: 'Design Patterns', href: '#design-patterns' },
  { label: 'AI Workflows', href: '#ai-workflows' },
  { label: 'Practice Scenarios', href: '#practice-scenarios' },
  { label: 'Governance', href: '#governance' },
  { label: 'Prompt Library', href: '#prompt-library' },
  { label: 'Official Links', href: '#official-links' }
]

const purposeCards = [
  [
    'What n8n is best at',
    'n8n is strongest when work happens across systems and the team needs a visible, modular workflow that can collect data, transform it, route it, and trigger actions.'
  ],
  [
    'What AI adds',
    'AI turns automation from simple routing into judgment support: summarizing, classifying, extracting, drafting, prioritizing, or deciding what branch of the workflow should happen next.'
  ],
  [
    'What to watch',
    'AI-infused automation needs stronger guardrails than basic automation. You need approval points, fallback logic, and clarity about which steps remain fully human-owned.'
  ]
]

const gettingStartedCards = [
  {
    title: 'Start with the learning path basics',
    detail:
      'The official n8n learning path starts with editor navigation, mini-workflows, real-world use cases, data structure, branching, merging, and error handling. That foundation matters before AI is added.'
  },
  {
    title: 'Think in nodes and data flow',
    detail:
      'A good n8n user learns to see a workflow as a chain of nodes where each step receives items, transforms them, and passes them on. AI becomes one specialized node in that chain, not the whole workflow.'
  },
  {
    title: 'Build small before building broad',
    detail:
      'The best onboarding pattern is a narrow workflow first: trigger, transform, decide, and notify. Once that works reliably, you can add more systems and AI stages.'
  }
]

const conceptCards = [
  {
    title: 'Triggers start the workflow',
    detail:
      'Most n8n flows begin with a trigger: webhook, schedule, form, email, CRM event, or another app signal. Example: every morning at 8 AM, trigger a workflow that reviews open support escalations and drafts a leadership summary.'
  },
  {
    title: 'Data needs shaping before it is useful',
    detail:
      'The learning path spends time on data structure, referencing previous nodes, and transforming fields because automation breaks when the data is messy. Example: normalize customer priority, region, and issue category before asking an AI node to classify urgency.'
  },
  {
    title: 'Branching and merging create workflow logic',
    detail:
      'n8n becomes powerful when workflows split based on conditions and then merge back later. Example: if an invoice exception is high value, route to finance review; otherwise auto-generate a clarification email and log it.'
  },
  {
    title: 'Errors are part of the design',
    detail:
      'The official path emphasizes error handling for a reason. A production workflow must define what happens when a system is unavailable, a model response is weak, or data arrives incomplete. Example: retry once, then alert an operations channel with the failed payload.'
  }
]

const designPatternCards = [
  {
    title: 'Extract, enrich, route',
    concept:
      'This is a common pattern where the workflow receives raw input, enriches it with context or AI, and then sends it to the right owner or system.',
    steps: [
      'Capture the raw signal from email, form, CRM, or webhook.',
      'Transform the payload into a clean working structure.',
      'Use AI for extraction, summarization, or categorization.',
      'Route based on priority, risk, owner, or workflow type.'
    ],
    prompt:
      'Design an n8n workflow that takes incoming requests, extracts key details, adds a priority label, routes urgent items to a human reviewer, and logs the rest into a tracking system.'
  },
  {
    title: 'Human-in-the-loop approval',
    concept:
      'AI can prepare, score, or recommend, but a human approval step often sits before any sensitive outbound action or record change.',
    steps: [
      'Use AI to draft, summarize, or classify.',
      'Store the result in a review queue or approval system.',
      'Notify the reviewer with the context and recommendation.',
      'Only continue the workflow after approval or revision.'
    ],
    prompt:
      'Create an n8n workflow for AI-assisted decision support where the model prepares a recommendation, a manager approves or edits it, and only then does the workflow send the final message or update the system of record.'
  },
  {
    title: 'Scheduled intelligence loop',
    concept:
      'A scheduled workflow can collect signals from multiple systems, have AI summarize the changes, and deliver a repeatable briefing to leaders or operators.',
    steps: [
      'Use a schedule trigger for daily or weekly execution.',
      'Collect the relevant metrics, notes, or incidents from source systems.',
      'Use AI to summarize changes, flag anomalies, and propose actions.',
      'Send the final brief to Slack, email, or a dashboard.'
    ],
    prompt:
      'Design a scheduled n8n workflow that pulls operational signals from three sources, summarizes the most important changes, flags risks, and sends a short leadership brief every morning.'
  }
]

const aiWorkflowCards = [
  {
    title: 'AI-assisted meeting-to-execution workflow',
    concept:
      'Take meeting transcripts or notes, extract decisions and actions, create tasks, and notify owners automatically.',
    steps: [
      'Trigger when a transcript file or note arrives.',
      'Use AI to extract decisions, owners, deadlines, and unresolved issues.',
      'Create tasks in the project system.',
      'Send a follow-up summary to the team and flag missing owners for manual review.'
    ],
    prompt:
      'Build an n8n workflow that takes a meeting transcript, extracts decisions and action items with owners, creates tasks in a tracker, and sends a recap message to the team. Add a review checkpoint if owners are unclear.'
  },
  {
    title: 'Support triage and escalation workflow',
    concept:
      'Use AI to classify support requests by urgency, theme, and likely owner, then branch into auto-response, team queue, or escalation path.',
    steps: [
      'Receive a support request from email, form, or helpdesk.',
      'Normalize the request data and customer metadata.',
      'Use AI to classify severity and summarize the issue.',
      'Route high-risk cases to escalation and lower-risk cases to standard response flows.'
    ],
    prompt:
      'Design an n8n support workflow that ingests incoming cases, uses AI to classify severity and summarize the issue, routes high-risk items to a human escalation queue, and drafts a first response for standard cases.'
  },
  {
    title: 'Proposal and document assembly workflow',
    concept:
      'Collect client, service-line, and opportunity data from systems, use AI to produce a first draft, and send it into a review loop.',
    steps: [
      'Trigger when a new opportunity reaches the proposal stage.',
      'Pull the account, industry, and offering details from source systems.',
      'Use AI to draft the first proposal outline or executive summary.',
      'Send the draft to the proposal owner for review and revision.'
    ],
    prompt:
      'Create an n8n workflow that gathers opportunity context from CRM and internal notes, drafts a proposal outline with AI, and sends it to the proposal owner for approval before any client-facing version is produced.'
  }
]

const practiceCards = [
  {
    title: 'Leadership Weekly Brief Bot',
    concept:
      'A workflow that gathers updates from CRM, ticketing, and finance signals, then turns them into one concise weekly operating brief.',
    steps: [
      'Choose the three systems you want to pull from.',
      'Define the fields that matter and clean the payload.',
      'Ask AI to summarize changes, risks, and actions.',
      'Deliver the final note to Slack or email with a clear review trail.'
    ],
    prompt:
      'Plan an n8n workflow for a weekly leadership brief that combines data from three systems, summarizes what changed, flags risks, and shares a concise report with leadership.'
  },
  {
    title: 'HR Policy Question Router',
    concept:
      'A workflow that receives employee policy questions, retrieves approved policy content, drafts an answer, and sends uncertain cases to HR.',
    steps: [
      'Trigger from a form, Slack message, or shared inbox.',
      'Retrieve the relevant policy content.',
      'Use AI to draft a policy-grounded answer and confidence note.',
      'Route low-confidence responses to HR review before sending.'
    ],
    prompt:
      'Design an n8n workflow for employee policy questions that retrieves the right policy, drafts an answer, and routes uncertain or ambiguous questions to HR review.'
  },
  {
    title: 'Sales Call Prep Workflow',
    concept:
      'A workflow that prepares account context, risk signals, competitor notes, and meeting talking points before a sales conversation.',
    steps: [
      'Trigger from a calendar event or CRM stage change.',
      'Collect account notes, product usage, open issues, and competitor context.',
      'Use AI to assemble a meeting prep brief with talking points and likely objections.',
      'Send the brief to the account team before the meeting.'
    ],
    prompt:
      'Create an n8n workflow that prepares a sales call brief from CRM, notes, usage signals, and competitor context, then sends it to the account owner ahead of the meeting.'
  }
]

const governanceCards = [
  {
    title: 'Keep the system of record explicit',
    detail:
      'AI can classify or draft, but the workflow should make it obvious which system is authoritative. Example: AI drafts a contract risk summary, but the contract system remains the source of truth.'
  },
  {
    title: 'Design approval points around risk',
    detail:
      'Not every workflow needs approval, but anything that affects customers, employees, financial records, or compliance should pause for review before final action.'
  },
  {
    title: 'Log what the workflow did',
    detail:
      'Good automation is observable. Keep logs of inputs, outputs, branch decisions, and failures so teams can debug and improve reliably.'
  }
]

const promptLibrary = [
  'Design an n8n workflow that receives raw requests, extracts key details, enriches them with AI, and routes them based on urgency and owner.',
  'Create an n8n workflow with a human approval step after AI recommendation and before any outbound action or record update.',
  'Plan a scheduled n8n workflow that gathers signals from multiple systems and sends a daily leadership brief with risks and actions.',
  'Build an AI-infused support triage workflow in n8n with severity classification, branching, escalation, and a fallback path when confidence is low.'
]

const officialLinks = [
  { label: 'n8n learning path', href: 'https://docs.n8n.io/learning-path/' },
  { label: 'n8n quickstarts', href: 'https://docs.n8n.io/learning-path/#try-it-out' },
  { label: 'n8n text courses', href: 'https://docs.n8n.io/learning-path/#text-courses' },
  {
    label: 'First workflow tutorial (NASA node and credentials)',
    href: 'https://docs.n8n.io/try-it-out/tutorial-first-workflow/#step-three-add-the-nasa-node-and-set-up-credentials'
  }
]

const deepDiveCards = [
  {
    title: 'Structured deep-dive curriculum',
    detail:
      'The deep-dive page expands this overview into a 10-module learning path with capstone, pacing, module-by-module objectives, and progression from basics to production patterns.'
  },
  {
    title: 'Built for self-paced mastery',
    detail:
      'It is designed for learners who want more than a quick introduction and need a credible path through agents, RAG, integrations, governance, and deployment.'
  },
  {
    title: 'Best next step after this page',
    detail:
      'Use the deep-dive program when the learner is ready to commit to a 4-8 week build path rather than a single workshop or overview session.'
  }
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

function InfoCard({ title, detail, tone = 'model-note' }) {
  const [isOpen, setIsOpen] = useState(false)
  return <article className={`note-card collapsible-card ${tone}`}><button className="collapse-toggle" type="button" onClick={() => setIsOpen((v) => !v)}><div className="collapse-copy"><strong>{title}</strong><small>{detail}</small></div><span className="collapse-icon" aria-hidden="true">{isOpen ? '−' : '+'}</span></button>{isOpen ? <div className="collapse-body"><div className="model-row"><span>{detail}</span></div></div> : null}</article>
}

function PromptCard({ item }) {
  const [isOpen, setIsOpen] = useState(false)
  return <article className="scenario-card collapsible-card"><button className="collapse-toggle" type="button" onClick={() => setIsOpen((v) => !v)}><div className="collapse-copy"><strong>{item.title}</strong><small>{item.concept}</small></div><span className="collapse-icon" aria-hidden="true">{isOpen ? '−' : '+'}</span></button>{isOpen ? <div className="collapse-body"><h4>Suggested Steps</h4><ol>{item.steps.map((step) => <li key={step}>{step}</li>)}</ol><div className="section-subhead"><div className="prompt-controls"><CopyPrompt prompt={item.prompt} /></div><pre>{item.prompt}</pre></div></div> : null}</article>
}

export default function N8nPage() {
  return (
    <div className="page-shell" style={{ '--accent': '#ea580c', '--accent-soft': '#fed7aa' }}>
      <header className="hero">
        <div className="hero-copy">
          <p className="eyebrow">n8n</p>
          <h1>
            AI-Infused Workflow <span>Automation with n8n</span>
          </h1>
          <p className="lead">
            Use this page to help teams understand n8n fundamentals first, then layer AI into
            workflow automation in a way that is observable, governable, and genuinely useful.
          </p>
          <div className="hero-actions">
            <a className="btn primary" href="#purpose">Start here</a>
            <a className="btn" href="/">Back to main tutorial</a>
          </div>
          <div id="page-index" className="panel-card hero-index-card">
            <h3>Index</h3>
            <div className="surface-nav hero-index-nav">
              {sections.filter((s) => s.href !== '#page-index').map((s) => (
                <a key={s.href} className="surface-link" href={s.href}>{s.label}</a>
              ))}
            </div>
          </div>
        </div>
        <aside className="hero-panel">
          <div className="panel-card accent">
            <h3>Goal</h3>
            <p>Help learners move from simple automations into AI-infused workflows that can classify, summarize, route, and support decisions across real business systems.</p>
          </div>
        </aside>
      </header>
      <main>
        <CollapsibleSection id="purpose" eyebrow="Purpose" title="Practical guide for AI-infused workflow automation with n8n" lead="This page turns the official n8n learning path into a business-friendly playbook that connects workflow fundamentals to AI-assisted automation.">
          <div className="notes-grid">{purposeCards.map(([title, detail]) => <InfoCard key={title} title={title} detail={detail} tone="model-note" />)}</div>
        </CollapsibleSection>
        <CollapsibleSection id="deep-dive-program" eyebrow="Deep Dive Program" title="Continue into the full n8n mastery track" lead="This companion page turns the overview into a structured program with modules, capstone, pacing, and a stronger progression path.">
          <div className="notes-grid">{deepDiveCards.map((item) => <InfoCard key={item.title} title={item.title} detail={item.detail} tone="prompt-note" />)}</div>
          <div className="section-subhead">
            <a className="btn primary" href="/n8n/deep-dive.html">Open deep-dive program</a>
          </div>
        </CollapsibleSection>
        <CollapsibleSection id="getting-started" eyebrow="Getting Started" title="How to approach the n8n learning path" lead="The right entry point is to understand the editor, data flow, and branching logic before trying to automate larger processes.">
          <div className="notes-grid">{gettingStartedCards.map((item) => <InfoCard key={item.title} title={item.title} detail={item.detail} tone="prompt-note" />)}</div>
        </CollapsibleSection>
        <CollapsibleSection id="core-concepts" eyebrow="Core Concepts" title="What learners need to understand before adding AI" lead="These ideas come directly from the n8n learning path and show up in almost every reliable workflow.">
          <div className="notes-grid">{conceptCards.map((item) => <InfoCard key={item.title} title={item.title} detail={item.detail} tone="model-note" />)}</div>
        </CollapsibleSection>
        <CollapsibleSection id="design-patterns" eyebrow="Design Patterns" title="Reusable workflow patterns in n8n" lead="These are the patterns that help learners move from isolated nodes to well-structured business workflows.">
          <div className="scenario-list">{designPatternCards.map((item) => <PromptCard key={item.title} item={item} />)}</div>
        </CollapsibleSection>
        <CollapsibleSection id="ai-workflows" eyebrow="AI Workflows" title="Where AI fits naturally inside n8n" lead="The strongest AI use cases are not generic chat-in-a-box. They sit inside a larger workflow with context, routing, and clear outcomes.">
          <div className="scenario-list">{aiWorkflowCards.map((item) => <PromptCard key={item.title} item={item} />)}</div>
        </CollapsibleSection>
        <CollapsibleSection id="practice-scenarios" eyebrow="Practice Scenarios" title="Workshop scenarios to build or sketch" lead="Use these as workshop-friendly automation ideas that feel relevant to business teams, not only to engineering teams.">
          <div className="scenario-list">{practiceCards.map((item) => <PromptCard key={item.title} item={item} />)}</div>
        </CollapsibleSection>
        <CollapsibleSection id="governance" eyebrow="Governance" title="How to keep AI-infused automation trustworthy" lead="This is where workflow automation becomes enterprise-ready rather than just clever.">
          <div className="notes-grid">{governanceCards.map((item) => <InfoCard key={item.title} title={item.title} detail={item.detail} tone="prompt-note" />)}</div>
        </CollapsibleSection>
        <CollapsibleSection id="prompt-library" eyebrow="Prompt Library" title="n8n workflow design starters" lead="These prompts are useful when learners need help thinking through how the workflow should behave before they start building it.">
          <div className="scenario-list">{promptLibrary.map((prompt) => <article key={prompt} className="scenario-card"><div className="prompt-controls"><CopyPrompt prompt={prompt} /></div><pre>{prompt}</pre></article>)}</div>
        </CollapsibleSection>
        <CollapsibleSection id="official-links" eyebrow="Official Links" title="Reference materials from n8n" lead="Use these when you want to go back to the original learning path, quickstarts, or structured text courses.">
          <div className="download-grid">{officialLinks.map((link) => <a key={link.href} className="download-chip" href={link.href} target="_blank" rel="noreferrer">{link.label}</a>)}</div>
        </CollapsibleSection>
      </main>
      <a className="floating-index" href="#page-index">Index</a>
    </div>
  )
}
