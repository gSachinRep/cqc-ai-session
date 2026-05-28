import React, { useEffect, useState } from 'react'

const sections = [
  { label: 'Index', href: '#page-index' },
  { label: 'Learning Outcomes', href: '#learning-outcomes' },
  { label: 'Purpose', href: '#purpose' },
  { label: 'Getting Started', href: '#getting-started' },
  { label: 'Operating Model', href: '#operating-model' },
  { label: 'How To Work', href: '#how-to-work' },
  { label: 'Browser Actions', href: '#browser-actions' },
  { label: 'Background Tasks', href: '#background-tasks' },
  { label: 'Scheduled Workflows', href: '#scheduled-workflows' },
  { label: 'Tool Handoffs', href: '#tool-handoffs' },
  { label: 'Safety and Permissions', href: '#safety' },
  { label: 'Try This Now', href: '#try-this-now' },
  { label: 'When Not To Use', href: '#when-not-to-use' },
  { label: 'Error Recovery', href: '#error-recovery' },
  { label: 'Prompt Library', href: '#prompt-library' },
  { label: 'Download Library', href: '#download-library' }
]

const purposeCards = [
  [
    'What Claude for Web is best at',
    'Claude for Web is strongest when browser context is fragmented across tabs, dashboards, portals, CRM pages, documents, and operational tools.'
  ],
  [
    'What changes with Claude for Chrome',
    'The newer Chrome experience goes beyond reading. It can help browse, act across sites, and complete repetitive browser workflows with human review.'
  ],
  [
    'What to watch',
    'Browser automation feels powerful, but it still needs site awareness, permission discipline, and clear review before sensitive actions are taken.'
  ]
]

const gettingStartedCards = [
  {
    title: 'Install the Chrome extension',
    detail:
      'Start by installing Claude for Chrome, signing in to Claude, and confirming that the extension can see the sites you want to work on during the session.'
  },
  {
    title: 'Choose the right workflow mode',
    detail:
      'Use browser actions when Claude should navigate or interact with websites. Use standard chat when you mainly want synthesis, explanation, or drafted output from what you are viewing.'
  },
  {
    title: 'Start on low-risk tasks',
    detail:
      'The best onboarding path is simple work first: summarize a dashboard, prepare a meeting brief, or organize open tabs before moving into actions on live systems.'
  }
]

const howToCards = [
  {
    title: 'Be explicit about the job',
    detail:
      'Ask Claude whether you want reading, extracting, organizing, navigating, drafting, or completing a browser action. The clearer the mode, the better the outcome.'
  },
  {
    title: 'Ask for checkpoints before critical actions',
    detail:
      'For anything that changes data, sends messages, or updates a system of record, prompt Claude to pause and summarize what it plans to do before it does it.'
  },
  {
    title: 'Use it as a workflow accelerator',
    detail:
      'Claude for Chrome becomes valuable when it reduces repetitive browser toil: checking dashboards, logging CRM notes, gathering account context, or organizing inbox work.'
  }
]

const browserActionCards = [
  {
    title: 'Multi-tab executive brief',
    concept:
      'This is the classic browser-synthesis pattern: use Claude across dashboards, market updates, customer escalations, and planning notes to create one leadership brief.',
    steps: [
      'Open the few tabs that matter for the question.',
      'Ask Claude to separate confirmed facts from interpretation.',
      'Have it summarize implications, risks, and next actions.',
      'Review and refine the final brief before sharing.'
    ],
    prompt:
      'Across these tabs, create a one-page leadership brief with confirmed facts, likely implications, key risks, and the next three actions. Keep facts separate from inference.',
    downloads: [
      { label: 'Market update', href: '/downloads/web-market-update.txt' },
      { label: 'Customer escalation', href: '/downloads/web-customer-escalation.txt' },
      { label: 'Ops dashboard snapshot', href: '/downloads/web-ops-dashboard.csv' },
      { label: 'Facilitator guide', href: '/downloads/web-scenario-brief.txt' }
    ]
  },
  {
    title: 'CRM update and meeting prep',
    concept:
      'Claude can move between account pages, notes, and metrics to prepare talking points and draft the CRM update you would otherwise write manually.',
    steps: [
      'Open the account record, relevant notes, and performance view.',
      'Ask Claude to extract stakeholder priorities and open issues.',
      'Generate a meeting brief and a CRM-ready follow-up note.',
      'Review before committing any update into the system.'
    ],
    prompt:
      'Prepare a meeting brief from this account context, then draft a concise CRM update with current status, risks, opportunity areas, and the next follow-up action.',
    downloads: [
      { label: 'Account background', href: '/downloads/web-account-background.txt' },
      { label: 'Quarterly account metrics', href: '/downloads/web-account-metrics.csv' }
    ]
  },
  {
    title: 'Policy and contract comparison',
    concept:
      'Claude can compare browser-based policy notes and contract summaries, then organize obligations, deadlines, risks, and escalation points.',
    steps: [
      'Open the policy note and contract materials together.',
      'Ask Claude to identify obligations, deadlines, and inconsistencies.',
      'Request an escalation checklist or negotiation checklist.',
      'Validate the output before using it in a legal or commercial setting.'
    ],
    prompt:
      'Compare these documents and extract obligations, deadlines, penalties, ambiguities, and the items that require legal or leadership escalation. End with a negotiation checklist.',
    downloads: [
      { label: 'Policy note', href: '/downloads/web-policy-change.txt' },
      { label: 'Contract summary', href: '/downloads/web-contract-summary.txt' }
    ]
  }
]

const backgroundTaskCards = [
  {
    title: 'Inbox and message triage',
    detail:
      'Claude can help process repetitive browser work like reading threads, spotting priorities, grouping actions, and drafting responses while you stay focused on exceptions.'
  },
  {
    title: 'Drive and workspace cleanup',
    detail:
      'A useful pattern is asking Claude to classify open files, suggest names, organize materials by topic, and identify what should be archived, shared, or revisited later.'
  },
  {
    title: 'Dashboard extraction',
    detail:
      'When analytics lives across browser dashboards, Claude can pull the signal out of multiple pages and organize what leadership should know without manual copying.'
  }
]

const scheduledWorkflowCards = [
  {
    title: 'Daily browser review loop',
    concept:
      'Use Claude for Chrome to support recurring browser-based checks like reviewing dashboards, account changes, or channel health at the start of the day.',
    steps: [
      'Define the handful of browser destinations that matter each day.',
      'Ask Claude to gather key changes and summarize them into a morning brief.',
      'Add a final section for what needs human follow-up today.',
      'Keep the workflow bounded so it stays reliable.'
    ],
    prompt:
      'Review these recurring browser sources and produce a daily operations brief with what changed since the last review, what matters most today, and what requires human follow-up.'
  },
  {
    title: 'Weekly account or leadership prep',
    concept:
      'The browser is often where prep work starts. Claude can help turn recurring account or leadership preparation into a repeatable workflow rather than a manual scramble.',
    steps: [
      'Open the recurring dashboards, account pages, and notes used every week.',
      'Ask Claude to compare current status with the previous checkpoint.',
      'Generate a weekly prep pack with risks, asks, and follow-ups.',
      'Use the same pattern each cycle to improve consistency.'
    ],
    prompt:
      'Using these recurring browser sources, generate a weekly prep pack with current status, key changes, open issues, stakeholder risks, and the three conversations we should prioritize this week.'
  }
]

const handoffCards = [
  {
    title: 'Claude for Chrome to Claude Code',
    detail:
      'Use browser context to define or investigate a technical issue, then hand the task off to Claude Code when code changes, tests, or implementation work are needed.'
  },
  {
    title: 'Claude for Chrome to Cowork',
    detail:
      'Use Chrome to gather live context, then move into Cowork when the task becomes broader and needs multi-step thinking, research, or coordination across documents and workflows.'
  },
  {
    title: 'Claude for Chrome to Claude Desktop',
    detail:
      'Use Chrome when the context is in the browser and Desktop when the task needs local files, longer drafting, or a more controlled working environment.'
  }
]

const safetyCards = [
  {
    title: 'Treat sites differently based on risk',
    detail:
      'Low-risk informational sites are good for early practice. Systems with customer data, HR data, finance, or administrative controls need tighter review and clearer boundaries.'
  },
  {
    title: 'Watch for prompt injection and misleading page instructions',
    detail:
      'Web pages can contain text designed to manipulate AI behavior. Ask Claude to ignore website instructions that are unrelated to your task and to explain before acting.'
  },
  {
    title: 'Keep humans in the approval loop',
    detail:
      'The right pattern is assist, pause, review, then confirm. That is especially important for sending messages, changing records, or taking actions with business impact.'
  }
]

const promptLibrary = [
  'Across these tabs, create a one-page brief with confirmed facts, implications, risks, and next actions.',
  'Prepare a CRM-ready update and meeting brief from this browser context, then pause for review before any write-back.',
  'Compare these browser documents and extract obligations, deadlines, and items requiring escalation.',
  'Review these recurring browser sources and generate a daily summary of what changed, what matters, and what needs follow-up.',
  'Before taking any action on these pages, explain what you plan to do, what data may change, and where I should review first.'
]

const downloadLibrary = [
  '/downloads/web-market-update.txt',
  '/downloads/web-customer-escalation.txt',
  '/downloads/web-ops-dashboard.csv',
  '/downloads/web-scenario-brief.txt',
  '/downloads/web-policy-change.txt',
  '/downloads/web-contract-summary.txt',
  '/downloads/web-account-background.txt',
  '/downloads/web-account-metrics.csv'
]

const learningOutcomes = [
  'Synthesize information from multiple browser tabs into a single structured brief.',
  'Perform CRM updates, meeting prep, and document comparisons with live browser context.',
  'Set review checkpoints before Claude takes actions on live systems — a non-negotiable habit.',
  'Choose the right browser mode for each task: reading, extracting, drafting, or acting.'
]

const tryThisNowCards = [
  {
    title: 'Multi-tab brief — 10 minutes',
    concept: 'Open three work-relevant browser tabs and let Claude synthesize a leadership-ready brief from the combined context.',
    steps: [
      'Open three tabs relevant to a current work topic: one dashboard, one news or update, one internal doc or note.',
      'Open Claude for Chrome and use the multi-tab brief prompt below.',
      'Ask Claude to keep confirmed facts and inferences clearly separated.',
      'Review the output and check whether anything important was missed or misread.'
    ],
    prompt: 'Across these open tabs, create a one-page leadership brief with: confirmed facts, likely implications, key risks, and the three actions I should take next. Keep facts clearly separate from inference.'
  },
  {
    title: 'Browser safety checkpoint — 5 minutes',
    concept: 'Before giving Claude access to any system you use for real work, build the review checkpoint habit.',
    steps: [
      'Open a work portal or tool you use regularly (CRM, project tracker, ops dashboard).',
      'Before asking Claude to do anything, use the safety checkpoint prompt below.',
      'Review Claude\'s plan before approving any action.',
      'Make this checkpoint a habit on every new system before enabling any automation.'
    ],
    prompt: 'Before taking any action on this page, describe what you see, what you plan to do, what data might change, and where I should review your work before it is saved or sent.'
  }
]

const whenNotToUseCards = [
  ['Not on sensitive systems without authorization', 'Systems holding customer data, HR records, financial accounts, or healthcare information need explicit organizational approval before browser automation is enabled.'],
  ['Not for irreversible actions without a checkpoint', 'Sending emails, submitting forms, deleting records, or updating systems of record all require a human review step before Claude executes. Build the checkpoint habit first.'],
  ['Not as a replacement for direct integrations', 'If your organization has a proper API or native integration for a tool, that path is more reliable, auditable, and secure than browser-based automation.'],
  ['Not when compliance requires documented workflows', 'Regulated industries with audit requirements should work with IT and compliance to ensure any browser automation meets documentation and access-control standards.']
]

const errorRecoveryCards = [
  { title: 'Claude takes an action you did not intend', detail: 'Stop the session immediately. Describe exactly what you wanted and add explicit scope boundaries in your next prompt: "Only read this page. Do not click, submit, or change anything."' },
  { title: 'Browser context is misread or incomplete', detail: 'Ask Claude to describe what it sees on each relevant tab before proceeding. This confirmation step surfaces misread pages before they affect the output or actions.' },
  { title: 'Results are incomplete despite good prompting', detail: 'Check whether Claude has extension permission to access all the tabs it needs. Some sites block extension access, so Claude may be working with partial context without flagging it.' },
  { title: 'Claude behaves unexpectedly after visiting a page', detail: 'That page may contain prompt injection content. Ask Claude to ignore any instructions on the page unrelated to your task, and review its last action carefully before continuing.' }
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
  return (
    <button className="prompt-copy-btn" type="button" onClick={handleCopy}>
      <span aria-hidden="true">📋</span>
      <span>{copyState === 'copied' ? 'Copied' : copyState === 'failed' ? 'Retry' : 'Copy'}</span>
    </button>
  )
}

function CollapsibleSection({ id, eyebrow, title, lead, children }) {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <section id={id} className="section collapsible-card section-collapse-shell">
      <button className="collapse-toggle" type="button" onClick={() => setIsOpen((v) => !v)}>
        <div className="collapse-copy">
          <span className="eyebrow">{eyebrow}</span>
          <strong>{title}</strong>
          <small>{lead}</small>
        </div>
        <span className="collapse-icon" aria-hidden="true">
          {isOpen ? '−' : '+'}
        </span>
      </button>
      {isOpen ? <div className="collapse-body section-collapse-body">{children}</div> : null}
    </section>
  )
}

function InfoCard({ title, detail, tone = 'model-note' }) {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <article className={`note-card collapsible-card ${tone}`}>
      <button className="collapse-toggle" type="button" onClick={() => setIsOpen((v) => !v)}>
        <div className="collapse-copy">
          <strong>{title}</strong>
          <small>{detail}</small>
        </div>
        <span className="collapse-icon" aria-hidden="true">
          {isOpen ? '−' : '+'}
        </span>
      </button>
      {isOpen ? (
        <div className="collapse-body">
          <div className="model-row">
            <span>{detail}</span>
          </div>
        </div>
      ) : null}
    </article>
  )
}

function PromptCard({ item }) {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <article className="scenario-card collapsible-card">
      <button className="collapse-toggle" type="button" onClick={() => setIsOpen((v) => !v)}>
        <div className="collapse-copy">
          <strong>{item.title}</strong>
          <small>{item.concept}</small>
        </div>
        <span className="collapse-icon" aria-hidden="true">
          {isOpen ? '−' : '+'}
        </span>
      </button>
      {isOpen ? (
        <div className="collapse-body">
          <h4>Suggested Steps</h4>
          <ol>{item.steps.map((step) => <li key={step}>{step}</li>)}</ol>
          <div className="section-subhead">
            <div className="prompt-controls">
              <CopyPrompt prompt={item.prompt} />
            </div>
            <pre>{item.prompt}</pre>
          </div>
          {item.downloads ? (
            <>
              <h4>Downloads</h4>
              <div className="download-grid">
                {item.downloads.map((file) => (
                  <a key={file.href} className="download-chip" href={file.href} download>
                    {file.label}
                  </a>
                ))}
              </div>
            </>
          ) : null}
        </div>
      ) : null}
    </article>
  )
}

export default function ClaudeWebPage() {
  return (
    <div className="page-shell" style={{ '--accent': '#d97706', '--accent-soft': '#fef3c7' }}>
      <header className="hero">
        <div className="hero-copy">
          <p className="eyebrow">Claude for Web</p>
          <h1>
            Claude <span>Chrome Playbook</span>
          </h1>
          <p className="lead">
            Use Claude in Chrome when your work lives across browser tabs, web apps, dashboards, and
            portals and you want both synthesis and browser-assisted action.
          </p>
          <div className="hero-actions">
            <a className="btn primary" href="#purpose">
              Start here
            </a>
            <a className="btn" href="/">
              Back to main tutorial
            </a>
          </div>
          <div id="page-index" className="panel-card hero-index-card">
            <h3>Index</h3>
            <div className="surface-nav hero-index-nav">
              {sections
                .filter((section) => section.href !== '#page-index')
                .map((section) => (
                  <a key={section.href} className="surface-link" href={section.href}>
                    {section.label}
                  </a>
                ))}
            </div>
          </div>
        </div>
        <aside className="hero-panel">
          <div className="panel-card accent">
            <h3>Goal</h3>
            <p>
              Help teams use Claude in Chrome for browser-native synthesis, repetitive web workflows,
              and safe action-taking with strong review habits.
            </p>
          </div>
        </aside>
      </header>

      <main>
        <CollapsibleSection
          id="learning-outcomes"
          eyebrow="Learning Outcomes"
          title="What you will be able to do by the end of this module"
          lead="These are the practical skills this playbook is designed to build."
        >
          <ol style={{ paddingLeft: '1.5rem', lineHeight: '1.8', margin: '0' }}>
            {learningOutcomes.map((o) => (
              <li key={o} style={{ marginBottom: '0.5rem' }}>{o}</li>
            ))}
          </ol>
        </CollapsibleSection>

        <CollapsibleSection
          id="purpose"
          eyebrow="Purpose"
          title="Practical guide for Claude in Chrome"
          lead="This page expands the browser tutorial from reading and synthesis into live web workflows, task execution, and careful browser automation."
        >
          <div className="notes-grid">
            {purposeCards.map(([title, detail]) => (
              <InfoCard key={title} title={title} detail={detail} tone="model-note" />
            ))}
          </div>
        </CollapsibleSection>

        <CollapsibleSection
          id="getting-started"
          eyebrow="Getting Started"
          title="How to get productive with Claude for Chrome"
          lead="A strong start is mostly about choosing the right kinds of browser tasks and keeping the scope bounded."
        >
          <div className="notes-grid">
            {gettingStartedCards.map((item) => (
              <InfoCard key={item.title} title={item.title} detail={item.detail} tone="prompt-note" />
            ))}
          </div>
        </CollapsibleSection>

        <CollapsibleSection
          id="operating-model"
          eyebrow="Operating Model"
          title="How to think about Claude in the browser"
          lead="The browser is no longer just a reading surface. It can also be an execution surface, which changes the way you should prompt and review."
        >
          <div className="notes-grid">
            {[
              ['Read, then act', 'Start with understanding the browser context, then move into actions only when the plan is clear.'],
              ['Assistive automation', 'Claude is most useful when it removes repetitive browser work but still keeps a human in charge of important decisions.'],
              ['Cross-tool handoffs', 'The browser is often the best starting point, but code work, deep reasoning, or local file workflows may belong in other Claude surfaces.']
            ].map(([title, detail]) => (
              <InfoCard key={title} title={title} detail={detail} tone="prompt-note" />
            ))}
          </div>
        </CollapsibleSection>

        <CollapsibleSection
          id="how-to-work"
          eyebrow="How To Work"
          title="How to use Claude effectively in Chrome workflows"
          lead="These are the habits that keep browser-based AI work useful instead of risky or noisy."
        >
          <div className="notes-grid">
            {howToCards.map((item) => (
              <InfoCard key={item.title} title={item.title} detail={item.detail} tone="prompt-note" />
            ))}
          </div>
        </CollapsibleSection>

        <CollapsibleSection
          id="browser-actions"
          eyebrow="Browser Actions"
          title="Use Claude for browser-native workflows"
          lead="These are the high-value workflows where Claude helps read, navigate, draft, and prepare action in the browser itself."
        >
          <div className="scenario-list">
            {browserActionCards.map((item) => (
              <PromptCard key={item.title} item={item} />
            ))}
          </div>
        </CollapsibleSection>

        <CollapsibleSection
          id="background-tasks"
          eyebrow="Background Tasks"
          title="Where browser assistance saves the most time"
          lead="These are the repetitive web tasks where Claude can reduce manual coordination work."
        >
          <div className="notes-grid">
            {backgroundTaskCards.map((item) => (
              <InfoCard key={item.title} title={item.title} detail={item.detail} tone="model-note" />
            ))}
          </div>
        </CollapsibleSection>

        <CollapsibleSection
          id="scheduled-workflows"
          eyebrow="Scheduled Workflows"
          title="Repeatable browser routines Claude can support"
          lead="These patterns are useful once a team knows which browser checks happen daily or weekly."
        >
          <div className="scenario-list">
            {scheduledWorkflowCards.map((item) => (
              <PromptCard key={item.title} item={item} />
            ))}
          </div>
        </CollapsibleSection>

        <CollapsibleSection
          id="tool-handoffs"
          eyebrow="Tool Handoffs"
          title="When to move from Chrome into other Claude surfaces"
          lead="The best workflow often starts in the browser and then hands off to the surface best suited for the next job."
        >
          <div className="notes-grid">
            {handoffCards.map((item) => (
              <InfoCard key={item.title} title={item.title} detail={item.detail} tone="prompt-note" />
            ))}
          </div>
        </CollapsibleSection>

        <CollapsibleSection
          id="safety"
          eyebrow="Safety and Permissions"
          title="How to use Claude for Chrome safely"
          lead="This matters more as the browser moves from reading to taking actions on live systems."
        >
          <div className="notes-grid">
            {safetyCards.map((item) => (
              <InfoCard key={item.title} title={item.title} detail={item.detail} tone="model-note" />
            ))}
          </div>
        </CollapsibleSection>

        <CollapsibleSection
          id="try-this-now"
          eyebrow="Try This Now"
          title="Quick exercises you can run immediately"
          lead="These 5-10 minute exercises let you practice the core Chrome workflow habits on real browser tasks."
        >
          <div className="scenario-list">
            {tryThisNowCards.map((item) => (
              <PromptCard key={item.title} item={item} />
            ))}
          </div>
        </CollapsibleSection>

        <CollapsibleSection
          id="when-not-to-use"
          eyebrow="When Not To Use"
          title="Situations where Claude for Chrome is the wrong tool"
          lead="These limits protect your data, your systems, and your organization's trust in AI-assisted workflows."
        >
          <div className="notes-grid">
            {whenNotToUseCards.map(([title, detail]) => (
              <InfoCard key={title} title={title} detail={detail} tone="model-note" />
            ))}
          </div>
        </CollapsibleSection>

        <CollapsibleSection
          id="error-recovery"
          eyebrow="Error Recovery"
          title="What to do when browser workflows go wrong"
          lead="These patterns help you recover when Claude misreads context or takes unexpected browser actions."
        >
          <div className="notes-grid">
            {errorRecoveryCards.map((item) => (
              <InfoCard key={item.title} title={item.title} detail={item.detail} tone="prompt-note" />
            ))}
          </div>
        </CollapsibleSection>

        <CollapsibleSection
          id="prompt-library"
          eyebrow="Prompt Library"
          title="Claude for Chrome quick-reference prompts"
          lead="These are good starting points for browser-based synthesis and action workflows."
        >
          <div className="scenario-list">
            {promptLibrary.map((prompt) => (
              <article key={prompt} className="scenario-card">
                <div className="prompt-controls">
                  <CopyPrompt prompt={prompt} />
                </div>
                <pre>{prompt}</pre>
              </article>
            ))}
          </div>
        </CollapsibleSection>

        <CollapsibleSection
          id="download-library"
          eyebrow="Download Library"
          title="All Claude for Chrome exercise files in one place"
          lead="Use this section when you want the full file set for browser-based exercises and demos."
        >
          <div className="download-grid">
            {downloadLibrary.map((file) => (
              <a key={file} className="download-chip" href={file} download>
                {file.split('/').pop()}
              </a>
            ))}
          </div>
        </CollapsibleSection>
      </main>

      <a className="floating-index" href="#page-index">
        Index
      </a>
    </div>
  )
}
