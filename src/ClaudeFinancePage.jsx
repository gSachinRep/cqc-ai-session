import React, { useEffect, useState } from 'react'

const sections = [
  { label: 'Index', href: '#page-index' },
  { label: 'Purpose', href: '#purpose' },
  { label: 'Outcomes in Practice', href: '#outcomes-in-practice' },
  { label: 'Operating Model', href: '#operating-model' },
  { label: 'FP&A', href: '#fpa' },
  { label: 'Reporting', href: '#reporting' },
  { label: 'Decision Support', href: '#decision-support' },
  { label: 'Policies and Controls', href: '#policies-and-controls' },
  { label: 'Board and Investor', href: '#board-and-investor' },
  { label: 'Workflow Automation', href: '#workflow-automation' },
  { label: 'Governance', href: '#governance' },
  { label: 'Prompt Library', href: '#prompt-library' },
  { label: 'What Changes', href: '#deeper-idea' }
]

const outcomes = [
  { title: 'Design strong finance prompts', detail: 'Give Claude enough business context, time horizon, metric definitions, and output structure so the answer is financially useful rather than generic.' },
  { title: 'Use Claude in everyday finance work', detail: 'Claude is most useful in finance for summarizing, variance analysis, memo drafting, policy interpretation, and decision framing.' },
  { title: 'Accelerate FP&A cycles', detail: 'Claude can help explain movements in plans, budgets, forecasts, and performance packs so finance teams spend less time on first-pass narrative creation.' },
  { title: 'Improve reporting clarity', detail: 'Monthly reviews, board packs, and business commentary become clearer when Claude helps convert dense numbers into structured explanations and questions.' },
  { title: 'Support decision quality', detail: 'Claude can help finance leaders structure options, trade-offs, sensitivities, and assumptions, while the financial judgment remains human-owned.' },
  { title: 'Reduce manual writing and synthesis', detail: 'A major gain is reducing the repetitive effort involved in rephrasing updates, building commentary, and summarizing long documents.' }
]

const augmentationExamples = [
  {
    title: 'From spreadsheet movement to CFO-ready commentary',
    before: 'Analysts manually inspect variances and then spend time writing a usable explanation for leadership.',
    after: 'Claude turns the movement notes and workbook context into a structured summary of drivers, risks, and questions for review.',
    prompt: `Act as a finance business partner.\n\nReview these month-over-month movements and draft a concise executive commentary.\n\nInclude:\n- Top drivers\n- One-off vs structural movement\n- Risks to watch\n- Questions leadership should ask`
  },
  {
    title: 'From budget assumptions to a decision memo',
    before: 'Finance teams often work through options in spreadsheets but struggle to communicate assumptions and trade-offs clearly.',
    after: 'Claude helps convert assumptions, scenarios, and constraints into a cleaner options memo with trade-offs and recommendation framing.',
    prompt: `Act as a strategic finance advisor.\n\nTurn these budget assumptions and scenarios into a decision memo.\n\nInclude:\n- Core issue\n- Options considered\n- Assumptions behind each option\n- Risks and trade-offs\n- Recommended path`
  }
]

const operatingRoles = [
  { title: 'Synthesizer', detail: 'Reads reporting packs, policies, plans, contracts, and commentary to extract the important movements, themes, and exceptions.' },
  { title: 'Drafting Partner', detail: 'Creates first drafts of board commentary, monthly updates, policy summaries, and business-facing finance communication.' },
  { title: 'Structured Thinking Assistant', detail: 'Helps finance leaders frame trade-offs, sensitivities, and decisions more clearly when options are messy.' }
]

const contentSections = [
  {
    id: 'fpa',
    eyebrow: 'FP&A',
    title: 'Claude for planning, forecasting, and variance analysis',
    lead: 'Claude is useful in FP&A when it helps explain movement, structure scenarios, and turn raw analysis into review-ready narrative.',
    cards: [
      {
        title: 'Variance commentary',
        concept: 'Claude can help explain revenue, cost, margin, or cash movement by turning analyst notes and numbers into clearer commentary.',
        steps: ['Provide the period context and the metric definitions.', 'Ask for top drivers, one-offs, structural factors, and risks.', 'Keep facts and assumptions separate.', 'Review the narrative against the workbook before sharing.'],
        prompt: `Act as an FP&A manager.\n\nSummarize the key drivers behind these performance movements.\n\nInclude:\n- Revenue movement\n- Cost movement\n- Margin impact\n- One-off items\n- Risks for next month\n\nSeparate confirmed facts from inference.`
      },
      {
        title: 'Scenario planning',
        concept: 'Claude can help structure multiple scenarios and explain the decision implications of each one, especially when assumptions are spread across notes and spreadsheets.',
        steps: ['List the scenarios and their assumptions.', 'Ask Claude to compare likely outcomes and risk points.', 'Request leading indicators to track.', 'Use the output as a discussion aid for the finance review.'],
        prompt: `Act as a finance strategy advisor.\n\nCompare three scenarios for the next two quarters based on these assumptions.\n\nFor each scenario, include:\n- Revenue and margin implication\n- Main assumptions\n- Risks\n- Leading indicators to monitor\n- Suggested finance response`
      }
    ]
  },
  {
    id: 'reporting',
    eyebrow: 'Reporting',
    title: 'Claude for reporting and monthly reviews',
    lead: 'Finance reporting often suffers from dense language and repetitive commentary. Claude helps turn raw notes into cleaner business-facing updates.',
    cards: [
      {
        title: 'Monthly business review draft',
        concept: 'Claude can convert a reporting pack and analyst notes into a concise review summary for business leaders.',
        steps: ['Provide the reporting pack context and audience.', 'Ask for highlights, concerns, and decision points.', 'Keep the tone executive and concise.', 'Validate all numerical references before circulation.'],
        prompt: `Act as a finance communications partner.\n\nDraft a monthly business review summary from this reporting pack.\n\nInclude:\n- Performance highlights\n- Major misses\n- Business risks\n- Actions or decisions needed\n\nKeep it concise and executive-ready.`
      },
      {
        title: 'Narrative standardization',
        concept: 'Claude can help standardize the wording and structure of recurring finance updates across teams or regions.',
        steps: ['Provide the preferred update format.', 'Ask Claude to apply the same structure to new inputs.', 'Use it to reduce uneven writing quality across reports.', 'Refine the standard format as a team asset.'],
        prompt: `Use this finance reporting template and convert the latest update notes into the same structure and tone.\n\nKeep headings consistent, flag missing information, and do not invent figures.`
      }
    ]
  },
  {
    id: 'decision-support',
    eyebrow: 'Decision Support',
    title: 'Claude for strategic finance decision support',
    lead: 'Claude is valuable when finance needs to turn assumptions, trade-offs, and operating realities into clearer decision support for leadership.',
    cards: [
      {
        title: 'Investment or spend review',
        concept: 'Claude can help frame a decision on cost, ROI, risks, and assumptions when a spend request or investment proposal is under review.',
        steps: ['Provide the proposal, objectives, costs, and assumptions.', 'Ask for options and trade-offs.', 'Keep the answer explicit about uncertainty.', 'Review with the actual investment owner before concluding.'],
        prompt: `Act as a finance decision-support partner.\n\nEvaluate this investment request.\n\nInclude:\n- Business objective\n- Cost and benefit logic\n- Key assumptions\n- Major risks\n- Questions finance should ask\n- Recommended decision framing`
      },
      {
        title: 'Price or margin pressure review',
        concept: 'When pricing or margin pressure emerges, Claude can help organize the commercial, financial, and operational implications into a structured review.',
        steps: ['Describe the pricing issue and affected products or segments.', 'Ask Claude to separate short-term fixes from structural responses.', 'Request implications for margin and operating model.', 'Use the result to prepare leadership discussion.'],
        prompt: `Act as a commercial finance advisor.\n\nAnalyze this pricing and margin pressure issue.\n\nInclude:\n- Likely drivers\n- Short-term response options\n- Structural fixes\n- Margin implications\n- Risks if no action is taken`
      }
    ]
  },
  {
    id: 'policies-and-controls',
    eyebrow: 'Policies and Controls',
    title: 'Claude for policy interpretation and control documentation',
    lead: 'Finance teams manage policies, SOPs, and control narratives that are text-heavy and often hard to keep consistent. Claude can help draft and interpret them faster.',
    cards: [
      {
        title: 'Policy summary and interpretation',
        concept: 'Claude can summarize financial policies or accounting guidance into plainer language for training, onboarding, or internal communication.',
        steps: ['Provide the policy text or source document.', 'Ask for a plain-language summary plus exceptions or escalations.', 'Keep the original document as the source of truth.', 'Use the summary to support, not replace, policy judgment.'],
        prompt: `Act as a finance policy interpreter.\n\nSummarize this accounting or finance policy in plain business language.\n\nInclude:\n- Purpose\n- Key rules\n- Common exceptions\n- Escalation points\n- Practical implications for teams`
      },
      {
        title: 'Controls documentation',
        concept: 'Claude can help draft or standardize control descriptions, process notes, and review narratives when finance needs consistency across documentation.',
        steps: ['List the process and the control objective.', 'Ask Claude to draft the control description and evidence expectation.', 'Review the wording with the control owner.', 'Use the draft as part of the formal documentation workflow.'],
        prompt: `Act as a controllership documentation assistant.\n\nDraft a clear control narrative for this process.\n\nInclude:\n- Control objective\n- Frequency\n- Owner\n- Evidence retained\n- Risk addressed`
      }
    ]
  },
  {
    id: 'board-and-investor',
    eyebrow: 'Board and Investor',
    title: 'Claude for board, audit, and investor communication',
    lead: 'Claude can help finance leaders sharpen narrative and structure for high-stakes communication, provided the numbers and judgments are still human-verified.',
    cards: [
      {
        title: 'Board pack support',
        concept: 'Claude can compress a large reporting pack into the handful of signals, questions, and messages that matter most for a board discussion.',
        steps: ['Provide the pack, audience, and purpose.', 'Ask for key messages, questions, and risk flags.', 'Keep the tone crisp and non-promotional.', 'Validate every claim before use.'],
        prompt: `Act as a CFO chief-of-staff.\n\nTurn this board pack into a concise board summary.\n\nInclude:\n- What matters most this month\n- Risks and pressure points\n- Decisions or questions for the board\n- Areas where more explanation will be needed`
      },
      {
        title: 'Audit and committee briefing',
        concept: 'Claude can help turn dense technical material into a more structured committee briefing note for audit, risk, or finance committees.',
        steps: ['Provide the issue summary and supporting detail.', 'Ask for a briefing note in committee language.', 'Separate confirmed facts from judgment or estimates.', 'Use the result to sharpen the final briefing.'],
        prompt: `Act as a finance governance writer.\n\nDraft an audit committee briefing on this issue.\n\nInclude:\n- Situation summary\n- What changed\n- Risk exposure\n- Management response\n- Questions the committee may ask`
      }
    ]
  }
]

const workflowSteps = ['Claude drafts first-pass commentary.', 'Claude structures assumptions and scenarios.', 'Claude prepares questions for review.', 'Finance validates the numbers and judgments.', 'Leadership uses the sharpened output to decide.']

const governance = { allowed: ['Drafting finance commentary', 'Summarizing reporting packs', 'Structuring options and questions'], restricted: ['Final sign-off on financial statements', 'Investment approval authority', 'Replacing control-owner judgment'] }

const promptLibrary = [
  { label: 'FP&A', text: 'Summarize the key drivers behind this variance and separate one-offs from structural movement.' },
  { label: 'Reporting', text: 'Turn this reporting pack into a concise executive summary with highlights, misses, and decisions needed.' },
  { label: 'Policy', text: 'Explain this finance policy in plain language and list exceptions or escalation points.' },
  { label: 'Decision support', text: 'Compare these three scenarios and explain the key assumptions, trade-offs, and likely finance response.' },
  { label: 'Board', text: 'Prepare a board-ready summary of this pack with the top issues, risks, and questions directors may ask.' }
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
      <button className="collapse-toggle" type="button" onClick={() => setIsOpen((value) => !value)}>
        <div className="collapse-copy">
          <span className="eyebrow">{eyebrow}</span>
          <strong>{title}</strong>
          <small>{lead}</small>
        </div>
        <span className="collapse-icon" aria-hidden="true">{isOpen ? '−' : '+'}</span>
      </button>
      {isOpen ? <div className="collapse-body section-collapse-body">{children}</div> : null}
    </section>
  )
}

function InfoCard({ title, detail, tone = 'model-note' }) {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <article className={`note-card collapsible-card ${tone}`}>
      <button className="collapse-toggle" type="button" onClick={() => setIsOpen((value) => !value)}>
        <div className="collapse-copy">
          <strong>{title}</strong>
          <small>{detail}</small>
        </div>
        <span className="collapse-icon" aria-hidden="true">{isOpen ? '−' : '+'}</span>
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
      <button className="collapse-toggle" type="button" onClick={() => setIsOpen((value) => !value)}>
        <div className="collapse-copy">
          <strong>{item.title}</strong>
          <small>{item.concept}</small>
        </div>
        <span className="collapse-icon" aria-hidden="true">{isOpen ? '−' : '+'}</span>
      </button>
      {isOpen ? (
        <div className="collapse-body">
          <h4>Suggested Steps</h4>
          <ol>{item.steps.map((step) => <li key={step}>{step}</li>)}</ol>
          <div className="section-subhead">
            <div className="prompt-controls"><CopyPrompt prompt={item.prompt} /></div>
            <pre>{item.prompt}</pre>
          </div>
        </div>
      ) : null}
    </article>
  )
}

function ClaudeFinancePage() {
  return (
    <div className="page-shell" style={{ '--accent': '#0d9488', '--accent-soft': '#ccfbf1' }}>
      <header className="hero">
        <div className="hero-copy">
          <p className="eyebrow">Claude for Finance</p>
          <h1>Claude <span>Finance Playbook</span></h1>
          <p className="lead">
            Finance is full of dense text, structured numbers, assumptions, policies, and decision trade-offs. Claude works best here as a copilot for commentary, analysis framing, and decision support while finance keeps ownership of the numbers and judgment.
          </p>
          <div className="hero-actions">
            <a className="btn primary" href="#purpose">Start here</a>
            <a className="btn" href="/">Back to main tutorial</a>
          </div>
          <div id="page-index" className="panel-card hero-index-card">
            <h3>Index</h3>
            <div className="surface-nav hero-index-nav">
              {sections.filter((section) => section.href !== '#page-index').map((section) => (
                <a key={section.href} className="surface-link" href={section.href}>{section.label}</a>
              ))}
            </div>
          </div>
        </div>
        <aside className="hero-panel">
          <div className="panel-card accent">
            <h3>Goal</h3>
            <p>Help finance teams use Claude to improve commentary, structure options, sharpen reviews, and accelerate text-heavy work without weakening controls or judgment.</p>
          </div>
        </aside>
      </header>
      <main>
        <CollapsibleSection id="purpose" eyebrow="Purpose" title="Practical guide for AI-augmented finance" lead="This page focuses on repeatable finance workflows where Claude adds speed and structure without taking over financial accountability.">
          <div className="section-subhead">
            <h3>Practical examples of augmentation</h3>
            <div className="scenario-list">
              {augmentationExamples.map((item) => (
                <article key={item.title} className="scenario-card">
                  <h3>{item.title}</h3>
                  <p className="scenario-meta"><strong>Before:</strong> {item.before}</p>
                  <p className="scenario-meta"><strong>With Claude:</strong> {item.after}</p>
                  <div className="prompt-controls"><CopyPrompt prompt={item.prompt} /></div>
                  <pre>{item.prompt}</pre>
                </article>
              ))}
            </div>
          </div>
        </CollapsibleSection>
        <CollapsibleSection id="outcomes-in-practice" eyebrow="Outcomes in Practice" title="What these outcomes mean in finance" lead="These are the operational shifts finance teams should expect, not just course slogans.">
          <div className="notes-grid">{outcomes.map((item) => <InfoCard key={item.title} title={item.title} detail={item.detail} tone="prompt-note" />)}</div>
        </CollapsibleSection>
        <CollapsibleSection id="operating-model" eyebrow="Operating Model" title="The finance + Claude operating model" lead="Claude should assist with synthesis, drafting, and structured reasoning while finance retains sign-off and control discipline.">
          <div className="notes-grid">{operatingRoles.map((item) => <InfoCard key={item.title} title={item.title} detail={item.detail} tone="model-note" />)}</div>
        </CollapsibleSection>
        {contentSections.map((section) => (
          <CollapsibleSection key={section.id} id={section.id} eyebrow={section.eyebrow} title={section.title} lead={section.lead}>
            <div className="scenario-list">{section.cards.map((item) => <PromptCard key={item.title} item={item} />)}</div>
          </CollapsibleSection>
        ))}
        <CollapsibleSection id="workflow-automation" eyebrow="Workflow Automation" title="Finance workflow automation with Claude" lead="Claude becomes more valuable when embedded into recurring planning and reporting loops.">
          <div className="timeline">{workflowSteps.map((step, index) => <article key={step} className="timeline-card"><p className="timeline-time">Step {index + 1}</p><p>{step}</p></article>)}</div>
        </CollapsibleSection>
        <CollapsibleSection id="governance" eyebrow="Governance" title="Governance guidelines" lead="Define where Claude is appropriate and where finance authority must remain fully human.">
          <div className="scenario-list">
            <PromptCard item={{ title: 'Allowed uses', concept: 'Use Claude to improve drafting, summarization, and structured analysis in finance workflows.', steps: governance.allowed, prompt: 'Use Claude to draft finance commentary, summarize reporting packs, and structure options for review while keeping human validation in place.' }} />
            <PromptCard item={{ title: 'Restricted uses', concept: 'Do not delegate sign-off, approval authority, or control-owner judgment to Claude.', steps: governance.restricted, prompt: 'Keep final sign-off on financial statements, approvals, and control judgments fully human-owned. Use Claude only for support and preparation.' }} />
          </div>
        </CollapsibleSection>
        <CollapsibleSection id="prompt-library" eyebrow="Prompt Library" title="Finance prompt library quick reference" lead="These starters are easy to adapt for common finance work.">
          <div className="scenario-list">{promptLibrary.map((item) => <PromptCard key={item.label} item={{ title: item.label, concept: 'Copy and adapt this prompt for everyday finance work.', steps: ['Add period and business context.', 'State metrics and boundaries.', 'Review before circulating.'], prompt: item.text }} />)}</div>
        </CollapsibleSection>
        <CollapsibleSection id="deeper-idea" eyebrow="What Changes" title="The deeper idea behind this playbook" lead="Finance spends less time narrating from scratch and more time interpreting, challenging, and advising.">
          <div className="notes-grid">
            <InfoCard title="From report writer to business advisor" detail="Claude handles more of the first-pass commentary and organization so finance can spend more time on decision support and strategic challenge." tone="model-note" />
            <InfoCard title="Finance as the discipline layer" detail="With AI support, finance can become faster at turning raw information into decisions while remaining the discipline layer for accuracy, control, and trade-off clarity." tone="model-note" />
          </div>
        </CollapsibleSection>
      </main>
      <a className="floating-index" href="#page-index">Index</a>
    </div>
  )
}

export default ClaudeFinancePage
