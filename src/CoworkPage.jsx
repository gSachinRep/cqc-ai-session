import React, { useEffect, useState } from 'react'

const sections = [
  { label: 'What It Is', href: '#what-is-cowork' },
  { label: 'Requirements', href: '#requirements' },
  { label: 'Mental Shift', href: '#mental-shift' },
  { label: 'Done Framework', href: '#done-framework' },
  { label: 'Prompt Templates', href: '#prompt-templates' },
  { label: 'Folder Setup', href: '#folder-setup' },
  { label: 'Workflows', href: '#workflows' },
  { label: 'Use Cases', href: '#use-cases' },
  { label: 'Limits & Safety', href: '#limits-safety' }
]

const promptTemplates = [
  {
    title: 'File Organization',
    prompt:
      'Organize all files in this folder. Group them into subfolders by [project/client/file type]. Rename each file using the format YYYY-MM-DD-descriptive-name. Do not delete anything. Create a summary document listing what you moved and where.'
  },
  {
    title: 'Research Synthesis',
    prompt:
      'Read all the documents in this folder. Create a single report that synthesizes the key findings. Include direct quotes where relevant, with the source file name. Flag any contradictions between sources. End with a list of questions that remain unanswered.'
  },
  {
    title: 'Document Creation',
    prompt:
      'Create a PowerPoint, Word document, or Excel spreadsheet based on the files in this folder. Use [specific structure or template]. The audience is [who]. The goal is [what you want them to understand or do].'
  },
  {
    title: 'Data Extraction',
    prompt:
      'I have screenshots of receipts, invoices, or forms in this folder. Extract the data into an Excel spreadsheet with columns for [list columns]. Sort by [column]. Add a total row at the bottom. Flag any images that were unclear or could not be processed.'
  }
]

const useCases = [
  'Organizing a messy downloads folder by what files actually contain',
  'Turning receipts or invoices into a usable spreadsheet with formulas',
  'Synthesizing a folder of reports into one executive summary',
  'Creating a first-draft PowerPoint from scattered notes and documents',
  'Building repeatable inbox → processed → outputs workflows for admin work',
  'Producing finished files instead of giving you text to copy-paste manually'
]

const safetyItems = [
  'Start with a dedicated work folder, not your entire Documents folder.',
  'Say “do not delete anything” unless you explicitly want deletions.',
  'Use a clear folder structure so Cowork knows what can be read, processed, or left untouched.',
  'Treat browser automation carefully and verify anything high risk or sensitive.',
  'Review outputs before sharing them, especially spreadsheets, slides, and reports.'
]

function CopyPrompt({ prompt }) {
  const [copyState, setCopyState] = useState('idle')

  useEffect(() => {
    if (copyState === 'idle') {
      return undefined
    }

    const timeoutId = window.setTimeout(() => setCopyState('idle'), 1600)
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
    <button className="prompt-copy-btn" type="button" onClick={handleCopy}>
      <span aria-hidden="true">📋</span>
      <span>{copyState === 'copied' ? 'Copied' : copyState === 'failed' ? 'Retry' : 'Copy'}</span>
    </button>
  )
}

function CoworkPage() {
  return (
    <div className="page-shell" style={{ '--accent': '#d97706', '--accent-soft': '#fef3c7' }}>
      <header className="hero">
        <div className="hero-copy">
          <p className="eyebrow">Claude Cowork</p>
          <h1>
            Learn <span>Claude Cowork</span>
          </h1>
          <p className="lead">
            A facilitator-ready guide to Claude Cowork: what it is, how to think about it, how to structure the work,
            and what it is good at in practice.
          </p>
          <div className="hero-actions">
            <a className="btn primary" href="#what-is-cowork">
              Start here
            </a>
            <a className="btn" href="/">
              Back to main tutorial
            </a>
          </div>
        </div>
        <aside className="hero-panel">
          <div className="panel-card">
            <h3>Index</h3>
            <div className="surface-nav">
              {sections.map((section) => (
                <a key={section.href} className="surface-link" href={section.href}>
                  {section.label}
                </a>
              ))}
            </div>
          </div>
          <div className="panel-card accent">
            <h3>Goal</h3>
            <p>
              Help learners understand Cowork as a delegated work surface for files, folders, documents, and outputs,
              not just another chat interface.
            </p>
          </div>
        </aside>
      </header>

      <main>
        <section id="what-is-cowork" className="section">
          <div className="section-heading">
            <p className="eyebrow">Core Concept</p>
            <h2>What is Cowork?</h2>
            <p className="lead">
              Claude Cowork is a file-aware AI workspace for non-developers. Instead of only answering in chat, it can
              work with a folder, create outputs, edit files, and hand back real deliverables like spreadsheets,
              presentations, summaries, and organized folder structures.
            </p>
          </div>
          <div className="notes-grid">
            <article className="note-card prompt-note">
              <div className="note-card-header">
                <h3>The simplest mental model</h3>
                <p>
                  Regular Claude answers questions. Claude Cowork helps operate the work itself. It behaves more like a
                  digital operations partner than a chatbot.
                </p>
              </div>
            </article>
            <article className="note-card model-note">
              <div className="note-card-header">
                <h3>Why people care</h3>
                <p>
                  The value is not just faster writing. Cowork produces actual outputs in files and folders, which is
                  why it feels closer to delegation than prompting.
                </p>
              </div>
            </article>
          </div>
        </section>

        <section id="requirements" className="section">
          <div className="section-heading">
            <p className="eyebrow">Requirements</p>
            <h2>Requirements and setup</h2>
          </div>
          <div className="model-list">
            <div className="model-row">
              <strong>Platform</strong>
              <span>Claude Desktop with Cowork availability. The source guide notes macOS support first and preview status.</span>
            </div>
            <div className="model-row">
              <strong>Plan</strong>
              <span>Claude Pro is expected for access in the source guide.</span>
            </div>
            <div className="model-row">
              <strong>Best starting point</strong>
              <span>Use a dedicated working folder rather than pointing Cowork at your full Documents folder.</span>
            </div>
          </div>
        </section>

        <section id="mental-shift" className="section">
          <div className="section-heading">
            <p className="eyebrow">Mindset</p>
            <h2>The mental shift</h2>
            <p className="lead">
              The biggest mistake is treating Cowork like normal Claude with folder access. The better approach is to
              describe the finished outcome, provide context and guardrails, and let Cowork produce the work.
            </p>
          </div>
          <div className="notes-grid">
            <article className="note-card prompt-note">
              <div className="note-card-header">
                <h3>Old way</h3>
                <p>Ask a question, get an answer, copy-paste manually into files.</p>
              </div>
            </article>
            <article className="note-card model-note">
              <div className="note-card-header">
                <h3>Cowork way</h3>
                <p>Describe the output, set boundaries, and let Claude produce files, summaries, folders, or deliverables for you.</p>
              </div>
            </article>
          </div>
        </section>

        <section id="done-framework" className="section">
          <div className="section-heading">
            <p className="eyebrow">Framework</p>
            <h2>The Done framework</h2>
          </div>
          <div className="anatomy-grid">
            <div className="anatomy-chip tone-coral">
              <strong>What does done look like?</strong>
              <span>Be explicit about the finished state: file type, structure, naming, totals, summary, or handoff.</span>
            </div>
            <div className="anatomy-chip tone-gold">
              <strong>What context does Claude need?</strong>
              <span>Tell it your folder conventions, audience, naming logic, and what is reference-only versus editable.</span>
            </div>
            <div className="anatomy-chip tone-mint">
              <strong>What constraints matter?</strong>
              <span>State limits clearly: do not delete files, process only recent files, keep original names, or avoid modifying reference material.</span>
            </div>
          </div>
        </section>

        <section id="prompt-templates" className="section">
          <div className="section-heading">
            <p className="eyebrow">Templates</p>
            <h2>Prompt templates that work well</h2>
          </div>
          <div className="scenario-list">
            {promptTemplates.map((item) => (
              <article key={item.title} className="scenario-card">
                <h3>{item.title}</h3>
                <div className="prompt-controls">
                  <CopyPrompt prompt={item.prompt} />
                </div>
                <pre>{item.prompt}</pre>
              </article>
            ))}
          </div>
        </section>

        <section id="folder-setup" className="section">
          <div className="section-heading">
            <p className="eyebrow">Workflow Design</p>
            <h2>Folder setup that keeps things sane</h2>
          </div>
          <div className="note-card prompt-note">
            <div className="note-card-header">
              <h3>Recommended structure</h3>
            </div>
            <pre>{`Claude-Work/
├── inbox/       files to process
├── processed/   finished source files
├── outputs/     new files Claude creates
└── reference/   files Claude may read but should not modify`}</pre>
          </div>
        </section>

        <section id="workflows" className="section">
          <div className="section-heading">
            <p className="eyebrow">Workflows</p>
            <h2>What Cowork is especially good at</h2>
          </div>
          <div className="model-list">
            <div className="model-row">
              <strong>File operations</strong>
              <span>Content-aware organization of messy folders, not just filename-based sorting.</span>
            </div>
            <div className="model-row">
              <strong>Research synthesis</strong>
              <span>Read a folder of documents and produce one coherent summary with contradictions and unanswered questions.</span>
            </div>
            <div className="model-row">
              <strong>Document creation</strong>
              <span>Create spreadsheets, presentations, summaries, and reports directly from source files.</span>
            </div>
            <div className="model-row">
              <strong>Skills and repeatable operations</strong>
              <span>Use repeatable folder patterns, instructions, and specialized behaviors to make Cowork more consistent over time.</span>
            </div>
          </div>
        </section>

        <section id="use-cases" className="section">
          <div className="section-heading">
            <p className="eyebrow">Use Cases</p>
            <h2>High-value use cases learners can picture quickly</h2>
          </div>
          <div className="model-list">
            {useCases.map((useCase) => (
              <div key={useCase} className="model-row">
                <span>{useCase}</span>
              </div>
            ))}
          </div>
        </section>

        <section id="limits-safety" className="section">
          <div className="section-heading">
            <p className="eyebrow">Reality Check</p>
            <h2>Limitations and safety</h2>
          </div>
          <div className="model-list">
            {safetyItems.map((item) => (
              <div key={item} className="model-row">
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}

export default CoworkPage
