import React, { useEffect, useState } from 'react'

const sections = [
  { label: 'Index', href: '#page-index' },
  { label: 'Learning Outcomes', href: '#learning-outcomes' },
  { label: 'Purpose', href: '#purpose' },
  { label: 'Operating Model', href: '#operating-model' },
  { label: 'How To Work', href: '#how-to-work' },
  { label: 'Board Storyline', href: '#board-storyline' },
  { label: 'Client Presentation', href: '#client-presentation' },
  { label: 'Change Communication', href: '#change-communication' },
  { label: 'Try This Now', href: '#try-this-now' },
  { label: 'When Not To Use', href: '#when-not-to-use' },
  { label: 'Error Recovery', href: '#error-recovery' },
  { label: 'Governance', href: '#governance' },
  { label: 'Prompt Library', href: '#prompt-library' },
  { label: 'Download Library', href: '#download-library' }
]

const purposeCards = [
  ['What Claude for PowerPoint is best at', 'Claude for PowerPoint is strongest when the slides are really a thinking problem: unclear storyline, weak argument flow, unsupported claims, or a deck that does not yet know what it is trying to say.'],
  ['What it changes', 'Instead of editing slides visually before the narrative is right, Claude helps shape the structure, message order, and executive logic first.'],
  ['What to watch', 'Claude can improve narrative quality, but the team still needs to verify evidence, sharpen judgment, and keep the recommendation defensible.']
]

const howToCards = [
  { title: 'Fix storyline before slide polish', detail: 'Use Claude first to sharpen the flow and argument, then move into detailed slide design.' },
  { title: 'Ask what is weak, missing, or repetitive', detail: 'The best prompts ask Claude to critique the deck, not just improve the wording.' },
  { title: 'Prepare for pushback', detail: 'Have Claude identify likely questions or objections so the presentation becomes decision-ready.' }
]

const scenarios = [
  {
    id: 'board-storyline',
    eyebrow: 'Board Storyline',
    title: 'Turn raw board notes into a sharper executive narrative',
    lead: 'This is useful when a team has content and metrics, but the deck still lacks a clear board-level story.',
    cards: [
      {
        title: 'Board memo to executive deck',
        concept: 'Claude can propose a board storyline, slide titles, message sequence, and likely board questions from a set of raw notes and metrics.',
        steps: ['Open the raw notes and supporting metrics.', 'Ask Claude to propose a concise six-slide story.', 'Request sharper executive wording and a more defensible recommendation.', 'Finish with likely board questions and weak spots in the deck.'],
        prompt: `Act as an executive communications advisor. Convert these raw notes into a six-slide board storyline with slide titles, key message per slide, supporting evidence, and likely questions from the board.`,
        downloads: [
          { label: 'Board notes', href: '/downloads/ppt-board-notes.txt' },
          { label: 'Board metrics', href: '/downloads/ppt-board-metrics.csv' }
        ]
      }
    ]
  },
  {
    id: 'client-presentation',
    eyebrow: 'Client Presentation',
    title: 'Make a client deck clearer, stronger, and more differentiated',
    lead: 'This pattern is useful when a pitch or account deck feels generic, repetitive, or weakly argued.',
    cards: [
      {
        title: 'Client presentation refinement',
        concept: 'Claude can help improve storyline, differentiation, proof point placement, and executive tone in a customer-facing deck.',
        steps: ['Open the pitch notes and supporting case studies.', 'Ask Claude to identify what should be cut, strengthened, or evidenced better.', 'Request sharper executive tone and likely client objections.', 'Use the output to restructure before final design.'],
        prompt: `Review these presentation notes and improve the storyline, differentiation, credibility, and executive tone. Identify what should be cut, what needs proof, and what the client is likely to challenge.`,
        downloads: [
          { label: 'Pitch notes', href: '/downloads/ppt-client-pitch-notes.txt' },
          { label: 'Case studies', href: '/downloads/ppt-client-case-studies.txt' }
        ]
      }
    ]
  },
  {
    id: 'change-communication',
    eyebrow: 'Change Communication',
    title: 'Build a change deck that balances clarity, empathy, and action',
    lead: 'This is useful for internal communication, restructuring, policy rollout, or operating model change decks.',
    cards: [
      {
        title: 'Change communication deck',
        concept: 'Claude can help create a sequence that explains rationale, implications, employee impact, and next steps more clearly than a typical internal deck draft.',
        steps: ['Use the change brief and FAQ inputs.', 'Ask Claude for a slide sequence that balances clarity and empathy.', 'Request specific messages for employees, managers, and leadership.', 'End with a risk check for ambiguity or resistance.'],
        prompt: `Turn these change-management notes into a clear leadership deck outline. Balance rationale, empathy, operating implications, and next steps. Include likely employee questions and manager guidance.`,
        downloads: [
          { label: 'Change brief', href: '/downloads/ppt-change-brief.txt' },
          { label: 'Employee FAQ inputs', href: '/downloads/ppt-change-faq.txt' }
        ]
      }
    ]
  }
]

const promptLibrary = [
  'Convert these raw notes into a six-slide storyline with titles, key message, evidence needed, and likely questions.',
  'Review this deck outline and tell me what is weak, repetitive, unsupported, or likely to be challenged.',
  'Turn this change note into a presentation sequence that balances rationale, empathy, and action.'
]

const downloadLibrary = [
  '/downloads/ppt-board-notes.txt',
  '/downloads/ppt-board-metrics.csv',
  '/downloads/ppt-client-pitch-notes.txt',
  '/downloads/ppt-client-case-studies.txt',
  '/downloads/ppt-change-brief.txt',
  '/downloads/ppt-change-faq.txt'
]

const learningOutcomes = [
  'Fix a deck\'s argument flow and narrative structure before spending time on visual design.',
  'Use Claude to identify weak logic, missing evidence, and likely audience objections in a presentation.',
  'Produce board, client, and change communication decks that are decision-ready rather than information-heavy.',
  'Generate structured critique passes that improve executive storytelling quality without full rewrites.'
]

const tryThisNowCards = [
  {
    title: 'Quick storyline test — 10 minutes',
    concept: 'Take any current deck you are building and use Claude to stress-test the narrative before investing in design.',
    steps: [
      'Pick one presentation you are currently working on or recently finished.',
      'Copy the slide titles or core message into Claude.',
      'Ask: "Review this slide sequence. Tell me what the storyline assumes, where the argument is weakest, and what a skeptical executive will challenge first."',
      'Note the top two things to fix before touching the visual design.'
    ],
    prompt: 'I am building a presentation for [audience]. Here are my slide titles: [paste here]. Review the storyline and tell me what it assumes, where the argument is weakest, and what question this audience will ask that I have not answered yet.',
    downloads: []
  },
  {
    title: 'Before and after reframe — 15 minutes',
    concept: 'Take a weak or generic slide title and have Claude propose three alternative framings that are sharper for the actual decision you are trying to drive.',
    steps: [
      'Pick one slide from a recent deck where the title feels flat or generic.',
      'Describe who the audience is and what decision the deck is trying to influence.',
      'Ask Claude for three alternative titles with a stronger, more specific point of view.',
      'Choose the one that best reflects the insight you want to land and update your deck.'
    ],
    prompt: 'My current slide title is: "[title]". The audience is [audience] and the decision I want is [outcome]. Give me three alternative titles with a stronger point of view, and explain what each one assumes about what the audience cares about most.',
    downloads: []
  }
]

const whenNotToUseCards = [
  ['Not a replacement for subject matter expertise', 'Claude can improve narrative structure but cannot substitute for the technical knowledge, product depth, or financial expertise that makes a presentation credible.'],
  ['Not for final legal or compliance content', 'If the deck contains regulatory statements, legal terms, or compliance commitments, those sections require SME and legal review before they are finalized.'],
  ['Not when the real problem is thin evidence', 'If the deck feels weak because the underlying data or evidence is poor, fixing the narrative without fixing the evidence will not produce a defensible presentation.'],
  ['Not for confidential strategy without approval', 'Check your organization\'s AI governance policy before pasting confidential deal terms, pricing strategy, or unreleased financial results into a Claude conversation.']
]

const errorRecoveryCards = [
  { title: 'The storyline Claude proposes does not feel right', detail: 'Ask Claude what audience assumption it made, and what would change if the audience were more skeptical, more senior, or from a different function.' },
  { title: 'Evidence and proof points are missing', detail: 'Ask explicitly: "What would a skeptic demand as proof for each of these claims?" This surfaces the gaps you can fill with real data or acknowledge as assumptions.' },
  { title: 'The language feels generic or corporate', detail: 'Give Claude one specific, real person in the audience to write for. Concrete audience framing produces sharper, more differentiated language than a general description.' },
  { title: 'The deck is too long after Claude works on it', detail: 'Ask Claude to apply a cut pass: "Remove everything a busy executive already knows or does not need to make this specific decision."' }
]

const governanceCards = [
  { title: 'Protect confidential content', detail: 'Do not paste unreleased financial projections, pricing data, M&A information, or customer-specific deal terms into Claude without checking your organization\'s AI data classification policy.' },
  { title: 'Verify facts before external presentations', detail: 'Claude helps with narrative and structure, not fact accuracy. Any claims, metrics, or evidence in an external-facing deck must be verified against authoritative sources before the presentation is shared.' },
  { title: 'Mark AI-assisted drafts clearly for reviewers', detail: 'When sharing deck drafts for feedback, note that AI was used for narrative structuring so reviewers apply the right level of scrutiny to the content and evidence.' }
]

function CopyPrompt({ prompt }) { const [copyState, setCopyState] = useState('idle'); useEffect(() => { if (copyState === 'idle') return undefined; const timeoutId = window.setTimeout(() => setCopyState('idle'), 1600); return () => window.clearTimeout(timeoutId) }, [copyState]); async function handleCopy() { try { await navigator.clipboard.writeText(prompt); setCopyState('copied') } catch { setCopyState('failed') } } return <button className="prompt-copy-btn" type="button" onClick={handleCopy}><span aria-hidden="true">📋</span><span>{copyState === 'copied' ? 'Copied' : copyState === 'failed' ? 'Retry' : 'Copy'}</span></button> }
function CollapsibleSection({ id, eyebrow, title, lead, children }) { const [isOpen, setIsOpen] = useState(false); return <section id={id} className="section collapsible-card section-collapse-shell"><button className="collapse-toggle" type="button" onClick={() => setIsOpen((v) => !v)}><div className="collapse-copy"><span className="eyebrow">{eyebrow}</span><strong>{title}</strong><small>{lead}</small></div><span className="collapse-icon" aria-hidden="true">{isOpen ? '−' : '+'}</span></button>{isOpen ? <div className="collapse-body section-collapse-body">{children}</div> : null}</section> }
function InfoCard({ title, detail, tone = 'model-note' }) { const [isOpen, setIsOpen] = useState(false); return <article className={`note-card collapsible-card ${tone}`}><button className="collapse-toggle" type="button" onClick={() => setIsOpen((v) => !v)}><div className="collapse-copy"><strong>{title}</strong><small>{detail}</small></div><span className="collapse-icon" aria-hidden="true">{isOpen ? '−' : '+'}</span></button>{isOpen ? <div className="collapse-body"><div className="model-row"><span>{detail}</span></div></div> : null}</article> }
function PromptCard({ item }) { const [isOpen, setIsOpen] = useState(false); return <article className="scenario-card collapsible-card"><button className="collapse-toggle" type="button" onClick={() => setIsOpen((v) => !v)}><div className="collapse-copy"><strong>{item.title}</strong><small>{item.concept}</small></div><span className="collapse-icon" aria-hidden="true">{isOpen ? '−' : '+'}</span></button>{isOpen ? <div className="collapse-body"><h4>Suggested Steps</h4><ol>{item.steps.map((step) => <li key={step}>{step}</li>)}</ol><div className="section-subhead"><div className="prompt-controls"><CopyPrompt prompt={item.prompt} /></div><pre>{item.prompt}</pre></div>{item.downloads && item.downloads.length > 0 ? <><h4>Downloads</h4><div className="download-grid">{item.downloads.map((file) => <a key={file.href} className="download-chip" href={file.href} download>{file.label}</a>)}</div></> : null}</div> : null}</article> }

export default function ClaudePowerPointPage() {
  return <div className="page-shell" style={{ '--accent': '#d97706', '--accent-soft': '#fef3c7' }}><header className="hero"><div className="hero-copy"><p className="eyebrow">Claude for PowerPoint</p><h1>Claude <span>PowerPoint Playbook</span></h1><p className="lead">Use Claude with PowerPoint when the deck problem is really a narrative problem: unclear storyline, weak argument flow, or slides that do not yet support a decision.</p><div className="hero-actions"><a className="btn primary" href="#purpose">Start here</a><a className="btn" href="/">Back to main tutorial</a></div><div id="page-index" className="panel-card hero-index-card"><h3>Index</h3><div className="surface-nav hero-index-nav">{sections.filter((s) => s.href !== '#page-index').map((s) => <a key={s.href} className="surface-link" href={s.href}>{s.label}</a>)}</div></div></div><aside className="hero-panel"><div className="panel-card accent"><h3>Goal</h3><p>Help teams use Claude to shape narrative, improve executive communication, and make decks more decision-ready before design polish.</p></div></aside></header><main><CollapsibleSection id="learning-outcomes" eyebrow="Learning Outcomes" title="What you will be able to do by the end of this module" lead="These are the practical skills this playbook is designed to build."><ol style={{paddingLeft:'1.5rem',lineHeight:'1.8',margin:'0'}}>{learningOutcomes.map((o) => <li key={o} style={{marginBottom:'0.5rem'}}>{o}</li>)}</ol></CollapsibleSection><CollapsibleSection id="purpose" eyebrow="Purpose" title="Practical guide for Claude for PowerPoint" lead="This page focuses on slide workflows where storyline quality matters more than simply generating text."><div className="notes-grid">{purposeCards.map(([title, detail]) => <InfoCard key={title} title={title} detail={detail} tone="model-note" />)}</div></CollapsibleSection><CollapsibleSection id="operating-model" eyebrow="Operating Model" title="How to think about Claude for PowerPoint" lead="Use Claude first as a narrative and critique partner, then as a drafting helper."><div className="notes-grid">{[['Story first, slides second', 'Use Claude to sharpen the argument flow before the deck gets visually polished.'], ['Critique is part of the workflow', 'Prompt Claude to identify weak logic, missing evidence, and likely objections.'], ['Decision readiness matters', 'The best deck outputs make it easier for leaders or clients to understand what decision is needed.']].map(([title, detail]) => <InfoCard key={title} title={title} detail={detail} tone="prompt-note" />)}</div></CollapsibleSection><CollapsibleSection id="how-to-work" eyebrow="How To Work" title="How to use Claude effectively in PowerPoint workflows" lead="These habits make Claude much more useful in presentation work."><div className="notes-grid">{howToCards.map((item) => <InfoCard key={item.title} title={item.title} detail={item.detail} tone="prompt-note" />)}</div></CollapsibleSection>{scenarios.map((section) => <CollapsibleSection key={section.id} id={section.id} eyebrow={section.eyebrow} title={section.title} lead={section.lead}><div className="scenario-list">{section.cards.map((item) => <PromptCard key={item.title} item={item} />)}</div></CollapsibleSection>)}<CollapsibleSection id="try-this-now" eyebrow="Try This Now" title="Quick exercises you can run immediately" lead="These 10-15 minute exercises let you practice the core PowerPoint workflow patterns right away."><div className="scenario-list">{tryThisNowCards.map((item) => <PromptCard key={item.title} item={item} />)}</div></CollapsibleSection><CollapsibleSection id="when-not-to-use" eyebrow="When Not To Use" title="Situations where Claude for PowerPoint is the wrong tool" lead="These limits help keep presentations credible and defensible."><div className="notes-grid">{whenNotToUseCards.map(([title, detail]) => <InfoCard key={title} title={title} detail={detail} tone="model-note" />)}</div></CollapsibleSection><CollapsibleSection id="error-recovery" eyebrow="Error Recovery" title="What to do when outputs are not working" lead="These patterns help you recover when Claude does not produce the presentation quality you need."><div className="notes-grid">{errorRecoveryCards.map((item) => <InfoCard key={item.title} title={item.title} detail={item.detail} tone="prompt-note" />)}</div></CollapsibleSection><CollapsibleSection id="governance" eyebrow="Governance" title="Safe and responsible use of Claude for presentations" lead="These guidelines apply when decks contain confidential or externally shared content."><div className="notes-grid">{governanceCards.map((item) => <InfoCard key={item.title} title={item.title} detail={item.detail} tone="model-note" />)}</div></CollapsibleSection><CollapsibleSection id="prompt-library" eyebrow="Prompt Library" title="Claude for PowerPoint quick-reference prompts" lead="These are useful starting points for presentation work."><div className="scenario-list">{promptLibrary.map((prompt) => <article key={prompt} className="scenario-card"><div className="prompt-controls"><CopyPrompt prompt={prompt} /></div><pre>{prompt}</pre></article>)}</div></CollapsibleSection><CollapsibleSection id="download-library" eyebrow="Download Library" title="All Claude for PowerPoint files in one place" lead="Use this section when you want the full file set for presentation-based exercises."><div className="download-grid">{downloadLibrary.map((file) => <a key={file} className="download-chip" href={file} download>{file.split('/').pop()}</a>)}</div></CollapsibleSection></main><a className="floating-index" href="#page-index">Index</a></div>
}
