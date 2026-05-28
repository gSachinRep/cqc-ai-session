import React, { useEffect, useState } from 'react'

const sections = [
  { label: 'Index', href: '#page-index' },
  { label: 'Learning Outcomes', href: '#learning-outcomes' },
  { label: 'Purpose', href: '#purpose' },
  { label: 'Operating Model', href: '#operating-model' },
  { label: 'How To Work', href: '#how-to-work' },
  { label: 'Strategic Communication', href: '#strategic-communication' },
  { label: 'Strategy Review', href: '#strategy-review' },
  { label: 'Sprint Planning', href: '#sprint-planning' },
  { label: 'When Not To Use', href: '#when-not-to-use' },
  { label: 'Error Recovery', href: '#error-recovery' },
  { label: 'Prompt Library', href: '#prompt-library' },
  { label: 'Download Library', href: '#download-library' }
]

const purposeCards = [
  ['What Claude core is best at', 'Claude core is strongest for direct thinking work: drafting, critique, synthesis, pressure testing, planning, and converting messy leadership intent into usable outputs.'],
  ['What it changes', 'Instead of using Claude only for rewriting, teams can use it as a structured thought partner for communication, strategy review, and execution planning.'],
  ['What to watch', 'The most common failure mode is vague prompting. Good outputs come from clear context, clear stakes, and explicit constraints.']
]

const howToCards = [
  {
    title: 'Set the frame before the ask',
    detail: 'Start with role, audience, business context, and tone before asking Claude to write or analyze.'
  },
  {
    title: 'Use second-pass critique',
    detail: 'The first answer should usually be followed by a critique pass that questions assumptions, tone, or missing risks.'
  },
  {
    title: 'End with something reusable',
    detail: 'The most useful Claude workflows end with a ready email, review checklist, sprint plan, or leadership note that the team can actually use.'
  }
]

const scenarioSections = [
  {
    id: 'strategic-communication',
    eyebrow: 'Strategic Communication',
    title: 'Use Claude to turn leadership intent into sharper communication',
    lead: 'These patterns help teams move from rough messaging to concise, audience-aware communication.',
    cards: [
      {
        title: 'Strategic Email',
        concept: 'Use Claude to draft a crisp leadership message with tone control, context, and alternatives for different stakeholders.',
        steps: [
          'Start a fresh chat and define your role, audience, purpose, and tone.',
          'Paste the brief and ask for one primary draft plus alternatives.',
          'Request stronger brevity or a different tone for a second pass.',
          'Finish with subject lines or a version for another audience.'
        ],
        prompt:
          'I am a senior leader. Draft a 150-word internal email to my leadership team announcing a new AI adoption initiative across three departments starting next month. Tone: confident but collaborative. Include two alternative versions and five subject line options.',
        downloads: [{ label: 'Email brief', href: '/downloads/claude-strategic-email-brief.txt' }]
      }
    ]
  },
  {
    id: 'strategy-review',
    eyebrow: 'Strategy Review',
    title: 'Use Claude as a critic, not only a drafter',
    lead: 'This is useful when a leadership idea needs stronger challenge before it reaches a decision meeting.',
    cards: [
      {
        title: 'Strategy Pressure Test',
        concept: 'Use Claude as a skeptical executive team to surface weak assumptions, stakeholder objections, and second-order risks.',
        steps: [
          'Paste the plan or use the sample strategy brief.',
          'Ask Claude to review it like a skeptical leadership team.',
          'Request the top risks, weakest assumption, and likely questions by stakeholder.',
          'Use the revised version to improve the original proposal.'
        ],
        prompt:
          'Challenge this plan like a skeptical executive team. Give me the top three risks, the most likely wrong assumption, the questions a CFO, CHRO, and operations head will ask, and a revised version of the plan that is more defensible.',
        downloads: [{ label: 'Strategy brief', href: '/downloads/claude-strategy-pressure-test.txt' }]
      }
    ]
  },
  {
    id: 'sprint-planning',
    eyebrow: 'Sprint Planning',
    title: 'Convert workshop energy into a 30-day execution plan',
    lead: 'This is useful right after a session, when teams need a realistic first month of adoption instead of vague enthusiasm.',
    cards: [
      {
        title: '30-Day AI Sprint Plan',
        concept: 'Use Claude to turn workshop momentum into a four-week adoption plan with weekly focus, review points, and internal communication support.',
        steps: [
          'Describe your team, function, and common types of work.',
          'Ask Claude for a four-week sprint with one visible output each week.',
          'Request a kickoff email and weekly check-in template.',
          'End by asking for adoption risks and how to avoid them.'
        ],
        prompt:
          'I am a functional leader who just completed an AI immersion session. Build a 30-day AI sprint plan for my team with weekly themes, specific use cases to test, one kickoff email, one weekly review template, and the main adoption pitfalls to watch for.',
        downloads: [{ label: 'Sprint planning brief', href: '/downloads/claude-ai-sprint-context.txt' }]
      }
    ]
  }
]

const promptLibrary = [
  'Draft a concise internal leadership email for this change, including two alternative versions and subject line options.',
  'Challenge this plan like a skeptical executive team and rewrite it to be more defensible.',
  'Build a 30-day adoption sprint for my team with weekly goals, visible outputs, and review checkpoints.'
]

const downloadLibrary = [
  '/downloads/claude-strategic-email-brief.txt',
  '/downloads/claude-strategy-pressure-test.txt',
  '/downloads/claude-ai-sprint-context.txt'
]

const learningOutcomes = [
  'Draft sharper leadership communications with tone alternatives and audience variations.',
  'Use Claude as a critic to pressure-test strategy before it reaches a decision meeting.',
  'Convert workshop momentum into a structured 30-day execution sprint with weekly checkpoints.',
  'Build reusable prompt templates your team can adapt for recurring communication and planning work.'
]

const whenNotToUseCards = [
  ['Use NotebookLM instead', 'When analysis must be grounded in specific internal documents or source material, NotebookLM is the better tool for citation-backed synthesis.'],
  ['Use Excel or data tools first', 'If the answer depends on accurate spreadsheet data or live metrics, get the numbers right first and then ask Claude to help frame or narrate.'],
  ['Use n8n for repeating outputs', 'If the same task needs to run for many recipients or regularly, a Claude Skill or n8n workflow is more reliable than one-off core chat.'],
  ['Avoid final-version drafts without review', 'Claude works best with iteration. Do not use it to produce final communications for high-stakes decisions without a human review cycle.']
]

const errorRecoveryCards = [
  { title: 'Output is vague or too generic', detail: 'Re-prompt with more specific context. Add your role, the intended audience, the business stakes, and one concrete example of what good looks like.' },
  { title: 'Tone does not fit the audience', detail: 'Ask Claude to critique its own tone assumption: "What tone did you assume, and how would you rewrite this for a more skeptical or more junior audience?"' },
  { title: 'Claude seems to be inventing context', detail: 'Ask Claude to separate what you provided from what it is inferring. Add the missing context explicitly in a follow-up prompt before continuing.' },
  { title: 'The draft is almost right but not quite there', detail: 'Use a critique pass rather than regenerating: "What is the weakest part of this output? What is missing? What should be cut?"' }
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
  return <article className="scenario-card collapsible-card"><button className="collapse-toggle" type="button" onClick={() => setIsOpen((v) => !v)}><div className="collapse-copy"><strong>{item.title}</strong><small>{item.concept}</small></div><span className="collapse-icon" aria-hidden="true">{isOpen ? '−' : '+'}</span></button>{isOpen ? <div className="collapse-body"><h4>Suggested Steps</h4><ol>{item.steps.map((step) => <li key={step}>{step}</li>)}</ol><div className="section-subhead"><div className="prompt-controls"><CopyPrompt prompt={item.prompt} /></div><pre>{item.prompt}</pre></div><h4>Downloads</h4><div className="download-grid">{item.downloads.map((file) => <a key={file.href} className="download-chip" href={file.href} download>{file.label}</a>)}</div></div> : null}</article>
}

export default function ClaudeCorePage() {
  return <div className="page-shell" style={{ '--accent': '#d97706', '--accent-soft': '#fef3c7' }}><header className="hero"><div className="hero-copy"><p className="eyebrow">Claude Core</p><h1>Claude <span>Core Playbook</span></h1><p className="lead">Use this page for direct Claude workflows where the model is acting as a communication partner, critic, planner, and structured thinking assistant.</p><div className="hero-actions"><a className="btn primary" href="#purpose">Start here</a><a className="btn" href="/">Back to main tutorial</a></div><div id="page-index" className="panel-card hero-index-card"><h3>Index</h3><div className="surface-nav hero-index-nav">{sections.filter((s) => s.href !== '#page-index').map((s) => <a key={s.href} className="surface-link" href={s.href}>{s.label}</a>)}</div></div></div><aside className="hero-panel"><div className="panel-card accent"><h3>Goal</h3><p>Help teams use Claude directly for sharper communication, stronger challenge, and clearer execution planning.</p></div></aside></header><main><CollapsibleSection id="learning-outcomes" eyebrow="Learning Outcomes" title="What you will be able to do by the end of this module" lead="These are the practical skills this playbook is designed to build."><ol style={{paddingLeft:'1.5rem',lineHeight:'1.8',margin:'0'}}>{learningOutcomes.map((o) => <li key={o} style={{marginBottom:'0.5rem'}}>{o}</li>)}</ol></CollapsibleSection><CollapsibleSection id="purpose" eyebrow="Purpose" title="Practical guide for Claude core workflows" lead="This page collects the direct Claude exercises that do not belong to a tool-specific surface like Excel, PowerPoint, or NotebookLM."><div className="notes-grid">{purposeCards.map(([title, detail]) => <InfoCard key={title} title={title} detail={detail} tone="model-note" />)}</div></CollapsibleSection><CollapsibleSection id="operating-model" eyebrow="Operating Model" title="How to think about direct Claude usage" lead="The strongest pattern is not one-shot prompting. It is prompt, review, pressure test, revise, and reuse."><div className="notes-grid">{[['Claude as drafting partner', 'Use Claude to create first drafts that are clearer and more structured than a blank-page start.'], ['Claude as reviewer', 'Use Claude to critique assumptions, sharpen tone, and expose missing risks or weak logic.'], ['Claude as execution helper', 'Use Claude to turn ideas into plans, templates, and reusable operating material.']].map(([title, detail]) => <InfoCard key={title} title={title} detail={detail} tone="prompt-note" />)}</div></CollapsibleSection><CollapsibleSection id="how-to-work" eyebrow="How To Work" title="How to use Claude effectively in core workflows" lead="These habits make direct Claude usage much more useful in leadership and team settings."><div className="notes-grid">{howToCards.map((item) => <InfoCard key={item.title} title={item.title} detail={item.detail} tone="prompt-note" />)}</div></CollapsibleSection>{scenarioSections.map((section) => <CollapsibleSection key={section.id} id={section.id} eyebrow={section.eyebrow} title={section.title} lead={section.lead}><div className="scenario-list">{section.cards.map((item) => <PromptCard key={item.title} item={item} />)}</div></CollapsibleSection>)}<CollapsibleSection id="when-not-to-use" eyebrow="When Not To Use" title="Situations where Claude core is the wrong tool" lead="Knowing when to switch tools is as important as knowing how to use this one."><div className="notes-grid">{whenNotToUseCards.map(([title, detail]) => <InfoCard key={title} title={title} detail={detail} tone="model-note" />)}</div></CollapsibleSection><CollapsibleSection id="error-recovery" eyebrow="Error Recovery" title="What to do when outputs are not working" lead="These patterns help you recover quickly when Claude does not produce what you need."><div className="notes-grid">{errorRecoveryCards.map((item) => <InfoCard key={item.title} title={item.title} detail={item.detail} tone="prompt-note" />)}</div></CollapsibleSection><CollapsibleSection id="prompt-library" eyebrow="Prompt Library" title="Claude core quick-reference prompts" lead="These are strong starting points for direct Claude workflows."><div className="scenario-list">{promptLibrary.map((prompt) => <article key={prompt} className="scenario-card"><div className="prompt-controls"><CopyPrompt prompt={prompt} /></div><pre>{prompt}</pre></article>)}</div></CollapsibleSection><CollapsibleSection id="download-library" eyebrow="Download Library" title="All Claude core files in one place" lead="Use this section when you want the full set of direct Claude exercise files."><div className="download-grid">{downloadLibrary.map((file) => <a key={file} className="download-chip" href={file} download>{file.split('/').pop()}</a>)}</div></CollapsibleSection></main><a className="floating-index" href="#page-index">Index</a></div>
}
