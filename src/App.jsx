import React, { useEffect, useState } from 'react'

const sessionFlow = [
  {
    time: '0-10 min',
    title: 'Reframe the room',
    detail: 'Move leaders from everyday GenAI usage into decision support, workflow redesign, and cross-functional leverage.'
  },
  {
    time: '10-20 min',
    title: 'Live contrast demo',
    detail: 'Show one common prompt versus one leadership-grade workflow across Web, Excel, or PowerPoint.'
  },
  {
    time: '20-65 min',
    title: 'Hands-on labs',
    detail: 'Participants work through guided scenarios with downloadable files and structured prompts.'
  },
  {
    time: '65-80 min',
    title: 'Group debrief',
    detail: 'Each group shares one surprising insight, one pilot idea, and one guardrail.'
  },
  {
    time: '80-90 min',
    title: 'Pilot selection',
    detail: 'Close with one real use case, one owner, one measurable outcome, and one review checkpoint.'
  }
]

const indexGroups = [
  {
    title: 'Start Here',
    icon: '🚀',
    note: 'Use these first to get the room ready and aligned.',
    accent: '#2563eb',
    bg: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
    links: [
      { label: 'Setup', href: '#setup' },
      { label: 'Important Notes', href: '#important-notes' }
    ]
  },
  {
    title: 'Role-Based Playbooks',
    icon: '🏢',
    note: 'Function-specific prompts and workflows for Finance, HR, Marketing, Sales, and CX.',
    accent: '#0d9488',
    bg: 'linear-gradient(135deg, #f0fdfa 0%, #ccfbf1 100%)',
    links: [
      { label: 'Claude for Finance', href: '/playbooks/finance.html' },
      { label: 'Claude for HR', href: '/playbooks/hr.html' },
      { label: 'Claude for Marketing', href: '/playbooks/marketing.html' },
      { label: 'Claude for Sales', href: '/playbooks/sales.html' },
      { label: 'Claude for Customer Experience', href: '/playbooks/cx.html' }
    ]
  },
  {
    title: 'Claude Tools & Tutorials',
    icon: '🤖',
    note: 'Claude surfaces and working patterns across web, desktop, and productivity tools.',
    accent: '#d97706',
    bg: 'linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)',
    links: [
      { label: 'Claude Core', href: '/tools/core.html' },
      { label: 'Claude Cowork', href: '/tools/cowork.html' },
      { label: 'Claude Code', href: '/tools/code.html' },
      { label: 'Claude Skills', href: '/tools/skills.html' },
      { label: 'Claude Slack', href: '/tools/slack.html' },
      { label: 'Claude Web', href: '/tools/web.html' },
      { label: 'Claude Excel', href: '/tools/excel.html' },
      { label: 'Claude PowerPoint', href: '/tools/powerpoint.html' }
    ]
  },
  {
    title: 'NotebookLM',
    icon: '📔',
    note: 'Research briefs, board prep, and competitor synthesis using source-grounded notebooks.',
    accent: '#7c3aed',
    bg: 'linear-gradient(135deg, #faf5ff 0%, #ede9fe 100%)',
    links: [
      { label: 'NotebookLM Overview', href: '/notebooklm/' }
    ]
  },
  {
    title: 'n8n Automation',
    icon: '⚡',
    note: 'AI-infused workflow automation: triggers, branching, routing, sub-workflows, and practical assignments.',
    accent: '#ea580c',
    bg: 'linear-gradient(135deg, #fff7ed 0%, #fed7aa 100%)',
    links: [
      { label: 'n8n Overview', href: '/n8n/' },
      { label: 'Deep Dive Program', href: '/n8n/deep-dive.html' },
      { label: 'Practice Exercises', href: '/n8n/practice-exercises.html' }
    ]
  },
  {
    title: 'Vibe Coding',
    icon: '🎨',
    note: 'Hands-on creative coding challenge using Claude as your pair programmer and creative co-pilot.',
    accent: '#c026d3',
    bg: 'linear-gradient(135deg, #fdf4ff 0%, #f5d0fe 100%)',
    links: [
      { label: 'Vibe Coding Challenge', href: '/vibe-coding/' }
    ]
  },
  {
    title: 'CCA Certification',
    icon: '🎓',
    note: 'Study guide and domain-by-domain practice for the Claude Certified Architect Foundations exam.',
    accent: '#4f46e5',
    bg: 'linear-gradient(135deg, #eef2ff 0%, #e0e7ff 100%)',
    links: [
      { label: 'CCA Exam Overview', href: '/cca/' },
      { label: 'Domain 1 — Agentic Architecture', href: '/cca/domain-1.html' },
      { label: 'Domain 2 — Tool Design & MCP', href: '/cca/domain-2.html' },
      { label: 'Domain 3 — Claude Code Config', href: '/cca/domain-3.html' },
      { label: 'Domain 4 — Prompt Engineering', href: '/cca/domain-4.html' },
      { label: 'Domain 5 — Context Management', href: '/cca/domain-5.html' },
      { label: 'Sample Questions', href: '/cca/sample-questions.html' }
    ]
  },
  {
    title: 'Exercises & Resources',
    icon: '📝',
    note: 'Project evaluation, progress tracking, and downloads for closing the session.',
    accent: '#e11d48',
    bg: 'linear-gradient(135deg, #fff1f2 0%, #fecdd3 100%)',
    links: [
      { label: 'Evaluate Your CQC Project', href: '#project-evaluation' },
      { label: 'Progress Tracker', href: '#progress-tracker' },
      { label: 'Downloads', href: '#downloads' }
    ]
  },
  {
    title: 'Anthropic Blog',
    icon: '📰',
    note: 'Key articles from the Anthropic team on building with Claude.',
    accent: '#475569',
    bg: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
    links: [
      { label: 'Building agents with the Claude Agent SDK', href: '/blog/agent-sdk.html' }
    ]
  }
]

const tutorialPages = [
  {
    title: 'Claude Core',
    href: '/tools/core.html',
    detail: 'Direct Claude workflows for strategic emails, strategy pressure tests, and 30-day sprint planning.'
  },
  {
    title: 'Claude Cowork',
    href: '/tools/cowork.html',
    detail: 'How to use Cowork for multi-step work, coordination, and deeper working patterns.'
  },
  {
    title: 'Claude Code',
    href: '/tools/code.html',
    detail: 'From getting started to advanced use cases, subagents, MCP, and shipping with Claude Code.'
  },
  {
    title: 'Claude Skills',
    href: '/tools/skills.html',
    detail: 'Understand Claude Skills, how to configure them, and where they fit into repeatable workflows.'
  },
  {
    title: 'Claude Slack',
    href: '/tools/slack.html',
    detail: 'Use Claude inside Slack for thread summaries, updates, meeting prep, and Slack connector workflows.'
  },
  {
    title: 'Claude for Chrome',
    href: '/tools/web.html',
    detail: 'Browser-native work across tabs, actions, background tasks, scheduled workflows, and safety.'
  },
  {
    title: 'Claude for Excel',
    href: '/tools/excel.html',
    detail: 'Variance analysis, pipeline diagnostics, workforce reviews, and workbook-driven commentary.'
  },
  {
    title: 'Claude for PowerPoint',
    href: '/tools/powerpoint.html',
    detail: 'Use Claude to improve storylines, executive decks, client presentations, and change communication.'
  },
  {
    title: 'NotebookLM',
    href: '/notebooklm/',
    detail: 'Research briefs, board prep, and competitor synthesis using source-grounded notebook workflows.'
  },
  {
    title: 'n8n Automation',
    href: '/n8n/',
    detail: 'AI-infused workflow automation with triggers, branching, routing, approval steps, and practical business scenarios.'
  }
]

const rolePlaybooks = [
  {
    title: 'Claude for Finance',
    href: '/playbooks/finance.html',
    detail: 'FP&A, reporting, decision support, policies and controls, board communication.'
  },
  {
    title: 'Claude for HR',
    href: '/playbooks/hr.html',
    detail: 'Hiring, performance, communication, policies, workforce insights, L&D.'
  },
  {
    title: 'Claude for Marketing',
    href: '/playbooks/marketing.html',
    detail: 'Messaging, campaigns, content, research, performance insights, CRM.'
  },
  {
    title: 'Claude for Sales',
    href: '/playbooks/sales.html',
    detail: 'Account prep, discovery, proposals, objections, pipeline reviews, leadership support.'
  },
  {
    title: 'Claude for Customer Experience',
    href: '/playbooks/cx.html',
    detail: 'Support responses, escalations, knowledge, journey design, retention, voice of customer.'
  }
]

const promptAnatomy = [
  {
    label: 'Role',
    detail: 'Tell Claude who it should act like: strategist, CFO, HRBP, operations lead, or communications advisor.',
    tone: 'coral'
  },
  {
    label: 'Goal',
    detail: 'State the task clearly: summarize, critique, draft, compare options, create a plan, or generate a decision note.',
    tone: 'gold'
  },
  {
    label: 'Context',
    detail: 'Give the business situation, audience, source material, constraints, and what matters most.',
    tone: 'mint'
  },
  {
    label: 'Output Format',
    detail: 'Specify the format you want: bullets, table, email, brief, action plan, FAQ, or board-ready memo.',
    tone: 'sky'
  },
  {
    label: 'Constraints',
    detail: 'Set guardrails such as word count, tone, what to avoid, and whether to separate facts from assumptions.',
    tone: 'violet'
  }
]

const modelGuide = [
  {
    model: 'Haiku',
    use: 'Use for speed-first work: quick rewrites, short summaries, simple formatting, classification, and lightweight drafting.'
  },
  {
    model: 'Sonnet',
    use: 'Use for most day-to-day work: strong general performance for emails, meeting notes, structured analysis, business writing, and practical reasoning.'
  },
  {
    model: 'Opus',
    use: 'Use for deeper thinking: strategy pressure tests, multi-step synthesis, decision memos, complex trade-offs, and higher-stakes judgment tasks.'
  },
  {
    model: 'NotebookLM',
    use: 'Use when the answer must stay grounded in a defined source pack, especially for research briefs, board prep, document Q&A, and source-cited analysis.'
  }
]

const evaluationNotes = [
  {
    title: 'LLM as a Judge',
    detail:
      'Use one model to review another response against a rubric: clarity, correctness, completeness, risk, tone, and usefulness. This is powerful for first-pass QA, but it should not replace human judgment in high-stakes work.'
  },
  {
    title: 'LLM Council',
    detail:
      'Instead of trusting one answer, ask multiple perspectives to critique the same response: strategist, skeptic, legal reviewer, customer, or operator. This surfaces blind spots, conflicting assumptions, and weak reasoning earlier.'
  },
  {
    title: 'Why this matters',
    detail:
      'Senior teams get more value from AI when they do not stop at the first output. Evaluation improves trust, reduces overconfidence, and makes AI useful for decisions rather than only drafting.'
  }
]

const requiredSetupGuides = [
  {
    title: 'Buy Claude Pro',
    steps: [
      'Go to claude.ai and sign in with the account you will use during the session.',
      'Open your account or plan settings and choose the Pro plan.',
      'Complete payment and confirm the plan is active before the session day.',
      'Test that you can start a new chat and access the expected Pro features from your account.'
    ]
  },
  {
    title: 'Sign up for Lovable.dev',
    steps: [
      'Go to lovable.dev and create an account before the session.',
      'Use the email account you plan to keep for workshop experiments and follow-up builds.',
      'Complete any email verification or sign-in step so you do not lose time during the session.',
      'Open the workspace once and confirm you can start a new Vibe Coding project.'
    ]
  },
  {
    title: 'Set up NotebookLM on Mac',
    steps: [
      'Open notebooklm.google.com in Chrome or your preferred browser.',
      'Sign in with the Google account you will use during the workshop.',
      'Create one test notebook and upload a small source file so you know uploads work.',
      'Check that pop-ups, downloads, and audio playback are not blocked on your machine.',
      'Keep one PDF or document ready to upload during the session.'
    ]
  },
  {
    title: 'Set up NotebookLM on Windows',
    steps: [
      'Open notebooklm.google.com in Chrome or Edge.',
      'Sign in with the Google account you will use during the workshop.',
      'Create one test notebook and upload a small source file to confirm access.',
      'Make sure browser permissions do not block downloads, audio playback, or file uploads.',
      'Keep one PDF or document ready so you can start the session immediately.'
    ]
  }
]

const optionalSetupGuides = [
  {
    title: 'Set up Claude Desktop on Mac',
    steps: [
      'Download and install Claude Desktop for macOS from Anthropic.',
      'Sign in with the same Claude account that has the Pro plan.',
      'Open Settings and go to Privacy or Data Controls.',
      'Turn off the option that allows your chats or data to be used for product improvement or sharing.',
      'Start one test conversation to confirm the app is working before the session.'
    ]
  },
  {
    title: 'Set up Claude Desktop on Windows',
    steps: [
      'Download and install Claude Desktop for Windows from Anthropic.',
      'Sign in with the same Claude account that has the Pro plan.',
      'Open Settings and find Privacy or Data Controls.',
      'Disable any option that allows chat data to be shared for model training, product improvement, or feedback use.',
      'Run a short test prompt so you know the desktop app is ready for the session.'
    ]
  },
  {
    title: 'Set up Claude for Excel',
    steps: [
      {
        text: 'Navigate to the Claude for Excel guide.',
        href: 'https://support.claude.com/en/articles/12650343-use-claude-in-excel'
      },
      'Click "Get it now" to install the add-in.',
      'Open the Claude add-in pane inside Excel and sign in with your Claude account.',
      'Check the add-in settings and confirm it is available in the workbook before the session starts.'
    ]
  },
  {
    title: 'Set up Claude for PowerPoint',
    steps: [
      {
        text: 'Navigate to the Claude for PowerPoint add-in page.',
        href: 'https://marketplace.microsoft.com/en-us/product/office/WA200010001?tab=Overview'
      },
      'Click "Get it now" to install the add-in.',
      'Launch the Claude add-in pane inside PowerPoint and sign in with your Claude account.',
      'Confirm the add-in loads correctly and is ready to use inside a presentation before the session starts.'
    ]
  },
  {
    title: 'Set up Claude for Web',
    steps: [
      {
        text: 'Navigate to the Claude for Chrome setup page.',
        href: 'https://claude.com/claude-in-chrome'
      },
      'Install the Claude Chrome integration or follow the setup flow shown there.',
      'Pin the extension to the browser toolbar so it is easy to access during the session.',
      'Open the extension or web integration settings and sign in with your Claude account.',
      'Confirm the extension or web add-in is active and available in the browser before the session starts.'
    ]
  }
]


const finalExercise = {
  id: 'project-evaluation',
  title: 'Evaluate Your CQC Project Thinking',
  outcome:
    'Stress-test a team proposal or presentation against leadership expectations, strategic quality, and executive communication standards.',
  whenToUse:
    'Use this as the final exercise after teams have drafted their project idea, proposal, or presentation and need a sharper leadership-grade critique.',
  steps: [
    'Paste the team proposal, presentation content, or project summary into Claude.',
    'Use the evaluator prompt to score the work across facts, strategic reasoning, leadership alignment, and executive communication.',
    'Ask teams to review the reasoning first, not just the score, and identify what is missing in their thinking.',
    'Revise the project based on the verdict and improvement recommendation, then rerun the evaluation if time permits.'
  ],
  prompt: `You are an expert strategy judge evaluating AI transformation proposals and presentations in the context of enterprise AI adoption.

Your role is to rigorously assess whether a given presentation or proposal demonstrates strategic thinking, leadership alignment, and meaningful AI transformation potential, not merely superficial automation ideas.

Context:
The leadership team expects AI initiatives to start from business problems, reduce operational friction, improve people productivity, challenge legacy operating models, avoid presenting BAU automation as transformation, and show bold but grounded platform-like thinking.

Evaluate the proposal across four dimensions:
1. Correctness of Facts (0-5)
2. Depth of Strategic Reasoning (0-5)
3. Alignment with Leadership AI Transformation Principles (0-5)
4. Clarity and Executive Communication (0-5)

Weighting:
- Correctness of Facts: 30%
- Depth of Strategic Reasoning: 30%
- Leadership Alignment: 25%
- Clarity and Communication: 15%

Instructions:
- Reason step by step before scoring.
- Do not reward length over insight.
- Penalize technology-first thinking, vague buzzwords, and incremental BAU automation presented as transformation.
- Be evidence-driven and justify every score.

Output in this structure:

<evaluation>

<reasoning>

[CRITERION 1 - CORRECTNESS OF FACTS]
<step-by-step analysis>

[CRITERION 2 - DEPTH OF STRATEGIC REASONING]
<step-by-step analysis>

[CRITERION 3 - ALIGNMENT WITH LEADERSHIP PRINCIPLES]
<step-by-step analysis>

[CRITERION 4 - CLARITY AND EXECUTIVE COMMUNICATION]
<step-by-step analysis>

</reasoning>

<scores>

- Correctness of Facts: X/5
- Depth of Strategic Reasoning: X/5
- Leadership Alignment: X/5
- Clarity and Communication: X/5
- OVERALL SCORE: X/5

</scores>

<verdict>

Provide a short summary including:
- strongest aspect
- biggest weakness
- one concrete improvement recommendation

</verdict>

</evaluation>`,
  downloads: [{ label: 'Project evaluation prompt', href: '/downloads/project-evaluation-prompt.txt' }]
}

const downloadLibrary = [
  {
    name: 'Final exercise files',
    files: ['/downloads/project-evaluation-prompt.txt']
  }
]

function DownloadList({ downloads }) {
  return (
    <div className="download-grid">
      {downloads.map((file) => (
        <a key={file.href || file} className="download-chip" href={file.href || file} download>
          {file.label || file.split('/').pop()}
        </a>
      ))}
    </div>
  )
}

function CollapsibleCard({ className = '', title, subtitle, children, defaultOpen = false }) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <article className={`${className} collapsible-card ${isOpen ? 'is-open' : 'is-closed'}`.trim()}>
      <button className="collapse-toggle" type="button" onClick={() => setIsOpen((current) => !current)}>
        <span className="collapse-copy">
          <strong>{title}</strong>
          {subtitle ? <small>{subtitle}</small> : null}
        </span>
        <span className="collapse-icon" aria-hidden="true">
          {isOpen ? '−' : '+'}
        </span>
      </button>
      {isOpen ? <div className="collapse-body">{children}</div> : null}
    </article>
  )
}

function PromptPanel({ title, prompt, showPrompts, buttonLabel = 'Prompt' }) {
  const [isVisible, setIsVisible] = useState(showPrompts)
  const [copyState, setCopyState] = useState('idle')

  useEffect(() => {
    setIsVisible(showPrompts)
  }, [showPrompts])

  useEffect(() => {
    if (copyState === 'idle') {
      return undefined
    }

    const timeoutId = window.setTimeout(() => {
      setCopyState('idle')
    }, 1600)

    return () => window.clearTimeout(timeoutId)
  }, [copyState])

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(prompt)
      setCopyState('copied')
    } catch (error) {
      setCopyState('failed')
    }
  }

  return (
    <div>
      <div className="prompt-header">
        <h4 className="prompt-title">{title}</h4>
        <div className="prompt-controls">
          <button className="prompt-copy-btn" type="button" onClick={handleCopy} aria-label={`Copy ${buttonLabel}`}>
            <span aria-hidden="true">📋</span>
            <span>{copyState === 'copied' ? 'Copied' : copyState === 'failed' ? 'Retry' : 'Copy'}</span>
          </button>
          <button className="prompt-toggle-btn" type="button" onClick={() => setIsVisible((current) => !current)}>
            {isVisible ? `Hide ${buttonLabel}` : `Show ${buttonLabel}`}
          </button>
        </div>
      </div>
      {isVisible ? <pre>{prompt}</pre> : <div className="prompt-placeholder">Prompt hidden</div>}
    </div>
  )
}

function SetupCard({ item }) {
  return (
    <CollapsibleCard className="setup-card" title={item.title}>
      <ol>
        {item.steps.map((step, index) => (
          <li key={`${item.title}-${index}`}>
            {typeof step === 'string' ? (
              step
            ) : (
              <a href={step.href} target="_blank" rel="noreferrer">
                {step.text}
              </a>
            )}
          </li>
        ))}
      </ol>
    </CollapsibleCard>
  )
}

function App() {
  const [showPrompts] = useState(false)

  return (
    <div className="page-shell">
      <header className="hero">
        <div className="hero-copy">
          <p className="eyebrow">Facilitator Tutorial</p>
          <h1>
            AI Workshop Kit For <span>Claude and NotebookLM</span>
          </h1>
          <p className="lead">
            A self-contained tutorial for senior leaders across sales, HR, finance, service lines, and executive roles.
            Every lab includes a use case, facilitation steps, ready-to-copy prompts, and downloadable exercise files.
          </p>
          <div className="hero-actions">
            <a className="btn primary" href="#tutorials">
              Explore tutorials
            </a>
            <a className="btn" href="#downloads">
              Download exercise files
            </a>
          </div>
        </div>
        <aside className="hero-panel">
          <div className="panel-card">
            <h3>How to use the tutorial</h3>
            <ul>
              <li>Start with Setup and Important Notes so participants are ready before the hands-on parts begin.</li>
              <li>Use the Index or floating Index button to jump between sections quickly during facilitation.</li>
              <li>Open only the cards you need for the moment so the room stays focused.</li>
              <li>Use the copy button on prompts and the download links for supporting files.</li>
              <li>Close each exercise by asking for one insight, one pilot idea, and one guardrail.</li>
            </ul>
          </div>
          <div className="panel-card accent">
            <h3>Goal</h3>
            <p>
              Move leaders from basic AI usage into stronger judgment, better prompting, sharper evaluation, and more
              ambitious workflow and operating-model thinking.
            </p>
          </div>
        </aside>
      </header>

      <main>
        <section id="index" className="section">
          <div className="section-heading">
            <p className="eyebrow">Quick Index</p>
            <h2>Use a cleaner path through the tutorial</h2>
            <p className="lead">
              The home page now groups content by purpose so it is easier to facilitate: start-up items first,
              role-based playbooks next, then tools, hands-on exercises, and downloads.
            </p>
          </div>
          <div className="index-group-grid">
            {indexGroups.map((group) => (
              <article
                key={group.title}
                className="panel-card index-group-card"
                style={{
                  background: group.bg,
                  borderTop: `4px solid ${group.accent}`,
                  boxShadow: `0 2px 12px ${group.accent}18`
                }}
              >
                <h3 style={{ color: group.accent, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <span aria-hidden="true">{group.icon}</span>
                  {group.title}
                </h3>
                <p className="toolbar-note">{group.note}</p>
                <div className="surface-nav grouped-index-nav">
                  {group.links.map((item) => (
                    <a
                      key={item.href}
                      className="surface-link"
                      href={item.href}
                      style={{ borderColor: `${group.accent}55`, color: group.accent }}
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="setup" className="section">
          <div className="section-heading">
            <p className="eyebrow">Setup</p>
            <h2>Required setup first, optional tool setup next</h2>
            <p className="lead">
              Use this section before the workshop begins. Start with the required account and access setup. Then use
              the optional tool setup cards only if those tools are part of your session flow.
            </p>
          </div>
          <div className="section-heading">
            <h3>Required before the session</h3>
            <p className="lead">These are the items most participants should complete before joining the workshop.</p>
          </div>
          <div className="setup-grid">
            {requiredSetupGuides.map((item) => (
              <SetupCard key={item.title} item={item} />
            ))}
          </div>
          <div className="section-heading section-subhead">
            <h3>Tool Setup</h3>
            <p className="lead">Use these only if your session includes Claude Desktop or the Claude integrations.</p>
          </div>
          <div className="setup-grid">
            {optionalSetupGuides.map((item) => (
              <SetupCard key={item.title} item={item} />
            ))}
          </div>
        </section>

        <section id="important-notes" className="section">
          <div className="section-heading">
            <p className="eyebrow">Important Notes</p>
            <h2>Concepts to keep in mind and absorb</h2>
            <p className="lead">
              Keep these concepts visible through the session so participants build better prompting, better judgment,
              and better model choice habits.
            </p>
          </div>
          <div className="notes-grid">
            <CollapsibleCard className="note-card prompt-note" title="Anatomy of a Good Prompt in Claude AI">
              <div className="note-card-header">
                <p>Strong prompts are clear, grounded, and specific about the job to be done.</p>
              </div>
              <div className="anatomy-grid">
                {promptAnatomy.map((item) => (
                  <div key={item.label} className={`anatomy-chip tone-${item.tone}`}>
                    <strong>{item.label}</strong>
                    <span>{item.detail}</span>
                  </div>
                ))}
              </div>
              <div className="note-callout">
                Formula: <strong>Role + Goal + Context + Output Format + Constraints</strong>
              </div>
            </CollapsibleCard>

            <CollapsibleCard className="note-card model-note" title="When to use which Models">
              <div className="note-card-header">
                <p>Match the model to the effort, the risk, and the need for grounded output.</p>
              </div>
              <div className="model-list">
                {modelGuide.map((item) => (
                  <div key={item.model} className="model-row">
                    <strong>{item.model}</strong>
                    <span>{item.use}</span>
                  </div>
                ))}
              </div>
              <div className="note-callout">
                Recommended tutorial:{' '}
                <a
                  href="https://claude.com/resources/tutorials/get-the-most-from-claude-opus-4-6"
                  target="_blank"
                  rel="noreferrer"
                >
                  Get the most from Claude Opus 4.6
                </a>
              </div>
            </CollapsibleCard>

            <CollapsibleCard className="note-card eval-note" title="How to Critically Evaluate AI Responses">
              <div className="note-card-header">
                <p>Do not treat the first answer as the final answer. Use AI to review, challenge, and strengthen itself.</p>
              </div>
              <div className="model-list">
                {evaluationNotes.map((item) => (
                  <div key={item.title} className="model-row">
                    <strong>{item.title}</strong>
                    <span>{item.detail}</span>
                  </div>
                ))}
              </div>
              <div className="note-callout">
                Example to observe and apply:{' '}
                <a href="https://claude.ai/share/83236019-7802-407d-bfd9-16ccdbe26031" target="_blank" rel="noreferrer">
                  Claude shared evaluation example
                </a>
              </div>
            </CollapsibleCard>

            <CollapsibleCard className="note-card prompt-note" title="Which Claude Surface Should I Use?">
              <div className="note-card-header">
                <p>Claude shows up in many places. Use this guide to choose the right surface for the job.</p>
              </div>
              <div className="model-list">
                <div className="model-row">
                  <strong>Claude Core (claude.ai)</strong>
                  <span>Direct conversation, drafting, critique, strategy review, planning. No files needed. Best for thinking-heavy tasks where the output is text.</span>
                </div>
                <div className="model-row">
                  <strong>Claude Cowork</strong>
                  <span>File-aware workspace for non-developers. Use when you need Claude to work with a folder, create deliverables, organize files, or produce real outputs like spreadsheets and summaries. Think of it as delegating a project, not asking a question.</span>
                </div>
                <div className="model-row">
                  <strong>Claude Code</strong>
                  <span>Terminal and editor access for software work. Use when the task involves reading or editing code files, running commands, debugging, testing, or shipping changes to a repository.</span>
                </div>
                <div className="model-row">
                  <strong>Claude for Chrome</strong>
                  <span>Browser-native synthesis and action. Use when context lives across tabs, dashboards, portals, or CRM pages and you want reading, extraction, or careful browser actions without switching tools.</span>
                </div>
                <div className="model-row">
                  <strong>Claude Skills</strong>
                  <span>Reusable instruction patterns saved as custom configurations. Use when you want consistent behavior across repeated tasks — same role, same format, same output standard — without re-prompting each time.</span>
                </div>
                <div className="model-row">
                  <strong>Claude in Slack</strong>
                  <span>In-thread help where the conversation already lives. Use for thread summarization, draft updates, standup prep, and quick assistance without leaving Slack.</span>
                </div>
              </div>
              <div className="note-callout">
                Quick rule: if the work is a conversation, use Core. If it involves files or a folder, use Cowork. If it involves code or a terminal, use Code. If it involves the browser, use Chrome.
              </div>
            </CollapsibleCard>

            <CollapsibleCard className="note-card model-note" title="How Claude Augments Your Work">
              <div className="note-card-header">
                <p>AI augmentation means using Claude to reduce first-pass cognitive load — not to delegate decisions. This model applies across every role and surface in this program.</p>
              </div>
              <div className="model-list">
                <div className="model-row">
                  <strong>What Claude should do</strong>
                  <span>Draft, summarize, structure, compare, synthesize, and produce first-pass outputs from text-heavy or repetitive inputs. Use it where the work is high-volume, messy, or time-consuming to assemble from scratch.</span>
                </div>
                <div className="model-row">
                  <strong>What teams still own</strong>
                  <span>Judgment, accountability, relationships, sign-off, fairness, final decisions, and anything that requires lived context, empathy, or authority. Claude does not replace any of these.</span>
                </div>
                <div className="model-row">
                  <strong>The operating shift</strong>
                  <span>Teams spend less time on first versions and more time reviewing, challenging, coaching, and deciding. The output gets better; the human role becomes more strategic, not smaller.</span>
                </div>
              </div>
              <div className="note-callout">
                Quick rule: if the task is about producing a first draft, summary, or structured view — that is Claude. If it is about deciding, signing off, or owning the result — that stays human.
              </div>
            </CollapsibleCard>
          </div>
        </section>

        <section id="role-playbooks" className="section">
          <div className="section-heading">
            <p className="eyebrow">Role-Based Playbooks</p>
            <h2>Function-specific pages for deeper facilitation</h2>
            <p className="lead">
              These pages are useful when you want the workshop to branch into function-specific exploration rather than
              staying fully generic. Each page follows the same playbook structure with prompts, workflows, and guardrails.
            </p>
          </div>
          <div className="notes-grid">
            {rolePlaybooks.map((item) => (
              <article key={item.title} className="note-card model-note">
                <div className="note-card-header">
                  <h3>{item.title}</h3>
                  <p>{item.detail}</p>
                </div>
                <a className="btn" href={item.href}>
                  Open page
                </a>
              </article>
            ))}
          </div>
        </section>

        <section id="tutorials" className="section">
          <div className="section-heading">
            <p className="eyebrow">Tutorials</p>
            <h2>Open the dedicated tutorial pages</h2>
            <p className="lead">
              The detailed cards, prompts, examples, and downloads now live on their own pages so the home page can stay
              lighter and easier to facilitate.
            </p>
          </div>
          <div className="notes-grid">
            {tutorialPages.map((item) => (
              <article key={item.title} className="note-card model-note">
                <div className="note-card-header">
                  <h3>{item.title}</h3>
                  <p>{item.detail}</p>
                </div>
                <a className="btn" href={item.href}>
                  Open page
                </a>
              </article>
            ))}
          </div>
        </section>

        <section id="progress-tracker" className="section">
          <div className="section-heading">
            <p className="eyebrow">Progress Tracker</p>
            <h2>Track your module progress</h2>
            <p className="lead">
              Use this checklist to mark modules as you complete them. Check off each page as you work through it —
              your progress is saved in this browser session.
            </p>
          </div>
          <div className="notes-grid">
            {[
              { group: 'Setup', items: ['Required setup complete', 'Optional tools installed'] },
              { group: 'Role Playbooks', items: ['Claude for Finance', 'Claude for HR', 'Claude for Marketing', 'Claude for Sales', 'Claude for Customer Experience'] },
              { group: 'Tool Tutorials', items: ['Claude Core', 'Claude Cowork', 'Claude Code', 'Claude Skills', 'Claude Slack', 'Claude for Chrome', 'Claude for Excel', 'Claude for PowerPoint', 'NotebookLM', 'n8n Automation'] },
              { group: 'Exercises', items: ['Vibe Coding challenge', 'n8n Deep Dive', 'Final project evaluation'] }
            ].map((section) => (
              <article key={section.group} className="note-card model-note">
                <div className="note-card-header">
                  <h3>{section.group}</h3>
                </div>
                <ul style={{ listStyle: 'none', padding: '0', margin: '0' }}>
                  {section.items.map((item) => (
                    <li key={item} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.35rem 0', borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
                      <input type="checkbox" id={`progress-${item.replace(/\s/g, '-')}`} style={{ accentColor: '#dd5c36', width: '1rem', height: '1rem', flexShrink: 0 }} />
                      <label htmlFor={`progress-${item.replace(/\s/g, '-')}`} style={{ cursor: 'pointer', fontSize: '0.9rem' }}>{item}</label>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section id={finalExercise.id} className="section">
          <div className="section-heading">
            <p className="eyebrow">Final Exercise</p>
            <h2>{finalExercise.title}</h2>
            <p className="lead">
              End the session by evaluating whether the project thinking is truly transformative, leadership-aligned,
              and strategically sound rather than just superficially polished.
            </p>
          </div>
          <CollapsibleCard className="scenario-card" title={finalExercise.title} subtitle={finalExercise.outcome}>
            <p className="scenario-meta">
              <strong>Outcome:</strong> {finalExercise.outcome}
            </p>
            <p className="scenario-meta">
              <strong>When to use:</strong> {finalExercise.whenToUse}
            </p>
            <div className="scenario-columns">
              <div>
                <h4>Steps</h4>
                <ol>
                  {finalExercise.steps.map((step) => (
                    <li key={step}>{step}</li>
                  ))}
                </ol>
              </div>
              <PromptPanel title="" prompt={finalExercise.prompt} showPrompts={showPrompts} buttonLabel="evaluator prompt" />
            </div>
            <h4>Downloads</h4>
            <DownloadList downloads={finalExercise.downloads} />
          </CollapsibleCard>
        </section>

        <section id="downloads" className="section">
          <div className="section-heading">
            <p className="eyebrow">Downloads</p>
            <h2>Exercise file library</h2>
            <p className="lead">
              Download the individual files below and keep them in a session folder so participants can work quickly.
            </p>
          </div>
          <div className="library-grid">
            {downloadLibrary.map((group) => (
              <article key={group.name} className="library-card">
                <h3>{group.name}</h3>
                <DownloadList downloads={group.files} />
              </article>
            ))}
          </div>
        </section>
      </main>

      <a className="floating-index" href="#index" aria-label="Back to index">
        Index
      </a>
    </div>
  )
}

export default App
