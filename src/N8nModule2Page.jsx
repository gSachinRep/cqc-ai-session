import React, { useEffect, useState } from 'react'

const sections = [
  { label: 'Index', href: '#page-index' },
  { label: 'Overview', href: '#overview' },
  { label: 'Why It Matters', href: '#why-it-matters' },
  { label: 'Core Concepts', href: '#core-concepts' },
  { label: 'Hands-On Labs', href: '#hands-on-labs' },
  { label: 'Templates', href: '#templates' },
  { label: 'Quiz', href: '#quiz' },
  { label: 'Assignment', href: '#assignment' },
  { label: 'Tips', href: '#tips' }
]

const overviewCards = [
  ['Module', 'Module 2: Core Concepts — Data Flow, Logic & Transformations'],
  ['Goal by end', 'Confidently manipulate data as it moves through n8n: pull fields, transform structures, branch with logic, batch large lists, and merge paths safely.'],
  ['Why this matters', 'This is the most important non-AI skill in n8n. Clean data flow makes later AI workflows far more reliable and much easier to debug.']
]

const whyCards = [
  {
    title: 'AI still depends on clean inputs',
    detail:
      'Even advanced agents fail when the data shape is wrong. Poor transformation logic leads to bad prompts, broken tool calls, and unreliable workflow behavior.'
  },
  {
    title: 'Recent n8n improvements help here',
    detail:
      'Recent expression helpers such as $if, .first(), and .last(), along with better Set node UX and improved debugging panes, make data-flow learning easier than before.'
  },
  {
    title: 'Most workflow bugs start here',
    detail:
      'The majority of real workflow issues are not caused by integrations. They come from misunderstanding items, branching, expressions, or merge behavior.'
  }
]

const conceptCards = [
  {
    title: 'Data flow fundamentals',
    detail:
      'Every workflow processes items, which are arrays of JSON objects. Nodes receive input from the left, operate on all items by default, and pass their output to the next step.'
  },
  {
    title: 'Expressions are the core skill',
    detail:
      'Expressions power almost everything dynamic in n8n. Learners should get comfortable with current-item fields, nested objects, helper functions, and input selectors like $input.first().'
  },
  {
    title: 'Transformation nodes shape the payload',
    detail:
      'Set or Edit Fields is the everyday workhorse. Item Lists helps with aggregation or cleanup, and the Code node handles anything more custom or algorithmic.'
  },
  {
    title: 'Branching and merging create workflow logic',
    detail:
      'IF handles binary splits, Switch handles multiple routes, and Merge brings branches back together. Those three patterns define a large share of real-world workflow logic.'
  },
  {
    title: 'Looping protects large workflows',
    detail:
      'Loop Over Items is essential when a workflow should process records in chunks rather than all at once, especially when rate limits or expensive downstream actions are involved.'
  },
  {
    title: 'Error handling starts early',
    detail:
      'Module 2 should teach learners to think about failure modes before automation becomes more complex. Checking logs, output panes, and fallback branches is part of the build, not a later add-on.'
  }
]

const labs = [
  {
    title: 'Lab 1: Master the Set Node',
    concept:
      'Use Set or Edit Fields to create, rename, reference, and conditionally format values so learners can shape payloads intentionally.',
    steps: [
      'Create a Manual Trigger and connect a Set node.',
      'Add fields such as greeting, count, isActive, and fullName.',
      'Add a second Set node that references the first node with expressions to build a message field.',
      'Use a conditional expression with $if to create a priority field based on count.',
      'Inspect the output after each node so the learner sees how the payload evolves.'
    ],
    prompt:
      'Explain what each Set node is doing to the JSON structure and why a clean payload makes later workflow logic easier.'
  },
  {
    title: 'Lab 2: Expressions Deep Dive',
    concept:
      'Use an interactive expression tutorial and then apply the same ideas to external JSON so learners stop treating expressions as magic.',
    steps: [
      'Import the official-style expressions tutorial template from the workflow gallery.',
      'Run it step by step and practice field access, nested objects, arrays, and item selectors.',
      'Add an HTTP Request node to fetch sample JSON from JSONPlaceholder users.',
      'Use Set to extract username, email, and city for the first user, then repeat for multiple users.'
    ],
    prompt:
      'Walk me through this expression step by step. Show what data exists at each level and which expression pattern is safest for accessing it.'
  },
  {
    title: 'Lab 3: Branching Logic for Lead Processing',
    concept:
      'Create multiple lead records, route them differently with IF logic, enrich both branches, then merge them back into one processed stream.',
    steps: [
      'Create fake leads with score and country fields using Set.',
      'Add an IF node that routes high-score and India-based leads into a priority branch.',
      'Use Set on the true branch to tag as Priority and add an email subject prefix.',
      'Use Set on the false branch to tag as Regular.',
      'Merge the two branches and inspect the recombined dataset.'
    ],
    prompt:
      'Review this IF-based lead workflow and tell me whether the branching logic is doing what I think it is doing. Then explain how the merged output will look.'
  },
  {
    title: 'Lab 4: Batching and Looping',
    concept:
      'Use Loop Over Items to process a list in chunks so learners understand why rate-limited or expensive steps should not always run over a full dataset at once.',
    steps: [
      'Fetch a sample list from JSONPlaceholder users.',
      'Add Loop Over Items with batch size of 3.',
      'Inside the loop branch, add a Set node that tags the current batch or processing stage.',
      'Use the done branch to send a final summary or follow-up action.',
      'Run the workflow and observe how multiple loop passes appear in the execution.'
    ],
    prompt:
      'Explain why Loop Over Items is better than processing everything at once in this workflow and show me how the batch behavior appears in execution history.'
  }
]

const templateLinks = [
  {
    label: 'Learn n8n expressions (interactive tutorial)',
    href: 'https://n8n.io/workflows/5271-learn-n8n-expressions-with-an-interactive-step-by-step-tutorial-for-beginners'
  },
  {
    label: 'n8n workflow gallery',
    href: 'https://n8n.io/workflows'
  },
  {
    label: 'JSONPlaceholder sample API',
    href: 'https://jsonplaceholder.typicode.com/users'
  }
]

const quizCards = [
  {
    title: 'Quick check 1',
    question: 'How do you access the city of the second user in a list?',
    options: [
      '{{ $input.all()[1].json.address.city }}',
      '{{ $json.city[2] }}',
      '{{ city.second.user }}',
      'You can only do this in a spreadsheet export'
    ],
    correctIndex: 0
  },
  {
    title: 'Quick check 2',
    question: 'What is the difference between IF and Switch?',
    options: [
      'IF handles two branches; Switch handles many possible routes',
      'IF is only for numbers and Switch is only for strings',
      'Switch runs faster than IF in all cases',
      'There is no practical difference'
    ],
    correctIndex: 0
  },
  {
    title: 'Quick check 3',
    question: 'When should you use Loop Over Items instead of processing everything at once?',
    options: [
      'When rate limits, expensive actions, or large payloads make chunking safer',
      'Only when the workflow has no trigger',
      'Only when using AI nodes',
      'Only when working with Gmail'
    ],
    correctIndex: 0
  },
  {
    title: 'Quick check 4',
    question: 'How do you recombine two branches after IF?',
    options: [
      'Use Merge and choose the right mode',
      'Use another IF node',
      'Use only the Set node',
      'Reconnect both branches directly into Gmail'
    ],
    correctIndex: 0
  }
]

const assignmentPrompts = [
  'Build a weather plus priority alert workflow that routes urgent conditions into one branch and normal conditions into another before merging the result.',
  'Build a to-do digest workflow that reads tasks, filters urgent versus normal items, formats different outputs, and optionally batches delivery.',
  'Build an RSS or news categorization workflow that routes articles by keyword using IF or Switch and cleans the final message before posting.'
]

const tips = [
  'Spend time in the Input and Output panes after every node. That habit is more important than speed in this module.',
  'Encourage learners to explain the current JSON shape aloud before they write the expression. It reduces guesswork.',
  'When a branch behaves unexpectedly, inspect the data first before changing the condition. Most logic issues are data issues in disguise.',
  'Treat Loop Over Items as a performance and safety pattern, not just a technical feature.'
]

function CollapsibleSection({ id, eyebrow, title, lead, children }) {
  const [isOpen, setIsOpen] = useState(false)
  return <section id={id} className="section collapsible-card section-collapse-shell"><button className="collapse-toggle" type="button" onClick={() => setIsOpen((v) => !v)}><div className="collapse-copy"><span className="eyebrow">{eyebrow}</span><strong>{title}</strong><small>{lead}</small></div><span className="collapse-icon" aria-hidden="true">{isOpen ? '−' : '+'}</span></button>{isOpen ? <div className="collapse-body section-collapse-body">{children}</div> : null}</section>
}

function InfoCard({ title, detail, tone = 'model-note' }) {
  const [isOpen, setIsOpen] = useState(false)
  return <article className={`note-card collapsible-card ${tone}`}><button className="collapse-toggle" type="button" onClick={() => setIsOpen((v) => !v)}><div className="collapse-copy"><strong>{title}</strong><small>{detail}</small></div><span className="collapse-icon" aria-hidden="true">{isOpen ? '−' : '+'}</span></button>{isOpen ? <div className="collapse-body"><div className="model-row"><span>{detail}</span></div></div> : null}</article>
}

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

function LabCard({ item }) {
  const [isOpen, setIsOpen] = useState(false)
  const [isPromptVisible, setIsPromptVisible] = useState(false)
  return <article className="scenario-card collapsible-card"><button className="collapse-toggle" type="button" onClick={() => setIsOpen((v) => !v)}><div className="collapse-copy"><strong>{item.title}</strong><small>{item.concept}</small></div><span className="collapse-icon" aria-hidden="true">{isOpen ? '−' : '+'}</span></button>{isOpen ? <div className="collapse-body"><h4>Step-by-step build</h4><ol>{item.steps.map((step) => <li key={step}>{step}</li>)}</ol><div className="section-subhead"><div className="prompt-controls"><CopyPrompt prompt={item.prompt} /><button className="prompt-toggle-btn" type="button" onClick={() => setIsPromptVisible((v) => !v)}>{isPromptVisible ? 'Hide lab prompt' : 'Show lab prompt'}</button></div>{isPromptVisible ? <pre>{item.prompt}</pre> : <div className="prompt-placeholder">Prompt hidden</div>}</div></div> : null}</article>
}

function QuizCard({ item }) {
  const [selectedIndex, setSelectedIndex] = useState(null)
  return (
    <article className="scenario-card quiz-card">
      <h4>{item.title}</h4>
      <p className="scenario-meta">{item.question}</p>
      <div className="quiz-options">
        {item.options.map((option, index) => {
          const isSelected = selectedIndex === index
          const isCorrect = index === item.correctIndex
          let className = 'quiz-option'
          if (isSelected && isCorrect) className += ' is-correct'
          if (isSelected && !isCorrect) className += ' is-wrong'
          return (
            <button key={option} className={className} type="button" onClick={() => setSelectedIndex(index)}>
              <span>{option}</span>
            </button>
          )
        })}
      </div>
      {selectedIndex !== null ? (
        <p className="quiz-feedback">
          {selectedIndex === item.correctIndex ? 'Correct' : `Not quite. Correct answer: ${item.options[item.correctIndex]}`}
        </p>
      ) : null}
    </article>
  )
}

export default function N8nModule2Page() {
  return (
    <div className="page-shell" style={{ '--accent': '#ea580c', '--accent-soft': '#fed7aa' }}>
      <header className="hero">
        <div className="hero-copy">
          <p className="eyebrow">n8n Module 2</p>
          <h1>Data Flow, Logic <span>& Transformations</span></h1>
          <p className="lead">A hands-on 2026 module for mastering items, expressions, branching, batching, and data shaping inside n8n before adding AI agents or retrieval workflows.</p>
          <div className="hero-actions">
            <a className="btn primary" href="#overview">Start here</a>
            <a className="btn" href="/n8n/deep-dive.html">Back to deep dive</a>
          </div>
          <div id="page-index" className="panel-card hero-index-card">
            <h3>Index</h3>
            <div className="surface-nav hero-index-nav">
              {sections.filter((s) => s.href !== '#page-index').map((s) => <a key={s.href} className="surface-link" href={s.href}>{s.label}</a>)}
            </div>
          </div>
        </div>
        <aside className="hero-panel">
          <div className="panel-card accent">
            <h3>Goal</h3>
            <p>Finish this module able to read, reshape, branch, batch, and merge workflow data with confidence so later AI workflows receive clean and predictable inputs.</p>
          </div>
        </aside>
      </header>
      <main>
        <CollapsibleSection id="overview" eyebrow="Overview" title="What this module is designed to achieve" lead="This module is the most important non-AI foundation in the course because it teaches how workflows really behave.">
          <div className="notes-grid">{overviewCards.map(([title, detail]) => <InfoCard key={title} title={title} detail={detail} tone="model-note" />)}</div>
        </CollapsibleSection>
        <CollapsibleSection id="why-it-matters" eyebrow="Why It Matters" title="Why this module matters so much in 2026" lead="Good AI workflows still depend on strong data handling, and this is where that skill gets built.">
          <div className="notes-grid">{whyCards.map((item) => <InfoCard key={item.title} title={item.title} detail={item.detail} tone="prompt-note" />)}</div>
        </CollapsibleSection>
        <CollapsibleSection id="core-concepts" eyebrow="Core Concepts" title="The concepts that make later workflow design easier" lead="These are the ideas learners should understand before moving into integrations and AI.">
          <div className="notes-grid">{conceptCards.map((item) => <InfoCard key={item.title} title={item.title} detail={item.detail} tone="model-note" />)}</div>
        </CollapsibleSection>
        <CollapsibleSection id="hands-on-labs" eyebrow="Hands-On Labs" title="Practice the patterns directly in the editor" lead="These labs deliberately focus on payload shape, expressions, and branching behavior rather than on flashy integrations.">
          <div className="scenario-list">{labs.map((item) => <LabCard key={item.title} item={item} />)}</div>
        </CollapsibleSection>
        <CollapsibleSection id="templates" eyebrow="Templates" title="Recommended templates and starter references" lead="These are the most useful references for hands-on practice in this module.">
          <div className="download-grid">{templateLinks.map((item) => <a key={item.href} className="download-chip" href={item.href} target="_blank" rel="noreferrer">{item.label}</a>)}</div>
        </CollapsibleSection>
        <CollapsibleSection id="quiz" eyebrow="Quiz" title="Quick self-check before moving on" lead="Use these to confirm understanding before jumping into APIs or AI nodes.">
          <div className="scenario-list">{quizCards.map((item) => <QuizCard key={item.title} item={item} />)}</div>
        </CollapsibleSection>
        <CollapsibleSection id="assignment" eyebrow="Assignment" title="Apply the patterns in one personal workflow" lead="The assignment matters because it proves the learner can use transformation and logic patterns outside the guided labs.">
          <div className="section-subhead">
            <ol>{assignmentPrompts.map((item) => <li key={item}>{item}</li>)}</ol>
          </div>
        </CollapsibleSection>
        <CollapsibleSection id="tips" eyebrow="💡 Tips" title="Tips for this module" lead="This module is concept-heavy, so pacing and repetition matter.">
          <div className="tips-grid">{tips.map((tip) => <article key={tip} className="tip-card"><p>{tip}</p></article>)}</div>
        </CollapsibleSection>
      </main>
      <a className="floating-index" href="#page-index">Index</a>
    </div>
  )
}
