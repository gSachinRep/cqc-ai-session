import React, { useEffect, useState } from 'react'

const sections = [
  { label: 'Index', href: '#page-index' },
  { label: 'Overview', href: '#overview' },
  { label: 'Prerequisites', href: '#prerequisites' },
  { label: 'Core Concepts', href: '#core-concepts' },
  { label: 'Hands-On Labs', href: '#hands-on-labs' },
  { label: 'Templates', href: '#templates' },
  { label: 'Quiz', href: '#quiz' },
  { label: 'Assignment', href: '#assignment' },
  { label: 'Tips', href: '#tips' }
]

const overviewCards = [
  ['Module', 'Module 7: Retrieval-Augmented Generation (RAG)'],
  ['Goal by end', 'Build grounded AI workflows that ingest documents, create embeddings, store chunks in a vector store, and answer questions using your own data.'],
  ['Why this matters', 'RAG is what turns an LLM from a general model into a context-aware assistant that can work from company or project knowledge.']
]

const prerequisiteSteps = [
  'Complete Modules 4 to 6 so chat models, agents, and tool patterns already make sense.',
  'Prepare a small document set such as PDFs, policy files, handbook pages, or internal notes for ingestion.',
  'Keep a model credential and an embeddings-compatible path ready.',
  'Choose a vector store option for practice, such as a simple built-in path or a managed store like Supabase or Pinecone.'
]

const conceptCards = [
  {
    title: 'RAG means retrieval before generation',
    detail:
      'Instead of asking the model to rely on training alone, the workflow retrieves relevant chunks from your own data and adds them to the model context before answering.'
  },
  {
    title: 'Chunking quality shapes answer quality',
    detail:
      'Document splitting is not a minor detail. Chunk size, overlap, and document structure strongly affect what context gets retrieved later.'
  },
  {
    title: 'Embeddings make similarity possible',
    detail:
      'Embeddings convert text into vectors so the system can match semantically related content, not only exact keyword matches.'
  },
  {
    title: 'Ingestion and query are separate workflows',
    detail:
      'A good RAG system usually has one workflow for loading and indexing data, and another for querying and answering. Keeping them separate makes maintenance easier.'
  },
  {
    title: 'Grounding still needs guardrails',
    detail:
      'Even with retrieval, learners should instruct the model to say when the answer is not supported by the source documents rather than inventing missing information.'
  }
]

const labs = [
  {
    title: 'Lab 1: Build a Small Document Ingestion Workflow',
    concept:
      'Create the indexing side of a RAG system so learners understand how documents become searchable knowledge.',
    steps: [
      'Choose a small set of documents such as policy PDFs, project notes, or handbook pages.',
      'Use a document loader to bring the files into the workflow.',
      'Add a text splitter and tune chunk size and overlap.',
      'Generate embeddings and store the chunks in a vector store.',
      'Inspect the stored payload so the learner sees how metadata and chunks are represented.'
    ],
    prompt:
      'Explain this ingestion workflow step by step. Show how the original documents are being split, embedded, and stored so I can reason about retrieval quality later.'
  },
  {
    title: 'Lab 2: Build a RAG Question-Answer Workflow',
    concept:
      'Use retrieval plus a chat model to answer questions only from the indexed knowledge base.',
    steps: [
      'Create a query workflow with Chat Trigger or Manual Trigger.',
      'Add a retrieval step from the vector store based on the incoming question.',
      'Pass the retrieved chunks into a model with instructions to answer only from the provided context.',
      'Return the answer with a short citation-style reference to the retrieved documents or sections.',
      'Test supported and unsupported questions to see how the workflow behaves in both cases.'
    ],
    prompt:
      'You are a grounded knowledge assistant. Answer only from the retrieved context. If the answer is not clearly supported by the retrieved passages, say that the information is not available in the knowledge base.'
  },
  {
    title: 'Lab 3: Attach RAG to an Agent as a Tool',
    concept:
      'Move from direct RAG answers into an agent workflow that can choose when to consult the knowledge base.',
    steps: [
      'Start with a working agent from Module 6.',
      'Connect the RAG query workflow or vector-store question tool as one of the agent tools.',
      'Update the system prompt so the agent knows when the knowledge base should be used.',
      'Test questions that require internal context and questions that do not.',
      'Review the execution trace to confirm that retrieval is happening only when appropriate.'
    ],
    prompt:
      'You are an internal knowledge assistant. Use the knowledge-base tool whenever the question depends on company policies, documents, or internal reference material. If the knowledge base does not support the answer, say so clearly.'
  }
]

const templateLinks = [
  {
    label: 'RAG in n8n docs',
    href: 'https://docs.n8n.io/advanced-ai/rag-in-n8n/'
  },
  {
    label: 'n8n AI workflow gallery',
    href: 'https://n8n.io/workflows'
  },
  {
    label: 'Google Drive + RAG example reference',
    href: 'https://n8n.io/workflows'
  }
]

const quizCards = [
  {
    title: 'Quick check 1',
    question: 'What is the purpose of RAG in an AI workflow?',
    options: [
      'To ground answers in retrieved source material from your own data',
      'To remove the need for prompts',
      'To replace vector stores with spreadsheets',
      'To make every model answer shorter'
    ],
    correctIndex: 0
  },
  {
    title: 'Quick check 2',
    question: 'Why does chunk size matter in a RAG system?',
    options: [
      'It affects what context gets retrieved and how useful that context is',
      'It only changes the UI layout',
      'It only matters for image files',
      'It has no real effect once embeddings are created'
    ],
    correctIndex: 0
  },
  {
    title: 'Quick check 3',
    question: 'Why separate ingestion and query workflows?',
    options: [
      'Because indexing and answering are different jobs and are easier to manage separately',
      'Because n8n requires two accounts',
      'Because vector stores only work with webhooks',
      'Because query workflows cannot use chat models'
    ],
    correctIndex: 0
  },
  {
    title: 'Quick check 4',
    question: 'What should a grounded assistant do when retrieval does not support an answer?',
    options: [
      'Say the information is not supported by the knowledge base',
      'Invent a likely answer from the model’s general knowledge',
      'Retry forever until it finds something',
      'Skip the response entirely'
    ],
    correctIndex: 0
  }
]

const assignmentPrompts = [
  'Build a company or team knowledge-base bot that answers questions only from uploaded documents.',
  'Build a document-ingestion workflow and a separate question-answer workflow, then explain the role of each clearly.',
  'Connect a knowledge-base retrieval workflow to an existing agent so it can answer internal questions more reliably.'
]

const tips = [
  'Use a small document set first. It is easier to understand chunking and retrieval quality when the corpus is manageable.',
  'Test with questions that should fail as well as questions that should succeed. That is how learners see whether the grounding instructions are working.',
  'Keep metadata useful. Titles, source names, and section identifiers make answers easier to validate.',
  'If retrieval quality is weak, inspect chunking before blaming the model.'
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

export default function N8nModule7Page() {
  return (
    <div className="page-shell" style={{ '--accent': '#ea580c', '--accent-soft': '#fed7aa' }}>
      <header className="hero">
        <div className="hero-copy">
          <p className="eyebrow">n8n Module 7</p>
          <h1>Retrieval-Augmented Generation <span>— Grounded AI Knowledge</span></h1>
          <p className="lead">A practical module for turning documents and internal knowledge into grounded AI workflows using embeddings, vector stores, retrieval, and answer-generation patterns.</p>
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
            <p>Finish this module able to ingest documents, build retrieval workflows, and create grounded assistants that answer from your own knowledge rather than from model memory alone.</p>
          </div>
        </aside>
      </header>
      <main>
        <CollapsibleSection id="overview" eyebrow="Overview" title="What this module is designed to achieve" lead="This is where AI workflows become knowledge-aware instead of only prompt-aware.">
          <div className="notes-grid">{overviewCards.map(([title, detail]) => <InfoCard key={title} title={title} detail={detail} tone="model-note" />)}</div>
        </CollapsibleSection>
        <CollapsibleSection id="prerequisites" eyebrow="Prerequisites" title="What to prepare before building RAG workflows" lead="A clean document set and a clear ingestion plan make this module much easier to reason about.">
          <div className="section-subhead">
            <ol>{prerequisiteSteps.map((step) => <li key={step}>{step}</li>)}</ol>
          </div>
        </CollapsibleSection>
        <CollapsibleSection id="core-concepts" eyebrow="Core Concepts" title="The retrieval concepts learners need to understand first" lead="These ideas help learners understand why grounded AI behaves differently from prompt-only workflows.">
          <div className="notes-grid">{conceptCards.map((item) => <InfoCard key={item.title} title={item.title} detail={item.detail} tone="model-note" />)}</div>
        </CollapsibleSection>
        <CollapsibleSection id="hands-on-labs" eyebrow="Hands-On Labs" title="Build ingestion and retrieval workflows directly" lead="These labs separate indexing, retrieval, and agent usage so learners can see each layer clearly.">
          <div className="scenario-list">{labs.map((item) => <LabCard key={item.title} item={item} />)}</div>
        </CollapsibleSection>
        <CollapsibleSection id="templates" eyebrow="Templates" title="Useful references and starter links" lead="Use these to ground the build in official RAG patterns while adapting the data to your own use case.">
          <div className="download-grid">{templateLinks.map((item) => <a key={item.href} className="download-chip" href={item.href} target="_blank" rel="noreferrer">{item.label}</a>)}</div>
        </CollapsibleSection>
        <CollapsibleSection id="quiz" eyebrow="Quiz" title="Quick self-check before moving on" lead="Use these to confirm the learner understands retrieval, chunking, and grounded answering.">
          <div className="scenario-list">{quizCards.map((item) => <QuizCard key={item.title} item={item} />)}</div>
        </CollapsibleSection>
        <CollapsibleSection id="assignment" eyebrow="Assignment" title="Build one grounded knowledge workflow" lead="The assignment should prove the learner can separate ingestion from query and make the answer behavior clearly grounded.">
          <div className="section-subhead">
            <ol>{assignmentPrompts.map((item) => <li key={item}>{item}</li>)}</ol>
          </div>
        </CollapsibleSection>
        <CollapsibleSection id="tips" eyebrow="💡 Tips" title="Tips for this module" lead="This module becomes clearer when learners test both retrieval quality and answer quality separately.">
          <div className="tips-grid">{tips.map((tip) => <article key={tip} className="tip-card"><p>{tip}</p></article>)}</div>
        </CollapsibleSection>
      </main>
      <a className="floating-index" href="#page-index">Index</a>
    </div>
  )
}
