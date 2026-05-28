import React, { useEffect, useState } from 'react'

const sections = [
  { label: 'Index', href: '#page-index' },
  { label: 'Purpose', href: '#purpose' },
  { label: 'Operating Model', href: '#operating-model' },
  { label: 'How To Work', href: '#how-to-work' },
  { label: 'Research Briefs', href: '#research-briefs' },
  { label: 'Board Prep', href: '#board-prep' },
  { label: 'Competitive Intel', href: '#competitive-intel' },
  { label: 'Prompt Library', href: '#prompt-library' },
  { label: 'Download Library', href: '#download-library' }
]

const purposeCards = [
  ['What NotebookLM is best at', 'NotebookLM is strongest when the answer must stay grounded in a defined source pack and the user needs synthesis, citation, or gap detection rather than open-ended generation.'],
  ['What it changes', 'Instead of manually reading multiple sources and stitching together one brief, NotebookLM helps compress the pack into a structured, source-aware output.'],
  ['What to watch', 'NotebookLM is only as strong as the source pack. Good curation matters, and open questions should remain visible rather than being guessed away.']
]

const howToCards = [
  { title: 'Curate the source pack first', detail: 'NotebookLM becomes more useful when the source pack is tight, relevant, and intentionally chosen.' },
  { title: 'Ask for citations and gaps', detail: 'Strong use means not just asking for insights, but also for what the sources do not support clearly.' },
  { title: 'Use it for grounded synthesis', detail: 'NotebookLM is ideal when the room needs a source-backed brief, board prep note, or comparison summary.' }
]

const scenarios = [
  {
    id: 'research-briefs',
    eyebrow: 'Research Briefs',
    title: 'Turn a source pack into a grounded executive briefing',
    lead: 'Use this when you need a compact research-backed note rather than generic open-web output.',
    cards: [
      {
        title: 'Instant research brief',
        concept: 'NotebookLM can turn a curated set of documents into a source-backed executive brief with citations and open questions.',
        steps: ['Create a new notebook and upload the source files.', 'Ask for key insights with citations.', 'Request a 300-word executive brief.', 'Finish by asking what the sources do not resolve.'],
        prompt: `Using only these sources, produce a 300-word executive brief with five actionable insights, why each matters, and citations. Then list the open questions the sources do not resolve.`,
        downloads: [
          { label: 'Industry report excerpt', href: '/downloads/notebooklm-industry-report.txt' },
          { label: 'Analyst note', href: '/downloads/notebooklm-analyst-note.txt' },
          { label: 'Internal strategy note', href: '/downloads/notebooklm-internal-strategy.txt' }
        ]
      }
    ]
  },
  {
    id: 'board-prep',
    eyebrow: 'Board Prep',
    title: 'Use NotebookLM to accelerate board and committee preparation',
    lead: 'This is useful when the challenge is not access to material, but compressing it into what leadership should actually care about.',
    cards: [
      {
        title: 'Board pack accelerator',
        concept: 'NotebookLM can surface the core story, likely board questions, and weak spots across a board memo, metrics, and risk note.',
        steps: ['Upload the board memo, performance snapshot, and risk note.', 'Ask what story the board is likely to care about most.', 'Request likely questions and weak points.', 'Use the output to refine the actual pre-read.'],
        prompt: `Review these sources as if you were preparing a board pre-read. Summarize the core story, highlight weak spots or unsupported claims, and generate five questions the board is likely to ask.`,
        downloads: [
          { label: 'Board memo', href: '/downloads/notebooklm-board-memo.txt' },
          { label: 'Performance snapshot', href: '/downloads/notebooklm-board-performance.csv' },
          { label: 'Risk note', href: '/downloads/notebooklm-board-risk-note.txt' }
        ]
      }
    ]
  },
  {
    id: 'competitive-intel',
    eyebrow: 'Competitive Intel',
    title: 'Compare competitor moves using only a curated evidence pack',
    lead: 'This is useful for strategy, product, pricing, and business teams that want grounded competitive analysis rather than generic speculation.',
    cards: [
      {
        title: 'Competitive intelligence',
        concept: 'NotebookLM can compare competitor announcements and internal notes, then organize implications and response options with evidence discipline.',
        steps: ['Upload the competitor files and internal note.', 'Ask for comparison on moves, claims, and likely implications.', 'Request a response matrix: ignore, monitor, counter, or match.', 'End by asking what more evidence should be collected.'],
        prompt: `Using these sources only, compare competitor moves, identify the most material implications for our business, and recommend what we should monitor, counter, or ignore.`,
        downloads: [
          { label: 'Competitor A update', href: '/downloads/notebooklm-competitor-a.txt' },
          { label: 'Competitor B update', href: '/downloads/notebooklm-competitor-b.txt' },
          { label: 'Internal response note', href: '/downloads/notebooklm-competitive-response.txt' }
        ]
      }
    ]
  }
]

const promptLibrary = [
  'Using only these sources, produce a concise executive brief with citations and unresolved questions.',
  'Review these sources like a board pre-read and tell me the core story, weak spots, and likely board questions.',
  'Compare these competitor materials and recommend what we should monitor, counter, or ignore.'
]

const downloadLibrary = [
  '/downloads/notebooklm-industry-report.txt',
  '/downloads/notebooklm-analyst-note.txt',
  '/downloads/notebooklm-internal-strategy.txt',
  '/downloads/notebooklm-board-memo.txt',
  '/downloads/notebooklm-board-performance.csv',
  '/downloads/notebooklm-board-risk-note.txt',
  '/downloads/notebooklm-competitor-a.txt',
  '/downloads/notebooklm-competitor-b.txt',
  '/downloads/notebooklm-competitive-response.txt'
]

function CopyPrompt({ prompt }) { const [copyState, setCopyState] = useState('idle'); useEffect(() => { if (copyState === 'idle') return undefined; const timeoutId = window.setTimeout(() => setCopyState('idle'), 1600); return () => window.clearTimeout(timeoutId) }, [copyState]); async function handleCopy() { try { await navigator.clipboard.writeText(prompt); setCopyState('copied') } catch { setCopyState('failed') } } return <button className="prompt-copy-btn" type="button" onClick={handleCopy}><span aria-hidden="true">📋</span><span>{copyState === 'copied' ? 'Copied' : copyState === 'failed' ? 'Retry' : 'Copy'}</span></button> }
function CollapsibleSection({ id, eyebrow, title, lead, children }) { const [isOpen, setIsOpen] = useState(false); return <section id={id} className="section collapsible-card section-collapse-shell"><button className="collapse-toggle" type="button" onClick={() => setIsOpen((v) => !v)}><div className="collapse-copy"><span className="eyebrow">{eyebrow}</span><strong>{title}</strong><small>{lead}</small></div><span className="collapse-icon" aria-hidden="true">{isOpen ? '−' : '+'}</span></button>{isOpen ? <div className="collapse-body section-collapse-body">{children}</div> : null}</section> }
function InfoCard({ title, detail, tone = 'model-note' }) { const [isOpen, setIsOpen] = useState(false); return <article className={`note-card collapsible-card ${tone}`}><button className="collapse-toggle" type="button" onClick={() => setIsOpen((v) => !v)}><div className="collapse-copy"><strong>{title}</strong><small>{detail}</small></div><span className="collapse-icon" aria-hidden="true">{isOpen ? '−' : '+'}</span></button>{isOpen ? <div className="collapse-body"><div className="model-row"><span>{detail}</span></div></div> : null}</article> }
function PromptCard({ item }) { const [isOpen, setIsOpen] = useState(false); return <article className="scenario-card collapsible-card"><button className="collapse-toggle" type="button" onClick={() => setIsOpen((v) => !v)}><div className="collapse-copy"><strong>{item.title}</strong><small>{item.concept}</small></div><span className="collapse-icon" aria-hidden="true">{isOpen ? '−' : '+'}</span></button>{isOpen ? <div className="collapse-body"><h4>Suggested Steps</h4><ol>{item.steps.map((step) => <li key={step}>{step}</li>)}</ol><div className="section-subhead"><div className="prompt-controls"><CopyPrompt prompt={item.prompt} /></div><pre>{item.prompt}</pre></div><h4>Downloads</h4><div className="download-grid">{item.downloads.map((file) => <a key={file.href} className="download-chip" href={file.href} download>{file.label}</a>)}</div></div> : null}</article> }

export default function NotebookLmPage() {
  return <div className="page-shell" style={{ '--accent': '#7c3aed', '--accent-soft': '#ede9fe' }}><header className="hero"><div className="hero-copy"><p className="eyebrow">NotebookLM</p><h1>NotebookLM <span>Playbook</span></h1><p className="lead">Use NotebookLM when the answer needs to stay grounded in a known set of source documents and the value comes from trusted synthesis, not open-ended brainstorming.</p><div className="hero-actions"><a className="btn primary" href="#purpose">Start here</a><a className="btn" href="/">Back to main tutorial</a></div><div id="page-index" className="panel-card hero-index-card"><h3>Index</h3><div className="surface-nav hero-index-nav">{sections.filter((s) => s.href !== '#page-index').map((s) => <a key={s.href} className="surface-link" href={s.href}>{s.label}</a>)}</div></div></div><aside className="hero-panel"><div className="panel-card accent"><h3>Goal</h3><p>Help teams use NotebookLM for source-grounded research, board prep, and competitive synthesis with much better citation discipline.</p></div></aside></header><main><CollapsibleSection id="purpose" eyebrow="Purpose" title="Practical guide for NotebookLM" lead="This page focuses on grounded synthesis from curated source packs."><div className="notes-grid">{purposeCards.map(([title, detail]) => <InfoCard key={title} title={title} detail={detail} tone="model-note" />)}</div></CollapsibleSection><CollapsibleSection id="operating-model" eyebrow="Operating Model" title="How to think about NotebookLM" lead="NotebookLM is strongest when the source pack is explicit and the answer needs to stay anchored to it."><div className="notes-grid">{[['Source pack first', 'The real work starts before the prompt: choose the right sources and exclude the noisy ones.'], ['Ask for support and gaps', 'Strong prompts ask what is supported by the sources and what is still unresolved.'], ['Use it for grounded decisions', 'NotebookLM is ideal when leadership needs a citation-aware brief, not a generic model answer.']].map(([title, detail]) => <InfoCard key={title} title={title} detail={detail} tone="prompt-note" />)}</div></CollapsibleSection><CollapsibleSection id="how-to-work" eyebrow="How To Work" title="How to use NotebookLM effectively" lead="These habits make NotebookLM much more useful in facilitator and leadership workflows."><div className="notes-grid">{howToCards.map((item) => <InfoCard key={item.title} title={item.title} detail={item.detail} tone="prompt-note" />)}</div></CollapsibleSection>{scenarios.map((section) => <CollapsibleSection key={section.id} id={section.id} eyebrow={section.eyebrow} title={section.title} lead={section.lead}><div className="scenario-list">{section.cards.map((item) => <PromptCard key={item.title} item={item} />)}</div></CollapsibleSection>)}<CollapsibleSection id="prompt-library" eyebrow="Prompt Library" title="NotebookLM quick-reference prompts" lead="These are practical starters for source-grounded work."><div className="scenario-list">{promptLibrary.map((prompt) => <article key={prompt} className="scenario-card"><div className="prompt-controls"><CopyPrompt prompt={prompt} /></div><pre>{prompt}</pre></article>)}</div></CollapsibleSection><CollapsibleSection id="download-library" eyebrow="Download Library" title="All NotebookLM files in one place" lead="Use this section when you want the full source pack for NotebookLM exercises."><div className="download-grid">{downloadLibrary.map((file) => <a key={file} className="download-chip" href={file} download>{file.split('/').pop()}</a>)}</div></CollapsibleSection></main><a className="floating-index" href="#page-index">Index</a></div>
}
