import React, { useState } from 'react'

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

const quickNav = [
  { label: 'Index', href: '#index' },
  { label: 'Workbook picks', href: '#workbook-picks' },
  { label: 'Claude core', href: '#claude-core' },
  { label: 'NotebookLM', href: '#notebooklm' },
  { label: 'Vibe coding', href: '#vibe-coding' },
  { label: 'Claude Web', href: '#web' },
  { label: 'Claude Excel', href: '#excel' },
  { label: 'Claude PowerPoint', href: '#powerpoint' },
  { label: 'Downloads', href: '#downloads' }
]

const vibeCodingProblems = [
  {
    color: 'orange',
    title: 'The Meeting Overload Analyzer',
    brief:
      "Our teams spend hours in meetings with no visibility into whether they're productive. I want a tool where I can paste a meeting transcript and get a quick summary — decisions made, action items, owners, and a 'was this meeting necessary?' score.",
    whyItWorks:
      'Universal pain point. No domain expertise needed. Tests summarization plus structured-output thinking.',
    buildFocus: ['Transcript input', 'Structured summary output', 'Decision and owner extraction', 'Meeting-value scoring'],
    starterPrompt:
      'Build a simple internal tool called Meeting Overload Analyzer. It should accept a pasted meeting transcript and return: summary, decisions made, action items, owners, risks, and a 1-10 score for whether the meeting was necessary. Use a clean, executive-friendly interface.'
  },
  {
    color: 'blue',
    title: 'The New Joiner Buddy Bot',
    brief:
      'Onboarding is inconsistent across our service lines. Build a simple chatbot that answers common Day 1–30 questions for new employees — policies, who to contact, what tools to use — based on information I feed it.',
    whyItWorks:
      'HR and operations relevance for every leader. Forces participants to think about knowledge structuring and prompt design for Q&A flows.',
    buildFocus: ['FAQ knowledge source', 'Chat interface', 'Contact escalation logic', 'Source-grounded answers'],
    starterPrompt:
      'Build a lightweight onboarding chatbot for new joiners. It should answer Day 1 to Day 30 questions using company information I provide, suggest who to contact when unsure, and clearly separate confirmed answers from items that need HR or manager confirmation.'
  },
  {
    color: 'green',
    title: 'The Client Proposal Accelerator',
    brief:
      "Our teams waste time formatting the same types of proposals. I want a tool where I enter a client name, industry, and the problem we're solving — and it generates a first-draft proposal outline with sections, suggested messaging, and a few differentiators.",
    whyItWorks:
      'Directly relevant to business development and service line heads. High perceived ROI.',
    buildFocus: ['Simple form inputs', 'Proposal outline generation', 'Messaging suggestions', 'Differentiator prompts'],
    starterPrompt:
      'Build a proposal drafting assistant. Inputs: client name, industry, business problem, and service line. Output: a first-draft proposal outline with executive summary, problem statement, approach, timeline, assumptions, and three differentiators.'
  },
  {
    color: 'violet',
    title: 'The Team Pulse Dashboard',
    brief:
      'I want a lightweight weekly check-in tool — team members answer 3 quick questions about workload, blockers, and morale, and I get a simple visual dashboard showing trends across my team over time.',
    whyItWorks:
      'Leadership-relevant, data plus UI challenge, and it pushes thinking about form inputs, storage, and visualization.',
    buildFocus: ['Weekly check-in form', 'Trend storage', 'Simple charts or status cards', 'Leader dashboard summary'],
    starterPrompt:
      'Build a weekly team pulse tool. Team members should submit answers on workload, blockers, and morale. Leaders should see trends over time, current hotspots, and a simple dashboard with clear visuals and minimal setup.'
  },
  {
    color: 'red',
    title: 'The Competitive Intel Snapshot',
    brief:
      "Before a client meeting, I want to quickly generate a one-pager on a competitor — what they offer, their likely pricing positioning, and 3 talking points on why we're different — just by entering a company name and our service line.",
    whyItWorks:
      'Strategic and exciting for senior leaders. Pushes participants to think about grounding AI outputs with context and constraints.',
    buildFocus: ['Competitor input form', 'One-page output', 'Differentiation talking points', 'Grounding and disclaimer section'],
    starterPrompt:
      'Build a competitor snapshot generator. Inputs: competitor name and our service line. Output: overview of likely offerings, estimated pricing position, risks in relying on incomplete information, and three talking points on how we are different.'
  }
]

const workbookSections = [
  {
    id: 'claude-core',
    eyebrow: 'Workbook Pick · Claude',
    title: 'Claude core workflows for senior leaders',
    summary:
      'Adapted from the workbook for fast live use: communication, strategy critique, and post-session execution planning.',
    scenarios: [
      {
        title: 'Strategic Email',
        outcome: 'Draft a crisp internal message with stronger context, tone control, and optional subject lines.',
        whenToUse: 'Use for leadership announcements, program launches, operating updates, or change communication.',
        steps: [
          'Open Claude and start a fresh conversation.',
          'Set context first: your role, audience, purpose, tone, and constraints.',
          'Paste the exercise brief and ask for one primary version, two alternatives, and five subject lines.',
          'Ask Claude to tighten it further for brevity or to adapt it for a different stakeholder group.'
        ],
        prompt:
          'I am a senior leader. Draft a 150-word internal email to my leadership team announcing a new AI adoption initiative across three departments starting next month. Tone: confident but collaborative. Include two alternative versions and five subject line options.',
        downloads: [
          { label: 'Email brief', href: '/downloads/claude-strategic-email-brief.md' }
        ]
      },
      {
        title: 'Strategy Pressure Test',
        outcome: 'Use Claude as a skeptic to expose assumptions, stakeholder objections, and second-order risks.',
        whenToUse: 'Use before strategy reviews, steering committee meetings, launch approvals, or investment discussions.',
        steps: [
          'Paste your plan or use the sample initiative brief.',
          'Ask Claude to behave like a skeptical leadership team reviewing the proposal.',
          'Request the top three risks, weakest assumption, and the questions each stakeholder would ask.',
          'Finish by asking for a revised, more resilient version of the plan.'
        ],
        prompt:
          'Challenge this plan like a skeptical executive team. Give me the top three risks, the most likely wrong assumption, the questions a CFO, CHRO, and operations head will ask, and a revised version of the plan that is more defensible.',
        downloads: [
          { label: 'Strategy brief', href: '/downloads/claude-strategy-pressure-test.md' }
        ]
      },
      {
        title: '30-Day AI Sprint Plan',
        outcome: 'Convert workshop energy into a concrete team rollout plan with weekly focus, ownership, and follow-through.',
        whenToUse: 'Use right after the session with each function head or leadership team.',
        steps: [
          'Describe your role, team, and the type of work your team does.',
          'Ask Claude for a four-week sprint with one weekly focus, one visible output, and one review checkpoint.',
          'Request an internal kickoff email and a weekly check-in template.',
          'Close by asking for common pitfalls and how to prevent low adoption.'
        ],
        prompt:
          'I am a functional leader who just completed an AI immersion session. Build a 30-day AI sprint plan for my team with weekly themes, specific use cases to test, one kickoff email, one weekly review template, and the main adoption pitfalls to watch for.',
        downloads: [
          { label: 'Sprint planning brief', href: '/downloads/claude-ai-sprint-context.md' }
        ]
      }
    ]
  },
  {
    id: 'notebooklm',
    eyebrow: 'Workbook Pick · NotebookLM',
    title: 'NotebookLM workflows for research, board prep, and market synthesis',
    summary:
      'These exercises keep leaders grounded in source material and are strong for research-heavy decisions where citation quality matters.',
    scenarios: [
      {
        title: 'Instant Research Brief',
        outcome: 'Turn a small source pack into an executive briefing with source-backed insights.',
        whenToUse: 'Use for emerging topic briefings, trend scans, policy research, or leadership prep.',
        steps: [
          'Create a new notebook and upload the three source files.',
          'Ask NotebookLM for five insights with source references and a 300-word executive brief.',
          'Ask a second question: what is still unclear or unsupported by the sources.',
          'Optionally generate the audio overview for commute listening.'
        ],
        prompt:
          'Using only these sources, produce a 300-word executive brief with five actionable insights, why each matters, and citations. Then list the open questions the sources do not resolve.',
        downloads: [
          { label: 'Industry report excerpt', href: '/downloads/notebooklm-industry-report.md' },
          { label: 'Analyst note', href: '/downloads/notebooklm-analyst-note.md' },
          { label: 'Internal strategy note', href: '/downloads/notebooklm-internal-strategy.md' }
        ]
      },
      {
        title: 'Board Pack Accelerator',
        outcome: 'Compress source-heavy board material into a briefing note, questions to expect, and a sharper narrative.',
        whenToUse: 'Use for CEO office, CFO, strategy, and business heads preparing for board or audit committee reviews.',
        steps: [
          'Upload the board memo, performance snapshot, and risk note into one notebook.',
          'Ask NotebookLM for the story the board is likely to care about most.',
          'Request five board questions, weak spots in the material, and a short pre-read summary.',
          'Use that output to refine the actual board pack.'
        ],
        prompt:
          'Review these sources as if you were preparing a board pre-read. Summarize the core story, highlight weak spots or unsupported claims, and generate five questions the board is likely to ask.',
        downloads: [
          { label: 'Board memo', href: '/downloads/notebooklm-board-memo.md' },
          { label: 'Performance snapshot', href: '/downloads/notebooklm-board-performance.csv' },
          { label: 'Risk note', href: '/downloads/notebooklm-board-risk-note.md' }
        ]
      },
      {
        title: 'Competitive Intelligence',
        outcome: 'Use a curated source set to compare competitor moves, extract implications, and identify response options.',
        whenToUse: 'Use for strategy, business development, pricing, product, and transformation teams.',
        steps: [
          'Upload the competitor announcements and internal response note.',
          'Ask NotebookLM to compare the competitors on moves, claims, and likely implications.',
          'Request a response matrix: ignore, monitor, counter, or match.',
          'Finish by asking what additional evidence leadership should collect before acting.'
        ],
        prompt:
          'Using these sources only, compare competitor moves, identify the most material implications for our business, and recommend what we should monitor, counter, or ignore.',
        downloads: [
          { label: 'Competitor A update', href: '/downloads/notebooklm-competitor-a.md' },
          { label: 'Competitor B update', href: '/downloads/notebooklm-competitor-b.md' },
          { label: 'Internal response note', href: '/downloads/notebooklm-competitive-response.md' }
        ]
      }
    ]
  }
]

const surfaces = [
  {
    id: 'web',
    eyebrow: 'Claude For Web',
    title: 'Use Claude inside browser work, not outside it',
    summary:
      'Best for fragmented context: multiple tabs, live documents, CRM pages, policy portals, dashboards, and customer threads.',
    scenarios: [
      {
        title: 'Executive Brief From Open Tabs',
        outcome: 'Convert scattered browser context into one leadership-ready decision brief.',
        whenToUse: 'Use when leaders are comparing reports, dashboards, customer notes, and public information at once.',
        steps: [
          'Open the case files in separate browser tabs or upload them into your browser workflow.',
          'Ask Claude to separate facts from inference before making a recommendation.',
          'Request a one-page brief with risks, options, and next actions.',
          'Red-team the first answer and tighten the final memo.'
        ],
        prompt:
          'Using the information across these open pages, create a one-page leadership brief with confirmed facts, likely implications, top risks, and the next three actions. Separate evidence from inference.',
        downloads: [
          { label: 'Market update', href: '/downloads/web-market-update.md' },
          { label: 'Customer escalation', href: '/downloads/web-customer-escalation.md' },
          { label: 'Ops dashboard snapshot', href: '/downloads/web-ops-dashboard.csv' },
          { label: 'Facilitator guide', href: '/downloads/web-scenario-brief.md' }
        ]
      },
      {
        title: 'Policy and Contract Review',
        outcome: 'Use Claude to extract obligations, risks, and negotiation points from browser-based documents.',
        whenToUse: 'Useful for legal, finance, HR, sales, and service lines reviewing policy changes or contract variations.',
        steps: [
          'Open the policy note and contract summary together.',
          'Ask Claude to identify obligations, deadlines, penalties, and ambiguities.',
          'Have it compare internal policy intent with external commitment.',
          'End with a decision note: accept, revise, or escalate.'
        ],
        prompt:
          'Review these documents together. Extract obligations, deadlines, commercial risks, unclear clauses, and items that require legal or leadership escalation. Finish with a negotiation checklist.',
        downloads: [
          { label: 'Policy note', href: '/downloads/web-policy-change.md' },
          { label: 'Contract summary', href: '/downloads/web-contract-summary.md' }
        ]
      },
      {
        title: 'Account and Meeting Preparation',
        outcome: 'Build a sharp prep pack from CRM notes, prior emails, performance signals, and public web pages.',
        whenToUse: 'Strong fit for sales heads, business heads, account directors, and CEO office teams.',
        steps: [
          'Open the account background, customer notes, and quarterly metrics.',
          'Ask Claude to identify stakeholder priorities, open issues, and opportunity angles.',
          'Generate a meeting brief, talking points, and likely objections.',
          'Finish with follow-up actions for the account owner.'
        ],
        prompt:
          'Create a meeting-prep pack from these materials. Include account context, stakeholder priorities, risk signals, opportunity areas, recommended talking points, and likely objections.',
        downloads: [
          { label: 'Account background', href: '/downloads/web-account-background.md' },
          { label: 'Quarterly account metrics', href: '/downloads/web-account-metrics.csv' }
        ]
      }
    ]
  },
  {
    id: 'excel',
    eyebrow: 'Claude For Excel',
    title: 'Use Claude to interrogate the numbers, not just read them',
    summary:
      'Best for dense workbooks: financial variance, sales pipeline patterns, workforce analysis, and executive review of spreadsheet-heavy decisions.',
    scenarios: [
      {
        title: 'Finance Variance Analysis',
        outcome: 'Explain what changed in revenue, margin, and operating costs without manually tracing every line item.',
        whenToUse: 'Ideal for CFO teams, BU heads, and CEOs reviewing monthly business performance.',
        steps: [
          'Download the variance workbook inputs and open them in Excel.',
          'Ask Claude to identify unusual movements, likely drivers, and questions leadership should ask.',
          'Follow with a prompt asking for management commentary in board language.',
          'Use a second pass to surface weak assumptions or hidden risks.'
        ],
        prompt:
          'Review this workbook as a CFO-style analyst. Identify the five most important movements, their likely drivers, possible risks, and the questions leadership should ask before acting.',
        downloads: [
          { label: 'Finance variance data', href: '/downloads/excel-finance-variance.csv' },
          { label: 'Cost driver notes', href: '/downloads/excel-finance-notes.md' }
        ]
      },
      {
        title: 'Sales Pipeline Diagnostics',
        outcome: 'Spot stage leakage, long-cycle deals, regional issues, and rep-level intervention needs.',
        whenToUse: 'Useful for sales leadership, business heads, and revenue operations reviews.',
        steps: [
          'Load the pipeline sheet and ask Claude for stage-wise conversion, ageing, and stuck opportunities.',
          'Ask for intervention recommendations by region, segment, and deal owner.',
          'Request a short sales review note for leadership.',
          'Red-team the answer for overfitting or weak evidence.'
        ],
        prompt:
          'Analyze this pipeline sheet and identify the main causes of revenue slippage, conversion leakage, and deal ageing. Recommend actions by team, region, and deal stage.',
        downloads: [
          { label: 'Pipeline data', href: '/downloads/excel-sales-pipeline.csv' },
          { label: 'Win-loss notes', href: '/downloads/excel-win-loss-notes.md' }
        ]
      },
      {
        title: 'Workforce and Attrition Review',
        outcome: 'Use Claude to combine workforce data, attrition patterns, and manager notes into a risk summary.',
        whenToUse: 'Strong fit for CHROs, HRBPs, and service line leaders during talent reviews.',
        steps: [
          'Open the workforce sheet and the manager commentary.',
          'Ask Claude to identify hotspots by tenure, role, location, and manager.',
          'Request intervention ideas that separate policy actions from manager coaching actions.',
          'Finish with a leadership-ready risk note.'
        ],
        prompt:
          'Review this workforce data and identify attrition hotspots, potential drivers, and the top interventions for the next quarter. Separate systemic issues from manager-level issues.',
        downloads: [
          { label: 'Workforce data', href: '/downloads/excel-workforce-attrition.csv' },
          { label: 'Manager notes', href: '/downloads/excel-workforce-notes.md' }
        ]
      }
    ]
  },
  {
    id: 'powerpoint',
    eyebrow: 'Claude For PowerPoint',
    title: 'Use Claude to shape narrative, not only slides',
    summary:
      'Best for executive communication: turning rough thinking into a clear storyline, improving board readiness, and tightening decision decks.',
    scenarios: [
      {
        title: 'Board Memo to Executive Deck',
        outcome: 'Turn raw notes and spreadsheet highlights into a concise leadership narrative.',
        whenToUse: 'Useful for CEO office, CFO reviews, transformation teams, and business unit heads.',
        steps: [
          'Download the notes and supporting metrics.',
          'Ask Claude to propose a six-slide board storyline with slide titles and evidence required.',
          'Request sharper executive wording and a more defensible recommendation.',
          'End with expected board questions and weak spots in the deck.'
        ],
        prompt:
          'Act as an executive communications advisor. Convert these raw notes into a six-slide board storyline with slide titles, key message per slide, supporting evidence, and likely questions from the board.',
        downloads: [
          { label: 'Board notes', href: '/downloads/ppt-board-notes.md' },
          { label: 'Board metrics', href: '/downloads/ppt-board-metrics.csv' }
        ]
      },
      {
        title: 'Client Presentation Refinement',
        outcome: 'Make a sales or account deck more differentiated, clearer, and decision-ready.',
        whenToUse: 'Strong fit for sales heads, service line leaders, consulting teams, and business development.',
        steps: [
          'Open the raw pitch notes and case-study inputs.',
          'Ask Claude to create a stronger storyline and to cut weak or repetitive material.',
          'Request sharper executive tone, stronger proof points, and likely client objections.',
          'Use the output to restructure the presentation before final design.'
        ],
        prompt:
          'Review these presentation notes and improve the storyline, differentiation, credibility, and executive tone. Identify what should be cut, what needs proof, and what the client is likely to challenge.',
        downloads: [
          { label: 'Pitch notes', href: '/downloads/ppt-client-pitch-notes.md' },
          { label: 'Case studies', href: '/downloads/ppt-client-case-studies.md' }
        ]
      },
      {
        title: 'Change Communication Deck',
        outcome: 'Craft a leadership deck for policy shifts, operating model changes, or restructuring.',
        whenToUse: 'Useful for CHROs, CEOs, transformation leaders, and internal communications teams.',
        steps: [
          'Use the change brief and FAQ inputs.',
          'Ask Claude to create a sequence that balances clarity, empathy, and action.',
          'Request specific messages for managers, employees, and leadership town halls.',
          'Finish with a slide-level risk check for ambiguity or resistance.'
        ],
        prompt:
          'Turn these change-management notes into a clear leadership deck outline. Balance rationale, empathy, operating implications, and next steps. Include likely employee questions and manager guidance.',
        downloads: [
          { label: 'Change brief', href: '/downloads/ppt-change-brief.md' },
          { label: 'Employee FAQ inputs', href: '/downloads/ppt-change-faq.md' }
        ]
      }
    ]
  }
]

const facilitationTips = [
  'Start with the familiar task first, then show the higher-order version using the same material.',
  'Keep participants focused on decisions, risks, and next actions rather than on prompt phrasing alone.',
  'Ask every group to separate confirmed facts from inference before they make recommendations.',
  'Always include one red-team step so the room sees how to use Claude as a critic, not just a generator.',
  'Close each lab by asking what should remain fully human-owned.'
]

const downloadLibrary = [
  {
    name: 'Workbook-derived Claude files',
    files: [
      '/downloads/claude-strategic-email-brief.md',
      '/downloads/claude-strategy-pressure-test.md',
      '/downloads/claude-ai-sprint-context.md'
    ]
  },
  {
    name: 'Workbook-derived NotebookLM files',
    files: [
      '/downloads/notebooklm-industry-report.md',
      '/downloads/notebooklm-analyst-note.md',
      '/downloads/notebooklm-internal-strategy.md',
      '/downloads/notebooklm-board-memo.md',
      '/downloads/notebooklm-board-performance.csv',
      '/downloads/notebooklm-board-risk-note.md',
      '/downloads/notebooklm-competitor-a.md',
      '/downloads/notebooklm-competitor-b.md',
      '/downloads/notebooklm-competitive-response.md'
    ]
  },
  {
    name: 'Claude for Web files',
    files: [
      '/downloads/web-market-update.md',
      '/downloads/web-customer-escalation.md',
      '/downloads/web-ops-dashboard.csv',
      '/downloads/web-scenario-brief.md',
      '/downloads/web-policy-change.md',
      '/downloads/web-contract-summary.md',
      '/downloads/web-account-background.md',
      '/downloads/web-account-metrics.csv'
    ]
  },
  {
    name: 'Claude for Excel files',
    files: [
      '/downloads/excel-finance-variance.csv',
      '/downloads/excel-finance-notes.md',
      '/downloads/excel-sales-pipeline.csv',
      '/downloads/excel-win-loss-notes.md',
      '/downloads/excel-workforce-attrition.csv',
      '/downloads/excel-workforce-notes.md'
    ]
  },
  {
    name: 'Claude for PowerPoint files',
    files: [
      '/downloads/ppt-board-notes.md',
      '/downloads/ppt-board-metrics.csv',
      '/downloads/ppt-client-pitch-notes.md',
      '/downloads/ppt-client-case-studies.md',
      '/downloads/ppt-change-brief.md',
      '/downloads/ppt-change-faq.md'
    ]
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

function SurfaceCard({ surface, showPrompts }) {
  return (
    <section id={surface.id} className="surface-card">
      <div className="surface-header">
        <p className="eyebrow">{surface.eyebrow}</p>
        <h2>{surface.title}</h2>
        <p className="lead">{surface.summary}</p>
      </div>
      <div className="scenario-list">
        {surface.scenarios.map((scenario) => (
          <article key={scenario.title} className="scenario-card">
            <h3>{scenario.title}</h3>
            <p className="scenario-meta">
              <strong>Outcome:</strong> {scenario.outcome}
            </p>
            <p className="scenario-meta">
              <strong>When to use:</strong> {scenario.whenToUse}
            </p>
            <div className="scenario-columns">
              <div>
                <h4>Steps</h4>
                <ol>
                  {scenario.steps.map((step) => (
                    <li key={step}>{step}</li>
                  ))}
                </ol>
              </div>
              <div>
                <div className="prompt-header">
                  <h4>Prompt</h4>
                  <span className="prompt-state">{showPrompts ? 'Visible' : 'Hidden'}</span>
                </div>
                {showPrompts ? <pre>{scenario.prompt}</pre> : <div className="prompt-placeholder">Prompt hidden</div>}
              </div>
            </div>
            <h4>Downloads</h4>
            <DownloadList downloads={scenario.downloads} />
          </article>
        ))}
      </div>
    </section>
  )
}

function VibeCodingCard({ item, showPrompts }) {
  return (
    <article className={`vibe-card vibe-${item.color}`}>
      <div className="vibe-header">
        <h3>{item.title}</h3>
        <p className="vibe-brief">{item.brief}</p>
      </div>
      <p className="scenario-meta">
        <strong>Why it works:</strong> {item.whyItWorks}
      </p>
      <div className="scenario-columns">
        <div>
          <h4>What participants should think through</h4>
          <ol>
            {item.buildFocus.map((focus) => (
              <li key={focus}>{focus}</li>
            ))}
          </ol>
        </div>
        <div>
          <div className="prompt-header">
            <h4>Starter build prompt</h4>
            <span className="prompt-state">{showPrompts ? 'Visible' : 'Hidden'}</span>
          </div>
          {showPrompts ? <pre>{item.starterPrompt}</pre> : <div className="prompt-placeholder">Prompt hidden</div>}
        </div>
      </div>
    </article>
  )
}

function App() {
  const [showPrompts, setShowPrompts] = useState(true)

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
            <h3>How to use this page</h3>
            <ul>
              <li>Start with the workbook picks for Claude or NotebookLM.</li>
              <li>Use the quick index to jump to Web, Excel, or PowerPoint as needed.</li>
              <li>Download the case files before the session starts.</li>
              <li>Run the first prompt as written, then ask the room to improve it.</li>
              <li>End every lab with one pilot idea and one guardrail.</li>
            </ul>
          </div>
          <div className="panel-card accent">
            <h3>Session goal</h3>
            <p>
              Move the room from everyday prompting into higher-value workflows: decision support, stakeholder simulation,
              data interpretation, and executive communication.
            </p>
          </div>
        </aside>
      </header>

      <main>
        <section id="index" className="section">
          <div className="section-heading">
            <p className="eyebrow">Quick Index</p>
            <h2>Jump straight to the part you need</h2>
          </div>
          <div className="index-toolbar">
            <button className="btn toggle-btn" type="button" onClick={() => setShowPrompts((current) => !current)}>
              {showPrompts ? 'Hide all prompts' : 'Show all prompts'}
            </button>
            <p className="toolbar-note">Applies to every prompt block across Claude, NotebookLM, and Vibe Coding.</p>
          </div>
          <div className="surface-nav quick-nav">
            {quickNav.map((item) => (
              <a key={item.href} className="surface-link" href={item.href}>
                {item.label}
              </a>
            ))}
          </div>
        </section>

        <section className="section">
          <div className="section-heading">
            <p className="eyebrow">Run Of Show</p>
            <h2>90-minute session structure</h2>
          </div>
          <div className="timeline">
            {sessionFlow.map((item) => (
              <article key={item.time} className="timeline-card">
                <p className="timeline-time">{item.time}</p>
                <h3>{item.title}</h3>
                <p>{item.detail}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="workbook-picks" className="section">
          <div className="section-heading">
            <p className="eyebrow">Workbook Picks</p>
            <h2>Selected use cases from the session workbook</h2>
            <p className="lead">
              These are adapted from the workbook you shared and converted into facilitator-ready labs with sample files
              and clearer handoff steps.
            </p>
          </div>
          <div className="surface-stack">
            {workbookSections.map((surface) => (
              <SurfaceCard key={surface.id} surface={surface} showPrompts={showPrompts} />
            ))}
          </div>
        </section>

        <section id="vibe-coding" className="section">
          <div className="section-heading">
            <p className="eyebrow">Vibe Coding</p>
            <h2>Build-first problems for participants</h2>
            <p className="lead">
              Use these as live build challenges in tools like Claude, Bolt, v0, or any AI-assisted app builder. They
              work well for mixed senior audiences because the problems are familiar, but the outputs require product
              thinking rather than just prompting.
            </p>
          </div>
          <div className="scenario-list">
            {vibeCodingProblems.map((item) => (
              <VibeCodingCard key={item.title} item={item} showPrompts={showPrompts} />
            ))}
          </div>
        </section>

        <section id="tutorials" className="section">
          <div className="section-heading">
            <p className="eyebrow">Tutorials</p>
            <h2>Use cases by Claude surface</h2>
            <p className="lead">
              Each scenario is designed for seasoned leaders. The materials are generic and cross-functional rather than
              industry-specific.
            </p>
          </div>
          <div className="surface-nav">
            {surfaces.map((surface) => (
              <a key={surface.id} className="surface-link" href={`#${surface.id}`}>
                {surface.eyebrow}
              </a>
            ))}
          </div>
          <div className="surface-stack">
            {surfaces.map((surface) => (
              <SurfaceCard key={surface.id} surface={surface} showPrompts={showPrompts} />
            ))}
          </div>
        </section>

        <section className="section">
          <div className="section-heading">
            <p className="eyebrow">Facilitation Notes</p>
            <h2>What to emphasize in the room</h2>
          </div>
          <div className="tips-grid">
            {facilitationTips.map((tip) => (
              <article key={tip} className="tip-card">
                <p>{tip}</p>
              </article>
            ))}
          </div>
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
    </div>
  )
}

export default App
