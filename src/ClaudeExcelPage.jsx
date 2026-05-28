import React, { useEffect, useState } from 'react'

const sections = [
  { label: 'Index', href: '#page-index' },
  { label: 'Learning Outcomes', href: '#learning-outcomes' },
  { label: 'Purpose', href: '#purpose' },
  { label: 'Operating Model', href: '#operating-model' },
  { label: 'How To Work', href: '#how-to-work' },
  { label: 'Finance Variance', href: '#finance-variance' },
  { label: 'Sales Pipeline', href: '#sales-pipeline' },
  { label: 'Workforce Review', href: '#workforce-review' },
  { label: 'When Not To Use', href: '#when-not-to-use' },
  { label: 'Error Recovery', href: '#error-recovery' },
  { label: 'Governance', href: '#governance' },
  { label: 'Prompt Library', href: '#prompt-library' },
  { label: 'Download Library', href: '#download-library' }
]

const purposeCards = [
  ['What Claude for Excel is best at', 'Claude for Excel is strongest when the question is hidden in a dense workbook and the team needs help identifying the important movements, patterns, and risks.'],
  ['What it changes', 'Instead of manually tracing rows and columns before you can even start the narrative, Claude helps shorten the path from workbook to insight.'],
  ['What to watch', 'Claude should help interpret, question, and summarize the sheet. It should not be treated as the final authority on the numbers without verification.']
]

const howToCards = [
  { title: 'Start from the business question', detail: 'Ask what you need to know from the workbook before asking Claude to inspect everything.' },
  { title: 'Ask for drivers, not just summary', detail: 'The best Excel workflows explain movements, anomalies, and likely causes rather than only restating what changed.' },
  { title: 'Use a second pass for management commentary', detail: 'Once the key movements are understood, then ask Claude to produce leadership-facing narrative or questions.' }
]

const scenarios = [
  {
    id: 'finance-variance',
    eyebrow: 'Finance Variance',
    title: 'Explain financial movement without manual line-by-line tracing',
    lead: 'This is useful when leadership needs a rapid explanation of revenue, cost, margin, or operating movements.',
    cards: [
      {
        title: 'Finance variance analysis',
        concept: 'Claude can identify unusual movements, likely drivers, and the questions leaders should ask before acting.',
        steps: ['Open the variance inputs in Excel.', 'Ask Claude for the top movements and likely drivers.', 'Follow with management commentary in board language.', 'Use a second pass to surface hidden risks or weak assumptions.'],
        prompt: `Review this workbook as a CFO-style analyst. Identify the five most important movements, their likely drivers, possible risks, and the questions leadership should ask before acting.`,
        downloads: [
          { label: 'Finance variance data', href: '/downloads/excel-finance-variance.csv' },
          { label: 'Cost driver notes', href: '/downloads/excel-finance-notes.txt' }
        ]
      }
    ]
  },
  {
    id: 'sales-pipeline',
    eyebrow: 'Sales Pipeline',
    title: 'Interrogate pipeline patterns in spreadsheet-heavy sales reviews',
    lead: 'This is useful for sales leaders who need to identify stage leakage, aged deals, and intervention priorities quickly.',
    cards: [
      {
        title: 'Sales pipeline diagnostics',
        concept: 'Claude can help explain where revenue slippage is happening and what the likely patterns are by team, region, or stage.',
        steps: ['Load the pipeline data and any supporting notes.', 'Ask for stage leakage, deal ageing, and slippage patterns.', 'Request intervention recommendations by region or stage.', 'Turn the output into a concise leadership note.'],
        prompt: `Analyze this pipeline sheet and identify the main causes of revenue slippage, conversion leakage, and deal ageing. Recommend actions by team, region, and deal stage.`,
        downloads: [
          { label: 'Pipeline data', href: '/downloads/excel-sales-pipeline.csv' },
          { label: 'Win-loss notes', href: '/downloads/excel-win-loss-notes.txt' }
        ]
      }
    ]
  },
  {
    id: 'workforce-review',
    eyebrow: 'Workforce Review',
    title: 'Combine workforce data and manager commentary into a sharper review',
    lead: 'Excel plus Claude is useful when people data is numerical but the interpretation depends on notes, tenure, role, and manager context.',
    cards: [
      {
        title: 'Workforce and attrition review',
        concept: 'Claude can help identify hotspots by tenure, role, location, or manager, then separate systemic interventions from manager-level actions.',
        steps: ['Open the workforce data and manager notes together.', 'Ask for hotspots and likely drivers.', 'Request interventions divided between systemic and manager actions.', 'End with a leadership-ready risk summary.'],
        prompt: `Review this workforce data and identify attrition hotspots, potential drivers, and the top interventions for the next quarter. Separate systemic issues from manager-level issues.`,
        downloads: [
          { label: 'Workforce data', href: '/downloads/excel-workforce-attrition.csv' },
          { label: 'Manager notes', href: '/downloads/excel-workforce-notes.txt' }
        ]
      }
    ]
  }
]

const promptLibrary = [
  'Review this workbook and tell me what moved most, what likely drove it, and what questions leadership should ask.',
  'Analyze this pipeline sheet and identify where deals are slowing, slipping, or leaking by stage and region.',
  'Review this workforce data and separate likely systemic issues from manager-level issues.'
]

const downloadLibrary = [
  '/downloads/excel-finance-variance.csv',
  '/downloads/excel-finance-notes.txt',
  '/downloads/excel-sales-pipeline.csv',
  '/downloads/excel-win-loss-notes.txt',
  '/downloads/excel-workforce-attrition.csv',
  '/downloads/excel-workforce-notes.txt'
]

const learningOutcomes = [
  'Interrogate spreadsheet data using business questions rather than manual row-by-row review.',
  'Identify key movements, drivers, and anomalies rather than just restating what changed in a workbook.',
  'Turn workbook patterns into management commentary ready for leadership review.',
  'Separate systemic data issues from individual or manager-level patterns in workforce and pipeline analysis.'
]

const whenNotToUseCards = [
  ['Not a substitute for formula accuracy', 'Claude cannot recalculate Excel formulas or verify cell logic. Use Excel tools for calculation accuracy, then ask Claude for interpretation and narrative.'],
  ['Not for live or connected data', 'Claude works from what you paste into the conversation. For live data that changes constantly, connect to a proper data tool or query the source directly.'],
  ['Not for data you cannot share', 'If the spreadsheet contains sensitive customer, employee, or proprietary data not approved for AI use in your organization, do not upload or paste it.'],
  ['Not for high-stakes decisions without verification', 'Always verify Claude\'s interpretation against your source data before presenting numbers to leadership or including them in a formal report.']
]

const errorRecoveryCards = [
  { title: 'Numbers do not match what you expect', detail: 'Verify the raw data you pasted into the conversation. Claude can only interpret what it receives, so a copy error in the input will produce misleading output.' },
  { title: 'Claude misses the most important driver', detail: 'Reframe the business question more specifically. Instead of "analyze this," ask "what caused the largest revenue drop and what three things most likely explain it?"' },
  { title: 'Management commentary feels too generic', detail: 'Ask explicitly for percentage movements, specific line items, or top-N drivers. Generic outputs usually mean the prompt needs sharper business-question framing.' },
  { title: 'Claude makes assumptions about column meaning', detail: 'Paste a description of what each column header represents at the top of your prompt before sharing the data. Ambiguous column names produce ambiguous analysis.' }
]

const governanceCards = [
  { title: 'Keep data within approved environments', detail: 'Only share spreadsheet data through Claude environments your organization has approved for that data classification. Check your IT or data governance policy before pasting financial or HR data.' },
  { title: 'Do not share sensitive customer or employee data', detail: 'Spreadsheets with personal employee information, customer PII, or material non-public information should not be used in AI conversations without explicit governance approval and data handling controls.' },
  { title: 'Claude interprets — the workbook is the source of truth', detail: 'The workbook is always the authoritative source. Claude\'s interpretation must be verified against original data before being used in a report, decision, or leadership presentation.' },
  { title: 'Document what AI contributed', detail: 'When Claude-assisted analysis is included in formal reports, note that AI was used to support interpretation so reviewers can apply appropriate scrutiny to the findings.' }
]

function CopyPrompt({ prompt }) {
  const [copyState, setCopyState] = useState('idle')
  useEffect(() => { if (copyState === 'idle') return undefined; const timeoutId = window.setTimeout(() => setCopyState('idle'), 1600); return () => window.clearTimeout(timeoutId) }, [copyState])
  async function handleCopy() { try { await navigator.clipboard.writeText(prompt); setCopyState('copied') } catch { setCopyState('failed') } }
  return <button className="prompt-copy-btn" type="button" onClick={handleCopy}><span aria-hidden="true">📋</span><span>{copyState === 'copied' ? 'Copied' : copyState === 'failed' ? 'Retry' : 'Copy'}</span></button>
}
function CollapsibleSection({ id, eyebrow, title, lead, children }) { const [isOpen, setIsOpen] = useState(false); return <section id={id} className="section collapsible-card section-collapse-shell"><button className="collapse-toggle" type="button" onClick={() => setIsOpen((v) => !v)}><div className="collapse-copy"><span className="eyebrow">{eyebrow}</span><strong>{title}</strong><small>{lead}</small></div><span className="collapse-icon" aria-hidden="true">{isOpen ? '−' : '+'}</span></button>{isOpen ? <div className="collapse-body section-collapse-body">{children}</div> : null}</section> }
function InfoCard({ title, detail, tone = 'model-note' }) { const [isOpen, setIsOpen] = useState(false); return <article className={`note-card collapsible-card ${tone}`}><button className="collapse-toggle" type="button" onClick={() => setIsOpen((v) => !v)}><div className="collapse-copy"><strong>{title}</strong><small>{detail}</small></div><span className="collapse-icon" aria-hidden="true">{isOpen ? '−' : '+'}</span></button>{isOpen ? <div className="collapse-body"><div className="model-row"><span>{detail}</span></div></div> : null}</article> }
function PromptCard({ item }) { const [isOpen, setIsOpen] = useState(false); return <article className="scenario-card collapsible-card"><button className="collapse-toggle" type="button" onClick={() => setIsOpen((v) => !v)}><div className="collapse-copy"><strong>{item.title}</strong><small>{item.concept}</small></div><span className="collapse-icon" aria-hidden="true">{isOpen ? '−' : '+'}</span></button>{isOpen ? <div className="collapse-body"><h4>Suggested Steps</h4><ol>{item.steps.map((step) => <li key={step}>{step}</li>)}</ol><div className="section-subhead"><div className="prompt-controls"><CopyPrompt prompt={item.prompt} /></div><pre>{item.prompt}</pre></div><h4>Downloads</h4><div className="download-grid">{item.downloads.map((file) => <a key={file.href} className="download-chip" href={file.href} download>{file.label}</a>)}</div></div> : null}</article> }

export default function ClaudeExcelPage() {
  return <div className="page-shell" style={{ '--accent': '#d97706', '--accent-soft': '#fef3c7' }}><header className="hero"><div className="hero-copy"><p className="eyebrow">Claude for Excel</p><h1>Claude <span>Excel Playbook</span></h1><p className="lead">Use Claude with Excel when the challenge is buried inside rows, columns, and workbook context and the real need is explanation, not just inspection.</p><div className="hero-actions"><a className="btn primary" href="#purpose">Start here</a><a className="btn" href="/">Back to main tutorial</a></div><div id="page-index" className="panel-card hero-index-card"><h3>Index</h3><div className="surface-nav hero-index-nav">{sections.filter((s) => s.href !== '#page-index').map((s) => <a key={s.href} className="surface-link" href={s.href}>{s.label}</a>)}</div></div></div><aside className="hero-panel"><div className="panel-card accent"><h3>Goal</h3><p>Help teams interrogate spreadsheet-heavy decisions faster and turn workbook patterns into management commentary, questions, and actions.</p></div></aside></header><main><CollapsibleSection id="learning-outcomes" eyebrow="Learning Outcomes" title="What you will be able to do by the end of this module" lead="These are the practical skills this playbook is designed to build."><ol style={{paddingLeft:'1.5rem',lineHeight:'1.8',margin:'0'}}>{learningOutcomes.map((o) => <li key={o} style={{marginBottom:'0.5rem'}}>{o}</li>)}</ol></CollapsibleSection><CollapsibleSection id="purpose" eyebrow="Purpose" title="Practical guide for Claude for Excel" lead="This page focuses on how to use Claude with workbooks to explain what changed, why it changed, and what to do next."><div className="notes-grid">{purposeCards.map(([title, detail]) => <InfoCard key={title} title={title} detail={detail} tone="model-note" />)}</div></CollapsibleSection><CollapsibleSection id="operating-model" eyebrow="Operating Model" title="How to think about Claude for Excel" lead="The strongest Excel workflows start from a business question and end with commentary, not just sheet inspection."><div className="notes-grid">{[['Question-first analysis', 'Ask the workbook a business question before asking Claude to summarize everything.'], ['Drivers before commentary', 'Get the movements and drivers clear first, then ask for management narrative.'], ['Human validation', 'Claude should accelerate understanding, but the workbook remains the source of truth.']].map(([title, detail]) => <InfoCard key={title} title={title} detail={detail} tone="prompt-note" />)}</div></CollapsibleSection><CollapsibleSection id="how-to-work" eyebrow="How To Work" title="How to use Claude effectively in Excel workflows" lead="Use these habits to keep Claude focused on the right analytical job."><div className="notes-grid">{howToCards.map((item) => <InfoCard key={item.title} title={item.title} detail={item.detail} tone="prompt-note" />)}</div></CollapsibleSection>{scenarios.map((section) => <CollapsibleSection key={section.id} id={section.id} eyebrow={section.eyebrow} title={section.title} lead={section.lead}><div className="scenario-list">{section.cards.map((item) => <PromptCard key={item.title} item={item} />)}</div></CollapsibleSection>)}<CollapsibleSection id="when-not-to-use" eyebrow="When Not To Use" title="Situations where Claude for Excel is the wrong tool" lead="Knowing these limits prevents over-reliance and prevents analysis errors."><div className="notes-grid">{whenNotToUseCards.map(([title, detail]) => <InfoCard key={title} title={title} detail={detail} tone="model-note" />)}</div></CollapsibleSection><CollapsibleSection id="error-recovery" eyebrow="Error Recovery" title="What to do when outputs are not working" lead="These patterns help you recover quickly when Claude does not produce useful analysis."><div className="notes-grid">{errorRecoveryCards.map((item) => <InfoCard key={item.title} title={item.title} detail={item.detail} tone="prompt-note" />)}</div></CollapsibleSection><CollapsibleSection id="governance" eyebrow="Governance" title="Safe and responsible use of Claude for Excel" lead="These guidelines apply whenever spreadsheet data contains anything sensitive or consequential."><div className="notes-grid">{governanceCards.map((item) => <InfoCard key={item.title} title={item.title} detail={item.detail} tone="model-note" />)}</div></CollapsibleSection><CollapsibleSection id="prompt-library" eyebrow="Prompt Library" title="Claude for Excel quick-reference prompts" lead="These are good starting points for workbook-heavy analysis."><div className="scenario-list">{promptLibrary.map((prompt) => <article key={prompt} className="scenario-card"><div className="prompt-controls"><CopyPrompt prompt={prompt} /></div><pre>{prompt}</pre></article>)}</div></CollapsibleSection><CollapsibleSection id="download-library" eyebrow="Download Library" title="All Claude for Excel files in one place" lead="Use this section when you want the full file set for spreadsheet-based exercises."><div className="download-grid">{downloadLibrary.map((file) => <a key={file} className="download-chip" href={file} download>{file.split('/').pop()}</a>)}</div></CollapsibleSection></main><a className="floating-index" href="#page-index">Index</a></div>
}
